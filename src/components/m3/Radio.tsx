'use client';

import * as React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import { Radio as BaseRadio } from "@base-ui-components/react/radio";
import { cn } from "@/lib/utils";
import { springs as springsTokens } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";

/** Token springs retyped as framer-motion Transitions (`type` widens to string). */
const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };

export interface RadioProps {
  checked?: boolean;
  onChange?: () => void;
  label?: string;
  disabled?: boolean;
  /** Applies the error color to the ring and inner dot. */
  error?: boolean;
  className?: string;
}

/**
 * Internal bridge between our prop-driven Radio API (each Radio receives
 * `checked` from the parent) and Base UI's group-driven model (the group
 * owns the selected value). Radios report their checked state up so the
 * Base UI group — which owns roving arrow-key focus, the hidden form input
 * and ARIA wiring — stays in sync with the parent-owned selection.
 */
interface M3RadioGroupBridge {
  /** Marks `value` as the group's selected radio (seeded from `checked` props). */
  setGroupValue: (value: unknown) => void;
  /** Per-radio change callbacks so keyboard selection fires the right `onChange`. */
  registerChangeHandler: (value: unknown, handler: (() => void) | undefined) => void;
}

const M3RadioGroupContext = React.createContext<M3RadioGroupBridge | null>(null);

/**
 * M3 Radio button — a 48px touch target with a 20px ring (2dp stroke) and
 * a 10dp inner dot that springs in (scale 0 → 1) on the expressive spring
 * when selected. Wrap a set of Radios in `RadioGroup` for roving arrow-key
 * navigation (now handled by Base UI's RadioGroup).
 */
export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(function Radio(
  { checked = false, onChange, label, disabled = false, error = false, className },
  ref
) {
  // Base UI radios identify themselves by `value` within a group; ours are
  // addressable only by `checked`, so every instance gets a synthetic id.
  const value = React.useId();
  const group = React.useContext(M3RadioGroupContext);

  // Seed/mirror the Base UI group with the parent-declared selection.
  React.useEffect(() => {
    if (checked) group?.setGroupValue(value);
  }, [checked, group, value]);

  // Keep the latest change handler reachable for keyboard-driven selection.
  React.useEffect(() => {
    group?.registerChangeHandler(value, onChange);
    return () => group?.registerChangeHandler(value, undefined);
  });

  return (
    <BaseRadio.Root
      ref={ref}
      value={value}
      disabled={disabled}
      nativeButton
      // Standalone radios have no Base UI group to click through — fire directly.
      // Inside a group Base UI's own click → hidden-input flow handles it.
      onClick={() => {
        if (!group) onChange?.();
      }}
      // Our visuals (and the public contract) follow the `checked` prop, so the
      // announced state is overridden to match it even before Base UI syncs.
      aria-checked={checked}
      className={cn(
        "m3-state m3-focus relative inline-flex items-center overflow-hidden rounded-full outline-none",
        error ? "text-m3-error" : checked ? "text-m3-primary" : "text-m3-on-surface-variant",
        disabled && "pointer-events-none opacity-38",
        className
      )}
      render={
        <motion.button
          whileTap={disabled ? undefined : { scale: 0.95 }}
          transition={springs.fastVisual}
        />
      }
    >
      <Ripple disabled={disabled} />
      <span className="grid h-12 w-12 shrink-0 place-items-center">
        <span
          className={cn(
            "grid h-5 w-5 place-items-center rounded-full border-2 transition-colors duration-150",
            error
              ? "border-m3-error"
              : checked
                ? "border-m3-primary"
                : "border-m3-on-surface-variant"
          )}
        >
          <motion.span
            className={cn("h-[10px] w-[10px] rounded-full", error ? "bg-m3-error" : "bg-m3-primary")}
            initial={false}
            animate={{ scale: checked ? 1 : 0 }}
            transition={springs.expressive}
          />
        </span>
      </span>
      {label && <span className="pr-3 text-m3-on-surface md-body-large">{label}</span>}
    </BaseRadio.Root>
  );
});

export interface RadioGroupProps {
  /** Accessible name for the group (rendered as aria-label on role="radiogroup"). */
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * M3 Radio group — a `role="radiogroup"` wrapper. Keyboard behavior
 * (ArrowUp/ArrowLeft → previous enabled radio, ArrowDown/ArrowRight → next,
 * wrapping, focus-follows-selection) is owned by Base UI's RadioGroup.
 * The selected value is mirrored from the child Radios' `checked` props and
 * every change is routed back through the selected Radio's `onChange`.
 */
export function RadioGroup({ label, className, children }: RadioGroupProps) {
  const [groupValue, setGroupValue] = React.useState<unknown>(null);
  const changeHandlersRef = React.useRef(new Map<unknown, () => void>());

  const registerChangeHandler = React.useCallback(
    (value: unknown, handler: (() => void) | undefined) => {
      if (handler) changeHandlersRef.current.set(value, handler);
      else changeHandlersRef.current.delete(value);
    },
    []
  );

  // A radio was activated (click or keyboard): remember it as selected and
  // dispatch the owning Radio's public `onChange`.
  const handleValueChange = React.useCallback((value: unknown) => {
    setGroupValue(value ?? null);
    changeHandlersRef.current.get(value)?.();
  }, []);

  const bridge = React.useMemo(
    () => ({ setGroupValue, registerChangeHandler }),
    [setGroupValue, registerChangeHandler]
  );

  return (
    <M3RadioGroupContext.Provider value={bridge}>
      <BaseRadioGroup
        value={groupValue}
        onValueChange={handleValueChange}
        aria-label={label}
        className={cn("flex flex-col", className)}
      >
        {children}
      </BaseRadioGroup>
    </M3RadioGroupContext.Provider>
  );
}

export { radioMeta } from "@/lib/m3/meta";
