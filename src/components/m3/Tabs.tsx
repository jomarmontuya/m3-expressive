'use client';

import * as React from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { useTextDirection } from "@/lib/m3/use-text-direction";
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
  /** primary uses a label-width indicator; secondary uses the official full-tab-width underline; tonal preserves the old pill extension. */
  variant?: "primary" | "secondary" | "tonal";
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
 * overlay (NOT `Tabs.Indicator`): the primary underline matches the measured
 * label width, while the secondary underline matches the full tab width.
 *
 * Primary tabs are 64dp icon+label columns. Secondary tabs use the official
 * 48dp surface row. The old 48dp tonal pill row remains as `variant="tonal"`.
 * Leading and trailing scroll arrows remain custom because Base UI Tabs has
 * no scroller primitive.
 */
/** Material 3 tabs for peer content sections. @see https://m3.material.io/components/tabs/overview */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(function Tabs({
  items,
  value,
  onChange,
  variant = "primary",
  fullWidth = false,
  className,
}: TabsProps, ref) {
  // Per-instance layoutId prefix: keeps the shared-layout pill scoped to this
  // tab group when several Tabs render on the same page.
  const uid = React.useId();
  const indicatorId = `m3-tab-indicator-${uid}`;
  const pillId = `m3-tab-pill-${uid}`;
  const isPrimary = variant === "primary";
  const isTonal = variant === "tonal";
  const primaryHasIcons = isPrimary && items.some((item) => item.icon);

  /* --- Scrollable-tabs arrows (M3: show while overflowing in that direction) --- */
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const direction = useTextDirection(scrollerRef);
  const [canScrollStart, setCanScrollStart] = React.useState(false);
  const [canScrollEnd, setCanScrollEnd] = React.useState(false);

  const updateOverflow = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const inlineOffset = direction === "rtl" ? -el.scrollLeft : el.scrollLeft;
    const maxOffset = el.scrollWidth - el.clientWidth;
    setCanScrollStart(inlineOffset > 4);
    setCanScrollEnd(inlineOffset < maxOffset - 4);
  }, [direction]);

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

  const scrollTabs = (towardEnd: boolean) => {
    const el = scrollerRef.current;
    if (!el) return;
    const inlineDelta = (towardEnd ? 1 : -1) * Math.max(el.clientWidth * 0.75, 120);
    el.scrollBy({ left: direction === "rtl" ? -inlineDelta : inlineDelta, behavior: "smooth" });
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
    // the horizontal scroller.
    // activateOnFocus = automatic activation: arrows move focus AND select.
    <BaseTabs.List
      ref={scrollerRef}
      activateOnFocus
      className={cn(
        "m3-scroll flex flex-1 items-stretch overflow-x-auto",
        isPrimary
          ? cn(primaryHasIcons ? "h-16" : "h-12", "border-b border-m3-outline-variant")
          : "h-12",
        variant === "secondary" && "border-b border-m3-surface-variant bg-m3-surface"
      )}
    >
      {items.map((item) => {
        const active = item.value === value;
        // Primary indicator extends 2dp past each side of the label.
        const measuredWidth = Math.max(24, labelWidths[item.value] ?? 0) + 4;
        const textColor = active
          ? isPrimary
            ? "text-m3-primary"
            : isTonal
              ? "text-m3-on-secondary-container"
              : "text-m3-on-surface"
          : "text-m3-on-surface-variant";
        return (
          // BaseTabs.Tab owns role="tab", aria-selected and the roving
          // tabindex — no manual onKeyDown/aria wiring needed anymore.
          <BaseTabs.Tab
            key={item.value}
            value={item.value}
            className={cn(
              "m3-state m3-focus relative flex shrink-0 items-center justify-center",
              isPrimary && primaryHasIcons ? "flex-col gap-1 pb-2 pt-3" : "gap-2 px-4",
              "min-w-[96px]",
              fullWidth && "flex-1",
              textColor
            )}
          >
            <Ripple />
            {active && isPrimary && (
                  <motion.div
                    layoutId={indicatorId}
                    transition={spring(springs.expressive)}
                    className={cn(
                      "absolute bottom-0 h-[3px] rounded-[3px] bg-m3-primary"
                    )}
                    style={{
                      width: measuredWidth,
                      insetInlineStart: `calc(50% - ${measuredWidth / 2}px)`,
                    }}
                  />
                )}
            {active && variant === "secondary" && (
              <motion.div
                layoutId={indicatorId}
                transition={spring(springs.expressive)}
                className="absolute inset-x-0 bottom-0 h-0.5 bg-m3-primary"
              />
            )}
            {active && isTonal && (
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
                  <span className="absolute -end-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-m3-error px-1 text-[10px] font-semibold leading-none text-m3-on-error">
                    {item.badge}
                  </span>
                )}
              </span>
            )}
            {!item.icon && item.badge !== undefined && (
              <span className="absolute end-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-m3-error px-1 text-[10px] font-semibold leading-none text-m3-on-error">
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
    <DirectionProvider direction={direction}>
      <BaseTabs.Root
      ref={ref}
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
          onClick={() => scrollTabs(false)}
          className="m3-state m3-focus relative flex h-12 w-12 shrink-0 items-center justify-center self-center text-m3-on-surface-variant"
        >
          <Ripple />
          <MaterialSymbol icon={direction === "rtl" ? "chevron_right" : "chevron_left"} size={24} />
        </button>
      )}
      {tablist}
      {canScrollEnd && (
        <button
          type="button"
          aria-label="Scroll tabs forward"
          onClick={() => scrollTabs(true)}
          className="m3-state m3-focus relative flex h-12 w-12 shrink-0 items-center justify-center self-center text-m3-on-surface-variant"
        >
          <Ripple />
          <MaterialSymbol icon={direction === "rtl" ? "chevron_left" : "chevron_right"} size={24} />
        </button>
      )}
      </BaseTabs.Root>
    </DirectionProvider>
  );
});

Tabs.displayName = "Tabs";

export { tabsMeta } from "@/lib/m3/meta";
