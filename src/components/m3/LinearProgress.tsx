"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, durations, colorVar } from "@/lib/m3/tokens";
import type { M3Spring } from "@/lib/m3/tokens";

/** tokens.ts `satisfies` widens spring `type` to string; narrow for framer-motion. */
const asTransition = (s: M3Spring): Transition => s as Transition;

export type LinearProgressColor = "primary" | "secondary" | "tertiary" | "error";

export interface LinearProgressProps {
  /** 0–100. Omit for the indeterminate sweeping indicator. */
  value?: number;
  /** M3 Expressive wavy indicator line instead of a flat bar. */
  wavey?: boolean;
  color?: LinearProgressColor;
  /** Track height in px (flat bar only — the wavy line is fixed at 20px). Default 4. */
  height?: number;
  /** Stretch to the container width. */
  fullWidth?: boolean;
  /** Optional label rendered above the track (with % when determinate). */
  label?: string;
  className?: string;
}

/** Builds a repeating sine path (one Q-pair per period) for the wavy indicator. */
function wavePath(width: number, height: number, period: number): string {
  const mid = height / 2;
  const amp = height / 2 - 3;
  let d = `M0 ${mid}`;
  for (let x = 0; x < width; x += period) {
    d += ` Q ${x + period * 0.25} ${mid - amp} ${x + period / 2} ${mid}`;
    d += ` Q ${x + period * 0.75} ${mid + amp} ${x + period} ${mid}`;
  }
  return d;
}

const WAVE_PATH = wavePath(240, 20, 20);

/** A long repeating wave that slides left one period per loop (svg spans 200% width). */
function WaveSvg({ stroke, slideDuration }: { stroke: string; slideDuration: number }) {
  return (
    <motion.svg
      viewBox="0 0 200 20"
      preserveAspectRatio="none"
      className="block h-full w-[200%]"
      animate={{ x: ["0%", "-10%"] }}
      transition={{ duration: slideDuration, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    >
      <path
        d={WAVE_PATH}
        fill="none"
        stroke={stroke}
        strokeWidth={3}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </motion.svg>
  );
}

/** Wave content with the signature M3E amplitude pulse. */
function PulsingWave({ stroke, slideDuration }: { stroke: string; slideDuration: number }) {
  return (
    <motion.div
      className="h-full w-full"
      style={{ transformOrigin: "50% 50%" }}
      animate={{ scaleY: [1, 1.4, 1] }}
      transition={{ duration: durations.extraLong4 / 1000, repeat: Infinity, ease: "easeInOut" }}
    >
      <WaveSvg stroke={stroke} slideDuration={slideDuration} />
    </motion.div>
  );
}

/**
 * M3 Linear progress indicator — flat (baseline) or Expressive wavy.
 * Determinate mode animates the active indicator with a spring and leaves a
 * 4px gap before the trailing stop indicator dot, per the M3E spec.
 */
export function LinearProgress({
  value,
  wavey = false,
  color = "primary",
  height = 4,
  fullWidth = false,
  label,
  className,
}: LinearProgressProps) {
  const determinate = typeof value === "number";
  const v = determinate ? Math.min(100, Math.max(0, value)) : 0;
  const stroke = colorVar(color);
  const slide = durations.extraLong2 / 1000;

  return (
    <div
      role="progressbar"
      aria-valuemin={determinate ? 0 : undefined}
      aria-valuemax={determinate ? 100 : undefined}
      aria-valuenow={determinate ? Math.round(v) : undefined}
      aria-label={label}
      className={cn("flex flex-col gap-1", fullWidth && "w-full", className)}
    >
      {(label || determinate) && (
        <div className="flex items-center justify-between">
          {label && <span className="md-label-medium text-m3-on-surface-variant">{label}</span>}
          {determinate && (
            <span className="md-label-medium text-m3-on-surface-variant">{Math.round(v)}%</span>
          )}
        </div>
      )}

      {wavey ? (
        <div className="relative h-5 overflow-hidden rounded-full">
          {determinate ? (
            <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${v}%` }}>
              <PulsingWave stroke={stroke} slideDuration={slide} />
            </div>
          ) : (
            <PulsingWave stroke={stroke} slideDuration={slide} />
          )}
          {determinate && (
            <span
              className="absolute right-0 top-1/2 h-[4px] w-[4px] -translate-y-1/2 rounded-full"
              style={{ background: stroke }}
            />
          )}
        </div>
      ) : (
        <div
          className="relative overflow-visible rounded-full bg-m3-surface-container-highest"
          style={{ height }}
        >
          {determinate ? (
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{ background: stroke, maxWidth: "calc(100% - 8px)" }}
              initial={{ width: 0 }}
              animate={{ width: `${v}%` }}
              transition={asTransition(springs.defaultSpatial)}
            />
          ) : (
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <motion.div
                className="absolute top-0 h-full rounded-full"
                style={{ background: stroke, width: "35%" }}
                animate={{ left: ["-35%", "100%"] }}
                transition={{
                  duration: (durations.medium2 * 3) / 1000,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-0 h-full rounded-full"
                style={{ background: stroke, width: "60%" }}
                animate={{ left: ["100%", "-60%"] }}
                transition={{
                  duration: (durations.medium2 * 3) / 1000,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: durations.short4 / 1000,
                }}
              />
            </div>
          )}
          {determinate && (
            <span
              className="absolute right-0 top-1/2 h-[4px] w-[4px] -translate-y-1/2 rounded-full"
              style={{ background: stroke }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export { linearProgressMeta } from "@/lib/m3/meta";
