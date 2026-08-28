"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, durations } from "@/lib/m3/tokens";
import { MaterialSymbol } from "./MaterialSymbol";

export interface DialogProps {
  open: boolean;
  /** Scrim click + Escape + close handling; ignored when dismissible is false. */
  onClose?: () => void;
  /** Leading Material Symbol centered above the headline. */
  icon?: string;
  headline?: string;
  /** Dialog body content. */
  children?: React.ReactNode;
  /** Row of action buttons, right-aligned with the official 8dp gap. */
  actions?: React.ReactNode;
  /** Edge-to-edge full screen variant. */
  fullscreen?: boolean;
  /** Allow Escape and scrim-tap dismissal. Default true. */
  dismissible?: boolean;
  className?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, details, [tabindex]:not([tabindex="-1"])';

/**
 * M3 Dialog — a modal window that blocks the page underneath with a 32%
 * scrim. Basic dialogs center on screen on surface-container-high with
 * 28dp corners, elevation 3 and the official 280–560dp width range;
 * fullscreen dialogs cover the viewport edge-to-edge. The headline and
 * body are wired via aria-labelledby / aria-describedby, focus is trapped
 * inside while open, Escape/scrim dismiss when dismissible, and focus
 * returns to the triggering element on close.
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
  const headlineId = React.useId();
  const bodyId = React.useId();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const restoreFocusRef = React.useRef<HTMLElement | null>(null);

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

  // Move focus into the dialog on open; return it to the trigger on close.
  React.useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => panelRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(timer);
      restoreFocusRef.current?.focus?.();
    };
  }, [open]);

  // Trap Tab focus inside the dialog surface.
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

  return (
    <AnimatePresence>
      {open && (
        <div
          className={cn(
            "fixed inset-0 z-[80] flex items-center justify-center p-6",
            fullscreen && "p-0"
          )}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Named framer easing (tokens.ts easings.* are CSS strings, not
            // framer Easing tuples); "easeOut" ≙ easings.standardDecelerate
            transition={{
              duration: durations.short4 / 1000,
              ease: "easeOut",
            }}
            className="absolute inset-0 bg-m3-scrim/32"
            onClick={() => {
              if (dismissible) onClose?.();
            }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={headline ? headlineId : undefined}
            aria-describedby={children ? bodyId : undefined}
            tabIndex={-1}
            onKeyDown={handleTab}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={springs.expressive}
            className={cn(
              "m3-elevation-3 relative w-full bg-m3-surface-container-high p-6 outline-none",
              fullscreen
                ? "h-full max-w-none rounded-none"
                : "min-w-[280px] max-w-[560px] rounded-[28px]",
              className
            )}
          >
            {icon && (
              // Official: 24dp primary icon, center-aligned, 16dp above the headline
              <span className="mb-4 flex justify-center">
                <MaterialSymbol icon={icon} size={24} className="text-m3-primary" />
              </span>
            )}
            {headline && (
              // Official: headline center-aligns when an icon is present, start-aligns otherwise
              <h2
                id={headlineId}
                className={cn("md-headline-small mb-4 text-m3-on-surface", icon && "text-center")}
              >
                {headline}
              </h2>
            )}
            {children && (
              <div id={bodyId} className="md-body-medium text-m3-on-surface-variant">
                {children}
              </div>
            )}
            {actions && (
              // Official action area: 8dp between text buttons, 24dp above / 24dp sides+below
              <div className="flex flex-wrap items-center justify-end gap-2 pt-6">{actions}</div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export { dialogMeta } from "@/lib/m3/meta";
