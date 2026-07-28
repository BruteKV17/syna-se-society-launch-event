"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlowButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export function GlowButton({
  children,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: GlowButtonProps) {
  let variantClasses = "";
  if (variant === "primary") {
    variantClasses =
      "bg-gradient-to-r from-purple-primary to-purple-secondary border-transparent text-white shadow-[0_0_15px_rgba(138,43,226,0.5)] hover:shadow-[0_0_25px_rgba(138,43,226,0.8)]";
  } else if (variant === "secondary") {
    variantClasses =
      "bg-secondary border-purple-primary text-purple-accent shadow-none hover:shadow-[0_0_15px_rgba(138,43,226,0.3)]";
  } else if (variant === "outline") {
    variantClasses =
      "bg-transparent border border-purple-primary text-purple-accent hover:bg-purple-primary/10 hover:shadow-[0_0_15px_rgba(138,43,226,0.3)] border-2";
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`relative inline-flex items-center justify-center px-6 py-3 font-display uppercase tracking-wider rounded-lg transition-all duration-300 font-bold ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${variantClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
