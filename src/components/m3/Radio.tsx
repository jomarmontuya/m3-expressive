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
  className?: string;
}

/**
 * M3 Radio button — a 48px touch target with a 20px ring; the inner
 * dot springs in (scale 0 → 1) on the expressive spring when selected.
 */
export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(function Radio(
  { checked = false, onChange, label, disabled = false, className },
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
        "m3-state relative inline-flex items-center overflow-hidden rounded-full outline-none",
        checked ? "text-m3-primary" : "text-m3-on-surface-variant",
        disabled && "pointer-events-none opacity-38",
        className
      )}
    >
      <Ripple disabled={disabled} />
      <span className="grid h-12 w-12 shrink-0 place-items-center">
        <span
          className={cn(
            "grid h-5 w-5 place-items-center rounded-full border-2 transition-colors duration-150",
            checked ? "border-m3-primary" : "border-m3-on-surface-variant"
          )}
        >
          <motion.span
            className="h-[10px] w-[10px] rounded-full bg-m3-primary"
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

export { radioMeta } from "@/lib/m3/meta";
