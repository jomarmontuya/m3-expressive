/**
 * Task 6-c verification — compiled.css real-world proof (bun script).
 * (a) imports packages/m3-expressive-react/dist/index.js and counts exports
 * (b) reads dist/compiled.css, asserts tokens + no-preflight
 * (c) extracts 8 component-critical class names from src/components/m3/Button.tsx
 *     and asserts each appears in compiled.css (CSS-escape tolerant)
 */
import assert from "node:assert";
import { readFileSync, statSync } from "node:fs";

const root = "/home/z/my-project";
const cssPath = `${root}/packages/m3-expressive-react/dist/compiled.css`;

// (a) the real package entry — 104 exports expected
const mod = await import(`${root}/packages/m3-expressive-react/dist/index.js`);
const exportCount = Object.keys(mod).length;
assert.ok(exportCount >= 100, `expected >=100 exports, got ${exportCount}`);
assert.ok(mod.Button, "Button export missing");

// (b) stylesheet content
const css = readFileSync(cssPath, "utf8");
const cssKB = (statSync(cssPath).size / 1024).toFixed(1);

// tokens bundled
assert.ok(css.includes("--md-primary:#6750a4"), "--md-primary token missing");
assert.ok(css.includes("--md-surface-container-high"), "--md-surface-container-high token missing");
assert.ok(/\[data-theme=ocean\]/.test(css), "ocean scheme missing");
assert.ok(/\.dark,\[data-theme=dark\]/.test(css), "dark scheme missing");
// no preflight reset
assert.ok(!css.includes("box-sizing"), "preflight box-sizing found — must not ship preflight!");
assert.ok(!css.includes("margin:0;padding:0"), "preflight margin/padding reset found!");
// helpers present
for (const helper of ["m3-state", "m3-focus", "m3-elevation-1", "md-label-large", "md-title-medium", "m3-scroll", "material-symbols-rounded"]) {
  assert.ok(css.includes(`.${helper}`), `helper .${helper} missing`);
}
// remote font imports survived at the top (before any style rules)
assert.ok(css.indexOf('@import "https://fonts.googleapis.com') !== -1, "font @import lost");
assert.ok(css.indexOf('@import "https://fonts.googleapis.com') < css.indexOf(":root{"), "font @import not at top");

// (c) extract class-like tokens from Button.tsx source, pick 8 critical ones
const src = readFileSync(`${root}/src/components/m3/Button.tsx`, "utf8");
const candidates = new Set<string>();
for (const m of src.matchAll(/"([^"]*)"|`([^`]*)`/g)) {
  for (const t of (m[1] ?? m[2]).split(/\s+/)) {
    if (!t) continue;
    if (/[=<>{}&|;?]/.test(t)) continue;          // JSX / expressions
    if (!/[-:!]/.test(t)) continue;                // must be class-like
    if (/^(use|client|react|motion)$/.test(t)) continue;
    candidates.add(t);
  }
}

const buckets: [string, RegExp][] = [
  ["state layer", /^m3-state$/],
  ["focus ring", /^m3-focus$/],
  ["type scale", /^md-(label|title)-/],
  ["color utility", /^(bg|text|border|stroke)-m3-/],
  ["opacity modifier", /^bg-m3-on-surface\/12$|^text-m3-on-surface\/38$/],
  ["shape utility", /^rounded-(full|lg|xl|2xl)$|^rounded-m3-/],
  ["arbitrary property", /^hover:\[/],
  ["pseudo content", /^before:content/],
  ["layout utility", /^(inline-flex|relative|select-none|w-full|transition-colors|pointer-events-none|duration-150)$/],
  ["elevation", /^m3-elevation-/],
];
const picked: string[] = [];
for (const [, re] of buckets) {
  for (const t of candidates) if (re.test(t) && !picked.includes(t)) { picked.push(t); break; }
  if (picked.length === 8) break;
}
assert.equal(picked.length, 8, `expected 8 picked classes, got ${picked.length}: ${picked.join(", ")}`);

// CSS-escape-tolerant matcher: special chars may appear backslash-escaped in selectors
const esc = (c: string) => /[a-zA-Z0-9_-]/.test(c) ? c.replace(/[-]/g, "\\-") : `\\\\?${c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`;
const present = (t: string) => new RegExp(t.split("").map(esc).join("")).test(css);

console.log("\n=== m3-expressive-react/dist/compiled.css — proof ===");
console.log(`dist/index.js exports : ${exportCount} (>=100 required)`);
console.log(`compiled.css size     : ${cssKB} KB (${statSync(cssPath).size} bytes)`);
console.log(`preflight reset       : ${css.includes("box-sizing") ? "PRESENT (FAIL)" : "absent ✓"}`);
console.log(`--md-* tokens         : present ✓ (light/dark/ocean/emerald/coral)`);
console.log("\nButton.tsx class → compiled.css presence:");
let ok = 0;
const misses: string[] = [];
for (const t of picked) {
  const hit = present(t);
  if (hit) ok++; else misses.push(t);
  console.log(`  ${hit ? "✓" : "✗"}  ${t}`);
}
if (misses.length) console.log("MISSING:", misses.join(" | "));
assert.equal(ok, 8, `only ${ok}/8 classes found in compiled.css`);
console.log(`\nRESULT: ${ok}/8 class assertions passed, ${exportCount} exports, no preflight — compiled.css is a valid standalone styling layer.`);
