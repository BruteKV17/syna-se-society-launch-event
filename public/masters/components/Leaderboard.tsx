"use client";

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeader } from './ui/SectionHeader';
import { Edit2, Save, Lock } from 'lucide-react';

const initialTeams = [
  { id: 1, name: 'Team Alpha', creativity: 85, innovation: 90, practicality: 75, ai: 88, technical: 80, presentation: 85 },
  { id: 2, name: 'Team Beta', creativity: 70, innovation: 80, practicality: 85, ai: 75, technical: 85, presentation: 80 },
  { id: 3, name: 'Team Gamma', creativity: 95, innovation: 85, practicality: 70, ai: 90, technical: 75, presentation: 90 },
  { id: 4, name: 'Team Delta', creativity: 80, innovation: 75, practicality: 90, ai: 80, technical: 85, presentation: 75 },
  { id: 5, name: 'Team Epsilon', creativity: 60, innovation: 65, practicality: 70, ai: 60, technical: 75, presentation: 65 },
].map(team => ({
  ...team,
  total: Math.round((team.creativity + team.innovation + team.practicality + team.ai + team.technical + team.presentation) / 6)
})).sort((a, b) => b.total - a.total);

export function Leaderboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [teams, setTeams] = useState(initialTeams);
  const [isEditing, setIsEditing] = useState(false);
  const [isAwaiting, setIsAwaiting] = useState(true);

  const handleScoreChange = (teamId: number, field: string, value: string) => {
    const numValue = Math.min(100, Math.max(0, Number(value) || 0));
    setTeams(prev => prev.map(t => {
      if (t.id === teamId) {
        const updated = { ...t, [field]: numValue };
        updated.total = Math.round((updated.creativity + updated.innovation + updated.practicality + updated.ai + updated.technical + updated.presentation) / 6);
        return updated;
      }
      return t;
    }).sort((a, b) => b.total - a.total));
  };

  const getRankColor = (index: number) => {
    if (index === 0) return 'text-yellow-400 border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]';
    if (index === 1) return 'text-gray-300 border-gray-300 shadow-[0_0_10px_rgba(209,213,219,0.5)]';
    if (index === 2) return 'text-amber-600 border-amber-600 shadow-[0_0_10px_rgba(217,119,6,0.5)]';
    return 'text-[var(--text-secondary)] border-white/10';
  };

  return (
    <section id="leaderboard" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader title="LEADERBOARD" subtitle="Mission performance rankings" />
        
        <div className="flex justify-end gap-4 mb-6">
          <button 
            onClick={() => setIsAwaiting(!isAwaiting)}
            className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded border border-[var(--purple-primary)] bg-[var(--purple-primary)]/10 hover:bg-[var(--purple-primary)]/20 transition-colors cursor-pointer"
          >
            {isAwaiting ? <Lock size={14} /> : <Lock size={14} className="opacity-50" />}
            {isAwaiting ? 'UNLOCK RESULTS' : 'LOCK RESULTS'}
          </button>
          
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded border border-white/20 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            {isEditing ? <Save size={14} /> : <Edit2 size={14} />}
            {isEditing ? 'SAVE SCORES' : 'EDIT MODE'}
          </button>
        </div>

        <div className="relative mt-8">
          {isAwaiting && !isEditing && (
            <div className="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-md bg-[var(--bg-primary)]/70 rounded-xl border border-[var(--purple-primary)]/30">
              <motion.div 
                animate={{ opacity: [0.5, 1, 0.5] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center"
              >
                <div className="font-display text-2xl md:text-3xl text-[var(--purple-accent)] text-glow mb-2">AWAITING LIVE RESULTS...</div>
                <div className="font-mono text-[var(--text-muted)] text-sm md:text-base">TRANSMISSION PENDING</div>
              </motion.div>
            </div>
          )}

          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="font-display text-[var(--text-secondary)] text-sm border-b border-white/10">
                  <th className="p-4">Rank</th>
                  <th className="p-4">Team</th>
                  <th className="p-4">Creativity</th>
                  <th className="p-4">Innovation</th>
                  <th className="p-4">Practicality</th>
                  <th className="p-4">AI</th>
                  <th className="p-4">Technical</th>
                  <th className="p-4">Presentation</th>
                  <th className="p-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <motion.tr 
                    key={team.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors glass-card"
                  >
                    <td className="p-4">
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-display text-sm bg-[var(--bg-secondary)] ${getRankColor(index)}`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="p-4 font-display text-[var(--text-primary)]">{team.name}</td>
                    
                    {['creativity', 'innovation', 'practicality', 'ai', 'technical', 'presentation'].map(field => (
                      <td key={field} className="p-4 w-32">
                        {isEditing ? (
                          <input 
                            type="number" 
                            value={team[field as keyof typeof team]} 
                            onChange={(e) => handleScoreChange(team.id, field, e.target.value)}
                            className="w-16 bg-black/50 border border-white/20 rounded px-2 py-1 text-sm font-mono text-center outline-none focus:border-[var(--purple-primary)] text-white"
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono w-6 text-white">{team[field as keyof typeof team]}</span>
                            <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-gradient-to-r from-[var(--purple-primary)] to-[var(--purple-accent)]"
                                initial={{ width: 0 }}
                                animate={isInView && !isAwaiting ? { width: `${team[field as keyof typeof team]}%` } : { width: 0 }}
                                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                              />
                            </div>
                          </div>
                        )}
                      </td>
                    ))}
                    
                    <td className="p-4 text-right font-display text-xl text-[var(--purple-accent)] text-glow">
                      {team.total}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col gap-4">
            {teams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-4 rounded-xl border border-white/5 bg-[var(--bg-secondary)]"
              >
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-display text-sm ${getRankColor(index)}`}>
                      {index + 1}
                    </div>
                    <div className="font-display text-[var(--text-primary)] text-lg">{team.name}</div>
                  </div>
                  <div className="font-display text-2xl text-[var(--purple-accent)] text-glow">
                    {team.total}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {['creativity', 'innovation', 'practicality', 'ai', 'technical', 'presentation'].map(field => (
                    <div key={field}>
                      <div className="text-[10px] text-[var(--text-secondary)] font-mono uppercase mb-1">{field}</div>
                      {isEditing ? (
                        <input 
                          type="number" 
                          value={team[field as keyof typeof team]} 
                          onChange={(e) => handleScoreChange(team.id, field, e.target.value)}
                          className="w-full bg-black/50 border border-white/20 rounded px-2 py-1 text-sm font-mono outline-none focus:border-[var(--purple-primary)] text-white"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono w-6 text-white">{team[field as keyof typeof team]}</span>
                          <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-[var(--purple-primary)]"
                              initial={{ width: 0 }}
                              animate={isInView && !isAwaiting ? { width: `${team[field as keyof typeof team]}%` } : { width: 0 }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
