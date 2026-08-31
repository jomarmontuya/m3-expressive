# M3 Expressive React

Material 3 and Material 3 Expressive components for React. The beta ships as a GitHub-hosted shadcn registry, so each component is copied into your app as local source.

Current release target: `v0.1.0-beta.1`.

## Install a component

Run this from a React project with Tailwind CSS 4 and a valid `components.json` file:

```bash
bunx shadcn@latest add jomarmontuya/m3-expressive/button#v0.1.0-beta.1
```

The component automatically installs `m3-base`. That shared item adds:

- Material color, shape, type, elevation, state, and motion tokens
- Roboto Flex and Material Symbols Rounded from Google Fonts
- `Ripple`, `MaterialSymbol`, `cn`, spring tokens, and text-direction support
- Base UI, Framer Motion, clsx, and tailwind-merge runtime dependencies

Import the installed file directly:

```tsx
import { Button } from "@/components/m3/Button";

export function SaveButton() {
  return <Button icon="save">Save changes</Button>;
}
```

Replace `button` in the install command with any component ID from the catalog. Same-repository dependencies are pinned to the same beta tag.

## What is included

- `registry.json` — the public registry with 41 components and `m3-base`
- `src/components/m3/` — installable component source
- `src/` — the Next.js catalog and live component demos
- `src/lib/m3/meta.ts` — component API and Material traceability metadata
- `docs/material-compliance.md` — spec sources, audit method, and declared deviations

`mcp-server/` is retained as unreleased source for possible later work. It is not part of this beta, not advertised, and not covered by the release checks.

## Local development

```bash
bun install --frozen-lockfile
bun run dev
```

Open `http://localhost:3000`.

Release checks:

```bash
bun run lint
bunx tsc --noEmit
bun run registry:check
bun run registry:validate
bun run registry:smoke
bun run build
```

The smoke check installs all 41 registry items into a temporary clean Next.js app, then typechecks and builds that app.

## Material compliance

Each component metadata record links to its Material source and declares its audit date, platform references, browser mapping, and known deviations. See [docs/material-compliance.md](docs/material-compliance.md).

This project is not affiliated with or endorsed by Google. Material Design is a trademark of Google LLC.

## License

MIT. See [LICENSE](LICENSE) and [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md).
