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
import { useTextDirection } from "@/lib/m3/use-text-direction";
import { MaterialSymbol } from "./MaterialSymbol";

export type SideSheetSide = "start" | "end" | "left" | "right";
export type SideSheetVariant = "modal" | "standard";

export interface SideSheetProps {
  open: boolean;
  onClose: () => void;
  /** Logical inline edge. "left" and "right" remain aliases for start/end. */
  side?: SideSheetSide;
  /** "modal" overlays a 32% scrim; "standard" renders inline on surface. */
  variant?: SideSheetVariant;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  /** Panel width in px (default 360; official max-width 400dp) */
  width?: number;
  className?: string;
}

/**
 * M3 Side Sheet — a secondary surface anchored to a logical inline edge
 * with the official 16dp radius on the inner (docked) edge only — the
 * corners touching the screen edge stay square. Modal sheets slide in over
 * a 32% scrim at elevation 1 with the default spatial spring, close on
 * Escape, lock body scroll, trap Tab focus and restore focus to the
 * trigger on close; standard sheets render inline as a surface-toned panel
 * with no scrim and unmount when `open` is false. Content padding is 24dp
 * with 12dp between top elements. The optional footer is a start-aligned
 * 72dp-minimum action area with 16dp top and 24dp bottom padding.
 *
 * The modal variant is built on Base UI's headless Dialog: Root owns the
 * focus trap, scroll lock, Escape dismissal, focus restore and aria-modal;
 * Backdrop is the scrim; Popup is the sheet — kept mounted while the
 * framer-motion slide exit plays via `preventUnmountOnClose` +
 * `actionsRef.unmount`. (No Base UI primitive for docked side surfaces
 * exists in v1.0.0-rc.0; the standard variant stays a custom panel.)
 */
export const SideSheet = React.forwardRef<HTMLDivElement, SideSheetProps>(
  function SideSheet(
    {
      open,
      onClose,
      side = "end",
      variant = "modal",
      title,
      children,
      footer,
      width = 360,
      className,
    },
    ref,
  ) {
    const reduceMotion = useReducedMotion() ?? false;
    const directionAnchorRef = React.useRef<HTMLSpanElement>(null);
    const direction = useTextDirection(directionAnchorRef);
    const isModal = variant === "modal";
    const isEnd = side === "end" || side === "right";
    const titleId = React.useId();
    const actionsRef = React.useRef<DialogRootActions>({
      unmount() {},
      close() {},
    });

    const handleOpenChange = React.useCallback(
      (nextOpen: boolean, eventDetails: DialogRootChangeEventDetails) => {
        if (!nextOpen) eventDetails.preventUnmountOnClose();
        onClose();
      },
      [onClose],
    );

    // Official: 24dp start/end padding, 12dp between top elements
    const header = (
      <>
        <div className="flex min-h-12 shrink-0 items-center gap-3 pb-3">
          {title && (
            <h2
              id={titleId}
              className="md-title-large min-w-0 flex-1 text-m3-on-surface"
            >
              {title}
            </h2>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close side sheet"
            className="m3-state m3-focus ms-auto flex size-12 shrink-0 items-center justify-center rounded-full text-m3-on-surface-variant outline-none"
          >
            <MaterialSymbol icon="close" size={24} />
          </button>
        </div>
        <div className="mb-3 shrink-0 border-b border-m3-outline-variant" />
      </>
    );

    const footerEl = footer ? (
      <div className="mt-6 flex min-h-[72px] shrink-0 flex-wrap items-start justify-start gap-2 border-t border-m3-outline-variant pb-6 pt-4">
        {footer}
      </div>
    ) : null;

    const contentEl = (
      <div className="m3-scroll min-h-0 flex-1 overflow-y-auto">{children}</div>
    );

    if (!isModal && !open) return null;

    if (!isModal) {
      return (
        <span ref={directionAnchorRef} className="contents">
          <div
            ref={ref}
            role="dialog"
            aria-modal="false"
            aria-labelledby={title ? titleId : undefined}
            aria-label={title ? undefined : "Side sheet"}
            dir={direction}
            className={cn(
              // Standard side sheet is surface-toned; 16dp radius on the inner edge only
              "inline-flex h-full min-h-0 flex-col overflow-hidden border border-m3-outline-variant bg-m3-surface px-6 pt-6",
              !footer && "pb-6",
              isEnd ? "rounded-s-[16px]" : "rounded-e-[16px]",
              className,
            )}
            style={{ width: Math.min(width, 400), maxWidth: "100%" }}
          >
            {header}
            {contentEl}
            {footerEl}
          </div>
        </span>
      );
    }

    const opensFromRight = isEnd !== (direction === "rtl");
    const scrimMotion: HTMLMotionProps<"div"> = {
      initial: reduceMotion ? false : { opacity: 0 },
      animate: { opacity: 1 },
      exit: reduceMotion ? { opacity: 1 } : { opacity: 0 },
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: durations.short4 / 1000, ease: "easeOut" },
    };
    const sheetMotion: HTMLMotionProps<"div"> = {
      initial: reduceMotion
        ? false
        : opensFromRight
          ? { x: "100%" }
          : { x: "-100%" },
      animate: { x: 0 },
      exit: reduceMotion
        ? { x: 0 }
        : opensFromRight
          ? { x: "100%" }
          : { x: "-100%" },
      transition: reduceMotion ? { duration: 0 } : springs.defaultSpatial,
    };

    return (
      <span ref={directionAnchorRef} className="contents">
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
                className="fixed inset-0 z-[85] bg-m3-scrim/32"
              />
              <BaseDialog.Popup
                role="dialog"
                aria-labelledby={title ? titleId : undefined}
                aria-label={title ? undefined : "Side sheet"}
                dir={direction}
                ref={ref}
                render={<motion.div {...sheetMotion} />}
                className={cn(
                  "fixed inset-y-0 z-[85] flex h-full max-w-full flex-col bg-m3-surface-container-low px-6 pt-6 outline-none m3-elevation-1",
                  !footer && "pb-6",
                  isEnd
                    ? "end-0 rounded-s-[16px]"
                    : "start-0 rounded-e-[16px]",
                  className,
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
      </span>
    );
  },
);

export { sideSheetMeta } from "@/lib/m3/meta";
