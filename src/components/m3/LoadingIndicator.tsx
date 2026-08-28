"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, durations, colorVar } from "@/lib/m3/tokens";
import type { M3Spring } from "@/lib/m3/tokens";

/** tokens.ts `satisfies` widens spring `type` to string; narrow for framer-motion. */
const asTransition = (s: M3Spring): Transition => s as Transition;

export type LoadingIndicatorColor = "primary" | "secondary" | "tertiary" | "error";

const containerStyles: Record<LoadingIndicatorColor, string> = {
  primary: "bg-m3-primary-container",
  secondary: "bg-m3-secondary-container",
  tertiary: "bg-m3-tertiary-container",
  error: "bg-m3-error-container",
};

export interface LoadingIndicatorProps {
  /** Container size in px (square). Default 56. */
  size?: number;
  /** false pauses the morphing + spinning animations. Default true. */
  active?: boolean;
  color?: LoadingIndicatorColor;
  className?: string;
}

/**
 * M3 EXPRESSIVE Loading indicator (2025) — the signature shape-morphing loader.
 * A container continuously morphs its corner shape (circle → squircle → circle)
 * while rotating 45°, with two dashed arcs spinning in opposite directions on
 * top. Set `active={false}` to pause all motion.
 */
export function LoadingIndicator({
  size = 56,
  active = true,
  color = "primary",
  className,
}: LoadingIndicatorProps) {
  const spin = durations.extraLong4 / 1000;
  const arcStroke = colorVar(`on-${color}-container`);

  return (
    <motion.div
      role="status"
      aria-label="Loading"
      className={cn("relative flex items-center justify-center", containerStyles[color], className)}
      style={{ width: size, height: size }}
      animate={
        active
          ? { borderRadius: ["50%", "24%", "50%"], rotate: [0, 45, 0] }
          : { borderRadius: "50%", rotate: 0 }
      }
      transition={
        active
          ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
          : asTransition(springs.fastVisual)
      }
    >
      {/* Outer dashed arc — spins clockwise */}
      <motion.div
        className="absolute inset-0"
        animate={active ? { rotate: 360 } : { rotate: 0 }}
        transition={
          active
            ? { duration: spin, repeat: Infinity, ease: "linear" }
            : asTransition(springs.fastVisual)
        }
      >
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
          <circle
            cx="50"
            cy="50"
            r="27"
            fill="none"
            stroke={arcStroke}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="50 120"
          />
        </svg>
      </motion.div>
      {/* Inner dashed arc — spins counter-clockwise */}
      <motion.div
        className="absolute inset-0"
        animate={active ? { rotate: -360 } : { rotate: 0 }}
        transition={
          active
            ? { duration: spin * 1.6, repeat: Infinity, ease: "linear" }
            : asTransition(springs.fastVisual)
        }
      >
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
          <circle
            cx="50"
            cy="50"
            r="17.5"
            fill="none"
            stroke={arcStroke}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="30 80"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export { loadingIndicatorMeta } from "@/lib/m3/meta";
