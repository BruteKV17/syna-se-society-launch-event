"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: onComplete,
          });
        } else {
          onComplete();
        }
      },
    });

    // 1. Show 'INITIALIZING...'
    const typeObj = { length: 0 };
    const fullText = "INITIALIZING...";
    
    tl.to(text1Ref.current, { opacity: 1, duration: 0.1 })
      .to(typeObj, {
        length: fullText.length,
        duration: 0.5,
        ease: `steps(${fullText.length})`,
        onUpdate: () => {
          if (text1Ref.current) {
            text1Ref.current.innerText = fullText.substring(0, Math.floor(typeObj.length)) + "_";
          }
        }
      });
      
    // 2. Loading bar animates 0% -> 100%
    tl.to(loaderRef.current, { opacity: 1, duration: 0.1 });
    
    tl.to(progressRef.current, {
      width: "100%",
      duration: 2,
      ease: "power2.inOut",
      onUpdate: function () {
        if (percentRef.current) {
          percentRef.current.innerText = Math.round(this.progress() * 100) + "%";
        }
      },
    }, "+=0.1");

    // 3. Terminal lines
    tl.to(text2Ref.current, { opacity: 1, duration: 0.3 }, "+=0.1")
      .to(text3Ref.current, { opacity: 1, duration: 0.3 })
      .to(text4Ref.current, { opacity: 1, duration: 0.3 });

    // 4. Flash and Welcome
    tl.to(flashRef.current, { opacity: 1, duration: 0.1, ease: "power1.inOut" })
      .to(flashRef.current, { opacity: 0, duration: 0.2, ease: "power1.inOut" })
      .to([loaderRef.current, text1Ref.current, text2Ref.current, text3Ref.current, text4Ref.current], { opacity: 0, duration: 0.1 }, "-=0.2")
      .to(welcomeRef.current, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" })
      .to(welcomeRef.current, { opacity: 0, duration: 0.3 }, "+=0.5");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary text-text-primary overflow-hidden"
    >
      <div ref={flashRef} className="absolute inset-0 bg-white opacity-0 pointer-events-none z-10"></div>
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] animate-glitch"></div>
      
      <div className="w-full max-w-2xl px-6 flex flex-col gap-4 font-mono z-0 relative">
        <div ref={text1Ref} className="text-purple-accent text-xl opacity-0 terminal-prompt">
          _
        </div>
        
        <div ref={loaderRef} className="opacity-0 w-full flex flex-col gap-2">
          <div className="flex justify-between text-sm text-text-secondary">
            <span>SYS_CORE_LOAD</span>
            <span ref={percentRef}>0%</span>
          </div>
          <div className="h-1 w-full bg-secondary border border-border-subtle rounded overflow-hidden box-glow">
            <div ref={progressRef} className="h-full w-0 bg-gradient-to-r from-purple-secondary to-purple-accent"></div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4 text-sm text-text-muted">
          <div ref={text2Ref} className="opacity-0">&gt; Loading Synapse Core... [OK]</div>
          <div ref={text3Ref} className="opacity-0">&gt; AI Network Online... [OK]</div>
          <div ref={text4Ref} className="opacity-0">&gt; Authentication Complete... [OK]</div>
        </div>
      </div>

      <div
        ref={welcomeRef}
        className="absolute inset-0 flex items-center justify-center opacity-0 scale-90"
      >
        <h1 className="font-display text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-secondary to-purple-accent text-glow-strong tracking-widest text-center px-4">
          WELCOME AGENTS
        </h1>
      </div>
    </div>
  );
}
