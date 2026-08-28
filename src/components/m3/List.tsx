"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Full-width dividers between rows (divide-y). The official list divider
   * inset is 16dp start / 24dp end (M3 lists spec) — for inset dividers use
   * <Divider inset="start" /> in flow layouts instead.
   */
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
  /** Secondary text below the headline (md-body-medium); grows the row to 72dp */
  supporting?: React.ReactNode;
  /** Small caps-style text above the headline (md-label-small) */
  overline?: string;
  /**
   * Official line count: 1 → 56dp, 2 → 72dp, 3 → 88dp.
   * Defaults to 2 when supporting/overline is set, otherwise 1.
   * lines={3} top-aligns content and wraps supporting text to two lines.
   */
  lines?: 1 | 2 | 3;
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
 * Official heights: one-line 56dp, two-line 72dp, three-line 88dp
 * (m3.material.io lists specs). Rows with onClick render as buttons with
 * state layer (8% hover / 10% pressed), ripple, native Enter/Space
 * activation and ≥48dp touch targets.
 */
export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  {
    headline,
    supporting,
    overline,
    lines,
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
  const lineCount: 1 | 2 | 3 = lines ?? (hasSupporting ? 2 : 1);
  const isThreeLine = lineCount >= 3;
  const contentColor = selected ? "text-m3-on-secondary-container" : undefined;

  const content = (
    <>
      {leading && (
        <span
          className={cn(
            "flex w-10 shrink-0 items-center justify-center",
            isThreeLine && "self-start pt-3",
            contentColor ?? "text-m3-on-surface-variant"
          )}
        >
          {leading}
        </span>
      )}
      <span className={cn("min-w-0 flex-1", isThreeLine && "self-start")}>
        {overline && <span className="md-label-small block truncate">{overline}</span>}
        <span className={cn("md-body-large block truncate", contentColor ?? "text-m3-on-surface")}>
          {headline}
        </span>
        {supporting && (
          <span
            className={cn(
              "md-body-medium block text-m3-on-surface-variant",
              isThreeLine ? "line-clamp-2" : "truncate",
              contentColor
            )}
          >
            {supporting}
          </span>
        )}
      </span>
      {(trailing !== undefined || trailingIcon !== undefined) && (
        <span
          className={cn(
            "ml-auto flex shrink-0 items-center gap-2 md-label-small",
            isThreeLine && "self-start pt-3",
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
    // Official paddings: label/leading left 16dp, trailing right 24dp
    "relative flex w-full items-center gap-4 overflow-hidden pl-4 pr-6 text-left",
    lineCount === 1 && "min-h-14", // 56dp official one-line height
    lineCount === 2 && "min-h-[72px] py-3",
    isThreeLine && "min-h-[88px] py-3",
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
      aria-current={selected ? "true" : undefined}
    >
      {isButton ? (
        <motion.button
          type="button"
          disabled={disabled}
          whileTap={disabled ? undefined : { scale: 0.98 }}
          transition={springs.fastVisual}
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
