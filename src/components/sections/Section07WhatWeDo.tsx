import React from 'react';
import { Cpu, ShieldAlert, Code2, Cpu as IoTIcon, Palette, Layers, Terminal } from 'lucide-react';
import { audioService } from '../../services/audioService';

export const Section07WhatWeDo: React.FC = () => {
  const pillars = [
    {
      icon: Terminal,
      name: 'Tech Workshops & Seminars',
      desc: 'Hands-on interactive learning sessions on Artificial Intelligence, Web Development, Cloud Infrastructure, and Cyber Security.',
      gradient: 'from-purple-500 to-indigo-600',
    },
    {
      icon: Code2,
      name: 'Hackathons & Competitions',
      desc: 'High-intensity coding battles, prompt engineering arenas, and CTF cybersecurity hackathons to test real-world problem solving.',
      gradient: 'from-cyan-400 to-blue-600',
    },
    {
      icon: Layers,
      name: 'Industry Networking',
      desc: 'Connecting members directly with tech leaders, alumni, senior engineers, and startup founders for mentorship & careers.',
      gradient: 'from-magenta to-purple-600',
    },
    {
      icon: Cpu,
      name: 'Project Collaborations',
      desc: 'Student-led open source software and hardware innovation labs building production-grade web apps, AI tools, and IoT devices.',
      gradient: 'from-emerald-400 to-teal-600',
    },
  ];

  return (
    <section className="full-section justify-center items-center">
      <div className="max-w-6xl mx-auto px-6 z-10 w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-3 shadow-neon-violet">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>CORE ACTIVITIES & INITIATIVES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-4">
            WHAT WE DO
          </h2>
          <p className="font-sans text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Empowering students at Chandigarh University through 4 core technical pillars designed to bridge classroom learning with industry production.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pil, idx) => {
            const IconComponent = pil.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => audioService.playHover()}
                className="glass-card glass-card-hover rounded-3xl p-6 border border-purple-500/20 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${pil.gradient} p-3 text-white mb-5 shadow-lg flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{pil.name}</h3>
                  <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed">{pil.desc}</p>
                </div>

                <div className="mt-6 pt-3 border-t border-purple-500/15 flex items-center justify-between text-[10px] font-mono text-purple-400">
                  <span>PILLAR 0{idx + 1}</span>
                  <span className="text-cyan-400 font-bold">CORE ACTIVITY</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
