"use client";

import * as React from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
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

/**
 * tokens.ts widens `type` to `string`; framer-motion's Transition union needs
 * the literal "spring". This shim re-pins it while reusing the token values.
 */
function spring(t: Transition): Transition {
  return { ...t, type: "spring" };
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
 * close affordance while the actions spring in one after another.
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

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange]
  );

  const isVertical = direction === "vertical";

  return (
    <div
      ref={ref}
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
              transition={{ ...spring(springs.expressive), delay: i * 0.03 }}
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
              <motion.button
                type="button"
                aria-label={action.label}
                onClick={() => {
                  action.onClick?.();
                  setOpen(false);
                }}
                whileTap={{ scale: 0.96 }}
                transition={spring(springs.fastVisual)}
                className="m3-state relative m3-elevation-1 inline-flex h-8 w-8 select-none items-center justify-center overflow-hidden rounded-full bg-m3-primary-container text-m3-on-primary-container"
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
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close actions menu" : "Open actions menu"}
        onClick={() => setOpen(!isOpen)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.94 }}
        transition={spring(springs.expressive)}
        className={cn(
          "m3-state relative m3-elevation-3 inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-2xl",
          "transition-[background-color,box-shadow] duration-200",
          fabColorStyles[color]
        )}
      >
        <Ripple />
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={spring(springs.expressiveEffects)}
          className="inline-flex"
        >
          <MaterialSymbol icon="edit" size={24} />
        </motion.span>
      </motion.button>
    </div>
  );
});

export { fabMenuMeta } from "@/lib/m3/meta";
