"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, durations } from "@/lib/m3/tokens";
import type { M3Spring } from "@/lib/m3/tokens";
import { MaterialSymbol } from "./MaterialSymbol";

/** tokens.ts `satisfies` widens spring `type` to string; narrow for framer-motion. */
const asTransition = (s: M3Spring): Transition => s as Transition;

export interface DialogProps {
  open: boolean;
  /** Scrim click + Escape + close handling; ignored when dismissible is false. */
  onClose?: () => void;
  /** Leading Material Symbol name above the headline. */
  icon?: string;
  headline?: string;
  /** Dialog body content. */
  children?: React.ReactNode;
  /** Row of action buttons, right-aligned. */
  actions?: React.ReactNode;
  /** Edge-to-edge full screen variant. */
  fullscreen?: boolean;
  /** Allow Escape and scrim-tap dismissal. Default true. */
  dismissible?: boolean;
  className?: string;
}

/**
 * M3 Dialog — a modal window that blocks the page underneath with a scrim.
 * Basic dialogs center on screen (max 560px); fullscreen dialogs cover the
 * viewport edge-to-edge.
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
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && dismissible) onClose?.();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, dismissible, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className={cn(
            "fixed inset-0 z-[80] flex items-center justify-center p-4",
            fullscreen && "p-0"
          )}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.short4 / 1000, ease: "easeOut" }}
            className="absolute inset-0 bg-m3-scrim/50"
            onClick={() => {
              if (dismissible) onClose?.();
            }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={headline}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={asTransition(springs.expressive)}
            className={cn(
              "m3-elevation-3 relative w-full bg-m3-surface-container-highest p-6",
              fullscreen ? "h-full max-w-none rounded-none" : "max-w-[560px] rounded-3xl",
              className
            )}
          >
            {icon && (
              <MaterialSymbol icon={icon} size={24} className="mb-4 block text-m3-primary" />
            )}
            {headline && (
              <h2 className="md-headline-small mb-4 text-m3-on-surface">{headline}</h2>
            )}
            {children && (
              <div className="md-body-medium text-m3-on-surface-variant">{children}</div>
            )}
            {actions && (
              <div className="flex flex-wrap items-center justify-end gap-2 pt-6">{actions}</div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export { dialogMeta } from "@/lib/m3/meta";
