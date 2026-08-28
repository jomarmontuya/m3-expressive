"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button as BaseButton } from "@base-ui-components/react/button";
import { cn } from "@/lib/utils";
import { springs, durations, shapeMorph } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export type ButtonVariant = "filled" | "tonal" | "outlined" | "text" | "elevated";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonShape = "full" | "large" | "medium" | "small";

/**
 * M3 Expressive height/typography per size:
 * xs=32, sm=40, md=56, lg=76, xl=96 (official M3E button scale)
 *
 * Padding follows the official spec: 16px dense (xs), 24px standard (sm/md);
 * lg/xl are M3E-only expressive scale-ups (no official padding token — 32/40px).
 * Icon ramp 16/18/20/24/28 keeps dense icons 16–20dp and standard ≤24dp.
 * Type: xs=label-medium, sm/md=label-large (official 14px/0.1px tracking),
 * lg=title-medium, xl=title-large (adjacent scale roles for the M3E sizes).
 */
const sizeStyles: Record<ButtonSize, { height: string; padding: string; typeClass: string; iconSize: number; gap: string; touchTarget: string }> = {
  xs: { height: "32px", padding: "0 16px", typeClass: "md-label-medium", iconSize: 16, gap: "4px", touchTarget: "before:absolute before:-inset-y-2 before:content-['']" },
  sm: { height: "40px", padding: "0 24px", typeClass: "md-label-large", iconSize: 18, gap: "8px", touchTarget: "before:absolute before:-inset-y-1 before:content-['']" },
  md: { height: "56px", padding: "0 24px", typeClass: "md-label-large", iconSize: 20, gap: "8px", touchTarget: "" },
  lg: { height: "76px", padding: "0 32px", typeClass: "md-title-medium", iconSize: 24, gap: "8px", touchTarget: "" },
  xl: { height: "96px", padding: "0 40px", typeClass: "md-title-large", iconSize: 28, gap: "12px", touchTarget: "" },
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
  outlined: "border border-m3-outline bg-transparent text-m3-primary",
  text: "bg-transparent text-m3-primary px-3!",
  elevated:
    "m3-elevation-1 bg-m3-surface-container-low text-m3-primary hover:[box-shadow:0_1px_2px_0_rgb(0_0_0/0.30),0_2px_6px_2px_rgb(0_0_0/0.15)]",
};

/**
 * Official disabled tokens: container on-surface 12%, content on-surface 38%;
 * outlined/text keep a transparent container (outline drops to 12%); elevation
 * drops to level 0.
 */
const disabledStyles: Record<ButtonVariant, string> = {
  filled: "bg-m3-on-surface/12 text-m3-on-surface/38 shadow-none!",
  tonal: "bg-m3-on-surface/12 text-m3-on-surface/38 shadow-none!",
  outlined: "border border-m3-on-surface/12 text-m3-on-surface/38",
  text: "text-m3-on-surface/38 px-3!",
  elevated: "bg-m3-on-surface/12 text-m3-on-surface/38",
};

const shapeStyles: Record<ButtonShape, string> = {
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
export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onDragStart" | "onDrag" | "onDragEnd" | "onDragOver" | "onDragEnter" | "onDragLeave" | "onDrop"
  > {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Corner shape. M3E default "full" morphs toward 20dp on press. */
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

/**
 * M3 Expressive Button.
 *
 * Layering: Base UI's headless `Button` owns the native <button> semantics,
 * the `type="button"` default and disabled/focus handling (it guards click +
 * pointer events while disabled); the `render` prop composes it with a
 * framer-motion element so WE keep the visuals — press scale, the M3E shape
 * morph, springs and the M3 state layer. Press morphs the corner shape
 * (full → 20dp) with the bouncy expressive spring — the hallmark M3E
 * interaction. Plays for keyboard presses too (Space/Enter), via the shared
 * shapeMorph token pair.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "filled",
    size = "md",
    shape = "full",
    icon,
    trailingIcon,
    loading = false,
    fullWidth = false,
    className,
    children,
    disabled,
    onKeyDown,
    onKeyUp,
    onBlur,
    ...props
  },
  ref
) {
  const s = sizeStyles[size];
  const isDisabled = disabled || loading;
  const [pressed, setPressed] = React.useState(false);
  /** M3E shape morph only applies to the default full (pill) shape. */
  const morphs = shape === "full" && !isDisabled;

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
      data-pressed={pressed || undefined}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={handleBlur}
      className={cn(
        "m3-state m3-focus relative inline-flex select-none items-center justify-center",
        "transition-colors duration-150",
        s.typeClass,
        isDisabled ? disabledStyles[variant] : variantStyles[variant],
        morphs ? undefined : shapeStyles[shape],
        fullWidth && "w-full",
        isDisabled && "pointer-events-none",
        s.touchTarget,
        className
      )}
      style={{
        height: s.height,
        padding: s.padding,
        gap: s.gap,
      }}
      {...props}
      render={
        <motion.button
          whileTap={isDisabled ? undefined : { scale: 0.96 }}
          animate={
            morphs
              ? { borderRadius: pressed ? shapeMorph.button.pressed : shapeMorph.button.rest }
              : undefined
          }
          transition={{ scale: springs.fastVisual, borderRadius: springs.expressiveEffects }}
        >
          <Ripple />
          <AnimatePresence initial={false}>
            {loading && (
              <motion.span
                key="spinner"
                initial={{ width: 0, opacity: 0, marginRight: 0 }}
                animate={{ width: s.iconSize, opacity: 1, marginRight: parseInt(s.gap) }}
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
            <MaterialSymbol icon={icon} size={s.iconSize} fill={variant === "filled"} />
          )}
          {children}
          {trailingIcon && (
            <MaterialSymbol icon={trailingIcon} size={s.iconSize} fill={variant === "filled"} />
          )}
        </motion.button>
      }
    />
  );
});

export { buttonMeta } from "@/lib/m3/meta";
