import { defineConfig } from "tsup";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * tsup config for m3-expressive-react.
 *
 * Entry points reference the app sources via relative paths — this package
 * is intentionally NOT a bun/pnpm workspace (the Next.js dev app must keep
 * resolving `@/` to ./src/* without config churn). tsup/esbuild compiles
 * the sources in place and emits standalone ESM + CJS + d.ts bundles here.
 *
 * The `@/*` alias (tsconfig paths → ../../src/*) is resolved by esbuild and
 * the dts rollup directly from `tsconfig: "./tsconfig.json"` paths — no
 * separate alias mapping needed (tsup 8.5 no longer exposes an `alias` option).
 *
 * Two configs because esbuild drops per-module "use client" directives when
 * bundling: client entries (component barrel + React hook) get the directive
 * re-applied via banner, while the server-safe modules (tokens/types/meta/
 * themes/theme-builder/registry) must stay directive-free so RSC/API code
 * can import them.
 */
const here = path.dirname(fileURLToPath(import.meta.url));


const external = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "framer-motion",
  "@material/material-color-utilities",
  "clsx",
  "tailwind-merge",
];

export default defineConfig([
  {
    // Client entries — "use client" re-applied on top of every output file
    entry: {
      index: "../../src/components/m3/index.ts",
      hooks: "../../src/hooks/use-m3-theme.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    splitting: true,
    sourcemap: true,
    clean: true, // only the first config cleans dist
    target: "es2020",
    tsconfig: "./tsconfig.json",
    external,
    banner: { js: '"use client";' },
  },
  {
    // Server-safe entries — no directive, importable from RSC/API/MCP code
    entry: {
      tokens: "../../src/lib/m3/tokens.ts",
      types: "../../src/lib/m3/types.ts",
      meta: "../../src/lib/m3/meta.ts",
      themes: "../../src/lib/m3/themes.ts",
      "theme-builder": "../../src/lib/m3/theme-builder.ts",
      registry: "../../src/lib/m3/registry.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    splitting: true,
    sourcemap: true,
    target: "es2020",
    tsconfig: "./tsconfig.json",
    external,
  },
]);
