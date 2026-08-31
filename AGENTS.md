# AGENTS.md — m3-expressive

## Purpose

This repository ships 41 Material 3 and Material 3 Expressive React components through a GitHub-hosted shadcn registry. It also contains the Next.js catalog used to inspect the components.

The supported beta surface is:

- `registry.json`
- `src/components/m3/`
- `src/lib/m3/`
- the Next.js catalog in `src/`
- `docs/material-compliance.md`

`mcp-server/` is unreleased and unsupported. Do not advertise it, add it to release checks, or change it unless the task explicitly targets future MCP work.

## Source chain

```text
src/lib/m3/meta.ts       component API and Material evidence
src/lib/m3/tokens.ts     motion, shape, state, and type tokens
src/lib/m3/themes.ts     baseline and curated color schemes
src/lib/m3/registry.ts   41-component catalog
        |
        +-- src/components/showcase/  live docs and demos
        +-- scripts/build-registry.ts shadcn registry generator
        +-- registry.json             public release artifact
        +-- src/lib/m3/component-sources.generated.ts catalog source-code data
```

## Commands

| Task | Command |
|---|---|
| Dev server | `bun run dev` |
| Lint | `bun run lint` |
| Typecheck | `bunx tsc --noEmit` |
| Build registry | `bun run registry:build` |
| Check registry contract | `bun run registry:check` |
| Validate shadcn schema | `bun run registry:validate` |
| Test a clean consumer | `bun run registry:smoke` |
| Build catalog | `bun run build` |

## Component contract

Every file in `src/components/m3/` must:

1. Start with `"use client"`.
2. Export the component as a named `forwardRef` export.
3. Have an `M3ComponentMeta` record in `src/lib/m3/meta.ts`.
4. Be listed in `src/lib/m3/registry.ts`.
5. Have a demo in the matching `src/components/showcase/demos/` file and demo map.
6. Use direct local imports in documentation examples.

The public registry adds shared files through `m3-base`. Do not export showcase metadata from installable component files.

## Styling

Use:

- M3 colors through `bg-m3-*`, `text-m3-*`, and `border-m3-*`
- M3 type through `md-*`
- motion from `src/lib/m3/tokens.ts`
- `.m3-state`, `.m3-focus`, and `.m3-elevation-*`
- `Ripple` and `MaterialSymbol`

Do not add hardcoded replacement tokens or shadcn/Radix component scaffolding inside `src/components/m3/`.

Base UI is `@base-ui/react` `1.7.x`. Components without a matching Base UI primitive can stay custom. Base UI portals inherit M3 variables from `:root`, `[data-theme]`, and `.dark`, but ancestor-only selectors do not cross the portal.

Framer Motion transition values sometimes need a local `Transition` cast because token spring `type` values widen to `string`. Do not change the shared token shape only to satisfy one component.

## Material evidence

Before changing visual or behavioral rules:

1. Read the component record in `src/lib/m3/meta.ts`.
2. Read `docs/material-compliance.md`.
3. Use the linked Material page and listed reference implementations.
4. Keep known deviations in `spec.deviations`.

Do not describe an approximation or extension as exact Material behavior.

## Registry release rules

- Version target: `0.1.0-beta.1` / `v0.1.0-beta.1`.
- Run `bun run registry:build`; do not edit `registry.json` by hand.
- Every component depends on `jomarmontuya/m3-expressive/m3-base#v0.1.0-beta.1`.
- Cross-component dependencies must use the full GitHub item address and the same tag.
- The supported install form is `bunx shadcn@latest add jomarmontuya/m3-expressive/<id>#v0.1.0-beta.1`.
- Do not publish an npm package or present MCP as released.

## Verification

Before declaring release work complete, run all six checks listed in the command table after `Dev server`. The registry smoke check must install all 41 components into a clean temporary app and pass both TypeScript and the production build.

For a visual change, also inspect the live component page at desktop and mobile sizes. Automated registry checks do not prove visual compliance.
