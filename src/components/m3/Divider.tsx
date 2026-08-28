"use client";

import { Separator } from "@base-ui-components/react/separator";
import { cn } from "@/lib/utils";

export type DividerInset = "none" | "start" | "middle" | "end";
export type DividerColor = "outline" | "outline-variant";
export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps {
  /**
   * Inset. Horizontal "start" uses the official M3 list divider insets:
   * 16dp left / 24dp right (M3 lists specs). "middle" = 16dp equal indents
   * (M3 divider guideline: inset dividers are equally indented by default);
   * "end" is a library extension. Default "none" (full-bleed).
   */
  inset?: DividerInset;
  /** Stroke thickness in px. Default 1 (official 1dp). */
  thickness?: number;
  color?: DividerColor;
  orientation?: DividerOrientation;
  className?: string;
}

const horizontalInsets: Record<DividerInset, string> = {
  none: "",
  // Official M3 list divider insets (lists specs): 16dp left / 24dp right
  // (the 72dp start inset is the legacy M2 value, superseded by these)
  start: "ml-4 mr-6",
  // M3 divider guideline: inset dividers are equally indented (16dp)
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
 * M3 Divider — a 1dp line that groups content in lists and layouts.
 * Supports start/middle/end insets and a vertical orientation.
 *
 * Built on the Base UI Separator primitive: it owns the `role="separator"`
 * element, `aria-orientation` and orientation defaults; the M3 visuals
 * (inset, thickness, color role) are applied on top via className/style.
 * A future labeled-divider variant would render this separator plus a
 * text span; no label prop exists in the public API yet.
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
    <Separator
      orientation={orientation}
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
