"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, durations, shapes } from "@/lib/m3/tokens";
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
 * M3 Expressive FabMenu — a small FAB that expands into a staggered row or
 * column of related action FABs. The main 'edit' icon rotates 45° into a
 * close affordance while the actions spring in one after another
 * (50ms stagger = durations.short1 token). Dismisses on Escape and
 * outside-pointerdown like any transient menu surface.
 *
 * Docked (`docked`): the closed FAB is flush at the bottom-center of its
 * positioning context; when open its bottom corners square off (shape morph
 * from the shape tokens on springs.expressiveEffects) and the actions cascade
 * above it — see `dockedTo` for the screen vs bottom-app-bar targets. The
 * anchor uses `right: calc(50% - 20px)` so the widening cascade never shifts
 * the FAB horizontally.
 */
export const FabMenu = React.forwardRef<HTMLDivElement, FabMenuProps>(function FabMenu(
  {
    actions,
    direction = "vertical",
    color = "primary",
    open,
    onOpenChange,
    docked = false,
    dockedTo = "screen",
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

  const isDocked = docked === true;
  const docksToScreen = isDocked && dockedTo === "screen";
  /** Docking fixes the cascade axis: screen = vertical above, bar = horizontal row. */
  const verticalCascade = isDocked ? docksToScreen : isVertical;
  /** Shape-morph radii from the shape tokens — bottom corners square off when docked + open. */
  const shapeRest = `${shapes.large} ${shapes.large} ${shapes.large} ${shapes.large}`;
  const shapeDockedOpen = `${shapes.large} ${shapes.large} ${shapes.none} ${shapes.none}`;

  return (
    <div
      ref={setRefs}
      className={cn(
        isDocked
          ? cn(
              // Anchor by the right edge, 20px (half the 40dp FAB) right of
              // center, so the widening cascade grows away from the FAB.
              "bottom-0 right-[calc(50%_-_20px)] z-50 flex gap-3",
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
                verticalCascade ? "flex-row" : "flex-col"
              )}
            >
              {action.label && (
                <span className="whitespace-nowrap rounded bg-m3-inverse-surface px-2 py-0.5 md-label-medium text-m3-inverse-on-surface">
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
        animate={
          isDocked
            ? {
                // M3E shape morph: bottom corners square off to connect the
                // open menu to the edge/bar (BottomAppBar FAB morph pattern).
                borderRadius: isOpen ? shapeDockedOpen : shapeRest,
                transition: springs.expressiveEffects,
              }
            : undefined
        }
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
