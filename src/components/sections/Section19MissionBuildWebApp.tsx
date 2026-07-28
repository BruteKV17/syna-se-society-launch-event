import React, { useState } from 'react';
import { Code, Play, CheckCircle2, Terminal } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { dataStoreService } from '../../services/firebaseService';

interface SectionProps {
  onUserDataChanged: () => void;
}

export const Section19MissionBuildWebApp: React.FC<SectionProps> = ({ onUserDataChanged }) => {
  const [code, setCode] = useState(
    `<div className="synapse-card">\n  <h2>Hello Synapse</h2>\n  <button onclick="alert('Bridge of Knowledge!')">\n    Launch Core\n  </button>\n</div>`
  );
  const [isCompiled, setIsCompiled] = useState(false);

  const handleRunCode = () => {
    audioService.playClick();
    setIsCompiled(true);
    audioService.playLevelUp();
    dataStoreService.awardXP('SYN-2026-9482', 200, 'MISSION-03', 'Mission 3: Live Code Sandbox', 'System Simulator');
    onUserDataChanged();
  };

  return (
    <section className="full-section justify-center items-center">
      <div className="max-w-5xl mx-auto px-6 z-10 w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-3">
            <Code className="w-3.5 h-3.5 text-magenta" />
            <span>MISSION 03 • LIVE CODE SANDBOX</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-2">
            BUILD A REACT / HTML COMPONENT
          </h2>
          <p className="font-sans text-xs sm:text-base text-gray-300">
            Edit the live code snippet below and hit "Compile Component" to render the output and claim +200 XP.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="glass-card rounded-3xl p-5 border border-purple-500/30">
            <div className="flex items-center justify-between mb-3 font-mono text-xs text-purple-300">
              <span className="flex items-center gap-1.5"><Terminal className="w-4 h-4 text-purple-400" /> CODE EDITOR</span>
              <button
                onClick={handleRunCode}
                className="btn-synapse py-1 px-3 text-xs inline-flex items-center gap-1"
              >
                <Play className="w-3.5 h-3.5 fill-white" /> COMPILE
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={8}
              className="w-full bg-black/80 border border-purple-500/30 rounded-xl p-4 font-mono text-xs text-cyan-300 focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* Render Preview */}
          <div className="glass-card rounded-3xl p-5 border border-purple-500/30 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-purple-300 mb-3 flex items-center justify-between">
                <span>LIVE COMPONENT PREVIEW</span>
                {isCompiled && <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> COMPILED</span>}
              </div>
              <div className="p-6 rounded-2xl bg-purple-950/40 border border-purple-500/20 text-center min-h-[160px] flex flex-col items-center justify-center">
                <div dangerouslySetInnerHTML={{ __html: code }} />
              </div>
            </div>
            {isCompiled && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs text-center">
                +200 XP AWARDED TO YOUR PROFILE!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
