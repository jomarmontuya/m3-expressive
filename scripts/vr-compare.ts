#!/usr/bin/env bun
/**
 * VR check — re-capture current screenshots, pixel-diff against baselines.
 *
 *   bun scripts/vr-compare.ts
 *
 * Steps:
 *  1. Captures fresh screenshots for every registry component into
 *     tool-results/vr-current/<id>.png (always overwritten — current state).
 *  2. Diffs each pair with pixelmatch (threshold 0.1) + pngjs.
 *  3. Writes tool-results/vr-report.json and prints a summary table.
 *
 * Status bands: identical <0.05% · minor <1% · changed ≥1%.
 * "new"      = no baseline yet (component added since last baseline run)
 * "missing"  = baseline exists but the current capture failed
 * Components in KNOWN_ANIMATED (perpetually animated demos) have their status
 * capped at "minor" — informational, never a failure.
 *
 * Exit code 1 if any component ends up "changed", "new", or "missing".
 */
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import {
  BASELINES_DIR,
  CURRENT_DIR,
  KNOWN_ANIMATED,
  REPORT_PATH,
  VIEWPORT,
  bandFor,
  captureComponents,
  diffPercent,
  fetchComponentEntries,
  type CompareRow,
  type ComponentEntry,
} from "./vr-lib";

function formatTable(rows: CompareRow[]): string {
  const idW = Math.max(...rows.map((r) => r.id.length), "id".length);
  const lines = [
    `${"id".padEnd(idW)}  ${"diff %".padStart(9)}  status`,
    `${"-".repeat(idW)}  ${"-".repeat(9)}  ${"-".repeat(9)}`,
  ];
  for (const r of rows) {
    const diff = r.baselineExists ? r.diffPercent.toFixed(4) : "—";
    const flag = r.knownAnimated ? " (animated)" : "";
    lines.push(`${r.id.padEnd(idW)}  ${diff.padStart(9)}  ${r.status}${flag}`);
  }
  return lines.join("\n");
}

async function main() {
  console.log(
    `VR check — re-capturing current screenshots → ${CURRENT_DIR} (viewport ${VIEWPORT.width}x${VIEWPORT.height})`,
  );
  const t0 = Date.now();

  // 1. Fresh current captures (always overwrite: current state must be live).
  const captured = await captureComponents({ outDir: CURRENT_DIR, force: true });
  console.log(
    `Captured ${captured.filter((r) => r.captured).length}/${captured.length} current screenshots in ${((Date.now() - t0) / 1000).toFixed(1)}s`,
  );

  // 2. Diff against baselines.
  const entries: ComponentEntry[] = await fetchComponentEntries();
  const rows: CompareRow[] = [];
  for (const { id } of entries) {
    const baseline = `${BASELINES_DIR}/${id}.png`;
    const current = `${CURRENT_DIR}/${id}.png`;
    const baselineExists = existsSync(baseline);
    const currentExists = existsSync(current);

    if (!currentExists) {
      rows.push({ id, baselineExists, diffPercent: 100, status: "missing" });
      continue;
    }
    if (!baselineExists) {
      rows.push({ id, baselineExists, diffPercent: 0, status: "new" });
      continue;
    }

    let pct: number;
    try {
      pct = await diffPercent(baseline, current, 0.1);
    } catch (err) {
      // Dimension mismatch etc. — layout changed in a way pixelmatch can't express.
      console.log(`[diff] ${id}: ${err instanceof Error ? err.message : String(err)}`);
      rows.push({ id, baselineExists, diffPercent: 100, status: "changed" });
      continue;
    }

    const knownAnimated = KNOWN_ANIMATED.has(id);
    let status = bandFor(pct);
    if (knownAnimated && status === "changed") status = "minor"; // cap informational
    rows.push({
      id,
      baselineExists,
      diffPercent: Math.round(pct * 10000) / 10000,
      status,
      ...(knownAnimated ? { knownAnimated: true } : {}),
    });
  }

  // 3. Report + summary.
  await writeFile(REPORT_PATH, `${JSON.stringify(rows, null, 2)}\n`);
  console.log(`\n${formatTable(rows)}\n`);

  const counts = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.status] = (acc[r.status] ?? 0) + 1;
    return acc;
  }, {});
  const summary = (["identical", "minor", "changed", "new", "missing"] as const)
    .map((s) => `${s}: ${counts[s] ?? 0}`)
    .join(" · ");
  console.log(`Report → ${REPORT_PATH}`);
  console.log(`Summary — ${summary}`);

  const failures = rows.filter(
    (r) => r.status === "changed" || r.status === "new" || r.status === "missing",
  );
  if (failures.length > 0) {
    console.error(
      `FAIL: ${failures.length} component(s) need baseline review: ${failures.map((r) => `${r.id} (${r.status})`).join(", ")}`,
    );
    process.exit(1);
  }
  console.log("PASS: no components changed, added, or missing against the baseline.");
}

main().catch((err) => {
  console.error(`[vr-compare] FAILED: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
