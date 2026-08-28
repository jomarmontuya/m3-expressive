"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export type ButtonVariant = "filled" | "tonal" | "outlined" | "text" | "elevated";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonShape = "full" | "large" | "medium" | "small";

/**
 * M3 Expressive height/typography per size:
 * xs=32, sm=40, md=56, lg=76, xl=96 (official M3E button scale)
 */
const sizeStyles: Record<ButtonSize, { height: string; padding: string; fontSize: string; iconSize: number; gap: string }> = {
  xs: { height: "32px", padding: "0 16px", fontSize: "0.8125rem", iconSize: 16, gap: "4px" },
  sm: { height: "40px", padding: "0 20px", fontSize: "0.875rem", iconSize: 18, gap: "6px" },
  md: { height: "56px", padding: "0 28px", fontSize: "0.9375rem", iconSize: 20, gap: "8px" },
  lg: { height: "76px", padding: "0 36px", fontSize: "1.125rem", iconSize: 24, gap: "10px" },
  xl: { height: "96px", padding: "0 48px", fontSize: "1.375rem", iconSize: 28, gap: "12px" },
};

const variantStyles: Record<ButtonVariant, string> = {
  filled:
    "bg-m3-primary text-m3-on-primary hover:bg-m3-primary/90",
  tonal:
    "bg-m3-secondary-container text-m3-on-secondary-container hover:bg-m3-secondary-container/85",
  outlined:
    "border border-m3-outline bg-transparent text-m3-primary hover:bg-m3-primary/8",
  text:
    "bg-transparent text-m3-primary hover:bg-m3-primary/8 px-3!",
  elevated:
    "m3-elevation-1 bg-m3-surface-container-low text-m3-primary hover:m3-elevation-2",
};

const shapeStyles: Record<ButtonShape, string> = {
  full: "rounded-full",
  large: "rounded-2xl",
  medium: "rounded-xl",
  small: "rounded-lg",
};

export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onDragStart" | "onDrag" | "onDragEnd" | "onDragOver" | "onDragEnter" | "onDragLeave" | "onDrop"
  > {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Corner shape. M3E default "full" morphs toward "large" on press. */
  shape?: ButtonShape;
  /** Leading Material Symbol name */
  icon?: string;
  /** Trailing Material Symbol name */
  trailingIcon?: string;
  /** Shows a spinner and disables interaction */
  loading?: boolean;
  /** Stretch to container width */
  fullWidth?: boolean;
  /** Rendered content — use for text labels */
  children?: React.ReactNode;
}

/**
 * M3 Expressive Button.
 * Press morphs the corner shape (full → largeIncreased) with the
 * signature bouncy spring — the hallmark M3E interaction.
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
    ...props
  },
  ref
) {
  const s = sizeStyles[size];
  const isDisabled = disabled || loading;
  const [pressed, setPressed] = React.useState(false);

  return (
    <motion.button
      ref={ref}
      type="button"
      disabled={isDisabled}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      whileTap={isDisabled ? undefined : { scale: 0.96 }}
      transition={springs.fastVisual}
      className={cn(
        "m3-state relative inline-flex select-none items-center justify-center overflow-hidden font-semibold",
        "transition-colors duration-150",
        variantStyles[variant],
        shapeStyles[shape],
        fullWidth && "w-full",
        isDisabled && "opacity-38 pointer-events-none",
        className
      )}
      style={{
        height: s.height,
        padding: s.padding,
        fontSize: s.fontSize,
        gap: s.gap,
        letterSpacing: "0.01em",
      }}
      {...props}
    >
      <Ripple />
      <AnimatePresence initial={false}>
        {loading && (
          <motion.span
            key="spinner"
            initial={{ width: 0, opacity: 0, marginRight: 0 }}
            animate={{ width: s.iconSize, opacity: 1, marginRight: s.gap.replace(/\D+$/, "") ? parseInt(s.gap) : 8 }}
            exit={{ width: 0, opacity: 0 }}
            transition={springs.fastSpatial}
            className="inline-flex overflow-hidden items-center"
          >
            <MaterialSymbol icon="progress_activity" size={s.iconSize} className="animate-spin" />
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
  );
});

export { buttonMeta } from "@/lib/m3/meta";
