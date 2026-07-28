import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface QuickNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (index: number) => void;
  currentSectionIndex: number;
}

const SECTION_TITLES = [
  '00. Welcome Freshers & Stats',
  '01. Synapse Emblem Reveal',
  '02. About The Synapse Society',
  '03. Executive Leadership Structure',
  '04. Core Vision & Node Graph',
  '05. Evolution Timeline',
  '06. Live Event Gallery',
  '07. What We Do - Tech Domains',
  '08. Why Join Us - Perks',
  '09. Q1 - Q4 Future Roadmap 2026',
  '10. Biggest Launch Event',
  '11. Synapse Reward System',
  '12. XP & Progression Simulator',
  '13. Holographic Tier Cards',
  '14. Exclusive Merchandise Scroll',
  '15. Digital Profile Pass Mockup',
  '16. Bachelor\'s Mission Arena',
  '17. Live XP Leaderboard',
  '18. Join The Synapse Society',
  '19. Outro & Vortex Replay',
];

export const QuickNavDrawer: React.FC<QuickNavDrawerProps> = ({
  isOpen,
  onClose,
  onSelectSection,
  currentSectionIndex,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-2xl max-h-[85vh] rounded-3xl p-6 overflow-hidden flex flex-col border border-purple-500/30 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-purple-500/20">
          <div className="flex items-center gap-2 text-purple-300">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="font-display text-lg font-bold">KEYNOTE SECTION DIRECTORY</h2>
          </div>
          <button
            onClick={() => {
              audioService.playClick();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-purple-900/40 text-purple-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4 overflow-y-auto pr-2 no-scrollbar">
          {SECTION_TITLES.map((title, index) => {
            const isActive = currentSectionIndex === index;
            return (
              <button
                key={index}
                onClick={() => {
                  audioService.playClick();
                  onSelectSection(index);
                  onClose();
                }}
                onMouseEnter={() => audioService.playHover()}
                className={`text-left px-4 py-3 rounded-xl font-mono text-xs transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-lg shadow-purple-500/30 border border-purple-400'
                    : 'bg-purple-950/30 hover:bg-purple-900/50 text-purple-200 border border-purple-500/10'
                }`}
              >
                <span>{title}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
