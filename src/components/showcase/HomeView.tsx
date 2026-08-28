"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/m3/Button";
import { Card } from "@/components/m3/Card";
import { Chip } from "@/components/m3/Chip";
import { LoadingIndicator } from "@/components/m3/LoadingIndicator";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { FabMenu } from "@/components/m3/FabMenu";
import { SplitButton } from "@/components/m3/SplitButton";
import { m3Registry } from "@/lib/m3/registry";
import { springs } from "@/lib/m3/tokens";
import { CodeBlock } from "./CodeBlock";
import type { Route } from "./Sidebar";

const M3E_COMPONENTS = m3Registry.components.filter((c) => c.m3e);

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: springs.expressiveSpatial,
};

export function HomeView({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden rounded-[36px] bg-m3-primary-container px-6 py-14 text-m3-on-primary-container sm:px-12 sm:py-20">
        {/* floating expressive shapes */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70">
          <motion.div
            className="absolute -right-10 -top-10 h-48 w-48 bg-m3-primary/20"
            animate={{ borderRadius: ["40%", "28%", "50%", "32%", "40%"], rotate: [0, 40, -30, 10, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-6 right-32 h-24 w-24 bg-m3-tertiary/30"
            animate={{ borderRadius: ["50%", "24%", "50%"], rotate: [0, 90] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -left-8 bottom-0 h-36 w-36 bg-m3-secondary/20"
            animate={{ borderRadius: ["32%", "50%", "40%", "32%"], rotate: [0, -60, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-m3-surface/60 px-3 py-1.5 md-label-medium text-m3-on-primary-container backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-m3-tertiary" />
            The 2025 Google design language · v1.0.0
          </div>
          <h1 className="md-display-large font-semibold tracking-tight sm:font-bold">
            Material 3
            <br />
            Expressive<span className="text-m3-tertiary">.</span>
          </h1>
          <p className="mt-5 max-w-2xl md-body-large text-m3-on-primary-container/85">
            A complete React component library implementing Google&apos;s Material 3 Expressive
            system — <strong>{m3Registry.totalCount} components</strong>, official design tokens,
            physics-based spring motion, shape morphing, and agentic-compatible metadata APIs.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              variant="filled"
              size="lg"
              icon="rocket_launch"
              onClick={() => navigate({ kind: "docs" })}
            >
              Get started
            </Button>
            <Button
              variant="tonal"
              size="lg"
              icon="grid_view"
              onClick={() => navigate({ kind: "components" })}
            >
              Browse components
            </Button>
            <Button
              variant="outlined"
              size="lg"
              icon="smart_toy"
              onClick={() => navigate({ kind: "agents" })}
            >
              Agent API
            </Button>
            <Button
              variant="text"
              size="lg"
              trailingIcon="arrow_forward"
              onClick={() => navigate({ kind: "foundations" })}
            >
              Design foundations
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {[
              { n: m3Registry.totalCount, l: "Components" },
              { n: m3Registry.categories.length, l: "Categories" },
              { n: M3E_COMPONENTS.length, l: "New in M3E" },
              { n: "24", l: "Color roles" },
              { n: "12", l: "Spring tokens" },
            ].map((s) => (
              <div key={s.l}>
                <div className="md-headline-medium font-semibold">{s.n}</div>
                <div className="md-label-medium text-m3-on-primary-container/70">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- WHAT'S EXPRESSIVE ---------------- */}
      <section className="mt-16">
        <h2 className="md-headline-large font-medium">New in Expressive</h2>
        <p className="mt-2 max-w-2xl md-body-large text-m3-on-surface-variant">
          M3 Expressive introduces playful shape morphing, variable-width buttons, and a
          shape-shifting loading indicator — all implemented here with real spring physics.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {M3E_COMPONENTS.map((c) => (
            <motion.div key={c.id} {...fadeUp}>
              <Card
                variant="filled"
                interactive
                onClick={() => navigate({ kind: "component", id: c.id })}
                className="h-full p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <MaterialSymbol icon={m3eIcon(c.id)} size={28} fill className="text-m3-primary" />
                  <span className="rounded-full bg-m3-tertiary-container px-2 py-0.5 md-label-small text-m3-on-tertiary-container">
                    NEW
                  </span>
                </div>
                <h3 className="mt-3 md-title-large">{c.name}</h3>
                <p className="mt-1 md-body-medium text-m3-on-surface-variant line-clamp-3">{c.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- LIVE EXPRESSIVE STRIP ---------------- */}
      <section className="mt-16 overflow-hidden rounded-[36px] bg-m3-surface-container-low p-8 sm:p-12">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <h2 className="md-headline-medium font-medium">Motion you can feel</h2>
            <p className="mt-2 md-body-large text-m3-on-surface-variant">
              Every transition in this library is powered by the official M3E spring tokens —
              including the signature bouncy <code className="rounded bg-m3-surface-container-highest px-1.5 py-0.5 text-[13px]">springs.expressive</code> curve.
              Press the buttons and watch the shapes morph.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <SplitButton
                label="Split button"
                variant="filled"
                items={[
                  { label: "Duplicate", icon: "content_copy" },
                  { label: "Archive", icon: "archive" },
                  { label: "Delete", icon: "delete" },
                ]}
              />
              <FabMenu
                direction="horizontal"
                actions={[
                  { icon: "mic", label: "Voice" },
                  { icon: "image", label: "Image" },
                  { icon: "attach_file", label: "File" },
                ]}
              />
            </div>
          </div>
          <div className="flex items-center gap-8">
            {(["primary", "secondary", "tertiary"] as const).map((color, i) => (
              <LoadingIndicator key={color} size={i === 1 ? 72 : 56} color={color} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- QUICK START ---------------- */}
      <section className="mt-16">
        <h2 className="md-headline-large font-medium">Quick start</h2>
        <p className="mt-2 md-body-large text-m3-on-surface-variant">
          Install the npm package — or copy the source into
          <code className="mx-1 rounded bg-m3-surface-container-highest px-1.5 py-0.5 text-[13px]">src/components/m3/</code>
          and own the code (runtime deps: Base UI, framer-motion, clsx, tailwind-merge).
        </p>
        <div className="mt-6 max-w-xl">
          <CodeBlock
            language="bash"
            code={`npm install m3-expressive-react framer-motion`}
          />
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <CodeBlock
            code={`import { Button, Card, Dialog } from "m3-expressive-react";
import "m3-expressive-react/styles.css";

export function Checkout() {
  return (
    <Card variant="elevated" className="p-6">
      <Button variant="filled" icon="shopping_cart">
        Buy now
      </Button>
    </Card>
  );
}`}
          />
          <CodeBlock
            code={`import { springs } from "@/lib/m3/tokens";

// Official M3E spring tokens — physics, not durations
<motion.div
  animate={{ scale: 1.1 }}
  transition={springs.expressive}  // the bouncy one
/>

// Tokenized color roles — auto light/dark
<button className="bg-m3-primary text-m3-on-primary" />`}
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {["Zero-config theming", "Light + dark", "Accessible by default", "TypeScript strict", "Agentic metadata", "Material Symbols"].map(
            (t) => (
              <Chip key={t} variant="assist">
                {t}
              </Chip>
            )
          )}
        </div>
      </section>
    </div>
  );
}

function m3eIcon(id: string): string {
  const icons: Record<string, string> = {
    "loading-indicator": "progress_activity",
    "button-group": "grouped_bar_chart",
    "split-button": "call_split",
    toolbar: "handyman",
    "fab-menu": "add_circle",
    slider: "tune",
    "top-app-bar": "toolbar",
  };
  return icons[id] ?? "auto_awesome";
}
