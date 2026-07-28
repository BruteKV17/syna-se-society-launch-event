import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Camera, Sparkles, MapPin } from 'lucide-react';
import { audioService } from '../../services/audioService';

export const Section06Events: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const gatheringPhotos = [
    {
      id: 1,
      src: '/gatherings/cu-gathering-2025-1.png',
      title: 'SYNAPSE WORKSHOP & LECTURE HALL',
      location: 'Chandigarh University Campus',
      date: 'YEAR 2025',
      desc: 'Interactive student & faculty engineering sessions in campus lecture hall.',
    },
    {
      id: 2,
      src: '/gatherings/cu-gathering-2025-2.png',
      title: 'HANDS-ON CODING SQUADS',
      location: 'Synapse Tech Lab',
      date: 'YEAR 2025',
      desc: 'Peer-to-peer collaborative software building and algorithm sprints.',
    },
    {
      id: 3,
      src: '/gatherings/cu-gathering-2025-3.png',
      title: 'LIVE VS CODE & AI PRESENTATION',
      location: 'Main Auditorium',
      date: 'YEAR 2025',
      desc: 'Demonstrating AI agents and full-stack software development models live on stage.',
    },
    {
      id: 4,
      src: '/gatherings/cu-gathering-2025-4.jpg',
      title: 'CAMPUS AUDIENCE & KEYNOTE ASSEMBLY',
      location: 'CU Main Auditorium',
      date: 'YEAR 2025',
      desc: 'Faculty directors & student attendees packed for the annual keynote assembly.',
    },
    {
      id: 5,
      src: '/gatherings/cu-gathering-2025-5.jpg',
      title: 'EXECUTIVE FACULTY & STUDENT SYMPOSIUM',
      location: 'CU Technical Hall',
      date: 'YEAR 2025',
      desc: 'Deep tech discussions and mentor guidance with CSE faculty heads.',
    },
  ];

  // Duplicated array to ensure 100% seamless infinite left-to-right looping animation
  const marqueePhotos = [...gatheringPhotos, ...gatheringPhotos];

  return (
    <section className="full-section justify-center items-center py-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 z-10 w-full text-center">
        {/* Header Badge & Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-3 shadow-neon-violet"
        >
          <Camera className="w-3.5 h-3.5 text-purple-400" />
          <span>CHANDIGARH UNIVERSITY • LIVE EVENT GALLERY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-3"
        >
          LEGENDARY SYNAPSE GATHERINGS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-8"
        >
          Explore real campus photos from our keynotes, hackathons, and workshops continuously scrolling left to right.
        </motion.p>

        {/* Continuous Left-to-Right Moving Photo Marquee Carousel */}
        <div className="relative w-full overflow-hidden py-4 rounded-3xl border border-purple-500/30 glass-card bg-purple-950/40 shadow-2xl">
          {/* Side Fade Gradients */}
          <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-[#07050E] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-[#07050E] to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee-right flex gap-6 px-4">
            {marqueePhotos.map((photo, idx) => (
              <div
                key={idx}
                onMouseEnter={() => audioService.playHover()}
                onClick={() => {
                  audioService.playClick();
                  setActivePhotoIndex(idx % gatheringPhotos.length);
                }}
                className="relative min-w-[320px] sm:min-w-[420px] h-[240px] sm:h-[280px] rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-xl group cursor-pointer shrink-0 transition-transform duration-300 hover:scale-[1.03] hover:border-purple-400"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07050E] via-purple-950/30 to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />

                {/* Overlay Text Details */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-400/40 text-[10px] font-mono text-purple-200">
                      {photo.date}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" /> {photo.location}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-white line-clamp-1 drop-shadow-md group-hover:text-cyan-300 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="font-sans text-[11px] text-gray-300 line-clamp-1 mt-0.5">
                    {photo.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Lightbox Popup for Enlarged Photo View */}
        {activePhotoIndex !== null && (
          <div
            onClick={() => setActivePhotoIndex(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl w-full glass-card p-4 rounded-3xl border border-purple-400/50 shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={gatheringPhotos[activePhotoIndex].src}
                alt={gatheringPhotos[activePhotoIndex].title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-2xl mb-4"
              />
              <div className="text-left px-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-purple-300 font-bold">
                    {gatheringPhotos[activePhotoIndex].date}
                  </span>
                  <span className="font-mono text-xs text-cyan-400">
                    {gatheringPhotos[activePhotoIndex].location}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-1">
                  {gatheringPhotos[activePhotoIndex].title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-300">
                  {gatheringPhotos[activePhotoIndex].desc}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
