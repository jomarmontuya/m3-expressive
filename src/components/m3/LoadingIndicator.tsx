"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  /** Container size in px (square). Default 48 (official ContainerHeight). */
  size?: number;
  /** false pauses the morphing + spinning animations and rests at a circle at 38% opacity. Default true. */
  active?: boolean;
  color?: LoadingIndicatorColor;
  className?: string;
}

/**
 * M3 EXPRESSIVE Loading indicator (2025) — the signature shape-morphing loader.
 * The container rotates continuously one full turn (official 4666ms global
 * rotation) while its corner shape morphs in 650ms steps, with two dashed
 * arcs spinning on top. Colors follow the official tokens: container =
 * `*-container` role, arcs = matching `on-*-container` role.
 * Set `active={false}` to rest at a static circle at 38% opacity (also used
 * automatically for users with reduced-motion enabled).
 */
export function LoadingIndicator({
  size = 48,
  active = true,
  color = "primary",
  className,
}: LoadingIndicatorProps) {
  const reduceMotion = useReducedMotion();
  const spinning = active && !reduceMotion;

  const globalRotation = (durations.extraLong4 * 4.666) / 1000; // official GlobalRotationDurationMillis = 4666ms
  const morphStep = (durations.extraLong4 * 0.65) / 1000; // official MorphIntervalMillis = 650ms
  const spin = durations.extraLong4 / 1000;
  const arcStroke = colorVar(`on-${color}-container`);

  return (
    <motion.div
      role="status"
      aria-label="Loading"
      className={cn("relative flex items-center justify-center", containerStyles[color], className)}
      style={{ width: size, height: size }}
      animate={
        spinning
          ? { borderRadius: ["50%", "24%", "50%"], rotate: 360, opacity: 1 }
          : { borderRadius: "50%", rotate: 0, opacity: active ? 1 : 0.38 }
      }
      transition={
        spinning
          ? {
              // Per-value transitions: tween keyframes for the morph (springs
              // only support two keyframes), linear for the endless rotation.
              borderRadius: { duration: morphStep * 2, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: globalRotation, repeat: Infinity, ease: "linear" },
              opacity: { duration: durations.short4 / 1000 },
            }
          : asTransition(springs.fastVisual)
      }
    >
      {/* Outer dashed arc — spins clockwise */}
      <motion.div
        className="absolute inset-0"
        animate={spinning ? { rotate: 360 } : { rotate: 0 }}
        transition={
          spinning
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
        animate={spinning ? { rotate: -360 } : { rotate: 0 }}
        transition={
          spinning
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
