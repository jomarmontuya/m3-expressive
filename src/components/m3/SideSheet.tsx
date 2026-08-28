"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import {
  Dialog as BaseDialog,
  type DialogRootActions,
  type DialogRootChangeEventDetails,
} from "@base-ui-components/react/dialog";
import { cn } from "@/lib/utils";
import { springs, durations } from "@/lib/m3/tokens";

export type SideSheetSide = "left" | "right";
export type SideSheetVariant = "modal" | "standard";

export interface SideSheetProps {
  open: boolean;
  onClose: () => void;
  /** Edge the sheet is anchored to (default "right") */
  side?: SideSheetSide;
  /** "modal" overlays a 32% scrim; "standard" renders inline on surface (open ignored) */
  variant?: SideSheetVariant;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  /** Panel width in px (default 360; official max-width 400dp) */
  width?: number;
  className?: string;
}

/**
 * M3 Side Sheet — a secondary surface anchored to the left or right edge
 * with the official 16dp radius on the inner (docked) edge only — the
 * corners touching the screen edge stay square. Modal sheets slide in over
 * a 32% scrim at elevation 1 with the default spatial spring, close on
 * Escape, lock body scroll, trap Tab focus and restore focus to the
 * trigger on close; standard sheets render inline as a persistent
 * surface-toned panel with no scrim. Content padding is 24dp with 12dp
 * between top elements.
 *
 * The modal variant is built on Base UI's headless Dialog: Root owns the
 * focus trap, scroll lock, Escape dismissal, focus restore and aria-modal;
 * Backdrop is the scrim; Popup is the sheet — kept mounted while the
 * framer-motion slide exit plays via `preventUnmountOnClose` +
 * `actionsRef.unmount`. (No Base UI primitive for docked side surfaces
 * exists in v1.0.0-rc.0; the standard variant stays a custom panel.)
 */
export const SideSheet = React.forwardRef<HTMLDivElement, SideSheetProps>(function SideSheet(
  {
    open,
    onClose,
    side = "right",
    variant = "modal",
    title,
    children,
    footer,
    width = 360,
    className,
  },
  ref
) {
  const isModal = variant === "modal";
  const isRight = side === "right";
  const actionsRef = React.useRef<DialogRootActions>({ unmount() {}, close() {} });

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean, eventDetails: DialogRootChangeEventDetails) => {
      if (!nextOpen) eventDetails.preventUnmountOnClose();
      onClose();
    },
    [onClose]
  );

  // Official: 24dp start/end padding, 12dp between top elements
  const header = title ? (
    <>
      <h2 className="md-title-large shrink-0 px-1 pb-3 text-m3-on-surface">{title}</h2>
      <div className="mb-3 shrink-0 border-b border-m3-outline-variant" />
    </>
  ) : null;

  const footerEl = footer ? (
    <div className="mt-2 shrink-0 border-t border-m3-outline-variant pt-2">{footer}</div>
  ) : null;

  const contentEl = <div className="m3-scroll min-h-0 flex-1 overflow-y-auto">{children}</div>;

  if (!isModal) {
    return (
      <div
        ref={ref}
        role="complementary"
        className={cn(
          // Standard side sheet is surface-toned; 16dp radius on the inner edge only
          "inline-flex h-[320px] flex-col overflow-hidden border border-m3-outline-variant bg-m3-surface p-6",
          isRight ? "rounded-l-[16px]" : "rounded-r-[16px]",
          className
        )}
        style={{ width: Math.min(width, 400) }}
      >
        {header}
        {contentEl}
        {footerEl}
      </div>
    );
  }

  const scrimMotion: HTMLMotionProps<"div"> = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: durations.short4 / 1000, ease: "easeOut" },
  };
  const sheetMotion: HTMLMotionProps<"div"> = {
    initial: isRight ? { x: "100%" } : { x: "-100%" },
    animate: { x: 0 },
    exit: isRight ? { x: "100%" } : { x: "-100%" },
    transition: springs.defaultSpatial,
  };

  return (
    <BaseDialog.Root open={open} onOpenChange={handleOpenChange} actionsRef={actionsRef} modal>
      <AnimatePresence onExitComplete={() => actionsRef.current?.unmount()}>
        {open && (
          <BaseDialog.Portal>
            <BaseDialog.Backdrop render={<motion.div {...scrimMotion} />} className="fixed inset-0 z-[85] bg-m3-scrim/32" />
            <BaseDialog.Popup
              aria-label={title ?? "Side sheet"}
              ref={ref}
              render={<motion.div {...sheetMotion} />}
              className={cn(
                "fixed top-0 z-[85] flex h-full max-w-[400px] flex-col bg-m3-surface-container-low p-6 outline-none m3-elevation-1",
                isRight ? "right-0 rounded-l-[16px]" : "left-0 rounded-r-[16px]",
                className
              )}
              style={{ width: Math.min(width, 400) }}
            >
              {header}
              {contentEl}
              {footerEl}
            </BaseDialog.Popup>
          </BaseDialog.Portal>
        )}
      </AnimatePresence>
    </BaseDialog.Root>
  );
});

export { sideSheetMeta } from "@/lib/m3/meta";
