"use client";

import * as React from "react";
import { motion, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export type IconButtonVariant = "standard" | "filled" | "tonal" | "outlined";
export type IconButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * tokens.ts widens `type` to `string`; framer-motion's Transition union needs
 * the literal "spring". This shim re-pins it while reusing the token values.
 */
function spring(t: Transition): Transition {
  return { ...t, type: "spring" };
}

/**
 * M3E icon button container scale: 28 / 36 / 40 / 48 / 64 px.
 * Icon optical sizes scale with the container.
 */
const sizeStyles: Record<IconButtonSize, { container: number; icon: number }> = {
  xs: { container: 28, icon: 16 },
  sm: { container: 36, icon: 20 },
  md: { container: 40, icon: 24 },
  lg: { container: 48, icon: 28 },
  xl: { container: 64, icon: 36 },
};

const variantStyles: Record<IconButtonVariant, string> = {
  standard: "bg-transparent text-m3-on-surface-variant",
  filled: "bg-m3-primary text-m3-on-primary",
  tonal: "bg-m3-secondary-container text-m3-on-secondary-container",
  outlined: "border border-m3-outline bg-transparent text-m3-on-surface-variant",
};

/** Applied on top of the variant when toggleable && selected. */
const selectedStyles: Record<IconButtonVariant, string> = {
  standard: "bg-m3-primary-container text-m3-on-primary-container",
  filled: "",
  tonal: "",
  outlined: "border-transparent bg-m3-primary-container text-m3-on-primary-container",
};

/**
 * Button attributes minus the handlers framer-motion re-defines with its own
 * (motion-specific) signatures — spreading the DOM versions onto motion.button
 * would be a type conflict.
 */
export interface IconButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onDragStart" | "onDrag" | "onDragEnd"
  > {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** Material Symbols ligature name, e.g. "favorite" */
  icon: string;
  /** Enables on/off toggle behavior with a spring pop on selection */
  toggleable?: boolean;
  /** Controlled selected state (requires toggleable) */
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
}

/**
 * M3 Icon button — a compact pressable icon with a state layer and ripple.
 * When `toggleable`, selection swaps to the primary-container color and
 * the icon pops in with the signature expressive spring.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    variant = "standard",
    size = "md",
    icon,
    toggleable = false,
    selected,
    onSelectedChange,
    disabled,
    className,
    onClick,
    type,
    ...props
  },
  ref
) {
  const s = sizeStyles[size];
  const [internalSelected, setInternalSelected] = React.useState(false);
  const isSelected = toggleable ? (selected ?? internalSelected) : false;

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (toggleable) {
        const next = !isSelected;
        if (selected === undefined) setInternalSelected(next);
        onSelectedChange?.(next);
      }
      onClick?.(e);
    },
    [toggleable, isSelected, selected, onSelectedChange, onClick]
  );

  return (
    <motion.button
      ref={ref}
      type={type ?? "button"}
      disabled={disabled}
      onClick={handleClick}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={spring(springs.fastVisual)}
      aria-pressed={toggleable ? isSelected : undefined}
      className={cn(
        "m3-state relative inline-flex select-none items-center justify-center overflow-hidden rounded-full",
        "transition-colors duration-150",
        variantStyles[variant],
        toggleable && isSelected && selectedStyles[variant],
        disabled && "opacity-38 pointer-events-none",
        className
      )}
      style={{ width: s.container, height: s.container }}
      {...props}
    >
      <Ripple disabled={disabled} />
      {/* Keyed remount = spring scale pop whenever the selection flips */}
      <motion.span
        key={toggleable && isSelected ? "selected" : "unselected"}
        initial={{ scale: toggleable && isSelected ? 0.6 : 1 }}
        animate={{ scale: 1 }}
        transition={spring(springs.expressiveEffects)}
        className="inline-flex"
      >
        <MaterialSymbol
          icon={icon}
          size={s.icon}
          fill={toggleable ? isSelected : variant === "filled"}
        />
      </motion.span>
    </motion.button>
  );
});

export { iconButtonMeta } from "@/lib/m3/meta";
