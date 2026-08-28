"use client";
"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }"use client";
"use client";
require('./chunk-ZHW3ZI67.cjs');

// ../../src/hooks/use-m3-theme.ts
var _react = require('react'); var React = _interopRequireWildcard(_react);

// ../../src/lib/m3/theme-builder.ts






var _materialcolorutilities = require('@material/material-color-utilities');
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
  "tonal-spot": _materialcolorutilities.Variant.TONAL_SPOT,
  vibrant: _materialcolorutilities.Variant.VIBRANT,
  expressive: _materialcolorutilities.Variant.EXPRESSIVE,
  content: _materialcolorutilities.Variant.CONTENT,
  fidelity: _materialcolorutilities.Variant.FIDELITY,
  rainbow: _materialcolorutilities.Variant.RAINBOW,
  "fruit-salad": _materialcolorutilities.Variant.FRUIT_SALAD
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
    out[role] = _materialcolorutilities.hexFromArgb.call(void 0, argb);
  }
  return out;
}
function generateScheme(seedHex, variant = "tonal-spot", contrastLevel = 0) {
  const seed = normalizeHex(seedHex);
  if (!seed) throw new Error(`Invalid seed color "${seedHex}". Use a 3 or 6 digit hex value like #6750A4.`);
  const v = _nullishCoalesce(normalizeVariant(variant), () => ( "tonal-spot"));
  const contrast = clampContrast(contrastLevel);
  const sourceColorHct = _materialcolorutilities.Hct.fromInt(_materialcolorutilities.argbFromHex.call(void 0, seed));
  const options = { sourceColorHct, variant: VARIANT_MAP[v], contrastLevel: contrast, specVersion: "2021" };
  const light = buildRecord(new (0, _materialcolorutilities.DynamicScheme)({ ...options, isDark: false }));
  const dark = buildRecord(new (0, _materialcolorutilities.DynamicScheme)({ ...options, isDark: true }));
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

// ../../src/hooks/use-m3-theme.ts
var COLOR_KEY = "m3-color-theme";
var MODE_KEY = "m3-mode";
var CUSTOM_KEY = "m3-custom-scheme";
var CUSTOM_STYLE_ID = "m3-custom-scheme";
function readStoredCustomScheme() {
  try {
    const raw = localStorage.getItem(CUSTOM_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof _optionalChain([parsed, 'optionalAccess', _2 => _2.seed]) === "string" && typeof _optionalChain([parsed, 'optionalAccess', _3 => _3.variant]) === "string" && parsed.light && parsed.dark) {
      return parsed;
    }
  } catch (e) {
  }
  return null;
}
function injectCustomStyle(blocks) {
  let el = document.getElementById(CUSTOM_STYLE_ID);
  if (!el) {
    el = document.createElement("style");
    el.id = CUSTOM_STYLE_ID;
    document.head.appendChild(el);
  }
  el.textContent = `${blocks.lightBlock}
${blocks.darkBlock}`;
}
function removeCustomStyle() {
  _optionalChain([document, 'access', _4 => _4.getElementById, 'call', _5 => _5(CUSTOM_STYLE_ID), 'optionalAccess', _6 => _6.remove, 'call', _7 => _7()]);
}
function clearStoredCustomScheme() {
  try {
    localStorage.removeItem(CUSTOM_KEY);
  } catch (e2) {
  }
}
function applyColorTheme(id) {
  const html = document.documentElement;
  if (!id || id === "baseline") html.removeAttribute("data-theme");
  else html.setAttribute("data-theme", id);
}
function resolveDark(mode) {
  if (typeof window === "undefined") return false;
  if (mode === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return mode === "dark";
}
function applyMode(mode) {
  const dark = resolveDark(mode);
  document.documentElement.classList.toggle("dark", dark);
  return dark;
}
function useM3Theme() {
  const [colorTheme, setColorThemeState] = React.useState("baseline");
  const [mode, setModeState] = React.useState("system");
  const [isDark, setIsDark] = React.useState(false);
  const [customScheme, setCustomScheme] = React.useState(null);
  const colorThemeRef = React.useRef("baseline");
  React.useEffect(() => {
    let storedColor = "baseline";
    let storedMode = "system";
    try {
      storedColor = localStorage.getItem(COLOR_KEY) || "baseline";
      const m = localStorage.getItem(MODE_KEY);
      if (m === "light" || m === "dark" || m === "system") storedMode = m;
    } catch (e3) {
    }
    setColorThemeState(storedColor);
    colorThemeRef.current = storedColor;
    setModeState(storedMode);
    setIsDark(document.documentElement.classList.contains("dark"));
    const storedCustom = readStoredCustomScheme();
    if (storedCustom) {
      document.documentElement.setAttribute("data-theme", "custom");
      injectCustomStyle(schemeToCssVars(storedCustom));
      setCustomScheme({
        seed: storedCustom.seed,
        variant: _nullishCoalesce(normalizeVariant(storedCustom.variant), () => ( "tonal-spot")),
        contrast: storedCustom.contrast
      });
    }
  }, []);
  React.useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setIsDark(applyMode("system"));
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mode]);
  const setColorTheme = React.useCallback(
    (id) => {
      clearStoredCustomScheme();
      removeCustomStyle();
      setCustomScheme(null);
      applyColorTheme(id);
      try {
        localStorage.setItem(COLOR_KEY, id);
      } catch (e4) {
      }
      colorThemeRef.current = id;
      setColorThemeState(id);
    },
    []
  );
  const applyCustomTheme = React.useCallback((seed, variant, contrast) => {
    const normalizedSeed = normalizeHex(seed);
    if (!normalizedSeed) return false;
    const v = _nullishCoalesce(normalizeVariant(variant), () => ( "tonal-spot"));
    const c = Number.isFinite(contrast) ? Math.min(1, Math.max(0, contrast)) : 0;
    const generated = generateScheme(normalizedSeed, v, c);
    const blocks = schemeToCssVars(generated);
    const persisted = {
      seed: normalizedSeed,
      variant: v,
      contrast: c,
      light: generated.light,
      dark: generated.dark
    };
    try {
      localStorage.setItem(CUSTOM_KEY, JSON.stringify(persisted));
    } catch (e5) {
    }
    injectCustomStyle(blocks);
    document.documentElement.setAttribute("data-theme", "custom");
    setCustomScheme({ seed: normalizedSeed, variant: v, contrast: c });
    return true;
  }, []);
  const clearCustomTheme = React.useCallback(() => {
    clearStoredCustomScheme();
    removeCustomStyle();
    setCustomScheme(null);
    applyColorTheme(colorThemeRef.current);
  }, []);
  const setMode = React.useCallback((next) => {
    const dark = applyMode(next);
    try {
      localStorage.setItem(MODE_KEY, next);
    } catch (e6) {
    }
    setModeState(next);
    setIsDark(dark);
  }, []);
  const toggle = React.useCallback(() => {
    setMode(isDark ? "light" : "dark");
  }, [isDark, setMode]);
  return {
    colorTheme,
    setColorTheme,
    mode,
    setMode,
    isDark,
    customScheme,
    applyCustomTheme,
    clearCustomTheme,
    theme: isDark ? "dark" : "light",
    toggle
  };
}






exports.applyColorTheme = applyColorTheme; exports.applyMode = applyMode; exports.injectCustomStyle = injectCustomStyle; exports.resolveDark = resolveDark; exports.useM3Theme = useM3Theme;
//# sourceMappingURL=hooks.cjs.map