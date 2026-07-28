"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const lines = [
  "> ACCESSING MISSION DATABASE...",
  "> CLEARANCE LEVEL: ALPHA",
  "> DECRYPTING MISSION FILE...",
  "",
  "MISSION OBJECTIVE",
  "\"You have been recruited as AI Innovation Consultants. Your team has 15 minutes to design an AI-powered solution for a real-world problem. Use AI as your assistant—not your replacement. Your goal is to think critically, collaborate effectively, and present a practical solution.\""
];

export function MissionBrief() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [typingIndex, setTypingIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (typingIndex < lines.length) {
      const currentLine = lines[typingIndex];
      
      if (currentLine === "") {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          newLines[typingIndex] = "";
          return newLines;
        });
        setTypingIndex(prev => prev + 1);
        setCharIndex(0);
        return;
      }

      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (newLines[typingIndex] === undefined) {
            newLines[typingIndex] = "";
          }
          newLines[typingIndex] = currentLine.substring(0, charIndex + 1);
          return newLines;
        });

        if (charIndex < currentLine.length - 1) {
          setCharIndex(prev => prev + 1);
        } else {
          setTimeout(() => {
            setTypingIndex(prev => prev + 1);
            setCharIndex(0);
          }, typingIndex < 3 ? 500 : 300);
        }
      }, 30);

      return () => clearTimeout(timeout);
    }
  }, [isInView, typingIndex, charIndex]);

  return (
    <section id="mission-brief" className="min-h-screen py-24 px-4 flex items-center justify-center relative">
      <div className="max-w-4xl w-full" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="rounded-xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(138,43,226,0.15)] bg-black/80 backdrop-blur-md terminal-container"
        >
          {/* Terminal Header */}
          <div className="flex items-center px-4 py-3 bg-[#1A1A24] border-b border-white/5">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-danger"></div>
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <div className="w-3 h-3 rounded-full bg-success"></div>
            </div>
            <div className="flex-1 text-center font-mono text-xs text-text-muted tracking-widest">
              SYNAPSE_TERMINAL v2.0
            </div>
            <div className="w-12"></div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 md:p-8 font-mono text-sm md:text-base lg:text-lg min-h-[400px]">
            {displayedLines.map((line, idx) => {
              const isPrompt = lines[idx]?.startsWith(">");
              const isTitle = lines[idx] === "MISSION OBJECTIVE";
              
              return (
                <div key={idx} className={`mb-3 leading-relaxed ${isTitle ? 'mt-6 mb-4 text-purple-accent font-bold text-xl' : ''}`}>
                  {isPrompt ? (
                    <>
                      <span className="text-purple-accent mr-2">{'>'}</span>
                      <span className="text-text-primary">{line.substring(1)}</span>
                    </>
                  ) : isTitle ? (
                    <span>{line}</span>
                  ) : (
                    <span className="text-text-secondary">{line}</span>
                  )}
                  {idx === typingIndex && (
                    <span className="inline-block w-2.5 h-5 bg-purple-accent ml-1 animate-pulse align-middle" />
                  )}
                </div>
              );
            })}
            
            {typingIndex >= lines.length && (
              <div className="mt-2">
                <span className="inline-block w-2.5 h-5 bg-purple-accent animate-pulse align-middle" />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default MissionBrief;
