import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dir, "..");
const standalone = resolve(root, ".next", "standalone");

await mkdir(resolve(standalone, ".next"), { recursive: true });
await cp(resolve(root, ".next", "static"), resolve(standalone, ".next", "static"), {
  recursive: true,
});
await cp(resolve(root, "public"), resolve(standalone, "public"), { recursive: true });

for (const envFile of [".env", ".env.production"]) {
  await rm(resolve(standalone, envFile), { force: true });
}

const forbiddenEntries = new Set([
  ".env",
  ".env.production",
  "db",
  "dev.log",
  "download",
  "mcp-server",
  "scripts",
  "tool-results",
  "upload",
]);
const leakedEntries = (await readdir(standalone)).filter((entry) => forbiddenEntries.has(entry));

if (leakedEntries.length > 0) {
  throw new Error(`Standalone output contains forbidden entries: ${leakedEntries.join(", ")}`);
}

console.log("Prepared standalone output without local data or environment files.");
