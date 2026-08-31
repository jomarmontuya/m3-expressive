import { readFile, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";

import { m3Registry } from "../src/lib/m3/registry";
import { m3Themes, schemeToCssVars } from "../src/lib/m3/themes";

const root = resolve(import.meta.dir, "..");
const releaseRef = "v0.1.0-beta.1";
const address = (item: string) => `jomarmontuya/m3-expressive/${item}#${releaseRef}`;

const crossDependencies: Record<string, string[]> = {
  "extended-fab": [address("fab")],
  "fab-menu": [address("fab")],
  "date-picker": [address("text-field")],
  "top-app-bar": [address("search-view")],
};

const themeColors = {
  "color-background": "var(--background)",
  "color-foreground": "var(--foreground)",
  "color-border": "var(--border)",
  "color-ring": "var(--ring)",
  "color-m3-primary": "var(--md-primary)",
  "color-m3-on-primary": "var(--md-on-primary)",
  "color-m3-primary-container": "var(--md-primary-container)",
  "color-m3-on-primary-container": "var(--md-on-primary-container)",
  "color-m3-secondary": "var(--md-secondary)",
  "color-m3-on-secondary": "var(--md-on-secondary)",
  "color-m3-secondary-container": "var(--md-secondary-container)",
  "color-m3-on-secondary-container": "var(--md-on-secondary-container)",
  "color-m3-tertiary": "var(--md-tertiary)",
  "color-m3-on-tertiary": "var(--md-on-tertiary)",
  "color-m3-tertiary-container": "var(--md-tertiary-container)",
  "color-m3-on-tertiary-container": "var(--md-on-tertiary-container)",
  "color-m3-error": "var(--md-error)",
  "color-m3-on-error": "var(--md-on-error)",
  "color-m3-error-container": "var(--md-error-container)",
  "color-m3-on-error-container": "var(--md-on-error-container)",
  "color-m3-surface": "var(--md-surface)",
  "color-m3-on-surface": "var(--md-on-surface)",
  "color-m3-surface-variant": "var(--md-surface-variant)",
  "color-m3-on-surface-variant": "var(--md-on-surface-variant)",
  "color-m3-surface-dim": "var(--md-surface-dim)",
  "color-m3-surface-bright": "var(--md-surface-bright)",
  "color-m3-surface-container-lowest": "var(--md-surface-container-lowest)",
  "color-m3-surface-container-low": "var(--md-surface-container-low)",
  "color-m3-surface-container": "var(--md-surface-container)",
  "color-m3-surface-container-high": "var(--md-surface-container-high)",
  "color-m3-surface-container-highest": "var(--md-surface-container-highest)",
  "color-m3-outline": "var(--md-outline)",
  "color-m3-outline-variant": "var(--md-outline-variant)",
  "color-m3-inverse-surface": "var(--md-inverse-surface)",
  "color-m3-inverse-on-surface": "var(--md-inverse-on-surface)",
  "color-m3-inverse-primary": "var(--md-inverse-primary)",
  "color-m3-scrim": "var(--md-scrim)",
  "color-m3-shadow": "var(--md-shadow)",
  "color-m3-surface-tint": "var(--md-primary)",
  "radius-m3-xs": "4px",
  "radius-m3-sm": "8px",
  "radius-m3-md": "12px",
  "radius-m3-lg": "16px",
  "radius-m3-lg-increased": "20px",
  "radius-m3-xl": "28px",
  "radius-m3-xxl": "36px",
};

const expressiveLight = {
  "md-expressive-lime": "#e5f78d",
  "md-expressive-lime-container": "#eeffc4",
  "md-expressive-orange": "#fb7c41",
  "md-expressive-orange-container": "#ffdccb",
  "md-expressive-pink": "#ff5c8a",
  "md-expressive-violet": "#b98cff",
};

const expressiveDark = {
  "md-expressive-lime": "#c7ee68",
  "md-expressive-lime-container": "#39491f",
  "md-expressive-orange": "#ff9a70",
  "md-expressive-orange-container": "#6d2f0c",
  "md-expressive-pink": "#ff8aa8",
  "md-expressive-violet": "#cf9bff",
};

function cssVariables(scheme: (typeof m3Themes)[number]["light"]) {
  return Object.fromEntries(
    Object.entries(schemeToCssVars(scheme)).map(([key, value]) => [key.slice(2), value]),
  );
}

function bridgeVariables() {
  return {
    background: "var(--md-surface)",
    foreground: "var(--md-on-surface)",
    border: "var(--md-outline-variant)",
    ring: "var(--md-primary)",
  };
}

const baseline = m3Themes[0];
const cssVars = {
  theme: themeColors,
  light: { ...cssVariables(baseline.light), ...bridgeVariables(), ...expressiveLight },
  dark: { ...cssVariables(baseline.dark), ...bridgeVariables(), ...expressiveDark },
};

const css: Record<string, unknown> = {
  "@font-face": [
    {
      "font-family": '"Roboto Flex"',
      "font-style": "normal",
      "font-weight": "100 1000",
      "font-stretch": "100%",
      "font-display": "swap",
      src: "url(https://fonts.gstatic.com/s/robotoflex/v30/NaNeepOXO_NexZs0b5QrzlOHb8wXqDGRY6mZsaJ8__OGfttPZktqc2VdZ80KvCLZaPcSBZtOx2MifRuWR28sPJtUMbsFEK6cRrleUx9Xgbm3WLHa_F4Ep4Fm0PN19Ik5Dntczx0wZGzhPlL1YNMYKbv9_1IQXOw7AiUJVXRrV8cWW4O8LJCoXjCnwSRSaLshNP1d9-EmF8tqHbE.woff2) format('woff2')",
      "unicode-range": "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
    {
      "font-family": '"Material Symbols Rounded"',
      "font-style": "normal",
      "font-weight": "100 700",
      "font-display": "swap",
      src: "url(https://fonts.gstatic.com/s/materialsymbolsrounded/v369/sykg-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjzaqkNCeE.woff2) format('woff2')",
    },
  ],
  "@custom-variant dark (&:is(.dark *))": {},
  html: {
    "font-family": '"Roboto Flex", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
  },
  body: {
    "background-color": "var(--md-surface)",
    color: "var(--md-on-surface)",
    "font-family": '"Roboto Flex", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    "font-variation-settings": '"GRAD" 0, "slnt" 0, "opsz" 24',
  },
  "::selection": {
    background: "var(--md-primary-container)",
    color: "var(--md-on-primary-container)",
  },
  ".m3-elevation-1": { "box-shadow": "0 1px 2px 0 rgb(0 0 0 / 0.30), 0 1px 3px 1px rgb(0 0 0 / 0.15)" },
  ".m3-elevation-2": { "box-shadow": "0 1px 2px 0 rgb(0 0 0 / 0.30), 0 2px 6px 2px rgb(0 0 0 / 0.15)" },
  ".m3-elevation-3": { "box-shadow": "0 1px 3px 0 rgb(0 0 0 / 0.30), 0 4px 8px 3px rgb(0 0 0 / 0.15)" },
  ".m3-elevation-4": { "box-shadow": "0 2px 3px 0 rgb(0 0 0 / 0.30), 0 6px 10px 4px rgb(0 0 0 / 0.15)" },
  ".m3-elevation-5": { "box-shadow": "0 4px 4px 0 rgb(0 0 0 / 0.30), 0 8px 12px 6px rgb(0 0 0 / 0.15)" },
  ".md-display-large": { "font-size": "3.5625rem", "line-height": "4rem", "letter-spacing": "-0.015rem", "font-weight": "400" },
  ".md-display-medium": { "font-size": "2.8125rem", "line-height": "3.25rem", "font-weight": "400" },
  ".md-display-small": { "font-size": "2.25rem", "line-height": "2.75rem", "font-weight": "400" },
  ".md-headline-large": { "font-size": "2rem", "line-height": "2.5rem", "font-weight": "400" },
  ".md-headline-medium": { "font-size": "1.75rem", "line-height": "2.25rem", "font-weight": "400" },
  ".md-headline-small": { "font-size": "1.5rem", "line-height": "2rem", "font-weight": "400" },
  ".md-title-large": { "font-size": "1.375rem", "line-height": "1.75rem", "font-weight": "400" },
  ".md-title-medium": { "font-size": "1rem", "line-height": "1.5rem", "letter-spacing": "0.009rem", "font-weight": "500" },
  ".md-title-small": { "font-size": "0.875rem", "line-height": "1.25rem", "letter-spacing": "0.006rem", "font-weight": "500" },
  ".md-body-large": { "font-size": "1rem", "line-height": "1.5rem", "letter-spacing": "0.031rem", "font-weight": "400" },
  ".md-body-medium": { "font-size": "0.875rem", "line-height": "1.25rem", "letter-spacing": "0.017rem", "font-weight": "400" },
  ".md-body-small": { "font-size": "0.75rem", "line-height": "1rem", "letter-spacing": "0.025rem", "font-weight": "400" },
  ".md-label-large": { "font-size": "0.875rem", "line-height": "1.25rem", "letter-spacing": "0.006rem", "font-weight": "500" },
  ".md-label-medium": { "font-size": "0.75rem", "line-height": "1rem", "letter-spacing": "0.031rem", "font-weight": "500" },
  ".md-label-small": { "font-size": "0.6875rem", "line-height": "1rem", "letter-spacing": "0.031rem", "font-weight": "500" },
  ".m3-state": { position: "relative" },
  ".m3-state::after": {
    content: '""',
    position: "absolute",
    inset: "0",
    "border-radius": "inherit",
    background: "currentColor",
    opacity: "0",
    "pointer-events": "none",
    transition: "opacity 150ms cubic-bezier(0.2, 0, 0, 1)",
  },
  "@media (hover: hover)": { ".m3-state:hover::after": { opacity: "0.08" } },
  ".m3-state:focus-visible::after, .m3-state[data-pressed=\"true\"]::after, .m3-state:active::after": { opacity: "0.10" },
  ".m3-focus:focus-visible": { outline: "3px solid var(--md-primary)", "outline-offset": "2px" },
  ".material-symbols-rounded": {
    "font-family": '"Material Symbols Rounded"',
    "font-weight": "normal",
    "font-style": "normal",
    "font-size": "24px",
    "line-height": "1",
    "letter-spacing": "normal",
    "text-transform": "none",
    display: "inline-block",
    width: "1em",
    "min-width": "1em",
    overflow: "hidden",
    "text-align": "center",
    "white-space": "nowrap",
    "word-wrap": "normal",
    direction: "ltr",
    "-webkit-font-smoothing": "antialiased",
    "font-variation-settings": '"FILL" var(--msr-fill, 0), "wght" var(--msr-wght, 400), "GRAD" var(--msr-grad, 0), "opsz" var(--msr-opsz, 24)',
  },
  ".msr-fill": { "--msr-fill": "1" },
  ".m3-scroll": { "scrollbar-width": "thin", "scrollbar-color": "var(--md-outline-variant) transparent" },
  ".m3-scroll::-webkit-scrollbar": { width: "8px", height: "8px" },
  ".m3-scroll::-webkit-scrollbar-track": { background: "transparent" },
  ".m3-scroll::-webkit-scrollbar-thumb": { background: "var(--md-outline-variant)", "border-radius": "9999px" },
  ".m3-scroll::-webkit-scrollbar-thumb:hover": { background: "var(--md-outline)" },
  "@keyframes m3-ripple-in": {
    from: { transform: "scale(0)", opacity: "0.12" },
    to: { transform: "scale(1)", opacity: "0.12" },
  },
  "@keyframes m3-ripple-out": {
    from: { transform: "scale(1)", opacity: "0.12" },
    to: { transform: "scale(1)", opacity: "0" },
  },
  "@media (prefers-reduced-motion: reduce)": {
    "*, *::before, *::after": {
      "animation-duration": "0.01ms !important",
      "animation-iteration-count": "1 !important",
      "transition-duration": "0.01ms !important",
      "scroll-behavior": "auto !important",
    },
  },
};

for (const theme of m3Themes.filter((candidate) => candidate.id !== "baseline")) {
  css[`[data-theme="${theme.id}"]`] = { ...schemeToCssVars(theme.light), "color-scheme": "light" };
  css[`[data-theme="${theme.id}"].dark`] = { ...schemeToCssVars(theme.dark), "color-scheme": "dark" };
}

const baseItem = {
  name: "m3-base",
  type: "registry:style",
  title: "Material 3 Expressive base",
  description: "Shared Material tokens, styles, helpers, fonts, and runtime dependencies for every component.",
  dependencies: [
    "@base-ui/react@^1.7.0",
    "framer-motion@^12.23.2",
    "clsx@^2.1.1",
    "tailwind-merge@^3.3.1",
  ],
  files: [
    { path: "src/components/m3/Ripple.tsx", type: "registry:component", target: "@components/m3/Ripple.tsx" },
    { path: "src/components/m3/MaterialSymbol.tsx", type: "registry:component", target: "@components/m3/MaterialSymbol.tsx" },
    { path: "src/lib/utils.ts", type: "registry:lib", target: "@lib/utils.ts" },
    { path: "src/lib/m3/tokens.ts", type: "registry:lib", target: "@lib/m3/tokens.ts" },
    { path: "src/lib/m3/use-text-direction.ts", type: "registry:hook", target: "@lib/m3/use-text-direction.ts" },
  ],
  cssVars,
  css,
  docs: "Material 3 styles were merged into your configured global CSS file. Components use direct local imports from @/components/m3.",
};

function componentItem(component: (typeof m3Registry.components)[number]) {
  const dependencies = [address("m3-base"), ...(crossDependencies[component.id] ?? [])];
  return {
    name: component.id,
    type: "registry:component",
    title: component.name,
    description: component.description,
    registryDependencies: dependencies,
    files: [
      {
        path: component.file,
        type: "registry:component",
        target: `@components/m3/${basename(component.file)}`,
      },
    ],
    categories: [component.category],
    meta: {
      materialStatus: component.spec.status,
      materialUrl: component.spec.materialUrl,
      auditedAt: component.spec.auditedAt,
    },
  };
}

await writeFile(
  resolve(root, "registry.json"),
  `${JSON.stringify({
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "m3-expressive",
    homepage: "https://github.com/jomarmontuya/m3-expressive",
    items: [baseItem, ...m3Registry.components.map(componentItem)],
  }, null, 2)}\n`,
);

const componentSources = Object.fromEntries(
  await Promise.all(
    m3Registry.components.map(async (component) => {
      const source = await readFile(resolve(root, component.file), "utf8");
      return [
        component.id,
        {
          path: component.file,
          lines: source.split("\n").length,
          bytes: Buffer.byteLength(source, "utf8"),
          source,
        },
      ];
    }),
  ),
);

await writeFile(
  resolve(root, "src/lib/m3/component-sources.generated.ts"),
  `// Generated by scripts/build-registry.ts. Do not edit by hand.\n` +
    `export const componentSources = ${JSON.stringify(componentSources, null, 2)} as const;\n`,
);

console.log(`Built ${m3Registry.totalCount + 1} registry items for ${releaseRef}.`);
