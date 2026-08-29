#!/usr/bin/env bun
/**
 * Material 3 Expressive — MCP Server
 * ===================================
 * Exposes the m3-expressive-react component library to AI coding agents
 * via the Model Context Protocol, over TWO transports:
 *
 *   1. stdio (default)            — `bun start` / `bun index.ts`
 *      Spawned BY the MCP client (Claude Code, Cursor, …). mcp.json config
 *      in the README stays valid.
 *
 *   2. streamable HTTP (stateless)— `bun run dev` / `bun index.ts --http`
 *      Long-running daemon on port 3210 (override with PORT env). Browser
 *      clients and remote agents POST JSON-RPC to /mcp; CORS is open so the
 *      showcase can connect cross-origin through the gateway.
 *
 * Connect (Claude Code / any MCP-capable client) — mcp.json:
 *   {
 *     "mcpServers": {
 *       "m3-expressive": {
 *         "command": "bun",
 *         "args": ["run", "--cwd", "/ABSOLUTE/PATH/TO/PROJECT/mini-services/mcp-server", "start"]
 *       }
 *     }
 *   }
 *
 * Tools surface (structured component knowledge, NOT raw file dumps):
 *   list_components · get_component · get_component_api ·
 *   get_component_examples · get_component_guidelines · get_component_states ·
 *   get_component_source · search_components · list_themes · get_theme ·
 *   generate_theme · get_design_tokens
 *
 * Resources (read-only, agentic deepening):
 *   m3://handbook · m3://components · m3://components/{id} (template) ·
 *   m3://tokens · m3://themes · m3://package
 *
 * Prompts (task playbooks that drive the tools):
 *   m3_screen_builder · m3_style_audit · m3_theme_seed
 */
import { readFileSync } from "node:fs";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

import { agentManifest, buildAgentHandbook, MCP_TOOL_NAMES } from "../../src/lib/m3/agent";
import { getComponent, m3Registry } from "../../src/lib/m3/registry";
import {
  springs, easings, durations, shapes, shapeMorph, stateOpacities, typeScale,
  elevations, colorRoles,
} from "../../src/lib/m3/tokens";
import { m3Themes, defaultThemeId, getTheme } from "../../src/lib/m3/themes";
import { generateScheme, schemeToCssVars } from "../../src/lib/m3/theme-builder";

/* ------------------------------------------------------------------ */
/* Registry                                                            */
/* ------------------------------------------------------------------ */
const LIBRARY_ROOT = resolve(fileURLToPath(import.meta.url), "../../..");

const METAS = m3Registry.components;
const CATEGORIES = m3Registry.categories;

const find = getComponent;
const summary = (m: (typeof METAS)[number]) => ({
  id: m.id, name: m.name, category: m.category, description: m.description,
  variants: m.variants, m3e: !!m.m3e,
  source: m.file,
  import: m.importLine,
});
const notFound = (id: string) => ({
  content: [{ type: "text" as const, text: `Unknown component "${id}". Call list_components for valid ids.` }],
  isError: true,
});

function search(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return METAS.map(summary);
  return METAS.filter((m) => {
    const haystack = [
      m.id, m.name, m.category, m.description, m.variants?.join(" ") ?? "",
      m.guidelines?.whenToUse?.join(" ") ?? "",
      m.related?.join(" ") ?? "",
      m.props.map((p) => `${p.name} ${p.description}`).join(" "),
    ].join(" ").toLowerCase();
    return q.split(/\s+/).every((term) => haystack.includes(term));
  }).map(summary);
}

/* ------------------------------------------------------------------ */
/* Resource payloads (read-only knowledge)                             */
/* ------------------------------------------------------------------ */

/** m3://handbook uses the same builder as the Next.js /llms.txt route. */
const buildHandbook = buildAgentHandbook;

/** m3://tokens — the raw token object (the values get_design_tokens is built on). */
const TOKENS_RESOURCE = {
  colorRoles,
  motion: { springs, easings, durations },
  shapes: { scale: shapes, morphs: shapeMorph },
  elevations,
  typeScale,
  stateOpacities,
};

/** m3://themes — curated schemes + default, exactly as shipped in themes.ts. */
const THEMES_RESOURCE = {
  defaultThemeId,
  count: m3Themes.length,
  themes: m3Themes,
};

/** m3://package is the exact package field served by /api/agent. */
const PACKAGE_FACTS = agentManifest.package;

/* ------------------------------------------------------------------ */
/* Server factory                                                      */
/* ------------------------------------------------------------------ */
const text = (data: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] });

/**
 * Build a fully-configured McpServer (14 tools · 6 read-only resources · 3 prompts).
 *
 * Called ONCE in stdio mode and once per request in stateless HTTP mode —
 * the SDK requires a fresh transport (and therefore a fresh server
 * connection) per request when `sessionIdGenerator: undefined`.
 */
function buildServer(): McpServer {
  const server = new McpServer({
    name: agentManifest.forAgents.mcpServer.name,
    version: m3Registry.version,
  });

  /* ---- discovery ---- */
  server.registerTool(
    "list_components",
    {
      title: "List components",
      description:
        "List every component in the Material 3 Expressive React library with id, name, category, variants, M3E flag, source path and import line. Start here.",
      inputSchema: {
        category: z
          .string()
          .optional()
          .describe(`Filter by category: ${CATEGORIES.join(" | ")}`),
      },
    },
    ({ category }) => {
      let list = METAS.map(summary);
      if (category) {
        if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) {
          return { content: [{ type: "text" as const, text: `Unknown category "${category}". Valid: ${CATEGORIES.join(", ")}` }], isError: true };
        }
        list = list.filter((c) => c.category === category);
      }
      return text({
        library: m3Registry.library,
        version: m3Registry.version,
        spec: m3Registry.spec,
        totalCount: list.length,
        components: list,
      });
    }
  );

  server.registerTool(
    "search_components",
    {
      title: "Search components",
      description: "Full-text search across ids, names, descriptions, variants, when-to-use guidance and props. Empty query lists all.",
      inputSchema: { query: z.string().describe("Space-separated keywords, e.g. 'floating label error'") },
    },
    ({ query }) => {
      const results = search(query ?? "");
      return text({ query: query ?? "", count: results.length, results });
    }
  );

  server.registerTool(
    "get_component",
    {
      title: "Get component",
      description: "Full structured knowledge for one component: description, variants, props, guidelines (when to use / anatomy / states / dos / don'ts), example code, related components, M3E flag.",
      inputSchema: { id: z.string().describe("Component id from list_components, e.g. 'button'") },
    },
    ({ id }) => {
      const m = find(id);
      return m ? text(m) : notFound(id);
    }
  );

  server.registerTool(
    "get_component_api",
    {
      title: "Get component API",
      description: "Typed props reference for one component: name, type, default, description — plus the import line.",
      inputSchema: { id: z.string() },
    },
    ({ id }) => {
      const m = find(id);
      if (!m) return notFound(id);
      return text({ id: m.id, import: m.importLine, props: m.props });
    }
  );

  server.registerTool(
    "get_component_examples",
    {
      title: "Get component examples",
      description: "Recommended, ready-to-paste JSX usage examples for one component (the exact code Material guidance recommends).",
      inputSchema: { id: z.string() },
    },
    ({ id }) => {
      const m = find(id);
      if (!m) return notFound(id);
      return text({
        id: m.id,
        import: m.importLine,
        tokens: `import { springs, shapes } from "@/lib/m3/tokens";`,
        examples: [{ title: "Recommended usage", code: m.exampleCode }],
        related: m.related,
      });
    }
  );

  server.registerTool(
    "get_component_guidelines",
    {
      title: "Get component guidelines",
      description: "Official Material Design 3 usage guidance for one component: when to use, when NOT to use, anatomy, states, do/don't list.",
      inputSchema: { id: z.string() },
    },
    ({ id }) => {
      const m = find(id);
      if (!m) return notFound(id);
      return text({
        id: m.id,
        materialReference: "https://m3.material.io/components",
        guidelines: m.guidelines,
      });
    }
  );

  server.registerTool(
    "get_component_states",
    {
      title: "Get component states",
      description: "Available interaction states (hover/focus/pressed/selected/disabled/loading/error…) and variants for one component.",
      inputSchema: { id: z.string() },
    },
    ({ id }) => {
      const m = find(id);
      if (!m) return notFound(id);
      return text({
        id: m.id,
        variants: m.variants,
        states: m.guidelines?.states ?? [],
        stateLayerOpacities: stateOpacities,
        focusRing: "3px primary outline on :focus-visible (.m3-focus helper)",
        touchTarget: "48dp minimum (48×48) for all interactive elements",
      });
    }
  );

  server.registerTool(
    "get_component_source",
    {
      title: "Get component source",
      description: "Read the actual TypeScript/JSX implementation file for one component (for deep behavioral questions the metadata does not cover).",
      inputSchema: { id: z.string() },
    },
    ({ id }) => {
      const m = find(id);
      if (!m) return notFound(id);
      const rel = m.file;
      try {
        const source = readFileSync(join(LIBRARY_ROOT, rel), "utf8");
        return text({ id: m.id, path: rel, lines: source.split("\n").length, source });
      } catch (e) {
        return { content: [{ type: "text" as const, text: `Source for "${id}" not readable at ${rel}: ${e}` }], isError: true };
      }
    }
  );

  /* ---- theming + tokens ---- */
  server.registerTool(
    "list_themes",
    {
      title: "List themes",
      description: "Curated Material 3 color schemes shipped with the library (each with full light + dark M3 color role sets).",
      inputSchema: {},
    },
    () =>
      text({
        default: defaultThemeId,
        count: m3Themes.length,
        themes: m3Themes.map((t) => ({ id: t.id, label: t.label, seed: t.seed, description: t.description, swatch: t.swatch })),
        usage:
          "Apply with <html data-theme='<id'> and the .dark class for dark mode; see useM3Theme() in src/hooks/use-m3-theme.ts.",
      })
  );

  server.registerTool(
    "get_theme",
    {
      title: "Get theme",
      description: "Complete color scheme for one curated theme: every M3 color role in both light and dark modes (hex values).",
      inputSchema: { id: z.string().describe("Theme id from list_themes, e.g. 'ocean'") },
    },
    ({ id }) => {
      const t = getTheme(id);
      if (!t) {
        return { content: [{ type: "text" as const, text: `Unknown theme "${id}". Valid: ${m3Themes.map((x) => x.id).join(", ")}` }], isError: true };
      }
      return text(t);
    }
  );

  server.registerTool(
    "generate_theme",
    {
      title: "Generate theme",
      description:
        "Generate a complete Material 3 color scheme (light + dark, every color role as hex) from any seed color using Google's official Dynamic Color engine — the algorithm behind Material Theme Builder. 7 palette styles (variants) and 3 contrast levels. Returns the role maps plus ready-to-use CSS custom-property blocks for --md-* tokens.",
      inputSchema: {
        seed: z.string().describe("Seed color as hex — 3 or 6 digits, '#' optional (e.g. '#6750A4' or '0B57D0')"),
        variant: z
          .enum(["tonal-spot", "vibrant", "expressive", "content", "fidelity", "rainbow", "fruit-salad"])
          .optional()
          .describe("Palette style (default 'tonal-spot' — the Android 12+ default)"),
        contrast: z
          .number()
          .min(0)
          .max(1)
          .optional()
          .describe("Contrast level: 0 standard, 0.5 medium, 1 high (default 0)"),
      },
    },
    ({ seed, variant, contrast }) => {
      const v = variant ?? "tonal-spot";
      const c = contrast ?? 0;
      try {
        const result = generateScheme(seed, v, c);
        return text({
          seed,
          variant: v,
          contrast: c,
          light: result.light,
          dark: result.dark,
          css: schemeToCssVars(result),
          usage:
            "Apply the css blocks as :root[data-theme='<id>'] and [data-theme='<id>'].dark — components consume --md-* roles only. See list_themes for examples.",
        });
      } catch (e) {
        return { content: [{ type: "text" as const, text: `Could not generate scheme: ${e}` }], isError: true };
      }
    }
  );

  server.registerTool(
    "get_design_tokens",
    {
      title: "Get design tokens",
      description:
        "Every design token in the system: 24 semantic color roles (+CSS variable names), motion springs/easings/durations, shape scale, elevation levels, typography scale, state-layer opacities. Components consume ONLY these tokens.",
      inputSchema: {},
    },
    () =>
      text({
        colorRoles: colorRoles.map((r) => ({ ...r, cssVar: `var(--md-${r.token})`, tailwind: `bg-m3-${r.token} / text-m3-${r.token}` })),
        motion: { springs, easings, durations },
        shapes: { scale: shapes, morphs: shapeMorph },
        elevations,
        typography: { font: "Roboto Flex (variable)", scale: typeScale, cssClasses: "md-display-large … md-label-small" },
        stateLayers: stateOpacities,
        icons: "Material Symbols Rounded (variable): FILL/wght/GRAD/opsz axes",
        reducedMotion: "Components with JavaScript-specific reduced-motion behavior read the preference directly; MotionConfig and CSS also honor the user preference.",
        theming: {
          themes: m3Themes.map((t) => t.id),
          application: "CSS custom properties --md-* scoped by html[data-theme] and .dark; components read semantic tokens only",
        },
      })
  );

  /* ---- guidance ---- */
  server.registerTool(
    "get_motion_guidance",
    {
      title: "Get motion guidance",
      description: "Material 3 Expressive motion system: spring physics tokens, easing curves, duration tokens, shape morphing, state transitions and reduced-motion rules.",
      inputSchema: {},
    },
    () =>
      text({
        philosophy: "Expressive motion is physics-based: use springs for interactivity, tweens with token easings for decorative loops. Never hardcode durations or curves.",
        springs,
        easings,
        durations,
        rules: [
          "State layers: hover 8% / focus 10% / pressed 10% / dragged 16% (stateOpacities)",
          "Shape morphs (M3E): pressed controls morph corner radius (shapeMorph pairs) with springs.expressiveEffects",
          "Enter/exit: container transforms + shared-layout indicators use springs.expressive / defaultSpatial",
          "Small visual feedback (scale, icon pops): springs.fastVisual",
          "Loops (indeterminate progress, loaders): linear or standard easing with token durations",
          "prefers-reduced-motion: use useReducedMotion for JavaScript-specific fallbacks; MotionConfig and CSS provide the app-level fallback",
        ],
      })
  );

  server.registerTool(
    "get_accessibility_guidance",
    {
      title: "Get accessibility guidance",
      description: "Cross-component accessibility rules enforced by the library: touch targets, focus rings, keyboard contracts, ARIA patterns.",
      inputSchema: {},
    },
    () =>
      text({
        touchTargets: "48×48dp minimum; visual sizes may be smaller but hit areas expand (see get_component_states per component)",
        focus: ":focus-visible 3px primary outline (m3-focus), never removed",
        keyboard: {
          buttons: "Enter keydown activates, Space on keyup (native button)",
          selection: "Checkbox/Switch = Space; Radio groups = arrow keys with wrap (use RadioGroup)",
          menus: "ArrowUp/Down navigate, Home/End jump, Escape closes and restores trigger focus, Tab closes",
          tabs: "Roving tabindex, ArrowLeft/Right/Home/End activate",
          dialogs: "Focus trap, Escape dismisses (dismissible only), focus returns to trigger",
          sliders: "Arrows ±1 step, PageUp/PageDown ±10, Home/End bounds",
          datePicker: "role=grid with roving tabindex and arrow-key day navigation",
        },
        aria: "Combobox/listbox, radiogroup, slider valuemin/max/now, progressbar, dialog labelledby/describedby, live regions for snackbars",
        colorContrast: "All color pairs come from M3 scheme roles, which guarantee WCAG AA contrast per official tonal pairs",
      })
  );

  /* ------------------------------------------------------------------ */
  /* Resources (read-only knowledge — same registry data as the tools)   */
  /* ------------------------------------------------------------------ */
  const jsonResource = (uri: URL, data: unknown) => ({
    contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify(data, null, 2) }],
  });

  server.registerResource(
    "handbook",
    "m3://handbook",
    {
      title: "Library handbook",
      description:
        "The full m3-expressive-react handbook (same content the /llms.txt route serves), as markdown: usage rules, package facts, and every component with import line, variants, props, guidelines and a ready-to-paste example. Start here if you read only one resource.",
      mimeType: "text/markdown",
    },
    (uri) => ({ contents: [{ uri: uri.href, mimeType: "text/markdown", text: buildHandbook() }] })
  );

  server.registerResource(
    "components",
    "m3://components",
    {
      title: "Component index",
      description:
        "Index of every component in the library: id, name, category, variants and M3E flag. Read m3://components/<id> for the full metadata of one component.",
      mimeType: "application/json",
    },
    (uri) =>
      jsonResource(uri, {
        library: m3Registry.library,
        version: m3Registry.version,
        count: METAS.length,
        components: METAS.map((m) => ({ id: m.id, name: m.name, category: m.category, variants: m.variants, m3e: !!m.m3e })),
      })
  );

  server.registerResource(
    "component",
    new ResourceTemplate("m3://components/{id}", {
      list: undefined, // static template — enumerate concrete ids via m3://components
      complete: {
        id: (value) => {
          const v = value.toLowerCase();
          return METAS.map((m) => m.id).filter((id) => id.startsWith(v));
        },
      },
    }),
    {
      title: "Component metadata",
      description:
        "Full metadata for one component (id from m3://components): description, variants, typed props, guidelines, example code, related components. Unknown ids return a 404-style error.",
      mimeType: "application/json",
    },
    (uri, variables) => {
      const id = String(variables.id);
      const m = find(id);
      if (!m) {
        throw new Error(`404: Unknown component "${id}". Read m3://components for valid ids (or call the list_components tool).`);
      }
      return jsonResource(uri, m);
    }
  );

  server.registerResource(
    "tokens",
    "m3://tokens",
    {
      title: "Design tokens",
      description:
        "Every design token as pretty JSON: semantic color roles, motion (springs/easings/durations), shape scale + morphs, elevations, typography scale, state-layer opacities. Components consume ONLY these tokens.",
      mimeType: "application/json",
    },
    (uri) => jsonResource(uri, TOKENS_RESOURCE)
  );

  server.registerResource(
    "themes",
    "m3://themes",
    {
      title: "Curated themes",
      description:
        "All curated Material 3 color schemes with their full light + dark role maps, plus the default theme id. Apply via html[data-theme='<id>'] + the .dark class.",
      mimeType: "application/json",
    },
    (uri) => jsonResource(uri, THEMES_RESOURCE)
  );

  server.registerResource(
    "package",
    "m3://package",
    {
      title: "Package facts",
      description:
        "The npm package at a glance: name, version, install command, exports map, peer dependencies, and the Tailwind-4 vs compiled.css styling paths.",
      mimeType: "application/json",
    },
    (uri) => jsonResource(uri, PACKAGE_FACTS)
  );

  /* ------------------------------------------------------------------ */
  /* Prompts (task playbooks that drive the tools)                       */
  /* ------------------------------------------------------------------ */
  server.registerPrompt(
    "m3_screen_builder",
    {
      title: "Build an M3 Expressive screen",
      description:
        "Guided playbook for building one screen with m3-expressive-react: discover components via tools, study guidelines + examples, then emit a complete compilable React file with correct imports, tokens and theme wiring.",
      argsSchema: {
        description: z.string().describe("The screen to build, e.g. 'a sign-in form with email, password and a remember-me switch'"),
        framework: z
          .enum(["react", "next"])
          .optional()
          .default("react")
          .describe("Target framework: 'react' (plain React/Vite) or 'next' (Next.js app router) — default 'react'"),
      },
    },
    ({ description, framework }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: [
              "You are building a Material 3 Expressive screen with the m3-expressive-react library. Follow this exact workflow BEFORE writing any code:",
              "",
              "1. DISCOVER — call the `list_components` tool for the full component index, and `search_components` with keywords from the screen description to find the relevant components (do not guess component names).",
              "2. STUDY — for EACH component you intend to use, call `get_component_guidelines` (when to use / anatomy / states / dos / don'ts) and `get_component_examples` (recommended JSX). If props are ambiguous, also call `get_component_api`.",
              "3. COMPOSE — emit ONE complete, compilable React file that:",
              "   - imports only from 'm3-expressive-react' (e.g. `import { Button, Card, TextField } from \"m3-expressive-react\";`) using the import lines from the metadata;",
              "   - uses ONLY props documented in the metadata — never invent props;",
              "   - uses color tokens exclusively (`bg-m3-primary`, `text-m3-on-surface-variant`, `border-m3-outline-variant`, …) — never raw hex;",
              "   - passes icons as Material Symbols ligature strings (`icon=\"edit\"`);",
              "   - animates with token springs from 'm3-expressive-react/tokens' — `springs.expressive` is the signature M3E spring; never hardcode durations/curves;",
              "   - keeps every interactive element at a 48×48dp minimum touch target, keeps the built-in state layers (.m3-state) and focus rings (.m3-focus) intact, and gives icon-only controls an aria-label;",
              "   - places exactly one filled/high-emphasis action per region, ordered by decreasing emphasis left→right.",
              "4. THEME — wire `<html data-theme=\"<id>\">` with an id from `list_themes` (ocean | emerald | coral; baseline violet = attribute removed) and the `.dark` class for dark mode. Tell the user to `import \"m3-expressive-react/styles.css\"` — or, if they run Tailwind 4, the `@source` + `@theme` mapping from the package README. For a custom brand scheme, call `generate_theme` first and emit its --md-* CSS blocks.",
              "5. VALIDATE — re-check every prop against the `get_component_api` output, then answer with the final file in a single ```tsx code block plus the theme/style wiring instructions.",
            ].join("\n"),
          },
        },
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text:
              `Screen to build: ${description}\n` +
              `Target framework: ${framework}\n` +
              (framework === "next"
                ? "Next.js specifics: use the app router — export a default page component, mark it 'use client' at the top because every component uses interactive M3E state/motion."
                : "React specifics: export a default App component; keep the file self-contained (Vite-compatible)."),
          },
        },
        {
          role: "assistant" as const,
          content: {
            type: "text" as const,
            text: `Understood. I will: (1) list + search components for "${description}", (2) pull guidelines and examples for each chosen id, (3) emit one compilable ${framework} file importing only documented props from 'm3-expressive-react', (4) wire data-theme + styles.css guidance, and (5) validate every prop before answering.`,
          },
        },
      ],
    })
  );

  server.registerPrompt(
    "m3_style_audit",
    {
      title: "Audit M3 Expressive style",
      description:
        "Audit user-provided JSX against the official M3 Expressive guidelines (variant misuse, missing state layers/focus, wrong dp sizes, touch targets, token violations) and return a structured findings list with concrete fixes.",
      argsSchema: {
        code: z.string().describe("The user's JSX/TSX code to audit"),
      },
    },
    ({ code }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: [
              "Audit the following JSX against the Material 3 Expressive guidelines of the m3-expressive-react library.",
              "",
              "Procedure:",
              "1. Identify every m3-expressive-react component used in the code.",
              "2. For each one, call the `get_component_guidelines` tool with its id and check the code against when-to-use / anatomy / states / dos / don'ts. Use `get_component_api` to verify the props actually exist.",
              "3. Check specifically for:",
              "   - VARIANT MISUSE: multiple filled buttons competing as the primary action in one region, wrong emphasis ordering, tonal FAB/snackbar misuse;",
              "   - MISSING STATE LAYERS / FOCUS: interactive elements must rely on the built-in .m3-state layers (hover 8% / focus 10% / pressed 10% / dragged 16%) — flag hand-rolled hover opacity, removed .m3-focus rings, or disabled focus-visible;",
              "   - WRONG DP SIZES: non-token font sizes or corner radii that ignore the shape scale, fixed heights below the 48×48dp minimum touch target for interactive elements;",
              "   - ACCESSIBILITY: icon-only controls without aria-label, dialogs/sheets missing Escape dismiss, focus not returned to triggers;",
              "   - TOKEN VIOLATIONS: raw hex colors, hard-coded motion durations/curves instead of the token springs/easings.",
              "4. Return a STRUCTURED findings list — for each finding: severity (error | warning | polish), the offending snippet (quoted), the violated guideline, and the exact corrected code. If the code is fully compliant, say so and list what you verified.",
              "",
              "Code to audit:",
              "```tsx",
              code,
              "```",
            ].join("\n"),
          },
        },
        {
          role: "assistant" as const,
          content: {
            type: "text" as const,
            text: "I'll identify the components used, fetch each one's guidelines via get_component_guidelines, verify props via get_component_api, and return a structured findings list (severity · snippet · violated guideline · fixed code) — or a compliance confirmation with the checklist I verified.",
          },
        },
      ],
    })
  );

  server.registerPrompt(
    "m3_theme_seed",
    {
      title: "Seed a custom M3 theme",
      description:
        "Derive a sensible seed color from a brand description, generate the full Material 3 scheme via the generate_theme tool, and emit the --md-* CSS variable blocks with data-theme wiring.",
      argsSchema: {
        brand: z.string().describe("Brand description to derive the seed from, e.g. 'a calm meditation app, sage green'"),
        variant: z
          .enum(["tonal-spot", "vibrant", "expressive", "content", "fidelity", "rainbow", "fruit-salad"])
          .optional()
          .describe("Palette style for the Dynamic Color engine (default 'tonal-spot')"),
      },
    },
    ({ brand, variant }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: [
              `Derive a Material 3 color scheme for this brand, then deliver it as ready-to-use code.`,
              "",
              "Steps:",
              `1. SEED — pick the brand's dominant hue and state it as a 6-digit hex (e.g. a coffee brand → warm brown #795548; a fintech app → trust blue #0B57D0). If the description gives no usable hue, fall back to the M3 baseline seed #6750A4. Always explain your choice in one sentence.`,
              `2. GENERATE — call the \`generate_theme\` tool with that seed (and variant "${variant ?? "tonal-spot"}", contrast 0 unless the user asked otherwise).`,
              "3. EMIT CSS — paste the tool's returned `css` blocks verbatim: they are scoped as :root[data-theme='<id>'] and [data-theme='<id>'].dark, defining every --md-* semantic role. Present them as one CSS snippet for the user's global stylesheet.",
              "4. WIRE — show the application wiring: `<html data-theme=\"<id>\">` (removing the attribute returns the baseline violet scheme) and the `.dark` class on <html> for dark mode. Components read ONLY the --md-* roles, so no component code changes.",
              "5. SANITY-CHECK — report the light/dark primary and on-primary pairs from the response so the user can verify contrast at a glance.",
              "",
              `Brand: ${brand}`,
            ].join("\n"),
          },
        },
        {
          role: "assistant" as const,
          content: {
            type: "text" as const,
            text: `I'll derive the seed hex from "${brand}", call generate_theme with the ${variant ?? "tonal-spot"} variant, then hand back the --md-* CSS blocks plus the data-theme/.dark wiring and a contrast sanity check.`,
          },
        },
      ],
    })
  );

  return server;
}

/* ------------------------------------------------------------------ */
/* Transport selection                                                 */
/* ------------------------------------------------------------------ */
/** stdio is the default; HTTP via MCP_TRANSPORT=http (the `dev` script) or `--http`. */
const HTTP_REQUESTED =
  process.env.MCP_TRANSPORT === "http" || process.argv.includes("--http");

if (!HTTP_REQUESTED) {
  /* ---------------- stdio (default — MCP clients spawn this) --------------- */
  await buildServer().connect(new StdioServerTransport());
  console.error(
    `[m3-expressive-mcp] connected on stdio — ${METAS.length} components, ${m3Themes.length} themes, full token system`
  );
} else {
  /* ---------------- streamable HTTP (stateless) ---------------------------- */
  const PORT = Number(process.env.PORT) || 3210;

  const CORS_HEADERS: Record<string, string> = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, accept, authorization, mcp-session-id, mcp-protocol-version, last-event-id",
    "Access-Control-Expose-Headers": "mcp-session-id, mcp-protocol-version",
    "Access-Control-Max-Age": "86400",
  };

  const applyCors = (res: ServerResponse) => {
    for (const [k, v] of Object.entries(CORS_HEADERS)) res.setHeader(k, v);
  };

  const sendJson = (res: ServerResponse, status: number, body: unknown) => {
    res.statusCode = status;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(body));
  };

  const readBody = (req: IncomingMessage) =>
    new Promise<string>((resolveBody, rejectBody) => {
      const chunks: Buffer[] = [];
      req.on("data", (c: Buffer) => chunks.push(c));
      req.on("end", () => resolveBody(Buffer.concat(chunks).toString("utf8")));
      req.on("error", rejectBody);
    });

  /**
   * POST /mcp — JSON-RPC over streamable HTTP.
   *
   * Stateless mode (`sessionIdGenerator: undefined`): the SDK requires a
   * fresh transport + server per request, so there is no Mcp-Session-Id and
   * every POST is independent. `enableJsonResponse: true` answers plain
   * application/json (no SSE stream) — ideal for curl and browser gateways.
   */
  async function handleMcpPost(req: IncomingMessage, res: ServerResponse) {
    applyCors(res);

    // Lenient header normalization so plain curl / browser fetch() work:
    // the MCP spec requires Accept: application/json, text/event-stream.
    const h = req.headers;
    const accept = new Set(
      String(h.accept ?? "").split(",").map((s) => s.trim()).filter(Boolean)
    );
    accept.add("application/json");
    accept.add("text/event-stream");
    h.accept = [...accept].join(", ");
    if (!h["content-type"]) h["content-type"] = "application/json";

    let parsed: unknown;
    try {
      parsed = JSON.parse(await readBody(req));
    } catch {
      return sendJson(res, 400, {
        jsonrpc: "2.0", error: { code: -32700, message: "Parse error" }, id: null,
      });
    }

    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // stateless — no Mcp-Session-Id issued
      enableJsonResponse: true,      // plain JSON responses (no SSE streams)
    });
    const server = buildServer();

    // Release per-request state once the response connection closes.
    res.on("close", () => {
      void transport.close();
      void server.close();
    });

    try {
      await server.connect(transport);
      await transport.handleRequest(req, res, parsed);
    } catch (e) {
      if (!res.headersSent) {
        sendJson(res, 500, {
          jsonrpc: "2.0", error: { code: -32603, message: `Internal error: ${e}` }, id: null,
        });
      }
    }
  }

  const handleHttpRequest = async (req: IncomingMessage, res: ServerResponse) => {
    const url = new URL(req.url ?? "/", "http://localhost");

    try {
      if (url.pathname === "/") {
        applyCors(res);
        return sendJson(res, 200, {
          service: "m3-expressive-mcp",
          transport: "streamable-http",
          version: m3Registry.version,
          tools: MCP_TOOL_NAMES.length,
          components: METAS.length,
          protocol: "MCP streamable HTTP (stateless — no Mcp-Session-Id)",
          endpoints: { health: "GET /", mcp: "POST /mcp" },
          status: "ok",
        });
      }

      if (url.pathname === "/mcp") {
        switch (req.method) {
          case "OPTIONS":
            applyCors(res);
            res.statusCode = 204;
            return res.end();
          case "POST":
            return await handleMcpPost(req, res);
          case "GET":
            // Stateless mode has no server-initiated SSE stream → 405 per spec.
            applyCors(res);
            res.setHeader("Allow", "POST, OPTIONS");
            return sendJson(res, 405, {
              jsonrpc: "2.0",
              error: { code: -32000, message: "Method not allowed. GET /mcp (SSE) is not supported in stateless mode; use POST." },
              id: null,
            });
          case "DELETE":
            applyCors(res);
            res.statusCode = 204;
            return res.end();
          case undefined:
          default:
            applyCors(res);
            res.setHeader("Allow", "POST, GET, DELETE, OPTIONS");
            return sendJson(res, 405, {
              jsonrpc: "2.0", error: { code: -32000, message: "Method not allowed." }, id: null,
            });
        }
      }

      sendJson(res, 404, { error: "Not found. Use GET / (health) or POST /mcp (JSON-RPC)." });
    } catch (e) {
      if (!res.headersSent) sendJson(res, 500, { error: `${e}` });
      else res.end();
    }
  };

  const httpServer = createServer((req, res) => {
    void handleHttpRequest(req, res);
  });

  // Survive `bun --hot` auto-restarts: drop the previous listener, if any.
  const hot = globalThis as { __m3McpHttpServer?: typeof httpServer };
  hot.__m3McpHttpServer?.close();

  httpServer.listen(PORT, () => {
    console.error(
      `[m3-expressive-mcp] streamable-http listening on http://localhost:${PORT}/mcp — stateless, 14 tools, CORS open (health: GET /)`
    );
  });
  hot.__m3McpHttpServer = httpServer;
}
