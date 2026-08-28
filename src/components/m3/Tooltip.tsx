"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { HTMLMotionProps, Transition } from "framer-motion";
import {
  Tooltip as BaseTooltip,
  type TooltipRootActions,
} from "@base-ui/react/tooltip";
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

/**
 * M3 Tooltip — a text label that appears on hover or keyboard focus.
 * Plain tooltips are 4dp-cornered inverse-surface labels (4/8px padding,
 * 200px max, 8dp caret); rich tooltips add a title and optional action on
 * a surface-container card (12dp corners, level-2 elevation, outline
 * border). Shows after a 500ms delay and hides after 600ms; the trigger
 * receives aria-describedby from Base UI while the tooltip is visible.
 *
 * Built on Base UI's headless Tooltip: Provider owns the shared
 * show/hide delays, Root the open lifecycle, Trigger the hover/focus
 * listeners and aria wiring, Positioner the anchored placement with
 * collision avoidance, and Popup stays hoverable so rich-tooltip actions
 * remain clickable across the 4px anchor gap. Portals + `role="tooltip"`
 * + aria-describedby are handled for us; only the M3 surface visuals and
 * the fastVisual entrance spring are ours. (Touch long-press toggling from
 * the hand-rolled version is replaced by Base UI's touch/focus behavior.)
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
  // Keep the tooltip mounted while the framer-motion exit plays, then unmount.
  const actionsRef = React.useRef<TooltipRootActions>({ unmount() {}, close() {} });

  const popupMotion: HTMLMotionProps<"span"> = {
    initial: { opacity: 0, scale: 0.8, y: placement === "top" ? 4 : -4 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: placement === "top" ? 4 : -4 },
    transition: asTransition(springs.fastVisual),
  };

  return (
    <BaseTooltip.Provider delay={SHOW_DELAY} closeDelay={HIDE_DELAY}>
      <BaseTooltip.Root actionsRef={actionsRef}>
        <BaseTooltip.Trigger
          render={
            React.isValidElement(children) ? (
              children
            ) : (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- fallback focus target when children is plain text; Base UI Trigger needs a focusable element
              <span tabIndex={0} className="inline-flex">
                {children}
              </span>
            )
          }
          className={cn("inline-flex focus:outline-none", className)}
        />
        <AnimatePresence onExitComplete={() => actionsRef.current?.unmount()}>
          <BaseTooltip.Portal>
            <BaseTooltip.Positioner side={placement} sideOffset={4} className="z-50">
              <BaseTooltip.Popup
                render={<motion.span {...popupMotion} />}
                className={cn(
                  rich
                    ? // Rich tooltips stay interactive (title + action); the popup
                      // is hoverable by default so the pointer can cross the gap.
                      "m3-elevation-2 block w-max max-w-[320px] rounded-[12px] border border-m3-outline-variant bg-m3-surface-container px-4 py-3 text-m3-on-surface-variant"
                    : "md-body-small block min-h-6 max-w-[200px] rounded-[4px] bg-m3-inverse-surface px-2 py-1 text-m3-inverse-on-surface"
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
                        className="m3-state md-label-large -ml-2 mt-2 inline-flex min-h-9 items-center rounded-full px-2 text-m3-primary"
                      >
                        {actionLabel}
                      </button>
                    )}
                  </span>
                ) : (
                  content
                )}
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
              </BaseTooltip.Popup>
            </BaseTooltip.Positioner>
          </BaseTooltip.Portal>
        </AnimatePresence>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}

export { tooltipMeta } from "@/lib/m3/meta";
