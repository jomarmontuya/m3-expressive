"use client";

import * as React from "react";
import { motion, MotionConfig } from "framer-motion";
import { Sidebar, parseHash, routeToHash, type Route } from "@/components/showcase/Sidebar";
import { HomeView } from "@/components/showcase/HomeView";
import { FoundationsView } from "@/components/showcase/FoundationsView";
import { ComponentView } from "@/components/showcase/ComponentView";
import { AgentView } from "@/components/showcase/AgentView";
import { DocsView } from "@/components/showcase/DocsView";
import { NavigationDrawer } from "@/components/m3/NavigationDrawer";
import { IconButton } from "@/components/m3/IconButton";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { useM3Theme } from "@/hooks/use-m3-theme";
import { ThemeSwitcher } from "@/components/showcase/ThemeSwitcher";
import { springs } from "@/lib/m3/tokens";

const DRAWER_ITEMS = [
  { value: "home", icon: "home", label: "Overview" },
  { value: "docs", icon: "rocket_launch", label: "Getting started" },
  { value: "foundations", icon: "palette", label: "Design foundations" },
  { value: "agents", icon: "smart_toy", label: "For AI agents" },
  { value: "actions", icon: "smart_button", label: "Actions" },
  { value: "communication", icon: "forum", label: "Communication" },
  { value: "containment", icon: "web_asset", label: "Containment" },
  { value: "selection", icon: "checklist", label: "Selection" },
  { value: "textinput", icon: "keyboard", label: "Text input" },
  { value: "navigation", icon: "explore", label: "Navigation" },
];

export default function M3ExpressiveDocs() {
  const [route, setRoute] = React.useState<Route>({ kind: "home" });
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { isDark, toggle } = useM3Theme();
  const firstRender = React.useRef(true);

  // hash-based routing
  React.useEffect(() => {
    const apply = () => setRoute(parseHash(window.location.hash));
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const navigate = React.useCallback((r: Route) => {
    window.location.hash = routeToHash(r);
    setDrawerOpen(false);
  }, []);

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route]);

  const activeDrawer =
    route.kind === "home"
      ? "home"
      : route.kind === "docs"
        ? "docs"
        : route.kind === "foundations"
          ? "foundations"
          : route.kind === "agents"
            ? "agents"
            : "";

  return (
    <MotionConfig reducedMotion="user">
    <div className="flex min-h-screen flex-col bg-m3-surface">
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
            className="m3-state m3-focus flex items-center gap-3 rounded-full px-2 py-1.5 text-left"
            aria-label="Material 3 Expressive home"
          >
            <motion.span
              className="flex h-10 w-10 items-center justify-center bg-m3-primary text-m3-on-primary"
              animate={{ borderRadius: ["38%", "50%", "30%", "38%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <MaterialSymbol icon="widgets" size={22} fill />
            </motion.span>
            <span>
              <span className="block md-title-medium leading-tight text-m3-on-surface">M3 Expressive</span>
              <span className="block md-label-small leading-tight text-m3-on-surface-variant">
                React component library
              </span>
            </span>
          </button>

          <span className="ml-2 hidden rounded-full border border-m3-outline-variant px-2.5 py-1 md-label-small text-m3-on-surface-variant sm:inline">
            v1.0.0
          </span>

          <div className="ml-auto flex items-center gap-1">
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
        <main className="min-w-0 flex-1">
          <motion.div
            key={route.kind === "component" ? `c-${route.id}` : route.kind === "foundations" ? `f-${route.tab ?? "color"}` : route.kind}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springs.defaultSpatial}
          >
            {route.kind === "home" && <HomeView navigate={navigate} />}
            {route.kind === "docs" && <DocsView navigate={navigate} />}
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
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between">
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
            <a href="#/docs" className="m3-state rounded px-1 hover:text-m3-primary">Getting started</a>
            <a href="/api/registry" className="m3-state rounded px-1 hover:text-m3-primary">Registry API</a>
            <a href="/api/agent" className="m3-state rounded px-1 hover:text-m3-primary">Agent manifest</a>
            <a href="/llms.txt" className="m3-state rounded px-1 hover:text-m3-primary">llms.txt</a>
            <a
              href="https://m3.material.io"
              target="_blank"
              rel="noreferrer"
              className="m3-state rounded px-1 hover:text-m3-primary"
            >
              m3.material.io ↗
            </a>
          </div>
        </div>
      </footer>

      {/* ============ MOBILE DRAWER ============ */}
      <NavigationDrawer
        variant="modal"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={DRAWER_ITEMS}
        value={activeDrawer}
        onChange={(v) => {
          if (v === "home") navigate({ kind: "home" });
          else if (v === "docs") navigate({ kind: "docs" });
          else if (v === "foundations") navigate({ kind: "foundations" });
          else if (v === "agents") navigate({ kind: "agents" });
          else navigate({ kind: "foundations", tab: "color" });
          setDrawerOpen(false);
        }}
        header={
          <div className="flex items-center gap-3 px-4 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[30%] bg-m3-primary text-m3-on-primary">
              <MaterialSymbol icon="widgets" size={22} fill />
            </span>
            <span className="md-title-large text-m3-on-surface">M3 Expressive</span>
          </div>
        }
      />
    </div>
    </MotionConfig>
  );
}
