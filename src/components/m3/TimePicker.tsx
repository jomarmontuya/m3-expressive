"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";

export interface TimePickerValue {
  /** 0–23 */
  hour: number;
  /** 0–59 */
  minute: number;
}

const DIAL_CENTER = 128;
const DIAL_RADIUS = 104;
const HOUR_AUTO_SWITCH_MS = 600;

const DIAL_POSITIONS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Position of a clock number n (1..12) on the dial via trig */
function dialPosition(n: number): { x: number; y: number } {
  const theta = (n * 30 * Math.PI) / 180;
  return {
    x: DIAL_CENTER + DIAL_RADIUS * Math.sin(theta),
    y: DIAL_CENTER - DIAL_RADIUS * Math.cos(theta),
  };
}

export interface TimePickerProps {
  /** Selected time (24h fields: hour 0–23, minute 0–59) */
  value?: TimePickerValue;
  onChange?: (t: TimePickerValue) => void;
  /** 24-hour readout. The dial keeps the 12-number ring; the AM/PM state is preserved when picking hours. */
  use24h?: boolean;
  /** Stretch to the container width */
  fullWidth?: boolean;
  className?: string;
}

/**
 * M3 clock-face Time Picker — official dial geometry (androidx material3
 * TimePickerTokens): 256dp clock face on surface-container-highest, 48dp
 * primary selection handle with 8dp center dot and 2dp track. The picker
 * container is surface-container-high at elevation level 3. The digital
 * readout uses the official 96×80dp time-selector segments (8dp corners,
 * display-large labels; active segment on primary-container, inactive on
 * surface-container-highest) and the vertical 52×80dp period selector has
 * a 1dp outline with the active option on tertiary-container. Hour numbers
 * sit on a 12-number ring (AM/PM preserved), minute marks map to n×5 with
 * 48px hit areas; arrows on the dial increment/decrement hour/minute and
 * picking an hour auto-advances to minute editing after 600ms.
 */
export const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(function TimePicker(
  { value, onChange, use24h = false, fullWidth = false, className },
  ref
) {
  const [internal, setInternal] = React.useState<TimePickerValue>({ hour: 10, minute: 30 });
  const time = value ?? internal;
  const [mode, setMode] = React.useState<"hour" | "minute">("hour");
  const switchTimer = React.useRef<number | null>(null);
  const amRef = React.useRef<HTMLButtonElement | null>(null);
  const pmRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    return () => {
      if (switchTimer.current !== null) window.clearTimeout(switchTimer.current);
    };
  }, []);

  const update = (next: Partial<TimePickerValue>) => {
    const merged: TimePickerValue = { ...time, ...next };
    setInternal(merged);
    onChange?.(merged);
  };

  const isPM = time.hour >= 12;
  const hour12 = time.hour % 12 === 0 ? 12 : time.hour % 12;
  const hourLabel = use24h ? pad2(time.hour) : String(hour12);

  const angle = mode === "hour" ? hour12 * 30 : time.minute * 6;

  const scheduleModeSwitch = () => {
    if (switchTimer.current !== null) window.clearTimeout(switchTimer.current);
    switchTimer.current = window.setTimeout(() => setMode("minute"), HOUR_AUTO_SWITCH_MS);
  };

  /** Pick a ring number as the hour; preserves the current half-day */
  const setHourOnDial = (n: number) => {
    const base = n % 12;
    update({ hour: isPM ? base + 12 : base });
    // Official flow: selecting an hour auto-advances to minute editing
    scheduleModeSwitch();
  };

  /** Pick a ring number as a minute (n×5) */
  const setMinuteOnDial = (n: number) => {
    update({ minute: (n * 5) % 60 });
  };

  const handleNumberClick = (n: number) => {
    if (mode === "hour") setHourOnDial(n);
    else setMinuteOnDial(n);
  };

  /** Keyboard dial operation: ↑/→ increments, ↓/← decrements (hour ±1 on the ring, minute ±1) */
  const handleDialKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const dir =
      e.key === "ArrowUp" || e.key === "ArrowRight"
        ? 1
        : e.key === "ArrowDown" || e.key === "ArrowLeft"
          ? -1
          : 0;
    if (dir === 0) return;
    e.preventDefault();
    if (mode === "hour") {
      const next = hour12 + dir;
      setHourOnDial(next < 1 ? 12 : next > 12 ? 1 : next);
    } else {
      update({ minute: (time.minute + dir + 60) % 60 });
    }
  };

  const handleMeridiem = (m: "AM" | "PM") => {
    update({ hour: m === "AM" ? time.hour % 12 : (time.hour % 12) + 12 });
  };

  /** Arrow keys move the meridiem selection (radio-group pattern) */
  const handleMeridiemKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, m: "AM" | "PM") => {
    const toAM = e.key === "ArrowUp" || e.key === "ArrowLeft";
    const toPM = e.key === "ArrowDown" || e.key === "ArrowRight";
    if (!toAM && !toPM) return;
    e.preventDefault();
    const target = toAM ? "AM" : "PM";
    handleMeridiem(target);
    (toAM ? amRef : pmRef).current?.focus();
  };

  const theta = (angle * Math.PI) / 180;
  const selX = DIAL_CENTER + DIAL_RADIUS * Math.sin(theta);
  const selY = DIAL_CENTER - DIAL_RADIUS * Math.cos(theta);

  const readoutSegment = (label: string, target: "hour" | "minute") => (
    <button
      type="button"
      onClick={() => setMode(target)}
      aria-pressed={mode === target}
      aria-label={`${target === "hour" ? "Hour" : "Minute"} ${label}`}
      className={cn(
        // Official: 96×80dp time-selector segment, corner-small (8dp) shape;
        // active on primary-container, inactive on surface-container-highest
        "m3-state m3-focus flex h-20 w-24 shrink-0 cursor-pointer items-center justify-center rounded-[8px] outline-none transition-colors",
        mode === target
          ? "bg-m3-primary-container text-m3-on-primary-container"
          : "bg-m3-surface-container-highest text-m3-on-surface"
      )}
    >
      {label}
    </button>
  );

  return (
    <div
      ref={ref}
      className={cn(
        // Official: container surface-container-high at elevation level 3
        "rounded-[28px] bg-m3-surface-container-high p-6 m3-elevation-3",
        fullWidth ? "w-full" : "w-[328px]",
        className
      )}
    >
      {/* Readout row: 96×80dp time-selector segments + 52×80dp vertical period selector */}
      <div className="mb-4 flex items-center justify-center gap-3">
        <div className="flex items-center justify-center md-display-large tabular-nums">
          {readoutSegment(hourLabel, "hour")}
          <span aria-hidden="true" className="text-m3-on-surface">
            :
          </span>
          {readoutSegment(pad2(time.minute), "minute")}
        </div>
        {!use24h && (
          <div
            role="radiogroup"
            aria-label="Meridiem"
            className="flex h-20 w-[52px] shrink-0 flex-col items-stretch rounded-full border border-m3-outline"
          >
            {(["AM", "PM"] as const).map((m, i) => {
              const isCurrent = (m === "AM") === !isPM;
              return (
                <React.Fragment key={m}>
                  {i === 1 && <span aria-hidden="true" className="h-px w-full shrink-0 bg-m3-outline" />}
                  <button
                    type="button"
                    ref={m === "AM" ? amRef : pmRef}
                    role="radio"
                    aria-checked={isCurrent}
                    onClick={() => handleMeridiem(m)}
                    onKeyDown={(e) => handleMeridiemKeyDown(e, m)}
                    className={cn(
                      "m3-state m3-focus md-title-medium flex min-h-0 flex-1 cursor-pointer items-center justify-center rounded-full outline-none transition-colors",
                      isCurrent
                        ? "bg-m3-tertiary-container text-m3-on-tertiary-container"
                        : "text-m3-on-surface-variant"
                    )}
                  >
                    {m}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>

      {/* Clock dial — official 256dp face on surface-container-highest, 48dp selector handle, 8dp center, 2dp track */}
      <div className="m3-elevation-1 relative mx-auto h-[256px] w-[256px] select-none rounded-full bg-m3-surface-container-highest">
        {/* Selection handle (48dp circle on the active number) */}
        <motion.span
          className="absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-m3-primary"
          style={{ left: selX - 24, top: selY - 24 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={springs.expressiveEffects}
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
          animate={{ rotate: angle }}
          transition={springs.defaultVisual}
        />
        {/* Selector center (8dp) */}
        <span className="absolute left-1/2 top-1/2 z-30 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-m3-primary" />
        {/* Hour / minute numbers (48px hit areas; adjacent centers ≈ 54px apart) */}
        {DIAL_POSITIONS.map((n) => {
          const { x, y } = dialPosition(n);
          const label = mode === "hour" ? String(n) : pad2((n * 5) % 60);
          const isActive =
            mode === "hour" ? n === hour12 : (n * 5) % 60 === time.minute;
          return (
            <button
              type="button"
              key={n}
              aria-label={mode === "hour" ? `${n} hours` : `${(n * 5) % 60} minutes`}
              onClick={() => handleNumberClick(n)}
              onKeyDown={handleDialKeyDown}
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
        })}
      </div>
    </div>
  );
});

export { timePickerMeta } from "@/lib/m3/meta";
