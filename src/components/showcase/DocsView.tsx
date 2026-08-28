"use client";

/**
 * DocsView — Installation guide + Getting started (ShadCN philosophy):
 *
 *   1. Install 4 runtime dependencies (Base UI headless primitives + framer-motion + cn)
 *   2. Copy the source into your repo (manually, or let an MCP-connected
 *      AI agent do it) — you own the code, no black-box npm package
 *   3. Paste the design-token CSS once — every component styles itself
 *      with token utilities (bg-m3-primary, rounded-m3-lg, md-* type…)
 *
 * Everything on this page is copy-ready: package-manager switcher, file
 * tree, starter stylesheet, font links, and live previews that mirror
 * each snippet 1:1.
 */

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/m3/Button";
import { Chip } from "@/components/m3/Chip";
import { Card } from "@/components/m3/Card";
import { Switch } from "@/components/m3/Switch";
import { SegmentedButton } from "@/components/m3/SegmentedButton";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { CodeBlock } from "./CodeBlock";
import type { Route } from "./Sidebar";

/* ------------------------------------------------------------------ */
/* Snippets (single source of truth for this page)                     */
/* ------------------------------------------------------------------ */

const INSTALL_CMD: Record<string, string> = {
  bun: "bun add @base-ui-components/react framer-motion clsx tailwind-merge",
  npm: "npm install @base-ui-components/react framer-motion clsx tailwind-merge",
  pnpm: "pnpm add @base-ui-components/react framer-motion clsx tailwind-merge",
  yarn: "yarn add @base-ui-components/react framer-motion clsx tailwind-merge",
};

const MCP_PROMPT = `# After wiring the m3-expressive MCP server (.mcp.json — see the Agent API page),
# paste this into your AI agent:

Install m3-expressive-react into this project via the m3-expressive MCP server:
1. list_components → confirm 41 components are available
2. Create src/components/m3/ with every component + its index.ts barrel
3. Create src/lib/m3/tokens.ts and src/lib/utils.ts (cn helper)
4. Add the M3 design-token CSS to my global stylesheet
5. Verify with a test page rendering <Button variant="filled">It works</Button>`;

const FILE_TREE = `your-project/
└─ src/
   ├─ components/
   │  └─ m3/              ← copy the whole folder (41 components + index.ts)
   │     ├─ Button.tsx
   │     ├─ Card.tsx
   │     ├─ Dialog.tsx
   │     └─ …
   ├─ lib/
   │  ├─ m3/
   │  │  └─ tokens.ts     ← springs · easings · shape · state-layer tokens
   │  └─ utils.ts         ← cn() (clsx + tailwind-merge)
   └─ app/
      └─ globals.css      ← paste the token CSS from step 03`;

const FONTS_HTML = `<!-- Roboto Flex (official M3E typeface) + Material Symbols Rounded (icon font) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&family=Material+Symbols+Rounded:opsz,wght,fill,grad@20..48,100..700,0..1,-50..200&display=block"
/>`;

const STARTER_CSS = `@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

/* M3 token roles → Tailwind utilities (bg-m3-primary, text-m3-on-surface, …) */
@theme inline {
  --color-m3-primary: var(--md-primary);
  --color-m3-on-primary: var(--md-on-primary);
  --color-m3-primary-container: var(--md-primary-container);
  --color-m3-on-primary-container: var(--md-on-primary-container);
  --color-m3-secondary: var(--md-secondary);
  --color-m3-on-secondary: var(--md-on-secondary);
  --color-m3-secondary-container: var(--md-secondary-container);
  --color-m3-on-secondary-container: var(--md-on-secondary-container);
  --color-m3-tertiary: var(--md-tertiary);
  --color-m3-on-tertiary: var(--md-on-tertiary);
  --color-m3-tertiary-container: var(--md-tertiary-container);
  --color-m3-on-tertiary-container: var(--md-on-tertiary-container);
  --color-m3-error: var(--md-error);
  --color-m3-on-error: var(--md-on-error);
  --color-m3-error-container: var(--md-error-container);
  --color-m3-on-error-container: var(--md-on-error-container);
  --color-m3-surface: var(--md-surface);
  --color-m3-on-surface: var(--md-on-surface);
  --color-m3-surface-variant: var(--md-surface-variant);
  --color-m3-on-surface-variant: var(--md-on-surface-variant);
  --color-m3-surface-dim: var(--md-surface-dim);
  --color-m3-surface-bright: var(--md-surface-bright);
  --color-m3-surface-container-lowest: var(--md-surface-container-lowest);
  --color-m3-surface-container-low: var(--md-surface-container-low);
  --color-m3-surface-container: var(--md-surface-container);
  --color-m3-surface-container-high: var(--md-surface-container-high);
  --color-m3-surface-container-highest: var(--md-surface-container-highest);
  --color-m3-outline: var(--md-outline);
  --color-m3-outline-variant: var(--md-outline-variant);
  --color-m3-inverse-surface: var(--md-inverse-surface);
  --color-m3-inverse-on-surface: var(--md-inverse-on-surface);
  --color-m3-inverse-primary: var(--md-inverse-primary);
  --color-m3-scrim: var(--md-scrim);

  /* M3 shape scale (rounded-m3-xs … rounded-m3-xxl) */
  --radius-m3-xs: 4px;
  --radius-m3-sm: 8px;
  --radius-m3-md: 12px;
  --radius-m3-lg: 16px;
  --radius-m3-lg-increased: 20px;
  --radius-m3-xl: 28px;
  --radius-m3-xxl: 36px;
}

/* ---- Baseline light scheme (M3 Expressive purple) ---- */
:root {
  --md-primary: #6750a4;
  --md-on-primary: #ffffff;
  --md-primary-container: #e9ddff;
  --md-on-primary-container: #22005d;
  --md-secondary: #625b71;
  --md-on-secondary: #ffffff;
  --md-secondary-container: #e8def8;
  --md-on-secondary-container: #1e192b;
  --md-tertiary: #7e5260;
  --md-on-tertiary: #ffffff;
  --md-tertiary-container: #ffd9e2;
  --md-on-tertiary-container: #31101d;
  --md-error: #b3261e;
  --md-on-error: #ffffff;
  --md-error-container: #f9dedc;
  --md-on-error-container: #410e0b;
  --md-surface: #fef7ff;
  --md-on-surface: #1d1b20;
  --md-surface-variant: #e7e0ec;
  --md-on-surface-variant: #49454f;
  --md-surface-dim: #ded8e1;
  --md-surface-bright: #fef7ff;
  --md-surface-container-lowest: #ffffff;
  --md-surface-container-low: #f7f2fa;
  --md-surface-container: #f3edf7;
  --md-surface-container-high: #ece6f0;
  --md-surface-container-highest: #e6e0e9;
  --md-outline: #79747e;
  --md-outline-variant: #cac4d0;
  --md-inverse-surface: #322f35;
  --md-inverse-on-surface: #f5eff7;
  --md-inverse-primary: #d0bcff;
  --md-scrim: #000000;
  color-scheme: light;
}

/* ---- Baseline dark scheme ---- */
.dark {
  --md-primary: #d0bcff;
  --md-on-primary: #381e72;
  --md-primary-container: #4f378b;
  --md-on-primary-container: #eaddff;
  --md-secondary: #ccc2dc;
  --md-on-secondary: #332d41;
  --md-secondary-container: #4a4458;
  --md-on-secondary-container: #e8def8;
  --md-tertiary: #efb8c8;
  --md-on-tertiary: #492532;
  --md-tertiary-container: #633b48;
  --md-on-tertiary-container: #ffd9e2;
  --md-error: #f2b8b5;
  --md-on-error: #601410;
  --md-error-container: #8c1d18;
  --md-on-error-container: #f9dedc;
  --md-surface: #141218;
  --md-on-surface: #e6e0e9;
  --md-surface-variant: #49454f;
  --md-on-surface-variant: #cac4d0;
  --md-surface-dim: #141218;
  --md-surface-bright: #3b383e;
  --md-surface-container-lowest: #0f0d13;
  --md-surface-container-low: #1d1b20;
  --md-surface-container: #211f26;
  --md-surface-container-high: #2b2930;
  --md-surface-container-highest: #36343b;
  --md-outline: #938f99;
  --md-outline-variant: #49454f;
  --md-inverse-surface: #e6e0e9;
  --md-inverse-on-surface: #322f35;
  --md-inverse-primary: #6750a4;
  --md-scrim: #000000;
  color-scheme: dark;
}

/* ---- State layer (hover/focus/press feedback) + focus ring ----
   Inside @layer base so Tailwind utilities can override position. */
@layer base {
  .m3-state { position: relative; }
  .m3-state::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: currentColor;
    opacity: 0;
    pointer-events: none;
    transition: opacity 150ms cubic-bezier(0.2, 0, 0, 1);
  }
  @media (hover: hover) {
    .m3-state:hover::after { opacity: 0.08; }
  }
  .m3-state:focus-visible::after,
  .m3-state[data-pressed="true"]::after { opacity: 0.10; }
  .m3-state:active::after { opacity: 0.10; }

  .m3-focus:focus-visible {
    outline: 3px solid var(--md-primary);
    outline-offset: 2px;
  }
}

/* ---- M3 type scale ---- */
.md-display-large  { font-size: 3.5625rem; line-height: 4rem; letter-spacing: -0.015rem; font-weight: 400; }
.md-display-medium { font-size: 2.8125rem; line-height: 3.25rem; font-weight: 400; }
.md-display-small  { font-size: 2.25rem; line-height: 2.75rem; font-weight: 400; }
.md-headline-large { font-size: 2rem; line-height: 2.5rem; font-weight: 400; }
.md-headline-medium{ font-size: 1.75rem; line-height: 2.25rem; font-weight: 400; }
.md-headline-small { font-size: 1.5rem; line-height: 2rem; font-weight: 400; }
.md-title-large    { font-size: 1.375rem; line-height: 1.75rem; font-weight: 400; }
.md-title-medium   { font-size: 1rem; line-height: 1.5rem; letter-spacing: 0.009rem; font-weight: 500; }
.md-title-small    { font-size: 0.875rem; line-height: 1.25rem; letter-spacing: 0.006rem; font-weight: 500; }
.md-body-large     { font-size: 1rem; line-height: 1.5rem; letter-spacing: 0.031rem; font-weight: 400; }
.md-body-medium    { font-size: 0.875rem; line-height: 1.25rem; letter-spacing: 0.017rem; font-weight: 400; }
.md-body-small     { font-size: 0.75rem; line-height: 1rem; letter-spacing: 0.025rem; font-weight: 400; }
.md-label-large    { font-size: 0.875rem; line-height: 1.25rem; letter-spacing: 0.006rem; font-weight: 500; }
.md-label-medium   { font-size: 0.75rem; line-height: 1rem; letter-spacing: 0.031rem; font-weight: 500; }
.md-label-small    { font-size: 0.6875rem; line-height: 1rem; letter-spacing: 0.031rem; font-weight: 500; }

/* ---- Elevation (dp levels 1–5) ---- */
.m3-elevation-1 { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.30), 0 1px 3px 1px rgb(0 0 0 / 0.15); }
.m3-elevation-2 { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.30), 0 2px 6px 2px rgb(0 0 0 / 0.15); }
.m3-elevation-3 { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.30), 0 4px 8px 3px rgb(0 0 0 / 0.15); }
.m3-elevation-4 { box-shadow: 0 2px 3px 0 rgb(0 0 0 / 0.30), 0 6px 10px 4px rgb(0 0 0 / 0.15); }
.m3-elevation-5 { box-shadow: 0 4px 4px 0 rgb(0 0 0 / 0.30), 0 8px 12px 6px rgb(0 0 0 / 0.15); }

/* ---- Material Symbols Rounded ---- */
.material-symbols-rounded {
  font-family: "Material Symbols Rounded";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  font-variation-settings: "FILL" var(--msr-fill, 0), "wght" var(--msr-wght, 400),
    "GRAD" var(--msr-grad, 0), "opsz" var(--msr-opsz, 24);
}
.msr-fill { --msr-fill: 1; }

/* ---- Ripple keyframes (used by the Ripple helper) ---- */
@keyframes m3-ripple-in  { from { transform: scale(0); opacity: 0.12; } to { transform: scale(1); opacity: 0.12; } }
@keyframes m3-ripple-out { from { transform: scale(1); opacity: 0.12; } to { transform: scale(1); opacity: 0; } }

/* ---- Thin token-aware scrollbars (optional, used by menus/lists) ---- */
.m3-scroll {
  scrollbar-width: thin;
  scrollbar-color: var(--md-outline-variant) transparent;
}
.m3-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
.m3-scroll::-webkit-scrollbar-thumb { background: var(--md-outline-variant); border-radius: 9999px; }`;

const FIRST_SNIPPET = `import { Button } from "@/components/m3";

export function Actions() {
  return (
    <div className="flex gap-2">
      <Button variant="filled" icon="save">Save changes</Button>
      <Button variant="tonal">Preview</Button>
      <Button variant="text">Cancel</Button>
    </div>
  );
}`;

const THEMING_SNIPPET = `<!-- Any color scheme is one attribute away -->
<html data-theme="ocean"> … </html>

<!-- Dark mode is one class away -->
<html class="dark"> … </html>

<!-- Both: -->
<html data-theme="coral" class="dark"> … </html>`;

const MOTION_SNIPPET = `import { motion } from "framer-motion";
import { springs } from "@/lib/m3/tokens";

// Physics, not durations — the M3E signature bounce
<motion.div
  animate={{ scale: 1.05 }}
  transition={springs.expressive}
/>`;

const ICON_SNIPPET = `import { MaterialSymbol } from "@/components/m3";

<MaterialSymbol icon="rocket_launch" size={24} />
<MaterialSymbol icon="favorite" fill size={24} className="text-m3-primary" />`;

/* ------------------------------------------------------------------ */
/* View                                                                */
/* ------------------------------------------------------------------ */

export function DocsView({ navigate }: { navigate: (r: Route) => void }) {
  const [tab, setTab] = React.useState<"install" | "start">("install");

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      {/* header */}
      <div className="md-label-large text-m3-primary">Documentation</div>
      <h1 className="mt-1 md-display-small font-semibold text-m3-on-surface">
        Install &amp; getting started
      </h1>
      <p className="mt-3 max-w-3xl md-body-large text-m3-on-surface-variant">
        ShadCN-style: install four dependencies, copy the source straight into your
        repo — manually or through an MCP-connected AI agent — paste one token
        stylesheet, and you&apos;re rendering Material 3 Expressive. No npm package, no
        black boxes: <strong className="text-m3-on-surface">you own the code</strong>.
      </p>

      {/* tabs */}
      <div className="mt-6">
        <SegmentedButton
          type="single"
          size="md"
          value={tab}
          onValueChange={(v) => {
            if (typeof v === "string" && v !== "") setTab(v as "install" | "start");
          }}
          options={[
            { value: "install", label: "Installation", icon: "download" },
            { value: "start", label: "Getting started", icon: "rocket_launch" },
          ]}
          aria-label="Documentation sections"
          className="whitespace-nowrap"
        />
      </div>

      <div className="mt-8">{tab === "install" ? <InstallTab navigate={navigate} /> : <StartTab navigate={navigate} />}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tab 1 — Installation                                                */
/* ------------------------------------------------------------------ */

function InstallTab({ navigate }: { navigate: (r: Route) => void }) {
  const [pm, setPm] = React.useState("npm");

  return (
    <div className="space-y-6">
      {/* philosophy strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { icon: "download", title: "1 · Install", body: "Four runtime deps: @base-ui-components/react, framer-motion, clsx, tailwind-merge." },
          { icon: "content_copy", title: "2 · Copy", body: "The source lands in your repo — by hand or via your AI agent." },
          { icon: "key", title: "3 · Own it", body: "No version lock. Fork, restyle, delete — it's your code." },
        ].map((s) => (
          <div key={s.title} className="flex gap-3 rounded-2xl bg-m3-surface-container-low p-4">
            <MaterialSymbol icon={s.icon} size={22} fill className="mt-0.5 shrink-0 text-m3-primary" />
            <div>
              <div className="md-title-medium text-m3-on-surface">{s.title}</div>
              <div className="mt-1 md-body-small text-m3-on-surface-variant">{s.body}</div>
            </div>
          </div>
        ))}
      </div>

      {/* prerequisites */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 md-label-medium text-m3-on-surface-variant">Prerequisites:</span>
        <Chip variant="assist" size="sm">React 18 / 19</Chip>
        <Chip variant="assist" size="sm">Tailwind CSS 4</Chip>
        <Chip variant="assist" size="sm">TypeScript 5 (recommended)</Chip>
        <Chip variant="assist" size="sm">Material Symbols font</Chip>
      </div>

      <Step num="01" title="Install dependencies" icon="download">
        <p className="mb-3 md-body-medium text-m3-on-surface-variant">
          One command, four packages. Everything else is source you copy in the next step.
        </p>
        <div className="mb-3">
          <SegmentedButton
            type="single"
            value={pm}
            onValueChange={(v) => {
              if (typeof v === "string" && v !== "") setPm(v);
            }}
            options={[
              { value: "bun", label: "bun" },
              { value: "npm", label: "npm" },
              { value: "pnpm", label: "pnpm" },
              { value: "yarn", label: "yarn" },
            ]}
            aria-label="Package manager"
          />
        </div>
        <CodeBlock language="bash" code={INSTALL_CMD[pm] ?? INSTALL_CMD.npm} />
        <div className="mt-3 flex gap-2.5 rounded-2xl bg-m3-surface-container-low p-4">
          <MaterialSymbol icon="info" size={18} className="mt-0.5 shrink-0 text-m3-primary" />
          <p className="md-body-small text-m3-on-surface-variant">
            <strong className="text-m3-on-surface">Tailwind CSS 4</strong> must already be set up —
            the components style themselves with token utilities like{" "}
            <code className="rounded bg-m3-surface-container-highest px-1 py-0.5 text-[12px]">bg-m3-primary</code> and{" "}
            <code className="rounded bg-m3-surface-container-highest px-1 py-0.5 text-[12px]">rounded-m3-lg</code>,
            which the token CSS in step 03 registers as real Tailwind utilities.
          </p>
        </div>
      </Step>

      <Step num="02" title="Add the source — copy, don&apos;t install" icon="content_copy">
        <p className="mb-4 md-body-medium text-m3-on-surface-variant">
          Two routes to the same result. Pick whichever fits your workflow.
        </p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Option A — MCP agent */}
          <div className="flex flex-col rounded-2xl border border-m3-outline-variant bg-m3-surface-container-lowest p-5">
            <div className="mb-2 flex items-center gap-2 md-title-medium text-m3-on-surface">
              <MaterialSymbol icon="smart_toy" size={20} fill className="text-m3-primary" />
              Option A · AI agent via MCP
              <Chip variant="assist" size="xs" className="ml-auto">Recommended</Chip>
            </div>
            <p className="mb-3 md-body-small text-m3-on-surface-variant">
              Wire the MCP server once, then paste a single prompt — the agent
              scaffolds every file in the right place.
            </p>
            <div className="mt-auto">
              <CodeBlock language="text" code={MCP_PROMPT} />
              <Button
                variant="tonal"
                size="sm"
                icon="open_in_new"
                className="mt-3"
                onClick={() => navigate({ kind: "agents" })}
              >
                Full MCP setup
              </Button>
            </div>
          </div>
          {/* Option B — manual */}
          <div className="flex flex-col rounded-2xl border border-m3-outline-variant bg-m3-surface-container-lowest p-5">
            <div className="mb-2 flex items-center gap-2 md-title-medium text-m3-on-surface">
              <MaterialSymbol icon="folder_copy" size={20} fill className="text-m3-primary" />
              Option B · Copy manually
            </div>
            <p className="mb-3 md-body-small text-m3-on-surface-variant">
              Copy the component folder plus two lib files. That&apos;s the whole
              install — there is nothing else hiding in node_modules.
            </p>
            <div className="mb-3 flex items-start gap-2 rounded-xl bg-m3-surface-container p-3">
              <MaterialSymbol icon="visibility" size={18} className="mt-0.5 shrink-0 text-m3-primary" />
              <p className="md-body-small text-m3-on-surface-variant">
                Every component page has a{" "}
                <strong className="text-m3-on-surface">Source code</strong> tab with the complete
                file — preview it in the browser and copy it in one click.{" "}
                <button
                  onClick={() => navigate({ kind: "component", id: "button" })}
                  className="m3-focus rounded-full text-m3-primary underline underline-offset-2 hover:opacity-80"
                >
                  Preview Button.tsx →
                </button>
              </p>
            </div>
            <div className="mt-auto">
              <CodeBlock language="text" code={FILE_TREE} />
            </div>
          </div>
        </div>
      </Step>

      <Step num="03" title="Paste the design tokens" icon="palette">
        <p className="mb-3 md-body-medium text-m3-on-surface-variant">
          Drop this into your global stylesheet (e.g.{" "}
          <code className="rounded bg-m3-surface-container-highest px-1 py-0.5 text-[12px]">app/globals.css</code>).
          It registers every color role, the shape scale, the type scale, state
          layers and elevation as real Tailwind utilities — the components won&apos;t
          render correctly without it.
        </p>
        <CodeBlock language="css" code={STARTER_CSS} />
        <div className="mt-3 flex gap-2.5 rounded-2xl bg-m3-surface-container-low p-4">
          <MaterialSymbol icon="auto_awesome" size={18} className="mt-0.5 shrink-0 text-m3-primary" />
          <p className="md-body-small text-m3-on-surface-variant">
            This is the baseline purple scheme. Curated palettes (Ocean Blue,
            Emerald Fresh, Warm Coral) and the seed-color Theme Builder live on the{" "}
            <button onClick={() => navigate({ kind: "foundations" })} className="m3-state rounded px-0.5 font-medium text-m3-primary">
              Design foundations
            </button>{" "}
            page — they&apos;re drop-in <code className="rounded bg-m3-surface-container-highest px-1 py-0.5 text-[12px]">[data-theme]</code> blocks.
          </p>
        </div>
      </Step>

      <Step num="04" title="Load the fonts" icon="text_fields">
        <p className="mb-3 md-body-medium text-m3-on-surface-variant">
          Add to your app&apos;s <code className="rounded bg-m3-surface-container-highest px-1 py-0.5 text-[12px]">&lt;head&gt;</code>{" "}
          (layout.tsx / index.html). Roboto Flex is the official M3E typeface;
          Material Symbols Rounded powers every icon in the library.
        </p>
        <CodeBlock language="html" code={FONTS_HTML} />
        <p className="mt-3 md-body-small text-m3-on-surface-variant">
          Prefers self-hosting? This docs site serves both fonts from{" "}
          <code className="rounded bg-m3-surface-container-highest px-1 py-0.5 text-[12px]">/public/fonts</code>{" "}
          with a local <code className="rounded bg-m3-surface-container-highest px-1 py-0.5 text-[12px]">fonts.css</code> —
          copy those woff2 files and swap the CDN links for zero network dependency.
        </p>
      </Step>

      <Step num="05" title="Verify" icon="task_alt">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <div>
            <p className="mb-3 md-body-medium text-m3-on-surface-variant">
              Render one button. Hover it — a correct install morphs the corner
              radius with spring physics and shows a state layer. That&apos;s M3
              Expressive, live in your app.
            </p>
            <CodeBlock language="tsx" code={`import { Button } from "@/components/m3";

<Button variant="filled" icon="rocket_launch">
  It works
</Button>`} />
          </div>
          {/* live mirror */}
          <div
            className="flex min-h-[180px] items-center justify-center rounded-2xl"
            style={{
              backgroundImage: "radial-gradient(var(--md-outline-variant) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          >
            <Button variant="filled" icon="rocket_launch" onClick={() => navigate({ kind: "component", id: "button" })}>
              It works
            </Button>
          </div>
        </div>
      </Step>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tab 2 — Getting started                                             */
/* ------------------------------------------------------------------ */

function StartTab({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="space-y-6">
      <Step num="✦" title="Your first component" icon="hand_gesture">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          {/* live mirror */}
          <div
            className="flex min-h-[150px] flex-wrap items-center justify-center gap-3 rounded-2xl p-4"
            style={{
              backgroundImage: "radial-gradient(var(--md-outline-variant) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          >
            <Button variant="filled" icon="save">Save changes</Button>
            <Button variant="tonal">Preview</Button>
            <Button variant="text">Cancel</Button>
          </div>
          <div>
            <p className="mb-3 md-body-medium text-m3-on-surface-variant">
              Every component is a plain React function — no providers, no config.
              Import from the barrel and go.
            </p>
            <CodeBlock language="tsx" code={FIRST_SNIPPET} />
          </div>
        </div>
      </Step>

      <Step num="✦" title="Theme it in 10 seconds" icon="palette">
        <p className="mb-3 md-body-medium text-m3-on-surface-variant">
          Color roles are CSS variables. Any palette applies to the whole page —
          or any subtree — with a single attribute, and dark mode is one class.
          These four cards are live: same components, different tokens.
        </p>
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ThemeProbe label="Baseline" />
          <ThemeProbe label="Dark" dark />
          <ThemeProbe label="Ocean Blue" theme="ocean" />
          <ThemeProbe label="Warm Coral" theme="coral" />
        </div>
        <CodeBlock language="html" code={THEMING_SNIPPET} />
      </Step>

      <Step num="✦" title="Motion with physics" icon="animation">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
          <div>
            <p className="mb-3 md-body-medium text-m3-on-surface-variant">
              M3 Expressive&apos;s signature is spring-based motion. The tokens file
              exports tuned springs —{" "}
              <code className="rounded bg-m3-surface-container-highest px-1 py-0.5 text-[12px]">expressive</code>{" "}
              is the playful one with real overshoot.
            </p>
            <CodeBlock language="tsx" code={MOTION_SNIPPET} />
          </div>
          <SpringDemo />
        </div>
      </Step>

      <Step num="✦" title="Icons" icon="interests">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
          <div>
            <p className="mb-3 md-body-medium text-m3-on-surface-variant">
              Icons are strings mapped to Material Symbols Rounded — no icon
              package, no tree-shaking gymnastics. The variable font supports
              fill, weight and grade axes.
            </p>
            <CodeBlock language="tsx" code={ICON_SNIPPET} />
          </div>
          <div className="flex min-h-[110px] flex-wrap items-center justify-center gap-5 rounded-2xl bg-m3-surface-container-low p-4">
            {["rocket_launch", "favorite", "bookmark", "explore", "music_note"].map((ic, i) => (
              <MaterialSymbol key={ic} icon={ic} size={28} fill={i % 2 === 0} className="text-m3-primary" />
            ))}
          </div>
        </div>
      </Step>

      <Step num="✦" title="Where to next" icon="near_me">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card variant="filled" interactive onClick={() => navigate({ kind: "component", id: "button" })} className="p-5">
            <MaterialSymbol icon="grid_view" size={24} fill className="text-m3-primary" />
            <div className="mt-2 md-title-medium text-m3-on-surface">Browse components</div>
            <div className="mt-1 md-body-small text-m3-on-surface-variant">
              41 components, each with a live playground and copy-ready code.
            </div>
          </Card>
          <Card variant="filled" interactive onClick={() => navigate({ kind: "foundations" })} className="p-5">
            <MaterialSymbol icon="palette" size={24} fill className="text-m3-primary" />
            <div className="mt-2 md-title-medium text-m3-on-surface">Design foundations</div>
            <div className="mt-1 md-body-small text-m3-on-surface-variant">
              Color schemes, the Theme Builder, type scale and motion tokens.
            </div>
          </Card>
          <Card variant="filled" interactive onClick={() => navigate({ kind: "agents" })} className="p-5">
            <MaterialSymbol icon="smart_toy" size={24} fill className="text-m3-primary" />
            <div className="mt-2 md-title-medium text-m3-on-surface">Agent API</div>
            <div className="mt-1 md-body-small text-m3-on-surface-variant">
              MCP server, registry endpoints and llms.txt so AI agents build with this too.
            </div>
          </Card>
        </div>
      </Step>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

function Step({
  num,
  title,
  icon,
  children,
}: {
  num: string;
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-m3-outline-variant bg-m3-surface-container-lowest p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-m3-primary-container px-2 md-label-large text-m3-on-primary-container">
          {num}
        </span>
        <h2 className="flex items-center gap-2 md-title-large text-m3-on-surface">
          {title}
        </h2>
        <MaterialSymbol icon={icon} size={20} className="ml-auto text-m3-on-surface-variant" />
      </div>
      {children}
    </section>
  );
}

/** Small live card that renders the same UI under a different token scope. */
function ThemeProbe({ label, theme, dark }: { label: string; theme?: string; dark?: boolean }) {
  const [on, setOn] = React.useState(true);
  return (
    <div
      data-theme={theme}
      className={`${dark ? "dark " : ""}rounded-2xl border border-m3-outline-variant bg-m3-surface-container-low p-4 text-m3-on-surface`}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="md-label-medium text-m3-on-surface-variant">{label}</span>
        <span className="h-4 w-4 rounded-full bg-m3-primary" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="filled" size="xs">Action</Button>
        <Switch checked={on} onCheckedChange={setOn} />
        <Chip variant="assist" size="xs">chip</Chip>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-m3-secondary-container">
        <div className="h-full w-2/3 rounded-full bg-m3-primary" />
      </div>
    </div>
  );
}

/** Clickable spring-physics demo for the motion step. */
function SpringDemo() {
  const [go, setGo] = React.useState(false);
  return (
    <button
      onClick={() => setGo((g) => !g)}
      className="m3-state m3-focus flex min-h-[110px] w-full cursor-pointer items-center justify-center rounded-2xl bg-m3-surface-container-low"
      aria-pressed={go}
      aria-label="Toggle spring animation demo"
    >
      <motion.div
        className="flex h-14 w-14 items-center justify-center rounded-[30%] bg-m3-primary text-m3-on-primary"
        animate={{
          scale: go ? 1.25 : 1,
          rotate: go ? 90 : 0,
          borderRadius: go ? "50%" : "30%",
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 380, damping: 11 }}
      >
        <MaterialSymbol icon={go ? "check" : "play_arrow"} size={26} fill />
      </motion.div>
      <span className="ml-4 md-label-large text-m3-on-surface-variant">Tap me — real springs</span>
    </button>
  );
}
