import React, { useEffect, useRef, useState } from 'react';
import { logoAnimationConfig, LogoAnimationConfig, getFrameUrl } from '../../config/logoAnimationConfig';

interface LogoSequenceCanvasProps {
  className?: string;
  config?: Partial<LogoAnimationConfig>;
  /** Optional custom scroll progress (0.0 to 1.0). If omitted, component tracks container scroll. */
  progress?: number;
  /** Fallback node (e.g. static SynapseLogo) to display if sequence frames are not found. */
  fallback?: React.ReactNode;
}

export const LogoSequenceCanvas: React.FC<LogoSequenceCanvasProps> = ({
  className = 'w-full h-auto max-w-[600px] aspect-square mx-auto',
  config: customConfig,
  progress: externalProgress,
  fallback,
}) => {
  const mergedConfig = { ...logoAnimationConfig, ...customConfig };
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [hasValidFrames, setHasValidFrames] = useState<boolean | null>(null);
  const [internalProgress, setInternalProgress] = useState<number>(0);

  // Preload all sequence frames
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let successfulLoads = 0;
    let failedLoads = 0;

    const totalFrames = mergedConfig.frameCount;

    for (let i = 0; i < totalFrames; i++) {
      const frameIndex = mergedConfig.startIndex + i;
      const url = getFrameUrl(frameIndex, mergedConfig);
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

  // Track scroll if externalProgress is not provided
  useEffect(() => {
    if (externalProgress !== undefined) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress based on how far container has scrolled into view
      const totalScrollable = rect.height + windowHeight;
      const currentScroll = windowHeight - rect.top;
      const calculated = Math.min(1, Math.max(0, currentScroll / totalScrollable));

      setInternalProgress(calculated);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [externalProgress]);

  const activeProgress = externalProgress !== undefined ? externalProgress : internalProgress;

  // Draw frame to Canvas whenever activeProgress or loadedCount updates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0 || hasValidFrames === false) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const totalFrames = images.length;
    const currentFrameIndex = Math.min(
      totalFrames - 1,
      Math.max(0, Math.floor(activeProgress * totalFrames))
    );

    const img = images[currentFrameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Set canvas dimensions with retina resolution scaling
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth || 600;
    const displayHeight = canvas.clientHeight || 600;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Maintain aspect ratio and center image
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = displayWidth / displayHeight;

    let drawWidth = displayWidth;
    let drawHeight = displayHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imgAspect > canvasAspect) {
      drawHeight = displayWidth / imgAspect;
      offsetY = (displayHeight - drawHeight) / 2;
    } else {
      drawWidth = displayHeight * imgAspect;
      offsetX = (displayWidth - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  }, [activeProgress, images, loadedCount, hasValidFrames]);

  // If frame sequence loading fails or no frames exist yet, render fallback logo
  if (hasValidFrames === false) {
    return <div ref={containerRef} className={className}>{fallback}</div>;
  }

  return (
    <div ref={containerRef} className={`relative flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none"
      />
      {hasValidFrames === null && fallback && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {fallback}
        </div>
      )}
    </div>
  );
};
