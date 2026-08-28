"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import {
  Menu as BaseMenu,
  type MenuRootActions,
  type MenuRootChangeEventDetails,
} from "@base-ui-components/react/menu";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export type SplitButtonVariant = "filled" | "tonal" | "outlined";
export type SplitButtonSize = "sm" | "md" | "lg";

const sizeStyles: Record<SplitButtonSize, { height: number; padding: string; icon: number }> = {
  sm: { height: 40, padding: "0 20px", icon: 20 },
  md: { height: 56, padding: "0 24px", icon: 24 },
  lg: { height: 76, padding: "0 32px", icon: 28 },
};

const variantStyles: Record<SplitButtonVariant, string> = {
  filled: "bg-m3-primary text-m3-on-primary",
  tonal: "bg-m3-secondary-container text-m3-on-secondary-container",
  outlined: "border border-m3-outline bg-transparent text-m3-primary",
};

/** Disabled tokens mirror the button family: container on-surface 12%, content 38%; outlined border 12%. */
const disabledStyles: Record<SplitButtonVariant, string> = {
  filled: "bg-m3-on-surface/12 text-m3-on-surface/38",
  tonal: "bg-m3-on-surface/12 text-m3-on-surface/38",
  outlined: "border border-m3-on-surface/12 text-m3-on-surface/38",
};

export interface SplitButtonItem {
  label: string;
  icon?: string;
  onClick?: () => void;
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
 * The menu is a standard M3 menu surface: 4dp corners, elevation 2,
 * 48dp menu items.
 *
 * Built on Base UI's headless Menu: the dropdown segment is a Menu.Trigger
 * (aria-haspopup/expanded + ArrowDown keyboard open), and the popup owns
 * roving focus, Arrow/Home/End navigation, typeahead, outside-press and
 * Escape dismissal with focus restore. The joined pill, press squash and
 * rotating chevron stay ours. The menu is kept mounted while the exit
 * spring plays (`preventUnmountOnClose` + `actionsRef.unmount`).
 */
export const SplitButton = React.forwardRef<HTMLDivElement, SplitButtonProps>(function SplitButton(
  { label, onClick, items, variant = "filled", size = "md", disabled = false, className },
  ref
) {
  const [open, setOpen] = React.useState(false);
  const s = sizeStyles[size];

  // Keep the menu mounted while the framer-motion exit plays, then unmount.
  const actionsRef = React.useRef<MenuRootActions>({ unmount() {} });
  const handleOpenChange = React.useCallback(
    (nextOpen: boolean, eventDetails: MenuRootChangeEventDetails) => {
      if (!nextOpen) eventDetails.preventUnmountOnClose();
      setOpen(nextOpen);
    },
    []
  );

  const popupMotion: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, scale: 0.92, y: -6 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -6 },
    transition: springs.fastSpatial,
    style: { transformOrigin: "top left" },
  };

  return (
    <BaseMenu.Root open={open} onOpenChange={handleOpenChange} actionsRef={actionsRef} disabled={disabled}>
      <div ref={ref} className={cn("relative inline-flex", className)}>
        <motion.div
          whileTap={disabled ? undefined : { scale: 0.96 }}
          transition={springs.fastVisual}
          className={cn(
            "inline-flex items-stretch rounded-full",
            "transition-colors duration-150",
            disabled ? disabledStyles[variant] : variantStyles[variant],
            disabled && "pointer-events-none"
          )}
        >
          {/* Action segment */}
          <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={cn(
              "m3-state m3-focus relative inline-flex select-none items-center justify-center rounded-l-full md-label-large",
              "focus-visible:z-10"
            )}
            style={{ height: s.height, padding: s.padding }}
          >
            <Ripple disabled={disabled} />
            {label}
          </button>

          {/* Divider */}
          <div aria-hidden="true" className="w-px self-stretch bg-current opacity-20" />

          {/* Dropdown trigger segment — Base UI owns the menu semantics */}
          <BaseMenu.Trigger
            disabled={disabled}
            aria-label={`More actions for ${label}`}
            className="m3-state m3-focus relative inline-flex w-10 cursor-pointer select-none items-center justify-center rounded-r-full outline-none focus-visible:z-10"
          >
            <Ripple disabled={disabled} />
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={springs.fastSpatial}
              className="inline-flex"
            >
              <MaterialSymbol icon="arrow_drop_down" size={s.icon} />
            </motion.span>
          </BaseMenu.Trigger>
        </motion.div>

        {/* Dropdown menu (rendered outside the clipped pill) */}
        <AnimatePresence onExitComplete={() => actionsRef.current?.unmount()}>
          {open && (
            <BaseMenu.Portal>
              <BaseMenu.Positioner side="bottom" align="start" sideOffset={8} className="z-20 outline-none">
                <BaseMenu.Popup
                  aria-label={`${label} actions`}
                  render={<motion.div {...popupMotion} />}
                  className="m3-elevation-2 min-w-[220px] overflow-hidden rounded-[4px] bg-m3-surface-container py-2 outline-none"
                >
                  {items.map((item, i) => (
                    <BaseMenu.Item
                      key={`${item.label}-${i}`}
                      onClick={() => item.onClick?.()}
                      className="m3-state m3-focus flex min-h-12 w-full cursor-pointer list-none items-center gap-3 px-4 py-2 text-left text-m3-on-surface outline-none md-label-large"
                    >
                      {item.icon && (
                        <MaterialSymbol icon={item.icon} size={20} className="text-m3-on-surface-variant" />
                      )}
                      {item.label}
                    </BaseMenu.Item>
                  ))}
                </BaseMenu.Popup>
              </BaseMenu.Positioner>
            </BaseMenu.Portal>
          )}
        </AnimatePresence>
      </div>
    </BaseMenu.Root>
  );
});

export { splitButtonMeta } from "@/lib/m3/meta";
