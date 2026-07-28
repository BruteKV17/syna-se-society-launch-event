import React from 'react';
import { QrCode, Sparkles, MessageSquare, Instagram, Github } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface SectionProps {
  onUserDataChanged?: () => void;
  onOpenProfile?: () => void;
}

export const Section24JoinSynapse: React.FC<SectionProps> = () => {
  return (
    <section className="full-section justify-center items-center py-12 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-purple-950/40 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 z-10 w-full text-center">
        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-900/50 border border-cyan-500/40 text-cyan-300 font-mono text-xs mb-4 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          <QrCode className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>SCAN TO JOIN THE SYNAPSE SOCIETY</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">
          SCAN TO CONNECT WITH US
        </h2>

        <p className="font-sans text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Scan the QR code below using your mobile camera to instantly access official community portals, hackathons, workshops & tech links.
        </p>

        {/* Big Scanner Card Container */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border-2 border-cyan-500/50 shadow-[0_0_60px_rgba(6,182,212,0.4)] max-w-lg mx-auto flex flex-col items-center relative overflow-hidden group">
          {/* Subtle Ambient Scanner Sweep Overlay */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06B6D4] animate-pulse" />

          {/* Big QR Code Display Box */}
          <div className="p-4 bg-white rounded-3xl border-4 border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.6)] mb-6 max-w-[280px] sm:max-w-[340px] w-full transition-transform duration-300 hover:scale-[1.03]">
            <img
              src="/synapse-qr-code.png"
              alt="Synapse Society Official Scanner QR Code"
              className="w-full h-auto object-contain rounded-2xl"
            />
          </div>

          <div className="font-mono text-sm sm:text-base text-cyan-300 font-bold tracking-wider mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" /> OFFICIAL SYNAPSE SCANNER
          </div>

          <p className="font-mono text-xs text-purple-200/90 mb-6">
            EVENTS • WORKSHOPS • HACKATHONS • ALL LINKS IN ONE PLACE
          </p>

          {/* Social Quick Links Row */}
          <div className="flex items-center justify-center gap-4 flex-wrap w-full pt-6 border-t border-purple-500/30">
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => audioService.playHover()}
              className="px-4 py-2 rounded-full bg-purple-950/60 hover:bg-purple-900/80 border border-indigo-500/40 text-indigo-300 hover:text-white font-mono text-xs flex items-center gap-2 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-indigo-400" /> DISCORD
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => audioService.playHover()}
              className="px-4 py-2 rounded-full bg-purple-950/60 hover:bg-purple-900/80 border border-pink-500/40 text-pink-300 hover:text-white font-mono text-xs flex items-center gap-2 transition-all"
            >
              <Instagram className="w-4 h-4 text-pink-400" /> INSTAGRAM
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => audioService.playHover()}
              className="px-4 py-2 rounded-full bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-200 hover:text-white font-mono text-xs flex items-center gap-2 transition-all"
            >
              <Github className="w-4 h-4 text-white" /> GITHUB
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
