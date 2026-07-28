import React, { useState } from 'react';
import { ShieldAlert, KeyRound, CheckCircle2, HelpCircle } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { dataStoreService } from '../../services/firebaseService';

interface SectionProps {
  onUserDataChanged: () => void;
}

export const Section18MissionCyberCrypt: React.FC<SectionProps> = ({ onUserDataChanged }) => {
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Encrypted cipher: "KNOWLEDGE" Caesar shifted by +3 -> "NQRZOHGJH"
  const targetCipher = 'SYNAPSE';

  const handleVerifyCipher = (e: React.FormEvent) => {
    e.preventDefault();
    audioService.playClick();

    if (userInput.trim().toUpperCase() === targetCipher) {
      setIsUnlocked(true);
      setErrorMsg('');
      audioService.playLevelUp();
      dataStoreService.awardXP('SYN-2026-9482', 200, 'MISSION-02', 'Mission 2: Cyber Crypt', 'System Simulator');
      onUserDataChanged();
    } else {
      audioService.playClick();
      setErrorMsg('INCORRECT DECRYPTION KEY. TRY AGAIN!');
    }
  };

  return (
    <section className="full-section justify-center items-center">
      <div className="max-w-4xl mx-auto px-6 z-10 w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>MISSION 02 • CYBER CRYPT PUZZLE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-2">
            DECRYPT THE CYBER CIPHER
          </h2>
          <p className="font-sans text-xs sm:text-base text-gray-300">
            Crack the encrypted passcode to unlock the confidential Synapse database vault!
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl">
          <div className="bg-black/60 rounded-2xl p-6 font-mono text-center mb-6 border border-purple-500/20">
            <div className="text-xs text-purple-400 mb-2">ENCRYPTED CIPHER HASH (CAESAR SHIFT +3):</div>
            <div className="text-3xl font-extrabold text-cyan-300 tracking-widest">
              V B Q D S V H
            </div>
            <div className="text-[11px] text-purple-300/70 mt-2">HINT: SHIFT EACH LETTER BACK BY 3 POSITIONS</div>
          </div>

          {errorMsg && (
            <div className="mb-4 text-center font-mono text-xs text-red-400 font-bold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleVerifyCipher} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="ENTER DECRYPTED KEY..."
              className="w-full bg-purple-950/60 border border-purple-500/30 rounded-2xl px-5 py-3 font-mono text-sm text-white focus:outline-none focus:border-purple-400"
            />
            <button type="submit" className="btn-synapse shrink-0 inline-flex items-center justify-center gap-2 text-sm">
              <KeyRound className="w-4 h-4" />
              <span>SUBMIT KEY</span>
            </button>
          </form>

          {isUnlocked && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-between text-emerald-300 font-mono text-xs animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>CIPHER DECRYPTED! VAULT UNLOCKED (+200 XP AWARDED)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
