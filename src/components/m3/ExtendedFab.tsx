"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button as BaseButton } from "@base-ui-components/react/button";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";
import { fabColorStyles, type FabColor } from "./FAB";

/**
 * Button attributes minus the handlers framer-motion re-defines with its own
 * (motion-specific) signatures — those DOM versions would conflict once they
 * reach the motion element through Base UI's `render` composition.
 */
export interface ExtendedFabProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onDragStart" | "onDrag" | "onDragEnd"
  > {
  color?: FabColor;
  /** Material Symbols ligature name, e.g. "edit" */
  icon: string;
  /** Text label rendered next to the icon */
  label: string;
  /** Lowered elevation (level 1 instead of 3) */
  lowered?: boolean;
}

/**
 * M3 Extended FAB — a wider floating action button with an icon and
 * text label, for the primary action when an icon alone is not clear.
 *
 * Layering: Base UI's headless `Button` owns the native <button> semantics,
 * the `type="button"` default and disabled/focus handling (it guards click +
 * pointer events while disabled); the `render` prop composes it with a
 * framer-motion element so WE keep the visuals — the expressive hover/tap
 * springs and the M3 state layer. Official anatomy: 56dp height, 16dp
 * corners, 24dp icon, 8dp icon-label gap, 20dp horizontal padding,
 * label-large text. Elevation 3 → 4 on hover/pressed (lowered: 1 → 2);
 * disabled uses the on-surface 12%/38% tokens with no elevation.
 */
export const ExtendedFab = React.forwardRef<HTMLButtonElement, ExtendedFabProps>(
  function ExtendedFab(
    { color = "primary", icon, label, lowered = false, disabled, className, ...props },
    ref
  ) {
    const [hovered, setHovered] = React.useState(false);
    const restElevation = lowered ? "m3-elevation-1" : "m3-elevation-3";
    const hoverElevation = lowered ? "m3-elevation-2" : "m3-elevation-4";

    return (
      <BaseButton
        ref={ref}
        disabled={disabled}
        className={cn(
          "m3-state m3-focus relative inline-flex select-none items-center justify-center overflow-hidden rounded-2xl px-5",
          "gap-2 md-label-large",
          "transition-[background-color,box-shadow] duration-200",
          disabled ? "bg-m3-on-surface/12 text-m3-on-surface/38" : fabColorStyles[color],
          disabled ? undefined : hovered ? hoverElevation : restElevation,
          disabled && "pointer-events-none",
          className
        )}
        style={{ height: 56 }}
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
            <MaterialSymbol icon={icon} size={24} />
            <span>{label}</span>
          </motion.button>
        }
      />
    );
  }
);

export { extendedFabMeta } from "@/lib/m3/meta";
