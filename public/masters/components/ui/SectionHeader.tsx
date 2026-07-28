"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col items-center justify-center text-center w-full my-8 ${className}`}
    >
      <div className="flex items-center justify-center gap-4 w-full">
        {/* Circuit trace left */}
        <div className="flex-1 max-w-[100px] h-px bg-gradient-to-r from-transparent to-purple-primary relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-purple-accent rounded-full shadow-[0_0_5px_#C77DFF]"></div>
        </div>
        
        <h2 className="font-display text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-primary to-purple-accent text-glow">
          {title}
        </h2>
        
        {/* Circuit trace right */}
        <div className="flex-1 max-w-[100px] h-px bg-gradient-to-l from-transparent to-purple-primary relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-purple-accent rounded-full shadow-[0_0_5px_#C77DFF]"></div>
        </div>
      </div>
      
      {subtitle && (
        <p className="mt-4 font-body text-text-secondary text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
