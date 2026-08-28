'use client';

import * as React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export interface NavItem {
  value: string;
  icon?: string;
  label: string;
  badge?: string | number;
}

/** framer-motion's legacy `Spring` type drops the "spring" literal, so tokens.springs widens to `string`; re-narrow for `Transition`. */
function spring(transition: (typeof springs)[keyof typeof springs]): Transition {
  return { ...transition, type: "spring" };
}

export interface TabsProps {
  items: NavItem[];
  value: string;
  onChange: (v: string) => void;
  /** primary = icon+label columns with a sliding underline; secondary = expressive tonal pill row */
  variant?: "primary" | "secondary";
  /** Stretch to the container width and distribute tabs equally */
  fullWidth?: boolean;
  className?: string;
}

/**
 * M3 Tabs — organize content across different screens, data sets and interactions.
 * The active indicator is a shared-layout element that springs between tabs
 * (layoutId) — underline for primary, tonal pill for secondary.
 * Horizontally scrollable when tabs overflow.
 */
export function Tabs({
  items,
  value,
  onChange,
  variant = "primary",
  fullWidth = false,
  className,
}: TabsProps) {
  // Per-instance layoutId prefix: keeps the shared-layout pill scoped to this
  // tab group when several Tabs render on the same page.
  const uid = React.useId();
  const indicatorId = `m3-tab-indicator-${uid}`;
  const pillId = `m3-tab-pill-${uid}`;

  return (
    <div
      role="tablist"
      className={cn(
        "m3-scroll flex h-16 items-stretch overflow-x-auto",
        variant === "primary" && "border-b border-m3-outline-variant",
        fullWidth ? "w-full" : "w-fit max-w-full",
        className
      )}
    >
      {items.map((item) => {
        const active = item.value === value;
        const textColor = active
          ? variant === "primary"
            ? "text-m3-primary"
            : "text-m3-on-secondary-container"
          : "text-m3-on-surface-variant";
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.value)}
            className={cn(
              "m3-state relative flex shrink-0 items-center justify-center",
              variant === "primary" ? "flex-col gap-1 pb-2 pt-3" : "gap-2 px-4",
              "min-w-[96px]",
              fullWidth && "flex-1",
              textColor
            )}
          >
            <Ripple />
            {variant === "primary"
              ? active && (
                  <motion.div
                    layoutId={indicatorId}
                    transition={spring(springs.expressive)}
                    className="absolute bottom-0 left-1/3 h-[3px] w-1/3 rounded-full bg-m3-primary"
                  />
                )
              : active && (
                  <motion.div
                    layoutId={pillId}
                    transition={spring(springs.expressive)}
                    className="absolute inset-x-1 inset-y-2 rounded-full bg-m3-secondary-container"
                  />
                )}
            {item.icon && (
              <span className="relative">
                <MaterialSymbol icon={item.icon} size={24} fill={active} />
                {item.badge !== undefined && (
                  <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-m3-error px-1 text-[10px] font-semibold leading-none text-m3-on-error">
                    {item.badge}
                  </span>
                )}
              </span>
            )}
            {!item.icon && item.badge !== undefined && (
              <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-m3-error px-1 text-[10px] font-semibold leading-none text-m3-on-error">
                {item.badge}
              </span>
            )}
            <span className="relative md-title-small">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export { tabsMeta } from "@/lib/m3/meta";
