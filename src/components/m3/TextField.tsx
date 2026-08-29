'use client';
/* eslint-disable max-lines -- single-line and multiline controls share one public field contract */

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Field } from "@base-ui/react/field";
import { Input } from "@base-ui/react/input";
import { cn } from "@/lib/utils";
import { springs as springsTokens } from "@/lib/m3/tokens";
import { MaterialSymbol } from "./MaterialSymbol";

/** Token springs retyped as framer-motion Transitions (`type` widens to string). */
const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };

export type TextFieldVariant = "filled" | "outlined";
export type TextFieldSize = "xs" | "sm" | "md" | "lg";

/** M3E height scale: xs=32, sm=40, md=56, lg=72 */
const sizeHeights: Record<TextFieldSize, number> = { xs: 32, sm: 40, md: 56, lg: 72 };

/** M3 shape corner extra-small — official 4dp radius for both field variants. */
const fieldRadius = "rounded-m3-xs";
const fieldTopRadius = "rounded-t-m3-xs";

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  variant?: TextFieldVariant;
  size?: TextFieldSize;
  label?: string;
  helperText?: string;
  error?: boolean;
  /** Leading Material Symbol name */
  leadingIcon?: string;
  /** Trailing Material Symbol name (overridden by the error icon) */
  trailingIcon?: string;
  /** Content shown immediately before the editable text. */
  prefix?: React.ReactNode;
  /** Content shown immediately after the editable text. */
  suffix?: React.ReactNode;
  /** Render a vertically growing textarea instead of a single-line input. */
  multiline?: boolean;
  /** Initial visible lines when `multiline` is true. */
  rows?: number;
  fullWidth?: boolean;
}

/**
 * M3 Text field — outlined (default) and filled containers with the
 * floating label animation (label docks into the outlined border gap
 * or rises inside the filled container, on the fast spatial spring).
 *
 * Built on Base UI `Field` + `Input` (v1.0.0-rc.0): `Field.Root` owns the
 * disabled/invalid state and wires `aria-labelledby` (label), `aria-invalid`
 * and `aria-describedby` (supporting text) onto the input for free. The
 * floating motion label is rendered through `Field.Label`'s `render` prop so
 * the label↔control association stays automatic while the M3E dock/rise
 * animation stays ours. `Field.Error` is intentionally unused: M3 recolors
 * the supporting text in the error state instead of swapping in a distinct
 * error message, so `helperText` always maps to `Field.Description` and the
 * error state flows through `Field.Root`'s `invalid` prop.
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
    prefix,
    suffix,
    multiline = false,
    rows = 3,
    fullWidth = false,
    disabled = false,
    required = false,
    id,
    value,
    defaultValue,
    onChange,
    placeholder,
    type = "text",
    className,
    onFocus,
    onBlur,
    "aria-describedby": ariaDescribedBy,
    ...props
  },
  ref
) {
  const reduceMotion = useReducedMotion() ?? false;
  const [focused, setFocused] = React.useState(false);
  const [hasContent, setHasContent] = React.useState(
    () => String(value ?? defaultValue ?? "").length > 0
  );

  React.useEffect(() => {
    if (value !== undefined) setHasContent(String(value).length > 0);
  }, [value]);

  const floated = focused || hasContent;
  const height = sizeHeights[size];
  const centerY = height / 2;
  const compact = size === "xs" || size === "sm";
  const iconSize = compact ? 20 : 24;
  const inputTextClass = compact ? "md-body-medium" : "md-body-large";
  const labelRestClass = compact ? "md-body-medium" : "md-body-large";
  const labelRestHalf = compact ? 10 : 12;
  const showPlaceholder = placeholder != null && (!label || floated);
  const showAffixes = !label || floated;
  const generatedDescriptionId = React.useId().replace(/:/g, "");
  const prefixId = prefix != null ? `m3-field-prefix-${generatedDescriptionId}` : undefined;
  const suffixId = suffix != null ? `m3-field-suffix-${generatedDescriptionId}` : undefined;
  const helperId = helperText ? `m3-field-helper-${generatedDescriptionId}` : undefined;
  const describedBy = [
    ariaDescribedBy,
    showAffixes ? prefixId : undefined,
    showAffixes ? suffixId : undefined,
    helperId,
  ]
    .filter(Boolean)
    .join(" ") || undefined;
  const controlClassName = cn(
    "min-w-0 flex-1 bg-transparent text-m3-on-surface outline-none placeholder:text-m3-on-surface-variant",
    inputTextClass,
    multiline ? "min-h-[inherit] resize-y py-4" : "h-full",
    disabled && "opacity-38"
  );
  const controlStyle =
    variant === "filled" && label ? { paddingTop: Math.round(height * 0.28) } : undefined;
  const strongOutline = focused && !error && !disabled;
  const outlineColorClass =
    error && !disabled
      ? "text-m3-error"
      : focused
        ? "text-m3-primary"
        : disabled
          ? "text-m3-outline/12"
          : "text-m3-outline group-hover/field:text-m3-on-surface";
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHasContent(event.target.value.length > 0);
    onChange?.(event as React.ChangeEvent<HTMLInputElement>);
  };
  const handleFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocused(true);
    onFocus?.(event as React.FocusEvent<HTMLInputElement>);
  };
  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocused(false);
    onBlur?.(event as React.FocusEvent<HTMLInputElement>);
  };

  return (
    <Field.Root
      invalid={error || undefined}
      disabled={disabled}
      className={cn("relative", fullWidth && "w-full", className)}
    >
      <div
        className={cn(
          "group/field relative flex",
          multiline ? "items-start" : "items-center",
          variant === "outlined"
            ? cn("bg-transparent", fieldRadius)
            : cn(fieldTopRadius, disabled ? "bg-m3-on-surface/4" : "bg-m3-surface-container-highest")
        )}
        style={multiline ? { minHeight: height } : { height }}
      >
        {variant === "outlined" && (
          label ? (
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0 flex transition-colors duration-150",
                outlineColorClass
              )}
            >
              <span
                className={cn(
                  "shrink-0 rounded-s-m3-xs border-current",
                  strongOutline ? "border-s-2 border-y-2" : "border-s border-y"
                )}
                style={{ width: leadingIcon ? 40 : 12 }}
              />
              <span
                className={cn("shrink-0 border-current", strongOutline ? "border-y-2" : "border-y")}
                style={{ borderTopColor: floated ? "transparent" : "currentColor" }}
              >
                <span className="invisible block whitespace-nowrap px-1 md-body-small">
                  {label}
                  {required && " *"}
                </span>
              </span>
              <span
                className={cn(
                  "min-w-0 flex-1 rounded-e-m3-xs border-current",
                  strongOutline ? "border-e-2 border-y-2" : "border-e border-y"
                )}
              />
            </div>
          ) : (
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0 transition-colors duration-150",
                fieldRadius,
                "border-current",
                strongOutline ? "border-2" : "border",
                outlineColorClass
              )}
            />
          )
        )}
        {leadingIcon && (
          <MaterialSymbol
            icon={leadingIcon}
            size={iconSize}
            className={cn(
              "pointer-events-none absolute start-3 top-1/2 -translate-y-1/2",
              disabled && "opacity-38",
              error ? "text-m3-error" : focused ? "text-m3-primary" : "text-m3-on-surface-variant"
            )}
          />
        )}
        <div
          className={cn(
            "flex min-w-0 flex-1 items-center",
            multiline ? "min-h-[inherit] self-stretch" : "h-full",
            leadingIcon ? (compact ? "ps-12" : "ps-[52px]") : "ps-4",
            error || trailingIcon ? (compact ? "pe-12" : "pe-[52px]") : "pe-4"
          )}
        >
          {prefix != null && (
            <span
              id={prefixId}
              aria-hidden={!showAffixes || undefined}
              className={cn(
                "me-1 shrink-0 text-m3-on-surface-variant",
                !showAffixes && "invisible",
                disabled && "opacity-38"
              )}
            >
              {prefix}
            </span>
          )}
          {multiline ? (
            <Field.Control
              ref={ref as React.Ref<HTMLTextAreaElement>}
              render={<textarea rows={rows} />}
              id={id}
              value={value}
              defaultValue={defaultValue}
              onChange={handleChange}
              required={required}
              placeholder={showPlaceholder ? placeholder : undefined}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-describedby={describedBy}
              className={controlClassName}
              style={controlStyle}
              {...props}
            />
          ) : (
            <Input
              ref={ref}
              id={id}
              type={type}
              value={value}
              defaultValue={defaultValue}
              onChange={handleChange}
              required={required}
              placeholder={showPlaceholder ? placeholder : undefined}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-describedby={describedBy}
              className={controlClassName}
              style={controlStyle}
              {...props}
            />
          )}
          {suffix != null && (
            <span
              id={suffixId}
              aria-hidden={!showAffixes || undefined}
              className={cn(
                "ms-1 shrink-0 text-m3-on-surface-variant",
                !showAffixes && "invisible",
                disabled && "opacity-38"
              )}
            >
              {suffix}
            </span>
          )}
        </div>
        {(error || trailingIcon) && (
          <MaterialSymbol
            icon={error ? "error" : (trailingIcon as string)}
            size={iconSize}
            fill={error ? true : undefined}
            className={cn(
              "pointer-events-none absolute end-3 top-1/2 -translate-y-1/2",
              disabled && "opacity-38",
              error ? "text-m3-error" : "text-m3-on-surface-variant"
            )}
          />
        )}
        {variant === "filled" && (
          <>
            <div
              className={cn(
                "pointer-events-none absolute inset-x-0 bottom-0 h-px",
                disabled
                  ? "bg-transparent"
                  : error
                    ? "bg-m3-error"
                    : "bg-m3-on-surface-variant group-hover/field:bg-m3-on-surface"
              )}
            />
            <motion.div
              className={cn(
                "pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-center",
                error ? "bg-m3-error" : "bg-m3-primary"
              )}
              initial={false}
              animate={{ scaleX: focused || error ? 1 : 0 }}
              transition={reduceMotion ? { duration: 0 } : springs.fastSpatial}
            />
          </>
        )}
        {label && (
          <Field.Label
            render={
              <motion.label
                className={cn(
                  "pointer-events-none absolute z-[1]",
                  variant === "outlined" ? "px-1" : "px-0",
                  disabled && "opacity-38",
                  floated ? "md-body-small" : labelRestClass,
                  error ? "text-m3-error" : focused ? "text-m3-primary" : "text-m3-on-surface-variant"
                )}
                initial={false}
                animate={{
                  top: variant === "outlined" ? (floated ? -8 : centerY - labelRestHalf) : floated ? 8 : centerY - labelRestHalf,
                  insetInlineStart: variant === "outlined"
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
                transition={reduceMotion ? { duration: 0 } : springs.fastSpatial}
              >
                {label}
                {required && <span className="text-m3-error"> *</span>}
              </motion.label>
            }
          />
        )}
      </div>
      {helperText && (
        <Field.Description
          id={helperId}
          role={error ? "alert" : undefined}
          className={cn(
            "mt-1 px-4 md-body-small",
            disabled && "opacity-38",
            error ? "text-m3-error" : "text-m3-on-surface-variant"
          )}
        >
          {helperText}
        </Field.Description>
      )}
    </Field.Root>
  );
});

export { textFieldMeta } from "@/lib/m3/meta";
