"use client";

/* eslint-disable max-lines -- Flat and wavy progress variants share one semantic root. */

import * as React from "react";
import { Progress } from "@base-ui/react/progress";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { durations, easings, colorVar } from "@/lib/m3/tokens";

export type LinearProgressColor =
  "primary" | "secondary" | "tertiary" | "error";

export interface LinearProgressProps {
  /** 0–100. Omit for the indeterminate sweeping indicator. */
  value?: number;
  /** M3 Expressive wavy indicator line instead of a flat bar. */
  wavey?: boolean;
  /** M3 Expressive wavy indicator line. Preferred spelling; overrides `wavey`. */
  wavy?: boolean;
  color?: LinearProgressColor;
  /** Track height in px (flat bar only — the wavy line is fixed at 10px). Default 4. */
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

/** A long repeating wave that slides one period per loop (svg spans 200% width). */
function WaveSvg({
  stroke,
  slideDuration,
  wavelength,
  reduceMotion,
}: {
  stroke: string;
  slideDuration: number;
  wavelength: number;
  reduceMotion: boolean;
}) {
  const patternId = React.useId().replace(/:/g, "");
  const height = 10;

  return (
    <motion.svg
      className="block h-full w-[calc(200%+40px)]"
      animate={reduceMotion ? undefined : { x: [0, -wavelength] }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: slideDuration, repeat: Infinity, ease: "linear" }
      }
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          width={wavelength}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={wavePath(wavelength, height, wavelength)}
            fill="none"
            stroke={stroke}
            strokeWidth={3}
            strokeLinecap="round"
          />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${patternId})`} />
    </motion.svg>
  );
}

/** Wave content with the signature M3E amplitude pulse. */
function PulsingWave({
  stroke,
  slideDuration,
  wavelength,
  reduceMotion,
}: {
  stroke: string;
  slideDuration: number;
  wavelength: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      className="h-full w-full"
      style={{ transformOrigin: "50% 50%" }}
      animate={reduceMotion ? undefined : { scaleY: [1, 1.4, 1] }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: durations.extraLong4 / 1000,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      <WaveSvg
        stroke={stroke}
        slideDuration={slideDuration}
        wavelength={wavelength}
        reduceMotion={reduceMotion}
      />
    </motion.div>
  );
}

/**
 * M3 Linear progress indicator — flat (baseline) or Expressive wavy. The
 * wavy track is 10dp high with a 40dp determinate wavelength and a tighter
 * 20dp indeterminate wavelength.
 * Semantics come from Base UI's Progress parts: `Root` renders the
 * `role="progressbar"` element (aria-valuenow/min/max + a valuetext, and
 * `data-indeterminate`/`data-progressing`/`data-complete` state attributes),
 * `Track` is the visible rail and `Indicator` is the value-sliced bar (Base UI
 * applies `inset-inline-start: 0` + the percentage `width` inline when
 * determinate, and nothing while indeterminate). All M3 visuals stay ours via
 * className; no buffer/range styling exists in the M3 spec or the current API.
 */
export const LinearProgress = React.forwardRef<
  HTMLDivElement,
  LinearProgressProps
>(function LinearProgress(
  {
    value,
    wavey = false,
    wavy,
    color = "primary",
    height = 4,
    fullWidth = false,
    label,
    className,
  },
  ref,
) {
  const reduceMotion = useReducedMotion() ?? false;
  const determinate = typeof value === "number";
  const isWavy = wavy ?? wavey;
  const v = determinate ? Math.min(100, Math.max(0, value)) : 0;
  const stroke = colorVar(color);
  const slide = durations.extraLong2 / 1000;
  const trackStart =
    v <= 0
      ? "0px"
      : `min(calc(${v}% + 4px), calc(100% - 4px))`;

  return (
    <Progress.Root
      ref={ref}
      value={determinate ? v : null}
      aria-label={label ?? "Loading"}
      /* Locale-independent valuetext — Base UI's Intl-percent default (e.g.
         "42 %" in fr-FR) would drift between SSR and non-English browsers. */
      getAriaValueText={(_formatted, val) =>
        val == null ? "indeterminate progress" : `${Math.round(val)}%`
      }
      className={cn("flex flex-col gap-1", fullWidth && "w-full", className)}
    >
      {(label || determinate) && (
        <div className="flex items-center justify-between">
          {label && (
            // Progress.Label wires aria-labelledby on the Root for screen readers
            <Progress.Label className="md-label-medium text-m3-on-surface-variant">
              {label}
            </Progress.Label>
          )}
          {determinate && (
            /* Deterministic "N%" text — Base UI's Intl percent formatting is
               locale-dependent (e.g. "42 %" in fr-FR) and would drift from the
               previous rendering / SSR hydration. Value is aria-hidden, so the
               live value is announced once via the Root's valuetext. */
            <Progress.Value className="md-label-medium text-m3-on-surface-variant">
              {(_formattedValue, val) => `${Math.round(val ?? 0)}%`}
            </Progress.Value>
          )}
        </div>
      )}

      {isWavy ? (
        <Progress.Track className="relative h-[10px] overflow-hidden rounded-full">
          {/* The determinate track starts after a real transparent 4dp gap. */}
          <span
            className="absolute end-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-m3-secondary-container"
            style={{ insetInlineStart: determinate ? trackStart : 0 }}
          />
          {determinate ? (
            // Base UI slices the Indicator to the value percentage (inline width)
            <Progress.Indicator
              className="absolute top-0 overflow-hidden"
              style={{ maxWidth: "calc(100% - 8px)" }}
            >
              <PulsingWave
                stroke={stroke}
                slideDuration={slide}
                wavelength={40}
                reduceMotion={reduceMotion}
              />
            </Progress.Indicator>
          ) : (
            <Progress.Indicator className="absolute inset-0">
              <PulsingWave
                stroke={stroke}
                slideDuration={slide}
                wavelength={20}
                reduceMotion={reduceMotion}
              />
            </Progress.Indicator>
          )}
          {determinate && (
            <span
              className="absolute end-0 top-1/2 h-[4px] w-[4px] -translate-y-1/2 rounded-full"
              style={{ background: stroke }}
            />
          )}
        </Progress.Track>
      ) : (
        <Progress.Track
          className="relative overflow-visible rounded-full bg-transparent"
          style={{ height }}
        >
          <span
            className="absolute inset-y-0 end-0 rounded-full bg-m3-secondary-container"
            style={{ insetInlineStart: determinate ? trackStart : 0 }}
          />
          {determinate ? (
            // Width is owned by Base UI (inline % of value); the end-state is
            // animated with the M3 emphasized curve (CSS approximation of the
            // defaultSpatial spring), maxWidth keeps the 4px stop-dot gap.
            <Progress.Indicator
              className="absolute top-0 rounded-full"
              style={{
                background: stroke,
                maxWidth: "calc(100% - 8px)",
                transition: reduceMotion
                  ? "none"
                  : `width ${durations.medium4}ms ${easings.emphasized}`,
              }}
            />
          ) : (
            <Progress.Indicator className="absolute inset-0 overflow-hidden rounded-full">
              <motion.div
                className="absolute top-0 h-full rounded-full"
                style={{ background: stroke, width: "35%" }}
                animate={
                  reduceMotion
                    ? { insetInlineStart: "0%" }
                    : { insetInlineStart: ["-35%", "100%"] }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: (durations.medium2 * 3) / 1000,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              />
              <motion.div
                className="absolute top-0 h-full rounded-full"
                style={{ background: stroke, width: "60%" }}
                animate={
                  reduceMotion
                    ? { insetInlineStart: "40%" }
                    : { insetInlineStart: ["100%", "-60%"] }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: (durations.medium2 * 3) / 1000,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: durations.short4 / 1000,
                      }
                }
              />
            </Progress.Indicator>
          )}
          {determinate && (
            <span
              className="absolute end-0 top-1/2 h-[4px] w-[4px] -translate-y-1/2 rounded-full"
              style={{ background: stroke }}
            />
          )}
        </Progress.Track>
      )}
    </Progress.Root>
  );
});

LinearProgress.displayName = "LinearProgress";

export { linearProgressMeta } from "@/lib/m3/meta";
