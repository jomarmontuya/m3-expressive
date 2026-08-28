"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export type SegmentedButtonType = "single" | "multiple";
export type SegmentedButtonSize = "sm" | "md";

export interface SegmentedButtonOption {
  value: string;
  label?: string;
  icon?: string;
}

export interface SegmentedButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  options: SegmentedButtonOption[];
  type?: SegmentedButtonType;
  /** Controlled value: string for single, string[] for multiple; omit for uncontrolled */
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  size?: SegmentedButtonSize;
  disabled?: boolean;
}

/**
 * Official M3 segmented button height is 40dp ("sm", the default). "md" (56dp)
 * is an opt-in M3E expressive scale-up, not the spec height.
 */
const sizeStyles: Record<SegmentedButtonSize, { height: number; icon: number }> = {
  sm: { height: 40, icon: 18 },
  md: { height: 56, icon: 20 },
};

/**
 * M3 Segmented buttons — connected segments inside one pill outline for
 * selecting between 2–5 choices. Selected segments fill with the
 * secondary-container color and a check icon springs open.
 */
export const SegmentedButton = React.forwardRef<HTMLDivElement, SegmentedButtonProps>(
  function SegmentedButton(
    { options, type = "single", value, onValueChange, size = "sm", disabled = false, className, ...props },
    ref
  ) {
    const [internalValue, setInternalValue] = React.useState<string[]>([]);
    const isControlled = value !== undefined;
    const selectedList: string[] = isControlled
      ? Array.isArray(value)
        ? value
        : [value as string]
      : internalValue;
    const s = sizeStyles[size];

    const select = React.useCallback(
      (v: string) => {
        let next: string[];
        if (type === "single") {
          next = selectedList.includes(v) ? [] : [v];
        } else {
          next = selectedList.includes(v)
            ? selectedList.filter((x) => x !== v)
            : [...selectedList, v];
        }
        if (!isControlled) setInternalValue(next);
        onValueChange?.(type === "single" ? (next[0] ?? "") : next);
      },
      [type, selectedList, isControlled, onValueChange]
    );

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "inline-flex select-none rounded-full border",
          disabled ? "border-m3-on-surface/12" : "border-m3-outline",
          className
        )}
        style={{ height: s.height }}
        {...props}
      >
        {options.map((option, i) => {
          const isSelected = selectedList.includes(option.value);

          return (
            <motion.button
              key={option.value}
              type="button"
              disabled={disabled}
              aria-pressed={isSelected}
              onClick={() => select(option.value)}
              whileTap={disabled ? undefined : { scale: 0.97 }}
              transition={springs.fastVisual}
              className={cn(
                "m3-state m3-focus relative flex h-full flex-1 items-center justify-center gap-2 px-4",
                "md-label-large transition-colors duration-150",
                i > 0 && (disabled ? "border-l border-m3-on-surface/12" : "border-l border-m3-outline"),
                i === 0 && "rounded-l-full",
                i === options.length - 1 && "rounded-r-full",
                disabled
                  ? isSelected
                    ? "bg-m3-on-surface/12 text-m3-on-surface/38"
                    : "bg-transparent text-m3-on-surface/38"
                  : isSelected
                    ? "bg-m3-secondary-container text-m3-on-secondary-container"
                    : "bg-transparent text-m3-on-surface"
              )}
            >
              <Ripple disabled={disabled} />
              <AnimatePresence initial={false}>
                {isSelected && (
                  <motion.span
                    key="check"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: s.icon, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={springs.fastSpatial}
                    className="inline-flex items-center justify-center overflow-hidden"
                  >
                    <MaterialSymbol icon="check" size={s.icon} />
                  </motion.span>
                )}
              </AnimatePresence>
              {option.icon && <MaterialSymbol icon={option.icon} size={s.icon} />}
              {option.label}
            </motion.button>
          );
        })}
      </div>
    );
  }
);

export { segmentedButtonMeta } from "@/lib/m3/meta";
