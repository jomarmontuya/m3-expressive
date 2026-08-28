import type { Transition } from "framer-motion";

/**
 * MATERIAL 3 EXPRESSIVE — DESIGN TOKENS (TypeScript mirror of globals.css)
 *
 * These tokens mirror the official Material 3 Expressive system:
 * - Motion: physics-based springs (fast/default/slow × spatial/visual/effects + expressive bounce)
 * - Easings: emphasized curves for non-spring transitions
 * - Durations: M3 duration tokens 50ms → 1000ms
 * - Shape: corner radius scale including M3E morph targets
 * - State layers: official hover/focus/pressed/dragged opacities
 */

/* ------------------------------------------------------------------ */
/* Motion — spring physics (the heart of M3 Expressive)               */
/* ------------------------------------------------------------------ */
/** Factory producing a properly-typed framer-motion spring Transition. */
const spring = (stiffness: number, damping: number, mass = 1): Transition => ({
  type: "spring",
  stiffness,
  damping,
  mass,
});

export const springs = {
  /** Spring fast spatial — large element translation */
  fastSpatial: spring(1200, 200),
  /** Spring fast visual effects — scale/fade of small elements */
  fastVisual: spring(1600, 200),
  /** Spring fast default */
  fastDefault: spring(1400, 200),
  /** Spring default spatial */
  defaultSpatial: spring(800, 170),
  /** Spring default visual effects */
  defaultVisual: spring(1000, 180),
  /** Spring slow spatial */
  slowSpatial: spring(500, 140),
  /** Spring slow visual effects */
  slowVisual: spring(600, 150),
  /** Expressive spatial — energetic move-in of large transitions */
  expressiveSpatial: spring(1400, 190),
  /** Expressive effects — shape morphs and playful transforms */
  expressiveEffects: spring(1000, 130),
  /** Expressive default — THE signature bouncy M3E spring */
  expressive: spring(380, 22),
  /** Bouncier variant for celebratory moments */
  bouncy: spring(500, 18),
} satisfies Record<string, Transition>;

export type M3Spring = (typeof springs)[keyof typeof springs];

/* ------------------------------------------------------------------ */
/* Easing curves (for non-physics transitions)                        */
/* ------------------------------------------------------------------ */
export const easings = {
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  standardAccelerate: "cubic-bezier(0.3, 0, 1, 1)",
  standardDecelerate: "cubic-bezier(0, 0, 0, 1)",
  emphasized: "cubic-bezier(0.2, 0, 0, 1)",
  emphasizedAccelerate: "cubic-bezier(0.3, 0, 0.8, 0.15)",
  emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1)",
  linear: "linear",
} as const;

/* ------------------------------------------------------------------ */
/* Durations (ms)                                                     */
/* ------------------------------------------------------------------ */
export const durations = {
  short1: 50,
  short2: 100,
  short3: 150,
  short4: 200,
  medium1: 250,
  medium2: 300,
  medium3: 350,
  medium4: 400,
  long1: 450,
  long2: 500,
  long3: 550,
  long4: 600,
  extraLong1: 700,
  extraLong2: 800,
  extraLong3: 900,
  extraLong4: 1000,
} as const;

/* ------------------------------------------------------------------ */
/* Shape scale — corner radius (M3E adds increased + morph targets)   */
/* ------------------------------------------------------------------ */
export const shapes = {
  none: "0px",
  extraSmall: "4px",
  small: "8px",
  medium: "12px",
  large: "16px",
  largeIncreased: "20px",
  extraLarge: "28px",
  extraExtraLarge: "36px",
  full: "9999px",
} as const;

/** Shape morph pairs used by expressive press interactions */
export const shapeMorph = {
  /** buttons: rest = full (pill) → pressed = largeIncreased */
  button: { rest: shapes.full, pressed: "20px" },
  /** cards: rest = medium → pressed = small */
  card: { rest: shapes.medium, pressed: shapes.small },
} as const;

/* ------------------------------------------------------------------ */
/* State layer opacities (official M3 values)                         */
/* ------------------------------------------------------------------ */
export const stateOpacities = {
  hover: 0.08,
  focus: 0.1,
  pressed: 0.1,
  dragged: 0.16,
} as const;

/* ------------------------------------------------------------------ */
/* Typography scale (for programmatic use)                            */
/* ------------------------------------------------------------------ */
export const typeScale = {
  displayLarge: { fontSize: 57, lineHeight: 64, letterSpacing: -0.25, weight: 400 },
  displayMedium: { fontSize: 45, lineHeight: 52, letterSpacing: 0, weight: 400 },
  displaySmall: { fontSize: 36, lineHeight: 44, letterSpacing: 0, weight: 400 },
  headlineLarge: { fontSize: 32, lineHeight: 40, letterSpacing: 0, weight: 400 },
  headlineMedium: { fontSize: 28, lineHeight: 36, letterSpacing: 0, weight: 400 },
  headlineSmall: { fontSize: 24, lineHeight: 32, letterSpacing: 0, weight: 400 },
  titleLarge: { fontSize: 22, lineHeight: 28, letterSpacing: 0, weight: 400 },
  titleMedium: { fontSize: 16, lineHeight: 24, letterSpacing: 0.15, weight: 500 },
  titleSmall: { fontSize: 14, lineHeight: 20, letterSpacing: 0.1, weight: 500 },
  bodyLarge: { fontSize: 16, lineHeight: 24, letterSpacing: 0.5, weight: 400 },
  bodyMedium: { fontSize: 14, lineHeight: 20, letterSpacing: 0.25, weight: 400 },
  bodySmall: { fontSize: 12, lineHeight: 16, letterSpacing: 0.4, weight: 400 },
  labelLarge: { fontSize: 14, lineHeight: 20, letterSpacing: 0.1, weight: 500 },
  labelMedium: { fontSize: 12, lineHeight: 16, letterSpacing: 0.5, weight: 500 },
  labelSmall: { fontSize: 11, lineHeight: 16, letterSpacing: 0.5, weight: 500 },
} as const;

/* ------------------------------------------------------------------ */
/* Elevation levels 0–5                                               */
/* ------------------------------------------------------------------ */
export const elevations = [0, 1, 2, 3, 4, 5] as const;
export type Elevation = (typeof elevations)[number];

/* ------------------------------------------------------------------ */
/* Color roles list — used by registry + foundations docs             */
/* ------------------------------------------------------------------ */
export const colorRoles = [
  { token: "primary", light: "#6750A4", dark: "#D0BCFF", usage: "Primary actions, key components, FABs" },
  { token: "on-primary", light: "#FFFFFF", dark: "#381E72", usage: "Text/icons on primary" },
  { token: "primary-container", light: "#E9DDFF", dark: "#4F378B", usage: "Tonal containers, selected states" },
  { token: "on-primary-container", light: "#22005D", dark: "#EADDFF", usage: "Content inside primary containers" },
  { token: "secondary", light: "#625B71", dark: "#CCC2DC", usage: "Less prominent components" },
  { token: "secondary-container", light: "#E8DEF8", dark: "#4A4458", usage: "Secondary tonal containers" },
  { token: "tertiary", light: "#7E5260", dark: "#EFB8C8", usage: "Contrasting accents (badges, FABs)" },
  { token: "tertiary-container", light: "#FFD9E2", dark: "#633B48", usage: "Tertiary tonal containers" },
  { token: "error", light: "#B3261E", dark: "#F2B8B5", usage: "Error states, destructive actions" },
  { token: "error-container", light: "#F9DEDC", dark: "#8C1D18", usage: "Error containers and highlights" },
  { token: "surface", light: "#FEF7FF", dark: "#141218", usage: "Default backgrounds" },
  { token: "surface-container-lowest", light: "#FFFFFF", dark: "#0F0D13", usage: "Lowest emphasis containers (cards)" },
  { token: "surface-container-low", light: "#F7F2FA", dark: "#1D1B20", usage: "Low emphasis containers" },
  { token: "surface-container", light: "#F3EDF7", dark: "#211F26", usage: "Medium emphasis (sheets, menus)" },
  { token: "surface-container-high", light: "#ECE6F0", dark: "#2B2930", usage: "High emphasis (nav drawers)" },
  { token: "surface-container-highest", light: "#E6E0E9", dark: "#36343B", usage: "Highest emphasis (dialogs)" },
  { token: "on-surface", light: "#1D1B20", dark: "#E6E0E9", usage: "Primary text/icons" },
  { token: "on-surface-variant", light: "#49454F", dark: "#CAC4D0", usage: "Secondary text/icons" },
  { token: "outline", light: "#79747E", dark: "#938F99", usage: "Borders, dividers, interactive strokes" },
  { token: "outline-variant", light: "#CAC4D0", dark: "#49454F", usage: "Decorative strokes, dividers" },
  { token: "inverse-surface", light: "#322F35", dark: "#E6E0E9", usage: "Snackbars, tooltips" },
  { token: "inverse-on-surface", light: "#F5EFF7", dark: "#322F35", usage: "Text on inverse surfaces" },
  { token: "inverse-primary", light: "#D0BCFF", dark: "#6750A4", usage: "Accents on inverse surfaces" },
  { token: "scrim", light: "#000000", dark: "#000000", usage: "Scrim over modal content" },
] as const;

/** CSS variable string for a color role token, e.g. "primary-container" → "var(--md-primary-container)" */
export function colorVar(token: string): string {
  return `var(--md-${token})`;
}

/** M3 supported color palettes for components (primary/secondary/tertiary/error) */
export const paletteColor = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  error: "error",
} as const;
export type PaletteColor = keyof typeof paletteColor;
