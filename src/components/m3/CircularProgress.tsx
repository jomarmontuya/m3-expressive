"use client";

import * as React from "react";
import { Progress } from "@base-ui/react/progress";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, durations, colorVar } from "@/lib/m3/tokens";
import type { M3Spring } from "@/lib/m3/tokens";

/** tokens.ts `satisfies` widens spring `type` to string; narrow for framer-motion. */
const asTransition = (s: M3Spring): Transition => s as Transition;

export type CircularProgressColor =
  "primary" | "secondary" | "tertiary" | "error";

export interface CircularProgressProps {
  /** 0–100. Omit for the indeterminate sweeping arc. */
  value?: number;
  /** Outer diameter in px. Default 40 for flat and 48 for wavy. */
  size?: number;
  /** Indicator stroke width in px. Default 4. */
  thickness?: number;
  /** M3 Expressive circular waveform. Uses the official 48dp default size. */
  wavy?: boolean;
  /** @deprecated Use `wavy`. Kept for compatibility with LinearProgress. */
  wavey?: boolean;
  color?: CircularProgressColor;
  /** Accessible name announced by screen readers. Default "Loading". */
  ariaLabel?: string;
  className?: string;
}

/**
 * M3 Circular progress indicator. The flat indicator defaults to 40dp; the
 * Expressive wavy indicator defaults to 48dp so the waveform stays legible.
 * Determinate: a round-capped arc grows with a spring and leaves a real 4dp
 * transparent gap before and after the remaining track. Circular indicators
 * do not use the linear indicator's stop dot. Indeterminate: the M3 arc grows
 * to ~270° and contracts while the ring rotates, without a visible track.
 *
 * No radial primitive — custom SVG retained; Progress.Root donates the
 * `role="progressbar"` semantics (aria-valuenow/min/max + valuetext, and the
 * `data-indeterminate`/`data-progressing`/`data-complete` states) from a
 * wrapper element while the ring itself stays a plain `aria-hidden` SVG.
 */
/** Material 3 circular progress indicator. @see https://m3.material.io/components/progress-indicators/overview */
export const CircularProgress = React.forwardRef<
  HTMLDivElement,
  CircularProgressProps
>(function CircularProgress(
  {
    value,
    size,
    thickness = 4,
    wavy,
    wavey = false,
    color = "primary",
    ariaLabel = "Loading",
    className,
  },
  ref,
) {
  const reduceMotion = useReducedMotion() ?? false;
  const determinate = typeof value === "number";
  const isWavy = wavy ?? wavey;
  const resolvedSize = size ?? (isWavy ? 48 : 40);
  const v = determinate ? Math.min(100, Math.max(0, value)) : 0;
  const stroke = colorVar(color);
  const cx = resolvedSize / 2;
  const r = (resolvedSize - thickness) / 2 - (isWavy ? 3 : 1);
  const c = 2 * Math.PI * r;
  // Round caps extend by half a stroke at both ends, so add one stroke width
  // to the 4dp token to keep the visible gap at 4dp.
  const gap = 4;
  const activeFraction = v / 100;
  const arcLen = activeFraction * c;
  const offset = c - arcLen;
  const adjustedGap = Math.min(arcLen, gap + thickness);
  const trackStart = arcLen + adjustedGap;
  const trackLen = Math.max(0, c - arcLen - adjustedGap * 2);
  const trackGapFraction = Math.min(activeFraction, (gap + thickness) / c);
  const trackStartFraction = activeFraction + trackGapFraction;
  const trackFraction = Math.max(
    0,
    1 - activeFraction - trackGapFraction * 2,
  );
  const arc = 0.15; // indeterminate rest arc (normalized; grows to 0.75 = 270°)
  const spin = (durations.long2 * 3) / 1000;

  // Sample one closed sine wave around the circumference. Keeping a stable
  // command count also lets browsers interpolate the determinate path cleanly.
  const wavePath = (() => {
    const points = 96;
    // CircularProgressIndicatorTokens.ActiveWaveAmplitude = 1.6dp at 4dp.
    const amplitude = (1.6 * thickness) / 4;
    let path = "";
    for (let i = 0; i <= points; i += 1) {
      const angle = (i / points) * Math.PI * 2 - Math.PI / 2;
      const waveRadius = r + Math.sin(angle * 10) * amplitude;
      const x = cx + Math.cos(angle) * waveRadius;
      const y = cx + Math.sin(angle) * waveRadius;
      path += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
    }
    return `${path}Z`;
  })();

  const track = isWavy ? (
    <path
      d={wavePath}
      fill="none"
      stroke="var(--md-secondary-container)"
      strokeWidth={thickness}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={`${trackFraction} ${1 - trackFraction}`}
      strokeDashoffset={-trackStartFraction}
    />
  ) : (
    <circle
      cx={cx}
      cy={cx}
      r={r}
      fill="none"
      stroke="var(--md-secondary-container)"
      strokeWidth={thickness}
      strokeLinecap="round"
      strokeDasharray={`${trackLen} ${c - trackLen}`}
      strokeDashoffset={-trackStart}
      transform={`rotate(-90 ${cx} ${cx})`}
    />
  );

  if (!determinate) {
    return (
      <Progress.Root
        ref={ref}
        value={null}
        aria-label={ariaLabel}
        className={cn("inline-block shrink-0", className)}
      >
        <motion.svg
          aria-hidden="true"
          width={resolvedSize}
          height={resolvedSize}
          viewBox={`0 0 ${resolvedSize} ${resolvedSize}`}
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: spin, repeat: Infinity, ease: "linear" }
          }
        >
          {isWavy ? (
            <motion.path
              d={wavePath}
              fill="none"
              stroke={stroke}
              strokeWidth={thickness}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      strokeDasharray: [
                        `${arc} ${1 - arc}`,
                        "0.75 0.25",
                        `${arc} ${1 - arc}`,
                      ],
                    }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: spin,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            />
          ) : (
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
              animate={
                reduceMotion
                  ? undefined
                  : {
                      strokeDasharray: [
                        `${arc} ${1 - arc}`,
                        "0.75 0.25",
                        `${arc} ${1 - arc}`,
                      ],
                    }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: spin,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            />
          )}
        </motion.svg>
      </Progress.Root>
    );
  }

  return (
    <Progress.Root
      ref={ref}
      value={v}
      aria-label={ariaLabel}
      /* Locale-independent valuetext — Base UI's Intl-percent default (e.g.
         "42 %" in fr-FR) would drift between SSR and non-English browsers. */
      getAriaValueText={(_formatted, val) => `${Math.round(val ?? 0)}%`}
      className={cn("inline-block shrink-0", className)}
    >
      <motion.svg
        aria-hidden="true"
        width={resolvedSize}
        height={resolvedSize}
        viewBox={`0 0 ${resolvedSize} ${resolvedSize}`}
      >
        {track}
        {isWavy ? (
          <motion.path
            d={wavePath}
            fill="none"
            stroke={stroke}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            initial={reduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: v / 100 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : asTransition(springs.defaultSpatial)
            }
          />
        ) : (
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
            initial={reduceMotion ? false : { strokeDashoffset: c }}
            animate={{ strokeDashoffset: offset }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : asTransition(springs.defaultSpatial)
            }
          />
        )}
      </motion.svg>
    </Progress.Root>
  );
});

CircularProgress.displayName = "CircularProgress";

export { circularProgressMeta } from "@/lib/m3/meta";
