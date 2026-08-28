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

export interface NavigationRailProps {
  items: NavItem[];
  value: string;
  onChange: (v: string) => void;
  /** Slot above the items — typically a FAB */
  header?: React.ReactNode;
  /** Leading menu icon (official rail anatomy item); renders when onMenuClick is set */
  menuIcon?: string;
  /** Called when the leading menu icon is pressed (showing the icon also toggles the expanded rail) */
  onMenuClick?: () => void;
  /** Draw a hinge/fold divider along the leading edge (foldable devices) */
  foldingLine?: boolean;
  className?: string;
}

/**
 * M3 Navigation Rail — side navigation for medium/extended screens
 * (tablets, foldables). 80dp vertical bar with an optional header slot
 * (commonly a FAB); the active destination pill springs between items
 * via a shared layout transition (layoutId).
 */
export function NavigationRail({
  items,
  value,
  onChange,
  header,
  menuIcon = "menu",
  onMenuClick,
  foldingLine = false,
  className,
}: NavigationRailProps) {
  const uid = React.useId();
  const pillId = `m3-rail-pill-${uid}`;

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "flex min-h-full w-20 shrink-0 flex-col items-center gap-3 bg-m3-surface-container-low py-3",
        foldingLine && "border-r border-m3-outline-variant",
        className
      )}
    >
      {onMenuClick && (
        <button
          type="button"
          aria-label="Menu"
          title="Menu"
          onClick={onMenuClick}
          className="m3-state relative mb-2 flex h-12 w-12 items-center justify-center rounded-full text-m3-on-surface-variant"
        >
          <Ripple />
          <MaterialSymbol icon={menuIcon} size={24} />
        </button>
      )}
      {header && <div className="mb-2 flex justify-center">{header}</div>}
      <ul className="flex flex-col items-center gap-3">
        {items.map((item) => {
          const active = item.value === value;
          return (
            <li key={item.value}>
              <button
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => onChange(item.value)}
                className="m3-state relative flex w-16 flex-col items-center gap-1 pb-2 pt-1"
              >
                <Ripple />
                <span className="relative flex h-8 w-14 items-center justify-center rounded-full">
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
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { navigationRailMeta } from "@/lib/m3/meta";
