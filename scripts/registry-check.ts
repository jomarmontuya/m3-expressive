import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { basename, resolve } from "node:path";

import { m3Registry } from "../src/lib/m3/registry";

const root = resolve(import.meta.dir, "..");
const registryPath = resolve(root, "registry.json");
const releaseRef = "v0.1.0-beta.1";
const baseDependency = `jomarmontuya/m3-expressive/m3-base#${releaseRef}`;

interface RegistryFile {
  include?: string[];
  items?: RegistryItem[];
}

interface RegistryItem {
  name: string;
  type: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: Array<{ path: string; type: string; target?: string }>;
  cssVars?: Record<string, unknown>;
  css?: Record<string, unknown>;
}

interface LocatedRegistryItem {
  item: RegistryItem;
  directory: string;
}

function fail(message: string): never {
  throw new Error(`Registry check failed: ${message}`);
}

async function readJson(path: string): Promise<RegistryFile> {
  if (!existsSync(path)) fail(`${path.slice(root.length + 1)} does not exist`);
  return JSON.parse(await readFile(path, "utf8")) as RegistryFile;
}

async function collectItems(path: string): Promise<LocatedRegistryItem[]> {
  const document = await readJson(path);
  const directory = resolve(path, "..");
  const collected = (document.items ?? []).map((item) => ({ item, directory }));

  for (const include of document.include ?? []) {
    collected.push(...(await collectItems(resolve(path, "..", include))));
  }

  return collected;
}

const locatedItems = await collectItems(registryPath);
const items = locatedItems.map(({ item }) => item);
const expectedNames = new Set(["m3-base", ...m3Registry.components.map((component) => component.id)]);
const itemNames = new Set(items.map((item) => item.name));

if (items.length !== expectedNames.size) {
  fail(`expected ${expectedNames.size} items, found ${items.length}`);
}

if (itemNames.size !== items.length) fail("item names must be unique");

for (const name of expectedNames) {
  if (!itemNames.has(name)) fail(`missing item ${name}`);
}

const baseItem = items.find((item) => item.name === "m3-base");
const requiredBaseDependencies = [
  "@base-ui/react@^1.7.0",
  "framer-motion@^12.23.2",
  "clsx@^2.1.1",
  "tailwind-merge@^3.3.1",
];
const requiredBaseTargets = [
  "@components/m3/Ripple.tsx",
  "@components/m3/MaterialSymbol.tsx",
  "@lib/utils.ts",
  "@lib/m3/tokens.ts",
  "@lib/m3/use-text-direction.ts",
];

if (!baseItem) fail("m3-base is missing");
if (baseItem.type !== "registry:style") fail("m3-base must be a registry:style item");
for (const dependency of requiredBaseDependencies) {
  if (!baseItem.dependencies?.includes(dependency)) fail(`m3-base is missing ${dependency}`);
}
for (const target of requiredBaseTargets) {
  if (!baseItem.files?.some((file) => file.target === target)) fail(`m3-base is missing target ${target}`);
}
if (!baseItem.cssVars || !baseItem.css) fail("m3-base must install Material CSS variables and rules");

for (const { item, directory } of locatedItems) {
  for (const file of item.files ?? []) {
    const sourcePath = resolve(directory, file.path);
    if (!existsSync(sourcePath)) fail(`${item.name} references missing file ${file.path}`);
  }

  if (item.name === "m3-base") continue;

  const dependencies = item.registryDependencies ?? [];
  if (!dependencies.includes(baseDependency)) {
    fail(`${item.name} must depend on ${baseDependency}`);
  }

  for (const dependency of dependencies) {
    if (dependency.startsWith("jomarmontuya/m3-expressive/") && !dependency.endsWith(`#${releaseRef}`)) {
      fail(`${item.name} has an unpinned registry dependency: ${dependency}`);
    }
  }
}

const requiredDependencies: Record<string, string> = {
  "extended-fab": `jomarmontuya/m3-expressive/fab#${releaseRef}`,
  "fab-menu": `jomarmontuya/m3-expressive/fab#${releaseRef}`,
  "date-picker": `jomarmontuya/m3-expressive/text-field#${releaseRef}`,
  "top-app-bar": `jomarmontuya/m3-expressive/search-view#${releaseRef}`,
};

for (const [itemName, dependency] of Object.entries(requiredDependencies)) {
  const item = items.find((candidate) => candidate.name === itemName);
  if (!item?.registryDependencies?.includes(dependency)) {
    fail(`${itemName} must depend on ${dependency}`);
  }
}

for (const component of m3Registry.components) {
  const publicExamples = `${component.importLine}\n${component.exampleCode}`;
  if (publicExamples.includes("m3-expressive-react")) {
    fail(`${component.id} still documents the removed npm package`);
  }

  const source = await readFile(resolve(root, component.file), "utf8");
  if (/export\s+\{\s*\w+Meta\s*\}\s+from\s+["']@\/lib\/m3\/meta["']/.test(source)) {
    fail(`${component.id} still exports showcase metadata from its installable source`);
  }

  const item = items.find((candidate) => candidate.name === component.id);
  const dependencies = item?.registryDependencies ?? [];
  const relativeImports = source.matchAll(/from\s+["']\.\/([^"']+)["']/g);

  for (const match of relativeImports) {
    const importedFile = `${match[1]}.tsx`;
    if (importedFile === "Ripple.tsx" || importedFile === "MaterialSymbol.tsx") continue;

    const importedComponent = m3Registry.components.find(
      (candidate) => basename(candidate.file) === importedFile,
    );
    if (!importedComponent) continue;

    const dependency = `jomarmontuya/m3-expressive/${importedComponent.id}#${releaseRef}`;
    if (!dependencies.includes(dependency)) {
      fail(`${component.id} imports ${importedFile} but is missing ${dependency}`);
    }
  }
}

console.log(`Registry check passed: ${items.length} items at ${releaseRef}.`);
