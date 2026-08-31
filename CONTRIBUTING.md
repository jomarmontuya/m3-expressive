# Contributing

## Set up

```bash
bun install --frozen-lockfile
bun run dev
```

The catalog runs at `http://localhost:3000`.

## Before you change a component

1. Read its record in `src/lib/m3/meta.ts`.
2. Read the matching evidence in `docs/material-compliance.md`.
3. Check the current Material page linked by `spec.materialUrl` when the behavior is unclear.
4. Keep intentional deviations explicit in `spec.deviations`.

## Component contract

Every public component must:

1. Live in `src/components/m3/` and start with `"use client"`.
2. Use a named `forwardRef` export.
3. Have metadata in `src/lib/m3/meta.ts`.
4. Be registered in `src/lib/m3/registry.ts`.
5. Have a live demo in `src/components/showcase/demos/`.
6. Be generated into `registry.json` by `bun run registry:build`.

Use M3 token classes and helpers. Do not add shadcn or Radix component scaffolding inside `src/components/m3/`.

## Required checks

```bash
bun run registry:build
bun run lint
bunx tsc --noEmit
bun run registry:check
bun run registry:validate
bun run registry:smoke
bun run build
```

Also open the changed component page at desktop and mobile sizes. Check its interactive, disabled, focus, dark, and right-to-left states when they apply.

Do not edit `registry.json` by hand. Change component source or `scripts/build-registry.ts`, then rebuild it.

## Pull requests

Keep each pull request focused. Explain the Material source used, the behavior changed, the checks run, and any state that was not verified.
