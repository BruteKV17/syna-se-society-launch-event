import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Crown,
  ShieldCheck,
  Award,
  Sparkles,
  UserCheck,
  ChevronDown,
  Cpu,
  Layers,
  Video,
  Palette,
  FileText,
  Calendar,
  Megaphone,
  Users,
  Grid,
} from 'lucide-react';
import { audioService } from '../../services/audioService';

export const Section03bLeadership: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'exec' | 'heads' | 'depts' | 'members'>('all');

  const deptLeads = [
    { title: 'TECH HEAD', name: 'Ayush Kumar Singh', icon: Cpu, color: 'text-cyan-400', border: 'border-cyan-500/40', bg: 'bg-cyan-950/40', image: '/leadership/ayush-kumar-singh-tech-head.jpg' },
    { title: 'PROJECT SUPERVISOR', name: 'Vansh Kumar Chandel', icon: Layers, color: 'text-purple-400', border: 'border-purple-500/40', bg: 'bg-purple-950/40', image: '/leadership/vansh-kumar-chandel.jpg' },
    { title: 'MEDIA HEAD', name: 'Vaishnavi Srivastava', icon: Video, color: 'text-magenta', border: 'border-pink-500/40', bg: 'bg-pink-950/40', image: '/leadership/vaishnavi-srivastava-media-head.png' },
    { title: 'DESIGN HEAD', name: 'Kishan Verma', icon: Palette, color: 'text-amber-400', border: 'border-amber-500/40', bg: 'bg-amber-950/40', image: '/leadership/kishan-verma-design-head.jpg' },
    { title: 'CONTENT HEAD', name: 'Vaishnavi Gupta', icon: FileText, color: 'text-emerald-400', border: 'border-emerald-500/40', bg: 'bg-emerald-950/40', image: '/leadership/vaishnavi-gupta-content-head.png' },
    { title: 'EVENT HEAD', name: 'Ujjwal', icon: Calendar, color: 'text-indigo-400', border: 'border-indigo-500/40', bg: 'bg-indigo-950/40' },
    { title: 'PR & OUTREACH HEAD', name: 'Prateek Kumar', icon: Megaphone, color: 'text-blue-400', border: 'border-blue-500/40', bg: 'bg-blue-950/40', image: '/leadership/prateek-kumar-pr-head.jpg' },
  ];

  const teamMembers = [
    { name: 'Ankan Bhattacharjee', uid: '25LBCS3067', dept: 'TECH DEPARTMENT', role: 'CORE DEVELOPER', rank: 'LVL 3 AWAKENED', badgeColor: 'border-cyan-500 text-cyan-300' },
    { name: 'Ayush Pandey', uid: '25LBCS1314', dept: 'MEDIA DEPARTMENT', role: 'CONTENT STRATEGIST', rank: 'LVL 2 NOVICE', badgeColor: 'border-pink-500 text-pink-300', image: '/leadership/ayush-pandey-media.png' },
    { name: 'Ishaan Sharma', uid: '25LBCS3111', dept: 'MEDIA DEPARTMENT', role: 'VIDEO CREATOR', rank: 'LVL 2 NOVICE', badgeColor: 'border-purple-500 text-purple-300', image: '/leadership/ishaan-sharma-media.jpg' },
  ];

  return (
    <section className="full-section justify-center items-center py-10 relative overflow-hidden bg-[#09090B] text-white">
      {/* Background Circuit Grid Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#09090B] to-[#09090B] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 z-10 w-full text-center">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 font-mono text-xs mb-3 shadow-[0_0_25px_rgba(124,58,237,0.3)]"
        >
          <Crown className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>SYNAPSE COMMAND CENTER • ORGANIZATIONAL HIERARCHY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl font-black text-white mb-3 tracking-tight"
        >
          THE SYNAPSE SOCIETY LEADERSHIP STRUCTURE
        </motion.h2>

        <p className="font-sans text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          Four-tier governance matrix mapping executive leadership, department leads, specialized divisions & SYN-CARD team members across Chandigarh University.
        </p>

        {/* ========================================================================= */}
        {/* TIER 1 — PRESIDENT (CROWN AUTHORITIES) */}
        {/* ========================================================================= */}
        <div className="relative mb-12 flex flex-col items-center">
          <div className="font-mono text-xs text-amber-400 font-bold mb-2 tracking-widest flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-400" /> TIER 1 — PRESIDENT
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => audioService.playHover()}
            className="w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-8 pt-10 sm:pt-12 border-2 border-purple-500/60 shadow-[0_0_50px_rgba(124,58,237,0.4)] relative overflow-visible flex flex-col sm:flex-row items-center gap-6 group hover:border-purple-400 transition-all mt-8"
          >
            {/* Background Glow Aura */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl group-hover:bg-purple-600/35 transition-all pointer-events-none" />

            {/* 3D Overlapping Holographic Photo Frame */}
            <div className="relative w-48 h-64 sm:w-52 sm:h-72 rounded-2xl border-2 border-amber-400/90 bg-gradient-to-b from-purple-900/80 via-purple-950/90 to-[#09090B] shadow-[0_0_35px_rgba(251,191,36,0.4)] shrink-0 flex flex-col justify-end p-2 border-t-transparent">
              {/* Overlapping Pop-out Cut-out Image */}
              <img
                src="/leadership/pragya-shukla-president.png"
                alt="Pragya Shukla - Society President"
                className="absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 w-[220px] sm:w-[250px] max-w-none h-auto object-contain pointer-events-none drop-shadow-[0_15px_25px_rgba(251,191,36,0.5)] z-20 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-60 rounded-2xl z-10" />
              <div className="relative z-20 text-center pb-1">
                <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-black font-mono text-[10px] font-black uppercase tracking-wider shadow-lg">
                  CHIEF AUTHORITY
                </span>
              </div>
            </div>

            {/* Authority Info */}
            <div className="text-left flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-purple-900/60 border border-purple-400/40 text-purple-300 font-mono text-xs font-bold flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>SOCIETY PRESIDENT</span>
                </span>
                <span className="font-mono text-[10px] text-cyan-300 bg-purple-950/80 px-2.5 py-1 rounded-full border border-purple-500/30">
                  TIER 1 AUTHORIZED
                </span>
              </div>

              <h3 className="font-display text-3xl font-extrabold text-white mb-1">
                Pragya Shukla
              </h3>
              <p className="font-mono text-xs text-amber-300 font-semibold mb-3">
                President & Executive Director
              </p>
              <p className="font-sans text-xs text-gray-300 leading-relaxed mb-4">
                Directing strategic vision, technological architecture, department execution, and university-wide hackathons for The Synapse Society.
              </p>

              <div className="pt-3 border-t border-purple-500/30 flex items-center justify-between text-[11px] font-mono text-purple-300">
                <span className="flex items-center gap-1 text-cyan-300 font-bold">
                  <UserCheck className="w-3.5 h-3.5" /> VERIFIED EXECUTIVE LEAD
                </span>
                <span>SYNAPSE 2025 - 2026</span>
              </div>
            </div>
          </motion.div>

          {/* Vertical Connector Line Down to Tier 2 */}
          <div className="w-0.5 h-10 bg-gradient-to-b from-purple-500 to-indigo-500 my-2 shadow-[0_0_10px_#7C3AED]" />
          <ChevronDown className="w-5 h-5 text-indigo-400 animate-bounce -mt-3" />
        </div>

        {/* ========================================================================= */}
        {/* TIER 2 — EXECUTIVE COUNCIL (3 COLUMNS) */}
        {/* ========================================================================= */}
        <div className="relative mb-14">
          <div className="font-mono text-xs text-indigo-400 font-bold mb-3 tracking-widest flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" /> TIER 2 — EXECUTIVE COUNCIL
          </div>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 max-w-4xl mx-auto">
            {/* Vice President: Ankit Kumar Mishra */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onMouseEnter={() => audioService.playHover()}
              className="glass-card rounded-2xl p-5 border-2 border-indigo-500/40 shadow-xl flex flex-col justify-between text-left group hover:border-indigo-400 transition-all w-full md:w-[340px]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 font-mono text-[10px] font-bold">
                    VICE PRESIDENT
                  </span>
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                </div>

                <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden mb-4 border border-indigo-500/40 bg-purple-950/60 shadow-lg">
                  <img
                    src="/leadership/ankit-kumar-mishra-vice-president.jpg"
                    alt="Ankit Kumar Mishra - Vice President"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3 font-display text-xl font-extrabold text-white drop-shadow-md">
                    Ankit Kumar Mishra
                  </div>
                </div>

                <p className="font-sans text-xs text-gray-300 leading-relaxed mb-3">
                  Overseeing operational execution, technical divisions, and member initiatives.
                </p>
              </div>

              <div className="pt-3 border-t border-purple-500/20 font-mono text-[10px] text-cyan-300 font-bold flex justify-between">
                <span>EXECUTIVE BOARD</span>
                <span>TIER 2</span>
              </div>
            </motion.div>

            {/* Treasurer: Paras Tiwari */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onMouseEnter={() => audioService.playHover()}
              className="glass-card rounded-2xl p-5 border-2 border-emerald-500/40 shadow-xl flex flex-col justify-between text-left group hover:border-emerald-400 transition-all w-full md:w-[340px]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] font-bold">
                    TREASURER
                  </span>
                  <Award className="w-4 h-4 text-emerald-400" />
                </div>

                <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden mb-4 border border-emerald-500/40 bg-purple-950/60 shadow-lg">
                  <img
                    src="/leadership/treasurer.png"
                    alt="Paras Tiwari - Treasurer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3 font-display text-xl font-extrabold text-white drop-shadow-md">
                    Paras Tiwari
                  </div>
                </div>

                <p className="font-sans text-xs text-gray-300 leading-relaxed mb-3">
                  Managing financial allocations, event budgets, and hackathon prize logistics.
                </p>
              </div>

              <div className="pt-3 border-t border-purple-500/20 font-mono text-[10px] text-emerald-300 font-bold flex justify-between">
                <span>TREASURY BOARD</span>
                <span>TIER 2</span>
              </div>
            </motion.div>
          </div>

          {/* Connector Line Down to Tier 3 */}
          <div className="w-0.5 h-10 bg-gradient-to-b from-indigo-500 to-cyan-500 mx-auto my-2 shadow-[0_0_10px_#38BDF8]" />
          <ChevronDown className="w-5 h-5 text-cyan-400 animate-bounce mx-auto -mt-3" />
        </div>

        {/* ========================================================================= */}
        {/* TIER 3A — DEPARTMENT HEADS & LEADS (7 GRID CARDS) */}
        {/* ========================================================================= */}
        <div className="relative mb-12">
          <div className="font-mono text-xs text-cyan-400 font-bold mb-3 tracking-widest flex items-center justify-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" /> TIER 3A — DEPARTMENT HEADS & LEADS
          </div>

          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {deptLeads.map((head, idx) => {
              const IconComp = head.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  onMouseEnter={() => audioService.playHover()}
                  className={`glass-card rounded-2xl p-5 border-2 ${head.border} ${head.bg} flex flex-col justify-between text-left group hover:scale-[1.02] hover:border-purple-400 transition-all shadow-xl w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] xl:w-[calc(25%-18px)] max-w-[275px]`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full bg-purple-950/80 border ${head.border} ${head.color} font-mono text-[10px] font-bold`}>
                        {head.title}
                      </span>
                      <IconComp className={`w-4 h-4 ${head.color}`} />
                    </div>

                    {/* Large Portrait Image Frame (Matching Tier 2 Size) */}
                    <div className="relative w-full h-52 rounded-xl overflow-hidden mb-4 border border-purple-500/30 bg-purple-950/80 shadow-lg flex items-center justify-center">
                      {head.image ? (
                        <img
                          src={head.image}
                          alt={head.name}
                          className="w-full h-full object-cover object-[center_28%] group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-4 text-center">
                          <IconComp className={`w-12 h-12 ${head.color} opacity-40 mb-2 animate-pulse`} />
                          <span className="font-mono text-[10px] text-purple-300/60 uppercase tracking-widest">
                            SYN-CARD AVATAR
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="font-display text-lg font-extrabold text-white drop-shadow-md">
                          {head.name}
                        </div>
                      </div>
                    </div>

                    <div className={`font-mono text-xs font-bold ${head.color} mb-1`}>
                      {head.title}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-purple-500/20 font-mono text-[10px] text-purple-300 font-bold flex justify-between">
                    <span>DEPARTMENT HEAD</span>
                    <span>TIER 3A</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Connector Line Down to Tier 4 */}
          <div className="w-0.5 h-8 bg-gradient-to-b from-cyan-500 to-pink-500 mx-auto my-2 shadow-[0_0_10px_#EC4899]" />
        </div>

        {/* ========================================================================= */}
        {/* TIER 4 — SYN-CARD TEAM MEMBERS SHOWCASE GRID */}
        {/* ========================================================================= */}
        <div className="relative mb-12">
          <div className="font-mono text-xs text-purple-400 font-bold mb-4 tracking-widest flex items-center justify-center gap-2">
            <Users className="w-4 h-4 text-purple-400" /> TIER 4 — SYN-CARD TEAM MEMBER CARDS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Ayush Pandey - Media Department SYN-CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onMouseEnter={() => audioService.playHover()}
              className="glass-card rounded-2xl p-5 border-2 border-pink-500/50 bg-pink-950/20 shadow-xl flex flex-col justify-between text-left group hover:border-pink-400 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-0.5 rounded-full bg-pink-950/80 border border-pink-500/40 text-pink-300 font-mono text-[10px] font-bold">
                    MEDIA DEPARTMENT
                  </span>
                  <Video className="w-4 h-4 text-pink-400" />
                </div>

                <div className="relative w-full h-56 rounded-xl overflow-hidden mb-4 border border-pink-500/40 bg-purple-950 shadow-lg">
                  <img
                    src="/leadership/ayush-pandey-media.png"
                    alt="Ayush Pandey - Media Department"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="font-display text-xl font-extrabold text-white">Ayush Pandey</div>
                    <div className="font-mono text-xs text-pink-300 font-bold">UID: 25LBCS1314</div>
                  </div>
                </div>

                <div className="font-mono text-xs font-bold text-pink-300 mb-1">
                  Content Strategist & Media Creator
                </div>
              </div>

              <div className="pt-3 border-t border-purple-500/20 font-mono text-[10px] text-pink-300 font-bold flex justify-between">
                <span>SYN-CARD LVL 2 NOVICE</span>
                <span>TIER 4 MEMBER</span>
              </div>
            </motion.div>

            {/* Ankan Bhattacharjee - Tech Department SYN-CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onMouseEnter={() => audioService.playHover()}
              className="glass-card rounded-2xl p-5 border-2 border-cyan-500/50 bg-cyan-950/20 shadow-xl flex flex-col justify-between text-left group hover:border-cyan-400 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[10px] font-bold">
                    TECH DEPARTMENT
                  </span>
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>

                <div className="relative w-full h-56 rounded-xl overflow-hidden mb-4 border border-cyan-500/40 bg-purple-950 shadow-lg">
                  <img
                    src="/leadership/ankan-bhattacharjee.jpg"
                    alt="Ankan Bhattacharjee - Tech Department"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="font-display text-xl font-extrabold text-white">Ankan Bhattacharjee</div>
                    <div className="font-mono text-xs text-cyan-300 font-bold">UID: 25LBCS3067</div>
                  </div>
                </div>

                <div className="font-mono text-xs font-bold text-cyan-300 mb-1">
                  Core Software Developer
                </div>
              </div>

              <div className="pt-3 border-t border-purple-500/20 font-mono text-[10px] text-cyan-300 font-bold flex justify-between">
                <span>SYN-CARD LVL 3 AWAKENED</span>
                <span>TIER 4 MEMBER</span>
              </div>
            </motion.div>

            {/* Ishaan Sharma - Media Department SYN-CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onMouseEnter={() => audioService.playHover()}
              className="glass-card rounded-2xl p-5 border-2 border-purple-500/50 bg-purple-950/20 shadow-xl flex flex-col justify-between text-left group hover:border-purple-400 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-[10px] font-bold">
                    MEDIA DEPARTMENT
                  </span>
                  <Video className="w-4 h-4 text-purple-400" />
                </div>

                <div className="relative w-full h-56 rounded-xl overflow-hidden mb-4 border border-purple-500/40 bg-purple-950 shadow-lg">
                  <img
                    src="/leadership/ishaan-sharma-media.jpg"
                    alt="Ishaan Sharma - Media Department"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="font-display text-xl font-extrabold text-white">Ishaan Sharma</div>
                    <div className="font-mono text-xs text-purple-300 font-bold">UID: 25LBCS3111</div>
                  </div>
                </div>

                <div className="font-mono text-xs font-bold text-purple-300 mb-1">
                  Video Creator & Editor
                </div>
              </div>

              <div className="pt-3 border-t border-purple-500/20 font-mono text-[10px] text-purple-300 font-bold flex justify-between">
                <span>SYN-CARD LVL 2 NOVICE</span>
                <span>TIER 4 MEMBER</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Faculty Leadership Footer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 max-w-4xl mx-auto glass-card p-4 rounded-2xl border border-purple-500/30 text-center flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-purple-200 shadow-neon-violet"
        >
          <Award className="w-4 h-4 text-purple-400" />
          <span className="text-purple-300 font-bold">Faculty Coordinator:</span>
          <span>Dr. Ajay Kumar Singh, Head, Dept. of Computer Science & Engineering</span>
        </motion.div>
      </div>
    </section>
  );
};
