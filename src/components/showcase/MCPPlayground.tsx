"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/m3/Button";
import { CircularProgress } from "@/components/m3/CircularProgress";
import { List } from "@/components/m3/List";
import { SearchBar } from "@/components/m3/SearchBar";
import { SegmentedButton } from "@/components/m3/SegmentedButton";
import { Switch } from "@/components/m3/Switch";
import { TextField } from "@/components/m3/TextField";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { Snackbar } from "@/components/m3/Snackbar";
import { springs } from "@/lib/m3/tokens";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* MCP client — stateless Streamable-HTTP over the app gateway         */
/* ------------------------------------------------------------------ */

/**
 * Relative path only: the sandbox gateway routes /mcp to the MCP mini-service
 * via the XTransformPort query param. Never write absolute URLs or ports in
 * client fetches (project rule).
 */
const MCP_URL = "/mcp?XTransformPort=3210";
const REQUEST_TIMEOUT_MS = 12_000;
const UNREACHABLE_MSG = "MCP server unreachable on :3210 — is mini-services/mcp-server running?";

interface McpFrame {
  jsonrpc: "2.0";
  id?: number;
  result?: unknown;
  error?: { code?: number; message?: string; data?: unknown };
}

interface ServerInfo {
  name: string;
  version: string;
}

interface McpTool {
  name: string;
  description: string;
  inputSchema: {
    type?: string;
    properties?: Record<string, McpSchemaProperty>;
    required?: string[];
  };
}

interface McpSchemaProperty {
  type?: string;
  description?: string;
  enum?: string[];
  minimum?: number;
  maximum?: number;
}

let rpcId = 0;

/** One JSON-RPC POST. Plain JSON per the stateless server; tolerates an SSE body and swallows 202 acks. */
async function postRpc(frame: unknown, signal: AbortSignal): Promise<McpFrame | null> {
  const res = await fetch(MCP_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json, text/event-stream",
    },
    body: JSON.stringify(frame),
    signal,
  });
  if (!res.ok) throw new Error(`MCP transport error — HTTP ${res.status}`);
  const raw = await res.text();
  if (!raw.trim()) return null; // 202 notification ack
  const contentType = res.headers.get("content-type") ?? "";
  const body = contentType.includes("text/event-stream")
    ? (raw
        .split("\n")
        .filter((l) => l.startsWith("data:"))
        .at(-1)
        ?.slice(5)
        .trim() ?? "")
    : raw;
  return JSON.parse(body) as McpFrame;
}

/**
 * Every logical call re-runs the stateless handshake on a fresh transport:
 * initialize → notifications/initialized → the actual request, all under one
 * 12 s AbortController. Unique JSON-RPC ids per request.
 */
async function mcpCall<T>(method: string, params?: unknown): Promise<{ result: T; serverInfo: ServerInfo | null }> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const init = await postRpc(
      {
        jsonrpc: "2.0",
        id: ++rpcId,
        method: "initialize",
        params: {
          protocolVersion: "2025-03-26",
          capabilities: {},
          clientInfo: { name: "m3-showcase", version: "1.0.0" },
        },
      },
      controller.signal
    );
    if (init?.error) throw new Error(init.error.message || "initialize failed");
    await postRpc({ jsonrpc: "2.0", method: "notifications/initialized" }, controller.signal).catch(() => null);
    const resp = await postRpc({ jsonrpc: "2.0", id: ++rpcId, method, params }, controller.signal);
    if (resp?.error) throw new Error(resp.error.message || "JSON-RPC error");
    const serverInfo = (init?.result as { serverInfo?: ServerInfo } | undefined)?.serverInfo ?? null;
    return { result: resp?.result as T, serverInfo };
  } catch (e) {
    throw normalizeMcpError(e);
  } finally {
    window.clearTimeout(timer);
  }
}

function normalizeMcpError(e: unknown): Error {
  if (e instanceof DOMException && e.name === "AbortError")
    return new Error(`Timed out after 12 s — ${UNREACHABLE_MSG}`);
  if (e instanceof TypeError) return new Error(UNREACHABLE_MSG);
  if (e instanceof Error) return e;
  return new Error(String(e));
}

/* ------------------------------------------------------------------ */
/* Argument form derivation from JSON Schema                           */
/* ------------------------------------------------------------------ */

type ArgValue = string | boolean;

interface ArgField {
  name: string;
  kind: "string" | "number" | "boolean" | "enum" | "json";
  required: boolean;
  description?: string;
  enumValues?: string[];
  min?: number;
  max?: number;
}

function fieldsFor(tool: McpTool): ArgField[] {
  const props = tool.inputSchema?.properties ?? {};
  const required = new Set(tool.inputSchema?.required ?? []);
  return Object.entries(props).map(([name, prop]) => {
    let kind: ArgField["kind"] = "string";
    if (prop.enum?.length) kind = "enum";
    else if (prop.type === "boolean") kind = "boolean";
    else if (prop.type === "number" || prop.type === "integer") kind = "number";
    else if (prop.type === "array" || prop.type === "object") kind = "json";
    return {
      name,
      kind,
      required: required.has(name),
      description: prop.description,
      enumValues: prop.enum,
      min: prop.minimum,
      max: prop.maximum,
    };
  });
}

/** Sensible pre-filled examples so "Run tool" works with zero typing. */
const DEFAULT_ARGS: Record<string, Record<string, string>> = {
  get_component: { id: "button" },
  get_component_api: { id: "button" },
  get_component_examples: { id: "button" },
  get_component_guidelines: { id: "button" },
  get_component_states: { id: "fab" },
  get_component_source: { id: "button" },
  search_components: { query: "date" },
  get_theme: { id: "ocean" },
  generate_theme: { seed: "#6750A4" },
};

function initialValuesFor(tool: McpTool): Record<string, ArgValue> {
  const values: Record<string, ArgValue> = {};
  for (const field of fieldsFor(tool)) {
    const preset = DEFAULT_ARGS[tool.name]?.[field.name];
    if (preset !== undefined) values[field.name] = preset;
    else if (field.kind === "boolean") values[field.name] = false;
    else if (field.kind === "enum") values[field.name] = field.enumValues?.[0] ?? "";
    else values[field.name] = "";
  }
  return values;
}

function buildArguments(
  tool: McpTool,
  values: Record<string, ArgValue>
): { args?: Record<string, unknown>; error?: string } {
  const out: Record<string, unknown> = {};
  for (const field of fieldsFor(tool)) {
    const value = values[field.name];
    if (field.kind === "boolean") {
      if (value === true) out[field.name] = true;
      continue;
    }
    const raw = typeof value === "string" ? value.trim() : "";
    if (!raw) {
      if (field.required) return { error: `"${field.name}" is required for ${tool.name}` };
      continue; // optional / empty fields are omitted from the call
    }
    if (field.kind === "number") {
      const n = Number(raw);
      if (Number.isNaN(n)) return { error: `"${field.name}" must be a number` };
      if ((field.min !== undefined && n < field.min) || (field.max !== undefined && n > field.max))
        return { error: `"${field.name}" must be between ${field.min ?? "-∞"} and ${field.max ?? "∞"}` };
      out[field.name] = n;
      continue;
    }
    if (field.kind === "json") {
      try {
        out[field.name] = JSON.parse(raw);
      } catch {
        return { error: `"${field.name}" must be valid JSON` };
      }
      continue;
    }
    out[field.name] = raw;
  }
  return { args: out };
}

/* ------------------------------------------------------------------ */
/* Static presentation data                                            */
/* ------------------------------------------------------------------ */

const TOOL_ICONS: Record<string, string> = {
  list_components: "category",
  search_components: "search",
  get_component: "widgets",
  get_component_api: "code",
  get_component_examples: "code_blocks",
  get_component_guidelines: "rule",
  get_component_states: "toggle_on",
  get_component_source: "integration_instructions",
  list_themes: "palette",
  get_theme: "palette",
  generate_theme: "colorize",
  get_design_tokens: "tokens",
  get_motion_guidance: "animation",
  get_accessibility_guidance: "accessibility_new",
};

const iconForTool = (name: string) => TOOL_ICONS[name] ?? "construction";

interface ResponseState {
  text: string;
  pretty: string | null;
  isError: boolean;
  latencyMs: number;
  seq: number;
}

interface HistoryEntry {
  key: number;
  toolName: string;
  values: Record<string, ArgValue>;
  latencyMs: number;
}

/* ------------------------------------------------------------------ */
/* MCP Playground                                                      */
/* ------------------------------------------------------------------ */

export function MCPPlayground() {
  const [status, setStatus] = React.useState<"idle" | "connecting" | "connected" | "error">("idle");
  const [serverInfo, setServerInfo] = React.useState<ServerInfo | null>(null);
  const [connectError, setConnectError] = React.useState<string | null>(null);
  const [tools, setTools] = React.useState<McpTool[]>([]);
  const [filter, setFilter] = React.useState("");
  const [selectedTool, setSelectedTool] = React.useState<McpTool | null>(null);
  const [argValues, setArgValues] = React.useState<Record<string, ArgValue>>({});
  const [argError, setArgError] = React.useState<string | null>(null);
  const [running, setRunning] = React.useState(false);
  const [response, setResponse] = React.useState<ResponseState | null>(null);
  const [history, setHistory] = React.useState<HistoryEntry[]>([]);

  /* ----- snackbar (house pattern) ----- */
  const [snack, setSnack] = React.useState<{ open: boolean; message: string; icon: string }>({
    open: false,
    message: "",
    icon: "check_circle",
  });
  const showSnack = React.useCallback((message: string, icon = "check_circle") => {
    setSnack({ open: true, message, icon });
  }, []);
  const closeSnack = React.useCallback(() => setSnack((s) => ({ ...s, open: false })), []);

  /* ----- connect flow: initialize handshake → tools/list ----- */
  const connect = async () => {
    setStatus("connecting");
    setConnectError(null);
    try {
      const { result, serverInfo: info } = await mcpCall<{ tools: McpTool[] }>("tools/list");
      const list = result.tools ?? [];
      setServerInfo(info);
      setTools(list);
      setStatus("connected");
      setSelectedTool((prev) => (prev ? list.find((t) => t.name === prev.name) ?? null : null));
      showSnack(`Connected to ${info?.name ?? "MCP server"} v${info?.version ?? "?"} — ${list.length} tools`, "plug");
    } catch (e) {
      setStatus("error");
      setConnectError(e instanceof Error ? e.message : UNREACHABLE_MSG);
    }
  };

  /* ----- tool selection ----- */
  const selectTool = (tool: McpTool) => {
    setSelectedTool(tool);
    setArgValues(initialValuesFor(tool));
    setArgError(null);
    setResponse(null);
  };

  const setArg = (name: string, value: ArgValue) =>
    setArgValues((v) => ({ ...v, [name]: value }));

  /* ----- invoke flow ----- */
  const runTool = async () => {
    if (!selectedTool || running) return;
    const built = buildArguments(selectedTool, argValues);
    if (built.error) {
      setArgError(built.error);
      return;
    }
    setArgError(null);
    setRunning(true);
    const seq = Date.now();
    const started = performance.now();
    try {
      const { result } = await mcpCall<{
        content?: { type: string; text?: string }[];
        isError?: boolean;
      }>("tools/call", { name: selectedTool.name, arguments: built.args ?? {} });
      const latencyMs = Math.round(performance.now() - started);
      const text = result?.content?.map((c) => c.text ?? "").join("\n") || "(empty response)";
      const isError = result?.isError === true;
      let pretty: string | null = null;
      if (!isError) {
        try {
          pretty = JSON.stringify(JSON.parse(text), null, 2);
        } catch {
          pretty = null;
        }
      }
      setResponse({ text, pretty, isError, latencyMs, seq });
      if (isError) {
        showSnack(`${selectedTool.name} returned an error`, "error");
      } else {
        pushHistory(selectedTool.name, argValues, latencyMs);
        showSnack(`${selectedTool.name} finished in ${latencyMs} ms`, "schedule");
      }
    } catch (e) {
      const latencyMs = Math.round(performance.now() - started);
      setResponse({
        text: e instanceof Error ? e.message : UNREACHABLE_MSG,
        pretty: null,
        isError: true,
        latencyMs,
        seq,
      });
      showSnack("Tool call failed — see the response panel", "error");
    } finally {
      setRunning(false);
    }
  };

  const runSeq = response?.seq ?? 0;

  /* ----- history ----- */
  const pushHistory = (toolName: string, values: Record<string, ArgValue>, latencyMs: number) => {
    setHistory((h) => {
      const rest = h.filter((x) => !(x.toolName === toolName && JSON.stringify(x.values) === JSON.stringify(values)));
      return [{ key: Date.now(), toolName, values: { ...values }, latencyMs }, ...rest].slice(0, 5);
    });
  };

  const restoreHistory = (entry: HistoryEntry) => {
    const tool = tools.find((t) => t.name === entry.toolName);
    if (!tool) return;
    setSelectedTool(tool);
    setArgValues({ ...initialValuesFor(tool), ...entry.values });
    setArgError(null);
    setResponse(null);
    invokeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const dismissHistory = (key: number) => setHistory((h) => h.filter((x) => x.key !== key));

  const invokeRef = React.useRef<HTMLDivElement>(null);

  /* ----- derived ----- */
  const query = filter.trim().toLowerCase();
  const filteredTools = query
    ? tools.filter(
        (t) => t.name.toLowerCase().includes(query) || t.description.toLowerCase().includes(query)
      )
    : tools;

  return (
    <section className="mt-10" aria-label="MCP Playground">
      <h2 className="md-headline-small font-medium">MCP Playground</h2>
      <p className="mt-2 max-w-3xl md-body-medium text-m3-on-surface-variant">
        Live client for the library&apos;s MCP server — 14 tools over Streamable-HTTP. Same surface
        coding agents see.
      </p>

      <div className="mt-4 overflow-hidden rounded-[28px] border border-m3-outline-variant bg-m3-surface-container-low">
        {/* ---------- status bar ---------- */}
        <div className="flex flex-wrap items-center gap-3 border-b border-m3-outline-variant bg-m3-surface p-4 sm:px-5">
          <StatusChip status={status} serverInfo={serverInfo} message={connectError} />
          <div className="ml-auto">
            {status === "connected" ? (
              <Button variant="outlined" icon="refresh" onClick={() => void connect()} disabled={running}>
                Refresh tools
              </Button>
            ) : (
              <Button
                variant="filled"
                icon="cable"
                onClick={() => void connect()}
                loading={status === "connecting"}
                disabled={status === "connecting"}
              >
                Connect
              </Button>
            )}
          </div>
        </div>

        {/* ---------- body ---------- */}
        <AnimatePresence mode="wait" initial={false}>
          {status !== "connected" ? (
            <motion.div
              key="gate"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={springs.fastSpatial}
              className="flex flex-col items-center gap-4 px-6 py-14 text-center"
            >
              <MaterialSymbol
                icon={status === "error" ? "cloud_off" : "hub"}
                size={44}
                fill
                className={status === "error" ? "text-m3-error" : "text-m3-on-surface-variant"}
              />
              <p className="max-w-lg md-body-large text-m3-on-surface-variant">
                {status === "error"
                  ? (connectError ?? "Connection failed.")
                  : "Connect to browse the 14 tools and run live calls — initialize → notifications/initialized → tools/list → tools/call, exactly what your coding agent does."}
              </p>
              {status === "error" && (
                <>
                  <Button variant="outlined" icon="refresh" onClick={() => void connect()}>
                    Retry connection
                  </Button>
                  <p className="max-w-xl md-body-small text-m3-on-surface-variant">
                    Start the server first, then retry:{" "}
                    <code className="rounded bg-m3-surface-container-highest px-1.5 py-1 font-mono text-[12px]">
                      cd mini-services/mcp-server && bun install && bun run dev
                    </code>{" "}
                    — HTTP transport listens on port 3210.
                  </p>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="live"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={springs.fastSpatial}
            >
              <div className="grid lg:grid-cols-5">
                {/* ----- tools browser ----- */}
                <div className="border-b border-m3-outline-variant p-4 sm:p-5 lg:col-span-2 lg:border-b-0 lg:border-r">
                  <div className="flex items-baseline gap-2">
                    <span className="flex items-center gap-2 md-title-medium">
                      <MaterialSymbol icon="construction" size={20} className="text-m3-primary" />
                      Tools
                    </span>
                    <span className="md-label-medium text-m3-on-surface-variant">
                      {filteredTools.length} of {tools.length}
                    </span>
                  </div>
                  <SearchBar
                    className="mt-3"
                    size="sm"
                    fullWidth
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filter tools"
                    aria-label="Filter MCP tools"
                  />
                  <List className="mt-2 max-h-[380px] overflow-y-auto rounded-m3-md pr-0.5">
                    {filteredTools.map((tool) => {
                      const selected = selectedTool?.name === tool.name;
                      const argCount = Object.keys(tool.inputSchema?.properties ?? {}).length;
                      return (
                        <li key={tool.name}>
                          <button
                            type="button"
                            onClick={() => selectTool(tool)}
                            aria-pressed={selected}
                            className={cn(
                              "m3-state m3-focus flex min-h-12 w-full items-center gap-3 rounded-m3-sm px-3 text-left",
                              selected
                                ? "bg-m3-secondary-container text-m3-on-secondary-container"
                                : "text-m3-on-surface"
                            )}
                          >
                            <MaterialSymbol
                              icon={iconForTool(tool.name)}
                              size={20}
                              className={selected ? "text-m3-on-secondary-container" : "text-m3-primary"}
                            />
                            <span className="min-w-0 flex-1 truncate font-mono text-[13px] font-medium">
                              {tool.name}
                            </span>
                            <span
                              className={cn(
                                "shrink-0 md-label-small",
                                selected ? "text-m3-on-secondary-container" : "text-m3-on-surface-variant"
                              )}
                            >
                              {argCount === 0 ? "no args" : `${argCount} arg${argCount === 1 ? "" : "s"}`}
                            </span>
                            {selected && <MaterialSymbol icon="chevron_right" size={18} />}
                          </button>
                        </li>
                      );
                    })}
                    {filteredTools.length === 0 && (
                      <li className="px-3 py-8 text-center md-body-medium text-m3-on-surface-variant">
                        No tools match &ldquo;{filter}&rdquo;
                      </li>
                    )}
                  </List>
                </div>

                {/* ----- invoke panel ----- */}
                <div ref={invokeRef} className="p-4 sm:p-5 lg:col-span-3">
                  {selectedTool ? (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="flex items-center gap-2 font-mono md-title-medium">
                          <MaterialSymbol
                            icon={iconForTool(selectedTool.name)}
                            size={22}
                            className="text-m3-primary"
                          />
                          {selectedTool.name}
                        </span>
                      </div>
                      <p className="mt-1 max-w-2xl md-body-small text-m3-on-surface-variant">
                        {selectedTool.description}
                      </p>

                      {fieldsFor(selectedTool).length > 0 ? (
                        <div className="mt-4 max-w-xl space-y-4">
                          {fieldsFor(selectedTool).map((field) => (
                            <ArgFieldControl
                              key={field.name}
                              field={field}
                              value={argValues[field.name]}
                              onChange={(v) => setArg(field.name, v)}
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="mt-4 flex items-center gap-2 md-body-medium text-m3-on-surface-variant">
                          <MaterialSymbol icon="check_circle" size={18} className="text-m3-primary" />
                          This tool takes no arguments — run it directly.
                        </p>
                      )}

                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <Button
                          variant="filled"
                          icon="play_arrow"
                          loading={running}
                          disabled={running}
                          onClick={() => void runTool()}
                        >
                          Run tool
                        </Button>
                        <span className="font-mono text-[12px] text-m3-on-surface-variant">
                          tools/call → {selectedTool.name}
                        </span>
                      </div>

                      {argError && (
                        <motion.p
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={springs.fastVisual}
                          className="mt-3 flex items-center gap-2 md-body-small text-m3-error"
                          role="alert"
                        >
                          <MaterialSymbol icon="error" size={16} fill />
                          {argError}
                        </motion.p>
                      )}

                      {/* ----- response panel ----- */}
                      <AnimatePresence initial={false}>
                        {response && (
                          <motion.div
                            key={runSeq}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={springs.fastSpatial}
                            className="mt-5"
                          >
                            <div className="flex flex-wrap items-center gap-2">
                              {response.isError ? (
                                <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-m3-error-container px-3 md-label-medium text-m3-on-error-container">
                                  <MaterialSymbol icon="error" size={14} fill />
                                  error
                                </span>
                              ) : (
                                <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-m3-tertiary-container px-3 md-label-medium text-m3-on-tertiary-container">
                                  <MaterialSymbol icon="check_circle" size={14} fill />
                                  result
                                </span>
                              )}
                              <span className="inline-flex h-7 items-center rounded-full bg-m3-surface-variant px-3 font-mono text-[11px] font-medium text-m3-on-surface-variant">
                                {response.latencyMs} ms
                              </span>
                              {response.isError && (
                                <Button variant="text" size="xs" icon="refresh" onClick={() => void runTool()}>
                                  Retry
                                </Button>
                              )}
                            </div>
                            {response.isError ? (
                              <div className="mt-3 flex items-start gap-3 rounded-m3-md bg-m3-error-container p-4 text-m3-on-error-container">
                                <MaterialSymbol
                                  icon="warning"
                                  size={20}
                                  fill
                                  className="mt-0.5 shrink-0"
                                />
                                <pre className="m3-scroll min-w-0 flex-1 overflow-x-auto whitespace-pre-wrap break-words font-mono text-[12.5px] leading-relaxed">
                                  {response.text}
                                </pre>
                              </div>
                            ) : response.pretty !== null ? (
                              <pre className="m3-scroll mt-3 max-h-96 overflow-y-auto rounded-m3-md border border-m3-outline-variant bg-m3-surface-container-lowest p-4 font-mono text-[12.5px] leading-relaxed text-m3-on-surface">
                                {highlightJson(response.pretty)}
                              </pre>
                            ) : (
                              <pre className="m3-scroll mt-3 max-h-96 overflow-y-auto whitespace-pre-wrap rounded-m3-md border border-m3-outline-variant bg-m3-surface-container-lowest p-4 font-mono text-[12.5px] leading-relaxed text-m3-on-surface">
                                {response.text}
                              </pre>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="grid min-h-[220px] place-items-center text-center">
                      <p className="max-w-xs md-body-large text-m3-on-surface-variant">
                        Select a tool from the list to inspect its arguments and run it.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* ----- history ----- */}
              {history.length > 0 && (
                <div className="border-t border-m3-outline-variant p-4 sm:px-5">
                  <span className="flex items-center gap-2 md-title-medium">
                    <MaterialSymbol icon="history" size={20} className="text-m3-primary" />
                    Recent calls
                  </span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <AnimatePresence initial={false}>
                      {history.map((entry) => (
                        <motion.span
                          key={entry.key}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={springs.fastVisual}
                          className="inline-flex h-8 items-center overflow-hidden rounded-full border border-m3-outline bg-transparent text-m3-on-surface"
                        >
                          <button
                            type="button"
                            onClick={() => restoreHistory(entry)}
                            className="m3-state flex h-full items-center gap-1.5 pl-3 pr-1 md-label-large"
                            title="Restore this tool selection and arguments"
                          >
                            <MaterialSymbol icon="history" size={16} className="text-m3-primary" />
                            <span className="font-mono text-[12px] font-medium">{entry.toolName}</span>
                            <span className="md-label-small text-m3-on-surface-variant">
                              {entry.latencyMs} ms
                            </span>
                          </button>
                          <span
                            role="button"
                            tabIndex={0}
                            aria-label={`Dismiss ${entry.toolName} from history`}
                            onClick={() => dismissHistory(entry.key)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                dismissHistory(entry.key);
                              }
                            }}
                            className="m3-state mr-1 grid size-6 cursor-pointer place-items-center rounded-full text-m3-on-surface-variant transition-colors duration-150 hover:text-m3-on-surface"
                          >
                            <MaterialSymbol icon="cancel" size={16} />
                          </span>
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Snackbar open={snack.open} message={snack.message} icon={snack.icon} onClose={closeSnack} duration={2500} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Status chip — idle / connecting / connected / error                 */
/* ------------------------------------------------------------------ */

function StatusChip({
  status,
  serverInfo,
  message,
}: {
  status: "idle" | "connecting" | "connected" | "error";
  serverInfo: ServerInfo | null;
  message: string | null;
}) {
  const base = "inline-flex h-8 items-center gap-2 rounded-full px-3.5 md-label-large";

  if (status === "connecting")
    return (
      <span role="status" className={cn(base, "bg-m3-surface-variant text-m3-on-surface-variant")}>
        <CircularProgress size={20} thickness={3} ariaLabel="Connecting to MCP server" />
        Connecting…
      </span>
    );

  if (status === "connected")
    return (
      <span
        role="status"
        className={cn(base, "bg-m3-secondary-container text-m3-on-secondary-container")}
      >
        <MaterialSymbol icon="check_circle" size={18} fill />
        {serverInfo ? `${serverInfo.name} v${serverInfo.version}` : "Connected"}
      </span>
    );

  if (status === "error")
    return (
      <span role="alert" title={message ?? undefined} className={cn(base, "bg-m3-error-container text-m3-on-error-container")}>
        <MaterialSymbol icon="error" size={18} fill />
        {message ? "MCP unavailable" : "Connection failed"}
      </span>
    );

  return (
    <span role="status" className={cn(base, "bg-m3-surface-variant text-m3-on-surface-variant")}>
      <MaterialSymbol icon="cable" size={18} />
      Idle — not connected
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* One auto-generated argument control                                 */
/* ------------------------------------------------------------------ */

function ArgFieldControl({
  field,
  value,
  onChange,
}: {
  field: ArgField;
  value: ArgValue | undefined;
  onChange: (v: ArgValue) => void;
}) {
  const label = (
    <span className="md-body-small text-m3-on-surface-variant">
      {field.name}
      {field.required ? " *" : ""}
      {field.kind === "json" ? " — JSON" : ""}
    </span>
  );

  if (field.kind === "boolean") {
    return (
      <div className="flex items-center gap-3">
        <Switch checked={value === true} onCheckedChange={onChange} />
        <span className="md-body-medium text-m3-on-surface">
          {field.name}
          {field.required ? " *" : ""}
        </span>
      </div>
    );
  }

  if (field.kind === "enum" && (field.enumValues?.length ?? 0) <= 4) {
    return (
      <label className="block">
        {label}
        <div className="mt-1.5">
          <SegmentedButton
            type="single"
            size="sm"
            value={typeof value === "string" ? value : ""}
            onValueChange={(v) => {
              if (typeof v === "string" && v !== "") onChange(v);
            }}
            options={(field.enumValues ?? []).map((v) => ({ value: v, label: v }))}
            aria-label={field.name}
            className="max-w-full overflow-x-auto"
          />
        </div>
      </label>
    );
  }

  if (field.kind === "enum") {
    return (
      <label className="block">
        {label}
        <span className="relative mt-1.5 block">
          <select
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
            aria-label={field.name}
            className="m3-focus h-10 w-full cursor-pointer appearance-none rounded-m3-xs border border-m3-outline bg-transparent px-3 pr-9 font-mono text-[13px] text-m3-on-surface outline-none transition-colors duration-150 focus:border-m3-primary"
          >
            {(field.enumValues ?? []).map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <MaterialSymbol
            icon="expand_more"
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-m3-on-surface-variant"
          />
        </span>
      </label>
    );
  }

  if (field.kind === "json") {
    return (
      <label className="block">
        {label}
        <textarea
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          spellCheck={false}
          aria-label={field.name}
          placeholder='{ "key": "value" }'
          className="m3-focus mt-1.5 w-full resize-y rounded-m3-xs border border-m3-outline bg-transparent p-3 font-mono text-[12.5px] leading-relaxed text-m3-on-surface outline-none transition-colors duration-150 placeholder:text-m3-on-surface-variant focus:border-m3-primary"
        />
      </label>
    );
  }

  return (
    <TextField
      label={`${field.name}${field.required ? " *" : ""}`}
      size="sm"
      fullWidth
      type={field.kind === "number" ? "number" : "text"}
      value={typeof value === "string" ? value : ""}
      onChange={(e) => onChange(e.target.value)}
      helperText={field.description}
      min={field.min}
      max={field.max}
      step={field.kind === "number" ? "any" : undefined}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Lightweight JSON syntax tinting (no deps): keys / strings / numbers  */
/* ------------------------------------------------------------------ */

function highlightJson(code: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern =
    /("(?:[^"\\]|\\.)*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(code)) !== null) {
    if (m.index > last) nodes.push(code.slice(last, m.index));
    const [full, str, colon, literal, num] = m;
    if (str && colon) {
      nodes.push(
        <span key={key++} className="font-semibold text-m3-on-primary-container">
          {str}
        </span>,
        <span key={key++}>{colon}</span>
      );
    } else if (str) {
      nodes.push(
        <span key={key++} className="text-m3-tertiary">
          {str}
        </span>
      );
    } else if (literal) {
      nodes.push(
        <span key={key++} className="font-medium text-m3-secondary">
          {literal}
        </span>
      );
    } else if (num) {
      nodes.push(
        <span key={key++} className="text-m3-primary">
          {num}
        </span>
      );
    }
    last = m.index + full.length;
  }
  if (last < code.length) nodes.push(code.slice(last));
  return nodes;
}
