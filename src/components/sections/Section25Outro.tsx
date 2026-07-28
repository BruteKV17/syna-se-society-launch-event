import React from 'react';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { SynapseLogo } from '../common/SynapseLogo';

interface SectionProps {
  onReplay: () => void;
}

export const Section25Outro: React.FC<SectionProps> = ({ onReplay }) => {
  return (
    <section className="full-section bg-[#040208] justify-center items-center text-center">
      {/* Particle Vortex Background Effect */}
      <div className="absolute w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none animate-pulse-glow" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center">
        <div className="relative w-96 sm:w-[700px] md:w-[850px] mx-auto mb-8 cursor-pointer group" onClick={onReplay}>
          <SynapseLogo className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-500" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-4 shadow-neon-violet">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>KEYNOTE SESSION 2026 COMPLETE</span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white mb-3">
          WELCOME TO THE SYNAPSE SOCIETY
        </h2>
        <p className="font-mono text-sm sm:text-base text-purple-300/80 max-w-xl mx-auto mb-10 tracking-widest">
          ज्ञानस्य सेतु • THE BRIDGE OF KNOWLEDGE
        </p>

        <button
          onClick={() => {
            audioService.playClick();
            audioService.playChimeIntro();
            onReplay();
          }}
          onMouseEnter={() => audioService.playHover()}
          className="btn-synapse inline-flex items-center gap-3 text-sm group mb-12"
        >
          <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          <span>REPLAY KEYNOTE EXPERIENCE</span>
        </button>

        <div className="font-mono text-xs text-purple-400/60 flex items-center justify-center gap-1">
          <span>DESIGNED WITH</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          <span>FOR THE SYNAPSE SOCIETY & FRESHERS 2026</span>
        </div>
      </div>
    </section>
  );
};
