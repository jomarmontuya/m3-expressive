"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button as BaseButton } from "@base-ui/react/button";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export type IconButtonVariant = "standard" | "filled" | "tonal" | "outlined";
export type IconButtonSize =
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
export type IconButtonWidth = "narrow" | "standard" | "default" | "wide";
export type IconButtonShape = "round" | "square";

type IconButtonSizeKey = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Official height and default-width scale: 32/40/56/96/136dp. Narrow and
 * wide widths use each size's published horizontal padding tokens.
 */
const sizeStyles: Record<IconButtonSizeKey, { height: number; icon: number; padding: Record<"narrow" | "standard" | "wide", number>; squareRadius: number; pressedRadius: number; outline: number; touchTarget: Record<"narrow" | "standard" | "wide", string> }> = {
  xs: {
    height: 32,
    icon: 20,
    padding: { narrow: 4, standard: 6, wide: 10 },
    squareRadius: 12,
    pressedRadius: 8,
    outline: 1,
    touchTarget: {
      narrow: "before:absolute before:-inset-y-2 before:-inset-x-[10px] before:content-['']",
      standard: "before:absolute before:-inset-2 before:content-['']",
      wide: "before:absolute before:-inset-y-2 before:-inset-x-1 before:content-['']",
    },
  },
  sm: {
    height: 40,
    icon: 24,
    padding: { narrow: 4, standard: 8, wide: 14 },
    squareRadius: 12,
    pressedRadius: 8,
    outline: 1,
    touchTarget: {
      narrow: "before:absolute before:-inset-y-1 before:-inset-x-2 before:content-['']",
      standard: "before:absolute before:-inset-1 before:content-['']",
      wide: "before:absolute before:-inset-y-1 before:left-0 before:right-0 before:content-['']",
    },
  },
  md: { height: 56, icon: 24, padding: { narrow: 12, standard: 16, wide: 24 }, squareRadius: 16, pressedRadius: 12, outline: 1, touchTarget: { narrow: "", standard: "", wide: "" } },
  lg: { height: 96, icon: 32, padding: { narrow: 16, standard: 32, wide: 48 }, squareRadius: 28, pressedRadius: 16, outline: 2, touchTarget: { narrow: "", standard: "", wide: "" } },
  xl: { height: 136, icon: 40, padding: { narrow: 32, standard: 48, wide: 72 }, squareRadius: 28, pressedRadius: 16, outline: 3, touchTarget: { narrow: "", standard: "", wide: "" } },
};

const sizeAliases: Record<IconButtonSize, IconButtonSizeKey> = {
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

const variantStyles: Record<IconButtonVariant, string> = {
  standard: "bg-transparent text-m3-on-surface-variant",
  filled: "bg-m3-primary text-m3-on-primary",
  tonal: "bg-m3-secondary-container text-m3-on-secondary-container",
  outlined: "border-m3-outline-variant bg-transparent text-m3-on-surface-variant",
};

/**
 * Official toggle colors are distinct from the one-shot button colors.
 */
const unselectedStyles: Partial<Record<IconButtonVariant, string>> = {
  filled: "bg-m3-surface-container text-m3-on-surface-variant",
};

const selectedStyles: Record<IconButtonVariant, string> = {
  standard: "text-m3-primary",
  filled: "bg-m3-primary text-m3-on-primary",
  tonal: "bg-m3-secondary text-m3-on-secondary",
  outlined: "border-transparent bg-m3-inverse-surface text-m3-inverse-on-surface",
};

/** Disabled tokens: content on-surface 38%; filled containers use on-surface 10%; outlined border uses 12%. */
const disabledStyles: Record<IconButtonVariant, string> = {
  standard: "text-m3-on-surface/38",
  filled: "bg-m3-on-surface/10 text-m3-on-surface/38",
  tonal: "bg-m3-on-surface/10 text-m3-on-surface/38",
  outlined: "border-m3-on-surface/12 text-m3-on-surface/38",
};

/**
 * Button attributes minus the handlers framer-motion re-defines with its own
 * (motion-specific) signatures — those DOM versions would conflict once they
 * reach the motion element through Base UI's `render` composition.
 */
export interface IconButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onDragStart" | "onDrag" | "onDragEnd"
  > {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** Official narrow, standard, or wide container width. */
  width?: IconButtonWidth;
  /** Round toggles to square when selected; square toggles to round. */
  shape?: IconButtonShape;
  /** Material Symbols ligature name, e.g. "favorite" */
  icon: string;
  /** Enables on/off toggle behavior with a spring pop on selection */
  toggleable?: boolean;
  /** Controlled selected state (requires toggleable) */
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
}

/**
 * M3 Icon button — a compact pressable icon with a state layer and ripple.
 *
 * Layering: Base UI's headless `Button` owns the native <button> semantics,
 * the `type` default and disabled/focus handling (it guards click + pointer
 * events while disabled); the `render` prop composes it with a framer-motion
 * element so WE keep the visuals — press scale spring, M3 state layer and
 * the selected pop. When `toggleable`, the selected state recolors the icon
 * to the primary role (standard/outlined) and pops it in with the expressive
 * spring (`aria-pressed` stays wired for assistive tech).
 */
/** Material 3 icon button for compact actions. @see https://m3.material.io/components/icon-buttons/overview */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    variant = "filled",
    size = "sm",
    width = "standard",
    shape = "round",
    icon,
    toggleable = false,
    selected,
    onSelectedChange,
    disabled,
    className,
    onClick,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
    onPointerLeave,
    onKeyDown,
    onKeyUp,
    onBlur,
    type,
    ...props
  },
  ref
) {
  const s = sizeStyles[sizeAliases[size]];
  const widthKey = width === "default" ? "standard" : width;
  const containerWidth = s.icon + s.padding[widthKey] * 2;
  const [internalSelected, setInternalSelected] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const isSelected = toggleable ? (selected ?? internalSelected) : false;
  const isRound = shape === "round" ? !isSelected : isSelected;
  const restRadius = isRound ? s.height / 2 : s.squareRadius;
  const enabledStyle = toggleable
    ? isSelected
      ? selectedStyles[variant]
      : (unselectedStyles[variant] ?? variantStyles[variant])
    : variantStyles[variant];

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === " " || event.key === "Enter") && !event.repeat) setPressed(true);
    onKeyDown?.(event);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === " " || event.key === "Enter") setPressed(false);
    onKeyUp?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    setPressed(false);
    onBlur?.(event);
  };

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (toggleable) {
        const next = !isSelected;
        if (selected === undefined) setInternalSelected(next);
        onSelectedChange?.(next);
      }
      onClick?.(e);
    },
    [toggleable, isSelected, selected, onSelectedChange, onClick]
  );

  return (
    <BaseButton
      ref={ref}
      type={type ?? "button"}
      disabled={disabled}
      onClick={handleClick}
      aria-label={props["aria-label"] ?? icon.replaceAll("_", " ")}
      aria-pressed={toggleable ? isSelected : undefined}
      data-pressed={pressed || undefined}
      onPointerDown={(event) => {
        setPressed(true);
        onPointerDown?.(event);
      }}
      onPointerUp={(event) => {
        setPressed(false);
        onPointerUp?.(event);
      }}
      onPointerCancel={(event) => {
        setPressed(false);
        onPointerCancel?.(event);
      }}
      onPointerLeave={(event) => {
        setPressed(false);
        onPointerLeave?.(event);
      }}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={handleBlur}
      className={cn(
        "m3-state m3-focus relative inline-flex select-none items-center justify-center",
        "transition-colors duration-150",
        disabled ? disabledStyles[variant] : enabledStyle,
        disabled && "pointer-events-none",
        s.touchTarget[widthKey],
        className
      )}
      style={{ width: containerWidth, height: s.height, borderWidth: variant === "outlined" ? s.outline : undefined }}
      {...props}
      render={
        <motion.button
          animate={{ borderRadius: pressed && !disabled ? s.pressedRadius : restRadius }}
          whileTap={disabled ? undefined : { scale: 0.96 }}
          transition={{ borderRadius: springs.expressiveEffects, scale: springs.fastVisual }}
        >
          <Ripple disabled={disabled} />
          {/* Keyed remount = spring scale pop whenever the selection flips */}
          <motion.span
            key={toggleable && isSelected ? "selected" : "unselected"}
            initial={{ scale: toggleable && isSelected ? 0.6 : 1 }}
            animate={{ scale: 1 }}
            transition={springs.expressiveEffects}
            className="inline-flex"
          >
            <MaterialSymbol
              icon={icon}
              size={s.icon}
              fill={toggleable ? isSelected : variant === "filled"}
            />
          </motion.span>
        </motion.button>
      }
    />
  );
});

export { iconButtonMeta } from "@/lib/m3/meta";
