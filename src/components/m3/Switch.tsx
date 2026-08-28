'use client';

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs as springsTokens } from "@/lib/m3/tokens";
import { MaterialSymbol } from "./MaterialSymbol";

/** Token springs retyped as framer-motion Transitions (`type` widens to string). */
const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };

export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * M3 Switch — 52×32 track with a thumb that grows 16 → 24px and slides
 * on the default spatial spring. Pressing squashes the thumb to 28px.
 * The checked thumb shows an on-primary "check" glyph.
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { checked = false, onCheckedChange, disabled = false, className },
  ref
) {
  const [pressed, setPressed] = React.useState(false);
  const thumbSize = pressed ? 28 : checked ? 24 : 16;
  // Official geometry: off thumb rests 4dp from the track edge; on thumb at 24dp
  // (pressed on-thumb clamps to 20dp so the expanded 28dp thumb stays inside).
  const thumbX = checked ? (pressed ? 20 : 24) : 4;

  return (
    <motion.button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      className={cn(
        "m3-state m3-focus relative inline-flex h-8 w-[52px] shrink-0 items-center rounded-full border-2 outline-none transition-colors duration-150",
        checked
          ? "border-m3-primary bg-m3-primary text-m3-on-primary"
          : "border-m3-outline bg-m3-surface-container-highest text-m3-on-surface-variant",
        disabled && "pointer-events-none opacity-38",
        className
      )}
    >
      <motion.span
        className={cn(
          "absolute left-0 top-1/2 grid place-items-center rounded-full shadow-[0_1px_3px_1px_rgba(0,0,0,0.15)] transition-colors duration-150",
          checked ? "bg-m3-on-primary" : "bg-m3-outline"
        )}
        initial={false}
        animate={{ x: thumbX, y: "-50%", width: thumbSize, height: thumbSize }}
        transition={springs.defaultSpatial}
      >
        <AnimatePresence initial={false}>
          {checked && (
            <motion.span
              key="check"
              className="grid place-items-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={springs.fastVisual}
            >
              <MaterialSymbol icon="check" size={16} className="text-m3-primary" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </motion.button>
  );
});

export { switchMeta } from "@/lib/m3/meta";
