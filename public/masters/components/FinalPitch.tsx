"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export function FinalPitch() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 120, // Spread slightly wider than 100vw
      y: (Math.random() - 0.5) * 120,
      delay: Math.random() * 0.8,
      duration: 1 + Math.random() * 2.5,
    }));
    setParticles(newParticles);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="finale" className="relative min-h-screen flex flex-col items-center justify-center bg-bg-primary overflow-hidden">
      {/* Background radial burst */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.15 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute w-[150vw] h-[150vw] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-purple-primary) 0%, transparent 60%)',
        }}
      />

      {/* Hexagon decoration */}
      <motion.div
        initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
        whileInView={{ opacity: 0.05, rotate: 0, scale: 1.2 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute w-[800px] h-[800px] flex items-center justify-center pointer-events-none"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[var(--color-purple-primary)] stroke-[0.5]">
          <polygon points="50 1 93 25 93 75 50 99 7 75 7 25" />
        </svg>
      </motion.div>

      {/* Particles */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-[3px] h-[3px] md:w-1 md:h-1 bg-[var(--color-purple-accent)] rounded-full shadow-[0_0_8px_var(--color-purple-accent)]"
            variants={{
              hidden: { opacity: 0, x: 0, y: 0, scale: 0 },
              visible: { 
                opacity: [0, 1, 0],
                x: `${p.x}vw`,
                y: `${p.y}vh`,
                scale: [0, 1.5, 0],
                transition: { 
                  duration: p.duration,
                  delay: p.delay,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2
                }
              }
            }}
          />
        ))}
      </motion.div>

      {/* Text Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="z-10 flex flex-col items-center text-center space-y-8 px-4"
      >
        <motion.h1 
          variants={itemVariants}
          className="font-display text-5xl md:text-8xl lg:text-9xl font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-purple-secondary)] to-[var(--color-purple-accent)] drop-shadow-[0_0_30px_var(--color-purple-secondary)] pb-2"
        >
          Mission Complete
        </motion.h1>

        <motion.p variants={itemVariants} className="font-mono text-2xl md:text-4xl lg:text-5xl text-[var(--color-success)] drop-shadow-[0_0_10px_var(--color-success)]">
          &gt; System Restored_
        </motion.p>

        <motion.p variants={itemVariants} className="font-mono text-xl md:text-3xl lg:text-4xl text-text-primary">
          Synapse Network Online
        </motion.p>

        <motion.p variants={itemVariants} className="font-display text-3xl md:text-5xl lg:text-6xl text-[var(--color-purple-accent)] font-semibold mt-12 tracking-wide drop-shadow-[0_0_15px_var(--color-purple-accent)]">
          Congratulations Agents
        </motion.p>

        <motion.p variants={itemVariants} className="font-body text-base md:text-xl text-text-secondary italic mt-4 opacity-70">
          This is only Level 1.
        </motion.p>
      </motion.div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 3, duration: 1.2, ease: "easeOut" }}
        className="absolute bottom-12 z-10 w-full text-center px-4"
      >
        <p className="font-display text-xs md:text-sm lg:text-base text-text-muted tracking-[0.3em] md:tracking-[0.5em] uppercase">
          SYNAPSE SOCIETY — Learn. Build. Innovate. Grow.
        </p>
      </motion.div>
    </section>
  );
}
