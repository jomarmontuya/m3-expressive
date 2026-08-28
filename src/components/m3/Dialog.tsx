"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import {
  Dialog as BaseDialog,
  type DialogRootActions,
  type DialogRootChangeEventDetails,
} from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";
import { springs, durations } from "@/lib/m3/tokens";
import { MaterialSymbol } from "./MaterialSymbol";

export interface DialogProps {
  open: boolean;
  /** Scrim click + Escape + close handling; ignored when dismissible is false. */
  onClose?: () => void;
  /** Leading Material Symbol centered above the headline. */
  icon?: string;
  headline?: string;
  /** Dialog body content. */
  children?: React.ReactNode;
  /** Row of action buttons, right-aligned with the official 8dp gap. */
  actions?: React.ReactNode;
  /** Edge-to-edge full screen variant. */
  fullscreen?: boolean;
  /** Allow Escape and scrim-tap dismissal. Default true. */
  dismissible?: boolean;
  className?: string;
}

/**
 * M3 Dialog — a modal window that blocks the page underneath with a 32%
 * scrim. Basic dialogs center on screen on surface-container-high with
 * 28dp corners, elevation 3 and the official 280–560dp width range;
 * fullscreen dialogs cover the viewport edge-to-edge.
 *
 * Built on Base UI's headless Dialog: Root owns the focus trap, page
 * scroll lock, focus restore to the trigger, Escape/outside-press
 * dismissal and aria-modal wiring; Backdrop is the scrim and Popup the
 * panel. Our `open`/`onClose` API stays the public contract — Base UI's
 * `onOpenChange` reasons are filtered through `dismissible` (non-dismissible
 * dialogs ignore escape/outside reasons). The M3 entrance (scale 0.9 → 1
 * on the expressive spring, scrim fade) is framer-motion composed via the
 * element-form `render` prop; Base UI defers unmounting until the exit
 * animation finishes (`preventUnmountOnClose` + `actionsRef.unmount`).
 */
export function Dialog({
  open,
  onClose,
  icon,
  headline,
  children,
  actions,
  fullscreen = false,
  dismissible = true,
  className,
}: DialogProps) {
  const headlineId = React.useId();
  const bodyId = React.useId();

  // Keep the dialog mounted while the framer-motion exit plays, then unmount.
  const actionsRef = React.useRef<DialogRootActions>({ unmount() {}, close() {} });

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean, eventDetails: DialogRootChangeEventDetails) => {
      if (nextOpen) return;
      // Non-dismissible dialogs ignore Escape / outside-press requests;
      // programmatic closes (imperative action / close press) still flow.
      if (
        !dismissible &&
        (eventDetails.reason === "escape-key" || eventDetails.reason === "outside-press")
      ) {
        return;
      }
      eventDetails.preventUnmountOnClose();
      onClose?.();
    },
    [dismissible, onClose]
  );

  const scrimMotion: HTMLMotionProps<"div"> = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    // Named framer easing (tokens.ts easings.* are CSS strings, not
    // framer Easing tuples); "easeOut" ≙ easings.standardDecelerate
    transition: { duration: durations.short4 / 1000, ease: "easeOut" },
  };

  const panelMotion: HTMLMotionProps<"div"> = {
    initial: { scale: 0.9, y: 20, opacity: 0 },
    animate: { scale: 1, y: 0, opacity: 1 },
    exit: { scale: 0.9, y: 20, opacity: 0 },
    transition: springs.expressive,
  };

  return (
    <BaseDialog.Root open={open} onOpenChange={handleOpenChange} actionsRef={actionsRef} modal>
      <AnimatePresence>
        {open && (
          <BaseDialog.Portal>
            <BaseDialog.Backdrop render={<motion.div {...scrimMotion} />} className="fixed inset-0 z-[80] bg-m3-scrim/32" />
            <BaseDialog.Popup
              aria-labelledby={headline ? headlineId : undefined}
              aria-describedby={children ? bodyId : undefined}
              render={<motion.div {...panelMotion} />}
              className={cn(
                "m3-elevation-3 bg-m3-surface-container-high p-6 outline-none",
                // Transform-free centering (inset-0 + margin auto) — framer owns
                // the transform for the M3 entrance spring.
                fullscreen
                  ? "fixed inset-0 z-[80] h-full w-full rounded-none"
                  : "fixed inset-0 z-[80] m-auto h-fit w-[min(560px,calc(100vw-3rem))] min-w-[280px] rounded-[28px]",
                className
              )}
            >
              {icon && (
                // Official: 24dp primary icon, center-aligned, 16dp above the headline
                <span className="mb-4 flex justify-center">
                  <MaterialSymbol icon={icon} size={24} className="text-m3-primary" />
                </span>
              )}
              {headline && (
                // Official: headline center-aligns when an icon is present, start-aligns otherwise
                <h2
                  id={headlineId}
                  className={cn("md-headline-small mb-4 text-m3-on-surface", icon && "text-center")}
                >
                  {headline}
                </h2>
              )}
              {children && (
                <div id={bodyId} className="md-body-medium text-m3-on-surface-variant">
                  {children}
                </div>
              )}
              {actions && (
                // Official action area: 8dp between text buttons, 24dp above / 24dp sides+below
                <div className="flex flex-wrap items-center justify-end gap-2 pt-6">{actions}</div>
              )}
            </BaseDialog.Popup>
          </BaseDialog.Portal>
        )}
      </AnimatePresence>
    </BaseDialog.Root>
  );
}

export { dialogMeta } from "@/lib/m3/meta";
