"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, type M3Spring } from "@/lib/m3/tokens";

/** tokens.ts widens `type` to `string`; framer-motion needs the "spring" literal. */
const spring = (s: M3Spring): Transition => ({ ...s, type: "spring" });

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  /** Max height of the sheet (default "85vh") */
  maxHeight?: string;
  className?: string;
}

/**
 * M3 Bottom Sheet — a modal surface anchored to the bottom edge with a
 * drag handle. Fades the scrim, springs up with the default spatial
 * spring, supports drag-to-dismiss (pull down > 120px), Escape to close
 * and locks body scroll while open.
 */
export const BottomSheet = React.forwardRef<HTMLDivElement, BottomSheetProps>(function BottomSheet(
  { open, onClose, title, children, footer, maxHeight = "85vh", className },
  ref
) {
  React.useEffect(() => {
    if (!open) return;
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
  }, [open, onClose]);

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
              "absolute inset-x-0 bottom-0 flex flex-col rounded-t-[28px] bg-m3-surface-container-low p-4 pb-8",
              className
            )}
            style={{ maxHeight }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={spring(springs.defaultSpatial)}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120) onClose();
            }}
          >
            <div className="mx-auto mb-3 h-1 w-8 shrink-0 cursor-grab rounded-full bg-m3-on-surface-variant" />
            {title && (
              <h2 className="md-title-large mb-2 shrink-0 px-1 text-m3-on-surface">{title}</h2>
            )}
            <div className="m3-scroll min-h-0 flex-1 overflow-y-auto">{children}</div>
            {footer && (
              <div className="mt-2 shrink-0 border-t border-m3-outline-variant pt-2">{footer}</div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

export { bottomSheetMeta } from "@/lib/m3/meta";
