/**
 * Shared library for the visual-regression (VR) screenshot suite.
 *
 * Drives the `agent-browser` CLI to capture per-component screenshots of the
 * showcase (single route with hash deep links: /#/component/<id>) and provides
 * the shared constants used by vr-capture.ts (baselines) and vr-compare.ts
 * (current + pixelmatch diff).
 *
 * Run from the repo root: `bun scripts/vr-capture.ts` / `bun scripts/vr-compare.ts`
 * (paths below are resolved from this file's location, so cwd does not matter).
 */
import { existsSync, mkdirSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

/** Repo root (this file lives in <root>/scripts/). */
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const BASE_URL = "http://localhost:3000";
export const REGISTRY_URL = `${BASE_URL}/api/registry?summary=true`;
export const VIEWPORT = { width: 1280, height: 900 } as const;

/** Extra settle sleep AFTER the visual-stability poll — lets entrance springs
 * and icon-font swaps land so both capture runs see the same frame. */
export const SETTLE_MS = 1500;
/** Max time to wait for the component h1 to match the expected name. */
export const RENDER_TIMEOUT_MS = 20000;
/** Max time to wait for background/layout to stop changing (theme fades,
 * hot-reloaded CSS under dev-server load). */
const STABILITY_TIMEOUT_MS = 20000;
/** Consecutive identical samples required to call the page visually stable. */
const STABLE_SAMPLES = 4;
/** Poll interval for the render + stability checks. */
const POLL_MS = 250;

/** tool-results directories. */
export const BASELINES_DIR = path.join(ROOT, "tool-results", "vr-baselines");
export const CURRENT_DIR = path.join(ROOT, "tool-results", "vr-current");
export const REPORT_PATH = path.join(ROOT, "tool-results", "vr-report.json");

/**
 * Components whose live demo contains a perpetual/looping animation
 * (indeterminate progress, loading glyphs, ...). Their diff is informational
 * only: vr-compare.ts caps their status at "minor" so they never fail the run.
 * Add an id here (with a note in worklog.md) when a demo gains an endless animation.
 */
export const KNOWN_ANIMATED: ReadonlySet<string> = new Set([
  "linear-progress", // indeterminate linear progress loops forever
  "circular-progress", // indeterminate circular progress loops forever
  "loading-indicator", // M3E loading indicator animates indefinitely
]);

/** Diff percent bands used to classify a comparison. */
export const DIFF_BANDS = { identical: 0.05, minor: 1.0 } as const;

export type VrStatus = "identical" | "minor" | "changed" | "new" | "missing";

export interface RegistryComponent {
  id: string;
  name: string;
  m3e: boolean;
}

interface RegistrySummary {
  library: string;
  version: string;
  totalCount: number;
  categories: { id: string; label: string; components: RegistryComponent[] }[];
}

export interface ComponentEntry {
  id: string;
  name: string;
}

export interface CaptureResult {
  id: string;
  file: string;
  /** true when a PNG was captured this run; false when skipped (already existed). */
  captured: boolean;
}

export interface CompareRow {
  id: string;
  baselineExists: boolean;
  /** Percentage (0–100) of pixels that differ, rounded to 4 decimals. */
  diffPercent: number;
  status: VrStatus;
  /** id is in KNOWN_ANIMATED — status is capped at "minor". */
  knownAnimated?: boolean;
}

/* ------------------------------------------------------------------ */
/* Process helpers                                                     */
/* ------------------------------------------------------------------ */

const execFileP = promisify(execFile);

/** Run a command, capture stdout/stderr, throw on non-zero exit. */
async function run(
  cmd: string[],
  opts: { timeoutMs?: number } = {},
): Promise<string> {
  try {
    const { stdout } = await execFileP(cmd[0], cmd.slice(1), {
      cwd: ROOT,
      timeout: opts.timeoutMs,
      maxBuffer: 16 * 1024 * 1024,
    });
    return stdout;
  } catch (err) {
    const e = err as Error & { code?: number; stdout?: string; stderr?: string; killed?: boolean };
    const detail = [
      e.stdout ? `stdout: ${e.stdout.trim()}` : "",
      e.stderr ? `stderr: ${e.stderr.trim()}` : "",
      e.killed ? "(timed out)" : "",
    ]
      .filter(Boolean)
      .join("\n");
    throw new Error(`\`${cmd.join(" ")}\` failed (${e.code ?? "unknown"})\n${detail}`);
  }
}

/** Run the agent-browser CLI. */
async function ab(...args: string[]): Promise<string> {
  return run(["agent-browser", ...args], { timeoutMs: 45000 });
}

interface AbJson {
  success: boolean;
  data: { result?: unknown };
  error: string | null;
}

/** Evaluate JS in the page and return the result as a string. */
async function abEvalJson(expression: string): Promise<string> {
  const out = await ab("eval", expression, "--json");
  const parsed = JSON.parse(out) as AbJson;
  if (!parsed.success) {
    throw new Error(`eval failed: ${parsed.error ?? "unknown error"}`);
  }
  return typeof parsed.data.result === "string"
    ? parsed.data.result
    : String(parsed.data.result ?? "");
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/* ------------------------------------------------------------------ */
/* Registry                                                            */
/* ------------------------------------------------------------------ */

/** Fetch the registry summary; retries while the dev server is unreachable. */
export async function fetchRegistry(): Promise<RegistrySummary> {
  const maxAttempts = 8;
  let lastErr: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(REGISTRY_URL, { signal: AbortSignal.timeout(10000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as RegistrySummary;
    } catch (err) {
      lastErr = err;
      console.log(
        `[registry] attempt ${attempt}/${maxAttempts} failed (${err instanceof Error ? err.message : String(err)}) — retrying in 3s`,
      );
      await sleep(3000);
    }
  }
  throw new Error(`Registry API unreachable at ${REGISTRY_URL}: ${String(lastErr)}`);
}

/** Component entries (id + display name) in registry order. */
export async function fetchComponentEntries(): Promise<ComponentEntry[]> {
  const registry = await fetchRegistry();
  return registry.categories.flatMap((c) =>
    c.components.map((comp) => ({ id: comp.id, name: comp.name })),
  );
}

/* ------------------------------------------------------------------ */
/* Capture                                                             */
/* ------------------------------------------------------------------ */

/** Poll until the page h1 equals the expected component name. */
async function waitForComponentH1(expectedName: string): Promise<boolean> {
  const deadline = Date.now() + RENDER_TIMEOUT_MS;
  while (Date.now() < deadline) {
    try {
      const text = await abEvalJson(
        "document.querySelector('h1')?.textContent?.trim() || ''",
      );
      if (text === expectedName) return true;
    } catch {
      // page mid-navigation — keep polling
    }
    await sleep(POLL_MS);
  }
  return false;
}

/** Poll until background color + layout stop changing. Guards against capturing
 * mid theme-fade or mid hot-reload (a race observed once when the dev server
 * was recompiling under concurrent load — it produced a global antialias/
 * background diff between runs). */
async function waitForVisualStability(): Promise<void> {
  const sampleJs =
    "JSON.stringify([getComputedStyle(document.body).backgroundColor," +
    "document.documentElement.scrollWidth,document.documentElement.scrollHeight])";
  const deadline = Date.now() + STABILITY_TIMEOUT_MS;
  let last = "";
  let stable = 0;
  while (Date.now() < deadline) {
    try {
      const cur = await abEvalJson(sampleJs);
      stable = cur === last ? stable + 1 : 1;
      last = cur;
      if (stable >= STABLE_SAMPLES) return;
    } catch {
      stable = 0; // page mid-navigation
    }
    await sleep(POLL_MS);
  }
  console.log("[stability] timeout waiting for visual stability — capturing anyway");
}

/** Deep-link to a component and wait until it is actually rendered.
 * Uses a fresh `open` every time; the SPA listens to hashchange (verified),
 * and a hard about:blank round-trip is the fallback if the h1 ever disagrees. */
async function navigateToComponent(id: string, name: string): Promise<void> {
  const url = `${BASE_URL}/#/component/${id}`;
  for (let attempt = 1; attempt <= 2; attempt++) {
    await ab("open", url);
    if (await waitForComponentH1(name)) {
      await waitForVisualStability();
      return;
    }
    console.log(
      `[nav] h1 did not match "${name}" for ${id} (attempt ${attempt}) — hard reloading`,
    );
    await ab("open", "about:blank"); // force a full page reload on next open
  }
  throw new Error(`Component page for "${id}" never rendered (h1 !== "${name}")`);
}

export interface CaptureOptions {
  /** Output directory for `<id>.png` files. */
  outDir: string;
  /** Overwrite existing PNGs (baselines default to never-overwrite). */
  force?: boolean;
  /** Capture only these component ids (default: all registry ids). */
  only?: string[];
}

/**
 * Capture one viewport screenshot (VIEWPORT) per component deep link.
 * Existing files are skipped unless `force` — baselines are never
 * overwritten by default.
 */
export async function captureComponents(
  opts: CaptureOptions,
): Promise<CaptureResult[]> {
  const { outDir, force = false } = opts;
  let entries = await fetchComponentEntries();
  if (opts.only?.length) {
    const wanted = new Set(opts.only);
    entries = entries.filter((e) => wanted.has(e.id));
  }
  if (entries.length === 0) throw new Error("No component ids resolved from registry");

  mkdirSync(outDir, { recursive: true });

  // Pin the browser to a deterministic viewport + light color scheme.
  await ab("set", "viewport", String(VIEWPORT.width), String(VIEWPORT.height));
  await ab("set", "media", "light");

  const results: CaptureResult[] = [];
  for (let i = 0; i < entries.length; i++) {
    const { id, name } = entries[i];
    const file = path.join(outDir, `${id}.png`);
    const prefix = `[${String(i + 1).padStart(2, "0")}/${entries.length}]`;
    if (!force && existsSync(file)) {
      console.log(`${prefix} ${id}: baseline exists — skip (use --force to overwrite)`);
      results.push({ id, file, captured: false });
      continue;
    }
    await navigateToComponent(id, name);
    await sleep(SETTLE_MS);
    await ab("screenshot", file);
    const size = statSync(file).size;
    if (size === 0) throw new Error(`Empty screenshot for ${id}: ${file}`);
    console.log(`${prefix} ${id}: captured (${Math.round(size / 1024)} KB)`);
    results.push({ id, file, captured: true });
  }
  return results;
}

/* ------------------------------------------------------------------ */
/* Diff helpers (pngjs + pixelmatch)                                   */
/* ------------------------------------------------------------------ */

/** Pixel-diff two PNG files. Returns mismatch percentage (0–100).
 * Throws on dimension mismatch — the caller classifies that as a hard change. */
export async function diffPercent(
  fileA: string,
  fileB: string,
  threshold = 0.1,
): Promise<number> {
  const { PNG } = await import("pngjs");
  const { default: pixelmatch } = await import("pixelmatch");
  const imgA = PNG.sync.read(await readFile(fileA));
  const imgB = PNG.sync.read(await readFile(fileB));
  if (imgA.width !== imgB.width || imgA.height !== imgB.height) {
    throw new Error(
      `dimension mismatch: ${imgA.width}x${imgA.height} vs ${imgB.width}x${imgB.height}`,
    );
  }
  const diff = pixelmatch(
    imgA.data,
    imgB.data,
    undefined,
    imgA.width,
    imgA.height,
    { threshold },
  );
  return (diff / (imgA.width * imgA.height)) * 100;
}

/** Classify a diff percentage into a status band. */
export function bandFor(diffPct: number): "identical" | "minor" | "changed" {
  if (diffPct < DIFF_BANDS.identical) return "identical";
  if (diffPct < DIFF_BANDS.minor) return "minor";
  return "changed";
}
