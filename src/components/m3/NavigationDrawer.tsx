'use client';

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export interface NavigationDrawerProps {
  items: NavItem[];
  value: string;
  onChange: (v: string) => void;
  /** modal slides over content with a scrim; standard is a static inline panel */
  variant?: "modal" | "standard";
  /** Controls the modal drawer (standard is always visible). Uncontrolled defaults to closed. */
  open?: boolean;
  onClose?: () => void;
  /** Headline area rendered above the items */
  header?: React.ReactNode;
  /** Content pushed to the bottom of the drawer */
  footer?: React.ReactNode;
  /** Stretch to the container height (standard variant) */
  fullHeight?: boolean;
  className?: string;
}

/**
 * M3 Navigation Drawer — side navigation for destinations.
 * Modal variant slides in from the left over a scrim (Esc / scrim click to
 * dismiss); standard variant is a static 280dp panel. The active destination
 * is a full-width tonal pill that springs between items (layoutId).
 */
export function NavigationDrawer({
  items,
  value,
  onChange,
  variant = "modal",
  open,
  onClose,
  header,
  footer,
  fullHeight = false,
  className,
}: NavigationDrawerProps) {
  const uid = React.useId();
  const pillId = `m3-drawer-pill-${uid}`;
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const showModal = variant === "modal" && (open !== undefined ? open : uncontrolledOpen);

  const handleClose = React.useCallback(() => {
    if (!isControlled) setUncontrolledOpen(false);
    onClose?.();
  }, [isControlled, onClose]);

  React.useEffect(() => {
    if (!showModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [showModal, handleClose]);

  const body = (
    <>
      {header && <div className="px-4 pb-2 pt-4">{header}</div>}
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const active = item.value === value;
          return (
            <li key={item.value}>
              <button
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => onChange(item.value)}
                className="m3-state relative flex h-14 w-full items-center rounded-full px-4"
              >
                <Ripple />
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
                <span className={cn("md-label-large relative ml-3", active ? "text-m3-on-secondary-container" : "text-m3-on-surface")}>
                  {item.label}
                </span>
                {item.badge !== undefined && (
                  <span className="relative ml-auto rounded-full bg-m3-error px-1.5 py-0.5 text-xs font-medium leading-none text-m3-on-error">
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      {footer && <div className="mt-auto p-2">{footer}</div>}
    </>
  );

  if (variant === "standard") {
    return (
      <nav
        aria-label="Navigation drawer"
        className={cn(
          "m3-scroll flex w-[280px] shrink-0 flex-col overflow-y-auto rounded-3xl border border-m3-outline-variant bg-m3-surface-container-low p-3",
          fullHeight && "h-full",
          className
        )}
      >
        {body}
      </nav>
    );
  }

  return (
    <AnimatePresence>
      {showModal && (
        <div key="m3-drawer" className="fixed inset-0 z-[75]" role="dialog" aria-modal="true" aria-label="Navigation drawer">
          <motion.div
            className="absolute inset-0 bg-m3-scrim/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={spring(springs.defaultVisual)}
            onClick={handleClose}
          />
          <motion.nav
            aria-label="Navigation drawer"
            className="m3-scroll absolute left-0 top-0 flex h-full w-[320px] flex-col overflow-y-auto rounded-r-3xl bg-m3-surface-container-low p-3"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={spring(springs.defaultSpatial)}
          >
            {body}
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}

export { navigationDrawerMeta } from "@/lib/m3/meta";
