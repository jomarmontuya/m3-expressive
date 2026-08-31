"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, durations, shapes } from "@/lib/m3/tokens";
import {
  Menu as BaseMenu,
  type MenuRootActions,
  type MenuRootChangeEventDetails,
} from "@base-ui/react/menu";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";
import { fabColorStyles, type FabColor } from "./FAB";

const actionColorStyles: Record<FabColor, string> = {
  primary: fabColorStyles.primary,
  secondary: fabColorStyles.secondary,
  tertiary: fabColorStyles.tertiary,
  "primary-container": fabColorStyles.primary,
  "secondary-container": fabColorStyles.secondary,
  "tertiary-container": fabColorStyles.tertiary,
  surface: fabColorStyles.primary,
};

const triggerColorStyles: Record<FabColor, string> = {
  primary: fabColorStyles["primary-container"],
  secondary: fabColorStyles["secondary-container"],
  tertiary: fabColorStyles["tertiary-container"],
  "primary-container": fabColorStyles["primary-container"],
  "secondary-container": fabColorStyles["secondary-container"],
  "tertiary-container": fabColorStyles["tertiary-container"],
  surface: fabColorStyles.surface,
};

export interface FabMenuAction {
  /** Material Symbols ligature name for the action FAB */
  icon: string;
  /** Optional label shown as a tooltip-style chip next to the action FAB */
  label?: string;
  /** Accessible name when no visible label is supplied. */
  ariaLabel?: string;
  onClick?: () => void;
}

export interface FabMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Actions revealed when the menu opens */
  actions: FabMenuAction[];
  direction?: "horizontal" | "vertical";
  color?: FabColor;
  /** Controlled open state; omit to let the menu manage its own state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Closed-state Material Symbol. */
  icon?: string;
  /** Open-state Material Symbol. */
  closeIcon?: string;
  /**
   * Dock the menu to the bottom edge. Closed: the FAB sits flush bottom-center.
   * Open: the FAB's bottom corners morph square (shapes.large → shapes.none)
   * so the menu connects to the edge/bar while the actions cascade upward.
   * Docking fixes the cascade layout, so `direction` is ignored while docked.
   */
  docked?: boolean;
  /**
   * Docking target (only with `docked`).
   * - 'screen' (default): pins `position: fixed` to the viewport bottom — or to
   *   a transformed ancestor, e.g. a demo stage — with a vertical cascade above
   *   the FAB.
   * - 'bottom-app-bar': anchors `position: absolute; bottom: 0` inside the
   *   nearest positioned ancestor, so the FAB rests directly on a bottom app
   *   bar below and the actions open as a horizontal row flush on top of it.
   */
  dockedTo?: FabMenuDockTarget;
}

export type FabMenuDockTarget = "screen" | "bottom-app-bar";

/**
 * M3 Expressive FabMenu — a 56dp FAB that expands into a staggered row or
 * column of 56dp extended action buttons. The main icon changes to a close
 * affordance while the actions spring in one after another
 * (50ms stagger = durations.short1 token).
 *
 * Built on Base UI's headless Menu: Root owns the open state, outside
 * pointerdown + Escape dismissal and focus restoration; Trigger wraps the
 * main FAB (aria-haspopup/expanded) while keeping the hover/tap springs and
 * docked shape morph; the action cascade stays a custom in-flow flex layout
 * (a floating popup positioner cannot express the docked screen / bottom
 * app bar modes) with each action as a Menu.Item for roving focus and
 * Enter/Space activation. The menu is kept mounted while the staggered
 * exit plays (`preventUnmountOnClose` + `actionsRef.unmount`).
 */
/** Material 3 Expressive FAB menu for related actions. @see https://m3.material.io/components/fab-menu/overview */
export const FabMenu = React.forwardRef<HTMLDivElement, FabMenuProps>(function FabMenu(
  {
    actions,
    direction = "vertical",
    color = "primary",
    open,
    onOpenChange,
    icon = "edit",
    closeIcon = "close",
    docked = false,
    dockedTo = "screen",
    className,
    ...props
  },
  ref
) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = open ?? internalOpen;

  // Keep the menu mounted while the staggered exit plays, then unmount.
  const actionsRef = React.useRef<MenuRootActions>({ unmount() {}, close() {} });
  const handleOpenChange = React.useCallback(
    (nextOpen: boolean, eventDetails: MenuRootChangeEventDetails) => {
      if (!nextOpen) eventDetails.preventUnmountOnClose();
      if (open === undefined) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [open, onOpenChange]
  );

  const isVertical = direction === "vertical";

  const isDocked = docked === true;
  const docksToScreen = isDocked && dockedTo === "screen";
  /** Docking fixes the cascade axis: screen = vertical above, bar = horizontal row. */
  const verticalCascade = isDocked ? docksToScreen : isVertical;
  /** Shape-morph radii from the shape tokens — bottom corners square off when docked + open. */
  const shapeRest = `${shapes.large} ${shapes.large} ${shapes.large} ${shapes.large}`;
  const shapeDockedOpen = `${shapes.large} ${shapes.large} ${shapes.none} ${shapes.none}`;

  return (
    <BaseMenu.Root open={isOpen} onOpenChange={handleOpenChange} actionsRef={actionsRef}>
      <div
        ref={ref}
        className={cn(
          isDocked
            ? cn(
                // Anchor by the right edge, 28px (half the 56dp FAB) right of
                // center, so the widening cascade grows away from the FAB.
                "bottom-0 right-[calc(50%_-_28px)] z-50 flex gap-2",
                docksToScreen ? "fixed flex-col items-end" : "absolute flex-row items-end"
              )
            : cn(
                "relative inline-flex gap-3",
                isVertical ? "flex-col items-end" : "flex-row items-center"
              ),
          className
        )}
        {...props}
      >
        <AnimatePresence onExitComplete={() => actionsRef.current?.unmount()}>
          {isOpen && (
            // Floating popup anchored above the FAB (Menu.Popup must live in a
            // Positioner). The staggered cascade layout lives INSIDE the popup;
            // alignment follows the dock target (vertical cascade = column
            // end-aligned above the FAB, bar row = centered row flush above).
            <BaseMenu.Portal>
              <BaseMenu.Positioner
                side="top"
                align={verticalCascade || isDocked ? "end" : "center"}
                sideOffset={8}
                className="z-50 outline-none"
              >
                <BaseMenu.Popup className="outline-none">
                  <div
                    className={cn(
                      "flex gap-1",
                      verticalCascade ? "flex-col items-end" : "flex-row items-center"
                    )}
                  >
                    {actions.map((action, i) => (
                      <motion.div
                        key={`${action.icon}-${i}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ ...springs.expressive, delay: (i * durations.short1) / 1000 }}
                        className={cn(
                          "inline-flex items-center gap-1",
                          verticalCascade ? "flex-row" : "flex-col"
                        )}
                      >
                        <BaseMenu.Item
                          aria-label={action.ariaLabel ?? action.label ?? action.icon.replaceAll("_", " ")}
                          onClick={() => action.onClick?.()}
                          className={cn(
                            "m3-state m3-focus relative m3-elevation-3 inline-flex min-h-14 min-w-14 cursor-pointer list-none select-none items-center justify-center gap-2 rounded-full px-6 outline-none md-title-medium",
                            actionColorStyles[color]
                          )}
                        >
                          <motion.span
                            whileTap={{ scale: 0.96 }}
                            transition={springs.fastVisual}
                            className="inline-flex"
                          >
                            <MaterialSymbol icon={action.icon} size={24} />
                          </motion.span>
                          {action.label && <span className="whitespace-nowrap">{action.label}</span>}
                          <Ripple />
                        </BaseMenu.Item>
                      </motion.div>
                    ))}
                  </div>
                </BaseMenu.Popup>
              </BaseMenu.Positioner>
            </BaseMenu.Portal>
          )}
        </AnimatePresence>

        {/* Main FAB — icon morphs edit → close; Base UI Trigger owns the semantics */}
        <BaseMenu.Trigger
          aria-label={isOpen ? "Close actions menu" : "Open actions menu"}
          render={
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.94 }}
              transition={springs.expressive}
              animate={{
                borderRadius: isOpen
                  ? isDocked
                    ? shapeDockedOpen
                    : "28px 28px 28px 28px"
                  : shapeRest,
                transition: springs.expressiveEffects,
              }}
              className={cn(
                "m3-state m3-focus relative m3-elevation-3 inline-flex h-14 w-14 cursor-pointer select-none items-center justify-center rounded-2xl outline-none",
                "transition-[background-color,box-shadow] duration-200",
                triggerColorStyles[color]
              )}
            />
          }
        >
          <Ripple />
          <motion.span
            key={isOpen ? "close" : "open"}
            initial={{ rotate: isOpen ? -45 : 45, scale: 0.7, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={springs.expressiveEffects}
            className="inline-flex"
          >
            <MaterialSymbol icon={isOpen ? closeIcon : icon} size={isOpen ? 20 : 24} />
          </motion.span>
        </BaseMenu.Trigger>
      </div>
    </BaseMenu.Root>
  );
});
