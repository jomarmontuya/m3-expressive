'use client';

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
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
 * gutter. ARIA: role=menu/menuitem on the panel with aria-haspopup/expanded
 * on the trigger; ArrowUp/Down/Home/End move focus, Escape/Tab close and
 * return focus to the trigger.
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
  const rootRef = React.useRef<HTMLSpanElement>(null);
  const triggerAreaRef = React.useRef<HTMLSpanElement>(null);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  /** Indices of focusable (non-divider, non-label, enabled) items. */
  const getEnabledIndexes = React.useCallback(() => {
    const idxs: number[] = [];
    items.forEach((item, index) => {
      if ((item.type ?? "item") === "item" && !item.disabled) idxs.push(index);
    });
    return idxs;
  }, [items]);

  const focusItemAt = React.useCallback(
    (pos: number) => {
      const idxs = getEnabledIndexes();
      if (idxs.length === 0) return;
      const wrapped = ((pos % idxs.length) + idxs.length) % idxs.length;
      itemRefs.current[idxs[wrapped]]?.focus();
    },
    [getEnabledIndexes]
  );

  const restoreTriggerFocus = React.useCallback(() => {
    const area = triggerAreaRef.current;
    if (!area) return;
    const target = area.querySelector<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    (target ?? area).focus();
  }, []);

  /* Outside press + Escape close. */
  React.useEffect(() => {
    if (!isOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, setOpen]);

  /* On open, move focus to the first enabled item (WAI-ARIA menu pattern). */
  React.useEffect(() => {
    if (!isOpen) return;
    const raf = requestAnimationFrame(() => focusItemAt(0));
    return () => cancelAnimationFrame(raf);
  }, [isOpen, focusItemAt]);

  const onPanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const idxs = getEnabledIndexes();
    const count = idxs.length;
    const active = document.activeElement;
    const pos = idxs.findIndex((idx) => itemRefs.current[idx] === active);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusItemAt(pos < 0 ? 0 : pos + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusItemAt(pos < 0 ? count - 1 : pos - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusItemAt(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusItemAt(count - 1);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      restoreTriggerFocus();
    } else if (e.key === "Tab") {
      // Let focus leave naturally; the menu closes with it.
      setOpen(false);
    }
  };

  const originalOnClick = React.isValidElement(trigger)
    ? (trigger.props as { onClick?: React.MouseEventHandler<HTMLElement> }).onClick
    : undefined;
  const originalOnKeyDown = React.isValidElement(trigger)
    ? (trigger.props as { onKeyDown?: React.KeyboardEventHandler<HTMLElement> }).onKeyDown
    : undefined;

  const handleTriggerClick = (e: React.MouseEvent<HTMLElement>) => {
    originalOnClick?.(e);
    setOpen(!isOpen);
  };
  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    originalOnKeyDown?.(e);
    if (!e.defaultPrevented && e.key === "ArrowDown" && !isOpen) {
      e.preventDefault();
      setOpen(true);
    }
  };

  const triggerAriaProps = {
    "aria-haspopup": "menu" as const,
    "aria-expanded": isOpen,
  };

  const triggerNode = React.isValidElement(trigger) ? (
    React.cloneElement(
      trigger as React.ReactElement<{
        onClick?: React.MouseEventHandler<HTMLElement>;
        onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
        "aria-haspopup"?: "menu";
        "aria-expanded"?: boolean;
      }>,
      {
        onClick: handleTriggerClick,
        onKeyDown: handleTriggerKeyDown,
        ...triggerAriaProps,
      }
    )
  ) : (
    <button type="button" onClick={handleTriggerClick} onKeyDown={handleTriggerKeyDown} {...triggerAriaProps} className="inline-flex">
      {trigger}
    </button>
  );

  return (
    <span ref={rootRef} className={cn("relative inline-flex", className)}>
      <span ref={triggerAreaRef} tabIndex={-1} className="inline-flex focus:outline-none">
        {triggerNode}
      </span>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            aria-orientation="vertical"
            initial={{ opacity: 0, scale: 0.9, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={spring(springs.fastVisual)}
            onKeyDown={onPanelKeyDown}
            style={{ transformOrigin: placement === "bottom-end" ? "top right" : "top left" }}
            className={cn(
              "absolute top-full z-50 mt-1 min-w-[180px] max-w-[280px] rounded-[4px] bg-m3-surface-container m3-elevation-2 py-2",
              placement === "bottom-start" ? "left-0" : "right-0"
            )}
          >
            {items.map((item, i) => {
              const type = item.type ?? "item";
              if (type === "divider") {
                return <div key={i} role="separator" className="my-2 h-px bg-m3-outline-variant" />;
              }
              if (type === "label") {
                return (
                  <div key={i} className="md-label-small px-3 pb-1 pt-2 text-m3-on-surface-variant">
                    {item.label}
                  </div>
                );
              }
              return (
                <button
                  key={i}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  role="menuitem"
                  tabIndex={-1}
                  disabled={item.disabled}
                  onClick={() => {
                    item.onClick?.();
                    setOpen(false);
                    restoreTriggerFocus();
                  }}
                  className={cn(
                    "m3-state relative flex h-12 w-full items-center gap-3 px-3 text-left md-body-large",
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
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

export { menuMeta } from "@/lib/m3/meta";
