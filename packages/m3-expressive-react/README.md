# m3-expressive-react

**Material 3 Expressive for React — 40 spec-audited components, official M3 design tokens, physics-based spring motion, and agentic-compatible metadata.**

Built against the official [Material 3](https://m3.material.io) and [M3 Expressive](https://m3.material.io/blog/material-3-expressive) specifications: correct color roles, shape scale, state layers, elevation, and the signature bouncy M3E springs — with structured per-component metadata (`M3ComponentMeta`) so AI coding agents can use the library without guessing.

## Features

- **40 components, spec-audited** — actions (Button, FAB, SplitButton…), communication (Badge, Snackbar, Tooltip…), containment (Card, Dialog, BottomSheet, SideSheet…), selection (Checkbox, Switch, Slider, Chips…), text input (TextField, SearchBar, SearchView, Autocomplete…), and navigation (Tabs, NavigationBar/Rail/Drawer, TopAppBar/BottomAppBar, Menu, DatePicker, TimePicker…).
- **M3 Expressive motion** — every animation is a tokenized physics spring (`springs.expressive` is the signature bouncy one), plus shape-morph transitions.
- **Full token system** — all 34 M3 color roles as `--md-*` CSS variables, Roboto Flex typography, M3 shape scale, elevation dp levels, official hover/focus/pressed state-layer opacities.
- **Dark / light + 4 curated themes** — baseline violet, Ocean Blue, Emerald Fresh, Warm Coral; switch via `data-theme` attribute + `.dark` class, no flash-of-wrong-theme.
- **Theme Builder engine** — generate a complete light+dark scheme from any seed color with Google's official `@material/material-color-utilities` (7 variants, contrast control) — in-app or server-side.
- **Agentic-compatible metadata** — every component ships structured metadata (props, variants, anatomy, guidelines, states, example code) exposed via the `registry` subpath export, an `/llms.txt` handbook, and an MCP server in the repo.

## Install

```bash
npm i m3-expressive-react
# or: pnpm add m3-expressive-react / bun add m3-expressive-react
```

Peer dependencies: `react >=18 <20`, `react-dom >=18 <20`, `framer-motion >=11 <13`.

## Quick start

```tsx
import { Button } from "m3-expressive-react";
import "m3-expressive-react/styles.css";

export function Actions() {
  return (
    <Button variant="filled" icon="edit" onClick={() => console.log("hey")}>
      Create
    </Button>
  );
}
```

`styles.css` is a standalone, Tailwind-free token + primitive layer: all `--md-*` color roles (light default, dark via `.dark`), the four curated `[data-theme=…]` schemes, the M3 type scale (`.md-*`), state layer (`.m3-state`), focus ring (`.m3-focus`), elevation (`.m3-elevation-1…5`), ripple keyframes, scrollbar styling, and the Material Symbols icon font.

## Tailwind 4 integration (required for full component styling)

Components style themselves with Tailwind utility classes mapped onto M3 tokens (`bg-m3-primary`, `text-m3-on-surface-variant`, `rounded-m3-xs`, …). If your app uses **Tailwind CSS 4**, generate those utilities by adding the package as a source and the token→theme mapping to your main CSS file:

```css
@import "tailwindcss";

/* 1. Scan the library's compiled output for class names */
@source "../node_modules/m3-expressive-react";

/* 2. Map M3 tokens into the Tailwind theme (colors + shape scale) */
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
  --color-m3-shadow: var(--md-shadow);

  --radius-m3-xs: 4px;
  --radius-m3-sm: 8px;
  --radius-m3-md: 12px;
  --radius-m3-lg: 16px;
  --radius-m3-lg-increased: 20px;
  --radius-m3-xl: 28px;
  --radius-m3-xxl: 36px;
}
```

Then import `m3-expressive-react/styles.css` too (it defines the `--md-*` variables the mapping reads). **Without Tailwind 4, components will render unstyled layouts** — the token layer loads, but the internal utility classes won't exist. Tailwind 4 is currently a practical requirement of this release.

## Theming

Color scheme and light/dark mode are two independent axes, applied to `<html>` exactly like the source design system:

- **Dark mode** → the `.dark` class on `<html>` (`html[data-theme="dark"]` also works for the baseline scheme).
- **Color scheme** → the `data-theme` attribute on `<html>`: remove it for baseline violet, or set `data-theme="ocean" | "emerald" | "coral"`.
- **Custom schemes** → generate from a seed with the `theme-builder` subpath (server-safe, no DOM) or drive it from React with the `hooks` subpath, which persists and applies a scheme as `data-theme="custom"` with generated variable blocks:

```tsx
"use client";
import { useM3Theme } from "m3-expressive-react/hooks";
import { generateScheme, schemeToCssVars } from "m3-expressive-react/theme-builder";

const scheme = generateScheme("#FF5C8A", "vibrant", 0); // seed, variant, contrast 0–1
const { lightBlock, darkBlock } = schemeToCssVars(scheme);
```

All four curated schemes (baseline violet, ocean, emerald, coral) are also available as data via `m3-expressive-react/themes` (`m3Themes`, `getTheme`, `schemeToCssVars`), and motion/shape/state tokens via `m3-expressive-react/tokens` (`springs`, `easings`, `durations`, `shapes`, `elevations`, `typeScale`, `colorRoles`).

## Agentic compatibility

This library is designed to be used by AI coding agents:

- **`M3ComponentMeta`** — every component exports a metadata object (40 in `m3-expressive-react/meta`) with id, category, variants, documented props, anatomy, states, do/don't guidelines, and a realistic example. Types live in `m3-expressive-react/types`.
- **Registry** — `m3-expressive-react/registry` exposes `m3Registry`, `getComponent(id)`, `searchComponents(q)` and `getComponentsByCategory(cat)` (isomorphic, no React needed).
- **MCP server** — a 14-tool Model Context Protocol server (list/get/search components, guidelines, examples, themes, tokens, motion + accessibility guidance, `generate_theme`) ships in the repo: [`mini-services/mcp-server`](https://github.com/…/m3-expressive-react/tree/main/mini-services/mcp-server).
- **`/llms.txt` + `/api/agent`** — the companion docs app exposes an llms.txt handbook, a machine-readable registry (`/api/registry`), and an agent manifest (`/api/agent`).

## Subpath exports

| Import | Contents |
| --- | --- |
| `m3-expressive-react` | Barrel: all components + primitives + token/registry/types/themes re-exports |
| `m3-expressive-react/styles.css` | Standalone token + primitive stylesheet |
| `m3-expressive-react/tokens` | Motion springs, easings, durations, shape, state, type, color tokens |
| `m3-expressive-react/types` | `M3ComponentMeta`, category, registry contract types |
| `m3-expressive-react/meta` | All 40 `M3ComponentMeta` objects |
| `m3-expressive-react/themes` | Curated theme data + CSS variable helpers |
| `m3-expressive-react/theme-builder` | Seed → full light/dark scheme engine (`@material/material-color-utilities`) |
| `m3-expressive-react/registry` | Component registry + search helpers |
| `m3-expressive-react/hooks` | `useM3Theme` — curated + custom scheme & dark-mode controller |

ESM + CJS builds with TypeScript declarations and sourcemaps. Components are client components (`"use client"` preserved in the dist output) — usable in Next.js App Router client trees and any React 18/19 SPA.

## License

[MIT](./LICENSE) © 2025 m3-expressive-react contributors
