# Contributing

Thanks for considering a contribution. This repo is a component library with a strict spec contract — read this before opening a PR.

## Prerequisites

- [Bun](https://bun.sh) 1.4+ (runtime + package manager)
- Node 22+ (for tooling that expects it)

## Setup

```bash
bun install
bun run dev   # showcase app on http://localhost:3000
```

## The component contract

Every component in `src/components/m3/` follows a mandatory contract: named-export `forwardRef`, metadata in `src/lib/m3/meta.ts`, registration in `src/lib/m3/registry.ts`, barrel re-export, and a matching demo in `src/components/showcase/demos/`. The full rules (including the Base UI primitive policy and token-driven styling rules) are in [AGENTS.md](AGENTS.md) — **read the "Component contract" section before adding or changing components.**

Visual behavior that looks wrong may be spec-mandated: check the matching file in [`audit/`](audit/) before "fixing" it.

## Verification gates

All four must pass locally before a PR (CI runs the same):

1. `bun run lint` → 0 errors
2. `bunx tsc --noEmit` → no errors in `src/` or `scripts/`
3. `bun run build:package` → succeeds
4. `bun run vr:check` → no component in `changed` status (needs the dev server on :3000; refresh a baseline only with `--force` and explain why in the PR)

## Style

- TypeScript strict; token-driven styling (never hardcode colors/motion — use `@/lib/m3/tokens`)
- Material 3 fidelity beats personal taste; cite the m3.material.io section when proposing a deviation
- Keep `exampleCode` in every component's metadata runnable as-is — agents and docs both depend on it

## PRs

Small, focused PRs with the gates green. Describe what changed and why; for visual changes include before/after notes or a VR baseline refresh rationale.
