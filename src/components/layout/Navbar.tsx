import React from 'react';
import { Compass } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { UserProfile } from '../../types';

interface NavbarProps {
  currentSectionIndex: number;
  totalSections: number;
  user?: UserProfile;
  onOpenProfile?: () => void;
  onOpenAdmin?: () => void;
  onOpenQuickNav: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSectionIndex,
  totalSections,
  onOpenQuickNav,
}) => {
  return (
    <div className="fixed top-5 left-5 z-40">
      <button
        onClick={() => {
          audioService.playClick();
          onOpenQuickNav();
        }}
        onMouseEnter={() => audioService.playHover()}
        className="glass-card flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/80 hover:bg-purple-900/90 border border-purple-500/40 text-xs font-mono text-purple-200 transition-all hover:scale-105 shadow-neon-violet backdrop-blur-md cursor-pointer group"
      >
        <Compass className="w-4 h-4 text-cyan-400 animate-spin-slow group-hover:rotate-45 transition-transform" />
        <span>
          SEC <span className="text-white font-extrabold text-sm">{String(currentSectionIndex).padStart(2, '0')}</span> / {totalSections - 1}
        </span>
      </button>
    </div>
  );
};
