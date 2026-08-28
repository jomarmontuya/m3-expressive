#!/usr/bin/env bun
/**
 * Material 3 Expressive — MCP Server
 * ===================================
 * Exposes the m3-expressive-react component library to AI coding agents
 * via the Model Context Protocol (stdio transport).
 *
 * Run:
 *   cd mini-services/mcp-server && bun install && bun start
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
 */
import { readFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import {
  buttonMeta, iconButtonMeta, fabMeta, extendedFabMeta, fabMenuMeta,
  splitButtonMeta, buttonGroupMeta, segmentedButtonMeta,
  badgeMeta, linearProgressMeta, circularProgressMeta, loadingIndicatorMeta,
  snackbarMeta, tooltipMeta, bannerMeta, dialogMeta, dividerMeta,
  cardMeta, listMeta, bottomSheetMeta, sideSheetMeta,
  textFieldMeta, searchBarMeta, autocompleteMeta,
  checkboxMeta, radioMeta, switchMeta, sliderMeta, chipMeta,
  tabsMeta, navigationBarMeta, navigationDrawerMeta, navigationRailMeta,
  topAppBarMeta, bottomAppBarMeta, toolbarMeta, menuMeta,
  datePickerMeta, timePickerMeta,
} from "../../src/lib/m3/meta";
import type { M3ComponentMeta } from "../../src/lib/m3/types";
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

/** id → implementation file (relative to src/components/m3). */
const FILES: Record<string, string> = {
  button: "Button", "icon-button": "IconButton", fab: "FAB",
  "extended-fab": "ExtendedFab", "fab-menu": "FabMenu",
  "split-button": "SplitButton", "button-group": "ButtonGroup",
  "segmented-button": "SegmentedButton",
  badge: "Badge", "linear-progress": "LinearProgress",
  "circular-progress": "CircularProgress", "loading-indicator": "LoadingIndicator",
  snackbar: "Snackbar", tooltip: "Tooltip", banner: "Banner",
  dialog: "Dialog", divider: "Divider",
  card: "Card", list: "List", "bottom-sheet": "BottomSheet", "side-sheet": "SideSheet",
  "text-field": "TextField", "search-bar": "SearchBar", autocomplete: "Autocomplete",
  checkbox: "Checkbox", radio: "Radio", switch: "Switch", slider: "Slider", chip: "Chip",
  tabs: "Tabs", "navigation-bar": "NavigationBar", "navigation-drawer": "NavigationDrawer",
  "navigation-rail": "NavigationRail", "top-app-bar": "TopAppBar",
  "bottom-app-bar": "BottomAppBar", toolbar: "Toolbar", menu: "Menu",
  "date-picker": "DatePicker", "time-picker": "TimePicker",
};

const METAS: M3ComponentMeta[] = [
  buttonMeta, iconButtonMeta, fabMeta, extendedFabMeta, fabMenuMeta,
  splitButtonMeta, buttonGroupMeta, segmentedButtonMeta,
  badgeMeta, linearProgressMeta, circularProgressMeta, loadingIndicatorMeta,
  snackbarMeta, tooltipMeta, bannerMeta, dialogMeta, dividerMeta,
  cardMeta, listMeta, bottomSheetMeta, sideSheetMeta,
  textFieldMeta, searchBarMeta, autocompleteMeta,
  checkboxMeta, radioMeta, switchMeta, sliderMeta, chipMeta,
  tabsMeta, navigationBarMeta, navigationDrawerMeta, navigationRailMeta,
  topAppBarMeta, bottomAppBarMeta, toolbarMeta, menuMeta,
  datePickerMeta, timePickerMeta,
];

const CATEGORIES = ["actions", "communication", "containment", "selection", "textinput", "navigation", "feedback"] as const;

const find = (id: string) => METAS.find((m) => m.id === id);
const summary = (m: M3ComponentMeta) => ({
  id: m.id, name: m.name, category: m.category, description: m.description,
  variants: m.variants, m3e: !!m.m3e,
  source: `src/components/m3/${FILES[m.id]}.tsx`,
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
/* Server                                                              */
/* ------------------------------------------------------------------ */
const server = new McpServer({
  name: "m3-expressive",
  version: "1.0.0",
});

const text = (data: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] });

/* ---- discovery ---- */
server.registerTool(
  "list_components",
  {
    title: "List components",
    description:
      "List every component in the Material 3 Expressive React library with id, name, category, variants, M3E flag, source path and import line. Start here.",
    inputSchema: { category: z.string().optional().describe("Filter by category: actions | communication | containment | selection | textinput | navigation | feedback") },
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
      library: "m3-expressive-react",
      version: "1.0.0",
      spec: "https://m3.material.io",
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
    const rel = `src/components/m3/${FILES[m.id]}.tsx`;
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
      reducedMotion: "Honored globally via MotionConfig reducedMotion='user' + CSS prefers-reduced-motion",
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
        "prefers-reduced-motion: MotionConfig reducedMotion='user' at the app root + CSS media query kills CSS animations",
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
/* Transport                                                           */
/* ------------------------------------------------------------------ */
await server.connect(new StdioServerTransport());
console.error("[m3-expressive-mcp] connected on stdio — 39 components, 4 themes, full token system");
