import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Sparkles } from 'lucide-react';
import { UserProfile } from '../../types';
import { audioService } from '../../services/audioService';

interface SectionProps {
  user: UserProfile;
  onOpenProfile: () => void;
}

export const Section15DigitalProfileMock: React.FC<SectionProps> = ({ user, onOpenProfile }) => {
  return (
    <section className="full-section justify-center items-center py-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 z-10 w-full text-center">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-3 shadow-neon-violet"
        >
          <QrCode className="w-3.5 h-3.5 text-purple-400" />
          <span>DIGITAL IDENTITY & PASS SYSTEM</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-3"
        >
          YOUR DIGITAL SYNAPSE PASS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-8"
        >
          Every member is assigned a unique digital QR pass card that tracks XP, event attendance, and unlocked level achievements.
        </motion.p>

        {/* Uploaded Digital Pass Card Display Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => {
            audioService.playClick();
            onOpenProfile();
          }}
          onMouseEnter={() => audioService.playHover()}
          className="glass-card rounded-3xl p-3 sm:p-4 border-2 border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.35)] cursor-pointer group max-w-4xl mx-auto relative overflow-hidden transition-all hover:scale-[1.01]"
        >
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="/digital-synapse-pass.jpg"
              alt="The Synapse Society Digital Member Pass"
              className="w-full h-auto object-contain rounded-2xl drop-shadow-2xl"
            />

            {/* Subtle Neon Glow Edge Highlight */}
            <div className="absolute inset-0 rounded-2xl border border-purple-400/30 pointer-events-none group-hover:border-purple-400/60 transition-colors" />
          </div>

          {/* Interactive Overlay Bar */}
          <div className="mt-3 flex items-center justify-between px-4 py-2 rounded-xl bg-purple-950/60 border border-purple-500/20 text-xs font-mono text-purple-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>CLICK TO INTERACT WITH PROFILE HUD</span>
            </div>
            <span className="text-cyan-300 font-bold">SYNAPSE ID: SYN-23-0587</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
