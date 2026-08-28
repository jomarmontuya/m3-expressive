# M3 Expressive — MCP Server

A [Model Context Protocol](https://modelcontextprotocol.io) server that exposes the
**m3-expressive-react** component library to AI coding agents (Claude Code, Cursor,
Windsurf, Zed, Gemini CLI, …) as **structured component knowledge** — not raw source dumps.

## What it exposes

| Tool | Purpose |
|---|---|
| `list_components` | All 39 components: id, name, category, variants, M3E flag, source path, import line |
| `search_components` | Full-text search across descriptions, when-to-use guidance and props |
| `get_component` | Complete structured knowledge for one component |
| `get_component_api` | Typed props reference (name / type / default / description) |
| `get_component_examples` | Recommended, ready-to-paste JSX usage |
| `get_component_guidelines` | Official M3 usage guidance: when to use, anatomy, states, dos/don'ts |
| `get_component_states` | Interaction states + variants + state-layer opacities |
| `get_component_source` | The actual `.tsx` implementation (deep behavior questions) |
| `list_themes` | The 4 curated M3 color schemes (Material Violet, Ocean Blue, Emerald Fresh, Warm Coral) |
| `get_theme` | Full light + dark M3 color-role schemes for one theme (hex per role) |
| `generate_theme` | Generate a full M3 scheme (light + dark, all roles + CSS blocks) from any seed color — official Dynamic Color engine, 7 palette styles, 3 contrast levels |
| `get_design_tokens` | Every token: 24 color roles + CSS vars, springs, easings, durations, shapes, elevations, type scale, state layers |
| `get_motion_guidance` | M3E motion system rules + all motion tokens |
| `get_accessibility_guidance` | Touch targets, focus, keyboard contracts, ARIA patterns |

Each component record also includes `when NOT to use` and `related components`, so an
agent can choose the right primitive without opening this repository.

## Run locally

```bash
cd mini-services/mcp-server
bun install
bun start          # stdio transport — this is what MCP clients spawn
```

> This is a **stdio** MCP server: it is started *by the MCP client*, not kept running
> as a daemon. Do not put it behind a port.

## Connect an AI coding agent

### Claude Code (`.mcp.json` in the repo root)

```json
{
  "mcpServers": {
    "m3-expressive": {
      "command": "bun",
      "args": ["run", "--cwd", "/ABSOLUTE/PATH/TO/PROJECT/mini-services/mcp-server", "start"]
    }
  }
}
```

### Claude Desktop (`claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "m3-expressive": {
      "command": "bun",
      "args": ["run", "--cwd", "/ABSOLUTE/PATH/TO/PROJECT/mini-services/mcp-server", "start"]
    }
  }
}
```

### Cursor / Windsurf (MCP settings JSON)

Same shape as above — command `bun`, args `["run", "--cwd", "<abs path>/mini-services/mcp-server", "start"]`.
If the client doesn't support `--cwd`, use:

```json
{
  "command": "bun",
  "args": ["/ABSOLUTE/PATH/TO/PROJECT/mini-services/mcp-server/index.ts"]
}
```

### Without bun (Node 20+)

```bash
npm install && npx tsx index.ts
```

## Verify

From any MCP inspector:

```bash
npx @modelcontextprotocol/inspector bun /ABSOLUTE/PATH/TO/PROJECT/mini-services/mcp-server/index.ts
```

## Data source

The server imports the library's single source of truth directly:

- `src/lib/m3/meta.ts` — structured component metadata (39 components)
- `src/lib/m3/tokens.ts` — design tokens
- `src/lib/m3/themes.ts` — curated theme registry

HTTP mirrors of the same data (when the Next.js app is running):
`/api/registry`, `/api/registry?themes=true`, `/api/agent`, `/llms.txt`.
