"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import { useTextDirection } from "@/lib/m3/use-text-direction";
import { MaterialSymbol } from "./MaterialSymbol";
import { Ripple } from "./Ripple";

export type CarouselLayout =
  "multi-browse" | "uncontained" | "hero" | "full-screen" | "inline";
export type CarouselAlignment = "start" | "center" | "end";
export type CarouselTone = "primary" | "secondary" | "tertiary" | "surface";
export type CarouselShape = "round" | "square";
/** Optional compatibility affordance. Current Material carousels default to no arrows. */
export type CarouselArrows = "auto" | "always" | "never";
export type CarouselUncontainedMode = "standard" | "multi-aspect";

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
  /** Item width ratio used by the uncontained multi-aspect configuration. */
  aspectRatio?: number;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CarouselItem[];
  /**
   * Official layout strategies (m3.material.io/components/carousel):
   * multi-browse — flexible items that resize at the viewport edges;
   * uncontained — fixed-size items that scroll without changing aspect ratio;
   * hero — one focal item with one or two smaller items;
   * full-screen — one edge-to-edge item per view.
   * `inline` remains as a deprecated alias for `full-screen`.
   */
  layout?: CarouselLayout;
  /** Scroll-snap alignment of items. */
  alignment?: CarouselAlignment;
  /** multi-browse visible-item hint, clamped to 1–5. */
  itemCount?: number;
  /** Item corners: 28dp (extraLarge, M3E) or square. */
  shape?: CarouselShape;
  /** Optional compatibility arrows: "auto" reveals
   * circular 48dp buttons on hover/focus while content overflows in that
   * direction; "always" keeps them visible and keyboard-reachable. Current
   * Material guidance discourages arrows, so the default is "never". */
  arrows?: CarouselArrows;
  /** Equal-size or mixed-ratio uncontained configuration. */
  uncontainedMode?: CarouselUncontainedMode;
  /** Shared ratio for standard uncontained items. Default 16:9. */
  itemAspectRatio?: number;
  /** Required accessibility path on scrolling pages, except full-screen. */
  showAllHref?: string;
  /** Button alternative to showAllHref for opening the complete vertical list. */
  onShowAll?: () => void;
  showAllLabel?: string;
  /** Accessible name of the carousel region. */
  ariaLabel?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Official metrics                                                    */
/* ------------------------------------------------------------------ */
/** Official 8dp item spacing. */
const GAP = 8;
const FULL_SCREEN_GAP = 16;
const CONTENT_PADDING = 16;
const SMALL_MIN = 40;
const SMALL_MAX = 56;
const UNCONTAINED_RATIOS = [16 / 9, 9 / 16, 1, 3 / 4] as const;
/** Item heights per layout (px) — consumers can still override via className. */
const HEIGHT: Record<CarouselLayout, number> = {
  "multi-browse": 280,
  uncontained: 280,
  hero: 360,
  "full-screen": 320,
  inline: 320,
};
const toneStyles: Record<CarouselTone, string> = {
  primary: "bg-m3-primary-container text-m3-on-primary-container",
  secondary: "bg-m3-secondary-container text-m3-on-secondary-container",
  tertiary: "bg-m3-tertiary-container text-m3-on-tertiary-container",
  surface: "bg-m3-surface-container-high text-m3-on-surface",
};

const clampCount = (n: number) => Math.min(5, Math.max(1, Math.round(n)));

// No Base UI primitive for carousel in v1.0.0-rc.0 — custom implementation retained
// (scroll-snap scroller + peek layouts + overflow-aware arrows; do not restructure).

/**
 * M3 Expressive Carousel — a horizontally scrollable, scroll-snapped
 * collection of items with the four current layout strategies
 * (multi-browse / uncontained / hero / full-screen), 8dp gaps and shaped items.
 *
 * Provenance: https://m3.material.io/components/carousel/overview
 *
 * Dynamic widths follow scroll position: multi-browse items move through
 * large, medium and small keyline sizes; hero keeps one large item with one
 * or two 40–56dp small items. Reduced-motion users get stable equal widths.
 * Full-screen is a vertical portrait feed with edge snap. Every layout adds
 * a scroll parallax effect, removed under reduced motion. Items use CSS
 * scroll-snap, the native scrollbar is hidden, and Arrow keys rove focus
 * between slides. ArrowUp/ArrowDown leave the carousel. Optional circular
 * compatibility arrows can be opted in, but are absent by default.
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
/** Material 3 Expressive carousel for browsing items. @see https://m3.material.io/components/carousel/overview */
export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  function Carousel(
    {
      items,
      layout = "multi-browse",
      alignment = "start",
      itemCount = 4,
      shape = "round",
      arrows = "never",
      uncontainedMode = "standard",
      itemAspectRatio = 16 / 9,
      showAllHref,
      onShowAll,
      showAllLabel = "Show all",
      ariaLabel,
      className,
      ...props
    },
    ref,
  ) {
    const reduceMotion = useReducedMotion() ?? false;
    const scrollerRef = React.useRef<HTMLDivElement>(null);
    const direction = useTextDirection(scrollerRef);
    /** Measured content width of the scroller (0 until first layout pass). */
    const [vw, setVw] = React.useState(0);
    const [viewportHeight, setViewportHeight] = React.useState(0);
    const resolvedLayout = layout === "inline" ? "full-screen" : layout;
    // Multi-browse needs room for its large, medium and small keyline groups.
    // Existing item arrays remain valid; short arrays render the categories
    // they have without adding, cloning or rejecting items.
    const requestedCount =
      resolvedLayout === "multi-browse"
        ? clampCount(Math.max(3, itemCount))
        : clampCount(itemCount);
    const initialFocalIndex =
      alignment === "end"
        ? Math.max(0, items.length - 1)
        : alignment === "center"
          ? Math.min(1, Math.max(0, items.length - 1))
          : 0;
    const [focalIndex, setFocalIndex] = React.useState(initialFocalIndex);
    const programmaticFocalRef = React.useRef<number | null>(null);

    React.useEffect(() => {
      programmaticFocalRef.current = null;
      setFocalIndex(initialFocalIndex);
    }, [initialFocalIndex, resolvedLayout]);

    const updateFocalIndex = React.useCallback(() => {
      if (
        reduceMotion ||
        (resolvedLayout !== "multi-browse" && resolvedLayout !== "hero")
      ) {
        return;
      }
      const el = scrollerRef.current;
      if (!el) return;
      if (programmaticFocalRef.current !== null) return;
      const slides = Array.from(
        el.querySelectorAll<HTMLElement>("[data-carousel-item]"),
      );
      if (slides.length === 0) return;
      const viewport = el.getBoundingClientRect();
      const viewportCenter = viewport.left + el.clientWidth / 2;
      const edgeKeyline =
        alignment === "end"
          ? direction === "rtl"
            ? viewport.left
            : viewport.right
          : direction === "rtl"
            ? viewport.right
            : viewport.left;
      let centerIndex = 0;
      let edgeIndex = 0;
      let nearestCenter = Number.POSITIVE_INFINITY;
      let nearestEdge = Number.POSITIVE_INFINITY;
      slides.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect();
        const centerDistance = Math.abs(
          rect.left + rect.width / 2 - viewportCenter,
        );
        const itemEdge =
          alignment === "end"
            ? direction === "rtl"
              ? rect.left
              : rect.right
            : direction === "rtl"
              ? rect.right
              : rect.left;
        const edgeDistance = Math.abs(itemEdge - edgeKeyline);
        if (centerDistance < nearestCenter) {
          nearestCenter = centerDistance;
          centerIndex = index;
        }
        if (edgeDistance < nearestEdge) {
          nearestEdge = edgeDistance;
          edgeIndex = index;
        }
      });
      const nextIndex =
        alignment !== "center" && nearestEdge <= CONTENT_PADDING + GAP
          ? edgeIndex
          : centerIndex;
      setFocalIndex((current) => (current === nextIndex ? current : nextIndex));
    }, [alignment, direction, reduceMotion, resolvedLayout]);

    /* Track viewport width for the official keyline-size calculations. */
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

    React.useEffect(() => {
      const updateViewportHeight = () => setViewportHeight(window.innerHeight);
      updateViewportHeight();
      window.addEventListener("resize", updateViewportHeight);
      return () => window.removeEventListener("resize", updateViewportHeight);
    }, []);

    const updateParallax = React.useCallback(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const vertical = resolvedLayout === "full-screen";
      const viewportRect = el.getBoundingClientRect();
      const viewportCenter = vertical
        ? viewportRect.top + el.clientHeight / 2
        : viewportRect.left + el.clientWidth / 2;
      el.querySelectorAll<HTMLElement>("[data-carousel-item]").forEach((slide) => {
        const target = slide.querySelector<HTMLElement>(
          "[data-carousel-parallax]",
        );
        if (!target) return;
        if (reduceMotion) {
          target.style.transform = "none";
          return;
        }
        const rect = slide.getBoundingClientRect();
        const itemCenter = vertical
          ? rect.top + rect.height / 2
          : rect.left + rect.width / 2;
        const offset = Math.max(-24, Math.min(24, (viewportCenter - itemCenter) * 0.08));
        target.style.transform = vertical
          ? `translateY(${offset}px)`
          : `translateX(${offset}px)`;
      });
    }, [reduceMotion, resolvedLayout]);

    React.useEffect(() => {
      const el = scrollerRef.current;
      if (!el) return;
      updateFocalIndex();
      updateParallax();
      el.addEventListener("scroll", updateFocalIndex, { passive: true });
      el.addEventListener("scroll", updateParallax, { passive: true });
      return () => {
        el.removeEventListener("scroll", updateFocalIndex);
        el.removeEventListener("scroll", updateParallax);
      };
    }, [updateFocalIndex, updateParallax, items.length, viewportHeight, vw]);

    /** Merge the forwarded ref with the internal scroller ref. */
    const setScrollerRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        scrollerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
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
      if (resolvedLayout === "full-screen") {
        setCanScrollStart(el.scrollTop > 4);
        setCanScrollEnd(el.scrollTop + el.clientHeight < el.scrollHeight - 4);
        return;
      }
      if (resolvedLayout === "multi-browse" || resolvedLayout === "hero") {
        setCanScrollStart(focalIndex > 0);
        setCanScrollEnd(focalIndex < items.length - 1);
        return;
      }
      const slides = Array.from(
        el.querySelectorAll<HTMLElement>("[data-carousel-item]"),
      );
      const first = slides[0]?.getBoundingClientRect();
      const last = slides.at(-1)?.getBoundingClientRect();
      const viewport = el.getBoundingClientRect();
      setCanScrollStart(
        first
          ? direction === "rtl"
            ? first.right > viewport.right + 4
            : first.left < viewport.left - 4
          : false,
      );
      setCanScrollEnd(
        last
          ? direction === "rtl"
            ? last.left < viewport.left - 4
            : last.right > viewport.right + 4
          : false,
      );
    }, [direction, focalIndex, items.length, resolvedLayout]);

    React.useEffect(() => {
      if (!showArrows) return;
      const el = scrollerRef.current;
      if (!el) return;
      updateOverflow();
      el.addEventListener("scroll", updateOverflow, { passive: true });
      /* Width changes can alter overflow without producing a scroll event. */
      const ro = new ResizeObserver(updateOverflow);
      ro.observe(el);
      el.querySelectorAll("[data-carousel-item]").forEach((node) => {
        ro.observe(node);
      });
      return () => {
        el.removeEventListener("scroll", updateOverflow);
        ro.disconnect();
      };
    }, [updateOverflow, showArrows, items.length]);

    const scrollSlideIntoView = (target: HTMLElement) => {
      const el = scrollerRef.current;
      if (!el) return;
      const viewport = el.getBoundingClientRect();
      const rect = target.getBoundingClientRect();

      if (resolvedLayout === "full-screen") {
        const top =
          alignment === "center"
            ? rect.top + rect.height / 2 - (viewport.top + viewport.height / 2)
            : alignment === "end"
              ? rect.bottom - viewport.bottom
              : rect.top - viewport.top;
        el.scrollBy({ top, behavior: reduceMotion ? "auto" : "smooth" });
        return;
      }

      const left =
        alignment === "center"
          ? rect.left + rect.width / 2 - (viewport.left + viewport.width / 2)
          : alignment === "end"
            ? direction === "rtl"
              ? rect.left - viewport.left
              : rect.right - viewport.right
            : direction === "rtl"
              ? rect.right - viewport.right
              : rect.left - viewport.left;
      el.scrollBy({ left, behavior: reduceMotion ? "auto" : "smooth" });
    };

    const moveDynamicFocal = (targetIndex: number, slideCount: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      const visibleCount =
        resolvedLayout === "multi-browse"
          ? n
          : 1 + (alignment === "center" ? 2 : 1);
      const maxStartIndex = Math.max(0, slideCount - visibleCount);
      const currentStep = Math.min(focalIndex, maxStartIndex);
      const targetStep = Math.min(targetIndex, maxStartIndex);
      programmaticFocalRef.current = reduceMotion ? null : targetIndex;
      setFocalIndex(targetIndex);
      el.scrollBy({
        left:
          (direction === "rtl" ? -1 : 1) *
          (targetStep - currentStep) *
          (smallWidth + GAP),
        behavior: reduceMotion ? "auto" : "smooth",
      });
    };

    /** Advance exactly one slide in `dir`. */
    const scrollByItem = (dir: 1 | -1) => {
      const el = scrollerRef.current;
      if (!el) return;
      const slides = Array.from(
        el.querySelectorAll<HTMLElement>("[data-carousel-item]"),
      );
      if (slides.length === 0) return;
      if (resolvedLayout === "multi-browse" || resolvedLayout === "hero") {
        const targetIndex = Math.min(
          slides.length - 1,
          Math.max(0, focalIndex + dir),
        );
        if (targetIndex === focalIndex) return;
        moveDynamicFocal(targetIndex, slides.length);
        return;
      }
      const viewport = el.getBoundingClientRect();
      const startOffset = (slide: HTMLElement) => {
        const rect = slide.getBoundingClientRect();
        if (resolvedLayout === "full-screen") return rect.top - viewport.top;
        return direction === "rtl"
          ? viewport.right - rect.right
          : rect.left - viewport.left;
      };
      const currentIndex = slides.reduce((nearestIndex, slide, index) =>
        Math.abs(startOffset(slide)) < Math.abs(startOffset(slides[nearestIndex]))
          ? index
          : nearestIndex,
      0);
      const target = slides[currentIndex + dir];
      if (target) {
        scrollSlideIntoView(target);
      } else {
        el.scrollBy(
          resolvedLayout === "full-screen"
            ? {
                top: dir * el.clientHeight,
                behavior: reduceMotion ? "auto" : "smooth",
              }
            : {
                left: (direction === "rtl" ? -dir : dir) * el.clientWidth,
                behavior: reduceMotion ? "auto" : "smooth",
              },
        );
      }
    };

    /* ---- official keyline sizing ------------------------------------- */
    const dynamicPadding =
      resolvedLayout === "full-screen" ? 0 : CONTENT_PADDING;
    const dynamicEndPadding =
      resolvedLayout === "uncontained" ? 0 : dynamicPadding;
    const layoutGap =
      resolvedLayout === "full-screen" ? FULL_SCREEN_GAP : GAP;
    const innerWidth = Math.max(
      0,
      vw - dynamicPadding - dynamicEndPadding,
    );
    const smallWidth = Math.min(
      SMALL_MAX,
      Math.max(SMALL_MIN, innerWidth * 0.14),
    );
    const mediumWidth = Math.min(
      Math.max(72, innerWidth * 0.24),
      Math.max(72, innerWidth / 3),
    );
    const availableMultiBrowseCount = Math.floor(
      (innerWidth - 2 * mediumWidth + 2 * smallWidth + GAP) /
        (smallWidth + GAP),
    );
    const n =
      resolvedLayout === "multi-browse" && vw > 0
        ? Math.min(requestedCount, Math.max(3, availableMultiBrowseCount))
        : requestedCount;
    const multiSmallCount = Math.max(0, n - 2);
    const largeWidth = Math.max(
      smallWidth,
      innerWidth -
        (n > 1 ? mediumWidth : 0) -
        multiSmallCount * smallWidth -
        Math.max(0, n - 1) * GAP,
    );
    const heroSmallCount = Math.min(
      Math.max(0, items.length - 1),
      alignment === "center" ? 2 : 1,
    );
    const heroLargeWidth = Math.max(
      smallWidth,
      innerWidth - heroSmallCount * smallWidth - heroSmallCount * GAP,
    );
    const equalWidth = Math.max(
      0,
      (innerWidth - Math.max(0, n - 1) * layoutGap) / n,
    );

    const itemRatio = (item: CarouselItem, index: number) => {
      const ratio =
        uncontainedMode === "multi-aspect"
          ? item.aspectRatio ??
            UNCONTAINED_RATIOS[index % UNCONTAINED_RATIOS.length]
          : itemAspectRatio;
      return Number.isFinite(ratio) && ratio > 0
        ? Math.min(16 / 9, Math.max(9 / 16, ratio))
        : 1;
    };

    const fullScreenHeight =
      vw > 0 && viewportHeight > 0
        ? Math.min(viewportHeight, (vw * 16) / 9)
        : "100dvh";

    const multiBrowseCategory = (index: number) => {
      if (index === focalIndex) return "large" as const;
      const mediumIndex =
        focalIndex < items.length - 1 ? focalIndex + 1 : focalIndex - 1;
      return index === mediumIndex ? ("medium" as const) : ("small" as const);
    };

    /** Pre-measurement / SSR fallbacks for the first paint. */
    const fallbackWidth = (i: number, item: CarouselItem): string => {
      if (resolvedLayout === "full-screen") return "100%";
      if (resolvedLayout === "uncontained") {
        return `${HEIGHT.uncontained * itemRatio(item, i)}px`;
      }
      if (reduceMotion) {
        return `calc((100% - ${dynamicPadding + dynamicEndPadding + Math.max(0, n - 1) * layoutGap}px) / ${n})`;
      }
      if (resolvedLayout === "hero") {
        return i === focalIndex
          ? `calc(100% - ${dynamicPadding + dynamicEndPadding + heroSmallCount * (SMALL_MAX + GAP)}px)`
          : `${SMALL_MAX}px`;
      }
      const category = multiBrowseCategory(i);
      if (category === "large") return "55%";
      if (category === "medium") return "24%";
      return `${SMALL_MAX}px`;
    };

    const widthFor = (i: number, item: CarouselItem): number | string => {
      if (vw <= 0) return fallbackWidth(i, item);
      if (resolvedLayout === "full-screen") return vw || "100%";
      if (resolvedLayout === "uncontained") {
        return HEIGHT.uncontained * itemRatio(item, i);
      }
      if (reduceMotion) return equalWidth;
      if (resolvedLayout === "hero") {
        return i === focalIndex ? heroLargeWidth : smallWidth;
      }
      const category = multiBrowseCategory(i);
      if (category === "large") return largeWidth;
      if (category === "medium") return mediumWidth;
      return smallWidth;
    };

    /* ---- keyboard roving focus ---------------------------------------- */
    const focusSlide = (idx: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      const slides = Array.from(
        el.querySelectorAll<HTMLElement>("[data-carousel-item]"),
      );
      if (slides.length === 0) return;
      const target = slides[Math.min(slides.length - 1, Math.max(0, idx))];
      const focusable =
        target.querySelector<HTMLElement>("a[href], button") ?? target;
      focusable.focus({ preventScroll: true });
      if (resolvedLayout === "multi-browse" || resolvedLayout === "hero") {
        const targetIndex = Number(target.dataset.carouselIndex);
        moveDynamicFocal(targetIndex, slides.length);
      } else {
        scrollSlideIntoView(target);
      }
    };

    const focusOutsideCarousel = (direction: -1 | 1) => {
      const el = scrollerRef.current;
      if (!el || !(document.activeElement instanceof HTMLElement)) return false;
      const focusable = Array.from(
        document.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
        ),
      ).filter((node) => node.getClientRects().length > 0);
      const activeIndex = focusable.indexOf(document.activeElement);
      if (activeIndex < 0) return false;
      for (
        let index = activeIndex + direction;
        index >= 0 && index < focusable.length;
        index += direction
      ) {
        if (!el.contains(focusable[index])) {
          focusable[index].focus();
          return true;
        }
      }
      return false;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const el = scrollerRef.current;
      if (!el) return;
      const slides = Array.from(
        el.querySelectorAll<HTMLElement>("[data-carousel-item]"),
      );
      const active = document.activeElement;
      const current = slides.findIndex(
        (node) => node === active || node.contains(active),
      );
      if (current === -1) return; // focus rests on the scroller: native arrow scroll
      if (e.key === "ArrowRight") {
        e.preventDefault();
        focusSlide(current + (direction === "rtl" ? -1 : 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        focusSlide(current + (direction === "rtl" ? 1 : -1));
      } else if (e.key === "Home") {
        e.preventDefault();
        focusSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        focusSlide(slides.length - 1);
      } else if (e.key === "ArrowDown") {
        if (focusOutsideCarousel(1)) e.preventDefault();
      } else if (e.key === "ArrowUp") {
        if (focusOutsideCarousel(-1)) e.preventDefault();
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
            animate={{
              opacity: revealed ? 1 : 0,
              scale: reduceMotion ? 1 : revealed ? 1 : 0.6,
            }}
            transition={reduceMotion ? { duration: 0 } : springs.fastSpatial}
            style={{ pointerEvents: revealed ? "auto" : "none" }}
            className="m3-state m3-focus absolute start-3 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-m3-surface-container-high text-m3-on-surface m3-elevation-1 outline-none"
          >
            <Ripple />
            <MaterialSymbol icon={direction === "rtl" ? "chevron_right" : "chevron_left"} size={24} />
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
            animate={{
              opacity: revealed ? 1 : 0,
              scale: reduceMotion ? 1 : revealed ? 1 : 0.6,
            }}
            transition={reduceMotion ? { duration: 0 } : springs.fastSpatial}
            style={{ pointerEvents: revealed ? "auto" : "none" }}
            className="m3-state m3-focus absolute end-3 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-m3-surface-container-high text-m3-on-surface m3-elevation-1 outline-none"
          >
            <Ripple />
            <MaterialSymbol icon={direction === "rtl" ? "chevron_left" : "chevron_right"} size={24} />
          </motion.button>
        )}
      </>
    );

    return (
      <div
        className="relative w-full"
        onPointerEnter={(e) => {
          if ((e as React.PointerEvent).pointerType !== "touch")
            setHoverArrows(true);
        }}
        onPointerLeave={() => setHoverArrows(false)}
        onFocus={() => setKbWithin(true)}
        onBlur={() => setKbWithin(false)}
      >
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- the labeled carousel region owns roving slide navigation */}
        <div
          id={scrollerId}
          ref={setScrollerRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={ariaLabel ?? `Carousel, ${items.length} items`}
          data-layout={resolvedLayout}
          data-uncontained-mode={
            resolvedLayout === "uncontained" ? uncontainedMode : undefined
          }
          className={cn(
            "m3-focus flex w-full select-none outline-none",
            resolvedLayout === "full-screen"
              ? "flex-col snap-y snap-mandatory overflow-y-auto overflow-x-hidden"
              : "snap-x snap-mandatory overflow-x-auto",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            resolvedLayout === "full-screen" ? "gap-4 p-0" : "gap-2",
            resolvedLayout === "multi-browse" && "px-4 py-2",
            resolvedLayout === "uncontained" && "py-2 ps-4 pe-0",
            resolvedLayout === "hero" && "items-center px-4 py-2",
            className,
          )}
          {...props}
          style={{
            ...props.style,
            height:
              resolvedLayout === "full-screen" ? fullScreenHeight : undefined,
          }}
          onKeyDown={(event) => {
            props.onKeyDown?.(event);
            if (!event.defaultPrevented) handleKeyDown(event);
          }}
        >
          {items.map((item, i) => {
            const actionable = Boolean(item.onClick || item.href);
            const Inner = (
              item.href ? "a" : actionable ? "button" : "div"
            ) as React.ElementType;
            const height =
              resolvedLayout === "full-screen"
                ? fullScreenHeight
                : HEIGHT[resolvedLayout];
            const width = widthFor(i, item);
            const distance = Math.abs(i - focalIndex);
            const keylineSize =
              resolvedLayout === "multi-browse"
                ? multiBrowseCategory(i)
                : resolvedLayout === "hero"
                  ? distance === 0
                    ? "large"
                    : "small"
                  : "fixed";
            const compactKeyline = !reduceMotion && keylineSize === "small";
            const narrowMediumKeyline =
              !reduceMotion &&
              keylineSize === "medium" &&
              typeof width === "number" &&
              width < 120;
            return (
              <motion.div
                key={item.id}
                data-carousel-item
                data-carousel-index={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${items.length}${item.label ? `: ${item.label}` : ""}`}
                tabIndex={actionable ? -1 : 0}
                data-keyline-size={reduceMotion ? "equal" : keylineSize}
                data-aspect-ratio={
                  resolvedLayout === "uncontained" ? itemRatio(item, i) : undefined
                }
                animate={vw > 0 && !reduceMotion ? { width } : undefined}
                transition={
                  reduceMotion ? { duration: 0 } : springs.defaultSpatial
                }
                onAnimationComplete={() => {
                  if (programmaticFocalRef.current === i) {
                    programmaticFocalRef.current = null;
                  }
                }}
                style={{
                  width: resolvedLayout === "full-screen" ? "100%" : width,
                  height,
                  flex: "none",
                }}
                className={cn(
                  "shrink-0",
                  alignment === "start" && "snap-start",
                  alignment === "center" && "snap-center",
                  alignment === "end" && "snap-end",
                )}
              >
                <Inner
                  href={item.href}
                  type={item.href || !actionable ? undefined : "button"}
                  onClick={item.onClick ? () => item.onClick!(item) : undefined}
                  aria-label={
                    actionable ? (item.label ?? `Slide ${i + 1}`) : undefined
                  }
                  className={cn(
                    "relative flex h-full w-full flex-col overflow-hidden md-label-large",
                    compactKeyline
                      ? "p-1"
                      : narrowMediumKeyline
                        ? "p-2"
                        : "p-5",
                    toneStyles[item.tone ?? "secondary"],
                    shape === "round" ? "rounded-[28px]" : "rounded-none",
                    actionable
                      ? "m3-state m3-focus cursor-pointer outline-none"
                      : "cursor-default outline-none",
                  )}
                >
                  {actionable && <Ripple />}
                  <span
                    data-carousel-parallax
                    className="flex min-h-0 flex-1 flex-col will-change-transform"
                  >
                    <span className="flex min-h-0 flex-1 items-center justify-center">
                      {item.icon && (
                        <MaterialSymbol
                          icon={item.icon}
                          size={
                            compactKeyline ? 24 : narrowMediumKeyline ? 32 : 44
                          }
                          opticalSize={
                            compactKeyline || narrowMediumKeyline ? 24 : 40
                          }
                        />
                      )}
                    </span>
                    {item.label && !compactKeyline && (
                      <span className="truncate text-start md-label-large">
                        {item.label}
                      </span>
                    )}
                  </span>
                </Inner>
              </motion.div>
            );
          })}
        </div>
        {arrowsUI}
        {resolvedLayout !== "full-screen" && (showAllHref || onShowAll) && (
          <div className="flex justify-end p-1">
            {showAllHref ? (
              <a
                href={showAllHref}
                className="m3-state m3-focus inline-flex min-h-10 items-center rounded-full px-3 md-label-large text-m3-primary outline-none"
              >
                {showAllLabel}
              </a>
            ) : (
              <button
                type="button"
                onClick={onShowAll}
                className="m3-state m3-focus inline-flex min-h-10 items-center rounded-full px-3 md-label-large text-m3-primary outline-none"
              >
                {showAllLabel}
              </button>
            )}
          </div>
        )}
      </div>
    );
  },
);

export { carouselMeta } from "@/lib/m3/meta";
