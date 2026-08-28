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
  lines.push("- Machine-readable docs: `GET /api/registry`, one component: `GET /api/registry?component=<id>`, tokens: `GET /api/registry?tokens=true`, agent manifest: `GET /api/agent`.");
  lines.push("- Emit only props documented in the registry; all components accept `className` and native element props.");
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
