'use client';

import * as React from "react";
import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";
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
 * Built on the Base UI Tabs primitive (imported as `BaseTabs` because this
 * module also exports a `Tabs`): `Tabs.Root` is the controlled wrapper,
 * `Tabs.List` the `role="tablist"` scroller and `Tabs.Tab` each
 * `role="tab"` button. Base UI owns the WAI-ARIA tabs behavior — roving
 * tabindex, ArrowLeft/Right + Home/End with looping, and automatic
 * activation on arrow-key focus (`activateOnFocus`) — exactly the
 * keyboard/ARIA contract this component implemented by hand before.
 *
 * The selection indicator intentionally stays a framer-motion shared-layout
 * overlay (NOT `Tabs.Indicator`): the M3 primary underline must match the
 * *measured label text width* (ResizeObserver + document.fonts.ready), while
 * Base UI's indicator sizes to the whole tab and animates via CSS
 * transitions — the motion overlay keeps the official 3dp underline and the
 * secondary tonal pill pixel-identical and spring-animated (layoutId).
 *
 * Primary tabs are the official 64dp icon+label columns; secondary tabs are
 * the 48dp Expressive tonal pill row. Horizontally scrollable when tabs
 * overflow — per spec, leading/trailing scroll arrows appear while content
 * overflows in that direction (kept custom; Base UI Tabs has no scroller).
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
    labelRefs.current.forEach((el) => {
      ro.observe(el);
    });
    let cancelled = false;
    void document.fonts?.ready.then(() => {
      if (!cancelled) measureLabels();
    });
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [measureLabels, items]);

  const tablist = (
    // BaseTabs.List renders the tablist <div> (role="tablist") and doubles as
    // the horizontal scroller, exactly like the pre-migration markup.
    // activateOnFocus = automatic activation: arrows move focus AND select.
    <BaseTabs.List
      ref={scrollerRef}
      activateOnFocus
      className={cn(
        "m3-scroll flex flex-1 items-stretch overflow-x-auto",
        isPrimary ? "h-16 border-b border-m3-outline-variant" : "h-12"
      )}
    >
      {items.map((item) => {
        const active = item.value === value;
        const measuredWidth = labelWidths[item.value] ?? 0;
        const textColor = active
          ? isPrimary
            ? "text-m3-primary"
            : "text-m3-on-secondary-container"
          : "text-m3-on-surface-variant";
        return (
          // BaseTabs.Tab owns role="tab", aria-selected and the roving
          // tabindex — no manual onKeyDown/aria wiring needed anymore.
          <BaseTabs.Tab
            key={item.value}
            value={item.value}
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
          </BaseTabs.Tab>
        );
      })}
    </BaseTabs.List>
  );

  return (
    // BaseTabs.Root renders the outer wrapper <div> and owns the controlled
    // value + change events; the scroll arrows are plain siblings (not tabs).
    <BaseTabs.Root
      value={value}
      onValueChange={(v) => onChange(v as string)}
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
    </BaseTabs.Root>
  );
}

export { tabsMeta } from "@/lib/m3/meta";
