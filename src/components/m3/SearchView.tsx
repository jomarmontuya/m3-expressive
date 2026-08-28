'use client';

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs as springsTokens, durations } from "@/lib/m3/tokens";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

/** Token springs retyped as framer-motion Transitions (`type` widens to string). */
const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };

export type SearchViewMode = "full-screen" | "docked";

export interface SearchViewProps {
  /** Whether the search view is shown. */
  open: boolean;
  /** Called when the view requests to open or close (Escape, leading icon). */
  onOpenChange: (open: boolean) => void;
  /** `full-screen` covers the viewport as a modal dialog; `docked` renders inline above its results. */
  mode?: SearchViewMode;
  /** Hint text, also used as the accessible dialog label. Default "Search". */
  placeholder?: string;
  /** Controlled query text. */
  value?: string;
  /** Initial query for uncontrolled usage. */
  defaultValue?: string;
  /** Called on every query edit, clear, or recent-search selection. */
  onValueChange?: (v: string) => void;
  /** Recent-search suggestion rows, shown while the query is empty. */
  recentSearches?: string[];
  /** Invoked when a recent search is chosen (click or Enter). */
  onRecentSelect?: (q: string) => void;
  /** Trailing close icon per row; omit to hide the removal affordance. */
  onRecentRemove?: (q: string) => void;
  /** Leading navigation icon node; clicking it closes the view. Defaults to an arrow_back icon. */
  leadingIcon?: React.ReactNode;
  /** Extra trailing controls rendered after the clear button. */
  trailingActions?: React.ReactNode;
  /**
   * Results content below the divider. Rendered whenever recent-search
   * suggestions are not shown (i.e. the query is non-empty, or no
   * `recentSearches` were provided).
   */
  children?: React.ReactNode;
  /** Focus the query input when the full-screen view opens. Default true (full-screen only). */
  autoFocus?: boolean;
  className?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, details, [tabindex]:not([tabindex="-1"])';

/**
 * M3 Search view — the expanded companion of the search bar: a persistent,
 * full-width search surface for larger, richer search that expands over the
 * UI (m3.material.io/components/search-view).
 *
 * The 56dp input row sits on surface-container-high with a 1dp
 * outline-variant divider below it (the official full-bleed treatment;
 * elevation stays 0 because the view replaces the surface). While the query
 * is empty, recent-search suggestion rows are shown — leading history icon,
 * label-large text, optional per-row close — and are keyboard navigable
 * (ArrowUp/ArrowDown walk an active index, Enter selects, via
 * aria-activedescendant). In "full-screen" mode the view covers the viewport
 * as a modal dialog (role="dialog" aria-modal, focus trapped inside and
 * restored to the trigger on close, Escape closes, body scroll locks); in
 * "docked" mode it renders inline above its results. The query input is the
 * forwarded ref target.
 *
 * @example
 * const [open, setOpen] = React.useState(false);
 * <SearchBar value={q} onChange={(e) => setQ(e.target.value)} onFocus={() => setOpen(true)} />
 * <SearchView
 *   open={open}
 *   onOpenChange={setOpen}
 *   recentSearches={recents}
 *   onRecentSelect={(q) => setQ(q)}
 *   onRecentRemove={(q) => setRecents(recents.filter((r) => r !== q))}
 * >
 *   <ProductResults query={q} />
 * </SearchView>
 */
export const SearchView = React.forwardRef<HTMLInputElement, SearchViewProps>(function SearchView(
  {
    open,
    onOpenChange,
    mode = "full-screen",
    placeholder = "Search",
    value,
    defaultValue,
    onValueChange,
    recentSearches = [],
    onRecentSelect,
    onRecentRemove,
    leadingIcon,
    trailingActions,
    children,
    autoFocus = true,
    className,
  },
  ref
) {
  const fullScreen = mode === "full-screen";
  const panelRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const restoreFocusRef = React.useRef<HTMLElement | null>(null);
  const [active, setActive] = React.useState(-1);
  const reactId = React.useId();
  const listId = `m3-sv-${reactId.replace(/:/g, "")}`;

  React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);

  // Controlled / uncontrolled query text.
  const isControlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue ?? "");
  const query = isControlled ? value : inner;
  const setQuery = React.useCallback(
    (v: string) => {
      if (!isControlled) setInner(v);
      onValueChange?.(v);
    },
    [isControlled, onValueChange]
  );

  /** Recent searches replace the results content while the query is empty. */
  const showRecents = query.trim() === "" && recentSearches.length > 0;

  const handleRecentSelect = (q: string) => {
    setQuery(q);
    setActive(-1);
    onRecentSelect?.(q);
  };

  const handleRecentRemove = (q: string) => {
    onRecentRemove?.(q);
    setActive(-1);
  };

  // Full-screen only: Escape anywhere closes; body scroll locks while open.
  React.useEffect(() => {
    if (!open || !fullScreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, fullScreen, onOpenChange]);

  // Full-screen only: focus the input on open; return focus to the trigger on close.
  React.useEffect(() => {
    if (!open || !fullScreen) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    let timer = 0;
    if (autoFocus) timer = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(timer);
      restoreFocusRef.current?.focus?.();
    };
  }, [open, fullScreen, autoFocus]);

  // Full-screen only: trap Tab focus inside the search view (Dialog pattern).
  const handleTab = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
    ).filter((el) => !el.hasAttribute("disabled"));
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const activeEl = document.activeElement;
    if (e.shiftKey && (activeEl === first || activeEl === panelRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && activeEl === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" && showRecents) {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, recentSearches.length - 1));
    } else if (e.key === "ArrowUp" && showRecents) {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      if (showRecents && active >= 0 && recentSearches[active] != null) {
        e.preventDefault();
        handleRecentSelect(recentSearches[active]);
      }
    } else if (e.key === "Escape") {
      onOpenChange(false);
    }
  };

  const panel = (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal={fullScreen || undefined}
      aria-label={placeholder}
      tabIndex={-1}
      onKeyDown={fullScreen ? handleTab : undefined}
      initial={fullScreen ? { y: -48, opacity: 0 } : { y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={fullScreen ? { y: -48, opacity: 0 } : { y: -8, opacity: 0 }}
      transition={
        fullScreen
          ? springs.fastSpatial
          : { duration: durations.short4 / 1000, ease: "easeOut" }
      }
      className={cn(
        "flex flex-col bg-m3-surface outline-none",
        fullScreen ? "fixed inset-0 z-[90]" : "relative w-full overflow-hidden",
        className
      )}
    >
      {/* Official: 56dp input row on surface-container-high */}
      <div className="flex h-14 shrink-0 items-center bg-m3-surface-container-high">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close search"
          className="m3-state relative ml-1 grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full text-m3-on-surface"
        >
          <Ripple />
          {leadingIcon ?? <MaterialSymbol icon="arrow_back" size={24} />}
        </button>
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-label={placeholder}
          aria-expanded={showRecents}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls={showRecents ? listId : undefined}
          aria-activedescendant={showRecents && active >= 0 ? `${listId}-${active}` : undefined}
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(-1);
          }}
          onKeyDown={handleInputKeyDown}
          className="h-full min-w-0 flex-1 bg-transparent px-4 text-m3-on-surface outline-none placeholder:text-m3-on-surface-variant md-body-large"
        />
        {/* Clear affordance once a query exists */}
        {query !== "" && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActive(-1);
              inputRef.current?.focus();
            }}
            aria-label="Clear search text"
            className="m3-state relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full text-m3-on-surface"
          >
            <Ripple />
            <MaterialSymbol icon="close" size={24} />
          </button>
        )}
        {trailingActions && (
          <div className="flex shrink-0 items-center pr-1">{trailingActions}</div>
        )}
      </div>
      {/* Official: 1dp outline-variant divider below the input row */}
      <div aria-hidden="true" className="h-px w-full shrink-0 bg-m3-outline-variant" />

      {/* Scrollable content below the divider */}
      <div className="m3-scroll min-h-0 flex-1 overflow-y-auto py-2">
        {showRecents && (
          <ul id={listId} role="listbox" aria-label="Recent searches" className="py-1">
            {recentSearches.map((q, i) => (
              <li
                key={q}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={false}
                ref={(el) => {
                  if (active === i && el) el.scrollIntoView({ block: "nearest" });
                }}
                onMouseEnter={() => setActive(i)}
                onClick={() => handleRecentSelect(q)}
                className={cn(
                  "m3-state relative flex min-h-12 cursor-pointer items-center overflow-hidden px-4",
                  active === i && "bg-m3-on-surface/8"
                )}
              >
                <Ripple />
                <MaterialSymbol
                  icon="history"
                  size={24}
                  className="mr-3 shrink-0 text-m3-on-surface-variant"
                />
                <span className="flex-1 truncate md-label-large text-m3-on-surface">{q}</span>
                {onRecentRemove && (
                  <button
                    type="button"
                    aria-label={`Remove ${q} from recent searches`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRecentRemove(q);
                    }}
                    className="m3-state relative -mr-2 grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full text-m3-on-surface-variant"
                  >
                    <Ripple />
                    <MaterialSymbol icon="close" size={20} />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
        {!showRecents && children}
      </div>
    </motion.div>
  );

  return <AnimatePresence>{open && panel}</AnimatePresence>;
});

export { searchViewMeta } from "@/lib/m3/meta";
