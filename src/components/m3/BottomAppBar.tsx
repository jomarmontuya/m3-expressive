'use client';

import * as React from "react";
import { Toolbar } from "@base-ui/react/toolbar";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, durations, easings } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export interface BottomAppBarAction {
  icon: string;
  label?: string;
  onClick?: () => void;
}

export interface BottomAppBarTrailingAction extends BottomAppBarAction {
  label: string;
}

export type BottomAppBarNavigationIcon = BottomAppBarAction;
export type BottomAppBarScrollBehavior = "none" | "exit-always";

export interface BottomAppBarFab {
  icon: string;
  onClick?: () => void;
}

/** framer-motion's legacy `Spring` type drops the "spring" literal, so tokens.springs widens to `string`; re-narrow for `Transition`. */
function spring(transition: (typeof springs)[keyof typeof springs]): Transition {
  return { ...transition, type: "spring" };
}

export interface BottomAppBarProps {
  /** Leading navigation icon (official anatomy item; typically the hamburger/menu affordance) */
  navigationIcon?: BottomAppBarNavigationIcon;
  actions?: BottomAppBarAction[];
  /** Trailing labeled action objects. */
  trailingActions?: BottomAppBarTrailingAction[];
  /** FAB that docks at the bar edge; center placement overlaps without a cutout. */
  fab?: BottomAppBarFab;
  /** flexible is the current 64dp docked-toolbar form; standard is the 80dp baseline bar. */
  variant?: "flexible" | "standard";
  /** Flexible content distribution. Standard always uses start arrangement. */
  arrangement?: "start" | "between" | "around" | "evenly" | "fixed";
  /** Flexible expanded height. Any positive finite number is accepted. */
  expandedHeight?: number;
  /** Official bottom app bar scroll policy. The default keeps the bar visible. */
  scrollBehavior?: BottomAppBarScrollBehavior;
  /** Scroll container to observe for an opt-in scroll behavior; defaults to the window. */
  scrollTargetRef?: React.RefObject<HTMLElement | null>;
  /** Official FAB placement is end. Center is kept as a compatibility extension. */
  fabPosition?: "end" | "center";
  fullWidth?: boolean;
  className?: string;
}

// No Base UI app-bar primitive — layout retained; optional Toolbar semantics on the actions row.
/**
 * M3 Bottom App Bar — key actions at the bottom of small screens. The current
 * flexible form uses the 64dp docked-toolbar tokens and configurable content
 * arrangement. The 80dp baseline form remains available.
 *
 * The bar itself is a Base UI Toolbar.Root: every icon button (navigation
 * icon, actions, trailing actions) is a Toolbar.Button, giving the bar
 * `role="toolbar"` with roving tabindex + arrow-key navigation. The
 * center FAB is intentionally not a toolbar item — it is a distinct
 * express-press action and keeps its normal tab position.
 */
// Shared stable defaults — a literal `[]` default is re-created per render.
const EMPTY_ACTIONS: BottomAppBarAction[] = [];
const EMPTY_TRAILING_ACTIONS: BottomAppBarTrailingAction[] = [];

export const BottomAppBar = React.forwardRef<HTMLDivElement, BottomAppBarProps>(function BottomAppBar({
  navigationIcon,
  actions = EMPTY_ACTIONS,
  trailingActions = EMPTY_TRAILING_ACTIONS,
  fab,
  variant = "flexible",
  arrangement = "between",
  expandedHeight,
  scrollBehavior = "none",
  scrollTargetRef,
  fabPosition = "end",
  fullWidth = true,
  className,
}: BottomAppBarProps, ref) {
  const [fabPressed, setFabPressed] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const height = variant === "flexible"
    ? Number.isFinite(expandedHeight) && (expandedHeight ?? 0) > 0 ? expandedHeight! : 64
    : 80;
  const resolvedArrangement = variant === "standard" ? "start" : arrangement;

  React.useEffect(() => {
    if (scrollBehavior === "none") {
      setHidden(false);
      return;
    }

    const target = scrollTargetRef?.current ?? window;
    const readTop = () => target instanceof Window ? window.scrollY : target.scrollTop;
    let previousTop = readTop();
    const onScroll = () => {
      const top = readTop();
      const delta = top - previousTop;
      previousTop = top;
      setHidden(top > 0 && delta > 0);
    };
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, [scrollBehavior, scrollTargetRef]);

  const fabButton = fab ? (
    <motion.button
      type="button"
      aria-label={fab.icon}
      onClick={fab.onClick}
      onPointerDown={() => setFabPressed(true)}
      onPointerUp={() => setFabPressed(false)}
      onPointerLeave={() => setFabPressed(false)}
      animate={{ borderRadius: fabPressed ? 28 : 16, scale: fabPressed ? 0.95 : 1 }}
      transition={spring(springs.expressiveEffects)}
      className="m3-state m3-focus m3-elevation-3 relative flex h-14 w-14 items-center justify-center bg-m3-primary-container"
    >
      <Ripple />
      <MaterialSymbol icon={fab.icon} size={24} fill className="text-m3-on-primary-container" />
    </motion.button>
  ) : null;

  return (
    // Base UI Toolbar: the bar <div> gains role="toolbar" and the icon
    // buttons below become Toolbar.Buttons (roving tabindex + arrow keys).
    <Toolbar.Root
      ref={ref}
      style={{
        height,
        transform: hidden ? "translateY(100%)" : undefined,
        transitionDuration: `${durations.medium2}ms`,
        transitionTimingFunction: easings.standard,
      }}
      className={cn(
        "relative flex items-center bg-m3-surface-container px-4 transition-transform",
        resolvedArrangement === "start" && "justify-start",
        resolvedArrangement === "between" && "justify-between",
        resolvedArrangement === "around" && "justify-around",
        resolvedArrangement === "evenly" && "justify-evenly",
        resolvedArrangement === "fixed" && "justify-center gap-8",
        fullWidth && "w-full",
        className
      )}
    >
      <div className="flex items-center gap-1">
        {navigationIcon && (
          <Toolbar.Button
            aria-label={navigationIcon.label ?? navigationIcon.icon}
            title={navigationIcon.label}
            onClick={navigationIcon.onClick}
            className="m3-state m3-focus relative flex h-12 w-12 items-center justify-center rounded-full text-m3-on-surface-variant"
          >
            <Ripple />
            <MaterialSymbol icon={navigationIcon.icon} size={24} />
          </Toolbar.Button>
        )}
        {actions.map((action, i) => (
          <Toolbar.Button
            key={`${action.icon}-${i}`}
            aria-label={action.label ?? action.icon}
            title={action.label}
            onClick={action.onClick}
            className="m3-state m3-focus relative flex h-12 w-12 items-center justify-center rounded-full text-m3-on-surface-variant"
          >
            <Ripple />
            <MaterialSymbol icon={action.icon} size={24} />
          </Toolbar.Button>
        ))}
      </div>

      {fabButton && fabPosition === "center" && (
        <span className="absolute -top-7 left-1/2 z-10 -translate-x-1/2">
          {fabButton}
        </span>
      )}

      <div className="flex items-center gap-1">
        {trailingActions.map((action, i) => (
          <Toolbar.Button
            key={`${action.icon}-${i}`}
            aria-label={action.label}
            title={action.label}
            onClick={action.onClick}
            className="m3-state m3-focus relative flex h-12 w-12 items-center justify-center rounded-full text-m3-on-surface-variant"
          >
            <Ripple />
            <MaterialSymbol icon={action.icon} size={24} />
          </Toolbar.Button>
        ))}
      </div>
      {fabButton && fabPosition === "end" && (
        <span className={cn("shrink-0", variant === "standard" ? "ms-auto" : "ms-2")}>{fabButton}</span>
      )}
    </Toolbar.Root>
  );
});

BottomAppBar.displayName = "BottomAppBar";

export { bottomAppBarMeta } from "@/lib/m3/meta";
