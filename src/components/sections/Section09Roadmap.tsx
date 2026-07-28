import React, { useState } from 'react';
import { Milestone, ChevronRight, CheckCircle } from 'lucide-react';
import { audioService } from '../../services/audioService';

export const Section09Roadmap: React.FC = () => {
  const [activeQuarter, setActiveQuarter] = useState<number>(0);

  const quarters = [
    {
      quarter: 'Q1 2026',
      title: 'FOUNDATION & ORIENTATION',
      milestones: [
        'Fresher Recruitment & Card Issuance',
        'Keynote Launch Event 2026',
        'Intro to AI Prompt Engineering Workshop',
        'Git & Open Source Jam',
      ],
      xpTarget: '1,000 XP Goal',
    },
    {
      quarter: 'Q2 2026',
      title: 'BUILD & HACKATHON ARENA',
      milestones: [
        '24-Hour Campus Hackathon (HackSynapse v3)',
        'Cyber Security Cryptic Challenge',
        'Web3 & Smart Contract Bootcamp',
        'GPU Cluster Access Rollout',
      ],
      xpTarget: '2,500 XP Goal',
    },
    {
      quarter: 'Q3 2026',
      title: 'AI INVENTIONS & EXPO',
      milestones: [
        'Agentic AI Hackathon with Google Cloud',
        'IoT Hardware Prototype Exhibition',
        'Inter-College Tech Olympiad',
        'Student Startup Incubator Launch',
      ],
      xpTarget: '4,000 XP Goal',
    },
    {
      quarter: 'Q4 2026',
      title: 'SYNAPSE GRAND FINALE',
      milestones: [
        'Annual Society Homecoming & Gala',
        'Leaderboard Champion Crowning',
        'Merchandise XP Store Redemptions',
        'Placement & Internship Referral Fair',
      ],
      xpTarget: '5,000+ XP Master',
    },
  ];

  return (
    <section className="full-section justify-center items-center">
      <div className="max-w-5xl mx-auto px-6 z-10 w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-3">
            <Milestone className="w-3.5 h-3.5 text-purple-400" />
            <span>ANNUAL STRATEGIC ROADMAP</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-4">
            FUTURE ROADMAP 2026
          </h2>
          <p className="font-sans text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            Click across quarters to inspect planned workshops, hackathons, and XP milestones.
          </p>
        </div>

        {/* Quarter Nav Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {quarters.map((q, idx) => {
            const isActive = activeQuarter === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  audioService.playClick();
                  setActiveQuarter(idx);
                }}
                onMouseEnter={() => audioService.playHover()}
                className={`p-4 rounded-2xl font-mono text-xs text-left transition-all border ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold border-purple-400 shadow-neon-purple scale-105'
                    : 'bg-purple-950/30 text-purple-300 hover:bg-purple-900/40 border-purple-500/20'
                }`}
              >
                <div className="text-[10px] text-purple-200/70 mb-1">{q.quarter}</div>
                <div className="font-bold text-sm tracking-wider">{q.title.split(' ')[0]}</div>
              </button>
            );
          })}
        </div>

        {/* Active Quarter Details */}
        <div className="glass-card rounded-3xl p-8 border border-purple-500/30">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-500/20">
            <div>
              <span className="font-mono text-xs text-purple-400 font-bold">{quarters[activeQuarter].quarter}</span>
              <h3 className="font-display text-2xl font-bold text-white">{quarters[activeQuarter].title}</h3>
            </div>
            <div className="px-4 py-1.5 rounded-full bg-purple-900/60 border border-purple-400/30 font-mono text-xs text-cyan-300 font-bold">
              {quarters[activeQuarter].xpTarget}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quarters[activeQuarter].milestones.map((m, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-sans text-sm text-purple-100">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
