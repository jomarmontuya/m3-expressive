"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import type { M3Spring } from "@/lib/m3/tokens";
import { MaterialSymbol } from "./MaterialSymbol";

/** tokens.ts `satisfies` widens spring `type` to string; narrow for framer-motion. */
const asTransition = (s: M3Spring): Transition => s as Transition;

export interface SnackbarProps {
  /** Controls visibility (rendered through AnimatePresence). */
  open: boolean;
  message: string;
  /** Optional leading Material Symbol name. */
  icon?: string;
  /** Trailing text action, e.g. "Undo". */
  actionLabel?: string;
  onAction?: () => void;
  /** Called by auto-dismiss and the trailing close icon. */
  onClose?: () => void;
  /** Auto-dismiss in ms. 0 keeps the snackbar sticky. Default 4000. */
  duration?: number;
  className?: string;
}

/**
 * M3 Snackbar — brief confirmation feedback at the bottom of the screen on an
 * inverse surface (4dp corners, elevation 3, 344–672px per the official web
 * spec), with a text action and close control. The optional leading icon is a
 * documented extension beyond the base M3 anatomy (text + action + close).
 */
export function Snackbar({
  open,
  message,
  icon,
  actionLabel,
  onAction,
  onClose,
  duration = 4000,
  className,
}: SnackbarProps) {
  React.useEffect(() => {
    if (!open || !duration || duration <= 0) return;
    const t = window.setTimeout(() => onClose?.(), duration);
    return () => window.clearTimeout(t);
  }, [open, duration, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={asTransition(springs.expressive)}
          className={cn(
            "m3-elevation-3 md-body-medium fixed bottom-6 left-6 z-[70] flex min-h-12 min-w-[344px] max-w-[min(672px,calc(100vw-3rem))] items-center gap-3 rounded-[4px] bg-m3-inverse-surface px-4 py-3 text-m3-inverse-on-surface",
            className
          )}
        >
          {icon && <MaterialSymbol icon={icon} size={18} className="shrink-0" />}
          <p className="flex-1">{message}</p>
          {actionLabel && (
            <button
              type="button"
              onClick={onAction}
              className="m3-state md-label-large min-h-9 shrink-0 rounded-full px-3 uppercase text-m3-inverse-primary"
            >
              {actionLabel}
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="m3-state flex size-9 shrink-0 items-center justify-center rounded-full text-m3-inverse-on-surface"
            >
              <MaterialSymbol icon="close" size={18} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { snackbarMeta } from "@/lib/m3/meta";
