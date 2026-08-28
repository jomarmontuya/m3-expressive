'use client';

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Transition } from "framer-motion";
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
 * Pointer-driven with full keyboard support (arrows ±step, PageUp/PageDown
 * ±10 steps, Home/End) and an optional value bubble. The interactive row is
 * 48dp tall to satisfy the touch-target guideline.
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
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const safeStep = step > 0 ? step : 1;

  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const snap = (v: number) => {
    const snapped = Math.round((v - min) / safeStep) * safeStep + min;
    return clamp(Number(snapped.toFixed(6)));
  };

  const frac = max === min ? 0 : (value - min) / (max - min);
  const fraction = Math.min(1, Math.max(0, frac));

  const valueFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const f = rect.width === 0 ? 0 : (clientX - rect.left) / rect.width;
    onChange(snap(clamp(min + f * (max - min))));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setActive(true);
    valueFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || !active) return;
    valueFromClientX(e.clientX);
  };

  const endDrag = () => setActive(false);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const page = Math.max(safeStep, (max - min) / 10);
    let next: number;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = snap(value + safeStep);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = snap(value - safeStep);
        break;
      case "PageUp":
        next = snap(value + page);
        break;
      case "PageDown":
        next = snap(value - page);
        break;
      case "Home":
        next = min;
        break;
      case "End":
        next = max;
        break;
      default:
        return;
    }
    e.preventDefault();
    if (next !== value) onChange(next);
  };

  const engaged = active || hover;
  const handleWidth = engaged ? 6 : 4;
  const tickCount = discrete ? Math.max(2, Math.min(24, Math.round((max - min) / safeStep) + 1)) : 0;

  return (
    <div
      ref={ref}
      className={cn("relative select-none", fullWidth ? "w-full" : "w-64", disabled && "pointer-events-none opacity-38", className)}
    >
      <div
        ref={trackRef}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-orientation="horizontal"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => {
          setHover(false);
          endDrag();
        }}
        onKeyDown={onKeyDown}
        {...rest}
        className="m3-focus relative flex h-12 w-full cursor-pointer touch-none items-center rounded-full outline-none"
      >
        <div className="relative h-4 w-full">
          <div className="absolute inset-0 flex overflow-hidden rounded-full">
            <div className="h-full bg-m3-primary" style={{ width: `${fraction * 100}%` }} />
            <div className="h-full flex-1 bg-m3-surface-container-highest" />
          </div>
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
          {/* M3E tall thin handle */}
          <span
            className="pointer-events-none absolute top-1/2"
            style={{ left: `${fraction * 100}%`, transform: "translate(-50%, -50%)" }}
          >
            <motion.span
              className="block rounded-full bg-m3-primary"
              initial={false}
              animate={{ width: handleWidth, height: 44 }}
              transition={springs.fastVisual}
            />
          </span>
        </div>
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
      </div>
    </div>
  );
});

export { sliderMeta } from "@/lib/m3/meta";
