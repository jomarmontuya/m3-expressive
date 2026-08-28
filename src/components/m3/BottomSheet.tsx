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

export type BottomSheetVariant = "modal" | "standard";

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  /** "modal" overlays a 32% scrim; "standard" renders inline without a scrim (open ignored) */
  variant?: BottomSheetVariant;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  /** Max height of the sheet (default "calc(100dvh - 72px)" — official 72dp top margin) */
  maxHeight?: string;
  className?: string;
}

/**
 * M3 Bottom Sheet — a surface anchored to the bottom edge with a 32×4dp
 * drag handle (22dp from the top). Container is surface-container-low with
 * 28dp top corners at elevation 1, spanning full width up to 640dp.
 * Modal sheets fade the official 32% black scrim, spring up with the
 * default spatial spring, support drag-to-dismiss (pull > 120px or fast
 * downward fling), close on Escape, lock body scroll, trap Tab focus and
 * restore focus to the trigger on close. Standard sheets render inline
 * without a scrim.
 *
 * The modal variant is built on Base UI's headless Dialog: Root owns the
 * focus trap, scroll lock, Escape dismissal, focus restore and aria-modal;
 * Backdrop is the scrim; Popup is the sheet — kept mounted while the
 * framer-motion slide/drag exit plays via `preventUnmountOnClose` +
 * `actionsRef.unmount`. Drag-to-dismiss stays a framer-motion gesture on
 * the sheet (a Base UI primitive for swipeable sheets does not exist in
 * v1.0.0-rc.0).
 */
export const BottomSheet = React.forwardRef<HTMLDivElement, BottomSheetProps>(function BottomSheet(
  { open, onClose, variant = "modal", title, children, footer, maxHeight, className },
  ref
) {
  const isModal = variant === "modal";
  const actionsRef = React.useRef<DialogRootActions>({ unmount() {}, close() {} });

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean, eventDetails: DialogRootChangeEventDetails) => {
      if (!nextOpen) eventDetails.preventUnmountOnClose();
      onClose();
    },
    [onClose]
  );

  const handle = (
    <div
      aria-hidden="true"
      className="mx-auto mt-[22px] mb-[22px] h-1 w-8 shrink-0 cursor-grab rounded-full bg-m3-on-surface-variant"
    />
  );
  const titleEl = title ? (
    <h2 className="md-title-large mb-2 shrink-0 px-1 text-m3-on-surface">{title}</h2>
  ) : null;
  const contentEl = <div className="m3-scroll min-h-0 flex-1 overflow-y-auto">{children}</div>;
  const footerEl = footer ? (
    <div className="mt-2 shrink-0 border-t border-m3-outline-variant pt-2">{footer}</div>
  ) : null;

  if (!isModal) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full flex-col overflow-hidden rounded-t-[28px] border border-m3-outline-variant bg-m3-surface-container-low px-6 pb-6",
          className
        )}
        style={{ maxHeight: maxHeight ?? "calc(100dvh - 72px)" }}
      >
        {handle}
        {titleEl}
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
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
    transition: springs.defaultSpatial,
    drag: "y",
    dragConstraints: { top: 0 },
    dragElastic: { top: 0, bottom: 0.6 },
    onDragEnd: (_, info) => {
      // Dismiss on a slow deep pull or a fast downward fling
      if (info.offset.y > 120 || info.velocity.y > 500) onClose();
    },
  };

  return (
    <BaseDialog.Root open={open} onOpenChange={handleOpenChange} actionsRef={actionsRef} modal>
      <AnimatePresence onExitComplete={() => actionsRef.current?.unmount()}>
        {open && (
          <BaseDialog.Portal>
            <BaseDialog.Backdrop render={<motion.div {...scrimMotion} />} className="fixed inset-0 z-[85] bg-m3-scrim/32" />
            <BaseDialog.Popup
              aria-label={title}
              ref={ref}
              render={
                <motion.div {...sheetMotion} />
              }
              className={cn(
                // Official: full width up to 640dp; 56dp side margins when detached (>640dp windows)
                "fixed inset-x-0 bottom-0 z-[85] mx-auto flex w-full max-w-[640px] flex-col rounded-t-[28px] m3-elevation-1 bg-m3-surface-container-low px-6 pb-6 outline-none sm:left-14 sm:right-14 sm:w-auto",
                className
              )}
              style={{ maxHeight: maxHeight ?? "calc(100dvh - 72px)" }}
            >
              {handle}
              {titleEl}
              {contentEl}
              {footerEl}
            </BaseDialog.Popup>
          </BaseDialog.Portal>
        )}
      </AnimatePresence>
    </BaseDialog.Root>
  );
});

export { bottomSheetMeta } from "@/lib/m3/meta";
