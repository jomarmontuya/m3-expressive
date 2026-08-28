"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { m3Registry } from "@/lib/m3/registry";
import { categoryLabels, type M3Category } from "@/lib/m3/types";
import type { Route } from "@/components/showcase/Sidebar";
import { Card } from "@/components/m3/Card";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";

const CATEGORY_ICONS: Record<M3Category, string> = {
  actions: "smart_button",
  communication: "forum",
  containment: "web_asset",
  selection: "checklist",
  textinput: "keyboard",
  navigation: "explore",
};

/**
 * Components index (#/components) — the browsable catalog behind the
 * "Browse components" CTA. One section per category, each card deep-links
 * to the component page. Category jumps use scrollIntoView (not href
 * anchors) so the hash router is never hijacked.
 */
export function ComponentsIndexView({ cat, navigate }: { cat?: M3Category; navigate: (r: Route) => void }) {
  // Deep link (#/components/<cat>) — scroll to the category section once rendered.
  React.useEffect(() => {
    if (!cat) return;
    document.getElementById(`cat-${cat}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [cat]);

  const jumpTo = (c: M3Category) => {
    document.getElementById(`cat-${c}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      {/* header */}
      <div className="md-label-large text-m3-primary">Component catalog</div>
      <h1 className="mt-1 md-display-small font-semibold">All components</h1>
      <p className="mt-3 max-w-3xl md-body-large text-m3-on-surface-variant">
        {m3Registry.totalCount} spec-audited Material 3 Expressive components. Pick one for its
        live demo, interactive playground, usage code, and design guidelines.
      </p>

      {/* category jump chips (scroll, not hash anchors) */}
      <div className="sticky top-16 z-10 -mx-4 mt-6 flex gap-2 overflow-x-auto bg-m3-surface/90 px-4 py-3 backdrop-blur-lg sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {m3Registry.categories.map((cat) => (
          <button
            key={cat}
            onClick={() => jumpTo(cat as M3Category)}
            className="m3-state m3-focus flex shrink-0 items-center gap-2 rounded-full border border-m3-outline-variant px-4 py-2 md-label-large text-m3-on-surface-variant"
          >
            <MaterialSymbol icon={CATEGORY_ICONS[cat as M3Category]} size={18} />
            {categoryLabels[cat as M3Category]}
          </button>
        ))}
      </div>

      {m3Registry.categories.map((cat) => {
        const items = m3Registry.components.filter((c) => c.category === cat);
        return (
          <section key={cat} id={`cat-${cat}`} className="mt-10 scroll-mt-32 pt-2">
            <div className="flex items-center gap-3">
              <MaterialSymbol
                icon={CATEGORY_ICONS[cat as M3Category]}
                size={24}
                fill
                className="text-m3-primary"
              />
              <h2 className="md-headline-small font-medium">{categoryLabels[cat as M3Category]}</h2>
              <span className="md-label-medium text-m3-on-surface-variant">{items.length}</span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.02, 0.3) }}
                >
                  <Card
                    variant="filled"
                    interactive
                    onClick={() => navigate({ kind: "component", id: c.id })}
                    className="h-full p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="md-title-large">{c.name}</h3>
                      {c.m3e && (
                        <span className="shrink-0 rounded-full bg-m3-tertiary-container px-2 py-0.5 md-label-small text-m3-on-tertiary-container">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="mt-1 md-body-medium text-m3-on-surface-variant line-clamp-3">
                      {c.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
