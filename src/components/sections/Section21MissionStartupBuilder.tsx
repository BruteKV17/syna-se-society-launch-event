import React, { useState } from 'react';
import { Rocket, DollarSign, Award, CheckCircle2 } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { dataStoreService } from '../../services/firebaseService';

interface SectionProps {
  onUserDataChanged: () => void;
}

export const Section21MissionStartupBuilder: React.FC<SectionProps> = ({ onUserDataChanged }) => {
  const [fundingVal, setFundingVal] = useState<number>(250000);
  const [isPitched, setIsPitched] = useState(false);

  const handlePitch = () => {
    audioService.playClick();
    setIsPitched(true);
    audioService.playLevelUp();
    dataStoreService.awardXP('SYN-2026-9482', 200, 'MISSION-05', 'Mission 5: Startup Builder', 'System Simulator');
    onUserDataChanged();
  };

  return (
    <section className="full-section justify-center items-center">
      <div className="max-w-4xl mx-auto px-6 z-10 w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-3">
          <Rocket className="w-3.5 h-3.5 text-cyan-400" />
          <span>MISSION 05 • STARTUP PITCH AUCTION</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-2">
          SYNAPSE VENTURE PITCH SIMULATOR
        </h2>
        <p className="font-sans text-xs sm:text-base text-gray-300 mb-8">
          Pitch your AI startup concept to simulated Synapse Society seed investors and lock in pre-seed funding!
        </p>

        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl mb-8 max-w-2xl mx-auto">
          <div className="text-left font-mono text-xs text-purple-300 mb-4">
            STARTUP CONCEPT: <span className="text-white font-bold">AutoSynapse - Autonomous LLM Code Auditor</span>
          </div>

          <div className="mb-6">
            <div className="flex justify-between font-mono text-xs text-purple-200 mb-2">
              <span>TARGET FUNDING ROUND:</span>
              <span className="text-emerald-400 font-bold">${fundingVal.toLocaleString()} USD</span>
            </div>
            <input
              type="range"
              min="50000"
              max="1000000"
              step="50000"
              value={fundingVal}
              onChange={(e) => {
                setFundingVal(Number(e.target.value));
                audioService.playHover();
              }}
              className="w-full h-3 bg-purple-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          {!isPitched ? (
            <button onClick={handlePitch} className="btn-synapse inline-flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4" />
              <span>SUBMIT PITCH TO INVESTORS</span>
            </button>
          ) : (
            <div className="p-5 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-mono text-sm flex items-center justify-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <span>PITCH APPROVED! VERIFIED SEED FUNDING MATCHED (+200 XP AWARDED)</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
