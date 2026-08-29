"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { durations, springs } from "@/lib/m3/tokens";
import { useTextDirection, type TextDirection } from "@/lib/m3/use-text-direction";
import { MaterialSymbol } from "./MaterialSymbol";
import { TextField } from "./TextField";

const FIRST_YEAR = 1900;
const LAST_YEAR = 2100;

interface LocaleWeekConfig {
  firstDay: number;
  weekdays: Array<{ initial: string; long: string }>;
}

/** Locale first-day data comes from CLDR through Intl.Locale when available. */
function getLocaleWeekConfig(locale?: string): LocaleWeekConfig {
  const resolvedLocale = new Intl.DateTimeFormat(locale).resolvedOptions().locale;
  const localeApi = new Intl.Locale(resolvedLocale) as Intl.Locale & {
    getWeekInfo?: () => { firstDay: number };
    weekInfo?: { firstDay: number };
  };
  const weekInfo = localeApi.getWeekInfo?.() ?? localeApi.weekInfo;
  const firstDay = (weekInfo?.firstDay ?? 7) % 7;
  const narrow = new Intl.DateTimeFormat(locale, { weekday: "narrow" });
  const long = new Intl.DateTimeFormat(locale, { weekday: "long" });
  const sunday = new Date(2024, 0, 7);
  const weekdays = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(2024, 0, sunday.getDate() + ((firstDay + index) % 7));
    return { initial: narrow.format(day), long: long.format(day) };
  });
  return { firstDay, weekdays };
}

function monthName(month: number, locale?: string, width: "long" | "short" = "long"): string {
  return new Intl.DateTimeFormat(locale, { month: width }).format(new Date(2024, month, 1));
}

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

function isoOf(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

/** 6×7 grid of days covering the cursor month in locale week order. */
function getMonthGrid(cursor: Date, firstDay: number): Date[] {
  const first = startOfMonth(cursor);
  const leadingDays = (first.getDay() - firstDay + 7) % 7;
  const start = new Date(first.getFullYear(), first.getMonth(), 1 - leadingDays);
  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) {
    cells.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  }
  return cells;
}

/** Modal header headline — "Fri, Aug 21" per the official selected-date header */
function formatHeadline(d: Date, locale?: string): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(d);
}

/** "Aug 21" — range-pair format for the modal header (month short + day) */
function formatShort(d: Date, locale?: string): string {
  return new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }).format(d);
}

/** Official date-range shape (androidx DateRangePicker / MaterialDatePicker) */
export interface DateRange {
  start?: Date;
  end?: Date;
}

/**
 * Range tap state machine (androidx DateRangePicker convention):
 * no start → tap sets start · start-only → tap ≥ start completes the range,
 * tap < start restarts with a new start · complete → tap restarts fresh.
 */
function advanceRange(current: DateRange, d: Date): DateRange {
  if (!current.start) return { start: d, end: undefined };
  if (!current.end) {
    if (startOfDay(d) >= startOfDay(current.start)) return { start: current.start, end: d };
    return { start: d, end: undefined };
  }
  return { start: d, end: undefined };
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, details, [tabindex]:not([tabindex="-1"])';

export type DatePickerDisplayMode = "calendar" | "input";

interface DatePickerInputProps {
  label?: string;
  locale?: string;
  value?: Date;
  onChange?: (d: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  requestFocus?: boolean;
}

/** Official single-date input configuration, localized to the browser date order. */
function DatePickerInput({
  label = "Date",
  locale,
  value,
  onChange,
  minDate,
  maxDate,
  requestFocus = false,
}: DatePickerInputProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const format = React.useMemo(() => {
    const parts = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date(2006, 10, 22));
    const order = parts
      .filter((part) => part.type === "year" || part.type === "month" || part.type === "day")
      .map((part) => part.type as "year" | "month" | "day");
    const separators: string[] = [];
    let sawDatePart = false;
    let pendingLiteral = "";
    for (const part of parts) {
      if (part.type === "year" || part.type === "month" || part.type === "day") {
        if (sawDatePart) separators.push(pendingLiteral || "/");
        sawDatePart = true;
        pendingLiteral = "";
      } else if (sawDatePart) {
        pendingLiteral += part.value;
      }
    }
    const pattern = order
      .map((part, index) => {
        const token = part === "year" ? "YYYY" : part === "month" ? "MM" : "DD";
        return `${token}${separators[index] ?? ""}`;
      })
      .join("");
    return { order, separators, pattern };
  }, [locale]);

  const digitsFor = React.useCallback(
    (date: Date) =>
      format.order
        .map((part) =>
          part === "year"
            ? String(date.getFullYear()).padStart(4, "0")
            : part === "month"
              ? String(date.getMonth() + 1).padStart(2, "0")
              : String(date.getDate()).padStart(2, "0")
        )
        .join(""),
    [format.order]
  );

  const displayDigits = React.useCallback(
    (digits: string) => {
      const lengths = format.order.map((part) => (part === "year" ? 4 : 2));
      let cursor = 0;
      return lengths
        .map((length, index) => {
          const segment = digits.slice(cursor, cursor + length);
          cursor += length;
          const hasFollowingDigits = digits.length > cursor;
          return `${segment}${segment && hasFollowingDigits ? (format.separators[index] ?? "") : ""}`;
        })
        .join("");
    },
    [format]
  );

  const [text, setText] = React.useState(() => (value ? displayDigits(digitsFor(value)) : ""));
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    setText(value ? displayDigits(digitsFor(value)) : "");
    setError("");
  }, [value, digitsFor, displayDigits]);

  React.useEffect(() => {
    if (!requestFocus) return;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [requestFocus]);

  const handleInput = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 8);
    setText(displayDigits(digits));
    if (digits.length < 8) {
      setError("");
      return;
    }

    let cursor = 0;
    const values: Partial<Record<"year" | "month" | "day", number>> = {};
    for (const part of format.order) {
      const length = part === "year" ? 4 : 2;
      values[part] = Number(digits.slice(cursor, cursor + length));
      cursor += length;
    }
    const next = new Date(values.year ?? 0, (values.month ?? 1) - 1, values.day ?? 1);
    const valid =
      next.getFullYear() === values.year &&
      next.getMonth() === (values.month ?? 1) - 1 &&
      next.getDate() === values.day &&
      next.getFullYear() >= FIRST_YEAR &&
      next.getFullYear() <= LAST_YEAR;
    if (!valid) {
      setError(`Enter a valid date in ${format.pattern} format`);
      return;
    }
    if (minDate && startOfDay(next) < startOfDay(minDate)) {
      setError(`Date must be on or after ${minDate.toLocaleDateString()}`);
      return;
    }
    if (maxDate && startOfDay(next) > startOfDay(maxDate)) {
      setError(`Date must be on or before ${maxDate.toLocaleDateString()}`);
      return;
    }
    setError("");
    onChange?.(next);
  };

  return (
    <div className="px-6 py-4">
      <TextField
        ref={inputRef}
        variant="outlined"
        label={label}
        placeholder={format.pattern}
        value={text}
        onChange={(e) => handleInput(e.target.value)}
        helperText={error || format.pattern}
        error={error !== ""}
        inputMode="numeric"
        autoComplete="off"
        fullWidth
        className="[&_label]:bg-m3-surface-container-high!"
      />
    </div>
  );
}

interface DateRangePickerInputProps {
  range?: DateRange;
  onRangeChange?: (range: DateRange) => void;
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
  requestFocus?: boolean;
}

/** Official range input mode: separate localized start and end date fields. */
function DateRangePickerInput({
  range,
  onRangeChange,
  minDate,
  maxDate,
  locale,
  requestFocus = false,
}: DateRangePickerInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <DatePickerInput
        label="Start date"
        locale={locale}
        value={range?.start}
        minDate={minDate}
        maxDate={maxDate}
        requestFocus={requestFocus}
        onChange={(start) => {
          const end = range?.end && startOfDay(range.end) >= startOfDay(start) ? range.end : undefined;
          onRangeChange?.({ start, end });
        }}
      />
      <DatePickerInput
        label="End date"
        locale={locale}
        value={range?.end}
        minDate={range?.start ?? minDate}
        maxDate={maxDate}
        onChange={(end) => onRangeChange?.({ start: range?.start, end })}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared calendar internals                                           */
/* ------------------------------------------------------------------ */

interface DatePickerCalendarProps {
  direction: TextDirection;
  locale?: string;
  value?: Date;
  onChange?: (d: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  /** Slide/fade micro-transition on the month-year label (modal only). */
  animatedHeader?: boolean;
  /** 'single' (default) picks one date; 'range' picks a start/end pair. */
  selectionMode?: "single" | "range";
  /** Range mode — selected range; uncontrolled when omitted. */
  range?: DateRange;
  /** Range mode — fires on every tap with the next range (partial included). */
  onRangeChange?: (r: DateRange) => void;
  /** Single-date mode only: opens the official date-input configuration. */
  onRequestInput?: () => void;
}

/**
 * Header row + month grid + year grid, shared verbatim by the inline and
 * modal presentations. No outer panel/padding — the caller supplies the
 * surface. Owns its view state (cursor, month/year, roving tabindex), so
 * each mount starts on the selected/today month.
 */
function DatePickerCalendar({
  direction,
  locale,
  value,
  onChange,
  minDate,
  maxDate,
  animatedHeader = false,
  selectionMode = "single",
  range,
  onRangeChange,
  onRequestInput,
}: DatePickerCalendarProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [internal, setInternal] = React.useState<Date | undefined>(undefined);
  const wasControlled = React.useRef(value !== undefined);
  if (value !== undefined) wasControlled.current = true;
  const selected = wasControlled.current ? value : internal;
  const [internalRange, setInternalRange] = React.useState<DateRange>({});
  const rangeOn = selectionMode === "range";
  const rangeWasControlled = React.useRef(range !== undefined);
  if (range !== undefined) rangeWasControlled.current = true;
  const rangeSel = rangeOn
    ? rangeWasControlled.current
      ? range
      : internalRange
    : undefined;
  // Hover/focus preview source while only the start of the range is set
  const [hoverDate, setHoverDate] = React.useState<Date | undefined>(undefined);
  const previewFrom =
    rangeOn && rangeSel?.start !== undefined && rangeSel?.end === undefined
      ? rangeSel.start
      : undefined;
  const [cursor, setCursor] = React.useState<Date>(() => startOfMonth(value ?? range?.start ?? new Date()));
  const [view, setView] = React.useState<"month" | "year">("month");
  const [rovingOverride, setRovingOverride] = React.useState<string | null>(null);
  // Scope the shared selection pill so multiple pickers never cross-animate
  const pillId = React.useId();

  const selectedYearRef = React.useRef<HTMLButtonElement | null>(null);
  const gridRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (view === "year") selectedYearRef.current?.scrollIntoView({ block: "center" });
  }, [view]);

  React.useEffect(() => {
    setRovingOverride(null);
  }, [cursor]);

  const localeWeek = React.useMemo(() => getLocaleWeekConfig(locale), [locale]);
  const cells = React.useMemo(
    () => getMonthGrid(cursor, localeWeek.firstDay),
    [cursor, localeWeek.firstDay]
  );

  const years = React.useMemo(() => {
    const list: number[] = [];
    for (let y = FIRST_YEAR; y <= LAST_YEAR; y++) list.push(y);
    return list;
  }, []);

  const isDisabledDay = React.useCallback(
    (d: Date) => {
      if (d.getFullYear() < FIRST_YEAR || d.getFullYear() > LAST_YEAR) return true;
      if (minDate && startOfDay(d) < startOfDay(minDate)) return true;
      if (maxDate && startOfDay(d) > startOfDay(maxDate)) return true;
      return false;
    },
    [minDate, maxDate]
  );

  const handleSelect = (d: Date) => {
    if (rangeOn) {
      const next = advanceRange(rangeSel ?? {}, d);
      setInternalRange(next);
      onRangeChange?.(next);
      return;
    }
    setInternal(d);
    onChange?.(d);
  };

  const navigate = (dir: number) => {
    setCursor((current) => {
      const next =
        view === "year"
          ? new Date(current.getFullYear() + dir * 12, current.getMonth(), 1)
          : new Date(current.getFullYear(), current.getMonth() + dir, 1);
      if (next.getFullYear() < FIRST_YEAR) return new Date(FIRST_YEAR, 0, 1);
      if (next.getFullYear() > LAST_YEAR) return new Date(LAST_YEAR, 11, 1);
      return next;
    });
  };

  // Stable per mount: the useMemo below (activeIso) depends on `today`.
  const today = React.useMemo(() => new Date(), []);
  // Range mode anchors on the range start (the first picked day)
  const anchor = rangeOn ? rangeSel?.start : selected;
  const highlightYear = (anchor ?? cursor).getFullYear();

  // Roving tabindex anchor: selected day in view → today → first enabled day of month.
  const activeIso = React.useMemo(() => {
    if (rovingOverride) return rovingOverride;
    const inView = (d: Date) => cells.some((c) => sameDay(c, d));
    const pick =
      (anchor && inView(anchor) && !isDisabledDay(anchor) ? anchor : undefined) ??
      (inView(today) && !isDisabledDay(today) ? today : undefined) ??
      cells.find((c) => c.getMonth() === cursor.getMonth() && !isDisabledDay(c)) ??
      cells.find((c) => !isDisabledDay(c)) ??
      cells[0];
    return isoOf(pick);
  }, [rovingOverride, cells, anchor, today, cursor, isDisabledDay]);

  const focusCell = (iso: string) => {
    requestAnimationFrame(() => {
      gridRef.current
        ?.querySelector<HTMLButtonElement>(`button[data-iso="${iso}"]`)
        ?.focus();
    });
  };

  /** Official calendar grid keys: arrows, week bounds, and month/year paging. */
  const handleDayKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    const current = cells[idx];
    let target: Date | undefined;
    if (e.key === "ArrowLeft") {
      target = new Date(
        current.getFullYear(),
        current.getMonth(),
        current.getDate() + (direction === "rtl" ? 1 : -1),
      );
    } else if (e.key === "ArrowRight") {
      target = new Date(
        current.getFullYear(),
        current.getMonth(),
        current.getDate() + (direction === "rtl" ? -1 : 1),
      );
    }
    else if (e.key === "ArrowUp") target = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 7);
    else if (e.key === "ArrowDown") target = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 7);
    else if (e.key === "Home") target = new Date(current.getFullYear(), current.getMonth(), current.getDate() - (idx % 7));
    else if (e.key === "End") target = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 6 - (idx % 7));
    else if (e.key === "PageUp" || e.key === "PageDown") {
      const direction = e.key === "PageUp" ? -1 : 1;
      const targetMonth = current.getMonth() + (e.shiftKey ? direction * 12 : direction);
      const lastDay = new Date(current.getFullYear(), targetMonth + 1, 0).getDate();
      target = new Date(current.getFullYear(), targetMonth, Math.min(current.getDate(), lastDay));
    } else return;
    e.preventDefault();
    if (target.getFullYear() < FIRST_YEAR || target.getFullYear() > LAST_YEAR || isDisabledDay(target)) return;
    if (target.getMonth() !== cursor.getMonth() || target.getFullYear() !== cursor.getFullYear()) {
      setCursor(startOfMonth(target));
    }
    setRovingOverride(isoOf(target));
    focusCell(isoOf(target));
  };

  const weekRows: Date[][] = [];
  for (let r = 0; r < 6; r++) weekRows.push(cells.slice(r * 7, r * 7 + 7));

  const headerLabel =
    view === "year"
      ? String(cursor.getFullYear())
      : `${monthName(cursor.getMonth(), locale)} ${cursor.getFullYear()}`;

  const selectedPillClass = "bg-m3-primary";
  const selectedTextClass = "text-m3-on-primary";

  return (
    <>
      {/* Header: month-year label + month navigation */}
      <div className="mb-1 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setView((v) => (v === "month" ? "year" : "month"))}
          className="m3-state m3-focus md-title-large cursor-pointer rounded-full px-3 py-1 whitespace-nowrap text-m3-on-surface outline-none"
        >
          {animatedHeader ? (
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={headerLabel}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                transition={reduceMotion ? { duration: 0 } : springs.fastVisual}
                className="block"
              >
                {headerLabel}
              </motion.span>
            </AnimatePresence>
          ) : (
            headerLabel
          )}
        </button>
        <div className="flex items-center">
          {onRequestInput && !rangeOn && (
            <button
              type="button"
              aria-label="Switch to date input"
              onClick={onRequestInput}
              className="m3-state m3-focus flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-m3-on-surface outline-none"
            >
              <MaterialSymbol icon="edit" />
            </button>
          )}
          <button
            type="button"
            aria-label={view === "year" ? "Previous years" : "Previous month"}
            onClick={() => navigate(-1)}
            className="m3-state m3-focus flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-m3-on-surface outline-none"
          >
            <MaterialSymbol icon={direction === "rtl" ? "chevron_right" : "chevron_left"} />
          </button>
          <button
            type="button"
            aria-label={view === "year" ? "Next years" : "Next month"}
            onClick={() => navigate(1)}
            className="m3-state m3-focus flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-m3-on-surface outline-none"
          >
            <MaterialSymbol icon={direction === "rtl" ? "chevron_left" : "chevron_right"} />
          </button>
        </div>
      </div>

      {view === "month" ? (
        <div role="grid" ref={gridRef}>
          {/* Weekday row */}
          <div role="row" className="grid grid-cols-7 justify-items-center">
            {localeWeek.weekdays.map((w, i) => (
              <span
                key={`${w.long}-${i}`}
                role="columnheader"
                aria-label={w.long}
                className="flex h-10 w-10 items-center justify-center md-label-medium text-m3-on-surface-variant"
              >
                {w.initial}
              </span>
            ))}
          </div>
          {/* Day grid — 40dp circular cells, roving tabindex + arrow keys */}
          {weekRows.map((week, r) => (
            <div key={`week-${r}`} role="row" className="grid grid-cols-7 justify-items-center">
              {week.map((day, c) => {
                const iso = isoOf(day);
                const idx = r * 7 + c;
                const isSelected = !rangeOn && selected !== undefined && sameDay(day, selected);
                const isToday = sameDay(day, today);
                const inMonth = day.getMonth() === cursor.getMonth();
                const disabled = isDisabledDay(day);
                // Range mode: committed membership
                const isRangeStart = rangeOn && rangeSel?.start !== undefined && sameDay(day, rangeSel.start);
                const isRangeEnd = rangeOn && rangeSel?.end !== undefined && sameDay(day, rangeSel.end);
                const inCommittedRange =
                  rangeOn &&
                  rangeSel?.start !== undefined &&
                  rangeSel?.end !== undefined &&
                  startOfDay(day) > startOfDay(rangeSel.start) &&
                  startOfDay(day) < startOfDay(rangeSel.end);
                // Tentative preview while only the start is set: hovering/focusing a
                // later day paints the band start→hover, an earlier day previews a restart.
                const previewEnd =
                  previewFrom !== undefined &&
                  hoverDate !== undefined &&
                  sameDay(day, hoverDate) &&
                  startOfDay(day) > startOfDay(previewFrom);
                const inPreviewRange =
                  previewFrom !== undefined &&
                  hoverDate !== undefined &&
                  startOfDay(day) > startOfDay(previewFrom) &&
                  startOfDay(day) < startOfDay(hoverDate);
                const previewRestart =
                  previewFrom !== undefined &&
                  hoverDate !== undefined &&
                  sameDay(day, hoverDate) &&
                  startOfDay(day) < startOfDay(previewFrom);
                // Band segment per cell: start = inline-end half (rounded at inline-start,
                // hidden under the circle), end = inline-start half (rounded at inline-end),
                // in-between = full and square;
                // square cuts at week-row edges, 4dp vertical inset (inset-y-1).
                const bandKind: string | null =
                  isRangeStart && !isRangeEnd ? "start"
                  : isRangeEnd && !isRangeStart ? "end"
                  : inCommittedRange ? "mid"
                  : previewEnd ? "preview-end"
                  : inPreviewRange ? "preview-mid"
                  : null;
                const rangeProps =
                  rangeOn && previewFrom !== undefined
                    ? {
                        onMouseEnter: () => setHoverDate(day),
                        onMouseLeave: () => setHoverDate(undefined),
                        onFocus: () => setHoverDate(day),
                        onBlur: () => setHoverDate(undefined),
                      }
                    : {};
                return (
                  <div
                    key={iso}
                    role="gridcell"
                    aria-selected={
                      isSelected || isRangeStart || isRangeEnd || inCommittedRange || undefined
                    }
                    aria-current={isToday ? "date" : undefined}
                    aria-disabled={disabled || undefined}
                    className="relative flex w-full items-center justify-center"
                  >
                    {bandKind && (
                      <span
                        aria-hidden="true"
                        className={cn(
                          "pointer-events-none absolute inset-y-1",
                          bandKind === "start" &&
                            "start-1/2 end-0 rounded-s-full bg-m3-secondary-container",
                          bandKind === "end" &&
                            "start-0 end-1/2 rounded-e-full bg-m3-secondary-container",
                          bandKind === "mid" && "inset-x-0 bg-m3-secondary-container",
                          bandKind === "preview-end" &&
                            "start-0 end-1/2 rounded-e-full bg-m3-secondary-container/44",
                          bandKind === "preview-mid" && "inset-x-0 bg-m3-secondary-container/44"
                        )}
                      />
                    )}
                    <button
                      type="button"
                      data-iso={iso}
                      disabled={disabled}
                      tabIndex={iso === activeIso ? 0 : -1}
                      aria-label={`${monthName(day.getMonth(), locale)} ${day.getDate()}, ${day.getFullYear()}${
                        isRangeStart ? ", start of range" : isRangeEnd ? ", end of range" : ""
                      }`}
                      onClick={() => handleSelect(day)}
                      onKeyDown={(e) => handleDayKeyDown(e, idx)}
                      {...rangeProps}
                      className={cn(
                        "m3-state m3-focus relative my-0.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full md-body-large outline-none",
                        disabled && "pointer-events-none opacity-38",
                        !isSelected && isToday && "border border-m3-primary text-m3-primary",
                        !isSelected && (previewEnd || previewRestart) && "border border-m3-primary",
                        !isSelected &&
                          !isToday &&
                          !previewEnd &&
                          !previewRestart &&
                          (inMonth ? "text-m3-on-surface" : "text-m3-on-surface-variant")
                      )}
                    >
                      {rangeOn ? (
                        isRangeStart && (
                          <motion.span
                            layoutId={`${pillId}-start`}
                            className={cn("absolute inset-0 rounded-full", selectedPillClass)}
                            transition={reduceMotion ? { duration: 0 } : springs.expressive}
                          />
                        )
                      ) : (
                        isSelected && (
                          <motion.span
                            layoutId={pillId}
                            className={cn("absolute inset-0 rounded-full", selectedPillClass)}
                            transition={reduceMotion ? { duration: 0 } : springs.expressive}
                          />
                        )
                      )}
                      {rangeOn && isRangeEnd && !isRangeStart && (
                        <motion.span
                          layoutId={`${pillId}-end`}
                          className={cn("absolute inset-0 rounded-full", selectedPillClass)}
                          transition={reduceMotion ? { duration: 0 } : springs.expressive}
                        />
                      )}
                      <span
                        className={cn(
                          "relative z-10",
                          (isSelected || isRangeStart || isRangeEnd) && selectedTextClass,
                          inCommittedRange && "text-m3-on-secondary-container"
                        )}
                      >
                        {day.getDate()}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        /* Official year grid: 3 columns, 1900–2100. */
        <div className="m3-scroll grid h-[300px] grid-cols-3 justify-items-center gap-x-3 gap-y-2 overflow-y-auto pt-2">
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
                  "m3-state m3-focus md-body-large h-9 w-[72px] cursor-pointer rounded-full outline-none",
                  isCurrent
                    ? "bg-m3-primary text-m3-on-primary"
                    : "text-m3-on-surface-variant"
                )}
              >
                {y}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Modal presentation (official M3 date picker dialog)                 */
/* ------------------------------------------------------------------ */

interface DatePickerModalProps {
  locale?: string;
  value?: Date;
  onChange?: (d: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnSelect?: boolean;
  className?: string;
  selectionMode?: "single" | "range";
  range?: DateRange;
  onRangeChange?: (r: DateRange) => void;
  initialDisplayMode?: DatePickerDisplayMode;
  showModeToggle?: boolean;
  confirmLabel?: string;
  dismissLabel?: string;
  onConfirm?: (selection: Date | DateRange) => void;
  onDismiss?: () => void;
}

/**
 * Official modal date picker: a 360×568dp role="dialog" on
 * surface-container-high, 28dp corners, elevation 3, over a 32% scrim.
 * Calendar/input edits are staged until the dismiss/confirm action row.
 * `closeOnSelect` retains the legacy live-apply flow as an opt-in. Focus
 * moves to the selected/today day on open, Tab is trapped, and focus is
 * restored to the opener on close (same pattern as Dialog).
 *
 * selectionMode="range": the header shows "Start date" / "End date"
 * placeholders (or the formatted pair "Aug 21 – Aug 28") and the dialog
 * closes only once a COMPLETE range is picked — a start-only day tap keeps
 * it open. Escape/scrim mid-selection dismiss without fabricating an end.
 */
const DatePickerModal = React.forwardRef<HTMLDivElement, DatePickerModalProps>(
  function DatePickerModal(
    {
      value,
      onChange,
      locale,
      minDate,
      maxDate,
      open = false,
      onOpenChange,
      closeOnSelect = false,
      className,
      selectionMode = "single",
      range,
      onRangeChange,
      initialDisplayMode = "calendar",
      showModeToggle = true,
      confirmLabel = "OK",
      dismissLabel = "Cancel",
      onConfirm,
      onDismiss,
    },
    ref
  ) {
    const reduceMotion = useReducedMotion() ?? false;
    const directionAnchorRef = React.useRef<HTMLSpanElement>(null);
    const direction = useTextDirection(directionAnchorRef);
    const panelRef = React.useRef<HTMLDivElement | null>(null);
    const setPanelRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        panelRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );
    const restoreFocusRef = React.useRef<HTMLElement | null>(null);
    // The dialog stages edits until confirmation. closeOnSelect keeps the
    // previous live-apply behavior as an explicit compatibility option.
    const [picked, setPicked] = React.useState<Date | undefined>(value);
    const [pickedRange, setPickedRange] = React.useState<DateRange>(range ?? {});
    const [displayMode, setDisplayMode] = React.useState<DatePickerDisplayMode>(initialDisplayMode);
    const rangeOn = selectionMode === "range";
    const inputMode = displayMode === "input";
    const rangeSel = rangeOn ? pickedRange : undefined;

    React.useEffect(() => {
      if (!open) return;
      setPicked(value);
      setPickedRange(range ?? {});
      setDisplayMode(initialDisplayMode);
    }, [initialDisplayMode, open, range, value]);

    // Escape dismiss + body scroll lock while open (Dialog pattern)
    React.useEffect(() => {
      if (!open) return;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setPicked(value);
          setPickedRange(range ?? {});
          onDismiss?.();
          onOpenChange?.(false);
        }
      };
      window.addEventListener("keydown", onKey);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = prevOverflow;
      };
    }, [onDismiss, onOpenChange, open, range, value]);

    // Initial focus on the selected/today day; restore focus to the opener on close
    React.useEffect(() => {
      if (!open) return;
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      const timer = window.setTimeout(() => {
        const day = panelRef.current?.querySelector<HTMLButtonElement>(
          'button[data-iso][tabindex="0"]'
        );
        if (day) day.focus();
        else panelRef.current?.focus();
      }, 0);
      return () => {
        window.clearTimeout(timer);
        restoreFocusRef.current?.focus?.();
      };
    }, [open]);

    // Trap Tab focus inside the dialog surface (Dialog pattern)
    const handleTab = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => !el.hasAttribute("disabled"));
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const handleSelect = (d: Date) => {
      setPicked(d);
      if (closeOnSelect) {
        onChange?.(d);
        onConfirm?.(d);
        onOpenChange?.(false);
      }
    };

    // Range picks arrive via the calendar's onRangeChange (range mode routes
    // through it, not onChange). closeOnSelect range semantics: only a
    // COMPLETE range closes the dialog — a start-only day tap keeps it open;
    // Escape/scrim mid-selection dismiss without fabricating an end.
    const handleRangeChange = (r: DateRange) => {
      setPickedRange(r);
      if (r.start && r.end && closeOnSelect) {
        onRangeChange?.(r);
        onConfirm?.(r);
        onOpenChange?.(false);
      }
    };

    const handleConfirm = () => {
      if (rangeOn) {
        if (!pickedRange.start || !pickedRange.end) return;
        onRangeChange?.(pickedRange);
        onConfirm?.(pickedRange);
      } else {
        if (!picked) return;
        onChange?.(picked);
        onConfirm?.(picked);
      }
      onOpenChange?.(false);
    };

    const handleDismiss = () => {
      setPicked(value);
      setPickedRange(range ?? {});
      onDismiss?.();
      onOpenChange?.(false);
    };

    const headlineDate = picked ?? new Date();
    const headline = formatHeadline(headlineDate, locale);

    // Range header: "Start date" / "End date" placeholders, or the formatted pair
    let rangeHeadline: React.ReactNode;
    if (rangeSel?.start && rangeSel?.end) {
      rangeHeadline = `${formatShort(rangeSel.start, locale)} – ${formatShort(rangeSel.end, locale)}`;
    } else if (rangeSel?.start) {
      rangeHeadline = (
        <>
          {formatShort(rangeSel.start, locale)}
          {" – "}
          <span className="text-m3-on-surface-variant">End date</span>
        </>
      );
    } else {
      rangeHeadline = <span className="text-m3-on-surface-variant">Start date</span>;
    }
    const headerLabel = inputMode
      ? rangeOn
        ? "Enter dates"
        : "Select date"
      : rangeOn
        ? "Selected dates"
        : "Selected date";
    const modeToggle = showModeToggle ? (
      <button
        type="button"
        aria-label={inputMode ? "Switch to calendar" : "Switch to date input"}
        onClick={() => setDisplayMode(inputMode ? "calendar" : "input")}
        className="m3-state m3-focus grid h-12 w-12 shrink-0 place-items-center rounded-full text-m3-on-surface outline-none"
      >
        <MaterialSymbol icon={inputMode ? "calendar_month" : "edit"} />
      </button>
    ) : null;
    const confirmDisabled = rangeOn
      ? !pickedRange.start || !pickedRange.end
      : picked === undefined;

    return (
      <span ref={directionAnchorRef} className="contents">
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            {/* 32% black scrim, click-to-dismiss */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              // Named framer easing (tokens.ts easings.* are CSS strings);
              // "easeOut" ≙ easings.standardDecelerate — same as Dialog scrim
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: durations.short4 / 1000, ease: "easeOut" }
              }
              className="absolute inset-0 bg-m3-scrim/32"
              onClick={handleDismiss}
            />
            <motion.div
              ref={setPanelRef}
              dir={direction}
              role="dialog"
              aria-modal="true"
              aria-label={rangeOn ? "Choose date range" : "Choose date"}
              tabIndex={-1}
              onKeyDown={handleTab}
              initial={reduceMotion ? false : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : springs.expressive}
              className={cn(
                "m3-elevation-3 relative flex h-[568px] max-h-[calc(100dvh-32px)] w-[360px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-[28px] bg-m3-surface-container-high outline-none",
                className
              )}
            >
              {/* Official 360×568 dialog header. */}
              <div className="flex h-[120px] shrink-0 flex-col justify-center gap-1 px-6">
                <span className="md-label-large text-m3-on-surface-variant">{headerLabel}</span>
                <div className="flex items-center justify-between gap-2">
                  {rangeOn ? (
                    <span className="md-title-large leading-tight text-m3-on-surface">
                      {rangeHeadline}
                    </span>
                  ) : (
                    <span className="md-headline-large text-m3-on-surface-variant">{headline}</span>
                  )}
                  {modeToggle}
                </div>
              </div>
              <div className="h-px w-full shrink-0 bg-m3-outline-variant" />
              <div className={cn("m3-scroll min-h-0 flex-1 overflow-y-auto", !inputMode && "px-4 pb-2 pt-2")}>
                {inputMode ? (
                  rangeOn ? (
                    <DateRangePickerInput
                      locale={locale}
                      range={pickedRange}
                      onRangeChange={handleRangeChange}
                      minDate={minDate}
                      maxDate={maxDate}
                      requestFocus
                    />
                  ) : (
                    <DatePickerInput
                      locale={locale}
                      value={picked}
                      onChange={handleSelect}
                      minDate={minDate}
                      maxDate={maxDate}
                      requestFocus
                    />
                  )
                ) : (
                  <DatePickerCalendar
                    direction={direction}
                    locale={locale}
                    value={picked}
                    onChange={handleSelect}
                    minDate={minDate}
                    maxDate={maxDate}
                    animatedHeader
                    selectionMode={selectionMode}
                    range={pickedRange}
                    onRangeChange={rangeOn ? handleRangeChange : undefined}
                  />
                )}
              </div>
              <div className="flex h-16 shrink-0 items-center justify-end gap-2 px-4">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="m3-state m3-focus md-label-large h-10 rounded-full px-3 text-m3-primary outline-none"
                >
                  {dismissLabel}
                </button>
                <button
                  type="button"
                  disabled={confirmDisabled}
                  onClick={handleConfirm}
                  className="m3-state m3-focus md-label-large h-10 rounded-full px-3 text-m3-primary outline-none disabled:pointer-events-none disabled:text-m3-on-surface/38"
                >
                  {confirmLabel}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </span>
    );
  }
);

DatePickerModal.displayName = "DatePickerModal";

/* ------------------------------------------------------------------ */
/* Public component                                                    */
/* ------------------------------------------------------------------ */

export interface DatePickerProps {
  /** Locale used for date order, labels, and the first day of the week. */
  locale?: string;
  /** Currently selected date */
  value?: Date;
  /** Initial selected date for uncontrolled use. */
  defaultValue?: Date;
  onChange?: (d: Date) => void;
  /** Earliest selectable date (days before are disabled) */
  minDate?: Date;
  /** Latest selectable date (days after are disabled) */
  maxDate?: Date;
  /**
   * 'docked' (default): an outlined text field with an anchored calendar popup.
   * 'inline': the embedded rounded-[28px] calendar panel.
   * 'modal': the official M3 360×568dp dialog on surface-container-high (elevation 3,
   * 28dp corners) over a 32% scrim, with a selected-date header
   * ("Selected date" label-large + display-size headline). Controlled via
   * open/onOpenChange like Dialog; selection is staged until confirmation.
   */
  presentation?: "docked" | "inline" | "modal";
  /** Modal only — controls visibility (fully controlled, Dialog/SearchView style). */
  open?: boolean;
  /** Modal only — called with the next open state on scrim click, Escape, or day pick. */
  onOpenChange?: (open: boolean) => void;
  /** Modal only — legacy live-apply behavior. Official default is false. */
  closeOnSelect?: boolean;
  /** Modal confirmation button label. */
  confirmLabel?: string;
  /** Modal dismissal button label. */
  dismissLabel?: string;
  /** Called after the staged modal selection is confirmed. */
  onConfirm?: (selection: Date | DateRange) => void;
  /** Called when the modal dismissal action or scrim is used. */
  onDismiss?: () => void;
  /** Inline only: stretch to the container width */
  fullWidth?: boolean;
  /** 'single' (default) picks one date via value/onChange; 'range' picks a
   * start/end pair via range/onRangeChange (tap start, then end; a tap
   * before the start restarts — androidx DateRangePicker convention). */
  selectionMode?: "single" | "range";
  /** Range mode — controlled range; uncontrolled when omitted. */
  range?: DateRange;
  /** Range mode — fires on every tap with the next range (partial included). */
  onRangeChange?: (r: DateRange) => void;
  /** Official default is calendar. Input enables localized numeric date entry. */
  initialDisplayMode?: DatePickerDisplayMode;
  /** Show the calendar/input toggle for single-date selection. Default true. */
  showModeToggle?: boolean;
  className?: string;
}

/**
 * M3 Date Picker.
 *
 * Inline presentation — a rounded-[28px] surface-container-high panel
 * with a month grid, a tappable "month year" header that flips into a
 * 3-column year grid (1900–2100), today outlined in
 * primary, and a spring-animated selection pill shared via layoutId
 * (scoped per instance). The grid exposes ARIA grid roles with roving
 * tabindex and arrow-key day navigation (←/→/↑/↓), Home/End for week
 * start/end. Nav chevrons are 48dp targets.
 *
 * Modal presentation (presentation="modal") — the official M3 date
 * picker dialog: 360×568dp, 32% scrim, spring scale 0.9→1 + fade entry
 * (mirrored exit), staged selection with dismiss/confirm actions,
 * Escape/scrim dismissal, focus trap
 * with initial focus on the selected/today day and restore to the
 * opener, body scroll lock, and the same ARIA-grid calendar internals.
 *
 * selectionMode="range" — official M3 date-range selection in BOTH
 * presentations: the first tap sets the start, a tap ≥ start completes the
 * range, a tap < start (or any tap once complete) restarts; in-between
 * days carry a continuous secondary-container band (start cell = right half
 * with rounded-left edge under the circle, end cell = left half with
 * rounded-right edge, mid cells square, square cuts at week-row edges, a
 * 4dp vertical inset keeps adjacent week stripes separate) while start/end
 * days are 40dp circles; hovering/focusing while only the start is set
 * previews the tentative range. ARIA: start/end/in-between days are
 * aria-selected with "start/end of range" label suffixes; arrow-key
 * navigation is unchanged. In the modal the header shows Start/End date
 * placeholders (or the formatted pair) and closeOnSelect only closes once
 * the range is complete — Escape/scrim mid-selection never fabricate an
 * end. The forwardRef lands on the inline root / the modal dialog panel.
 */
export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(function DatePicker(
  {
    value,
    defaultValue,
    onChange,
    locale,
    minDate,
    maxDate,
    presentation = "docked",
    open,
    onOpenChange,
    closeOnSelect = false,
    fullWidth = false,
    selectionMode = "single",
    range,
    onRangeChange,
    initialDisplayMode = "calendar",
    showModeToggle = true,
    confirmLabel = "OK",
    dismissLabel = "Cancel",
    onConfirm,
    onDismiss,
    className,
  },
  ref
) {
  const [internalValue, setInternalValue] = React.useState<Date | undefined>(defaultValue);
  const [internalRange, setInternalRange] = React.useState<DateRange>({});
  const activeValue = value ?? internalValue;
  const activeRange = range ?? internalRange;
  const handleDateChange = React.useCallback(
    (next: Date) => {
      if (value === undefined) setInternalValue(next);
      onChange?.(next);
    },
    [onChange, value]
  );
  const handleRangeChange = React.useCallback(
    (next: DateRange) => {
      if (range === undefined) setInternalRange(next);
      onRangeChange?.(next);
    },
    [onRangeChange, range]
  );

  if (presentation === "modal") {
    return (
      <DatePickerModal
        ref={ref}
        open={open}
        onOpenChange={onOpenChange}
        closeOnSelect={closeOnSelect}
        locale={locale}
        value={activeValue}
        onChange={handleDateChange}
        minDate={minDate}
        maxDate={maxDate}
        selectionMode={selectionMode}
        range={activeRange}
        onRangeChange={handleRangeChange}
        initialDisplayMode={initialDisplayMode}
        showModeToggle={showModeToggle}
        confirmLabel={confirmLabel}
        dismissLabel={dismissLabel}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
        className={className}
      />
    );
  }

  if (presentation === "docked" && selectionMode === "single") {
    return (
      <DatePickerDocked
        ref={ref}
        value={activeValue}
        onChange={handleDateChange}
        locale={locale}
        minDate={minDate}
        maxDate={maxDate}
        open={open}
        onOpenChange={onOpenChange}
        fullWidth={fullWidth}
        initialDisplayMode={initialDisplayMode}
        showModeToggle={showModeToggle}
        className={className}
      />
    );
  }

  return (
    <DatePickerInline
      ref={ref}
      value={activeValue}
      onChange={handleDateChange}
      locale={locale}
      minDate={minDate}
      maxDate={maxDate}
      fullWidth={fullWidth}
      selectionMode={selectionMode}
      range={activeRange}
      onRangeChange={handleRangeChange}
      initialDisplayMode={initialDisplayMode}
      showModeToggle={showModeToggle}
      className={className}
    />
  );
});

type DatePickerInlineProps = Omit<
  DatePickerProps,
  | "presentation"
  | "open"
  | "onOpenChange"
  | "closeOnSelect"
  | "confirmLabel"
  | "dismissLabel"
  | "onConfirm"
  | "onDismiss"
>;

const DatePickerInline = React.forwardRef<HTMLDivElement, DatePickerInlineProps>(function DatePickerInline(
  {
    value,
    onChange,
    locale,
    minDate,
    maxDate,
    fullWidth = false,
    selectionMode = "single",
    range,
    onRangeChange,
    initialDisplayMode = "calendar",
    showModeToggle = true,
    className,
  },
  ref
) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const direction = useTextDirection(rootRef);
  const rangeOn = selectionMode === "range";
  const [displayMode, setDisplayMode] = React.useState<DatePickerDisplayMode>(initialDisplayMode);
  const inputMode = displayMode === "input";
  const [internalRange, setInternalRange] = React.useState<DateRange>({});
  const rangeWasControlled = React.useRef(range !== undefined);
  if (range !== undefined) rangeWasControlled.current = true;
  const activeRange = rangeWasControlled.current ? range : internalRange;
  const handleInlineRangeChange = (nextRange: DateRange) => {
    if (!rangeWasControlled.current) setInternalRange(nextRange);
    onRangeChange?.(nextRange);
  };

  return (
    <div
      ref={(node) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className={cn(
        "rounded-[28px] bg-m3-surface-container-high p-6",
        fullWidth ? "w-full" : "w-[328px]",
        className
      )}
    >
      {inputMode ? (
        <>
          <div className="flex items-center justify-between px-3">
            <span className="md-title-large text-m3-on-surface">
              {rangeOn ? "Enter dates" : "Select date"}
            </span>
            <button
              type="button"
              aria-label="Switch to calendar"
              onClick={() => setDisplayMode("calendar")}
              className="m3-state m3-focus grid h-12 w-12 place-items-center rounded-full text-m3-on-surface outline-none"
            >
              <MaterialSymbol icon="calendar_month" />
            </button>
          </div>
          {rangeOn ? (
            <DateRangePickerInput
              locale={locale}
              range={activeRange}
              onRangeChange={handleInlineRangeChange}
              minDate={minDate}
              maxDate={maxDate}
              requestFocus
            />
          ) : (
            <DatePickerInput
              locale={locale}
              value={value}
              onChange={onChange}
              minDate={minDate}
              maxDate={maxDate}
              requestFocus
            />
          )}
        </>
      ) : (
        <DatePickerCalendar
          direction={direction}
          locale={locale}
          value={value}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
          selectionMode={selectionMode}
          range={activeRange}
          onRangeChange={handleInlineRangeChange}
          onRequestInput={showModeToggle ? () => setDisplayMode("input") : undefined}
        />
      )}
    </div>
  );
});

type DatePickerDockedProps = Pick<
  DatePickerProps,
  | "value"
  | "onChange"
  | "locale"
  | "minDate"
  | "maxDate"
  | "open"
  | "onOpenChange"
  | "fullWidth"
  | "initialDisplayMode"
  | "showModeToggle"
  | "className"
>;

/** Official docked date picker: text field trigger plus anchored popup. */
const DatePickerDocked = React.forwardRef<HTMLDivElement, DatePickerDockedProps>(function DatePickerDocked(
  {
    value,
    onChange,
    locale,
    minDate,
    maxDate,
    open,
    onOpenChange,
    fullWidth = false,
    initialDisplayMode = "calendar",
    showModeToggle = true,
    className,
  },
  ref
) {
  const reduceMotion = useReducedMotion() ?? false;
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const direction = useTextDirection(rootRef);
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpenControlled = open !== undefined;
  const popupOpen = isOpenControlled ? open : internalOpen;
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isOpenControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isOpenControlled, onOpenChange]
  );
  const setRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  React.useEffect(() => {
    if (!popupOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [popupOpen, setOpen]);

  return (
    <div ref={setRef} className={cn("relative", fullWidth ? "w-full" : "w-[328px]", className)}>
      <TextField
        label="Date"
        value={value ? new Intl.DateTimeFormat(locale).format(value) : ""}
        placeholder="Choose date"
        trailingIcon="calendar_today"
        readOnly
        role="combobox"
        aria-haspopup="dialog"
        aria-expanded={popupOpen}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        fullWidth
      />
      <AnimatePresence>
        {popupOpen && (
          <motion.div
            dir={direction}
            role="dialog"
            aria-label="Choose date"
            className="m3-elevation-3 absolute start-0 top-[64px] z-50 rounded-[28px]"
            initial={reduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={reduceMotion ? { duration: 0 } : springs.fastSpatial}
          >
            <DatePickerInline
              value={value}
              onChange={(next) => {
                onChange?.(next);
                setOpen(false);
              }}
              locale={locale}
              minDate={minDate}
              maxDate={maxDate}
              initialDisplayMode={initialDisplayMode}
              showModeToggle={showModeToggle}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

DatePickerDocked.displayName = "DatePickerDocked";

export { datePickerMeta } from "@/lib/m3/meta";
