/**
 * Postbuild patcher for m3-expressive-react.
 *
 * tsup's `banner: { js: '"use client";' }` reliably lands at position 0 of
 * the ESM outputs, but the CJS outputs keep esbuild's "use strict" prologue
 * first (and the banner can end up mid-file, where it is inert). React
 * Server Components bundlers (webpack/turbopack) only honor "use client"
 * when it is part of the directive prologue, so this script guarantees:
 *   dist/index.js  · dist/hooks.js   → already patched by tsup banner (no-op)
 *   dist/index.cjs · dist/hooks.cjs  → '"use client";' prepended if missing
 * Server-safe subpath builds (tokens/types/meta/themes/theme-builder/
 * registry) are intentionally NOT touched.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");
const CLIENT_ENTRIES = ["index.cjs", "hooks.cjs"];

let patched = 0;
for (const file of CLIENT_ENTRIES) {
  const full = path.join(dist, file);
  if (!fs.existsSync(full)) continue;
  const code = fs.readFileSync(full, "utf8");
  if (code.startsWith('"use client"')) continue; // prologue already correct
  fs.writeFileSync(full, `"use client";\n${code}`);
  patched++;
  console.log(`[patch-client-directive] prepended "use client" → dist/${file}`);
}
console.log(`[patch-client-directive] done (${patched} file(s) patched)`);
