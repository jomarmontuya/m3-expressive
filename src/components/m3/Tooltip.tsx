"use client";

/* eslint-disable max-lines -- Rich tooltip pointer, touch and keyboard access share one lifecycle. */

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  /** Rich only. Up to two short actions. */
  actions?: TooltipAction[];
  /** Carets are optional in current Material guidance. Default false. */
  showCaret?: boolean;
  /** Rich only. Open on click and stay open until another interaction. */
  persistent?: boolean;
  /** Persistent rich only. Open when the component first mounts. */
  defaultOpen?: boolean;
  placement?: TooltipPlacement;
  align?: TooltipAlign;
  /** Trigger element. */
  children: React.ReactNode;
  className?: string;
}

export type TooltipPlacement =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "start"
  | "end";

export type TooltipAlign = "start" | "center" | "end";

export interface TooltipAction {
  label: string;
  onClick?: () => void;
}

/** Current Material behavior: show after 500ms; transient tooltips hide 1.5s after exit. */
const SHOW_DELAY = durations.long2; // 500ms
const HIDE_DELAY = durations.long4 * 2.5; // 1500ms

/**
 * M3 Tooltip — a text label that appears on hover or keyboard focus.
 * Plain tooltips are 4dp-cornered inverse-surface labels (4/8px padding,
 * 200px max, with an opt-in caret); rich tooltips add a title and up to two
 * actions on a surface-container card (12dp corners and level-2 elevation).
 * Shows after a 500ms delay. Transient tooltips hide 1.5 seconds
 * after leaving the target region. Rich tooltips default to bottom-end and
 * can opt into click-triggered persistent behavior; the trigger
 * receives aria-describedby from Base UI while the tooltip is visible.
 *
 * Built on Base UI's headless Tooltip: Provider owns the shared
 * show/hide delays, Root the open lifecycle, Trigger the hover/focus
 * listeners and aria wiring, Positioner the anchored placement with
 * collision avoidance, and Popup stays hoverable so rich-tooltip actions
 * remain clickable across the 4px anchor gap. Portals + `role="tooltip"`
 * + aria-describedby are handled for us. A 500ms touch long-press opens the
 * same popup because Base UI deliberately limits its hover listener to mouse.
 */
/** Material 3 tooltip for contextual help. @see https://m3.material.io/components/tooltips/overview */
export const Tooltip = React.forwardRef<HTMLElement, TooltipProps>(
  function Tooltip(
    {
      content,
      rich = false,
      title,
      actionLabel,
      onAction,
      actions,
      showCaret = false,
      persistent = false,
      defaultOpen = false,
      placement,
      align,
      children,
      className,
    },
    ref,
  ) {
  const reduceMotion = useReducedMotion() ?? false;
  // Keep the tooltip mounted while the framer-motion exit plays, then unmount.
  const actionsRef = React.useRef<TooltipRootActions>({ unmount() {}, close() {} });
  const [tooltipHandle] = React.useState(() => BaseTooltip.createHandle());
  const triggerId = React.useId();
  const popupRef = React.useRef<HTMLDivElement>(null);
  const keyboardActionMode = React.useRef(false);
  const longPressTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchOrigin = React.useRef<{ x: number; y: number } | null>(null);
  const isPersistent = rich && persistent;
  const resolvedPlacement = placement ?? (rich ? "bottom" : "top");
  const resolvedAlign = align ?? (rich ? "end" : "center");
  const side =
    resolvedPlacement === "start"
      ? "inline-start"
      : resolvedPlacement === "end"
        ? "inline-end"
        : resolvedPlacement;
  const isHorizontal =
    resolvedPlacement === "left" ||
    resolvedPlacement === "right" ||
    resolvedPlacement === "start" ||
    resolvedPlacement === "end";
  const direction =
    resolvedPlacement === "left" || resolvedPlacement === "start" ? 1 : -1;
  const resolvedActions = (
    actions ?? (actionLabel ? [{ label: actionLabel, onClick: onAction }] : [])
  ).slice(0, 2);

  const focusFirstAction = React.useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        popupRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      });
    });
  }, []);

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (
      event.key !== "Tab" ||
      event.shiftKey ||
      !rich ||
      resolvedActions.length === 0
    ) {
      return;
    }
    event.preventDefault();
    keyboardActionMode.current = true;
    tooltipHandle.open(triggerId);
    focusFirstAction();
  };

  const handleActionKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "Escape") {
      keyboardActionMode.current = false;
      actionsRef.current?.close();
      document.getElementById(triggerId)?.focus();
      return;
    }
    if (event.key !== "Tab") return;
    if (event.shiftKey && index === 0) {
      event.preventDefault();
      document.getElementById(triggerId)?.focus();
      return;
    }
    if (!event.shiftKey && index === resolvedActions.length - 1) {
      requestAnimationFrame(() => {
        keyboardActionMode.current = false;
        actionsRef.current?.close();
      });
    }
  };

  const clearLongPress = React.useCallback(() => {
    if (longPressTimer.current !== null) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    touchOrigin.current = null;
  }, []);

  React.useEffect(() => clearLongPress, [clearLongPress]);

  const startLongPress = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "touch" || isPersistent) return;
    clearLongPress();
    touchOrigin.current = { x: event.clientX, y: event.clientY };
    longPressTimer.current = setTimeout(() => {
      longPressTimer.current = null;
      tooltipHandle.open(triggerId);
    }, SHOW_DELAY);
  };

  const cancelMovedLongPress = (event: React.PointerEvent<HTMLElement>) => {
    const origin = touchOrigin.current;
    if (
      origin &&
      Math.hypot(event.clientX - origin.x, event.clientY - origin.y) > 8
    ) {
      clearLongPress();
    }
  };

  const popupMotion: HTMLMotionProps<"span"> = {
    initial: {
      opacity: 0,
      scale: 0.8,
      x: isHorizontal ? direction * 4 : 0,
      y: isHorizontal ? 0 : resolvedPlacement === "top" ? 4 : -4,
    },
    animate: { opacity: 1, scale: 1, x: 0, y: 0 },
    exit: {
      opacity: 0,
      scale: 0.9,
      x: isHorizontal ? direction * 4 : 0,
      y: isHorizontal ? 0 : resolvedPlacement === "top" ? 4 : -4,
    },
    transition: reduceMotion
      ? { duration: 0 }
      : asTransition(springs.fastVisual),
  };

  if (reduceMotion) {
    popupMotion.initial = false;
    popupMotion.exit = { opacity: 1, scale: 1, x: 0, y: 0 };
  }

  return (
    <BaseTooltip.Provider delay={SHOW_DELAY} closeDelay={HIDE_DELAY}>
      <BaseTooltip.Root
        actionsRef={actionsRef}
        handle={tooltipHandle}
        defaultOpen={isPersistent && defaultOpen}
        defaultTriggerId={isPersistent && defaultOpen ? triggerId : undefined}
        onOpenChange={(nextOpen, eventDetails) => {
          if (
            isPersistent &&
            ((nextOpen &&
              (eventDetails.reason === "trigger-hover" ||
                eventDetails.reason === "trigger-focus")) ||
              (!nextOpen && eventDetails.reason === "trigger-hover"))
          ) {
            eventDetails.cancel();
            return;
          }
          if (!nextOpen && keyboardActionMode.current) {
            eventDetails.cancel();
          }
        }}
      >
        <BaseTooltip.Trigger
          ref={ref as React.Ref<HTMLButtonElement>}
          id={triggerId}
          handle={tooltipHandle}
          onPointerDown={startLongPress}
          onPointerMove={cancelMovedLongPress}
          onPointerUp={clearLongPress}
          onPointerCancel={clearLongPress}
          onKeyDown={handleTriggerKeyDown}
          onClick={() => {
            if (isPersistent) tooltipHandle.open(triggerId);
          }}
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
          className={cn("m3-focus inline-flex", className)}
        />
        <AnimatePresence onExitComplete={() => actionsRef.current?.unmount()}>
          <BaseTooltip.Portal>
            <BaseTooltip.Positioner
              side={side}
              align={resolvedAlign}
              sideOffset={4}
              className="z-50"
            >
              <BaseTooltip.Popup
                ref={popupRef}
                role="tooltip"
                render={<motion.span {...popupMotion} />}
                className={cn(
                  rich
                    ? // Rich tooltips stay interactive (title + action); the popup
                      // is hoverable by default so the pointer can cross the gap.
                      "m3-elevation-2 block w-max max-w-[320px] rounded-[12px] bg-m3-surface-container px-4 pb-2 pt-3 text-m3-on-surface-variant"
                    : "md-body-small block min-h-6 max-w-[200px] rounded-[4px] bg-m3-inverse-surface px-2 py-1 text-m3-inverse-on-surface"
                )}
              >
                {rich ? (
                  <span className="block">
                    {title && <span className="md-title-small block">{title}</span>}
                    <span className="md-body-medium block">{content}</span>
                    {resolvedActions.length > 0 && (
                      <span className="-ml-2 mt-2 flex flex-wrap gap-2">
                        {resolvedActions.map((action, index) => (
                          <button
                            key={action.label}
                            type="button"
                            onClick={() => {
                              action.onClick?.();
                              keyboardActionMode.current = false;
                              actionsRef.current?.close();
                            }}
                            onKeyDown={(event) =>
                              handleActionKeyDown(event, index)
                            }
                            className="m3-state md-label-large inline-flex min-h-9 items-center rounded-full px-2 text-m3-primary"
                          >
                            {action.label}
                          </button>
                        ))}
                      </span>
                    )}
                  </span>
                ) : (
                  content
                )}
                {showCaret && (
                  <BaseTooltip.Arrow
                    className={({ side: arrowSide }) =>
                      cn(
                        "absolute overflow-visible",
                        arrowSide === "left" ||
                          arrowSide === "right" ||
                          arrowSide === "inline-start" ||
                          arrowSide === "inline-end"
                          ? "h-4 w-2"
                          : "h-2 w-4",
                        "data-[side=bottom]:-top-2 data-[side=left]:-right-2 data-[side=right]:-left-2 data-[side=top]:-bottom-2",
                        "data-[side=inline-start]:-right-2 data-[side=inline-end]:-left-2",
                      )
                    }
                    render={(arrowProps, arrowState) => {
                      const arrowSide = arrowState.side;
                      const horizontal =
                        arrowSide === "left" ||
                        arrowSide === "right" ||
                        arrowSide === "inline-start" ||
                        arrowSide === "inline-end";
                      const path =
                        arrowSide === "top"
                          ? "M0 0H16L8 8Z"
                          : arrowSide === "bottom"
                            ? "M0 8H16L8 0Z"
                            : arrowSide === "left" ||
                                arrowSide === "inline-start"
                              ? "M0 0V16L8 8Z"
                              : "M8 0V16L0 8Z";
                      return (
                        <svg
                          {...arrowProps}
                          viewBox={horizontal ? "0 0 8 16" : "0 0 16 8"}
                        >
                          <path
                            d={path}
                            fill={
                              rich
                                ? "var(--md-surface-container)"
                                : "var(--md-inverse-surface)"
                            }
                          />
                        </svg>
                      );
                    }}
                  />
                )}
              </BaseTooltip.Popup>
            </BaseTooltip.Positioner>
          </BaseTooltip.Portal>
        </AnimatePresence>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
    );
  },
);

Tooltip.displayName = "Tooltip";
