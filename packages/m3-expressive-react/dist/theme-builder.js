// ../../src/lib/m3/theme-builder.ts
import {
  DynamicScheme,
  Hct,
  Variant,
  argbFromHex,
  hexFromArgb
} from "@material/material-color-utilities";
var variantCatalog = [
  {
    id: "tonal-spot",
    label: "Tonal spot",
    description: "The Android 12+ default. A pastel-toned scheme built around the seed hue with a fixed 36 chroma primary palette and a rotated secondary \u2014 calm, familiar, works with almost any seed."
  },
  {
    id: "vibrant",
    label: "Vibrant",
    description: "A bright, colorful scheme that keeps more of the seed's chroma. The tertiary hue is rotated away from the primary for a livelier accent."
  },
  {
    id: "expressive",
    label: "Expressive",
    description: "A playful scheme with hue shifts toward warm positions and unusual pairings. The M3E spirit \u2014 expect surprising tertiary accents."
  },
  {
    id: "content",
    label: "Content",
    description: "The primary palette stays as close to the source color as the contrast system allows \u2014 the most literal reading of your seed."
  },
  {
    id: "fidelity",
    label: "Fidelity",
    description: "Like Content, but tones are also matched to the seed's tone. High-fidelity to the source while still producing accessible roles."
  },
  {
    id: "rainbow",
    label: "Rainbow",
    description: "A pastel scheme: the primary palette is desaturated to a near-neutral and the seed's full hue lands in the secondary/tertiary accents."
  },
  {
    id: "fruit-salad",
    label: "Fruit salad",
    description: "A playful scheme where the primary hue is rotated and the seed hue moves to the secondary \u2014 colorful, fun, slightly chaotic."
  }
];
var VARIANT_MAP = {
  "tonal-spot": Variant.TONAL_SPOT,
  vibrant: Variant.VIBRANT,
  expressive: Variant.EXPRESSIVE,
  content: Variant.CONTENT,
  fidelity: Variant.FIDELITY,
  rainbow: Variant.RAINBOW,
  "fruit-salad": Variant.FRUIT_SALAD
};
var variantIds = variantCatalog.map((v) => v.id);
var schemeRoles = [
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
  "shadow"
];
var roleToGetter = (role) => role.replace(/(^|-)([a-z])/g, (_, sep, ch) => sep ? ch.toUpperCase() : ch);
function normalizeHex(input) {
  if (typeof input !== "string") return null;
  let hex = input.trim().replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return null;
  return `#${hex.toLowerCase()}`;
}
function normalizeVariant(input) {
  return variantIds.includes(input) ? input : null;
}
function clampContrast(input) {
  if (!Number.isFinite(input)) return 0;
  return Math.min(1, Math.max(0, input));
}
function buildRecord(scheme) {
  const out = {};
  for (const role of schemeRoles) {
    const argb = scheme[roleToGetter(role)];
    out[role] = hexFromArgb(argb);
  }
  return out;
}
function generateScheme(seedHex, variant = "tonal-spot", contrastLevel = 0) {
  const seed = normalizeHex(seedHex);
  if (!seed) throw new Error(`Invalid seed color "${seedHex}". Use a 3 or 6 digit hex value like #6750A4.`);
  const v = normalizeVariant(variant) ?? "tonal-spot";
  const contrast = clampContrast(contrastLevel);
  const sourceColorHct = Hct.fromInt(argbFromHex(seed));
  const options = { sourceColorHct, variant: VARIANT_MAP[v], contrastLevel: contrast, specVersion: "2021" };
  const light = buildRecord(new DynamicScheme({ ...options, isDark: false }));
  const dark = buildRecord(new DynamicScheme({ ...options, isDark: true }));
  return { light, dark };
}
var varLines = (record, indent = "  ") => schemeRoles.map((role) => `${indent}--md-${role}: ${record[role]};`).join("\n");
function schemeToCssVars(result) {
  return {
    lightBlock: `:root[data-theme="custom"] {
${varLines(result.light)}
}`,
    darkBlock: `[data-theme="custom"].dark {
${varLines(result.dark)}
}`
  };
}
function schemeToCssText(result) {
  const { lightBlock, darkBlock } = schemeToCssVars(result);
  return `${lightBlock}

${darkBlock}
`;
}
export {
  clampContrast,
  generateScheme,
  normalizeHex,
  normalizeVariant,
  schemeRoles,
  schemeToCssText,
  schemeToCssVars,
  variantCatalog,
  variantIds
};
//# sourceMappingURL=theme-builder.js.map