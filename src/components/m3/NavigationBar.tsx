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
  /** short is the current 64dp M3E bar; tall keeps the 80dp baseline M3 bar. */
  variant?: "short" | "tall";
  /** Short bars can put the icon above or before the label. */
  iconPosition?: "top" | "start";
  /** Centered is recommended for medium-width screens; equal fits compact screens. */
  arrangement?: "equal" | "centered";
  className?: string;
}

// No Base UI primitive for a bottom navigation bar in v1.0.0-rc.0 — custom
// implementation retained. (Base UI's `navigation-menu` is a popup/menu
// primitive, NOT a bottom nav — it is deliberately not used here.)
/**
 * M3 Navigation Bar — primary app navigation for compact and medium screens.
 * The current M3E short bar is 64dp and supports top or start icon positions;
 * the 80dp baseline bar remains available as the tall variant.
 * Accepts 3–5 destinations. The active destination button carries
 * `aria-current="page"`; Base UI has no primitive for this pattern, so the
 * roving/tab behavior stays intentionally simple (every destination is
 * tabbable) which suits a 3–5 item bar.
 */
/** Material 3 navigation bar for top-level destinations. @see https://m3.material.io/components/navigation-bar/overview */
export const NavigationBar = React.forwardRef<HTMLElement, NavigationBarProps>(function NavigationBar({
  items,
  value,
  onChange,
  fullWidth = true,
  variant = "short",
  iconPosition = "top",
  arrangement = "equal",
  className,
}: NavigationBarProps, ref) {
  const uid = React.useId();
  const pillId = `m3-nav-pill-${uid}`;
  const isShort = variant === "short";
  const isHorizontal = isShort && iconPosition === "start";

  return (
    <nav
      ref={ref}
      aria-label="Primary"
      className={cn(
        "flex items-stretch",
        isShort ? "bg-m3-surface-container" : "bg-m3-surface m3-elevation-2",
        isShort ? "h-16 px-2" : "h-20 px-2",
        fullWidth ? "w-full" : "w-fit",
        isShort && arrangement === "centered" && "justify-center gap-2",
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
            className={cn(
              "m3-state m3-focus relative flex items-center justify-center",
              isHorizontal ? "h-16 min-w-24 px-2" : "flex-1 flex-col gap-1",
              !isShort && "pt-2",
              isShort && arrangement === "centered" && "flex-none"
            )}
          >
            <Ripple />
            <span
              className={cn(
                "relative flex items-center justify-center rounded-full",
                isHorizontal ? "h-10 gap-2 px-4" : "h-8 w-14"
              )}
            >
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
              {isHorizontal && (
                <span className={cn("relative md-label-medium", active ? "text-m3-on-secondary-container" : "text-m3-on-surface-variant")}>
                  {item.label}
                </span>
              )}
            </span>
            {!isHorizontal && (
              <span className={cn("md-label-medium", active ? isShort ? "text-m3-secondary" : "text-m3-on-surface" : "text-m3-on-surface-variant")}>
                {item.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
});

NavigationBar.displayName = "NavigationBar";

export { navigationBarMeta } from "@/lib/m3/meta";
