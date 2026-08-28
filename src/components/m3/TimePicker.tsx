"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, type M3Spring } from "@/lib/m3/tokens";

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

/** tokens.ts widens `type` to `string`; framer-motion needs the "spring" literal. */
const spring = (s: M3Spring): Transition => ({ ...s, type: "spring" });

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
 * M3 clock-face Time Picker — a display readout over an analog dial.
 * Clicking the readout switches between hour and minute editing; hour
 * numbers sit on a 12-number ring (AM/PM preserved), minute marks map
 * to n×5. The primary selection pill and clock hand animate with springs.
 */
export const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(function TimePicker(
  { value, onChange, use24h = false, fullWidth = false, className },
  ref
) {
  const [internal, setInternal] = React.useState<TimePickerValue>({ hour: 10, minute: 30 });
  const time = value ?? internal;
  const [mode, setMode] = React.useState<"hour" | "minute">("hour");
  const switchTimer = React.useRef<number | null>(null);

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

  const handleNumberClick = (n: number) => {
    if (mode === "hour") {
      const base = n % 12;
      update({ hour: isPM ? base + 12 : base });
      if (!use24h) {
        if (switchTimer.current !== null) window.clearTimeout(switchTimer.current);
        switchTimer.current = window.setTimeout(() => setMode("minute"), HOUR_AUTO_SWITCH_MS);
      }
    } else {
      update({ minute: (n * 5) % 60 });
    }
  };

  const handleMeridiem = (m: "AM" | "PM") => {
    update({ hour: m === "AM" ? time.hour % 12 : (time.hour % 12) + 12 });
  };

  const theta = (angle * Math.PI) / 180;
  const selX = DIAL_CENTER + DIAL_RADIUS * Math.sin(theta);
  const selY = DIAL_CENTER - DIAL_RADIUS * Math.cos(theta);

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-[28px] bg-m3-surface-container-highest p-6",
        fullWidth ? "w-full" : "w-[328px]",
        className
      )}
    >
      {/* Readout row */}
      <div className="mb-4 flex items-center justify-center gap-4">
        <div className="flex items-baseline md-display-small tabular-nums">
          <button
            type="button"
            onClick={() => setMode("hour")}
            className={cn(
              "m3-state cursor-pointer rounded-lg px-1 outline-none transition-colors",
              mode === "hour" ? "text-m3-primary" : "text-m3-on-surface-variant/60"
            )}
          >
            {hourLabel}
          </button>
          <span className="text-m3-on-surface-variant/60">:</span>
          <button
            type="button"
            onClick={() => setMode("minute")}
            className={cn(
              "m3-state cursor-pointer rounded-lg px-1 outline-none transition-colors",
              mode === "minute" ? "text-m3-primary" : "text-m3-on-surface-variant/60"
            )}
          >
            {pad2(time.minute)}
          </button>
        </div>
        {!use24h && (
          <div className="flex flex-col items-center gap-1">
            {(["AM", "PM"] as const).map((m) => {
              const isCurrent = (m === "AM") === !isPM;
              return (
                <button
                  type="button"
                  key={m}
                  onClick={() => handleMeridiem(m)}
                  className={cn(
                    "m3-state md-title-medium cursor-pointer rounded-full px-2 py-0.5 outline-none transition-colors",
                    isCurrent
                      ? "bg-m3-primary-container text-m3-on-primary-container"
                      : "text-m3-on-surface-variant/60"
                  )}
                >
                  {m}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Clock dial */}
      <div className="m3-elevation-1 relative mx-auto h-[256px] w-[256px] select-none rounded-full bg-m3-surface-container-high">
        {/* Selection pill (36px circle on the active number) */}
        <motion.span
          className="absolute z-10 flex h-9 w-9 items-center justify-center rounded-full bg-m3-primary"
          style={{ left: selX - 18, top: selY - 18 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={spring(springs.expressiveEffects)}
        />
        {/* Clock hand */}
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
          transition={spring(springs.defaultVisual)}
        />
        {/* Center dot */}
        <span className="absolute left-1/2 top-1/2 z-30 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-m3-primary" />
        {/* Hour / minute numbers */}
        {DIAL_POSITIONS.map((n) => {
          const { x, y } = dialPosition(n);
          const label = mode === "hour" ? String(n) : pad2((n * 5) % 60);
          const isActive =
            mode === "hour" ? n === hour12 : (n * 5) % 60 === time.minute;
          return (
            <button
              type="button"
              key={n}
              onClick={() => handleNumberClick(n)}
              style={{ left: x - 16, top: y - 16 }}
              className="m3-state m3-focus absolute z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full outline-none"
            >
              <span
                className={cn(
                  isActive ? "text-m3-on-primary" : "text-m3-on-surface",
                  mode === "hour" ? "md-body-large" : "md-body-medium"
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
