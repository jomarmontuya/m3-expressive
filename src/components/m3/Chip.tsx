'use client';

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Toggle } from "@base-ui-components/react/toggle";
import { Button } from "@base-ui-components/react/button";
import { cn } from "@/lib/utils";
import { springs as springsTokens } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

/** Token springs retyped as framer-motion Transitions (`type` widens to string). */
const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };

export type ChipVariant = "assist" | "filter" | "input" | "suggestion";
export type ChipSize = "xs" | "sm" | "md";

/** M3E height scale: xs=28, sm=32, md=40 */
const sizeHeights: Record<ChipSize, number> = { xs: 28, sm: 32, md: 40 };

export interface ChipProps {
  variant?: ChipVariant;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  /** Input chips: renders a trailing cancel affordance */
  onRemove?: () => void;
  leadingIcon?: string;
  trailingIcon?: string;
  elevated?: boolean;
  size?: ChipSize;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * M3 Chip — compact interactive elements: assist, filter (with the
 * animated leading check), input (with a cancel affordance) and
 * suggestion. Press squashes to 96% on the fast visual spring.
 *
 * Built on Base UI headless parts: selectable variants (filter / assist /
 * suggestion — every variant whose public API carries `selected` +
 * `onSelect`) render a Base UI `Toggle`, which owns `aria-pressed` and the
 * pressed state; input chips are pure actions and render a Base UI
 * `Button`. Both render through a `motion.button` so the M3 press squash
 * and visuals are unchanged.
 */
export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  {
    variant = "assist",
    selected = false,
    onSelect,
    onRemove,
    leadingIcon,
    trailingIcon,
    elevated = false,
    size = "sm",
    disabled = false,
    className,
    children,
  },
  ref
) {
  const isInput = variant === "input";
  const isSelectable = variant === "filter" || variant === "assist" || variant === "suggestion";
  const showCheck = selected && (variant === "filter" || variant === "assist");

  const rootClassName = cn(
    "m3-state m3-focus relative inline-flex select-none items-center gap-2 overflow-hidden rounded-full border px-4 md-label-large transition-[background-color,border-color,box-shadow] duration-150",
    elevated && !selected
      ? "m3-elevation-1 border-transparent bg-m3-surface-container-low text-m3-primary hover:[box-shadow:0_1px_2px_0_rgb(0_0_0/0.30),0_2px_6px_2px_rgb(0_0_0/0.15)]"
      : showCheck
        ? "border-transparent bg-m3-secondary-container text-m3-on-secondary-container"
        : "border-m3-outline bg-transparent text-m3-on-surface",
    disabled && "pointer-events-none opacity-38",
    className
  );

  const content = (
    <>
      <Ripple disabled={disabled} />
      <AnimatePresence initial={false} mode="wait">
        {showCheck ? (
          <motion.span
            key="check"
            className="inline-flex shrink-0 items-center justify-center overflow-hidden"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 18, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={springs.fastSpatial}
          >
            <MaterialSymbol icon="check" size={18} />
          </motion.span>
        ) : (
          leadingIcon && (
            <motion.span
              key="leading"
              className="inline-flex shrink-0 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={springs.fastVisual}
            >
              <MaterialSymbol icon={leadingIcon} size={18} />
            </motion.span>
          )
        )}
      </AnimatePresence>
      <span className="truncate">{children}</span>
      {isInput && onRemove && (
        // No Base UI primitive for a nested remove affordance inside a button
        // in v1.0.0-rc.0 — custom implementation retained (a real <button>
        // cannot be nested inside the chip's own <button>).
        <span
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onRemove();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.stopPropagation();
              e.preventDefault();
              if (!disabled) onRemove();
            }
          }}
          className="m3-state -mr-2 grid h-6 w-6 shrink-0 place-items-center overflow-hidden rounded-full text-m3-on-surface-variant transition-colors duration-150 hover:text-m3-on-surface"
        >
          <MaterialSymbol icon="cancel" size={18} />
        </span>
      )}
      {!isInput && trailingIcon && <MaterialSymbol icon={trailingIcon} size={18} className="shrink-0" />}
    </>
  );

  const motionProps = {
    whileTap: disabled ? undefined : ({ scale: 0.96 } as const),
    transition: springs.fastVisual,
  };

  if (isInput) {
    return (
      <Button
        ref={ref}
        disabled={disabled}
        className={rootClassName}
        style={{ height: sizeHeights[size] }}
        render={<motion.button {...motionProps} />}
      >
        {content}
      </Button>
    );
  }

  if (!isSelectable) return null;

  return (
    <Toggle
      ref={ref}
      pressed={selected}
      onPressedChange={(nextPressed) => onSelect?.(nextPressed)}
      disabled={disabled}
      className={rootClassName}
      style={{ height: sizeHeights[size] }}
      render={<motion.button {...motionProps} />}
    >
      {content}
    </Toggle>
  );
});

export { chipMeta } from "@/lib/m3/meta";
