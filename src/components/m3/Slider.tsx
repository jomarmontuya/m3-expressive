'use client';

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Slider as BaseSlider } from "@base-ui-components/react/slider";
import { cn } from "@/lib/utils";
import { springs as springsTokens } from "@/lib/m3/tokens";

/** Token springs retyped as framer-motion Transitions (`type` widens to string). */
const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Shows tick dots at each step on the inactive track */
  discrete?: boolean;
  /** Shows the value bubble while hovering or dragging */
  showValueLabel?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

/**
 * M3 Expressive slider — a thick 16px track with the signature tall thin
 * handle (4×44dp) that widens to 6dp while engaged, and 4dp on-surface stop
 * indicator dots (one at the track end; one per step when `discrete`).
 * The interactive row is 48dp tall to satisfy the touch-target guideline.
 *
 * Built on Base UI's headless Slider: Root owns value state, Control owns
 * pointer capture, drag tracking and the full keyboard contract (arrows
 * ±step, PageUp/PageDown ±10 steps, Home/End), Track/Indicator size the
 * fill, and Thumb is our handle rendered as a motion.span for the
 * expressive width spring. Our `value`/`onChange` API stays the public
 * contract; Base UI's array-or-number value is normalized inside.
 */
export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    discrete = false,
    showValueLabel = false,
    disabled = false,
    fullWidth = false,
    className,
    ...rest
  },
  ref
) {
  const [active, setActive] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const safeStep = step > 0 ? step : 1;

  const frac = max === min ? 0 : (value - min) / (max - min);
  const fraction = Math.min(1, Math.max(0, frac));

  const engaged = active || hover;
  const handleWidth = engaged ? 6 : 4;
  const tickCount = discrete ? Math.max(2, Math.min(24, Math.round((max - min) / safeStep) + 1)) : 0;

  return (
    <div
      ref={ref}
      className={cn("relative select-none", fullWidth ? "w-full" : "w-64", disabled && "pointer-events-none opacity-38", className)}
      {...rest}
    >
      <BaseSlider.Root
        value={value}
        min={min}
        max={max}
        step={safeStep}
        disabled={disabled}
        onValueChange={(next) => onChange(Array.isArray(next) ? (next[0] ?? min) : next)}
      >
        <BaseSlider.Control
          onPointerDown={() => setActive(true)}
          onPointerUp={() => setActive(false)}
          onPointerCancel={() => setActive(false)}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => {
            setHover(false);
            setActive(false);
          }}
          className="m3-focus relative flex h-12 w-full cursor-pointer touch-none items-center rounded-full outline-none"
        >
          <BaseSlider.Track className="relative h-4 w-full">
            {/* inactive track + active fill (Indicator gets left/width inline) */}
            <div className="pointer-events-none absolute inset-0 rounded-full bg-m3-surface-container-highest" />
            <BaseSlider.Indicator className="absolute inset-y-0 rounded-full bg-m3-primary" />
            {/* M3E stop indicators — 4dp on-surface dots on the inactive track */}
            {discrete && tickCount > 1 ? (
              <div className="pointer-events-none absolute inset-x-[6px] inset-y-0" aria-hidden="true">
                {Array.from({ length: tickCount }, (_, i) => {
                  const f = i / (tickCount - 1);
                  if (f <= fraction) return null;
                  return (
                    <span
                      key={i}
                      className="absolute top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-m3-on-surface"
                      style={{ left: `${f * 100}%` }}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="pointer-events-none absolute inset-y-0 right-[6px] flex items-center" aria-hidden="true">
                <span
                  className="h-1 w-1 rounded-full bg-m3-on-surface transition-opacity duration-150"
                  style={{ opacity: fraction >= 1 ? 0 : 1 }}
                />
              </div>
            )}
            {/* Thumb: Base UI renders the positioning wrapper + hidden native
                range input (focus/ARIA/keyboard). Children must go through the
                normal children slot — a render element would REPLACE Base UI's
                children and drop the input. */}
            <BaseSlider.Thumb className="pointer-events-none outline-none">
              <motion.span
                className="block rounded-full bg-m3-primary"
                initial={false}
                animate={{ width: handleWidth, height: 44 }}
                transition={springs.fastVisual}
              />
            </BaseSlider.Thumb>
          </BaseSlider.Track>
          <AnimatePresence>
            {showValueLabel && engaged && (
              <motion.span
                key="value-bubble"
                className="pointer-events-none absolute bottom-full mb-2 inline-block whitespace-nowrap rounded-full bg-m3-primary px-2 py-0.5 text-m3-on-primary md-label-medium"
                style={{ left: `${fraction * 100}%`, x: "-50%" }}
                initial={{ opacity: 0, scale: 0.6, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6, y: 4 }}
                transition={springs.expressive}
              >
                {value}
              </motion.span>
            )}
          </AnimatePresence>
        </BaseSlider.Control>
      </BaseSlider.Root>
    </div>
  );
});

export { sliderMeta } from "@/lib/m3/meta";
