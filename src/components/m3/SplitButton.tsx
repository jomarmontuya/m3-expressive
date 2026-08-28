"use client";

import * as React from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export type SplitButtonVariant = "filled" | "tonal" | "outlined";
export type SplitButtonSize = "sm" | "md" | "lg";

const sizeStyles: Record<SplitButtonSize, { height: number; padding: string; icon: number }> = {
  sm: { height: 40, padding: "0 20px", icon: 20 },
  md: { height: 56, padding: "0 28px", icon: 24 },
  lg: { height: 76, padding: "0 36px", icon: 28 },
};

const variantStyles: Record<SplitButtonVariant, string> = {
  filled: "bg-m3-primary text-m3-on-primary",
  tonal: "bg-m3-secondary-container text-m3-on-secondary-container",
  outlined: "border border-m3-outline bg-transparent text-m3-primary",
};

export interface SplitButtonItem {
  label: string;
  icon?: string;
  onClick?: () => void;
}

/**
 * tokens.ts widens `type` to `string`; framer-motion's Transition union needs
 * the literal "spring". This shim re-pins it while reusing the token values.
 */
function spring(t: Transition): Transition {
  return { ...t, type: "spring" };
}

export interface SplitButtonProps {
  label: string;
  onClick?: () => void;
  items: SplitButtonItem[];
  variant?: SplitButtonVariant;
  size?: SplitButtonSize;
  disabled?: boolean;
  className?: string;
}

/**
 * M3 Expressive Split button — two joined pill segments: the left one fires
 * the default action, the right one opens a dropdown of related actions.
 */
export const SplitButton = React.forwardRef<HTMLDivElement, SplitButtonProps>(function SplitButton(
  { label, onClick, items, variant = "filled", size = "md", disabled = false, className },
  ref
) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const s = sizeStyles[size];

  // Close on outside click + Escape while open
  React.useEffect(() => {
    if (!open) return;
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
  }, [open]);

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  return (
    <div ref={setRefs} className={cn("relative inline-flex", className)}>
      <motion.div
        whileTap={disabled ? undefined : { scale: 0.96 }}
        transition={spring(springs.fastVisual)}
        className={cn(
          "inline-flex items-stretch overflow-hidden rounded-full",
          "transition-colors duration-150",
          variantStyles[variant],
          disabled && "opacity-38 pointer-events-none"
        )}
      >
        {/* Action segment */}
        <button
          type="button"
          disabled={disabled}
          onClick={onClick}
          className={cn(
            "m3-state relative inline-flex select-none items-center justify-center overflow-hidden font-semibold md-label-large",
            "focus-visible:z-10"
          )}
          style={{ height: s.height, padding: s.padding }}
        >
          <Ripple disabled={disabled} />
          {label}
        </button>

        {/* Divider */}
        <div aria-hidden="true" className="w-px self-stretch bg-current opacity-20" />

        {/* Dropdown trigger segment */}
        <button
          type="button"
          disabled={disabled}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label={`More actions for ${label}`}
          onClick={() => setOpen((o) => !o)}
          className="m3-state relative inline-flex w-10 select-none items-center justify-center overflow-hidden"
        >
          <Ripple disabled={disabled} />
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={spring(springs.fastSpatial)}
            className="inline-flex"
          >
            <MaterialSymbol icon="arrow_drop_down" size={s.icon} />
          </motion.span>
        </button>
      </motion.div>

      {/* Dropdown menu (rendered outside the clipped pill) */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, scale: 0.92, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={spring(springs.fastSpatial)}
            style={{ transformOrigin: "top left" }}
            className="m3-elevation-2 absolute left-0 top-full z-20 mt-2 min-w-[220px] overflow-hidden rounded-lg bg-m3-surface-container"
          >
            {items.map((item, i) => (
              <button
                key={`${item.label}-${i}`}
                type="button"
                role="menuitem"
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
                className="m3-state flex w-full items-center gap-3 px-4 py-3 text-left text-m3-on-surface md-label-large"
              >
                {item.icon && (
                  <MaterialSymbol icon={item.icon} size={20} className="text-m3-on-surface-variant" />
                )}
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export { splitButtonMeta } from "@/lib/m3/meta";
