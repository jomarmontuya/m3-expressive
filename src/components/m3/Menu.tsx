'use client';

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { HTMLMotionProps, Transition } from "framer-motion";
import {
  Menu as BaseMenu,
  type MenuRootActions,
  type MenuRootChangeEventDetails,
} from "@base-ui-components/react/menu";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

/** framer-motion's legacy `Spring` type drops the "spring" literal, so tokens.springs widens to `string`; re-narrow for `Transition`. */
function spring(transition: (typeof springs)[keyof typeof springs]): Transition {
  return { ...transition, type: "spring" };
}

export type MenuItemType = "item" | "divider" | "label";

export interface MenuItemData {
  type?: MenuItemType;
  label?: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  onClick?: () => void;
}

export type MenuPlacement = "bottom-start" | "bottom-end";

export interface MenuProps {
  /** Clickable element the menu attaches to (cloned with the open handler) */
  trigger: React.ReactNode;
  items: MenuItemData[];
  /** Controlled open state; omit for internal state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: MenuPlacement;
  className?: string;
}

/**
 * M3 Menu — transient surface showing a list of choices on a temporary
 * surface. Anchors to its trigger, springs open from the top origin
 * (fastVisual scale), and closes on item click, outside press, or Escape.
 * Official container: 4dp corners, surface-container, elevation 2, 8dp
 * vertical padding around 48dp items with 24dp leading icons in a 12dp
 * gutter.
 *
 * Built on Base UI's headless Menu: Root owns open state, outside-press +
 * Escape dismissal and focus restore to the trigger; Trigger composes with
 * the rendered trigger element (aria-haspopup/expanded, click and ArrowDown
 * keyboard open — the user's own onClick/onKeyDown still fire); Positioner
 * anchors the popup and handles collision avoidance; Item owns roving
 * focus, typeahead and Enter/Space activation, closing the menu on select.
 * Only the M3 surface visuals and the fastVisual spring are ours.
 */
export function Menu({
  trigger,
  items,
  open,
  onOpenChange,
  placement = "bottom-start",
  className,
}: MenuProps) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = open !== undefined ? open : internalOpen;

  // Keep the menu mounted while the framer-motion exit plays, then unmount.
  const actionsRef = React.useRef<MenuRootActions>({ unmount() {} });

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean, eventDetails: MenuRootChangeEventDetails) => {
      if (!nextOpen) eventDetails.preventUnmountOnClose();
      setOpen(nextOpen);
    },
    [setOpen]
  );

  const panelMotion: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, scale: 0.9, y: -4 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -4 },
    transition: spring(springs.fastVisual),
  };

  return (
    <BaseMenu.Root open={isOpen} onOpenChange={handleOpenChange} actionsRef={actionsRef}>
      <BaseMenu.Trigger
        render={
          React.isValidElement(trigger) ? (
            trigger
          ) : (
            <button type="button" className="inline-flex">
              {trigger}
            </button>
          )
        }
        className={cn("inline-flex focus:outline-none", className)}
      />
      <AnimatePresence onExitComplete={() => actionsRef.current?.unmount()}>
        {isOpen && (
          <BaseMenu.Portal>
            <BaseMenu.Positioner
              side="bottom"
              align={placement === "bottom-end" ? "end" : "start"}
              sideOffset={4}
              className="z-50 outline-none"
            >
              <BaseMenu.Popup
                render={<motion.div {...panelMotion} />}
                className={cn(
                  "min-w-[180px] max-w-[280px] rounded-[4px] bg-m3-surface-container m3-elevation-2 py-2 outline-none"
                )}
              >
                {items.map((item, i) => {
                  const type = item.type ?? "item";
                  if (type === "divider") {
                    return <div key={i} role="separator" className="my-2 h-px bg-m3-outline-variant" />;
                  }
                  if (type === "label") {
                    return (
                      <BaseMenu.GroupLabel
                        key={i}
                        className="md-label-small px-3 pb-1 pt-2 text-m3-on-surface-variant"
                      >
                        {item.label}
                      </BaseMenu.GroupLabel>
                    );
                  }
                  return (
                    <BaseMenu.Item
                      key={i}
                      disabled={item.disabled}
                      onClick={() => item.onClick?.()}
                      className={cn(
                        "m3-state relative flex h-12 w-full cursor-pointer list-none items-center gap-3 px-3 text-left md-body-large outline-none",
                        item.disabled
                          ? "pointer-events-none opacity-38"
                          : item.destructive
                            ? "text-m3-error"
                            : "text-m3-on-surface"
                      )}
                    >
                      <Ripple />
                      {item.icon && (
                        <MaterialSymbol
                          icon={item.icon}
                          size={24}
                          className={cn(!item.destructive && "text-m3-on-surface-variant")}
                        />
                      )}
                      <span className="truncate">{item.label}</span>
                      {item.shortcut && (
                        <span className="md-label-small ml-auto pl-4 text-m3-on-surface-variant">{item.shortcut}</span>
                      )}
                    </BaseMenu.Item>
                  );
                })}
              </BaseMenu.Popup>
            </BaseMenu.Positioner>
          </BaseMenu.Portal>
        )}
      </AnimatePresence>
    </BaseMenu.Root>
  );
}

export { menuMeta } from "@/lib/m3/meta";
