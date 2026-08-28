"use client";

import * as React from "react";
import { motion, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export type FabColor = "primary" | "secondary" | "tertiary" | "surface";
export type FabSize = "small" | "medium" | "large" | "extra-large";

/**
 * tokens.ts widens `type` to `string`; framer-motion's Transition union needs
 * the literal "spring". This shim re-pins it while reusing the token values.
 */
function spring(t: Transition): Transition {
  return { ...t, type: "spring" };
}

/** M3E FAB size scale: 40 / 56 / 96 / 132 px */
const sizeStyles: Record<FabSize, { container: number; icon: number }> = {
  small: { container: 40, icon: 24 },
  medium: { container: 56, icon: 24 },
  large: { container: 96, icon: 36 },
  "extra-large": { container: 132, icon: 48 },
};

/** Shared FAB color-role mapping (also used by ExtendedFab and FabMenu) */
export const fabColorStyles: Record<FabColor, string> = {
  primary: "bg-m3-primary-container text-m3-on-primary-container",
  secondary: "bg-m3-secondary-container text-m3-on-secondary-container",
  tertiary: "bg-m3-tertiary-container text-m3-on-tertiary-container",
  surface: "bg-m3-surface-container-high text-m3-on-surface",
};

/**
 * Button attributes minus the handlers framer-motion re-defines with its own
 * (motion-specific) signatures — spreading the DOM versions onto motion.button
 * would be a type conflict.
 */
export interface FabProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onDragStart" | "onDrag" | "onDragEnd"
  > {
  color?: FabColor;
  size?: FabSize;
  /** Material Symbols ligature name, e.g. "add" */
  icon: string;
  /** Lowered elevation (level 1 instead of 3) for FABs that share a screen with extended FABs or dialogs */
  lowered?: boolean;
}

/**
 * M3 Floating action button (FAB) — the highest-emphasis action on a screen.
 * Hover lifts the elevation one level; press squeezes with the expressive spring.
 */
export const Fab = React.forwardRef<HTMLButtonElement, FabProps>(function Fab(
  { color = "primary", size = "medium", icon, lowered = false, disabled, className, ...props },
  ref
) {
  const s = sizeStyles[size];
  const [hovered, setHovered] = React.useState(false);
  const restElevation = lowered ? "m3-elevation-1" : "m3-elevation-3";
  const hoverElevation = lowered ? "m3-elevation-2" : "m3-elevation-4";

  return (
    <motion.button
      ref={ref}
      type="button"
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.94 }}
      transition={spring(springs.expressive)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn(
        "m3-state relative inline-flex select-none items-center justify-center overflow-hidden rounded-2xl",
        "transition-[background-color,box-shadow] duration-200",
        fabColorStyles[color],
        disabled ? restElevation : hovered ? hoverElevation : restElevation,
        disabled && "opacity-38 pointer-events-none",
        className
      )}
      style={{ width: s.container, height: s.container }}
      {...props}
    >
      <Ripple disabled={disabled} />
      <MaterialSymbol icon={icon} size={s.icon} />
    </motion.button>
  );
});

export { fabMeta } from "@/lib/m3/meta";
