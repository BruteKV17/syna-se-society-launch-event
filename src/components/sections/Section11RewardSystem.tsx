import React from 'react';
import { Award, QrCode, TrendingUp, Gift, ArrowRight } from 'lucide-react';
import { audioService } from '../../services/audioService';

export const Section11RewardSystem: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'ATTEND EVENTS & MISSIONS',
      desc: 'Scan your physical or digital QR card at workshops, hackathons, and interactive mission arenas.',
      icon: QrCode,
      color: 'text-purple-400',
    },
    {
      step: '02',
      title: 'EARN VERIFIED XP',
      desc: 'XP is instantly awarded to your blockchain-style student profile log (+250 XP per event).',
      icon: TrendingUp,
      color: 'text-cyan-400',
    },
    {
      step: '03',
      title: 'LEVEL UP PROFILE TIER',
      desc: 'Unlock new character tiers (Novice → Architect) with distinct holographic card aesthetics.',
      icon: Award,
      color: 'text-magenta',
    },
    {
      step: '04',
      title: 'REDEEM MERCH & PERKS',
      desc: 'Redeem T-Shirts, Hoodies, GPU cloud compute credits, and VIP hackathon slots.',
      icon: Gift,
      color: 'text-amber-400',
    },
  ];

  return (
    <section className="full-section justify-center items-center">
      <div className="max-w-6xl mx-auto px-6 z-10 w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-3">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span>GAMIFIED REWARD LOOP</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-4">
            HOW THE SYNAPSE XP SYSTEM WORKS
          </h2>
          <p className="font-sans text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            A seamless four-step gamification loop rewarding active student participation and engineering excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((st, idx) => {
            const IconComp = st.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => audioService.playHover()}
                className="glass-card glass-card-hover rounded-3xl p-6 border border-purple-500/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono font-bold text-2xl text-purple-500/50">{st.step}</span>
                    <div className="p-3 rounded-2xl bg-purple-950/60 border border-purple-500/30">
                      <IconComp className={`w-6 h-6 ${st.color}`} />
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-2">{st.title}</h3>
                  <p className="font-sans text-xs text-gray-300 leading-relaxed">{st.desc}</p>
                </div>

                {idx < 3 && <ArrowRight className="w-4 h-4 text-purple-400/40 mt-4 hidden md:block" />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
