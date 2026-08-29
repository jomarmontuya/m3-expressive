"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface RippleItem {
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface RippleProps {
  /** Uses currentColor of the parent as the ink color */
  className?: string;
  /** Suppress ripple spawning (e.g. when the control is disabled) */
  disabled?: boolean;
}

let rippleCounter = 0;

/**
 * Material ripple — touch feedback that emanates from the press point.
 *
 * Renders an overlay span and listens (capture phase) on its PARENT
 * element for pointerdown, so ripples fire wherever the press lands
 * (icon, label, padding). The parent should be `relative overflow-hidden`
 * with a defined `color`.
 */
export const Ripple = React.forwardRef<HTMLSpanElement, RippleProps>(function Ripple(
  { className, disabled },
  ref,
) {
  const hostRef = React.useRef<HTMLSpanElement>(null);
  const [items, setItems] = React.useState<RippleItem[]>([]);

  React.useImperativeHandle(ref, () => hostRef.current!, []);

  React.useEffect(() => {
    const host = hostRef.current?.parentElement;
    if (!host || disabled) return;
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      const rect = host.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2.2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const id = ++rippleCounter;
      setItems((prev) => [...prev.slice(-3), { id, x, y, size }]);
    };
    host.addEventListener("pointerdown", onDown, true);
    return () => host.removeEventListener("pointerdown", onDown, true);
  }, [disabled]);

  return (
    <span
      ref={hostRef}
      data-testid="ripple"
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]", className)}
    >
      {items.map((r) => (
        <RippleBubble
          key={r.id}
          {...r}
          onDone={() => setItems((prev) => prev.filter((i) => i.id !== r.id))}
        />
      ))}
    </span>
  );
});

Ripple.displayName = "Ripple";

function RippleBubble({ x, y, size, onDone }: RippleItem & { onDone: () => void }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 640);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <span
      className="absolute rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: "currentColor",
        opacity: 0.12,
        animation:
          "m3-ripple-in 300ms cubic-bezier(0,0,0,1) forwards, m3-ripple-out 450ms 175ms cubic-bezier(0.2,0,0,1) forwards",
      }}
    />
  );
}
