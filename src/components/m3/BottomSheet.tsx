"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, details, [tabindex]:not([tabindex="-1"])';

/**
 * M3 Bottom Sheet — a surface anchored to the bottom edge with a 32×4dp
 * drag handle (22dp from the top). Container is surface-container-low with
 * 28dp top corners at elevation 1, spanning full width up to 640dp.
 * Modal sheets fade the official 32% black scrim, spring up with the
 * default spatial spring, support drag-to-dismiss (pull > 120px or fast
 * downward fling), close on Escape, lock body scroll, trap Tab focus and
 * restore focus to the trigger on close. Standard sheets render inline
 * without a scrim.
 */
export const BottomSheet = React.forwardRef<HTMLDivElement, BottomSheetProps>(function BottomSheet(
  { open, onClose, variant = "modal", title, children, footer, maxHeight, className },
  ref
) {
  const isModal = variant === "modal";
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!isModal || !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isModal, open, onClose]);

  // Move focus into the sheet on open; return it to the trigger on close.
  React.useEffect(() => {
    if (!isModal || !open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => panelRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(timer);
      restoreFocusRef.current?.focus?.();
    };
  }, [isModal, open]);

  // Trap Tab focus inside the modal sheet surface.
  const handleTab = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
    ).filter((el) => !el.hasAttribute("disabled"));
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === panelRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

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

  return (
    <AnimatePresence>
      {open && (
        <div ref={ref} className="fixed inset-0 z-[85]">
          <motion.div
            className="absolute inset-0 bg-m3-scrim/32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.short4 / 1000, ease: "easeOut" }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            onKeyDown={handleTab}
            className={cn(
              // Official: full width up to 640dp; 56dp side margins when detached (>640dp windows)
              "absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-[640px] flex-col rounded-t-[28px] m3-elevation-1 bg-m3-surface-container-low px-6 pb-6 outline-none sm:left-14 sm:right-14 sm:w-auto",
              className
            )}
            style={{ maxHeight: maxHeight ?? "calc(100dvh - 72px)" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={springs.defaultSpatial}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              // Dismiss on a slow deep pull or a fast downward fling
              if (info.offset.y > 120 || info.velocity.y > 500) onClose();
            }}
          >
            {handle}
            {titleEl}
            {contentEl}
            {footerEl}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

export { bottomSheetMeta } from "@/lib/m3/meta";
