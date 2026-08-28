"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, type M3Spring } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";

export type CardVariant = "elevated" | "filled" | "outlined";

const variantStyles: Record<CardVariant, string> = {
  elevated: "bg-m3-surface-container-low m3-elevation-1",
  filled: "bg-m3-surface-container-highest",
  outlined: "bg-m3-surface border border-m3-outline-variant",
};

/* M3 elevation level 2 as a Tailwind arbitrary property so the hover
   transition actually animates (`.m3-elevation-*` are plain CSS classes,
   which Tailwind variants cannot target). */
/** tokens.ts widens `type` to `string`; framer-motion needs the "spring" literal. */
const spring = (s: M3Spring): Transition => ({ ...s, type: "spring" });

const hoverElevation2 =
  "hover:[box-shadow:0_1px_2px_0_rgb(0_0_0/0.30),0_2px_6px_2px_rgb(0_0_0/0.15)]";

export interface CardProps
  extends Omit<React.ComponentPropsWithoutRef<typeof motion.div>, "children"> {
  children?: React.ReactNode;
  /** Visual treatment: elevated (shadow), filled (highest container), outlined (stroke) */
  variant?: CardVariant;
  /** Enables press morph, state layer, ripple and keyboard activation. Defaults to true when onClick is provided. */
  interactive?: boolean;
}

/**
 * M3 Expressive Card — a rounded-[20px] containment surface.
 * Interactive cards scale to 97% with the signature expressive spring
 * on press, lift to elevation 2 on hover and emit a ripple.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = "elevated", interactive, onClick, className, children, ...props },
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
      whileTap={isInteractive ? { scale: 0.97 } : undefined}
      transition={spring(springs.expressive)}
      className={cn(
        "relative overflow-hidden rounded-[20px]",
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
