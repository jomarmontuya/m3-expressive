'use client';

import * as React from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps, Transition } from "framer-motion";
import { Autocomplete as BaseAutocomplete } from "@base-ui-components/react/autocomplete";
import { cn } from "@/lib/utils";
import { springs as springsTokens } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

/** Token springs retyped as framer-motion Transitions (`type` widens to string). */
const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };

export interface AutocompleteProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * M3 Autocomplete — an outlined text field that suggests options from a
 * filterable dropdown menu.
 *
 * Built on Base UI's headless Autocomplete: Root owns the combobox state,
 * live list filtering (`mode="list"` — the input query filters `options`
 * internally), ArrowUp/Down/Enter/Escape keyboard contract, outside-press
 * dismissal and the full combobox ARIA wiring (role=combobox on the input,
 * listbox/option roles, aria-expanded/activedescendant). Input is the text
 * field (ref forwarded to our public ref), Trigger is the rotating chevron,
 * Positioner anchors and matches the anchor width, and List/Item render the
 * options with roving highlight (`data-highlighted` drives the active
 * shade). Only the M3 outlined-field and surface visuals + the entrance
 * spring are ours; typing or selecting both flow through our public
 * `value`/`onChange` contract.
 */
export const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(function Autocomplete(
  { options, value, onChange, label, placeholder = "Type to filter", fullWidth = false, disabled = false, className },
  ref
) {
  // Base UI owns popup mount/unmount (no deferred-unmount hook on this
  // primitive), so only the entrance spring plays — the close is instant.

  const popupMotion: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, scale: 0.96, y: -4 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: springs.fastSpatial,
    style: { transformOrigin: "top center" },
  };

  return (
    <BaseAutocomplete.Root
      items={options}
      value={value}
      onValueChange={(next) => onChange(next)}
      disabled={disabled}
      mode="list"
    >
      <div
        className={cn("relative", fullWidth && "w-full", disabled && "pointer-events-none opacity-38", className)}
      >
        {label && <div className="mb-1 px-1 md-body-small text-m3-on-surface-variant">{label}</div>}
        <div
          className={cn(
            "m3-state relative flex h-14 items-center rounded-m3-xs border transition-[border-color,box-shadow] duration-150",
            disabled
              ? "border-m3-outline/12"
              : "border-m3-outline hover:border-m3-on-surface data-[open]:border-m3-primary data-[open]:shadow-[inset_0_0_0_1px_var(--md-primary)]"
          )}
        >
          <BaseAutocomplete.Input
            ref={ref}
            placeholder={placeholder}
            className="h-full w-full bg-transparent pl-4 pr-12 text-m3-on-surface outline-none placeholder:text-m3-on-surface-variant md-body-large"
          />
          <BaseAutocomplete.Trigger
            aria-label="Toggle suggestions"
            className="m3-state absolute right-1.5 grid h-9 w-9 cursor-pointer place-items-center overflow-hidden rounded-full text-m3-on-surface-variant outline-none"
          >
            <Ripple disabled={disabled} />
            {/* Rotating chevron — Base UI sets data-popup-open on the Trigger */}
            <span className="inline-flex transition-transform duration-200 data-[popup-open]:rotate-180">
              <MaterialSymbol icon="arrow_drop_down" size={24} />
            </span>
          </BaseAutocomplete.Trigger>
        </div>
        <BaseAutocomplete.Portal>
            <BaseAutocomplete.Positioner side="bottom" sideOffset={4} className="z-10 outline-none">
              <BaseAutocomplete.Popup
                render={<motion.div {...popupMotion} />}
                className="m3-scroll m3-elevation-2 max-h-72 w-[var(--anchor-width)] overflow-y-auto rounded-m3-xs bg-m3-surface-container py-2 outline-none"
              >
                <BaseAutocomplete.List className="m-0 list-none p-0">
                  {(option: string) => (
                    <BaseAutocomplete.Item
                      key={option}
                      value={option}
                      className="m3-state relative flex h-12 cursor-pointer list-none items-center overflow-hidden px-4 outline-none md-body-large text-m3-on-surface data-[highlighted]:bg-m3-on-surface/8"
                    >
                      <Ripple />
                      <span className="flex-1 truncate">{option}</span>
                      {option === value && (
                        <MaterialSymbol icon="check" size={20} fill className="text-m3-primary" />
                      )}
                    </BaseAutocomplete.Item>
                  )}
                </BaseAutocomplete.List>
                {options.every((o) => {
                  const q = value.trim().toLowerCase();
                  return q !== "" && !o.toLowerCase().includes(q);
                }) && (
                  <div className="px-4 py-3 md-body-medium text-m3-on-surface-variant">No matches</div>
                )}
              </BaseAutocomplete.Popup>
            </BaseAutocomplete.Positioner>
          </BaseAutocomplete.Portal>
      </div>
    </BaseAutocomplete.Root>
  );
});

export { autocompleteMeta } from "@/lib/m3/meta";
