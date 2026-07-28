"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { GlowButton } from "./ui/GlowButton";
import Image from "next/image";

export function HeroSection() {
  const handleScrollToMission = () => {
    const el = document.getElementById("mission-brief");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const FloatingShape = ({ delay, x, y, size, rotate }: { delay: number, x: string, y: string, size: number, rotate: number }) => (
    <motion.div
      className="absolute border border-purple-primary/20 opacity-30 pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        y: ["0%", "-30%", "0%"],
        rotate: [0, rotate, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    />
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingShape delay={0} x="10%" y="20%" size={60} rotate={180} />
        <FloatingShape delay={2} x="80%" y="15%" size={40} rotate={-180} />
        <FloatingShape delay={5} x="15%" y="70%" size={80} rotate={90} />
        <FloatingShape delay={1} x="85%" y="80%" size={50} rotate={-90} />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6 relative">
          <div className="relative w-[300px] h-auto flex justify-center">
            {/* Using a regular img tag to easily apply drop-shadow filter without Next Image constraints */}
            <img 
              src="/logo.png" 
              alt="Synapse Society Logo" 
              className="w-full max-w-[300px] h-auto drop-shadow-[0_0_20px_rgba(138,43,226,0.7)]" 
            />
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-2">
          <span className="font-display uppercase text-sm tracking-[0.3em] text-purple-accent font-bold">
            MISSION:
          </span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-br from-white via-purple-accent to-purple-primary text-glow-strong">
          AI INNOVATION SPRINT
        </motion.h1>

        <motion.p variants={itemVariants} className="font-body text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl">
          Think Like an Innovator. Build Like an Engineer.
        </motion.p>

        <motion.div variants={itemVariants}>
          <GlowButton onClick={handleScrollToMission} className="text-lg py-4 px-8">
            INITIALIZE MISSION ▶
          </GlowButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
