"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, Clock, ChevronDown, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { GlassCard } from './ui/GlassCard';

const PROBLEMS = [
  {
    id: 'nexus',
    icon: GraduationCap,
    codeName: 'PROJECT NEXUS',
    title: 'SMART CAMPUS AI ASSISTANT',
    shortDesc: 'Design an AI-powered assistant that improves the campus experience for students and faculty.',
    fullDesc: 'Your mission is to architect an intelligent campus assistant that seamlessly integrates with university systems to provide real-time, context-aware support to both students and faculty members. The system should streamline daily academic and administrative tasks.',
    features: ['Navigation', 'Attendance', 'Timetable', 'Doubt solving', 'Event recommendations', 'Emergency support', 'Resource discovery'],
    colorClass: 'text-purple-primary',
    bgClass: 'bg-purple-primary',
    borderClass: 'border-purple-primary',
    glowClass: 'shadow-[0_0_20px_rgba(138,43,226,0.3)]',
  },
  {
    id: 'cortex',
    icon: BookOpen,
    codeName: 'PROJECT CORTEX',
    title: 'AI FOR RESEARCH PRODUCTIVITY',
    shortDesc: 'Design an AI platform that helps researchers save time, organise knowledge and improve academic productivity.',
    fullDesc: 'Your mission is to develop a comprehensive AI research companion that accelerates the pace of academic discovery. The platform must assist researchers in navigating vast amounts of literature, synthesizing complex information, and structuring their research methodology.',
    features: ['Paper summarisation', 'Literature review', 'Citation generation', 'Research roadmap', 'Experiment planner', 'Presentation generator', 'Notebook integration'],
    colorClass: 'text-purple-secondary',
    bgClass: 'bg-purple-secondary',
    borderClass: 'border-purple-secondary',
    glowClass: 'shadow-[0_0_20px_rgba(181,76,255,0.3)]',
  }
];

const JUDGING_CRITERIA = ['Creativity', 'Innovation', 'Practicality', 'AI Integration', 'Technical Thinking', 'Presentation'];

export function ProblemStatements() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="problems" className="py-24 relative overflow-hidden flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 relative z-10 max-w-6xl w-full flex flex-col items-center">
        <SectionHeader 
          title="PROBLEM STATEMENTS" 
          subtitle="Select your mission objective" 
        />
        
        <div className="mt-16 flex flex-col lg:flex-row gap-8 items-stretch justify-center w-full max-w-5xl mx-auto">
          {PROBLEMS.map((problem) => {
            const isExpanded = expandedId === problem.id;
            const Icon = problem.icon;
            
            return (
              <motion.div
                key={problem.id}
                layout
                className={`w-full transition-all duration-500 ease-in-out ${isExpanded ? 'lg:flex-[1.8]' : 'lg:flex-1'} ${expandedId && !isExpanded ? 'lg:opacity-50 lg:scale-95' : ''}`}
                onClick={() => setExpandedId(isExpanded ? null : problem.id)}
              >
                <GlassCard 
                  className={`relative overflow-hidden cursor-pointer transition-all duration-300
                    ${isExpanded ? `border ${problem.borderClass} ${problem.glowClass}` : 'hover:border-purple-primary/50'}
                  `}
                >
                  <motion.div layout className="p-6 md:p-8 space-y-6">
                    {/* Header Section */}
                    <motion.div layout className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-secondary/80 border border-border-subtle ${problem.colorClass}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <motion.div layout className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-bold tracking-widest text-text-muted">
                            CODE NAME:
                          </span>
                          <span className={`font-mono text-xs font-bold tracking-widest ${problem.colorClass}`}>
                            {problem.codeName}
                          </span>
                        </motion.div>
                        <motion.h3 layout className="font-display text-2xl font-bold text-white tracking-wide">
                          {problem.title}
                        </motion.h3>
                      </div>
                      <motion.div 
                        layout
                        initial={false}
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="text-text-muted"
                      >
                        <ChevronDown className="w-6 h-6" />
                      </motion.div>
                    </motion.div>

                    {/* Short Description (Always visible) */}
                    <motion.p layout className="font-body text-text-secondary text-lg">
                      {problem.shortDesc}
                    </motion.p>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="space-y-8 overflow-hidden"
                        >
                          <div className="h-px w-full bg-border-subtle" />
                          
                          <p className="font-body text-text-primary leading-relaxed">
                            {problem.fullDesc}
                          </p>

                          <div>
                            <h4 className="font-mono text-sm font-semibold text-text-muted mb-4 uppercase tracking-wider">
                              Key Features Required
                            </h4>
                            <div className="flex flex-wrap gap-3">
                              {problem.features.map((feature, idx) => (
                                <motion.span
                                  key={idx}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: idx * 0.05 + 0.2 }}
                                  className={`px-4 py-2 rounded-full text-sm font-body bg-secondary border border-border-subtle text-text-secondary`}
                                >
                                  {feature}
                                </motion.span>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row gap-8 p-6 bg-secondary/30 rounded-xl border border-border-subtle">
                            <div className="flex-1">
                              <h4 className="font-mono text-sm font-semibold text-text-muted mb-4 uppercase tracking-wider">
                                Evaluation Criteria
                              </h4>
                              <div className="grid grid-cols-2 gap-3">
                                {JUDGING_CRITERIA.map((criteria, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <CheckCircle2 className={`w-4 h-4 ${problem.colorClass}`} />
                                    <span className="font-body text-sm text-text-secondary">{criteria}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-center justify-center p-6 bg-primary rounded-lg border border-border-subtle min-w-[150px]">
                              <Clock className="w-6 h-6 text-warning mb-2" />
                              <span className="font-display text-2xl font-bold text-white text-glow-strong">
                                15:00
                              </span>
                              <span className="font-mono text-xs text-text-muted mt-1 uppercase tracking-wider">
                                Pitch Time
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
