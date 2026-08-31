import { NextRequest, NextResponse } from "next/server";
import { componentSources } from "@/lib/m3/component-sources.generated";
import { getComponent, m3Registry } from "@/lib/m3/registry";

/**
 * GET /api/component-source?id=button
 *   → { id, name, path, lines, bytes, source }
 *
 * Returns the REAL TypeScript/JSX implementation file for one registry
 * component — the same text an MCP client gets via `get_component_source`.
 * Powers the "Source code" tab on every component page.
 *
 * The source map is generated at build time, so the production server does
 * not need access to repository files.
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

  const source = componentSources[component.id as keyof typeof componentSources];
  return NextResponse.json(
    {
      id: component.id,
      name: component.name,
      ...source,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
