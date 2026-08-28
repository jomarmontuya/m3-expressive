"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, durations } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";
import { fabColorStyles, type FabColor } from "./FAB";

export interface FabMenuAction {
  /** Material Symbols ligature name for the action FAB */
  icon: string;
  /** Optional label shown as a tooltip-style chip next to the action FAB */
  label?: string;
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
}

/**
 * M3 Expressive FabMenu — a small FAB that expands into a staggered row or
 * column of related action FABs. The main 'edit' icon rotates 45° into a
 * close affordance while the actions spring in one after another
 * (50ms stagger = durations.short1 token). Dismisses on Escape and
 * outside-pointerdown like any transient menu surface.
 */
export const FabMenu = React.forwardRef<HTMLDivElement, FabMenuProps>(function FabMenu(
  {
    actions,
    direction = "vertical",
    color = "primary",
    open,
    onOpenChange,
    className,
    ...props
  },
  ref
) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = open ?? internalOpen;
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange]
  );

  /** Menu-like dismissal: Escape and outside pointerdown close the menu. */
  React.useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, setOpen]);

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  const isVertical = direction === "vertical";

  return (
    <div
      ref={setRefs}
      className={cn(
        "relative inline-flex gap-3",
        isVertical ? "flex-col items-end" : "flex-row items-center",
        className
      )}
      {...props}
    >
      <AnimatePresence>
        {isOpen &&
          actions.map((action, i) => (
            <motion.div
              key={`${action.icon}-${i}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ ...springs.expressive, delay: (i * durations.short1) / 1000 }}
              className={cn(
                "inline-flex items-center gap-3",
                isVertical ? "flex-row" : "flex-col"
              )}
            >
              {action.label && (
                <span className="rounded bg-m3-inverse-surface px-2 py-0.5 md-label-medium text-m3-inverse-on-surface">
                  {action.label}
                </span>
              )}
              {/* 32dp action FAB — ::before extends the 32px hit area to 48dp */}
              <motion.button
                type="button"
                aria-label={action.label}
                onClick={() => {
                  action.onClick?.();
                  setOpen(false);
                }}
                whileTap={{ scale: 0.96 }}
                transition={springs.fastVisual}
                className="m3-state m3-focus relative m3-elevation-1 inline-flex h-8 w-8 select-none items-center justify-center rounded-full bg-m3-primary-container text-m3-on-primary-container before:absolute before:-inset-2 before:content-['']"
              >
                <Ripple />
                <MaterialSymbol icon={action.icon} size={18} />
              </motion.button>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Main FAB — icon morphs edit → close */}
      <motion.button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close actions menu" : "Open actions menu"}
        onClick={() => setOpen(!isOpen)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.94 }}
        transition={springs.expressive}
        className={cn(
          "m3-state m3-focus relative m3-elevation-3 inline-flex h-10 w-10 select-none items-center justify-center rounded-2xl",
          "transition-[background-color,box-shadow] duration-200",
          "before:absolute before:-inset-1 before:content-['']",
          fabColorStyles[color]
        )}
      >
        <Ripple />
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={springs.expressiveEffects}
          className="inline-flex"
        >
          <MaterialSymbol icon="edit" size={24} />
        </motion.span>
      </motion.button>
    </div>
  );
});

export { fabMenuMeta } from "@/lib/m3/meta";
