import React, { useRef, useEffect } from 'react';
import { Layers, ArrowDown } from 'lucide-react';
import { audioService } from '../../services/audioService';

const cardIntroVideo = '/intro-video/card-intro.mp4';
const cardIntroVideoFallback = '/intro-video/Mascot_animation_on_card_202607271616.mp4';

export const Section13CharacterCards: React.FC = () => {
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
        console.warn('SYN-CARD intro video autoplay deferred:', err);
      }
    };

    playVideo();
  }, []);

  const evolutionLevels = [
    {
      level: 'Level 1',
      name: 'AWAKENED',
      desc: 'Beginning of your Synapse journey.',
      color: 'text-purple-400',
      badgeBg: 'bg-purple-950/60 border-purple-500/30',
    },
    {
      level: 'Level 2',
      name: 'GUARDIAN',
      desc: 'Growing through participation and learning.',
      color: 'text-cyan-400',
      badgeBg: 'bg-cyan-950/60 border-cyan-500/30',
    },
    {
      level: 'Level 3',
      name: 'CHAMPION',
      desc: 'Recognized for dedication and impact.',
      color: 'text-amber-400',
      badgeBg: 'bg-amber-950/60 border-amber-500/30',
    },
    {
      level: 'Level 4',
      name: 'CELESTIAL',
      desc: 'The highest evolution of a SYN-CARD.',
      color: 'text-magenta',
      badgeBg: 'bg-fuchsia-950/60 border-magenta/40',
    },
  ];

  const featureBadges = [
    { icon: '🎮', label: 'Gamified Progression' },
    { icon: '🏆', label: 'Achievement Based' },
    { icon: '🪪', label: 'Digital Identity' },
    { icon: '🚀', label: 'Community Recognition' },
  ];

  return (
    <section className="full-section justify-center items-center py-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Clean Full Standalone SYN-CARD Video Display (No Box Container) */}
          <div
            onMouseEnter={() => audioService.playHover()}
            className="lg:col-span-6 flex justify-center items-center"
          >
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.45)] hover:scale-[1.03] transition-transform duration-300 border border-purple-500/30">
              <video
                ref={videoRef}
                src={cardIntroVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-auto object-cover rounded-3xl shadow-2xl block"
              >
                <source src={cardIntroVideo} type="video/mp4" />
                <source src={cardIntroVideoFallback} type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Right Side: SYN-CARD Evolution Text & Progression */}
          <div className="lg:col-span-6 text-left">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-4 shadow-neon-violet">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>HOLOGRAPHIC DIGITAL PASSPORT</span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
              THE SYNAPSE SYN-CARD EVOLUTION
            </h2>

            {/* Description */}
            <p className="font-sans text-gray-200 text-sm sm:text-base leading-relaxed mb-6 glass-card p-4 sm:p-5 rounded-2xl border border-purple-500/20">
              Every member of <strong className="text-purple-300 font-bold">The Synapse Society</strong> owns a unique <strong className="text-cyan-300 font-bold">SYN-CARD</strong> that evolves throughout their journey. By participating in workshops, hackathons, competitions, events, and community activities, members unlock higher evolution levels, showcasing their growth, achievements, and contribution to the community.
            </p>

            {/* Evolution Progression Timeline */}
            <div className="space-y-3 mb-6">
              {evolutionLevels.map((lvl, idx) => (
                <React.Fragment key={idx}>
                  <div
                    onMouseEnter={() => audioService.playHover()}
                    className={`p-3.5 rounded-2xl border ${lvl.badgeBg} flex items-center justify-between transition-all hover:translate-x-1`}
                  >
                    <div>
                      <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">{lvl.level}</div>
                      <div className={`font-display font-extrabold text-base ${lvl.color}`}>{lvl.name}</div>
                    </div>
                    <div className="font-sans text-xs text-gray-300 text-right max-w-[200px]">
                      {lvl.desc}
                    </div>
                  </div>

                  {idx < evolutionLevels.length - 1 && (
                    <div className="flex justify-center my-0.5">
                      <ArrowDown className="w-4 h-4 text-purple-400/60 animate-bounce" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Four Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {featureBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-500/20 text-center flex items-center justify-center gap-1.5 text-xs font-mono text-purple-200"
                >
                  <span>{badge.icon}</span>
                  <span className="text-[11px] font-semibold">{badge.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
