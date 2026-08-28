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

export interface NavigationBarProps {
  items: NavItem[];
  value: string;
  onChange: (v: string) => void;
  /** Render as a block-level full-width bar (default). */
  fullWidth?: boolean;
  className?: string;
}

/**
 * M3 Navigation Bar — primary app navigation for small screens.
 * Fixed 80dp bar; the active destination gets a tonal pill that springs
 * between icons via a shared layout transition (layoutId).
 * Accepts 3–5 destinations.
 */
export function NavigationBar({
  items,
  value,
  onChange,
  fullWidth = true,
  className,
}: NavigationBarProps) {
  const uid = React.useId();
  const pillId = `m3-nav-pill-${uid}`;

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "flex h-20 items-stretch bg-m3-surface-container px-2",
        fullWidth ? "w-full" : "w-fit",
        className
      )}
    >
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            aria-current={active ? "page" : undefined}
            onClick={() => onChange(item.value)}
            className="m3-state relative flex flex-1 flex-col items-center justify-center gap-1 pt-2"
          >
            <Ripple />
            <span className="relative flex h-8 w-16 items-center justify-center rounded-full">
              {active && (
                <motion.div
                  layoutId={pillId}
                  transition={spring(springs.expressive)}
                  className="absolute inset-0 rounded-full bg-m3-secondary-container"
                />
              )}
              {item.icon && (
                <MaterialSymbol
                  icon={item.icon}
                  size={24}
                  fill={active}
                  className={cn("relative", active ? "text-m3-on-secondary-container" : "text-m3-on-surface-variant")}
                />
              )}
              {item.badge !== undefined && (
                <span className="absolute -right-1.5 -top-1 z-10 flex h-4 min-w-4 items-center justify-center rounded-full bg-m3-error px-1 text-[10px] font-semibold leading-none text-m3-on-error">
                  {item.badge}
                </span>
              )}
            </span>
            <span className={cn("md-label-medium", active ? "text-m3-on-surface" : "text-m3-on-surface-variant")}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export { navigationBarMeta } from "@/lib/m3/meta";
