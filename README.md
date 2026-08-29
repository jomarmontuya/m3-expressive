# m3-expressive

**Material 3 Expressive for React — the design system Google never shipped to the web.**

41 spec-audited components, the official M3 token system, physics-based spring motion, a Dynamic Color theming engine, and structured metadata so AI coding agents use the library without guessing.

Google's own statement: _"Material 3 Expressive is not implemented on Web"_ — their web-components library is in maintenance mode. This project fills that gap: full M3 Expressive for React 19, built on [Base UI](https://base-ui.com/) and Tailwind CSS 4.

This is an independent community project. It is not affiliated with or endorsed by Google.

## Why this exists

- **The gap** — no official or established M3 Expressive implementation exists for the web (see [Material Design 3 for Web](https://m3.material.io/develop/web)). Every component here is audited against the [m3.material.io](https://m3.material.io) spec; deviations are documented in the [tracked compliance report](audit/compliance-2026-08-29.md).
- **Agent-first** — every component ships structured metadata (`M3ComponentMeta`: props, variants, anatomy, guidelines, states, example code), a generated [`/llms.txt`](https://llmstxt.org/) handbook, and an MCP server (14 tools). Coding agents get it right on the first try — no prop guessing.
- **Ownable like shadcn, versioned like a package** — consume the [npm package](https://www.npmjs.com/package/m3-expressive-react) for semver updates, or copy the component source into your repo shadcn-style via the registry. See the [GitHub repository](https://github.com/jomarmontuya/m3-expressive) for the current release status.

## Install

```bash
npm i m3-expressive-react
# or: pnpm add m3-expressive-react / bun add m3-expressive-react
```

Peer dependencies: `react >=18 <20`, `react-dom >=18 <20`, `framer-motion >=11 <13`. Full styling requires Tailwind CSS 4 — see the [package README](packages/m3-expressive-react/README.md#tailwind-4-integration-required-for-full-component-styling) for the token mapping (a standalone, Tailwind-free `styles.css` path also exists).

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

## For AI agents

Connect the MCP server (14 tools: search components, get API/examples/guidelines/states/source, generate themes):

```bash
cd mini-services/mcp-server && bun install && bun start
```

The agent handbook is served at `/llms.txt` on the running site. Every component exposes an `exampleCode` sample through the same metadata used by the docs.

## What's inside

| Path | What |
|---|---|
| `packages/m3-expressive-react/` | The publishable npm package (dist + compiled styles) |
| `src/` | The Next.js 16 showcase/docs app — every component live, with interactive playgrounds |
| `src/lib/m3/` | The source of truth: `meta.ts` (component metadata), `tokens.ts`, `themes.ts`, `theme-builder.ts` (Dynamic Color engine), `registry.ts` |
| `mini-services/mcp-server/` | MCP server exposing the library to coding agents |
| [`audit/compliance-2026-08-29.md`](audit/compliance-2026-08-29.md) | Tracked M3 compliance report: spec vs implementation vs documented deviations |
| `tool-results/` | Committed visual-regression baselines |

## Develop locally

```bash
bun install
bun install --cwd mini-services/mcp-server --frozen-lockfile
bun run dev          # showcase on :3000
```

Gates (also run in CI): `bun run lint` · `bunx tsc --noEmit` · `bun run build:package` · `bun run vr:check`. See [CONTRIBUTING.md](CONTRIBUTING.md) and [AGENTS.md](AGENTS.md) for the full component contract.

## License

[MIT](LICENSE) — open source, open code. Built by [Medianeth](https://medianeth.com). Bundled fonts and code keep their original licenses in [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md).
