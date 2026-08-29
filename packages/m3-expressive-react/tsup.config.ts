import { defineConfig } from "tsup";

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
const sharedExternal = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "framer-motion",
  "clsx",
  "tailwind-merge",
];

// Keep Base UI external so the component bundle does not carry a second copy.
const clientExternal = [
  ...sharedExternal,
  "@base-ui/react",
];

// theme-builder must load in plain Node ESM, where @material's package export
// is not consistently resolvable. Bundle that engine into server-safe output.
const serverExternal = sharedExternal;

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
    sourcemap: false,
    clean: true, // only the first config cleans dist
    target: "es2020",
    tsconfig: "./tsconfig.json",
    external: clientExternal,
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
    sourcemap: false,
    target: "es2020",
    tsconfig: "./tsconfig.json",
    external: serverExternal,
    noExternal: ["@material/material-color-utilities"],
  },
]);
