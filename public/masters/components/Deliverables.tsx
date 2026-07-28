"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle, Lightbulb, Users, Brain, Layers, TrendingUp, Rocket } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';

const deliverables = [
  { id: 1, title: 'Problem', icon: AlertTriangle, desc: 'Define the real-world challenge you are solving' },
  { id: 2, title: 'Solution', icon: Lightbulb, desc: 'Your AI-powered approach to the problem' },
  { id: 3, title: 'Target Users', icon: Users, desc: 'Who benefits from your solution?' },
  { id: 4, title: 'AI Component', icon: Brain, desc: 'How AI powers your solution' },
  { id: 5, title: 'Technology Stack', icon: Layers, desc: 'Tools and technologies you would use' },
  { id: 6, title: 'Expected Impact', icon: TrendingUp, desc: 'Measurable outcomes and improvements' },
  { id: 7, title: 'Future Scope', icon: Rocket, desc: 'Growth potential and next steps' },
];

export function Deliverables() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="deliverables" className="py-24 relative flex flex-col items-center justify-center" ref={ref}>
      <div className="container mx-auto px-4 relative z-10 max-w-6xl w-full flex flex-col items-center">
        <SectionHeader title="DELIVERABLES" subtitle="Each team must present" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {deliverables.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card group relative p-6 rounded-xl border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--purple-primary)] hover:box-glow overflow-hidden bg-[var(--bg-secondary)]"
            >
              <div className="absolute top-4 right-4 font-mono text-[var(--text-muted)] text-sm group-hover:text-[var(--purple-accent)] transition-colors">
                {String(item.id).padStart(2, '0')}
              </div>
              
              <div className="mb-4">
                <item.icon className="w-10 h-10 text-[var(--purple-secondary)] group-hover:text-[var(--purple-primary)] transition-colors" />
              </div>
              
              <h3 className="font-display text-xl mb-2 text-[var(--text-primary)] group-hover:text-glow transition-all">
                {item.title}
              </h3>
              
              <p className="font-body text-[var(--text-secondary)] text-sm leading-relaxed">
                {item.desc}
              </p>
              
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--purple-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
