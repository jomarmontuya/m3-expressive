'use client';

import * as React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export interface BottomAppBarAction {
  icon: string;
  label?: string;
  onClick?: () => void;
}

export interface BottomAppBarFab {
  icon: string;
  onClick?: () => void;
}

/** framer-motion's legacy `Spring` type drops the "spring" literal, so tokens.springs widens to `string`; re-narrow for `Transition`. */
function spring(transition: (typeof springs)[keyof typeof springs]): Transition {
  return { ...transition, type: "spring" };
}

export interface BottomAppBarProps {
  actions?: BottomAppBarAction[];
  /** Trailing Material Symbol icon names */
  trailingIcons?: string[];
  /** Center-docked FAB that notches the bar */
  fab?: BottomAppBarFab;
  fullWidth?: boolean;
  className?: string;
}

/**
 * M3 Bottom App Bar — primary navigation and key actions at the bottom of
 * small screens. 80dp surface-container bar with leading actions, trailing
 * icons and an optional center-docked FAB that notches the top edge and
 * morphs its corner shape on press (M3 Expressive).
 */
export function BottomAppBar({
  actions = [],
  trailingIcons = [],
  fab,
  fullWidth = true,
  className,
}: BottomAppBarProps) {
  const [fabPressed, setFabPressed] = React.useState(false);

  return (
    <div
      className={cn(
        "relative flex h-20 items-center justify-between bg-m3-surface-container px-4",
        fullWidth && "w-full",
        className
      )}
    >
      <div className="flex items-center gap-1">
        {actions.map((action, i) => (
          <button
            key={`${action.icon}-${i}`}
            type="button"
            aria-label={action.label ?? action.icon}
            title={action.label}
            onClick={action.onClick}
            className="m3-state relative flex h-12 w-12 items-center justify-center rounded-full text-m3-on-surface-variant"
          >
            <Ripple />
            <MaterialSymbol icon={action.icon} size={24} />
          </button>
        ))}
      </div>

      {fab && (
        <span className="absolute -top-7 left-1/2 z-10 -translate-x-1/2">
          <motion.button
            type="button"
            aria-label={fab.icon}
            onClick={fab.onClick}
            onPointerDown={() => setFabPressed(true)}
            onPointerUp={() => setFabPressed(false)}
            onPointerLeave={() => setFabPressed(false)}
            animate={{ borderRadius: fabPressed ? 28 : 16, scale: fabPressed ? 0.95 : 1 }}
            transition={spring(springs.expressiveEffects)}
            className="m3-state m3-elevation-3 relative flex h-14 w-14 items-center justify-center bg-m3-primary-container"
          >
            <Ripple />
            <MaterialSymbol icon={fab.icon} size={24} fill className="text-m3-on-primary-container" />
          </motion.button>
        </span>
      )}

      <div className="flex items-center gap-1">
        {trailingIcons.map((icon, i) => (
          <button
            key={`${icon}-${i}`}
            type="button"
            aria-label={icon}
            className="m3-state relative flex h-12 w-12 items-center justify-center rounded-full text-m3-on-surface-variant"
          >
            <Ripple />
            <MaterialSymbol icon={icon} size={24} />
          </button>
        ))}
      </div>
    </div>
  );
}

export { bottomAppBarMeta } from "@/lib/m3/meta";
