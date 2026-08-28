"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button as BaseButton } from "@base-ui-components/react/button";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export type FabColor = "primary" | "secondary" | "tertiary" | "surface";
export type FabSize = "small" | "medium" | "large" | "extra-large";

/**
 * M3E FAB size scale: 40 / 56 / 96 / 132 px with 24 / 24 / 36 / 48 icons.
 * Shape: 16dp corners (small/medium), 28dp on large/extra-large per the
 * official FAB shape tokens. The 40dp small FAB extends its touch target
 * to the 48dp minimum with an invisible ::before hit-area extension.
 */
const sizeStyles: Record<FabSize, { container: number; icon: number; shape: string; touchTarget: string }> = {
  small: { container: 40, icon: 24, shape: "rounded-2xl", touchTarget: "before:absolute before:-inset-1 before:content-['']" },
  medium: { container: 56, icon: 24, shape: "rounded-2xl", touchTarget: "" },
  large: { container: 96, icon: 36, shape: "rounded-[28px]", touchTarget: "" },
  "extra-large": { container: 132, icon: 48, shape: "rounded-[28px]", touchTarget: "" },
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
 * (motion-specific) signatures — those DOM versions would conflict once they
 * reach the motion element through Base UI's `render` composition.
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
 *
 * Layering: Base UI's headless `Button` owns the native <button> semantics,
 * the `type="button"` default and disabled/focus handling (it guards click +
 * pointer events while disabled); the `render` prop composes it with a
 * framer-motion element so WE keep the visuals — the expressive hover/tap
 * springs and the M3 state layer. Official elevation: level 3 at rest →
 * level 4 on hover/pressed (lowered: 1 → 2). Disabled drops to the
 * on-surface 12%/38% disabled tokens with no elevation.
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
    <BaseButton
      ref={ref}
      disabled={disabled}
      className={cn(
        "m3-state m3-focus relative inline-flex select-none items-center justify-center",
        "transition-[background-color,box-shadow] duration-200",
        s.shape,
        disabled ? "bg-m3-on-surface/12 text-m3-on-surface/38" : fabColorStyles[color],
        disabled ? undefined : hovered ? hoverElevation : restElevation,
        disabled && "pointer-events-none",
        s.touchTarget,
        className
      )}
      style={{ width: s.container, height: s.container }}
      {...props}
      render={
        <motion.button
          whileHover={disabled ? undefined : { scale: 1.03 }}
          whileTap={disabled ? undefined : { scale: 0.94 }}
          transition={springs.expressive}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
        >
          <Ripple disabled={disabled} />
          <MaterialSymbol icon={icon} size={s.icon} />
        </motion.button>
      }
    />
  );
});

export { fabMeta } from "@/lib/m3/meta";
