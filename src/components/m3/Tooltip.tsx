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

/** MDC web defaults: SHOW_DELAY_MS = 500, HIDE_DELAY_MS = 600. */
const SHOW_DELAY = durations.long2; // 500ms
const HIDE_DELAY = durations.long4; // 600ms
/** Touch shows on long-press (~500ms, Android ViewConfiguration). */
const LONG_PRESS_DELAY = durations.long2; // 500ms

/**
 * M3 Tooltip — a text label that appears on hover, keyboard focus, or touch
 * long-press. Plain tooltips are 4dp-cornered inverse-surface labels (4/8px
 * padding, 200px max, 8dp caret); rich tooltips add a title and optional
 * action on a surface-container card (12dp corners, level-2 elevation,
 * outline border). Shows after a 500ms delay and hides after 600ms, and the
 * trigger receives aria-describedby while the tooltip is visible.
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
  const tooltipId = React.useId();

  const cancel = React.useCallback(() => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const scheduleShow = React.useCallback(
    (delay: number) => {
      cancel();
      timer.current = window.setTimeout(() => {
        timer.current = null;
        setVisible(true);
      }, delay);
    },
    [cancel]
  );

  const scheduleHide = React.useCallback(() => {
    cancel();
    timer.current = window.setTimeout(() => {
      timer.current = null;
      setVisible(false);
    }, HIDE_DELAY);
  }, [cancel]);

  const hideNow = React.useCallback(() => {
    cancel();
    setVisible(false);
  }, [cancel]);

  React.useEffect(() => cancel, [cancel]);

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return; // touch uses long-press below
    scheduleShow(SHOW_DELAY);
  };
  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    scheduleHide();
  };
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") scheduleShow(LONG_PRESS_DELAY);
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType !== "touch") return;
    if (timer.current !== null) {
      // Released before the long-press fired — an ordinary tap.
      cancel();
    } else {
      setVisible((v) => !v); // long-press shown; next tap dismisses
    }
  };

  // Link the trigger to the tooltip for assistive tech when the child is an element.
  const trigger = React.isValidElement<{ "aria-describedby"?: string }>(children)
    ? React.cloneElement(children, { "aria-describedby": tooltipId })
    : children;

  return (
    <span
      className={cn("relative inline-flex", className)}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={hideNow}
      onFocus={() => scheduleShow(SHOW_DELAY)}
      onBlur={hideNow}
    >
      {trigger}
      <AnimatePresence>
        {visible && (
          <motion.span
            role="tooltip"
            id={tooltipId}
            initial={{ opacity: 0, scale: 0.8, y: placement === "top" ? 4 : -4, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, y: placement === "top" ? 4 : -4, x: "-50%" }}
            transition={asTransition(springs.fastVisual)}
            className={cn(
              "absolute left-1/2 z-50",
              placement === "top" ? "bottom-full mb-1" : "top-full mt-1",
              rich
                ? // Rich tooltips stay interactive (title + action); the 600ms
                  // hide delay lets the pointer cross the 4px anchor gap.
                  "m3-elevation-2 pointer-events-auto w-max max-w-[320px] rounded-[12px] border border-m3-outline-variant bg-m3-surface-container px-4 py-3 text-m3-on-surface-variant"
                : "md-body-small pointer-events-none inline-flex min-h-6 max-w-[200px] items-center rounded-[4px] bg-m3-inverse-surface px-2 py-1 text-m3-inverse-on-surface"
            )}
          >
            {/* 8dp caret pointing at the anchor */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-1/2 -ml-1 h-2 w-2 rotate-45",
                rich
                  ? placement === "top"
                    ? "-bottom-1 border-b border-r border-m3-outline-variant bg-m3-surface-container"
                    : "-top-1 border-l border-t border-m3-outline-variant bg-m3-surface-container"
                  : placement === "top"
                    ? "-bottom-1 bg-m3-inverse-surface"
                    : "-top-1 bg-m3-inverse-surface"
              )}
            />
            {rich ? (
              <span className="block">
                {title && <span className="md-title-small block">{title}</span>}
                <span className="md-body-medium block">{content}</span>
                {actionLabel && (
                  <button
                    type="button"
                    onClick={onAction}
                    className="m3-state md-label-large -ml-2 mt-2 inline-flex min-h-9 items-center rounded-full px-2 text-m3-primary"
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
