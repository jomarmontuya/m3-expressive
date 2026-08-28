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

## Transports

| Transport | Command | Who starts it | Use case |
|---|---|---|---|
| **stdio** (default) | `bun start` | the MCP client (spawned per session) | Claude Code / Cursor / Windsurf / Zed / Gemini CLI — `.mcp.json` config below |
| **streamable HTTP** (stateless) | `bun run dev` | you / the dev runner (daemon on port **3210**) | browser clients, the showcase, remote agents, `curl` exploration |

Both serve the exact same 14 tools against the same registry data.

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
