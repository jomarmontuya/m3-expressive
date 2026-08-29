"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { MaterialSymbol } from "./MaterialSymbol";

export interface TimePickerValue {
  /** 0–23 */
  hour: number;
  /** 0–59 */
  minute: number;
}

const DIAL_CENTER = 128;
const DIAL_RADIUS = 104;
const HOUR_AUTO_SWITCH_MS = 100;

// Official 24h double-ring geometry (androidx material3 TimePicker tokens):
// on the 256dp face the outer number circle sits 101dp from center
// (OuterCircleToSizeRatio = 101.dp/ClockDialContainerSize) and the inner circle
// 69dp (InnerCircleToSizeRatio = 69.dp/ClockDialContainerSize). The outer ring
// carries hours 00–11 and the inner ring carries hours 12–23.
const OUTER_24H_RADIUS = 101;
const INNER_24H_RADIUS = 69;
const OUTER_RING_HOURS = Array.from({ length: 12 }, (_, i) => i);
const INNER_RING_HOURS = Array.from({ length: 12 }, (_, i) => i + 12);
const HOURS_12 = Array.from({ length: 12 }, (_, i) => i + 1);
const HOURS_24 = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);
const SCROLL_ITEM_HEIGHT = 40;
const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, details, [tabindex]:not([tabindex="-1"])';

const DIAL_POSITIONS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function systemUses24Hour(): boolean {
  const hourCycle = new Intl.DateTimeFormat(undefined, { hour: "numeric" }).resolvedOptions().hourCycle;
  return hourCycle === "h23" || hourCycle === "h24";
}

function validateTime(value: TimePickerValue): TimePickerValue {
  if (!Number.isInteger(value.hour) || value.hour < 0 || value.hour > 23) {
    throw new RangeError("TimePicker hour must be an integer from 0 to 23");
  }
  if (!Number.isInteger(value.minute) || value.minute < 0 || value.minute > 59) {
    throw new RangeError("TimePicker minute must be an integer from 0 to 59");
  }
  return value;
}

function hourForDisplay(hour: number, use24h: boolean): number {
  if (use24h) return hour;
  return hour % 12 === 0 ? 12 : hour % 12;
}

function inputNumber(value: string, min: number, max: number): number | null {
  if (!/^\d{1,2}$/.test(value)) return null;
  const number = Number(value);
  return number >= min && number <= max ? number : null;
}

interface TimeScrollFieldProps {
  label: string;
  value: number;
  options: number[];
  format: (value: number) => string;
  optionLabel: (value: number) => string;
  onChange: (value: number) => void;
}

/** Three-row, scroll-snapping field matching AndroidX TimeScroll's 100×120dp geometry. */
function TimeScrollField({
  label,
  value,
  options,
  format,
  optionLabel,
  onChange,
}: TimeScrollFieldProps) {
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const skipScrollSyncRef = React.useRef(false);
  const optionId = React.useId();
  const selectedIndex = Math.max(0, options.indexOf(value));

  React.useEffect(() => {
    if (skipScrollSyncRef.current) {
      skipScrollSyncRef.current = false;
      return;
    }
    const list = listRef.current;
    if (!list) return;
    const nextTop = selectedIndex * SCROLL_ITEM_HEIGHT;
    if (Math.abs(list.scrollTop - nextTop) > 1) list.scrollTop = nextTop;
  }, [selectedIndex]);

  const selectIndex = (index: number, fromScroll = false) => {
    const bounded = Math.max(0, Math.min(options.length - 1, index));
    const next = options[bounded];
    if (next !== value) {
      skipScrollSyncRef.current = fromScroll;
      onChange(next);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = selectedIndex - 1;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = selectedIndex + 1;
    if (event.key === "PageUp") nextIndex = selectedIndex - 3;
    if (event.key === "PageDown") nextIndex = selectedIndex + 3;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = options.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    selectIndex(nextIndex);
  };

  return (
    <div className="relative h-[120px] w-[100px] overflow-hidden rounded-[8px] bg-m3-surface-container-highest">
      <div
        ref={listRef}
        role="listbox"
        tabIndex={0}
        aria-label={label}
        aria-orientation="vertical"
        aria-activedescendant={`${optionId}-${selectedIndex}`}
        onKeyDown={handleKeyDown}
        onScroll={(event) =>
          selectIndex(Math.round(event.currentTarget.scrollTop / SCROLL_ITEM_HEIGHT), true)
        }
        className="m3-focus h-full snap-y snap-mandatory overflow-y-auto overscroll-contain outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div aria-hidden="true" className="h-10 snap-none" />
        {options.map((option, index) => {
          const selected = index === selectedIndex;
          return (
            <div
              id={`${optionId}-${index}`}
              key={option}
              role="option"
              tabIndex={-1}
              aria-label={optionLabel(option)}
              aria-selected={selected}
              onClick={() => {
                selectIndex(index);
                listRef.current?.focus();
              }}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                selectIndex(index);
                listRef.current?.focus();
              }}
              className={cn(
                "md-display-medium flex h-10 snap-center cursor-pointer select-none items-center justify-center tabular-nums",
                selected
                  ? "bg-m3-primary-container text-m3-on-primary-container"
                  : "text-m3-on-surface-variant"
              )}
            >
              {format(option)}
            </div>
          );
        })}
        <div aria-hidden="true" className="h-10 snap-none" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-10 h-10 rounded-[8px] border-2 border-m3-primary"
      />
    </div>
  );
}

/** Position of a clock number n (1..12) on the dial via trig (12 = top) */
function dialPosition(n: number, radius: number = DIAL_RADIUS): { x: number; y: number } {
  const theta = (n * 30 * Math.PI) / 180;
  return {
    x: DIAL_CENTER + radius * Math.sin(theta),
    y: DIAL_CENTER - radius * Math.cos(theta),
  };
}

export interface TimePickerProps {
  /** Selected time (24h fields: hour 0–23, minute 0–59) */
  value?: TimePickerValue;
  /** Initial time when the picker is uncontrolled. Ignored when `value` is provided. */
  defaultValue?: TimePickerValue;
  onChange?: (t: TimePickerValue) => void;
  /**
   * `dial` is the existing vertical analog picker. `horizontal` uses the
   * official landscape analog layout. `input` provides numeric text fields,
   * and `scroll` provides the official three-row scroll fields.
   */
  displayMode?: "dial" | "horizontal" | "input" | "scroll";
  /** Inline compatibility layout or the official modal dialog. */
  presentation?: "inline" | "modal";
  /** Modal visibility. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  confirmLabel?: string;
  dismissLabel?: string;
  onConfirm?: (value: TimePickerValue) => void;
  onDismiss?: () => void;
  /**
   * 24-hour format: the readout shows 0–23 and the dial switches to the
   * official double-ring clock face — hours 00–11 outside, 12–23 inside.
   * When omitted, the browser's system hour cycle is used.
   */
  use24h?: boolean;
  /** Stretch to the container width */
  fullWidth?: boolean;
  className?: string;
}

/**
 * M3 Time Picker with the AndroidX dial, horizontal, text-input, and
 * scroll-field presentations. The existing vertical dial remains the default.
 * Its official dial geometry (androidx material3
 * TimePickerTokens): 256dp clock face on surface-container-highest, 48dp
 * primary selection handle with 8dp center dot and 2dp track. The picker
 * container is surface-container-high at elevation level 3. The digital
 * readout uses the official 96×80dp time-selector segments (8dp corners,
 * display-large labels; active segment on primary-container, inactive on
 * surface-container-highest) and the vertical 52×80dp period selector has
 * a 1dp outline with the active option on tertiary-container. Hour numbers
 * sit on a 12-number ring (AM/PM preserved), minute marks map to n×5 with
 * 48px hit areas; arrows on the dial increment/decrement hour/minute and
 * pointer-picking an hour auto-advances to minute editing; keyboard and
 * assistive-technology activation keep the hour field active. In 24-hour
 * mode the dial becomes the official double-ring face: hours 00–11 outside
 * and 12–23 inside at the official 101dp/69dp radii, with the selection handle
 * traveling between rings and a small dot marking the same
 * clock position on the opposite ring.
 */
const TimePickerInline = React.forwardRef<HTMLDivElement, TimePickerProps>(function TimePickerInline(
  {
    value,
    defaultValue,
    onChange,
    displayMode = "dial",
    use24h: use24hProp,
    fullWidth = false,
    className,
  },
  ref
) {
  const reduceMotion = useReducedMotion() ?? false;
  const [internal, setInternal] = React.useState<TimePickerValue>(() =>
    validateTime(defaultValue ?? { hour: 0, minute: 0 })
  );
  const [system24h, setSystem24h] = React.useState(false);
  React.useEffect(() => setSystem24h(systemUses24Hour()), []);
  const use24h = use24hProp ?? system24h;
  const time = value === undefined ? internal : validateTime(value);
  const [mode, setMode] = React.useState<"hour" | "minute">("hour");
  const [hourInput, setHourInput] = React.useState(() => pad2(hourForDisplay(time.hour, use24h)));
  const [minuteInput, setMinuteInput] = React.useState(() => pad2(time.minute));
  const hourHelpId = React.useId();
  const minuteHelpId = React.useId();
  const switchTimer = React.useRef<number | null>(null);
  const dialRef = React.useRef<HTMLDivElement | null>(null);
  const dragPointerRef = React.useRef<number | null>(null);
  const editingInputRef = React.useRef<"hour" | "minute" | null>(null);
  const hourInputRef = React.useRef<HTMLInputElement | null>(null);
  const minuteInputRef = React.useRef<HTMLInputElement | null>(null);
  const amRef = React.useRef<HTMLButtonElement | null>(null);
  const pmRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    return () => {
      if (switchTimer.current !== null) window.clearTimeout(switchTimer.current);
    };
  }, []);

  React.useEffect(() => {
    if (editingInputRef.current !== "hour" || displayMode !== "input") {
      setHourInput(pad2(hourForDisplay(time.hour, use24h)));
    }
  }, [displayMode, time.hour, use24h]);

  React.useEffect(() => {
    if (editingInputRef.current !== "minute" || displayMode !== "input") {
      setMinuteInput(pad2(time.minute));
    }
  }, [displayMode, time.minute]);

  const update = (next: Partial<TimePickerValue>) => {
    const merged = validateTime({ ...time, ...next });
    if (value === undefined) setInternal(merged);
    onChange?.(merged);
  };

  const isPM = time.hour >= 12;
  const hour12 = hourForDisplay(time.hour, false);
  const hourLabel = use24h ? pad2(time.hour) : String(hour12);
  const hourInputMin = use24h ? 0 : 1;
  const hourInputMax = use24h ? 23 : 12;
  const parsedHourInput = inputNumber(hourInput, hourInputMin, hourInputMax);
  const parsedMinuteInput = inputNumber(minuteInput, 0, 59);
  const hourInputValid = parsedHourInput !== null;
  const minuteInputValid = parsedMinuteInput !== null;

  // The official 24h dial keeps 00–11 outside and 12–23 inside.
  const doubleRing = use24h && mode === "hour";
  const handleRadius = doubleRing && time.hour >= 12 ? INNER_24H_RADIUS : DIAL_RADIUS;
  const tickRadius = doubleRing && time.hour >= 12 ? OUTER_24H_RADIUS : INNER_24H_RADIUS;

  const angle = mode === "hour" ? (use24h ? time.hour % 12 : hour12) * 30 : time.minute * 6;

  const scheduleModeSwitch = () => {
    if (switchTimer.current !== null) window.clearTimeout(switchTimer.current);
    switchTimer.current = window.setTimeout(() => setMode("minute"), HOUR_AUTO_SWITCH_MS);
  };

  /** Pick an hour on the 24h 00–11 outer / 12–23 inner double ring. */
  const setHour24 = (h: number, autoSwitch = true) => {
    update({ hour: h });
    if (autoSwitch) scheduleModeSwitch();
  };

  /** Pick a ring number as the hour; preserves the current half-day */
  const setHourOnDial = (n: number, autoSwitch = true) => {
    const base = n % 12;
    update({ hour: isPM ? base + 12 : base });
    if (autoSwitch) scheduleModeSwitch();
  };

  /** Pick a ring number as a minute (n×5) */
  const setMinuteOnDial = (n: number) => {
    update({ minute: (n * 5) % 60 });
  };

  const dialValues = React.useMemo(
    () =>
      mode === "minute"
        ? DIAL_POSITIONS.map((position) => (position * 5) % 60)
        : use24h
          ? [...OUTER_RING_HOURS, ...INNER_RING_HOURS]
          : [...DIAL_POSITIONS],
    [mode, use24h],
  );
  const selectedDialValue =
    mode === "minute" ? time.minute : use24h ? time.hour : hour12;
  const rovingDialValue = dialValues.includes(selectedDialValue)
    ? selectedDialValue
    : dialValues.reduce((nearest, candidate) => {
        const candidateDistance = Math.min(
          Math.abs(candidate - selectedDialValue),
          60 - Math.abs(candidate - selectedDialValue),
        );
        const nearestDistance = Math.min(
          Math.abs(nearest - selectedDialValue),
          60 - Math.abs(nearest - selectedDialValue),
        );
        return candidateDistance < nearestDistance ? candidate : nearest;
      }, dialValues[0] ?? 0);

  const focusDialValue = (nextValue: number) => {
    requestAnimationFrame(() => {
      dialRef.current
        ?.querySelector<HTMLButtonElement>(`button[data-dial-value="${nextValue}"]`)
        ?.focus();
    });
  };

  const handleNumberClick = (n: number, autoSwitch: boolean) => {
    if (mode === "hour") setHourOnDial(n, autoSwitch);
    else setMinuteOnDial(n);
  };

  /** Convert a tap or drag position into the nearest official dial value. */
  const selectPointerPosition = (clientX: number, clientY: number) => {
    const rect = dialRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = ((clientX - rect.left) / rect.width) * 256 - DIAL_CENTER;
    const dy = ((clientY - rect.top) / rect.height) * 256 - DIAL_CENTER;
    const degrees = (Math.atan2(dx, -dy) * 180) / Math.PI;
    const normalized = (degrees + 360) % 360;

    if (mode === "minute") {
      update({ minute: Math.round(normalized / 6) % 60 });
      return;
    }

    const clockHour = Math.round(normalized / 30) % 12;
    if (use24h) {
      const innerRing = Math.hypot(dx, dy) < (OUTER_24H_RADIUS + INNER_24H_RADIUS) / 2;
      update({ hour: innerRing ? clockHour + 12 : clockHour });
    } else {
      setHourOnDial(clockHour === 0 ? 12 : clockHour, false);
    }
  };

  const handleDialPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragPointerRef.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
    selectPointerPosition(e.clientX, e.clientY);
  };

  const handleDialPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragPointerRef.current !== e.pointerId) return;
    selectPointerPosition(e.clientX, e.clientY);
  };

  const handleDialPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragPointerRef.current !== e.pointerId) return;
    selectPointerPosition(e.clientX, e.clientY);
    dragPointerRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (mode === "hour") scheduleModeSwitch();
  };

  /** Arrow keys select and focus the adjacent dial option (APG radio pattern). */
  const handleDialKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentValue: number,
  ) => {
    const dir =
      e.key === "ArrowUp" || e.key === "ArrowRight"
        ? 1
        : e.key === "ArrowDown" || e.key === "ArrowLeft"
          ? -1
          : 0;
    if (dir === 0) return;
    e.preventDefault();
    const currentIndex = Math.max(0, dialValues.indexOf(currentValue));
    const nextValue =
      dialValues[(currentIndex + dir + dialValues.length) % dialValues.length];
    if (mode === "minute") update({ minute: nextValue });
    else if (use24h) update({ hour: nextValue });
    else setHourOnDial(nextValue, false);
    focusDialValue(nextValue);
  };

  const handleMeridiem = (m: "AM" | "PM") => {
    update({ hour: m === "AM" ? time.hour % 12 : (time.hour % 12) + 12 });
  };

  /** Arrow keys move the meridiem selection (radio-group pattern) */
  const handleMeridiemKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, _m: "AM" | "PM") => {
    const toAM = e.key === "ArrowUp" || e.key === "ArrowLeft";
    const toPM = e.key === "ArrowDown" || e.key === "ArrowRight";
    if (!toAM && !toPM) return;
    e.preventDefault();
    const target = toAM ? "AM" : "PM";
    handleMeridiem(target);
    (toAM ? amRef : pmRef).current?.focus();
  };

  const setDisplayedHour = (displayHour: number) => {
    update({ hour: use24h ? displayHour : (displayHour % 12) + (isPM ? 12 : 0) });
  };

  const handleHourInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextInput = event.currentTarget.value;
    if (!/^\d{0,2}$/.test(nextInput)) return;
    setHourInput(nextInput);
    setMode("hour");
    const nextHour = inputNumber(nextInput, hourInputMin, hourInputMax);
    if (nextHour !== null) setDisplayedHour(nextHour);
  };

  const handleMinuteInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextInput = event.currentTarget.value;
    if (!/^\d{0,2}$/.test(nextInput)) return;
    setMinuteInput(nextInput);
    setMode("minute");
    const nextMinute = inputNumber(nextInput, 0, 59);
    if (nextMinute !== null) update({ minute: nextMinute });
  };

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: "hour" | "minute"
  ) => {
    if (event.key === "Enter") {
      if (field === "hour" && hourInputValid) minuteInputRef.current?.focus();
      if (field === "minute" && minuteInputValid) event.currentTarget.blur();
      return;
    }
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    const direction = event.key === "ArrowUp" ? 1 : -1;
    if (field === "hour") {
      const current = parsedHourInput ?? hourForDisplay(time.hour, use24h);
      const range = hourInputMax - hourInputMin + 1;
      const next = ((current - hourInputMin + direction + range) % range) + hourInputMin;
      setHourInput(pad2(next));
      setDisplayedHour(next);
    } else {
      const current = parsedMinuteInput ?? time.minute;
      const next = (current + direction + 60) % 60;
      setMinuteInput(pad2(next));
      update({ minute: next });
    }
  };

  const periodSelector = (variant: "vertical" | "horizontal" | "input" | "scroll") => {
    if (use24h) return null;
    const horizontal = variant === "horizontal";
    const size =
      variant === "vertical"
        ? "h-20 w-[52px] flex-col rounded-full"
        : variant === "horizontal"
          ? "h-[38px] w-[216px] flex-row rounded-[8px]"
          : variant === "input"
            ? "h-[72px] w-[52px] flex-col rounded-[8px]"
            : "h-[120px] w-14 flex-col rounded-full";

    return (
      <div
        role="radiogroup"
        aria-label="Meridiem"
        className={cn("flex shrink-0 items-stretch border border-m3-outline", size)}
      >
        {(["AM", "PM"] as const).map((meridiem, index) => {
          const current = (meridiem === "AM") === !isPM;
          return (
            <React.Fragment key={meridiem}>
              {index === 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 bg-m3-outline",
                    horizontal ? "h-full w-px" : "h-px w-full"
                  )}
                />
              )}
              <button
                type="button"
                ref={meridiem === "AM" ? amRef : pmRef}
                role="radio"
                aria-checked={current}
                tabIndex={current ? 0 : -1}
                onClick={() => handleMeridiem(meridiem)}
                onKeyDown={(event) => handleMeridiemKeyDown(event, meridiem)}
                className={cn(
                  "m3-state m3-focus md-title-medium flex min-h-0 min-w-0 flex-1 cursor-pointer items-center justify-center outline-none transition-colors",
                  horizontal
                    ? index === 0
                      ? "rounded-s-[8px] rounded-e-none"
                      : "rounded-e-[8px] rounded-s-none"
                    : variant === "vertical" || variant === "scroll"
                      ? index === 0
                        ? "rounded-t-full rounded-b-none"
                        : "rounded-b-full rounded-t-none"
                      : index === 0
                        ? "rounded-t-[8px] rounded-b-none"
                        : "rounded-b-[8px] rounded-t-none",
                  current
                    ? "bg-m3-tertiary-container text-m3-on-tertiary-container"
                    : "text-m3-on-surface-variant"
                )}
              >
                {meridiem}
              </button>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const theta = (angle * Math.PI) / 180;
  const selX = DIAL_CENTER + handleRadius * Math.sin(theta);
  const selY = DIAL_CENTER - handleRadius * Math.cos(theta);

  const readoutSegment = (label: string, target: "hour" | "minute") => (
    <button
      type="button"
      onClick={() => setMode(target)}
      aria-pressed={mode === target}
      aria-label={`${target === "hour" ? "Hour" : "Minute"} ${label}`}
      className={cn(
        // Official: 96×80dp time-selector segment, corner-small (8dp) shape;
        // active on primary-container, inactive on surface-container-highest
        "m3-state m3-focus flex h-20 shrink-0 cursor-pointer items-center justify-center rounded-[8px] outline-none transition-colors",
        use24h ? "w-[114px]" : "w-24",
        mode === target
          ? "bg-m3-primary-container text-m3-on-primary-container"
          : "bg-m3-surface-container-highest text-m3-on-surface"
      )}
    >
      {label}
    </button>
  );

  const clockReadout = (
    <div className="flex items-center justify-center md-display-large tabular-nums">
      {readoutSegment(hourLabel, "hour")}
      <span aria-hidden="true" className="text-m3-on-surface">
        :
      </span>
      {readoutSegment(pad2(time.minute), "minute")}
    </div>
  );

  const rootClassName = cn(
    // Official: container surface-container-high at elevation level 3
    "rounded-[28px] bg-m3-surface-container-high p-6 m3-elevation-3",
    displayMode === "horizontal"
      ? fullWidth
        ? "w-full"
        : "w-fit max-w-full"
      : fullWidth
        ? "w-full"
        : "w-[328px]",
    className
  );

  if (displayMode === "input") {
    const hourError = use24h
      ? "Enter an hour from 0 to 23"
      : "Enter an hour from 1 to 12";

    return (
      <div ref={ref} role="group" aria-label="Time input" className={rootClassName}>
        <div className="flex items-start justify-center gap-3" dir="ltr">
          <div className="flex items-start">
            <div className="w-24">
              <input
                ref={hourInputRef}
                type="text"
                role="spinbutton"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                value={hourInput}
                aria-label="Hour"
                aria-valuemin={hourInputMin}
                aria-valuemax={hourInputMax}
                aria-valuenow={parsedHourInput ?? undefined}
                aria-invalid={!hourInputValid}
                aria-describedby={hourHelpId}
                onFocus={() => {
                  editingInputRef.current = "hour";
                  setMode("hour");
                }}
                onBlur={() => {
                  editingInputRef.current = null;
                  setHourInput(pad2(hourForDisplay(time.hour, use24h)));
                }}
                onChange={handleHourInputChange}
                onKeyDown={(event) => handleInputKeyDown(event, "hour")}
                className={cn(
                  "m3-focus h-[72px] w-24 rounded-[8px] text-center md-display-medium tabular-nums outline-none",
                  !hourInputValid
                    ? "border-2 border-m3-error bg-m3-surface-container-highest text-m3-error"
                    : mode === "hour"
                      ? "border-2 border-m3-primary bg-m3-primary-container text-m3-on-primary-container"
                      : "border border-transparent bg-m3-surface-container-highest text-m3-on-surface"
                )}
              />
              <span
                id={hourHelpId}
                aria-live="polite"
                className={cn(
                  "mt-[7px] block min-h-8 text-center md-body-small",
                  hourInputValid ? "text-m3-on-surface-variant" : "text-m3-error"
                )}
              >
                {hourInputValid ? "Hour" : hourError}
              </span>
            </div>
            <span
              aria-hidden="true"
              className="flex h-[72px] w-6 shrink-0 items-center justify-center text-m3-on-surface md-display-large"
            >
              :
            </span>
            <div className="w-24">
              <input
                ref={minuteInputRef}
                type="text"
                role="spinbutton"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                value={minuteInput}
                aria-label="Minute"
                aria-valuemin={0}
                aria-valuemax={59}
                aria-valuenow={parsedMinuteInput ?? undefined}
                aria-invalid={!minuteInputValid}
                aria-describedby={minuteHelpId}
                onFocus={() => {
                  editingInputRef.current = "minute";
                  setMode("minute");
                }}
                onBlur={() => {
                  editingInputRef.current = null;
                  setMinuteInput(pad2(time.minute));
                }}
                onChange={handleMinuteInputChange}
                onKeyDown={(event) => handleInputKeyDown(event, "minute")}
                className={cn(
                  "m3-focus h-[72px] w-24 rounded-[8px] text-center md-display-medium tabular-nums outline-none",
                  !minuteInputValid
                    ? "border-2 border-m3-error bg-m3-surface-container-highest text-m3-error"
                    : mode === "minute"
                      ? "border-2 border-m3-primary bg-m3-primary-container text-m3-on-primary-container"
                      : "border border-transparent bg-m3-surface-container-highest text-m3-on-surface"
                )}
              />
              <span
                id={minuteHelpId}
                aria-live="polite"
                className={cn(
                  "mt-[7px] block min-h-8 text-center md-body-small",
                  minuteInputValid ? "text-m3-on-surface-variant" : "text-m3-error"
                )}
              >
                {minuteInputValid ? "Minute" : "Enter a minute from 0 to 59"}
              </span>
            </div>
          </div>
          {periodSelector("input")}
        </div>
      </div>
    );
  }

  if (displayMode === "scroll") {
    return (
      <div ref={ref} role="group" aria-label="Time scroll picker" className={rootClassName}>
        <div className="flex items-start justify-center gap-2" dir="ltr">
          <div className="flex items-start">
            <TimeScrollField
              label="Hour"
              value={use24h ? time.hour : hour12}
              options={use24h ? HOURS_24 : HOURS_12}
              format={pad2}
              optionLabel={(hour) => `${hour} ${hour === 1 ? "hour" : "hours"}`}
              onChange={setDisplayedHour}
            />
            <span
              aria-hidden="true"
              className="flex h-[120px] w-4 shrink-0 items-center justify-center text-m3-on-surface md-display-large"
            >
              :
            </span>
            <TimeScrollField
              label="Minute"
              value={time.minute}
              options={MINUTES}
              format={pad2}
              optionLabel={(minute) => `${minute} ${minute === 1 ? "minute" : "minutes"}`}
              onChange={(minute) => update({ minute })}
            />
          </div>
          {periodSelector("scroll")}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} role="group" aria-label="Time picker" className={rootClassName}>
      <div
        className={cn(
          displayMode === "horizontal" &&
            "flex flex-col items-center justify-center gap-6 min-[560px]:flex-row min-[560px]:gap-9",
        )}
      >
        {displayMode === "horizontal" ? (
          <div className="flex shrink-0 flex-col items-center justify-center">
            {clockReadout}
            {!use24h && <div className="mt-4">{periodSelector("horizontal")}</div>}
          </div>
        ) : (
          <div className="mb-4 flex items-center justify-center gap-3">
            {clockReadout}
            {periodSelector("vertical")}
          </div>
        )}

      {/* Clock dial — official 256dp face on surface-container-highest, 48dp selector handle, 8dp center, 2dp track */}
      <div
        ref={dialRef}
        role="radiogroup"
        aria-label={`${mode === "hour" ? "Hour" : "Minute"} dial`}
        onPointerDown={handleDialPointerDown}
        onPointerMove={handleDialPointerMove}
        onPointerUp={handleDialPointerEnd}
        onPointerCancel={handleDialPointerEnd}
        className="relative mx-auto h-[256px] w-[256px] touch-none select-none rounded-full bg-m3-surface-container-highest"
      >
        {mode === "minute" &&
          Array.from({ length: 60 }, (_, minute) => {
            const tickTheta = (minute * 6 * Math.PI) / 180;
            const tickRadius = 118;
            const major = minute % 5 === 0;
            return (
              <span
                key={`minute-tick-${minute}`}
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute z-[1] -translate-x-1/2 -translate-y-1/2 rounded-full bg-m3-on-surface-variant",
                  major ? "h-1 w-1" : "h-0.5 w-0.5"
                )}
                style={{
                  left: DIAL_CENTER + tickRadius * Math.sin(tickTheta),
                  top: DIAL_CENTER - tickRadius * Math.cos(tickTheta),
                }}
              />
            );
          })}
        {/* Selection handle (48dp circle on the active number) */}
        <motion.span
          className="absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-m3-primary"
          style={{ left: selX - 24, top: selY - 24 }}
          initial={reduceMotion ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={reduceMotion ? { duration: 0 } : springs.expressiveEffects}
        />
        {/* Selector track (2dp hand) */}
        <motion.div
          className="pointer-events-none absolute z-0 rounded-full bg-m3-primary"
          style={{
            left: DIAL_CENTER - 1,
            bottom: DIAL_CENTER,
            width: 2,
            height: DIAL_RADIUS,
            transformOrigin: "bottom center",
          }}
          animate={{ rotate: angle, height: handleRadius }}
          transition={reduceMotion ? { duration: 0 } : springs.defaultVisual}
        />
        {/* Selector center (8dp) */}
        <span className="absolute left-1/2 top-1/2 z-30 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-m3-primary" />
        {/* 24h cross-ring dot: marks the same clock position on the opposite ring */}
        {doubleRing && (
          <motion.span
            className="absolute z-10 h-1.5 w-1.5 rounded-full bg-m3-primary"
            style={{
              left: DIAL_CENTER + tickRadius * Math.sin(theta) - 3,
              top: DIAL_CENTER - tickRadius * Math.cos(theta) - 3,
            }}
            initial={reduceMotion ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={reduceMotion ? { duration: 0 } : springs.expressiveEffects}
          />
        )}
        {doubleRing ? (
          <>
            {/* Outer ring: 00–11, with 00 at 12 o'clock. */}
            {OUTER_RING_HOURS.map((h) => {
              const { x, y } = dialPosition(h === 0 ? 12 : h, OUTER_24H_RADIUS);
              const isActive = h === time.hour;
              return (
                <button
                  type="button"
                  key={`h${h}`}
                  aria-label={`${h}:00`}
                  role="radio"
                  aria-checked={isActive}
                  tabIndex={h === rovingDialValue ? 0 : -1}
                  data-dial-value={h}
                  onClick={(event) => setHour24(h, event.detail > 0)}
                  onKeyDown={(event) => handleDialKeyDown(event, h)}
                  style={{ left: x - 24, top: y - 24 }}
                  className="m3-state m3-focus absolute z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full outline-none"
                >
                  <span
                    className={cn(
                      isActive ? "text-m3-on-primary" : "text-m3-on-surface-variant",
                      "md-label-large tabular-nums"
                    )}
                  >
                    {pad2(h)}
                  </span>
                </button>
              );
            })}
            {/* Inner ring: 12–23, with 12 at 12 o'clock. */}
            {INNER_RING_HOURS.map((h) => {
              const { x, y } = dialPosition(h === 12 ? 12 : h - 12, INNER_24H_RADIUS);
              const isActive = h === time.hour;
              return (
                <button
                  type="button"
                  key={`h${h}`}
                  aria-label={`${h}:00`}
                  role="radio"
                  aria-checked={isActive}
                  tabIndex={h === rovingDialValue ? 0 : -1}
                  data-dial-value={h}
                  onClick={(event) => setHour24(h, event.detail > 0)}
                  onKeyDown={(event) => handleDialKeyDown(event, h)}
                  style={{ left: x - 24, top: y - 24 }}
                  className="m3-state m3-focus absolute z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full outline-none"
                >
                  <span
                    className={cn(
                      isActive ? "text-m3-on-primary" : "text-m3-on-surface",
                      "md-body-large tabular-nums"
                    )}
                  >
                    {pad2(h)}
                  </span>
                </button>
              );
            })}
          </>
        ) : (
          /* Hour / minute numbers (48px hit areas; adjacent centers ≈ 54px apart) */
          DIAL_POSITIONS.map((n) => {
          const { x, y } = dialPosition(n);
          const label = mode === "hour" ? String(n) : pad2((n * 5) % 60);
          const isActive =
            mode === "hour" ? n === hour12 : (n * 5) % 60 === time.minute;
          return (
            <button
              type="button"
              key={n}
              aria-label={mode === "hour" ? `${n} hours` : `${(n * 5) % 60} minutes`}
              role="radio"
              aria-checked={isActive}
              tabIndex={(mode === "hour" ? n : (n * 5) % 60) === rovingDialValue ? 0 : -1}
              data-dial-value={mode === "hour" ? n : (n * 5) % 60}
              onClick={(event) => handleNumberClick(n, event.detail > 0)}
              onKeyDown={(event) =>
                handleDialKeyDown(event, mode === "hour" ? n : (n * 5) % 60)
              }
              style={{ left: x - 24, top: y - 24 }}
              className="m3-state m3-focus absolute z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full outline-none"
            >
              <span
                className={cn(
                  isActive ? "text-m3-on-primary" : "text-m3-on-surface",
                  "md-body-large"
                )}
              >
                {label}
              </span>
            </button>
          );
        })
        )}
      </div>
      </div>
    </div>
  );
});

interface TimePickerDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  value?: TimePickerValue;
  defaultValue?: TimePickerValue;
  onChange?: (value: TimePickerValue) => void;
  initialDisplayMode: "dial" | "input" | "scroll";
  use24h?: boolean;
  confirmLabel: string;
  dismissLabel: string;
  onConfirm?: (value: TimePickerValue) => void;
  onDismiss?: () => void;
  className?: string;
}

const TimePickerDialog = React.forwardRef<HTMLDivElement, TimePickerDialogProps>(function TimePickerDialog(
  {
    open,
    onOpenChange,
    value,
    defaultValue,
    onChange,
    initialDisplayMode,
    use24h,
    confirmLabel,
    dismissLabel,
    onConfirm,
    onDismiss,
    className,
  },
  ref
) {
  const reduceMotion = useReducedMotion() ?? false;
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = React.useRef<HTMLElement | null>(null);
  const sourceHour = value?.hour ?? defaultValue?.hour ?? 0;
  const sourceMinute = value?.minute ?? defaultValue?.minute ?? 0;
  const source = React.useMemo(
    () => validateTime({ hour: sourceHour, minute: sourceMinute }),
    [sourceHour, sourceMinute]
  );
  const [staged, setStaged] = React.useState<TimePickerValue>(() => validateTime(source));
  const [mode, setMode] = React.useState<"dial" | "input" | "scroll">(initialDisplayMode);
  const setPanelRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      panelRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  React.useEffect(() => {
    if (!open) return;
    setStaged(validateTime(source));
    setMode(initialDisplayMode);
  }, [initialDisplayMode, open, source]);

  React.useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => panelRef.current?.focus());
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onDismiss?.();
      onOpenChange?.(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [onDismiss, onOpenChange, open]);

  const dismiss = () => {
    onDismiss?.();
    onOpenChange?.(false);
  };
  const confirm = () => {
    onChange?.(staged);
    onConfirm?.(staged);
    onOpenChange?.(false);
  };
  const nextMode = mode === "dial" ? "input" : mode === "input" ? "scroll" : "dial";
  const handleTab = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusable.length === 0) {
      event.preventDefault();
      panelRef.current.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <motion.button
            type="button"
            aria-label="Dismiss time picker"
            onClick={dismiss}
            className="absolute inset-0 cursor-default bg-m3-scrim/32"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : undefined}
          />
          <motion.div
            ref={setPanelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Choose time"
            tabIndex={-1}
            onKeyDown={handleTab}
            className={cn(
              "m3-elevation-3 relative max-h-[calc(100dvh-32px)] overflow-y-auto rounded-[28px] bg-m3-surface-container-high p-6 outline-none",
              className
            )}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={reduceMotion ? { duration: 0 } : springs.expressive}
          >
            <TimePicker
              presentation="inline"
              displayMode={mode}
              value={staged}
              onChange={setStaged}
              use24h={use24h}
              className="m3-elevation-0 rounded-none bg-transparent p-0"
            />
            <div className="mt-4 flex items-center justify-between gap-4">
              <button
                type="button"
                aria-label={`Switch to ${nextMode} mode`}
                onClick={() => setMode(nextMode)}
                className="m3-state m3-focus grid h-12 w-12 place-items-center rounded-full text-m3-on-surface-variant outline-none"
              >
                <MaterialSymbol
                  icon={nextMode === "dial" ? "schedule" : nextMode === "input" ? "keyboard" : "swap_vert"}
                />
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={dismiss}
                  className="m3-state m3-focus h-12 rounded-full px-4 md-label-large text-m3-primary outline-none"
                >
                  {dismissLabel}
                </button>
                <button
                  type="button"
                  onClick={confirm}
                  className="m3-state m3-focus h-12 rounded-full px-4 md-label-large text-m3-primary outline-none"
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

TimePickerDialog.displayName = "TimePickerDialog";

/** Material 3 time picker for clock selection. @see https://m3.material.io/components/time-pickers/overview */
export const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(function TimePicker(
  {
    presentation = "inline",
    open = false,
    onOpenChange,
    confirmLabel = "OK",
    dismissLabel = "Cancel",
    onConfirm,
    onDismiss,
    displayMode = "dial",
    value,
    defaultValue,
    onChange,
    use24h,
    className,
    ...props
  },
  ref
) {
  const [internalModalValue, setInternalModalValue] = React.useState<TimePickerValue | undefined>(defaultValue);
  const activeModalValue = value ?? internalModalValue;
  const handleModalChange = React.useCallback(
    (next: TimePickerValue) => {
      if (value === undefined) setInternalModalValue(next);
      onChange?.(next);
    },
    [onChange, value]
  );

  if (presentation === "modal") {
    return (
      <TimePickerDialog
        ref={ref}
        open={open}
        onOpenChange={onOpenChange}
        value={activeModalValue}
        onChange={handleModalChange}
        initialDisplayMode={displayMode === "horizontal" ? "dial" : displayMode}
        use24h={use24h}
        confirmLabel={confirmLabel}
        dismissLabel={dismissLabel}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
        className={className}
      />
    );
  }

  return (
    <TimePickerInline
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      displayMode={displayMode}
      use24h={use24h}
      className={className}
      {...props}
    />
  );
});

export { timePickerMeta } from "@/lib/m3/meta";
