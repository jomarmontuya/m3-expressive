"use client";

import * as React from "react";
import { Separator } from "@base-ui/react/separator";
import { cn } from "@/lib/utils";

export type DividerInset = "none" | "start" | "middle" | "end" | "list";
export type DividerColor = "outline" | "outline-variant";
export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps {
  /**
   * Inset. "start" is the generic 16dp start / 0dp end inset. "list" is
   * the M3 list preset with 16dp start / 24dp end. "middle" uses 16dp on
   * both inline edges; "end" is a library extension.
   */
  inset?: DividerInset;
  /** Stroke thickness in px. Default 1 (official 1dp). */
  thickness?: number;
  color?: DividerColor;
  orientation?: DividerOrientation;
  /** Expose role="separator" semantics. Decorative by default. */
  semantic?: boolean;
  className?: string;
}

const horizontalInsets: Record<DividerInset, string> = {
  none: "w-full",
  start: "ms-4 w-[calc(100%-1rem)]",
  // M3 divider guideline: inset dividers are equally indented (16dp)
  middle: "mx-4 w-[calc(100%-2rem)]",
  end: "me-4 w-[calc(100%-1rem)]",
  // Official M3 list divider insets: 16dp start / 24dp end.
  list: "ms-4 me-6 w-[calc(100%-2.5rem)]",
};

const verticalInsets: Record<DividerInset, string> = {
  none: "h-full",
  start: "mt-4 h-[calc(100%-1rem)]",
  middle: "my-4 h-[calc(100%-2rem)]",
  end: "mb-4 h-[calc(100%-1rem)]",
  // The list preset keeps its official 16dp start / 24dp end geometry.
  list: "mt-4 mb-6 h-[calc(100%-2.5rem)]",
};

/**
 * M3 Divider — a 1dp line that groups content in lists and layouts.
 * Supports start/middle/end insets and a vertical orientation.
 *
 * Built on the Base UI Separator primitive. Dividers are decorative by
 * default (`role="none"`); `semantic` opts into separator semantics and
 * orientation announcement. M3 visuals are applied via className/style.
 * A future labeled-divider variant would render this separator plus a
 * text span; no label prop exists in the public API yet.
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(function Divider({
  inset = "none",
  thickness = 1,
  color = "outline-variant",
  orientation = "horizontal",
  semantic = false,
  className,
}: DividerProps, ref) {
  const horizontal = orientation === "horizontal";
  return (
    <Separator
      ref={ref}
      orientation={orientation}
      role={semantic ? "separator" : "none"}
      aria-orientation={semantic ? orientation : undefined}
      className={cn(
        "shrink-0",
        !horizontal && "self-stretch",
        horizontal ? horizontalInsets[inset] : verticalInsets[inset],
        color === "outline" ? "bg-m3-outline" : "bg-m3-outline-variant",
        className
      )}
      style={horizontal ? { height: thickness } : { width: thickness }}
    />
  );
});

Divider.displayName = "Divider";

export { dividerMeta } from "@/lib/m3/meta";
