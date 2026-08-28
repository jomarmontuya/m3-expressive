"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, durations } from "@/lib/m3/tokens";
import type { M3Spring } from "@/lib/m3/tokens";

/** tokens.ts `satisfies` widens spring `type` to string; narrow for framer-motion. */
const asTransition = (s: M3Spring): Transition => s as Transition;

export interface TooltipProps {
  /** Plain text or rich body content. */
  content: React.ReactNode;
  /** Rich (plain tooltip + title + action) variant. */
  rich?: boolean;
  /** Rich only — bold title above the content. */
  title?: string;
  /** Rich only — optional action below the content. */
  actionLabel?: string;
  onAction?: () => void;
  placement?: "top" | "bottom";
  /** Trigger element. */
  children: React.ReactNode;
  className?: string;
}

const SHOW_DELAY = durations.medium4; // 400ms, per M3 tooltip spec

/**
 * M3 Tooltip — a text label that appears on hover/keyboard focus after a short
 * delay. Plain tooltips are compact inverse-surface pills; rich tooltips add a
 * title and an optional action on a high-emphasis surface.
 */
export function Tooltip({
  content,
  rich = false,
  title,
  actionLabel,
  onAction,
  placement = "top",
  children,
  className,
}: TooltipProps) {
  const [visible, setVisible] = React.useState(false);
  const timer = React.useRef<number | null>(null);

  const cancel = React.useCallback(() => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const scheduleShow = React.useCallback(() => {
    cancel();
    timer.current = window.setTimeout(() => setVisible(true), SHOW_DELAY);
  }, [cancel]);

  const hide = React.useCallback(() => {
    cancel();
    setVisible(false);
  }, [cancel]);

  React.useEffect(() => cancel, [cancel]);

  return (
    <span
      className={cn("relative inline-flex", className)}
      onPointerEnter={scheduleShow}
      onPointerLeave={hide}
      onFocus={scheduleShow}
      onBlur={hide}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, scale: 0.8, y: placement === "top" ? 4 : -4, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, y: placement === "top" ? 4 : -4, x: "-50%" }}
            transition={asTransition(springs.fastVisual)}
            className={cn(
              "pointer-events-none absolute left-1/2 z-50",
              placement === "top" ? "bottom-full mb-2" : "top-full mt-2",
              rich
                ? "m3-elevation-2 w-max max-w-[320px] rounded-xl bg-m3-surface-container-highest px-4 py-3 text-m3-on-surface"
                : "md-body-small inline-flex min-h-6 items-center whitespace-nowrap rounded-full bg-m3-inverse-surface px-3 py-1.5 text-m3-inverse-on-surface"
            )}
          >
            {rich ? (
              <span className="block">
                {title && <span className="md-title-small block">{title}</span>}
                <span className="md-body-medium block">{content}</span>
                {actionLabel && (
                  <button
                    type="button"
                    onClick={onAction}
                    className="m3-state md-label-large -ml-2 mt-2 inline-flex rounded-full px-2 py-1 text-m3-primary"
                  >
                    {actionLabel}
                  </button>
                )}
              </span>
            ) : (
              content
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export { tooltipMeta } from "@/lib/m3/meta";
