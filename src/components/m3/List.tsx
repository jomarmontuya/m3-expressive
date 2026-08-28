"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, type M3Spring } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

/** tokens.ts widens `type` to `string`; framer-motion needs the "spring" literal. */
const spring = (s: M3Spring): Transition => ({ ...s, type: "spring" });

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Thin dividers between rows */
  dividers?: boolean;
  children?: React.ReactNode;
}

/**
 * M3 List — a vertical collection of ListItem rows.
 * Long lists scroll with the thin m3-scroll styling.
 */
export const List = React.forwardRef<HTMLUListElement, ListProps>(function List(
  { dividers = false, className, children, ...props },
  ref
) {
  return (
    <ul
      ref={ref}
      className={cn(
        "m3-scroll flex w-full flex-col",
        dividers && "divide-y divide-m3-outline-variant",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
});

export interface ListItemProps {
  /** Primary text (md-body-large) */
  headline: React.ReactNode;
  /** Secondary text below the headline (md-body-medium) */
  supporting?: React.ReactNode;
  /** Small caps-style text above the headline (md-label-small) */
  overline?: string;
  /** Leading slot — a 24px MaterialSymbol or an avatar */
  leading?: React.ReactNode;
  /** Trailing text, e.g. metadata ("128") */
  trailing?: React.ReactNode;
  /** Trailing Material Symbol name (shortcut for trailing icon) */
  trailingIcon?: string;
  /** Highlights the row with the secondary container color */
  selected?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

/**
 * M3 ListItem — a single list row.
 * One-line rows are min-h-14; adding supporting/overline text grows to min-h-[72px].
 * Rows with onClick render as buttons with state layer, ripple and press feedback.
 */
export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  {
    headline,
    supporting,
    overline,
    leading,
    trailing,
    trailingIcon,
    selected = false,
    disabled = false,
    onClick,
    className,
  },
  ref
) {
  const isButton = Boolean(onClick);
  const hasSupporting = supporting !== undefined || overline !== undefined;
  const contentColor = selected ? "text-m3-on-secondary-container" : undefined;

  const content = (
    <>
      {leading && (
        <span
          className={cn(
            "flex w-10 shrink-0 items-center justify-center",
            contentColor ?? "text-m3-on-surface-variant"
          )}
        >
          {leading}
        </span>
      )}
      <span className="min-w-0 flex-1">
        {overline && <span className="md-label-small block truncate">{overline}</span>}
        <span className={cn("md-body-large block truncate", contentColor ?? "text-m3-on-surface")}>
          {headline}
        </span>
        {supporting && (
          <span className={cn("md-body-medium block truncate", contentColor ?? "text-m3-on-surface-variant")}>
            {supporting}
          </span>
        )}
      </span>
      {(trailing !== undefined || trailingIcon !== undefined) && (
        <span
          className={cn(
            "ml-auto flex shrink-0 items-center gap-2 md-label-small",
            contentColor ?? "text-m3-on-surface-variant"
          )}
        >
          {trailing}
          {trailingIcon && <MaterialSymbol icon={trailingIcon} size={24} />}
        </span>
      )}
    </>
  );

  const rowClassName = cn(
    "relative flex w-full items-center gap-4 overflow-hidden px-4 text-left",
    hasSupporting ? "min-h-[72px] py-3" : "min-h-14",
    !disabled && isButton && "m3-state m3-focus cursor-pointer outline-none"
  );

  return (
    <li
      ref={ref}
      className={cn(
        selected && "bg-m3-secondary-container text-m3-on-secondary-container",
        disabled && "opacity-38",
        className
      )}
    >
      {isButton ? (
        <motion.button
          type="button"
          disabled={disabled}
          whileTap={disabled ? undefined : { scale: 0.98 }}
          transition={spring(springs.fastVisual)}
          onClick={onClick}
          className={rowClassName}
        >
          <Ripple />
          {content}
        </motion.button>
      ) : (
        <div className={rowClassName}>{content}</div>
      )}
    </li>
  );
});

export { listMeta } from "@/lib/m3/meta";
