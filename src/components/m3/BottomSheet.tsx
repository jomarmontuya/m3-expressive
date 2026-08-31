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

export type BottomSheetVariant = "modal" | "standard";
export type BottomSheetState = "partial" | "expanded";

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  /** "modal" overlays a 32% scrim; "standard" renders inline without a scrim (open ignored) */
  variant?: BottomSheetVariant;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  /** Controlled height state. */
  sheetState?: BottomSheetState;
  /** Initial uncontrolled height state. Default "partial". */
  defaultState?: BottomSheetState;
  onStateChange?: (state: BottomSheetState) => void;
  /** Height used by the partial state. Default "50dvh". */
  partialHeight?: string;
  /** Max height override. Defaults to a 72dp compact top margin and 56dp above 640px. */
  maxHeight?: string;
  className?: string;
}

/**
 * M3 Bottom Sheet — a surface anchored to the bottom edge with a 32×4dp
 * drag handle (22dp from the top). Container is surface-container-low with
   * 28dp top corners at elevation 1, spanning full width up to 640dp. Expanded
   * sheets keep a 72dp top margin on compact windows and 56dp above 640px.
 * Modal sheets fade the official 32% black scrim, spring up with the
 * default spatial spring, support drag-to-dismiss (pull > 120px or fast
 * downward fling), close on Escape, lock body scroll, trap Tab focus and
 * restore focus to the trigger on close. The drag handle is a real button:
 * click, Enter or Space cycles between partial and expanded heights. Standard
 * sheets render inline without a scrim.
 *
 * The modal variant is built on Base UI's headless Dialog: Root owns the
 * focus trap, scroll lock, Escape dismissal, focus restore and aria-modal;
 * Backdrop is the scrim; Popup is the sheet — kept mounted while the
 * framer-motion slide/drag exit plays via `preventUnmountOnClose` +
 * `actionsRef.unmount`. Drag-to-dismiss stays a framer-motion gesture on
 * the sheet (a Base UI primitive for swipeable sheets does not exist in
 * v1.0.0-rc.0).
 */
/** Material 3 bottom sheet for supplementary content. @see https://m3.material.io/components/bottom-sheets/overview */
export const BottomSheet = React.forwardRef<HTMLDivElement, BottomSheetProps>(function BottomSheet(
  {
    open,
    onClose,
    variant = "modal",
    title,
    children,
    footer,
    sheetState,
    defaultState = "partial",
    onStateChange,
    partialHeight = "50dvh",
    maxHeight,
    className,
  },
  ref
) {
  const reduceMotion = useReducedMotion() ?? false;
  const isModal = variant === "modal";
  const actionsRef = React.useRef<DialogRootActions>({ unmount() {}, close() {} });
  const [internalState, setInternalState] =
    React.useState<BottomSheetState>(defaultState);
  const currentState = sheetState ?? internalState;
  const expandedHeight = maxHeight ?? "var(--bottom-sheet-expanded-height)";
  const responsiveHeight =
    "[--bottom-sheet-expanded-height:calc(100dvh-72px)] min-[641px]:[--bottom-sheet-expanded-height:calc(100dvh-56px)]";

  const setSheetState = React.useCallback(
    (nextState: BottomSheetState) => {
      if (sheetState === undefined) setInternalState(nextState);
      onStateChange?.(nextState);
    },
    [onStateChange, sheetState],
  );

  const cycleHeight = React.useCallback(() => {
    setSheetState(currentState === "partial" ? "expanded" : "partial");
  }, [currentState, setSheetState]);

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean, eventDetails: DialogRootChangeEventDetails) => {
      if (!nextOpen) eventDetails.preventUnmountOnClose();
      onClose();
    },
    [onClose]
  );

  const handle = (
    <button
      type="button"
      aria-label={
        currentState === "partial" ? "Expand bottom sheet" : "Partially expand bottom sheet"
      }
      aria-expanded={currentState === "expanded"}
      onClick={cycleHeight}
      className="m3-focus mx-auto flex h-12 w-12 shrink-0 cursor-grab items-center justify-center rounded-full outline-none"
    >
      <span
        aria-hidden="true"
        className="h-1 w-8 rounded-full bg-m3-on-surface-variant"
      />
    </button>
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
          responsiveHeight,
          className
        )}
        style={{
          height: currentState === "partial" ? partialHeight : expandedHeight,
          maxHeight: expandedHeight,
        }}
      >
        {handle}
        {titleEl}
        {contentEl}
        {footerEl}
      </div>
    );
  }

  const scrimMotion: HTMLMotionProps<"div"> = {
    initial: reduceMotion ? false : { opacity: 0 },
    animate: { opacity: 1 },
    exit: reduceMotion ? { opacity: 1 } : { opacity: 0 },
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: durations.short4 / 1000, ease: "easeOut" },
  };
  const sheetMotion: HTMLMotionProps<"div"> = {
    initial: reduceMotion ? false : { y: "100%" },
    animate: { y: 0 },
    exit: reduceMotion ? { y: 0 } : { y: "100%" },
    transition: reduceMotion ? { duration: 0 } : springs.defaultSpatial,
    drag: reduceMotion ? false : "y",
    dragConstraints: { top: -160, bottom: 0 },
    dragElastic: { top: 0, bottom: 0.6 },
    onDragEnd: (_, info) => {
      if (info.offset.y < -60 || info.velocity.y < -500) {
        setSheetState("expanded");
      } else if (info.offset.y > 120 || info.velocity.y > 500) {
        if (currentState === "expanded") setSheetState("partial");
        else onClose();
      }
    },
  };

  return (
    <BaseDialog.Root open={open} onOpenChange={handleOpenChange} actionsRef={actionsRef} modal>
      <AnimatePresence onExitComplete={() => actionsRef.current?.unmount()}>
        {open && (
          <BaseDialog.Portal>
            <BaseDialog.Backdrop render={<motion.div {...scrimMotion} />} className="fixed inset-0 z-[85] bg-m3-scrim/32" />
            <BaseDialog.Popup
              aria-label={title ?? "Bottom sheet"}
              ref={ref}
              render={
                <motion.div {...sheetMotion} />
              }
              className={cn(
                // Official: full width up to 640dp; 56dp side margins when detached (>640dp windows)
                "fixed inset-x-0 bottom-0 z-[85] mx-auto flex w-full max-w-[640px] flex-col rounded-t-[28px] m3-elevation-1 bg-m3-surface-container-low px-6 pb-6 outline-none sm:left-14 sm:right-14 sm:w-auto",
                responsiveHeight,
                className
              )}
              style={{
                height:
                  currentState === "partial" ? partialHeight : expandedHeight,
                maxHeight: expandedHeight,
              }}
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
