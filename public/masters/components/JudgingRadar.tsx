"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeader } from './ui/SectionHeader';

const criteria = [
  { name: 'Creativity', value: 85 },
  { name: 'Innovation', value: 90 },
  { name: 'Practicality', value: 75 },
  { name: 'AI Integration', value: 88 },
  { name: 'Technical Thinking', value: 80 },
  { name: 'Presentation', value: 85 }
];

export function JudgingRadar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const size = 400;
  const center = size / 2;
  const radius = (size / 2) * 0.65;
  const angleStep = (Math.PI * 2) / criteria.length;

  const getPoint = (value: number, index: number) => {
    const r = (value / 100) * radius;
    const x = center + r * Math.sin(index * angleStep);
    const y = center - r * Math.cos(index * angleStep);
    return { x, y };
  };

  const dataPoints = criteria.map((c, i) => getPoint(c.value, i));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  const levels = [33, 66, 100];
  
  return (
    <section id="judging" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[var(--purple-primary)]/5 opacity-50 blur-[100px] pointer-events-none rounded-full max-w-[600px] max-h-[600px] mx-auto top-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader title="EVALUATION MATRIX" subtitle="Judging criteria breakdown" />
        
        <div className="flex justify-center mt-16 relative">
          <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="max-w-[400px]">
            {levels.map((level, levelIndex) => {
              const levelPoints = criteria.map((_, i) => getPoint(level, i));
              const path = levelPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
              return (
                <motion.path
                  key={`level-${level}`}
                  d={path}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.8, delay: levelIndex * 0.2 }}
                  style={{ transformOrigin: 'center' }}
                />
              );
            })}

            {criteria.map((_, i) => {
              const p = getPoint(100, i);
              return (
                <motion.line
                  key={`axis-${i}`}
                  x1={center}
                  y1={center}
                  x2={p.x}
                  y2={p.y}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              );
            })}

            <motion.path
              d={dataPath}
              fill="rgba(138,43,226,0.3)"
              stroke="var(--purple-primary)"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 1, delay: 0.8, type: "spring" }}
              style={{ transformOrigin: 'center' }}
            />

            {dataPoints.map((p, i) => (
              <motion.circle
                key={`point-${i}`}
                cx={p.x}
                cy={p.y}
                r="4"
                fill="var(--purple-accent)"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, delay: 1.5 + i * 0.1 }}
                style={{ filter: 'drop-shadow(0 0 4px var(--purple-accent))' }}
              />
            ))}

            {criteria.map((c, i) => {
              const labelRadius = radius * 1.35;
              const x = center + labelRadius * Math.sin(i * angleStep);
              const y = center - labelRadius * Math.cos(i * angleStep);
              
              return (
                <motion.text
                  key={`label-${i}`}
                  x={x}
                  y={y}
                  fill="var(--text-secondary)"
                  fontSize="12"
                  fontFamily="var(--font-display)"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                  className="uppercase tracking-wider text-[10px] md:text-xs"
                >
                  {c.name}
                </motion.text>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
