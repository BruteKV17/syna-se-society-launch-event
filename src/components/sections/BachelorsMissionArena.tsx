import React, { useState, useEffect } from 'react';
import {
  Lock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Target,
  Trophy,
  Bot,
  Zap,
  ShieldCheck,
  Brain,
  Wand2,
  Eye,
  Radio,
  Send,
  HelpCircle,
  Play,
  X,
  Maximize2,
  ExternalLink
} from 'lucide-react';
import { audioService } from '../../services/audioService';
import { dataStoreService } from '../../services/firebaseService';
import { BACHELOR_DATA, BachelorMission, TeamData } from '../../data/bachelorMissions';

interface BachelorsMissionArenaProps {
  onUserDataChanged: () => void;
}

export const BachelorsMissionArena: React.FC<BachelorsMissionArenaProps> = ({ onUserDataChanged }) => {
  // State machine
  const [selectedAcademicLevel, setSelectedAcademicLevel] = useState<'bachelors' | 'masters' | null>(null);
  const [viewMode, setViewMode] = useState<'repo' | 'native'>('repo');
  const [selectedTeamKey, setSelectedTeamKey] = useState<'teamA' | 'teamB' | null>(null);
  const [currentMissionIndex, setCurrentMissionIndex] = useState<number>(0);
  const [completedMissions, setCompletedMissions] = useState<string[]>(() => {
    return dataStoreService.getUser().completedMissions || [];
  });
  const [isMissionCompleteScreen, setIsMissionCompleteScreen] = useState<boolean>(false);
  const [isTeamCompleteScreen, setIsTeamCompleteScreen] = useState<boolean>(false);

  // Interactive Modal State
  const [activeInteractiveMission, setActiveInteractiveMission] = useState<BachelorMission | null>(null);

  // Challenge Interactivity states
  const [promptText, setPromptText] = useState('Act as a Synapse AI Engineer and generate an optimal zero-shot prompt.');
  const [emojiAnswers, setEmojiAnswers] = useState<{ [key: number]: string }>({});
  const [emojiScore, setEmojiScore] = useState<number | null>(null);
  const [activeModules, setActiveModules] = useState<number[]>([]);
  const [wizardSpell, setWizardSpell] = useState('Arcane Portal');
  const [visionGuess, setVisionGuess] = useState('');
  const [visionScore, setVisionScore] = useState<number | null>(null);
  const [relayHops, setRelayHops] = useState<number>(0);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const user = dataStoreService.getUser();

  useEffect(() => {
    const currentCompleted = dataStoreService.getUser().completedMissions || [];
    setCompletedMissions(currentCompleted);
  }, []);

  // Listen for EXIT_ORIENTATION message from orientation presentation iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'EXIT_ORIENTATION') {
        setSelectedAcademicLevel(null);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const selectedTeam: TeamData | null = selectedTeamKey ? BACHELOR_DATA[selectedTeamKey] : null;
  const currentMission: BachelorMission | null =
    selectedTeam && currentMissionIndex < selectedTeam.missions.length
      ? selectedTeam.missions[currentMissionIndex]
      : null;

  // Handler to choose Academic Level
  const handleSelectAcademicLevel = (level: 'bachelors' | 'masters') => {
    audioService.playClick();
    setSelectedAcademicLevel(level);
    setViewMode('repo');
  };

  // Handler to toggle full screen
  const handleToggleFullscreen = (containerId: string) => {
    audioService.playClick();
    const elem = document.getElementById(containerId);
    if (elem) {
      if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  // Handler to choose Team
  const handleSelectTeam = (teamKey: 'teamA' | 'teamB') => {
    audioService.playClick();
    setSelectedTeamKey(teamKey);
    setCurrentMissionIndex(0);
    setIsMissionCompleteScreen(false);
    setIsTeamCompleteScreen(false);
  };

  // Start Interactive Mission Modal
  const handleStartMission = () => {
    audioService.playClick();
    if (currentMission) {
      setActiveInteractiveMission(currentMission);
      // Reset simulator states
      setIsEvaluating(false);
      setEmojiScore(null);
      setActiveModules([]);
      setVisionScore(null);
      setRelayHops(0);
    }
  };

  // Complete current active mission
  const handleCompleteCurrentMission = () => {
    if (!currentMission || !selectedTeamKey) return;

    audioService.playLevelUp();
    const result = dataStoreService.awardXP(
      user.studentId,
      currentMission.xpReward,
      currentMission.id,
      `${selectedTeamKey === 'teamA' ? 'Team A' : 'Team B'}: ${currentMission.title}`,
      'Synapse Mission Engine'
    );

    if (!completedMissions.includes(currentMission.id)) {
      setCompletedMissions((prev) => [...prev, currentMission.id]);
    }

    onUserDataChanged();
    setActiveInteractiveMission(null);

    // Transition to Mission Complete screen
    setIsMissionCompleteScreen(true);
  };

  // Next Mission button click
  const handleNextMission = () => {
    audioService.playClick();
    if (!selectedTeam) return;

    const nextIndex = currentMissionIndex + 1;
    if (nextIndex < selectedTeam.missions.length) {
      setCurrentMissionIndex(nextIndex);
      setIsMissionCompleteScreen(false);
    } else {
      // All missions completed
      setIsMissionCompleteScreen(false);
      setIsTeamCompleteScreen(true);
    }
  };

  // Calculate team completion status
  const getTeamProgressCount = (teamKey: 'teamA' | 'teamB') => {
    const teamMissions = BACHELOR_DATA[teamKey].missions;
    return teamMissions.filter((m) => completedMissions.includes(m.id)).length;
  };

  // Render Progress Indicator Bar
  const renderProgressIndicator = () => {
    if (!selectedTeam) return null;

    const total = selectedTeam.missions.length;
    return (
      <div className="w-full max-w-xl mx-auto mb-8 bg-purple-950/40 border border-purple-500/30 rounded-2xl p-4 backdrop-blur-md">
        <div className="flex items-center justify-between font-mono text-xs mb-3 px-2">
          <span className="text-purple-300 font-bold tracking-wider">{selectedTeam.name}</span>
          <span className="text-cyan-400 font-bold">
            {isTeamCompleteScreen
              ? 'TEAM COMPLETE ✓'
              : `MISSION 0${Math.min(currentMissionIndex + 1, total)} / 0${total}`}
          </span>
        </div>

        {/* Dots & Connecting Lines Progress Bar */}
        <div className="flex items-center justify-between px-6 relative">
          {selectedTeam.missions.map((m, idx) => {
            const isCompleted = completedMissions.includes(m.id);
            const isActive = !isTeamCompleteScreen && idx === currentMissionIndex;
            const isFuture = !isCompleted && !isActive;

            return (
              <React.Fragment key={m.id}>
                {/* Node */}
                <div className="relative flex flex-col items-center z-10">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs transition-all duration-300 ${
                      isCompleted
                        ? 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 shadow-neon-cyan'
                        : isActive
                        ? 'bg-purple-600/30 border-2 border-purple-400 text-purple-200 shadow-neon-purple scale-110 animate-pulse'
                        : 'bg-purple-950/60 border border-purple-500/20 text-gray-500'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : isActive ? (
                      <span className="w-3 h-3 rounded-full bg-purple-400 shadow-neon-purple" />
                    ) : (
                      <span>○</span>
                    )}
                  </div>
                </div>

                {/* Connecting Line */}
                {idx < total - 1 && (
                  <div className="flex-1 h-0.5 mx-2 bg-purple-900/60 relative overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        completedMissions.includes(selectedTeam.missions[idx].id) &&
                        (completedMissions.includes(selectedTeam.missions[idx + 1].id) ||
                          idx < currentMissionIndex)
                          ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-neon-cyan w-full'
                          : idx < currentMissionIndex
                          ? 'bg-purple-500 w-full'
                          : 'w-0'
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  // =========================================================================
  // STEP 1: CHOOSE ACADEMIC PATH
  // =========================================================================
  if (!selectedAcademicLevel) {
    return (
      <section className="full-section justify-center items-center py-8">
        <div className="max-w-4xl mx-auto px-6 z-10 w-full text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-3 shadow-neon-violet">
            <Target className="w-4 h-4 text-purple-400" />
            <span>MISSION ARENA PROTOCOL</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-3">
            CHOOSE YOUR ACADEMIC PATH
          </h2>
          <p className="font-sans text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-10">
            Select an academic arena track to initialize sequential mission protocols and earn live Synapse profile XP.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* BACHELOR'S CARD (ACTIVE) */}
            <div
              onClick={() => handleSelectAcademicLevel('bachelors')}
              onMouseEnter={() => audioService.playHover()}
              className="glass-card glass-card-hover rounded-3xl p-8 border-2 border-purple-400/80 bg-purple-900/40 text-left cursor-pointer transition-all hover:scale-105 shadow-neon-purple group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-purple-500/20 border-b border-l border-purple-400/30 text-cyan-300 font-mono text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> ACTIVE PROTOCOL
              </div>

              <div className="p-4 rounded-2xl bg-purple-900/60 text-purple-300 border border-purple-400/40 w-fit mb-6">
                <Brain className="w-8 h-8 text-cyan-400" />
              </div>

              <span className="font-mono text-xs text-purple-300 font-bold tracking-wider">UNDERGRADUATE</span>
              <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                BACHELOR'S ARENA
              </h3>
              <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                Access Team A & Team B sequential mission protocols: Prompt Engineering, Emoji Decoder, System Restore, Game Forge, AI Vision & Prompt Relay.
              </p>

              <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between font-mono text-xs text-cyan-400 font-bold">
                <span>6 TOTAL MISSIONS</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  ENTER ARENA →
                </span>
              </div>
            </div>

            {/* MASTER'S CARD (ACTIVE) */}
            <div
              onClick={() => handleSelectAcademicLevel('masters')}
              onMouseEnter={() => audioService.playHover()}
              className="glass-card glass-card-hover rounded-3xl p-8 border-2 border-cyan-400/80 bg-purple-900/40 text-left cursor-pointer transition-all hover:scale-105 shadow-neon-cyan group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-cyan-500/20 border-b border-l border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> ACTIVE PROTOCOL
              </div>

              <div className="p-4 rounded-2xl bg-purple-900/60 text-cyan-300 border border-cyan-400/40 w-fit mb-6">
                <ShieldCheck className="w-8 h-8 text-cyan-400" />
              </div>

              <span className="font-mono text-xs text-cyan-300 font-bold tracking-wider">POSTGRADUATE</span>
              <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                MASTER'S ARENA
              </h3>
              <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                M.Tech Session — AI Innovation Sprint. Advanced Neural Architecture, Autonomous Agent Swarms, and LLM Engineering.
              </p>

              <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between font-mono text-xs text-cyan-400 font-bold">
                <span>SYNAPSE MTECH REPO</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  ENTER ARENA →
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // STEP 2 (MASTER'S): MASTER'S MISSION ARENA - SYNAPSE MTECH REPO
  // =========================================================================
  if (selectedAcademicLevel === 'masters') {
    return (
      <section className="full-section justify-center items-center py-4 px-2 sm:px-6 relative overflow-hidden bg-[#07050E]">
        <div id="masters-arena-container" className="w-full max-w-7xl mx-auto flex flex-col h-[88vh] min-h-[680px] z-10 rounded-2xl overflow-hidden border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3)] bg-[#07050E]">
          {/* Control Bar */}
          <div className="bg-[#0f0923] border-b border-cyan-500/30 px-4 sm:px-6 py-2.5 flex items-center justify-between flex-wrap gap-2 shadow-lg z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  audioService.playClick();
                  setSelectedAcademicLevel(null);
                }}
                className="inline-flex items-center gap-2 text-xs font-mono text-cyan-200 hover:text-white bg-cyan-900/80 hover:bg-cyan-800 border border-cyan-400/50 px-4 py-2 rounded-full transition-all shadow-neon-cyan cursor-pointer font-bold"
              >
                ← RETURN TO ACADEMIC PATH
              </button>
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>MASTER'S ARENA • SYNAPSE MTECH REPO</span>
              </div>
            </div>

            {/* Actions: Fullscreen Icon & New Tab Icon */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleFullscreen('masters-arena-container')}
                title="Toggle Fullscreen"
                className="inline-flex items-center justify-center p-2 rounded-full text-cyan-400 hover:text-white bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-500/40 hover:border-cyan-400 transition-all cursor-pointer shadow-neon-cyan"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <a
                href="/masters/index.html"
                target="_blank"
                rel="noopener noreferrer"
                title="Open Fullscreen in New Tab"
                className="inline-flex items-center justify-center p-2 rounded-full text-cyan-400/80 hover:text-cyan-200 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 hover:border-cyan-400/50 transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Embedded Exact Synapse MTech Repository App */}
          <div className="flex-1 w-full relative bg-[#07050e]">
            <iframe
              src="/masters/index.html"
              title="Synapse MTech AI Innovation Sprint"
              className="w-full h-full border-0"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // STEP 2: BACHELOR'S MISSION ARENA - ORIENTATION PRESENTATION (GIT REPO)
  // =========================================================================
  if (viewMode === 'repo' && !selectedTeamKey) {
    return (
      <section className="full-section justify-center items-center py-4 px-2 sm:px-6 relative overflow-hidden bg-[#07050E]">
        <div id="bachelors-arena-container" className="w-full max-w-7xl mx-auto flex flex-col h-[88vh] min-h-[680px] z-10 rounded-2xl overflow-hidden border border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.3)] bg-[#07050E]">
          {/* Control Bar */}
          <div className="bg-[#0f0923] border-b border-purple-500/30 px-4 sm:px-6 py-2.5 flex items-center justify-between flex-wrap gap-2 shadow-lg z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  audioService.playClick();
                  setSelectedAcademicLevel(null);
                }}
                className="inline-flex items-center gap-2 text-xs font-mono text-purple-200 hover:text-white bg-purple-900/80 hover:bg-purple-800 border border-purple-400/50 px-4 py-2 rounded-full transition-all shadow-neon-purple cursor-pointer font-bold"
              >
                ← RETURN TO ACADEMIC PATH
              </button>
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 font-mono text-xs">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>BACHELOR'S ARENA • ORIENTATION PRESENTATION REPO</span>
              </div>
            </div>

            {/* Mode Switcher & Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  audioService.playClick();
                  setViewMode('native');
                }}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-300 hover:text-white bg-purple-950/80 border border-purple-500/40 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                ⚡ SWITCH TO REACT ARENA
              </button>
              <button
                onClick={() => handleToggleFullscreen('bachelors-arena-container')}
                title="Toggle Fullscreen"
                className="inline-flex items-center justify-center p-2 rounded-full text-purple-300 hover:text-white bg-purple-950/80 hover:bg-purple-900/90 border border-purple-500/40 hover:border-purple-400 transition-all cursor-pointer shadow-neon-purple"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <a
                href="/orientation/index.html"
                target="_blank"
                rel="noopener noreferrer"
                title="Open Fullscreen in New Tab"
                className="inline-flex items-center justify-center p-2 rounded-full text-purple-300/80 hover:text-purple-200 bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 hover:border-purple-400/50 transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Embedded Exact Orientation Presentation Repository App */}
          <div className="flex-1 w-full relative bg-[#07050e]">
            <iframe
              src="/orientation/index.html"
              title="Synapse AI Orientation Presentation"
              className="w-full h-full border-0"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // STEP 2 (NATIVE): BACHELOR'S MISSION ARENA - CHOOSE YOUR TEAM
  // =========================================================================
  if (!selectedTeamKey) {
    return (
      <section className="full-section justify-center items-center py-8">
        <div className="max-w-4xl mx-auto px-6 z-10 w-full text-center">
          <div className="flex items-center justify-center gap-3 flex-wrap mb-6">
            <button
              onClick={() => {
                audioService.playClick();
                setSelectedAcademicLevel(null);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-300 hover:text-white bg-purple-950/60 border border-purple-500/30 px-3 py-1.5 rounded-full transition-colors"
            >
              ← RETURN TO ACADEMIC PATH
            </button>
            <button
              onClick={() => {
                audioService.playClick();
                setViewMode('repo');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 hover:text-white bg-cyan-950/60 border border-cyan-500/30 px-3 py-1.5 rounded-full transition-colors"
            >
              🎮 VIEW ORIENTATION PRESENTATION (REPO)
            </button>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-3 shadow-neon-violet">
            <Target className="w-4 h-4 text-purple-400" />
            <span>BACHELOR'S MISSION ARENA</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-3">
            CHOOSE YOUR TEAM
          </h2>
          <p className="font-sans text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-10">
            Select Team A or Team B below. Completing missions sequentially awards live XP directly to your Synapse profile pass!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* TEAM A CARD */}
            <div
              onClick={() => handleSelectTeam('teamA')}
              onMouseEnter={() => audioService.playHover()}
              className="glass-card glass-card-hover rounded-3xl p-8 border-2 border-purple-500/30 hover:border-purple-400 bg-purple-900/30 text-left cursor-pointer transition-all hover:scale-105 shadow-xl group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-purple-900/60 text-purple-300 border border-purple-400/30">
                  <Bot className="w-8 h-8 text-purple-400" />
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 font-mono text-xs text-purple-300 font-bold">
                  {getTeamProgressCount('teamA')} / 3 COMPLETED
                </span>
              </div>

              <span className="font-mono text-xs text-purple-400 font-bold">PROTOCOL A</span>
              <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                TEAM A
              </h3>
              <p className="font-mono text-xs text-cyan-300 mb-3 font-semibold">3 MISSIONS • THINK LIKE AI</p>
              <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                Prompt Engineering Challenge, AI Emoji Decoder, and Operation Synapse Restore.
              </p>

              <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between font-mono text-xs text-purple-300">
                <span>REWARDS: +1,200 XP TOTAL</span>
                <span className="font-bold text-purple-300 group-hover:translate-x-1 transition-transform">
                  SELECT TEAM A →
                </span>
              </div>
            </div>

            {/* TEAM B CARD */}
            <div
              onClick={() => handleSelectTeam('teamB')}
              onMouseEnter={() => audioService.playHover()}
              className="glass-card glass-card-hover rounded-3xl p-8 border-2 border-purple-500/30 hover:border-cyan-400 bg-purple-900/30 text-left cursor-pointer transition-all hover:scale-105 shadow-xl group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-purple-900/60 text-purple-300 border border-purple-400/30">
                  <Wand2 className="w-8 h-8 text-cyan-400" />
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 font-mono text-xs text-cyan-300 font-bold">
                  {getTeamProgressCount('teamB')} / 3 COMPLETED
                </span>
              </div>

              <span className="font-mono text-xs text-cyan-400 font-bold">PROTOCOL B</span>
              <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                TEAM B
              </h3>
              <p className="font-mono text-xs text-purple-300 mb-3 font-semibold">3 MISSIONS • CREATE WITH AI</p>
              <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                Wizard's Game Forge, AI Vision Challenge, and Prompt Relay.
              </p>

              <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between font-mono text-xs text-cyan-300">
                <span>REWARDS: +1,200 XP TOTAL</span>
                <span className="font-bold text-cyan-300 group-hover:translate-x-1 transition-transform">
                  SELECT TEAM B →
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // STEP 8: TEAM COMPLETE SCREEN
  // =========================================================================
  if (isTeamCompleteScreen && selectedTeam) {
    return (
      <section className="full-section justify-center items-center py-8">
        <div className="max-w-3xl mx-auto px-6 z-10 w-full text-center">
          {renderProgressIndicator()}

          <div className="glass-card rounded-3xl p-8 sm:p-12 border-2 border-emerald-500/50 bg-emerald-950/20 shadow-neon-cyan relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/40 border border-emerald-500/40 text-emerald-300 font-mono text-xs mb-4">
              <Trophy className="w-4 h-4 text-emerald-400" />
              <span>PROTOCOL MASTERED</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-2">
              {selectedTeam.name} COMPLETE ✓
            </h2>
            <p className="font-mono text-sm text-emerald-300 font-bold mb-6">
              ALL 3 MISSIONS SUCCESSFULLY COMPLETED
            </p>

            <div className="my-8 py-6 px-8 rounded-2xl bg-purple-950/80 border border-purple-500/40 max-w-sm mx-auto">
              <div className="font-mono text-xs text-purple-300 mb-1">TOTAL XP EARNED</div>
              <div className="font-display text-4xl font-extrabold text-cyan-300">+1,200 XP</div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  audioService.playClick();
                  setSelectedTeamKey(null);
                  setIsTeamCompleteScreen(false);
                }}
                className="btn-synapse w-full sm:w-auto inline-flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RETURN TO TEAM SELECTION</span>
              </button>

              <button
                onClick={() => {
                  audioService.playClick();
                  const other = selectedTeamKey === 'teamA' ? 'teamB' : 'teamA';
                  handleSelectTeam(other);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full font-mono text-xs font-bold text-cyan-300 bg-purple-950/80 border border-cyan-400/40 hover:bg-cyan-950/60 transition-colors"
              >
                SWITCH TO {selectedTeamKey === 'teamA' ? 'TEAM B' : 'TEAM A'} →
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // STEP 4 & 6: MISSION COMPLETE INTERMEDIATE SCREEN
  // =========================================================================
  if (isMissionCompleteScreen && currentMission) {
    return (
      <section className="full-section justify-center items-center py-8">
        <div className="max-w-2xl mx-auto px-6 z-10 w-full text-center">
          {renderProgressIndicator()}

          <div className="glass-card rounded-3xl p-8 sm:p-10 border-2 border-emerald-400/40 bg-purple-950/40 shadow-2xl animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-neon-cyan">
              <CheckCircle2 className="w-9 h-9 text-emerald-400 animate-bounce" />
            </div>

            <h3 className="font-display text-3xl font-extrabold text-white mb-2">MISSION COMPLETE ✓</h3>
            <p className="font-mono text-xs text-purple-300 mb-6">{currentMission.title}</p>

            <div className="inline-block px-6 py-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 mb-8">
              <div className="font-mono text-xs text-emerald-300">XP EARNED</div>
              <div className="font-display text-3xl font-bold text-emerald-400">+{currentMission.xpReward} XP</div>
            </div>

            <div>
              <button
                onClick={handleNextMission}
                className="btn-synapse w-full sm:w-auto px-8 py-3.5 inline-flex items-center justify-center gap-2 text-base font-bold shadow-neon-purple"
              >
                <span>NEXT MISSION</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // STEP 3, 5, 7: ACTIVE SINGLE MISSION DISPLAY
  // =========================================================================
  if (!currentMission) return null;

  return (
    <section className="full-section justify-center items-center py-8">
      <div className="max-w-3xl mx-auto px-6 z-10 w-full">
        {/* Top Back / Navigation Bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              audioService.playClick();
              setSelectedTeamKey(null);
            }}
            className="text-xs font-mono text-purple-300 hover:text-white bg-purple-950/60 border border-purple-500/30 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
          >
            ← BACK TO TEAM SELECTION
          </button>
          <span className="font-mono text-xs text-purple-400 font-bold">{selectedTeam?.name} PROTOCOL</span>
        </div>

        {/* Progress Indicator */}
        {renderProgressIndicator()}

        {/* Single Mission Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-purple-500/40 shadow-2xl text-left bg-purple-950/40">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-900/70 border border-purple-400/30 text-2xl">
                {currentMission.icon}
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-purple-400">{selectedTeam?.name}</span>
                <div className="font-mono text-xs font-bold text-cyan-300">{currentMission.badge}</div>
              </div>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-purple-900/60 border border-purple-400/40 font-mono text-xs text-emerald-400 font-bold shadow-neon-violet">
              +{currentMission.xpReward} XP REWARD
            </div>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white mb-2">
            {currentMission.title}
          </h2>
          <p className="font-mono text-xs text-purple-300 mb-6">{currentMission.subtitle}</p>

          <div className="p-4 rounded-2xl bg-purple-900/30 border border-purple-500/20 mb-6">
            <p className="font-sans text-sm sm:text-base text-gray-200 leading-relaxed italic">
              "{currentMission.description}"
            </p>
          </div>

          {/* Mission Objectives */}
          <div className="mb-8">
            <h4 className="font-mono text-xs font-bold text-purple-300 mb-3 tracking-wider uppercase flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" /> MISSION OBJECTIVES
            </h4>
            <div className="space-y-2.5">
              {currentMission.objectives.map((obj, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-purple-950/60 border border-purple-500/20 text-xs sm:text-sm text-gray-300 font-sans"
                >
                  <span className="w-5 h-5 rounded-full bg-purple-900/80 border border-purple-400/40 flex items-center justify-center font-mono text-[10px] text-purple-300 font-bold shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Start Mission Action Button */}
          <div className="pt-6 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-mono text-xs text-gray-400">
              STATUS: {completedMissions.includes(currentMission.id) ? 'COMPLETED' : 'READY TO INITIALIZE'}
            </div>

            <button
              onClick={handleStartMission}
              className="btn-synapse w-full sm:w-auto px-8 py-3.5 inline-flex items-center justify-center gap-2 text-sm sm:text-base font-bold shadow-neon-purple"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>START MISSION PROTOCOL</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE MISSION CHALLENGE MODAL SIMULATOR                             */}
      {/* ========================================================================= */}
      {activeInteractiveMission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fade-in">
          <div className="glass-card w-full max-w-3xl max-h-[90vh] rounded-3xl p-6 sm:p-8 overflow-y-auto border-2 border-purple-400/50 shadow-2xl flex flex-col no-scrollbar">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-purple-500/30 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeInteractiveMission.icon}</span>
                <div>
                  <div className="font-mono text-xs text-purple-300 font-bold">
                    {selectedTeam?.name} • {activeInteractiveMission.badge}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                    {activeInteractiveMission.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setActiveInteractiveMission(null)}
                className="p-2 rounded-full hover:bg-purple-900/60 text-purple-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body depending on mission id */}
            <div className="flex-1 space-y-6">
              {/* Mission 01 (Alpha): Prompt Engineering Challenge */}
              {activeInteractiveMission.id === 'alpha-m1' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-xs sm:text-sm text-gray-300 font-mono">
                    <span className="text-cyan-400 font-bold">FORMULA GUIDE:</span> [Subject] + [Environment] + [Art Style] + [Lighting Parameters]
                  </div>

                  <label className="block text-xs font-mono text-purple-300">ENTER YOUR DETAILED GEMINI PROMPT:</label>
                  <textarea
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    rows={4}
                    className="w-full bg-purple-950/80 border border-purple-500/40 rounded-2xl p-4 font-mono text-xs sm:text-sm text-white focus:outline-none focus:border-purple-400"
                  />

                  <button
                    onClick={() => {
                      setIsEvaluating(true);
                      setTimeout(() => {
                        setIsEvaluating(false);
                        handleCompleteCurrentMission();
                      }, 1000);
                    }}
                    disabled={isEvaluating}
                    className="btn-synapse w-full py-3 inline-flex items-center justify-center gap-2"
                  >
                    {isEvaluating ? (
                      <span>EVALUATING PROMPT PARAMETERS...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SUBMIT PROMPT & COMPLETE MISSION (+400 XP)</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Mission 02 (Alpha): AI Emoji Decoder */}
              {activeInteractiveMission.id === 'alpha-m2' && (
                <div className="space-y-4 text-center">
                  <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/30">
                    <div className="font-mono text-xs text-purple-300 mb-2">CORRUPTED TRANSMISSION STREAM:</div>
                    <div className="text-4xl sm:text-5xl tracking-widest my-3">🤖 💬 ✨ 🔐 💻</div>
                    <p className="font-mono text-xs text-cyan-300">Decode the 5-emoji sequence to restore language core.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    {[
                      'Prompt Engineering & Cyber Crypt Cipher',
                      'Quantum Hardware Array',
                      'Autonomous Mobile Robotics',
                      'Cloud Database Mirror'
                    ].map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setEmojiScore(idx === 0 ? 100 : 75);
                        }}
                        className={`p-3 rounded-xl font-mono text-xs border transition-all ${
                          emojiScore !== null && idx === 0
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                            : 'bg-purple-950/40 border-purple-500/30 hover:border-purple-400 text-purple-200'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleCompleteCurrentMission}
                    className="btn-synapse w-full py-3 inline-flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>CONFIRM DECODED SIGNAL (+400 XP)</span>
                  </button>
                </div>
              )}

              {/* Mission 03 (Alpha): Operation Synapse Restore */}
              {activeInteractiveMission.id === 'alpha-m3' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/30">
                    <div className="font-mono text-xs text-purple-300 mb-2">SYSTEM MODULE ALIGNMENT (5 MODULES):</div>
                    <div className="space-y-2">
                      {['Core AI Neural Engine', 'Phishing Shield', 'Cryptographic Cipher Decoder', 'Protocol Mesh', 'Data Bridge'].map(
                        (mod, i) => {
                          const isPlaced = activeModules.includes(i);
                          return (
                            <button
                              key={i}
                              onClick={() => {
                                if (!isPlaced) setActiveModules((prev) => [...prev, i]);
                              }}
                              className={`w-full p-2.5 rounded-xl font-mono text-xs flex items-center justify-between border transition-all ${
                                isPlaced
                                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                                  : 'bg-purple-900/40 border-purple-500/30 text-purple-300 hover:border-purple-400'
                              }`}
                            >
                              <span>MODULE 0{i + 1}: {mod}</span>
                              <span>{isPlaced ? '✓ RESTORED' : 'CLICK TO RESTORE'}</span>
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleCompleteCurrentMission}
                    className="btn-synapse w-full py-3 inline-flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>RESTORE ALL 5 MODULES (+400 XP)</span>
                  </button>
                </div>
              )}

              {/* Mission 01 (Beta): Wizard's Game Forge */}
              {activeInteractiveMission.id === 'beta-m1' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-left space-y-3">
                    <div className="font-mono text-xs text-cyan-300 font-bold">GEMINI CANVAS RAPID GAME LAB</div>
                    <label className="block text-xs font-mono text-purple-300">SELECT SPELL POWER MECHANIC:</label>
                    <select
                      value={wizardSpell}
                      onChange={(e) => setWizardSpell(e.target.value)}
                      className="w-full bg-purple-900/80 border border-purple-500/40 rounded-xl p-3 font-mono text-xs text-white"
                    >
                      <option value="Arcane Portal">Arcane Portal & Teleport Physics</option>
                      <option value="Fireball Barrage">Fireball Barrage & Particle Collision</option>
                      <option value="Lightning Storm">Lightning Storm & Chain Reaction</option>
                    </select>
                  </div>

                  <button
                    onClick={handleCompleteCurrentMission}
                    className="btn-synapse w-full py-3 inline-flex items-center justify-center gap-2"
                  >
                    <Wand2 className="w-4 h-4 text-cyan-400" />
                    <span>COMPILE & DEPLOY CANVAS GAME (+400 XP)</span>
                  </button>
                </div>
              )}

              {/* Mission 02 (Beta): AI Vision Challenge */}
              {activeInteractiveMission.id === 'beta-m2' && (
                <div className="space-y-4 text-center">
                  <div className="p-6 rounded-2xl bg-purple-950/60 border border-purple-500/30">
                    <div className="font-mono text-xs text-cyan-300 mb-3">HIGH-MAGNIFICATION COMPUTER VISION SCAN:</div>
                    <div className="w-24 h-24 rounded-2xl bg-purple-900/80 border-2 border-cyan-400 flex items-center justify-center mx-auto mb-3 shadow-neon-cyan">
                      <Eye className="w-12 h-12 text-cyan-300 animate-pulse" />
                    </div>
                    <p className="font-mono text-xs text-purple-300">Zoomed Render: 5nm Silicon Transistor Grid Array</p>
                  </div>

                  <button
                    onClick={handleCompleteCurrentMission}
                    className="btn-synapse w-full py-3 inline-flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>VERIFY HARDWARE FEATURE (+400 XP)</span>
                  </button>
                </div>
              )}

              {/* Mission 03 (Beta): Prompt Relay */}
              {activeInteractiveMission.id === 'beta-m3' && (
                <div className="space-y-4 text-center">
                  <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/30">
                    <div className="font-mono text-xs text-purple-300 mb-3">10-NODE AGENT RELAY TRANSMISSION:</div>
                    <div className="flex items-center justify-center gap-1 font-mono text-xs text-cyan-300 overflow-x-auto py-2">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 rounded border ${
                            relayHops > i
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                              : 'bg-purple-900/40 border-purple-500/20 text-gray-500'
                          }`}
                        >
                          Node {i + 1}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setRelayHops(10);
                      setTimeout(handleCompleteCurrentMission, 600);
                    }}
                    className="btn-synapse w-full py-3 inline-flex items-center justify-center gap-2"
                  >
                    <Radio className="w-4 h-4" />
                    <span>TRANSMIT RELAY ACROSS ALL 10 NODES (+400 XP)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
