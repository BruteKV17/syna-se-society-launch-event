import React, { useRef, useEffect } from 'react';
import { ShoppingBag, Tag, Award, Cpu, ShieldCheck } from 'lucide-react';
import { audioService } from '../../services/audioService';

// Dedicated Merchandise Video Asset Reference
const merchandiseVideo = '/merch-video/merch-showcase.mp4';
const merchandiseVideoFallback = '/merch-video/Product_showcase_animation_rotating_mascot_202607271132.mp4';

export const Section14MerchHorizontal: React.FC = () => {
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
        console.warn('Merchandise video autoplay deferred:', err);
      }
    };

    playVideo();
  }, []);

  const merchItems = [
    { title: 'Synapse Cyber Hoodie', xp: '1,500 XP', badge: 'PHYSICAL GEAR', icon: ShieldCheck },
    { title: 'Developer Code Tee', xp: '1,000 XP', badge: 'PHYSICAL GEAR', icon: Tag },
    { title: 'Cloud GPU Compute Credits', xp: '800 XP', badge: 'DIGITAL REWARD', icon: Cpu },
    { title: 'Founder VIP Pass', xp: '2,500 XP', badge: 'LEGENDARY TIER', icon: Award },
  ];

  return (
    <section className="full-section justify-center items-center py-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 z-10 w-full text-center flex flex-col justify-between items-center h-full">
        {/* Header Title */}
        <div className="mb-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-2 shadow-neon-violet">
            <ShoppingBag className="w-3.5 h-3.5 text-purple-400" />
            <span>SYNAPSE XP MERCHANDISE STORE</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white mb-2">
            EXCLUSIVE SOCIETY MERCHANDISE
          </h2>
          <p className="font-sans text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            Redeem verified XP earned from orientation missions for hoodies, developer T-shirts, GPU cloud compute credits, and keynotes.
          </p>
        </div>

        {/* Clean Standalone Merchandise Video Player Container (No Outer Box) */}
        <div className="w-full max-w-5xl rounded-3xl overflow-hidden border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.4)] my-3 bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src={merchandiseVideo}
            autoPlay
            loop
            muted
            playsInline
            controls
            preload="auto"
            className="w-full h-auto max-h-[58vh] object-cover rounded-3xl block"
          >
            <source src={merchandiseVideo} type="video/mp4" />
            <source src={merchandiseVideoFallback} type="video/mp4" />
            Your browser does not support HTML5 merchandise video playback.
          </video>
        </div>

        {/* Merchandise Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-5xl mt-2">
          {merchItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => audioService.playHover()}
                className="p-3.5 rounded-2xl glass-card border border-purple-500/30 text-left hover:scale-[1.03] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-900/60 border border-purple-400/30 flex items-center justify-center text-purple-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-bold">
                    {item.badge}
                  </span>
                </div>
                <div>
                  <h4 className="font-display text-xs sm:text-sm font-bold text-white mb-1">{item.title}</h4>
                  <div className="font-mono text-xs text-amber-400 font-extrabold">{item.xp}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
