'use client';

import * as React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

export interface NavItem {
  value: string;
  icon?: string;
  label: string;
  badge?: string | number;
}

/** framer-motion's legacy `Spring` type drops the "spring" literal, so tokens.springs widens to `string`; re-narrow for `Transition`. */
function spring(transition: (typeof springs)[keyof typeof springs]): Transition {
  return { ...transition, type: "spring" };
}

export interface TabsProps {
  items: NavItem[];
  value: string;
  onChange: (v: string) => void;
  /** primary = 64dp icon+label columns with a sliding 3dp underline sized to the label text; secondary = 48dp expressive tonal pill row */
  variant?: "primary" | "secondary";
  /** Stretch to the container width and distribute tabs equally */
  fullWidth?: boolean;
  className?: string;
}

/**
 * M3 Tabs — organize content across different screens, data sets and interactions.
 * Primary tabs are the official 64dp icon+label columns with a 3dp active
 * indicator — a shared-layout underline sized to the measured label text width
 * (ResizeObserver + document.fonts.ready); secondary tabs are the 48dp Expressive
 * tonal pill row. Horizontally scrollable when tabs overflow — per spec,
 * leading/trailing scroll arrows appear while content overflows in that
 * direction. Roving tabindex with ArrowLeft/Right/Home/End (automatic
 * activation) follows the WAI-ARIA tabs pattern.
 */
export function Tabs({
  items,
  value,
  onChange,
  variant = "primary",
  fullWidth = false,
  className,
}: TabsProps) {
  // Per-instance layoutId prefix: keeps the shared-layout pill scoped to this
  // tab group when several Tabs render on the same page.
  const uid = React.useId();
  const indicatorId = `m3-tab-indicator-${uid}`;
  const pillId = `m3-tab-pill-${uid}`;
  const isPrimary = variant === "primary";

  /* --- Scrollable-tabs arrows (M3: show while overflowing in that direction) --- */
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollStart, setCanScrollStart] = React.useState(false);
  const [canScrollEnd, setCanScrollEnd] = React.useState(false);

  const updateOverflow = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollStart(el.scrollLeft > 4);
    setCanScrollEnd(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  React.useEffect(() => {
    updateOverflow();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateOverflow, { passive: true });
    const ro = new ResizeObserver(updateOverflow);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateOverflow);
      ro.disconnect();
    };
  }, [updateOverflow, items.length]);

  const scrollTabs = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.75, 120), behavior: "smooth" });
  };

  /* --- Keyboard: roving tabindex + automatic activation (WAI-ARIA tabs) --- */
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (index + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    if (next === null) return;
    e.preventDefault();
    tabRefs.current[next]?.focus();
    onChange(items[next].value);
  };

  /* --- Primary indicator: measure label text so the underline matches it (M3) --- */
  const labelRefs = React.useRef<Map<string, HTMLSpanElement>>(new Map());
  const [labelWidths, setLabelWidths] = React.useState<Record<string, number>>({});

  const measureLabels = React.useCallback(() => {
    const next: Record<string, number> = {};
    labelRefs.current.forEach((el, v) => {
      next[v] = el.getBoundingClientRect().width;
    });
    setLabelWidths((prev) => {
      const keys = Object.keys(next);
      const unchanged =
        keys.length === Object.keys(prev).length &&
        keys.every((k) => prev[k] === next[k]);
      return unchanged ? prev : next;
    });
  }, []);

  React.useLayoutEffect(() => {
    measureLabels();
    const ro = new ResizeObserver(measureLabels);
    labelRefs.current.forEach((el) => ro.observe(el));
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) measureLabels();
    });
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [measureLabels, items]);

  const tablist = (
    <div
      ref={scrollerRef}
      role="tablist"
      className={cn(
        "m3-scroll flex flex-1 items-stretch overflow-x-auto",
        isPrimary ? "h-16 border-b border-m3-outline-variant" : "h-12"
      )}
    >
      {items.map((item, index) => {
        const active = item.value === value;
        const measuredWidth = labelWidths[item.value] ?? 0;
        const textColor = active
          ? isPrimary
            ? "text-m3-primary"
            : "text-m3-on-secondary-container"
          : "text-m3-on-surface-variant";
        return (
          <button
            key={item.value}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onKeyDown={(e) => onTabKeyDown(e, index)}
            onClick={() => onChange(item.value)}
            className={cn(
              "m3-state relative flex shrink-0 items-center justify-center",
              isPrimary ? "flex-col gap-1 pb-2 pt-3" : "gap-2 px-4",
              "min-w-[96px]",
              fullWidth && "flex-1",
              textColor
            )}
          >
            <Ripple />
            {isPrimary
              ? active && (
                  <motion.div
                    layoutId={indicatorId}
                    transition={spring(springs.expressive)}
                    className={cn(
                      "absolute bottom-0 h-[3px] rounded-full bg-m3-primary",
                      measuredWidth === 0 && "left-1/3 w-1/3"
                    )}
                    style={
                      measuredWidth > 0
                        ? {
                            width: measuredWidth,
                            left: `calc(50% - ${measuredWidth / 2}px)`,
                          }
                        : undefined
                    }
                  />
                )
              : active && (
                  <motion.div
                    layoutId={pillId}
                    transition={spring(springs.expressive)}
                    className="absolute inset-x-1 inset-y-2 rounded-full bg-m3-secondary-container"
                  />
                )}
            {item.icon && (
              <span className="relative">
                <MaterialSymbol icon={item.icon} size={24} fill={active} />
                {item.badge !== undefined && (
                  <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-m3-error px-1 text-[10px] font-semibold leading-none text-m3-on-error">
                    {item.badge}
                  </span>
                )}
              </span>
            )}
            {!item.icon && item.badge !== undefined && (
              <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-m3-error px-1 text-[10px] font-semibold leading-none text-m3-on-error">
                {item.badge}
              </span>
            )}
            <span
              ref={(el) => {
                if (el) labelRefs.current.set(item.value, el);
                else labelRefs.current.delete(item.value);
              }}
              className="relative md-label-large"
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div
      className={cn(
        "flex items-stretch",
        fullWidth ? "w-full" : "w-fit max-w-full",
        className
      )}
    >
      {canScrollStart && (
        <button
          type="button"
          aria-label="Scroll tabs backward"
          onClick={() => scrollTabs(-1)}
          className="m3-state relative flex h-12 w-12 shrink-0 items-center justify-center self-center text-m3-on-surface-variant"
        >
          <Ripple />
          <MaterialSymbol icon="chevron_left" size={24} />
        </button>
      )}
      {tablist}
      {canScrollEnd && (
        <button
          type="button"
          aria-label="Scroll tabs forward"
          onClick={() => scrollTabs(1)}
          className="m3-state relative flex h-12 w-12 shrink-0 items-center justify-center self-center text-m3-on-surface-variant"
        >
          <Ripple />
          <MaterialSymbol icon="chevron_right" size={24} />
        </button>
      )}
    </div>
  );
}

export { tabsMeta } from "@/lib/m3/meta";
