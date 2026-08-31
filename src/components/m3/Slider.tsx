'use client';
/* eslint-disable max-lines -- official range, centered, vertical, and five-size configurations share one component contract */

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { cn } from "@/lib/utils";
import { springs as springsTokens } from "@/lib/m3/tokens";
import { useTextDirection } from "@/lib/m3/use-text-direction";
import { MaterialSymbol } from "./MaterialSymbol";

const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };

export type SliderVariant = "standard" | "centered" | "range";
export type SliderOrientation = "horizontal" | "vertical";
export type SliderSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeGeometry: Record<SliderSize, { track: number; handle: number; radius: number }> = {
  xs: { track: 16, handle: 44, radius: 8 },
  sm: { track: 24, handle: 44, radius: 8 },
  md: { track: 40, handle: 52, radius: 12 },
  lg: { track: 56, handle: 68, radius: 16 },
  xl: { track: 96, handle: 108, radius: 28 },
};

interface SliderCommonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  min?: number;
  max?: number;
  step?: number;
  /** Current M3 "stops" configuration. */
  stops?: boolean;
  /** Legacy alias for `stops`. */
  discrete?: boolean;
  showValueLabel?: boolean;
  /** Optional Material Symbols inset into the start and end of the track. */
  insetIcons?: { start: string; end: string };
  orientation?: SliderOrientation;
  /** Official M3E size scale. xs is the official default. */
  size?: SliderSize;
  disabled?: boolean;
  /** Native form name. Range sliders submit both values under this name. */
  name?: string;
  /** Distinct native form names for the start and end values of a range slider. */
  rangeNames?: readonly [string, string];
  /** Id of the owning form when the slider renders outside it. */
  form?: string;
  fullWidth?: boolean;
  className?: string;
}

export interface SliderSingleProps extends SliderCommonProps {
  value: number;
  onChange: (value: number) => void;
  variant?: "standard" | "centered";
}

export interface SliderRangeProps extends SliderCommonProps {
  value: readonly [number, number];
  onChange: (value: [number, number]) => void;
  variant: "range";
}

export type SliderProps = SliderSingleProps | SliderRangeProps;

/**
 * Current M3 Expressive slider. The official default is a horizontal,
 * extra-small standard slider. `variant="centered"`, `variant="range"`,
 * vertical orientation and the sm/md/lg/xl sizes select the other official
 * configurations. Base UI owns pointer, keyboard and range-thumb behavior.
 */
/** Material 3 Expressive slider for value selection. @see https://m3.material.io/components/sliders/overview */
export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    value,
    onChange,
    variant: variantProp,
    min = 0,
    max = 100,
    step = 1,
    stops = false,
    discrete = false,
    showValueLabel = false,
    insetIcons,
    orientation = "horizontal",
    size = "xs",
    disabled = false,
    name,
    rangeNames,
    form,
    fullWidth = false,
    className,
    ...rest
  },
  ref
) {
  const reduceMotion = useReducedMotion() ?? false;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const direction = useTextDirection(rootRef);
  const [active, setActive] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const safeStep = step > 0 ? step : 1;
  const isRange = typeof value !== "number";
  const variant: SliderVariant = isRange ? "range" : variantProp ?? "standard";
  const vertical = orientation === "vertical";
  const geometry = sizeGeometry[size];
  const engaged = active || hover;
  // Current SliderTokens: rest + hover are 4dp; focus + press are 2dp.
  const handleWidth = active || focused ? 2 : 4;
  const values: readonly number[] = typeof value === "number" ? [value] : value;
  const fractions = values.map((item) => {
    const raw = max === min ? 0 : (item - min) / (max - min);
    return Math.min(1, Math.max(0, raw));
  });
  const firstFraction = fractions[0] ?? 0;
  const lastFraction = fractions[fractions.length - 1] ?? firstFraction;
  const showStops = stops || discrete;
  const tickCount = showStops
    ? Math.max(2, Math.min(100, Math.round((max - min) / safeStep) + 1))
    : 0;
  const ariaLabel = rest["aria-label"];

  const handleValueChange = (next: number | readonly number[]) => {
    if (isRange) {
      const nextValues = typeof next === "number" ? [next, next] : next;
      (onChange as SliderRangeProps["onChange"])([
        nextValues[0] ?? min,
        nextValues[1] ?? max,
      ]);
    } else {
      (onChange as SliderSingleProps["onChange"])(typeof next === "number" ? next : (next[0] ?? min));
    }
  };

  const isFractionActive = (fraction: number) => {
    if (variant === "range") return fraction >= firstFraction && fraction <= lastFraction;
    if (variant === "centered") {
      return fraction >= Math.min(0.5, firstFraction) && fraction <= Math.max(0.5, firstFraction);
    }
    return fraction <= firstFraction;
  };

  const segments: Array<{ start: number; end: number; active: boolean; gapStart?: boolean; gapEnd?: boolean }> =
    variant === "range"
      ? [
          { start: 0, end: firstFraction, active: false, gapEnd: true },
          { start: firstFraction, end: lastFraction, active: true, gapStart: true, gapEnd: true },
          { start: lastFraction, end: 1, active: false, gapStart: true },
        ]
      : variant === "centered"
        ? firstFraction >= 0.5
          ? [
              { start: 0, end: 0.5, active: false },
              { start: 0.5, end: firstFraction, active: true, gapEnd: true },
              { start: firstFraction, end: 1, active: false, gapStart: true },
            ]
          : [
              { start: 0, end: firstFraction, active: false, gapEnd: true },
              { start: firstFraction, end: 0.5, active: true, gapStart: true },
              { start: 0.5, end: 1, active: false },
            ]
        : [
            { start: 0, end: firstFraction, active: true, gapEnd: true },
            { start: firstFraction, end: 1, active: false, gapStart: true },
          ];

  const controlCrossSize = Math.max(48, geometry.handle);

  return (
    <div
      ref={(node) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className={cn(
        "relative select-none",
        vertical
          ? fullWidth
            ? "h-full"
            : "h-64"
          : fullWidth
            ? "w-full"
            : "w-64",
        disabled && "pointer-events-none",
        className
      )}
      {...rest}
    >
      {isRange && rangeNames && (
        <>
          <input type="hidden" name={rangeNames[0]} form={form} value={values[0]} disabled={disabled} />
          <input type="hidden" name={rangeNames[1]} form={form} value={values[1]} disabled={disabled} />
        </>
      )}
      <DirectionProvider direction={direction}>
      <BaseSlider.Root
        value={value}
        min={min}
        max={max}
        step={safeStep}
        orientation={orientation}
        disabled={disabled}
        name={isRange && rangeNames ? undefined : name}
        form={form}
        onValueChange={handleValueChange}
      >
        <BaseSlider.Control
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
          onPointerDown={() => setActive(true)}
          onPointerUp={() => setActive(false)}
          onPointerCancel={() => setActive(false)}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => {
            setHover(false);
            setActive(false);
          }}
          className={cn(
            "m3-focus relative flex cursor-pointer touch-none items-center justify-center rounded-full outline-none",
            vertical ? "h-full" : "w-full",
            focused && "outline-[3px_solid_var(--md-primary)] outline-offset-2"
          )}
          style={vertical ? { width: controlCrossSize } : { height: controlCrossSize }}
        >
          <BaseSlider.Track
            className="relative"
            style={vertical ? { width: geometry.track, height: "100%" } : { width: "100%", height: geometry.track }}
          >
            {segments.map((segment, index) => {
              const startGap = segment.gapStart ? 6 : 0;
              const endGap = segment.gapEnd ? 6 : 0;
              const length = Math.max(0, segment.end - segment.start) * 100;
              const radius = geometry.radius;
              const inside = 2;
              return (
                <span
                  key={`segment-${index}`}
                  className={cn(
                    "pointer-events-none absolute",
                    disabled
                      ? segment.active
                        ? "bg-m3-on-surface/38"
                        : "bg-m3-on-surface/12"
                      : segment.active
                        ? "bg-m3-primary"
                        : "bg-m3-secondary-container"
                  )}
                  style={
                    vertical
                      ? {
                          bottom: `calc(${segment.start * 100}% + ${startGap}px)`,
                          height: `max(0px, calc(${length}% - ${startGap + endGap}px))`,
                          width: geometry.track,
                          borderRadius: `${segment.end === 1 ? radius : inside}px ${segment.end === 1 ? radius : inside}px ${segment.start === 0 ? radius : inside}px ${segment.start === 0 ? radius : inside}px`,
                        }
                      : {
                          insetInlineStart: `calc(${segment.start * 100}% + ${startGap}px)`,
                          width: `max(0px, calc(${length}% - ${startGap + endGap}px))`,
                          height: geometry.track,
                          borderStartStartRadius: segment.start === 0 ? radius : inside,
                          borderEndStartRadius: segment.start === 0 ? radius : inside,
                          borderStartEndRadius: segment.end === 1 ? radius : inside,
                          borderEndEndRadius: segment.end === 1 ? radius : inside,
                        }
                  }
                />
              );
            })}

            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              {(showStops ? Array.from({ length: tickCount }, (_, i) => i / (tickCount - 1)) : [1]).map(
                (fraction, index) => {
                  const hiddenByThumb = fractions.some((thumbFraction) => Math.abs(thumbFraction - fraction) < 0.001);
                  if (hiddenByThumb) return null;
                  return (
                    <span
                      key={index}
                      className={cn(
                        "absolute h-1 w-1 rounded-full",
                        disabled
                          ? "bg-m3-on-surface/38"
                          : isFractionActive(fraction)
                            ? "bg-m3-on-primary"
                            : "bg-m3-on-secondary-container"
                      )}
                      style={
                        vertical
                          ? {
                              bottom: `${fraction * 100}%`,
                              insetInlineStart: "50%",
                              transform: `translate(${direction === "rtl" ? "50%" : "-50%"}, 50%)`,
                            }
                          : {
                              insetInlineStart: `${fraction * 100}%`,
                              top: "50%",
                              transform: `translate(${direction === "rtl" ? "50%" : "-50%"}, -50%)`,
                            }
                      }
                    />
                  );
                }
              )}
            </div>

            {insetIcons && (
              <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
                <MaterialSymbol
                  icon={insetIcons.start}
                  size={20}
                  className={cn(
                    "absolute",
                    isFractionActive(0) ? "text-m3-on-primary" : "text-m3-on-secondary-container"
                  )}
                  style={
                    vertical
                      ? {
                          bottom: 10,
                          insetInlineStart: "50%",
                          transform: `translateX(${direction === "rtl" ? "50%" : "-50%"})`,
                        }
                      : { insetInlineStart: 10, top: "50%", transform: "translateY(-50%)" }
                  }
                />
                <MaterialSymbol
                  icon={insetIcons.end}
                  size={20}
                  className={cn(
                    "absolute",
                    isFractionActive(1) ? "text-m3-on-primary" : "text-m3-on-secondary-container"
                  )}
                  style={
                    vertical
                      ? {
                          top: 10,
                          insetInlineStart: "50%",
                          transform: `translateX(${direction === "rtl" ? "50%" : "-50%"})`,
                        }
                      : { insetInlineEnd: 10, top: "50%", transform: "translateY(-50%)" }
                  }
                />
              </div>
            )}

            {values.map((item, index) => (
              <BaseSlider.Thumb
                key={index}
                index={isRange ? index : undefined}
                getAriaLabel={() =>
                  isRange
                    ? `${index === 0 ? "Start" : "End"}${ariaLabel ? ` ${ariaLabel}` : " value"}`
                    : ariaLabel ?? "Slider value"
                }
                className="pointer-events-none outline-none"
              >
                <motion.span
                  className={cn(
                    "block rounded-full",
                    disabled ? "bg-m3-on-surface/38" : "bg-m3-primary"
                  )}
                  initial={false}
                  animate={
                    vertical
                      ? { width: geometry.handle, height: handleWidth }
                      : { width: handleWidth, height: geometry.handle }
                  }
                  transition={reduceMotion ? { duration: 0 } : springs.fastVisual}
                />
              </BaseSlider.Thumb>
            ))}
          </BaseSlider.Track>

          <AnimatePresence>
            {showValueLabel && (engaged || focused) &&
              values.map((item, index) => (
                <motion.span
                  key={`value-${index}`}
                  className="pointer-events-none absolute inline-block whitespace-nowrap rounded-full bg-m3-inverse-surface px-2 py-1 text-m3-inverse-on-surface md-label-large"
                  style={
                    vertical
                      ? {
                          bottom: `${(fractions[index] ?? 0) * 100}%`,
                          insetInlineStart: "100%",
                          marginInlineStart: 8,
                          y: "50%",
                        }
                      : {
                          insetInlineStart: `${(fractions[index] ?? 0) * 100}%`,
                          bottom: "100%",
                          marginBottom: 8,
                          x: direction === "rtl" ? "50%" : "-50%",
                        }
                  }
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.6 }}
                  transition={reduceMotion ? { duration: 0 } : springs.expressive}
                >
                  {item}
                </motion.span>
              ))}
          </AnimatePresence>
        </BaseSlider.Control>
      </BaseSlider.Root>
      </DirectionProvider>
    </div>
  );
});
