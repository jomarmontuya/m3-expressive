import { NextRequest, NextResponse } from "next/server";
import { m3Registry, getComponent, searchComponents } from "@/lib/m3/registry";
import { colorRoles, springs, shapes, typeScale, stateOpacities, elevations, easings, durations } from "@/lib/m3/tokens";
import { m3Themes, getTheme, themeIds, defaultThemeId } from "@/lib/m3/themes";
import { categoryLabels } from "@/lib/m3/types";

/**
 * GET /api/registry                     → full machine-readable registry
 * GET /api/registry?component=button    → single component (full docs)
 * GET /api/registry?q=nav               → search components
 * GET /api/registry?summary=true        → lightweight index (no props/guidelines)
 * GET /api/registry?tokens=true         → design tokens only
 * GET /api/registry?themes=true         → curated theme index
 * GET /api/registry?themes=true&theme=ocean → single theme (full light+dark schemes)
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
      easings,
      durations,
      shapes,
      elevations,
      typeScale,
      stateLayers: stateOpacities,
      themes: m3Themes.map((t) => ({ id: t.id, label: t.label, seed: t.seed, description: t.description })),
      typographyFont: "Roboto Flex (variable)",
      iconFont: "Material Symbols Rounded (variable)",
    });
  }

  if (searchParams.get("themes")) {
    const themeId = searchParams.get("theme");
    if (themeId) {
      const theme = getTheme(themeId);
      if (!theme) {
        return NextResponse.json({ error: `Theme "${themeId}" not found`, available: themeIds }, { status: 404 });
      }
      return NextResponse.json(theme);
    }
    return NextResponse.json({
      default: defaultThemeId,
      count: m3Themes.length,
      themes: m3Themes.map((t) => ({
        id: t.id,
        label: t.label,
        seed: t.seed,
        description: t.description,
        swatch: t.swatch,
        schemes: ["light", "dark"],
      })),
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
