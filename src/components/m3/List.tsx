"use client";

/* eslint-disable max-lines -- List and ListItem share one composite keyboard contract. */

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export type ListVariant = "standard" | "segmented";
export type ListSelectionMode = "none" | "single" | "multiple";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Current M3 Expressive list treatment. Default "standard". */
  variant?: ListVariant;
  /** Adds listbox/option semantics and roving arrow-key focus. */
  selectionMode?: ListSelectionMode;
  /**
   * Full-width dividers between rows (divide-y). The official list divider
   * inset is 16dp start / 24dp end (M3 lists spec). Use
   * <Divider inset="list" /> when an inset divider is part of the list flow.
   */
  dividers?: boolean;
  children?: React.ReactNode;
}

const ListContext = React.createContext({
  variant: "standard" as ListVariant,
  selectionMode: "none" as ListSelectionMode,
});

// No Base UI primitive for list in v1.0.0-rc.0 — custom implementation retained
// (semantic <ul>/<li> rows; selected rows expose aria-current, clickable rows
// render as real <button>s, so the a11y wiring already matches Base UI's model).

/**
 * M3 List — a vertical collection of ListItem rows.
 * Long lists scroll with the thin m3-scroll styling.
 */
/** Material 3 list for related rows. @see https://m3.material.io/components/lists/overview */
export const List = React.forwardRef<HTMLUListElement, ListProps>(function List(
  {
    variant = "standard",
    selectionMode = "none",
    dividers = false,
    className,
    children,
    onFocus,
    onKeyDown,
    role,
    tabIndex,
    ...props
  },
  ref,
) {
  const selectable = selectionMode !== "none";

  const focusOption = (list: HTMLUListElement, index: number) => {
    const options = Array.from(
      list.querySelectorAll<HTMLElement>(
        '[role="option"]:not([aria-disabled="true"])',
      ),
    );
    options[Math.min(options.length - 1, Math.max(0, index))]?.focus();
  };

  const handleFocus = (event: React.FocusEvent<HTMLUListElement>) => {
    onFocus?.(event);
    if (!selectable || event.defaultPrevented || event.target !== event.currentTarget)
      return;
    const options = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        '[role="option"]:not([aria-disabled="true"])',
      ),
    );
    if (options.length === 0) return;
    (options.find((option) => option.getAttribute("aria-selected") === "true") ??
      options[0])?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    onKeyDown?.(event);
    if (!selectable || event.defaultPrevented) return;
    const options = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        '[role="option"]:not([aria-disabled="true"])',
      ),
    );
    const current = options.findIndex((option) => option === document.activeElement);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusOption(event.currentTarget, current < 0 ? 0 : (current + 1) % options.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusOption(
        event.currentTarget,
        current < 0 ? options.length - 1 : (current - 1 + options.length) % options.length,
      );
    } else if (event.key === "Home") {
      event.preventDefault();
      focusOption(event.currentTarget, 0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusOption(event.currentTarget, options.length - 1);
    }
  };

  return (
    <ListContext.Provider value={{ variant, selectionMode }}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- listbox keyboard navigation lives on the ul composite */}
      <ul
        ref={ref}
        data-variant={variant}
        role={selectable ? "listbox" : role}
        aria-multiselectable={selectionMode === "multiple" ? true : undefined}
        tabIndex={selectable ? (tabIndex ?? 0) : tabIndex}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        className={cn(
          "m3-scroll flex w-full flex-col px-2",
          variant === "segmented" && [
            "gap-0.5",
            "[&>li:first-child>*:not([data-selected])]:rounded-t-[16px] [&>li:first-child>*:not([data-selected])]:rounded-b-[4px]",
            "[&>li:last-child>*:not([data-selected])]:rounded-t-[4px] [&>li:last-child>*:not([data-selected])]:rounded-b-[16px]",
            "[&>li:only-child>*:not([data-selected])]:rounded-[16px]",
            "[&>li:not(:first-child):not(:last-child)>*:not([data-selected])]:rounded-[4px]",
          ],
          dividers &&
            variant === "standard" &&
            "divide-y divide-m3-outline-variant",
          className,
        )}
        {...props}
      >
        {children}
      </ul>
    </ListContext.Provider>
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
  /** Leading slot — a 20px MaterialSymbol or an avatar */
  leading?: React.ReactNode;
  /** Trailing text, e.g. metadata ("128") */
  trailing?: React.ReactNode;
  /** Trailing 20px Material Symbol name (shortcut for trailing icon) */
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
export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  function ListItem(
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
    ref,
  ) {
    const reduceMotion = useReducedMotion() ?? false;
    const isButton = Boolean(onClick);
    const { variant, selectionMode } = React.useContext(ListContext);
    const selectable = selectionMode !== "none";
    const hasSupporting = supporting !== undefined || overline !== undefined;
    const lineCount: 1 | 2 | 3 = lines ?? (hasSupporting ? 2 : 1);
    const isThreeLine = lineCount >= 3;
    const contentColor = selected
      ? "text-m3-on-secondary-container"
      : undefined;

    const content = (
      <>
        {leading && (
          <span
            className={cn(
              "flex w-10 shrink-0 items-center justify-center [&_.material-symbols-rounded]:text-[20px]!",
              isThreeLine && "self-start",
              contentColor ?? "text-m3-on-surface-variant",
            )}
          >
            {leading}
          </span>
        )}
        <span className={cn("min-w-0 flex-1", isThreeLine && "self-start")}>
          {overline && (
            <span className="md-label-small block truncate">{overline}</span>
          )}
          <span
            className={cn(
              "md-body-large block truncate",
              contentColor ?? "text-m3-on-surface",
            )}
          >
            {headline}
          </span>
          {supporting && (
            <span
              className={cn(
                "md-body-medium block text-m3-on-surface-variant",
                isThreeLine ? "line-clamp-2" : "truncate",
                contentColor,
              )}
            >
              {supporting}
            </span>
          )}
        </span>
        {(trailing !== undefined || trailingIcon !== undefined || selected) && (
          <span
            className={cn(
              "ms-auto flex shrink-0 items-center gap-2 md-label-small [&_.material-symbols-rounded]:text-[20px]!",
              isThreeLine && "self-start",
              contentColor ?? "text-m3-on-surface-variant",
            )}
          >
            {trailing}
            {trailingIcon && <MaterialSymbol icon={trailingIcon} size={20} />}
            {selected && (
              <MaterialSymbol
                icon={
                  selectionMode === "multiple"
                    ? "check_box"
                    : selectionMode === "single"
                      ? "radio_button_checked"
                      : "check"
                }
                size={20}
                fill
              />
            )}
          </span>
        )}
      </>
    );

    const rowClassName = cn(
      // Current expressive list tokens use 16dp inline padding.
      "relative flex w-full items-center gap-4 overflow-hidden ps-4 pe-4 text-start",
      lineCount === 1 && "min-h-14", // 56dp official one-line height
      lineCount === 2 && "min-h-[72px] py-3",
      // The row's 12dp top padding aligns every three-line slot once. Child
      // slots must not add another 12dp and drift to 24dp from the top.
      isThreeLine && "min-h-[88px] py-3",
      selected
        ? "rounded-[16px] bg-m3-secondary-container text-m3-on-secondary-container"
        : variant === "segmented"
          ? "bg-m3-surface"
          : "rounded-[4px] bg-transparent",
      !disabled && isButton && "m3-state m3-focus cursor-pointer outline-none",
    );

    return (
      <li
        ref={ref}
        className={cn(disabled && "opacity-38", className)}
        aria-current={!selectable && selected ? "true" : undefined}
      >
        {isButton ? (
          <motion.button
            type="button"
            disabled={disabled}
            role={selectable ? "option" : undefined}
            aria-selected={selectable ? selected : undefined}
            aria-disabled={selectable && disabled ? true : undefined}
            data-selected={selected ? "" : undefined}
            tabIndex={selectable ? -1 : undefined}
            whileHover={
              disabled || reduceMotion
                ? undefined
                : { borderRadius: selected ? 16 : 12 }
            }
            whileFocus={
              disabled || reduceMotion ? undefined : { borderRadius: 16 }
            }
            whileTap={
              disabled || reduceMotion
                ? undefined
                : { scale: 0.98, borderRadius: 16 }
            }
            transition={reduceMotion ? { duration: 0 } : springs.fastVisual}
            onClick={onClick}
            className={rowClassName}
          >
            <Ripple />
            {content}
          </motion.button>
        ) : (
          <div
            role={selectable ? "option" : undefined}
            aria-selected={selectable ? selected : undefined}
            aria-disabled={selectable && disabled ? true : undefined}
            data-selected={selected ? "" : undefined}
            tabIndex={selectable ? -1 : undefined}
            className={rowClassName}
          >
            {content}
          </div>
        )}
      </li>
    );
  },
);

export { listMeta } from "@/lib/m3/meta";
