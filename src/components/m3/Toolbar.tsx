'use client';

import * as React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export interface ToolbarIconItem {
  icon: string;
  label?: string;
  onClick?: () => void;
  active?: boolean;
}

export type ToolbarVariant = "floating" | "dockable";
export type ToolbarColor = "surface" | "primary" | "secondary" | "tertiary";

export interface ToolbarProps {
  icons: ToolbarIconItem[];
  variant?: ToolbarVariant;
  /** Container color role (maps to the matching container + on-container colors) */
  color?: ToolbarColor;
  /** Floating placement inside a positioned ancestor */
  position?: "top" | "bottom";
  /** Pill width for the floating variant (px) */
  width?: number;
  fullWidth?: boolean;
  /** Dockable variant: square corners + elevation 1 when docked, pill otherwise */
  docked?: boolean;
  className?: string;
}

/** framer-motion's legacy `Spring` type drops the "spring" literal, so tokens.springs widens to `string`; re-narrow for `Transition`. */
function spring(transition: (typeof springs)[keyof typeof springs]): Transition {
  return { ...transition, type: "spring" };
}

const colorStyles: Record<ToolbarColor, { container: string; icon: string; activeBg: string }> = {
  surface: { container: "bg-m3-surface-container-high", icon: "text-m3-on-surface", activeBg: "bg-m3-on-surface/12" },
  primary: { container: "bg-m3-primary-container", icon: "text-m3-on-primary-container", activeBg: "bg-m3-on-primary-container/12" },
  secondary: { container: "bg-m3-secondary-container", icon: "text-m3-on-secondary-container", activeBg: "bg-m3-on-secondary-container/12" },
  tertiary: { container: "bg-m3-tertiary-container", icon: "text-m3-on-tertiary-container", activeBg: "bg-m3-on-tertiary-container/12" },
};

/**
 * M3 Expressive Toolbar — NEW in 2025. A compact pill of contextual actions.
 * Floating variant hovers over content (top/bottom, centered); dockable
 * variant morphs between a floating pill and a square, docked full-width bar.
 */
export function Toolbar({
  icons,
  variant = "floating",
  color = "surface",
  position = "bottom",
  width = 560,
  fullWidth = false,
  docked = false,
  className,
}: ToolbarProps) {
  const c = colorStyles[color];

  const renderIconButton = (item: ToolbarIconItem, i: number) => (
    <button
      key={`${item.icon}-${i}`}
      type="button"
      aria-label={item.label ?? item.icon}
      title={item.label}
      aria-pressed={item.active || undefined}
      onClick={item.onClick}
      className={cn(
        "m3-state relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
        c.icon,
        item.active && c.activeBg
      )}
    >
      <Ripple />
      <MaterialSymbol icon={item.icon} size={24} fill={item.active} />
    </button>
  );

  if (variant === "dockable") {
    return (
      <div className={cn("w-full", className)}>
        <div
          style={!docked && !fullWidth ? { width } : undefined}
          className={cn(
            "flex h-16 items-center gap-1 transition-all duration-300",
            docked
              ? "w-full rounded-none px-4 m3-elevation-1"
              : cn("mx-auto rounded-full px-3 m3-elevation-2", fullWidth ? "w-full" : "justify-center"),
            c.container
          )}
        >
          {icons.map(renderIconButton)}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: fullWidth ? 0 : "-50%", y: position === "bottom" ? 12 : -12, scale: 0.96 }}
      animate={{ opacity: 1, x: fullWidth ? 0 : "-50%", y: 0, scale: 1 }}
      transition={spring(springs.expressiveEffects)}
      style={fullWidth ? { width: "calc(100% - 2rem)" } : { width }}
      className={cn(
        "m3-elevation-2 absolute flex items-center justify-center gap-1 rounded-full px-3 py-2",
        position === "bottom" ? "bottom-4" : "top-4",
        fullWidth ? "left-4" : "left-1/2",
        c.container,
        className
      )}
    >
      {icons.map(renderIconButton)}
    </motion.div>
  );
}

export { toolbarMeta } from "@/lib/m3/meta";
