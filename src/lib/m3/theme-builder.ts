/**
 * MATERIAL 3 EXPRESSIVE — THEME BUILDER (server-safe, no DOM)
 *
 * Generates a complete M3 color scheme (light + dark) from a seed color using
 * Google's official @material/material-color-utilities engine — the same
 * Dynamic Color algorithm behind Material Theme Builder and Android 12+.
 *
 * Supported variants map 1:1 to the engine's `Variant` enum and are resolved
 * through `DynamicScheme` (2021 spec — the classic M3 tonal behavior that the
 * curated themes in themes.ts are modeled on). Every role is read from the
 * scheme getters (MaterialDynamicColors under the hood), so surface-container
 * tones, inverse roles and contrast adjustments all match the engine exactly.
 *
 * This module intentionally has NO "use client" and NO React/DOM imports so
 * the MCP server, API routes and RSC can consume it directly.
 */
import {
  DynamicScheme,
  Hct,
  Variant,
  argbFromHex,
  hexFromArgb,
} from "@material/material-color-utilities";

/* ------------------------------------------------------------------ */
/* Variants                                                            */
/* ------------------------------------------------------------------ */

export type M3VariantId =
  | "tonal-spot"
  | "vibrant"
  | "expressive"
  | "content"
  | "fidelity"
  | "rainbow"
  | "fruit-salad";

export interface M3VariantDef {
  id: M3VariantId;
  label: string;
  description: string;
}

/** The 7 Dynamic Color variants exposed by the engine (Material Theme Builder styles). */
export const variantCatalog: M3VariantDef[] = [
  {
    id: "tonal-spot",
    label: "Tonal spot",
    description:
      "The Android 12+ default. A pastel-toned scheme built around the seed hue with a fixed 36 chroma primary palette and a rotated secondary — calm, familiar, works with almost any seed.",
  },
  {
    id: "vibrant",
    label: "Vibrant",
    description:
      "A bright, colorful scheme that keeps more of the seed's chroma. The tertiary hue is rotated away from the primary for a livelier accent.",
  },
  {
    id: "expressive",
    label: "Expressive",
    description:
      "A playful scheme with hue shifts toward warm positions and unusual pairings. The M3E spirit — expect surprising tertiary accents.",
  },
  {
    id: "content",
    label: "Content",
    description:
      "The primary palette stays as close to the source color as the contrast system allows — the most literal reading of your seed.",
  },
  {
    id: "fidelity",
    label: "Fidelity",
    description:
      "Like Content, but tones are also matched to the seed's tone. High-fidelity to the source while still producing accessible roles.",
  },
  {
    id: "rainbow",
    label: "Rainbow",
    description:
      "A pastel scheme: the primary palette is desaturated to a near-neutral and the seed's full hue lands in the secondary/tertiary accents.",
  },
  {
    id: "fruit-salad",
    label: "Fruit salad",
    description:
      "A playful scheme where the primary hue is rotated and the seed hue moves to the secondary — colorful, fun, slightly chaotic.",
  },
];

const VARIANT_MAP: Record<M3VariantId, Variant> = {
  "tonal-spot": Variant.TONAL_SPOT,
  vibrant: Variant.VIBRANT,
  expressive: Variant.EXPRESSIVE,
  content: Variant.CONTENT,
  fidelity: Variant.FIDELITY,
  rainbow: Variant.RAINBOW,
  "fruit-salad": Variant.FRUIT_SALAD,
};

/** All valid variant ids (for validation). */
export const variantIds = variantCatalog.map((v) => v.id);

/* ------------------------------------------------------------------ */
/* Roles                                                               */
/* ------------------------------------------------------------------ */

/**
 * Every `--md-*` color role defined in :root of globals.css, in the order they
 * appear there (34 roles). Keys are the role names WITHOUT the `--md-` prefix.
 * All of them have dedicated getters on DynamicScheme (i.e. they are all
 * MaterialDynamicColors roles), so nothing needs hand-mapping from palettes.
 */
export const schemeRoles = [
  "primary",
  "on-primary",
  "primary-container",
  "on-primary-container",
  "secondary",
  "on-secondary",
  "secondary-container",
  "on-secondary-container",
  "tertiary",
  "on-tertiary",
  "tertiary-container",
  "on-tertiary-container",
  "error",
  "on-error",
  "error-container",
  "on-error-container",
  "surface",
  "on-surface",
  "surface-variant",
  "on-surface-variant",
  "surface-dim",
  "surface-bright",
  "surface-container-lowest",
  "surface-container-low",
  "surface-container",
  "surface-container-high",
  "surface-container-highest",
  "outline",
  "outline-variant",
  "inverse-surface",
  "inverse-on-surface",
  "inverse-primary",
  "scrim",
  "shadow",
] as const;

export type M3SchemeRole = (typeof schemeRoles)[number];

export type M3SchemeRecord = Record<M3SchemeRole, string>;

export interface GeneratedScheme {
  light: M3SchemeRecord;
  dark: M3SchemeRecord;
}

/** kebab-case role → DynamicScheme getter name (e.g. "on-primary" → "onPrimary"). */
const roleToGetter = (role: string): string =>
  role.replace(/(^|-)([a-z])/g, (_, sep, ch: string) => (sep ? ch.toUpperCase() : ch));

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

/**
 * Normalize a seed hex string: accepts 3 or 6 digit hex with or without "#"
 * and returns lowercase "#rrggbb". Returns null for anything invalid.
 */
export function normalizeHex(input: string): string | null {
  if (typeof input !== "string") return null;
  let hex = input.trim().replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return null;
  return `#${hex.toLowerCase()}`;
}

/** Validate a variant id. Returns null for anything invalid. */
export function normalizeVariant(input: string): M3VariantId | null {
  return (variantIds as string[]).includes(input) ? (input as M3VariantId) : null;
}

/** Clamp a contrast level into the 0..1 range (standard → high). */
export function clampContrast(input: number): number {
  if (!Number.isFinite(input)) return 0;
  return Math.min(1, Math.max(0, input));
}

/* ------------------------------------------------------------------ */
/* Scheme generation                                                   */
/* ------------------------------------------------------------------ */

function buildRecord(scheme: DynamicScheme): M3SchemeRecord {
  const out = {} as M3SchemeRecord;
  for (const role of schemeRoles) {
    const argb = scheme[roleToGetter(role) as keyof DynamicScheme] as number;
    out[role] = hexFromArgb(argb);
  }
  return out;
}

/**
 * Generate the full light + dark M3 scheme for a seed color.
 *
 * @param seedHex       Seed color — 3 or 6 digit hex, "#" optional.
 * @param variant       One of the 7 Dynamic Color variants (default "tonal-spot").
 * @param contrastLevel 0 (standard), 0.5 (medium) or 1 (high) — clamped to 0..1.
 * @throws Error with a human-readable message when the seed is invalid.
 */
export function generateScheme(
  seedHex: string,
  variant: M3VariantId = "tonal-spot",
  contrastLevel = 0
): GeneratedScheme {
  const seed = normalizeHex(seedHex);
  if (!seed) throw new Error(`Invalid seed color "${seedHex}". Use a 3 or 6 digit hex value like #6750A4.`);
  const v = normalizeVariant(variant) ?? "tonal-spot";
  const contrast = clampContrast(contrastLevel);

  const sourceColorHct = Hct.fromInt(argbFromHex(seed));
  const options = { sourceColorHct, variant: VARIANT_MAP[v], contrastLevel: contrast, specVersion: "2021" as const };

  const light = buildRecord(new DynamicScheme({ ...options, isDark: false }));
  const dark = buildRecord(new DynamicScheme({ ...options, isDark: true }));

  return { light, dark };
}

/* ------------------------------------------------------------------ */
/* CSS var blocks (for export / no-flash injection)                    */
/* ------------------------------------------------------------------ */

const varLines = (record: M3SchemeRecord, indent = "  "): string =>
  schemeRoles.map((role) => `${indent}--md-${role}: ${record[role]};`).join("\n");

/**
 * Render the generated scheme as the two CSS custom-property blocks used by
 * the custom theme system:
 *   lightBlock → `:root[data-theme="custom"] { … }`
 *   darkBlock  → `[data-theme="custom"].dark { … }`
 */
export function schemeToCssVars(result: GeneratedScheme): { lightBlock: string; darkBlock: string } {
  return {
    lightBlock: `:root[data-theme="custom"] {\n${varLines(result.light)}\n}`,
    darkBlock: `[data-theme="custom"].dark {\n${varLines(result.dark)}\n}`,
  };
}

/** The two blocks joined with a newline — convenience for copy-to-clipboard. */
export function schemeToCssText(result: GeneratedScheme): string {
  const { lightBlock, darkBlock } = schemeToCssVars(result);
  return `${lightBlock}\n\n${darkBlock}\n`;
}
