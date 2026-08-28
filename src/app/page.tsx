"use client";

import * as React from "react";
import { motion, MotionConfig } from "framer-motion";
import { Sidebar, parseHash, routeToHash, type Route } from "@/components/showcase/Sidebar";
import { HomeView } from "@/components/showcase/HomeView";
import { FoundationsView } from "@/components/showcase/FoundationsView";
import { ComponentView } from "@/components/showcase/ComponentView";
import { AgentView } from "@/components/showcase/AgentView";
import { DocsView } from "@/components/showcase/DocsView";
import { SideSheet } from "@/components/m3/SideSheet";
import { IconButton } from "@/components/m3/IconButton";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { ComponentsIndexView } from "@/components/showcase/ComponentsIndexView";
import { CommandPalette } from "@/components/showcase/CommandPalette";
import { getComponent } from "@/lib/m3/registry";
import { useM3Theme } from "@/hooks/use-m3-theme";
import { ThemeSwitcher } from "@/components/showcase/ThemeSwitcher";
import { springs } from "@/lib/m3/tokens";

function routeTitle(route: Route): string {
  switch (route.kind) {
    case "home":
      return "Material 3 Expressive React — Component Library & Design System";
    case "docs":
      return "Getting started · M3 Expressive";
    case "foundations":
      return "Design foundations · M3 Expressive";
    case "agents":
      return "For AI agents · M3 Expressive";
    case "components":
      return "All components · M3 Expressive";
    case "component": {
      const c = getComponent(route.id);
      return c ? `${c.name} · M3 Expressive` : "Component not found · M3 Expressive";
    }
  }
}

export default function M3ExpressiveDocs() {
  const [route, setRoute] = React.useState<Route>({ kind: "home" });
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const { isDark, toggle } = useM3Theme();
  const firstRender = React.useRef(true);
  /** true while a navigation was triggered by navigate() (vs back/forward) */
  const programmaticNav = React.useRef(false);
  /** scroll position per hash — restored on back/forward navigation */
  const scrollPositions = React.useRef<Map<string, number>>(new Map());
  /** consumed by the route effect: where to scroll after the view swap */
  const pendingScroll = React.useRef<{ top: number; smooth: boolean }>({ top: 0, smooth: true });

  // hash-based routing
  React.useEffect(() => {
    const apply = (e?: HashChangeEvent) => {
      const prevHash = e?.oldURL?.split("#")[1];
      if (prevHash !== undefined) scrollPositions.current.set(`#${prevHash}`, window.scrollY);
      setRoute(parseHash(window.location.hash));
      if (programmaticNav.current) {
        programmaticNav.current = false;
        pendingScroll.current = { top: 0, smooth: true };
      } else if (e) {
        // back/forward: restore where the user was on this hash (top if new)
        const y = scrollPositions.current.get(window.location.hash || "#/") ?? 0;
        pendingScroll.current = { top: y, smooth: false };
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const navigate = React.useCallback((r: Route) => {
    programmaticNav.current = true;
    window.location.hash = routeToHash(r);
    setDrawerOpen(false);
  }, []);

  // ⌘K / Ctrl-K opens the command palette from anywhere.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    document.title = routeTitle(route);
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    // move focus to the new view so screen readers announce it
    document.getElementById("main")?.focus({ preventScroll: true });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { top, smooth } = pendingScroll.current;
    window.scrollTo({ top, behavior: smooth && !reduced ? "smooth" : "auto" });
  }, [route]);

  return (
    <MotionConfig reducedMotion="user">
    <div className="flex min-h-screen flex-col bg-m3-surface">
      {/* ============ SKIP LINK ============ */}
      <button
        onClick={() => {
          const main = document.getElementById("main");
          main?.focus({ preventScroll: false });
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-m3-primary focus:px-5 focus:py-2.5 focus:md-label-large focus:text-m3-on-primary focus:m3-elevation-2 md-label-large"
      >
        Skip to content
      </button>

      {/* ============ TOP APP BAR ============ */}
      <header className="sticky top-0 z-40 border-b border-m3-outline-variant/60 bg-m3-surface/85 backdrop-blur-lg">
        <div className="flex h-16 items-center gap-2 px-3 sm:px-5">
          <IconButton
            icon="menu"
            variant="standard"
            className="lg:hidden"
            aria-label="Open navigation menu"
            onClick={() => setDrawerOpen(true)}
          />
          <button
            onClick={() => navigate({ kind: "home" })}
            className="m3-state m3-focus flex min-w-0 flex-1 items-center gap-3 rounded-full px-2 py-1.5 text-left sm:flex-none"
            aria-label="Material 3 Expressive home"
          >
            <motion.span
              className="flex h-10 w-10 items-center justify-center bg-m3-primary text-m3-on-primary"
              animate={{ borderRadius: ["38%", "50%", "30%", "38%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <MaterialSymbol icon="widgets" size={22} fill />
            </motion.span>
            <span className="ml-1 min-w-0 flex-1 sm:ml-0 sm:flex-none">
              <span className="block truncate md-title-medium leading-tight text-m3-on-surface">M3 Expressive</span>
              <span className="block truncate md-label-small leading-tight text-m3-on-surface-variant">
                React component library
              </span>
            </span>
          </button>

          <span className="ml-2 hidden rounded-full border border-m3-outline-variant px-2.5 py-1 md-label-small text-m3-on-surface-variant sm:inline">
            v1.0.0
          </span>

          <div className="ml-auto flex items-center gap-1">
            <IconButton
              icon="search"
              variant="standard"
              aria-label="Search components (Command K)"
              onClick={() => setPaletteOpen(true)}
            />
            <button
              onClick={() => navigate({ kind: "agents" })}
              className="m3-state m3-focus hidden items-center gap-2 rounded-full border border-m3-outline px-4 py-2 md-label-large text-m3-primary sm:flex"
            >
              <MaterialSymbol icon="smart_toy" size={18} fill />
              Agent API
            </button>
            <IconButton
              icon={isDark ? "light_mode" : "dark_mode"}
              variant="tonal"
              selected={isDark}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              onClick={toggle}
            />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* ============ BODY ============ */}
      <div className="flex flex-1">
        {/* desktop sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[300px] shrink-0 border-r border-m3-outline-variant/60 lg:block">
          <Sidebar route={route} navigate={navigate} />
        </aside>

        {/* main */}
        <main id="main" tabIndex={-1} className="min-w-0 flex-1 outline-none">
          <motion.div
            key={route.kind === "component" ? `c-${route.id}` : route.kind === "foundations" ? `f-${route.tab ?? "color"}` : route.kind}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springs.defaultSpatial}
          >
            {route.kind === "home" && <HomeView navigate={navigate} />}
            {route.kind === "docs" && <DocsView navigate={navigate} />}
            {route.kind === "components" && <ComponentsIndexView cat={route.cat} navigate={navigate} />}
            {route.kind === "foundations" && (
              <FoundationsView
                tab={route.tab}
                onTab={(t) => navigate({ kind: "foundations", tab: t })}
              />
            )}
            {route.kind === "component" && (
              <ComponentView id={route.id} code={route.code} navigate={navigate} />
            )}
            {route.kind === "agents" && <AgentView />}
          </motion.div>
        </main>
      </div>

      {/* ============ STICKY FOOTER ============ */}
      <footer className="mt-auto border-t border-m3-outline-variant/60 bg-m3-surface-container-low">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-[30%] bg-m3-primary text-m3-on-primary">
              <MaterialSymbol icon="widgets" size={20} fill />
            </span>
            <div>
              <div className="md-title-medium text-m3-on-surface">Material 3 Expressive React</div>
              <div className="md-body-small text-m3-on-surface-variant">
                Built on official Google design tokens · v1.0.0
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 md-body-medium text-m3-on-surface-variant">
            <a href="#/docs" className="m3-state m3-focus rounded px-2 py-2 hover:text-m3-primary">Getting started</a>
            <a href="/api/registry" className="m3-state m3-focus rounded px-2 py-2 hover:text-m3-primary">Registry API</a>
            <a href="/api/agent" className="m3-state m3-focus rounded px-2 py-2 hover:text-m3-primary">Agent manifest</a>
            <a href="/llms.txt" className="m3-state m3-focus rounded px-2 py-2 hover:text-m3-primary">llms.txt</a>
            <a
              href="https://m3.material.io"
              target="_blank"
              rel="noreferrer"
              className="m3-state m3-focus rounded px-2 py-2 hover:text-m3-primary"
            >
              m3.material.io ↗
            </a>
          </div>
        </div>
      </footer>

      {/* ============ MOBILE DRAWER (full Sidebar: search + guides + all 41 components) ============ */}
      <SideSheet
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        side="left"
        width={320}
        className="p-0"
      >
        {/* p-0 above cancels the sheet's 24dp padding (tailwind-merge) — the
            Sidebar brings its own p-4, exactly like the desktop aside. */}
        <Sidebar route={route} navigate={navigate} />
      </SideSheet>

      {/* ============ COMMAND PALETTE (⌘K) ============ */}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} navigate={navigate} />
    </div>
    </MotionConfig>
  );
}
