'use client';

import * as React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Input } from "@base-ui/react/input";
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
 *
 * The underlying element is Base UI's `Input` (v1.0.0-rc.0), which renders a
 * native `<input>` (via Field.Control) and stays composable with `Field`
 * wrappers. It is used standalone here because the M3 search bar carries no
 * visible label — `aria-label` falls back to the placeholder, exactly as
 * before. The elevated pill shell, focus elevation and trailing icon
 * buttons remain custom M3 visuals.
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

  /** Trailing icon buttons get the official ≥48dp touch target (32dp on the compact size). */
  const trailingHit = size === "sm" ? "h-8 w-8" : "h-12 w-12";

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
        <Input
          ref={ref}
          type="text"
          role="searchbox"
          aria-label={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit?.();
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "h-full min-w-0 flex-1 bg-transparent pl-4 text-m3-on-surface outline-none placeholder:text-m3-on-surface-variant md-body-large",
            trailingIcons.length > 0 ? "pr-1" : "pr-4"
          )}
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
            className={cn(
              "m3-state relative mr-1 grid shrink-0 place-items-center overflow-hidden rounded-full text-m3-on-surface",
              trailingHit
            )}
          >
            <Ripple disabled={disabled} />
            <MaterialSymbol icon={icon} size={24} />
          </motion.button>
        ))}
        {trailingIcons.length > 0 && <span className="mr-3" />}
      </div>
    </div>
  );
});

export { searchBarMeta } from "@/lib/m3/meta";
