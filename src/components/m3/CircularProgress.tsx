"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, durations, colorVar } from "@/lib/m3/tokens";
import type { M3Spring } from "@/lib/m3/tokens";

/** tokens.ts `satisfies` widens spring `type` to string; narrow for framer-motion. */
const asTransition = (s: M3Spring): Transition => s as Transition;

export type CircularProgressColor = "primary" | "secondary" | "tertiary" | "error";

export interface CircularProgressProps {
  /** 0–100. Omit for the indeterminate sweeping arc. */
  value?: number;
  /** Outer diameter in px. Default 48. */
  size?: number;
  /** Indicator stroke width in px. Default 4. */
  thickness?: number;
  color?: CircularProgressColor;
  className?: string;
}

/**
 * M3 Circular progress indicator.
 * Determinate: a round-capped arc grows with a spring toward a small trailing
 * stop indicator dot. Indeterminate: the M3 signature arc with a ~270° gap
 * sweeps and rotates around the track.
 */
export function CircularProgress({
  value,
  size = 48,
  thickness = 4,
  color = "primary",
  className,
}: CircularProgressProps) {
  const determinate = typeof value === "number";
  const v = determinate ? Math.min(100, Math.max(0, value)) : 0;
  const stroke = colorVar(color);
  const cx = size / 2;
  const r = (size - thickness) / 2 - 1; // headroom for round caps + stop dot
  const c = 2 * Math.PI * r;
  const offset = (1 - v / 100) * c;
  const angle = (v / 100) * 2 * Math.PI;
  const dotR = Math.max(thickness / 2 + 1.5, 2.5);
  const dotX = cx + r * Math.sin(angle);
  const dotY = cx - r * Math.cos(angle);
  const arc = c * 0.18;
  const spin = (durations.long2 * 3) / 1000;

  const track = (
    <circle
      cx={cx}
      cy={cx}
      r={r}
      fill="none"
      stroke="var(--md-surface-container-highest)"
      strokeWidth={thickness}
    />
  );

  if (!determinate) {
    return (
      <motion.svg
        role="progressbar"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={cn("shrink-0", className)}
        animate={{ rotate: 360 }}
        transition={{ duration: spin, repeat: Infinity, ease: "linear" }}
      >
        {track}
        <motion.circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={`${arc} ${c - arc}`}
          transform={`rotate(-90 ${cx} ${cx})`}
          animate={{ strokeDashoffset: [0, -c] }}
          transition={{ duration: spin, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>
    );
  }

  return (
    <motion.svg
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v)}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("shrink-0", className)}
    >
      {track}
      <motion.circle
        cx={cx}
        cy={cx}
        r={r}
        fill="none"
        stroke={stroke}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray={c}
        transform={`rotate(-90 ${cx} ${cx})`}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: offset }}
        transition={asTransition(springs.defaultSpatial)}
      />
      <circle cx={dotX} cy={dotY} r={dotR} fill={stroke} />
    </motion.svg>
  );
}

export { circularProgressMeta } from "@/lib/m3/meta";
