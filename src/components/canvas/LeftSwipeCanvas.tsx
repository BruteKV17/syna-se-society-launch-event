import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { swipeAnimationConfig, SwipeAnimationConfig, getSwipeFrameUrl } from '../../config/swipeAnimationConfig';

interface LeftSwipeCanvasProps {
  className?: string;
  config?: Partial<SwipeAnimationConfig>;
  fallback?: React.ReactNode;
}

export const LeftSwipeCanvas: React.FC<LeftSwipeCanvasProps> = ({
  className = 'w-full h-[75vh] sm:h-[85vh] mx-auto',
  config: customConfig,
  fallback,
}) => {
  const mergedConfig = { ...swipeAnimationConfig, ...customConfig };
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [hasValidFrames, setHasValidFrames] = useState<boolean | null>(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);

  // Preload sequence frames
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let successfulLoads = 0;
    let failedLoads = 0;

    const totalFrames = mergedConfig.frameCount;

    for (let i = 0; i < totalFrames; i++) {
      const frameIndex = mergedConfig.startIndex + i;
      const url = getSwipeFrameUrl(frameIndex, mergedConfig);
      const img = new Image();

      img.onload = () => {
        if (!isMounted) return;
        successfulLoads++;
        setLoadedCount((prev) => prev + 1);
        if (successfulLoads > 2) {
          setHasValidFrames(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        failedLoads++;
        if (failedLoads >= totalFrames - 2 && successfulLoads < 3) {
          setHasValidFrames(false);
        }
      };

      img.src = url;
      loadedImages.push(img);
    }

    setImages(loadedImages);

    return () => {
      isMounted = false;
    };
  }, [
    mergedConfig.folderPath,
    mergedConfig.frameCount,
    mergedConfig.fileNamePrefix,
    mergedConfig.fileExtension,
    mergedConfig.zeroPadLength,
    mergedConfig.startIndex,
  ]);

  // Automatic Continuous Loop Playback (Little slow controlled speed)
  useEffect(() => {
    if (!hasValidFrames || images.length === 0) return;

    let animFrameId: number;
    let lastTimestamp = performance.now();
    const frameInterval = 1000 / mergedConfig.fps;
    let frameIdx = 0;

    const renderLoop = (now: number) => {
      const elapsed = now - lastTimestamp;

      if (elapsed >= frameInterval) {
        lastTimestamp = now - (elapsed % frameInterval);
        setCurrentFrameIndex(frameIdx);
        frameIdx = (frameIdx + 1) % images.length;
      }

      animFrameId = requestAnimationFrame(renderLoop);
    };

    animFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [hasValidFrames, images.length, mergedConfig.fps]);

  // Draw full-screen edge-to-edge frame to Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0 || hasValidFrames === false) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const idx = Math.min(images.length - 1, Math.max(0, currentFrameIndex));
    const img = images[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth || window.innerWidth;
    const displayHeight = canvas.clientHeight || window.innerHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = displayWidth / displayHeight;

    let drawWidth = displayWidth;
    let drawHeight = displayHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imgAspect > canvasAspect) {
      drawWidth = displayHeight * imgAspect;
      offsetX = (displayWidth - drawWidth) / 2;
    } else {
      drawHeight = displayWidth / imgAspect;
      offsetY = (displayHeight - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  }, [currentFrameIndex, images, loadedCount, hasValidFrames]);

  if (hasValidFrames === false) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full min-h-[70vh]">
      {/* Full Screen Edge-to-Edge Auto-Control Container */}
      <div className={`relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}>
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover pointer-events-none drop-shadow-[0_0_40px_rgba(168,85,247,0.5)]"
        />
      </div>

      {/* Floating Status Indicator Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 z-20 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-xs shadow-neon-violet backdrop-blur-md"
      >
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
        <span>CINEMATIC SEQUENCE • FRAME {currentFrameIndex + 1} / {mergedConfig.frameCount}</span>
      </motion.div>
    </div>
  );
};
