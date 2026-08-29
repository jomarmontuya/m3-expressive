'use client';
/* eslint-disable max-lines -- official static, flexible, and opt-in scroll configurations share one app-bar contract */

import * as React from "react";
import { Toolbar } from "@base-ui/react/toolbar";
import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs, durations, easings } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";
import { SearchView, type SearchViewMode } from "./SearchView";

export type TopAppBarVariant =
  | "small"
  | "center"
  | "medium"
  | "large"
  | "medium-flexible"
  | "large-flexible";
export type TopAppBarScrollBehavior = "none" | "pinned" | "enter-always" | "exit-until-collapsed";

export interface TopAppBarAction {
  icon: string;
  label?: string;
  onClick?: () => void;
  /** Filled trailing actions use the secondary-container tonal treatment. */
  variant?: "standard" | "filled";
}

export interface TopAppBarSearch {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  mode?: SearchViewMode;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  ariaLabel?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  recentSearches?: string[];
  onRecentSelect?: (value: string) => void;
  onRecentRemove?: (value: string) => void;
  children?: React.ReactNode;
}

export interface TopAppBarProps {
  title: React.ReactNode;
  /** Flexible app bars can show a subtitle in expanded and collapsed states. */
  subtitle?: string;
  variant?: TopAppBarVariant;
  actions?: TopAppBarAction[];
  /** Search action and its SearchView configuration. */
  search?: TopAppBarSearch;
  /** Optional product image slot before the title. */
  image?: React.ReactNode;
  /** Optional logo slot before the title. Takes precedence over image. */
  logo?: React.ReactNode;
  onBack?: () => void;
  /** Official scroll behavior. The default `none` keeps the app bar static. */
  scrollBehavior?: TopAppBarScrollBehavior;
  /** Scroll container to observe when scrollBehavior is not `none`; defaults to the window. */
  scrollTargetRef?: React.RefObject<HTMLElement | null>;
  /** Override the official expanded height; values below 64 are clamped. */
  expandedHeight?: number;
  /** Flexible title and subtitle alignment. */
  titleAlignment?: "start" | "center";
  fullWidth?: boolean;
  className?: string;
}

/** framer-motion's legacy `Spring` type drops the "spring" literal, so tokens.springs widens to `string`; re-narrow for `Transition`. */
function spring(transition: (typeof springs)[keyof typeof springs]): Transition {
  return { ...transition, type: "spring" };
}

const heights: Record<TopAppBarVariant, number> = {
  small: 64,
  center: 64,
  medium: 112,
  large: 152,
  "medium-flexible": 112,
  "large-flexible": 120,
};

function AppBarIconButton({
  icon,
  label,
  onClick,
  toolbar = false,
  variant = "standard",
}: {
  icon: string;
  label?: string;
  onClick?: () => void;
  /** Render as a Base UI Toolbar.Button so the button joins the actions-row roving-tabindex group. */
  toolbar?: boolean;
  variant?: "standard" | "filled";
}) {
  const classes = cn(
    "m3-state m3-focus relative flex h-12 w-12 items-center justify-center rounded-full",
    variant === "filled"
      ? "bg-m3-secondary-container text-m3-on-secondary-container"
      : "text-m3-on-surface-variant"
  );
  const content = (
    <>
      <Ripple />
      <MaterialSymbol icon={icon} size={24} />
    </>
  );
  if (toolbar) {
    return (
      <Toolbar.Button aria-label={label ?? icon} title={label} onClick={onClick} className={classes}>
        {content}
      </Toolbar.Button>
    );
  }
  return (
    <button type="button" aria-label={label ?? icon} title={label} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

// No Base UI app-bar primitive — layout retained; optional Toolbar semantics on the actions row.
/**
 * M3 Top App Bar. It stays static by default, like an AndroidX app bar with
 * no scroll behavior. `pinned`, `enter-always`, and
 * `exit-until-collapsed` are explicit opt-in behaviors.
 *
 * The scroll/elevation/collapse behavior is app-bar specific and stays custom.
 * The actions row is wrapped in a Base UI Toolbar.Root (its buttons are
 * Toolbar.Buttons) purely for roving-tabindex + arrow-key semantics; the
 * leading back button sits outside that toolbar and stays a plain button.
 */
// Shared stable default — a literal `[]` default is re-created per render.
const EMPTY_ACTIONS: TopAppBarAction[] = [];

/** Material 3 Expressive top app bar for navigation and actions. @see https://m3.material.io/components/app-bars/overview */
export const TopAppBar = React.forwardRef<HTMLElement, TopAppBarProps>(function TopAppBar({
  title,
  subtitle,
  variant = "small",
  actions = EMPTY_ACTIONS,
  search,
  image,
  logo,
  onBack,
  scrollBehavior = "none",
  scrollTargetRef,
  expandedHeight,
  titleAlignment = "start",
  fullWidth = true,
  className,
}: TopAppBarProps, ref) {
  const [scrolled, setScrolled] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [internalSearchOpen, setInternalSearchOpen] = React.useState(search?.defaultOpen ?? false);
  const [internalSearchValue, setInternalSearchValue] = React.useState(search?.defaultValue ?? "");
  const isTwoRow = variant === "medium" || variant === "large" || variant.endsWith("-flexible");
  const isExpressive = variant.endsWith("-flexible");
  const officialHeight = isExpressive && subtitle
    ? variant === "medium-flexible" ? 136 : 152
    : heights[variant];
  const resolvedHeight = Math.max(64, expandedHeight ?? officialHeight);
  const threshold = isTwoRow ? resolvedHeight - 64 : 4;
  const leadingVisual = logo ?? image;
  const searchOpen = search ? (search.open ?? internalSearchOpen) : false;
  const searchValue = search ? (search.value ?? internalSearchValue) : "";
  const setSearchOpen = React.useCallback((nextOpen: boolean) => {
    if (search?.open === undefined) setInternalSearchOpen(nextOpen);
    search?.onOpenChange?.(nextOpen);
  }, [search]);
  const setSearchValue = React.useCallback((nextValue: string) => {
    if (search?.value === undefined) setInternalSearchValue(nextValue);
    search?.onChange?.(nextValue);
  }, [search]);

  React.useEffect(() => {
    if (scrollBehavior === "none") {
      setScrolled(false);
      setCollapsed(false);
      setHidden(false);
      return;
    }

    const el = scrollTargetRef?.current ?? null;
    const readTop = () => (el ? el.scrollTop : window.scrollY);
    let previousTop = readTop();
    const onScroll = () => {
      const top = readTop();
      const delta = top - previousTop;
      previousTop = top;
      setScrolled(top > 0);

      if (scrollBehavior === "pinned") {
        setCollapsed(false);
        setHidden(false);
      } else if (scrollBehavior === "exit-until-collapsed") {
        setCollapsed(isTwoRow && top > threshold);
        setHidden(false);
      } else {
        setCollapsed(false);
        if (top <= 0 || delta < 0) setHidden(false);
        else if (delta > 0) setHidden(true);
      }
    };
    onScroll();
    const target: HTMLElement | Window = el ?? window;
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, [isTwoRow, scrollBehavior, scrollTargetRef, threshold]);

  // M3 on-scroll behavior: a surface-container color fill separates the bar
  // from content. No shadow — the elevation shadow is the old M2 treatment.
  const barState = scrolled ? "bg-m3-surface-container" : "bg-m3-surface";
  const actionsRow =
    actions.length > 0 || search ? (
      // Base UI Toolbar: roving tabindex + arrow keys across the action buttons.
      // Renders the same <div> as before, plus role="toolbar"/aria-orientation.
      // (Empty `actions` keeps the original plain spacer div — no empty toolbar.)
      <Toolbar.Root className="ml-auto flex items-center gap-1">
        {search && (
          <AppBarIconButton
            toolbar
            icon="search"
            label={search.ariaLabel ?? "Search"}
            onClick={() => setSearchOpen(true)}
          />
        )}
        {actions.map((action, i) => (
          <AppBarIconButton key={`${action.icon}-${i}`} toolbar icon={action.icon} label={action.label} onClick={action.onClick} variant={action.variant} />
        ))}
      </Toolbar.Root>
    ) : (
      <div className="ml-auto flex items-center gap-1" />
    );

  const titleContent = (
    <span className={cn("min-w-0 px-2", subtitle ? "flex flex-col" : "md-title-large")}>
      <span className="md-title-large truncate">{title}</span>
      {subtitle && <span className="md-label-medium truncate text-m3-on-surface-variant">{subtitle}</span>}
    </span>
  );

  const searchView = search ? (
    <SearchView
      open={searchOpen}
      onOpenChange={setSearchOpen}
      mode={search.mode}
      placeholder={search.placeholder ?? search.ariaLabel ?? "Search"}
      value={searchValue}
      onValueChange={setSearchValue}
      recentSearches={search.recentSearches}
      onRecentSelect={(value) => {
        setSearchValue(value);
        search.onRecentSelect?.(value);
        search.onSubmit?.(value);
      }}
      onRecentRemove={search.onRecentRemove}
      trailingActions={search.onSubmit ? (
        <button
          type="button"
          aria-label="Submit search"
          onClick={() => search.onSubmit?.(searchValue)}
          className="m3-state m3-focus relative grid h-12 w-12 place-items-center rounded-full"
        >
          <Ripple />
          <MaterialSymbol icon="search" size={24} />
        </button>
      ) : undefined}
    >
      {search.children}
    </SearchView>
  ) : null;

  if (!isTwoRow) {
    return (
      <>
      <header
        ref={ref}
        style={{ transitionDuration: `${durations.medium2}ms`, transitionTimingFunction: easings.standard }}
        className={cn(
          "sticky top-0 z-40 transition-[background-color,transform]",
          hidden && "-translate-y-full",
          barState,
          fullWidth && "w-full",
          className
        )}
      >
        <div className="relative flex h-16 items-center px-1">
          {onBack && <AppBarIconButton icon="arrow_back" label="Back" onClick={onBack} />}
          {leadingVisual && <span className="ml-1 flex h-10 shrink-0 items-center">{leadingVisual}</span>}
          <div className={cn("min-w-0", variant === "center" && "absolute left-1/2 max-w-[60%] -translate-x-1/2 text-center")}>{titleContent}</div>
          {actionsRow}
        </div>
      </header>
      {searchView}
      </>
    );
  }

  return (
    <>
    <motion.header
      ref={ref}
      animate={{
        height: collapsed ? 64 : resolvedHeight,
        backgroundColor: scrolled ? "var(--md-surface-container)" : "var(--md-surface)",
        y: hidden ? "-100%" : 0,
      }}
      transition={{
        height: spring(springs.defaultSpatial),
        backgroundColor: { duration: durations.medium2 / 1000, ease: [0.2, 0, 0, 1] },
        y: spring(springs.fastSpatial),
      }}
      className={cn(
        "sticky top-0 z-40 overflow-hidden",
        fullWidth && "w-full",
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 flex h-16 items-center px-1">
        {onBack && <AppBarIconButton icon="arrow_back" label="Back" onClick={onBack} />}
        {leadingVisual && <span className="ml-1 flex h-10 shrink-0 items-center">{leadingVisual}</span>}
        <AnimatePresence>
          {collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={spring(springs.fastVisual)}
              className={cn(
                "max-w-[60%] px-2",
                subtitle ? "flex flex-col" : "md-title-large"
              )}
            >
              <span className="md-title-large truncate">{title}</span>
              {subtitle && <span className="md-label-medium truncate text-m3-on-surface-variant">{subtitle}</span>}
            </motion.span>
          )}
        </AnimatePresence>
        {actionsRow}
      </div>
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            key="hero-title"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={spring(springs.defaultSpatial)}
            className={cn(
              "absolute inset-x-4 bottom-1",
              titleAlignment === "center" && "text-center"
            )}
          >
            <span
              className={cn(
                "block whitespace-normal break-words",
                variant === "medium" && "md-headline-small",
                variant === "large" && "md-headline-medium",
                variant === "medium-flexible" && "md-headline-medium",
                variant === "large-flexible" && "md-display-small"
              )}
            >
              {title}
            </span>
            {subtitle && isExpressive && (
              <span className={cn(
                "block whitespace-normal break-words text-m3-on-surface-variant",
                variant === "large-flexible" ? "md-title-medium" : "md-label-large"
              )}>
                {subtitle}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    {searchView}
    </>
  );
});

TopAppBar.displayName = "TopAppBar";

export { topAppBarMeta } from "@/lib/m3/meta";
