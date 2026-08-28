'use client';

import * as React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs as springsTokens } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";

/** Token springs retyped as framer-motion Transitions (`type` widens to string). */
const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };

export interface RadioProps {
  checked?: boolean;
  onChange?: () => void;
  label?: string;
  disabled?: boolean;
  /** Applies the error color to the ring and inner dot. */
  error?: boolean;
  className?: string;
}

/**
 * M3 Radio button — a 48px touch target with a 20px ring (2dp stroke) and
 * a 10dp inner dot that springs in (scale 0 → 1) on the expressive spring
 * when selected. Wrap a set of Radios in `RadioGroup` for roving arrow-key
 * navigation.
 */
export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(function Radio(
  { checked = false, onChange, label, disabled = false, error = false, className },
  ref
) {
  return (
    <motion.button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.()}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      transition={springs.fastVisual}
      className={cn(
        "m3-state m3-focus relative inline-flex items-center overflow-hidden rounded-full outline-none",
        error ? "text-m3-error" : checked ? "text-m3-primary" : "text-m3-on-surface-variant",
        disabled && "pointer-events-none opacity-38",
        className
      )}
    >
      <Ripple disabled={disabled} />
      <span className="grid h-12 w-12 shrink-0 place-items-center">
        <span
          className={cn(
            "grid h-5 w-5 place-items-center rounded-full border-2 transition-colors duration-150",
            error
              ? "border-m3-error"
              : checked
                ? "border-m3-primary"
                : "border-m3-on-surface-variant"
          )}
        >
          <motion.span
            className={cn("h-[10px] w-[10px] rounded-full", error ? "bg-m3-error" : "bg-m3-primary")}
            initial={false}
            animate={{ scale: checked ? 1 : 0 }}
            transition={springs.expressive}
          />
        </span>
      </span>
      {label && <span className="pr-3 text-m3-on-surface md-body-large">{label}</span>}
    </motion.button>
  );
});

export interface RadioGroupProps {
  /** Accessible name for the group (rendered as aria-label on role="radiogroup"). */
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * M3 Radio group — a `role="radiogroup"` wrapper that adds the official
 * radio keyboard behavior: ArrowUp/ArrowLeft move to (and select) the
 * previous enabled radio, ArrowDown/ArrowRight the next, wrapping around.
 */
export function RadioGroup({ label, className, children }: RadioGroupProps) {
  const onKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowRight" && e.key !== "ArrowUp" && e.key !== "ArrowLeft") return;
    const root = e.currentTarget;
    const radios = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="radio"]:not([disabled])'));
    if (radios.length === 0) return;
    const forward = e.key === "ArrowDown" || e.key === "ArrowRight";
    const current = radios.indexOf(document.activeElement as HTMLButtonElement);
    const base = current === -1 ? 0 : current;
    const next = forward ? (base + 1) % radios.length : (base - 1 + radios.length) % radios.length;
    e.preventDefault();
    radios[next].focus();
    radios[next].click();
  }, []);

  return (
    <div role="radiogroup" aria-label={label} onKeyDown={onKeyDown} className={cn("flex flex-col", className)}>
      {children}
    </div>
  );
}

export { radioMeta } from "@/lib/m3/meta";
