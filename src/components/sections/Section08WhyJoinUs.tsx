import React from 'react';
import { ShieldCheck, Award, Flame, Laptop, Zap, Users2 } from 'lucide-react';
import { audioService } from '../../services/audioService';

export const Section08WhyJoinUs: React.FC = () => {
  const perks = [
    {
      icon: Zap,
      title: 'Skill Development',
      desc: 'Master industry-relevant AI models, web frameworks, software architecture, and engineering principles through interactive sessions.',
    },
    {
      icon: Users2,
      title: 'Networking Opportunities',
      desc: 'Build strong connections with industry leaders, faculty mentors, tech founders, and like-minded student developers at Chandigarh University.',
    },
    {
      icon: Laptop,
      title: 'Hands-on Experience',
      desc: 'Bridge theoretical classroom knowledge with real-world application by shipping live code, hackathon builds, and embedded systems.',
    },
    {
      icon: Award,
      title: 'Grow Your Tech Portfolio',
      desc: 'Construct a standout GitHub portfolio, earn verified XP badges, and showcase production projects to top global tech recruiters.',
    },
  ];

  return (
    <section className="full-section justify-center items-center">
      <div className="max-w-5xl mx-auto px-6 z-10 w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>MEMBER ADVANTAGES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-4">
            WHY JOIN THE SYNAPSE SOCIETY?
          </h2>
          <p className="font-sans text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            We don't just host meetings. We accelerate your tech career through real perks and hardware.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {perks.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => audioService.playHover()}
                className="glass-card glass-card-hover rounded-3xl p-8 border border-purple-400/30 shadow-neon-purple relative overflow-hidden group"
              >
                <div className="w-14 h-14 rounded-2xl bg-purple-900/60 border border-purple-400/40 flex items-center justify-center text-purple-300 mb-6 group-hover:scale-110 transition-transform">
                  <IconComp className="w-7 h-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{p.title}</h3>
                <p className="font-sans text-sm text-gray-300 leading-relaxed">{p.desc}</p>

                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-purple-500/10 blur-xl pointer-events-none group-hover:bg-purple-500/20 transition-all" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
