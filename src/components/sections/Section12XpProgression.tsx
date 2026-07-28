import React, { useState, useRef, useEffect } from 'react';
import { Sliders, Sparkles, Shield } from 'lucide-react';
import { audioService } from '../../services/audioService';

const xpEvolutionVideo = '/xp-progression/xp-evolution.mp4';
const xpEvolutionVideoFallback = '/xp-progression/Animate_mascots_in_Syn-Card_chart_202607271644.mp4';

export const Section12XpProgression: React.FC = () => {
  const [sliderXp, setSliderXp] = useState<number>(1450);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = true;
    vid.defaultMuted = true;
    vid.loop = true;
    vid.playsInline = true;

    const playVideo = async () => {
      try {
        await vid.play();
      } catch (err) {
        console.warn('XP Evolution video autoplay deferred:', err);
      }
    };

    playVideo();
  }, []);

  const calculatedLevel = Math.max(1, Math.floor(sliderXp / 500) + 1);

  const getTierInfo = (lvl: number) => {
    if (lvl === 1) return { title: 'Novice Initiate', cardColor: 'from-purple-900/90 to-indigo-950/90', badge: 'LEVEL 1 TIER' };
    if (lvl === 2) return { title: 'Cyber Apprentice', cardColor: 'from-cyan-900/90 to-blue-950/90', badge: 'LEVEL 2 TIER' };
    if (lvl === 3) return { title: 'Synapse Developer', cardColor: 'from-purple-800/90 to-fuchsia-950/90', badge: 'LEVEL 3 TIER' };
    if (lvl === 4) return { title: 'Tech Architect', cardColor: 'from-amber-900/90 to-red-950/90', badge: 'LEVEL 4 TIER' };
    return { title: 'Synapse Master Lead', cardColor: 'from-amber-600/90 via-fuchsia-600/90 to-cyan-500/90', badge: 'LEGENDARY TIER' };
  };

  const tier = getTierInfo(calculatedLevel);

  return (
    <section className="full-section justify-center items-center py-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 z-10 w-full text-center flex flex-col justify-between items-center h-full">
        {/* Header Section */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-2 shadow-neon-violet">
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>INTERACTIVE PROGRESSION SIMULATOR</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white mb-2">
            PREVIEW YOUR LEVEL TIER EVOLUTION
          </h2>
          <p className="font-sans text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            Drag the slider to test real-time XP accumulation, level unlocks, and tier privileges.
          </p>
        </div>

        {/* Clean Standalone XP Evolution Video Display (No Outer Container Box) */}
        <div className="w-full max-w-5xl rounded-3xl overflow-hidden border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.4)] my-3 bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src={xpEvolutionVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-auto max-h-[55vh] object-cover rounded-3xl block"
          >
            <source src={xpEvolutionVideo} type="video/mp4" />
            <source src={xpEvolutionVideoFallback} type="video/mp4" />
          </video>
        </div>

        {/* Standalone XP Slider & Tier Control Bar */}
        <div className="w-full max-w-5xl glass-card p-4 sm:p-5 rounded-2xl border border-purple-500/40 bg-purple-950/90 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between font-mono text-xs text-purple-200 mb-2 gap-2">
            <span>XP SLIDER: <strong className="text-cyan-400 font-bold text-sm sm:text-base">{sliderXp} XP</strong></span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>TIER: <strong className="text-purple-300 font-bold text-sm sm:text-base">{tier.title}</strong></span>
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="3000"
            step="50"
            value={sliderXp}
            onChange={(e) => {
              const val = Number(e.target.value);
              setSliderXp(val);
              audioService.playHover();
            }}
            className="w-full h-2.5 bg-purple-950 rounded-lg appearance-none cursor-pointer accent-purple-400 mb-3"
          />

          <div className={`rounded-xl p-3.5 bg-gradient-to-r ${tier.cardColor} border border-purple-400/40 flex items-center justify-between text-left transition-all duration-500`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-black/40 border border-white/20 flex items-center justify-center text-white">
                <Shield className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <div className="font-display font-bold text-sm sm:text-base text-white">{tier.title}</div>
                <div className="font-mono text-[10px] text-purple-200">LEVEL {calculatedLevel} • {tier.badge}</div>
              </div>
            </div>

            <div className="text-right font-mono">
              <div className="text-base sm:text-xl font-extrabold text-white">{sliderXp}</div>
              <div className="text-[9px] text-purple-200">TOTAL XP</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
