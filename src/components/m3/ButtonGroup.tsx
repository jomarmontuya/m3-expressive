"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button as BaseButton } from "@base-ui/react/button";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { useTextDirection } from "@/lib/m3/use-text-direction";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export type ButtonGroupVariant = "outlined" | "filled" | "tonal" | "elevated";
export type ButtonGroupSelection =
  | "none"
  | "single"
  | "multiple"
  | "single-required"
  | "multiple-required";
export type ButtonGroupLayout = "standard" | "connected";
export type ButtonGroupSize =
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

type ButtonGroupSizeKey = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonGroupItem {
  id: string;
  label?: string;
  icon?: string;
  ariaLabel?: string;
  onClick?: () => void;
}

const sizeStyles: Record<ButtonGroupSizeKey, { height: number; padding: number; icon: number; gap: number; groupGap: number; typeClass: string; pressedRadius: number; squareRadius: number; connectedInnerRadius: number; connectedPressedRadius: number; outline: number }> = {
  xs: { height: 32, padding: 12, icon: 20, gap: 8, groupGap: 18, typeClass: "md-label-large", pressedRadius: 8, squareRadius: 12, connectedInnerRadius: 8, connectedPressedRadius: 4, outline: 1 },
  sm: { height: 40, padding: 16, icon: 20, gap: 8, groupGap: 12, typeClass: "md-label-large", pressedRadius: 8, squareRadius: 12, connectedInnerRadius: 8, connectedPressedRadius: 4, outline: 1 },
  md: { height: 56, padding: 24, icon: 24, gap: 8, groupGap: 8, typeClass: "md-title-medium", pressedRadius: 12, squareRadius: 16, connectedInnerRadius: 12, connectedPressedRadius: 8, outline: 1 },
  lg: { height: 96, padding: 48, icon: 32, gap: 12, groupGap: 8, typeClass: "md-headline-small", pressedRadius: 16, squareRadius: 28, connectedInnerRadius: 16, connectedPressedRadius: 12, outline: 2 },
  xl: { height: 136, padding: 64, icon: 40, gap: 16, groupGap: 8, typeClass: "md-headline-large", pressedRadius: 16, squareRadius: 28, connectedInnerRadius: 16, connectedPressedRadius: 12, outline: 3 },
};

const sizeAliases: Record<ButtonGroupSize, ButtonGroupSizeKey> = {
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

const variantStyles: Record<ButtonGroupVariant, string> = {
  outlined: "border-m3-outline-variant bg-transparent text-m3-on-surface-variant",
  filled: "bg-m3-surface-container text-m3-on-surface-variant",
  tonal: "bg-m3-secondary-container text-m3-on-secondary-container",
  elevated: "m3-elevation-1 bg-m3-surface-container-low text-m3-primary",
};

const selectedStyles: Record<ButtonGroupVariant, string> = {
  outlined: "border-transparent bg-m3-inverse-surface text-m3-inverse-on-surface",
  filled: "bg-m3-primary text-m3-on-primary",
  tonal: "bg-m3-secondary text-m3-on-secondary",
  elevated: "bg-m3-primary text-m3-on-primary",
};

/** Disabled tokens: container on-surface 12% (outlined keeps 12% border), content on-surface 38%. */
const disabledStyles: Record<ButtonGroupVariant, string> = {
  outlined: "border-m3-on-surface/12 text-m3-on-surface/38",
  filled: "bg-m3-on-surface/12 text-m3-on-surface/38",
  tonal: "bg-m3-on-surface/12 text-m3-on-surface/38",
  elevated: "bg-m3-on-surface/12 text-m3-on-surface/38 shadow-none!",
};

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  buttons: ButtonGroupItem[];
  variant?: ButtonGroupVariant;
  /** Standard uses official size gaps; connected uses 2dp gaps and asymmetric shapes. */
  layout?: ButtonGroupLayout;
  shape?: "round" | "square";
  selection?: ButtonGroupSelection;
  /** Controlled selected ids; omit to let the group manage its own state */
  value?: string[];
  onValueChange?: (value: string[]) => void;
  /** Legacy alias: false disables the standard 15% pressed-width redistribution. */
  variableWidths?: boolean;
  /** Width share added to the pressed item. Official default is 0.15. */
  expandedRatio?: number;
  size?: ButtonGroupSize;
  disabled?: boolean;
}

/**
 * M3 Expressive button group — standard groups use official size-aware gaps
 * (18/12/8/8/8dp) and the
 * official pressed-width redistribution; connected groups use a 2dp gap and
 * asymmetric inner corners. Both support optional or required selection.
 * The 40dp small size exposes an expanded 48dp touch target via an
 * invisible ::before hit-area extension.
 *
 * No Base UI primitive for a connected button group in v1.0.0-rc.0 — custom
 * container retained. The container stays a plain semantic group
 * (`role="group"`; `aria-label` reaches it through the `...props` spread).
 * Each segment is our M3 Button layer (Base UI `Button` + framer-motion
 * `render` composition), so segments inherit the same native-<button>
 * disabled/focus handling as the standalone buttons.
 */
/** Material 3 Expressive group for related buttons. @see https://m3.material.io/components/button-groups/overview */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  {
    buttons,
    variant = "outlined",
    layout = "standard",
    shape = "round",
    selection = "none",
    value,
    onValueChange,
    variableWidths,
    expandedRatio = 0.15,
    size = "sm",
    disabled = false,
    className,
    style,
    ...props
  },
  ref
) {
  const [internalValue, setInternalValue] = React.useState<string[]>([]);
  const [pressedId, setPressedId] = React.useState<string | null>(null);
  const isControlled = value !== undefined;
  const selectedIds = isControlled ? value : internalValue;
  const s = sizeStyles[sizeAliases[size]];
  const rootRef = React.useRef<HTMLDivElement>(null);
  const direction = useTextDirection(rootRef);
  const redistributesWidths = variableWidths ?? layout === "standard";

  const connectedRadii = (index: number, isSelected: boolean, isPressed: boolean) => {
    if (isSelected) return { borderRadius: shape === "round" ? s.squareRadius : s.height / 2 };
    const inner = isPressed ? s.connectedPressedRadius : s.connectedInnerRadius;
    const outer = shape === "round" ? s.height / 2 : s.squareRadius;
    const startRadius = index === 0 ? outer : inner;
    const endRadius = index === buttons.length - 1 ? outer : inner;
    return direction === "rtl"
      ? {
          borderTopLeftRadius: endRadius,
          borderBottomLeftRadius: endRadius,
          borderTopRightRadius: startRadius,
          borderBottomRightRadius: startRadius,
        }
      : {
          borderTopLeftRadius: startRadius,
          borderBottomLeftRadius: startRadius,
          borderTopRightRadius: endRadius,
          borderBottomRightRadius: endRadius,
        };
  };

  const toggle = React.useCallback(
    (id: string) => {
      let next: string[];
      const selected = selectedIds.includes(id);
      const required = selection.endsWith("-required");
      if (selection === "single" || selection === "single-required") {
        if (selected && required) return;
        next = selected ? [] : [id];
      } else if (selection === "multiple" || selection === "multiple-required") {
        if (selected && required && selectedIds.length === 1) return;
        next = selected ? selectedIds.filter((v) => v !== id) : [...selectedIds, id];
      } else {
        return;
      }
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [selection, selectedIds, isControlled, onValueChange]
  );

  return (
    <div
      ref={(node) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      role="group"
      className={cn("inline-flex", redistributesWidths && "w-full", className)}
      {...props}
      style={{ columnGap: layout === "standard" ? s.groupGap : 2, ...style }}
    >
      {buttons.map((btn, index) => {
        const isSelected = selection !== "none" && selectedIds.includes(btn.id);
        const isPressed = pressedId === btn.id;
        const isHot = redistributesWidths && !disabled && isPressed;
        const radius = isSelected
          ? shape === "round" ? s.squareRadius : s.height / 2
          : isPressed
            ? s.pressedRadius
            : shape === "square"
              ? s.squareRadius
              : s.height / 2;
        const radii = layout === "connected"
          ? connectedRadii(index, isSelected, isPressed)
          : { borderRadius: radius };

        return (
          <BaseButton
            key={btn.id}
            disabled={disabled}
            aria-pressed={selection !== "none" ? isSelected : undefined}
            aria-label={btn.ariaLabel ?? (!btn.label ? (btn.icon ?? btn.id).replaceAll("_", " ") : undefined)}
            data-pressed={isPressed || undefined}
            onPointerDown={() => setPressedId(btn.id)}
            onPointerUp={() => setPressedId(null)}
            onPointerCancel={() => setPressedId(null)}
            onPointerLeave={() => setPressedId((current) => current === btn.id ? null : current)}
            onKeyDown={(event) => {
              if ((event.key === " " || event.key === "Enter") && !event.repeat) setPressedId(btn.id);
            }}
            onKeyUp={(event) => {
              if (event.key === " " || event.key === "Enter") setPressedId(null);
            }}
            onBlur={() => setPressedId(null)}
            onClick={() => {
              toggle(btn.id);
              btn.onClick?.();
            }}
            className={cn(
              "m3-state m3-focus relative inline-flex select-none items-center justify-center",
              "transition-colors duration-150",
              s.typeClass,
              s.height < 48 && cn(
                "before:absolute before:content-[''] before:[inset-inline:0]",
                s.height === 32 ? "before:-inset-y-2" : "before:-inset-y-1"
              ),
              disabled ? disabledStyles[variant] : variantStyles[variant],
              !disabled && isSelected && selectedStyles[variant],
              disabled && "pointer-events-none"
            )}
            style={
              redistributesWidths
                ? { height: s.height, paddingInline: s.padding, gap: s.gap, borderWidth: variant === "outlined" ? s.outline : undefined, flexBasis: 0, minWidth: 0 }
                : { height: s.height, paddingInline: s.padding, gap: s.gap, borderWidth: variant === "outlined" ? s.outline : undefined }
            }
            render={
              <motion.button
                whileTap={disabled ? undefined : { scale: 0.96 }}
                animate={{
                  ...radii,
                  ...(redistributesWidths ? { flexGrow: isHot ? 1 + expandedRatio : 1 } : {}),
                }}
                transition={
                  redistributesWidths
                    ? { scale: springs.fastVisual, flexGrow: springs.defaultSpatial, borderRadius: springs.expressiveEffects }
                    : { scale: springs.fastVisual, borderRadius: springs.expressiveEffects }
                }
              >
                <Ripple disabled={disabled} />
                {btn.icon && <MaterialSymbol icon={btn.icon} size={s.icon} />}
                {btn.label}
              </motion.button>
            }
          />
        );
      })}
    </div>
  );
});

export { buttonGroupMeta } from "@/lib/m3/meta";
