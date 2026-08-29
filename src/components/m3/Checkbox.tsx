'use client';

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import type { CheckboxRootProps } from "@base-ui/react/checkbox";
import { cn } from "@/lib/utils";
import { springs as springsTokens } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";

/** Token springs retyped as framer-motion Transitions (`type` widens to string). */
const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };

export interface CheckboxProps
  extends Omit<CheckboxRootProps, "checked" | "onCheckedChange" | "className" | "render" | "children"> {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  /** Form value submitted when checked. Native default is "on". */
  value?: string;
  /** Optional value submitted when unchecked. */
  uncheckedValue?: string;
  readOnly?: boolean;
  required?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
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
/** Material 3 checkbox for independent selection. @see https://m3.material.io/components/checkbox/overview */
export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  {
    checked,
    indeterminate = false,
    onChange,
    label,
    disabled = false,
    error = false,
    className,
    ...props
  },
  ref
) {
  const reduceMotion = useReducedMotion() ?? false;
  const { defaultChecked, ...rootProps } = props;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
  const actualChecked = checked ?? internalChecked;
  const isFilled = actualChecked || indeterminate;

  return (
    <BaseCheckbox.Root
      ref={ref}
      checked={checked}
      defaultChecked={defaultChecked}
      indeterminate={indeterminate}
      disabled={disabled}
      nativeButton
      onCheckedChange={(nextChecked) => {
        if (checked === undefined) setInternalChecked(nextChecked);
        onChange?.(nextChecked);
      }}
      {...rootProps}
      className={cn(
        "group relative inline-flex min-h-12 items-center outline-none",
        disabled
          ? "pointer-events-none text-m3-on-surface/38"
          : error
            ? "text-m3-error"
            : isFilled
              ? "text-m3-primary"
              : "text-m3-on-surface-variant",
        className
      )}
      render={
        <motion.button
          whileTap={disabled || reduceMotion ? undefined : { scale: 0.95 }}
          transition={reduceMotion ? { duration: 0 } : springs.fastVisual}
        />
      }
    >
      <span className="m3-state relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full group-focus-visible:outline-[3px_solid_var(--md-primary)] group-focus-visible:outline-offset-2">
        <Ripple disabled={disabled} />
        <motion.span
          className={cn(
            "relative grid h-[18px] w-[18px] place-items-center rounded-[2px] border-2 transition-colors duration-150",
            isFilled
              ? disabled
                ? "border-m3-on-surface/38 bg-m3-on-surface/38"
                : error
                ? "border-m3-error bg-m3-error"
                : "border-m3-primary bg-m3-primary"
              : disabled
                ? "border-m3-on-surface/38 bg-transparent"
                : error
                ? "border-m3-error bg-transparent"
                : "border-m3-on-surface-variant bg-transparent"
          )}
          whileTap={disabled || reduceMotion ? undefined : { scale: 0.85 }}
          transition={reduceMotion ? { duration: 0 } : springs.expressive}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3">
            <motion.path
              d="M20 6 9 17l-5-5"
              fill="none"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={disabled ? "stroke-m3-surface" : error ? "stroke-m3-on-error" : "stroke-m3-on-primary"}
              initial={false}
              animate={{ pathLength: actualChecked && !indeterminate ? 1 : 0, opacity: actualChecked && !indeterminate ? 1 : 0 }}
              transition={reduceMotion ? { duration: 0 } : springs.expressive}
            />
          </svg>
          {indeterminate && (
            <motion.span
              className={cn(
                "absolute h-[2px] w-[10px] rounded-full",
                disabled ? "bg-m3-surface" : error ? "bg-m3-on-error" : "bg-m3-on-primary"
              )}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={reduceMotion ? { duration: 0 } : springs.expressive}
            />
          )}
        </motion.span>
      </span>
      {label && (
        <span className={cn("pr-3 md-body-large", disabled ? "text-m3-on-surface/38" : "text-m3-on-surface")}>
          {label}
        </span>
      )}
    </BaseCheckbox.Root>
  );
});

export { checkboxMeta } from "@/lib/m3/meta";
