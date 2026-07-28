import React from 'react';
import { Trophy, Award, Zap, Shield, Crown, Sparkles } from 'lucide-react';
import { audioService } from '../../services/audioService';

export const Section23Leaderboard: React.FC = () => {
  const topArchitects = [
    { rank: 1, name: 'Aarav Sharma', role: 'AI Engineering Lead', xp: '3,450 XP', tier: 'SYNAPSE MASTER', avatar: '👑', badge: 'GOLD ARCHITECT' },
    { rank: 2, name: 'Ananya Verma', role: 'Full-Stack Developer', xp: '2,980 XP', tier: 'CELESTIAL TIER', avatar: '⚡', badge: 'SILVER ARCHITECT' },
    { rank: 3, name: 'Rohan Gupta', role: 'Cyber Security Specialist', xp: '2,620 XP', tier: 'CELESTIAL TIER', avatar: '🛡️', badge: 'BRONZE ARCHITECT' },
    { rank: 4, name: 'Priya Patel', role: 'Prompt Specialist', xp: '2,150 XP', tier: 'CHAMPION TIER', avatar: '✨', badge: 'TOP INITIATE' },
    { rank: 5, name: 'Kabir Singh', role: 'UI/UX Designer', xp: '1,890 XP', tier: 'CHAMPION TIER', avatar: '🚀', badge: 'TOP INITIATE' },
  ];

  return (
    <section className="full-section justify-center items-center py-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 z-10 w-full text-center flex flex-col justify-between items-center h-full">
        {/* Header Badge & Title */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-2 shadow-neon-violet">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>REAL-TIME XP LEADERBOARD</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white mb-2">
            HALL OF SYNAPSE ARCHITECTS
          </h2>
          <p className="font-sans text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            Live rankings tracking XP accumulated across orientation missions, hackathons, and technical workshops.
          </p>
        </div>

        {/* Live XP Leaderboard Rankings Table */}
        <div className="w-full max-w-4xl glass-card rounded-3xl p-6 border-2 border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.35)] relative overflow-hidden flex flex-col my-3 bg-gradient-to-b from-[#120a2a]/90 to-[#070412]/90">
          
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-500/30 font-mono text-xs text-purple-300">
            <span className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>TOP RANKED MEMBERS</span>
            </span>
            <span className="text-cyan-400 font-bold">UPDATED LIVE</span>
          </div>

          <div className="space-y-3">
            {topArchitects.map((arch) => (
              <div
                key={arch.rank}
                onMouseEnter={() => audioService.playHover()}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all duration-300 hover:scale-[1.01] ${
                  arch.rank === 1
                    ? 'bg-gradient-to-r from-amber-950/80 via-purple-900/60 to-indigo-950/80 border-amber-500/50 shadow-lg shadow-amber-500/10'
                    : arch.rank === 2
                    ? 'bg-purple-950/60 border-cyan-500/40'
                    : arch.rank === 3
                    ? 'bg-purple-950/60 border-purple-500/30'
                    : 'bg-purple-950/30 border-purple-500/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-sm ${
                    arch.rank === 1 ? 'bg-amber-400 text-black font-extrabold shadow-neon-amber' : 'bg-purple-900/60 text-purple-200 border border-purple-500/30'
                  }`}>
                    #{arch.rank}
                  </div>
                  <div className="text-left">
                    <div className="font-display font-bold text-sm sm:text-base text-white flex items-center gap-2">
                      <span>{arch.name}</span>
                      <span className="text-xs">{arch.avatar}</span>
                    </div>
                    <div className="font-mono text-[10px] text-purple-300">{arch.role} • {arch.tier}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono text-sm sm:text-base font-extrabold text-amber-400">{arch.xp}</div>
                  <div className="font-mono text-[9px] text-cyan-300 uppercase">{arch.badge}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
