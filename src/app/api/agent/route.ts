import { NextResponse } from "next/server";
import { m3Registry } from "@/lib/m3/registry";

/**
 * GET /api/agent
 *
 * Agentic discovery endpoint — gives AI coding agents everything they
 * need to correctly USE this library: import map, usage protocol,
 * design-token rules, and links to the full registry.
 */
export async function GET() {
  const base = {
    library: "m3-expressive-react",
    version: m3Registry.version,
    role: "Material 3 Expressive component library for React / Next.js",
    forAgents: {
      summary:
        "You (an AI agent) can build Material 3 Expressive UIs with this library. Discover components below, emit the exact import lines, follow the design rules, and validate props against the structured metadata in /api/registry.",
      protocol: [
        "1. List components: GET /api/registry?summary=true",
        "2. Full docs for one component (props, variants, guidelines, example): GET /api/registry?component=<id>",
        "3. Full registry dump: GET /api/registry  ·  Token dump: GET /api/registry?tokens=true",
        "4. Plain-text handbook for LLM context windows: GET /llms.txt",
        "5. Emit code using the import lines from metadata; never invent props not present in the props schema.",
      ],
      designRules: [
        "Always import from the barrel: import { Button, Card } from '@/components/m3' — or use the per-file path shown in each component's importLine.",
        "Icons are Material Symbols: pass ligature names as strings, e.g. <Button icon=\"edit\" /> or <MaterialSymbol icon=\"home\" />.",
        "Color roles (never raw hex): bg-m3-primary, text-m3-on-surface, bg-m3-surface-container-high, border-m3-outline-variant, etc.",
        "One filled/high-emphasis action per region; order actions by decreasing emphasis left→right.",
        "Motion is spring-based; springs are exported from '@/lib/m3/tokens' (springs.expressive is the signature bouncy M3E spring).",
        "Interactive elements automatically include state layers (hover 8%, focus 10%, pressed 10%).",
        "Support light AND dark themes — all colors are tokenized, never hard-code backgrounds.",
        "Respect accessibility: every icon-only control needs an aria-label; dialogs/sheets close on Escape; focus rings are built in (.m3-focus).",
      ],
      importMap: {
        barrel: `import { Button, Card, Dialog, LoadingIndicator } from "@/components/m3";`,
        tokens: `import { springs, shapes, colorRoles } from "@/lib/m3/tokens";`,
        registryHelpers: `import { m3Registry, getComponent, searchComponents } from "@/lib/m3/registry";`,
      },
      categories: m3Registry.categories,
      componentCount: m3Registry.totalCount,
      m3eComponents: m3Registry.components.filter((c) => c.m3e).map((c) => c.id),
    },
  };
  return NextResponse.json(base);
}
