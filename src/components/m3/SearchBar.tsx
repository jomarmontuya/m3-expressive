'use client';

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Input } from "@base-ui/react/input";
import { cn } from "@/lib/utils";
import { springs as springsTokens } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export type SearchBarSize = "sm" | "md" | "lg";

export interface SearchBarTrailingAction {
  icon: string;
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

/** Token springs retyped as framer-motion Transitions (`type` widens to string). */
const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };

/** The official search bar is md=56dp. sm/lg are library extensions. */
const sizeHeights: Record<SearchBarSize, number> = { sm: 40, md: 56, lg: 72 };

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  size?: SearchBarSize;
  /** Leading Material Symbol name (defaults to "search") */
  leadingIcon?: string;
  /**
   * Trailing Material Symbols. Strings stay decorative for compatibility;
   * pass an action object (or `onTrailingIconClick`) to render a button.
   */
  trailingIcons?: Array<string | SearchBarTrailingAction>;
  /** Legacy aggregate action handler for string entries in `trailingIcons`. */
  onTrailingIconClick?: (icon: string, index: number) => void;
  /** Called when the user presses Enter */
  onSubmit?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
}

/**
 * M3 Search bar — a rounded-full surface-container-high pill at the
 * official level-0 tonal and shadow elevation. Enter triggers `onSubmit`.
 *
 * The underlying element is Base UI's `Input` (v1.0.0-rc.0), which renders a
 * native `<input>` (via Field.Control) and stays composable with `Field`
 * wrappers. It is used standalone here because the M3 search bar carries no
 * visible label — `aria-label` falls back to the placeholder, exactly as
 * before. Trailing strings are decorative; actionable entries require an
 * explicit callback so the component never creates inert icon buttons.
 */
/** Material 3 search bar for search queries. @see https://m3.material.io/components/search/overview */
export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(function SearchBar(
  {
    value,
    onChange,
    placeholder = "Search",
    size = "md",
    leadingIcon = "search",
    trailingIcons = [],
    onTrailingIconClick,
    onSubmit,
    fullWidth = false,
    disabled = false,
    className,
    onKeyDown,
    ...props
  },
  ref
) {
  const reduceMotion = useReducedMotion() ?? false;
  const visibleTrailingIcons = trailingIcons.slice(0, 2);
  /** Trailing icon buttons get the official ≥48dp touch target (32dp on the compact size). */
  const trailingHit = size === "sm" ? "h-8 w-8" : "h-12 w-12";

  return (
    <div
      className={cn(
        "relative inline-flex min-w-0 max-w-[720px]",
        fullWidth ? "w-full" : "w-full sm:min-w-[360px] sm:w-[360px]",
        disabled && "pointer-events-none opacity-38",
        className
      )}
    >
      <div
        className={cn(
          "m3-state flex w-full items-center rounded-full px-6 transition-[background-color,box-shadow] duration-200",
          // AndroidX SearchBarDefaults uses tonal + shadow elevation level 0,
          // including while its input has focus.
          "bg-m3-surface-container-high"
        )}
        style={{ height: sizeHeights[size] }}
      >
        {leadingIcon && (
          <MaterialSymbol icon={leadingIcon} size={24} className="shrink-0 text-m3-on-surface" />
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
            onKeyDown?.(e);
          }}
          className={cn(
            "h-full min-w-0 flex-1 bg-transparent text-m3-on-surface outline-none placeholder:text-m3-on-surface-variant md-body-large",
            leadingIcon ? "ps-4" : "ps-0",
            visibleTrailingIcons.length > 0 ? "pe-1" : "pe-0"
          )}
          {...props}
        />
        {visibleTrailingIcons.map((entry, index) => {
          const icon = typeof entry === "string" ? entry : entry.icon;
          const action =
            typeof entry === "string"
              ? onTrailingIconClick
                ? () => {
                    onTrailingIconClick(icon, index);
                  }
                : undefined
              : entry.onClick;

          if (!action) {
            return (
              <span
                key={`${icon}-${index}`}
                aria-hidden="true"
                className={cn("grid shrink-0 place-items-center text-m3-on-surface-variant", trailingHit)}
              >
                <MaterialSymbol icon={icon} size={24} />
              </span>
            );
          }

          return (
            <motion.button
              key={`${icon}-${index}`}
              type="button"
              aria-label={typeof entry === "string" ? icon.replace(/_/g, " ") : entry.label}
              disabled={disabled}
              onClick={action}
              whileTap={disabled || reduceMotion ? undefined : { scale: 0.9 }}
              transition={reduceMotion ? { duration: 0 } : springs.fastVisual}
              className={cn(
                "m3-state m3-focus relative grid shrink-0 place-items-center overflow-hidden rounded-full text-m3-on-surface-variant outline-none",
                trailingHit
              )}
            >
              <Ripple disabled={disabled} />
              <MaterialSymbol icon={icon} size={24} />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
});

export { searchBarMeta } from "@/lib/m3/meta";
