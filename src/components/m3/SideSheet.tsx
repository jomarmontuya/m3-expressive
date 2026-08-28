"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, details, [tabindex]:not([tabindex="-1"])';

/**
 * M3 Side Sheet — a secondary surface anchored to the left or right edge
 * with the official 16dp radius on the inner (docked) edge only — the
 * corners touching the screen edge stay square. Modal sheets slide in over
 * a 32% scrim at elevation 1 with the default spatial spring, close on
 * Escape, lock body scroll, trap Tab focus and restore focus to the
 * trigger on close; standard sheets render inline as a persistent
 * surface-toned panel with no scrim. Content padding is 24dp with 12dp
 * between top elements.
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
              "absolute top-0 flex h-full max-w-[400px] flex-col bg-m3-surface-container-low p-6 outline-none m3-elevation-1",
              isRight ? "right-0 rounded-l-[16px]" : "left-0 rounded-r-[16px]",
              className
            )}
            style={{ width: Math.min(width, 400) }}
            initial={isRight ? { x: "100%" } : { x: "-100%" }}
            animate={{ x: 0 }}
            exit={isRight ? { x: "100%" } : { x: "-100%" }}
            transition={springs.defaultSpatial}
          >
            {header}
            {contentEl}
            {footerEl}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

export { sideSheetMeta } from "@/lib/m3/meta";
