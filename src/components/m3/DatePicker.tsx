"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { durations, springs } from "@/lib/m3/tokens";
import { MaterialSymbol } from "./MaterialSymbol";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

const WEEKDAYS = [
  { initial: "S", long: "Sunday" },
  { initial: "M", long: "Monday" },
  { initial: "T", long: "Tuesday" },
  { initial: "W", long: "Wednesday" },
  { initial: "T", long: "Thursday" },
  { initial: "F", long: "Friday" },
  { initial: "S", long: "Saturday" },
] as const;

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

function isoOf(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
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

/** Modal header headline — "Fri, Aug 21" per the official selected-date header */
function formatHeadline(d: Date): string {
  return `${WEEKDAYS[d.getDay()].long.slice(0, 3)}, ${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, details, [tabindex]:not([tabindex="-1"])';

/* ------------------------------------------------------------------ */
/* Shared calendar internals                                           */
/* ------------------------------------------------------------------ */

interface DatePickerCalendarProps {
  value?: Date;
  onChange?: (d: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  /**
   * Selected-day container color. Inline uses the library's primary pill;
   * the modal uses the official androidx DatePickerTokens
   * SelectedDateContainerColor = primary-container.
   */
  tone?: "primary" | "primary-container";
  /** Slide/fade micro-transition on the month-year label (modal only). */
  animatedHeader?: boolean;
}

/**
 * Header row + month grid + year grid, shared verbatim by the inline and
 * modal presentations. No outer panel/padding — the caller supplies the
 * surface. Owns its view state (cursor, month/year, roving tabindex), so
 * each mount starts on the selected/today month.
 */
function DatePickerCalendar({
  value,
  onChange,
  minDate,
  maxDate,
  tone = "primary",
  animatedHeader = false,
}: DatePickerCalendarProps) {
  const [internal, setInternal] = React.useState<Date | undefined>(undefined);
  const selected = value ?? internal;
  const [cursor, setCursor] = React.useState<Date>(() => startOfMonth(value ?? new Date()));
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

  // Roving tabindex anchor: selected day in view → today → first enabled day of month
  const activeIso = React.useMemo(() => {
    if (rovingOverride) return rovingOverride;
    const inView = (d: Date) => cells.some((c) => sameDay(c, d));
    const pick =
      (selected && inView(selected) && !isDisabledDay(selected) ? selected : undefined) ??
      (inView(today) && !isDisabledDay(today) ? today : undefined) ??
      cells.find((c) => c.getMonth() === cursor.getMonth() && !isDisabledDay(c)) ??
      cells.find((c) => !isDisabledDay(c)) ??
      cells[0];
    return isoOf(pick);
  }, [rovingOverride, cells, selected, today, cursor, isDisabledDay]);

  const focusCell = (iso: string) => {
    requestAnimationFrame(() => {
      gridRef.current
        ?.querySelector<HTMLButtonElement>(`button[data-iso="${iso}"]`)
        ?.focus();
    });
  };

  /** Arrow-key day navigation: ←/→ ±1 day, ↑/↓ ±7, Home/End week bounds */
  const handleDayKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    let delta = 0;
    if (e.key === "ArrowLeft") delta = -1;
    else if (e.key === "ArrowRight") delta = 1;
    else if (e.key === "ArrowUp") delta = -7;
    else if (e.key === "ArrowDown") delta = 7;
    else if (e.key === "Home") delta = -(idx % 7);
    else if (e.key === "End") delta = 6 - (idx % 7);
    else return;
    e.preventDefault();
    let i = idx + delta;
    while (i >= 0 && i < cells.length && isDisabledDay(cells[i])) i += delta;
    if (i < 0 || i >= cells.length) return;
    const target = cells[i];
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
      : `${MONTH_NAMES[cursor.getMonth()]} ${cursor.getFullYear()}`;

  const selectedPillClass =
    tone === "primary-container" ? "bg-m3-primary-container" : "bg-m3-primary";
  const selectedTextClass =
    tone === "primary-container" ? "text-m3-on-primary-container" : "text-m3-on-primary";

  return (
    <>
      {/* Header: month-year label + month navigation */}
      <div className="mb-1 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setView((v) => (v === "month" ? "year" : "month"))}
          className="m3-state m3-focus md-title-large cursor-pointer rounded-full px-3 py-1 text-m3-on-surface outline-none"
        >
          {animatedHeader ? (
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={headerLabel}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={springs.fastVisual}
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
          <button
            type="button"
            aria-label={view === "year" ? "Previous years" : "Previous month"}
            onClick={() => navigate(-1)}
            className="m3-state m3-focus flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-m3-on-surface outline-none"
          >
            <MaterialSymbol icon="chevron_left" />
          </button>
          <button
            type="button"
            aria-label={view === "year" ? "Next years" : "Next month"}
            onClick={() => navigate(1)}
            className="m3-state m3-focus flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-m3-on-surface outline-none"
          >
            <MaterialSymbol icon="chevron_right" />
          </button>
        </div>
      </div>

      {view === "month" ? (
        <div role="grid" ref={gridRef}>
          {/* Weekday row */}
          <div role="row" className="grid grid-cols-7 justify-items-center">
            {WEEKDAYS.map((w, i) => (
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
                const isSelected = selected !== undefined && sameDay(day, selected);
                const isToday = sameDay(day, today);
                const inMonth = day.getMonth() === cursor.getMonth();
                const disabled = isDisabledDay(day);
                return (
                  <div
                    key={iso}
                    role="gridcell"
                    aria-selected={isSelected || undefined}
                    aria-current={isToday ? "date" : undefined}
                    aria-disabled={disabled || undefined}
                    className="flex items-center justify-center"
                  >
                    <button
                      type="button"
                      data-iso={iso}
                      disabled={disabled}
                      tabIndex={iso === activeIso ? 0 : -1}
                      aria-label={`${MONTH_NAMES[day.getMonth()]} ${day.getDate()}, ${day.getFullYear()}`}
                      onClick={() => handleSelect(day)}
                      onKeyDown={(e) => handleDayKeyDown(e, idx)}
                      className={cn(
                        "m3-state m3-focus relative my-0.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full md-body-large outline-none",
                        disabled && "pointer-events-none opacity-38",
                        !isSelected && isToday && "border border-m3-primary text-m3-primary",
                        !isSelected &&
                          !isToday &&
                          (inMonth ? "text-m3-on-surface" : "text-m3-on-surface-variant")
                      )}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId={pillId}
                          className={cn("absolute inset-0 rounded-full", selectedPillClass)}
                          transition={springs.expressive}
                        />
                      )}
                      <span className={cn("relative z-10", isSelected && selectedTextClass)}>
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
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Modal presentation (official M3 date picker dialog)                 */
/* ------------------------------------------------------------------ */

interface DatePickerModalProps {
  value?: Date;
  onChange?: (d: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnSelect?: boolean;
  className?: string;
}

/**
 * Official modal date picker: a role="dialog" on surface-container-high,
 * 28dp corners, elevation 3, over a 32% scrim. Portrait (viewport < 600px)
 * is 328×512dp with the selected-date header stacked on top (label-large
 * supporting text + display-size headline + divider); landscape (≥ 600px)
 * is 568×368dp with the header as a 168dp left column, vertically
 * centered. Selection applies live (no action buttons) and closes the
 * dialog when closeOnSelect; Escape and scrim tap always dismiss. Focus
 * moves to the selected/today day on open, Tab is trapped, and focus is
 * restored to the opener on close (same pattern as Dialog).
 */
const DatePickerModal = React.forwardRef<HTMLDivElement, DatePickerModalProps>(
  function DatePickerModal(
    { value, onChange, minDate, maxDate, open = false, onOpenChange, closeOnSelect = true, className },
    ref
  ) {
    const panelRef = React.useRef<HTMLDivElement | null>(null);
    const restoreFocusRef = React.useRef<HTMLElement | null>(null);
    // Official breakpoint: landscape layout at viewport ≥ 600dp (client-only)
    const [landscape, setLandscape] = React.useState(false);
    // Tracks picks when the caller renders uncontrolled, so the header stays live
    const [picked, setPicked] = React.useState<Date | undefined>(undefined);

    React.useEffect(() => {
      const mq = window.matchMedia("(min-width: 600px)");
      const update = () => setLandscape(mq.matches);
      update();
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }, []);

    // Escape dismiss + body scroll lock while open (Dialog pattern)
    React.useEffect(() => {
      if (!open) return;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onOpenChange?.(false);
      };
      window.addEventListener("keydown", onKey);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = prevOverflow;
      };
    }, [open, onOpenChange]);

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
      onChange?.(d);
      // M3 live-apply: the value updates immediately; close when asked to
      if (closeOnSelect) onOpenChange?.(false);
    };

    const headlineDate = value ?? picked ?? new Date();
    const headline = formatHeadline(headlineDate);

    return (
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            {/* 32% black scrim, click-to-dismiss */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              // Named framer easing (tokens.ts easings.* are CSS strings);
              // "easeOut" ≙ easings.standardDecelerate — same as Dialog scrim
              transition={{
                duration: durations.short4 / 1000,
                ease: "easeOut",
              }}
              className="absolute inset-0 bg-m3-scrim/32"
              onClick={() => onOpenChange?.(false)}
            />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Choose date"
              tabIndex={-1}
              onKeyDown={handleTab}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={springs.expressive}
              className={cn(
                "m3-elevation-3 relative flex overflow-hidden rounded-[28px] bg-m3-surface-container-high outline-none",
                landscape
                  ? "h-[368px] max-h-[calc(100dvh-32px)] w-[568px] max-w-[calc(100vw-32px)]"
                  : "h-[512px] max-h-[calc(100dvh-32px)] w-[328px] max-w-[calc(100vw-32px)] flex-col",
                className
              )}
            >
              {landscape ? (
                <>
                  {/* Header as a 168dp left column, vertically centered */}
                  <div className="flex w-[168px] shrink-0 flex-col justify-center gap-1 px-4">
                    <span className="md-label-large text-m3-on-surface-variant">
                      Selected date
                    </span>
                    <span className="md-headline-small leading-tight text-m3-on-surface">
                      {headline}
                    </span>
                  </div>
                  <div className="m3-scroll min-w-0 flex-1 overflow-y-auto px-4 py-1">
                    <DatePickerCalendar
                      value={value ?? picked}
                      onChange={handleSelect}
                      minDate={minDate}
                      maxDate={maxDate}
                      tone="primary-container"
                      animatedHeader
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Header block on top: supporting text + display headline + divider */}
                  <div className="flex shrink-0 flex-col gap-1 px-6 pb-3 pt-6">
                    <span className="md-label-large text-m3-on-surface-variant">
                      Selected date
                    </span>
                    <span className="md-display-small text-m3-on-surface">{headline}</span>
                  </div>
                  <div className="h-px w-full shrink-0 bg-m3-outline-variant" />
                  <div className="m3-scroll min-h-0 flex-1 overflow-y-auto px-4 pb-2 pt-2">
                    <DatePickerCalendar
                      value={value ?? picked}
                      onChange={handleSelect}
                      minDate={minDate}
                      maxDate={maxDate}
                      tone="primary-container"
                      animatedHeader
                    />
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);

DatePickerModal.displayName = "DatePickerModal";

/* ------------------------------------------------------------------ */
/* Public component                                                    */
/* ------------------------------------------------------------------ */

export interface DatePickerProps {
  /** Currently selected date */
  value?: Date;
  onChange?: (d: Date) => void;
  /** Earliest selectable date (days before are disabled) */
  minDate?: Date;
  /** Latest selectable date (days after are disabled) */
  maxDate?: Date;
  /**
   * 'inline' (default): the embedded rounded-[28px] calendar panel.
   * 'modal': the official M3 modal date picker — 328×512dp portrait /
   * 568×368dp landscape dialog on surface-container-high (elevation 3,
   * 28dp corners) over a 32% scrim, with a selected-date header
   * ("Selected date" label-large + display-size headline). Controlled via
   * open/onOpenChange like Dialog; selection applies live and no action
   * buttons are shown.
   */
  presentation?: "inline" | "modal";
  /** Modal only — controls visibility (fully controlled, Dialog/SearchView style). */
  open?: boolean;
  /** Modal only — called with the next open state on scrim click, Escape, or day pick. */
  onOpenChange?: (open: boolean) => void;
  /** Modal only — close automatically when a day is picked. Default true. */
  closeOnSelect?: boolean;
  /** Inline only: stretch to the container width */
  fullWidth?: boolean;
  className?: string;
}

/**
 * M3 Date Picker.
 *
 * Inline presentation — a rounded-[28px] surface-container-high panel
 * with a month grid, a tappable "month year" header that flips into a
 * 4-column year grid (1988 → current year + 10), today outlined in
 * primary, and a spring-animated selection pill shared via layoutId
 * (scoped per instance). The grid exposes ARIA grid roles with roving
 * tabindex and arrow-key day navigation (←/→/↑/↓), Home/End for week
 * start/end. Nav chevrons are 48dp targets.
 *
 * Modal presentation (presentation="modal") — the official M3 date
 * picker dialog: 328×512dp portrait (header stacked on top of the
 * calendar, divider between) / 568×368dp landscape (header as a 168dp
 * vertically-centered left column) at viewport ≥ 600px, 32% scrim,
 * spring scale 0.9→1 + fade entry (mirrored exit), live-applied
 * selection with no action buttons, Escape/scrim dismissal, focus trap
 * with initial focus on the selected/today day and restore to the
 * opener, body scroll lock, and the same ARIA-grid calendar internals.
 * The forwardRef lands on the inline root / the modal dialog panel.
 */
export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(function DatePicker(
  {
    value,
    onChange,
    minDate,
    maxDate,
    presentation = "inline",
    open,
    onOpenChange,
    closeOnSelect = true,
    fullWidth = false,
    className,
  },
  ref
) {
  if (presentation === "modal") {
    return (
      <DatePickerModal
        ref={ref}
        open={open}
        onOpenChange={onOpenChange}
        closeOnSelect={closeOnSelect}
        value={value}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        className={className}
      />
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-[28px] bg-m3-surface-container-high p-6",
        fullWidth ? "w-full" : "w-[328px]",
        className
      )}
    >
      <DatePickerCalendar
        value={value}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
});

export { datePickerMeta } from "@/lib/m3/meta";
