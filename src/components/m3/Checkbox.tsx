'use client';

import * as React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import { cn } from "@/lib/utils";
import { springs as springsTokens } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";

/** Token springs retyped as framer-motion Transitions (`type` widens to string). */
const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };

export interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

/**
 * M3 Checkbox — a 48px touch target with an 18px rounded box.
 * The checkmark draws itself via animated `pathLength` on the
 * expressive spring; indeterminate shows a white dash.
 *
 * Built on Base UI's headless Checkbox Root: it owns the `role="checkbox"`,
 * `aria-checked`/mixed state, hidden form input and keyboard activation.
 * Our `checked`/`indeterminate` props drive it as a controlled component and
 * Base UI's `onCheckedChange(nextChecked)` is adapted to our public
 * `onChange(checked)` — the reported value matches the old semantics
 * (an indeterminate box resolves to checked on click). The checkmark/dash
 * stay custom (framer-motion pathLength springs — no Base UI primitive
 * animates SVG paths).
 */
export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { checked = false, indeterminate = false, onChange, label, disabled = false, error = false, className },
  ref
) {
  const isFilled = checked || indeterminate;

  return (
    <BaseCheckbox.Root
      ref={ref}
      checked={checked}
      indeterminate={indeterminate}
      disabled={disabled}
      nativeButton
      onCheckedChange={(nextChecked) => onChange?.(nextChecked)}
      className={cn(
        "m3-state m3-focus relative inline-flex items-center overflow-hidden rounded-full outline-none",
        error ? "text-m3-error" : isFilled ? "text-m3-primary" : "text-m3-on-surface-variant",
        disabled && "pointer-events-none opacity-38",
        className
      )}
      render={
        <motion.button
          whileTap={disabled ? undefined : { scale: 0.95 }}
          transition={springs.fastVisual}
        />
      }
    >
      <Ripple disabled={disabled} />
      <span className="grid h-12 w-12 shrink-0 place-items-center">
        <motion.span
          className={cn(
            "relative grid h-[18px] w-[18px] place-items-center rounded-[2px] border-2 transition-colors duration-150",
            isFilled
              ? error
                ? "border-m3-error bg-m3-error"
                : "border-m3-primary bg-m3-primary"
              : error
                ? "border-m3-error bg-transparent"
                : "border-m3-on-surface-variant bg-transparent"
          )}
          whileTap={disabled ? undefined : { scale: 0.85 }}
          transition={springs.expressive}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3">
            <motion.path
              d="M20 6 9 17l-5-5"
              fill="none"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={error ? "stroke-m3-on-error" : "stroke-m3-on-primary"}
              initial={false}
              animate={{ pathLength: checked && !indeterminate ? 1 : 0, opacity: checked && !indeterminate ? 1 : 0 }}
              transition={springs.expressive}
            />
          </svg>
          {indeterminate && (
            <motion.span
              className={cn("absolute h-[2px] w-[10px] rounded-full", error ? "bg-m3-on-error" : "bg-m3-on-primary")}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={springs.expressive}
            />
          )}
        </motion.span>
      </span>
      {label && <span className="pr-3 text-m3-on-surface md-body-large">{label}</span>}
    </BaseCheckbox.Root>
  );
});

export { checkboxMeta } from "@/lib/m3/meta";
