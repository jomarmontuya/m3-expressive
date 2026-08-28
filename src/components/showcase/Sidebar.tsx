"use client";

import * as React from "react";
import { m3Registry, searchComponents } from "@/lib/m3/registry";
import { categoryLabels, type M3Category } from "@/lib/m3/types";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { SearchBar } from "@/components/m3/SearchBar";
import { cn } from "@/lib/utils";

export type Route =
  | { kind: "home" }
  | { kind: "foundations"; tab?: string }
  | { kind: "agents" }
  | { kind: "component"; id: string };

export function routeToHash(r: Route): string {
  switch (r.kind) {
    case "home":
      return "#/";
    case "foundations":
      return r.tab ? `#/foundation/${r.tab}` : "#/foundation";
    case "agents":
      return "#/agents";
    case "component":
      return `#/component/${r.id}`;
  }
}

export function parseHash(hash: string): Route {
  const h = hash.replace(/^#\/?/, "");
  if (h.startsWith("component/")) return { kind: "component", id: h.slice("component/".length) };
  if (h.startsWith("foundation")) return { kind: "foundations", tab: h.split("/")[1] };
  if (h === "agents") return { kind: "agents" };
  return { kind: "home" };
}

interface SidebarProps {
  route: Route;
  navigate: (r: Route) => void;
}

export function Sidebar({ route, navigate }: SidebarProps) {
  const [query, setQuery] = React.useState("");
  const results = searchComponents(query);

  const groups = m3Registry.categories
    .map((cat) => ({ cat, items: results.filter((c) => c.category === cat) }))
    .filter((g) => g.items.length > 0);

  const isHome = route.kind === "home";
  const isFoundations = route.kind === "foundations";
  const isAgents = route.kind === "agents";

  return (
    <nav aria-label="Component library navigation" className="flex h-full flex-col gap-2 p-4">
      <SearchBar
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        size="sm"
        placeholder="Search components…"
        fullWidth
        className="mb-2 shrink-0"
      />

      <div className="m3-scroll flex-1 space-y-1 overflow-y-auto pb-6">
        <NavItem
          active={isHome}
          icon="home"
          label="Overview"
          onClick={() => navigate({ kind: "home" })}
        />
        <NavItem
          active={isFoundations}
          icon="palette"
          label="Design foundations"
          onClick={() => navigate({ kind: "foundations" })}
        />
        <NavItem
          active={isAgents}
          icon="smart_toy"
          label="For AI agents"
          badge="API"
          onClick={() => navigate({ kind: "agents" })}
        />

        <div className="px-3 pb-1 pt-5 md-label-medium text-m3-on-surface-variant">
          Components · {results.length}
        </div>

        {groups.map(({ cat, items }) => (
          <div key={cat}>
            <div className="px-3 py-1.5 md-label-small uppercase tracking-wide text-m3-on-surface-variant/80">
              {categoryLabels[cat as M3Category]}
            </div>
            {items.map((c) => {
              const active = route.kind === "component" && route.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => navigate({ kind: "component", id: c.id })}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "m3-state m3-focus flex h-10 w-full items-center gap-2 rounded-full px-4 text-left md-label-large transition-colors",
                    active
                      ? "bg-m3-secondary-container text-m3-on-secondary-container"
                      : "text-m3-on-surface-variant"
                  )}
                >
                  <span className="truncate">{c.name}</span>
                  {c.m3e && (
                    <span
                      title="New in Material 3 Expressive"
                      className="ml-auto h-2 w-2 shrink-0 rounded-full bg-m3-tertiary"
                    />
                  )}
                </button>
              );
            })}
          </div>
        ))}
        {results.length === 0 && (
          <div className="px-4 py-8 text-center md-body-medium text-m3-on-surface-variant">
            <MaterialSymbol icon="search_off" className="mb-2 text-3xl" />
            <div>No components match “{query}”</div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavItem({
  active,
  icon,
  label,
  badge,
  onClick,
}: {
  active: boolean;
  icon: string;
  label: string;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "m3-state m3-focus flex h-12 w-full items-center gap-3 rounded-full px-4 text-left md-label-large transition-colors",
        active
          ? "bg-m3-secondary-container text-m3-on-secondary-container"
          : "text-m3-on-surface-variant"
      )}
    >
      <MaterialSymbol icon={icon} size={22} fill={active} />
      <span>{label}</span>
      {badge && (
        <span className="ml-auto rounded-full bg-m3-primary px-2 py-0.5 text-[11px] font-semibold text-m3-on-primary">
          {badge}
        </span>
      )}
    </button>
  );
}
