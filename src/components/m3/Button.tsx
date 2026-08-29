"use client";
/* eslint-disable max-lines -- size, toggle, loading, and motion contracts share one button implementation */

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button as BaseButton } from "@base-ui/react/button";
import { cn } from "@/lib/utils";
import { springs, durations } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export type ButtonVariant = "filled" | "tonal" | "outlined" | "text" | "elevated";
export type ButtonSize =
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
export type ButtonShape = "round" | "square" | "full" | "large" | "medium" | "small";

type ButtonSizeKey = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Official M3 Expressive scale. The large sizes intentionally jump from 56dp
 * to 96dp and 136dp. Pressed corners are 8/8/12/16/16dp.
 */
const sizeStyles: Record<ButtonSizeKey, { height: number; padding: number; typeClass: string; iconSize: number; gap: number; pressedRadius: number; squareRadius: number; outline: number; touchTarget: string }> = {
  xs: { height: 32, padding: 12, typeClass: "md-label-large", iconSize: 20, gap: 8, pressedRadius: 8, squareRadius: 12, outline: 1, touchTarget: "before:absolute before:-inset-y-2 before:content-['']" },
  sm: { height: 40, padding: 16, typeClass: "md-label-large", iconSize: 20, gap: 8, pressedRadius: 8, squareRadius: 12, outline: 1, touchTarget: "before:absolute before:-inset-y-1 before:content-['']" },
  md: { height: 56, padding: 24, typeClass: "md-title-medium", iconSize: 24, gap: 8, pressedRadius: 12, squareRadius: 16, outline: 1, touchTarget: "" },
  lg: { height: 96, padding: 48, typeClass: "md-headline-small", iconSize: 32, gap: 12, pressedRadius: 16, squareRadius: 28, outline: 2, touchTarget: "" },
  xl: { height: 136, padding: 64, typeClass: "md-headline-large", iconSize: 40, gap: 16, pressedRadius: 16, squareRadius: 28, outline: 3, touchTarget: "" },
};

const sizeAliases: Record<ButtonSize, ButtonSizeKey> = {
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

/**
 * Enabled variants: per the spec the container color NEVER changes on hover —
 * the 8%/10% state layer (.m3-state, currentColor) provides hover/focus/press
 * feedback. Elevated rests at level 1 and lifts to level 2 on hover using the
 * exact M3 level-2 shadow values (the .m3-elevation-* classes are unlayered
 * CSS, so `hover:m3-elevation-2` generates no Tailwind variant — the arbitrary
 * property is the established workaround, same as Card.tsx).
 */
const variantStyles: Record<ButtonVariant, string> = {
  filled: "bg-m3-primary text-m3-on-primary",
  tonal: "bg-m3-secondary-container text-m3-on-secondary-container",
  outlined: "border-m3-outline-variant bg-transparent text-m3-on-surface-variant",
  text: "bg-transparent text-m3-primary",
  elevated:
    "m3-elevation-1 bg-m3-surface-container-low text-m3-primary hover:[box-shadow:0_1px_2px_0_rgb(0_0_0/0.30),0_2px_6px_2px_rgb(0_0_0/0.15)]",
};

/** Toggle buttons use the current selected/unselected color roles. */
const toggleUnselectedStyles: Partial<Record<ButtonVariant, string>> = {
  filled: "bg-m3-surface-container text-m3-on-surface-variant",
};

const toggleSelectedStyles: Record<Exclude<ButtonVariant, "text">, string> = {
  filled: "bg-m3-primary text-m3-on-primary",
  tonal: "bg-m3-secondary text-m3-on-secondary",
  outlined: "border-transparent bg-m3-inverse-surface text-m3-inverse-on-surface",
  elevated: "m3-elevation-1 bg-m3-primary text-m3-on-primary",
};

/**
 * Official disabled tokens: container on-surface 12%, content on-surface 38%;
 * outlined/text keep a transparent container (outline drops to 12%); elevation
 * drops to level 0.
 */
const disabledStyles: Record<ButtonVariant, string> = {
  filled: "bg-m3-on-surface/12 text-m3-on-surface/38 shadow-none!",
  tonal: "bg-m3-on-surface/12 text-m3-on-surface/38 shadow-none!",
  outlined: "border-m3-on-surface/12 text-m3-on-surface/38",
  text: "text-m3-on-surface/38",
  elevated: "bg-m3-on-surface/12 text-m3-on-surface/38",
};

const shapeStyles: Record<ButtonShape, string> = {
  round: "rounded-full",
  square: "rounded-xl",
  full: "rounded-full",
  large: "rounded-2xl",
  medium: "rounded-xl",
  small: "rounded-lg",
};

/**
 * Button attributes minus the handlers framer-motion re-defines with its own
 * (motion-specific) signatures — those DOM versions would conflict once they
 * reach the motion element through Base UI's `render` composition.
 */
type ButtonNativeProps = Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onDragStart" | "onDrag" | "onDragEnd" | "onDragOver" | "onDragEnter" | "onDragLeave" | "onDrop"
  >;

interface ButtonCommonProps {
  size?: ButtonSize;
  /** Official round/square shape. Legacy fixed-radius names remain supported. */
  shape?: ButtonShape;
  /** Leading Material Symbol name */
  icon?: string;
  /** Trailing Material Symbol name */
  trailingIcon?: string;
  /** Shows a spinner (replacing the leading icon) and disables interaction */
  loading?: boolean;
  /** Stretch to container width */
  fullWidth?: boolean;
  /** Rendered content — use for text labels */
  children?: React.ReactNode;
}

type ButtonToggleProps =
  | {
      variant?: Exclude<ButtonVariant, "text">;
      /** Enables the current M3 toggle-button selected contract. Text buttons cannot toggle. */
      toggleable: true;
      /** Controlled selected state. Omit for internal state. */
      selected?: boolean;
      onSelectedChange?: (selected: boolean) => void;
    }
  | {
      variant?: ButtonVariant;
      toggleable?: false;
      selected?: never;
      onSelectedChange?: never;
    };

export type ButtonProps = ButtonNativeProps & ButtonCommonProps & ButtonToggleProps;

/**
 * M3 Expressive Button.
 *
 * Layering: Base UI's headless `Button` owns the native <button> semantics,
 * the `type="button"` default and disabled/focus handling (it guards click +
 * pointer events while disabled); the `render` prop composes it with a
 * framer-motion element so WE keep the visuals — press scale, the M3E shape
 * morph, springs and the M3 state layer. Press morphs the corner shape
 * to the size-specific pressed corner with the expressive spring. Keyboard
 * presses through Space and Enter use the same state.
 */
/** Material 3 Expressive button for user actions. @see https://m3.material.io/components/buttons/overview */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "filled",
    size = "sm",
    shape = "round",
    icon,
    trailingIcon,
    loading = false,
    fullWidth = false,
    toggleable = false,
    selected,
    onSelectedChange,
    className,
    children,
    disabled,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
    onPointerLeave,
    onKeyDown,
    onKeyUp,
    onBlur,
    onClick,
    ...props
  },
  ref
) {
  const s = sizeStyles[sizeAliases[size]];
  const isDisabled = disabled || loading;
  const [pressed, setPressed] = React.useState(false);
  const [internalSelected, setInternalSelected] = React.useState(false);
  const isSelected = toggleable ? (selected ?? internalSelected) : false;
  const morphs = (shape === "round" || shape === "full" || shape === "square") && !isDisabled;
  const restRadius = shape === "square"
    ? isSelected
      ? s.height / 2
      : s.squareRadius
    : isSelected
      ? s.squareRadius
      : s.height / 2;
  const enabledStyle = toggleable
    ? isSelected
      ? toggleSelectedStyles[variant as Exclude<ButtonVariant, "text">]
      : (toggleUnselectedStyles[variant] ?? variantStyles[variant])
    : variantStyles[variant];

  /** Space activates on keyup, Enter on keydown (native) — mirror both into
   * the pressed state so the shape morph also plays for keyboard users. */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === " " || e.key === "Enter") && !e.repeat) setPressed(true);
    onKeyDown?.(e);
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Enter") setPressed(false);
    onKeyUp?.(e);
  };
  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    setPressed(false);
    onBlur?.(e);
  };

  return (
    <BaseButton
      ref={ref}
      disabled={isDisabled}
      aria-busy={loading || undefined}
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
      onClick={(event) => {
        if (toggleable) {
          const next = !isSelected;
          if (selected === undefined) setInternalSelected(next);
          onSelectedChange?.(next);
        }
        onClick?.(event);
      }}
      className={cn(
        "m3-state m3-focus relative inline-flex select-none items-center justify-center",
        "transition-colors duration-150",
        s.typeClass,
        isDisabled ? disabledStyles[variant] : enabledStyle,
        morphs ? undefined : shapeStyles[shape],
        fullWidth && "w-full",
        isDisabled && "pointer-events-none",
        s.touchTarget,
        className
      )}
      style={{
        height: s.height,
        paddingInline: s.padding,
        gap: s.gap,
        borderWidth: variant === "outlined" ? s.outline : undefined,
      }}
      {...props}
      render={
        <motion.button
          whileTap={isDisabled ? undefined : { scale: 0.96 }}
          animate={
            morphs
              ? { borderRadius: pressed ? s.pressedRadius : restRadius }
              : undefined
          }
          transition={{ scale: springs.fastVisual, borderRadius: springs.expressiveEffects }}
        >
          <Ripple />
          <AnimatePresence initial={false}>
            {loading && (
              <motion.span
                key="spinner"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: s.iconSize, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={springs.fastSpatial}
                className="inline-flex items-center overflow-hidden"
              >
                {/* Tokenized 1s linear rotation (durations.extraLong4) — the loading
                    indicator replaces the leading icon per the Material pattern */}
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, ease: "linear", duration: durations.extraLong4 / 1000 }}
                  className="inline-flex"
                >
                  <MaterialSymbol icon="progress_activity" size={s.iconSize} />
                </motion.span>
              </motion.span>
            )}
          </AnimatePresence>
          {!loading && icon && (
            <MaterialSymbol icon={icon} size={s.iconSize} fill={isSelected || variant === "filled"} />
          )}
          {children}
          {trailingIcon && (
            <MaterialSymbol icon={trailingIcon} size={s.iconSize} fill={isSelected || variant === "filled"} />
          )}
        </motion.button>
      }
    />
  );
});

export { buttonMeta } from "@/lib/m3/meta";
