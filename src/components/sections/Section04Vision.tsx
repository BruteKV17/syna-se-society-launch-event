import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Sparkles, BookOpen, Lightbulb, Crown, HeartHandshake, ArrowRight, Activity } from 'lucide-react';
import { audioService } from '../../services/audioService';

export const Section04Vision: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number>(0);

  const nodes = [
    {
      id: 0,
      title: 'KNOWLEDGE',
      subtitle: 'Continuous Technical Learning',
      desc: 'Mastering algorithm design, machine learning models, system architecture, and cutting-edge software development methodologies at Chandigarh University.',
      icon: BookOpen,
      color: 'from-purple-500 via-indigo-500 to-purple-700',
      borderColor: 'border-purple-500/50',
      glowColor: 'shadow-[0_0_30px_rgba(168,85,247,0.4)]',
      textColor: 'text-purple-400',
      stat: '100% Mastery Track',
    },
    {
      id: 1,
      title: 'INNOVATION',
      subtitle: 'Building Without Boundaries',
      desc: 'Transforming wild hackathon concepts into production products, open-source libraries, AI agents, and patent-ready tech solutions.',
      icon: Lightbulb,
      color: 'from-cyan-400 via-blue-500 to-cyan-600',
      borderColor: 'border-cyan-500/50',
      glowColor: 'shadow-[0_0_30px_rgba(34,211,238,0.4)]',
      textColor: 'text-cyan-400',
      stat: '7+ Production Shipped',
    },
    {
      id: 2,
      title: 'LEADERSHIP',
      subtitle: 'Empowering Future Founders',
      desc: 'Cultivating engineering managers, team leads, and visionary tech founders ready to lead high-impact engineering squads worldwide.',
      icon: Crown,
      color: 'from-amber-400 via-orange-500 to-amber-600',
      borderColor: 'border-amber-500/50',
      glowColor: 'shadow-[0_0_30px_rgba(251,191,36,0.4)]',
      textColor: 'text-amber-400',
      stat: '15+ Active Leads',
    },
    {
      id: 3,
      title: 'IMPACT',
      subtitle: 'Societal & Campus Growth',
      desc: 'Creating software that simplifies student life, solves real societal challenges, and elevates career trajectories for everyone in the society.',
      icon: HeartHandshake,
      color: 'from-magenta via-pink-500 to-purple-600',
      borderColor: 'border-pink-500/50',
      glowColor: 'shadow-[0_0_30px_rgba(224,134,255,0.4)]',
      textColor: 'text-magenta',
      stat: '5+ Annual Events',
    },
  ];

  return (
    <section className="full-section justify-center items-center relative overflow-hidden py-8">
      {/* Background Animated Glowing Energy Rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
        <div className="w-[600px] h-[600px] rounded-full border border-purple-500/20 animate-spin-slow" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-cyan-500/20 animate-reverse-spin" />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center z-10 w-full">
        {/* Top Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-4 shadow-neon-violet"
        >
          <Network className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>CHANDIGARH UNIVERSITY • “ज्ञानस्य सेतु” — THE BRIDGE OF KNOWLEDGE</span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight"
        >
          OUR FOUR PILLARS OF EXCELLENCE
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Click any card below to explore how Synapse connects Knowledge, Innovation, Leadership & Impact.
        </motion.p>

        {/* Staggered Card-by-Card Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {nodes.map((node, idx) => {
            const IconComp = node.icon;
            const isActive = activeNode === node.id;

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05, y: -6 }}
                onClick={() => {
                  audioService.playClick();
                  setActiveNode(node.id);
                }}
                onMouseEnter={() => audioService.playHover()}
                className={`p-6 rounded-3xl border transition-all cursor-pointer text-left flex flex-col justify-between h-48 relative overflow-hidden ${
                  isActive
                    ? `glass-card ${node.borderColor} ${node.glowColor} bg-purple-950/70 border-2`
                    : `bg-purple-950/30 border-purple-500/20 hover:border-purple-400/40 hover:bg-purple-900/30`
                }`}
              >
                {/* Active Glowing Flare */}
                {isActive && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 pointer-events-none"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Card Icon & Pulse Badge */}
                <div className="flex items-center justify-between relative z-10">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${node.color} text-white flex items-center justify-center shadow-lg`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  {isActive ? (
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400" />
                    </span>
                  ) : (
                    <Sparkles className="w-4 h-4 text-purple-400/40" />
                  )}
                </div>

                {/* Card Labels */}
                <div className="relative z-10 mt-4">
                  <div className="font-mono text-[10px] text-purple-300/80 mb-1 flex items-center gap-1">
                    <Activity className="w-3 h-3 text-cyan-400" />
                    <span>PILLAR 0{node.id + 1}</span>
                  </div>
                  <div className={`font-display font-extrabold text-lg sm:text-xl tracking-wide ${node.textColor}`}>
                    {node.title}
                  </div>
                  <div className="font-mono text-[11px] text-gray-300/70 mt-1 font-semibold">
                    {node.stat}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Animated Inspector Panel for Selected Pillar */}
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/40 text-left relative overflow-hidden shadow-2xl backdrop-blur-xl"
            >
              {/* Background Accent Gradient Beam */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${nodes[activeNode].color}`} />

              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 font-mono text-xs text-purple-200 border border-purple-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{nodes[activeNode].subtitle}</span>
                </div>
                <div className="font-mono text-xs text-cyan-300 font-bold bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
                  {nodes[activeNode].stat}
                </div>
              </div>

              <h3 className={`font-display text-2xl sm:text-3xl font-extrabold mb-3 ${nodes[activeNode].textColor}`}>
                {nodes[activeNode].title} PILLAR
              </h3>

              <p className="font-sans text-gray-200 text-sm sm:text-base leading-relaxed max-w-3xl mb-6">
                {nodes[activeNode].desc}
              </p>

              <div className="flex items-center gap-2 text-xs font-mono text-purple-300/90 pt-4 border-t border-purple-500/20">
                <ArrowRight className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>INNOVATE • CREATE • LEAD • CHANDIGARH UNIVERSITY</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
