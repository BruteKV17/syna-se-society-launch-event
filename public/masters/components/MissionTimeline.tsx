"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FileText, Brain, Code, Mic, Award } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { GlassCard } from './ui/GlassCard';

const TIMELINE_STEPS = [
  {
    title: 'MISSION BRIEF',
    description: 'Receive your classified mission parameters',
    icon: FileText,
  },
  {
    title: 'BRAINSTORM',
    description: 'Neural network ideation phase',
    icon: Brain,
  },
  {
    title: 'PROTOTYPE',
    description: 'Build your AI-powered solution',
    icon: Code,
  },
  {
    title: 'PITCH',
    description: 'Present to the evaluation board',
    icon: Mic,
  },
  {
    title: 'EVALUATION',
    description: 'Scoring and final assessment',
    icon: Award,
  },
];

export function MissionTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="timeline" className="py-24 relative overflow-hidden flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 relative z-10 max-w-5xl w-full">
        <SectionHeader title="MISSION TIMELINE" />
        
        <div className="mt-16 relative">
          {/* Background Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-secondary -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 right-0 origin-top bg-purple-primary shadow-[0_0_15px_#8A2BE2]"
              style={{ 
                height: "100%",
                scaleY: springProgress 
              }}
            />
          </div>

          <div className="space-y-12">
            {TIMELINE_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;
              
              return (
                <div key={index} className="relative flex items-center justify-between flex-col md:flex-row min-h-[100px]">
                  {/* Timeline Node Content */}
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:text-right md:pr-12 md:order-1' : 'md:text-left md:pl-12 md:order-3'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <GlassCard className="p-6 relative group overflow-hidden glass-card-hover text-left md:text-inherit">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <h3 className="font-display text-xl font-bold text-white mb-2 tracking-wider group-hover:text-purple-accent transition-colors">
                          {step.title}
                        </h3>
                        <p className="font-body text-text-secondary">
                          {step.description}
                        </p>
                      </GlassCard>
                    </motion.div>
                  </div>

                  {/* Icon Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-bg-primary border-2 border-purple-primary box-glow z-10">
                    <Icon className="w-5 h-5 text-purple-accent" />
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className={`hidden md:block w-[45%] ${isEven ? 'md:order-3' : 'md:order-1'}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
