'use client';

import * as React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs as springsTokens } from "@/lib/m3/tokens";
import { MaterialSymbol } from "./MaterialSymbol";

/** Token springs retyped as framer-motion Transitions (`type` widens to string). */
const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };

export type TextFieldVariant = "filled" | "outlined";
export type TextFieldSize = "xs" | "sm" | "md" | "lg";

/** M3E height scale: xs=32, sm=40, md=56, lg=72 */
const sizeHeights: Record<TextFieldSize, number> = { xs: 32, sm: 40, md: 56, lg: 72 };
const sizeRounded: Record<TextFieldSize, string> = {
  xs: "rounded-lg",
  sm: "rounded-xl",
  md: "rounded-xl",
  lg: "rounded-2xl",
};

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: TextFieldVariant;
  size?: TextFieldSize;
  label?: string;
  helperText?: string;
  error?: boolean;
  /** Leading Material Symbol name */
  leadingIcon?: string;
  /** Trailing Material Symbol name (overridden by the error icon) */
  trailingIcon?: string;
  fullWidth?: boolean;
}

/**
 * M3 Text field — outlined (default) and filled containers with the
 * floating label animation (label docks into the outlined border gap
 * or rises inside the filled container, on the fast spatial spring).
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  {
    variant = "outlined",
    size = "md",
    label,
    helperText,
    error = false,
    leadingIcon,
    trailingIcon,
    fullWidth = false,
    disabled = false,
    required = false,
    id,
    value,
    onChange,
    placeholder,
    type = "text",
    className,
    onFocus,
    onBlur,
    ...props
  },
  ref
) {
  const [focused, setFocused] = React.useState(false);
  const autoId = React.useId();
  const inputId = id ?? `m3-tf-${autoId.replace(/:/g, "")}`;
  const helperId = helperText ? `${inputId}-helper` : undefined;

  const hasValue = value != null && String(value).length > 0;
  const floated = focused || hasValue;
  const height = sizeHeights[size];
  const centerY = height / 2;
  const compact = size === "xs" || size === "sm";
  const iconSize = compact ? 20 : 24;
  const inputTextClass = compact ? "md-body-medium" : "md-body-large";
  const labelRestClass = compact ? "md-body-medium" : "md-body-large";
  const labelRestHalf = compact ? 10 : 12;
  const showPlaceholder = placeholder != null && (!label || floated);

  return (
    <div className={cn("relative", fullWidth && "w-full", disabled && "opacity-38", className)}>
      <div
        className={cn(
          "m3-state relative flex items-center transition-[border-color,box-shadow] duration-150",
          variant === "outlined"
            ? cn(
                "border bg-transparent",
                sizeRounded[size],
                error
                  ? "border-m3-error"
                  : focused
                    ? "border-m3-primary shadow-[inset_0_0_0_1px_var(--md-primary)]"
                    : "border-m3-outline"
              )
            : "rounded-t-lg bg-m3-surface-container-highest"
        )}
        style={{ height }}
      >
        {leadingIcon && (
          <MaterialSymbol
            icon={leadingIcon}
            size={iconSize}
            className={cn(
              "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2",
              error ? "text-m3-error" : focused ? "text-m3-primary" : "text-m3-on-surface-variant"
            )}
          />
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          placeholder={showPlaceholder ? placeholder : undefined}
          aria-invalid={error || undefined}
          aria-describedby={helperId}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            "h-full w-full bg-transparent text-m3-on-surface outline-none placeholder:text-m3-on-surface-variant",
            inputTextClass,
            leadingIcon ? "pl-12" : "pl-4",
            error || trailingIcon ? "pr-12" : "pr-4"
          )}
          {...props}
        />
        {(error || trailingIcon) && (
          <MaterialSymbol
            icon={error ? "error" : (trailingIcon as string)}
            size={iconSize}
            fill={error ? true : undefined}
            className={cn(
              "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2",
              error ? "text-m3-error" : "text-m3-on-surface-variant"
            )}
          />
        )}
        {variant === "filled" && (
          <>
            <div
              className={cn(
                "pointer-events-none absolute inset-x-0 bottom-0 h-px",
                error ? "bg-m3-error" : "bg-m3-on-surface-variant"
              )}
            />
            <motion.div
              className={cn(
                "pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-center",
                error ? "bg-m3-error" : "bg-m3-primary"
              )}
              initial={false}
              animate={{ scaleX: focused || error ? 1 : 0 }}
              transition={springs.fastSpatial}
            />
          </>
        )}
        {label && (
          <motion.label
            htmlFor={inputId}
            className={cn(
              "pointer-events-none absolute z-[1]",
              variant === "outlined" ? "bg-m3-surface px-1" : "px-0",
              floated ? "md-body-small" : labelRestClass,
              error ? "text-m3-error" : focused ? "text-m3-primary" : "text-m3-on-surface-variant"
            )}
            initial={false}
            animate={{
              top: variant === "outlined" ? (floated ? -8 : centerY - labelRestHalf) : floated ? 4 : centerY - labelRestHalf,
              left: variant === "outlined"
                ? floated
                  ? leadingIcon
                    ? 40
                    : 12
                  : leadingIcon
                    ? 48
                    : 16
                : leadingIcon
                  ? 48
                  : 16,
            }}
            transition={springs.fastSpatial}
          >
            {label}
            {required && <span className="text-m3-error"> *</span>}
          </motion.label>
        )}
      </div>
      {helperText && (
        <div id={helperId} className={cn("mt-1 px-4 md-body-small", error ? "text-m3-error" : "text-m3-on-surface-variant")}>
          {helperText}
        </div>
      )}
    </div>
  );
});

export { textFieldMeta } from "@/lib/m3/meta";
