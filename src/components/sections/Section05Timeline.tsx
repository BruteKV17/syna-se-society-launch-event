import React from 'react';
import { History, CheckCircle2, ArrowRight } from 'lucide-react';
import { audioService } from '../../services/audioService';

export const Section05Timeline: React.FC = () => {
  const timelineSteps = [
    {
      year: '2024 - 2025',
      badge: 'GOOGLE ERA',
      title: 'Google Developer Student Club',
      desc: 'Served as an official Google Developer Student Club (GDSC) campus chapter organizing localized Android, Firebase, Cloud Study Jams, and Solution Challenges.',
      status: 'Official Google Chapter',
    },
    {
      year: '2025 - 2026',
      badge: 'REBRANDING PHASE',
      title: 'The Great Rebranding Phase',
      desc: 'Expanded beyond single-ecosystem tooling and transitioned from GDSC into an autonomous, premier multi-domain technical society — The Synapse Society.',
      status: 'Rebranding & Evolution',
    },
    {
      year: '2026 - 2027+',
      badge: 'SYNAPSE ERA',
      title: 'The Synapse Society',
      desc: 'Reborn as an autonomous, premier Tech & AI Society with physical cards, gamified XP, mission arenas, keynote launches, and industry mentorship.',
      status: 'Active Keynote Era',
    },
  ];

  return (
    <section className="full-section justify-center items-center">
      <div className="max-w-5xl mx-auto px-6 z-10 w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-3">
            <History className="w-3.5 h-3.5 text-purple-400" />
            <span>EVOLUTION CHRONICLE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-3">
            OUR HISTORICAL EVOLUTION
          </h2>
          <p className="font-sans text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            From a single tech chapter to an autonomous, multi-domain artificial intelligence society.
          </p>
        </div>

        {/* Timeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {timelineSteps.map((step, idx) => (
            <div
              key={idx}
              onMouseEnter={() => audioService.playHover()}
              className="glass-card glass-card-hover rounded-3xl p-6 border border-purple-500/25 flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-purple-300 bg-purple-950/70 px-3 py-1 rounded-full border border-purple-500/30">
                    {step.year}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30">
                    {step.badge}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="font-sans text-sm text-gray-300 leading-relaxed mb-6">{step.desc}</p>
              </div>

              <div className="pt-4 border-t border-purple-500/15 flex items-center justify-between text-xs font-mono text-purple-400">
                <span className="flex items-center gap-1.5 text-purple-200">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" /> {step.status}
                </span>
                {idx < 2 && <ArrowRight className="w-4 h-4 text-purple-400 hidden md:block" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
