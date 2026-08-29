"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button as BaseButton } from "@base-ui/react/button";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";
import { fabColorStyles, type FabColor } from "./FAB";

export type ExtendedFabSize = "small" | "medium" | "large";

const sizeStyles: Record<ExtendedFabSize, { height: number; icon: number; radius: number; padding: number; gap: number; typeClass: string }> = {
  small: { height: 56, icon: 24, radius: 16, padding: 16, gap: 8, typeClass: "md-title-medium" },
  medium: { height: 80, icon: 28, radius: 20, padding: 26, gap: 16, typeClass: "md-title-large" },
  large: { height: 96, icon: 32, radius: 28, padding: 28, gap: 20, typeClass: "md-headline-small" },
};

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
  size?: ExtendedFabSize;
  /** Material Symbols ligature name, e.g. "edit" */
  icon?: string;
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
 * springs and the M3 state layer. The current M3E set is small 56dp,
 * medium 80dp, and large 96dp, with matching shape, type, and spacing tokens.
 * Elevation 3 → 4 on hover (lowered: 1 → 2);
 * disabled uses the on-surface 12%/38% tokens with no elevation.
 */
/** Material 3 Expressive extended FAB for primary actions. @see https://m3.material.io/components/extended-fab/overview */
export const ExtendedFab = React.forwardRef<HTMLButtonElement, ExtendedFabProps>(
  function ExtendedFab(
    { color = "primary-container", size = "small", icon, label, lowered = false, disabled, className, ...props },
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
          "m3-state m3-focus relative inline-flex select-none items-center justify-center overflow-hidden",
          s.typeClass,
          "transition-[background-color,box-shadow] duration-200",
          disabled ? "bg-m3-on-surface/12 text-m3-on-surface/38" : fabColorStyles[color],
          disabled ? undefined : hovered ? hoverElevation : restElevation,
          disabled && "pointer-events-none",
          className
        )}
        style={{ height: s.height, borderRadius: s.radius, paddingInline: s.padding, gap: s.gap }}
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
            {icon && <MaterialSymbol icon={icon} size={s.icon} />}
            <span>{label}</span>
          </motion.button>
        }
      />
    );
  }
);

export { extendedFabMeta } from "@/lib/m3/meta";
