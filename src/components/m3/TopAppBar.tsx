'use client';

import * as React from "react";
import { Toolbar } from "@base-ui/react/toolbar";
import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, durations, easings } from "@/lib/m3/tokens";
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

function AppBarIconButton({
  icon,
  label,
  onClick,
  toolbar = false,
}: {
  icon: string;
  label?: string;
  onClick?: () => void;
  /** Render as a Base UI Toolbar.Button so the button joins the actions-row roving-tabindex group. */
  toolbar?: boolean;
}) {
  const classes =
    "m3-state relative flex h-11 w-11 items-center justify-center rounded-full text-m3-on-surface-variant";
  const content = (
    <>
      <Ripple />
      <MaterialSymbol icon={icon} size={24} />
    </>
  );
  if (toolbar) {
    return (
      <Toolbar.Button aria-label={label ?? icon} title={label} onClick={onClick} className={classes}>
        {content}
      </Toolbar.Button>
    );
  }
  return (
    <button type="button" aria-label={label ?? icon} title={label} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

// No Base UI app-bar primitive — layout retained; optional Toolbar semantics on the actions row.
/**
 * M3 Top App Bar — all four official variants (small, center-aligned,
 * medium flexible, large flexible). On scroll, the bar gains a surface
 * container background + elevation; medium/large titles collapse from the
 * big bottom position into the 64dp top row with a spring height animation.
 *
 * The scroll/elevation/collapse behavior is app-bar specific and stays custom.
 * The actions row is wrapped in a Base UI Toolbar.Root (its buttons are
 * Toolbar.Buttons) purely for roving-tabindex + arrow-key semantics; the
 * leading back button sits outside that toolbar and stays a plain button.
 */
// Shared stable default — a literal `[]` default is re-created per render.
const EMPTY_ACTIONS: TopAppBarAction[] = [];

export function TopAppBar({
  title,
  variant = "small",
  actions = EMPTY_ACTIONS,
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

  // M3 on-scroll behavior: a surface-container color fill separates the bar
  // from content. No shadow — the elevation shadow is the old M2 treatment.
  const barState = scrolled ? "bg-m3-surface-container" : "bg-m3-surface";
  const actionsRow =
    actions.length > 0 ? (
      // Base UI Toolbar: roving tabindex + arrow keys across the action buttons.
      // Renders the same <div> as before, plus role="toolbar"/aria-orientation.
      // (Empty `actions` keeps the original plain spacer div — no empty toolbar.)
      <Toolbar.Root className="ml-auto flex items-center gap-1">
        {actions.map((action, i) => (
          <AppBarIconButton key={`${action.icon}-${i}`} toolbar icon={action.icon} label={action.label} onClick={action.onClick} />
        ))}
      </Toolbar.Root>
    ) : (
      <div className="ml-auto flex items-center gap-1" />
    );

  if (!isFlexible) {
    return (
      <header
        style={{ transitionDuration: `${durations.medium2}ms`, transitionTimingFunction: easings.standard }}
        className={cn(
          "sticky top-0 z-40 transition-[background-color]",
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
      animate={{
        height: collapsed ? 64 : heights[variant],
        backgroundColor: scrolled ? "var(--md-surface-container)" : "var(--md-surface)",
      }}
      transition={{
        height: spring(springs.defaultSpatial),
        backgroundColor: { duration: durations.medium2 / 1000, ease: [0.2, 0, 0, 1] },
      }}
      className={cn(
        "sticky top-0 z-40 overflow-hidden",
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
            <span className={cn("block truncate", variant === "large" ? "md-headline-large" : "md-headline-small")}>
              {title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export { topAppBarMeta } from "@/lib/m3/meta";
