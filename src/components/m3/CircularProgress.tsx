"use client";

import { Progress } from "@base-ui-components/react/progress";
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
  /** Accessible name announced by screen readers. Default "Loading". */
  ariaLabel?: string;
  className?: string;
}

/**
 * M3 Circular progress indicator.
 * Determinate: a round-capped arc grows with a spring, stopping a 4px gap
 * before the fixed 4px stop indicator dot at 12 o'clock (official M3E track
 * gap + stop dot). Indeterminate: the M3 arc grows to ~270° and contracts
 * while the ring rotates.
 *
 * No radial primitive — custom SVG retained; Progress.Root donates the
 * `role="progressbar"` semantics (aria-valuenow/min/max + valuetext, and the
 * `data-indeterminate`/`data-progressing`/`data-complete` states) from a
 * wrapper element while the ring itself stays a plain `aria-hidden` SVG.
 */
export function CircularProgress({
  value,
  size = 48,
  thickness = 4,
  color = "primary",
  ariaLabel = "Loading",
  className,
}: CircularProgressProps) {
  const determinate = typeof value === "number";
  const v = determinate ? Math.min(100, Math.max(0, value)) : 0;
  const stroke = colorVar(color);
  const cx = size / 2;
  const r = (size - thickness) / 2 - 1; // headroom for round caps + stop dot
  const c = 2 * Math.PI * r;
  // Official M3E: 4px gap between arc head and the 4px stop dot (TrackActiveSpace).
  const gap = 4;
  const maxArc = c - gap - thickness; // stop dot diameter == stroke thickness
  const arcLen = (v / 100) * maxArc;
  const offset = c - arcLen;
  const dotR = thickness / 2;
  const arc = 0.15; // indeterminate rest arc (normalized; grows to 0.75 = 270°)
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
      <Progress.Root
        value={null}
        aria-label={ariaLabel}
        className={cn("inline-block shrink-0", className)}
      >
        <motion.svg
          aria-hidden="true"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
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
            pathLength={1}
            transform={`rotate(-90 ${cx} ${cx})`}
            animate={{ strokeDasharray: [`${arc} ${1 - arc}`, "0.75 0.25", `${arc} ${1 - arc}`] }}
            transition={{ duration: spin, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.svg>
      </Progress.Root>
    );
  }

  return (
    <Progress.Root
      value={v}
      aria-label={ariaLabel}
      /* Locale-independent valuetext — Base UI's Intl-percent default (e.g.
         "42 %" in fr-FR) would drift between SSR and non-English browsers. */
      getAriaValueText={(_formatted, val) => `${Math.round(val ?? 0)}%`}
      className={cn("inline-block shrink-0", className)}
    >
      <motion.svg aria-hidden="true" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
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
        {/* Fixed stop indicator dot at the track end (12 o'clock) */}
        <circle cx={cx} cy={cx - r} r={dotR} fill={stroke} />
      </motion.svg>
    </Progress.Root>
  );
}

export { circularProgressMeta } from "@/lib/m3/meta";
