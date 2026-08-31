import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";

import { m3Registry } from "../src/lib/m3/registry";

const root = resolve(import.meta.dir, "..");
const fixture = await mkdtemp(join(tmpdir(), "m3-registry-smoke-"));
const registryOutput = join(fixture, ".registry");
const shadcn = resolve(root, "node_modules", ".bin", "shadcn");

async function run(command: string[], cwd = root) {
  console.log(`> ${command.join(" ")}`);
  const process = Bun.spawn(command, { cwd, stdout: "inherit", stderr: "inherit" });
  const exitCode = await process.exited;
  if (exitCode !== 0) throw new Error(`${command.join(" ")} exited with ${exitCode}`);
}

async function write(path: string, contents: string) {
  const destination = join(fixture, path);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, contents);
}

try {
  await write(
    "package.json",
    `${JSON.stringify({
      name: "m3-registry-consumer-smoke",
      version: "0.0.0",
      private: true,
      packageManager: "bun@1.4.0",
      scripts: { build: "next build", typecheck: "tsc --noEmit" },
      dependencies: {
        next: "^16.1.1",
        react: "^19.0.0",
        "react-dom": "^19.0.0",
      },
      devDependencies: {
        "@tailwindcss/postcss": "^4",
        "@types/node": "^24",
        "@types/react": "^19",
        "@types/react-dom": "^19",
        tailwindcss: "^4",
        typescript: "^5",
      },
    }, null, 2)}\n`,
  );
  await write(
    "components.json",
    `${JSON.stringify({
      $schema: "https://ui.shadcn.com/schema.json",
      style: "new-york",
      rsc: true,
      tsx: true,
      tailwind: { config: "", css: "app/globals.css", baseColor: "neutral", cssVariables: true },
      iconLibrary: "lucide",
      aliases: {
        components: "@/components",
        utils: "@/lib/utils",
        ui: "@/components/ui",
        lib: "@/lib",
        hooks: "@/hooks",
      },
    }, null, 2)}\n`,
  );
  await write(
    "tsconfig.json",
    `${JSON.stringify({
      compilerOptions: {
        target: "ES2022",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: false,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "react-jsx",
        incremental: true,
        plugins: [{ name: "next" }],
        paths: { "@/*": ["./*"] },
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      exclude: ["node_modules"],
    }, null, 2)}\n`,
  );
  await write("postcss.config.mjs", "export default { plugins: { '@tailwindcss/postcss': {} } };\n");
  await write("next-env.d.ts", '/// <reference types="next" />\n/// <reference types="next/image-types/global" />\n');
  await write("app/globals.css", '@import "tailwindcss";\n');
  await write(
    "app/layout.tsx",
    `import type { ReactNode } from "react";
import "./globals.css";

export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
`,
  );
  await write(
    "app/page.tsx",
    `import { Button } from "@/components/m3/Button";

export default function Page() {
  return <main className="p-8"><Button icon="rocket_launch">Registry works</Button></main>;
}
`,
  );

  await run(["bun", "install"], fixture);
  await run([shadcn, "build", "./registry.json", "--output", registryOutput]);

  for (const file of await readdir(registryOutput)) {
    if (!file.endsWith(".json") || file === "registry.json") continue;
    const path = join(registryOutput, file);
    const item = JSON.parse(await readFile(path, "utf8")) as { registryDependencies?: string[] };
    item.registryDependencies = item.registryDependencies?.map((dependency) => {
      const match = dependency.match(/^jomarmontuya\/m3-expressive\/([^#]+)#v0\.1\.0-beta\.1$/);
      return match ? `./.registry/${match[1]}.json` : dependency;
    });
    await writeFile(path, `${JSON.stringify(item, null, 2)}\n`);
  }

  const componentItems = m3Registry.components.map((component) => `./.registry/${component.id}.json`);
  const buttonItem = componentItems.find((item) => item.endsWith("/button.json"));
  if (!buttonItem) throw new Error("button registry item is missing");

  await run([shadcn, "add", "--yes", "--overwrite", buttonItem], fixture);
  await run(["bun", "run", "typecheck"], fixture);
  await run(["bun", "run", "build"], fixture);
  console.log("Single-component install passed for button and m3-base.");

  await run(
    [shadcn, "add", "--yes", "--overwrite", ...componentItems.filter((item) => item !== buttonItem)],
    fixture,
  );
  await run(["bun", "run", "typecheck"], fixture);
  await run(["bun", "run", "build"], fixture);

  console.log(`Registry consumer smoke passed for ${m3Registry.totalCount} components.`);
} finally {
  if (fixture.startsWith(`${tmpdir()}/m3-registry-smoke-`)) {
    await rm(fixture, { recursive: true, force: true });
  }
}
