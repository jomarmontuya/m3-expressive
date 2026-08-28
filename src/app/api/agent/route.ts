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
    package: {
      name: "m3-expressive-react",
      version: "1.0.0",
      install: "npm i m3-expressive-react",
      exports: {
        ".": "Barrel — all 40 components + MaterialSymbol/Ripple primitives + tokens/registry/types/themes re-exports",
        "./styles.css": "Standalone token + primitive stylesheet (all --md-* color roles light/dark, 4 curated [data-theme] schemes, .md-* type scale, .m3-state/.m3-focus/.m3-elevation-*/ripple/m3-scroll, Material Symbols icon CSS)",
        "./tokens": "springs, easings, durations, shapes, shapeMorph, stateOpacities, typeScale, elevations, colorRoles",
        "./types": "M3ComponentMeta / M3Registry contract types",
        "./meta": "All 40 M3ComponentMeta objects (agentic metadata)",
        "./themes": "m3Themes, getTheme, themeIds, schemeToCssVars (curated schemes as data)",
        "./theme-builder": "generateScheme/schemeToCssVars — seed → full light+dark scheme (@material/material-color-utilities, server-safe)",
        "./registry": "m3Registry, getComponent, searchComponents, getComponentsByCategory (isomorphic)",
        "./hooks": "useM3Theme — curated + custom scheme and light/dark controller (client)",
      },
      peerDependencies: {
        react: ">=18 <20",
        "react-dom": ">=18 <20",
        "framer-motion": ">=11 <13",
      },
      note: "Tailwind 4 is required for full component styling: add @source \"../node_modules/m3-expressive-react\"; plus the --color-m3-*/--radius-m3-* @theme mapping from the package README. styles.css alone provides tokens + primitives.",
    },
    role: "Material 3 Expressive component library for React / Next.js",
    forAgents: {
      summary:
        "You (an AI agent) can build Material 3 Expressive UIs with this library. Discover components below, emit the exact import lines, follow the design rules, and validate props against the structured metadata in /api/registry.",
      protocol: [
        "1. List components: GET /api/registry?summary=true",
        "2. Full docs for one component (props, variants, guidelines, example): GET /api/registry?component=<id>",
        "3. Full registry dump: GET /api/registry  ·  Token dump: GET /api/registry?tokens=true  ·  Themes: GET /api/registry?themes=true  ·  Custom scheme from a seed: GET /api/theme-builder?seed=<hex>&variant=<id>&contrast=<0..1>",
        "4. Plain-text handbook for LLM context windows: GET /llms.txt",
        "5. PREFERRED for MCP-capable agents: run the MCP server at mini-services/mcp-server (stdio) — tools: list_components, get_component, get_component_api, get_component_examples, get_component_guidelines, get_component_states, get_component_source, list_themes, get_theme, get_design_tokens, get_motion_guidance, get_accessibility_guidance, search_components. See mini-services/mcp-server/README.md for client config.",
        "6. Emit code using the import lines from metadata; never invent props not present in the props schema.",
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
      mcpHttp: {
        url: "/mcp?XTransformPort=3210",
        transport: "streamable-http",
        note: "Streamable HTTP transport (stateless, no Mcp-Session-Id; CORS open). Absolute origin when running locally: http://localhost:3210/mcp — start the daemon with `cd mini-services/mcp-server && bun run dev`; the XTransformPort query param routes /mcp through the :3000 gateway to port 3210. Same 14 tools as the stdio server; protocolVersion 2025-03-26; health probe: GET http://localhost:3210/.",
      },
      mcpServer: {
        name: "m3-expressive",
        transport: "stdio",
        path: "mini-services/mcp-server/index.ts",
        run: "bun run --cwd mini-services/mcp-server start",
        docs: "mini-services/mcp-server/README.md",
        tools: [
          "list_components", "search_components", "get_component", "get_component_api",
          "get_component_examples", "get_component_guidelines", "get_component_states",
          "get_component_source", "list_themes", "get_theme", "get_design_tokens",
          "get_motion_guidance", "get_accessibility_guidance",
        ],
      },
      themes: [
        { id: "baseline", label: "Material Violet", seed: "#6750A4" },
        { id: "ocean", label: "Ocean Blue", seed: "#0B57D0" },
        { id: "emerald", label: "Emerald Fresh", seed: "#006E1C" },
        { id: "coral", label: "Warm Coral", seed: "#FB7C41" },
      ],
    },
  };
  return NextResponse.json(base);
}
