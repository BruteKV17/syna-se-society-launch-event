import React from 'react';
import { Target, Cpu, Lightbulb, Compass } from 'lucide-react';
import { audioService } from '../../services/audioService';

export const Section03About: React.FC = () => {
  const values = [
    {
      icon: Cpu,
      title: 'Innovate',
      desc: 'Pioneering next-generation artificial intelligence, deep learning models, and advanced software architectures.',
    },
    {
      icon: Target,
      title: 'Create',
      desc: 'Transforming ideas into production code, shipping real-world projects, web applications, and cyber tools.',
    },
    {
      icon: Lightbulb,
      title: 'Lead',
      desc: 'Empowering student engineers through peer mentorship, team collaboration, hackathons, and industry networking.',
    },
  ];

  return (
    <section className="full-section justify-center items-center">
      <div className="max-w-5xl mx-auto px-6 z-10">
        <div className="text-center mb-10">
          {/* Official CU & Motto Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs shadow-neon-violet">
              <Compass className="w-3.5 h-3.5 text-purple-400" />
              <span>CHANDIGARH UNIVERSITY • THE SYNAPSE SOCIETY</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 font-mono text-xs">
              <span>“ज्ञानस्य सेतु” — The Bridge of Knowledge</span>
            </div>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-4">
            ABOUT THE CLUB
          </h2>
          <div className="text-center font-mono text-sm text-cyan-400 font-semibold mb-4 tracking-widest">
            INNOVATE • CREATE • LEAD
          </div>

          {/* Exact Poster About Description */}
          <p className="font-sans text-gray-200 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed glass-card p-6 rounded-2xl border border-purple-500/30 shadow-lg">
            "The Synapse Society is a student-driven technical community dedicated to empowering aspiring engineers through learning, innovation, collaboration, and leadership. We bridge classroom knowledge with real-world skills through hands-on learning, events, and peer growth."
          </p>

          {/* Faculty Coordinator Badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-200 font-mono text-xs shadow-md">
            <span className="text-purple-400 font-bold">Faculty Coordinator:</span>
            <span>Dr. Ajay Kumar Singh, Head, Dept. of Computer Science & Engineering</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, idx) => {
            const IconComponent = v.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => audioService.playHover()}
                className="glass-card glass-card-hover rounded-3xl p-6 border border-purple-500/20 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-900/50 border border-purple-400/40 flex items-center justify-center mb-4 text-purple-300 shadow-neon-violet">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">{v.title}</h3>
                  <p className="font-sans text-sm text-gray-300 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
