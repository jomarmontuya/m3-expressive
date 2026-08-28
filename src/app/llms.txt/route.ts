import { m3Registry } from "@/lib/m3/registry";

/**
 * GET /llms.txt — plain-text handbook for LLMs and coding agents.
 * Follows the llms.txt convention (https://llmstxt.org).
 */
export async function GET() {
  const r = m3Registry;

  const lines: string[] = [];
  lines.push(`# ${r.library}`);
  lines.push("");
  lines.push(`> ${r.description}`);
  lines.push("");
  lines.push(`Version: ${r.version} · Components: ${r.totalCount} · Spec: ${r.spec}`);
  lines.push("");
  lines.push("## How to use this library (for AI agents)");
  lines.push("");
  lines.push("- Import from the barrel: `import { Button, Card } from \"@/components/m3\";`");
  lines.push("- Icons: Material Symbols ligature names as strings (`icon=\"edit\"`).");
  lines.push("- Colors: always token roles (`bg-m3-primary`, `text-m3-on-surface-variant`, `bg-m3-surface-container-high`, `border-m3-outline-variant`) — never raw hex.");
  lines.push("- Motion: springs from `@/lib/m3/tokens` (`springs.expressive` is the signature bouncy M3E spring).");
  lines.push("- Machine-readable docs: `GET /api/registry`, one component: `GET /api/registry?component=<id>`, tokens: `GET /api/registry?tokens=true`, themes: `GET /api/registry?themes=true`, custom scheme from a seed: `GET /api/theme-builder?seed=<hex>&variant=<tonal-spot|vibrant|expressive|content|fidelity|rainbow|fruit-salad>&contrast=<0|0.5|1>`, agent manifest: `GET /api/agent`.");
  lines.push("- MCP server (preferred for MCP-capable agents): stdio server at `mini-services/mcp-server` exposing list_components, get_component, get_component_api, get_component_examples, get_component_guidelines, get_component_states, get_component_source, search_components, list_themes, get_theme, generate_theme, get_design_tokens, get_motion_guidance, get_accessibility_guidance. Config: `{\"command\":\"bun\",\"args\":[\"run\",\"--cwd\",\"<abs>/mini-services/mcp-server\",\"start\"]}`. Full instructions: `mini-services/mcp-server/README.md`.");
  lines.push("- MCP over streamable HTTP (stateless, CORS open — for browser/remote agents): `POST http://localhost:3210/mcp` with JSON-RPC 2.0 (also `tools/list`, `tools/call`); health at `GET http://localhost:3210/`; start with `cd mini-services/mcp-server && bun run dev`.");
  lines.push("- Emit only props documented in the registry; all components accept `className` and native element props.");
  lines.push("");
  lines.push("## Package");
  lines.push("");
  lines.push("- npm: `m3-expressive-react` v1.0.0 — install with `npm i m3-expressive-react`. Peer deps: react >=18 <20, react-dom >=18 <20, framer-motion >=11 <13.");
  lines.push("- Exports: `m3-expressive-react` (barrel: all 40 components + primitives + tokens/registry/types/themes re-exports), `m3-expressive-react/styles.css` (standalone `--md-*` token + primitive stylesheet), and subpaths `tokens`, `types`, `meta`, `themes`, `theme-builder`, `registry`, `hooks`.");
  lines.push("- Tailwind 4: components style themselves with Tailwind utility classes mapped to M3 tokens — add `@source \"../node_modules/m3-expressive-react\";` plus the `--color-m3-*` / `--radius-m3-*` `@theme` mapping from the package README, and import `m3-expressive-react/styles.css`.");
  lines.push("- Theming: dark mode = `.dark` class on `<html>`; curated schemes = `data-theme=\"ocean\" | \"emerald\" | \"coral\"` (baseline violet = attribute removed); custom seed→scheme via `m3-expressive-react/theme-builder` (`generateScheme`) or the `hooks` controller (`useM3Theme`).");
  lines.push("");
  for (const cat of r.categories) {
    const comps = r.components.filter((c) => c.category === cat);
    lines.push(`## ${cat} (${comps.length})`);
    lines.push("");
    for (const c of comps) {
      lines.push(`### ${c.name}${c.m3e ? " (NEW in M3 Expressive)" : ""}`);
      lines.push(`- id: \`${c.id}\``);
      lines.push(`- ${c.description}`);
      lines.push(`- import: ${c.importLine}`);
      if (c.variants?.length) lines.push(`- variants: ${c.variants.join(", ")}`);
      lines.push(`- props: ${c.props.map((p) => `${p.name}${p.default ? `=${p.default}` : ""}: ${p.type}`).join("; ")}`);
      lines.push(`- when to use: ${c.guidelines.whenToUse.join(" | ")}`);
      if (c.guidelines.donts?.length) lines.push(`- avoid: ${c.guidelines.donts.join(" | ")}`);
      lines.push(`- example:`);
      lines.push("```tsx");
      lines.push(c.exampleCode);
      lines.push("```");
      lines.push("");
    }
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
