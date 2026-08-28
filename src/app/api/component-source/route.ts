import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "node:fs";
import { resolve, sep } from "node:path";
import { getComponent, m3Registry } from "@/lib/m3/registry";

/**
 * GET /api/component-source?id=button
 *   → { id, name, path, lines, bytes, source }
 *
 * Returns the REAL TypeScript/JSX implementation file for one registry
 * component — the same text an MCP client gets via `get_component_source`.
 * Powers the "Source code" tab on every component page.
 *
 * Security: the id must exist in the registry and the resolved file must
 * live inside src/components/m3 (no arbitrary filesystem reads).
 */
export async function GET(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id")?.trim() ?? "";

  if (!id) {
    return NextResponse.json(
      { error: "Missing ?id — try ?id=button", available: m3Registry.components.map((c) => c.id) },
      { status: 400 }
    );
  }

  const component = getComponent(id);
  if (!component) {
    return NextResponse.json(
      { error: `Component "${id}" not found`, available: m3Registry.components.map((c) => c.id) },
      { status: 404 }
    );
  }

  const libDir = resolve(process.cwd(), "src", "components", "m3");
  const abs = resolve(process.cwd(), component.file);
  if (!abs.startsWith(libDir + sep)) {
    return NextResponse.json({ error: "Path outside the component library" }, { status: 403 });
  }

  try {
    const source = readFileSync(abs, "utf8");
    return NextResponse.json(
      {
        id: component.id,
        name: component.name,
        path: component.file,
        lines: source.split("\n").length,
        bytes: Buffer.byteLength(source, "utf8"),
        source,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    return NextResponse.json(
      { error: `Source for "${id}" not readable at ${component.file}: ${String(e)}` },
      { status: 500 }
    );
  }
}
