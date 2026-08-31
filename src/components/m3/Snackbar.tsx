"use client";

import * as React from "react";
// NOTE: `useToastManager`/`createToastManager` are only reachable as values
// through the `Toast` namespace in v1.0.0-rc.0 (the package root re-exports
// their *types* only), so they are consumed as `BaseToast.*` below.
import { Toast as BaseToast } from "@base-ui/react/toast";
import { cn } from "@/lib/utils";
import { MaterialSymbol } from "./MaterialSymbol";

/**
 * Fixed positioning lives on the Base UI Viewport (it is the positioned
 * ancestor of the toast card). Consumer `className` merges here too, so
 * overrides like `bottom-24 left-1/2 -translate-x-1/2` remain effective.
 */
const POSITION_CLASSES =
  "fixed bottom-4 left-4 z-[70] flex sm:bottom-6 sm:left-6";

/** Material snackbar card token classes. */
const CARD_CLASSES =
  "m3-elevation-3 md-body-medium flex min-h-12 w-[calc(100vw-32px)] max-w-[600px] items-center gap-3 rounded-[4px] bg-m3-inverse-surface px-4 py-3 text-m3-inverse-on-surface sm:w-auto sm:min-w-[344px]";

/**
 * Base UI owns presence motion and detects transition completion through the
 * Web Animations API (`getAnimations()`). Presence is expressed as
 * CSS transitions on the Root's `data-starting-style` / `data-ending-style`
 * states instead, using the M3 emphasized curves (the spec's non-spring
 * fallback; values mirror `tokens.easings.emphasizedDecelerate` for the enter
 * leg and `tokens.easings.emphasizedAccelerate` for the exit leg — hardcoded
 * because Tailwind cannot see interpolated class names).
 *
 * Swipe dismissals exit along the drag: Base UI exposes the released pointer
 * offset as `--toast-swipe-movement-x/y` CSS vars for every direction.
 */
const MOTION_CLASSES = [
  "transition-[transform,opacity]",
  "duration-[500ms]",
  // Enter leg: M3 emphasized-decelerate.
  "[transition-timing-function:cubic-bezier(0.05,0.7,0.1,1)]",
  "[&[data-starting-style]]:opacity-0",
  "[&[data-starting-style]]:[transform:translateY(60px)]",
  // Exit leg: M3 emphasized-accelerate, slide back down for non-drag
  // dismissals (auto / close icon / Esc) — same default as before.
  "[&[data-ending-style]]:duration-[400ms]",
  "[&[data-ending-style]]:[transition-timing-function:cubic-bezier(0.3,0,0.8,0.15)]",
  "[&[data-ending-style]]:opacity-0",
  "[&[data-ending-style]]:[transform:translateY(60px)]",
  // Swipe dismissals keep flying along the released drag (3× the offset)
  // instead of snapping home; specificity of the double attribute selector
  // wins over the slide-down rule above.
  "[&[data-ending-style][data-swipe-direction]]:[transform:translate(calc(var(--toast-swipe-movement-x)*3),calc(var(--toast-swipe-movement-y)*3))]",
].join(" ");

interface SnackbarToastData {
  ownerId: string;
}

/**
 * One manager for the whole module enforces Material's one-snackbar rule
 * across separate <Snackbar> component instances. Each component filters the
 * shared list to its own toast so only the owning viewport renders it.
 */
const snackbarManager = BaseToast.createToastManager<SnackbarToastData>();
const SHARED_SNACKBAR_ID = "m3-snackbar";
let activeSnackbar:
  | { ownerId: string; replace: () => void }
  | null = null;

export interface SnackbarProps {
  /** Controls visibility (rendered through the Base UI toast manager). */
  open: boolean;
  message: string;
  /** Optional leading Material Symbol name. */
  icon?: string;
  /** Trailing text action, e.g. "Undo". */
  actionLabel?: string;
  onAction?: () => void;
  /** Put the action below the message. Use for long actions or compact widths. */
  actionOnNewLine?: boolean;
  /** Called by auto-dismiss, swipe, Escape and the trailing close icon. */
  onClose?: () => void;
  /** Auto-dismiss for messages without actions. Actionable snackbars stay until acted on or dismissed. Default 4000. */
  duration?: number;
  className?: string;
}

/**
 * M3 Snackbar — brief confirmation feedback at the bottom of the screen on an
 * inverse surface (4dp corners, elevation 3, responsive compact width and a
 * current 600dp maximum), with a text action and close control. Actionable
 * snackbars do not auto-dismiss, and long actions can move to a new line.
 * The optional leading icon is a documented extension beyond the base M3
 * anatomy (text + action + close).
 *
 * Migrated onto the Base UI Toast primitive (rc.0), which now owns the toast
 * lifecycle: auto-dismiss timers (paused on hover, keyboard focus and window
 * blur), Escape-to-close, F6 viewport focus, ARIA wiring (the viewport is the
 * polite live region; the card is a focusable `role="dialog"` — replacing the
   * old `role="status"` on the card itself), one shared visible instance
   * across component mounts, and swipe-to-dismiss in any
 * direction (40px threshold, replacing the framer-motion drag handler with
 * its 80px/500px-per-second gesture rules). framer-motion was dropped here
 * because Base UI freezes the card's `transform` inline while swiping — a
 * motion-driven transform would fight it, and JS springs cannot participate
 * in Base UI's transition-end detection.
 */
/** Material 3 snackbar for transient feedback. @see https://m3.material.io/components/snackbar/overview */
export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  function Snackbar(
    {
      open,
      message,
      icon,
      actionLabel,
      onAction,
      actionOnNewLine = false,
      onClose,
      duration = 4000,
      className,
    },
    ref,
  ) {
  const ownerId = React.useId();

  /** Latest `onClose`, readable from the toast object without re-adding it. */
  const onCloseRef = React.useRef(onClose);
  React.useEffect(() => {
    onCloseRef.current = onClose;
  });

  /** Id of the live toast, or null while none has been added. */
  const activeIdRef = React.useRef<string | null>(null);
  /**
   * Set when the sync effect itself closes the toast (parent drove `open` to
   * false): Base UI then invokes the toast's own `onClose` hook, which must
   * not echo back to the consumer — the old AnimatePresence exit never
   * re-invoked `onClose` on parent-driven closes either.
   */
  const suppressOnCloseRef = React.useRef(false);

  React.useEffect(() => {
    if (open) {
      const sticky =
        Boolean(actionLabel) ||
        !onCloseRef.current ||
        !duration ||
        duration <= 0;
      if (activeIdRef.current !== null) {
        snackbarManager.update(activeIdRef.current, {
          data: { ownerId },
          timeout: sticky ? 0 : duration,
        });
        return;
      }
      // Replacing the shared id updates the existing toast in place. Notify
      // the prior controlled instance first so it also resets `open`.
      if (activeSnackbar && activeSnackbar.ownerId !== ownerId) {
        activeSnackbar.replace();
      }
      // Sticky when there is nothing to dismiss to or duration <= 0. Base UI
      // treats timeout 0 as "never auto-dismiss".
      activeIdRef.current = SHARED_SNACKBAR_ID;
      activeSnackbar = {
        ownerId,
        replace() {
          activeIdRef.current = null;
          onCloseRef.current?.();
        },
      };
      snackbarManager.add({
        id: SHARED_SNACKBAR_ID,
        data: { ownerId },
        timeout: sticky ? 0 : duration,
        onClose() {
          activeIdRef.current = null;
          if (activeSnackbar?.ownerId === ownerId) activeSnackbar = null;
          if (suppressOnCloseRef.current) {
            suppressOnCloseRef.current = false;
            return;
          }
          onCloseRef.current?.();
        },
      });
      return;
    }
    if (activeIdRef.current !== null) {
      const id = activeIdRef.current;
      activeIdRef.current = null;
      if (activeSnackbar?.ownerId === ownerId) activeSnackbar = null;
      suppressOnCloseRef.current = true;
      snackbarManager.close(id);
    }
  }, [open, actionLabel, duration, ownerId]);

  return (
    <BaseToast.Provider toastManager={snackbarManager} limit={1}>
      <SnackbarToasts
        ownerId={ownerId}
        viewportRef={ref}
        message={message}
        icon={icon}
        actionLabel={actionLabel}
        onAction={onAction}
        actionOnNewLine={actionOnNewLine}
        onClose={onClose}
        className={className}
      />
    </BaseToast.Provider>
    );
  },
);

Snackbar.displayName = "Snackbar";

type SnackbarToastsProps = Pick<
  SnackbarProps,
  | "message"
  | "icon"
  | "actionLabel"
  | "onAction"
  | "actionOnNewLine"
  | "onClose"
  | "className"
> & {
  ownerId: string;
  viewportRef?: React.ForwardedRef<HTMLDivElement>;
};

/**
 * Renders the Base UI Viewport + Root for the toast synced by <Snackbar>.
 * Renders nothing while idle so no empty `role="region"` landmark is left in
 * the DOM. The Viewport intentionally renders in place (no Toast.Portal) so
 * consumer positioning overrides on `className` stay effective.
 */
function SnackbarToasts({
  ownerId,
  viewportRef,
  message,
  icon,
  actionLabel,
  onAction,
  actionOnNewLine,
  onClose,
  className,
}: SnackbarToastsProps) {
  const { toasts } = BaseToast.useToastManager<SnackbarToastData>();
  const ownedToasts = toasts.filter(
    (toast) => toast.data?.ownerId === ownerId && !toast.limited,
  );
  if (ownedToasts.length === 0) return null;

  return (
    <BaseToast.Viewport
      ref={viewportRef}
      className={cn(POSITION_CLASSES, className)}
    >
      {ownedToasts.map((toast) => (
        <BaseToast.Root
          key={toast.id}
          toast={toast}
          /* M3: swipe-dismissable in any direction (Base UI default is
             down/right; it damps the axes that are not enabled). */
          swipeDirection={["up", "down", "left", "right"]}
          /* Fixed, short-lived overlay: free both axes for the swipe gesture. */
          style={{ touchAction: "none" }}
          className={cn(
            CARD_CLASSES,
            actionOnNewLine && "flex-col items-stretch gap-0",
            MOTION_CLASSES,
          )}
        >
          {actionOnNewLine ? (
            <>
              <div className="flex w-full items-center gap-3">
                {icon && (
                  <MaterialSymbol icon={icon} size={18} className="shrink-0" />
                )}
                <BaseToast.Description className="min-w-0 flex-1">
                  {message}
                </BaseToast.Description>
              </div>
              <div className="flex min-h-10 items-center justify-end gap-1 pt-1">
                {actionLabel && (
                  <BaseToast.Action
                    onClick={onAction}
                    className="m3-state md-label-large min-h-9 shrink-0 rounded-full px-3 uppercase text-m3-inverse-primary"
                  >
                    {actionLabel}
                  </BaseToast.Action>
                )}
                {onClose && <SnackbarClose />}
              </div>
            </>
          ) : (
            <>
              {icon && (
                <MaterialSymbol icon={icon} size={18} className="shrink-0" />
              )}
              <BaseToast.Description className="min-w-0 flex-1">
                {message}
              </BaseToast.Description>
              {actionLabel && (
                <BaseToast.Action
                  onClick={onAction}
                  className="m3-state md-label-large min-h-9 shrink-0 rounded-full px-3 uppercase text-m3-inverse-primary"
                >
                  {actionLabel}
                </BaseToast.Action>
              )}
              {onClose && <SnackbarClose />}
            </>
          )}
        </BaseToast.Root>
      ))}
    </BaseToast.Viewport>
  );
}

function SnackbarClose() {
  return (
    <BaseToast.Close
      aria-label="Close"
      aria-hidden={false}
      className="m3-state flex size-9 shrink-0 items-center justify-center rounded-full text-m3-inverse-on-surface"
    >
      <MaterialSymbol icon="close" size={18} />
    </BaseToast.Close>
  );
}
