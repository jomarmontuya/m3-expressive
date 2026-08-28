'use client';

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Transition } from "framer-motion";
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
 * filterable dropdown menu. Supports full keyboard navigation
 * (ArrowUp/ArrowDown/Enter/Escape) and outside-click dismissal.
 */
export const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(function Autocomplete(
  { options, value, onChange, label, placeholder = "Type to filter", fullWidth = false, disabled = false, className },
  ref
) {
  const [open, setOpen] = React.useState(false);
  const [highlighted, setHighlighted] = React.useState(-1);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const reactId = React.useId();
  const listId = `m3-ac-${reactId.replace(/:/g, "")}`;

  const filtered = React.useMemo(() => {
    const q = value.trim().toLowerCase();
    return q ? options.filter((o) => o.toLowerCase().includes(q)) : options;
  }, [options, value]);

  const openMenu = React.useCallback(() => {
    if (disabled) return;
    setOpen(true);
    setHighlighted(-1);
  }, [disabled]);

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const select = (option: string) => {
    onChange(option);
    setOpen(false);
    setHighlighted(-1);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlighted(0);
      } else {
        setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlighted(Math.max(filtered.length - 1, 0));
      } else {
        setHighlighted((h) => Math.max(h - 1, 0));
      }
    } else if (e.key === "Enter") {
      if (open && highlighted >= 0 && filtered[highlighted] != null) {
        e.preventDefault();
        select(filtered[highlighted]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div
      ref={rootRef}
      className={cn("relative", fullWidth && "w-full", disabled && "pointer-events-none opacity-38", className)}
    >
      {label && <div className="mb-1 px-1 md-body-small text-m3-on-surface-variant">{label}</div>}
      <div
        className={cn(
          "m3-state relative flex h-14 items-center rounded-xl border transition-[border-color,box-shadow] duration-150",
          open && !disabled
            ? "border-m3-primary shadow-[inset_0_0_0_1px_var(--md-primary)]"
            : "border-m3-outline"
        )}
      >
        <input
          ref={ref}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && highlighted >= 0 ? `${listId}-${highlighted}` : undefined}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
            setHighlighted(-1);
          }}
          onFocus={openMenu}
          onKeyDown={onKeyDown}
          className="h-full w-full bg-transparent pl-4 pr-12 text-m3-on-surface outline-none placeholder:text-m3-on-surface-variant md-body-large"
        />
        <motion.button
          type="button"
          aria-label="Toggle suggestions"
          tabIndex={-1}
          whileTap={{ scale: 0.9 }}
          transition={springs.fastVisual}
          onClick={() => (open ? setOpen(false) : openMenu())}
          className="m3-state absolute right-1.5 grid h-9 w-9 place-items-center overflow-hidden rounded-full text-m3-on-surface-variant"
        >
          <Ripple disabled={disabled} />
          <motion.span
            initial={false}
            animate={{ rotate: open ? 180 : 0 }}
            transition={springs.fastSpatial}
            className="inline-flex"
          >
            <MaterialSymbol icon="arrow_drop_down" size={24} />
          </motion.span>
        </motion.button>
      </div>
      <AnimatePresence>
        {open && filtered.length > 0 && (
          <motion.ul
            id={listId}
            role="listbox"
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={springs.fastSpatial}
            style={{ transformOrigin: "top center" }}
            className="m3-scroll m3-elevation-2 absolute z-10 mt-1 max-h-72 w-full overflow-y-auto rounded-lg bg-m3-surface-container py-2"
          >
            {filtered.map((option, i) => {
              const isSelected = option === value;
              const isHighlighted = i === highlighted;
              return (
                <li
                  key={option}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlighted(i)}
                  onClick={() => select(option)}
                  className={cn(
                    "m3-state relative flex h-12 cursor-pointer items-center overflow-hidden px-4 md-body-large text-m3-on-surface",
                    isHighlighted && "bg-m3-on-surface/8"
                  )}
                >
                  <Ripple />
                  <span className="flex-1 truncate">{option}</span>
                  {isSelected && <MaterialSymbol icon="check" size={20} fill className="text-m3-primary" />}
                </li>
              );
            })}
          </motion.ul>
        )}
        {open && filtered.length === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={springs.fastSpatial}
            className="m3-elevation-2 absolute z-10 mt-1 w-full rounded-lg bg-m3-surface-container px-4 py-3 md-body-medium text-m3-on-surface-variant"
          >
            No matches
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export { autocompleteMeta } from "@/lib/m3/meta";
