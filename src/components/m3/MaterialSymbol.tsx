"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface MaterialSymbolProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Material Symbols ligature name, e.g. "home", "arrow_forward", "favorite" */
  icon: string;
  /** 0 = outlined (default), 1 = filled */
  fill?: boolean;
  /** 100–700 weight axis */
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  /** -50–200 grade axis (adjusts emphasis without changing size) */
  grade?: -50 | 0 | 200;
  /** 20–48 optical size */
  opticalSize?: 20 | 24 | 40 | 48;
  /** Convenience size (sets fontSize). Default 24px via CSS. */
  size?: number;
  /** Skip font-variation overrides (inherit from CSS vars) */
  raw?: boolean;
}

/**
 * Material Symbols Rounded — the official Material 3 icon set,
 * rendered through Google's variable icon font.
 *
 * Usage: <MaterialSymbol icon="home" size={20} fill weight={500} />
 */
/** Google Material Symbols icon font wrapper. @see https://m3.material.io/styles/icons/overview */
export const MaterialSymbol = React.forwardRef<HTMLSpanElement, MaterialSymbolProps>(
  function MaterialSymbol(
    { icon, fill, weight, grade, opticalSize, size, className, style, raw, ...props },
    ref
  ) {
    const cssVars: React.CSSProperties & Record<`--msr-${string}`, string | number> = {};
    if (!raw) {
      if (fill !== undefined) cssVars["--msr-fill"] = fill ? 1 : 0;
      if (weight !== undefined) cssVars["--msr-wght"] = weight;
      if (grade !== undefined) cssVars["--msr-grad"] = grade;
      if (opticalSize !== undefined) cssVars["--msr-opsz"] = opticalSize;
    }
    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn("material-symbols-rounded select-none", className)}
        style={{ fontSize: size, ...cssVars, ...style }}
        {...props}
      >
        {icon}
      </span>
    );
  }
);
