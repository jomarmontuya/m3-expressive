"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PanInfo, Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import type { M3Spring } from "@/lib/m3/tokens";
import { MaterialSymbol } from "./MaterialSymbol";

/** tokens.ts `satisfies` widens spring `type` to string; narrow for framer-motion. */
const asTransition = (s: M3Spring): Transition => s as Transition;

/**
 * M3 spec: snackbars are swipe-dismissable in any direction. The exit target is
 * a dynamic variant fed by AnimatePresence `custom` — the documented way to
 * hand an already-unmounting child a fresh prop (the drag direction recorded
 * at release time). Non-drag dismissals (close button / auto / Esc) fall back
 * to the default slide-down.
 */
interface ExitDirection {
  x: number;
  y: number;
}
const DEFAULT_EXIT: ExitDirection = { x: 0, y: 60 };

function exitDirectionFor(
  offset: { x: number; y: number },
  velocity: { x: number; y: number }
): ExitDirection {
  const src =
    Math.abs(offset.x) > 80 || Math.abs(offset.y) > 80 ? offset : velocity;
  if (Math.abs(src.x) >= Math.abs(src.y)) {
    return { x: src.x >= 0 ? 160 : -160, y: 0 };
  }
  return { x: 0, y: src.y >= 0 ? 60 : -60 };
}

const exitVariants = {
  exit: (dir: ExitDirection) => ({
    x: dir.x,
    y: dir.y,
    opacity: 0,
    transition: asTransition(springs.expressive),
  }),
};

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
 * spec), with a text action and close control. Per M3 it is swipe-dismissable
 * in any direction (80px drag or 500px/s flick). The optional leading icon is a
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

  /** Reset so non-drag dismissals (close button / auto / Esc) slide back down. */
  const [exitDir, setExitDir] = React.useState<ExitDirection>(DEFAULT_EXIT);
  React.useEffect(() => {
    if (open) setExitDir(DEFAULT_EXIT);
  }, [open]);

  /** Swipe-to-dismiss: same onClose path as the close button, but exits along the drag. */
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { offset, velocity } = info;
    const far = Math.abs(offset.x) > 80 || Math.abs(offset.y) > 80;
    const flick = Math.abs(velocity.x) > 500 || Math.abs(velocity.y) > 500;
    if (!far && !flick) return;
    setExitDir(exitDirectionFor(offset, velocity));
    onClose?.();
  };

  return (
    <AnimatePresence custom={exitDir}>
      {open && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit="exit"
          variants={exitVariants}
          drag
          dragElastic={0.25}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onDragEnd={handleDragEnd}
          transition={asTransition(springs.expressive)}
          /* Fixed, short-lived overlay: free both axes for the drag gesture. */
          style={{ touchAction: "none" }}
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
