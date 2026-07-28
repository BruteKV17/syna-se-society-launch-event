"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import BootSequence from "@/components/BootSequence";
import { HeroSection } from "@/components/HeroSection";
import { MissionBrief } from "@/components/MissionBrief";
import { MissionTimeline } from "@/components/MissionTimeline";
import { ProblemStatements } from "@/components/ProblemStatements";
import { Deliverables } from "@/components/Deliverables";
import { JudgingRadar } from "@/components/JudgingRadar";
import { MissionTimer } from "@/components/MissionTimer";
import { FinalPitch } from "@/components/FinalPitch";
import { Leaderboard } from "@/components/Leaderboard";

// Dynamically import ParticleBackground with no SSR (uses canvas + window)
const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  { ssr: false }
);

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <main className="relative min-h-screen bg-bg-primary">
      {/* Boot Sequence Overlay */}
      {!bootComplete && (
        <BootSequence onComplete={() => setBootComplete(true)} />
      )}

      {/* Particle Background (always mounted, behind everything) */}
      <ParticleBackground />

      {/* Main Content — only visible after boot */}
      {bootComplete && (
        <div className="relative z-10">
          {/* Section 1: Hero */}
          <HeroSection />

          {/* Section 2: Mission Brief (Terminal) */}
          <MissionBrief />

          {/* Divider */}
          <div className="w-full flex justify-center py-4">
            <div className="w-px h-24 bg-gradient-to-b from-purple-primary to-transparent" />
          </div>

          {/* Section 3: Timeline */}
          <MissionTimeline />

          {/* Divider */}
          <div className="w-full flex justify-center py-4">
            <div className="w-px h-24 bg-gradient-to-b from-purple-primary to-transparent" />
          </div>

          {/* Section 4: Problem Statements */}
          <ProblemStatements />

          {/* Divider */}
          <div className="w-full flex justify-center py-4">
            <div className="w-px h-24 bg-gradient-to-b from-purple-primary to-transparent" />
          </div>

          {/* Section 5: Deliverables */}
          <Deliverables />

          {/* Divider */}
          <div className="w-full flex justify-center py-4">
            <div className="w-px h-24 bg-gradient-to-b from-purple-primary to-transparent" />
          </div>

          {/* Section 6: Judging Radar */}
          <JudgingRadar />

          {/* Divider */}
          <div className="w-full flex justify-center py-4">
            <div className="w-px h-24 bg-gradient-to-b from-purple-primary to-transparent" />
          </div>

          {/* Section 7: Mission Timer */}
          <MissionTimer />

          {/* Divider */}
          <div className="w-full flex justify-center py-4">
            <div className="w-px h-24 bg-gradient-to-b from-purple-primary to-transparent" />
          </div>

          {/* Section 8: Leaderboard */}
          <Leaderboard />

          {/* Section 9: Final Pitch */}
          <FinalPitch />
        </div>
      )}
    </main>
  );
}
