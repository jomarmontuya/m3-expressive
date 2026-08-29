'use client';

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import type { RadioRootProps } from "@base-ui/react/radio";
import { cn } from "@/lib/utils";
import { springs as springsTokens } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";

/** Token springs retyped as framer-motion Transitions (`type` widens to string). */
const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };

export interface RadioProps
  extends Omit<RadioRootProps<string>, "value" | "className" | "render" | "children"> {
  checked?: boolean;
  onChange?: () => void;
  /** Stable value used by RadioGroup and native form submission. */
  value?: string;
  label?: string;
  disabled?: boolean;
  /** Applies the error color to the ring and inner dot. */
  error?: boolean;
  className?: string;
  readOnly?: boolean;
  required?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}

/**
 * Internal bridge between our prop-driven Radio API (each Radio receives
 * `checked` from the parent) and Base UI's group-driven model (the group
 * owns the selected value). Radios report their checked state up so the
 * Base UI group — which owns roving arrow-key focus, the hidden form input
 * and ARIA wiring — stays in sync with the parent-owned selection.
 */
interface M3RadioGroupBridge {
  selectedValue?: string;
  /** Marks `value` as the group's selected radio (seeded from `checked` props). */
  setGroupValue: (value: string) => void;
  /** Per-radio change callbacks so keyboard selection fires the right `onChange`. */
  registerChangeHandler: (value: string, handler: (() => void) | undefined) => void;
}

const M3RadioGroupContext = React.createContext<M3RadioGroupBridge | null>(null);

/**
 * M3 Radio button — a 48px touch target with a 20px ring (2dp stroke) and
 * a 10dp inner dot that springs in (scale 0 → 1) on the expressive spring
 * when selected. Wrap a set of Radios in `RadioGroup` for roving arrow-key
 * navigation (now handled by Base UI's RadioGroup).
 */
export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(function Radio(
  {
    checked = false,
    onChange,
    value,
    label,
    disabled = false,
    error = false,
    className,
    ...props
  },
  ref
) {
  const reduceMotion = useReducedMotion() ?? false;
  // A caller-supplied value is stable across remounts and submits through the
  // native group input. The generated fallback preserves the legacy API.
  const generatedValue = React.useId();
  const radioValue = value ?? generatedValue;
  const group = React.useContext(M3RadioGroupContext);
  const actualChecked = group ? group.selectedValue === radioValue : checked;

  // Seed/mirror the Base UI group with the parent-declared selection.
  React.useEffect(() => {
    if (checked) group?.setGroupValue(radioValue);
  }, [checked, group, radioValue]);

  // Keep the latest change handler reachable for keyboard-driven selection.
  React.useEffect(() => {
    group?.registerChangeHandler(radioValue, onChange);
    return () => group?.registerChangeHandler(radioValue, undefined);
  }, [group, onChange, radioValue]);

  return (
    <BaseRadio.Root
      ref={ref}
      value={radioValue}
      disabled={disabled}
      nativeButton
      {...props}
      // Standalone radios have no Base UI group to click through — fire directly.
      // Inside a group Base UI's own click → hidden-input flow handles it.
      onClick={() => {
        if (!group) onChange?.();
      }}
      // Our visuals (and the public contract) follow the `checked` prop, so the
      // announced state is overridden to match it even before Base UI syncs.
      aria-checked={actualChecked}
      className={cn(
        "group relative inline-flex min-h-12 items-center outline-none",
        disabled
          ? "pointer-events-none text-m3-on-surface/38"
          : error
            ? "text-m3-error"
            : actualChecked
              ? "text-m3-primary"
              : "text-m3-on-surface-variant",
        className
      )}
      render={
        <motion.button
          whileTap={disabled || reduceMotion ? undefined : { scale: 0.95 }}
          transition={reduceMotion ? { duration: 0 } : springs.fastVisual}
        />
      }
    >
      <span className="m3-state relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full group-focus-visible:outline-[3px_solid_var(--md-primary)] group-focus-visible:outline-offset-2">
        <Ripple disabled={disabled} />
        <span
          className={cn(
            "grid h-5 w-5 place-items-center rounded-full border-2 transition-colors duration-150",
            disabled
              ? "border-m3-on-surface/38"
              : error
              ? "border-m3-error"
              : actualChecked
                ? "border-m3-primary"
                : "border-m3-on-surface-variant"
          )}
        >
          <motion.span
            className={cn(
              "h-[10px] w-[10px] rounded-full",
              disabled ? "bg-m3-on-surface/38" : error ? "bg-m3-error" : "bg-m3-primary"
            )}
            initial={false}
            animate={{ scale: actualChecked ? 1 : 0 }}
            transition={reduceMotion ? { duration: 0 } : springs.expressive}
          />
        </span>
      </span>
      {label && (
        <span className={cn("pr-3 md-body-large", disabled ? "text-m3-on-surface/38" : "text-m3-on-surface")}>
          {label}
        </span>
      )}
    </BaseRadio.Root>
  );
});

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  /** Accessible name for the group (rendered as aria-label on role="radiogroup"). */
  label?: string;
  name?: string;
  form?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}

/**
 * M3 Radio group — a `role="radiogroup"` wrapper. Keyboard behavior
 * (ArrowUp/ArrowLeft → previous enabled radio, ArrowDown/ArrowRight → next,
 * wrapping, focus-follows-selection) is owned by Base UI's RadioGroup.
 * The selected value is mirrored from the child Radios' `checked` props and
 * every change is routed back through the selected Radio's `onChange`.
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup({
  label,
  className,
  children,
  value,
  defaultValue,
  onValueChange,
  ...props
}: RadioGroupProps, ref) {
  const [groupValue, setGroupValue] = React.useState<string | undefined>(defaultValue);
  const changeHandlersRef = React.useRef(new Map<string, () => void>());

  const registerChangeHandler = React.useCallback(
    (nextValue: string, handler: (() => void) | undefined) => {
      if (handler) changeHandlersRef.current.set(nextValue, handler);
      else changeHandlersRef.current.delete(nextValue);
    },
    []
  );

  // A radio was activated (click or keyboard): remember it as selected and
  // dispatch the owning Radio's public `onChange`.
  const handleValueChange = React.useCallback(
    (nextValue: string) => {
      if (value === undefined) setGroupValue(nextValue);
      onValueChange?.(nextValue);
      changeHandlersRef.current.get(nextValue)?.();
    },
    [onValueChange, value]
  );

  const selectedValue = value ?? groupValue;
  const bridge = React.useMemo(
    () => ({ selectedValue, setGroupValue, registerChangeHandler }),
    [selectedValue, setGroupValue, registerChangeHandler]
  );

  return (
    <M3RadioGroupContext.Provider value={bridge}>
      <BaseRadioGroup
        ref={ref}
        // Keep Base UI controlled from the first render. An empty string means
        // no selected radio and avoids an uncontrolled-to-controlled switch
        // when a checked child seeds the legacy bridge after mount.
        value={selectedValue ?? ""}
        onValueChange={handleValueChange}
        aria-label={label}
        {...props}
        className={cn("flex flex-col", className)}
      >
        {children}
      </BaseRadioGroup>
    </M3RadioGroupContext.Provider>
  );
});

RadioGroup.displayName = "RadioGroup";

export { radioMeta } from "@/lib/m3/meta";
