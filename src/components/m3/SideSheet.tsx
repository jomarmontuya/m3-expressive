"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, type M3Spring } from "@/lib/m3/tokens";

/** tokens.ts widens `type` to `string`; framer-motion needs the "spring" literal. */
const spring = (s: M3Spring): Transition => ({ ...s, type: "spring" });

export type SideSheetSide = "left" | "right";
export type SideSheetVariant = "modal" | "standard";

export interface SideSheetProps {
  open: boolean;
  onClose: () => void;
  /** Edge the sheet is anchored to (default "right") */
  side?: SideSheetSide;
  /** "modal" overlays with a scrim; "standard" renders inline (open ignored) */
  variant?: SideSheetVariant;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  /** Panel width in px (default 320) */
  width?: number;
  className?: string;
}

/**
 * M3 Side Sheet — a secondary surface anchored to the left or right edge.
 * Modal sheets slide in over a scrim with the default spatial spring,
 * close on Escape and lock body scroll; standard sheets render inline
 * as a persistent, bordered panel.
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
    width = 320,
    className,
  },
  ref
) {
  const isModal = variant === "modal";
  const isRight = side === "right";

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

  const header = title ? (
    <>
      <h2 className="md-title-large shrink-0 px-1 pb-2 text-m3-on-surface">{title}</h2>
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
          "inline-flex h-[320px] flex-col overflow-hidden rounded-3xl border border-m3-outline-variant bg-m3-surface-container-low p-4",
          className
        )}
        style={{ width }}
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
            className="absolute inset-0 bg-m3-scrim/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={spring(springs.fastDefault)}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={cn(
              "absolute top-0 flex h-full flex-col bg-m3-surface-container-low p-4",
              isRight ? "right-0 rounded-l-3xl" : "left-0 rounded-r-3xl",
              className
            )}
            style={{ width }}
            initial={isRight ? { x: "100%" } : { x: "-100%" }}
            animate={{ x: 0 }}
            exit={isRight ? { x: "100%" } : { x: "-100%" }}
            transition={spring(springs.defaultSpatial)}
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
