'use client';

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export type TopAppBarVariant = "small" | "center" | "medium" | "large";

export interface TopAppBarAction {
  icon: string;
  label?: string;
  onClick?: () => void;
}

export interface TopAppBarProps {
  title: string;
  variant?: TopAppBarVariant;
  actions?: TopAppBarAction[];
  onBack?: () => void;
  /** Scroll container to observe; defaults to the window. */
  scrollTargetRef?: React.RefObject<HTMLElement | null>;
  fullWidth?: boolean;
  className?: string;
}

/** framer-motion's legacy `Spring` type drops the "spring" literal, so tokens.springs widens to `string`; re-narrow for `Transition`. */
function spring(transition: (typeof springs)[keyof typeof springs]): Transition {
  return { ...transition, type: "spring" };
}

const heights: Record<TopAppBarVariant, number> = {
  small: 64,
  center: 64,
  medium: 112,
  large: 152,
};

function AppBarIconButton({ icon, label, onClick }: { icon: string; label?: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label={label ?? icon}
      title={label}
      onClick={onClick}
      className="m3-state relative flex h-10 w-10 items-center justify-center rounded-full text-m3-on-surface-variant"
    >
      <Ripple />
      <MaterialSymbol icon={icon} size={24} />
    </button>
  );
}

/**
 * M3 Top App Bar — all four official variants (small, center-aligned,
 * medium flexible, large flexible). On scroll, the bar gains a surface
 * container background + elevation; medium/large titles collapse from the
 * big bottom position into the 64dp top row with a spring height animation.
 */
export function TopAppBar({
  title,
  variant = "small",
  actions = [],
  onBack,
  scrollTargetRef,
  fullWidth = true,
  className,
}: TopAppBarProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const isFlexible = variant === "medium" || variant === "large";
  const collapsed = isFlexible && scrolled;
  const threshold = isFlexible ? heights[variant] - 64 : 4;

  React.useEffect(() => {
    const el = scrollTargetRef?.current ?? null;
    const readTop = () => (el ? el.scrollTop : window.scrollY);
    const onScroll = () => setScrolled(readTop() > threshold);
    onScroll();
    const target: HTMLElement | Window = el ?? window;
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, [scrollTargetRef, threshold]);

  const barState = scrolled ? "bg-m3-surface-container m3-elevation-2" : "bg-transparent";
  const actionsRow = (
    <div className="ml-auto flex items-center gap-1">
      {actions.map((action, i) => (
        <AppBarIconButton key={`${action.icon}-${i}`} icon={action.icon} label={action.label} onClick={action.onClick} />
      ))}
    </div>
  );

  if (!isFlexible) {
    return (
      <header
        className={cn(
          "sticky top-0 z-40 transition-[background-color,box-shadow] duration-300",
          barState,
          fullWidth && "w-full",
          className
        )}
      >
        <div className="relative flex h-16 items-center px-1">
          {onBack && <AppBarIconButton icon="arrow_back" label="Back" onClick={onBack} />}
          <span
            className={cn(
              "md-title-large px-2",
              variant === "center" && "absolute left-1/2 max-w-[60%] -translate-x-1/2 truncate text-center"
            )}
          >
            {title}
          </span>
          {actionsRow}
        </div>
      </header>
    );
  }

  return (
    <motion.header
      animate={{ height: collapsed ? 64 : heights[variant] }}
      transition={spring(springs.defaultSpatial)}
      className={cn(
        "sticky top-0 z-40 overflow-hidden transition-[background-color,box-shadow] duration-300",
        barState,
        fullWidth && "w-full",
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 flex h-16 items-center px-1">
        {onBack && <AppBarIconButton icon="arrow_back" label="Back" onClick={onBack} />}
        <AnimatePresence>
          {collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={spring(springs.fastVisual)}
              className="md-title-large max-w-[60%] truncate px-2"
            >
              {title}
            </motion.span>
          )}
        </AnimatePresence>
        {actionsRow}
      </div>
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            key="hero-title"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={spring(springs.defaultSpatial)}
            className="absolute inset-x-4 bottom-1"
          >
            <span className={cn("block truncate", variant === "large" ? "md-headline-medium" : "md-headline-small")}>
              {title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export { topAppBarMeta } from "@/lib/m3/meta";
