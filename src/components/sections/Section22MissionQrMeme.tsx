import React, { useState } from 'react';
import { Image, Sparkles, CheckCircle2, Download } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { dataStoreService } from '../../services/firebaseService';

interface SectionProps {
  onUserDataChanged: () => void;
}

export const Section22MissionQrMeme: React.FC<SectionProps> = ({ onUserDataChanged }) => {
  const [topText, setTopText] = useState('WHEN CODE COMPILES');
  const [bottomText, setBottomText] = useState('FIRST TRY AT SYNAPSE');
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerateMeme = () => {
    audioService.playClick();
    setIsGenerated(true);
    audioService.playLevelUp();
    dataStoreService.awardXP('SYN-2026-9482', 200, 'MISSION-06', 'Mission 6: QR Meme Generator', 'System Simulator');
    onUserDataChanged();
  };

  return (
    <section className="full-section justify-center items-center">
      <div className="max-w-4xl mx-auto px-6 z-10 w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-3">
          <Image className="w-3.5 h-3.5 text-magenta" />
          <span>MISSION 06 • TECH MEME GENERATOR</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-2">
          SYNAPSE MEME & QR ARENA
        </h2>
        <p className="font-sans text-xs sm:text-base text-gray-300 mb-8">
          Customize your developer meme below to unlock the "Meme Master" badge and claim +200 XP!
        </p>

        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl max-w-2xl mx-auto">
          {/* Meme Canvas Preview */}
          <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-purple-950/80 mb-6 border border-purple-500/30 flex flex-col justify-between p-4 text-center select-none">
            <div className="font-display font-black text-xl sm:text-2xl text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] tracking-wider">
              {topText || 'TOP TEXT'}
            </div>
            <div className="font-mono text-xs text-purple-400/60">SYNAPSE SOCIETY MEME ENGINE v1.0</div>
            <div className="font-display font-black text-xl sm:text-2xl text-amber-300 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] tracking-wider">
              {bottomText || 'BOTTOM TEXT'}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <input
              type="text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              placeholder="Top Text..."
              className="w-full bg-purple-950/60 border border-purple-500/30 rounded-xl px-4 py-2 text-xs font-mono text-white"
            />
            <input
              type="text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              placeholder="Bottom Text..."
              className="w-full bg-purple-950/60 border border-purple-500/30 rounded-xl px-4 py-2 text-xs font-mono text-white"
            />
          </div>

          <button onClick={handleGenerateMeme} className="btn-synapse inline-flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>MINT MEME & CLAIM +200 XP</span>
          </button>

          {isGenerated && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>MEME BADGE UNLOCKED! (+200 XP AWARDED)</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
