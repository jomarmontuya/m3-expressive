# M3 Expressive — MCP Server

A [Model Context Protocol](https://modelcontextprotocol.io) server that exposes the
**m3-expressive-react** component library to AI coding agents (Claude Code, Cursor,
Windsurf, Zed, Gemini CLI, …) as **structured component knowledge** — not raw source dumps.

## What it exposes

| Tool | Purpose |
|---|---|
| `list_components` | All 39 component metas (the Next.js registry advertises 40 entries): id, name, category, variants, M3E flag, source path, import line |
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

The server also exposes **6 read-only resources** (5 concrete + 1 URI template) and
**3 task prompts** — see the sections below. Tools, resources and prompts serve the
same registry data, so they can never disagree.

## Resources (read-only)

| URI | Content |
|---|---|
| `m3://handbook` | The full library handbook — the same content the Next.js `/llms.txt` route serves (composed from the same metas inside the mini-service), as `text/markdown` |
| `m3://components` | Index of all components: id, name, category, variants, M3E flag |
| `m3://components/{id}` | **URI template** — full metadata for one component. Unknown ids return a `404: Unknown component "…"` JSON-RPC error; supports `completion/complete` on the `id` variable |
| `m3://tokens` | Every design token as pretty JSON: color roles, springs/easings/durations, shape scale + morphs, elevations, type scale, state-layer opacities |
| `m3://themes` | All curated themes (full light + dark role maps) plus `defaultThemeId` |
| `m3://package` | npm package facts: name, version, install command, exports map, peer deps, Tailwind-4 vs `compiled.css` styling paths |

```bash
# List resources (5 concrete) and resource templates (1: m3://components/{id})
curl -s -X POST http://localhost:3210/mcp -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":10,"method":"resources/list"}'
curl -s -X POST http://localhost:3210/mcp -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":11,"method":"resources/templates/list"}'

# Read one component (JSON with guidelines) + the token system + the handbook
curl -s -X POST http://localhost:3210/mcp -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":12,"method":"resources/read","params":{"uri":"m3://components/button"}}'
curl -s -X POST http://localhost:3210/mcp -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":13,"method":"resources/read","params":{"uri":"m3://tokens"}}'
curl -s -X POST http://localhost:3210/mcp -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":14,"method":"resources/read","params":{"uri":"m3://handbook"}}'

# Unknown id → JSON-RPC error: "404: Unknown component \"nonexistent\". Read m3://components …"
curl -s -X POST http://localhost:3210/mcp -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":15,"method":"resources/read","params":{"uri":"m3://components/nonexistent"}}'

# Autocomplete ids for the template (SDK 1.30 ref shape)
curl -s -X POST http://localhost:3210/mcp -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":16,"method":"completion/complete","params":{"ref":{"type":"ref/resource","uri":"m3://components/{id}"},"argument":{"name":"id","value":"date"}}}'
```

## Prompts

| Prompt | Arguments | Purpose |
|---|---|---|
| `m3_screen_builder` | `description` (required), `framework` (`react`\|`next`, default `react`) | Guided screen-building playbook: `list_components` + `search_components` → `get_component_guidelines` + `get_component_examples` per chosen id → emit ONE compilable file importing only documented props from `m3-expressive-react`, with `data-theme` + `styles.css` wiring guidance |
| `m3_style_audit` | `code` (required) | Audit user JSX against the M3 Expressive guidelines (variant misuse, missing state layers/focus, wrong dp sizes, 48dp touch targets, token violations) and return a structured findings list (severity · snippet · violated guideline · fixed code) |
| `m3_theme_seed` | `brand` (required), `variant` (optional palette style) | Derive a seed hex from the brand description, call `generate_theme`, then emit the `--md-*` CSS variable blocks with `data-theme`/`.dark` wiring |

```bash
# List prompts
curl -s -X POST http://localhost:3210/mcp -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":20,"method":"prompts/list"}'

# Get one (returns 3 messages: workflow · task · plan)
curl -s -X POST http://localhost:3210/mcp -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":21,"method":"prompts/get","params":{"name":"m3_screen_builder","arguments":{"description":"a settings screen"}}}'
```

## Transports

| Transport | Command | Who starts it | Use case |
|---|---|---|---|
| **stdio** (default) | `bun start` | the MCP client (spawned per session) | Claude Code / Cursor / Windsurf / Zed / Gemini CLI — `.mcp.json` config below |
| **streamable HTTP** (stateless) | `bun run dev` | you / the dev runner (daemon on port **3210**) | browser clients, the showcase, remote agents, `curl` exploration |

Both serve the exact same surface: 14 tools · 6 resources (incl. 1 URI template) · 3 prompts.

## Run — stdio (default)

```bash
cd mini-services/mcp-server
bun install
bun start          # stdio transport — this is what MCP clients spawn
```

> This is a **stdio** MCP server: it is started *by the MCP client*, not kept running
> as a daemon. Do not put it behind a port.

### Connect an AI coding agent (stdio)

#### Claude Code (`.mcp.json` in the repo root)

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

#### Claude Desktop (`claude_desktop_config.json`)

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

#### Cursor / Windsurf (MCP settings JSON)

Same shape as above — command `bun`, args `["run", "--cwd", "<abs path>/mini-services/mcp-server", "start"]`.
If the client doesn't support `--cwd`, use:

```json
{
  "command": "bun",
  "args": ["/ABSOLUTE/PATH/TO/PROJECT/mini-services/mcp-server/index.ts"]
}
```

## Run — streamable HTTP (port 3210)

```bash
cd mini-services/mcp-server
bun run dev        # MCP_TRANSPORT=http bun --hot index.ts — auto-restarts on edit
# or one-shot: bun run start:http   ·   or: bun index.ts --http
```

- `POST /mcp` — JSON-RPC 2.0 (MCP **Streamable HTTP** transport, per-request
  `StreamableHTTPServerTransport` with `sessionIdGenerator: undefined` → **stateless**:
  no `Mcp-Session-Id` header is issued or required, every request is independent).
  Responses are plain `application/json` (`enableJsonResponse: true`, no SSE streams).
- `GET /mcp` → `405` (stateless mode has no server-initiated SSE stream).
- `DELETE /mcp` → `204`, `OPTIONS /mcp` → `204` (CORS preflight).
- `GET /` → health JSON: `{ service, transport, tools: 14, status: "ok", … }`.
- CORS is fully open (`Access-Control-Allow-Origin: *`, methods
  `POST/GET/DELETE/OPTIONS`, headers `content-type / mcp-session-id / mcp-protocol-version`)
  so browser clients can connect cross-origin through the gateway.
- Port: **3210** hardcoded default; override with `PORT=… bun run dev`.
- Header normalization is lenient: if `Accept` is missing the required
  `application/json, text/event-stream` pair, the server adds it — plain `curl` and
  browser `fetch()` work without special headers.

### HTTP client config (agents that support remote MCP)

```json
{
  "mcpServers": {
    "m3-expressive": { "url": "http://localhost:3210/mcp" }
  }
}
```

### Verify over HTTP (curl)

```bash
# 1. Health
curl -s http://localhost:3210/

# 2. Initialize (protocol version 2025-03-26 is accepted by SDK 1.x)
curl -s -X POST http://localhost:3210/mcp -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"curl","version":"0"}}}'

# 3. List tools
curl -s -X POST http://localhost:3210/mcp -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list"}'

# 4. Call a tool
curl -s -X POST http://localhost:3210/mcp -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"list_components","arguments":{}}}'

# 5. Notifications (e.g. notifications/initialized) return 202 with empty body
```

### Without bun (Node 20+)

```bash
npm install && npx tsx index.ts            # stdio
MCP_TRANSPORT=http npx tsx index.ts        # streamable HTTP on :3210
```

## Verify (MCP inspector)

```bash
npx @modelcontextprotocol/inspector bun /ABSOLUTE/PATH/TO/PROJECT/mini-services/mcp-server/index.ts
# or point the inspector's HTTP mode at http://localhost:3210/mcp
```

## Data source

The server imports the library's single source of truth directly:

- `src/lib/m3/meta.ts` — structured component metadata (39 metas; the Next.js `/api/registry` totalCount is 40)
- `src/lib/m3/tokens.ts` — design tokens
- `src/lib/m3/themes.ts` — curated theme registry

HTTP mirrors of the same data (when the Next.js app is running):
`/api/registry`, `/api/registry?themes=true`, `/api/agent`, `/llms.txt`.
