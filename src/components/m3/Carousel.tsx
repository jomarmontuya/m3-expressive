"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { MaterialSymbol } from "./MaterialSymbol";
import { Ripple } from "./Ripple";

export type CarouselLayout = "multi-browse" | "hero" | "inline";
export type CarouselAlignment = "start" | "end";
export type CarouselTone = "primary" | "secondary" | "tertiary" | "surface";
export type CarouselShape = "round" | "square";
/** Navigation-arrow affordance: "auto" reveals on hover/focus while overflowing,
 * "always" keeps visible arrows (keyboard-reachable), "never" hides them. */
export type CarouselArrows = "auto" | "always" | "never";

/**
 * One snap item. Items render tonal containers with a large MaterialSymbol
 * and an md-label-large label (the library has no image assets); give an item
 * href or onClick to make the whole slide an actionable control.
 */
export interface CarouselItem {
  id: string;
  label?: string;
  /** Material Symbols ligature name, e.g. "beach_access" */
  icon?: string;
  /** Container color role of the item background */
  tone?: CarouselTone;
  /** Renders the item as a link */
  href?: string;
  /** Renders the item as a button; receives the item on activation */
  onClick?: (item: CarouselItem) => void;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CarouselItem[];
  /**
   * Official layout strategies (m3.material.io/components/carousel):
   * multi-browse — flexible equal widths, `itemCount` visible + a 24px peek;
   * hero — one large (66%) leading item, the rest smaller (34%);
   * inline — one full-width item per view, adjacent items peek 0.
   */
  layout?: CarouselLayout;
  /** Scroll-snap alignment of items. */
  alignment?: CarouselAlignment;
  /** multi-browse visible-item hint, clamped to 1–5. */
  itemCount?: number;
  /** Item corners: 28dp (extraLarge, M3E) or square. */
  shape?: CarouselShape;
  /** Optional navigation arrows (M3 scrolling-row affordance): "auto" reveals
   * circular 48dp buttons on hover/focus while content overflows in that
   * direction; "always" keeps them visible and keyboard-reachable; "never"
   * (and the default "auto") never blocks the swipe/scroll gesture. */
  arrows?: CarouselArrows;
  /** Accessible name of the carousel region. */
  ariaLabel?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Official metrics                                                    */
/* ------------------------------------------------------------------ */
/** Official 8dp item spacing. */
const GAP = 8;
/** Multi-browse peek: px of the next item visible past the last full slot. */
const PEEK = 24;
/** M3E dynamic-width treatment: hovered/focused item grows to ~1.12×, the
 * freed width is redistributed so the visible row's total stays constant. */
const GROW = 1.12;
/** Item heights per layout (px) — demo-scale content aspect (240–320px). */
const HEIGHT: Record<Exclude<CarouselLayout, "hero">, number> = {
  "multi-browse": 280,
  inline: 320,
};
/** Official hero proportions are ≈ 360:240 (large:small, 3:2). */
const HERO_LARGE_H = 360;
const HERO_SMALL_H = 240;
const HERO_LARGE_W = 0.66;
const HERO_SMALL_W = 0.34;

const toneStyles: Record<CarouselTone, string> = {
  primary: "bg-m3-primary-container text-m3-on-primary-container",
  secondary: "bg-m3-secondary-container text-m3-on-secondary-container",
  tertiary: "bg-m3-tertiary-container text-m3-on-tertiary-container",
  surface: "bg-m3-surface-container-high text-m3-on-surface",
};

const clampCount = (n: number) => Math.min(5, Math.max(1, Math.round(n)));

/**
 * M3 Expressive Carousel — a horizontally scrollable, scroll-snapped
 * collection of items with the three official layout strategies
 * (multi-browse / hero / inline), 8dp gaps and shaped items.
 *
 * Provenance: https://m3.material.io/components/carousel/overview
 *
 * M3E signature — dynamic widths: in the multi-browse layout the
 * hovered/focused slide springs to ~1.12× its slot while the neighbors give
 * up the difference (total visible width stays constant), using the
 * `springs.defaultSpatial` physics spring. Items snap with CSS scroll-snap
 * (mandatory), the native scrollbar is hidden, and Arrow keys rove focus
 * between slides (Tab reaches every actionable slide). Optional circular
 * navigation arrows (48dp, elevation 1) scroll one item per press and appear
 * only while content overflows in their direction.
 *
 * ```tsx
 * <Carousel
 *   layout="multi-browse"
 *   itemCount={4}
 *   items={[
 *     { id: "beach", label: "Beach day", icon: "beach_access", tone: "primary" },
 *     { id: "hike", label: "Hiking", icon: "hiking", tone: "secondary" },
 *     { id: "museum", label: "Museums", icon: "museum", tone: "tertiary" },
 *   ]}
 * />
 * ```
 */
export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
  {
    items,
    layout = "multi-browse",
    alignment = "start",
    itemCount = 4,
    shape = "round",
    arrows = "auto",
    ariaLabel,
    className,
    ...props
  },
  ref
) {
  const n = clampCount(itemCount);
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  /** Measured content width of the scroller (0 until first layout pass). */
  const [vw, setVw] = React.useState(0);
  const [hoverId, setHoverId] = React.useState<string | null>(null);
  const [focusId, setFocusId] = React.useState<string | null>(null);
  const hot = hoverId ?? focusId;
  const hotIndex = items.findIndex((it) => it.id === hot);
  // Dynamic widths need ≥ 2 slots to redistribute into
  const grows = layout === "multi-browse" && n > 1;

  /* Track the scroller's width so slide widths can be spring-animated as
     exact px values (and redistributed on hover without flex ambiguity). */
  React.useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      setVw((prev) => (Math.abs(prev - width) > 0.5 ? width : prev));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /** Merge the forwarded ref with the internal scroller ref. */
  const setScrollerRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      scrollerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  /* ---- optional navigation arrows ------------------------------------ */
  const showArrows = arrows !== "never";
  const scrollerId = React.useId().replace(/[:]/g, "");
  const [canScrollStart, setCanScrollStart] = React.useState(false);
  const [canScrollEnd, setCanScrollEnd] = React.useState(false);
  const [hoverArrows, setHoverArrows] = React.useState(false);
  const [kbWithin, setKbWithin] = React.useState(false);
  const revealed = arrows === "always" || hoverArrows || kbWithin;

  const updateOverflow = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollStart(el.scrollLeft > 4);
    setCanScrollEnd(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  React.useEffect(() => {
    if (!showArrows) return;
    const el = scrollerRef.current;
    if (!el) return;
    updateOverflow();
    el.addEventListener("scroll", updateOverflow, { passive: true });
    /* Item widths spring-animate on hover, which changes scrollWidth without
       a scroll event — observing the slides catches those morphs too. */
    const ro = new ResizeObserver(updateOverflow);
    ro.observe(el);
    el.querySelectorAll("[data-carousel-item]").forEach((node) => ro.observe(node));
    return () => {
      el.removeEventListener("scroll", updateOverflow);
      ro.disconnect();
    };
  }, [updateOverflow, showArrows, items.length]);

  /** Advance exactly one slide in `dir` (layout-agnostic via live rects). */
  const scrollByItem = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slides = Array.from(el.querySelectorAll<HTMLElement>("[data-carousel-item]"));
    if (slides.length === 0) return;
    const elLeft = el.getBoundingClientRect().left;
    let target: HTMLElement | undefined;
    if (dir === 1) {
      target = slides.find((s) => s.getBoundingClientRect().left - elLeft > 2);
    } else {
      for (let i = slides.length - 1; i >= 0; i--) {
        if (slides[i].getBoundingClientRect().left - elLeft < -2) {
          target = slides[i];
          break;
        }
      }
    }
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        inline: alignment === "end" ? "end" : "start",
        block: "nearest",
      });
    } else {
      el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
    }
  };

  /* ---- slot math ---------------------------------------------------- */
  const slot =
    layout === "multi-browse" ? Math.max(0, (vw - n * GAP - PEEK) / n) : 0;
  // Neighbors give up exactly what the hot item gains: hot + (n-1)·cold = n·slot
  const coldSlot = slot * ((n - GROW) / (n - 1)); // n > 1 guaranteed by `grows`
  const heroInner = Math.max(0, vw - 2 * GAP);
  const heroLarge = heroInner * HERO_LARGE_W;
  const heroSmall = heroInner * HERO_SMALL_W;

  /** Pre-measurement / SSR fallbacks — exact CSS equivalents of the px math. */
  const fallbackWidth = (i: number): string => {
    if (layout === "inline") return "100%";
    if (layout === "hero") {
      return i === 0
        ? `calc((100% - ${2 * GAP}px) * ${HERO_LARGE_W})`
        : `calc((100% - ${2 * GAP}px) * ${HERO_SMALL_W})`;
    }
    return `calc((100% - ${n * GAP + PEEK}px) / ${n})`;
  };

  const widthFor = (i: number): number | string => {
    if (vw <= 0) return fallbackWidth(i);
    if (layout === "inline") return vw;
    if (layout === "hero") return i === 0 ? heroLarge : heroSmall;
    if (!grows) return slot;
    if (hotIndex === i) return slot * GROW;
    return hotIndex === -1 ? slot : coldSlot;
  };

  /* ---- keyboard roving focus ---------------------------------------- */
  const focusSlide = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slides = Array.from(el.querySelectorAll<HTMLElement>("[data-carousel-item]"));
    if (slides.length === 0) return;
    const target = slides[Math.min(slides.length - 1, Math.max(0, idx))];
    const focusable = target.querySelector<HTMLElement>("a[href], button") ?? target;
    focusable.focus({ preventScroll: true });
    target.scrollIntoView({
      behavior: "smooth",
      inline: alignment === "end" ? "end" : "start",
      block: "nearest",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slides = Array.from(el.querySelectorAll<HTMLElement>("[data-carousel-item]"));
    const active = document.activeElement;
    const current = slides.findIndex((node) => node === active || node.contains(active));
    if (current === -1) return; // focus rests on the scroller: native arrow scroll
    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusSlide(current + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusSlide(current - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusSlide(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusSlide(slides.length - 1);
    }
  };

  const arrowsUI = showArrows && (canScrollStart || canScrollEnd) && (
    <>
      {canScrollStart && (
        <motion.button
          type="button"
          tabIndex={arrows === "always" ? 0 : -1}
          aria-label="Previous items"
          aria-controls={scrollerId}
          onClick={() => scrollByItem(-1)}
          initial={false}
          animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0.6 }}
          transition={springs.fastSpatial}
          style={{ pointerEvents: revealed ? "auto" : "none" }}
          className="m3-state m3-focus absolute left-3 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-m3-surface-container-high text-m3-on-surface m3-elevation-1 outline-none"
        >
          <Ripple />
          <MaterialSymbol icon="chevron_left" size={24} />
        </motion.button>
      )}
      {canScrollEnd && (
        <motion.button
          type="button"
          tabIndex={arrows === "always" ? 0 : -1}
          aria-label="Next items"
          aria-controls={scrollerId}
          onClick={() => scrollByItem(1)}
          initial={false}
          animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0.6 }}
          transition={springs.fastSpatial}
          style={{ pointerEvents: revealed ? "auto" : "none" }}
          className="m3-state m3-focus absolute right-3 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-m3-surface-container-high text-m3-on-surface m3-elevation-1 outline-none"
        >
          <Ripple />
          <MaterialSymbol icon="chevron_right" size={24} />
        </motion.button>
      )}
    </>
  );

  return (
    <div
      className="relative w-full"
      onPointerEnter={(e) => {
        if ((e as React.PointerEvent).pointerType !== "touch") setHoverArrows(true);
      }}
      onPointerLeave={() => setHoverArrows(false)}
      onFocus={() => setKbWithin(true)}
      onBlur={() => setKbWithin(false)}
    >
      <div
      ref={setScrollerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel ?? `Carousel, ${items.length} items`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn(
        "m3-focus flex w-full select-none gap-2 outline-none",
        "snap-x snap-mandatory overflow-x-auto",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        layout === "hero" && "items-center",
        className
      )}
      {...props}
    >
      {items.map((item, i) => {
        const actionable = Boolean(item.onClick || item.href);
        const Inner = (item.href ? "a" : actionable ? "button" : "div") as React.ElementType;
        const height = layout === "hero" ? (i === 0 ? HERO_LARGE_H : HERO_SMALL_H) : HEIGHT[layout];
        const width = widthFor(i);
        const hotSlide = grows && hotIndex === i;
        return (
          <motion.div
            key={item.id}
            data-carousel-item
            data-carousel-index={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}${item.label ? `: ${item.label}` : ""}`}
            tabIndex={actionable ? -1 : 0}
            onFocus={() => setFocusId(item.id)}
            onBlur={() => setFocusId((cur) => (cur === item.id ? null : cur))}
            onPointerEnter={(e) => {
              if ((e as React.PointerEvent).pointerType !== "touch") setHoverId(item.id);
            }}
            onPointerLeave={() => setHoverId((cur) => (cur === item.id ? null : cur))}
            animate={vw > 0 ? { width } : undefined}
            transition={springs.defaultSpatial}
            style={{ width, height, flex: "none" }}
            className={cn("snap-start shrink-0", alignment === "end" && "snap-end")}
          >
            <Inner
              href={item.href}
              type={item.href || !actionable ? undefined : "button"}
              onClick={item.onClick ? () => item.onClick!(item) : undefined}
              aria-label={actionable ? (item.label ?? `Slide ${i + 1}`) : undefined}
              data-hot={hotSlide || undefined}
              className={cn(
                "relative flex h-full w-full flex-col overflow-hidden p-5 md-label-large",
                toneStyles[item.tone ?? "secondary"],
                shape === "round" ? "rounded-[28px]" : "rounded-none",
                actionable
                  ? "m3-state m3-focus cursor-pointer outline-none"
                  : "cursor-default outline-none"
              )}
            >
              {actionable && <Ripple />}
              <span className="flex min-h-0 flex-1 items-center justify-center">
                {item.icon && <MaterialSymbol icon={item.icon} size={44} opticalSize={40} />}
              </span>
              {item.label && (
                <span className="truncate text-left md-label-large">{item.label}</span>
              )}
            </Inner>
          </motion.div>
        );
      })}
      </div>
      {arrowsUI}
    </div>
  );
});

export { carouselMeta } from "@/lib/m3/meta";
