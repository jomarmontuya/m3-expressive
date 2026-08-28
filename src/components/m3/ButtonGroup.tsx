"use client";

import * as React from "react";
import { motion, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export type ButtonGroupVariant = "outlined" | "filled" | "tonal";
export type ButtonGroupSelection = "none" | "single" | "multiple";
export type ButtonGroupSize = "sm" | "md" | "lg";

export interface ButtonGroupItem {
  id: string;
  label?: string;
  icon?: string;
  onClick?: () => void;
}

const sizeStyles: Record<ButtonGroupSize, { height: number; padding: string; icon: number }> = {
  sm: { height: 40, padding: "0 20px", icon: 18 },
  md: { height: 56, padding: "0 24px", icon: 20 },
  lg: { height: 76, padding: "0 32px", icon: 24 },
};

const variantStyles: Record<ButtonGroupVariant, string> = {
  outlined: "border border-m3-outline bg-transparent text-m3-on-surface",
  filled: "bg-m3-surface-container-highest text-m3-on-surface",
  tonal: "bg-m3-secondary-container text-m3-on-secondary-container",
};

/** Selected segments swap to secondary-container with a transparent border. */
const selectedStyles = "border-transparent bg-m3-secondary-container text-m3-on-secondary-container";

/**
 * tokens.ts widens `type` to `string`; framer-motion's Transition union needs
 * the literal "spring". This shim re-pins it while reusing the token values.
 */
function spring(t: Transition): Transition {
  return { ...t, type: "spring" };
}

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  buttons: ButtonGroupItem[];
  variant?: ButtonGroupVariant;
  selection?: ButtonGroupSelection;
  /** Controlled selected ids; omit to let the group manage its own state */
  value?: string[];
  onValueChange?: (value: string[]) => void;
  /** M3E: hovered/selected button flex-grows with a layout spring */
  variableWidths?: boolean;
  size?: ButtonGroupSize;
  disabled?: boolean;
}

/**
 * M3 Expressive connected button group — a row of pill buttons with a 4px
 * gutter and shared emphasis. Supports single/multiple selection and the
 * signature M3E variable-width treatment where the hovered segment grows.
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  {
    buttons,
    variant = "outlined",
    selection = "none",
    value,
    onValueChange,
    variableWidths = false,
    size = "md",
    disabled = false,
    className,
    ...props
  },
  ref
) {
  const [internalValue, setInternalValue] = React.useState<string[]>([]);
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const isControlled = value !== undefined;
  const selectedIds = isControlled ? value : internalValue;
  const s = sizeStyles[size];

  const toggle = React.useCallback(
    (id: string) => {
      let next: string[];
      if (selection === "single") {
        next = selectedIds.includes(id) ? [] : [id];
      } else if (selection === "multiple") {
        next = selectedIds.includes(id)
          ? selectedIds.filter((v) => v !== id)
          : [...selectedIds, id];
      } else {
        return;
      }
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [selection, selectedIds, isControlled, onValueChange]
  );

  return (
    <div
      ref={ref}
      role="group"
      className={cn("inline-flex gap-[4px]", variableWidths && "w-full", className)}
      {...props}
    >
      {buttons.map((btn) => {
        const isSelected = selection !== "none" && selectedIds.includes(btn.id);
        const isHot = variableWidths && !disabled && (hoveredId === btn.id || isSelected);

        return (
          <motion.button
            key={btn.id}
            type="button"
            disabled={disabled}
            aria-pressed={selection !== "none" ? isSelected : undefined}
            onClick={() => {
              toggle(btn.id);
              btn.onClick?.();
            }}
            onHoverStart={variableWidths ? () => setHoveredId(btn.id) : undefined}
            onHoverEnd={
              variableWidths
                ? () => setHoveredId((cur) => (cur === btn.id ? null : cur))
                : undefined
            }
            whileTap={disabled ? undefined : { scale: 0.96 }}
            animate={variableWidths ? { flexGrow: isHot ? 1.4 : 1 } : undefined}
            transition={
              variableWidths
                ? { scale: spring(springs.fastVisual), flexGrow: spring(springs.defaultSpatial) }
                : spring(springs.fastVisual)
            }
            className={cn(
              "m3-state relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-semibold md-label-large",
              "transition-colors duration-150",
              s.padding,
              variantStyles[variant],
              isSelected && selectedStyles,
              disabled && "opacity-38 pointer-events-none"
            )}
            style={variableWidths ? { height: s.height, flexBasis: 0, minWidth: 0 } : { height: s.height }}
          >
            <Ripple disabled={disabled} />
            {btn.icon && <MaterialSymbol icon={btn.icon} size={s.icon} />}
            {btn.label}
          </motion.button>
        );
      })}
    </div>
  );
});

export { buttonGroupMeta } from "@/lib/m3/meta";
