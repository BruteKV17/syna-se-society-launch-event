import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Play, Calendar, Sparkles } from 'lucide-react';
import { audioService } from '../../services/audioService';

export const Section10LaunchEvent: React.FC = () => {
  // Target Launch Event: August 5, 2026 @ 5:00 PM (17:00 IST)
  const targetDate = new Date('2026-08-05T17:00:00').getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="full-section justify-center items-center py-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 z-10 text-center w-full">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 font-mono text-xs mb-4 shadow-neon-purple animate-pulse"
        >
          <Flame className="w-4 h-4 text-red-400" />
          <span>TENTATIVE LAUNCH EVENT DAY • AUGUST 5, 2026</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-6xl font-black text-white mb-4 tracking-tight"
        >
          TIME LEFT FOR OUR NEXT UPCOMING EVENT
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Prepare for the tentative Launch Event Day of The Synapse Society on August 5th — featuring live AI demonstrations, digital pass distribution, hackathon reveals, and student networking.
        </motion.p>

        {/* Live Real-Time Countdown Timer Grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto mb-10">
          {[
            { label: 'DAYS', val: timeLeft.days },
            { label: 'HOURS', val: timeLeft.hours },
            { label: 'MINUTES', val: timeLeft.minutes },
            { label: 'SECONDS', val: timeLeft.seconds },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              className="glass-card rounded-2xl p-4 sm:p-6 border border-purple-500/30 text-center shadow-neon-violet group hover:border-purple-400/60 transition-all"
            >
              <div className="font-display font-extrabold text-3xl sm:text-6xl text-white mb-1 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                {String(item.val).padStart(2, '0')}
              </div>
              <div className="font-mono text-[10px] sm:text-xs text-purple-300/90 tracking-widest font-bold">{item.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Launch Event Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-purple-400/40 relative overflow-hidden max-w-3xl mx-auto shadow-neon-purple text-left"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-magenta/10 to-indigo-900/30 pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-300 font-bold mb-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>TENTATIVE SYNAPSE LAUNCH EVENT DAY</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">Experience The Bridge of Knowledge</h3>
              <p className="font-sans text-xs sm:text-sm text-gray-300 mt-2">
                Main Auditorium, Chandigarh University • August 5, 2026 @ 5:00 PM
              </p>
            </div>
            <button
              onClick={() => audioService.playSuccess()}
              onMouseEnter={() => audioService.playHover()}
              className="btn-synapse shrink-0 inline-flex items-center gap-2 text-sm cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>RSVP FOR LAUNCH EVENT</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
