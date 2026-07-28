import React from 'react';

interface SynapseLogoProps {
  className?: string;
  alt?: string;
  variant?: 'dark' | 'full' | 'transparent';
  src?: string;
}

export const SynapseLogo: React.FC<SynapseLogoProps> = ({
  className = 'h-12 object-contain',
  alt = 'The Synapse Society Logo',
  variant = 'transparent',
  src,
}) => {
  const logoSrc =
    src ||
    (variant === 'full'
      ? '/synapse-logo-full.png'
      : variant === 'dark'
      ? '/synapse-logo-dark.png'
      : '/synapse-logo-dark-transparent.png');

  return (
    <img
      src={logoSrc}
      alt={alt}
      className={`${className} transition-all duration-300 drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]`}
      loading="eager"
    />
  );
};

