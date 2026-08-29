'use client';
/* eslint-disable max-lines -- standard and modal wide-rail modes share one navigation contract */

import * as React from "react";
import { Dialog } from "@base-ui/react/dialog";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { useTextDirection } from "@/lib/m3/use-text-direction";
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
  /** wide is the current M3E rail; narrow keeps the compact 80dp baseline rail. */
  variant?: "wide" | "narrow";
  /** Expands a wide rail from 96dp to a horizontal 220–360dp layout. */
  expanded?: boolean;
  /** Expanded wide-rail width, clamped to the official 220–360dp range. */
  expandedWidth?: number;
  /** Standard expansion affects layout; modal expansion overlays content and traps focus. */
  expandedMode?: "standard" | "modal";
  /** Draw a hinge/fold divider along the leading edge (foldable devices) */
  foldingLine?: boolean;
  className?: string;
}

// No Base UI primitive for a vertical navigation rail in v1.0.0-rc.0 — custom
// implementation retained.
/**
 * M3 Navigation Rail — side navigation for medium and expanded screens.
 * The current M3E wide rail morphs between a 96dp collapsed rail and a
 * 220–360dp expanded rail. The 80dp narrow baseline remains available.
 */
/** Material 3 Expressive navigation rail for wider screens. @see https://m3.material.io/components/navigation-rail/overview */
export const NavigationRail = React.forwardRef<HTMLElement, NavigationRailProps>(function NavigationRail({
  items,
  value,
  onChange,
  header,
  menuIcon = "menu",
  onMenuClick,
  variant = "wide",
  expanded = false,
  expandedWidth = 360,
  expandedMode = "standard",
  foldingLine = false,
  className,
}: NavigationRailProps, ref) {
  const uid = React.useId();
  const pillId = `m3-rail-pill-${uid}`;
  const rootRef = React.useRef<HTMLElement>(null);
  const modalTriggerRef = React.useRef<HTMLButtonElement>(null);
  const restoreModalFocusRef = React.useRef(false);
  const direction = useTextDirection(rootRef);
  const isWide = variant === "wide";
  const isExpanded = isWide && expanded;
  const isModalExpanded = isExpanded && expandedMode === "modal";
  const railWidth = Math.min(360, Math.max(220, expandedWidth));

  React.useEffect(() => {
    if (!isModalExpanded && restoreModalFocusRef.current) {
      const frame = requestAnimationFrame(() => {
        modalTriggerRef.current?.focus();
        restoreModalFocusRef.current = false;
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [isModalExpanded]);

  const requestMenuChange = React.useCallback(() => {
    if (expandedMode === "modal") restoreModalFocusRef.current = true;
    onMenuClick?.();
  }, [expandedMode, onMenuClick]);

  const panelContent = (
    <>
      {((onMenuClick && (expandedMode !== "modal" || isModalExpanded)) || header) && (
        <div className={cn("mb-10 flex flex-col gap-2", isExpanded ? "items-stretch" : "items-center")}>
          {onMenuClick && (expandedMode !== "modal" || isModalExpanded) && (
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={isExpanded}
              title="Menu"
              onClick={requestMenuChange}
              className={cn(
                "m3-state m3-focus relative flex h-12 items-center rounded-full text-m3-on-surface-variant",
                isExpanded ? "w-full gap-3 px-4" : "w-12 justify-center"
              )}
            >
              <Ripple />
              <MaterialSymbol icon={menuIcon} size={24} />
              {isExpanded && <span className="md-label-large">Menu</span>}
            </button>
          )}
          {header && <div className={cn("flex", isExpanded ? "justify-start" : "justify-center")}>{header}</div>}
        </div>
      )}
      <ul className={cn(
        "flex flex-col",
        isExpanded ? "items-stretch gap-0" : isWide ? "items-center gap-1" : "items-center gap-3"
      )}>
        {items.map((item) => {
          const active = item.value === value;
          return (
            <li key={item.value}>
              <button
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => onChange(item.value)}
                className={cn(
                  "m3-state m3-focus relative flex items-center",
                  isExpanded
                    ? "h-14 w-full gap-2 rounded-full px-4"
                    : cn(isWide ? "h-16 w-24" : "w-20", "flex-col gap-1 pb-2 pt-1")
                )}
              >
                <Ripple />
                <span
                  className={cn(
                    "relative flex items-center justify-center rounded-full",
                    isExpanded ? "h-14 w-full justify-start gap-2" : "h-8 w-14"
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId={pillId}
                      transition={spring(springs.expressive)}
                      className={cn(
                        "absolute rounded-full bg-m3-secondary-container",
                        isExpanded ? "inset-0" : "inset-0"
                      )}
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
                  {isExpanded && (
                    <span className={cn("relative md-label-large", active ? "text-m3-on-secondary-container" : "text-m3-on-surface-variant")}>
                      {item.label}
                    </span>
                  )}
                  {item.badge !== undefined && (
                    <span className={cn(
                      "z-10 flex h-4 min-w-4 items-center justify-center rounded-full bg-m3-error px-1 text-[10px] font-semibold leading-none text-m3-on-error",
                      isExpanded ? "relative ms-auto" : "absolute -end-1.5 -top-1"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </span>
                {!isExpanded && (
                  <span className={cn("md-label-medium", active ? "text-m3-secondary" : "text-m3-on-surface-variant")}>
                    {item.label}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );

  const inlinePanel = (
    <motion.div
      initial={false}
      animate={isExpanded ? { x: 0 } : undefined}
      transition={spring(springs.fastSpatial)}
      style={isExpanded ? { width: railWidth } : undefined}
      className={cn(
        isExpanded
          ? "flex h-full flex-col items-stretch gap-1 bg-m3-surface px-4"
          : "contents"
      )}
    >
      {panelContent}
    </motion.div>
  );

  return (
    <nav
      ref={(node) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      aria-label="Primary"
      style={isExpanded && !isModalExpanded ? { width: railWidth } : undefined}
      className={cn(
        "relative flex min-h-full shrink-0 flex-col gap-3 bg-m3-surface",
        isWide ? "py-11" : "py-3",
        isExpanded && !isModalExpanded ? "items-stretch" : "items-center",
        isWide && (!isExpanded || isModalExpanded) ? "w-24" : !isWide ? "w-20" : undefined,
        foldingLine && "border-e border-m3-outline-variant",
        className
      )}
    >
      {expandedMode === "modal" ? (
        <>
          {onMenuClick && (
            <button
              ref={modalTriggerRef}
              type="button"
              aria-label="Menu"
              aria-expanded={isModalExpanded}
              title="Menu"
              onClick={requestMenuChange}
              className="m3-state m3-focus relative mb-10 flex h-12 w-12 items-center justify-center rounded-full text-m3-on-surface-variant"
            >
              <Ripple />
              <MaterialSymbol icon={menuIcon} size={24} />
            </button>
          )}
          <Dialog.Root
            open={isModalExpanded}
            onOpenChange={(nextOpen) => {
              if (!nextOpen) requestMenuChange();
            }}
            modal
          >
            {isModalExpanded && (
              <Dialog.Portal>
                <Dialog.Backdrop className="fixed inset-0 z-[74] bg-m3-scrim/32" />
                <Dialog.Popup
                  role="dialog"
                  aria-modal="true"
                  aria-label="Expanded navigation rail"
                  dir={direction}
                  render={
                    <motion.div
                      initial={{ x: direction === "rtl" ? "100%" : "-100%" }}
                      animate={{ x: 0 }}
                      transition={spring(springs.fastSpatial)}
                    />
                  }
                  className="fixed inset-y-0 start-0 z-[75] flex flex-col items-stretch gap-1 rounded-e-2xl bg-m3-surface-container-low px-4 pb-4 pt-11 m3-elevation-3 outline-none"
                  style={{ width: railWidth }}
                >
                  {panelContent}
                </Dialog.Popup>
              </Dialog.Portal>
            )}
          </Dialog.Root>
          {!isModalExpanded && inlinePanel}
        </>
      ) : (
        inlinePanel
      )}
    </nav>
  );
});

NavigationRail.displayName = "NavigationRail";

export { navigationRailMeta } from "@/lib/m3/meta";
