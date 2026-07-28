import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, SkipForward } from 'lucide-react';
import { logoAnimationConfig, LogoAnimationConfig, getFrameUrl } from '../../config/logoAnimationConfig';
import { audioService } from '../../services/audioService';

interface AutomaticLogoIntroProps {
  config?: Partial<LogoAnimationConfig>;
  onComplete: () => void;
}

export const AutomaticLogoIntro: React.FC<AutomaticLogoIntroProps> = ({
  config: customConfig,
  onComplete,
}) => {
  const mergedConfig = { ...logoAnimationConfig, ...customConfig };
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isReadyToPlay, setIsReadyToPlay] = useState<boolean>(false);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  // Preload sequence frames
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    const totalFrames = mergedConfig.frameCount;

    for (let i = 0; i < totalFrames; i++) {
      const frameIndex = mergedConfig.startIndex + i;
      const url = getFrameUrl(frameIndex, mergedConfig);
      const img = new Image();

      img.onload = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        if (count >= Math.min(25, totalFrames)) {
          setIsReadyToPlay(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
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

  // Automatic Frame Playback loop at target FPS
  useEffect(() => {
    if (!isReadyToPlay || images.length === 0 || isExiting) return;

    audioService.playChimeIntro();

    let animFrameId: number;
    let lastTimestamp = performance.now();
    const frameInterval = 1000 / mergedConfig.fps;
    let frameIdx = 0;

    const renderLoop = (now: number) => {
      const elapsed = now - lastTimestamp;

      if (elapsed >= frameInterval) {
        lastTimestamp = now - (elapsed % frameInterval);

        if (frameIdx < images.length) {
          setCurrentFrame(frameIdx);
          frameIdx++;
        } else {
          // Finished playing all 91 frames -> Disappear immediately
          finishIntro();
          return;
        }
      }

      animFrameId = requestAnimationFrame(renderLoop);
    };

    animFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [isReadyToPlay, images.length, isExiting, mergedConfig.fps]);

  // Render edge-to-edge full-bleed canvas on Pitch Black Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[currentFrame];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Fill canvas with solid pitch black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Full-bleed fit: scale image to fit screen perfectly
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
  }, [currentFrame, images]);

  const finishIntro = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 400); // Disappear transition
  };

  const progressPercent = Math.min(100, Math.round((loadedCount / mergedConfig.frameCount) * 100));

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          key="auto-logo-intro-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(15px)' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] bg-[#000000] text-white overflow-hidden selection:bg-purple-600 pointer-events-auto"
        >
          {/* Canvas with Pitch Black Background */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none filter brightness-110 contrast-105"
          />

          {/* Ambient Glow Backlight Aura */}
          <div className="absolute w-[650px] h-[650px] rounded-full bg-gradient-to-r from-purple-700/25 via-indigo-600/20 to-purple-900/25 blur-[120px] pointer-events-none animate-pulse-slow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* Top Indicator Badge */}
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
            {!isReadyToPlay || progressPercent < 100 ? (
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-xs shadow-neon-violet backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                <span>INITIALIZING REVEAL {progressPercent}%</span>
              </div>
            ) : null}
          </div>

          {/* Bottom Banner: WELCOME TO OUR SOCIETY */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-center w-full max-w-2xl px-6 pointer-events-none"
          >
            <h1 className="font-display text-2xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-cyan-300 drop-shadow-[0_0_35px_rgba(168,85,247,0.8)] mb-1">
              WELCOME TO OUR SOCIETY
            </h1>
            <p className="font-mono text-xs sm:text-sm text-purple-300 tracking-[0.25em] uppercase font-bold drop-shadow">
              THE SYNAPSE SOCIETY • ज्ञानस्य सेतु
            </p>
          </motion.div>

          {/* Bottom Right Skip Button */}
          <button
            onClick={() => {
              audioService.playClick();
              finishIntro();
            }}
            className="fixed bottom-8 right-8 z-20 px-5 py-2.5 rounded-full bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-300 hover:text-white font-mono text-xs flex items-center gap-2 transition-all backdrop-blur-md cursor-pointer group shadow-xl"
          >
            <span>SKIP INTRO</span>
            <SkipForward className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
