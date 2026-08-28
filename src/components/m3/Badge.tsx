"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import type { M3Spring } from "@/lib/m3/tokens";

/** tokens.ts `satisfies` widens spring `type` to string; narrow for framer-motion. */
const asTransition = (s: M3Spring): Transition => s as Transition;

export type BadgeColor = "error" | "primary" | "tertiary";

const colorStyles: Record<BadgeColor, string> = {
  error: "bg-m3-error text-m3-on-error",
  primary: "bg-m3-primary text-m3-on-primary",
  tertiary: "bg-m3-tertiary text-m3-on-tertiary",
};

export interface BadgeProps {
  /** Count or short text to display. Numbers above `max` render as "{max}+". */
  value?: number | string;
  /** Renders a 6px dot instead of a value (used when a count is irrelevant). */
  showDot?: boolean;
  /** Anchor element the badge pins to (icon, avatar, button…). */
  children?: React.ReactNode;
  color?: BadgeColor;
  /** Largest count shown before collapsing to "{max}+". Default 99. */
  max?: number;
  disabled?: boolean;
  className?: string;
}

/**
 * M3 Badge — a small status marker for another element.
 * With `children` it pins to the anchor's top-right corner (-top-1 -right-2);
 * standalone it renders a 16px pill or a 6px dot.
 * Changing `value` remounts the badge, popping in with the bouncy M3E spring.
 */
export function Badge({
  value,
  showDot = false,
  children,
  color = "error",
  max = 99,
  disabled = false,
  className,
}: BadgeProps) {
  const hasValue = value !== undefined && value !== "";
  const display =
    typeof value === "number" && value > max ? `${max}+` : value;
  const stateCls = disabled ? "pointer-events-none opacity-40" : "";

  const badge = showDot ? (
    <motion.span
      key="dot"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={asTransition(springs.bouncy)}
      className={cn("block h-[6px] w-[6px] rounded-full", colorStyles[color], className)}
    />
  ) : hasValue ? (
    <motion.span
      key={String(value)}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={asTransition(springs.bouncy)}
      className={cn(
        "md-label-small flex h-4 min-w-4 items-center justify-center rounded-full px-1",
        colorStyles[color],
        className
      )}
    >
      {display}
    </motion.span>
  ) : null;

  if (!badge) return children ?? null;

  if (children === undefined || children === null) {
    return <span className={cn("inline-flex", stateCls)}>{badge}</span>;
  }

  return (
    <span className="relative inline-flex">
      {children}
      <span className={cn("absolute -right-2 -top-1 inline-flex", stateCls)}>{badge}</span>
    </span>
  );
}

export { badgeMeta } from "@/lib/m3/meta";
