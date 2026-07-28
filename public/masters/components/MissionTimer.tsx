"use client";

import { useState, useEffect, useRef } from "react";
import { GlowButton } from "./ui/GlowButton";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

export function MissionTimer() {
  const TOTAL_SECONDS = 15 * 60;
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isRunning && timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    if (isFinished) return;
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft(TOTAL_SECONDS);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const progress = timeLeft / TOTAL_SECONDS;

  let stateClass = "text-[var(--color-purple-primary)] drop-shadow-[0_0_20px_var(--color-purple-primary)]";
  let ringColor = "stroke-[var(--color-purple-primary)]";
  let glowColor = "var(--color-purple-primary)";
  
  if (timeLeft === 0) {
    stateClass = "text-[var(--color-danger)] drop-shadow-[0_0_30px_var(--color-danger)] animate-glitch";
    ringColor = "stroke-[var(--color-danger)]";
    glowColor = "var(--color-danger)";
  } else if (timeLeft < 60) {
    stateClass = "text-[var(--color-danger)] drop-shadow-[0_0_30px_var(--color-danger)] animate-pulse-glow";
    ringColor = "stroke-[var(--color-danger)]";
    glowColor = "var(--color-danger)";
  } else if (timeLeft < 300) {
    stateClass = "text-[var(--color-warning)] drop-shadow-[0_0_25px_var(--color-warning)] animate-pulse-glow";
    ringColor = "stroke-[var(--color-warning)]";
    glowColor = "var(--color-warning)";
  }

  const radius = 180;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <section id="timer" className="relative min-h-screen flex flex-col items-center justify-center bg-bg-primary overflow-hidden py-20">
      {/* Ambient Glow */}
      <div 
        className="absolute w-[60vw] h-[60vw] rounded-full blur-[120px] pointer-events-none transition-colors duration-1000 ease-in-out opacity-20"
        style={{ backgroundColor: glowColor, transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}
      />
      
      <div className="z-10 flex flex-col items-center">
        {/* Timer Display with Ring */}
        <div className="relative flex items-center justify-center w-[400px] h-[400px] md:w-[600px] md:h-[600px]">
          {/* Progress Ring */}
          <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 400 400">
            <circle
              cx="200"
              cy="200"
              r={radius}
              className="fill-none stroke-secondary opacity-20"
              strokeWidth="4"
            />
            <motion.circle
              cx="200"
              cy="200"
              r={radius}
              className={`fill-none ${ringColor} transition-all duration-1000 ease-linear`}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset }}
              initial={{ strokeDashoffset: 0 }}
            />
          </svg>

          {/* Digits */}
          <div className="flex flex-col items-center justify-center text-center">
            {isFinished ? (
              <h2 className={`font-display text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-wider ${stateClass}`}>
                TIME UP
              </h2>
            ) : (
              <h2 className={`font-display text-8xl md:text-[10rem] lg:text-[12rem] font-bold tracking-tighter ${stateClass} leading-none`}>
                {formattedTime}
              </h2>
            )}
            <p className="font-display text-text-secondary text-sm md:text-xl tracking-[0.5em] mt-12">
              MISSION COUNTDOWN
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-16 z-10">
          {!isRunning && !isFinished ? (
            <GlowButton onClick={toggleTimer} className="bg-[color-mix(in_srgb,var(--color-success)_20%,transparent)] text-[var(--color-success)] border-[color-mix(in_srgb,var(--color-success)_50%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-success)_30%,transparent)] px-8 py-4 flex items-center gap-2">
              <Play className="w-6 h-6" /> START
            </GlowButton>
          ) : !isFinished ? (
            <GlowButton onClick={toggleTimer} className="bg-[color-mix(in_srgb,var(--color-warning)_20%,transparent)] text-[var(--color-warning)] border-[color-mix(in_srgb,var(--color-warning)_50%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-warning)_30%,transparent)] px-8 py-4 flex items-center gap-2">
              <Pause className="w-6 h-6" /> PAUSE
            </GlowButton>
          ) : null}
          
          <GlowButton onClick={resetTimer} className="bg-transparent text-text-secondary border-border-subtle hover:text-text-primary px-8 py-4 flex items-center gap-2">
            <RotateCcw className="w-6 h-6" /> RESET
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
