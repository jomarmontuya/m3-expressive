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
 * ancestor of the toast card now). Consumer `className` merges here too, so
 * overrides like `bottom-24 left-1/2 -translate-x-1/2` (playground) keep
 * working exactly as they did against the old fixed-positioned card.
 */
const POSITION_CLASSES =
  "fixed bottom-6 left-6 z-[70] flex";

/** Card visuals — verbatim token classes from the pre-migration card. */
const CARD_CLASSES =
  "m3-elevation-3 md-body-medium flex min-h-12 min-w-[344px] max-w-[min(672px,calc(100vw-3rem))] items-center gap-3 rounded-[4px] bg-m3-inverse-surface px-4 py-3 text-m3-inverse-on-surface";

/**
 * Presence motion, owned by Base UI. Entrance/exit used to be framer-motion
 * springs (`springs.expressive` via AnimatePresence variants); Base UI detects
 * transition completion through the Web Animations API (`getAnimations()`),
 * which JS-driven springs never register with — so presence is expressed as
 * CSS transitions on the Root's `data-starting-style` / `data-ending-style`
 * states instead, using the M3 emphasized curves (the spec's non-spring
 * fallback; values mirror `tokens.easings.emphasizedDecelerate` for the enter
 * leg and `tokens.easings.emphasizedAccelerate` for the exit leg — hardcoded
 * because Tailwind cannot see interpolated class names).
 *
 * Swipe dismissals exit along the drag: Base UI exposes the released pointer
 * offset as `--toast-swipe-movement-x/y` CSS vars, which replace the old
 * hand-rolled `exitDirectionFor` dynamic-exit variant for every direction.
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

export interface SnackbarProps {
  /** Controls visibility (rendered through the Base UI toast manager). */
  open: boolean;
  message: string;
  /** Optional leading Material Symbol name. */
  icon?: string;
  /** Trailing text action, e.g. "Undo". */
  actionLabel?: string;
  onAction?: () => void;
  /** Called by auto-dismiss, swipe, Escape and the trailing close icon. */
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
 *
 * Migrated onto the Base UI Toast primitive (rc.0), which now owns the toast
 * lifecycle: auto-dismiss timers (paused on hover, keyboard focus and window
 * blur), Escape-to-close, F6 viewport focus, ARIA wiring (the viewport is the
 * polite live region; the card is a focusable `role="dialog"` — replacing the
 * old `role="status"` on the card itself) and swipe-to-dismiss in any
 * direction (40px threshold, replacing the framer-motion drag handler with
 * its 80px/500px-per-second gesture rules). framer-motion was dropped here
 * because Base UI freezes the card's `transform` inline while swiping — a
 * motion-driven transform would fight it, and JS springs cannot participate
 * in Base UI's transition-end detection.
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
  /**
   * Per-instance manager (not module-level): every <Snackbar> mounts its own
   * Toast.Provider, so two simultaneously rendered snackbars can never render
   * each other's toasts. The controlled `open` prop is synced onto the
   * manager in the effect below — the public API stays `open`/`onClose`-driven.
   */
  const [toastManager] = React.useState(() => BaseToast.createToastManager());

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
      if (activeIdRef.current !== null) return;
      // Sticky when there is nothing to dismiss to or duration <= 0 — mirrors
      // the pre-migration timer, whose no-op `onClose?.()` left the snackbar
      // on screen. Base UI treats timeout 0 as "never auto-dismiss".
      const sticky = !onCloseRef.current || !duration || duration <= 0;
      activeIdRef.current = toastManager.add({
        timeout: sticky ? 0 : duration,
        onClose() {
          activeIdRef.current = null;
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
      suppressOnCloseRef.current = true;
      toastManager.close(id);
    }
  }, [open, duration, toastManager]);

  return (
    <BaseToast.Provider toastManager={toastManager} limit={1}>
      <SnackbarToasts
        message={message}
        icon={icon}
        actionLabel={actionLabel}
        onAction={onAction}
        onClose={onClose}
        className={className}
      />
    </BaseToast.Provider>
  );
}

type SnackbarToastsProps = Pick<
  SnackbarProps,
  "message" | "icon" | "actionLabel" | "onAction" | "onClose" | "className"
>;

/**
 * Renders the Base UI Viewport + Root for the toast synced by <Snackbar>.
 * Renders nothing while idle so no empty `role="region"` landmark is left in
 * the DOM (the old implementation also rendered nothing when closed).
 * The Viewport intentionally renders in place (no Toast.Portal): the old card
 * was not portaled either, and in-place rendering keeps consumer positioning
 * overrides on `className` effective.
 */
function SnackbarToasts({
  message,
  icon,
  actionLabel,
  onAction,
  onClose,
  className,
}: SnackbarToastsProps) {
  const { toasts } = BaseToast.useToastManager();
  if (toasts.length === 0) return null;

  return (
    <BaseToast.Viewport className={cn(POSITION_CLASSES, className)}>
      {toasts.map((toast) => (
        <BaseToast.Root
          key={toast.id}
          toast={toast}
          /* M3: swipe-dismissable in any direction (Base UI default is
             down/right; it damps the axes that are not enabled). */
          swipeDirection={["up", "down", "left", "right"]}
          /* Fixed, short-lived overlay: free both axes for the swipe gesture. */
          style={{ touchAction: "none" }}
          className={cn(CARD_CLASSES, MOTION_CLASSES)}
        >
          {icon && <MaterialSymbol icon={icon} size={18} className="shrink-0" />}
          <BaseToast.Description className="flex-1">
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
          {onClose && (
            <BaseToast.Close
              aria-label="Close"
              /* Base UI hides the close control from AT while the viewport is
                 "collapsed" (not hovered/focused) — its default design stacks
                 toasts. This snackbar is always fully visible, so the control
                 must stay announced to match the old markup. */
              aria-hidden={false}
              className="m3-state flex size-9 shrink-0 items-center justify-center rounded-full text-m3-inverse-on-surface"
            >
              <MaterialSymbol icon="close" size={18} />
            </BaseToast.Close>
          )}
        </BaseToast.Root>
      ))}
    </BaseToast.Viewport>
  );
}

export { snackbarMeta } from "@/lib/m3/meta";
