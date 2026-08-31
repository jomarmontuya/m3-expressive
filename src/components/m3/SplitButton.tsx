"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import {
  Menu as BaseMenu,
  type MenuRootActions,
  type MenuRootChangeEventDetails,
} from "@base-ui/react/menu";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { useTextDirection } from "@/lib/m3/use-text-direction";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export type SplitButtonVariant = "filled" | "tonal" | "outlined" | "elevated";
export type SplitButtonSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "extra-small"
  | "small"
  | "medium"
  | "large"
  | "extra-large";

type SplitButtonSizeKey = "xs" | "sm" | "md" | "lg" | "xl";

const sizeStyles: Record<SplitButtonSizeKey, { height: number; leading: number; trailing: number; trailingPadding: number; icon: number; iconOffset: number; typeClass: string; outline: number; innerRadius: number; pressedInnerRadius: number }> = {
  xs: { height: 32, leading: 12, trailing: 10, trailingPadding: 13, icon: 22, iconOffset: -1, typeClass: "md-label-large", outline: 1, innerRadius: 4, pressedInnerRadius: 8 },
  sm: { height: 40, leading: 16, trailing: 12, trailingPadding: 13, icon: 22, iconOffset: -1, typeClass: "md-label-large", outline: 1, innerRadius: 4, pressedInnerRadius: 12 },
  md: { height: 56, leading: 24, trailing: 24, trailingPadding: 15, icon: 26, iconOffset: -2, typeClass: "md-title-medium", outline: 1, innerRadius: 4, pressedInnerRadius: 12 },
  lg: { height: 96, leading: 48, trailing: 48, trailingPadding: 29, icon: 38, iconOffset: -3, typeClass: "md-headline-small", outline: 2, innerRadius: 8, pressedInnerRadius: 20 },
  xl: { height: 136, leading: 64, trailing: 64, trailingPadding: 43, icon: 50, iconOffset: -6, typeClass: "md-headline-large", outline: 3, innerRadius: 12, pressedInnerRadius: 20 },
};

const sizeAliases: Record<SplitButtonSize, SplitButtonSizeKey> = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "extra-small": "xs",
  small: "sm",
  medium: "md",
  large: "lg",
  "extra-large": "xl",
};

const variantStyles: Record<SplitButtonVariant, string> = {
  filled: "bg-m3-primary text-m3-on-primary",
  tonal: "bg-m3-secondary-container text-m3-on-secondary-container",
  outlined: "border-m3-outline-variant bg-transparent text-m3-on-surface-variant",
  elevated:
    "m3-elevation-1 bg-m3-surface-container-low text-m3-primary hover:[box-shadow:0_1px_2px_0_rgb(0_0_0/0.30),0_2px_6px_2px_rgb(0_0_0/0.15)]",
};

/** Disabled tokens mirror the button family: container on-surface 12%, content 38%; outlined border 12%. */
const disabledStyles: Record<SplitButtonVariant, string> = {
  filled: "bg-m3-on-surface/12 text-m3-on-surface/38",
  tonal: "bg-m3-on-surface/12 text-m3-on-surface/38",
  outlined: "border-m3-on-surface/12 text-m3-on-surface/38",
  elevated: "bg-m3-on-surface/10 text-m3-on-surface-variant/38 shadow-none!",
};

export interface SplitButtonItem {
  label: string;
  icon?: string;
  onClick?: () => void;
}

export interface SplitButtonProps {
  /** Visible leading label. Omit for the official icon-only leading segment. */
  label?: string;
  /** Optional leading Material Symbol. */
  icon?: string;
  /** Required accessible name when the leading segment is icon-only. */
  ariaLabel?: string;
  onClick?: () => void;
  items: SplitButtonItem[];
  variant?: SplitButtonVariant;
  size?: SplitButtonSize;
  disabled?: boolean;
  className?: string;
}

/**
 * M3 Expressive Split button — two joined pill segments: the start one fires
 * the default action, the end one opens a dropdown of related actions.
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
/** Material 3 Expressive split button for default and related actions. @see https://m3.material.io/components/split-button/overview */
export const SplitButton = React.forwardRef<HTMLDivElement, SplitButtonProps>(function SplitButton(
  { label, icon, ariaLabel, onClick, items, variant = "filled", size = "sm", disabled = false, className },
  ref
) {
  const [open, setOpen] = React.useState(false);
  const [actionPressed, setActionPressed] = React.useState(false);
  const [triggerPressed, setTriggerPressed] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const direction = useTextDirection(rootRef);
  const s = sizeStyles[sizeAliases[size]];
  const segmentStyle = disabled ? disabledStyles[variant] : variantStyles[variant];
  const actionInnerRadius = actionPressed ? s.pressedInnerRadius : s.innerRadius;
  const triggerInnerRadius = triggerPressed
    ? s.pressedInnerRadius
    : open ? s.height / 2 : s.innerRadius;

  // Keep the menu mounted while the framer-motion exit plays, then unmount.
  const actionsRef = React.useRef<MenuRootActions>({ unmount() {}, close() {} });
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
    style: { transformOrigin: direction === "rtl" ? "top right" : "top left" },
  };

  return (
    <DirectionProvider direction={direction}>
      <BaseMenu.Root open={open} onOpenChange={handleOpenChange} actionsRef={actionsRef} disabled={disabled}>
      <div ref={(node) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }} className={cn("relative inline-flex items-stretch gap-0.5", disabled && "pointer-events-none", className)}>
          {/* Action segment */}
          <motion.button
            initial={false}
            type="button"
            aria-label={ariaLabel ?? label ?? icon?.replaceAll("_", " ") ?? "Primary action"}
            disabled={disabled}
            onClick={onClick}
            data-pressed={actionPressed || undefined}
            onPointerDown={() => setActionPressed(true)}
            onPointerUp={() => setActionPressed(false)}
            onPointerCancel={() => setActionPressed(false)}
            onPointerLeave={() => setActionPressed(false)}
            onKeyDown={(event) => {
              if ((event.key === " " || event.key === "Enter") && !event.repeat) setActionPressed(true);
            }}
            onKeyUp={(event) => {
              if (event.key === " " || event.key === "Enter") setActionPressed(false);
            }}
            onBlur={() => setActionPressed(false)}
            animate={{
              borderTopLeftRadius: direction === "rtl" ? actionInnerRadius : s.height / 2,
              borderBottomLeftRadius: direction === "rtl" ? actionInnerRadius : s.height / 2,
              borderTopRightRadius: direction === "rtl" ? s.height / 2 : actionInnerRadius,
              borderBottomRightRadius: direction === "rtl" ? s.height / 2 : actionInnerRadius,
            }}
            whileTap={disabled ? undefined : { scale: 0.96 }}
            transition={{ borderRadius: springs.expressiveEffects, scale: springs.fastVisual }}
            className={cn(
              "m3-state m3-focus relative inline-flex select-none items-center justify-center gap-2 transition-colors duration-150 focus-visible:z-10",
              s.typeClass,
              s.height < 48 && cn(
                "before:absolute before:[inset-inline:0] before:content-['']",
                s.height === 32 ? "before:-inset-y-2" : "before:-inset-y-1"
              ),
              segmentStyle
            )}
            style={{
              height: s.height,
              minWidth: label ? 48 : Math.max(48, s.height),
              paddingInlineStart: label ? s.leading : s.trailingPadding,
              paddingInlineEnd: label ? s.trailing : s.trailingPadding,
              borderWidth: variant === "outlined" ? s.outline : undefined,
            }}
          >
            <Ripple disabled={disabled} />
            {icon && <MaterialSymbol icon={icon} size={Math.min(s.icon, 40)} />}
            {label && <span>{label}</span>}
          </motion.button>

          {/* Dropdown trigger segment — Base UI owns the menu semantics */}
          <BaseMenu.Trigger
            disabled={disabled}
            aria-label={`More actions for ${ariaLabel ?? label ?? icon?.replaceAll("_", " ") ?? "primary action"}`}
            data-pressed={triggerPressed || open || undefined}
            onPointerDown={() => setTriggerPressed(true)}
            onPointerUp={() => setTriggerPressed(false)}
            onPointerCancel={() => setTriggerPressed(false)}
            onPointerLeave={() => setTriggerPressed(false)}
            onKeyDown={(event) => {
              if ((event.key === " " || event.key === "Enter") && !event.repeat) setTriggerPressed(true);
            }}
            onKeyUp={(event) => {
              if (event.key === " " || event.key === "Enter") setTriggerPressed(false);
            }}
            onBlur={() => setTriggerPressed(false)}
            className={cn(
              "m3-state m3-focus relative inline-flex cursor-pointer select-none items-center justify-center outline-none transition-colors duration-150 focus-visible:z-10",
              s.height < 48 && cn(
                "before:absolute before:[inset-inline:0] before:content-['']",
                s.height === 32 ? "before:-inset-y-2" : "before:-inset-y-1"
              ),
              segmentStyle
            )}
            style={{
              width: s.icon + s.trailingPadding * 2,
              height: s.height,
              paddingInline: s.trailingPadding,
              borderWidth: variant === "outlined" ? s.outline : undefined,
            }}
            render={
              <motion.button
                initial={false}
                animate={{
                  borderTopLeftRadius: direction === "rtl" ? s.height / 2 : triggerInnerRadius,
                  borderBottomLeftRadius: direction === "rtl" ? s.height / 2 : triggerInnerRadius,
                  borderTopRightRadius: direction === "rtl" ? triggerInnerRadius : s.height / 2,
                  borderBottomRightRadius: direction === "rtl" ? triggerInnerRadius : s.height / 2,
                }}
                whileTap={disabled ? undefined : { scale: 0.96 }}
                transition={{ borderRadius: springs.expressiveEffects, scale: springs.fastVisual }}
              />
            }
          >
            <Ripple disabled={disabled} />
            <motion.span
              animate={{ rotate: open ? 180 : 0, x: direction === "rtl" ? -s.iconOffset : s.iconOffset }}
              transition={springs.fastSpatial}
              className="inline-flex"
            >
              <MaterialSymbol icon="arrow_drop_down" size={s.icon} />
            </motion.span>
          </BaseMenu.Trigger>

        {/* Dropdown menu (rendered outside the clipped pill) */}
        <AnimatePresence onExitComplete={() => actionsRef.current?.unmount()}>
          {open && (
            <BaseMenu.Portal>
              <BaseMenu.Positioner side="bottom" align="start" sideOffset={8} className="z-20 outline-none">
                <BaseMenu.Popup aria-label={`${ariaLabel ?? label ?? "Primary"} actions`} dir={direction}
                  render={<motion.div {...popupMotion} />}
                  className="m3-elevation-2 min-w-[220px] overflow-hidden rounded-[4px] bg-m3-surface-container py-2 outline-none"
                >
                  {items.map((item, i) => (
                    <BaseMenu.Item
                      key={`${item.label}-${i}`}
                      onClick={() => item.onClick?.()}
                      className="m3-state m3-focus flex min-h-12 w-full cursor-pointer list-none items-center gap-3 px-4 py-2 text-start text-m3-on-surface outline-none md-label-large"
                    >
                      {item.icon && (
                        <MaterialSymbol icon={item.icon} size={24} className="text-m3-on-surface-variant" />
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
    </DirectionProvider>
  );
});
