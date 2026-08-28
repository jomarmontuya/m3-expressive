'use client';

import * as React from "react";
import { Dialog } from "@base-ui/react/dialog";
import type { DialogRootActions, DialogRootChangeEventDetails } from "@base-ui/react/dialog";
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

export interface NavigationDrawerProps {
  items: NavItem[];
  value: string;
  onChange: (v: string) => void;
  /** modal slides over a scrim; standard is a static inline panel — both 360dp wide per the M3 spec */
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
 * Official container: 360dp wide, surface-container-low, 16dp trailing
 * corners; 56dp full-width pill items (active = secondary-container).
 *
 * The modal variant is presented with the Base UI Dialog primitive:
 * `Dialog.Root/Portal/Backdrop/Popup` own Escape + scrim dismissal, the
 * focus trap, focus restore on close and the body scroll lock (all of
 * which were hand-rolled before the migration). The standard variant stays
 * a static inline panel — no dialog semantics apply to it.
 *
 * Animation note: the M3 slide uses a physics spring, which framer-motion
 * drives on the main thread (no CSS transition for Base UI to await before
 * unmounting). So on close we call `preventUnmountOnClose()` in
 * `onOpenChange` and imperatively `unmount()` the dialog once the slide-out
 * spring completes (`onAnimationComplete`) — the documented Base UI escape
 * hatch for externally-animated popups.
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

  /* Base UI Dialog wiring (modal presentation only). */
  const dialogActionsRef = React.useRef<DialogRootActions>(null!);

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean, eventDetails: DialogRootChangeEventDetails) => {
      if (!nextOpen) {
        // Keep the popup mounted while the framer-motion exit spring plays;
        // we unmount it ourselves in onAnimationComplete below.
        eventDetails.preventUnmountOnClose();
        if (!isControlled) setUncontrolledOpen(false);
        onClose?.();
      } else if (!isControlled) {
        setUncontrolledOpen(true);
      }
    },
    [isControlled, onClose]
  );

  /** Route internal close requests (destination picks) through Base UI so every close shares one exit path. */
  const handleClose = React.useCallback(() => {
    dialogActionsRef.current?.close();
  }, []);

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
                onClick={() => {
                  onChange(item.value);
                  // Modal drawers dismiss after the user picks a destination.
                  if (variant === "modal") handleClose();
                }}
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
                <span
                  className={cn(
                    "md-label-large relative ml-3",
                    active ? "text-m3-on-secondary-container" : "text-m3-on-surface-variant"
                  )}
                >
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
    // No dialog semantics for the inline/persistent drawer — plain panel.
    return (
      <nav
        aria-label="Navigation drawer"
        className={cn(
          "m3-scroll flex w-[360px] shrink-0 flex-col overflow-y-auto rounded-2xl bg-m3-surface-container-low p-3",
          fullHeight && "h-full",
          className
        )}
      >
        {body}
      </nav>
    );
  }

  return (
    <Dialog.Root open={showModal} onOpenChange={handleOpenChange} actionsRef={dialogActionsRef}>
      <Dialog.Portal>
        {/* 32% scrim — Base UI wires outside-press dismissal to this backdrop */}
        <Dialog.Backdrop
          render={
            <motion.div
              className="fixed inset-0 z-[75] bg-m3-scrim/32"
              initial={{ opacity: 0 }}
              animate={{ opacity: showModal ? 1 : 0 }}
              transition={spring(springs.defaultVisual)}
            />
          }
        />
        <Dialog.Popup
          render={
            <motion.nav
              aria-label="Navigation drawer"
              className="m3-scroll fixed inset-y-0 left-0 z-[75] flex w-[360px] flex-col overflow-y-auto rounded-r-2xl bg-m3-surface-container-low p-3 focus:outline-none"
              initial={{ x: "-100%" }}
              animate={{ x: showModal ? 0 : "-100%" }}
              transition={spring(springs.defaultSpatial)}
              onAnimationComplete={() => {
                if (!showModal) dialogActionsRef.current?.unmount();
              }}
            />
          }
        >
          {body}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { navigationDrawerMeta } from "@/lib/m3/meta";
