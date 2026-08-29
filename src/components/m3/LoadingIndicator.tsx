"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { durations, colorVar, springs } from "@/lib/m3/tokens";
import type { M3Spring } from "@/lib/m3/tokens";

/** tokens.ts `satisfies` widens spring `type` to string; narrow for framer-motion. */
const asTransition = (spring: M3Spring): Transition => spring as Transition;

export type LoadingIndicatorColor =
  "primary" | "secondary" | "tertiary" | "error";
export type LoadingIndicatorVariant = "uncontained" | "contained";

const containerStyles: Record<LoadingIndicatorColor, string> = {
  primary: "bg-m3-primary-container",
  secondary: "bg-m3-secondary-container",
  tertiary: "bg-m3-tertiary-container",
  error: "bg-m3-error-container",
};

type IndicatorShape =
  | "circle"
  | "soft-burst"
  | "cookie-9"
  | "pentagon"
  | "pill"
  | "sunny"
  | "cookie-4"
  | "oval";

const TAU = Math.PI * 2;
const POINTS = 40;

function regularPolygonRadius(angle: number, sides: number) {
  const sector = TAU / sides;
  const local =
    ((((angle + sector / 2) % sector) + sector) % sector) - sector / 2;
  return Math.cos(Math.PI / sides) / Math.cos(local);
}

function superellipseRadius(
  angle: number,
  xRadius: number,
  yRadius: number,
  power: number,
) {
  const x = Math.abs(Math.cos(angle) / xRadius) ** power;
  const y = Math.abs(Math.sin(angle) / yRadius) ** power;
  return (x + y) ** (-1 / power);
}

/** Builds compatible SVG paths for the seven official Material shapes. */
function indicatorPath(shape: IndicatorShape) {
  let path = "";
  for (let index = 0; index < POINTS; index += 1) {
    const angle = (index / POINTS) * TAU - Math.PI / 2;
    let radius = 1;
    if (shape === "soft-burst") radius = 0.76 + 0.24 * Math.cos(angle * 10);
    if (shape === "cookie-9") radius = 0.84 + 0.16 * Math.cos(angle * 9);
    if (shape === "pentagon") radius = regularPolygonRadius(angle, 5);
    if (shape === "pill") radius = superellipseRadius(angle, 1, 0.58, 6);
    if (shape === "sunny") radius = 0.8 + 0.2 * Math.cos(angle * 8);
    if (shape === "cookie-4") radius = 0.78 + 0.22 * Math.cos(angle * 4);
    if (shape === "oval") radius = superellipseRadius(angle, 1, 0.7, 2);

    const x = 50 + Math.cos(angle) * radius * 46;
    const y = 50 + Math.sin(angle) * radius * 46;
    path += `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return `${path}Z`;
}

/** Compose morphs the determinate default directly from Circle to SoftBurst. */
function determinatePath(progress: number) {
  let path = "";
  for (let index = 0; index < POINTS; index += 1) {
    const angle = (index / POINTS) * TAU - Math.PI / 2;
    const softBurstRadius = 0.76 + 0.24 * Math.cos(angle * 10);
    const radius = 1 + (softBurstRadius - 1) * progress;
    const x = 50 + Math.cos(angle) * radius * 46;
    const y = 50 + Math.sin(angle) * radius * 46;
    path += `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return `${path}Z`;
}

const CIRCLE_PATH = indicatorPath("circle");
const MORPH_PATHS = [
  indicatorPath("soft-burst"),
  indicatorPath("cookie-9"),
  indicatorPath("pentagon"),
  indicatorPath("pill"),
  indicatorPath("sunny"),
  indicatorPath("cookie-4"),
  indicatorPath("oval"),
  indicatorPath("soft-burst"),
];

export interface LoadingIndicatorProps {
  /** Container size in px (square). Default 48 (official ContainerHeight). */
  size?: number;
  /** 0–1 progress. When set, the indicator morphs from Circle to SoftBurst. */
  progress?: number;
  /** false pauses the morph and rests at a circle at 38% opacity. Default true. */
  active?: boolean;
  /** Official uncontained indicator or the 48dp tonal container variant. */
  variant?: LoadingIndicatorVariant;
  color?: LoadingIndicatorColor;
  /** Purpose announced while active. Default "Loading". */
  ariaLabel?: string;
  className?: string;
}

/**
 * No Base UI primitive for the expressive loading indicator in v1.0.0-rc.0 — custom implementation retained.
 *
 * M3 Expressive loading indicator. The official default is uncontained;
 * `variant="contained"` places the same 38dp indicator in a 48dp tonal
 * container. Set `progress` to use the official determinate Circle-to-SoftBurst
 * morph. Without progress, each morph starts at the official 650ms interval
 * while the indicator makes the official 4666ms global rotation. Reduced motion
 * renders a static, full-opacity result while keeping progress semantics. Inactive
 * indeterminate indicators leave the accessibility tree so they stop announcing
 * progress.
 */
export const LoadingIndicator = React.forwardRef<
  HTMLDivElement,
  LoadingIndicatorProps
>(function LoadingIndicator(
  {
    size = 48,
    progress,
    active = true,
    variant = "uncontained",
    color = "primary",
    ariaLabel = "Loading",
    className,
  },
  ref,
) {
  const reduceMotion = useReducedMotion() ?? false;
  const determinate = typeof progress === "number";
  const resolvedProgress = determinate
    ? Math.min(1, Math.max(0, progress))
    : 0;
  const spinning = active && !determinate && !reduceMotion;
  const globalRotation = (durations.extraLong4 * 4.666) / 1000;
  const morphStep = (durations.extraLong4 * 0.65) / 1000;
  const morphCycle = morphStep * 7;
  const contained = variant === "contained";
  const indicatorColor = colorVar(
    contained ? `on-${color}-container` : color,
  );

  return (
    <div
      ref={ref}
      role={active || determinate ? "progressbar" : undefined}
      aria-label={active || determinate ? ariaLabel : undefined}
      aria-valuemin={determinate ? 0 : undefined}
      aria-valuemax={determinate ? 1 : undefined}
      aria-valuenow={determinate ? resolvedProgress : undefined}
      aria-hidden={active || determinate ? undefined : true}
      data-variant={variant}
      className={cn(
        "relative flex items-center justify-center rounded-full",
        contained && containerStyles[color],
        !active && !determinate && "opacity-38",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        className="h-[79.1667%] w-[79.1667%] overflow-visible"
        aria-hidden="true"
        animate={spinning ? { rotate: 360 } : { rotate: 0 }}
        transition={
          spinning
            ? { duration: globalRotation, repeat: Infinity, ease: "linear" }
            : { duration: durations.short4 / 1000 }
        }
      >
        {determinate ? (
          <motion.path
            d={determinatePath(resolvedProgress)}
            fill={indicatorColor}
            stroke={indicatorColor}
            strokeWidth="1.5"
            strokeLinejoin="round"
            animate={{
              d: determinatePath(resolvedProgress),
              rotate: -resolvedProgress * 180,
            }}
            transition={reduceMotion ? { duration: 0 } : asTransition(springs.defaultSpatial)}
            style={{ transformOrigin: "50px 50px" }}
          />
        ) : (
          <motion.path
            d={CIRCLE_PATH}
            fill={indicatorColor}
            stroke={indicatorColor}
            strokeWidth="1.5"
            strokeLinejoin="round"
            animate={
              spinning
                ? {
                    d: MORPH_PATHS,
                    rotate: [0, 90, 180, 270, 360, 450, 540, 630],
                  }
                : { d: CIRCLE_PATH, rotate: 0 }
            }
            transition={
              spinning
                ? {
                    d: {
                      duration: morphCycle,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: morphCycle,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }
                : { duration: durations.short4 / 1000 }
            }
            style={{ transformOrigin: "50px 50px" }}
          />
        )}
      </motion.svg>
    </div>
  );
});

LoadingIndicator.displayName = "LoadingIndicator";

export { loadingIndicatorMeta } from "@/lib/m3/meta";
