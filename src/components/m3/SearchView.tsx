'use client';

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps, Transition } from "framer-motion";
import { Dialog, type DialogRootActions, type DialogRootChangeEventDetails } from "@base-ui/react/dialog";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { Input } from "@base-ui/react/input";
import { cn } from "@/lib/utils";
import { springs as springsTokens, durations } from "@/lib/m3/tokens";
import { useTextDirection } from "@/lib/m3/use-text-direction";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

/** Token springs retyped as framer-motion Transitions (`type` widens to string). */
const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };
const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, details, [tabindex]:not([tabindex="-1"])';

export type SearchViewMode = "full-screen" | "docked";

export interface SearchViewProps {
  /** Whether the search view is shown. */
  open: boolean;
  /** Called when the view requests to open or close (Escape, leading icon). */
  onOpenChange: (open: boolean) => void;
  /** `full-screen` covers the viewport; `docked` opens a floating result surface over a scrim. */
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
   * Results content below the search header. Rendered whenever recent-search
   * suggestions are not shown (i.e. the query is non-empty, or no
   * `recentSearches` were provided).
   */
  children?: React.ReactNode;
  /** Focus the query input when either view opens. Default true. */
  autoFocus?: boolean;
  className?: string;
}

/**
 * M3 Search view — the expanded companion of the search bar: a persistent,
 * full-width search surface for larger, richer search that expands over the
 * UI (m3.material.io/components/search-view).
 *
 * The docked view uses the official 360–720dp width, 240dp minimum height,
 * two-thirds viewport height cap, 28dp corners, elevation 3, and a scrim. The
 * current full-screen contained style keeps a 56dp focused search bar without
 * a baseline divider inside a surface-container-low viewport. While the query
 * is empty, recent-search suggestion rows are shown — leading history icon,
 * label-large text, optional per-row close — and are keyboard navigable
 * (ArrowUp/ArrowDown walk an active index, Enter selects, via
 * aria-activedescendant). In "full-screen" mode the view covers the viewport
 * as a modal dialog built on Base UI `Dialog` (v1.0.0-rc.0): the modal shell
 * owns Escape, body scroll lock, focus trap, initial focus on the query
 * input, focus restore to the opener and the role="dialog"/aria-modal
 * wiring, while our motion.div (rendered via `Dialog.Popup`'s render prop)
 * keeps the M3E slide-and-fade entrance/exit; in "docked" mode it renders
 * inline above its results with no dialog machinery. The query input is a
 * Base UI `Input` and the forwarded ref target.
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
  const reduceMotion = useReducedMotion() ?? false;
  const directionRootRef = React.useRef<HTMLSpanElement>(null);
  const direction = useTextDirection(directionRootRef);
  const fullScreen = mode === "full-screen";
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dockedPanelRef = React.useRef<HTMLDivElement>(null);
  const dockedRestoreFocusRef = React.useRef<HTMLElement | null>(null);
  const [active, setActive] = React.useState(-1);
  const reactId = React.useId();
  const listId = `m3-sv-${reactId.replace(/:/g, "")}`;

  const setInputRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

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

  // Base UI Dialog shell (full-screen mode only): keeps the popup mounted
  // while our framer-motion exit plays, then unmounts via actionsRef.
  const dialogActionsRef = React.useRef<DialogRootActions>({ unmount() {}, close() {} });
  const handleDialogOpenChange = (nextOpen: boolean, eventDetails: DialogRootChangeEventDetails) => {
    // Defer Base UI's unmount until AnimatePresence finishes the exit animation.
    if (!nextOpen) eventDetails.preventUnmountOnClose();
    onOpenChange(nextOpen);
  };
  const handleDialogExited = () => dialogActionsRef.current?.unmount();

  /** Recent searches replace the results content while the query is empty. */
  const showRecents = query.trim() === "" && recentSearches.length > 0;

  React.useEffect(() => {
    if (active >= recentSearches.length) setActive(-1);
  }, [active, recentSearches.length]);

  // The docked popup is focus-contained like the full-screen Dialog. It
  // receives focus on entry and restores the opener when it closes.
  React.useEffect(() => {
    if (fullScreen || !open) return;
    dockedRestoreFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => {
      if (autoFocus) inputRef.current?.focus();
      else dockedPanelRef.current?.focus();
    });
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      dockedRestoreFocusRef.current?.focus?.();
    };
  }, [autoFocus, fullScreen, open]);

  const handleRecentSelect = (q: string) => {
    setQuery(q);
    setActive(-1);
    onRecentSelect?.(q);
  };

  const handleRecentRemove = (q: string) => {
    onRecentRemove?.(q);
    setActive(-1);
  };

  // Docked only: Escape on the input closes (full-screen Escape is owned by
  // the Base UI Dialog shell, which dismisses from anywhere).
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
    }
  };

  const handleDockedKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onOpenChange(false);
      return;
    }
    if (e.key !== "Tab" || !dockedPanelRef.current) return;
    const focusables = Array.from(
      dockedPanelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
    ).filter((element) => !element.hasAttribute("disabled"));
    if (focusables.length === 0) {
      e.preventDefault();
      dockedPanelRef.current.focus();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === dockedPanelRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  /** Leading close affordance — Dialog.Close in full-screen, plain button inline. */
  const closeButtonClassName =
    "m3-state relative ms-1 grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full text-m3-on-surface";
  const closeControl = fullScreen ? (
    <Dialog.Close render={<button type="button" aria-label="Close search" className={closeButtonClassName} />}>
      <Ripple />
      {leadingIcon ?? <MaterialSymbol icon={direction === "rtl" ? "arrow_forward" : "arrow_back"} size={24} />}
    </Dialog.Close>
  ) : (
    <button
      type="button"
      onClick={() => onOpenChange(false)}
      aria-label="Close search"
      className={closeButtonClassName}
    >
      <Ripple />
      {leadingIcon ?? <MaterialSymbol icon={direction === "rtl" ? "arrow_forward" : "arrow_back"} size={24} />}
    </button>
  );

  const inputControls = (
    <div
      className={cn(
        "flex h-14 shrink-0 items-center bg-m3-surface-container-high",
        fullScreen && "rounded-full"
      )}
    >
      {closeControl}
      <Input
        ref={setInputRef}
        type="text"
        role={showRecents ? "combobox" : "searchbox"}
        aria-label={placeholder}
        aria-expanded={showRecents ? open : undefined}
        aria-haspopup={showRecents ? "listbox" : undefined}
        aria-autocomplete={showRecents ? "list" : undefined}
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
        <div className="flex shrink-0 items-center pe-1">{trailingActions}</div>
      )}
    </div>
  );
  const inputRow = fullScreen ? (
    <div className="shrink-0 bg-m3-surface-container-low px-4 py-2">{inputControls}</div>
  ) : inputControls;

  const resultsArea = (
    <>
      {!fullScreen && (
        <div aria-hidden="true" className="h-px w-full shrink-0 bg-m3-outline" />
      )}

      {/* Scrollable content below the search header */}
      <div className="m3-scroll min-h-0 flex-1 overflow-y-auto py-2">
        {showRecents && (
          <div className="relative">
            <ul id={listId} role="listbox" aria-label="Recent searches" className="py-1">
              {recentSearches.map((q, i) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events -- combobox keyboard input owns option navigation and selection
                <li
                  key={q}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={active === i}
                  ref={(el) => {
                    if (active === i && el) el.scrollIntoView({ block: "nearest" });
                  }}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => handleRecentSelect(q)}
                  className={cn(
                    "m3-state relative flex h-12 cursor-pointer items-center overflow-hidden px-4",
                    onRecentRemove && "pe-16",
                    active === i && "bg-m3-on-surface/8"
                  )}
                >
                  <Ripple />
                  <MaterialSymbol
                    icon="history"
                    size={24}
                    className="me-3 shrink-0 text-m3-on-surface-variant"
                  />
                  <span className="flex-1 truncate md-label-large text-m3-on-surface">{q}</span>
                </li>
              ))}
            </ul>
            {onRecentRemove && (
              <div aria-label="Recent search removal actions" className="pointer-events-none absolute inset-x-0 top-1">
                {recentSearches.map((q, i) => (
                  <button
                    key={q}
                    type="button"
                    aria-label={`Remove ${q} from recent searches`}
                    onClick={() => {
                      handleRecentRemove(q);
                    }}
                    className="m3-state m3-focus pointer-events-auto absolute end-2 grid h-12 w-12 place-items-center overflow-hidden rounded-full text-m3-on-surface-variant outline-none"
                    style={{ top: i * 48 }}
                  >
                    <Ripple />
                    <MaterialSymbol icon="close" size={20} />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {!showRecents && children}
      </div>
    </>
  );

  const panelClassName = cn(
    "flex flex-col outline-none",
    fullScreen
      ? "fixed inset-0 z-[90] bg-m3-surface-container-low"
      : "m3-elevation-3 relative z-[90] min-h-[240px] max-h-[66.667dvh] w-full min-w-[360px] max-w-[720px] overflow-hidden rounded-[28px] bg-m3-surface-container-high",
    className
  );
  const panelMotionProps: HTMLMotionProps<"div"> = {
    initial: reduceMotion ? false : fullScreen ? { y: -48, opacity: 0 } : { y: -8, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: reduceMotion ? { y: 0, opacity: 1 } : fullScreen ? { y: -48, opacity: 0 } : { y: -8, opacity: 0 },
    transition: reduceMotion
      ? { duration: 0 }
      : fullScreen
      ? springs.fastSpatial
      : { duration: durations.short4 / 1000, ease: "easeOut" },
  };

  if (fullScreen) {
    return (
      <span ref={directionRootRef} className="contents">
      <DirectionProvider direction={direction}>
        <Dialog.Root
        open={open}
        onOpenChange={handleDialogOpenChange}
        actionsRef={dialogActionsRef}
        // No outside-click dismissal: the view covers the viewport, matching
        // the previous inline overlay (Escape / leading icon close it).
        disablePointerDismissal
      >
        <AnimatePresence onExitComplete={handleDialogExited}>
          {open && (
            <Dialog.Portal>
              <Dialog.Popup
                render={
                  <motion.div
                    dir={direction}
                    aria-label={placeholder}
                    tabIndex={-1}
                    className={panelClassName}
                    {...panelMotionProps}
                  >
                    {inputRow}
                    {resultsArea}
                  </motion.div>
                }
                initialFocus={autoFocus ? inputRef : false}
              />
            </Dialog.Portal>
          )}
        </AnimatePresence>
        </Dialog.Root>
      </DirectionProvider>
      </span>
    );
  }

  return (
    <span ref={directionRootRef} className="contents">
    <DirectionProvider direction={direction}>
      <AnimatePresence>
      {open && (
        <React.Fragment key="m3-search-view-docked">
          <motion.button
            type="button"
            aria-label="Dismiss search"
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-[80] cursor-default bg-m3-scrim/32"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: durations.short4 / 1000, ease: "easeOut" }}
          />
          <motion.div
            ref={dockedPanelRef}
            dir={direction}
            role="dialog"
            aria-modal="true"
            aria-label={placeholder}
            tabIndex={-1}
            onKeyDown={handleDockedKeyDown}
            className={panelClassName}
            {...panelMotionProps}
          >
            {inputRow}
            {resultsArea}
          </motion.div>
        </React.Fragment>
      )}
      </AnimatePresence>
    </DirectionProvider>
    </span>
  );
});

export { searchViewMeta } from "@/lib/m3/meta";
