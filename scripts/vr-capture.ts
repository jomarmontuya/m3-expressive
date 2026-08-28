#!/usr/bin/env bun
/**
 * VR baseline capture — one viewport screenshot per showcase component.
 *
 *   bun scripts/vr-capture.ts             # capture missing baselines only
 *   bun scripts/vr-capture.ts --force     # overwrite existing baselines
 *   bun scripts/vr-capture.ts --only button,fab   # subset (debugging)
 *
 * PNGs land in tool-results/vr-baselines/<id>.png. Baselines are never
 * overwritten unless --force is passed. Requires the shared dev server on :3000.
 */
import {
  BASELINES_DIR,
  captureComponents,
  VIEWPORT,
} from "./vr-lib";

function parseArgs(): { force: boolean; only: string[] } {
  const argv = process.argv.slice(2);
  const onlyFlag = argv.find((a) => a.startsWith("--only"));
  // Guard: without --only, onlyFlag is undefined and argv.indexOf(undefined)
  // is -1 — index 0 would wrongly swallow the next flag (e.g. "--force").
  const onlyValue = onlyFlag
    ? onlyFlag.includes("=")
      ? onlyFlag.split("=")[1]
      : argv[argv.indexOf(onlyFlag) + 1]
    : undefined;
  return {
    force: argv.includes("--force"),
    only:
      onlyValue
        ?.split(",")
        .map((s) => s.trim())
        .filter(Boolean) ?? [],
  };
}

async function main() {
  const { force, only } = parseArgs();
  console.log(
    `VR baseline capture → ${BASELINES_DIR} (viewport ${VIEWPORT.width}x${VIEWPORT.height}${force ? ", --force" : ""})`,
  );
  const t0 = Date.now();
  const results = await captureComponents({ outDir: BASELINES_DIR, force, only });
  const captured = results.filter((r) => r.captured).length;
  const skipped = results.length - captured;
  console.log(
    `Done in ${((Date.now() - t0) / 1000).toFixed(1)}s — ${captured} captured, ${skipped} skipped (already existed), ${results.length} total.`,
  );
}

main().catch((err) => {
  console.error(`[vr-capture] FAILED: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
