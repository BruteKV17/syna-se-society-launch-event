import React, { useState, useEffect } from 'react';
import { CircuitCanvas } from './components/canvas/CircuitCanvas';
import { Navbar } from './components/layout/Navbar';
import { QuickNavDrawer } from './components/layout/QuickNavDrawer';
import { ProfileModal } from './components/modals/ProfileModal';
import { AdminDashboardModal } from './components/modals/AdminDashboardModal';
import { AutomaticLogoIntro } from './components/canvas/AutomaticLogoIntro';
import { dataStoreService } from './services/firebaseService';
import { audioService } from './services/audioService';
import { UserProfile } from './types';

// Import Keynote Sections
import { Section02WelcomeFreshers } from './components/sections/Section02WelcomeFreshers';
import { Section01LogoReveal } from './components/sections/Section01LogoReveal';
import { Section03About } from './components/sections/Section03About';
import { Section03bLeadership } from './components/sections/Section03bLeadership';
import { Section04Vision } from './components/sections/Section04Vision';
import { Section05Timeline } from './components/sections/Section05Timeline';
import { Section06Events } from './components/sections/Section06Events';
import { Section07WhatWeDo } from './components/sections/Section07WhatWeDo';
import { Section08WhyJoinUs } from './components/sections/Section08WhyJoinUs';
import { Section09Roadmap } from './components/sections/Section09Roadmap';
import { Section10LaunchEvent } from './components/sections/Section10LaunchEvent';
import { Section11RewardSystem } from './components/sections/Section11RewardSystem';
import { Section12XpProgression } from './components/sections/Section12XpProgression';
import { Section13CharacterCards } from './components/sections/Section13CharacterCards';
import { Section14MerchHorizontal } from './components/sections/Section14MerchHorizontal';
import { Section15DigitalProfileMock } from './components/sections/Section15DigitalProfileMock';
import { Section16MissionSelection } from './components/sections/Section16MissionSelection';
import { Section23Leaderboard } from './components/sections/Section23Leaderboard';
import { Section24JoinSynapse } from './components/sections/Section24JoinSynapse';
import { Section25Outro } from './components/sections/Section25Outro';

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [user, setUser] = useState<UserProfile>(dataStoreService.getUser());

  // Modals state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isQuickNavOpen, setIsQuickNavOpen] = useState(false);

  const totalSections = 19;

  const refreshUserData = () => {
    setUser(dataStoreService.getUser());
  };

  const mainRef = React.useRef<HTMLDivElement | null>(null);
  const activeSectionIndexRef = React.useRef<number>(currentSectionIndex);

  useEffect(() => {
    activeSectionIndexRef.current = currentSectionIndex;
  }, [currentSectionIndex]);

  // Track active section as user scrolls naturally
  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const handleScroll = () => {
      const sections = Array.from(document.querySelectorAll('[id^="section-"]'));
      const scrollPos = mainEl.scrollTop + mainEl.clientHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i] as HTMLElement;
        if (sec && sec.offsetTop <= scrollPos) {
          const idx = parseInt(sec.id.replace('section-', ''), 10);
          if (!isNaN(idx) && activeSectionIndexRef.current !== idx) {
            setCurrentSectionIndex(idx);
          }
          break;
        }
      }
    };

    mainEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      mainEl.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (index: number) => {
    audioService.playClick();
    const targetIdx = (index + totalSections) % totalSections;
    setCurrentSectionIndex(targetIdx);
    const sectionEl = document.getElementById(`section-${targetIdx}`);
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goToNextSection = () => {
    const next = (activeSectionIndexRef.current + 1) % totalSections;
    scrollToSection(next);
  };

  const goToPrevSection = () => {
    const prev = (activeSectionIndexRef.current - 1 + totalSections) % totalSections;
    scrollToSection(prev);
  };

  // Keyboard Down Arrow & Up Arrow Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName)) return;

      if (['ArrowDown', 'PageDown'].includes(e.code)) {
        e.preventDefault();
        goToNextSection();
      } else if (['ArrowUp', 'PageUp'].includes(e.code)) {
        e.preventDefault();
        goToPrevSection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen bg-[#07050E] text-white overflow-hidden selection:bg-purple-600 selection:text-white">
      {/* Startup Logo Reveal Animation Intro Overlay */}
      {showIntro && (
        <AutomaticLogoIntro
          onComplete={() => {
            setShowIntro(false);
            scrollToSection(0);
          }}
        />
      )}

      {/* Background Glowing Circuit Canvas */}
      <CircuitCanvas />

      {/* Floating Header HUD Navbar */}
      <Navbar
        currentSectionIndex={currentSectionIndex}
        totalSections={totalSections}
        user={user}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenQuickNav={() => setIsQuickNavOpen(true)}
      />

      {/* Main Free Scrollable Trajectory */}
      <main ref={mainRef} className="relative z-10 h-screen w-screen overflow-y-auto scroll-smooth no-scrollbar">
        {/* Section 00 - Welcome Freshers & Stats */}
        <div id="section-0" className="min-h-screen w-full flex flex-col justify-center items-center py-12">
          <Section02WelcomeFreshers />
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 border-b border-purple-500/20 relative flex items-center justify-center">
          <div className="px-4 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/30 text-[10px] font-mono text-purple-400/80 shadow-neon-violet">SYNAPSE SECTION END</div>
        </div>

        {/* Section 01 - Synapse Emblem Reveal */}
        <div id="section-1" className="min-h-screen w-full flex flex-col justify-center items-center py-12">
          <Section01LogoReveal onNextSection={() => scrollToSection(2)} />
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 border-b border-purple-500/20 relative flex items-center justify-center">
          <div className="px-4 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/30 text-[10px] font-mono text-purple-400/80 shadow-neon-violet">SYNAPSE SECTION END</div>
        </div>

        {/* Section 02 - About The Synapse Society */}
        <div id="section-2" className="min-h-screen w-full flex flex-col justify-center items-center py-12">
          <Section03About />
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 border-b border-purple-500/20 relative flex items-center justify-center">
          <div className="px-4 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/30 text-[10px] font-mono text-purple-400/80 shadow-neon-violet">SYNAPSE SECTION END</div>
        </div>

        {/* Section 03 - Executive Leadership Structure */}
        <div id="section-3" className="min-h-screen w-full flex flex-col justify-center items-center py-12">
          <Section03bLeadership />
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 border-b border-purple-500/20 relative flex items-center justify-center">
          <div className="px-4 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/30 text-[10px] font-mono text-purple-400/80 shadow-neon-violet">SYNAPSE SECTION END</div>
        </div>

        {/* Section 04 - Core Vision & Node Graph */}
        <div id="section-4" className="min-h-screen w-full flex flex-col justify-center items-center py-12">
          <Section04Vision />
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 border-b border-purple-500/20 relative flex items-center justify-center">
          <div className="px-4 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/30 text-[10px] font-mono text-purple-400/80 shadow-neon-violet">SYNAPSE SECTION END</div>
        </div>

        {/* Section 05 - Evolution Timeline */}
        <div id="section-5" className="min-h-screen w-full flex flex-col justify-center items-center py-12">
          <Section05Timeline />
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 border-b border-purple-500/20 relative flex items-center justify-center">
          <div className="px-4 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/30 text-[10px] font-mono text-purple-400/80 shadow-neon-violet">SYNAPSE SECTION END</div>
        </div>

        {/* Section 06 - Live Event Gallery */}
        <div id="section-6" className="min-h-screen w-full flex flex-col justify-center items-center py-12">
          <Section06Events />
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 border-b border-purple-500/20 relative flex items-center justify-center">
          <div className="px-4 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/30 text-[10px] font-mono text-purple-400/80 shadow-neon-violet">SYNAPSE SECTION END</div>
        </div>

        {/* Section 07 - What We Do */}
        <div id="section-7" className="min-h-screen w-full flex flex-col justify-center items-center py-12">
          <Section07WhatWeDo />
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 border-b border-purple-500/20 relative flex items-center justify-center">
          <div className="px-4 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/30 text-[10px] font-mono text-purple-400/80 shadow-neon-violet">SYNAPSE SECTION END</div>
        </div>

        {/* Section 08 - Why Join Us */}
        <div id="section-8" className="min-h-screen w-full flex flex-col justify-center items-center py-12">
          <Section08WhyJoinUs />
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 border-b border-purple-500/20 relative flex items-center justify-center">
          <div className="px-4 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/30 text-[10px] font-mono text-purple-400/80 shadow-neon-violet">SYNAPSE SECTION END</div>
        </div>

        {/* Section 09 - Future Roadmap 2026 */}
        <div id="section-9" className="min-h-screen w-full flex flex-col justify-center items-center py-12">
          <Section09Roadmap />
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 border-b border-purple-500/20 relative flex items-center justify-center">
          <div className="px-4 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/30 text-[10px] font-mono text-purple-400/80 shadow-neon-violet">SYNAPSE SECTION END</div>
        </div>

        {/* Section 10 - Biggest Launch Event */}
        <div id="section-10" className="min-h-screen w-full flex flex-col justify-center items-center py-12">
          <Section10LaunchEvent />
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 border-b border-purple-500/20 relative flex items-center justify-center">
          <div className="px-4 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/30 text-[10px] font-mono text-purple-400/80 shadow-neon-violet">SYNAPSE SECTION END</div>
        </div>

        {/* Section 11 - Synapse Reward System */}
        <div id="section-11" className="min-h-screen w-full flex flex-col justify-center items-center py-12">
          <Section11RewardSystem />
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 border-b border-purple-500/20 relative flex items-center justify-center">
          <div className="px-4 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/30 text-[10px] font-mono text-purple-400/80 shadow-neon-violet">SYNAPSE SECTION END</div>
        </div>

        {/* Section 12 - XP & Progression Simulator */}
        <div id="section-12" className="min-h-screen w-full flex flex-col justify-center items-center py-12">
          <Section12XpProgression />
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 border-b border-purple-500/20 relative flex items-center justify-center">
          <div className="px-4 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/30 text-[10px] font-mono text-purple-400/80 shadow-neon-violet">SYNAPSE SECTION END</div>
        </div>

        {/* Section 13 - Holographic Tier Cards */}
        <div id="section-13" className="min-h-screen w-full flex flex-col justify-center items-center py-12">
          <Section13CharacterCards />
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 border-b border-purple-500/20 relative flex items-center justify-center">
          <div className="px-4 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/30 text-[10px] font-mono text-purple-400/80 shadow-neon-violet">SYNAPSE SECTION END</div>
        </div>

        {/* Section 14 - Exclusive Merchandise Scroll */}
        <div id="section-14" className="min-h-screen w-full flex flex-col justify-center items-center py-12">
          <Section14MerchHorizontal />
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 border-b border-purple-500/20 relative flex items-center justify-center">
          <div className="px-4 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/30 text-[10px] font-mono text-purple-400/80 shadow-neon-violet">SYNAPSE SECTION END</div>
        </div>

        {/* Section 15 - Digital Profile Pass Mockup */}
        <div id="section-15" className="min-h-screen w-full flex flex-col justify-center items-center py-12">
          <Section15DigitalProfileMock user={user} onOpenProfile={() => setIsProfileOpen(true)} />
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 border-b border-purple-500/20 relative flex items-center justify-center">
          <div className="px-4 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/30 text-[10px] font-mono text-purple-400/80 shadow-neon-violet">SYNAPSE SECTION END</div>
        </div>

        {/* Section 16 - Bachelor's Mission Arena */}
        <div id="section-16" className="min-h-screen w-full flex flex-col justify-center items-center py-12">
          <Section16MissionSelection onUserDataChanged={refreshUserData} />
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 border-b border-purple-500/20 relative flex items-center justify-center">
          <div className="px-4 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/30 text-[10px] font-mono text-purple-400/80 shadow-neon-violet">SYNAPSE SECTION END</div>
        </div>


        {/* Section 18 - Join Synapse */}
        <div id="section-18" className="min-h-screen w-full flex flex-col justify-center items-center py-12">
          <Section24JoinSynapse onUserDataChanged={refreshUserData} onOpenProfile={() => setIsProfileOpen(true)} />
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 border-b border-purple-500/20 relative flex items-center justify-center">
          <div className="px-4 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/30 text-[10px] font-mono text-purple-400/80 shadow-neon-violet">SYNAPSE SECTION END</div>
        </div>

        {/* Section 19 - Outro & Vortex Replay */}
        <div id="section-19" className="min-h-screen w-full flex flex-col justify-center items-center py-12">
          <Section25Outro onReplay={() => scrollToSection(0)} />
        </div>
      </main>

      {/* Portals & Modals */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={user} />
      <AdminDashboardModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} onUserDataChanged={refreshUserData} />
      <QuickNavDrawer
        isOpen={isQuickNavOpen}
        onClose={() => setIsQuickNavOpen(false)}
        onSelectSection={scrollToSection}
        currentSectionIndex={currentSectionIndex}
      />
    </div>
  );
};
