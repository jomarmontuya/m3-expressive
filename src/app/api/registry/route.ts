import { NextRequest, NextResponse } from "next/server";
import { m3Registry, getComponent, searchComponents } from "@/lib/m3/registry";
import { colorRoles, springs, shapes, typeScale, stateOpacities } from "@/lib/m3/tokens";
import { categoryLabels } from "@/lib/m3/types";

/**
 * GET /api/registry                     → full machine-readable registry
 * GET /api/registry?component=button    → single component (full docs)
 * GET /api/registry?q=nav               → search components
 * GET /api/registry?summary=true        → lightweight index (no props/guidelines)
 * GET /api/registry?tokens=true         → design tokens only
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const componentId = searchParams.get("component");
  const query = searchParams.get("q");
  const summary = searchParams.get("summary");
  const tokens = searchParams.get("tokens");

  if (componentId) {
    const component = getComponent(componentId);
    if (!component) {
      return NextResponse.json(
        { error: `Component "${componentId}" not found`, available: m3Registry.components.map((c) => c.id) },
        { status: 404 }
      );
    }
    return NextResponse.json(component);
  }

  if (tokens) {
    return NextResponse.json({
      colorRoles,
      springs,
      shapes,
      typeScale,
      stateLayers: stateOpacities,
      typographyFont: "Roboto Flex (variable)",
      iconFont: "Material Symbols Rounded (variable)",
    });
  }

  if (summary) {
    return NextResponse.json({
      library: m3Registry.library,
      version: m3Registry.version,
      totalCount: m3Registry.totalCount,
      categories: m3Registry.categories.map((c) => ({
        id: c,
        label: categoryLabels[c],
        components: m3Registry.components
          .filter((comp) => comp.category === c)
          .map((comp) => ({ id: comp.id, name: comp.name, m3e: !!comp.m3e })),
      })),
    });
  }

  if (query !== null) {
    const results = searchComponents(query);
    return NextResponse.json({ query, count: results.length, results });
  }

  return NextResponse.json(m3Registry);
}
