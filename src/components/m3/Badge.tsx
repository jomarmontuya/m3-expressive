"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  /** Largest count shown before collapsing to "{max}+". Capped at 999 so the label stays within four characters. */
  max?: number;
  /** Concise description appended to the destination for assistive technology. */
  ariaLabel?: string;
  className?: string;
}

/**
 * No Base UI primitive for badge in v1.0.0-rc.0 — custom implementation retained.
 * (Base UI added `badge` only after 1.0.0-rc.0 — it is absent from the installed
 * package's exports — and our anchored/count/dot API is richer anyway.)
 *
 * M3 Badge — a small status marker for another element.
 * With `children` it pins to the anchor's logical top-end corner using the
 * official offsets (content badge overhangs 4px inline-end / 2px top; the dot sits flush
 * in the corner). Standalone it renders a 16px full-round badge or a
 * 6px full-round dot, matching the AndroidX Material3 token shapes; a single
 * digit renders as a 16×16 badge. Large labels are limited to the official
 * four characters, including a trailing "+". Changing `value` remounts the badge,
 * popping in with the bouncy M3E spring.
 */
/** Material 3 badge for status or notification counts. @see https://m3.material.io/components/badges/overview */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    value,
    showDot = false,
    children,
    color = "error",
    max = 999,
    ariaLabel,
    className,
  },
  ref,
) {
  const reduceMotion = useReducedMotion() ?? false;
  const hasValue = value !== undefined && value !== "";
  const effectiveMax = Math.min(999, Math.max(0, Math.floor(max)));
  const display = String(
    typeof value === "number" && value > effectiveMax
      ? `${effectiveMax}+`
      : value ?? "",
  ).slice(0, 4);
  const description =
    ariaLabel ?? (showDot ? "New activity" : `${display} notifications`);
  const descriptionId = React.useId();

  const badge = showDot ? (
    <motion.span
      key="dot"
      initial={reduceMotion ? false : { scale: 0 }}
      animate={{ scale: 1 }}
      transition={reduceMotion ? { duration: 0 } : asTransition(springs.bouncy)}
      aria-hidden="true"
      className={cn(
        "block h-[6px] w-[6px] rounded-full",
        colorStyles[color],
        className,
      )}
    />
  ) : hasValue ? (
    <motion.span
      key={String(value)}
      initial={reduceMotion ? false : { scale: 0 }}
      animate={{ scale: 1 }}
      transition={reduceMotion ? { duration: 0 } : asTransition(springs.bouncy)}
      aria-hidden="true"
      className={cn(
        "md-label-small flex h-4 min-w-4 items-center justify-center rounded-full px-1",
        colorStyles[color],
        className,
      )}
    >
      {display}
    </motion.span>
  ) : null;

  if (!badge) return children ?? null;

  if (children === undefined || children === null) {
    return (
      <span
        ref={ref}
        role="status"
        aria-label={description}
        className="inline-flex"
      >
        {badge}
      </span>
    );
  }

  const childElement = React.isValidElement(children)
    ? (children as React.ReactElement<{ "aria-describedby"?: string }>)
    : null;
  const destination = childElement
    ? React.cloneElement(
        childElement,
        {
          "aria-describedby": [
            childElement.props["aria-describedby"],
            descriptionId,
          ]
            .filter(Boolean)
            .join(" "),
        },
      )
    : children;

  return (
    <span ref={ref} className="relative inline-flex">
      {destination}
      <span id={descriptionId} className="sr-only">
        {description}
      </span>
      <span
        className={cn(
          "absolute inline-flex",
          // Official BadgedBox offsets: text badge 12dp from end / 14dp overlap;
          // icon-only dot flush with the anchor corner.
          showDot ? "end-0 top-0" : "-end-1 -top-0.5",
        )}
      >
        {badge}
      </span>
    </span>
  );
});

Badge.displayName = "Badge";

export { badgeMeta } from "@/lib/m3/meta";
