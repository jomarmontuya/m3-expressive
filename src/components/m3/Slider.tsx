'use client';

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs as springsTokens } from "@/lib/m3/tokens";

/** Token springs retyped as framer-motion Transitions (`type` widens to string). */
const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Shows tick dots under the track */
  discrete?: boolean;
  /** Shows the value bubble while hovering or dragging */
  showValueLabel?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

/**
 * M3 Expressive slider — a thick 16px track with the signature tall thin
 * handle (4×44px) that widens while engaged. Pointer-driven with full
 * keyboard support (arrows, Home/End) and an optional value bubble +
 * discrete tick dots.
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
        className="m3-focus relative flex h-6 w-full cursor-pointer touch-none items-center rounded-full outline-none"
      >
        <div className="flex h-4 w-full overflow-hidden rounded-full">
          <div className="h-full bg-m3-primary" style={{ width: `${fraction * 100}%` }} />
          <div className="h-full flex-1 bg-m3-surface-container-highest" />
        </div>
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
      {discrete && tickCount > 1 && (
        <div className="mt-1 flex w-full items-center justify-between px-[2px]" aria-hidden="true">
          {Array.from({ length: tickCount }, (_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-m3-on-surface-variant" />
          ))}
        </div>
      )}
    </div>
  );
});

export { sliderMeta } from "@/lib/m3/meta";
