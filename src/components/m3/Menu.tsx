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
 * surface. Anchors to its trigger, springs open from the top-left origin,
 * and closes on item click, outside press, or Escape.
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

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

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

  const originalOnClick = React.isValidElement(trigger)
    ? (trigger.props as { onClick?: React.MouseEventHandler<HTMLElement> }).onClick
    : undefined;
  const handleTriggerClick = (e: React.MouseEvent<HTMLElement>) => {
    originalOnClick?.(e);
    setOpen(!isOpen);
  };

  const triggerNode = React.isValidElement(trigger) ? (
    React.cloneElement(
      trigger as React.ReactElement<{ onClick?: React.MouseEventHandler<HTMLElement> }>,
      { onClick: handleTriggerClick }
    )
  ) : (
    <button type="button" onClick={handleTriggerClick} className="inline-flex">
      {trigger}
    </button>
  );

  return (
    <span ref={rootRef} className={cn("relative inline-flex", className)}>
      {triggerNode}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, scale: 0.9, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={spring(springs.fastVisual)}
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
                  type="button"
                  role="menuitem"
                  disabled={item.disabled}
                  onClick={() => {
                    item.onClick?.();
                    setOpen(false);
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
                      size={20}
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
