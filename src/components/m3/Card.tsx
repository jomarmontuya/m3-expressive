"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, shapes, shapeMorph } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";

export type CardVariant = "elevated" | "filled" | "outlined";
/** M3 cards rest at medium (12dp); M3 Expressive adds extra-large (28dp) for hero cards. */
export type CardShape = "medium" | "extraLarge";

const variantStyles: Record<CardVariant, string> = {
  elevated: "bg-m3-surface-container-low m3-elevation-1",
  filled: "bg-m3-surface-container-highest",
  // Verified current M3 spec: outlined = surface + 1dp outline-variant stroke
  // (the 2021 token sheet's `outline` was superseded; Compose uses OutlineVariant)
  outlined: "bg-m3-surface border border-m3-outline-variant",
};

const shapeStyles: Record<CardShape, string> = {
  medium: "rounded-xl",
  extraLarge: "rounded-[28px]",
};

/* M3 elevation level 2 as a Tailwind arbitrary property so the hover
   transition actually animates (`.m3-elevation-*` are plain CSS classes,
   which Tailwind variants cannot target). */
const hoverElevation2 =
  "hover:[box-shadow:0_1px_2px_0_rgb(0_0_0/0.30),0_2px_6px_2px_rgb(0_0_0/0.15)]";

export interface CardProps
  extends Omit<React.ComponentPropsWithoutRef<typeof motion.div>, "children"> {
  children?: React.ReactNode;
  /** Visual treatment: elevated (shadow), filled (highest container), outlined (stroke) */
  variant?: CardVariant;
  /** Corner shape: medium 12dp (M3 default) or extraLarge 28dp (M3E hero cards) */
  shape?: CardShape;
  /** Enables press shape morph, state layer, ripple and keyboard activation. Defaults to true when onClick is provided. */
  interactive?: boolean;
}

/**
 * M3 Expressive Card — a 12dp-corner containment surface (M3 shape.medium;
 * pass shape="extraLarge" for 28dp M3E hero cards).
 * Interactive cards morph to the pressed shape (medium → small) and scale
 * to 97% with the signature expressive spring, lift to elevation 2 on
 * hover and emit a ripple (state layer 8% hover / 10% pressed).
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = "elevated", shape = "medium", interactive, onClick, className, children, ...props },
  ref
) {
  const isInteractive = interactive ?? Boolean(onClick);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!onClick) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
    },
    [onClick]
  );

  return (
    <motion.div
      ref={ref}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={isInteractive ? onClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      whileTap={isInteractive ? { scale: 0.97, borderRadius: shapeMorph.card.pressed } : undefined}
      style={{
        borderRadius: isInteractive
          ? shapeMorph.card.rest
          : shape === "extraLarge"
            ? shapes.extraLarge
            : shapes.medium,
      }}
      transition={springs.expressive}
      className={cn(
        "relative overflow-hidden",
        shapeStyles[shape],
        variantStyles[variant],
        isInteractive &&
          "m3-state m3-focus cursor-pointer outline-none transition-shadow duration-200",
        isInteractive && variant === "elevated" && hoverElevation2,
        className
      )}
      {...props}
    >
      {isInteractive && <Ripple />}
      {children}
    </motion.div>
  );
});

export { cardMeta } from "@/lib/m3/meta";
