"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button as BaseButton } from "@base-ui/react/button";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export type IconButtonVariant = "standard" | "filled" | "tonal" | "outlined";
export type IconButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * M3E icon button container scale: 28 / 36 / 40 / 48 / 64 px.
 * Icon optical sizes scale with the container (16/20/24/28/36).
 * Sub-48dp containers expand their touch target to the 48dp minimum
 * with an invisible ::before hit-area extension.
 */
const sizeStyles: Record<IconButtonSize, { container: number; icon: number; touchTarget: string }> = {
  xs: { container: 28, icon: 16, touchTarget: "before:absolute before:-inset-[10px] before:content-['']" },
  sm: { container: 36, icon: 20, touchTarget: "before:absolute before:-inset-1.5 before:content-['']" },
  md: { container: 40, icon: 24, touchTarget: "before:absolute before:-inset-1 before:content-['']" },
  lg: { container: 48, icon: 28, touchTarget: "" },
  xl: { container: 64, icon: 36, touchTarget: "" },
};

const variantStyles: Record<IconButtonVariant, string> = {
  standard: "bg-transparent text-m3-on-surface-variant",
  filled: "bg-m3-primary text-m3-on-primary",
  tonal: "bg-m3-secondary-container text-m3-on-secondary-container",
  outlined: "border border-m3-outline bg-transparent text-m3-on-surface-variant",
};

/**
 * Selected state per the official spec: standard and outlined swap the icon
 * to the primary role (the container stays transparent; outlined keeps its
 * outline) and the glyph fills. Filled/tonal containers do not change.
 */
const selectedStyles: Record<IconButtonVariant, string> = {
  standard: "text-m3-primary",
  filled: "",
  tonal: "",
  outlined: "text-m3-primary",
};

/** Disabled tokens: content on-surface 38%; filled/tonal containers drop to on-surface 12%; outlined border drops to 12%. */
const disabledStyles: Record<IconButtonVariant, string> = {
  standard: "text-m3-on-surface/38",
  filled: "bg-m3-on-surface/12 text-m3-on-surface/38",
  tonal: "bg-m3-on-surface/12 text-m3-on-surface/38",
  outlined: "border border-m3-on-surface/12 text-m3-on-surface/38",
};

/**
 * Button attributes minus the handlers framer-motion re-defines with its own
 * (motion-specific) signatures — those DOM versions would conflict once they
 * reach the motion element through Base UI's `render` composition.
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
 *
 * Layering: Base UI's headless `Button` owns the native <button> semantics,
 * the `type` default and disabled/focus handling (it guards click + pointer
 * events while disabled); the `render` prop composes it with a framer-motion
 * element so WE keep the visuals — press scale spring, M3 state layer and
 * the selected pop. When `toggleable`, the selected state recolors the icon
 * to the primary role (standard/outlined) and pops it in with the expressive
 * spring (`aria-pressed` stays wired for assistive tech).
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
    <BaseButton
      ref={ref}
      type={type ?? "button"}
      disabled={disabled}
      onClick={handleClick}
      aria-pressed={toggleable ? isSelected : undefined}
      className={cn(
        "m3-state m3-focus relative inline-flex select-none items-center justify-center rounded-full",
        "transition-colors duration-150",
        variantStyles[variant],
        toggleable && isSelected && selectedStyles[variant],
        disabled && disabledStyles[variant],
        disabled && "pointer-events-none",
        s.touchTarget,
        className
      )}
      style={{ width: s.container, height: s.container }}
      {...props}
      render={
        <motion.button whileTap={disabled ? undefined : { scale: 0.96 }} transition={springs.fastVisual}>
          <Ripple disabled={disabled} />
          {/* Keyed remount = spring scale pop whenever the selection flips */}
          <motion.span
            key={toggleable && isSelected ? "selected" : "unselected"}
            initial={{ scale: toggleable && isSelected ? 0.6 : 1 }}
            animate={{ scale: 1 }}
            transition={springs.expressiveEffects}
            className="inline-flex"
          >
            <MaterialSymbol
              icon={icon}
              size={s.icon}
              fill={toggleable ? isSelected : variant === "filled"}
            />
          </motion.span>
        </motion.button>
      }
    />
  );
});

export { iconButtonMeta } from "@/lib/m3/meta";
