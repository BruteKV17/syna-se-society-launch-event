import React, { useRef, useState, useEffect } from 'react';

interface CardIntroVideoProps {
  className?: string;
  videoUrl?: string;
}

export const CardIntroVideo: React.FC<CardIntroVideoProps> = ({
  className = 'w-full h-full object-cover rounded-2xl',
  videoUrl = '/intro-video/card-intro.mp4',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      // Auto-play was prevented or video file error
    });
  }, [videoUrl]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!hasVideoError ? (
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setHasVideoError(true)}
          className="w-full h-full object-cover rounded-2xl drop-shadow-[0_0_35px_rgba(168,85,247,0.4)] pointer-events-none"
        />
      ) : (
        <img
          src="/synapse-exact-logo.png"
          alt="The Synapse Society Card Mascot"
          className="w-full h-full object-contain rounded-2xl drop-shadow-2xl p-4 bg-purple-950/80"
        />
      )}
    </div>
  );
};
