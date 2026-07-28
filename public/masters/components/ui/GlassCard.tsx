"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "", ...props }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`glass-card rounded-2xl p-6 transition-all duration-300 hover:border-purple-primary/40 hover:shadow-[0_0_20px_rgba(138,43,226,0.2)] bg-secondary/60 backdrop-blur-[20px] border border-white/10 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
