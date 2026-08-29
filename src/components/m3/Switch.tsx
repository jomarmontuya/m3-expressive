'use client';

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type { SwitchRootProps } from "@base-ui/react/switch";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { cn } from "@/lib/utils";
import { springs as springsTokens } from "@/lib/m3/tokens";
import { useTextDirection } from "@/lib/m3/use-text-direction";
import { MaterialSymbol } from "./MaterialSymbol";
import { Ripple } from "./Ripple";

/** Token springs retyped as framer-motion Transitions (`type` widens to string). */
const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };

export interface SwitchProps
  extends Omit<SwitchRootProps, "checked" | "onCheckedChange" | "className" | "render" | "children"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Show the optional checked-state icon. Official default is false. */
  showIcon?: boolean;
  /** Show the official optional close icon in the unchecked thumb. */
  showUnselectedIcon?: boolean;
  className?: string;
  value?: string;
  uncheckedValue?: string;
  readOnly?: boolean;
  required?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}

/**
 * M3 Switch — 52×32 track with a thumb that grows 16 → 24px and slides
 * on the default spatial spring. Pressing squashes the thumb to 28px.
 * Checked and unchecked thumbs support the official optional glyphs. A
 * separate 40dp circular state layer follows the thumb over the 52×32 track.
 *
 * Built on Base UI's headless Switch Root + Thumb: the Root owns the
 * `role="switch"`, `aria-checked`, hidden form input and keyboard
 * activation (adapted to our public `checked`/`onCheckedChange` API); the
 * M3 thumb + track visuals and spring motion are unchanged.
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    checked,
    onCheckedChange,
    disabled = false,
    showIcon = false,
    showUnselectedIcon = false,
    className,
    onPointerDown,
    onPointerUp,
    onPointerLeave,
    ...props
  },
  ref
) {
  const reduceMotion = useReducedMotion() ?? false;
  const rootRef = React.useRef<HTMLElement>(null);
  const direction = useTextDirection(rootRef);
  const { defaultChecked, ...rootProps } = props;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
  const actualChecked = checked ?? internalChecked;
  const [pressed, setPressed] = React.useState(false);
  const thumbSize = pressed ? 28 : actualChecked || showUnselectedIcon ? 24 : 16;
  // Official geometry: off thumb rests 4dp from the track edge; on thumb at 24dp
  // (pressed on-thumb clamps to 20dp so the expanded 28dp thumb stays inside).
  const thumbOffset = actualChecked ? (pressed ? 20 : 24) : 4;
  const thumbX = direction === "rtl" ? -thumbOffset : thumbOffset;
  const stateLayerX = (direction === "rtl" ? -1 : 1) * (thumbOffset + thumbSize / 2 - 20);

  return (
    <DirectionProvider direction={direction}>
      <BaseSwitch.Root
      ref={(node) => {
        rootRef.current = node;
        const button = node as HTMLButtonElement | null;
        if (typeof ref === "function") ref(button);
        else if (ref) ref.current = button;
      }}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      nativeButton
      onCheckedChange={(nextChecked) => {
        if (checked === undefined) setInternalChecked(nextChecked);
        onCheckedChange?.(nextChecked);
      }}
      {...rootProps}
      onPointerDown={(event) => {
        setPressed(true);
        onPointerDown?.(event);
      }}
      onPointerUp={(event) => {
        setPressed(false);
        onPointerUp?.(event);
      }}
      onPointerLeave={(event) => {
        setPressed(false);
        onPointerLeave?.(event);
      }}
      className={cn(
        "group relative inline-flex h-12 w-[52px] shrink-0 items-center border-0 bg-transparent outline-none",
        disabled
          ? "pointer-events-none text-m3-on-surface/38"
          : actualChecked
            ? "text-m3-on-primary"
            : "text-m3-on-surface-variant",
        className
      )}
      render={<button />}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-2 h-8 rounded-full border-2 transition-colors duration-150",
          disabled
            ? actualChecked
              ? "border-m3-on-surface/12 bg-m3-on-surface/12"
              : "border-m3-on-surface/12 bg-m3-surface-container-highest"
            : actualChecked
              ? "border-m3-primary bg-m3-primary"
              : "border-m3-outline bg-m3-surface-container-highest"
        )}
      />
      <motion.span
        aria-hidden="true"
        className="m3-state absolute start-0 top-1 z-10 h-10 w-10 overflow-hidden rounded-full group-focus-visible:outline-[3px_solid_var(--md-primary)] group-focus-visible:outline-offset-2"
        initial={false}
        animate={{ x: stateLayerX }}
        transition={reduceMotion ? { duration: 0 } : springs.defaultSpatial}
      >
        <Ripple disabled={disabled} />
      </motion.span>
      <BaseSwitch.Thumb
        className={cn(
          "pointer-events-none absolute start-0 top-1/2 z-20 grid place-items-center rounded-full shadow-[0_1px_3px_1px_rgba(0,0,0,0.15)] transition-colors duration-150",
          disabled
            ? actualChecked
              ? "bg-m3-surface"
              : "bg-m3-on-surface/38"
            : actualChecked
              ? "bg-m3-on-primary"
              : "bg-m3-outline"
        )}
        render={
          <motion.span
            initial={false}
            animate={{ x: thumbX, y: "-50%", width: thumbSize, height: thumbSize }}
            transition={reduceMotion ? { duration: 0 } : springs.defaultSpatial}
          />
        }
      >
        <AnimatePresence initial={false}>
          {((showIcon && actualChecked) || (showUnselectedIcon && !actualChecked)) && (
            <motion.span
              key={actualChecked ? "check" : "close"}
              className="grid place-items-center"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={reduceMotion ? { duration: 0 } : springs.fastVisual}
            >
              <MaterialSymbol
                icon={actualChecked ? "check" : "close"}
                size={16}
                className={cn(
                  disabled && actualChecked && "text-m3-on-surface/38",
                  disabled && !actualChecked && "text-m3-surface-container-highest/38",
                  !disabled && actualChecked && "text-m3-on-primary-container",
                  !disabled && !actualChecked && "text-m3-surface-container-highest"
                )}
              />
            </motion.span>
          )}
        </AnimatePresence>
      </BaseSwitch.Thumb>
      </BaseSwitch.Root>
    </DirectionProvider>
  );
});

export { switchMeta } from "@/lib/m3/meta";
