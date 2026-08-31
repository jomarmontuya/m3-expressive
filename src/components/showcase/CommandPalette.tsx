"use client";

import * as React from "react";
import { Dialog } from "@/components/m3/Dialog";
import { SearchBar } from "@/components/m3/SearchBar";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { searchComponents } from "@/lib/m3/registry";
import { categoryLabels, type M3Category } from "@/lib/m3/types";
import { cn } from "@/lib/utils";
import type { Route } from "./Sidebar";

const GUIDE_ITEMS: { label: string; icon: string; route: Route }[] = [
  { label: "Overview", icon: "home", route: { kind: "home" } },
  { label: "Getting started", icon: "rocket_launch", route: { kind: "docs" } },
  { label: "Design foundations", icon: "palette", route: { kind: "foundations" } },
  { label: "All components", icon: "grid_view", route: { kind: "components" } },
];

/**
 * ⌘K / Ctrl-K command palette — jump to any component or page. Built from
 * library primitives (Dialog owns the focus trap + Escape; SearchBar filters
 * the registry). Arrow keys move the active row, Enter navigates.
 */
export function CommandPalette({
  open,
  onClose,
  navigate,
}: {
  open: boolean;
  onClose: () => void;
  navigate: (r: Route) => void;
}) {
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const bodyRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      // Focus the search input programmatically (autoFocus is banned by lint).
      const t = window.setTimeout(() => bodyRef.current?.querySelector("input")?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const guides =
      q === ""
        ? GUIDE_ITEMS
        : GUIDE_ITEMS.filter((g) => g.label.toLowerCase().includes(q));
    const components = (q === "" ? searchComponents("") : searchComponents(q)).slice(0, q === "" ? 6 : 10);
    return { guides, components };
  }, [query]);

  const total = results.guides.length + results.components.length;

  const go = React.useCallback(
    (r: Route) => {
      navigate(r);
      onClose();
    },
    [navigate, onClose]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(total, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + Math.max(total, 1)) % Math.max(total, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (total === 0) return;
      if (active < results.guides.length) go(results.guides[active].route);
      else {
        const c = results.components[active - results.guides.length];
        if (c) go({ kind: "component", id: c.id });
      }
    }
  };

  let rowIdx = -1;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      headline="Search"
      className="max-w-[560px]"
    >
      <div ref={bodyRef} className="flex flex-col gap-3">
        <SearchBar
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          fullWidth
          placeholder="Search components and pages…"
        />
        <div role="listbox" aria-label="Results" className="m3-scroll max-h-[46vh] overflow-y-auto">
          {total === 0 && (
            <div className="px-4 py-8 text-center md-body-medium text-m3-on-surface-variant">
              <MaterialSymbol icon="search_off" className="mb-2 text-3xl" />
              <div>Nothing matches “{query}”</div>
            </div>
          )}
          {results.guides.length > 0 && (
            <div className="px-3 pb-1 pt-2 md-label-small uppercase tracking-wide text-m3-on-surface-variant/80">
              Pages
            </div>
          )}
          {results.guides.map((g) => {
            rowIdx += 1;
            const i = rowIdx;
            return (
              <button
                key={g.label}
                role="option"
                aria-selected={i === active}
                onClick={() => go(g.route)}
                onPointerEnter={() => setActive(i)}
                className={cn(
                  "m3-state m3-focus flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-left md-label-large",
                  i === active
                    ? "bg-m3-secondary-container text-m3-on-secondary-container"
                    : "text-m3-on-surface-variant"
                )}
              >
                <MaterialSymbol icon={g.icon} size={20} />
                {g.label}
              </button>
            );
          })}
          {results.components.length > 0 && (
            <div className="px-3 pb-1 pt-3 md-label-small uppercase tracking-wide text-m3-on-surface-variant/80">
              Components
            </div>
          )}
          {results.components.map((c) => {
            rowIdx += 1;
            const i = rowIdx;
            return (
              <button
                key={c.id}
                role="option"
                aria-selected={i === active}
                onClick={() => go({ kind: "component", id: c.id })}
                onPointerEnter={() => setActive(i)}
                className={cn(
                  "m3-state m3-focus flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-left md-label-large",
                  i === active
                    ? "bg-m3-secondary-container text-m3-on-secondary-container"
                    : "text-m3-on-surface-variant"
                )}
              >
                <MaterialSymbol icon="widgets" size={20} />
                <span className="truncate">{c.name}</span>
                <span className="ml-auto md-label-small text-m3-on-surface-variant/70">
                  {categoryLabels[c.category as M3Category]}
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-4 px-2 md-label-small text-m3-on-surface-variant/70">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </Dialog>
  );
}
