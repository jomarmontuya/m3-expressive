"use client";

import * as React from "react";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toggle } from "@base-ui/react/toggle";
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
  ariaLabel?: string;
}

export interface SegmentedButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "defaultChecked"> {
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
 * is an opt-in library extension, not an M3 or M3E specification size.
 */
const sizeStyles: Record<SegmentedButtonSize, { height: number; icon: number }> = {
  sm: { height: 40, icon: 18 },
  md: { height: 56, icon: 20 },
};

/**
 * M3 Segmented buttons — connected segments inside one pill outline for
 * selecting between 2–5 choices. Selected segments fill with the
 * secondary-container color and a check icon springs open.
 *
 * Built on Base UI's headless ToggleGroup/Toggle: the group owns the pressed
 * state, `aria-pressed`, roving arrow-key focus and disabled propagation,
 * while this layer keeps the M3 Expressive visuals (connected pill outline,
 * 48dp touch expanders, springy check icon, ripple).
 */
/** Material 3 segmented button for grouped choices. @see https://m3.material.io/components/segmented-buttons/overview */
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

    /**
     * Base UI always reports the group value as an array of pressed segment
     * values; adapt it back to our public shape (string for single, string[]
     * for multiple) without leaking Base UI types through the API.
     */
    const handleGroupValueChange = React.useCallback(
      (groupValue: unknown[]) => {
        const next = groupValue as string[];
        if (!isControlled) setInternalValue(next);
        onValueChange?.(type === "single" ? (next[0] ?? "") : next);
      },
      [type, isControlled, onValueChange]
    );

    return (
      <ToggleGroup
        ref={ref}
        value={isControlled ? selectedList : undefined}
        onValueChange={handleGroupValueChange}
        multiple={type === "multiple"}
        disabled={disabled}
        orientation="horizontal"
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
            <Toggle
              key={option.value}
              value={option.value}
              aria-label={option.ariaLabel ?? (!option.label ? (option.icon ?? option.value).replaceAll("_", " ") : undefined)}
              className={cn(
                "m3-state m3-focus relative flex h-full flex-1 items-center justify-center gap-2 px-4",
                size === "sm" && "before:absolute before:content-[''] before:[inset-inline:0] before:-inset-y-1",
                "md-label-large transition-colors duration-150",
                i > 0 && (disabled ? "border-s border-m3-on-surface/12" : "border-s border-m3-outline"),
                i === 0 && "rounded-s-full",
                i === options.length - 1 && "rounded-e-full",
                disabled
                  ? isSelected
                    ? "bg-m3-on-surface/12 text-m3-on-surface/38"
                    : "bg-transparent text-m3-on-surface/38"
                  : isSelected
                    ? "bg-m3-secondary-container text-m3-on-secondary-container"
                    : "bg-transparent text-m3-on-surface"
              )}
              /* render keeps the press squash while Base UI renders the <button> */
              render={
                <motion.button
                  whileTap={disabled ? undefined : { scale: 0.97 }}
                  transition={springs.fastVisual}
                />
              }
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
              {!isSelected && option.icon && <MaterialSymbol icon={option.icon} size={s.icon} />}
              {option.label}
            </Toggle>
          );
        })}
      </ToggleGroup>
    );
  }
);
