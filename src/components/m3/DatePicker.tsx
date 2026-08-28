"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, type M3Spring } from "@/lib/m3/tokens";
import { MaterialSymbol } from "./MaterialSymbol";

/** tokens.ts widens `type` to `string`; framer-motion needs the "spring" literal. */
const spring = (s: M3Spring): Transition => ({ ...s, type: "spring" });

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

const WEEKDAY_INITIALS = ["S", "M", "T", "W", "T", "F", "S"] as const;

const FIRST_YEAR = 1988;

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** 6×7 grid of days (weeks start on Sunday) covering the cursor month */
function getMonthGrid(cursor: Date): Date[] {
  const first = startOfMonth(cursor);
  const start = new Date(first.getFullYear(), first.getMonth(), 1 - first.getDay());
  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) {
    cells.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  }
  return cells;
}

export interface DatePickerProps {
  /** Currently selected date */
  value?: Date;
  onChange?: (d: Date) => void;
  /** Earliest selectable date (days before are disabled) */
  minDate?: Date;
  /** Latest selectable date (days after are disabled) */
  maxDate?: Date;
  /** Stretch to the container width */
  fullWidth?: boolean;
  className?: string;
}

/**
 * M3 inline Date Picker — a rounded-[28px] surface with a month grid,
 * a tappable "month year" header that flips into a 4-column year grid
 * (1988 → current year + 10), today outlined in primary, and a
 * spring-animated selection pill shared via layoutId.
 */
export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(function DatePicker(
  { value, onChange, minDate, maxDate, fullWidth = false, className },
  ref
) {
  const [internal, setInternal] = React.useState<Date | undefined>(undefined);
  const selected = value ?? internal;
  const [cursor, setCursor] = React.useState<Date>(() => startOfMonth(value ?? new Date()));
  const [view, setView] = React.useState<"month" | "year">("month");

  const selectedYearRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (view === "year") selectedYearRef.current?.scrollIntoView({ block: "center" });
  }, [view]);

  const cells = React.useMemo(() => getMonthGrid(cursor), [cursor]);

  const years = React.useMemo(() => {
    const list: number[] = [];
    const last = new Date().getFullYear() + 10;
    for (let y = FIRST_YEAR; y <= last; y++) list.push(y);
    return list;
  }, []);

  const isDisabledDay = React.useCallback(
    (d: Date) => {
      if (minDate && startOfDay(d) < startOfDay(minDate)) return true;
      if (maxDate && startOfDay(d) > startOfDay(maxDate)) return true;
      return false;
    },
    [minDate, maxDate]
  );

  const handleSelect = (d: Date) => {
    setInternal(d);
    onChange?.(d);
  };

  const navigate = (dir: number) => {
    setCursor((c) =>
      view === "year"
        ? new Date(c.getFullYear() + dir * 12, c.getMonth(), 1)
        : new Date(c.getFullYear(), c.getMonth() + dir, 1)
    );
  };

  const today = new Date();
  const highlightYear = (selected ?? cursor).getFullYear();

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-[28px] bg-m3-surface-container-highest p-6",
        fullWidth ? "w-full" : "w-[328px]",
        className
      )}
    >
      {/* Header: month-year label + month navigation */}
      <div className="mb-1 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setView((v) => (v === "month" ? "year" : "month"))}
          className="m3-state m3-focus md-title-large cursor-pointer rounded-full px-3 py-1 text-m3-on-surface outline-none"
        >
          {view === "year"
            ? cursor.getFullYear()
            : `${MONTH_NAMES[cursor.getMonth()]} ${cursor.getFullYear()}`}
        </button>
        <div className="flex items-center">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => navigate(-1)}
            className="m3-state m3-focus flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-m3-on-surface outline-none"
          >
            <MaterialSymbol icon="chevron_left" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => navigate(1)}
            className="m3-state m3-focus flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-m3-on-surface outline-none"
          >
            <MaterialSymbol icon="chevron_right" />
          </button>
        </div>
      </div>

      {view === "month" ? (
        <>
          {/* Weekday row */}
          <div className="grid grid-cols-7 justify-items-center">
            {WEEKDAY_INITIALS.map((w, i) => (
              <span
                key={`${w}-${i}`}
                className="flex h-10 w-10 items-center justify-center md-label-medium text-m3-on-surface-variant"
              >
                {w}
              </span>
            ))}
          </div>
          {/* Day grid */}
          <div className="grid grid-cols-7 justify-items-center gap-y-1">
            {cells.map((day) => {
              const isSelected = selected !== undefined && sameDay(day, selected);
              const isToday = sameDay(day, today);
              const inMonth = day.getMonth() === cursor.getMonth();
              const disabled = isDisabledDay(day);
              return (
                <button
                  type="button"
                  key={day.getTime()}
                  disabled={disabled}
                  onClick={() => handleSelect(day)}
                  className={cn(
                    "m3-state m3-focus relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full md-body-large outline-none",
                    disabled && "pointer-events-none opacity-38",
                    !isSelected && isToday && "border border-m3-primary text-m3-primary",
                    !isSelected &&
                      !isToday &&
                      (inMonth ? "text-m3-on-surface" : "text-m3-on-surface-variant")
                  )}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="m3-day-pill"
                      className="absolute inset-0 rounded-full bg-m3-primary"
                      transition={spring(springs.expressive)}
                    />
                  )}
                  <span className={cn("relative z-10", isSelected && "text-m3-on-primary")}>
                    {day.getDate()}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        /* Year grid: 4 columns, 1988 → current year + 10 */
        <div className="m3-scroll grid h-[300px] grid-cols-4 content-start gap-1 overflow-y-auto pt-2">
          {years.map((y) => {
            const isCurrent = y === highlightYear;
            return (
              <button
                type="button"
                key={y}
                ref={isCurrent ? selectedYearRef : undefined}
                onClick={() => {
                  setCursor(new Date(y, cursor.getMonth(), 1));
                  setView("month");
                }}
                className={cn(
                  "m3-state m3-focus md-body-large h-10 cursor-pointer rounded-full outline-none",
                  isCurrent
                    ? "bg-m3-primary-container text-m3-on-primary-container"
                    : "text-m3-on-surface"
                )}
              >
                {y}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

export { datePickerMeta } from "@/lib/m3/meta";
