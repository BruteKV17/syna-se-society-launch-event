import React from 'react';
import { Users, Rocket, Calendar, Code, Sparkles } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { LeftSwipeCanvas } from '../canvas/LeftSwipeCanvas';

export const Section02WelcomeFreshers: React.FC = () => {
  const stats = [
    { icon: Users, value: '15+', label: 'Active Members', color: 'text-purple-400' },
    { icon: Rocket, value: '7+', label: 'AI & Dev Projects', color: 'text-cyan-400' },
    { icon: Calendar, value: '5+', label: 'Annual Keynote Events', color: 'text-magenta' },
  ];

  return (
    <section className="full-section justify-center items-center">
      <div className="max-w-5xl mx-auto px-6 text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-6 shadow-neon-violet">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>WELCOME FRESHERS CLASS OF 2026</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-6">
          YOUR JOURNEY INTO THE FUTURE <br />
          <span className="bg-gradient-to-r from-purple-400 via-magenta to-cyan-400 bg-clip-text text-transparent">
            STARTS HERE WITH SYNAPSE
          </span>
        </h2>



        <p className="font-sans text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-12 leading-relaxed">
          Welcome to campus! The Synapse Society is your premier technological hub. Whether you are building neural networks, launching web applications, or designing cyber-defense tools, we provide the mentorship, hardware, and ecosystem to unleash your potential.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => audioService.playHover()}
                className="glass-card glass-card-hover p-6 rounded-2xl border border-purple-500/20 text-center flex flex-col items-center justify-center"
              >
                <div className="p-3 rounded-2xl bg-purple-950/60 border border-purple-500/30 mb-3">
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-1">
                  {stat.value}
                </div>
                <div className="font-mono text-xs text-purple-300/80">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
