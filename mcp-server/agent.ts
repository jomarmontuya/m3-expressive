import { m3Registry } from "../src/lib/m3/registry";
import { m3Themes } from "../src/lib/m3/themes";

export const MCP_TOOL_NAMES = [
  "list_components",
  "search_components",
  "get_component",
  "get_component_api",
  "get_component_examples",
  "get_component_guidelines",
  "get_component_states",
  "get_component_source",
  "list_themes",
  "get_theme",
  "generate_theme",
  "get_design_tokens",
  "get_motion_guidance",
  "get_accessibility_guidance",
] as const;

export const agentManifest = {
  library: m3Registry.library,
  version: m3Registry.version,
  package: {
    name: m3Registry.library,
    version: m3Registry.version,
    install: `npm i ${m3Registry.library}`,
    exports: {
      ".": `Barrel - all ${m3Registry.totalCount} components + MaterialSymbol/Ripple primitives + tokens/registry/types/themes re-exports`,
      "./styles.css":
        "Standalone token + primitive stylesheet (all --md-* color roles light/dark, 4 curated [data-theme] schemes, .md-* type scale, .m3-state/.m3-focus/.m3-elevation-*/ripple/m3-scroll, Material Symbols icon CSS)",
      "./compiled.css":
        "Pre-compiled stylesheet for consumers without Tailwind: tokens + helpers + exactly the utilities the components use (no preflight/reset; safe alongside any CSS stack)",
      "./tokens":
        "springs, easings, durations, shapes, shapeMorph, stateOpacities, typeScale, elevations, colorRoles",
      "./types": "M3ComponentMeta / M3Registry contract types",
      "./meta": `All ${m3Registry.totalCount} M3ComponentMeta objects (agentic metadata)`,
      "./themes": "m3Themes, getTheme, themeIds, schemeToCssVars (curated schemes as data)",
      "./theme-builder":
        "generateScheme/schemeToCssVars - seed to full light+dark scheme (@material/material-color-utilities, server-safe)",
      "./registry":
        "m3Registry, getComponent, searchComponents, getComponentsByCategory (isomorphic)",
      "./hooks": "useM3Theme - curated + custom scheme and light/dark controller (client)",
    },
    peerDependencies: {
      react: ">=18 <20",
      "react-dom": ">=18 <20",
      "framer-motion": ">=11 <13",
    },
    styling: {
      tailwind4:
        'Add @source "../node_modules/m3-expressive-react"; plus the --color-m3-*/--radius-m3-* @theme mapping from the package README, then import "m3-expressive-react/styles.css".',
      withoutTailwind:
        'Import "m3-expressive-react/compiled.css" for tokens, helpers, and the emitted utilities without a Tailwind build step.',
    },
    note: "Both styling paths ship all curated schemes and the Material Symbols icon CSS.",
  },
  role: "Material 3 Expressive component library for React / Next.js",
  forAgents: {
    summary:
      "Build Material 3 Expressive UIs with this library. Discover components below, emit the exact import lines, follow the design rules, and validate props against /api/registry.",
    protocol: [
      "1. List components: GET /api/registry?summary=true",
      "2. Full docs for one component (props, variants, guidelines, example): GET /api/registry?component=<id>",
      "3. Full registry dump: GET /api/registry  |  Token dump: GET /api/registry?tokens=true  |  Themes: GET /api/registry?themes=true  |  Custom scheme: GET /api/theme-builder?seed=<hex>&variant=<id>&contrast=<0..1>",
      "4. Plain-text handbook for LLM context windows: GET /llms.txt",
      `5. Preferred for MCP clients: run mcp-server and use ${MCP_TOOL_NAMES.join(", ")}.`,
      "6. Emit code using the import lines from metadata. Never invent props outside the props schema.",
    ],
    designRules: [
      `Import components from the package barrel: import { Button, Card } from "${m3Registry.library}".`,
      "Icons are Material Symbols. Pass ligature names as strings, such as <Button icon=\"edit\" /> or <MaterialSymbol icon=\"home\" />.",
      "Use semantic color roles instead of raw hex values: bg-m3-primary, text-m3-on-surface, bg-m3-surface-container-high, border-m3-outline-variant.",
      "Use one filled high-emphasis action per region. Order actions by decreasing emphasis.",
      `Import motion tokens from "${m3Registry.library}/tokens". springs.expressive is the signature bouncy M3E spring.`,
      "Interactive components include token-driven hover, focus, and pressed state layers.",
      "Support light and dark themes. Use token colors instead of hard-coded backgrounds.",
      "Give every icon-only control an accessible name. Dialogs and sheets must support Escape and focus recovery.",
    ],
    importMap: {
      barrel: `import { Button, Card, Dialog, LoadingIndicator } from "${m3Registry.library}";`,
      tokens: `import { springs, shapes, colorRoles } from "${m3Registry.library}/tokens";`,
      registryHelpers: `import { m3Registry, getComponent, searchComponents } from "${m3Registry.library}/registry";`,
    },
    categories: m3Registry.categories,
    componentCount: m3Registry.totalCount,
    m3eComponents: m3Registry.components.filter((component) => component.m3e).map((component) => component.id),
    mcpHttp: {
      url: "http://localhost:3210/mcp",
      gatewayUrl: "/mcp?XTransformPort=3210",
      transport: "streamable-http",
      note: "Use the direct URL from localhost:3000. The relative gateway URL is for preview hosts that support XTransformPort. Start the service with `cd mcp-server && bun run dev`.",
    },
    mcpServer: {
      name: "m3-expressive",
      transport: "stdio",
      path: "mcp-server/index.ts",
      run: "bun run --cwd mcp-server start",
      docs: "mcp-server/README.md",
      tools: MCP_TOOL_NAMES,
    },
    themes: m3Themes.map(({ id, label, seed }) => ({ id, label, seed })),
  },
};

export function buildAgentHandbook(): string {
  const lines: string[] = [];

  lines.push(`# ${m3Registry.library}`);
  lines.push("");
  lines.push(`> ${m3Registry.description}`);
  lines.push("");
  lines.push(
    `Version: ${m3Registry.version} | Components: ${m3Registry.totalCount} | Spec: ${m3Registry.spec}`
  );
  lines.push("");
  lines.push("## How to use this library (for AI agents)");
  lines.push("");
  lines.push(`- Import from the package barrel: \`import { Button, Card } from "${m3Registry.library}";\``);
  lines.push('- Icons: use Material Symbols ligature names as strings, such as `icon="edit"`.');
  lines.push(
    "- Colors: use token roles such as `bg-m3-primary`, `text-m3-on-surface-variant`, `bg-m3-surface-container-high`, and `border-m3-outline-variant`. Do not use raw hex values."
  );
  lines.push(
    `- Motion: import springs from \`${m3Registry.library}/tokens\`. \`springs.expressive\` is the signature bouncy M3E spring.`
  );
  lines.push(
    "- Machine-readable docs: `GET /api/registry`, one component: `GET /api/registry?component=<id>`, tokens: `GET /api/registry?tokens=true`, themes: `GET /api/registry?themes=true`, custom scheme: `GET /api/theme-builder?seed=<hex>&variant=<tonal-spot|vibrant|expressive|content|fidelity|rainbow|fruit-salad>&contrast=<0|0.5|1>`, agent manifest: `GET /api/agent`."
  );
  lines.push(
    `- MCP server: stdio at \`mcp-server\` with ${MCP_TOOL_NAMES.length} tools (${MCP_TOOL_NAMES.join(", ")}). Config: \`{"command":"bun","args":["run","--cwd","<abs>/mcp-server","start"]}\`.`
  );
  lines.push(
    "- MCP over streamable HTTP: `POST http://localhost:3210/mcp`. Start it with `cd mcp-server && bun run dev`."
  );
  lines.push(
    "- MCP resources: `m3://handbook`, `m3://components`, `m3://components/{id}`, `m3://tokens`, `m3://themes`, `m3://package`. Prompts: `m3_screen_builder`, `m3_style_audit`, `m3_theme_seed`."
  );
  lines.push("- Emit only props documented in the registry.");
  lines.push("");
  lines.push("## Package");
  lines.push("");
  lines.push(
    `- npm: \`${agentManifest.package.name}\` v${agentManifest.package.version}. Install with \`${agentManifest.package.install}\`. Peer dependencies: React ${agentManifest.package.peerDependencies.react}, React DOM ${agentManifest.package.peerDependencies["react-dom"]}, Framer Motion ${agentManifest.package.peerDependencies["framer-motion"]}.`
  );
  lines.push(
    `- Exports: \`${m3Registry.library}\` (${m3Registry.totalCount} components plus primitives and data), \`${m3Registry.library}/styles.css\`, \`${m3Registry.library}/compiled.css\`, and the \`tokens\`, \`types\`, \`meta\`, \`themes\`, \`theme-builder\`, \`registry\`, and \`hooks\` subpaths.`
  );
  lines.push(
    `- Without Tailwind: import \`${m3Registry.library}/compiled.css\` for the compiled utilities and token styles.`
  );
  lines.push(
    `- Tailwind 4: add \`@source "../node_modules/${m3Registry.library}";\`, map the M3 color and radius tokens from the package README, and import \`${m3Registry.library}/styles.css\`.`
  );
  lines.push(
    `- Theming: use the \`.dark\` class, a curated \`data-theme\`, or \`generateScheme\` from \`${m3Registry.library}/theme-builder\`.`
  );
  lines.push("");

  for (const category of m3Registry.categories) {
    const components = m3Registry.components.filter((component) => component.category === category);
    lines.push(`## ${category} (${components.length})`);
    lines.push("");
    for (const component of components) {
      lines.push(`### ${component.name}${component.m3e ? " (NEW in M3 Expressive)" : ""}`);
      lines.push(`- id: \`${component.id}\``);
      lines.push(`- ${component.description}`);
      lines.push(`- import: ${component.importLine}`);
      if (component.variants?.length) lines.push(`- variants: ${component.variants.join(", ")}`);
      lines.push(
        `- props: ${component.props
          .map((prop) => `${prop.name}${prop.default ? `=${prop.default}` : ""}: ${prop.type}`)
          .join("; ")}`
      );
      lines.push(`- when to use: ${component.guidelines.whenToUse.join(" | ")}`);
      if (component.guidelines.donts?.length) {
        lines.push(`- avoid: ${component.guidelines.donts.join(" | ")}`);
      }
      lines.push("- example:");
      lines.push("```tsx");
      lines.push(component.exampleCode);
      lines.push("```");
      lines.push("");
    }
  }

  return lines.join("\n");
}
