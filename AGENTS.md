# AGENTS.md — m3-expressive

Guidance for AI coding agents working in this repository. Read this before touching `src/`.

## What this repo is

A **Material 3 Expressive React component library** plus everything that ships around it:

- `packages/m3-expressive-react/` — the publishable npm package (`m3-expressive-react`)
- `src/` — a Next.js 16 showcase/docs app that renders all 41 registered components
- `mini-services/mcp-server/` — an MCP server exposing the library to AI agents (stdio + HTTP)
- `src/app/llms.txt/route.ts` — an `/llms.txt` agent handbook route

**Stack:** Bun (runtime + package manager) · Next.js 16 App Router · React 19 · TypeScript strict · Tailwind 4 · framer-motion 12 · `@base-ui-components/react` 1.0.0-rc.0.

**Path alias:** `@/*` → `./src/*`.

## Source-of-truth chain

One data source feeds every surface. A change to component metadata propagates everywhere — keep the chain consistent:

```
src/lib/m3/meta.ts        structured M3ComponentMeta per component (id, props, variants, guidelines, exampleCode, demoName)
src/lib/m3/tokens.ts      springs, easings, durations, shapes, state-layer opacities, type scale
src/lib/m3/themes.ts      4 curated color schemes
src/lib/m3/theme-builder.ts  Dynamic Color engine (seed color → full light+dark scheme)
        │
        ▼
src/lib/m3/registry.ts    TABLE: id → { meta, file } for all 41 components
        │
        ├─▶ src/components/showcase/    docs UI (demo-registry.ts maps id → demo component)
        ├─▶ src/app/api/registry, /api/agent, /api/component-source, /api/theme-builder
        ├─▶ src/app/llms.txt/route.ts   agent handbook
        ├─▶ mini-services/mcp-server/   imports src/lib/m3/* directly (14 tools, 6 resources, 3 prompts)
        └─▶ packages/m3-expressive-react/  published npm package
```

## Commands

| Task | Command |
|---|---|
| Dev server (port 3000, logs to `dev.log`) | `bun run dev` |
| Lint | `bun run lint` |
| Typecheck (repo) | `bunx tsc --noEmit` |
| Typecheck (npm package) | `cd packages/m3-expressive-react && bun run typecheck` |
| Build npm package | `bun run build:package` |
| VR baseline capture | `bun run vr:baseline` (add `--only id1,id2` / `--force`) |
| VR diff check | `bun run vr:check` |
| MCP server (HTTP, port 3210) | `cd mini-services/mcp-server && bun install && bun run dev` |
| MCP server (stdio, what clients spawn) | `cd mini-services/mcp-server && bun start` |

## Component contract (mandatory)

Every component file in `src/components/m3/` must:

1. Start with `'use client'` (line 1).
2. Export the component as a **named export**, `forwardRef`.
3. Have a `<id>Meta: M3ComponentMeta` defined in `src/lib/m3/meta.ts` (id, category, description, importLine, variants, props, guidelines, exampleCode, `m3e` flag, `demoName`).
4. Be registered in the `TABLE` in `src/lib/m3/registry.ts`.
5. Be re-exported from the barrel `src/components/m3/index.ts`.
6. Have a `<Name>Demo` in the matching `src/components/showcase/demos/<category>-demos.tsx` (categories: actions, communication→feedback, containment, inputs, navigation) plus an entry in that batch's demo map (`meta.demoName` must resolve through `src/components/showcase/demo-registry.ts`).

**Forbidden inside `src/components/m3/**`:** re-introducing shadcn/Radix scaffolding (the old `src/components/ui/` set was removed as dead code). Use Base UI primitives, framer-motion, `Ripple`, and `MaterialSymbol` only.

**Styling rules:** token-driven, not hardcoded. Springs/easings/durations from `@/lib/m3/tokens`; colors via Tailwind M3 classes (`bg-m3-*`, `text-m3-*`, `border-m3-*`); type via `md-*` classes; state layers `.m3-state`; focus `.m3-focus`; elevation `.m3-elevation-*`.

### Known gotchas

- **framer-motion 12 vs. token springs:** `tokens.ts` springs widen `type` to `string`, so `transition={springs.x}` fails typecheck. Fix per-file without touching `tokens.ts`: `const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };` (or a local `asTransition` helper). Never pass `easings.*` cubic-bezier strings as framer `ease` — use named easings or cast.
- **Base UI is 1.0.0-rc.0.** 31 of 41 components sit on it; 10 are custom-by-design and each carries a documented "no Base UI primitive in v1.0.0-rc.0" comment. Don't migrate the custom ones until Base UI ships the missing primitives (Badge, DatePicker/TimePicker, NavigationBar/Rail, …).
- **Base UI portals to `<body>`.** `--md-*` CSS vars cascade from `:root`/`[data-theme]`/`.dark`, so token styling still works — but any selector that assumes DOM ancestry inside `.m3-*` containers will not cross a portal.
- **`next.config.ts` sets `typescript.ignoreBuildErrors: true`** — `next build` will NOT catch type errors. Always run `bunx tsc --noEmit` yourself.

## Verification gates

CI (`.github/workflows/ci.yml`) runs these on every push/PR — pass all four locally before declaring done:

1. `bun run lint` → 0 errors (one known pre-existing warning in `src/app/layout.tsx`).
2. `bunx tsc --noEmit` → no errors.
3. `bun run build:package` → succeeds.
4. `bun run vr:check` → no component in `changed` status. Requires the dev server running on `:3000` first (`bun run dev` in the background).

## Workflows

### Add a component

1. Write the meta in `src/lib/m3/meta.ts`.
2. Write `src/components/m3/<Name>.tsx` following the contract above. Copy `Button.tsx` as the reference pattern.
3. Register in `src/lib/m3/registry.ts` (`TABLE`) and export from `src/components/m3/index.ts`.
4. Add `<Name>Demo` + demo-map entry in the right `demos/<category>-demos.tsx`.
5. Verify: tsc → lint → dev server → `bun run vr:baseline` (captures the new baseline PNG) → `bun run vr:check` passes.

### Change a component visually

1. Edit the component.
2. Verify: tsc → lint → eyeball `http://localhost:3000/#/component/<id>` → `bun run vr:check`.
3. If the diff is intended, refresh that baseline: `bun scripts/vr-capture.ts --only <id> --force`, then re-run `vr:check`.
4. If a demo gains a perpetual animation, add its id to `KNOWN_ANIMATED` in `scripts/vr-lib.ts` (its diff gets capped at `minor` and can't fail the run) and note it in `worklog.md`.

### Publish the npm package

Follow `packages/m3-expressive-react/PUBLISHING.md` exactly. Highlights: version must be synced in **four places** (package.json, `src/app/api/agent/route.ts`, `src/app/llms.txt/route.ts`, homepage hero copy) and publishing happens from a clean checkout.

### Work on the MCP server

`mini-services/mcp-server/index.ts` imports `src/lib/m3/*` directly — no data duplication to maintain, but any metadata shape change hits the server too. Verify via `curl http://localhost:3210/` (health) and the JSON-RPC recipes in `mini-services/mcp-server/README.md`.

## Conventions

- **`worklog.md` is append-only.** Every task appends a block: `Task ID` / `Agent` / `Task` / `Work Log` / `Stage Summary`. Never rewrite or truncate existing entries; append at the end.
- **`audit/`** holds per-family M3 spec audit docs (spec vs. implementation vs. deviations). Consult the matching audit file before "fixing" a component's visual behavior — apparent oddities are often spec-mandated.
- **`tool-results/`** holds committed VR baselines (`vr-baselines/`), current captures (`vr-current/`), and `vr-report.json`. Baselines are never overwritten without `--force`.
- **Removed as dead code (2026-08):** Prisma scaffold, shadcn `src/components/ui/` set, `examples/`, `tests/`, `.zscripts/`, `tailwind.config.ts`, `components.json`, plus 57 unused dependencies.
- Component count references drift across docs (39/40/41 as the library grew). The registry `TABLE` in `src/lib/m3/registry.ts` is the current truth: **41**.
