import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, RotateCcw } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { SynapseLogo } from '../common/SynapseLogo';
import { LogoSequenceCanvas } from '../canvas/LogoSequenceCanvas';

interface SectionProps {
  onEnter: () => void;
  onReplayIntro?: () => void;
}

export const Section00Intro: React.FC<SectionProps> = ({ onEnter, onReplayIntro }) => {
  const [animationStage, setAnimationStage] = useState<'black' | 'logo' | 'full'>('black');
  const [key, setKey] = useState(0);

  const startAnimation = () => {
    setAnimationStage('black');
    
    // Stage 1: Pitch black (0ms - 500ms)
    const timer1 = setTimeout(() => {
      setAnimationStage('logo');
      audioService.playChimeIntro();
    }, 600);

    // Stage 2: Full UI reveal (1800ms)
    const timer2 = setTimeout(() => {
      setAnimationStage('full');
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };

  useEffect(() => {
    return startAnimation();
  }, [key]);

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioService.playClick();
    if (onReplayIntro) {
      onReplayIntro();
    } else {
      setKey((prev) => prev + 1);
    }
  };

  return (
    <section key={key} className="full-section bg-[#000000] justify-center items-center text-center overflow-hidden relative selection:bg-purple-600">
      {/* Background Radial Glow Aura (Appears when logo emerges) */}
      <AnimatePresence>
        {animationStage !== 'black' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute w-[700px] h-[700px] rounded-full bg-gradient-to-r from-purple-700/20 via-indigo-600/15 to-purple-900/20 blur-[130px] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Subtle Ambient Circuit Line Flares */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center justify-center min-h-[70vh]">
        {/* LOGO REVEAL FROM BLACK SCREEN */}
        <AnimatePresence mode="wait">
          {animationStage !== 'black' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 15, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-96 sm:w-[750px] md:w-[920px] mb-8 cursor-pointer group"
              onClick={onEnter}
            >
              {/* Pulsing Backlight Glow behind Logo */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(168,85,247,0.2)',
                    '0 0 65px rgba(168,85,247,0.5)',
                    '0 0 30px rgba(168,85,247,0.2)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-3xl pointer-events-none"
              />

              {/* Exact Synapse Society Logo */}
              <SynapseLogo
                variant="transparent"
                className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* STAGGERED HERO INTERFACE ELEMENTS */}
        {animationStage === 'full' && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col items-center"
          >
            {/* Keynote Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-xs mb-6 shadow-neon-violet backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>INITIALIZING KEYNOTE SESSION 2026</span>
            </motion.div>

            {/* Tagline / Motto */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-display text-2xl sm:text-4xl text-white font-bold max-w-2xl mx-auto mb-10 tracking-wide uppercase drop-shadow"
            >
              WELCOME TO OUR SOCIETY
            </motion.p>

            {/* Launch CTA & Replay Controls */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <button
                onClick={() => {
                  audioService.playChimeIntro();
                  audioService.toggleAmbientDrone();
                  onEnter();
                }}
                onMouseEnter={() => audioService.playHover()}
                className="btn-synapse inline-flex items-center gap-3 text-base group shadow-2xl"
              >
                <Play className="w-5 h-5 fill-white group-hover:translate-x-1 transition-transform" />
                <span>LAUNCH CINEMATIC EXPERIENCE</span>
              </button>

              <button
                onClick={handleReplay}
                onMouseEnter={() => audioService.playHover()}
                className="px-4 py-3 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 hover:text-white font-mono text-xs flex items-center gap-2 transition-all"
                title="Replay Black Screen Logo Entrance Animation"
              >
                <RotateCcw className="w-4 h-4 text-purple-400" />
                <span>REPLAY INTRO</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

