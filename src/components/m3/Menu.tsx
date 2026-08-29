'use client';
/* eslint-disable max-lines -- standard, segmented, and recursive submenu renderers share one public data model */

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { HTMLMotionProps, Transition } from "framer-motion";
import {
  Menu as BaseMenu,
  type MenuRootActions,
  type MenuRootChangeEventDetails,
} from "@base-ui/react/menu";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { useTextDirection, type TextDirection } from "@/lib/m3/use-text-direction";
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
  /** Optional trailing Material Symbol. */
  trailingIcon?: string;
  /** Optional numeric or short-text badge in the trailing slot. */
  badge?: string | number;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  /** Controlled selected or checked state for M3E selectable menu items. */
  selected?: boolean;
  /** Optional icon shown instead of icon while selected. */
  selectedIcon?: string;
  /** Optional second line used by expressive menu items. */
  supportingText?: string;
  /** Selectable semantics. */
  role?: "menuitem" | "menuitemcheckbox" | "menuitemradio";
  /** Keep the popup open after activation, useful for checkable items. */
  closeOnClick?: boolean;
  /** Nested choices shown in a motion-enabled cascading submenu. */
  submenu?: MenuItemData[];
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
  /** segmented is the current M3E menu; standard keeps the baseline M3 list. */
  variant?: "segmented" | "standard";
  /** Vibrant menus use the tertiary color family and should be used sparingly. */
  color?: "standard" | "vibrant";
  className?: string;
}

function MenuRowContent({
  item,
  isSegmented,
  color,
  hasSubmenu = false,
  direction,
}: {
  item: MenuItemData;
  isSegmented: boolean;
  color: "standard" | "vibrant";
  hasSubmenu?: boolean;
  direction: TextDirection;
}) {
  const resolvedIcon = item.selected && item.selectedIcon ? item.selectedIcon : item.icon;
  return (
    <>
      <Ripple />
      {resolvedIcon && (
        <MaterialSymbol
          icon={resolvedIcon}
          size={isSegmented ? 20 : 24}
          fill={item.selected}
          className={cn(
            !item.destructive && !item.selected && "text-m3-on-surface-variant",
            item.selected && color === "standard" && "text-m3-on-tertiary-container",
            item.selected && color === "vibrant" && "text-m3-on-tertiary"
          )}
        />
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate">{item.label}</span>
        {item.supportingText && (
          <span className="block truncate md-body-medium opacity-80">{item.supportingText}</span>
        )}
      </span>
      {item.badge !== undefined && (
        <span className="md-label-small ms-auto flex min-h-5 min-w-5 items-center justify-center rounded-full bg-m3-error px-1 text-m3-on-error">
          {item.badge}
        </span>
      )}
      {item.trailingIcon && <MaterialSymbol icon={item.trailingIcon} size={20} />}
      {item.shortcut && (
        <span className="md-label-small ms-auto ps-4 text-m3-on-surface-variant">{item.shortcut}</span>
      )}
      {hasSubmenu && (
        <MaterialSymbol
          icon={direction === "rtl" ? "chevron_left" : "chevron_right"}
          size={20}
          className="text-m3-on-surface-variant"
        />
      )}
    </>
  );
}

function MenuItems({
  items,
  isSegmented,
  color,
  direction,
}: {
  items: MenuItemData[];
  isSegmented: boolean;
  color: "standard" | "vibrant";
  direction: TextDirection;
}) {
  const interactiveIndexes = items.flatMap((item, index) => (item.type ?? "item") === "item" ? [index] : []);
  const firstItem = interactiveIndexes[0];
  const lastItem = interactiveIndexes.at(-1);
  const itemClass = (item: MenuItemData, i: number) => cn(
    "m3-state relative flex w-full cursor-pointer list-none items-center text-start md-body-large outline-none focus-visible:outline-[3px] focus-visible:outline-m3-secondary focus-visible:outline-offset-2",
    isSegmented
      ? cn(
          "min-h-11 gap-3 px-4 py-2",
          (i === firstItem || (items[i - 1]?.type ?? "item") !== "item") && "rounded-t-xl",
          (i === lastItem || (items[i + 1]?.type ?? "item") !== "item") && "rounded-b-xl",
          i !== firstItem && (items[i - 1]?.type ?? "item") === "item" && "rounded-t-[4px]",
          i !== lastItem && (items[i + 1]?.type ?? "item") === "item" && "rounded-b-[4px]",
          i !== lastItem && (items[i + 1]?.type ?? "item") === "item" && "mb-0.5",
          color === "standard" ? "bg-m3-surface-container-low" : "bg-m3-tertiary-container",
          item.selected && "rounded-xl",
          item.selected && (color === "standard" ? "bg-m3-tertiary-container text-m3-on-tertiary-container" : "bg-m3-tertiary text-m3-on-tertiary")
        )
      : "h-12 gap-3 px-3",
    item.disabled
      ? "pointer-events-none opacity-38"
      : item.destructive
        ? "text-m3-error"
        : "text-m3-on-surface"
  );

  return items.map((item, i) => {
    const type = item.type ?? "item";
    if (type === "divider") {
      return <div key={i} role="separator" className="my-2 h-px bg-m3-outline-variant" />;
    }
    if (type === "label") {
      return (
        <BaseMenu.Group key={i}>
          <BaseMenu.GroupLabel className="md-label-small px-3 pb-1 pt-2 text-m3-on-surface-variant">
            {item.label}
          </BaseMenu.GroupLabel>
        </BaseMenu.Group>
      );
    }
    if (item.submenu?.length) {
      return (
        <BaseMenu.SubmenuRoot key={i}>
          <BaseMenu.SubmenuTrigger disabled={item.disabled} className={itemClass(item, i)}>
            <MenuRowContent item={item} isSegmented={isSegmented} color={color} hasSubmenu direction={direction} />
          </BaseMenu.SubmenuTrigger>
          <BaseMenu.Portal>
            <BaseMenu.Positioner side="inline-end" align="start" sideOffset={4} alignOffset={-4} className="z-[51] outline-none">
              <BaseMenu.Popup
                dir={direction}
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94, x: direction === "rtl" ? 6 : -6 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={spring(springs.fastSpatial)}
                  />
                }
                className={cn(
                  "max-w-[280px] bg-m3-surface-container m3-elevation-2 outline-none",
                  isSegmented ? "min-w-[180px] rounded-[4px] p-1" : "min-w-[112px] rounded-[4px] py-2"
                )}
              >
                <MenuItems items={item.submenu} isSegmented={isSegmented} color={color} direction={direction} />
              </BaseMenu.Popup>
            </BaseMenu.Positioner>
          </BaseMenu.Portal>
        </BaseMenu.SubmenuRoot>
      );
    }
    return (
      <BaseMenu.Item
        key={i}
        disabled={item.disabled}
        role={item.role ?? "menuitem"}
        aria-checked={item.role && item.role !== "menuitem" ? Boolean(item.selected) : undefined}
        closeOnClick={item.closeOnClick}
        onClick={() => item.onClick?.()}
        className={itemClass(item, i)}
      >
        <MenuRowContent item={item} isSegmented={isSegmented} color={color} direction={direction} />
      </BaseMenu.Item>
    );
  });
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
/** Material 3 menu for contextual choices. @see https://m3.material.io/components/menus/overview */
export const Menu = React.forwardRef<HTMLButtonElement, MenuProps>(function Menu({
  trigger,
  items,
  open,
  onOpenChange,
  placement = "bottom-start",
  variant = "segmented",
  color = "standard",
  className,
}: MenuProps, ref) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = open !== undefined ? open : internalOpen;
  const isSegmented = variant === "segmented";
  const directionRootRef = React.useRef<HTMLSpanElement>(null);
  const direction = useTextDirection(directionRootRef);

  // Keep the menu mounted while the framer-motion exit plays, then unmount.
  const actionsRef = React.useRef<MenuRootActions>({ unmount() {}, close() {} });

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
    <span ref={directionRootRef} className="contents">
      <DirectionProvider direction={direction}>
        <BaseMenu.Root open={isOpen} onOpenChange={handleOpenChange} actionsRef={actionsRef}>
      <BaseMenu.Trigger
        ref={ref}
        render={
          React.isValidElement(trigger) ? (
            trigger
          ) : (
            <button type="button" className="inline-flex">
              {trigger}
            </button>
          )
        }
        className={cn(
          "inline-flex focus:outline-none focus-visible:outline-[3px] focus-visible:outline-m3-secondary focus-visible:outline-offset-2",
          className
        )}
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
                dir={direction}
                render={<motion.div {...panelMotion} />}
                className={cn(
                  "max-w-[280px] bg-m3-surface-container m3-elevation-2 outline-none",
                  isSegmented ? "min-w-[180px] rounded-[4px] p-1" : "min-w-[112px] rounded-[4px] py-2"
                )}
              >
                <MenuItems items={items} isSegmented={isSegmented} color={color} direction={direction} />
              </BaseMenu.Popup>
            </BaseMenu.Positioner>
          </BaseMenu.Portal>
        )}
      </AnimatePresence>
        </BaseMenu.Root>
      </DirectionProvider>
    </span>
  );
});

Menu.displayName = "Menu";

export { menuMeta } from "@/lib/m3/meta";
