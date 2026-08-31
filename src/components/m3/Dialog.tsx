"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  onClose: () => void;
  /** Leading Material Symbol centered above the headline. */
  icon?: string;
  headline?: string;
  /** Accessible name used when no visible headline is present. */
  ariaLabel?: string;
  /** Dialog body content. */
  children?: React.ReactNode;
  /** Trailing action buttons. Full-screen dialogs place them in a 56dp bottom bar. */
  actions?: React.ReactNode;
  /** @deprecated Use `fullScreen`. */
  fullscreen?: boolean;
  /** Edge-to-edge full-screen variant with the official header app bar. */
  fullScreen?: boolean;
  /** Allow Escape and scrim-tap dismissal. Default true. */
  dismissible?: boolean;
  className?: string;
}

/**
 * M3 Dialog — a modal window that blocks the page underneath with a 32%
 * scrim. Basic dialogs center on screen on surface-container-high with
 * 28dp corners, elevation 3 and the official 280–560dp width range;
 * full-screen dialogs cover the viewport edge-to-edge and move the close
 * affordance and headline into the official 56dp header app bar. Full-screen
 * actions stay pinned in a separate 56dp bottom bar.
 * Titles and actions stay pinned while long body content scrolls inside the
 * bounded panel.
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
/** Material 3 dialog for focused decisions. @see https://m3.material.io/components/dialogs/overview */
export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  function Dialog(
    {
      open,
      onClose,
      icon,
      headline,
      ariaLabel,
      children,
      actions,
      fullscreen = false,
      fullScreen,
      dismissible = true,
      className,
    },
    ref,
  ) {
  const reduceMotion = useReducedMotion() ?? false;
  const isFullScreen = fullScreen ?? fullscreen;
  const headlineId = React.useId();
  const bodyId = React.useId();

  // Keep the dialog mounted while the framer-motion exit plays, then unmount.
  const actionsRef = React.useRef<DialogRootActions>({
    unmount() {},
    close() {},
  });

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean, eventDetails: DialogRootChangeEventDetails) => {
      if (nextOpen) return;
      // Non-dismissible dialogs ignore Escape / outside-press requests;
      // programmatic closes (imperative action / close press) still flow.
      if (
        !dismissible &&
        (eventDetails.reason === "escape-key" ||
          eventDetails.reason === "outside-press")
      ) {
        return;
      }
      eventDetails.preventUnmountOnClose();
      onClose();
    },
    [dismissible, onClose],
  );

  const scrimMotion: HTMLMotionProps<"div"> = {
    initial: reduceMotion ? false : { opacity: 0 },
    animate: { opacity: 1 },
    exit: reduceMotion ? { opacity: 1 } : { opacity: 0 },
    // Named framer easing (tokens.ts easings.* are CSS strings, not
    // framer Easing tuples); "easeOut" ≙ easings.standardDecelerate
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: durations.short4 / 1000, ease: "easeOut" },
  };

  const panelMotion: HTMLMotionProps<"div"> = {
    initial: reduceMotion
      ? false
      : isFullScreen
        ? { y: 24, opacity: 0 }
        : { scale: 0.9, y: 20, opacity: 0 },
    animate: isFullScreen
      ? { y: 0, opacity: 1 }
      : { scale: 1, y: 0, opacity: 1 },
    exit: reduceMotion
      ? isFullScreen
        ? { y: 0, opacity: 1 }
        : { scale: 1, y: 0, opacity: 1 }
      : isFullScreen
        ? { y: 24, opacity: 0 }
        : { scale: 0.9, y: 20, opacity: 0 },
    transition: reduceMotion ? { duration: 0 } : springs.expressive,
  };

  return (
    <BaseDialog.Root
      open={open}
      onOpenChange={handleOpenChange}
      actionsRef={actionsRef}
      modal
    >
      <AnimatePresence onExitComplete={() => actionsRef.current?.unmount()}>
        {open && (
          <BaseDialog.Portal>
            <BaseDialog.Backdrop
              render={<motion.div {...scrimMotion} />}
              className="fixed inset-0 z-[80] bg-m3-scrim/32"
            />
            <BaseDialog.Popup
              ref={ref}
              role={isFullScreen ? "dialog" : "alertdialog"}
              aria-labelledby={headline ? headlineId : undefined}
              aria-label={headline ? undefined : (ariaLabel ?? "Dialog")}
              aria-describedby={children ? bodyId : undefined}
              render={<motion.div {...panelMotion} />}
              className={cn(
                "bg-m3-surface-container-high outline-none",
                // Transform-free centering (inset-0 + margin auto) — framer owns
                // the transform for the M3 entrance spring.
                isFullScreen
                  ? "fixed inset-0 z-[80] flex h-full w-full flex-col rounded-none"
                  : "fixed inset-0 z-[80] m-auto flex h-fit max-h-[calc(100dvh-48px)] w-[min(560px,calc(100vw-3rem))] min-w-[280px] flex-col overflow-hidden rounded-[28px] m3-elevation-3",
                className,
              )}
            >
              {isFullScreen && (
                <header className="flex h-14 shrink-0 items-center gap-2 border-b border-m3-outline-variant bg-m3-surface px-1 pr-4">
                  <button
                    type="button"
                    aria-label="Close dialog"
                    onClick={onClose}
                    className="m3-state m3-focus flex size-12 shrink-0 items-center justify-center rounded-full text-m3-on-surface outline-none"
                  >
                    <MaterialSymbol icon="close" size={24} />
                  </button>
                  {headline && (
                    <h2
                      id={headlineId}
                      className="md-title-large min-w-0 flex-1 truncate text-m3-on-surface"
                    >
                      {headline}
                    </h2>
                  )}
                </header>
              )}
              {isFullScreen ? (
                children && (
                  <div
                    id={bodyId}
                    className="m3-scroll md-body-medium min-h-0 flex-1 overflow-y-auto px-6 py-6 text-m3-on-surface-variant"
                  >
                    {children}
                  </div>
                )
              ) : (
                <>
                  {(icon || headline) && (
                    <div className="shrink-0 px-6 pt-6">
                      {icon && (
                        <span className="mb-4 flex justify-center">
                          <MaterialSymbol
                            icon={icon}
                            size={24}
                            className="text-m3-primary"
                          />
                        </span>
                      )}
                      {headline && (
                        <h2
                          id={headlineId}
                          className={cn(
                            "md-headline-small text-m3-on-surface",
                            icon && "text-center",
                          )}
                        >
                          {headline}
                        </h2>
                      )}
                    </div>
                  )}
                  {children && (
                    <div
                      id={bodyId}
                      className={cn(
                        "m3-scroll md-body-medium min-h-0 overflow-y-auto px-6 text-m3-on-surface-variant",
                        icon || headline ? "pt-4" : "pt-6",
                        !actions && "pb-6",
                      )}
                    >
                      {children}
                    </div>
                  )}
                  {actions && (
                    <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 px-6 pb-6 pt-6">
                      {actions}
                    </div>
                  )}
                </>
              )}
              {isFullScreen && actions && (
                <div className="flex h-14 shrink-0 flex-wrap items-center justify-end gap-2 border-t border-m3-outline-variant bg-m3-surface px-4">
                  {actions}
                </div>
              )}
            </BaseDialog.Popup>
          </BaseDialog.Portal>
        )}
      </AnimatePresence>
    </BaseDialog.Root>
    );
  },
);

Dialog.displayName = "Dialog";
