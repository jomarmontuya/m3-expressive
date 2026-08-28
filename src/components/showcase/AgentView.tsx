"use client";

import * as React from "react";
import { Button } from "@/components/m3/Button";
import { Card } from "@/components/m3/Card";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { m3Registry } from "@/lib/m3/registry";
import { CodeBlock } from "./CodeBlock";
import { MCPPlayground } from "./MCPPlayground";

const ENDPOINTS = [
  {
    method: "GET",
    path: "/api/agent",
    desc: "Capability manifest: protocol steps, design rules, import map. Point your agent here first.",
  },
  {
    method: "GET",
    path: "/api/registry",
    desc: `Full registry — all ${m3Registry.totalCount} components with props schemas, variants, guidelines and examples.`,
  },
  {
    method: "GET",
    path: "/api/registry?component=button",
    desc: "Single component documentation (swap in any component id).",
  },
  {
    method: "GET",
    path: "/api/component-source?id=button",
    desc: "The real .tsx implementation file for one component — same text the Source code tab and MCP get_component_source return.",
  },
  {
    method: "GET",
    path: "/api/registry?summary=true",
    desc: "Lightweight index for fast discovery.",
  },
  {
    method: "GET",
    path: "/api/registry?q=slider",
    desc: "Full-text search across names, props, variants.",
  },
  {
    method: "GET",
    path: "/api/registry?tokens=true",
    desc: "Design tokens: 24 color roles, 12 springs, shape scale, type scale, state layers.",
  },
  {
    method: "GET",
    path: "/api/registry?themes=true",
    desc: "Curated theme index (4 M3 color schemes); add &theme=ocean for full light+dark schemes.",
  },
  {
    method: "GET",
    path: "/api/theme-builder",
    desc: "Generate a full M3 scheme from any seed: ?seed=#FF0000&variant=vibrant&contrast=0.5 → light+dark roles + CSS blocks.",
  },
  {
    method: "GET",
    path: "/llms.txt",
    desc: "Plain-text handbook following the llms.txt convention — paste into any LLM context window.",
  },
];

const MCP_TOOLS = [
  ["list_components", "All 39 components with ids, categories, variants, import lines"],
  ["search_components", "Full-text search across descriptions, guidance and props"],
  ["get_component", "Complete structured knowledge for one component"],
  ["get_component_api", "Typed props reference (name / type / default / description)"],
  ["get_component_examples", "Recommended, ready-to-paste JSX usage"],
  ["get_component_guidelines", "When to use, anatomy, states, dos and don'ts"],
  ["get_component_states", "Interaction states + variants + state-layer opacities"],
  ["get_component_source", "The actual .tsx implementation for deep questions"],
  ["list_themes", "The 4 curated M3 color schemes"],
  ["get_theme", "Full light + dark color-role schemes (hex per role)"],
  ["generate_theme", "Generate a full M3 scheme from any seed color — 7 palette styles, 3 contrast levels"],
  ["get_design_tokens", "Every token: colors, springs, easings, durations, shapes, elevation, type"],
  ["get_motion_guidance", "M3E motion system rules + all motion tokens"],
  ["get_accessibility_guidance", "Touch targets, focus, keyboard contracts, ARIA patterns"],
] as const;

export function AgentView() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="md-label-large text-m3-primary">Agentic compatibility</div>
      <h1 className="mt-1 md-display-small font-semibold">Built for AI coding agents</h1>
      <p className="mt-3 max-w-3xl md-body-large text-m3-on-surface-variant">
        Every component ships structured metadata — props schemas, variant unions, official design
        guidelines and runnable examples — exposed through machine-readable HTTP endpoints. Agents
        can discover, validate and emit correct M3 Expressive code without ever seeing this site.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          variant="filled"
          icon="smart_toy"
          onClick={() => window.open("/api/agent", "_blank")}
        >
          View agent manifest
        </Button>
        <Button
          variant="tonal"
          icon="data_object"
          onClick={() => window.open("/api/registry", "_blank")}
        >
          Registry JSON
        </Button>
        <Button
          variant="outlined"
          icon="description"
          onClick={() => window.open("/llms.txt", "_blank")}
        >
          llms.txt handbook
        </Button>
      </div>

      {/* endpoints */}
      <section className="mt-10">
        <h2 className="md-headline-small font-medium">Endpoints</h2>
        <div className="mt-4 space-y-3">
          {ENDPOINTS.map((e) => (
            <Card key={e.path} variant="outlined" className="p-0">
              <div className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center">
                <span className="rounded-md bg-m3-primary-container px-2 py-1 font-mono text-[11px] font-semibold text-m3-on-primary-container">
                  {e.method}
                </span>
                <code className="font-mono text-[13px] font-medium text-m3-on-surface">{e.path}</code>
                <span className="md-body-small text-m3-on-surface-variant sm:ml-auto sm:max-w-md sm:text-right">
                  {e.desc}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* MCP playground — live client for the MCP server */}
      <MCPPlayground />

      {/* MCP server */}
      <section className="mt-10">
        <h2 className="md-headline-small font-medium">MCP server</h2>
        <p className="mt-2 max-w-3xl md-body-medium text-m3-on-surface-variant">
          MCP-capable agents (Claude Code, Cursor, Windsurf, Zed…) get the whole library as
          structured tool calls over stdio — no repo reading required.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Card variant="filled" className="p-5">
            <div className="flex items-center gap-2 md-title-medium">
              <MaterialSymbol icon="cable" fill className="text-m3-primary" />
              Connect (stdio)
            </div>
            <div className="mt-3">
              <CodeBlock
                language="json"
                code={`// .mcp.json — repo root
{
  "mcpServers": {
    "m3-expressive": {
      "command": "bun",
      "args": ["run", "--cwd",
        "/ABS/PATH/mini-services/mcp-server",
        "start"]
    }
  }
}`}
              />
            </div>
            <p className="mt-3 md-body-small text-m3-on-surface-variant">
              14 tools · full instructions in <code className="font-mono">mini-services/mcp-server/README.md</code>
            </p>
          </Card>
          <Card variant="outlined" className="p-0">
            <div className="max-h-72 overflow-y-auto m3-scroll p-5">
              <div className="flex items-center gap-2 md-title-medium">
                <MaterialSymbol icon="construction" fill className="text-m3-primary" />
                Tool surface
              </div>
              <ul className="mt-3 space-y-2">
                {MCP_TOOLS.map(([name, desc]) => (
                  <li key={name} className="flex flex-col gap-0.5">
                    <code className="font-mono text-[12px] font-semibold text-m3-primary">{name}</code>
                    <span className="md-body-small text-m3-on-surface-variant">{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* agent prompt snippet */}
      <section className="mt-10">
        <h2 className="md-headline-small font-medium">Drop this into your agent&apos;s system prompt</h2>
        <div className="mt-4">
          <CodeBlock
            language="text"
            code={`You build UIs with the "m3-expressive-react" library (Material 3 Expressive).

1. Prefer the MCP server "m3-expressive" if connected:
   list_components → get_component → get_component_examples
2. Otherwise fetch component docs: GET /api/registry?summary=true
3. Get full component spec: GET /api/registry?component=<id>
   (props schema, variants, guidelines, example)
4. Emit imports exactly:    import { Button } from "@/components/m3";
5. Rules:
   - Icons are Material Symbols strings: icon="edit"
   - Colors are token roles: bg-m3-primary, text-m3-on-surface
   - One filled (high-emphasis) action per region
   - Motion: transition={springs.expressive} for playful morphs
   - Emit only documented props
6. Handbook (paste-able):   GET /llms.txt`}
          />
        </div>
      </section>

      {/* metadata shape */}
      <section className="mt-10">
        <h2 className="md-headline-small font-medium">Every component carries this metadata</h2>
        <div className="mt-4">
          <CodeBlock
            language="json"
            code={`{
  "id": "button",
  "name": "Button",
  "category": "actions",
  "importLine": "import { Button } from \\"@/components/m3\\";",
  "variants": ["filled", "tonal", "outlined", "text", "elevated"],
  "props": [
    { "name": "variant", "type": "'filled' | 'tonal' | …", "default": "'filled'", "description": "Visual emphasis." }
  ],
  "guidelines": {
    "whenToUse": ["…"], "anatomy": ["…"], "states": ["…"],
    "dos": ["…"], "donts": ["…"]
  },
  "exampleCode": "<Button variant=\\"filled\\">Buy now</Button>",
  "m3e": false,
  "related": ["fab", "icon-button"]
}`}
          />
        </div>
      </section>

      <div className="mt-10 rounded-2xl bg-m3-surface-container-low p-6">
        <div className="flex items-center gap-2 md-title-medium">
          <MaterialSymbol icon="verified" fill className="text-m3-primary" />
          {m3Registry.totalCount} components · {m3Registry.components.filter((c) => c.m3e).length} new in
          M3 Expressive · 6 categories · version {m3Registry.version}
        </div>
      </div>
    </div>
  );
}
