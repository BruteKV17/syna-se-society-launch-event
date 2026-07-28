import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Zap } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface SectionProps {
  onNextSection: () => void;
}

export const Section01LogoReveal: React.FC<SectionProps> = ({ onNextSection }) => {
  return (
    <section className="full-section justify-center items-center text-center overflow-hidden relative">
      <div className="absolute inset-0 bg-radial-gradient from-purple-900/30 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center"
      >
        {/* Badge Pill with Swipe Up */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-xs mb-6 shadow-neon-violet backdrop-blur-md"
        >
          <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>PREMIER TECH & AI SOCIETY</span>
        </motion.div>

        {/* Dramatic Swipe Up Headline: WELCOME TO OUR CLUB */}
        <motion.h2
          initial={{ opacity: 0, y: 80, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-cyan-300 drop-shadow-[0_0_35px_rgba(168,85,247,0.8)] mb-3"
        >
          WELCOME TO OUR CLUB
        </motion.h2>

        {/* Subtitle Swipe Up */}
        <motion.h3
          initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-lg sm:text-2xl text-purple-300 tracking-[0.2em] font-semibold mb-6"
        >
          ज्ञानस्य सेतु • THE BRIDGE OF KNOWLEDGE
        </motion.h3>

        {/* Description Swipe Up */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="font-sans text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed mb-12"
        >
          Empowering student innovators, artificial intelligence pioneers, developers, and visionaries to architect the future of technology.
        </motion.p>

        {/* Scroll CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          onClick={() => {
            audioService.playClick();
            onNextSection();
          }}
          onMouseEnter={() => audioService.playHover()}
          className="flex flex-col items-center gap-2 text-purple-400 hover:text-purple-200 transition-colors group cursor-pointer"
        >
          <span className="font-mono text-xs tracking-widest">SCROLL TO DISCOVER</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </motion.button>
      </motion.div>
    </section>
  );
};
