'use client';

import * as React from "react";
import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, durations, easings } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export interface ToolbarIconItem {
  icon: string;
  label?: string;
  onClick?: () => void;
  active?: boolean;
}

export type ToolbarVariant = "floating" | "dockable";
export type ToolbarColor =
  | "standard"
  | "vibrant"
  | "surface"
  | "primary"
  | "secondary"
  | "tertiary";

export interface ToolbarProps {
  icons?: ToolbarIconItem[];
  /** Arbitrary toolbar controls, including Buttons and text fields. */
  children?: React.ReactNode;
  /** Optional FAB placed at the trailing edge of a horizontal toolbar. */
  fab?: React.ReactNode;
  variant?: ToolbarVariant;
  /** Official standard or vibrant colors. Legacy color-role aliases remain supported. */
  color?: ToolbarColor;
  /** Floating placement inside a positioned ancestor */
  position?: "top" | "bottom" | "left" | "right";
  /** Floating toolbars support horizontal and vertical layouts. */
  orientation?: "horizontal" | "vertical";
  /** Pill width for the floating variant (px) */
  width?: number;
  fullWidth?: boolean;
  /** Dockable variant: square corners and full width when docked, pill otherwise. */
  docked?: boolean;
  className?: string;
}

/** framer-motion's legacy `Spring` type drops the "spring" literal, so tokens.springs widens to `string`; re-narrow for `Transition`. */
function spring(transition: (typeof springs)[keyof typeof springs]): Transition {
  return { ...transition, type: "spring" };
}

const standardColors = {
  container: "bg-m3-surface-container",
  icon: "text-m3-on-surface",
  activeBg: "bg-m3-secondary-container",
  activeIcon: "text-m3-on-secondary-container",
};
const vibrantColors = {
  container: "bg-m3-primary-container",
  icon: "text-m3-on-primary-container",
  activeBg: "bg-m3-surface-container",
  activeIcon: "text-m3-on-surface",
};

const colorStyles: Record<ToolbarColor, { container: string; icon: string; activeBg: string; activeIcon: string }> = {
  standard: standardColors,
  vibrant: vibrantColors,
  surface: standardColors,
  primary: vibrantColors,
  secondary: { container: "bg-m3-secondary-container", icon: "text-m3-on-secondary-container", activeBg: "bg-m3-on-secondary-container/12", activeIcon: "text-m3-on-secondary-container" },
  tertiary: { container: "bg-m3-tertiary-container", icon: "text-m3-on-tertiary-container", activeBg: "bg-m3-on-tertiary-container/12", activeIcon: "text-m3-on-tertiary-container" },
};

/**
 * M3 Expressive Toolbar — NEW in 2025. A compact pill of contextual actions.
 * Floating variant hovers over content (top/bottom, centered); dockable
 * variant morphs between a floating pill and a square, docked full-width bar.
 *
 * Built on the Base UI Toolbar primitive (imported as `BaseToolbar` because
 * this module also exports a `Toolbar`): `Toolbar.Root` provides the
 * `role="toolbar"` container with roving tabindex + arrow-key navigation, and
 * each action is a `Toolbar.Button` that registers itself via context. The
 * floating variant composes the entrance spring through Base UI's `render`
 * prop so the bar keeps its framer-motion animation while still being the
 * toolbar root (Base UI merges role/aria/handlers onto the motion element).
 */
export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar({
  icons = [],
  children,
  fab,
  variant = "floating",
  color = "standard",
  position = "bottom",
  orientation = "horizontal",
  width = 560,
  fullWidth = false,
  docked = false,
  className,
}: ToolbarProps, ref) {
  const c = colorStyles[color];
  const isVertical = orientation === "vertical";

  const renderIconButton = (item: ToolbarIconItem, i: number) => (
    <BaseToolbar.Button
      key={`${item.icon}-${i}`}
      aria-label={item.label ?? item.icon}
      title={item.label}
      aria-pressed={item.active === undefined ? undefined : item.active}
      onClick={item.onClick}
      className={cn(
        "m3-state m3-focus relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
        item.active ? c.activeIcon : c.icon,
        item.active && c.activeBg
      )}
    >
      <Ripple />
      <MaterialSymbol icon={item.icon} size={24} fill={item.active} />
    </BaseToolbar.Button>
  );

  const content = (
    <>
      {icons.map(renderIconButton)}
      {children}
      {fab && <span className={cn("flex shrink-0", !isVertical && "ml-auto")}>{fab}</span>}
    </>
  );

  if (variant === "dockable") {
    return (
      <div ref={ref} className={cn("w-full", className)}>
        {/* BaseToolbar.Root renders the bar <div> itself (role="toolbar") */}
        <BaseToolbar.Root
          orientation="horizontal"
          style={{
            width: !docked && !fullWidth ? width : undefined,
            transitionDuration: `${durations.medium2}ms`,
            transitionTimingFunction: easings.standard,
          }}
          className={cn(
            "flex h-16 items-center gap-1 transition-all",
            docked
              ? "w-full rounded-none px-2"
              : cn("mx-auto rounded-full px-2", fullWidth ? "w-full" : "justify-center"),
            c.container
          )}
        >
          {content}
        </BaseToolbar.Root>
      </div>
    );
  }

  return (
    // render prop: the toolbar root *is* the animated pill — Base UI clones the
    // motion.div with its toolbar props, framer-motion keeps the entrance spring.
    <BaseToolbar.Root
      ref={ref}
      orientation={orientation}
      render={
        <motion.div
          initial={{
            opacity: 0,
            x: isVertical ? (position === "right" ? 12 : -12) : fullWidth ? 0 : "-50%",
            y: isVertical ? "-50%" : position === "bottom" ? 12 : -12,
            scale: 0.96,
          }}
          animate={{ opacity: 1, x: isVertical ? 0 : fullWidth ? 0 : "-50%", y: isVertical ? "-50%" : 0, scale: 1 }}
          transition={spring(springs.expressiveEffects)}
          style={
            !isVertical
              ? {
                  width: fullWidth ? "calc(100% - 2rem)" : `min(${width}px, calc(100% - 2rem))`,
                  transitionDuration: `${durations.medium2}ms`,
                  transitionTimingFunction: easings.standard,
                }
              : {
                  transitionDuration: `${durations.medium2}ms`,
                  transitionTimingFunction: easings.standard,
                }
          }
          className={cn(
            "absolute flex items-center justify-center gap-1 rounded-full",
            isVertical ? "px-2 py-4" : "px-2 py-2",
            isVertical ? "w-16 flex-col" : "h-16 flex-row",
            !isVertical && (position === "bottom" ? "bottom-4" : "top-4"),
            !isVertical && (fullWidth ? "left-4" : "left-1/2"),
            isVertical && (position === "right" ? "right-4" : "left-4"),
            isVertical && "top-1/2",
            c.container,
            className
          )}
        />
      }
    >
      {content}
    </BaseToolbar.Root>
  );
});

Toolbar.displayName = "Toolbar";

export { toolbarMeta } from "@/lib/m3/meta";
