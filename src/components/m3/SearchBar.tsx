'use client';

import * as React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs as springsTokens } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export type SearchBarSize = "sm" | "md" | "lg";

/** Token springs retyped as framer-motion Transitions (`type` widens to string). */
const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };

/** M3 height scale: sm=40, md=56, lg=72 */
const sizeHeights: Record<SearchBarSize, number> = { sm: 40, md: 56, lg: 72 };

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  size?: SearchBarSize;
  /** Leading Material Symbol name (defaults to "search") */
  leadingIcon?: string;
  /** Trailing inline icon buttons, as Material Symbol names */
  trailingIcons?: string[];
  /** Called when the user presses Enter */
  onSubmit?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
}

/**
 * M3 Search bar — a rounded-full pill that elevates and lightens its
 * surface when focused. Enter triggers `onSubmit`.
 */
export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(function SearchBar(
  {
    value,
    onChange,
    placeholder = "Search",
    size = "md",
    leadingIcon = "search",
    trailingIcons = [],
    onSubmit,
    fullWidth = false,
    disabled = false,
    className,
    ...props
  },
  ref
) {
  const [focused, setFocused] = React.useState(false);

  return (
    <div className={cn("relative inline-flex", fullWidth && "w-full", disabled && "pointer-events-none opacity-38", className)}>
      <div
        className={cn(
          "m3-state flex w-full items-center rounded-full transition-[background-color,box-shadow] duration-200",
          focused ? "m3-elevation-2 bg-m3-surface-container-highest" : "bg-m3-surface-container-high"
        )}
        style={{ height: sizeHeights[size] }}
      >
        {leadingIcon && (
          <MaterialSymbol icon={leadingIcon} size={24} className="ml-4 shrink-0 text-m3-on-surface-variant" />
        )}
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit?.();
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-m3-on-surface outline-none placeholder:text-m3-on-surface-variant md-body-large"
          {...props}
        />
        {trailingIcons.map((icon) => (
          <motion.button
            key={icon}
            type="button"
            aria-label={icon.replace(/_/g, " ")}
            tabIndex={disabled ? -1 : 0}
            whileTap={disabled ? undefined : { scale: 0.9 }}
            transition={springs.fastVisual}
            className="m3-state relative mr-1.5 grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full text-m3-on-surface"
          >
            <Ripple disabled={disabled} />
            <MaterialSymbol icon={icon} size={22} />
          </motion.button>
        ))}
        {trailingIcons.length > 0 && <span className="mr-2.5" />}
      </div>
    </div>
  );
});

export { searchBarMeta } from "@/lib/m3/meta";
