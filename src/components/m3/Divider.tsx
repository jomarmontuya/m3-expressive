"use client";

import { cn } from "@/lib/utils";

export type DividerInset = "none" | "start" | "middle" | "end";
export type DividerColor = "outline" | "outline-variant";
export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps {
  /** 16px side inset. Default "none". */
  inset?: DividerInset;
  /** Stroke thickness in px. Default 1. */
  thickness?: number;
  color?: DividerColor;
  orientation?: DividerOrientation;
  className?: string;
}

const horizontalInsets: Record<DividerInset, string> = {
  none: "",
  start: "ml-4",
  middle: "mx-4",
  end: "mr-4",
};

const verticalInsets: Record<DividerInset, string> = {
  none: "",
  start: "mt-4",
  middle: "my-4",
  end: "mb-4",
};

/**
 * M3 Divider — a thin line that groups content in lists and layouts.
 * Supports start/middle/end 16px insets and a vertical orientation.
 */
export function Divider({
  inset = "none",
  thickness = 1,
  color = "outline-variant",
  orientation = "horizontal",
  className,
}: DividerProps) {
  const horizontal = orientation === "horizontal";
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0",
        horizontal ? "w-full" : "h-full self-stretch",
        horizontal ? horizontalInsets[inset] : verticalInsets[inset],
        color === "outline" ? "bg-m3-outline" : "bg-m3-outline-variant",
        className
      )}
      style={horizontal ? { height: thickness } : { width: thickness }}
    />
  );
}

export { dividerMeta } from "@/lib/m3/meta";
