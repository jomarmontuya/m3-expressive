"use client";
"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }"use client";

// ../../src/components/m3/Button.tsx
var _react = require('react'); var React3 = _interopRequireWildcard(_react); var React = _interopRequireWildcard(_react); var React2 = _interopRequireWildcard(_react); var React4 = _interopRequireWildcard(_react); var React5 = _interopRequireWildcard(_react); var React6 = _interopRequireWildcard(_react); var React7 = _interopRequireWildcard(_react); var React9 = _interopRequireWildcard(_react); var React8 = _interopRequireWildcard(_react); var React10 = _interopRequireWildcard(_react); var React11 = _interopRequireWildcard(_react); var React12 = _interopRequireWildcard(_react); var React13 = _interopRequireWildcard(_react); var React14 = _interopRequireWildcard(_react); var React15 = _interopRequireWildcard(_react); var React16 = _interopRequireWildcard(_react); var React17 = _interopRequireWildcard(_react); var React18 = _interopRequireWildcard(_react); var React19 = _interopRequireWildcard(_react); var React20 = _interopRequireWildcard(_react); var React21 = _interopRequireWildcard(_react); var React22 = _interopRequireWildcard(_react); var React23 = _interopRequireWildcard(_react); var React24 = _interopRequireWildcard(_react); var React25 = _interopRequireWildcard(_react); var React26 = _interopRequireWildcard(_react); var React27 = _interopRequireWildcard(_react); var React28 = _interopRequireWildcard(_react); var React29 = _interopRequireWildcard(_react); var React30 = _interopRequireWildcard(_react); var React31 = _interopRequireWildcard(_react); var React32 = _interopRequireWildcard(_react); var React33 = _interopRequireWildcard(_react); var React34 = _interopRequireWildcard(_react); var React35 = _interopRequireWildcard(_react); var React36 = _interopRequireWildcard(_react); var React37 = _interopRequireWildcard(_react); var React38 = _interopRequireWildcard(_react); var React39 = _interopRequireWildcard(_react); var React40 = _interopRequireWildcard(_react); var React41 = _interopRequireWildcard(_react); var React42 = _interopRequireWildcard(_react); var React43 = _interopRequireWildcard(_react); var React44 = _interopRequireWildcard(_react);
var _framermotion = require('framer-motion');
var _button = require('@base-ui/react/button');

// ../../src/lib/utils.ts
var _clsx = require('clsx');
var _tailwindmerge = require('tailwind-merge');
function cn(...inputs) {
  return _tailwindmerge.twMerge.call(void 0, _clsx.clsx.call(void 0, inputs));
}

// ../../src/lib/m3/tokens.ts
var spring = (stiffness, damping, mass = 1) => ({
  type: "spring",
  stiffness,
  damping,
  mass
});
var springs = {
  /** Spring fast spatial — large element translation */
  fastSpatial: spring(1200, 200),
  /** Spring fast visual effects — scale/fade of small elements */
  fastVisual: spring(1600, 200),
  /** Spring fast default */
  fastDefault: spring(1400, 200),
  /** Spring default spatial */
  defaultSpatial: spring(800, 170),
  /** Spring default visual effects */
  defaultVisual: spring(1e3, 180),
  /** Spring slow spatial */
  slowSpatial: spring(500, 140),
  /** Spring slow visual effects */
  slowVisual: spring(600, 150),
  /** Expressive spatial — energetic move-in of large transitions */
  expressiveSpatial: spring(1400, 190),
  /** Expressive effects — shape morphs and playful transforms */
  expressiveEffects: spring(1e3, 130),
  /** Expressive default — THE signature bouncy M3E spring */
  expressive: spring(380, 22),
  /** Bouncier variant for celebratory moments */
  bouncy: spring(500, 18)
};
var easings = {
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  standardAccelerate: "cubic-bezier(0.3, 0, 1, 1)",
  standardDecelerate: "cubic-bezier(0, 0, 0, 1)",
  emphasized: "cubic-bezier(0.2, 0, 0, 1)",
  emphasizedAccelerate: "cubic-bezier(0.3, 0, 0.8, 0.15)",
  emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1)",
  linear: "linear"
};
var durations = {
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
  extraLong4: 1e3
};
var shapes = {
  none: "0px",
  extraSmall: "4px",
  small: "8px",
  medium: "12px",
  large: "16px",
  largeIncreased: "20px",
  extraLarge: "28px",
  extraExtraLarge: "36px",
  full: "9999px"
};
var shapeMorph = {
  /** buttons: rest = full (pill) → pressed = largeIncreased */
  button: { rest: shapes.full, pressed: "20px" },
  /** cards: rest = medium → pressed = small */
  card: { rest: shapes.medium, pressed: shapes.small }
};
var stateOpacities = {
  hover: 0.08,
  focus: 0.1,
  pressed: 0.1,
  dragged: 0.16
};
var typeScale = {
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
  labelSmall: { fontSize: 11, lineHeight: 16, letterSpacing: 0.5, weight: 500 }
};
var elevations = [0, 1, 2, 3, 4, 5];
var colorRoles = [
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
  { token: "scrim", light: "#000000", dark: "#000000", usage: "Scrim over modal content" }
];
function colorVar(token) {
  return `var(--md-${token})`;
}

// ../../src/components/m3/Ripple.tsx

var _jsxruntime = require('react/jsx-runtime');
var rippleCounter = 0;
var Ripple = React.forwardRef(function Ripple2({ className, disabled }, ref) {
  const hostRef = React.useRef(null);
  const [items, setItems] = React.useState([]);
  React.useImperativeHandle(ref, () => hostRef.current, []);
  React.useEffect(() => {
    const host = _optionalChain([hostRef, 'access', _2 => _2.current, 'optionalAccess', _3 => _3.parentElement]);
    if (!host || disabled) return;
    const onDown = (e) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      const rect = host.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2.2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const id = ++rippleCounter;
      setItems((prev) => [...prev.slice(-3), { id, x, y, size }]);
    };
    host.addEventListener("pointerdown", onDown, true);
    return () => host.removeEventListener("pointerdown", onDown, true);
  }, [disabled]);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    "span",
    {
      ref: hostRef,
      "data-testid": "ripple",
      "aria-hidden": "true",
      className: cn("pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]", className),
      children: items.map((r) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
        RippleBubble,
        {
          ...r,
          onDone: () => setItems((prev) => prev.filter((i) => i.id !== r.id))
        },
        r.id
      ))
    }
  );
});
Ripple.displayName = "Ripple";
function RippleBubble({ x, y, size, onDone }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 640);
    return () => clearTimeout(t);
  }, [onDone]);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    "span",
    {
      className: "absolute rounded-full",
      style: {
        left: x,
        top: y,
        width: size,
        height: size,
        background: "currentColor",
        opacity: 0.12,
        animation: "m3-ripple-in 300ms cubic-bezier(0,0,0,1) forwards, m3-ripple-out 450ms 175ms cubic-bezier(0.2,0,0,1) forwards"
      }
    }
  );
}

// ../../src/components/m3/MaterialSymbol.tsx


var MaterialSymbol = React2.forwardRef(
  function MaterialSymbol2({ icon, fill, weight, grade, opticalSize, size, className, style, raw, ...props }, ref) {
    const cssVars = {};
    if (!raw) {
      if (fill !== void 0) cssVars["--msr-fill"] = fill ? 1 : 0;
      if (weight !== void 0) cssVars["--msr-wght"] = weight;
      if (grade !== void 0) cssVars["--msr-grad"] = grade;
      if (opticalSize !== void 0) cssVars["--msr-opsz"] = opticalSize;
    }
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      "span",
      {
        ref,
        "aria-hidden": "true",
        className: cn("material-symbols-rounded select-none", className),
        style: { fontSize: size, ...cssVars, ...style },
        ...props,
        children: icon
      }
    );
  }
);

// ../../src/lib/m3/spec-sources.ts
var SPEC_AUDITED_AT = "2026-08-28";
var m3 = (materialUrl, webMapping, deviations = []) => ({
  status: "material-3",
  materialUrl,
  auditedAt: SPEC_AUDITED_AT,
  references: ["androidx-compose-material3", "material-web"],
  webMapping,
  deviations
});
var expressive = (materialUrl, webMapping, deviations = []) => ({
  status: "material-3-expressive",
  materialUrl,
  auditedAt: SPEC_AUDITED_AT,
  references: ["androidx-compose-material3"],
  webMapping,
  deviations
});
var both = (materialUrl, webMapping, deviations = []) => ({
  status: "material-3-and-expressive",
  materialUrl,
  auditedAt: SPEC_AUDITED_AT,
  references: ["androidx-compose-material3", "material-web"],
  webMapping,
  deviations
});
var extension = (references, webMapping, deviations = []) => ({
  status: "extension",
  materialUrl: null,
  auditedAt: SPEC_AUDITED_AT,
  references,
  webMapping,
  deviations
});
var buttons = "https://m3.material.io/components/buttons/overview";
var appBars = "https://m3.material.io/components/app-bars/overview";
var progress = "https://m3.material.io/components/progress-indicators/overview";
var search = "https://m3.material.io/components/search/overview";
var componentSpecs = {
  button: both(buttons, "Uses a native button with browser pointer, keyboard, focus, and ripple feedback."),
  "icon-button": m3("https://m3.material.io/components/icon-buttons/overview", "Uses a native button and an accessible icon label."),
  fab: both("https://m3.material.io/components/floating-action-button/overview", "Uses a native button instead of Android touch handling."),
  "extended-fab": both("https://m3.material.io/components/extended-fab/overview", "Uses a native button and browser layout for label expansion."),
  "fab-menu": expressive("https://m3.material.io/components/fab-menu/overview", "Maps the expanding action set to browser buttons and managed focus."),
  "split-button": expressive("https://m3.material.io/components/split-button/overview", "Maps the secondary action to a browser menu trigger with ARIA menu semantics."),
  "button-group": expressive("https://m3.material.io/components/button-groups/overview", "Uses flex layout and browser buttons for connected and separated groups."),
  "segmented-button": m3("https://m3.material.io/components/segmented-buttons/overview", "Maps selection to Base UI ToggleGroup and browser keyboard behavior.", ["The md size is a documented library extension."]),
  badge: m3("https://m3.material.io/components/badges/overview", "Renders a semantic value badge or an aria-hidden dot in the browser."),
  "linear-progress": both(progress, "Uses SVG and CSS animation for the browser wave and track.", ["Expressive indeterminate cadence is a token-based approximation."]),
  "circular-progress": both(progress, "Uses SVG arcs and browser animation for determinate and indeterminate states.", ["Indeterminate head and tail motion is a symmetric browser approximation."]),
  "loading-indicator": expressive("https://m3.material.io/components/loading-indicator/overview", "Uses CSS shape morphing and rotation instead of platform polygon morphing.", ["The Circle-to-SoftBurst morph is visually close, not polygon-exact."]),
  snackbar: m3("https://m3.material.io/components/snackbar/overview", "Maps transient messages to Base UI Toast with browser focus and swipe handling."),
  tooltip: m3("https://m3.material.io/components/tooltips/overview", "Maps hover, focus, and touch timing to Base UI Tooltip."),
  banner: extension(["flutter-material"], "Material 2 and Flutter banner anatomy is implemented as a persistent browser surface.", ["No current standalone Material 3 component source exists."]),
  dialog: m3("https://m3.material.io/components/dialogs/overview", "Maps modal behavior to Base UI Dialog, focus trapping, Escape, and scroll locking."),
  divider: m3("https://m3.material.io/components/divider/overview", "Maps decorative and semantic divider behavior to Base UI Separator."),
  card: m3("https://m3.material.io/components/cards/overview", "Uses a semantic browser surface with optional native-button interaction."),
  list: m3("https://m3.material.io/components/lists/overview", "Maps list rows to ul/li and native buttons where rows are actionable."),
  "bottom-sheet": m3("https://m3.material.io/components/bottom-sheets/overview", "Maps modal behavior to browser dialog semantics and configurable CSS anchors.", ["The partial anchor is configurable because browser content cannot provide Compose's anchor contract."]),
  "side-sheet": m3("https://m3.material.io/components/side-sheets/overview", "Maps modal side sheets to browser dialog semantics, focus trapping, and a scrim."),
  carousel: expressive("https://m3.material.io/components/carousel/overview", "Uses logical browser scrolling and CSS parallax; controls follow text direction.", ["Browser scrolling replaces Android platform masking and gestures."]),
  "text-field": m3("https://m3.material.io/components/text-fields/overview", "Uses native inputs with browser validation, labels, and focus behavior."),
  "search-bar": m3(search, "Uses a native search input and browser keyboard behavior.", ["sm and lg sizes are documented library extensions."]),
  "search-view": m3(search, "Uses a native search input with browser overlay and focus behavior."),
  autocomplete: extension(["base-ui-react"], "Combines a Material 3 text field with Base UI's browser combobox and option list.", ["No current standalone Material 3 autocomplete component source exists."]),
  checkbox: m3("https://m3.material.io/components/checkbox/overview", "Uses a native button with checkbox ARIA state and browser keyboard handling."),
  radio: m3("https://m3.material.io/components/radio-button/overview", "Maps a radio set to Base UI RadioGroup for browser roving focus and form state."),
  switch: m3("https://m3.material.io/components/switch/overview", "Uses a native button with switch ARIA state and browser keyboard handling."),
  slider: both("https://m3.material.io/components/sliders/overview", "Maps range and keyboard behavior to Base UI Slider."),
  chip: m3("https://m3.material.io/components/chips/overview", "Maps filter selection to Base UI Toggle and other chips to browser actions.", ["xs and md sizes are documented library extensions."]),
  tabs: m3("https://m3.material.io/components/tabs/overview", "Uses browser buttons, roving focus, and logical indicator positioning."),
  "navigation-bar": m3("https://m3.material.io/components/navigation-bar/overview", "Maps compact navigation to browser links or buttons with aria-current."),
  "navigation-drawer": m3("https://m3.material.io/components/navigation-drawer/overview", "Maps modal drawers to browser dialog semantics and in-layout drawers to nav."),
  "navigation-rail": both("https://m3.material.io/components/navigation-rail/overview", "Maps rail destinations to browser controls; modal expansion uses dialog semantics."),
  "top-app-bar": both(appBars, "Maps Android nested scrolling to discrete browser scroll-state transitions.", ["Browser scroll states approximate Android nested-scroll and fling behavior."]),
  "bottom-app-bar": m3(appBars, "Uses browser layout and native action buttons around a docked FAB."),
  toolbar: expressive("https://m3.material.io/components/toolbars/overview", "Maps toolbar actions to Base UI Toolbar for browser roving focus."),
  menu: m3("https://m3.material.io/components/menus/overview", "Maps menu trigger, focus, and dismissal to Base UI Menu."),
  "date-picker": m3("https://m3.material.io/components/date-pickers/overview", "Uses a browser calendar grid, keyboard navigation, and localized date formatting.", ["The inline picker is a web presentation alongside the official modal model."]),
  "time-picker": m3("https://m3.material.io/components/time-pickers/overview", "Uses a browser clock dial with WAI-ARIA radio roving focus.", ["ARIA radio focus is a web accessibility addition to the dial interaction."])
};

// ../../src/lib/m3/meta.ts
var buttonGroupMeta = {
  id: "button-group",
  name: "Button group",
  category: "actions",
  description: "New in Material 3 Expressive: standard button groups use size-aware 18/12/8/8/8dp gaps; connected groups use 2dp gaps and size-aware asymmetric corners. Both support five official sizes, selected shape inversion, and pressed-width redistribution.",
  importLine: `import { ButtonGroup } from "m3-expressive-react";`,
  spec: componentSpecs["button-group"],
  variants: ["standard", "connected", "outlined", "filled", "tonal", "elevated"],
  props: [
    { name: "buttons", type: `ButtonGroupItem[]`, description: "Segments keyed by id, with optional label, icon, ariaLabel, and handler." },
    { name: "variant", type: `'outlined' | 'filled' | 'tonal' | 'elevated'`, default: `'outlined'`, description: "Base emphasis of unselected segments." },
    { name: "layout", type: `'standard' | 'connected'`, default: `'standard'`, description: "Official size-aware 18/12/8/8/8dp separated pills or 2dp connected group geometry." },
    { name: "shape", type: `'round' | 'square'`, default: `'round'`, description: "Official resting shape family. Selected round segments become square; selected square segments become round." },
    { name: "selection", type: `'none' | 'single' | 'multiple' | 'single-required' | 'multiple-required'`, default: `'none'`, description: "Independent actions or optional/required single or multiple selection." },
    { name: "value", type: `string[]`, description: "Controlled selected ids; omit for uncontrolled state." },
    { name: "onValueChange", type: `(value: string[]) => void`, description: "Called with the next selected ids." },
    { name: "expandedRatio", type: `number`, default: `0.15`, description: "Official width share added to the pressed segment in a standard group." },
    { name: "variableWidths", type: `boolean`, description: "Legacy override. Standard groups redistribute width by default; set false to disable it." },
    { name: "size", type: `ButtonGroupSize`, default: `'sm'`, description: "Official heights: 32 / 40 / 56 / 96 / 136dp; long-form aliases are accepted." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables every segment: container drops to on-surface 12%, content to 38%." }
  ],
  guidelines: {
    whenToUse: [
      "Use a button group to cluster closely related actions of equal emphasis.",
      "Use selection='single' for mutually exclusive choices, like a time range.",
      "Use selection='multiple' for toggling independent formatting-style options.",
      "Use the standard layout for the official pressed-width redistribution; connected groups keep stable widths."
    ],
    anatomy: ["Standard 18/12/8/8/8dp size gap or connected 2dp gap", "Five size-matched button containers (32/40/56/96/136dp)", "Size-aware connected outer/inner shapes", "State layer + ripple per segment", "48dp minimum touch target for small visual sizes"],
    states: ["Unselected (variant colors and resting shape)", "Selected (variant selected color and inverted round/square shape)", "Hover (8% state layer, grows when variableWidths)", "Focus (3px focus ring)", "Pressed (96% scale and size-aware corner morph)", "Disabled (on-surface 12% container / 38% content)"],
    dos: [
      "Keep 2\u20135 segments in one group so emphasis stays balanced",
      "Give every segment an id; pair icons with labels when space allows",
      "Use the same size and variant as neighboring buttons"
    ],
    donts: [
      "Don't mix actions and navigation in the same group",
      "Don't use a group for a single button \u2014 use Button instead",
      "Don't combine single selection with multiple on/off semantics"
    ]
  },
  exampleCode: `<ButtonGroup
  selection="single"
  value={range}
  onValueChange={setRange}
  buttons={[
    { id: "day", label: "Day" },
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
  ]}
/>
<ButtonGroup variant="tonal" buttons={[{ id: "prev", icon: "chevron_left" }, { id: "next", icon: "chevron_right" }]} />`,
  m3e: true,
  related: ["button", "segmented-button", "split-button", "icon-button"],
  demoName: "ButtonGroupDemo"
};
var dividerMeta = {
  id: "divider",
  name: "Divider",
  category: "containment",
  description: "A divider is a decorative 1dp line that groups content in lists and layouts. Separator semantics are opt-in when the line represents a meaningful boundary.",
  importLine: `import { Divider } from "m3-expressive-react";`,
  spec: componentSpecs.divider,
  variants: ["full-width", "inset-start", "list-inset", "inset-middle", "inset-end", "vertical"],
  props: [
    { name: "inset", type: `'none' | 'start' | 'middle' | 'end' | 'list'`, default: `'none'`, description: "'start' is the generic 16dp start / 0dp end inset. 'list' is the official list preset with 16dp start / 24dp end. 'middle' uses 16dp on both edges; 'end' is a library extension." },
    { name: "thickness", type: `number`, default: `1`, description: "Stroke thickness in px (official 1dp)." },
    { name: "color", type: `'outline' | 'outline-variant'`, default: `'outline-variant'`, description: "Line color role." },
    { name: "orientation", type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: "Direction of the line." },
    { name: "semantic", type: `boolean`, default: `false`, description: "Opt into role=separator and aria-orientation. The default divider is decorative." }
  ],
  guidelines: {
    whenToUse: [
      "Separate related list items and table rows.",
      "Group sections inside cards, sheets, and dialogs.",
      "Use vertical dividers to split side-by-side content regions."
    ],
    anatomy: ["Decorative divider line by default (1dp, outline-variant)", "Generic start inset (16dp/0dp)", "List preset (16dp start / 24dp end)", "Optional semantic separator role"],
    states: ["Full-width", "Inset (start/middle/end)", "Vertical"],
    dos: [
      "Use inset='list' under list items for the official 16dp/24dp insets",
      "Set semantic only when the line communicates a meaningful content boundary",
      "Keep dividers subtle \u2014 outline-variant for decoration",
      "Pair vertical dividers with generous side spacing"
    ],
    donts: [
      "Don't use dividers to replace whitespace everywhere",
      "Don't nest dividers inside dividers or box everything in lines",
      "Don't use the stronger outline color for purely decorative separation"
    ]
  },
  exampleCode: `<Divider />
<Divider inset="start" />
<Divider inset="list" />
<Divider orientation="vertical" semantic />`,
  related: ["card", "list", "navigation-drawer"],
  demoName: "DividerDemo"
};
var datePickerMeta = {
  id: "date-picker",
  name: "Date Picker",
  category: "selection",
  description: "Date pickers support localized calendar and numeric input modes, single-date or range selection, and a 1900\u20132100 three-column year grid. The official default is a docked text field with an anchored popup; inline and modal presentations remain available.",
  importLine: `import { DatePicker } from "m3-expressive-react";`,
  spec: componentSpecs["date-picker"],
  variants: ["docked", "calendar \xB7 inline", "input", "year-view", "modal", "range \xB7 inline", "range \xB7 modal"],
  props: [
    { name: "value", type: `Date`, description: "Selected date. Uncontrolled when omitted." },
    { name: "defaultValue", type: `Date`, description: "Initial single date for uncontrolled use; shared across popup reopen and calendar/input modes." },
    { name: "onChange", type: `(d: Date) => void`, description: "Fires when a day is picked (single mode)." },
    { name: "locale", type: `string`, description: "Locale used for date order, labels, and first day of the week." },
    { name: "selectionMode", type: `'single' | 'range'`, default: `'single'`, description: "Pick one date, or a start/end range: tap start, then end (tap \u2265 start completes); tapping before the start or once complete restarts with a fresh start." },
    { name: "initialDisplayMode", type: `'calendar' | 'input'`, default: `'calendar'`, description: "Initial single-date entry mode. Input mode accepts a localized numeric date." },
    { name: "showModeToggle", type: `boolean`, default: `true`, description: "Single-date mode only \u2014 show the calendar/input toggle." },
    { name: "range", type: `{ start?: Date; end?: Date }`, description: "Range mode \u2014 controlled selected range; omit for uncontrolled state. Partial ranges (start only) are valid states." },
    { name: "onRangeChange", type: `(range: { start?: Date; end?: Date }) => void`, description: "Range mode \u2014 fires on every tap with the next range (partial ranges included)." },
    { name: "minDate", type: `Date`, description: "Earliest selectable date; earlier days render disabled (38%)." },
    { name: "maxDate", type: `Date`, description: "Latest selectable date; later days render disabled (38%)." },
    { name: "presentation", type: `'docked' | 'inline' | 'modal'`, default: `'docked'`, description: "Official text-field popup, embedded compatibility panel, or 360\xD7568dp modal." },
    { name: "open", type: `boolean`, description: "Controls modal visibility and optionally controls the docked popup. Inline ignores it." },
    { name: "onOpenChange", type: `(open: boolean) => void`, description: "Called when the modal or docked popup requests a visibility change." },
    { name: "closeOnSelect", type: `boolean`, default: `false`, description: "Compatibility live-apply mode. The official default stages selection until confirmation." },
    { name: "confirmLabel", type: `string`, default: `'OK'`, description: "Modal confirmation action label." },
    { name: "dismissLabel", type: `string`, default: `'Cancel'`, description: "Modal dismissal action label." },
    { name: "onConfirm", type: `(selection: Date | DateRange) => void`, description: "Called after the staged modal selection is confirmed." },
    { name: "onDismiss", type: `() => void`, description: "Called when the modal is dismissed." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." },
    { name: "className", type: `string`, description: "Extra classes for the container." }
  ],
  guidelines: {
    whenToUse: [
      "Use the default docked field and popup for space-efficient date selection; use inline only when date choice is the primary in-page task.",
      "Use minDate/maxDate to constrain scheduling to valid ranges.",
      "Pair with a readout chip to show the formatted selected date.",
      'Use presentation="modal" for the official 360\xD7568dp picker dialog with staged confirm and dismiss actions.',
      "Give the modal a text-field-style trigger that echoes the chosen date, and let Escape/scrim dismiss it.",
      "Use selectionMode='range' for check-in/check-out and event spans \u2014 the band reads as one stripe per week row between the start/end circles."
    ],
    anatomy: ["Outlined docked text field and anchored popup", "Container (28dp corners, surface-container-high)", "Header (month-year label, mode toggle, 48dp previous/next targets)", "Localized weekday row + 6\xD77 ARIA day grid with roving tabindex", "1900\u20132100 year grid (3 columns)", "Localized separator-safe input fields", "Modal (360\xD7568dp, 28dp corners, elevation 3, confirm and dismiss actions)", "Secondary-container range band with primary start/end circles"],
    states: ["Docked closed/open", "Idle day", "Hover", "Today", "Selected", "Other month", "Disabled", "Calendar or localized input mode", "Keyboard arrows, Home/End, PageUp/PageDown, and Shift+PageUp/PageDown", "Modal open", "Modal staged selection", "Range"],
    dos: [
      "Show the selected date in context next to the picker",
      "Clamp with min/max when dates have real-world constraints",
      "Keep the selected-day pill circular and high-contrast (primary/on-primary)",
      "Show start/end placeholders until both dates are picked \u2014 the modal header and readouts echo the partial range"
    ],
    donts: [
      "Don't force users to scroll years one month at a time \u2014 use the year grid",
      "Don't hide disabled days entirely; dim them to 38%",
      "Don't confirm a range until both start and end are valid",
      "Don't apply staged modal edits before the user confirms them"
    ]
  },
  exampleCode: `// Official docked text field + popup (default)
<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date(2024, 0, 1)}
  maxDate={new Date(2026, 11, 31)}
/>

// Embedded compatibility layout
<DatePicker presentation="inline" value={date} onChange={setDate} />

// Official modal picker (360\xD7568, staged selection)
const [open, setOpen] = React.useState(false);
// ...an outlined text-field-style trigger calls setOpen(true)
<DatePicker
  presentation="modal"
  open={open}
  onOpenChange={setOpen}
  value={date}
  onChange={setDate}
/>

// Range selection (selectionMode="range") \u2014 tap start, then end
const [range, setRange] = React.useState<{ start?: Date; end?: Date }>({});
<DatePicker selectionMode="range" range={range} onRangeChange={setRange} />

// Start in official keyboard input mode
<DatePicker initialDisplayMode="input" value={date} onChange={setDate} />

// Range modal \u2014 header shows Start/End date placeholders until the pair is
// complete; it closes only after the second pick (Escape/scrim always dismiss)
<DatePicker
  presentation="modal"
  selectionMode="range"
  open={open}
  onOpenChange={setOpen}
  range={range}
  onRangeChange={setRange}
/>`,
  related: ["time-picker", "card", "bottom-sheet"],
  demoName: "DatePickerDemo"
};
var sideSheetMeta = {
  id: "side-sheet",
  name: "Side Sheet",
  category: "containment",
  description: "Side sheets are dialog surfaces anchored to a logical inline edge and automatically mirror in RTL. Modal variants overlay a 32% scrim; standard variants sit inline. The official 16dp radius rounds the inner edge only.",
  importLine: `import { SideSheet } from "m3-expressive-react";`,
  spec: componentSpecs["side-sheet"],
  variants: ["modal", "standard"],
  props: [
    { name: "open", type: `boolean`, description: "Controls visibility for both modal and standard variants." },
    { name: "onClose", type: `() => void`, description: "Called by the visible close control, and by scrim click or Escape for modal sheets." },
    { name: "side", type: `'start' | 'end' | 'left' | 'right'`, default: `'end'`, description: "Logical inline edge. left/right remain compatibility aliases for start/end and mirror in RTL." },
    { name: "variant", type: `'modal' | 'standard'`, default: `'modal'`, description: "Overlay with scrim, or controlled in-layout panel." },
    { name: "title", type: `string`, description: "Panel heading (md-title-large) above a divider." },
    { name: "children", type: `React.ReactNode`, description: "Scrollable content." },
    { name: "footer", type: `React.ReactNode`, description: "Pinned, left-aligned action area with a 72dp minimum height, 16dp top padding, and 24dp bottom padding." },
    { name: "width", type: `number`, default: `360`, description: "Panel width in px (official max-width 400dp; values above 400 are clamped)." },
    { name: "className", type: `string`, description: "Extra classes for the panel." }
  ],
  guidelines: {
    whenToUse: [
      "Use side sheets for supplemental tasks (filters, details, settings) alongside main content.",
      "Use the modal variant on small screens where the sheet must take focus.",
      "Use the standard variant in split-view layouts where the sheet occupies layout space while open."
    ],
    anatomy: ["Dialog panel (modal or standard; 16dp inner-edge corners; 24dp padding; width capped at 400dp and compact viewport width)", "Title and always-visible 48dp close control", "Scrollable content", "Optional start-aligned 72dp-minimum action area"],
    states: ["Hidden when open=false", "Enter (modal spring x \xB1100% \u2192 0)", "Open (32% scrim + body scroll locked for modal; standard stays in layout)", "Closed (visible close control; modal also supports scrim tap / Escape)"],
    dos: [
      "Keep panel width between 240\u2013400px (official max-width is 400dp)",
      "Pair the modal variant with a scrim tap to dismiss",
      "Reserve footers for confirm/cancel actions"
    ],
    donts: [
      "Don't use side sheets for primary navigation (use a navigation drawer)",
      "Don't open modal side sheets on top of dialogs",
      "Don't let panel content scroll the page behind it"
    ]
  },
  exampleCode: `<SideSheet open={open} onClose={() => setOpen(false)} side="end" title="Filters">
  <List>{filterItems}</List>
</SideSheet>
<SideSheet variant="standard" open={detailsOpen} onClose={() => setDetailsOpen(false)} title="Details">
  {inlineContent}
</SideSheet>`,
  related: ["bottom-sheet", "card", "list"],
  demoName: "SideSheetDemo"
};
var carouselMeta = {
  id: "carousel",
  name: "Carousel",
  category: "containment",
  description: "Material 3 Expressive carousels support multi-browse, standard or multi-aspect uncontained, hero, and vertical portrait full-screen layouts. Items use parallax, snap scrolling, keyboard movement, and reduced-motion fallbacks.",
  importLine: `import { Carousel } from "m3-expressive-react";`,
  spec: componentSpecs.carousel,
  variants: ["multi-browse", "uncontained", "hero", "full-screen"],
  props: [
    { name: "items", type: `CarouselItem[]`, description: "Snap items: id, optional label, icon, tone, href/onClick, and an optional aspectRatio for uncontained mixed-ratio content." },
    { name: "layout", type: `CarouselLayout`, default: `'multi-browse'`, description: "Four official strategies. inline remains a deprecated alias for full-screen." },
    { name: "alignment", type: `'start' | 'center' | 'end'`, default: `'start'`, description: "Scroll-snap alignment of items." },
    { name: "itemCount", type: `number`, default: `4`, description: "Visible-item hint. Multi-browse keeps the official large + medium + small minimum composition, so it clamps to 3\u20135." },
    { name: "shape", type: `'round' | 'square'`, default: `'round'`, description: "Item corners: 28dp (M3E extra-large) or square." },
    { name: "arrows", type: `'auto' | 'always' | 'never'`, default: `'never'`, description: "Compatibility-only navigation arrows. Current Material guidance defaults to no in-carousel arrows." },
    { name: "uncontainedMode", type: `'standard' | 'multi-aspect'`, default: `'standard'`, description: "Equal-size standard items, or mixed item aspect ratios constrained by current Material guidance." },
    { name: "itemAspectRatio", type: `number`, default: `16 / 9`, description: "Shared width ratio for the standard uncontained configuration." },
    { name: "showAllHref", type: `string`, description: "Required all-items path for non-full-screen carousels on vertically scrolling pages." },
    { name: "onShowAll", type: `() => void`, description: "Button alternative to showAllHref that opens the complete vertical item list." },
    { name: "showAllLabel", type: `string`, default: `'Show all'`, description: "Accessible all-items action label." },
    { name: "ariaLabel", type: `string`, description: "Accessible name of the carousel region (defaults to a derived label)." },
    { name: "className", type: `string`, description: "Extra classes for the scroller." }
  ],
  guidelines: {
    whenToUse: [
      "Use carousels to browse a small, visually rich collection of similar content (media cards, destination tiles).",
      "Use multi-browse when items share equal importance and flexible widths should show several at once.",
      "Use hero when one featured item deserves emphasis and the rest are secondary.",
      "Use uncontained for fixed-width items and full-screen for one edge-to-edge item per view."
    ],
    anatomy: ["Focusable scroller with snap and parallax", "Multi-browse large, medium, and small keyline items", "Hero focal item with 40\u201356dp supporting items", "Vertical portrait full-screen items with edge snap", "Standard equal-size or multi-aspect uncontained items", "Roving focus with ArrowUp/ArrowDown exit", "Show all path below non-full-screen carousels"],
    states: ["Rest", "Scroll-position focal sizing", "Hover state layer", "Visible focus ring", "Pressed ripple", "Snapped", "Reduced motion (stable equal widths and immediate scrolling)"],
    dos: [
      "Use multi-browse for mixed or equal-importance content, hero for featured content, and full-screen for edge-to-edge imagery",
      "Keep 1\u20135 items visible (official multi-browse range)",
      "Give every item a label (or accessible name) so the carousel is describable",
      "Use item aspectRatio only with uncontainedMode='multi-aspect'",
      "Provide showAllHref or onShowAll on vertically scrolling pages, except for full-screen feeds"
    ],
    donts: [
      "Don't nest carousels inside carousels",
      "Don't put primary actions inside carousel items (items are browse/navigation, not task buttons)",
      "Don't resize items from pointer hover; expressive sizing follows scroll position",
      "Don't add in-carousel arrows unless compatibility needs require them"
    ]
  },
  exampleCode: `<Carousel
  layout="multi-browse"
  itemCount={4}
  ariaLabel="Weekend getaways"
  items={[
    { id: "beach", label: "Beach day", icon: "beach_access", tone: "primary", onClick: open },
    { id: "hike", label: "Hiking", icon: "hiking", tone: "secondary", onClick: open },
    { id: "museum", label: "Museums", icon: "museum", tone: "tertiary" },
    { id: "food", label: "Food tours", icon: "restaurant", tone: "surface" },
  ]}
/>

<Carousel layout="hero" items={featured} />
<Carousel layout="uncontained" items={fixedCards} showAllHref="/all" />
<Carousel layout="uncontained" uncontainedMode="multi-aspect" items={mixedCards} showAllHref="/all" />
<Carousel layout="full-screen" items={fullBleed} />`,
  m3e: true,
  related: ["card", "list", "bottom-sheet"],
  demoName: "CarouselDemo"
};
var dialogMeta = {
  id: "dialog",
  name: "Dialog",
  category: "containment",
  description: "Dialogs inform users about a task and can contain critical information or require decisions \u2014 a modal surface over a 32% scrim that blocks interaction until resolved. Focus is trapped inside while open and returns to the trigger on close.",
  importLine: `import { Dialog } from "m3-expressive-react";`,
  spec: componentSpecs.dialog,
  variants: ["basic", "fullscreen", "dismissible", "non-dismissible"],
  props: [
    { name: "open", type: `boolean`, description: "Controls visibility." },
    { name: "onClose", type: `() => void`, description: "Required close handler. Full-screen dialogs always render its close affordance." },
    { name: "icon", type: `string`, description: "Material Symbol above the headline." },
    { name: "headline", type: `string`, description: "Dialog headline (headline-small)." },
    { name: "children", type: `React.ReactNode`, description: "Supporting body content (body-medium)." },
    { name: "actions", type: `React.ReactNode`, description: "Trailing actions. Full-screen dialogs pin them in a separate 56dp bottom bar." },
    { name: "fullScreen", type: `boolean`, default: `false`, description: "Official edge-to-edge variant with a required close control, 56dp header, and separate 56dp bottom action bar. fullscreen remains a deprecated alias." },
    { name: "dismissible", type: `boolean`, default: `true`, description: "false forces an explicit action choice." },
    { name: "ariaLabel", type: `string`, description: "Accessible name used when the dialog has no visible headline." }
  ],
  guidelines: {
    whenToUse: [
      "Require an explicit decision (confirm destructive actions like delete or reset).",
      "Present critical information that interrupts the current flow.",
      "Use fullscreen for immersive creation or editing tasks."
    ],
    anatomy: ["Scrim (32% over page)", "Alert dialog surface (surface-container-high, 28dp corners, elevation 3, 280\u2013560dp wide)", "Optional icon and required accessible name", "Bounded scrolling body", "Pinned title and action regions", "Full-screen 56dp header with required close control", "Full-screen 56dp bottom action bar"],
    states: ["Entering (scale 0.9 \u2192 1 with expressive spring)", "Open (32% scrim, body scroll locked, focus trapped)", "Dismiss (Escape / scrim tap when dismissible; focus returns to the trigger)", "Exiting"],
    dos: [
      "Keep dialogs focused on one decision",
      "Order actions: dismissive (text) left, confirmatory (filled) right",
      "Use non-dismissible mode only when a choice is truly required",
      "Give the dialog a headline so aria-labelledby announces it"
    ],
    donts: [
      "Don't open dialogs from dialogs",
      "Don't hide the title or actions when the bounded body scrolls",
      "Don't block the app with confirmation dialogs for trivial actions"
    ]
  },
  exampleCode: `<Dialog
  open={open}
  onClose={() => setOpen(false)}
  icon="delete"
  headline="Reset settings?"
  actions={
    <>
      <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="filled" onClick={reset}>Reset</Button>
    </>
  }
>
  This will reset all settings to their defaults.
</Dialog>`,
  related: ["banner", "snackbar", "side-sheet", "button"],
  demoName: "DialogDemo"
};
var snackbarMeta = {
  id: "snackbar",
  name: "Snackbar",
  category: "communication",
  description: "Snackbars inform users of a process that an app has performed or will perform, appearing briefly at the bottom of the screen on an inverse surface.",
  importLine: `import { Snackbar } from "m3-expressive-react";`,
  spec: componentSpecs.snackbar,
  variants: ["with-action", "with-icon", "sticky"],
  props: [
    { name: "open", type: `boolean`, description: "Controls visibility." },
    { name: "message", type: `string`, description: "The brief confirmation text." },
    { name: "icon", type: `string`, description: "Leading Material Symbol name (extension \u2014 the base M3 anatomy is text + action + close only)." },
    { name: "actionLabel", type: `string`, description: 'Trailing text action label, e.g. "Undo".' },
    { name: "onAction", type: `() => void`, description: "Action press handler." },
    { name: "actionOnNewLine", type: `boolean`, default: `false`, description: "Moves the action below the message for compact widths or long labels." },
    { name: "onClose", type: `() => void`, description: "Dismiss handler (auto-dismiss + close icon)." },
    { name: "duration", type: `number`, default: `4000`, description: "Auto-dismiss in ms for messages without an action. Actionable snackbars stay until acted on or dismissed; 0 is sticky." }
  ],
  guidelines: {
    whenToUse: [
      'Confirm completed background actions ("Photo archived") with an optional undo.',
      "Surface transient, low-priority status that doesn't require a response.",
      "Pair with a text action to let users reverse the change."
    ],
    anatomy: ["Responsive inverse-surface container (4dp corners, elevation 3, viewport-safe width, 600dp maximum)", "Optional leading icon (extension)", "Message", "Inline or new-line text action", "Close control"],
    states: ["Entering", "Visible (timed when no action)", "Actionable (persistent until action or dismissal)", "Singleton replacement (a new snackbar replaces the visible one)", "Exiting"],
    dos: [
      "Keep messages to one or two short sentences",
      'Offer at most one text action \u2014 usually "Undo"',
      "Let snackbars dismiss on their own; don't stack them",
      "Provide equivalent inline feedback or a persistent action when a timed message contains important information"
    ],
    donts: [
      "Don't use snackbars for critical errors that require action \u2014 use a dialog",
      "Don't put focus-requiring controls or forms inside a snackbar",
      "Don't block the UI or require dismissal to continue"
    ]
  },
  exampleCode: `<Snackbar
  open={open}
  message="Photo archived"
  icon="archive"
  actionLabel="Undo"
  onAction={() => setOpen(false)}
  onClose={() => setOpen(false)}
/>`,
  related: ["dialog", "banner", "tooltip"],
  demoName: "SnackbarDemo"
};
var navigationDrawerMeta = {
  id: "navigation-drawer",
  name: "Navigation drawer",
  category: "navigation",
  description: "Baseline Material 3 navigation drawers provide ergonomic access to destinations. Modal uses surface-container-low at elevation 1 over a scrim; standard docks as a square surface at elevation 0. Active items carry a spring-animated tonal pill.",
  importLine: `import { NavigationDrawer } from "m3-expressive-react";`,
  spec: componentSpecs["navigation-drawer"],
  variants: ["modal", "standard"],
  props: [
    { name: "items", type: `NavItem[]`, description: "Destinations: value, label, optional icon, optional trailing badge." },
    { name: "value", type: `string`, description: "Controlled selected destination value." },
    { name: "onChange", type: `(v: string) => void`, description: "Called with the newly selected value." },
    { name: "variant", type: `'modal' | 'standard'`, default: `'modal'`, description: "Baseline modal uses surface-container-low, elevation 1, and a 32% scrim; baseline standard uses square surface at elevation 0. Official width adapts from 240\u2013360dp." },
    { name: "open", type: `boolean`, description: "Controls the modal drawer. Omit for uncontrolled (starts closed)." },
    { name: "onClose", type: `() => void`, description: "Fired on scrim click or Escape." },
    { name: "header", type: `ReactNode`, description: "Headline area above the destination list; use title-small typography." },
    { name: "footer", type: `ReactNode`, description: "Content pinned to the bottom of the drawer." },
    { name: "fullHeight", type: `boolean`, default: `false`, description: "Stretch the standard drawer to container height." }
  ],
  guidelines: {
    whenToUse: [
      "Use a modal drawer for compact screens or transient navigation over content.",
      "Use a standard drawer on medium/large screens where navigation is always reachable.",
      "Group 5\u201310 destinations; overflow into a 'More' item rather than scrolling."
    ],
    anatomy: ["Responsive 240\u2013360dp container (modal = surface-container-low, elevation 1, 16dp trailing corners; standard = square surface, elevation 0)", "Scrim (modal only, 32%)", "Destination rows (56dp full-width pill, 24dp icon + label + optional label-large badge)", "Optional header (title-small headline) and footer slots"],
    states: ["Active (secondary-container pill, on-secondary-container label)", "Inactive (on-surface-variant icon + label)", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (ripple)", "Modal open (focus trapped, Escape/scrim/select closes, focus returned on close)"],
    dos: [
      "Show the user's current location with the active pill",
      "Use icons consistently across destinations",
      "Close the modal drawer after choosing a destination on small screens"
    ],
    donts: [
      "Don't put destructive or edit actions in a navigation drawer",
      "Don't nest more than one level of hierarchy",
      "Don't block the modal drawer's scrim interactions with custom handlers"
    ]
  },
  exampleCode: `const [open, setOpen] = useState(false);
<Button onClick={() => setOpen(true)}>Menu</Button>
<NavigationDrawer
  variant="modal"
  open={open}
  onClose={() => setOpen(false)}
  value={dest}
  onChange={setDest}
  header={<span className="md-title-small">Mail</span>}
  items={[{ value: "inbox", icon: "inbox", label: "Inbox", badge: 24 }]}
/>`,
  related: ["navigation-bar", "navigation-rail", "menu"],
  demoName: "NavigationDrawerDemo"
};
var listMeta = {
  id: "list",
  name: "List",
  category: "containment",
  description: "Lists are vertical indexes of one-, two-, or three-line items. Current M3E supports standard continuous rows and segmented groups with 2dp gaps, shaped outer/inner corners, selection shapes, and interaction morphs.",
  importLine: `import { List, ListItem } from "m3-expressive-react";`,
  spec: componentSpecs.list,
  variants: ["standard", "segmented", "single-line", "two-line", "three-line"],
  props: [
    { name: "variant", type: `'standard' | 'segmented'`, default: `'standard'`, description: "Continuous list or current expressive segmented treatment." },
    { name: "dividers", type: `boolean`, default: `false`, description: 'Full-width outline-variant dividers between rows; use <Divider inset="list" /> for the official 16dp start / 24dp end list preset.' },
    { name: "className", type: `string`, description: "Extra classes for the ul container." },
    { name: "children", type: `React.ReactNode`, description: "ListItem rows." },
    { name: "headline", type: `React.ReactNode`, description: "ListItem primary text. Required." },
    { name: "supporting", type: `React.ReactNode`, description: "ListItem secondary text; grows the row to 72dp." },
    { name: "overline", type: `string`, description: "ListItem small text above the headline." },
    { name: "lines", type: `1 | 2 | 3`, description: "Official line count: 56dp / 72dp / 88dp rows. Defaults to 2 when supporting/overline is set; 3 wraps supporting to two lines and top-aligns content." },
    { name: "leading", type: `React.ReactNode`, description: "ListItem 40px-wide leading slot: 20dp Material Symbol or avatar." },
    { name: "trailing", type: `React.ReactNode`, description: "ListItem trailing text (md-label-small)." },
    { name: "trailingIcon", type: `string`, description: "ListItem 20dp trailing Material Symbol name." },
    { name: "selected", type: `boolean`, default: `false`, description: "Highlights the row with secondary container and a 16dp shape on all corners." },
    { name: "selectionMode", type: `'none' | 'single' | 'multiple'`, default: `'none'`, description: "List selection contract. Single and multiple modes use listbox/option semantics and roving arrow-key focus." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Dims the row to 38% and blocks interaction." },
    { name: "onClick", type: `(e: MouseEvent<HTMLButtonElement>) => void`, description: "Makes the row interactive (button, ripple, state layer)." }
  ],
  guidelines: {
    whenToUse: [
      "Use lists for homogeneous, scrollable collections of items (contacts, settings, files).",
      "Use list items with supporting text when each row needs context.",
      "Use a leading icon or avatar when items are identifiable at a glance."
    ],
    anatomy: ["Standard continuous or segmented 2dp-gap group", "Row container (56/72/88dp; 16dp inline padding)", "Segmented unselected 4dp rest shape and selected 16dp shape", "20dp leading and trailing icons, text, and trailing slots", "Non-color selected indicator"],
    states: ["Enabled", "Hover", "Visible focus", "Pressed", "Selected (secondary container plus non-color cue)", "Disabled", "Roving Arrow/Home/End keyboard focus in selection modes"],
    dos: [
      "Keep list items visually identical in structure for scannability",
      "Use dividers only when rows are dense or multi-line",
      "Truncate long headline/supporting text to a single line"
    ],
    donts: [
      "Don't mix cards and list rows for the same type of content",
      "Don't put primary actions in list rows \u2014 use trailing icons for secondary actions",
      "Don't wrap list items in nested interactive elements"
    ]
  },
  exampleCode: `<List dividers>
  <ListItem
    leading={<MaterialSymbol icon="person" />}
    headline="Maria Alvarez"
    supporting="maria@example.com"
    trailingIcon="more_vert"
    selected
    onClick={() => {}}
  />
</List>`,
  related: ["card", "bottom-sheet", "side-sheet"],
  demoName: "ListDemo"
};
var cardMeta = {
  id: "card",
  name: "Card",
  category: "containment",
  description: "Cards contain content and actions about a single subject, elevated with a shadow, a filled container, or an outline. M3 Expressive cards morph their shape and scale on press with a springy bounce.",
  importLine: `import { Card } from "m3-expressive-react";`,
  spec: componentSpecs.card,
  variants: ["elevated", "filled", "outlined"],
  props: [
    { name: "variant", type: `'elevated' | 'filled' | 'outlined'`, default: `'elevated'`, description: "Visual treatment: shadowed, tonal, or stroked." },
    { name: "shape", type: `'medium' | 'extraLarge'`, default: `'medium'`, description: "Corner shape: official 12dp medium, or M3E extra-large 28dp for hero cards." },
    { name: "interactive", type: `boolean`, description: "Press shape morph, hover elevation, state layer, ripple and Enter/Space keyboard activation. Defaults to true when onClick is set." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Blocks activation, removes focusability, keeps role=button with aria-disabled for action cards, and applies variant-specific disabled tokens." },
    { name: "onClick", type: `(e: MouseEvent<HTMLDivElement>) => void`, description: "Click handler; makes the card focusable with role button." },
    { name: "className", type: `string`, description: "Extra classes for the card container (width, padding)." },
    { name: "children", type: `React.ReactNode`, description: "Card content." }
  ],
  guidelines: {
    whenToUse: [
      "Use cards to group related content and actions about a single subject.",
      "Use elevated cards on patterned or busy backgrounds to create separation.",
      "Use filled cards when a tonal container fits the surrounding color scheme.",
      "Use outlined cards for lightweight, medium-emphasis grouping with many cards on screen."
    ],
    anatomy: ["Container (12dp medium corners; M3E allows 28dp extra-large for hero cards; 16dp left/right padding; outlined = surface + 1dp outline-variant stroke)", "State layer + ripple (interactive cards)", "Optional supporting visual, headline, supporting text", "Optional actions row"],
    states: ["Rest (elevation 1 for elevated)", "Hover (elevated rises to level 2; filled rises to level 1; 8% state layer)", "Focus (3px focus ring)", "Pressed (10% state layer, selected shape morph + 97% scale)", "Disabled (variant-specific container/outline tokens, 38% content, role=button + aria-disabled when action-backed)"],
    dos: [
      "Keep card padding generous (16\u201324px) and content scannable",
      "Use one interactive region per card; nest buttons carefully or make the whole card tappable",
      "Pick one emphasis level (elevated/filled/outlined) per screen region"
    ],
    donts: [
      "Don't overload a card with multiple unrelated subjects",
      "Don't nest cards inside cards",
      "Don't use elevation and outline together on the same card"
    ]
  },
  exampleCode: `<Card variant="elevated" className="w-64 p-6">
  <span className="md-title-medium">Elevated card</span>
  <p className="md-body-medium text-m3-on-surface-variant">Supporting text</p>
</Card>
<Card variant="outlined" interactive onClick={() => {}} className="w-64 p-6">
  <span className="md-title-medium">Tappable card</span>
</Card>`,
  related: ["list", "bottom-sheet", "side-sheet"],
  demoName: "CardDemo"
};
var segmentedButtonMeta = {
  id: "segmented-button",
  name: "Segmented button",
  category: "actions",
  description: "Not recommended for new work: use ButtonGroup instead. This compatibility component keeps the baseline 40dp segmented control, while its 56dp medium size is a library extension. Each segment expands its touch target to \u226548dp vertically via an invisible ::before hit area.",
  importLine: `import { SegmentedButton } from "m3-expressive-react";`,
  spec: componentSpecs["segmented-button"],
  variants: ["single \xB7 not recommended", "multiple \xB7 not recommended", "56dp medium \xB7 library extension"],
  props: [
    { name: "options", type: `{ value: string; label?: string; icon?: string }[]`, description: "Segments, keyed by value." },
    { name: "type", type: `'single' | 'multiple'`, default: `'single'`, description: "Single emits a string; multiple emits a string array." },
    { name: "value", type: `string | string[]`, description: "Controlled value \u2014 string for single, string[] for multiple." },
    { name: "onValueChange", type: `(value: string | string[]) => void`, description: "Called with the next value; deselecting in single mode emits ''." },
    { name: "size", type: `'sm' | 'md'`, default: `'sm'`, description: "40dp is the baseline size. The 56dp md size is a library extension, not an official M3 size." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables every segment: outline drops to 12%, content to on-surface 38%." }
  ],
  guidelines: {
    whenToUse: [
      "Do not start new work with SegmentedButton; use ButtonGroup for current M3 Expressive controls.",
      "Keep this component only when an existing screen must preserve its connected segmented-control contract.",
      "Use the 56dp md size only when the library extension is an explicit product decision."
    ],
    anatomy: ["Connected pill outline (border-m3-outline)", "Equal-width segments (40/56px tall)", "1px dividers between segments", "Secondary-container selected fill", "Leading check icon on selection"],
    states: ["Unselected (on-surface label)", "Selected (secondary-container + check)", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (97% scale spring)", "Touch target (\u226548dp vertically via ::before hit-expander; no horizontal expansion, so adjacent segments never overlap)", "Disabled (outline 12%, content on-surface 38%, selected fill on-surface 12%)"],
    dos: [
      "Keep segments to 2\u20135, with equal-width content",
      "Use short labels, optionally paired with an icon",
      "Pre-select the most likely option so the control has a defined state"
    ],
    donts: [
      "Don't use segmented buttons to trigger actions \u2014 they represent selection state",
      "Don't use for mutually exclusive choices when a switch or checkbox fits better",
      "Don't make text wrap; keep labels short enough to fit one line"
    ]
  },
  exampleCode: `<SegmentedButton
  options={[
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ]}
  value={range}
  onValueChange={setRange}
/>
<SegmentedButton
  type="multiple"
  size="sm"
  options={[
    { value: "flights", label: "Flights", icon: "flight" },
    { value: "hotels", label: "Hotels", icon: "hotel" },
  ]}
/>`,
  related: ["button-group", "button", "icon-button"],
  demoName: "SegmentedButtonDemo"
};
var sliderMeta = {
  id: "slider",
  name: "Slider",
  category: "selection",
  description: "Current Material 3 Expressive sliders support standard, centered, and range values in horizontal or vertical layouts. Five official size configurations scale the track and handle, with optional inset icons, stops, value labels, and native form association.",
  importLine: `import { Slider } from "m3-expressive-react";`,
  spec: componentSpecs.slider,
  variants: ["standard", "centered", "range", "horizontal", "vertical", "stops", "inset icons"],
  props: [
    { name: "value", type: `number | readonly [number, number]`, description: "Controlled single value, or a two-value tuple for variant='range'." },
    { name: "onChange", type: `((value: number) => void) | ((value: [number, number]) => void)`, description: "Called with the snapped single or range value on drag and keyboard changes." },
    { name: "variant", type: `'standard' | 'centered' | 'range'`, default: `'standard'`, description: "Track fill starts at the minimum, grows from the center, or spans two handles." },
    { name: "orientation", type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: "Slider axis and keyboard direction." },
    { name: "size", type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`, default: `'xs'`, description: "Official size configuration: track 16/24/40/56/96dp with a 44/44/52/68/108dp handle." },
    { name: "min", type: `number`, default: `0`, description: "Minimum value." },
    { name: "max", type: `number`, default: `100`, description: "Maximum value." },
    { name: "step", type: `number`, default: `1`, description: "Increment to snap to." },
    { name: "stops", type: `boolean`, default: `false`, description: "Shows official stop indicators for each step." },
    { name: "discrete", type: `boolean`, default: `false`, description: "Deprecated compatibility alias for stops." },
    { name: "showValueLabel", type: `boolean`, default: `false`, description: "Value bubble above the handle while engaged." },
    { name: "insetIcons", type: `{ start: string; end: string }`, description: "Optional Material Symbols inset into the start and end of the track." },
    { name: "name / form", type: `string`, description: "Native form name and owning form id. Range values submit under the shared name unless rangeNames is set." },
    { name: "rangeNames", type: `readonly [string, string]`, description: "Distinct native form names for a range slider's start and end values." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables interaction and applies the M3 disabled track and handle color opacities." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." }
  ],
  guidelines: {
    whenToUse: [
      "Use for settings where an approximate value is fine (volume, brightness).",
      "Use stops when users should sense the exact steps.",
      "Pair with a numeric readout when precision matters."
    ],
    anatomy: ["Rounded segmented track (primary active / secondary-container inactive)", "Tall thin handle with a minimum 48dp interaction target", "Optional 4dp stop indicators (on-primary over active, on-secondary-container over inactive)", "Optional inset track icons and value label", "Range configuration with two independently keyboard-operable handles and optional distinct form names"],
    states: ["Enabled", "Hover (handle widens, bubble appears)", "Drag (pointer captured)", "Focused (3px ring; arrows \xB1step, PageUp/PageDown \xB110 steps, Home/End)", "Disabled (38% opacity)"],
    dos: [
      "Keep ranges small enough to scan; factor big ranges into steps",
      "Show the value label while dragging for feedback",
      "Support keyboard arrows and Home/End for accessibility"
    ],
    donts: [
      "Don't use a slider for a small set of options \u2014 use chips or radios",
      "Don't require pixel-precise dragging; snapping to a step helps",
      "Don't trigger expensive side effects on every tick; debounce instead"
    ]
  },
  exampleCode: `<Slider
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
  stops
  showValueLabel
  fullWidth
/>
<Slider
  name="volume"
  size="md"
  insetIcons={{ start: "volume_down", end: "volume_up" }}
  value={volume}
  onChange={setVolume}
/>
<Slider variant="centered" value={balance} onChange={setBalance} />
<Slider variant="range" rangeNames={["minPrice", "maxPrice"]} value={range} onChange={setRange} />
<Slider orientation="vertical" size="lg" value={level} onChange={setLevel} />`,
  related: ["radio", "switch", "checkbox"],
  demoName: "SliderDemo",
  m3e: true
};
var textFieldMeta = {
  id: "text-field",
  name: "TextField",
  category: "textinput",
  description: "Text fields accept single-line or multiline text in filled or outlined containers, with floating labels, optional prefix/suffix content, icons, supporting text, validation, and native form attributes.",
  importLine: `import { TextField } from "m3-expressive-react";`,
  spec: componentSpecs["text-field"],
  variants: ["outlined", "filled"],
  props: [
    { name: "variant", type: `'outlined' | 'filled'`, default: `'outlined'`, description: "Container style: outlined stroke or filled surface with a bottom indicator." },
    { name: "size", type: `'xs' | 'sm' | 'md' | 'lg'`, default: `'md'`, description: "Expressive height scale: xs=32, sm=40, md=56, lg=72." },
    { name: "label", type: `string`, description: "Floating label; docks into the border gap when focused or filled." },
    { name: "value", type: `string | number | readonly string[]`, description: "Controlled input value." },
    { name: "onChange", type: `(e: ChangeEvent<HTMLInputElement>) => void`, description: "Change handler for the native input." },
    { name: "type", type: `string`, default: `'text'`, description: "Native input type (email, password, number\u2026)." },
    { name: "placeholder", type: `string`, description: "Hint text, shown once the label has floated." },
    { name: "helperText", type: `string`, description: "Supporting message below the field; turns red on error." },
    { name: "error", type: `boolean`, default: `false`, description: "Applies error color to border, indicator, label and helper." },
    { name: "leadingIcon", type: `string`, description: "Leading Material Symbol name." },
    { name: "trailingIcon", type: `string`, description: "Trailing Material Symbol name." },
    { name: "prefix", type: `ReactNode`, description: "Content immediately before the editable text." },
    { name: "suffix", type: `ReactNode`, description: "Content immediately after the editable text." },
    { name: "multiline", type: `boolean`, default: `false`, description: "Render an official multiline text area." },
    { name: "rows", type: `number`, description: "Initial visible lines for multiline input." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables the input (38% opacity)." },
    { name: "required", type: `boolean`, default: `false`, description: "Marks the field as required (asterisk in label)." },
    { name: "id", type: `string`, description: "Input id; auto-generated when omitted." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." }
  ],
  guidelines: {
    whenToUse: [
      "Use to capture short, single-line input such as names, emails, or codes.",
      "Prefer outlined on open layouts and filled inside dense, contained UI like dialogs.",
      "Use helperText for hints and error only for validation failures."
    ],
    anatomy: ["Outlined stroke or filled surface with indicator", "Floating label", "Single-line input or multiline text area", "Optional icons with the official 16dp icon-to-text gap", "Optional prefix/suffix linked through aria-describedby", "Supporting text; error messages use role=alert"],
    states: ["Enabled", "Hover (outline shifts to on-surface / filled indicator darkens)", "Focused (2px primary stroke / primary indicator, label floats)", "Error (error color + error icon)", "Disabled (38% content, 12% outline border or 4% filled container)"],
    dos: [
      "Always provide a label \u2014 placeholders alone disappear while typing",
      "Use the matching type/inputMode so users get the right keyboard",
      "Keep helper text to a single short line"
    ],
    donts: [
      "Don't use a text field to trigger actions \u2014 use a button",
      "Don't show an error before the user has interacted with the field",
      "Don't place two fields' helper texts so they can be confused"
    ]
  },
  exampleCode: `<TextField
  label="Email"
  type="email"
  leadingIcon="mail"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  helperText="We never share your email."
  required
  fullWidth
/>`,
  related: ["search-bar", "autocomplete"],
  demoName: "TextFieldDemo"
};
var autocompleteMeta = {
  id: "autocomplete",
  name: "Autocomplete",
  category: "textinput",
  description: "Library extension: Material 3 does not publish a standalone Autocomplete component. This composite combines the official outlined text-field treatment with accessible combobox/listbox behavior for filterable suggestions.",
  importLine: `import { Autocomplete } from "m3-expressive-react";`,
  spec: componentSpecs.autocomplete,
  variants: ["outlined"],
  props: [
    { name: "options", type: `string[]`, description: "All selectable options." },
    { name: "value", type: `string`, description: "Controlled text value (the selection or free text)." },
    { name: "onChange", type: `(value: string) => void`, description: "Called with the typed text or a chosen option." },
    { name: "label", type: `string`, description: "Label rendered above the field." },
    { name: "placeholder", type: `string`, description: "Hint text for the input." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables the field and menu (38% opacity)." },
    { name: "name / form / required", type: `native input props`, description: "Native form association and validation forwarded to the combobox input." }
  ],
  guidelines: {
    whenToUse: [
      "Use when users must pick from a long list of known values (countries, tags, accounts).",
      "Use instead of a select when users may want to type to filter.",
      "Keep the option set under ~100 items for instant filtering."
    ],
    anatomy: ["Outlined text field (4dp corners)", "48dp trailing drop-down target", "Dropdown menu (surface-container, elevation-2, 4dp corners)", "Option rows with selected check (keyboard highlight scrolls into view)"],
    states: ["Enabled", "Focused or open (primary stroke from the real Base UI state)", "Highlighted option (8% state layer)", "Selected option (check icon)", "Disabled (38% opacity)"],
    dos: [
      "Match options case-insensitively while filtering",
      "Support keyboard navigation: arrows, Enter, Escape",
      "Show a check on the currently selected option"
    ],
    donts: [
      "Don't force a selection if free text is valid \u2014 use a TextField instead",
      "Don't truncate option labels without a tooltip or wrap",
      "Don't open the menu when the field is disabled"
    ]
  },
  exampleCode: `<Autocomplete
  options={["React", "Vue", "Svelte"]}
  value={framework}
  onChange={setFramework}
  label="Framework"
  fullWidth
/>`,
  related: ["text-field", "search-bar", "chip"],
  demoName: "AutocompleteDemo",
  m3e: false
};
var navigationRailMeta = {
  id: "navigation-rail",
  name: "Navigation rail",
  category: "navigation",
  description: "Navigation rails provide primary navigation on medium and expanded screens. The current 96dp wide rail expands into a standard in-layout 220\u2013360dp rail by default; an explicit modal mode adds a 32% scrim and a focus trap. The 80dp narrow baseline remains available.",
  importLine: `import { NavigationRail } from "m3-expressive-react";`,
  spec: componentSpecs["navigation-rail"],
  variants: ["wide collapsed", "standard expanded \xB7 default", "modal expanded \xB7 focus trapped", "narrow", "with header", "folding-line"],
  props: [
    { name: "items", type: `NavItem[]`, description: "Destinations (3\u20137): value, label, optional icon, optional badge." },
    { name: "value", type: `string`, description: "Controlled selected destination value." },
    { name: "onChange", type: `(v: string) => void`, description: "Called with the newly selected value." },
    { name: "header", type: `ReactNode`, description: "Slot above the items \u2014 typically a FAB." },
    { name: "menuIcon", type: `string`, default: `'menu'`, description: "Material Symbol for the optional leading menu icon (official rail anatomy item)." },
    { name: "onMenuClick", type: `() => void`, description: "Renders the leading menu icon and handles its press (e.g. expand into a drawer)." },
    { name: "variant", type: `'wide' | 'narrow'`, default: `'wide'`, description: "Current M3E 96dp/expanded rail, or the 80dp baseline rail." },
    { name: "expanded", type: `boolean`, default: `false`, description: "Open the wide rail's horizontal-item layout." },
    { name: "expandedMode", type: `'standard' | 'modal'`, default: `'standard'`, description: "Standard expands in layout. Modal overlays content with a 32% scrim, traps focus, closes on Escape/outside press, and restores focus." },
    { name: "expandedWidth", type: `number`, default: `360`, description: "Expanded width, clamped to the official 220\u2013360dp range." },
    { name: "foldingLine", type: `boolean`, default: `false`, description: "Draws a hinge divider along the leading edge for foldables." }
  ],
  guidelines: {
    whenToUse: [
      "Use on medium screens (600\u2013840dp window widths) where a drawer is too heavy.",
      "Use a navigation bar on compact screens and a drawer on expanded screens.",
      "Put a FAB in the header slot when the screen's primary action is available everywhere."
    ],
    anatomy: ["Wide rail (96dp collapsed; 220\u2013360dp expanded) or narrow rail (80dp)", "Optional leading menu icon", "Optional header slot (FAB)", "Collapsed destination (24dp icon in a 56\xD732dp capsule + label-medium)", "Expanded destination (56dp full-width horizontal pill + label-large)"],
    states: ["Active (secondary-container capsule, filled icon)", "Inactive (on-surface-variant)", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (ripple)", "Expanded standard (in layout)", "Expanded modal (scrim, focus trap, Escape/outside dismissal, focus restoration)"],
    dos: [
      "Only show labels when they add meaning \u2014 capsules alone work for familiar destinations",
      "Keep 3\u20137 destinations in the rail",
      "Align the rail with the app's content margin"
    ],
    donts: [
      "Don't use a rail as a toolbar for actions",
      "Don't mix rail destinations with drawer destinations inconsistently",
      "Don't add more than one rail per screen"
    ]
  },
  exampleCode: `const [dest, setDest] = useState("home");
<NavigationRail
  value={dest}
  onChange={setDest}
  expanded={expanded}
  onMenuClick={() => setExpanded((value) => !value)}
  header={<Fab icon="edit" onClick={compose} />}
  items={[{ value: "home", icon: "home", label: "Home" }]}
/>`,
  related: ["navigation-bar", "navigation-drawer", "fab"],
  demoName: "NavigationRailDemo"
};
var chipMeta = {
  id: "chip",
  name: "Chip",
  category: "selection",
  description: "Chips are compact elements that represent an input, attribute, or action \u2014 assist, filter, input, and suggestion variants.",
  importLine: `import { Chip, ChipGroup } from "m3-expressive-react";`,
  spec: componentSpecs.chip,
  variants: ["assist", "filter", "input", "suggestion"],
  props: [
    { name: "variant", type: `'assist' | 'filter' | 'input' | 'suggestion'`, default: `'assist'`, description: "Chip semantics and affordances." },
    { name: "selected", type: `boolean`, default: `false`, description: "Filter chips only \u2014 controlled selected state with a leading check." },
    { name: "onSelect", type: `(selected: boolean) => void`, description: "Filter chips only \u2014 called with the next selected state." },
    { name: "onClick", type: `MouseEventHandler<HTMLButtonElement>`, description: "Primary action for assist, input, and suggestion chips." },
    { name: "onRemove", type: `() => void`, description: "Input chips: renders a trailing cancel affordance." },
    { name: "removeLabel", type: `string`, default: `'Remove'`, description: "Accessible name for an input chip's separate remove action." },
    { name: "leadingIcon", type: `string`, description: "Leading Material Symbol name (replaced by the check when selected)." },
    { name: "avatar", type: `ReactNode`, description: "Input chips only: official 24dp circular avatar. Takes precedence over leadingIcon." },
    { name: "trailingIcon", type: `string`, description: "Trailing Material Symbol name (non-input variants)." },
    { name: "elevated", type: `boolean`, default: `false`, description: "Raises the unselected chip (elevation-1, container-low surface)." },
    { name: "size", type: `'xs' | 'sm' | 'md'`, default: `'sm'`, description: "Expressive height scale: xs=28, sm=32, md=40." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables the chip (38% opacity)." },
    { name: "children", type: `ReactNode`, description: "Label text." },
    { name: "ChipGroup label", type: `string`, default: `'Chips'`, description: "Accessible collection name. Arrow keys move focus; Home/End jump; Delete/Backspace remove focused input chips." }
  ],
  guidelines: {
    whenToUse: [
      "Use filter chips to toggle content filters in a set.",
      "Use input chips to represent entities (people, tags) the user added.",
      "Use assist and suggestion chips for contextual quick actions."
    ],
    anatomy: ["32dp container with 8dp corners and 16dp iconless padding", "Variant-specific label, icon, outline, and selected-container color roles", "Optional leading icon / animated check / 24dp input-chip avatar", "Label (label-large)", "Optional trailing icon or 48dp cancel target", "Optional ChipGroup keyboard wrapper"],
    states: ["Enabled action", "Hover (8% state layer)", "Focus (3px primary ring)", "Pressed (96% scale)", "Filter or input selected (secondary-container/on-secondary-container)", "Elevated (surface-container-low, elevation-1, hover elevation-2)", "Disabled"],
    dos: [
      "Keep chip labels to one or two words",
      "Let filter chips toggle independently",
      "Give every input chip a visible remove affordance"
    ],
    donts: [
      "Don't use chips for primary navigation \u2014 use tabs or a nav rail",
      "Don't mix chip variants in the same row",
      "Don't truncate more than a word; wrap the row instead"
    ]
  },
  exampleCode: `<Chip variant="filter" selected={active} onSelect={setActive}>
  Landscape
</Chip>
<Chip variant="input" avatar={<img src={guest.photo} alt="" />} onRemove={removeGuest}>
  Guest
</Chip>
<ChipGroup label="Filters">{filterChips}</ChipGroup>`,
  related: ["checkbox", "radio", "autocomplete"],
  demoName: "ChipDemo"
};
var bannerMeta = {
  id: "banner",
  name: "Banner",
  category: "communication",
  description: "Library extension from Material 2 and Flutter: Material 3 does not publish Banner as a current standalone component. It displays a persistent screen-wide message with optional actions.",
  importLine: `import { Banner } from "m3-expressive-react";`,
  spec: componentSpecs.banner,
  variants: ["with-icon", "with-actions", "dismissible"],
  props: [
    { name: "icon", type: `string`, description: "Leading Material Symbol name." },
    { name: "text", type: `string`, description: "The banner message." },
    { name: "actions", type: `{ label: string; onClick?: () => void }[]`, description: "Right-aligned text buttons below a divider." },
    { name: "open", type: `boolean`, default: `true`, description: "Collapses the banner when false." },
    { name: "onClose", type: `() => void`, description: "Renders a trailing close icon when provided." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." }
  ],
  guidelines: {
    whenToUse: [
      "Announce system-level conditions (offline, updates, permission prompts) that affect the whole screen.",
      "Offer follow-up actions the user can take now, like Retry or Update.",
      "Keep visible until resolved \u2014 unlike snackbars, banners persist."
    ],
    anatomy: ["Extension container (surface-container-low, square corners)", "Leading icon (on-surface-variant, 24dp)", "Message (body-medium)", "Action row (52px) end-aligned above an outline-variant divider with 40dp text buttons", "Optional close icon"],
    states: ["Expanded", "Collapsing (height spring)", "Dismissed"],
    dos: [
      "Use one banner per screen so the message stays prominent",
      "Provide clear dismiss and action affordances",
      "Write text in one or two lines maximum"
    ],
    donts: [
      "Don't use banners for transient confirmations \u2014 use a snackbar",
      "Don't interrupt input flows with banners mid-form",
      "Don't stack multiple banners in the same region"
    ]
  },
  exampleCode: `<Banner
  icon="wifi_off"
  text="You're offline. Messages will send once you reconnect."
  actions={[{ label: "Retry", onClick: retry }]}
  onClose={dismiss}
  fullWidth
/>`,
  related: ["snackbar", "dialog", "card"],
  demoName: "BannerDemo",
  m3e: false
};
var checkboxMeta = {
  id: "checkbox",
  name: "Checkbox",
  category: "selection",
  description: "Checkboxes let users select one or more items from a set, toggling each option on or off (or to an indeterminate state).",
  importLine: `import { Checkbox } from "m3-expressive-react";`,
  spec: componentSpecs.checkbox,
  variants: ["checked", "unchecked", "indeterminate"],
  props: [
    { name: "checked", type: `boolean`, default: `false`, description: "Whether the box is checked." },
    { name: "defaultChecked", type: `boolean`, default: `false`, description: "Initial checked state for uncontrolled use." },
    { name: "indeterminate", type: `boolean`, default: `false`, description: "Shows a dash (mixed state); aria-checked='mixed'." },
    { name: "onChange", type: `(checked: boolean) => void`, description: "Called with the next checked state." },
    { name: "label", type: `string`, description: "Label rendered beside the box." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables the control (38% opacity)." },
    { name: "error", type: `boolean`, default: `false`, description: "Applies the error color to box, check and ripple." },
    { name: "value", type: `string`, default: `'on'`, description: "Native form value submitted when checked." },
    { name: "uncheckedValue", type: `string`, description: "Optional native form value submitted when unchecked." },
    { name: "name / form / required / readOnly", type: `native form props`, description: "Forwarded through the Base UI hidden form input." }
  ],
  guidelines: {
    whenToUse: [
      "Use for multiple independent selections in a set.",
      "Use indeterminate for a parent that reflects partially-selected children.",
      "Use a single checkbox to opt in or out of one condition."
    ],
    anatomy: ["48px touch target", "40dp circular state layer isolated from the label", "18px rounded box (2px border)", "Animated checkmark / indeterminate dash", "Optional label (body-large)"],
    states: ["Enabled", "Hover (state layer)", "Focus (3px primary ring)", "Pressed (box squashes on the expressive spring)", "Checked (primary fill + drawn check)", "Indeterminate (dash)", "Error", "Disabled (38% opacity)"],
    dos: [
      "Keep labels positive ('Send me updates') so checking means agreeing",
      "Use the indeterminate state to summarize child checkboxes",
      "Give each checkbox its own clear label"
    ],
    donts: [
      "Don't use a checkbox when only one option can be active \u2014 use a radio",
      "Don't trigger destructive actions directly from a check",
      "Don't nest checkboxes inside one another"
    ]
  },
  exampleCode: `<Checkbox
  checked={subscribed}
  onChange={setSubscribed}
  label="Email me product updates"
/>`,
  related: ["radio", "switch", "chip"],
  demoName: "CheckboxDemo"
};
var fabMeta = {
  id: "fab",
  name: "FAB",
  category: "actions",
  description: "A floating action button represents the primary action on a screen. Current M3E sizes are standard 56dp, medium 80dp, and large 96dp. The old 40dp small and 132dp extra-large sizes remain explicit compatibility options.",
  importLine: `import { Fab } from "m3-expressive-react";`,
  spec: componentSpecs.fab,
  variants: ["primary-container \xB7 default", "secondary-container", "tertiary-container", "primary", "secondary", "tertiary", "surface \xB7 legacy"],
  props: [
    { name: "color", type: `FabColor`, default: `'primary-container'`, description: "Defaults to the current primary-container role. Solid and other container roles remain available; surface is a legacy compatibility role." },
    { name: "size", type: `FabSize`, default: `'standard'`, description: "Official 56 / 80 / 96dp sizes, plus legacy 40 / 132dp options." },
    { name: "icon", type: `string`, description: "Material Symbols ligature name, e.g. 'add'." },
    { name: "lowered", type: `boolean`, default: `false`, description: "Uses elevation 1 instead of 3 (for FABs flanking dialogs or extended FABs)." },
    { name: "aria-label", type: `string`, description: "Strongly recommended \u2014 the icon alone has no text alternative." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables interaction: container drops to on-surface 12%, icon to 38%, elevation to 0." },
    { name: "onClick", type: `() => void`, description: "Handler fired when the FAB is activated." }
  ],
  guidelines: {
    whenToUse: [
      "Use a FAB for the single most common or important action on a screen, like 'Compose' or 'Create'.",
      "Use a container color by default, or tertiary for a contrasting accent.",
      "Use lowered when the FAB shares a screen with a dialog or another extended FAB."
    ],
    anatomy: ["Rounded tonal container (16/20/28dp official corners)", "Elevation shadow (level 3, or 1 when lowered)", "Material Symbol icon (24/28/32dp official sizes)", "State layer + ripple", "48dp minimum touch target on the legacy 40dp small FAB"],
    states: ["Enabled (elevation 3)", "Hover (elevation 4, 103% scale)", "Focus (3px focus ring)", "Pressed (94% scale spring, elevation 4)", "Disabled (on-surface 12% container / 38% icon, no elevation)"],
    dos: [
      "Show at most one FAB per screen (or per section of very long screens)",
      "Position the FAB in the bottom-right corner for scannability",
      "Pick an icon that instantly communicates the action it performs"
    ],
    donts: [
      "Don't use a FAB for minor or destructive actions",
      "Don't use more than one FAB competing for the primary action",
      "Don't place a FAB inside dialogs or cards where an inline button is clearer"
    ]
  },
  exampleCode: `<Fab icon="add" aria-label="Create" onClick={create} />
<Fab color="tertiary" size="large" icon="favorite" aria-label="Like" />
<Fab color="surface" size="small" icon="edit" lowered aria-label="Legacy surface FAB" />`,
  related: ["extended-fab", "fab-menu", "icon-button", "button"],
  demoName: "FabDemo"
};
var tabsMeta = {
  id: "tabs",
  name: "Tabs",
  category: "navigation",
  description: "Tabs organize peer views. Primary tabs use 64dp icon-and-label columns with an indicator inset 2dp beyond each side of the label. Official secondary tabs use a 48dp surface row with a full-tab-width underline; the old tonal pill is retained as an explicitly named compatibility variant.",
  importLine: `import { Tabs } from "m3-expressive-react";`,
  spec: componentSpecs.tabs,
  variants: ["primary", "secondary", "tonal \xB7 compatibility"],
  props: [
    { name: "items", type: `NavItem[]`, description: "Tab definitions: value, label, optional Material Symbol icon and badge." },
    { name: "value", type: `string`, description: "Controlled selected tab value." },
    { name: "onChange", type: `(v: string) => void`, description: "Called with the newly selected value." },
    { name: "variant", type: `'primary' | 'secondary' | 'tonal'`, default: `'primary'`, description: "Primary extends the underline 2dp beyond each label side; secondary uses the official full-tab-width underline; tonal preserves the former pill extension." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to container width and distribute tabs equally; overflow scrolls horizontally." }
  ],
  guidelines: {
    whenToUse: [
      "Use tabs to switch between peer views of the same content level (Today / Health / Shop).",
      "Use at the top of a screen for in-context navigation, not for app-level destinations.",
      "Use secondary for a compact 48dp row with a full-width selected underline."
    ],
    anatomy: ["64dp primary or 48dp secondary surface row", "Tab with optional 24dp icon and label", "Primary label width + 2dp each side or secondary full-tab-width 3dp underline", "Compatibility tonal pill", "Overflow scroll controls"],
    states: ["Selected (primary or on-surface content plus underline)", "Unselected (on-surface-variant)", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (ripple)", "Keyboard (roving tabindex; ArrowLeft/Right, Home/End move and activate)"],
    dos: [
      "Keep tab labels short \u2014 a single word is ideal",
      "Order tabs by importance or logical reading order",
      "Keep the selected tab obvious via the animated indicator"
    ],
    donts: [
      "Don't use tabs for sequential steps \u2014 use a stepper or buttons instead",
      "Don't combine tabs and bottom navigation for the same content level",
      "Don't truncate labels; scroll instead"
    ]
  },
  exampleCode: `const [tab, setTab] = useState("today");
<Tabs
  fullWidth
  value={tab}
  onChange={setTab}
  items={[
    { value: "today", icon: "calendar_month", label: "Today" },
    { value: "health", icon: "favorite", label: "Health" },
    { value: "shop", icon: "shopping_bag", label: "Shop" },
  ]}
/>`,
  related: ["navigation-bar", "navigation-rail", "toolbar"],
  demoName: "TabsDemo"
};
var loadingIndicatorMeta = {
  id: "loading-indicator",
  name: "Loading indicator",
  category: "communication",
  description: "The M3 Expressive loading indicator loops through seven official polygon shapes when indeterminate. With progress, it uses the official determinate Circle-to-SoftBurst morph from 0 to 1. The uncontained indicator is the default; a contained tonal treatment is available for stronger emphasis.",
  importLine: `import { LoadingIndicator } from "m3-expressive-react";`,
  spec: componentSpecs["loading-indicator"],
  variants: ["indeterminate", "determinate Circle-to-SoftBurst", "uncontained", "contained", "primary", "secondary", "tertiary", "error"],
  props: [
    { name: "size", type: `number`, default: `48`, description: "Square container size in px (official 48dp container)." },
    { name: "progress", type: `number`, description: "0\u20131 determinate progress. Values are clamped and morph the indicator from Circle at 0 to SoftBurst at 1." },
    { name: "active", type: `boolean`, default: `true`, description: "Indeterminate only. false pauses the morph + spin and rests at a circle at 38% opacity." },
    { name: "variant", type: `'uncontained' | 'contained'`, default: `'uncontained'`, description: "Official plain indicator or tonal 48dp container treatment." },
    { name: "color", type: `'primary' | 'secondary' | 'tertiary' | 'error'`, default: `'primary'`, description: "Container color; arcs use the matching on-container role." },
    { name: "ariaLabel", type: `string`, default: `'Loading'`, description: "Purpose label announced by the progressbar. Inactive indeterminate indicators leave the accessibility tree." }
  ],
  guidelines: {
    whenToUse: [
      "Use for full-screen or section-level loading moments that last more than a second.",
      "Use the Expressive morphing style to reinforce brand personality during waits.",
      "Pass progress from 0 to 1 when the task has measurable completion.",
      "Use `active={false}` only to pause an indeterminate indicator."
    ],
    anatomy: ["38dp indicator, uncontained by default", "Optional 48dp round tonal container", "Determinate: Circle \u2192 SoftBurst as progress moves from 0 to 1, with a 180\xB0 counterclockwise rotation", "Indeterminate: SoftBurst \u2192 Cookie9Sided \u2192 Pentagon \u2192 Pill \u2192 Sunny \u2192 Cookie4Sided \u2192 Oval", "Indeterminate rotation completes every 4666ms with a morph step every 650ms"],
    states: ["Determinate (progressbar from 0 to 1)", "Indeterminate (continuous rotation + shape morph)", "Reduced motion (static full-opacity result)", "Paused indeterminate (active=false \u2014 static circle at 38% opacity and removed from the accessibility tree)"],
    dos: [
      "Size it generously (48px+) \u2014 this indicator is meant to be seen",
      "Keep surrounding text calm and brief while it runs",
      "Match the container color to the page's tonal palette"
    ],
    donts: [
      "Don't use for micro-waits under one second \u2014 use CircularProgress",
      "Don't place on busy backgrounds that hide the shape morph",
      "Don't run multiple morphing loaders on one screen"
    ]
  },
  m3e: true,
  exampleCode: `<LoadingIndicator size={48} ariaLabel="Loading profile" />
<LoadingIndicator progress={0.5} ariaLabel="Uploading profile" />
<LoadingIndicator variant="contained" size={72} color="tertiary" ariaLabel="Loading media" />
<LoadingIndicator active={false} color="secondary" />`,
  related: ["circular-progress", "linear-progress"],
  demoName: "LoadingIndicatorDemo"
};
var menuMeta = {
  id: "menu",
  name: "Menu",
  category: "navigation",
  description: "Menus display choices on a temporary surface. The current segmented M3E style supports shaped 44dp items, selection shape morphs, supporting text, standard or vibrant colors, keyboard navigation, labels and dividers; the baseline 48dp list remains available.",
  importLine: `import { Menu } from "m3-expressive-react";`,
  spec: componentSpecs.menu,
  variants: ["segmented", "standard", "standard color", "vibrant color", "bottom-start", "bottom-end"],
  props: [
    { name: "trigger", type: `ReactNode`, description: "Clickable element the menu anchors to; cloned with the open handler." },
    { name: "items", type: `MenuItemData[]`, description: "Items can include selection, selected icon, supporting text, trailing icon, badge, checkbox/radio role, shortcut, disabled/destructive state, labels, dividers, and a recursive submenu." },
    { name: "open", type: `boolean`, description: "Controlled open state; omit for internal state." },
    { name: "onOpenChange", type: `(open: boolean) => void`, description: "Notifies open/close changes in controlled mode." },
    { name: "placement", type: `'bottom-start' | 'bottom-end'`, default: `'bottom-start'`, description: "Anchor edge and transform origin." },
    { name: "variant", type: `'segmented' | 'standard'`, default: `'segmented'`, description: "Current expressive segmented items or baseline M3 list items." },
    { name: "color", type: `'standard' | 'vibrant'`, default: `'standard'`, description: "Surface-based standard scheme or higher-emphasis tertiary scheme." }
  ],
  guidelines: {
    whenToUse: [
      "Use for overflow actions that don't fit an app bar or toolbar.",
      "Use for context actions on an item (edit, duplicate, delete).",
      "Group related commands with labels and dividers."
    ],
    anatomy: ["Container (baseline minimum width 112dp; surface-container, elevation 2, 4dp corners)", "Segmented items (44dp minimum, 2dp gaps, 12dp outer/4dp inner corners reset within each divider/label group, selected 12dp shape)", "Leading/trailing icons and optional badge", "Optional supporting text and shortcut", "Section labels, dividers, and cascading submenus"],
    states: ["Enabled (on-surface)", "Disabled (38% opacity)", "Destructive (error color)", "Hover (8% state layer)", "Focus (3px focus ring)", "Submenu open", "Keyboard (Arrow keys and Home/End move focus; submenu keys traverse levels; Escape/Tab close and restore trigger focus)"],
    dos: [
      "Keep menus to 5\u201310 items and keep submenu depth shallow",
      "Show keyboard shortcuts to teach power-user paths",
      "Reserve error color for genuinely destructive actions"
    ],
    donts: [
      "Don't use a menu as primary navigation \u2014 it hides destinations",
      "Don't put form inputs inside menu items",
      "Don't open menus on hover; require a click or tap"
    ]
  },
  exampleCode: `<Menu
  trigger={<Button variant="tonal" trailingIcon="arrow_drop_down">Options</Button>}
  items={[
    { icon: "edit", label: "Rename", shortcut: "F2" },
    { icon: "content_copy", label: "Duplicate" },
    { type: "divider" },
    { icon: "delete", label: "Delete", destructive: true },
  ]}
/>`,
  related: ["toolbar", "top-app-bar", "navigation-drawer"],
  demoName: "MenuDemo"
};
var bottomAppBarMeta = {
  id: "bottom-app-bar",
  name: "Bottom app bar",
  category: "navigation",
  description: "Bottom app bars hold key actions on small screens. The library keeps a 64dp flexible form with configurable arrangements as a compatibility surface; the 80dp standard baseline remains available. Every trailing action is a labeled action object, and an optional end FAB uses expressive press shape morphing.",
  importLine: `import { BottomAppBar } from "m3-expressive-react";`,
  spec: componentSpecs["bottom-app-bar"],
  variants: ["flexible \xB7 compatibility", "standard \xB7 baseline", "with end FAB", "center FAB \xB7 compatibility"],
  props: [
    { name: "navigationIcon", type: `{ icon: string; label?: string; onClick?: () => void }`, description: "Optional leading navigation icon (official anatomy item; typically the hamburger menu)." },
    { name: "actions", type: `{ icon: string; label?: string; onClick?: () => void }[]`, description: "Leading icon actions." },
    { name: "trailingActions", type: `{ icon: string; label: string; onClick?: () => void }[]`, description: "Trailing icon actions with required accessible labels and optional handlers." },
    { name: "fab", type: `{ icon: string; onClick?: () => void }`, description: "Optional FAB. Official placement is at the end." },
    { name: "variant", type: `'flexible' | 'standard'`, default: `'flexible'`, description: "64dp current flexible bar or 80dp baseline bar." },
    { name: "arrangement", type: `'start' | 'between' | 'around' | 'evenly' | 'fixed'`, default: `'between'`, description: "Compatibility distribution controls for the flexible variant. The baseline standard variant always uses start arrangement." },
    { name: "expandedHeight", type: `number`, description: "Custom flexible height. Any positive finite number is accepted." },
    { name: "scrollBehavior", type: `'none' | 'exit-always'`, default: `'none'`, description: "Official bottom app bar scroll policy. none keeps the bar visible; exit-always hides it while the page scrolls down and restores it on upward scroll." },
    { name: "scrollTargetRef", type: `RefObject<HTMLElement | null>`, description: "Scroll container for an opt-in bottom app bar scroll behavior; defaults to window." },
    { name: "fabPosition", type: `'end' | 'center'`, default: `'end'`, description: "End is official; center preserves the previous library layout." },
    { name: "fullWidth", type: `boolean`, default: `true`, description: "Stretch to container width." }
  ],
  guidelines: {
    whenToUse: [
      "Use on small screens to pair the primary action (FAB) with contextual actions.",
      "Use when the screen benefits from a persistent primary action reachable by thumb.",
      "Prefer a navigation bar when destinations \u2014 not actions \u2014 are the priority."
    ],
    anatomy: ["64dp flexible compatibility or 80dp baseline surface-container bar", "Navigation icon (optional, leading, 48dp target)", "Compatibility configurable distribution or baseline fixed start arrangement", "Optional end FAB", "Labeled trailing action objects"],
    states: ["Rest (surface-container, FAB elevation 3)", "FAB pressed (shape morph 16\u219228 + 95% scale)", "Icon hover (8% state layer)", "Focus (3px focus ring)"],
    dos: [
      "Keep 2\u20134 actions total so the FAB stays the visual anchor",
      "Use icons with clear, conventional meanings",
      "Give the bar breathing room from scrollable content"
    ],
    donts: [
      "Don't use both a bottom app bar and a navigation bar at the same height",
      "Don't place text buttons in the bar \u2014 icons only",
      "Don't exceed four actions plus the FAB"
    ]
  },
  exampleCode: `<BottomAppBar
  actions={[{ icon: "check_box", label: "Select" }, { icon: "edit", label: "Edit" }]}
  trailingActions={[{ icon: "more_vert", label: "More options" }]}
  fab={{ icon: "add" }}
/>`,
  related: ["top-app-bar", "fab", "navigation-bar"],
  demoName: "BottomAppBarDemo"
};
var extendedFabMeta = {
  id: "extended-fab",
  name: "Extended FAB",
  category: "actions",
  description: "An extended floating action button is a wider FAB that pairs an icon with a short text label, making the primary action unmistakable on wide screens and content-heavy layouts.",
  importLine: `import { ExtendedFab } from "m3-expressive-react";`,
  spec: componentSpecs["extended-fab"],
  variants: ["primary-container \xB7 default", "secondary-container", "tertiary-container", "primary", "secondary", "tertiary", "surface \xB7 legacy"],
  props: [
    { name: "color", type: `FabColor`, default: `'primary-container'`, description: "Defaults to the current primary-container role. Solid and other container roles remain available; surface is a legacy compatibility role." },
    { name: "size", type: `'small' | 'medium' | 'large'`, default: `'small'`, description: "Official 56 / 80 / 96dp extended FAB sizes." },
    { name: "icon", type: `string`, description: "Optional leading Material Symbols ligature name." },
    { name: "label", type: `string`, description: "Short action label, e.g. 'Compose'." },
    { name: "lowered", type: `boolean`, default: `false`, description: "Uses elevation 1 instead of 3." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables interaction: container drops to on-surface 12%, content to 38%, elevation to 0." },
    { name: "onClick", type: `() => void`, description: "Handler fired when the FAB is activated." }
  ],
  guidelines: {
    whenToUse: [
      "Use an extended FAB when a plain FAB's icon doesn't clearly communicate the action.",
      "Use it for the most common action on screens with room for a wider element, like 'Start tour' or 'New event'.",
      "Prefer an icon-only FAB on compact screens; swap to extended on tablets and desktop."
    ],
    anatomy: ["56/80/96dp tonal container with 16/20/28dp corners", "Elevation shadow (level 3, or 1 when lowered)", "Optional 24/28/32dp Material Symbol", "Size-matched label type and 8/16/20dp gap", "State layer + ripple"],
    states: ["Enabled (elevation 3)", "Hover (elevation 4, 103% scale)", "Focus (3px focus ring)", "Pressed (94% scale spring, elevation 4)", "Disabled (on-surface 12% container / 38% content, no elevation)"],
    dos: [
      "Keep the label to one or two words",
      "Use the same color role as the screen's FAB if both appear in a flow",
      "Anchor it in the bottom-right corner like a standard FAB"
    ],
    donts: [
      "Don't use an extended FAB and an icon-only FAB for the same action on one screen",
      "Don't use it for secondary or destructive actions",
      "Don't wrap long labels \u2014 use a regular button instead"
    ]
  },
  exampleCode: `<ExtendedFab icon="edit" label="Compose" onClick={compose} />
<ExtendedFab color="tertiary" icon="directions" label="Navigate" />
<ExtendedFab color="surface" icon="filter" label="Legacy filter" lowered />`,
  related: ["fab", "fab-menu", "button", "icon-button"],
  demoName: "ExtendedFabDemo"
};
var circularProgressMeta = {
  id: "circular-progress",
  name: "Circular progress",
  category: "communication",
  description: "Circular progress indicators display progress by animating an arc along a circular track, for compact or inline loading states.",
  importLine: `import { CircularProgress } from "m3-expressive-react";`,
  spec: componentSpecs["circular-progress"],
  variants: ["flat determinate", "flat indeterminate", "wavy determinate", "wavy indeterminate"],
  props: [
    { name: "value", type: `number`, description: "0\u2013100 progress. Omit for indeterminate." },
    { name: "size", type: `number`, description: "Outer diameter. Defaults to 40dp flat or 48dp wavy." },
    { name: "thickness", type: `number`, default: `4`, description: "Indicator stroke width in px." },
    { name: "wavy", type: `boolean`, default: `false`, description: "Use the M3E circular waveform. The old wavey spelling remains as a deprecated alias." },
    { name: "color", type: `'primary' | 'secondary' | 'tertiary' | 'error'`, default: `'primary'`, description: "Active indicator color role." },
    { name: "ariaLabel", type: `string`, default: `'Loading'`, description: "Accessible name for the progressbar role." }
  ],
  guidelines: {
    whenToUse: [
      "Use circular indicators where space is tight: buttons, list rows, toolbars.",
      "Use determinate when a measurable task (e.g. file upload) has clear completion.",
      "Use indeterminate when the wait length is unknown."
    ],
    anatomy: ["40dp flat or 48dp wavy circular geometry", "Determinate active indicator and secondary-container track separated by real transparent 4dp gaps", "Indeterminate active arc without a visible track", "No linear-style stop dot"],
    states: ["Determinate (spring-animated active arc plus separated track)", "Indeterminate (arc grows to ~270\xB0 and contracts while the ring rotates)"],
    dos: [
      "Match indicator size to its context (small inline spinners in buttons)",
      "Keep at least 4px clearance so round caps don't clip",
      "Pair indeterminate spinners with a concise status message"
    ],
    donts: [
      "Don't place two competing spinners next to each other",
      "Don't use circular progress as decoration",
      "Don't block the whole screen for background tasks \u2014 surface progress inline"
    ]
  },
  exampleCode: `<CircularProgress value={75} />
<CircularProgress size={32} thickness={3} color="secondary" />
<CircularProgress color="error" />`,
  related: ["linear-progress", "loading-indicator", "button"],
  demoName: "CircularProgressDemo"
};
var badgeMeta = {
  id: "badge",
  name: "Badge",
  category: "communication",
  description: "Badges are small status descriptors for UI elements \u2014 a count or dot anchored to an icon, avatar, or navigation item that indicates it requires attention.",
  importLine: `import { Badge } from "m3-expressive-react";`,
  spec: componentSpecs.badge,
  variants: ["error", "primary", "tertiary", "dot"],
  props: [
    { name: "value", type: `number | string`, description: "Count or short label to show, limited to four display characters. Numbers above max collapse to max+." },
    { name: "showDot", type: `boolean`, default: `false`, description: "Show a 6px dot instead of a value. Its meaning is still attached to the destination for assistive technology." },
    { name: "children", type: `React.ReactNode`, description: "Anchor element the badge pins to logical top-end and mirrors in RTL." },
    { name: "color", type: `'error' | 'primary' | 'tertiary'`, default: `'error'`, description: "Badge color role." },
    { name: "max", type: `number`, default: `999`, description: "Maximum count before max+; capped at 999 to preserve the official four-character limit." },
    { name: "ariaLabel", type: `string`, description: "Concise badge meaning attached to the destination through aria-describedby." }
  ],
  guidelines: {
    whenToUse: [
      "Use a large badge with a number to indicate unread items on icons or navigation destinations.",
      "Use a small dot when the exact count is irrelevant but attention is needed.",
      "Anchor badges to the logical top-end of icons and avatars."
    ],
    anatomy: ["Anchor element (icon, avatar, tab)", "Badge container (16px min-width pill or 6px dot) pinned to logical top-end and mirrored in RTL; text badge overhangs 4px inline-end / 2px top", "Value text (label-small) or dot fill"],
    states: ["Default", "Updated (value change pops with the bouncy spring)"],
    dos: [
      "Use large badges with counts for email, chat, and cart-style surfaces",
      "Switch to a dot once counts exceed what users can act on",
      'Keep badge text to four characters or fewer (e.g. "99+")'
    ],
    donts: [
      "Don't use badges for critical errors \u2014 use a banner or dialog",
      "Don't place badges on text-only actions or buttons with labels",
      "Don't animate a badge on every update in rapidly-changing lists"
    ]
  },
  exampleCode: `<Badge value={12} max={99} ariaLabel="12 unread messages">
  <IconButton icon="inbox" aria-label="Inbox" />
</Badge>
<Badge showDot color="tertiary" ariaLabel="New activity">
  <MaterialSymbol icon="notifications" />
</Badge>
<Badge value={250} color="primary" ariaLabel="250 items in cart">
  <IconButton icon="shopping_cart" aria-label="Cart" />
</Badge>`,
  related: ["icon-button", "chip", "navigation-bar"],
  demoName: "BadgeDemo"
};
var searchBarMeta = {
  id: "search-bar",
  name: "SearchBar",
  category: "textinput",
  description: "A search bar is a rounded text field dedicated to search queries. The official default is 56dp high, 360\u2013720dp wide, and uses 24dp horizontal padding; compact and large sizes are library extensions.",
  importLine: `import { SearchBar } from "m3-expressive-react";`,
  spec: componentSpecs["search-bar"],
  variants: ["md \xB7 official", "sm \xB7 extension", "lg \xB7 extension"],
  props: [
    { name: "value", type: `string`, description: "Controlled query text." },
    { name: "onChange", type: `(e: ChangeEvent<HTMLInputElement>) => void`, description: "Change handler for the query." },
    { name: "placeholder", type: `string`, default: `'Search'`, description: "Hint text shown when empty." },
    { name: "size", type: `'sm' | 'md' | 'lg'`, default: `'md'`, description: "md is the official 56dp search bar. sm=40 and lg=72 are library extensions." },
    { name: "leadingIcon", type: `string`, default: `'search'`, description: "Leading Material Symbol name." },
    { name: "trailingIcons", type: `Array<string | SearchBarTrailingAction>`, description: "Up to two decorative symbols or real actions with an accessible label and handler." },
    { name: "onTrailingIconClick", type: `(icon: string, index: number) => void`, description: "Compatibility handler that makes string trailing icons actionable." },
    { name: "onSubmit", type: `() => void`, description: "Invoked when the user presses Enter." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables the bar (38% opacity)." }
  ],
  guidelines: {
    whenToUse: [
      "Use at the top of a screen or list to search within its content.",
      "Use trailing icons for contextual actions like voice search or filters.",
      "Use the large size when search is the primary task of the screen."
    ],
    anatomy: ["56dp rounded-full container, 360\u2013720dp wide", "24dp horizontal padding", "Leading search icon", "Query input (body-large)", "Optional trailing icon buttons (24dp icons, \u226548dp targets)"],
    states: ["Enabled", "Focused (official level-0 elevation)", "Hover (state layer)", "Disabled"],
    dos: [
      "Keep the placeholder short \u2014 the query area is the label",
      "Submit on Enter and keep results immediately visible",
      "Offer a clear/cancel affordance once a query exists"
    ],
    donts: [
      "Don't use a search bar for structured filtering \u2014 use selects or chips",
      "Don't hide the submit action behind a delay or extra click",
      "Don't stack multiple search bars on one screen"
    ]
  },
  exampleCode: `<SearchBar
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  trailingIcons={[
    { icon: "mic", label: "Voice search", onClick: startVoiceSearch },
    { icon: "close", label: "Clear search", onClick: clearSearch },
  ]}
  onSubmit={() => runSearch(query)}
  fullWidth
/>`,
  related: ["text-field", "autocomplete"],
  demoName: "SearchBarDemo"
};
var searchViewMeta = {
  id: "search-view",
  name: "SearchView",
  category: "textinput",
  description: "The expanded companion of the search bar: full-screen uses the current contained 56dp focused bar on surface-container-low; docked uses a 360\u2013720dp floating result surface over a scrim.",
  importLine: `import { SearchView } from "m3-expressive-react";`,
  spec: componentSpecs["search-view"],
  variants: ["full-screen", "docked"],
  props: [
    { name: "open", type: `boolean`, description: "Whether the search view is shown." },
    { name: "onOpenChange", type: `(open: boolean) => void`, description: "Called when the view requests to open or close (Escape, leading icon)." },
    { name: "mode", type: `'full-screen' | 'docked'`, default: `'full-screen'`, description: "Full-screen replaces the viewport; docked floats over a dismissible scrim." },
    { name: "placeholder", type: `string`, default: `'Search'`, description: "Hint text, also used as the accessible dialog label." },
    { name: "value", type: `string`, description: "Controlled query text." },
    { name: "defaultValue", type: `string`, description: "Initial query for uncontrolled usage." },
    { name: "onValueChange", type: `(v: string) => void`, description: "Called on every query edit, clear, or recent-search selection." },
    { name: "recentSearches", type: `string[]`, description: "Recent-search suggestion rows, shown while the query is empty." },
    { name: "onRecentSelect", type: `(q: string) => void`, description: "Invoked when a recent search is chosen (click or Enter)." },
    { name: "onRecentRemove", type: `(q: string) => void`, description: "Trailing close icon per row; omit to hide the removal affordance." },
    { name: "leadingIcon", type: `ReactNode`, default: `arrow_back icon`, description: "Leading navigation icon node; clicking it closes the view." },
    { name: "trailingActions", type: `ReactNode`, description: "Extra trailing controls rendered after the clear button." },
    { name: "children", type: `ReactNode`, description: "Results content below the search header; hidden while recent suggestions show." },
    { name: "autoFocus", type: `boolean`, default: `true`, description: "Focus the query input when either view opens." }
  ],
  guidelines: {
    whenToUse: [
      "Use for larger, richer search experiences \u2014 query building, filters and result sets that need room.",
      "Use as the expanded companion of a search bar: tapping the bar opens the view over the UI.",
      "Use recent-search rows to reduce retyping for repeat queries."
    ],
    anatomy: ["Contained 56dp focused bar without a baseline divider on full-screen surface-container-low", "Docked surface (360\u2013720dp wide, min 240dp high, max two-thirds viewport height, 28dp corners, elevation 3) over a 32% scrim", "Leading navigation icon", "Query input", "48dp trailing targets", "Docked divider", "Scrollable results or recent searches"],
    states: ["Rest (elevation 0 \u2014 the view replaces the surface)", "Input focused (caret + on-surface text)", "Suggestion rows: combobox/listbox semantics only while the recent-search list exists", "Docked divider separates input from content"],
    dos: [
      "Keep the current contained full-screen bar at 56dp without the old baseline divider.",
      "Provide an obvious way out \u2014 a leading arrow-back icon that closes, plus Escape in full-screen mode.",
      "Restore focus to the trigger when the full-screen view closes.",
      "Keep recent rows keyboard-reachable: ArrowUp/ArrowDown walk the list, Enter selects."
    ],
    donts: [
      "Don't stack a scrim under the full-screen view; use the scrim only for docked mode.",
      "Don't show suggestion rows and results at once; results take over once a query exists.",
      "Don't use a search view for structured filtering \u2014 it is free-form query entry."
    ]
  },
  exampleCode: `const [open, setOpen] = React.useState(false);
<SearchBar
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onFocus={() => setOpen(true)}
/>
<SearchView
  open={open}
  onOpenChange={setOpen}
  recentSearches={recents}
  onRecentSelect={(q) => setQuery(q)}
  onRecentRemove={(q) => setRecents(recents.filter((r) => r !== q))}
>
  <ProductResults query={query} />
</SearchView>`,
  related: ["search-bar", "autocomplete"],
  demoName: "SearchViewDemo"
};
var splitButtonMeta = {
  id: "split-button",
  name: "Split button",
  category: "actions",
  description: "New in Material 3 Expressive: a split button joins a primary action with an arrow segment that opens a dropdown of related actions, saving space while keeping the default action one tap away.",
  importLine: `import { SplitButton } from "m3-expressive-react";`,
  spec: componentSpecs["split-button"],
  variants: ["filled", "tonal", "outlined", "elevated"],
  props: [
    { name: "label", type: `string`, description: "Optional visible label. Omit for the official icon-only leading segment." },
    { name: "icon", type: `string`, description: "Optional leading Material Symbol on the primary segment." },
    { name: "ariaLabel", type: `string`, description: "Required accessible name when the primary segment is icon-only." },
    { name: "onClick", type: `() => void`, description: "Handler fired by the primary segment." },
    { name: "items", type: `{ label: string; icon?: string; onClick?: () => void }[]`, description: "Dropdown menu actions; the menu closes after one is chosen." },
    { name: "variant", type: `'filled' | 'tonal' | 'outlined' | 'elevated'`, default: `'filled'`, description: "Official visual emphasis of the two-segment container." },
    { name: "size", type: `SplitButtonSize`, default: `'sm'`, description: "Official 32 / 40 / 56 / 96 / 136dp size scale. Long size names remain aliases." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables both segments, dims to 38% opacity." }
  ],
  guidelines: {
    whenToUse: [
      "Use a split button when one action is far more common than its alternatives, like 'Send' vs 'Send later'.",
      "Use it in toolbars where several related commands must share one slot.",
      "Use the outlined variant when the split button sits next to filled buttons of higher emphasis."
    ],
    anatomy: ["Two separated round segments with a 2dp gap", "Primary action segment with optional leading icon", "Dedicated dropdown icon offset by -1/-1/-2/-3/-6dp for xs/sm/md/lg/xl", "Dropdown menu with 24dp popup icons (surface-container, elevation 2, 4dp corners, 48dp items)"],
    states: ["Enabled", "Hover (8% state layer per segment)", "Focus (3px focus ring)", "Pressed (size-specific shape morph on the active half)", "Menu open (arrow rotated, fade/scale menu, Arrow/Home/End navigation)", "Disabled (tokenized container and content roles)"],
    dos: [
      "Keep the primary action and menu items closely related",
      "Close the menu after a choice is made",
      "Order menu items by expected frequency of use"
    ],
    donts: [
      "Don't nest submenus inside the dropdown",
      "Don't overload the menu \u2014 keep it to 3\u20137 items",
      "Don't use a split button when the action has no meaningful default"
    ]
  },
  exampleCode: `<SplitButton
  label="Export"
  onClick={() => exportAs("pdf")}
  items={[
    { label: "Export as PDF", icon: "picture_as_pdf", onClick: () => exportAs("pdf") },
    { label: "Export as DOCX", icon: "description", onClick: () => exportAs("docx") },
  ]}
/>`,
  m3e: true,
  related: ["button", "fab-menu", "button-group"],
  demoName: "SplitButtonDemo"
};
var switchMeta = {
  id: "switch",
  name: "Switch",
  category: "selection",
  description: "A switch toggles the state of a single setting on or off, committing the change immediately.",
  importLine: `import { Switch } from "m3-expressive-react";`,
  spec: componentSpecs.switch,
  variants: ["checked", "unchecked"],
  props: [
    { name: "checked", type: `boolean`, default: `false`, description: "Whether the switch is on." },
    { name: "defaultChecked", type: `boolean`, default: `false`, description: "Initial state for uncontrolled use." },
    { name: "onCheckedChange", type: `(checked: boolean) => void`, description: "Called with the next state." },
    { name: "showIcon", type: `boolean`, default: `false`, description: "Show the optional checked thumb icon." },
    { name: "showUnselectedIcon", type: `boolean`, default: `false`, description: "Show the official optional close icon in the unchecked thumb." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables the switch (38% opacity)." },
    { name: "name / form / value / required / readOnly", type: `native form props`, description: "Forwarded through the Base UI hidden form input." }
  ],
  guidelines: {
    whenToUse: [
      "Use for a single setting that takes effect immediately.",
      "Use in settings rows with a label on the left and the switch on the right.",
      "Use instead of a checkbox when the change applies instantly."
    ],
    anatomy: ["52\xD732 rounded-full visual track", "40dp circular state layer centered on the thumb", "Thumb (16px off, 24px on or icon-bearing off, 28px pressed)", "Optional checked and unchecked glyphs", "Hidden named form input"],
    states: ["Off (outline track, outline thumb at 4dp inset; optional close icon)", "On (primary track, on-primary thumb; optional check icon)", "Focus (3px primary ring)", "Pressed (thumb grows to 28px)", "Disabled (token-specific track, thumb, and icon opacity)"],
    dos: [
      "Label the setting, not the state \u2014 'Wi-Fi', not 'On'",
      "Apply the change immediately; don't require a save step",
      "Keep one switch per row in lists"
    ],
    donts: [
      "Don't use a switch for actions \u2014 use a button",
      "Don't stack switches where checkboxes in a list would be clearer",
      "Don't require an extra confirmation for low-risk toggles"
    ]
  },
  exampleCode: `<Switch
  aria-label="Wi-Fi"
  checked={wifi}
  onCheckedChange={setWifi}
/>`,
  related: ["checkbox", "radio", "slider"],
  demoName: "SwitchDemo"
};
var timePickerMeta = {
  id: "time-picker",
  name: "Time Picker",
  category: "selection",
  description: "Time pickers select a time through a dial, keyboard input, or three-row scroll layout. The official modal stages changes and provides dismiss/confirm actions plus a dial/input/scroll toggle; inline layouts remain compatible.",
  importLine: `import { TimePicker } from "m3-expressive-react";`,
  spec: componentSpecs["time-picker"],
  variants: ["modal", "dial \xB7 inline", "horizontal \xB7 inline", "input \xB7 inline", "scroll \xB7 inline", "12-hour", "24-hour-double-ring"],
  props: [
    { name: "value", type: `{ hour: number; minute: number }`, description: "Controlled selected time (hour 0\u201323, minute 0\u201359)." },
    { name: "defaultValue", type: `{ hour: number; minute: number }`, default: `{ hour: 0, minute: 0 }`, description: "Initial value for uncontrolled use." },
    { name: "onChange", type: `(t: { hour: number; minute: number }) => void`, description: "Fires on any dial, readout or meridiem change." },
    { name: "displayMode", type: `'dial' | 'horizontal' | 'input' | 'scroll'`, default: `'dial'`, description: "Official presentation. Dial remains the backward-compatible default." },
    { name: "presentation", type: `'inline' | 'modal'`, default: `'inline'`, description: "Compatibility inline layout or official staged modal dialog." },
    { name: "open / onOpenChange", type: `boolean / (open: boolean) => void`, description: "Modal visibility contract." },
    { name: "confirmLabel / dismissLabel", type: `string`, default: `'OK' / 'Cancel'`, description: "Modal action labels." },
    { name: "onConfirm / onDismiss", type: `callbacks`, description: "Modal completion callbacks." },
    { name: "use24h", type: `boolean`, description: "Overrides the system hour-cycle preference. In dial modes, 24-hour time uses the official double-ring face." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." },
    { name: "className", type: `string`, description: "Extra classes for the container." }
  ],
  guidelines: {
    whenToUse: [
      "Use an inline time picker when picking a time is the primary in-page task.",
      "Use with a date picker for scheduling flows.",
      "Use the 24h readout for locales or domains that require it."
    ],
    anatomy: ["Modal surface with 48dp mode and action targets", "Vertical or horizontal analog layout with a 256dp dial", "24-hour 00\u201311 outer / 12\u201323 inner double ring at 101dp and 69dp radii", "Validated numeric input fields", "Three-row scroll fields", "Shared staged hour/minute value"],
    states: ["Hour editing", "Minute editing", "Pointer drag or keyboard dial selection", "Validated intermediate text input", "Scroll snap selection", "12-hour meridiem", "24-hour 00\u201311 outer / 12\u201323 inner double ring", "Modal staged selection", "Controlled or uncontrolled value"],
    dos: [
      "Show the current selection in the readout while editing the other segment",
      "Use the 24h double-ring dial for locales that expect it; hours 00\u201311 stay outside and 12\u201323 stay inside",
      "Keep the hand and pill in sync with the selected value",
      "Use input for keyboard-heavy tasks and scroll for touch wheel selection"
    ],
    donts: [
      "Don't hide the AM/PM state when the readout shows 12-hour values",
      "Don't keep the 12h single ring when use24h is set \u2014 the official face carries both half-days on two rings",
      "Don't make the dial smaller than 256px \u2014 numbers need 48px hit areas",
      "Don't use the time picker for durations"
    ]
  },
  exampleCode: `<TimePicker
  value={{ hour: 10, minute: 30 }}
  onChange={setTime}
/>
<TimePicker displayMode="horizontal" value={time} onChange={setTime} />
<TimePicker displayMode="input" defaultValue={{ hour: 9, minute: 0 }} />
<TimePicker displayMode="scroll" use24h value={time} onChange={setTime} />
<TimePicker presentation="modal" open={open} onOpenChange={setOpen} value={time} onChange={setTime} />`,
  related: ["date-picker", "card", "bottom-sheet"],
  demoName: "TimePickerDemo"
};
var radioMeta = {
  id: "radio",
  name: "Radio",
  category: "selection",
  description: "Radio buttons let users select exactly one option from a set of mutually exclusive choices.",
  importLine: `import { Radio, RadioGroup } from "m3-expressive-react";`,
  spec: componentSpecs.radio,
  variants: ["checked", "unchecked"],
  props: [
    { name: "checked", type: `boolean`, default: `false`, description: "Whether this radio is selected." },
    { name: "onChange", type: `() => void`, description: "Called when the radio is clicked." },
    { name: "label", type: `string`, description: "Label rendered beside the circle." },
    { name: "value", type: `string`, description: "Stable business value used by RadioGroup and native form submission." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables the control (38% opacity)." },
    { name: "error", type: `boolean`, default: `false`, description: "Applies the error color to the ring and inner dot." },
    { name: "RadioGroup value / defaultValue / onValueChange", type: `controlled or uncontrolled group props`, description: "Official group selection contract with arrow-key navigation." },
    { name: "RadioGroup name / form / required / readOnly", type: `native form props`, description: "Group-level form semantics." }
  ],
  guidelines: {
    whenToUse: [
      "Use for mutually exclusive options where exactly one can be selected.",
      "Use when all options should be visible up front (vs. a dropdown).",
      "Preselect the most common option instead of leaving the group empty."
    ],
    anatomy: ["48px touch target", "40dp circular state layer isolated from the label", "20px ring (2px border)", "Inner dot (springs in when selected)", "Optional label (body-large)"],
    states: ["Enabled", "Hover (state layer)", "Pressed (95% scale)", "Selected (primary ring + dot)", "Disabled (38% opacity)"],
    dos: [
      "Group related Radios in a RadioGroup so arrow keys move and select within the set",
      "Keep option labels short and parallel",
      "Order options logically (frequency, size, risk\u2026)"
    ],
    donts: [
      "Don't use radios for multi-select \u2014 use checkboxes",
      "Don't add an 'apply' step; radios commit as a group on submit",
      "Don't use a radio to toggle something on/off \u2014 use a switch"
    ]
  },
  exampleCode: `<RadioGroup name="plan" defaultValue="pro" onValueChange={setPlan} label="Plan">
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" />
</RadioGroup>`,
  related: ["checkbox", "switch", "slider"],
  demoName: "RadioDemo"
};
var toolbarMeta = {
  id: "toolbar",
  name: "Toolbar",
  category: "navigation",
  description: "New in Material 3 Expressive: a 64dp pill of contextual actions with 8dp internal horizontal padding and at least 16dp outside padding. Toggle actions always expose aria-pressed=true or false. The dockable variant morphs between a horizontal pill and a square full-width docked bar.",
  importLine: `import { Toolbar } from "m3-expressive-react";`,
  spec: componentSpecs.toolbar,
  m3e: true,
  variants: ["horizontal floating", "vertical floating", "dockable", "standard", "vibrant"],
  props: [
    { name: "icons", type: `{ icon: string; label?: string; onClick?: () => void; active?: boolean }[]`, description: "Optional toolbar actions; active items get a tinted pill and filled icon." },
    { name: "children", type: `React.ReactNode`, description: "Arbitrary toolbar controls, including Buttons and text fields." },
    { name: "fab", type: `React.ReactNode`, description: "Optional FAB at the trailing edge of a horizontal toolbar." },
    { name: "variant", type: `'floating' | 'dockable'`, default: `'floating'`, description: "Floating hovers over content; dockable toggles pill \u2194 docked bar via the docked prop." },
    { name: "color", type: `ToolbarColor`, default: `'standard'`, description: "Official standard or vibrant mapping. surface/primary/secondary/tertiary remain compatibility aliases." },
    { name: "position", type: `'top' | 'bottom' | 'left' | 'right'`, default: `'bottom'`, description: "Floating placement edge inside a positioned ancestor." },
    { name: "orientation", type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: "Floating toolbar axis and keyboard arrow direction." },
    { name: "width", type: `number`, default: `560`, description: "Pill width in px for the floating variant." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch pill/bar to container width." },
    { name: "docked", type: `boolean`, default: `false`, description: "Dockable variant: true = square corners and full width." }
  ],
  guidelines: {
    whenToUse: [
      "Use to expose 3\u20135 contextual actions tied to the visible content (M3 Expressive pattern).",
      "Use floating for immersive editors and media viewers; dockable for tool palettes that pin during work.",
      "Pick a container color that complements the content without hiding it."
    ],
    anatomy: ["At least 16dp outside padding from the parent edge", "Pill container (64dp cross-axis, full corners) or 64dp docked bar", "48dp icon buttons with state layer", "Standard selected tint or vibrant surface-container selected pill"],
    states: ["Rest (standard surface-container or vibrant primary-container)", "Toggle unselected (aria-pressed=false)", "Toggle selected (aria-pressed=true with standard tint or vibrant surface-container/on-surface)", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (ripple, expressive scale)"],
    dos: [
      "Group actions the user needs for the current selection",
      "Use the active pill to mark toggled modes (e.g. grid on)",
      "Let the dockable bar pin when the user starts a task, and float again when done"
    ],
    donts: [
      "Don't exceed five icons \u2014 move overflow into a menu",
      "Don't cover critical content with the floating pill",
      "Don't mix more than one toolbar color on the same screen"
    ]
  },
  exampleCode: `// Relative parent; the floating toolbar positions itself
<div className="relative h-64 overflow-hidden">
  <Toolbar
    icons={[
      { icon: "arrow_back", label: "Back" },
      { icon: "grid_view", label: "Grid", active: true },
      { icon: "delete", label: "Delete" },
    ]}
    color="vibrant"
  />
</div>`,
  related: ["top-app-bar", "bottom-app-bar", "menu"],
  demoName: "ToolbarDemo"
};
var iconButtonMeta = {
  id: "icon-button",
  name: "Icon button",
  category: "actions",
  description: "Icon buttons let people take a compact action with a single tap, using an icon as the label. Toggleable icon buttons flip between unselected and selected states with a springy M3 Expressive pop.",
  importLine: `import { IconButton } from "m3-expressive-react";`,
  spec: componentSpecs["icon-button"],
  variants: ["standard", "filled", "tonal", "outlined"],
  props: [
    { name: "variant", type: `'standard' | 'filled' | 'tonal' | 'outlined'`, default: `'filled'`, description: "Visual emphasis of the icon button. Pass standard explicitly for a containerless app-bar action." },
    { name: "size", type: `IconButtonSize`, default: `'sm'`, description: "Official heights: 32 / 40 / 56 / 96 / 136dp; long-form aliases are accepted." },
    { name: "width", type: `'narrow' | 'standard' | 'wide'`, default: `'standard'`, description: "Official width configuration for the selected size." },
    { name: "shape", type: `'round' | 'square'`, default: `'round'`, description: "Round toggles to square when selected; square toggles to round." },
    { name: "icon", type: `string`, description: "Material Symbols ligature name, e.g. 'favorite'." },
    { name: "toggleable", type: `boolean`, default: `false`, description: "Turns the button into a two-state toggle (e.g. bookmark, mute)." },
    { name: "selected", type: `boolean`, description: "Controlled selected state; omit to let the button manage its own state." },
    { name: "onSelectedChange", type: `(selected: boolean) => void`, description: "Called with the next selected state when toggled." },
    { name: "aria-label", type: `string`, description: "Required for accessibility \u2014 the icon alone has no text alternative." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables interaction: filled containers use on-surface 10%, outlined borders 12%, and content 38%." }
  ],
  guidelines: {
    whenToUse: [
      "Use an icon button when horizontal space is limited and the icon alone clearly communicates the action.",
      "Use the filled or tonal variant for high-emphasis compact actions.",
      "Use toggleable for on/off state actions such as favorite, bookmark, mute, or pin.",
      "Use standard inside app bars and toolbars where several actions sit side by side."
    ],
    anatomy: ["Five heights with narrow/standard/wide widths", "Round or square container with selected shape morph", "Size-matched Material Symbol icon", "48dp minimum touch target for small visual sizes"],
    states: ["Enabled", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (96% scale spring)", "Selected (filled primary/on-primary, tonal secondary/on-secondary, outlined inverse-surface/inverse-on-surface)", "Unselected filled toggle (surface-container/on-surface-variant)", "Disabled (10% filled container / 12% outline / 38% content)"],
    dos: [
      "Always provide an aria-label or tooltip \u2014 the icon is the only label",
      "Pick icons with a single, well-understood meaning",
      "Keep filled icon buttons to the most important action in a toolbar"
    ],
    donts: [
      "Don't use an icon-only button for destructive or irreversible actions without a confirmation",
      "Don't combine more than one filled icon button in the same toolbar region",
      "Don't animate the icon glyph itself in a way that changes its meaning"
    ]
  },
  exampleCode: `<IconButton icon="settings" aria-label="Settings" />
<IconButton variant="filled" icon="add" aria-label="Add" />
<IconButton
  toggleable
  icon={liked ? "favorite" : "favorite_border"}
  selected={liked}
  onSelectedChange={setLiked}
  aria-label="Like"
/>
<IconButton variant="outlined" size="lg" icon="delete" aria-label="Delete" />`,
  related: ["button", "fab", "button-group"],
  demoName: "IconButtonDemo"
};
var tooltipMeta = {
  id: "tooltip",
  name: "Tooltip",
  category: "communication",
  description: "Tooltips display informative text when users hover over, focus on, or long-press an element \u2014 a compact plain label or a rich card with title and action.",
  importLine: `import { Tooltip } from "m3-expressive-react";`,
  spec: componentSpecs.tooltip,
  variants: ["plain", "rich"],
  props: [
    { name: "content", type: `React.ReactNode`, description: "Tooltip text or body content." },
    { name: "rich", type: `boolean`, default: `false`, description: "Use the rich layout with title and up to two actions." },
    { name: "title", type: `string`, description: "Rich only \u2014 bold title above the content." },
    { name: "actionLabel", type: `string`, description: "Rich only \u2014 optional action label." },
    { name: "onAction", type: `() => void`, description: "Rich only \u2014 action press handler." },
    { name: "actions", type: `TooltipAction[]`, description: "Rich only. Up to two short actions." },
    { name: "showCaret", type: `boolean`, default: `false`, description: "Opt in to the optional caret." },
    { name: "persistent", type: `boolean`, default: `false`, description: "Rich only. Open on click/tap and stay open after leaving the target until another interaction." },
    { name: "defaultOpen", type: `boolean`, default: `false`, description: "Persistent rich only. Show on page load for new-feature education." },
    { name: "placement", type: `'top' | 'bottom' | 'left' | 'right' | 'start' | 'end'`, description: "Preferred side. Plain defaults top; rich defaults bottom." },
    { name: "align", type: `'start' | 'center' | 'end'`, description: "Anchor alignment. Plain defaults center; rich defaults end for the bottom-right placement." },
    { name: "children", type: `React.ReactNode`, description: "Trigger element." }
  ],
  guidelines: {
    whenToUse: [
      "Label icon-only buttons and controls that lack visible text.",
      "Show helpful context on hover without taking permanent space.",
      "Use rich tooltips for icon actions needing explanation plus a learn-more link."
    ],
    anatomy: ["Trigger linked through aria-describedby", "Plain inverse-surface label without a caret by default", "Rich surface-container card at bottom-end by default with title, body, and up to two actions", "Optional 16\xD78dp caret"],
    states: ["Hidden", "Entering (fade + scale after a 500ms show delay)", "Transient (hover, focus, or long-press; hides 1.5 seconds after leaving)", "Persistent rich (click/tap or page-load; remains after pointer exit until another interaction)"],
    dos: [
      "Keep plain tooltips to a single short phrase",
      "Trigger on hover, keyboard focus, and touch long-press",
      "Choose a preferred placement and let collision handling keep it in the viewport",
      "Use persistent rich tooltips only for click/tap or page-load education"
    ],
    donts: [
      "Don't put essential information only in a tooltip \u2014 it must be discoverable without hover",
      "Don't use tooltips on disabled elements",
      "Don't nest interactive content in plain tooltips"
    ]
  },
  exampleCode: `<Tooltip content="Add to favorites">
  <Button variant="text" icon="favorite" />
</Tooltip>
<Tooltip rich persistent title="Attach file" content="Attach documents, images, or videos up to 25 MB per file." actionLabel="Learn more" showCaret>
  <Button variant="outlined" icon="attach_file">Attach</Button>
</Tooltip>`,
  related: ["snackbar", "icon-button", "menu"],
  demoName: "TooltipDemo"
};
var fabMenuMeta = {
  id: "fab-menu",
  name: "Fab menu",
  category: "actions",
  description: "New in Material 3 Expressive: a separate 56dp container-colored close button reveals a staggered cascade of 56dp solid-color extended action buttons. Horizontal and docked layouts remain documented library extensions.",
  importLine: `import { FabMenu } from "m3-expressive-react";`,
  spec: componentSpecs["fab-menu"],
  variants: ["primary", "secondary", "tertiary", "primary-container", "secondary-container", "tertiary-container", "surface", "docked \xB7 screen", "docked \xB7 bottom app bar"],
  props: [
    { name: "actions", type: `FabMenuAction[]`, description: "Quick actions with icon, optional visible label, ariaLabel, and handler." },
    { name: "direction", type: `'horizontal' | 'vertical'`, default: `'vertical'`, description: "Expansion direction of the action row/column. Ignored while docked \u2014 docking fixes the cascade (screen = vertical above, bottom app bar = horizontal row)." },
    { name: "docked", type: `boolean`, default: `false`, description: "Dock the menu to the bottom edge: closed FAB sits flush bottom-center; when open the FAB's bottom corners morph square (16px \u2192 0 shape morph) and the actions cascade above/on the bar." },
    { name: "dockedTo", type: `'screen' | 'bottom-app-bar'`, default: `'screen'`, description: "Docking target. 'screen' pins position:fixed to the viewport bottom (or a transformed ancestor, e.g. a demo stage) with a vertical cascade; 'bottom-app-bar' anchors absolute inside the nearest positioned ancestor so the FAB rests on the bar below and actions open as a horizontal row flush on top of it." },
    { name: "color", type: `FabColor`, default: `'primary'`, description: "Color family: the trigger/close button uses its container role while revealed actions use the matching solid role." },
    { name: "open", type: `boolean`, description: "Controlled open state; omit for uncontrolled behavior." },
    { name: "onOpenChange", type: `(open: boolean) => void`, description: "Called when the menu opens or closes." },
    { name: "icon", type: `string`, default: `'edit'`, description: "Closed-state Material Symbol." },
    { name: "closeIcon", type: `string`, default: `'close'`, description: "Open-state Material Symbol." }
  ],
  guidelines: {
    whenToUse: [
      "Use a fab menu to cluster 2\u20135 related quick actions behind a single entry point.",
      "Use it when screen space is too tight for separate extended FABs or buttons.",
      "Prefer it for creation flows: attach a photo, record audio, add a file."
    ],
    anatomy: ["Separate 56dp container-colored trigger/close button with 24dp closed icon and 20dp close icon", "56dp solid-color extended action buttons with 24dp icon and title-medium label", "Staggered spring entrance (50ms = durations.short1 token)", "Dismisses on Escape / outside press", "Extension: docked FAB flush bottom-center; open state squares the bottom corners to connect with the screen edge or bar"],
    states: ["Closed (single FAB)", "Open (close icon and actions visible)", "Action hover/press (state layer + 96% scale)", "Main FAB hover/press (103% / 94% expressive spring)", "Dismissed (Escape or outside pointerdown)", "Extension: docked closed/open shape morph"],
    dos: [
      "Keep each action's label short and noun-like ('Camera', 'Gallery')",
      "Limit the menu to 2\u20135 actions so the cascade stays scannable",
      "Close the menu after an action is chosen",
      "Use docked for creation flows that live at the bottom edge \u2014 above a bottom app bar it keeps one connected surface with the bar"
    ],
    donts: [
      "Don't put destructive actions in the menu",
      "Don't nest menus inside the menu",
      "Don't use it as a navigation drawer substitute",
      "Don't combine docked with direction \u2014 docking fixes the cascade layout (screen = vertical above, bottom app bar = horizontal row)",
      "Don't wrap the docked menu in an overflow-hidden container without a fixed-height stage or it clips the fixed/absolute anchoring"
    ]
  },
  exampleCode: `<FabMenu
  actions={[
    { icon: "photo_camera", label: "Camera", onClick: openCamera },
    { icon: "image", label: "Gallery", onClick: openGallery },
    { icon: "mic", label: "Voice note", onClick: recordAudio },
  ]}
/>

// Docked \u2014 flush to the bottom edge, bottom corners square when open.
// dockedTo="screen" pins fixed to the viewport (or a transformed ancestor);
// "bottom-app-bar" rests the FAB directly on the bar below.
<FabMenu
  docked
  dockedTo="screen"
  actions={[
    { icon: "photo_camera", label: "Camera", onClick: openCamera },
    { icon: "image", label: "Gallery", onClick: openGallery },
    { icon: "mic", label: "Voice note", onClick: recordAudio },
  ]}
/>`,
  m3e: true,
  related: ["fab", "extended-fab", "bottom-app-bar", "split-button"],
  demoName: "FabMenuDemo"
};
var navigationBarMeta = {
  id: "navigation-bar",
  name: "Navigation bar",
  category: "navigation",
  description: "Navigation bars switch between 3\u20135 primary destinations. The current short M3E bar is 64dp surface-container and uses secondary for the active top label. The 80dp baseline bar uses surface with elevation 2 and on-surface for its active label.",
  importLine: `import { NavigationBar } from "m3-expressive-react";`,
  spec: componentSpecs["navigation-bar"],
  variants: ["short top-icon", "short start-icon", "short centered", "tall baseline"],
  props: [
    { name: "items", type: `NavItem[]`, description: "Destinations (3\u20135): value, label, optional icon, optional badge (dot or count)." },
    { name: "value", type: `string`, description: "Controlled selected destination value." },
    { name: "onChange", type: `(v: string) => void`, description: "Called with the newly selected value." },
    { name: "fullWidth", type: `boolean`, default: `true`, description: "Block-level full-width bar; set false for an inline fit-content bar." },
    { name: "variant", type: `'short' | 'tall'`, default: `'short'`, description: "64dp current M3E bar or 80dp baseline bar." },
    { name: "iconPosition", type: `'top' | 'start'`, default: `'top'`, description: "Short bar icon placement." },
    { name: "arrangement", type: `'equal' | 'centered'`, default: `'equal'`, description: "Equal for compact widths; centered for medium widths." }
  ],
  guidelines: {
    whenToUse: [
      "Use for top-level destinations on small screens where a navigation drawer doesn't fit.",
      "Use with 3 to 5 destinations of equal importance.",
      "Combine with a navigation rail or drawer on larger breakpoints."
    ],
    anatomy: ["Current short: 64dp surface-container", "Baseline tall: 80dp surface with elevation 2", "Top-icon destination (24dp icon in a 56\xD732dp pill + label-medium)", "Start-icon destination (40dp-high pill around icon and label)", "Optional badge on the icon"],
    states: ["Current short active (secondary-container pill, filled icon; top label = secondary, start label = on-secondary-container)", "Baseline tall active (secondary-container pill, filled icon, on-surface label)", "Inactive (on-surface-variant)", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (ripple)"],
    dos: [
      "Keep destination labels short and descriptive",
      "Use badges only to surface genuinely new content",
      "Mirror the selected destination with the visible screen"
    ],
    donts: [
      "Don't exceed five destinations \u2014 group less-used ones elsewhere",
      "Don't use the bar for in-screen actions like save or share",
      "Don't hide labels \u2014 icons alone are ambiguous"
    ]
  },
  exampleCode: `const [dest, setDest] = useState("home");
<NavigationBar
  value={dest}
  onChange={setDest}
  items={[
    { value: "home", icon: "home", label: "Home" },
    { value: "search", icon: "search", label: "Search" },
    { value: "saved", icon: "favorite", label: "Saved", badge: 3 },
  ]}
/>`,
  related: ["navigation-rail", "navigation-drawer", "tabs"],
  demoName: "NavigationBarDemo"
};
var topAppBarMeta = {
  id: "top-app-bar",
  name: "Top app bar",
  category: "navigation",
  description: "Top app bars display screen information and actions. Baseline variants are 64dp small/center, 112dp medium, and 152dp large; current flexible variants add larger type and subtitles. When search is configured, a search action activates the current SearchView overlay instead of replacing the title inline.",
  importLine: `import { TopAppBar } from "m3-expressive-react";`,
  spec: componentSpecs["top-app-bar"],
  m3e: true,
  variants: ["small", "center", "medium", "large", "medium-flexible", "large-flexible"],
  props: [
    { name: "title", type: `React.ReactNode`, description: "Screen title. Large type for medium/large variants, title-large for small/center." },
    { name: "subtitle", type: `string`, description: "Optional subtitle for flexible variants; shown expanded and collapsed." },
    { name: "variant", type: `TopAppBarVariant`, default: `'small'`, description: "Baseline and expressive flexible size/type variants." },
    { name: "actions", type: `TopAppBarAction[]`, description: "Trailing icon actions. Set variant='filled' for the official tonal filled action treatment." },
    { name: "search", type: `TopAppBarSearch`, description: "Adds a Search action that activates SearchView. Supports current SearchView mode, controlled/uncontrolled value and open state, recent searches, results content, and submit." },
    { name: "image", type: `React.ReactNode`, description: "Optional product image before the title." },
    { name: "logo", type: `React.ReactNode`, description: "Optional logo before the title; takes precedence over image." },
    { name: "onBack", type: `() => void`, description: "Shows the leading arrow_back button." },
    { name: "scrollBehavior", type: `'none' | 'pinned' | 'enter-always' | 'exit-until-collapsed'`, default: `'none'`, description: "Official scroll policy. Static no-scroll behavior is the default; web scroll adapters are opt-in." },
    { name: "scrollTargetRef", type: `RefObject<HTMLElement | null>`, description: "Scroll container for an opt-in scroll behavior; defaults to window." },
    { name: "expandedHeight", type: `number`, description: "Optional custom expanded height, clamped to at least 64dp." },
    { name: "titleAlignment", type: `'start' | 'center'`, default: `'start'`, description: "Expanded flexible title and subtitle alignment." },
    { name: "fullWidth", type: `boolean`, default: `true`, description: "Stretch to container width." }
  ],
  guidelines: {
    whenToUse: [
      "Use small for screens needing maximum content density.",
      "Use center-aligned for primary pages without back navigation.",
      "Use medium/large for hierarchical pages with long titles that reward scroll collapse."
    ],
    anatomy: ["Baseline bar container (surface-container fill on scroll \u2014 M3 uses tonal color, not a shadow)", "Current flexible title and optional subtitle", "Leading navigation icon (48dp hit target)", "Trailing action icons", "Optional Search action + SearchView overlay"],
    states: ["Baseline static default (surface, no scroll reaction)", "Current flexible expanded/collapsed type treatments", "Pinned opt-in (surface-container after scroll)", "Enter-always opt-in", "Exit-until-collapsed opt-in (64dp title row)", "SearchView active from Search action", "Hover/focus on icons (state layer, focus ring)"],
    dos: [
      "Match variant to hierarchy: large for top-level, small for detail screens",
      "Limit actions to the most important 2\u20133; overflow the rest into a menu",
      "Pass an inner scroll container ref when the page scrolls inside a frame"
    ],
    donts: [
      "Don't combine a logo, product image, and search treatment in the same bar",
      "Don't let the flexible title wrap to more than one line",
      "Don't use medium/large variants on every screen; reserve them for hierarchy peaks"
    ]
  },
  exampleCode: `const scrollRef = useRef<HTMLDivElement>(null);
<TopAppBar
  variant="large"
  title="Gallery"
  scrollBehavior="exit-until-collapsed"
  onBack={() => history.back()}
  actions={[{ icon: "search", label: "Search" }, { icon: "more_vert", label: "More" }]}
  scrollTargetRef={scrollRef}
/>
<div ref={scrollRef} className="h-48 overflow-y-auto">{/* content */}</div>`,
  related: ["bottom-app-bar", "toolbar", "menu"],
  demoName: "TopAppBarDemo"
};
var bottomSheetMeta = {
  id: "bottom-sheet",
  name: "Bottom Sheet",
  category: "containment",
  description: "Bottom sheets are surfaces anchored to the bottom of the screen that present supplementary content with a drag handle for pull-to-dismiss; the modal variant overlays a 32% scrim, the standard variant renders inline without one.",
  importLine: `import { BottomSheet } from "m3-expressive-react";`,
  spec: componentSpecs["bottom-sheet"],
  variants: ["modal", "standard"],
  props: [
    { name: "open", type: `boolean`, description: "Controls modal visibility (animated with AnimatePresence)." },
    { name: "onClose", type: `() => void`, description: "Called on scrim click, Escape, or drag-down past 120px (or a fast downward fling)." },
    { name: "variant", type: `'modal' | 'standard'`, default: `'modal'`, description: "Overlay with scrim + focus trap, or persistent inline panel without one." },
    { name: "title", type: `string`, description: "Sheet heading (md-title-large)." },
    { name: "children", type: `React.ReactNode`, description: "Scrollable sheet content." },
    { name: "footer", type: `React.ReactNode`, description: "Pinned footer row above a divider." },
    { name: "sheetState", type: `'partial' | 'expanded'`, description: "Controlled height state." },
    { name: "defaultState", type: `'partial' | 'expanded'`, default: `'partial'`, description: "Initial uncontrolled height state." },
    { name: "onStateChange", type: `(state) => void`, description: "Called when the interactive handle changes height." },
    { name: "partialHeight", type: `string`, default: `'50dvh'`, description: "Height of the partial state." },
    { name: "maxHeight", type: `string`, description: "Optional maximum height override. The default keeps a 72dp compact top margin and 56dp above 640px." },
    { name: "className", type: `string`, description: "Extra classes for the sheet panel." }
  ],
  guidelines: {
    whenToUse: [
      "Use a bottom sheet to expose in-context supplementary content without leaving the page.",
      "Use for pickers and option lists on mobile-first layouts.",
      "Use the footer for a primary confirmation action."
    ],
    anatomy: ["Scrim (modal only)", "28dp top-corner sheet container", "Focusable 48dp handle target containing the 32\xD74dp visual handle", "Title", "Scrollable content", "Optional footer"],
    states: ["Hidden", "Partial", "Expanded", "Handle click/Enter/Space cycles height", "Dragging", "Dismissed"],
    dos: [
      "Keep sheet content short and task-focused",
      "Always provide an onClose handler",
      "Add a footer when the sheet completes an action"
    ],
    donts: [
      "Don't nest bottom sheets inside dialogs or other sheets",
      "Don't place critical irreversible actions in a dismissible sheet",
      "Don't stack multiple bottom sheets at once"
    ]
  },
  exampleCode: `<BottomSheet open={open} onClose={() => setOpen(false)} title="Choose a playlist">
  <List>{items}</List>
</BottomSheet>`,
  related: ["side-sheet", "card", "list"],
  demoName: "BottomSheetDemo"
};
var buttonMeta = {
  id: "button",
  name: "Button",
  category: "actions",
  description: "Buttons trigger actions or events, such as submitting a form or opening a dialog. M3 Expressive adds a bouncy shape-morph press interaction and five emphasis sizes.",
  importLine: `import { Button } from "m3-expressive-react";`,
  spec: componentSpecs.button,
  variants: ["filled", "tonal", "outlined", "text", "elevated"],
  props: [
    { name: "variant", type: `'filled' | 'tonal' | 'outlined' | 'text' | 'elevated'`, default: `'filled'`, description: "Visual emphasis of the button." },
    { name: "size", type: `ButtonSize`, default: `'sm'`, description: "Official 32 / 40 / 56 / 96 / 136dp sizes; long-form aliases are accepted." },
    { name: "shape", type: `ButtonShape`, default: `'round'`, description: "Official round or square resting shape. Toggle selection inverts round \u2194 square; legacy fixed-radius names remain supported." },
    { name: "icon", type: `string`, description: "Leading Material Symbol name." },
    { name: "trailingIcon", type: `string`, description: "Trailing Material Symbol name." },
    { name: "loading", type: `boolean`, default: `false`, description: "Shows inline progress spinner and disables the button." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." },
    { name: "toggleable", type: `boolean`, default: `false`, description: "Enables the official two-state toggle-button contract for filled, tonal, outlined, and elevated buttons. Text buttons are rejected at the type boundary." },
    { name: "selected", type: `boolean`, description: "Controlled selected state; omit for internal state." },
    { name: "onSelectedChange", type: `(selected: boolean) => void`, description: "Called with the next toggle state." }
  ],
  guidelines: {
    whenToUse: [
      "Use a filled button for the highest-emphasis action on a screen (one per region).",
      "Use tonal for medium-emphasis secondary actions.",
      "Use outlined or text for low-emphasis tertiary actions like 'Learn more'.",
      "Use elevated when the button needs separation from a patterned background."
    ],
    anatomy: ["Five size-matched round/square containers", "State layer", "Official size-matched label type", "Optional size-matched leading/trailing icon", "48dp touch target for 32/40dp visual sizes"],
    states: ["Enabled", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (per-size corner morph 8/8/12/16/16dp + 96% scale)", "Toggle selected/unselected (aria-pressed and round/square inversion; unavailable for text)", "Disabled (on-surface 12% container / 38% content, no elevation)"],
    dos: [
      "Use one filled button per view region to signal the primary action",
      "Order buttons by emphasis: filled \u2192 tonal \u2192 outlined \u2192 text (rightmost = least emphasis)",
      "Label with a verb ('Save', 'Get started')"
    ],
    donts: [
      "Don't place two filled buttons side by side",
      "Don't use a button for navigation to another page \u2014 use a text button or card",
      "Don't wrap long sentences in button labels"
    ]
  },
  exampleCode: `<Button variant="filled" icon="edit">Compose</Button>
<Button variant="tonal" size="lg">Save draft</Button>
<Button variant="outlined" trailingIcon="arrow_forward">Next</Button>
<Button variant="text">Learn more</Button>`,
  related: ["fab", "icon-button", "button-group", "split-button"],
  demoName: "ButtonDemo"
};
var linearProgressMeta = {
  id: "linear-progress",
  name: "Linear progress",
  category: "communication",
  description: "Linear progress indicators express an unspecified wait time or display the length of a process. Material 3 Expressive adds a signature wavy indicator that slides and pulses.",
  importLine: `import { LinearProgress } from "m3-expressive-react";`,
  spec: componentSpecs["linear-progress"],
  variants: ["determinate", "indeterminate", "wavy-determinate", "wavy-indeterminate"],
  props: [
    { name: "value", type: `number`, description: "0\u2013100 progress. Omit for indeterminate." },
    { name: "wavy", type: `boolean`, default: `false`, description: "M3 Expressive wavy line. The old wavey spelling remains as a deprecated alias." },
    { name: "color", type: `'primary' | 'secondary' | 'tertiary' | 'error'`, default: `'primary'`, description: "Active indicator color role." },
    { name: "height", type: `number`, default: `4`, description: "Flat track height in px. The wavy container is fixed at 10dp." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." },
    { name: "label", type: `string`, description: "Optional label above the track; percentage shown when determinate." }
  ],
  guidelines: {
    whenToUse: [
      "Use linear indicators for operations that happen along a line: loading content, uploads, multi-step flows.",
      "Use determinate when progress is measurable; indeterminate otherwise.",
      "Use the Expressive wavy variant to add brand personality to casual, playful moments."
    ],
    anatomy: ["Secondary-container track from the logical progress edge", "Active indicator grows from inline-start and mirrors in RTL", "10dp wavy container with 40dp determinate or 20dp indeterminate wavelength", "Real transparent 4dp active-track gap", "4dp stop indicator at inline-end", "Optional label and percentage"],
    states: ["Determinate (spring-animated fill)", "Indeterminate (two sweeping bars / sliding wave)"],
    dos: [
      "Keep indicators in the same position across screens so layout doesn't jump",
      "Prefer the wavy variant sparingly, for expressive product moments",
      "Pair with a label for operations longer than a few seconds"
    ],
    donts: [
      "Don't use progress indicators for actions that complete instantly",
      "Don't switch between determinate and indeterminate mid-process",
      "Don't stack multiple progress bars for one operation"
    ]
  },
  exampleCode: `<LinearProgress value={40} label="Downloading" fullWidth />
<LinearProgress color="tertiary" fullWidth />
<LinearProgress wavy value={60} color="error" fullWidth />`,
  related: ["circular-progress", "loading-indicator", "slider"],
  demoName: "LinearProgressDemo"
};

// ../../src/components/m3/Button.tsx

var sizeStyles = {
  xs: { height: 32, padding: 12, typeClass: "md-label-large", iconSize: 20, gap: 8, pressedRadius: 8, squareRadius: 12, outline: 1, touchTarget: "before:absolute before:-inset-y-2 before:content-['']" },
  sm: { height: 40, padding: 16, typeClass: "md-label-large", iconSize: 20, gap: 8, pressedRadius: 8, squareRadius: 12, outline: 1, touchTarget: "before:absolute before:-inset-y-1 before:content-['']" },
  md: { height: 56, padding: 24, typeClass: "md-title-medium", iconSize: 24, gap: 8, pressedRadius: 12, squareRadius: 16, outline: 1, touchTarget: "" },
  lg: { height: 96, padding: 48, typeClass: "md-headline-small", iconSize: 32, gap: 12, pressedRadius: 16, squareRadius: 28, outline: 2, touchTarget: "" },
  xl: { height: 136, padding: 64, typeClass: "md-headline-large", iconSize: 40, gap: 16, pressedRadius: 16, squareRadius: 28, outline: 3, touchTarget: "" }
};
var sizeAliases = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "extra-small": "xs",
  small: "sm",
  medium: "md",
  large: "lg",
  "extra-large": "xl"
};
var variantStyles = {
  filled: "bg-m3-primary text-m3-on-primary",
  tonal: "bg-m3-secondary-container text-m3-on-secondary-container",
  outlined: "border-m3-outline-variant bg-transparent text-m3-on-surface-variant",
  text: "bg-transparent text-m3-primary",
  elevated: "m3-elevation-1 bg-m3-surface-container-low text-m3-primary hover:[box-shadow:0_1px_2px_0_rgb(0_0_0/0.30),0_2px_6px_2px_rgb(0_0_0/0.15)]"
};
var toggleUnselectedStyles = {
  filled: "bg-m3-surface-container text-m3-on-surface-variant"
};
var toggleSelectedStyles = {
  filled: "bg-m3-primary text-m3-on-primary",
  tonal: "bg-m3-secondary text-m3-on-secondary",
  outlined: "border-transparent bg-m3-inverse-surface text-m3-inverse-on-surface",
  elevated: "m3-elevation-1 bg-m3-primary text-m3-on-primary"
};
var disabledStyles = {
  filled: "bg-m3-on-surface/12 text-m3-on-surface/38 shadow-none!",
  tonal: "bg-m3-on-surface/12 text-m3-on-surface/38 shadow-none!",
  outlined: "border-m3-on-surface/12 text-m3-on-surface/38",
  text: "text-m3-on-surface/38",
  elevated: "bg-m3-on-surface/12 text-m3-on-surface/38"
};
var shapeStyles = {
  round: "rounded-full",
  square: "rounded-xl",
  full: "rounded-full",
  large: "rounded-2xl",
  medium: "rounded-xl",
  small: "rounded-lg"
};
var Button = React3.forwardRef(function Button2({
  variant = "filled",
  size = "sm",
  shape = "round",
  icon,
  trailingIcon,
  loading = false,
  fullWidth = false,
  toggleable = false,
  selected,
  onSelectedChange,
  className,
  children,
  disabled,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onPointerLeave,
  onKeyDown,
  onKeyUp,
  onBlur,
  onClick,
  ...props
}, ref) {
  const s = sizeStyles[sizeAliases[size]];
  const isDisabled = disabled || loading;
  const [pressed, setPressed] = React3.useState(false);
  const [internalSelected, setInternalSelected] = React3.useState(false);
  const isSelected = toggleable ? _nullishCoalesce(selected, () => ( internalSelected)) : false;
  const morphs = (shape === "round" || shape === "full" || shape === "square") && !isDisabled;
  const restRadius = shape === "square" ? isSelected ? s.height / 2 : s.squareRadius : isSelected ? s.squareRadius : s.height / 2;
  const enabledStyle = toggleable ? isSelected ? toggleSelectedStyles[variant] : _nullishCoalesce(toggleUnselectedStyles[variant], () => ( variantStyles[variant])) : variantStyles[variant];
  const handleKeyDown = (e) => {
    if ((e.key === " " || e.key === "Enter") && !e.repeat) setPressed(true);
    _optionalChain([onKeyDown, 'optionalCall', _4 => _4(e)]);
  };
  const handleKeyUp = (e) => {
    if (e.key === " " || e.key === "Enter") setPressed(false);
    _optionalChain([onKeyUp, 'optionalCall', _5 => _5(e)]);
  };
  const handleBlur = (e) => {
    setPressed(false);
    _optionalChain([onBlur, 'optionalCall', _6 => _6(e)]);
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    _button.Button,
    {
      ref,
      disabled: isDisabled,
      "aria-busy": loading || void 0,
      "aria-pressed": toggleable ? isSelected : void 0,
      "data-pressed": pressed || void 0,
      onPointerDown: (event) => {
        setPressed(true);
        _optionalChain([onPointerDown, 'optionalCall', _7 => _7(event)]);
      },
      onPointerUp: (event) => {
        setPressed(false);
        _optionalChain([onPointerUp, 'optionalCall', _8 => _8(event)]);
      },
      onPointerCancel: (event) => {
        setPressed(false);
        _optionalChain([onPointerCancel, 'optionalCall', _9 => _9(event)]);
      },
      onPointerLeave: (event) => {
        setPressed(false);
        _optionalChain([onPointerLeave, 'optionalCall', _10 => _10(event)]);
      },
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      onBlur: handleBlur,
      onClick: (event) => {
        if (toggleable) {
          const next = !isSelected;
          if (selected === void 0) setInternalSelected(next);
          _optionalChain([onSelectedChange, 'optionalCall', _11 => _11(next)]);
        }
        _optionalChain([onClick, 'optionalCall', _12 => _12(event)]);
      },
      className: cn(
        "m3-state m3-focus relative inline-flex select-none items-center justify-center",
        "transition-colors duration-150",
        s.typeClass,
        isDisabled ? disabledStyles[variant] : enabledStyle,
        morphs ? void 0 : shapeStyles[shape],
        fullWidth && "w-full",
        isDisabled && "pointer-events-none",
        s.touchTarget,
        className
      ),
      style: {
        height: s.height,
        paddingInline: s.padding,
        gap: s.gap,
        borderWidth: variant === "outlined" ? s.outline : void 0
      },
      ...props,
      render: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
        _framermotion.motion.button,
        {
          whileTap: isDisabled ? void 0 : { scale: 0.96 },
          animate: morphs ? { borderRadius: pressed ? s.pressedRadius : restRadius } : void 0,
          transition: { scale: springs.fastVisual, borderRadius: springs.expressiveEffects },
          children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { initial: false, children: loading && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              _framermotion.motion.span,
              {
                initial: { width: 0, opacity: 0 },
                animate: { width: s.iconSize, opacity: 1 },
                exit: { width: 0, opacity: 0 },
                transition: springs.fastSpatial,
                className: "inline-flex items-center overflow-hidden",
                children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  _framermotion.motion.span,
                  {
                    animate: { rotate: 360 },
                    transition: { repeat: Infinity, ease: "linear", duration: durations.extraLong4 / 1e3 },
                    className: "inline-flex",
                    children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "progress_activity", size: s.iconSize })
                  }
                )
              },
              "spinner"
            ) }),
            !loading && icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon, size: s.iconSize, fill: isSelected || variant === "filled" }),
            children,
            trailingIcon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: trailingIcon, size: s.iconSize, fill: isSelected || variant === "filled" })
          ]
        }
      )
    }
  );
});

// ../../src/components/m3/IconButton.tsx




var sizeStyles2 = {
  xs: {
    height: 32,
    icon: 20,
    padding: { narrow: 4, standard: 6, wide: 10 },
    squareRadius: 12,
    pressedRadius: 8,
    outline: 1,
    touchTarget: {
      narrow: "before:absolute before:-inset-y-2 before:-inset-x-[10px] before:content-['']",
      standard: "before:absolute before:-inset-2 before:content-['']",
      wide: "before:absolute before:-inset-y-2 before:-inset-x-1 before:content-['']"
    }
  },
  sm: {
    height: 40,
    icon: 24,
    padding: { narrow: 4, standard: 8, wide: 14 },
    squareRadius: 12,
    pressedRadius: 8,
    outline: 1,
    touchTarget: {
      narrow: "before:absolute before:-inset-y-1 before:-inset-x-2 before:content-['']",
      standard: "before:absolute before:-inset-1 before:content-['']",
      wide: "before:absolute before:-inset-y-1 before:left-0 before:right-0 before:content-['']"
    }
  },
  md: { height: 56, icon: 24, padding: { narrow: 12, standard: 16, wide: 24 }, squareRadius: 16, pressedRadius: 12, outline: 1, touchTarget: { narrow: "", standard: "", wide: "" } },
  lg: { height: 96, icon: 32, padding: { narrow: 16, standard: 32, wide: 48 }, squareRadius: 28, pressedRadius: 16, outline: 2, touchTarget: { narrow: "", standard: "", wide: "" } },
  xl: { height: 136, icon: 40, padding: { narrow: 32, standard: 48, wide: 72 }, squareRadius: 28, pressedRadius: 16, outline: 3, touchTarget: { narrow: "", standard: "", wide: "" } }
};
var sizeAliases2 = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "extra-small": "xs",
  small: "sm",
  medium: "md",
  large: "lg",
  "extra-large": "xl"
};
var variantStyles2 = {
  standard: "bg-transparent text-m3-on-surface-variant",
  filled: "bg-m3-primary text-m3-on-primary",
  tonal: "bg-m3-secondary-container text-m3-on-secondary-container",
  outlined: "border-m3-outline-variant bg-transparent text-m3-on-surface-variant"
};
var unselectedStyles = {
  filled: "bg-m3-surface-container text-m3-on-surface-variant"
};
var selectedStyles = {
  standard: "text-m3-primary",
  filled: "bg-m3-primary text-m3-on-primary",
  tonal: "bg-m3-secondary text-m3-on-secondary",
  outlined: "border-transparent bg-m3-inverse-surface text-m3-inverse-on-surface"
};
var disabledStyles2 = {
  standard: "text-m3-on-surface/38",
  filled: "bg-m3-on-surface/10 text-m3-on-surface/38",
  tonal: "bg-m3-on-surface/10 text-m3-on-surface/38",
  outlined: "border-m3-on-surface/12 text-m3-on-surface/38"
};
var IconButton = React4.forwardRef(function IconButton2({
  variant = "filled",
  size = "sm",
  width = "standard",
  shape = "round",
  icon,
  toggleable = false,
  selected,
  onSelectedChange,
  disabled,
  className,
  onClick,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onPointerLeave,
  onKeyDown,
  onKeyUp,
  onBlur,
  type,
  ...props
}, ref) {
  const s = sizeStyles2[sizeAliases2[size]];
  const widthKey = width === "default" ? "standard" : width;
  const containerWidth = s.icon + s.padding[widthKey] * 2;
  const [internalSelected, setInternalSelected] = React4.useState(false);
  const [pressed, setPressed] = React4.useState(false);
  const isSelected = toggleable ? _nullishCoalesce(selected, () => ( internalSelected)) : false;
  const isRound = shape === "round" ? !isSelected : isSelected;
  const restRadius = isRound ? s.height / 2 : s.squareRadius;
  const enabledStyle = toggleable ? isSelected ? selectedStyles[variant] : _nullishCoalesce(unselectedStyles[variant], () => ( variantStyles2[variant])) : variantStyles2[variant];
  const handleKeyDown = (event) => {
    if ((event.key === " " || event.key === "Enter") && !event.repeat) setPressed(true);
    _optionalChain([onKeyDown, 'optionalCall', _13 => _13(event)]);
  };
  const handleKeyUp = (event) => {
    if (event.key === " " || event.key === "Enter") setPressed(false);
    _optionalChain([onKeyUp, 'optionalCall', _14 => _14(event)]);
  };
  const handleBlur = (event) => {
    setPressed(false);
    _optionalChain([onBlur, 'optionalCall', _15 => _15(event)]);
  };
  const handleClick = React4.useCallback(
    (e) => {
      if (toggleable) {
        const next = !isSelected;
        if (selected === void 0) setInternalSelected(next);
        _optionalChain([onSelectedChange, 'optionalCall', _16 => _16(next)]);
      }
      _optionalChain([onClick, 'optionalCall', _17 => _17(e)]);
    },
    [toggleable, isSelected, selected, onSelectedChange, onClick]
  );
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    _button.Button,
    {
      ref,
      type: _nullishCoalesce(type, () => ( "button")),
      disabled,
      onClick: handleClick,
      "aria-label": _nullishCoalesce(props["aria-label"], () => ( icon.replaceAll("_", " "))),
      "aria-pressed": toggleable ? isSelected : void 0,
      "data-pressed": pressed || void 0,
      onPointerDown: (event) => {
        setPressed(true);
        _optionalChain([onPointerDown, 'optionalCall', _18 => _18(event)]);
      },
      onPointerUp: (event) => {
        setPressed(false);
        _optionalChain([onPointerUp, 'optionalCall', _19 => _19(event)]);
      },
      onPointerCancel: (event) => {
        setPressed(false);
        _optionalChain([onPointerCancel, 'optionalCall', _20 => _20(event)]);
      },
      onPointerLeave: (event) => {
        setPressed(false);
        _optionalChain([onPointerLeave, 'optionalCall', _21 => _21(event)]);
      },
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      onBlur: handleBlur,
      className: cn(
        "m3-state m3-focus relative inline-flex select-none items-center justify-center",
        "transition-colors duration-150",
        disabled ? disabledStyles2[variant] : enabledStyle,
        disabled && "pointer-events-none",
        s.touchTarget[widthKey],
        className
      ),
      style: { width: containerWidth, height: s.height, borderWidth: variant === "outlined" ? s.outline : void 0 },
      ...props,
      render: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
        _framermotion.motion.button,
        {
          animate: { borderRadius: pressed && !disabled ? s.pressedRadius : restRadius },
          whileTap: disabled ? void 0 : { scale: 0.96 },
          transition: { borderRadius: springs.expressiveEffects, scale: springs.fastVisual },
          children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              _framermotion.motion.span,
              {
                initial: { scale: toggleable && isSelected ? 0.6 : 1 },
                animate: { scale: 1 },
                transition: springs.expressiveEffects,
                className: "inline-flex",
                children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  MaterialSymbol,
                  {
                    icon,
                    size: s.icon,
                    fill: toggleable ? isSelected : variant === "filled"
                  }
                )
              },
              toggleable && isSelected ? "selected" : "unselected"
            )
          ]
        }
      )
    }
  );
});

// ../../src/components/m3/FAB.tsx




var sizeStyles3 = {
  small: { container: 40, icon: 24, shape: "rounded-xl", touchTarget: "before:absolute before:-inset-1 before:content-['']" },
  standard: { container: 56, icon: 24, shape: "rounded-2xl", touchTarget: "" },
  medium: { container: 80, icon: 28, shape: "rounded-[20px]", touchTarget: "" },
  large: { container: 96, icon: 32, shape: "rounded-[28px]", touchTarget: "" },
  "extra-large": { container: 132, icon: 48, shape: "rounded-[28px]", touchTarget: "" }
};
var fabColorStyles = {
  primary: "bg-m3-primary text-m3-on-primary",
  secondary: "bg-m3-secondary text-m3-on-secondary",
  tertiary: "bg-m3-tertiary text-m3-on-tertiary",
  "primary-container": "bg-m3-primary-container text-m3-on-primary-container",
  "secondary-container": "bg-m3-secondary-container text-m3-on-secondary-container",
  "tertiary-container": "bg-m3-tertiary-container text-m3-on-tertiary-container",
  surface: "bg-m3-surface-container-high text-m3-primary"
};
var Fab = React5.forwardRef(function Fab2({ color = "primary-container", size = "standard", icon, lowered = false, disabled, className, ...props }, ref) {
  const s = sizeStyles3[size];
  const [hovered, setHovered] = React5.useState(false);
  const restElevation = lowered ? "m3-elevation-1" : "m3-elevation-3";
  const hoverElevation = lowered ? "m3-elevation-2" : "m3-elevation-4";
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    _button.Button,
    {
      ref,
      disabled,
      "aria-label": _nullishCoalesce(props["aria-label"], () => ( icon.replaceAll("_", " "))),
      className: cn(
        "m3-state m3-focus relative inline-flex select-none items-center justify-center",
        "transition-[background-color,box-shadow] duration-200",
        s.shape,
        disabled ? "bg-m3-on-surface/12 text-m3-on-surface/38" : fabColorStyles[color],
        disabled ? void 0 : hovered ? hoverElevation : restElevation,
        disabled && "pointer-events-none",
        s.touchTarget,
        className
      ),
      style: { width: s.container, height: s.container },
      ...props,
      render: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
        _framermotion.motion.button,
        {
          whileHover: disabled ? void 0 : { scale: 1.03 },
          whileTap: disabled ? void 0 : { scale: 0.94 },
          transition: springs.expressive,
          onHoverStart: () => setHovered(true),
          onHoverEnd: () => setHovered(false),
          children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon, size: s.icon })
          ]
        }
      )
    }
  );
});

// ../../src/components/m3/ExtendedFab.tsx




var sizeStyles4 = {
  small: { height: 56, icon: 24, radius: 16, padding: 16, gap: 8, typeClass: "md-title-medium" },
  medium: { height: 80, icon: 28, radius: 20, padding: 26, gap: 16, typeClass: "md-title-large" },
  large: { height: 96, icon: 32, radius: 28, padding: 28, gap: 20, typeClass: "md-headline-small" }
};
var ExtendedFab = React6.forwardRef(
  function ExtendedFab2({ color = "primary-container", size = "small", icon, label, lowered = false, disabled, className, ...props }, ref) {
    const s = sizeStyles4[size];
    const [hovered, setHovered] = React6.useState(false);
    const restElevation = lowered ? "m3-elevation-1" : "m3-elevation-3";
    const hoverElevation = lowered ? "m3-elevation-2" : "m3-elevation-4";
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _button.Button,
      {
        ref,
        disabled,
        className: cn(
          "m3-state m3-focus relative inline-flex select-none items-center justify-center overflow-hidden",
          s.typeClass,
          "transition-[background-color,box-shadow] duration-200",
          disabled ? "bg-m3-on-surface/12 text-m3-on-surface/38" : fabColorStyles[color],
          disabled ? void 0 : hovered ? hoverElevation : restElevation,
          disabled && "pointer-events-none",
          className
        ),
        style: { height: s.height, borderRadius: s.radius, paddingInline: s.padding, gap: s.gap },
        ...props,
        render: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
          _framermotion.motion.button,
          {
            whileHover: disabled ? void 0 : { scale: 1.03 },
            whileTap: disabled ? void 0 : { scale: 0.94 },
            transition: springs.expressive,
            onHoverStart: () => setHovered(true),
            onHoverEnd: () => setHovered(false),
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
              icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon, size: s.icon }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { children: label })
            ]
          }
        )
      }
    );
  }
);

// ../../src/components/m3/FabMenu.tsx




var _menu = require('@base-ui/react/menu');

var actionColorStyles = {
  primary: fabColorStyles.primary,
  secondary: fabColorStyles.secondary,
  tertiary: fabColorStyles.tertiary,
  "primary-container": fabColorStyles.primary,
  "secondary-container": fabColorStyles.secondary,
  "tertiary-container": fabColorStyles.tertiary,
  surface: fabColorStyles.primary
};
var triggerColorStyles = {
  primary: fabColorStyles["primary-container"],
  secondary: fabColorStyles["secondary-container"],
  tertiary: fabColorStyles["tertiary-container"],
  "primary-container": fabColorStyles["primary-container"],
  "secondary-container": fabColorStyles["secondary-container"],
  "tertiary-container": fabColorStyles["tertiary-container"],
  surface: fabColorStyles.surface
};
var FabMenu = React7.forwardRef(function FabMenu2({
  actions,
  direction = "vertical",
  color = "primary",
  open,
  onOpenChange,
  icon = "edit",
  closeIcon = "close",
  docked = false,
  dockedTo = "screen",
  className,
  ...props
}, ref) {
  const [internalOpen, setInternalOpen] = React7.useState(false);
  const isOpen = _nullishCoalesce(open, () => ( internalOpen));
  const actionsRef = React7.useRef({ unmount() {
  }, close() {
  } });
  const handleOpenChange = React7.useCallback(
    (nextOpen, eventDetails) => {
      if (!nextOpen) eventDetails.preventUnmountOnClose();
      if (open === void 0) setInternalOpen(nextOpen);
      _optionalChain([onOpenChange, 'optionalCall', _22 => _22(nextOpen)]);
    },
    [open, onOpenChange]
  );
  const isVertical = direction === "vertical";
  const isDocked = docked === true;
  const docksToScreen = isDocked && dockedTo === "screen";
  const verticalCascade = isDocked ? docksToScreen : isVertical;
  const shapeRest = `${shapes.large} ${shapes.large} ${shapes.large} ${shapes.large}`;
  const shapeDockedOpen = `${shapes.large} ${shapes.large} ${shapes.none} ${shapes.none}`;
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _menu.Menu.Root, { open: isOpen, onOpenChange: handleOpenChange, actionsRef, children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
    "div",
    {
      ref,
      className: cn(
        isDocked ? cn(
          // Anchor by the right edge, 28px (half the 56dp FAB) right of
          // center, so the widening cascade grows away from the FAB.
          "bottom-0 right-[calc(50%_-_28px)] z-50 flex gap-2",
          docksToScreen ? "fixed flex-col items-end" : "absolute flex-row items-end"
        ) : cn(
          "relative inline-flex gap-3",
          isVertical ? "flex-col items-end" : "flex-row items-center"
        ),
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { onExitComplete: () => _optionalChain([actionsRef, 'access', _23 => _23.current, 'optionalAccess', _24 => _24.unmount, 'call', _25 => _25()]), children: isOpen && // Floating popup anchored above the FAB (Menu.Popup must live in a
        // Positioner). The staggered cascade layout lives INSIDE the popup;
        // alignment follows the dock target (vertical cascade = column
        // end-aligned above the FAB, bar row = centered row flush above).
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _menu.Menu.Portal, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          _menu.Menu.Positioner,
          {
            side: "top",
            align: verticalCascade || isDocked ? "end" : "center",
            sideOffset: 8,
            className: "z-50 outline-none",
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _menu.Menu.Popup, { className: "outline-none", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              "div",
              {
                className: cn(
                  "flex gap-1",
                  verticalCascade ? "flex-col items-end" : "flex-row items-center"
                ),
                children: actions.map((action, i) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  _framermotion.motion.div,
                  {
                    initial: { scale: 0, opacity: 0 },
                    animate: { scale: 1, opacity: 1 },
                    exit: { scale: 0, opacity: 0 },
                    transition: { ...springs.expressive, delay: i * durations.short1 / 1e3 },
                    className: cn(
                      "inline-flex items-center gap-1",
                      verticalCascade ? "flex-row" : "flex-col"
                    ),
                    children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
                      _menu.Menu.Item,
                      {
                        "aria-label": _nullishCoalesce(_nullishCoalesce(action.ariaLabel, () => ( action.label)), () => ( action.icon.replaceAll("_", " "))),
                        onClick: () => _optionalChain([action, 'access', _26 => _26.onClick, 'optionalCall', _27 => _27()]),
                        className: cn(
                          "m3-state m3-focus relative m3-elevation-3 inline-flex min-h-14 min-w-14 cursor-pointer list-none select-none items-center justify-center gap-2 rounded-full px-6 outline-none md-title-medium",
                          actionColorStyles[color]
                        ),
                        children: [
                          /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                            _framermotion.motion.span,
                            {
                              whileTap: { scale: 0.96 },
                              transition: springs.fastVisual,
                              className: "inline-flex",
                              children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: action.icon, size: 24 })
                            }
                          ),
                          action.label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "whitespace-nowrap", children: action.label }),
                          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {})
                        ]
                      }
                    )
                  },
                  `${action.icon}-${i}`
                ))
              }
            ) })
          }
        ) }) }),
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
          _menu.Menu.Trigger,
          {
            "aria-label": isOpen ? "Close actions menu" : "Open actions menu",
            render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              _framermotion.motion.button,
              {
                type: "button",
                whileHover: { scale: 1.03 },
                whileTap: { scale: 0.94 },
                transition: springs.expressive,
                animate: {
                  borderRadius: isOpen ? isDocked ? shapeDockedOpen : "28px 28px 28px 28px" : shapeRest,
                  transition: springs.expressiveEffects
                },
                className: cn(
                  "m3-state m3-focus relative m3-elevation-3 inline-flex h-14 w-14 cursor-pointer select-none items-center justify-center rounded-2xl outline-none",
                  "transition-[background-color,box-shadow] duration-200",
                  triggerColorStyles[color]
                )
              }
            ),
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                _framermotion.motion.span,
                {
                  initial: { rotate: isOpen ? -45 : 45, scale: 0.7, opacity: 0 },
                  animate: { rotate: 0, scale: 1, opacity: 1 },
                  transition: springs.expressiveEffects,
                  className: "inline-flex",
                  children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: isOpen ? closeIcon : icon, size: isOpen ? 20 : 24 })
                },
                isOpen ? "close" : "open"
              )
            ]
          }
        )
      ]
    }
  ) });
});

// ../../src/components/m3/SplitButton.tsx





var _directionprovider = require('@base-ui/react/direction-provider');

// ../../src/lib/m3/use-text-direction.ts

function useTextDirection(elementRef) {
  const [direction, setDirection] = React8.useState("ltr");
  React8.useLayoutEffect(() => {
    const root = _nullishCoalesce(_optionalChain([elementRef, 'optionalAccess', _28 => _28.current]), () => ( document.documentElement));
    const updateDirection = () => {
      setDirection(getComputedStyle(root).direction === "rtl" ? "rtl" : "ltr");
    };
    updateDirection();
    const observer = new MutationObserver(updateDirection);
    observer.observe(document.documentElement, {
      subtree: true,
      attributes: true,
      attributeFilter: ["dir", "class", "style"]
    });
    return () => observer.disconnect();
  });
  return direction;
}

// ../../src/components/m3/SplitButton.tsx

var sizeStyles5 = {
  xs: { height: 32, leading: 12, trailing: 10, trailingPadding: 13, icon: 22, iconOffset: -1, typeClass: "md-label-large", outline: 1, innerRadius: 4, pressedInnerRadius: 8 },
  sm: { height: 40, leading: 16, trailing: 12, trailingPadding: 13, icon: 22, iconOffset: -1, typeClass: "md-label-large", outline: 1, innerRadius: 4, pressedInnerRadius: 12 },
  md: { height: 56, leading: 24, trailing: 24, trailingPadding: 15, icon: 26, iconOffset: -2, typeClass: "md-title-medium", outline: 1, innerRadius: 4, pressedInnerRadius: 12 },
  lg: { height: 96, leading: 48, trailing: 48, trailingPadding: 29, icon: 38, iconOffset: -3, typeClass: "md-headline-small", outline: 2, innerRadius: 8, pressedInnerRadius: 20 },
  xl: { height: 136, leading: 64, trailing: 64, trailingPadding: 43, icon: 50, iconOffset: -6, typeClass: "md-headline-large", outline: 3, innerRadius: 12, pressedInnerRadius: 20 }
};
var sizeAliases3 = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "extra-small": "xs",
  small: "sm",
  medium: "md",
  large: "lg",
  "extra-large": "xl"
};
var variantStyles3 = {
  filled: "bg-m3-primary text-m3-on-primary",
  tonal: "bg-m3-secondary-container text-m3-on-secondary-container",
  outlined: "border-m3-outline-variant bg-transparent text-m3-on-surface-variant",
  elevated: "m3-elevation-1 bg-m3-surface-container-low text-m3-primary hover:[box-shadow:0_1px_2px_0_rgb(0_0_0/0.30),0_2px_6px_2px_rgb(0_0_0/0.15)]"
};
var disabledStyles3 = {
  filled: "bg-m3-on-surface/12 text-m3-on-surface/38",
  tonal: "bg-m3-on-surface/12 text-m3-on-surface/38",
  outlined: "border-m3-on-surface/12 text-m3-on-surface/38",
  elevated: "bg-m3-on-surface/10 text-m3-on-surface-variant/38 shadow-none!"
};
var SplitButton = React9.forwardRef(function SplitButton2({ label, icon, ariaLabel, onClick, items, variant = "filled", size = "sm", disabled = false, className }, ref) {
  const [open, setOpen] = React9.useState(false);
  const [actionPressed, setActionPressed] = React9.useState(false);
  const [triggerPressed, setTriggerPressed] = React9.useState(false);
  const rootRef = React9.useRef(null);
  const direction = useTextDirection(rootRef);
  const s = sizeStyles5[sizeAliases3[size]];
  const segmentStyle = disabled ? disabledStyles3[variant] : variantStyles3[variant];
  const actionInnerRadius = actionPressed ? s.pressedInnerRadius : s.innerRadius;
  const triggerInnerRadius = triggerPressed ? s.pressedInnerRadius : open ? s.height / 2 : s.innerRadius;
  const actionsRef = React9.useRef({ unmount() {
  }, close() {
  } });
  const handleOpenChange = React9.useCallback(
    (nextOpen, eventDetails) => {
      if (!nextOpen) eventDetails.preventUnmountOnClose();
      setOpen(nextOpen);
    },
    []
  );
  const popupMotion = {
    initial: { opacity: 0, scale: 0.92, y: -6 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -6 },
    transition: springs.fastSpatial,
    style: { transformOrigin: direction === "rtl" ? "top right" : "top left" }
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _directionprovider.DirectionProvider, { direction, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _menu.Menu.Root, { open, onOpenChange: handleOpenChange, actionsRef, disabled, children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { ref: (node) => {
    rootRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  }, className: cn("relative inline-flex items-stretch gap-0.5", disabled && "pointer-events-none", className), children: [
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
      _framermotion.motion.button,
      {
        initial: false,
        type: "button",
        "aria-label": _nullishCoalesce(_nullishCoalesce(_nullishCoalesce(ariaLabel, () => ( label)), () => ( _optionalChain([icon, 'optionalAccess', _29 => _29.replaceAll, 'call', _30 => _30("_", " ")]))), () => ( "Primary action")),
        disabled,
        onClick,
        "data-pressed": actionPressed || void 0,
        onPointerDown: () => setActionPressed(true),
        onPointerUp: () => setActionPressed(false),
        onPointerCancel: () => setActionPressed(false),
        onPointerLeave: () => setActionPressed(false),
        onKeyDown: (event) => {
          if ((event.key === " " || event.key === "Enter") && !event.repeat) setActionPressed(true);
        },
        onKeyUp: (event) => {
          if (event.key === " " || event.key === "Enter") setActionPressed(false);
        },
        onBlur: () => setActionPressed(false),
        animate: {
          borderTopLeftRadius: direction === "rtl" ? actionInnerRadius : s.height / 2,
          borderBottomLeftRadius: direction === "rtl" ? actionInnerRadius : s.height / 2,
          borderTopRightRadius: direction === "rtl" ? s.height / 2 : actionInnerRadius,
          borderBottomRightRadius: direction === "rtl" ? s.height / 2 : actionInnerRadius
        },
        whileTap: disabled ? void 0 : { scale: 0.96 },
        transition: { borderRadius: springs.expressiveEffects, scale: springs.fastVisual },
        className: cn(
          "m3-state m3-focus relative inline-flex select-none items-center justify-center gap-2 transition-colors duration-150 focus-visible:z-10",
          s.typeClass,
          s.height < 48 && cn(
            "before:absolute before:[inset-inline:0] before:content-['']",
            s.height === 32 ? "before:-inset-y-2" : "before:-inset-y-1"
          ),
          segmentStyle
        ),
        style: {
          height: s.height,
          minWidth: label ? 48 : Math.max(48, s.height),
          paddingInlineStart: label ? s.leading : s.trailingPadding,
          paddingInlineEnd: label ? s.trailing : s.trailingPadding,
          borderWidth: variant === "outlined" ? s.outline : void 0
        },
        children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
          icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon, size: Math.min(s.icon, 40) }),
          label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { children: label })
        ]
      }
    ),
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
      _menu.Menu.Trigger,
      {
        disabled,
        "aria-label": `More actions for ${_nullishCoalesce(_nullishCoalesce(_nullishCoalesce(ariaLabel, () => ( label)), () => ( _optionalChain([icon, 'optionalAccess', _31 => _31.replaceAll, 'call', _32 => _32("_", " ")]))), () => ( "primary action"))}`,
        "data-pressed": triggerPressed || open || void 0,
        onPointerDown: () => setTriggerPressed(true),
        onPointerUp: () => setTriggerPressed(false),
        onPointerCancel: () => setTriggerPressed(false),
        onPointerLeave: () => setTriggerPressed(false),
        onKeyDown: (event) => {
          if ((event.key === " " || event.key === "Enter") && !event.repeat) setTriggerPressed(true);
        },
        onKeyUp: (event) => {
          if (event.key === " " || event.key === "Enter") setTriggerPressed(false);
        },
        onBlur: () => setTriggerPressed(false),
        className: cn(
          "m3-state m3-focus relative inline-flex cursor-pointer select-none items-center justify-center outline-none transition-colors duration-150 focus-visible:z-10",
          s.height < 48 && cn(
            "before:absolute before:[inset-inline:0] before:content-['']",
            s.height === 32 ? "before:-inset-y-2" : "before:-inset-y-1"
          ),
          segmentStyle
        ),
        style: {
          width: s.icon + s.trailingPadding * 2,
          height: s.height,
          paddingInline: s.trailingPadding,
          borderWidth: variant === "outlined" ? s.outline : void 0
        },
        render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          _framermotion.motion.button,
          {
            initial: false,
            animate: {
              borderTopLeftRadius: direction === "rtl" ? s.height / 2 : triggerInnerRadius,
              borderBottomLeftRadius: direction === "rtl" ? s.height / 2 : triggerInnerRadius,
              borderTopRightRadius: direction === "rtl" ? triggerInnerRadius : s.height / 2,
              borderBottomRightRadius: direction === "rtl" ? triggerInnerRadius : s.height / 2
            },
            whileTap: disabled ? void 0 : { scale: 0.96 },
            transition: { borderRadius: springs.expressiveEffects, scale: springs.fastVisual }
          }
        ),
        children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            _framermotion.motion.span,
            {
              animate: { rotate: open ? 180 : 0, x: direction === "rtl" ? -s.iconOffset : s.iconOffset },
              transition: springs.fastSpatial,
              className: "inline-flex",
              children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "arrow_drop_down", size: s.icon })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { onExitComplete: () => _optionalChain([actionsRef, 'access', _33 => _33.current, 'optionalAccess', _34 => _34.unmount, 'call', _35 => _35()]), children: open && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _menu.Menu.Portal, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _menu.Menu.Positioner, { side: "bottom", align: "start", sideOffset: 8, className: "z-20 outline-none", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _menu.Menu.Popup,
      {
        "aria-label": `${_nullishCoalesce(_nullishCoalesce(ariaLabel, () => ( label)), () => ( "Primary"))} actions`,
        dir: direction,
        render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.motion.div, { ...popupMotion }),
        className: "m3-elevation-2 min-w-[220px] overflow-hidden rounded-[4px] bg-m3-surface-container py-2 outline-none",
        children: items.map((item, i) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
          _menu.Menu.Item,
          {
            onClick: () => _optionalChain([item, 'access', _36 => _36.onClick, 'optionalCall', _37 => _37()]),
            className: "m3-state m3-focus flex min-h-12 w-full cursor-pointer list-none items-center gap-3 px-4 py-2 text-start text-m3-on-surface outline-none md-label-large",
            children: [
              item.icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: item.icon, size: 24, className: "text-m3-on-surface-variant" }),
              item.label
            ]
          },
          `${item.label}-${i}`
        ))
      }
    ) }) }) })
  ] }) }) });
});

// ../../src/components/m3/ButtonGroup.tsx




var sizeStyles6 = {
  xs: { height: 32, padding: 12, icon: 20, gap: 8, groupGap: 18, typeClass: "md-label-large", pressedRadius: 8, squareRadius: 12, connectedInnerRadius: 8, connectedPressedRadius: 4, outline: 1 },
  sm: { height: 40, padding: 16, icon: 20, gap: 8, groupGap: 12, typeClass: "md-label-large", pressedRadius: 8, squareRadius: 12, connectedInnerRadius: 8, connectedPressedRadius: 4, outline: 1 },
  md: { height: 56, padding: 24, icon: 24, gap: 8, groupGap: 8, typeClass: "md-title-medium", pressedRadius: 12, squareRadius: 16, connectedInnerRadius: 12, connectedPressedRadius: 8, outline: 1 },
  lg: { height: 96, padding: 48, icon: 32, gap: 12, groupGap: 8, typeClass: "md-headline-small", pressedRadius: 16, squareRadius: 28, connectedInnerRadius: 16, connectedPressedRadius: 12, outline: 2 },
  xl: { height: 136, padding: 64, icon: 40, gap: 16, groupGap: 8, typeClass: "md-headline-large", pressedRadius: 16, squareRadius: 28, connectedInnerRadius: 16, connectedPressedRadius: 12, outline: 3 }
};
var sizeAliases4 = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "extra-small": "xs",
  small: "sm",
  medium: "md",
  large: "lg",
  "extra-large": "xl"
};
var variantStyles4 = {
  outlined: "border-m3-outline-variant bg-transparent text-m3-on-surface-variant",
  filled: "bg-m3-surface-container text-m3-on-surface-variant",
  tonal: "bg-m3-secondary-container text-m3-on-secondary-container",
  elevated: "m3-elevation-1 bg-m3-surface-container-low text-m3-primary"
};
var selectedStyles2 = {
  outlined: "border-transparent bg-m3-inverse-surface text-m3-inverse-on-surface",
  filled: "bg-m3-primary text-m3-on-primary",
  tonal: "bg-m3-secondary text-m3-on-secondary",
  elevated: "bg-m3-primary text-m3-on-primary"
};
var disabledStyles4 = {
  outlined: "border-m3-on-surface/12 text-m3-on-surface/38",
  filled: "bg-m3-on-surface/12 text-m3-on-surface/38",
  tonal: "bg-m3-on-surface/12 text-m3-on-surface/38",
  elevated: "bg-m3-on-surface/12 text-m3-on-surface/38 shadow-none!"
};
var ButtonGroup = React10.forwardRef(function ButtonGroup2({
  buttons: buttons2,
  variant = "outlined",
  layout = "standard",
  shape = "round",
  selection = "none",
  value,
  onValueChange,
  variableWidths,
  expandedRatio = 0.15,
  size = "sm",
  disabled = false,
  className,
  style,
  ...props
}, ref) {
  const [internalValue, setInternalValue] = React10.useState([]);
  const [pressedId, setPressedId] = React10.useState(null);
  const isControlled = value !== void 0;
  const selectedIds = isControlled ? value : internalValue;
  const s = sizeStyles6[sizeAliases4[size]];
  const rootRef = React10.useRef(null);
  const direction = useTextDirection(rootRef);
  const redistributesWidths = _nullishCoalesce(variableWidths, () => ( layout === "standard"));
  const connectedRadii = (index, isSelected, isPressed) => {
    if (isSelected) return { borderRadius: shape === "round" ? s.squareRadius : s.height / 2 };
    const inner = isPressed ? s.connectedPressedRadius : s.connectedInnerRadius;
    const outer = shape === "round" ? s.height / 2 : s.squareRadius;
    const startRadius = index === 0 ? outer : inner;
    const endRadius = index === buttons2.length - 1 ? outer : inner;
    return direction === "rtl" ? {
      borderTopLeftRadius: endRadius,
      borderBottomLeftRadius: endRadius,
      borderTopRightRadius: startRadius,
      borderBottomRightRadius: startRadius
    } : {
      borderTopLeftRadius: startRadius,
      borderBottomLeftRadius: startRadius,
      borderTopRightRadius: endRadius,
      borderBottomRightRadius: endRadius
    };
  };
  const toggle = React10.useCallback(
    (id) => {
      let next;
      const selected = selectedIds.includes(id);
      const required = selection.endsWith("-required");
      if (selection === "single" || selection === "single-required") {
        if (selected && required) return;
        next = selected ? [] : [id];
      } else if (selection === "multiple" || selection === "multiple-required") {
        if (selected && required && selectedIds.length === 1) return;
        next = selected ? selectedIds.filter((v) => v !== id) : [...selectedIds, id];
      } else {
        return;
      }
      if (!isControlled) setInternalValue(next);
      _optionalChain([onValueChange, 'optionalCall', _38 => _38(next)]);
    },
    [selection, selectedIds, isControlled, onValueChange]
  );
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    "div",
    {
      ref: (node) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      role: "group",
      className: cn("inline-flex", redistributesWidths && "w-full", className),
      ...props,
      style: { columnGap: layout === "standard" ? s.groupGap : 2, ...style },
      children: buttons2.map((btn, index) => {
        const isSelected = selection !== "none" && selectedIds.includes(btn.id);
        const isPressed = pressedId === btn.id;
        const isHot = redistributesWidths && !disabled && isPressed;
        const radius = isSelected ? shape === "round" ? s.squareRadius : s.height / 2 : isPressed ? s.pressedRadius : shape === "square" ? s.squareRadius : s.height / 2;
        const radii = layout === "connected" ? connectedRadii(index, isSelected, isPressed) : { borderRadius: radius };
        return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          _button.Button,
          {
            disabled,
            "aria-pressed": selection !== "none" ? isSelected : void 0,
            "aria-label": _nullishCoalesce(btn.ariaLabel, () => ( (!btn.label ? (_nullishCoalesce(btn.icon, () => ( btn.id))).replaceAll("_", " ") : void 0))),
            "data-pressed": isPressed || void 0,
            onPointerDown: () => setPressedId(btn.id),
            onPointerUp: () => setPressedId(null),
            onPointerCancel: () => setPressedId(null),
            onPointerLeave: () => setPressedId((current) => current === btn.id ? null : current),
            onKeyDown: (event) => {
              if ((event.key === " " || event.key === "Enter") && !event.repeat) setPressedId(btn.id);
            },
            onKeyUp: (event) => {
              if (event.key === " " || event.key === "Enter") setPressedId(null);
            },
            onBlur: () => setPressedId(null),
            onClick: () => {
              toggle(btn.id);
              _optionalChain([btn, 'access', _39 => _39.onClick, 'optionalCall', _40 => _40()]);
            },
            className: cn(
              "m3-state m3-focus relative inline-flex select-none items-center justify-center",
              "transition-colors duration-150",
              s.typeClass,
              s.height < 48 && cn(
                "before:absolute before:content-[''] before:[inset-inline:0]",
                s.height === 32 ? "before:-inset-y-2" : "before:-inset-y-1"
              ),
              disabled ? disabledStyles4[variant] : variantStyles4[variant],
              !disabled && isSelected && selectedStyles2[variant],
              disabled && "pointer-events-none"
            ),
            style: redistributesWidths ? { height: s.height, paddingInline: s.padding, gap: s.gap, borderWidth: variant === "outlined" ? s.outline : void 0, flexBasis: 0, minWidth: 0 } : { height: s.height, paddingInline: s.padding, gap: s.gap, borderWidth: variant === "outlined" ? s.outline : void 0 },
            render: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
              _framermotion.motion.button,
              {
                whileTap: disabled ? void 0 : { scale: 0.96 },
                animate: {
                  ...radii,
                  ...redistributesWidths ? { flexGrow: isHot ? 1 + expandedRatio : 1 } : {}
                },
                transition: redistributesWidths ? { scale: springs.fastVisual, flexGrow: springs.defaultSpatial, borderRadius: springs.expressiveEffects } : { scale: springs.fastVisual, borderRadius: springs.expressiveEffects },
                children: [
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
                  btn.icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: btn.icon, size: s.icon }),
                  btn.label
                ]
              }
            )
          },
          btn.id
        );
      })
    }
  );
});

// ../../src/components/m3/SegmentedButton.tsx

var _togglegroup = require('@base-ui/react/toggle-group');
var _toggle = require('@base-ui/react/toggle');


var sizeStyles7 = {
  sm: { height: 40, icon: 18 },
  md: { height: 56, icon: 20 }
};
var SegmentedButton = React11.forwardRef(
  function SegmentedButton2({ options, type = "single", value, onValueChange, size = "sm", disabled = false, className, ...props }, ref) {
    const [internalValue, setInternalValue] = React11.useState([]);
    const isControlled = value !== void 0;
    const selectedList = isControlled ? Array.isArray(value) ? value : [value] : internalValue;
    const s = sizeStyles7[size];
    const handleGroupValueChange = React11.useCallback(
      (groupValue) => {
        const next = groupValue;
        if (!isControlled) setInternalValue(next);
        _optionalChain([onValueChange, 'optionalCall', _41 => _41(type === "single" ? _nullishCoalesce(next[0], () => ( "")) : next)]);
      },
      [type, isControlled, onValueChange]
    );
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _togglegroup.ToggleGroup,
      {
        ref,
        value: isControlled ? selectedList : void 0,
        onValueChange: handleGroupValueChange,
        multiple: type === "multiple",
        disabled,
        orientation: "horizontal",
        className: cn(
          "inline-flex select-none rounded-full border",
          disabled ? "border-m3-on-surface/12" : "border-m3-outline",
          className
        ),
        style: { height: s.height },
        ...props,
        children: options.map((option, i) => {
          const isSelected = selectedList.includes(option.value);
          return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
            _toggle.Toggle,
            {
              value: option.value,
              "aria-label": _nullishCoalesce(option.ariaLabel, () => ( (!option.label ? (_nullishCoalesce(option.icon, () => ( option.value))).replaceAll("_", " ") : void 0))),
              className: cn(
                "m3-state m3-focus relative flex h-full flex-1 items-center justify-center gap-2 px-4",
                size === "sm" && "before:absolute before:content-[''] before:[inset-inline:0] before:-inset-y-1",
                "md-label-large transition-colors duration-150",
                i > 0 && (disabled ? "border-s border-m3-on-surface/12" : "border-s border-m3-outline"),
                i === 0 && "rounded-s-full",
                i === options.length - 1 && "rounded-e-full",
                disabled ? isSelected ? "bg-m3-on-surface/12 text-m3-on-surface/38" : "bg-transparent text-m3-on-surface/38" : isSelected ? "bg-m3-secondary-container text-m3-on-secondary-container" : "bg-transparent text-m3-on-surface"
              ),
              render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                _framermotion.motion.button,
                {
                  whileTap: disabled ? void 0 : { scale: 0.97 },
                  transition: springs.fastVisual
                }
              ),
              children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { initial: false, children: isSelected && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  _framermotion.motion.span,
                  {
                    initial: { width: 0, opacity: 0 },
                    animate: { width: s.icon, opacity: 1 },
                    exit: { width: 0, opacity: 0 },
                    transition: springs.fastSpatial,
                    className: "inline-flex items-center justify-center overflow-hidden",
                    children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "check", size: s.icon })
                  },
                  "check"
                ) }),
                !isSelected && option.icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: option.icon, size: s.icon }),
                option.label
              ]
            },
            option.value
          );
        })
      }
    );
  }
);

// ../../src/components/m3/Badge.tsx



var asTransition = (s) => s;
var colorStyles = {
  error: "bg-m3-error text-m3-on-error",
  primary: "bg-m3-primary text-m3-on-primary",
  tertiary: "bg-m3-tertiary text-m3-on-tertiary"
};
var Badge = React12.forwardRef(function Badge2({
  value,
  showDot = false,
  children,
  color = "error",
  max = 999,
  ariaLabel,
  className
}, ref) {
  const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
  const hasValue = value !== void 0 && value !== "";
  const effectiveMax = Math.min(999, Math.max(0, Math.floor(max)));
  const display = String(
    typeof value === "number" && value > effectiveMax ? `${effectiveMax}+` : _nullishCoalesce(value, () => ( ""))
  ).slice(0, 4);
  const description = _nullishCoalesce(ariaLabel, () => ( (showDot ? "New activity" : `${display} notifications`)));
  const descriptionId = React12.useId();
  const badge = showDot ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    _framermotion.motion.span,
    {
      initial: reduceMotion ? false : { scale: 0 },
      animate: { scale: 1 },
      transition: reduceMotion ? { duration: 0 } : asTransition(springs.bouncy),
      "aria-hidden": "true",
      className: cn(
        "block h-[6px] w-[6px] rounded-full",
        colorStyles[color],
        className
      )
    },
    "dot"
  ) : hasValue ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    _framermotion.motion.span,
    {
      initial: reduceMotion ? false : { scale: 0 },
      animate: { scale: 1 },
      transition: reduceMotion ? { duration: 0 } : asTransition(springs.bouncy),
      "aria-hidden": "true",
      className: cn(
        "md-label-small flex h-4 min-w-4 items-center justify-center rounded-full px-1",
        colorStyles[color],
        className
      ),
      children: display
    },
    String(value)
  ) : null;
  if (!badge) return _nullishCoalesce(children, () => ( null));
  if (children === void 0 || children === null) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      "span",
      {
        ref,
        role: "status",
        "aria-label": description,
        className: "inline-flex",
        children: badge
      }
    );
  }
  const childElement = React12.isValidElement(children) ? children : null;
  const destination = childElement ? React12.cloneElement(
    childElement,
    {
      "aria-describedby": [
        childElement.props["aria-describedby"],
        descriptionId
      ].filter(Boolean).join(" ")
    }
  ) : children;
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { ref, className: "relative inline-flex", children: [
    destination,
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { id: descriptionId, className: "sr-only", children: description }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      "span",
      {
        className: cn(
          "absolute inline-flex",
          // Official BadgedBox offsets: text badge 12dp from end / 14dp overlap;
          // icon-only dot flush with the anchor corner.
          showDot ? "end-0 top-0" : "-end-1 -top-0.5"
        ),
        children: badge
      }
    )
  ] });
});
Badge.displayName = "Badge";

// ../../src/components/m3/LinearProgress.tsx

var _progress = require('@base-ui/react/progress');


function wavePath(width, height, period) {
  const mid = height / 2;
  const amp = height / 2 - 3;
  let d = `M0 ${mid}`;
  for (let x = 0; x < width; x += period) {
    d += ` Q ${x + period * 0.25} ${mid - amp} ${x + period / 2} ${mid}`;
    d += ` Q ${x + period * 0.75} ${mid + amp} ${x + period} ${mid}`;
  }
  return d;
}
function WaveSvg({
  stroke,
  slideDuration,
  wavelength,
  reduceMotion
}) {
  const patternId = React13.useId().replace(/:/g, "");
  const height = 10;
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
    _framermotion.motion.svg,
    {
      className: "block h-full w-[calc(200%+40px)]",
      animate: reduceMotion ? void 0 : { x: [0, -wavelength] },
      transition: reduceMotion ? { duration: 0 } : { duration: slideDuration, repeat: Infinity, ease: "linear" },
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "defs", { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          "pattern",
          {
            id: patternId,
            width: wavelength,
            height,
            patternUnits: "userSpaceOnUse",
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              "path",
              {
                d: wavePath(wavelength, height, wavelength),
                fill: "none",
                stroke,
                strokeWidth: 3,
                strokeLinecap: "round"
              }
            )
          }
        ) }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "rect", { width: "100%", height, fill: `url(#${patternId})` })
      ]
    }
  );
}
function PulsingWave({
  stroke,
  slideDuration,
  wavelength,
  reduceMotion
}) {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    _framermotion.motion.div,
    {
      className: "h-full w-full",
      style: { transformOrigin: "50% 50%" },
      animate: reduceMotion ? void 0 : { scaleY: [1, 1.4, 1] },
      transition: reduceMotion ? { duration: 0 } : {
        duration: durations.extraLong4 / 1e3,
        repeat: Infinity,
        ease: "easeInOut"
      },
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
        WaveSvg,
        {
          stroke,
          slideDuration,
          wavelength,
          reduceMotion
        }
      )
    }
  );
}
var LinearProgress = React13.forwardRef(function LinearProgress2({
  value,
  wavey = false,
  wavy,
  color = "primary",
  height = 4,
  fullWidth = false,
  label,
  className
}, ref) {
  const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
  const determinate = typeof value === "number";
  const isWavy = _nullishCoalesce(wavy, () => ( wavey));
  const v = determinate ? Math.min(100, Math.max(0, value)) : 0;
  const stroke = colorVar(color);
  const slide = durations.extraLong2 / 1e3;
  const trackStart = v <= 0 ? "0px" : `min(calc(${v}% + 4px), calc(100% - 4px))`;
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
    _progress.Progress.Root,
    {
      ref,
      value: determinate ? v : null,
      "aria-label": _nullishCoalesce(label, () => ( "Loading")),
      getAriaValueText: (_formatted, val) => val == null ? "indeterminate progress" : `${Math.round(val)}%`,
      className: cn("flex flex-col gap-1", fullWidth && "w-full", className),
      children: [
        (label || determinate) && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-center justify-between", children: [
          label && // Progress.Label wires aria-labelledby on the Root for screen readers
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _progress.Progress.Label, { className: "md-label-medium text-m3-on-surface-variant", children: label }),
          determinate && /* Deterministic "N%" text — Base UI's Intl percent formatting is
             locale-dependent (e.g. "42 %" in fr-FR) and would drift from the
             previous rendering / SSR hydration. Value is aria-hidden, so the
             live value is announced once via the Root's valuetext. */
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _progress.Progress.Value, { className: "md-label-medium text-m3-on-surface-variant", children: (_formattedValue, val) => `${Math.round(_nullishCoalesce(val, () => ( 0)))}%` })
        ] }),
        isWavy ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _progress.Progress.Track, { className: "relative h-[10px] overflow-hidden rounded-full", children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            "span",
            {
              className: "absolute end-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-m3-secondary-container",
              style: { insetInlineStart: determinate ? trackStart : 0 }
            }
          ),
          determinate ? (
            // Base UI slices the Indicator to the value percentage (inline width)
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              _progress.Progress.Indicator,
              {
                className: "absolute top-0 overflow-hidden",
                style: { maxWidth: "calc(100% - 8px)" },
                children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  PulsingWave,
                  {
                    stroke,
                    slideDuration: slide,
                    wavelength: 40,
                    reduceMotion
                  }
                )
              }
            )
          ) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _progress.Progress.Indicator, { className: "absolute inset-0", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            PulsingWave,
            {
              stroke,
              slideDuration: slide,
              wavelength: 20,
              reduceMotion
            }
          ) }),
          determinate && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            "span",
            {
              className: "absolute end-0 top-1/2 h-[4px] w-[4px] -translate-y-1/2 rounded-full",
              style: { background: stroke }
            }
          )
        ] }) : /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
          _progress.Progress.Track,
          {
            className: "relative overflow-visible rounded-full bg-transparent",
            style: { height },
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                "span",
                {
                  className: "absolute inset-y-0 end-0 rounded-full bg-m3-secondary-container",
                  style: { insetInlineStart: determinate ? trackStart : 0 }
                }
              ),
              determinate ? (
                // Width is owned by Base UI (inline % of value); the end-state is
                // animated with the M3 emphasized curve (CSS approximation of the
                // defaultSpatial spring), maxWidth keeps the 4px stop-dot gap.
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  _progress.Progress.Indicator,
                  {
                    className: "absolute top-0 rounded-full",
                    style: {
                      background: stroke,
                      maxWidth: "calc(100% - 8px)",
                      transition: reduceMotion ? "none" : `width ${durations.medium4}ms ${easings.emphasized}`
                    }
                  }
                )
              ) : /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _progress.Progress.Indicator, { className: "absolute inset-0 overflow-hidden rounded-full", children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  _framermotion.motion.div,
                  {
                    className: "absolute top-0 h-full rounded-full",
                    style: { background: stroke, width: "35%" },
                    animate: reduceMotion ? { insetInlineStart: "0%" } : { insetInlineStart: ["-35%", "100%"] },
                    transition: reduceMotion ? { duration: 0 } : {
                      duration: durations.medium2 * 3 / 1e3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }
                ),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  _framermotion.motion.div,
                  {
                    className: "absolute top-0 h-full rounded-full",
                    style: { background: stroke, width: "60%" },
                    animate: reduceMotion ? { insetInlineStart: "40%" } : { insetInlineStart: ["100%", "-60%"] },
                    transition: reduceMotion ? { duration: 0 } : {
                      duration: durations.medium2 * 3 / 1e3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: durations.short4 / 1e3
                    }
                  }
                )
              ] }),
              determinate && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                "span",
                {
                  className: "absolute end-0 top-1/2 h-[4px] w-[4px] -translate-y-1/2 rounded-full",
                  style: { background: stroke }
                }
              )
            ]
          }
        )
      ]
    }
  );
});
LinearProgress.displayName = "LinearProgress";

// ../../src/components/m3/CircularProgress.tsx




var asTransition2 = (s) => s;
var CircularProgress = React14.forwardRef(function CircularProgress2({
  value,
  size,
  thickness = 4,
  wavy,
  wavey = false,
  color = "primary",
  ariaLabel = "Loading",
  className
}, ref) {
  const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
  const determinate = typeof value === "number";
  const isWavy = _nullishCoalesce(wavy, () => ( wavey));
  const resolvedSize = _nullishCoalesce(size, () => ( (isWavy ? 48 : 40)));
  const v = determinate ? Math.min(100, Math.max(0, value)) : 0;
  const stroke = colorVar(color);
  const cx = resolvedSize / 2;
  const r = (resolvedSize - thickness) / 2 - (isWavy ? 3 : 1);
  const c = 2 * Math.PI * r;
  const gap = 4;
  const activeFraction = v / 100;
  const arcLen = activeFraction * c;
  const offset = c - arcLen;
  const adjustedGap = Math.min(arcLen, gap + thickness);
  const trackStart = arcLen + adjustedGap;
  const trackLen = Math.max(0, c - arcLen - adjustedGap * 2);
  const trackGapFraction = Math.min(activeFraction, (gap + thickness) / c);
  const trackStartFraction = activeFraction + trackGapFraction;
  const trackFraction = Math.max(
    0,
    1 - activeFraction - trackGapFraction * 2
  );
  const arc = 0.15;
  const spin = durations.long2 * 3 / 1e3;
  const wavePath2 = (() => {
    const points = 96;
    const amplitude = 1.6 * thickness / 4;
    let path = "";
    for (let i = 0; i <= points; i += 1) {
      const angle = i / points * Math.PI * 2 - Math.PI / 2;
      const waveRadius = r + Math.sin(angle * 10) * amplitude;
      const x = cx + Math.cos(angle) * waveRadius;
      const y = cx + Math.sin(angle) * waveRadius;
      path += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
    }
    return `${path}Z`;
  })();
  const track = isWavy ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    "path",
    {
      d: wavePath2,
      fill: "none",
      stroke: "var(--md-secondary-container)",
      strokeWidth: thickness,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      pathLength: 1,
      strokeDasharray: `${trackFraction} ${1 - trackFraction}`,
      strokeDashoffset: -trackStartFraction
    }
  ) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    "circle",
    {
      cx,
      cy: cx,
      r,
      fill: "none",
      stroke: "var(--md-secondary-container)",
      strokeWidth: thickness,
      strokeLinecap: "round",
      strokeDasharray: `${trackLen} ${c - trackLen}`,
      strokeDashoffset: -trackStart,
      transform: `rotate(-90 ${cx} ${cx})`
    }
  );
  if (!determinate) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _progress.Progress.Root,
      {
        ref,
        value: null,
        "aria-label": ariaLabel,
        className: cn("inline-block shrink-0", className),
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          _framermotion.motion.svg,
          {
            "aria-hidden": "true",
            width: resolvedSize,
            height: resolvedSize,
            viewBox: `0 0 ${resolvedSize} ${resolvedSize}`,
            animate: reduceMotion ? void 0 : { rotate: 360 },
            transition: reduceMotion ? { duration: 0 } : { duration: spin, repeat: Infinity, ease: "linear" },
            children: isWavy ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              _framermotion.motion.path,
              {
                d: wavePath2,
                fill: "none",
                stroke,
                strokeWidth: thickness,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                pathLength: 1,
                animate: reduceMotion ? void 0 : {
                  strokeDasharray: [
                    `${arc} ${1 - arc}`,
                    "0.75 0.25",
                    `${arc} ${1 - arc}`
                  ]
                },
                transition: reduceMotion ? { duration: 0 } : {
                  duration: spin,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            ) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              _framermotion.motion.circle,
              {
                cx,
                cy: cx,
                r,
                fill: "none",
                stroke,
                strokeWidth: thickness,
                strokeLinecap: "round",
                pathLength: 1,
                transform: `rotate(-90 ${cx} ${cx})`,
                animate: reduceMotion ? void 0 : {
                  strokeDasharray: [
                    `${arc} ${1 - arc}`,
                    "0.75 0.25",
                    `${arc} ${1 - arc}`
                  ]
                },
                transition: reduceMotion ? { duration: 0 } : {
                  duration: spin,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            )
          }
        )
      }
    );
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    _progress.Progress.Root,
    {
      ref,
      value: v,
      "aria-label": ariaLabel,
      getAriaValueText: (_formatted, val) => `${Math.round(_nullishCoalesce(val, () => ( 0)))}%`,
      className: cn("inline-block shrink-0", className),
      children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
        _framermotion.motion.svg,
        {
          "aria-hidden": "true",
          width: resolvedSize,
          height: resolvedSize,
          viewBox: `0 0 ${resolvedSize} ${resolvedSize}`,
          children: [
            track,
            isWavy ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              _framermotion.motion.path,
              {
                d: wavePath2,
                fill: "none",
                stroke,
                strokeWidth: thickness,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                pathLength: 1,
                initial: reduceMotion ? false : { pathLength: 0 },
                animate: { pathLength: v / 100 },
                transition: reduceMotion ? { duration: 0 } : asTransition2(springs.defaultSpatial)
              }
            ) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              _framermotion.motion.circle,
              {
                cx,
                cy: cx,
                r,
                fill: "none",
                stroke,
                strokeWidth: thickness,
                strokeLinecap: "round",
                strokeDasharray: c,
                transform: `rotate(-90 ${cx} ${cx})`,
                initial: reduceMotion ? false : { strokeDashoffset: c },
                animate: { strokeDashoffset: offset },
                transition: reduceMotion ? { duration: 0 } : asTransition2(springs.defaultSpatial)
              }
            )
          ]
        }
      )
    }
  );
});
CircularProgress.displayName = "CircularProgress";

// ../../src/components/m3/LoadingIndicator.tsx



var asTransition3 = (spring10) => spring10;
var containerStyles = {
  primary: "bg-m3-primary-container",
  secondary: "bg-m3-secondary-container",
  tertiary: "bg-m3-tertiary-container",
  error: "bg-m3-error-container"
};
var TAU = Math.PI * 2;
var POINTS = 40;
function regularPolygonRadius(angle, sides) {
  const sector = TAU / sides;
  const local = ((angle + sector / 2) % sector + sector) % sector - sector / 2;
  return Math.cos(Math.PI / sides) / Math.cos(local);
}
function superellipseRadius(angle, xRadius, yRadius, power) {
  const x = Math.abs(Math.cos(angle) / xRadius) ** power;
  const y = Math.abs(Math.sin(angle) / yRadius) ** power;
  return (x + y) ** (-1 / power);
}
function indicatorPath(shape) {
  let path = "";
  for (let index = 0; index < POINTS; index += 1) {
    const angle = index / POINTS * TAU - Math.PI / 2;
    let radius = 1;
    if (shape === "soft-burst") radius = 0.76 + 0.24 * Math.cos(angle * 10);
    if (shape === "cookie-9") radius = 0.84 + 0.16 * Math.cos(angle * 9);
    if (shape === "pentagon") radius = regularPolygonRadius(angle, 5);
    if (shape === "pill") radius = superellipseRadius(angle, 1, 0.58, 6);
    if (shape === "sunny") radius = 0.8 + 0.2 * Math.cos(angle * 8);
    if (shape === "cookie-4") radius = 0.78 + 0.22 * Math.cos(angle * 4);
    if (shape === "oval") radius = superellipseRadius(angle, 1, 0.7, 2);
    const x = 50 + Math.cos(angle) * radius * 46;
    const y = 50 + Math.sin(angle) * radius * 46;
    path += `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return `${path}Z`;
}
function determinatePath(progress2) {
  let path = "";
  for (let index = 0; index < POINTS; index += 1) {
    const angle = index / POINTS * TAU - Math.PI / 2;
    const softBurstRadius = 0.76 + 0.24 * Math.cos(angle * 10);
    const radius = 1 + (softBurstRadius - 1) * progress2;
    const x = 50 + Math.cos(angle) * radius * 46;
    const y = 50 + Math.sin(angle) * radius * 46;
    path += `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return `${path}Z`;
}
var CIRCLE_PATH = indicatorPath("circle");
var MORPH_PATHS = [
  indicatorPath("soft-burst"),
  indicatorPath("cookie-9"),
  indicatorPath("pentagon"),
  indicatorPath("pill"),
  indicatorPath("sunny"),
  indicatorPath("cookie-4"),
  indicatorPath("oval"),
  indicatorPath("soft-burst")
];
var LoadingIndicator = React15.forwardRef(function LoadingIndicator2({
  size = 48,
  progress: progress2,
  active = true,
  variant = "uncontained",
  color = "primary",
  ariaLabel = "Loading",
  className
}, ref) {
  const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
  const determinate = typeof progress2 === "number";
  const resolvedProgress = determinate ? Math.min(1, Math.max(0, progress2)) : 0;
  const spinning = active && !determinate && !reduceMotion;
  const globalRotation = durations.extraLong4 * 4.666 / 1e3;
  const morphStep = durations.extraLong4 * 0.65 / 1e3;
  const morphCycle = morphStep * 7;
  const contained = variant === "contained";
  const indicatorColor = colorVar(
    contained ? `on-${color}-container` : color
  );
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    "div",
    {
      ref,
      role: active || determinate ? "progressbar" : void 0,
      "aria-label": active || determinate ? ariaLabel : void 0,
      "aria-valuemin": determinate ? 0 : void 0,
      "aria-valuemax": determinate ? 1 : void 0,
      "aria-valuenow": determinate ? resolvedProgress : void 0,
      "aria-hidden": active || determinate ? void 0 : true,
      "data-variant": variant,
      className: cn(
        "relative flex items-center justify-center rounded-full",
        contained && containerStyles[color],
        !active && !determinate && "opacity-38",
        className
      ),
      style: { width: size, height: size },
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
        _framermotion.motion.svg,
        {
          viewBox: "0 0 100 100",
          className: "h-[79.1667%] w-[79.1667%] overflow-visible",
          "aria-hidden": "true",
          animate: spinning ? { rotate: 360 } : { rotate: 0 },
          transition: spinning ? { duration: globalRotation, repeat: Infinity, ease: "linear" } : { duration: durations.short4 / 1e3 },
          children: determinate ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            _framermotion.motion.path,
            {
              d: determinatePath(resolvedProgress),
              fill: indicatorColor,
              stroke: indicatorColor,
              strokeWidth: "1.5",
              strokeLinejoin: "round",
              animate: {
                d: determinatePath(resolvedProgress),
                rotate: -resolvedProgress * 180
              },
              transition: reduceMotion ? { duration: 0 } : asTransition3(springs.defaultSpatial),
              style: { transformOrigin: "50px 50px" }
            }
          ) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            _framermotion.motion.path,
            {
              d: CIRCLE_PATH,
              fill: indicatorColor,
              stroke: indicatorColor,
              strokeWidth: "1.5",
              strokeLinejoin: "round",
              animate: spinning ? {
                d: MORPH_PATHS,
                rotate: [0, 90, 180, 270, 360, 450, 540, 630]
              } : { d: CIRCLE_PATH, rotate: 0 },
              transition: spinning ? {
                d: {
                  duration: morphCycle,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: morphCycle,
                  repeat: Infinity,
                  ease: "linear"
                }
              } : { duration: durations.short4 / 1e3 },
              style: { transformOrigin: "50px 50px" }
            }
          )
        }
      )
    }
  );
});
LoadingIndicator.displayName = "LoadingIndicator";

// ../../src/components/m3/Snackbar.tsx

var _toast = require('@base-ui/react/toast');

var POSITION_CLASSES = "fixed bottom-4 left-4 z-[70] flex sm:bottom-6 sm:left-6";
var CARD_CLASSES = "m3-elevation-3 md-body-medium flex min-h-12 w-[calc(100vw-32px)] max-w-[600px] items-center gap-3 rounded-[4px] bg-m3-inverse-surface px-4 py-3 text-m3-inverse-on-surface sm:w-auto sm:min-w-[344px]";
var MOTION_CLASSES = [
  "transition-[transform,opacity]",
  "duration-[500ms]",
  // Enter leg: M3 emphasized-decelerate.
  "[transition-timing-function:cubic-bezier(0.05,0.7,0.1,1)]",
  "[&[data-starting-style]]:opacity-0",
  "[&[data-starting-style]]:[transform:translateY(60px)]",
  // Exit leg: M3 emphasized-accelerate, slide back down for non-drag
  // dismissals (auto / close icon / Esc) — same default as before.
  "[&[data-ending-style]]:duration-[400ms]",
  "[&[data-ending-style]]:[transition-timing-function:cubic-bezier(0.3,0,0.8,0.15)]",
  "[&[data-ending-style]]:opacity-0",
  "[&[data-ending-style]]:[transform:translateY(60px)]",
  // Swipe dismissals keep flying along the released drag (3× the offset)
  // instead of snapping home; specificity of the double attribute selector
  // wins over the slide-down rule above.
  "[&[data-ending-style][data-swipe-direction]]:[transform:translate(calc(var(--toast-swipe-movement-x)*3),calc(var(--toast-swipe-movement-y)*3))]"
].join(" ");
var snackbarManager = _toast.Toast.createToastManager();
var SHARED_SNACKBAR_ID = "m3-snackbar";
var activeSnackbar = null;
var Snackbar = React16.forwardRef(
  function Snackbar2({
    open,
    message,
    icon,
    actionLabel,
    onAction,
    actionOnNewLine = false,
    onClose,
    duration = 4e3,
    className
  }, ref) {
    const ownerId = React16.useId();
    const onCloseRef = React16.useRef(onClose);
    React16.useEffect(() => {
      onCloseRef.current = onClose;
    });
    const activeIdRef = React16.useRef(null);
    const suppressOnCloseRef = React16.useRef(false);
    React16.useEffect(() => {
      if (open) {
        const sticky = Boolean(actionLabel) || !onCloseRef.current || !duration || duration <= 0;
        if (activeIdRef.current !== null) {
          snackbarManager.update(activeIdRef.current, {
            data: { ownerId },
            timeout: sticky ? 0 : duration
          });
          return;
        }
        if (activeSnackbar && activeSnackbar.ownerId !== ownerId) {
          activeSnackbar.replace();
        }
        activeIdRef.current = SHARED_SNACKBAR_ID;
        activeSnackbar = {
          ownerId,
          replace() {
            activeIdRef.current = null;
            _optionalChain([onCloseRef, 'access', _42 => _42.current, 'optionalCall', _43 => _43()]);
          }
        };
        snackbarManager.add({
          id: SHARED_SNACKBAR_ID,
          data: { ownerId },
          timeout: sticky ? 0 : duration,
          onClose() {
            activeIdRef.current = null;
            if (_optionalChain([activeSnackbar, 'optionalAccess', _44 => _44.ownerId]) === ownerId) activeSnackbar = null;
            if (suppressOnCloseRef.current) {
              suppressOnCloseRef.current = false;
              return;
            }
            _optionalChain([onCloseRef, 'access', _45 => _45.current, 'optionalCall', _46 => _46()]);
          }
        });
        return;
      }
      if (activeIdRef.current !== null) {
        const id = activeIdRef.current;
        activeIdRef.current = null;
        if (_optionalChain([activeSnackbar, 'optionalAccess', _47 => _47.ownerId]) === ownerId) activeSnackbar = null;
        suppressOnCloseRef.current = true;
        snackbarManager.close(id);
      }
    }, [open, actionLabel, duration, ownerId]);
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _toast.Toast.Provider, { toastManager: snackbarManager, limit: 1, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      SnackbarToasts,
      {
        ownerId,
        viewportRef: ref,
        message,
        icon,
        actionLabel,
        onAction,
        actionOnNewLine,
        onClose,
        className
      }
    ) });
  }
);
Snackbar.displayName = "Snackbar";
function SnackbarToasts({
  ownerId,
  viewportRef,
  message,
  icon,
  actionLabel,
  onAction,
  actionOnNewLine,
  onClose,
  className
}) {
  const { toasts } = _toast.Toast.useToastManager();
  const ownedToasts = toasts.filter(
    (toast) => _optionalChain([toast, 'access', _48 => _48.data, 'optionalAccess', _49 => _49.ownerId]) === ownerId && !toast.limited
  );
  if (ownedToasts.length === 0) return null;
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    _toast.Toast.Viewport,
    {
      ref: viewportRef,
      className: cn(POSITION_CLASSES, className),
      children: ownedToasts.map((toast) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
        _toast.Toast.Root,
        {
          toast,
          swipeDirection: ["up", "down", "left", "right"],
          style: { touchAction: "none" },
          className: cn(
            CARD_CLASSES,
            actionOnNewLine && "flex-col items-stretch gap-0",
            MOTION_CLASSES
          ),
          children: actionOnNewLine ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex w-full items-center gap-3", children: [
              icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon, size: 18, className: "shrink-0" }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _toast.Toast.Description, { className: "min-w-0 flex-1", children: message })
            ] }),
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex min-h-10 items-center justify-end gap-1 pt-1", children: [
              actionLabel && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                _toast.Toast.Action,
                {
                  onClick: onAction,
                  className: "m3-state md-label-large min-h-9 shrink-0 rounded-full px-3 uppercase text-m3-inverse-primary",
                  children: actionLabel
                }
              ),
              onClose && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, SnackbarClose, {})
            ] })
          ] }) : /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
            icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon, size: 18, className: "shrink-0" }),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _toast.Toast.Description, { className: "min-w-0 flex-1", children: message }),
            actionLabel && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              _toast.Toast.Action,
              {
                onClick: onAction,
                className: "m3-state md-label-large min-h-9 shrink-0 rounded-full px-3 uppercase text-m3-inverse-primary",
                children: actionLabel
              }
            ),
            onClose && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, SnackbarClose, {})
          ] })
        },
        toast.id
      ))
    }
  );
}
function SnackbarClose() {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    _toast.Toast.Close,
    {
      "aria-label": "Close",
      "aria-hidden": false,
      className: "m3-state flex size-9 shrink-0 items-center justify-center rounded-full text-m3-inverse-on-surface",
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "close", size: 18 })
    }
  );
}

// ../../src/components/m3/Tooltip.tsx




var _tooltip = require('@base-ui/react/tooltip');

var asTransition4 = (s) => s;
var SHOW_DELAY = durations.long2;
var HIDE_DELAY = durations.long4 * 2.5;
var Tooltip = React17.forwardRef(
  function Tooltip2({
    content,
    rich = false,
    title,
    actionLabel,
    onAction,
    actions,
    showCaret = false,
    persistent = false,
    defaultOpen = false,
    placement,
    align,
    children,
    className
  }, ref) {
    const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
    const actionsRef = React17.useRef({ unmount() {
    }, close() {
    } });
    const [tooltipHandle] = React17.useState(() => _tooltip.Tooltip.createHandle());
    const triggerId = React17.useId();
    const popupRef = React17.useRef(null);
    const keyboardActionMode = React17.useRef(false);
    const longPressTimer = React17.useRef(null);
    const touchOrigin = React17.useRef(null);
    const isPersistent = rich && persistent;
    const resolvedPlacement = _nullishCoalesce(placement, () => ( (rich ? "bottom" : "top")));
    const resolvedAlign = _nullishCoalesce(align, () => ( (rich ? "end" : "center")));
    const side = resolvedPlacement === "start" ? "inline-start" : resolvedPlacement === "end" ? "inline-end" : resolvedPlacement;
    const isHorizontal = resolvedPlacement === "left" || resolvedPlacement === "right" || resolvedPlacement === "start" || resolvedPlacement === "end";
    const direction = resolvedPlacement === "left" || resolvedPlacement === "start" ? 1 : -1;
    const resolvedActions = (_nullishCoalesce(actions, () => ( (actionLabel ? [{ label: actionLabel, onClick: onAction }] : [])))).slice(0, 2);
    const focusFirstAction = React17.useCallback(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          _optionalChain([popupRef, 'access', _50 => _50.current, 'optionalAccess', _51 => _51.querySelector, 'call', _52 => _52("button"), 'optionalAccess', _53 => _53.focus, 'call', _54 => _54()]);
        });
      });
    }, []);
    const handleTriggerKeyDown = (event) => {
      if (event.key !== "Tab" || event.shiftKey || !rich || resolvedActions.length === 0) {
        return;
      }
      event.preventDefault();
      keyboardActionMode.current = true;
      tooltipHandle.open(triggerId);
      focusFirstAction();
    };
    const handleActionKeyDown = (event, index) => {
      if (event.key === "Escape") {
        keyboardActionMode.current = false;
        _optionalChain([actionsRef, 'access', _55 => _55.current, 'optionalAccess', _56 => _56.close, 'call', _57 => _57()]);
        _optionalChain([document, 'access', _58 => _58.getElementById, 'call', _59 => _59(triggerId), 'optionalAccess', _60 => _60.focus, 'call', _61 => _61()]);
        return;
      }
      if (event.key !== "Tab") return;
      if (event.shiftKey && index === 0) {
        event.preventDefault();
        _optionalChain([document, 'access', _62 => _62.getElementById, 'call', _63 => _63(triggerId), 'optionalAccess', _64 => _64.focus, 'call', _65 => _65()]);
        return;
      }
      if (!event.shiftKey && index === resolvedActions.length - 1) {
        requestAnimationFrame(() => {
          keyboardActionMode.current = false;
          _optionalChain([actionsRef, 'access', _66 => _66.current, 'optionalAccess', _67 => _67.close, 'call', _68 => _68()]);
        });
      }
    };
    const clearLongPress = React17.useCallback(() => {
      if (longPressTimer.current !== null) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
      touchOrigin.current = null;
    }, []);
    React17.useEffect(() => clearLongPress, [clearLongPress]);
    const startLongPress = (event) => {
      if (event.pointerType !== "touch" || isPersistent) return;
      clearLongPress();
      touchOrigin.current = { x: event.clientX, y: event.clientY };
      longPressTimer.current = setTimeout(() => {
        longPressTimer.current = null;
        tooltipHandle.open(triggerId);
      }, SHOW_DELAY);
    };
    const cancelMovedLongPress = (event) => {
      const origin = touchOrigin.current;
      if (origin && Math.hypot(event.clientX - origin.x, event.clientY - origin.y) > 8) {
        clearLongPress();
      }
    };
    const popupMotion = {
      initial: {
        opacity: 0,
        scale: 0.8,
        x: isHorizontal ? direction * 4 : 0,
        y: isHorizontal ? 0 : resolvedPlacement === "top" ? 4 : -4
      },
      animate: { opacity: 1, scale: 1, x: 0, y: 0 },
      exit: {
        opacity: 0,
        scale: 0.9,
        x: isHorizontal ? direction * 4 : 0,
        y: isHorizontal ? 0 : resolvedPlacement === "top" ? 4 : -4
      },
      transition: reduceMotion ? { duration: 0 } : asTransition4(springs.fastVisual)
    };
    if (reduceMotion) {
      popupMotion.initial = false;
      popupMotion.exit = { opacity: 1, scale: 1, x: 0, y: 0 };
    }
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _tooltip.Tooltip.Provider, { delay: SHOW_DELAY, closeDelay: HIDE_DELAY, children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
      _tooltip.Tooltip.Root,
      {
        actionsRef,
        handle: tooltipHandle,
        defaultOpen: isPersistent && defaultOpen,
        defaultTriggerId: isPersistent && defaultOpen ? triggerId : void 0,
        onOpenChange: (nextOpen, eventDetails) => {
          if (isPersistent && (nextOpen && (eventDetails.reason === "trigger-hover" || eventDetails.reason === "trigger-focus") || !nextOpen && eventDetails.reason === "trigger-hover")) {
            eventDetails.cancel();
            return;
          }
          if (!nextOpen && keyboardActionMode.current) {
            eventDetails.cancel();
          }
        },
        children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            _tooltip.Tooltip.Trigger,
            {
              ref,
              id: triggerId,
              handle: tooltipHandle,
              onPointerDown: startLongPress,
              onPointerMove: cancelMovedLongPress,
              onPointerUp: clearLongPress,
              onPointerCancel: clearLongPress,
              onKeyDown: handleTriggerKeyDown,
              onClick: () => {
                if (isPersistent) tooltipHandle.open(triggerId);
              },
              render: React17.isValidElement(children) ? children : (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- fallback focus target when children is plain text; Base UI Trigger needs a focusable element
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { tabIndex: 0, className: "inline-flex", children })
              ),
              className: cn("m3-focus inline-flex", className)
            }
          ),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { onExitComplete: () => _optionalChain([actionsRef, 'access', _69 => _69.current, 'optionalAccess', _70 => _70.unmount, 'call', _71 => _71()]), children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _tooltip.Tooltip.Portal, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            _tooltip.Tooltip.Positioner,
            {
              side,
              align: resolvedAlign,
              sideOffset: 4,
              className: "z-50",
              children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
                _tooltip.Tooltip.Popup,
                {
                  ref: popupRef,
                  role: "tooltip",
                  render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.motion.span, { ...popupMotion }),
                  className: cn(
                    rich ? (
                      // Rich tooltips stay interactive (title + action); the popup
                      // is hoverable by default so the pointer can cross the gap.
                      "m3-elevation-2 block w-max max-w-[320px] rounded-[12px] bg-m3-surface-container px-4 pb-2 pt-3 text-m3-on-surface-variant"
                    ) : "md-body-small block min-h-6 max-w-[200px] rounded-[4px] bg-m3-inverse-surface px-2 py-1 text-m3-inverse-on-surface"
                  ),
                  children: [
                    rich ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: "block", children: [
                      title && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-title-small block", children: title }),
                      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-body-medium block", children: content }),
                      resolvedActions.length > 0 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "-ml-2 mt-2 flex flex-wrap gap-2", children: resolvedActions.map((action, index) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            _optionalChain([action, 'access', _72 => _72.onClick, 'optionalCall', _73 => _73()]);
                            keyboardActionMode.current = false;
                            _optionalChain([actionsRef, 'access', _74 => _74.current, 'optionalAccess', _75 => _75.close, 'call', _76 => _76()]);
                          },
                          onKeyDown: (event) => handleActionKeyDown(event, index),
                          className: "m3-state md-label-large inline-flex min-h-9 items-center rounded-full px-2 text-m3-primary",
                          children: action.label
                        },
                        action.label
                      )) })
                    ] }) : content,
                    showCaret && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                      _tooltip.Tooltip.Arrow,
                      {
                        className: ({ side: arrowSide }) => cn(
                          "absolute overflow-visible",
                          arrowSide === "left" || arrowSide === "right" || arrowSide === "inline-start" || arrowSide === "inline-end" ? "h-4 w-2" : "h-2 w-4",
                          "data-[side=bottom]:-top-2 data-[side=left]:-right-2 data-[side=right]:-left-2 data-[side=top]:-bottom-2",
                          "data-[side=inline-start]:-right-2 data-[side=inline-end]:-left-2"
                        ),
                        render: (arrowProps, arrowState) => {
                          const arrowSide = arrowState.side;
                          const horizontal = arrowSide === "left" || arrowSide === "right" || arrowSide === "inline-start" || arrowSide === "inline-end";
                          const path = arrowSide === "top" ? "M0 0H16L8 8Z" : arrowSide === "bottom" ? "M0 8H16L8 0Z" : arrowSide === "left" || arrowSide === "inline-start" ? "M0 0V16L8 8Z" : "M8 0V16L0 8Z";
                          return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                            "svg",
                            {
                              ...arrowProps,
                              viewBox: horizontal ? "0 0 8 16" : "0 0 16 8",
                              children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                                "path",
                                {
                                  d: path,
                                  fill: rich ? "var(--md-surface-container)" : "var(--md-inverse-surface)"
                                }
                              )
                            }
                          );
                        }
                      }
                    )
                  ]
                }
              )
            }
          ) }) })
        ]
      }
    ) });
  }
);
Tooltip.displayName = "Tooltip";

// ../../src/components/m3/Banner.tsx



var asTransition5 = (s) => s;
var Banner = React18.forwardRef(
  function Banner2({
    icon,
    text,
    actions,
    open = true,
    onClose,
    fullWidth = false,
    className
  }, ref) {
    const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { initial: false, children: open && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _framermotion.motion.div,
      {
        ref,
        initial: reduceMotion ? false : { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: reduceMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 },
        transition: reduceMotion ? { duration: 0 } : asTransition5(springs.defaultSpatial),
        className: cn("overflow-hidden", fullWidth && "w-full", className),
        children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
          "div",
          {
            "data-material-extension": "m2-banner",
            className: "bg-m3-surface-container-low",
            children: [
              /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-start gap-4 px-4 py-3", children: [
                icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  MaterialSymbol,
                  {
                    icon,
                    size: 24,
                    className: "shrink-0 text-m3-on-surface-variant"
                  }
                ),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "md-body-medium flex-1 text-m3-on-surface", children: text }),
                onClose && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    "aria-label": "Dismiss banner",
                    className: "m3-state flex size-9 shrink-0 items-center justify-center rounded-full text-m3-on-surface-variant",
                    children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "close", size: 20 })
                  }
                )
              ] }),
              actions && actions.length > 0 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "flex min-h-[52px] flex-wrap items-center justify-end gap-2 border-t border-m3-outline-variant px-2 py-1", children: actions.map((action) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                "button",
                {
                  type: "button",
                  onClick: action.onClick,
                  className: "m3-state md-label-large flex h-10 items-center rounded-full px-3 text-m3-primary",
                  children: action.label
                },
                action.label
              )) })
            ]
          }
        )
      }
    ) });
  }
);
Banner.displayName = "Banner";

// ../../src/components/m3/Dialog.tsx




var _dialog = require('@base-ui/react/dialog');

var Dialog = React19.forwardRef(
  function Dialog2({
    open,
    onClose,
    icon,
    headline,
    ariaLabel,
    children,
    actions,
    fullscreen = false,
    fullScreen,
    dismissible = true,
    className
  }, ref) {
    const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
    const isFullScreen = _nullishCoalesce(fullScreen, () => ( fullscreen));
    const headlineId = React19.useId();
    const bodyId = React19.useId();
    const actionsRef = React19.useRef({
      unmount() {
      },
      close() {
      }
    });
    const handleOpenChange = React19.useCallback(
      (nextOpen, eventDetails) => {
        if (nextOpen) return;
        if (!dismissible && (eventDetails.reason === "escape-key" || eventDetails.reason === "outside-press")) {
          return;
        }
        eventDetails.preventUnmountOnClose();
        onClose();
      },
      [dismissible, onClose]
    );
    const scrimMotion = {
      initial: reduceMotion ? false : { opacity: 0 },
      animate: { opacity: 1 },
      exit: reduceMotion ? { opacity: 1 } : { opacity: 0 },
      // Named framer easing (tokens.ts easings.* are CSS strings, not
      // framer Easing tuples); "easeOut" ≙ easings.standardDecelerate
      transition: reduceMotion ? { duration: 0 } : { duration: durations.short4 / 1e3, ease: "easeOut" }
    };
    const panelMotion = {
      initial: reduceMotion ? false : isFullScreen ? { y: 24, opacity: 0 } : { scale: 0.9, y: 20, opacity: 0 },
      animate: isFullScreen ? { y: 0, opacity: 1 } : { scale: 1, y: 0, opacity: 1 },
      exit: reduceMotion ? isFullScreen ? { y: 0, opacity: 1 } : { scale: 1, y: 0, opacity: 1 } : isFullScreen ? { y: 24, opacity: 0 } : { scale: 0.9, y: 20, opacity: 0 },
      transition: reduceMotion ? { duration: 0 } : springs.expressive
    };
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _dialog.Dialog.Root,
      {
        open,
        onOpenChange: handleOpenChange,
        actionsRef,
        modal: true,
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { onExitComplete: () => _optionalChain([actionsRef, 'access', _77 => _77.current, 'optionalAccess', _78 => _78.unmount, 'call', _79 => _79()]), children: open && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _dialog.Dialog.Portal, { children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            _dialog.Dialog.Backdrop,
            {
              render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.motion.div, { ...scrimMotion }),
              className: "fixed inset-0 z-[80] bg-m3-scrim/32"
            }
          ),
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
            _dialog.Dialog.Popup,
            {
              ref,
              role: isFullScreen ? "dialog" : "alertdialog",
              "aria-labelledby": headline ? headlineId : void 0,
              "aria-label": headline ? void 0 : _nullishCoalesce(ariaLabel, () => ( "Dialog")),
              "aria-describedby": children ? bodyId : void 0,
              render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.motion.div, { ...panelMotion }),
              className: cn(
                "bg-m3-surface-container-high outline-none",
                // Transform-free centering (inset-0 + margin auto) — framer owns
                // the transform for the M3 entrance spring.
                isFullScreen ? "fixed inset-0 z-[80] flex h-full w-full flex-col rounded-none" : "fixed inset-0 z-[80] m-auto flex h-fit max-h-[calc(100dvh-48px)] w-[min(560px,calc(100vw-3rem))] min-w-[280px] flex-col overflow-hidden rounded-[28px] m3-elevation-3",
                className
              ),
              children: [
                isFullScreen && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "header", { className: "flex h-14 shrink-0 items-center gap-2 border-b border-m3-outline-variant bg-m3-surface px-1 pr-4", children: [
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                    "button",
                    {
                      type: "button",
                      "aria-label": "Close dialog",
                      onClick: onClose,
                      className: "m3-state m3-focus flex size-12 shrink-0 items-center justify-center rounded-full text-m3-on-surface outline-none",
                      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "close", size: 24 })
                    }
                  ),
                  headline && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                    "h2",
                    {
                      id: headlineId,
                      className: "md-title-large min-w-0 flex-1 truncate text-m3-on-surface",
                      children: headline
                    }
                  )
                ] }),
                isFullScreen ? children && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  "div",
                  {
                    id: bodyId,
                    className: "m3-scroll md-body-medium min-h-0 flex-1 overflow-y-auto px-6 py-6 text-m3-on-surface-variant",
                    children
                  }
                ) : /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
                  (icon || headline) && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "shrink-0 px-6 pt-6", children: [
                    icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "mb-4 flex justify-center", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                      MaterialSymbol,
                      {
                        icon,
                        size: 24,
                        className: "text-m3-primary"
                      }
                    ) }),
                    headline && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                      "h2",
                      {
                        id: headlineId,
                        className: cn(
                          "md-headline-small text-m3-on-surface",
                          icon && "text-center"
                        ),
                        children: headline
                      }
                    )
                  ] }),
                  children && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                    "div",
                    {
                      id: bodyId,
                      className: cn(
                        "m3-scroll md-body-medium min-h-0 overflow-y-auto px-6 text-m3-on-surface-variant",
                        icon || headline ? "pt-4" : "pt-6",
                        !actions && "pb-6"
                      ),
                      children
                    }
                  ),
                  actions && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "flex shrink-0 flex-wrap items-center justify-end gap-2 px-6 pb-6 pt-6", children: actions })
                ] }),
                isFullScreen && actions && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "flex h-14 shrink-0 flex-wrap items-center justify-end gap-2 border-t border-m3-outline-variant bg-m3-surface px-4", children: actions })
              ]
            }
          )
        ] }) })
      }
    );
  }
);
Dialog.displayName = "Dialog";

// ../../src/components/m3/Divider.tsx

var _separator = require('@base-ui/react/separator');

var horizontalInsets = {
  none: "w-full",
  start: "ms-4 w-[calc(100%-1rem)]",
  // M3 divider guideline: inset dividers are equally indented (16dp)
  middle: "mx-4 w-[calc(100%-2rem)]",
  end: "me-4 w-[calc(100%-1rem)]",
  // Official M3 list divider insets: 16dp start / 24dp end.
  list: "ms-4 me-6 w-[calc(100%-2.5rem)]"
};
var verticalInsets = {
  none: "h-full",
  start: "mt-4 h-[calc(100%-1rem)]",
  middle: "my-4 h-[calc(100%-2rem)]",
  end: "mb-4 h-[calc(100%-1rem)]",
  // The list preset keeps its official 16dp start / 24dp end geometry.
  list: "mt-4 mb-6 h-[calc(100%-2.5rem)]"
};
var Divider = React20.forwardRef(function Divider2({
  inset = "none",
  thickness = 1,
  color = "outline-variant",
  orientation = "horizontal",
  semantic = false,
  className
}, ref) {
  const horizontal = orientation === "horizontal";
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    _separator.Separator,
    {
      ref,
      orientation,
      role: semantic ? "separator" : "none",
      "aria-orientation": semantic ? orientation : void 0,
      className: cn(
        "shrink-0",
        !horizontal && "self-stretch",
        horizontal ? horizontalInsets[inset] : verticalInsets[inset],
        color === "outline" ? "bg-m3-outline" : "bg-m3-outline-variant",
        className
      ),
      style: horizontal ? { height: thickness } : { width: thickness }
    }
  );
});
Divider.displayName = "Divider";

// ../../src/components/m3/Card.tsx



var variantStyles5 = {
  elevated: "bg-m3-surface-container-low m3-elevation-1",
  filled: "bg-m3-surface-container-highest",
  // Verified current M3 spec: outlined = surface + 1dp outline-variant stroke
  // (the 2021 token sheet's `outline` was superseded; Compose uses OutlineVariant)
  outlined: "bg-m3-surface border border-m3-outline-variant"
};
var shapeStyles2 = {
  medium: "rounded-xl",
  extraLarge: "rounded-[28px]"
};
var hoverElevation2 = "hover:[box-shadow:0_1px_2px_0_rgb(0_0_0/0.30),0_2px_6px_2px_rgb(0_0_0/0.15)]";
var hoverElevation1 = "hover:[box-shadow:0_1px_2px_0_rgb(0_0_0/0.30),0_1px_3px_1px_rgb(0_0_0/0.15)]";
var disabledStyles5 = {
  elevated: "bg-m3-surface m3-elevation-1",
  filled: "bg-[color-mix(in_srgb,var(--md-surface-variant)_38%,var(--md-surface-container-highest))] shadow-none",
  outlined: "bg-m3-surface border-m3-outline/12 shadow-none"
};
var Card = React21.forwardRef(function Card2({
  variant = "elevated",
  shape = "medium",
  interactive,
  disabled = false,
  onClick,
  className,
  children,
  ...props
}, ref) {
  const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
  const hasAction = Boolean(onClick) && (_nullishCoalesce(interactive, () => ( true)));
  const isInteractive = hasAction && !disabled;
  const restRadius = shape === "extraLarge" ? shapes.extraLarge : shapeMorph.card.rest;
  const pressedRadius = shape === "extraLarge" ? shapes.large : shapeMorph.card.pressed;
  const handleKeyDown = React21.useCallback(
    (e) => {
      if (!onClick) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(e);
      }
    },
    [onClick]
  );
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
    _framermotion.motion.div,
    {
      ref,
      role: hasAction ? "button" : void 0,
      "aria-disabled": hasAction && disabled ? true : void 0,
      tabIndex: hasAction ? disabled ? -1 : 0 : void 0,
      onClick: isInteractive ? onClick : void 0,
      onKeyDown: isInteractive ? handleKeyDown : void 0,
      whileTap: isInteractive && !reduceMotion ? { scale: 0.97, borderRadius: pressedRadius } : void 0,
      style: { borderRadius: restRadius },
      transition: reduceMotion ? { duration: 0 } : springs.expressive,
      className: cn(
        "relative overflow-hidden",
        shapeStyles2[shape],
        variantStyles5[variant],
        isInteractive && "m3-state m3-focus cursor-pointer outline-none transition-shadow duration-200",
        isInteractive && variant === "elevated" && hoverElevation2,
        isInteractive && variant === "filled" && hoverElevation1,
        disabled && [
          "pointer-events-none text-m3-on-surface/38 [&>*]:opacity-38",
          disabledStyles5[variant]
        ],
        className
      ),
      ...props,
      children: [
        isInteractive && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
        children
      ]
    }
  );
});

// ../../src/components/m3/List.tsx



var ListContext = React22.createContext({
  variant: "standard",
  selectionMode: "none"
});
var List = React22.forwardRef(function List2({
  variant = "standard",
  selectionMode = "none",
  dividers = false,
  className,
  children,
  onFocus,
  onKeyDown,
  role,
  tabIndex,
  ...props
}, ref) {
  const selectable = selectionMode !== "none";
  const focusOption = (list, index) => {
    const options = Array.from(
      list.querySelectorAll(
        '[role="option"]:not([aria-disabled="true"])'
      )
    );
    _optionalChain([options, 'access', _80 => _80[Math.min(options.length - 1, Math.max(0, index))], 'optionalAccess', _81 => _81.focus, 'call', _82 => _82()]);
  };
  const handleFocus = (event) => {
    _optionalChain([onFocus, 'optionalCall', _83 => _83(event)]);
    if (!selectable || event.defaultPrevented || event.target !== event.currentTarget)
      return;
    const options = Array.from(
      event.currentTarget.querySelectorAll(
        '[role="option"]:not([aria-disabled="true"])'
      )
    );
    if (options.length === 0) return;
    _optionalChain([(_nullishCoalesce(options.find((option) => option.getAttribute("aria-selected") === "true"), () => ( options[0]))), 'optionalAccess', _84 => _84.focus, 'call', _85 => _85()]);
  };
  const handleKeyDown = (event) => {
    _optionalChain([onKeyDown, 'optionalCall', _86 => _86(event)]);
    if (!selectable || event.defaultPrevented) return;
    const options = Array.from(
      event.currentTarget.querySelectorAll(
        '[role="option"]:not([aria-disabled="true"])'
      )
    );
    const current = options.findIndex((option) => option === document.activeElement);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusOption(event.currentTarget, current < 0 ? 0 : (current + 1) % options.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusOption(
        event.currentTarget,
        current < 0 ? options.length - 1 : (current - 1 + options.length) % options.length
      );
    } else if (event.key === "Home") {
      event.preventDefault();
      focusOption(event.currentTarget, 0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusOption(event.currentTarget, options.length - 1);
    }
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, ListContext.Provider, { value: { variant, selectionMode }, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    "ul",
    {
      ref,
      "data-variant": variant,
      role: selectable ? "listbox" : role,
      "aria-multiselectable": selectionMode === "multiple" ? true : void 0,
      tabIndex: selectable ? _nullishCoalesce(tabIndex, () => ( 0)) : tabIndex,
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
      className: cn(
        "m3-scroll flex w-full flex-col px-2",
        variant === "segmented" && [
          "gap-0.5",
          "[&>li:first-child>*:not([data-selected])]:rounded-t-[16px] [&>li:first-child>*:not([data-selected])]:rounded-b-[4px]",
          "[&>li:last-child>*:not([data-selected])]:rounded-t-[4px] [&>li:last-child>*:not([data-selected])]:rounded-b-[16px]",
          "[&>li:only-child>*:not([data-selected])]:rounded-[16px]",
          "[&>li:not(:first-child):not(:last-child)>*:not([data-selected])]:rounded-[4px]"
        ],
        dividers && variant === "standard" && "divide-y divide-m3-outline-variant",
        className
      ),
      ...props,
      children
    }
  ) });
});
var ListItem = React22.forwardRef(
  function ListItem2({
    headline,
    supporting,
    overline,
    lines,
    leading,
    trailing,
    trailingIcon,
    selected = false,
    disabled = false,
    onClick,
    className
  }, ref) {
    const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
    const isButton = Boolean(onClick);
    const { variant, selectionMode } = React22.useContext(ListContext);
    const selectable = selectionMode !== "none";
    const hasSupporting = supporting !== void 0 || overline !== void 0;
    const lineCount = _nullishCoalesce(lines, () => ( (hasSupporting ? 2 : 1)));
    const isThreeLine = lineCount >= 3;
    const contentColor = selected ? "text-m3-on-secondary-container" : void 0;
    const content = /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
      leading && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
        "span",
        {
          className: cn(
            "flex w-10 shrink-0 items-center justify-center [&_.material-symbols-rounded]:text-[20px]!",
            isThreeLine && "self-start",
            _nullishCoalesce(contentColor, () => ( "text-m3-on-surface-variant"))
          ),
          children: leading
        }
      ),
      /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: cn("min-w-0 flex-1", isThreeLine && "self-start"), children: [
        overline && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-label-small block truncate", children: overline }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          "span",
          {
            className: cn(
              "md-body-large block truncate",
              _nullishCoalesce(contentColor, () => ( "text-m3-on-surface"))
            ),
            children: headline
          }
        ),
        supporting && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          "span",
          {
            className: cn(
              "md-body-medium block text-m3-on-surface-variant",
              isThreeLine ? "line-clamp-2" : "truncate",
              contentColor
            ),
            children: supporting
          }
        )
      ] }),
      (trailing !== void 0 || trailingIcon !== void 0 || selected) && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
        "span",
        {
          className: cn(
            "ms-auto flex shrink-0 items-center gap-2 md-label-small [&_.material-symbols-rounded]:text-[20px]!",
            isThreeLine && "self-start",
            _nullishCoalesce(contentColor, () => ( "text-m3-on-surface-variant"))
          ),
          children: [
            trailing,
            trailingIcon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: trailingIcon, size: 20 }),
            selected && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              MaterialSymbol,
              {
                icon: selectionMode === "multiple" ? "check_box" : selectionMode === "single" ? "radio_button_checked" : "check",
                size: 20,
                fill: true
              }
            )
          ]
        }
      )
    ] });
    const rowClassName = cn(
      // Current expressive list tokens use 16dp inline padding.
      "relative flex w-full items-center gap-4 overflow-hidden ps-4 pe-4 text-start",
      lineCount === 1 && "min-h-14",
      // 56dp official one-line height
      lineCount === 2 && "min-h-[72px] py-3",
      // The row's 12dp top padding aligns every three-line slot once. Child
      // slots must not add another 12dp and drift to 24dp from the top.
      isThreeLine && "min-h-[88px] py-3",
      selected ? "rounded-[16px] bg-m3-secondary-container text-m3-on-secondary-container" : variant === "segmented" ? "bg-m3-surface" : "rounded-[4px] bg-transparent",
      !disabled && isButton && "m3-state m3-focus cursor-pointer outline-none"
    );
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      "li",
      {
        ref,
        className: cn(disabled && "opacity-38", className),
        "aria-current": !selectable && selected ? "true" : void 0,
        children: isButton ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
          _framermotion.motion.button,
          {
            type: "button",
            disabled,
            role: selectable ? "option" : void 0,
            "aria-selected": selectable ? selected : void 0,
            "aria-disabled": selectable && disabled ? true : void 0,
            "data-selected": selected ? "" : void 0,
            tabIndex: selectable ? -1 : void 0,
            whileHover: disabled || reduceMotion ? void 0 : { borderRadius: selected ? 16 : 12 },
            whileFocus: disabled || reduceMotion ? void 0 : { borderRadius: 16 },
            whileTap: disabled || reduceMotion ? void 0 : { scale: 0.98, borderRadius: 16 },
            transition: reduceMotion ? { duration: 0 } : springs.fastVisual,
            onClick,
            className: rowClassName,
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
              content
            ]
          }
        ) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          "div",
          {
            role: selectable ? "option" : void 0,
            "aria-selected": selectable ? selected : void 0,
            "aria-disabled": selectable && disabled ? true : void 0,
            "data-selected": selected ? "" : void 0,
            tabIndex: selectable ? -1 : void 0,
            className: rowClassName,
            children: content
          }
        )
      }
    );
  }
);

// ../../src/components/m3/BottomSheet.tsx






var BottomSheet = React23.forwardRef(function BottomSheet2({
  open,
  onClose,
  variant = "modal",
  title,
  children,
  footer,
  sheetState,
  defaultState = "partial",
  onStateChange,
  partialHeight = "50dvh",
  maxHeight,
  className
}, ref) {
  const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
  const isModal = variant === "modal";
  const actionsRef = React23.useRef({ unmount() {
  }, close() {
  } });
  const [internalState, setInternalState] = React23.useState(defaultState);
  const currentState = _nullishCoalesce(sheetState, () => ( internalState));
  const expandedHeight = _nullishCoalesce(maxHeight, () => ( "var(--bottom-sheet-expanded-height)"));
  const responsiveHeight = "[--bottom-sheet-expanded-height:calc(100dvh-72px)] min-[641px]:[--bottom-sheet-expanded-height:calc(100dvh-56px)]";
  const setSheetState = React23.useCallback(
    (nextState) => {
      if (sheetState === void 0) setInternalState(nextState);
      _optionalChain([onStateChange, 'optionalCall', _87 => _87(nextState)]);
    },
    [onStateChange, sheetState]
  );
  const cycleHeight = React23.useCallback(() => {
    setSheetState(currentState === "partial" ? "expanded" : "partial");
  }, [currentState, setSheetState]);
  const handleOpenChange = React23.useCallback(
    (nextOpen, eventDetails) => {
      if (!nextOpen) eventDetails.preventUnmountOnClose();
      onClose();
    },
    [onClose]
  );
  const handle = /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    "button",
    {
      type: "button",
      "aria-label": currentState === "partial" ? "Expand bottom sheet" : "Partially expand bottom sheet",
      "aria-expanded": currentState === "expanded",
      onClick: cycleHeight,
      className: "m3-focus mx-auto flex h-12 w-12 shrink-0 cursor-grab items-center justify-center rounded-full outline-none",
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
        "span",
        {
          "aria-hidden": "true",
          className: "h-1 w-8 rounded-full bg-m3-on-surface-variant"
        }
      )
    }
  );
  const titleEl = title ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "h2", { className: "md-title-large mb-2 shrink-0 px-1 text-m3-on-surface", children: title }) : null;
  const contentEl = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "m3-scroll min-h-0 flex-1 overflow-y-auto", children });
  const footerEl = footer ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "mt-2 shrink-0 border-t border-m3-outline-variant pt-2", children: footer }) : null;
  if (!isModal) {
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
      "div",
      {
        ref,
        className: cn(
          "flex w-full flex-col overflow-hidden rounded-t-[28px] border border-m3-outline-variant bg-m3-surface-container-low px-6 pb-6",
          responsiveHeight,
          className
        ),
        style: {
          height: currentState === "partial" ? partialHeight : expandedHeight,
          maxHeight: expandedHeight
        },
        children: [
          handle,
          titleEl,
          contentEl,
          footerEl
        ]
      }
    );
  }
  const scrimMotion = {
    initial: reduceMotion ? false : { opacity: 0 },
    animate: { opacity: 1 },
    exit: reduceMotion ? { opacity: 1 } : { opacity: 0 },
    transition: reduceMotion ? { duration: 0 } : { duration: durations.short4 / 1e3, ease: "easeOut" }
  };
  const sheetMotion = {
    initial: reduceMotion ? false : { y: "100%" },
    animate: { y: 0 },
    exit: reduceMotion ? { y: 0 } : { y: "100%" },
    transition: reduceMotion ? { duration: 0 } : springs.defaultSpatial,
    drag: reduceMotion ? false : "y",
    dragConstraints: { top: -160, bottom: 0 },
    dragElastic: { top: 0, bottom: 0.6 },
    onDragEnd: (_, info) => {
      if (info.offset.y < -60 || info.velocity.y < -500) {
        setSheetState("expanded");
      } else if (info.offset.y > 120 || info.velocity.y > 500) {
        if (currentState === "expanded") setSheetState("partial");
        else onClose();
      }
    }
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _dialog.Dialog.Root, { open, onOpenChange: handleOpenChange, actionsRef, modal: true, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { onExitComplete: () => _optionalChain([actionsRef, 'access', _88 => _88.current, 'optionalAccess', _89 => _89.unmount, 'call', _90 => _90()]), children: open && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _dialog.Dialog.Portal, { children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _dialog.Dialog.Backdrop, { render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.motion.div, { ...scrimMotion }), className: "fixed inset-0 z-[85] bg-m3-scrim/32" }),
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
      _dialog.Dialog.Popup,
      {
        "aria-label": _nullishCoalesce(title, () => ( "Bottom sheet")),
        ref,
        render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.motion.div, { ...sheetMotion }),
        className: cn(
          // Official: full width up to 640dp; 56dp side margins when detached (>640dp windows)
          "fixed inset-x-0 bottom-0 z-[85] mx-auto flex w-full max-w-[640px] flex-col rounded-t-[28px] m3-elevation-1 bg-m3-surface-container-low px-6 pb-6 outline-none sm:left-14 sm:right-14 sm:w-auto",
          responsiveHeight,
          className
        ),
        style: {
          height: currentState === "partial" ? partialHeight : expandedHeight,
          maxHeight: expandedHeight
        },
        children: [
          handle,
          titleEl,
          contentEl,
          footerEl
        ]
      }
    )
  ] }) }) });
});

// ../../src/components/m3/SideSheet.tsx






var SideSheet = React24.forwardRef(
  function SideSheet2({
    open,
    onClose,
    side = "end",
    variant = "modal",
    title,
    children,
    footer,
    width = 360,
    className
  }, ref) {
    const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
    const directionAnchorRef = React24.useRef(null);
    const direction = useTextDirection(directionAnchorRef);
    const isModal = variant === "modal";
    const isEnd = side === "end" || side === "right";
    const titleId = React24.useId();
    const actionsRef = React24.useRef({
      unmount() {
      },
      close() {
      }
    });
    const handleOpenChange = React24.useCallback(
      (nextOpen, eventDetails) => {
        if (!nextOpen) eventDetails.preventUnmountOnClose();
        onClose();
      },
      [onClose]
    );
    const header = /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
      /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex min-h-12 shrink-0 items-center gap-3 pb-3", children: [
        title && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          "h2",
          {
            id: titleId,
            className: "md-title-large min-w-0 flex-1 text-m3-on-surface",
            children: title
          }
        ),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          "button",
          {
            type: "button",
            onClick: onClose,
            "aria-label": "Close side sheet",
            className: "m3-state m3-focus ms-auto flex size-12 shrink-0 items-center justify-center rounded-full text-m3-on-surface-variant outline-none",
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "close", size: 24 })
          }
        )
      ] }),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "mb-3 shrink-0 border-b border-m3-outline-variant" })
    ] });
    const footerEl = footer ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "mt-6 flex min-h-[72px] shrink-0 flex-wrap items-start justify-start gap-2 border-t border-m3-outline-variant pb-6 pt-4", children: footer }) : null;
    const contentEl = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "m3-scroll min-h-0 flex-1 overflow-y-auto", children });
    if (!isModal && !open) return null;
    if (!isModal) {
      return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { ref: directionAnchorRef, className: "contents", children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
        "div",
        {
          ref,
          role: "dialog",
          "aria-modal": "false",
          "aria-labelledby": title ? titleId : void 0,
          "aria-label": title ? void 0 : "Side sheet",
          dir: direction,
          className: cn(
            // Standard side sheet is surface-toned; 16dp radius on the inner edge only
            "inline-flex h-full min-h-0 flex-col overflow-hidden border border-m3-outline-variant bg-m3-surface px-6 pt-6",
            !footer && "pb-6",
            isEnd ? "rounded-s-[16px]" : "rounded-e-[16px]",
            className
          ),
          style: { width: Math.min(width, 400), maxWidth: "100%" },
          children: [
            header,
            contentEl,
            footerEl
          ]
        }
      ) });
    }
    const opensFromRight = isEnd !== (direction === "rtl");
    const scrimMotion = {
      initial: reduceMotion ? false : { opacity: 0 },
      animate: { opacity: 1 },
      exit: reduceMotion ? { opacity: 1 } : { opacity: 0 },
      transition: reduceMotion ? { duration: 0 } : { duration: durations.short4 / 1e3, ease: "easeOut" }
    };
    const sheetMotion = {
      initial: reduceMotion ? false : opensFromRight ? { x: "100%" } : { x: "-100%" },
      animate: { x: 0 },
      exit: reduceMotion ? { x: 0 } : opensFromRight ? { x: "100%" } : { x: "-100%" },
      transition: reduceMotion ? { duration: 0 } : springs.defaultSpatial
    };
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { ref: directionAnchorRef, className: "contents", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _dialog.Dialog.Root,
      {
        open,
        onOpenChange: handleOpenChange,
        actionsRef,
        modal: true,
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { onExitComplete: () => _optionalChain([actionsRef, 'access', _91 => _91.current, 'optionalAccess', _92 => _92.unmount, 'call', _93 => _93()]), children: open && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _dialog.Dialog.Portal, { children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            _dialog.Dialog.Backdrop,
            {
              render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.motion.div, { ...scrimMotion }),
              className: "fixed inset-0 z-[85] bg-m3-scrim/32"
            }
          ),
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
            _dialog.Dialog.Popup,
            {
              role: "dialog",
              "aria-labelledby": title ? titleId : void 0,
              "aria-label": title ? void 0 : "Side sheet",
              dir: direction,
              ref,
              render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.motion.div, { ...sheetMotion }),
              className: cn(
                "fixed inset-y-0 z-[85] flex h-full max-w-full flex-col bg-m3-surface-container-low px-6 pt-6 outline-none m3-elevation-1",
                !footer && "pb-6",
                isEnd ? "end-0 rounded-s-[16px]" : "start-0 rounded-e-[16px]",
                className
              ),
              style: { width: Math.min(width, 400) },
              children: [
                header,
                contentEl,
                footerEl
              ]
            }
          )
        ] }) })
      }
    ) });
  }
);

// ../../src/components/m3/Carousel.tsx



var GAP = 8;
var FULL_SCREEN_GAP = 16;
var CONTENT_PADDING = 16;
var SMALL_MIN = 40;
var SMALL_MAX = 56;
var UNCONTAINED_RATIOS = [16 / 9, 9 / 16, 1, 3 / 4];
var HEIGHT = {
  "multi-browse": 280,
  uncontained: 280,
  hero: 360,
  "full-screen": 320,
  inline: 320
};
var toneStyles = {
  primary: "bg-m3-primary-container text-m3-on-primary-container",
  secondary: "bg-m3-secondary-container text-m3-on-secondary-container",
  tertiary: "bg-m3-tertiary-container text-m3-on-tertiary-container",
  surface: "bg-m3-surface-container-high text-m3-on-surface"
};
var clampCount = (n) => Math.min(5, Math.max(1, Math.round(n)));
var Carousel = React25.forwardRef(
  function Carousel2({
    items,
    layout = "multi-browse",
    alignment = "start",
    itemCount = 4,
    shape = "round",
    arrows = "never",
    uncontainedMode = "standard",
    itemAspectRatio = 16 / 9,
    showAllHref,
    onShowAll,
    showAllLabel = "Show all",
    ariaLabel,
    className,
    ...props
  }, ref) {
    const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
    const scrollerRef = React25.useRef(null);
    const direction = useTextDirection(scrollerRef);
    const [vw, setVw] = React25.useState(0);
    const [viewportHeight, setViewportHeight] = React25.useState(0);
    const resolvedLayout = layout === "inline" ? "full-screen" : layout;
    const requestedCount = resolvedLayout === "multi-browse" ? clampCount(Math.max(3, itemCount)) : clampCount(itemCount);
    const initialFocalIndex = alignment === "end" ? Math.max(0, items.length - 1) : alignment === "center" ? Math.min(1, Math.max(0, items.length - 1)) : 0;
    const [focalIndex, setFocalIndex] = React25.useState(initialFocalIndex);
    const programmaticFocalRef = React25.useRef(null);
    React25.useEffect(() => {
      programmaticFocalRef.current = null;
      setFocalIndex(initialFocalIndex);
    }, [initialFocalIndex, resolvedLayout]);
    const updateFocalIndex = React25.useCallback(() => {
      if (reduceMotion || resolvedLayout !== "multi-browse" && resolvedLayout !== "hero") {
        return;
      }
      const el = scrollerRef.current;
      if (!el) return;
      if (programmaticFocalRef.current !== null) return;
      const slides = Array.from(
        el.querySelectorAll("[data-carousel-item]")
      );
      if (slides.length === 0) return;
      const viewport = el.getBoundingClientRect();
      const viewportCenter = viewport.left + el.clientWidth / 2;
      const edgeKeyline = alignment === "end" ? direction === "rtl" ? viewport.left : viewport.right : direction === "rtl" ? viewport.right : viewport.left;
      let centerIndex = 0;
      let edgeIndex = 0;
      let nearestCenter = Number.POSITIVE_INFINITY;
      let nearestEdge = Number.POSITIVE_INFINITY;
      slides.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect();
        const centerDistance = Math.abs(
          rect.left + rect.width / 2 - viewportCenter
        );
        const itemEdge = alignment === "end" ? direction === "rtl" ? rect.left : rect.right : direction === "rtl" ? rect.right : rect.left;
        const edgeDistance = Math.abs(itemEdge - edgeKeyline);
        if (centerDistance < nearestCenter) {
          nearestCenter = centerDistance;
          centerIndex = index;
        }
        if (edgeDistance < nearestEdge) {
          nearestEdge = edgeDistance;
          edgeIndex = index;
        }
      });
      const nextIndex = alignment !== "center" && nearestEdge <= CONTENT_PADDING + GAP ? edgeIndex : centerIndex;
      setFocalIndex((current) => current === nextIndex ? current : nextIndex);
    }, [alignment, direction, reduceMotion, resolvedLayout]);
    React25.useLayoutEffect(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const ro = new ResizeObserver((entries) => {
        const width = _nullishCoalesce(_optionalChain([entries, 'access', _94 => _94[0], 'optionalAccess', _95 => _95.contentRect, 'access', _96 => _96.width]), () => ( 0));
        setVw((prev) => Math.abs(prev - width) > 0.5 ? width : prev);
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, []);
    React25.useEffect(() => {
      const updateViewportHeight = () => setViewportHeight(window.innerHeight);
      updateViewportHeight();
      window.addEventListener("resize", updateViewportHeight);
      return () => window.removeEventListener("resize", updateViewportHeight);
    }, []);
    const updateParallax = React25.useCallback(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const vertical = resolvedLayout === "full-screen";
      const viewportRect = el.getBoundingClientRect();
      const viewportCenter = vertical ? viewportRect.top + el.clientHeight / 2 : viewportRect.left + el.clientWidth / 2;
      el.querySelectorAll("[data-carousel-item]").forEach((slide) => {
        const target = slide.querySelector(
          "[data-carousel-parallax]"
        );
        if (!target) return;
        if (reduceMotion) {
          target.style.transform = "none";
          return;
        }
        const rect = slide.getBoundingClientRect();
        const itemCenter = vertical ? rect.top + rect.height / 2 : rect.left + rect.width / 2;
        const offset = Math.max(-24, Math.min(24, (viewportCenter - itemCenter) * 0.08));
        target.style.transform = vertical ? `translateY(${offset}px)` : `translateX(${offset}px)`;
      });
    }, [reduceMotion, resolvedLayout]);
    React25.useEffect(() => {
      const el = scrollerRef.current;
      if (!el) return;
      updateFocalIndex();
      updateParallax();
      el.addEventListener("scroll", updateFocalIndex, { passive: true });
      el.addEventListener("scroll", updateParallax, { passive: true });
      return () => {
        el.removeEventListener("scroll", updateFocalIndex);
        el.removeEventListener("scroll", updateParallax);
      };
    }, [updateFocalIndex, updateParallax, items.length, viewportHeight, vw]);
    const setScrollerRef = React25.useCallback(
      (node) => {
        scrollerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );
    const showArrows = arrows !== "never";
    const scrollerId = React25.useId().replace(/[:]/g, "");
    const [canScrollStart, setCanScrollStart] = React25.useState(false);
    const [canScrollEnd, setCanScrollEnd] = React25.useState(false);
    const [hoverArrows, setHoverArrows] = React25.useState(false);
    const [kbWithin, setKbWithin] = React25.useState(false);
    const revealed = arrows === "always" || hoverArrows || kbWithin;
    const updateOverflow = React25.useCallback(() => {
      const el = scrollerRef.current;
      if (!el) return;
      if (resolvedLayout === "full-screen") {
        setCanScrollStart(el.scrollTop > 4);
        setCanScrollEnd(el.scrollTop + el.clientHeight < el.scrollHeight - 4);
        return;
      }
      if (resolvedLayout === "multi-browse" || resolvedLayout === "hero") {
        setCanScrollStart(focalIndex > 0);
        setCanScrollEnd(focalIndex < items.length - 1);
        return;
      }
      const slides = Array.from(
        el.querySelectorAll("[data-carousel-item]")
      );
      const first = _optionalChain([slides, 'access', _97 => _97[0], 'optionalAccess', _98 => _98.getBoundingClientRect, 'call', _99 => _99()]);
      const last = _optionalChain([slides, 'access', _100 => _100.at, 'call', _101 => _101(-1), 'optionalAccess', _102 => _102.getBoundingClientRect, 'call', _103 => _103()]);
      const viewport = el.getBoundingClientRect();
      setCanScrollStart(
        first ? direction === "rtl" ? first.right > viewport.right + 4 : first.left < viewport.left - 4 : false
      );
      setCanScrollEnd(
        last ? direction === "rtl" ? last.left < viewport.left - 4 : last.right > viewport.right + 4 : false
      );
    }, [direction, focalIndex, items.length, resolvedLayout]);
    React25.useEffect(() => {
      if (!showArrows) return;
      const el = scrollerRef.current;
      if (!el) return;
      updateOverflow();
      el.addEventListener("scroll", updateOverflow, { passive: true });
      const ro = new ResizeObserver(updateOverflow);
      ro.observe(el);
      el.querySelectorAll("[data-carousel-item]").forEach((node) => {
        ro.observe(node);
      });
      return () => {
        el.removeEventListener("scroll", updateOverflow);
        ro.disconnect();
      };
    }, [updateOverflow, showArrows, items.length]);
    const scrollSlideIntoView = (target) => {
      const el = scrollerRef.current;
      if (!el) return;
      const viewport = el.getBoundingClientRect();
      const rect = target.getBoundingClientRect();
      if (resolvedLayout === "full-screen") {
        const top = alignment === "center" ? rect.top + rect.height / 2 - (viewport.top + viewport.height / 2) : alignment === "end" ? rect.bottom - viewport.bottom : rect.top - viewport.top;
        el.scrollBy({ top, behavior: reduceMotion ? "auto" : "smooth" });
        return;
      }
      const left = alignment === "center" ? rect.left + rect.width / 2 - (viewport.left + viewport.width / 2) : alignment === "end" ? direction === "rtl" ? rect.left - viewport.left : rect.right - viewport.right : direction === "rtl" ? rect.right - viewport.right : rect.left - viewport.left;
      el.scrollBy({ left, behavior: reduceMotion ? "auto" : "smooth" });
    };
    const moveDynamicFocal = (targetIndex, slideCount) => {
      const el = scrollerRef.current;
      if (!el) return;
      const visibleCount = resolvedLayout === "multi-browse" ? n : 1 + (alignment === "center" ? 2 : 1);
      const maxStartIndex = Math.max(0, slideCount - visibleCount);
      const currentStep = Math.min(focalIndex, maxStartIndex);
      const targetStep = Math.min(targetIndex, maxStartIndex);
      programmaticFocalRef.current = reduceMotion ? null : targetIndex;
      setFocalIndex(targetIndex);
      el.scrollBy({
        left: (direction === "rtl" ? -1 : 1) * (targetStep - currentStep) * (smallWidth + GAP),
        behavior: reduceMotion ? "auto" : "smooth"
      });
    };
    const scrollByItem = (dir) => {
      const el = scrollerRef.current;
      if (!el) return;
      const slides = Array.from(
        el.querySelectorAll("[data-carousel-item]")
      );
      if (slides.length === 0) return;
      if (resolvedLayout === "multi-browse" || resolvedLayout === "hero") {
        const targetIndex = Math.min(
          slides.length - 1,
          Math.max(0, focalIndex + dir)
        );
        if (targetIndex === focalIndex) return;
        moveDynamicFocal(targetIndex, slides.length);
        return;
      }
      const viewport = el.getBoundingClientRect();
      const startOffset = (slide) => {
        const rect = slide.getBoundingClientRect();
        if (resolvedLayout === "full-screen") return rect.top - viewport.top;
        return direction === "rtl" ? viewport.right - rect.right : rect.left - viewport.left;
      };
      const currentIndex = slides.reduce(
        (nearestIndex, slide, index) => Math.abs(startOffset(slide)) < Math.abs(startOffset(slides[nearestIndex])) ? index : nearestIndex,
        0
      );
      const target = slides[currentIndex + dir];
      if (target) {
        scrollSlideIntoView(target);
      } else {
        el.scrollBy(
          resolvedLayout === "full-screen" ? {
            top: dir * el.clientHeight,
            behavior: reduceMotion ? "auto" : "smooth"
          } : {
            left: (direction === "rtl" ? -dir : dir) * el.clientWidth,
            behavior: reduceMotion ? "auto" : "smooth"
          }
        );
      }
    };
    const dynamicPadding = resolvedLayout === "full-screen" ? 0 : CONTENT_PADDING;
    const dynamicEndPadding = resolvedLayout === "uncontained" ? 0 : dynamicPadding;
    const layoutGap = resolvedLayout === "full-screen" ? FULL_SCREEN_GAP : GAP;
    const innerWidth = Math.max(
      0,
      vw - dynamicPadding - dynamicEndPadding
    );
    const smallWidth = Math.min(
      SMALL_MAX,
      Math.max(SMALL_MIN, innerWidth * 0.14)
    );
    const mediumWidth = Math.min(
      Math.max(72, innerWidth * 0.24),
      Math.max(72, innerWidth / 3)
    );
    const availableMultiBrowseCount = Math.floor(
      (innerWidth - 2 * mediumWidth + 2 * smallWidth + GAP) / (smallWidth + GAP)
    );
    const n = resolvedLayout === "multi-browse" && vw > 0 ? Math.min(requestedCount, Math.max(3, availableMultiBrowseCount)) : requestedCount;
    const multiSmallCount = Math.max(0, n - 2);
    const largeWidth = Math.max(
      smallWidth,
      innerWidth - (n > 1 ? mediumWidth : 0) - multiSmallCount * smallWidth - Math.max(0, n - 1) * GAP
    );
    const heroSmallCount = Math.min(
      Math.max(0, items.length - 1),
      alignment === "center" ? 2 : 1
    );
    const heroLargeWidth = Math.max(
      smallWidth,
      innerWidth - heroSmallCount * smallWidth - heroSmallCount * GAP
    );
    const equalWidth = Math.max(
      0,
      (innerWidth - Math.max(0, n - 1) * layoutGap) / n
    );
    const itemRatio = (item, index) => {
      const ratio = uncontainedMode === "multi-aspect" ? _nullishCoalesce(item.aspectRatio, () => ( UNCONTAINED_RATIOS[index % UNCONTAINED_RATIOS.length])) : itemAspectRatio;
      return Number.isFinite(ratio) && ratio > 0 ? Math.min(16 / 9, Math.max(9 / 16, ratio)) : 1;
    };
    const fullScreenHeight = vw > 0 && viewportHeight > 0 ? Math.min(viewportHeight, vw * 16 / 9) : "100dvh";
    const multiBrowseCategory = (index) => {
      if (index === focalIndex) return "large";
      const mediumIndex = focalIndex < items.length - 1 ? focalIndex + 1 : focalIndex - 1;
      return index === mediumIndex ? "medium" : "small";
    };
    const fallbackWidth = (i, item) => {
      if (resolvedLayout === "full-screen") return "100%";
      if (resolvedLayout === "uncontained") {
        return `${HEIGHT.uncontained * itemRatio(item, i)}px`;
      }
      if (reduceMotion) {
        return `calc((100% - ${dynamicPadding + dynamicEndPadding + Math.max(0, n - 1) * layoutGap}px) / ${n})`;
      }
      if (resolvedLayout === "hero") {
        return i === focalIndex ? `calc(100% - ${dynamicPadding + dynamicEndPadding + heroSmallCount * (SMALL_MAX + GAP)}px)` : `${SMALL_MAX}px`;
      }
      const category = multiBrowseCategory(i);
      if (category === "large") return "55%";
      if (category === "medium") return "24%";
      return `${SMALL_MAX}px`;
    };
    const widthFor = (i, item) => {
      if (vw <= 0) return fallbackWidth(i, item);
      if (resolvedLayout === "full-screen") return vw || "100%";
      if (resolvedLayout === "uncontained") {
        return HEIGHT.uncontained * itemRatio(item, i);
      }
      if (reduceMotion) return equalWidth;
      if (resolvedLayout === "hero") {
        return i === focalIndex ? heroLargeWidth : smallWidth;
      }
      const category = multiBrowseCategory(i);
      if (category === "large") return largeWidth;
      if (category === "medium") return mediumWidth;
      return smallWidth;
    };
    const focusSlide = (idx) => {
      const el = scrollerRef.current;
      if (!el) return;
      const slides = Array.from(
        el.querySelectorAll("[data-carousel-item]")
      );
      if (slides.length === 0) return;
      const target = slides[Math.min(slides.length - 1, Math.max(0, idx))];
      const focusable = _nullishCoalesce(target.querySelector("a[href], button"), () => ( target));
      focusable.focus({ preventScroll: true });
      if (resolvedLayout === "multi-browse" || resolvedLayout === "hero") {
        const targetIndex = Number(target.dataset.carouselIndex);
        moveDynamicFocal(targetIndex, slides.length);
      } else {
        scrollSlideIntoView(target);
      }
    };
    const focusOutsideCarousel = (direction2) => {
      const el = scrollerRef.current;
      if (!el || !(document.activeElement instanceof HTMLElement)) return false;
      const focusable = Array.from(
        document.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
        )
      ).filter((node) => node.getClientRects().length > 0);
      const activeIndex = focusable.indexOf(document.activeElement);
      if (activeIndex < 0) return false;
      for (let index = activeIndex + direction2; index >= 0 && index < focusable.length; index += direction2) {
        if (!el.contains(focusable[index])) {
          focusable[index].focus();
          return true;
        }
      }
      return false;
    };
    const handleKeyDown = (e) => {
      const el = scrollerRef.current;
      if (!el) return;
      const slides = Array.from(
        el.querySelectorAll("[data-carousel-item]")
      );
      const active = document.activeElement;
      const current = slides.findIndex(
        (node) => node === active || node.contains(active)
      );
      if (current === -1) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        focusSlide(current + (direction === "rtl" ? -1 : 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        focusSlide(current + (direction === "rtl" ? 1 : -1));
      } else if (e.key === "Home") {
        e.preventDefault();
        focusSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        focusSlide(slides.length - 1);
      } else if (e.key === "ArrowDown") {
        if (focusOutsideCarousel(1)) e.preventDefault();
      } else if (e.key === "ArrowUp") {
        if (focusOutsideCarousel(-1)) e.preventDefault();
      }
    };
    const arrowsUI = showArrows && (canScrollStart || canScrollEnd) && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
      canScrollStart && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
        _framermotion.motion.button,
        {
          type: "button",
          tabIndex: arrows === "always" ? 0 : -1,
          "aria-label": "Previous items",
          "aria-controls": scrollerId,
          onClick: () => scrollByItem(-1),
          initial: false,
          animate: {
            opacity: revealed ? 1 : 0,
            scale: reduceMotion ? 1 : revealed ? 1 : 0.6
          },
          transition: reduceMotion ? { duration: 0 } : springs.fastSpatial,
          style: { pointerEvents: revealed ? "auto" : "none" },
          className: "m3-state m3-focus absolute start-3 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-m3-surface-container-high text-m3-on-surface m3-elevation-1 outline-none",
          children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: direction === "rtl" ? "chevron_right" : "chevron_left", size: 24 })
          ]
        }
      ),
      canScrollEnd && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
        _framermotion.motion.button,
        {
          type: "button",
          tabIndex: arrows === "always" ? 0 : -1,
          "aria-label": "Next items",
          "aria-controls": scrollerId,
          onClick: () => scrollByItem(1),
          initial: false,
          animate: {
            opacity: revealed ? 1 : 0,
            scale: reduceMotion ? 1 : revealed ? 1 : 0.6
          },
          transition: reduceMotion ? { duration: 0 } : springs.fastSpatial,
          style: { pointerEvents: revealed ? "auto" : "none" },
          className: "m3-state m3-focus absolute end-3 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-m3-surface-container-high text-m3-on-surface m3-elevation-1 outline-none",
          children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: direction === "rtl" ? "chevron_left" : "chevron_right", size: 24 })
          ]
        }
      )
    ] });
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
      "div",
      {
        className: "relative w-full",
        onPointerEnter: (e) => {
          if (e.pointerType !== "touch")
            setHoverArrows(true);
        },
        onPointerLeave: () => setHoverArrows(false),
        onFocus: () => setKbWithin(true),
        onBlur: () => setKbWithin(false),
        children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            "div",
            {
              id: scrollerId,
              ref: setScrollerRef,
              role: "region",
              "aria-roledescription": "carousel",
              "aria-label": _nullishCoalesce(ariaLabel, () => ( `Carousel, ${items.length} items`)),
              "data-layout": resolvedLayout,
              "data-uncontained-mode": resolvedLayout === "uncontained" ? uncontainedMode : void 0,
              className: cn(
                "m3-focus flex w-full select-none outline-none",
                resolvedLayout === "full-screen" ? "flex-col snap-y snap-mandatory overflow-y-auto overflow-x-hidden" : "snap-x snap-mandatory overflow-x-auto",
                "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                resolvedLayout === "full-screen" ? "gap-4 p-0" : "gap-2",
                resolvedLayout === "multi-browse" && "px-4 py-2",
                resolvedLayout === "uncontained" && "py-2 ps-4 pe-0",
                resolvedLayout === "hero" && "items-center px-4 py-2",
                className
              ),
              ...props,
              style: {
                ...props.style,
                height: resolvedLayout === "full-screen" ? fullScreenHeight : void 0
              },
              onKeyDown: (event) => {
                _optionalChain([props, 'access', _104 => _104.onKeyDown, 'optionalCall', _105 => _105(event)]);
                if (!event.defaultPrevented) handleKeyDown(event);
              },
              children: items.map((item, i) => {
                const actionable = Boolean(item.onClick || item.href);
                const Inner = item.href ? "a" : actionable ? "button" : "div";
                const height = resolvedLayout === "full-screen" ? fullScreenHeight : HEIGHT[resolvedLayout];
                const width = widthFor(i, item);
                const distance = Math.abs(i - focalIndex);
                const keylineSize = resolvedLayout === "multi-browse" ? multiBrowseCategory(i) : resolvedLayout === "hero" ? distance === 0 ? "large" : "small" : "fixed";
                const compactKeyline = !reduceMotion && keylineSize === "small";
                const narrowMediumKeyline = !reduceMotion && keylineSize === "medium" && typeof width === "number" && width < 120;
                return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  _framermotion.motion.div,
                  {
                    "data-carousel-item": true,
                    "data-carousel-index": i,
                    role: "group",
                    "aria-roledescription": "slide",
                    "aria-label": `${i + 1} of ${items.length}${item.label ? `: ${item.label}` : ""}`,
                    tabIndex: actionable ? -1 : 0,
                    "data-keyline-size": reduceMotion ? "equal" : keylineSize,
                    "data-aspect-ratio": resolvedLayout === "uncontained" ? itemRatio(item, i) : void 0,
                    animate: vw > 0 && !reduceMotion ? { width } : void 0,
                    transition: reduceMotion ? { duration: 0 } : springs.defaultSpatial,
                    onAnimationComplete: () => {
                      if (programmaticFocalRef.current === i) {
                        programmaticFocalRef.current = null;
                      }
                    },
                    style: {
                      width: resolvedLayout === "full-screen" ? "100%" : width,
                      height,
                      flex: "none"
                    },
                    className: cn(
                      "shrink-0",
                      alignment === "start" && "snap-start",
                      alignment === "center" && "snap-center",
                      alignment === "end" && "snap-end"
                    ),
                    children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
                      Inner,
                      {
                        href: item.href,
                        type: item.href || !actionable ? void 0 : "button",
                        onClick: item.onClick ? () => item.onClick(item) : void 0,
                        "aria-label": actionable ? _nullishCoalesce(item.label, () => ( `Slide ${i + 1}`)) : void 0,
                        className: cn(
                          "relative flex h-full w-full flex-col overflow-hidden md-label-large",
                          compactKeyline ? "p-1" : narrowMediumKeyline ? "p-2" : "p-5",
                          toneStyles[_nullishCoalesce(item.tone, () => ( "secondary"))],
                          shape === "round" ? "rounded-[28px]" : "rounded-none",
                          actionable ? "m3-state m3-focus cursor-pointer outline-none" : "cursor-default outline-none"
                        ),
                        children: [
                          actionable && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
                          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
                            "span",
                            {
                              "data-carousel-parallax": true,
                              className: "flex min-h-0 flex-1 flex-col will-change-transform",
                              children: [
                                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "flex min-h-0 flex-1 items-center justify-center", children: item.icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                                  MaterialSymbol,
                                  {
                                    icon: item.icon,
                                    size: compactKeyline ? 24 : narrowMediumKeyline ? 32 : 44,
                                    opticalSize: compactKeyline || narrowMediumKeyline ? 24 : 40
                                  }
                                ) }),
                                item.label && !compactKeyline && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "truncate text-start md-label-large", children: item.label })
                              ]
                            }
                          )
                        ]
                      }
                    )
                  },
                  item.id
                );
              })
            }
          ),
          arrowsUI,
          resolvedLayout !== "full-screen" && (showAllHref || onShowAll) && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "flex justify-end p-1", children: showAllHref ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            "a",
            {
              href: showAllHref,
              className: "m3-state m3-focus inline-flex min-h-10 items-center rounded-full px-3 md-label-large text-m3-primary outline-none",
              children: showAllLabel
            }
          ) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            "button",
            {
              type: "button",
              onClick: onShowAll,
              className: "m3-state m3-focus inline-flex min-h-10 items-center rounded-full px-3 md-label-large text-m3-primary outline-none",
              children: showAllLabel
            }
          ) })
        ]
      }
    );
  }
);

// ../../src/components/m3/TextField.tsx


var _field = require('@base-ui/react/field');
var _input = require('@base-ui/react/input');

var springs2 = springs;
var sizeHeights = { xs: 32, sm: 40, md: 56, lg: 72 };
var fieldRadius = "rounded-m3-xs";
var fieldTopRadius = "rounded-t-m3-xs";
var TextField = React26.forwardRef(function TextField2({
  variant = "outlined",
  size = "md",
  label,
  helperText,
  error = false,
  leadingIcon,
  trailingIcon,
  prefix,
  suffix,
  multiline = false,
  rows = 3,
  fullWidth = false,
  disabled = false,
  required = false,
  id,
  value,
  defaultValue,
  onChange,
  placeholder,
  type = "text",
  className,
  onFocus,
  onBlur,
  "aria-describedby": ariaDescribedBy,
  ...props
}, ref) {
  const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
  const [focused, setFocused] = React26.useState(false);
  const [hasContent, setHasContent] = React26.useState(
    () => String(_nullishCoalesce(_nullishCoalesce(value, () => ( defaultValue)), () => ( ""))).length > 0
  );
  React26.useEffect(() => {
    if (value !== void 0) setHasContent(String(value).length > 0);
  }, [value]);
  const floated = focused || hasContent;
  const height = sizeHeights[size];
  const centerY = height / 2;
  const compact = size === "xs" || size === "sm";
  const iconSize = compact ? 20 : 24;
  const inputTextClass = compact ? "md-body-medium" : "md-body-large";
  const labelRestClass = compact ? "md-body-medium" : "md-body-large";
  const labelRestHalf = compact ? 10 : 12;
  const showPlaceholder = placeholder != null && (!label || floated);
  const showAffixes = !label || floated;
  const generatedDescriptionId = React26.useId().replace(/:/g, "");
  const prefixId = prefix != null ? `m3-field-prefix-${generatedDescriptionId}` : void 0;
  const suffixId = suffix != null ? `m3-field-suffix-${generatedDescriptionId}` : void 0;
  const helperId = helperText ? `m3-field-helper-${generatedDescriptionId}` : void 0;
  const describedBy = [
    ariaDescribedBy,
    showAffixes ? prefixId : void 0,
    showAffixes ? suffixId : void 0,
    helperId
  ].filter(Boolean).join(" ") || void 0;
  const controlClassName = cn(
    "min-w-0 flex-1 bg-transparent text-m3-on-surface outline-none placeholder:text-m3-on-surface-variant",
    inputTextClass,
    multiline ? "min-h-[inherit] resize-y py-4" : "h-full",
    disabled && "opacity-38"
  );
  const controlStyle = variant === "filled" && label ? { paddingTop: Math.round(height * 0.28) } : void 0;
  const strongOutline = focused && !error && !disabled;
  const outlineColorClass = error && !disabled ? "text-m3-error" : focused ? "text-m3-primary" : disabled ? "text-m3-outline/12" : "text-m3-outline group-hover/field:text-m3-on-surface";
  const handleChange = (event) => {
    setHasContent(event.target.value.length > 0);
    _optionalChain([onChange, 'optionalCall', _106 => _106(event)]);
  };
  const handleFocus = (event) => {
    setFocused(true);
    _optionalChain([onFocus, 'optionalCall', _107 => _107(event)]);
  };
  const handleBlur = (event) => {
    setFocused(false);
    _optionalChain([onBlur, 'optionalCall', _108 => _108(event)]);
  };
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
    _field.Field.Root,
    {
      invalid: error || void 0,
      disabled,
      className: cn("relative", fullWidth && "w-full", className),
      children: [
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
          "div",
          {
            className: cn(
              "group/field relative flex",
              multiline ? "items-start" : "items-center",
              variant === "outlined" ? cn("bg-transparent", fieldRadius) : cn(fieldTopRadius, disabled ? "bg-m3-on-surface/4" : "bg-m3-surface-container-highest")
            ),
            style: multiline ? { minHeight: height } : { height },
            children: [
              variant === "outlined" && (label ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
                "div",
                {
                  "aria-hidden": "true",
                  className: cn(
                    "pointer-events-none absolute inset-0 flex transition-colors duration-150",
                    outlineColorClass
                  ),
                  children: [
                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                      "span",
                      {
                        className: cn(
                          "shrink-0 rounded-s-m3-xs border-current",
                          strongOutline ? "border-s-2 border-y-2" : "border-s border-y"
                        ),
                        style: { width: leadingIcon ? 40 : 12 }
                      }
                    ),
                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                      "span",
                      {
                        className: cn("shrink-0 border-current", strongOutline ? "border-y-2" : "border-y"),
                        style: { borderTopColor: floated ? "transparent" : "currentColor" },
                        children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: "invisible block whitespace-nowrap px-1 md-body-small", children: [
                          label,
                          required && " *"
                        ] })
                      }
                    ),
                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                      "span",
                      {
                        className: cn(
                          "min-w-0 flex-1 rounded-e-m3-xs border-current",
                          strongOutline ? "border-e-2 border-y-2" : "border-e border-y"
                        )
                      }
                    )
                  ]
                }
              ) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                "div",
                {
                  "aria-hidden": "true",
                  className: cn(
                    "pointer-events-none absolute inset-0 transition-colors duration-150",
                    fieldRadius,
                    "border-current",
                    strongOutline ? "border-2" : "border",
                    outlineColorClass
                  )
                }
              )),
              leadingIcon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                MaterialSymbol,
                {
                  icon: leadingIcon,
                  size: iconSize,
                  className: cn(
                    "pointer-events-none absolute start-3 top-1/2 -translate-y-1/2",
                    disabled && "opacity-38",
                    error ? "text-m3-error" : focused ? "text-m3-primary" : "text-m3-on-surface-variant"
                  )
                }
              ),
              /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
                "div",
                {
                  className: cn(
                    "flex min-w-0 flex-1 items-center",
                    multiline ? "min-h-[inherit] self-stretch" : "h-full",
                    leadingIcon ? compact ? "ps-12" : "ps-[52px]" : "ps-4",
                    error || trailingIcon ? compact ? "pe-12" : "pe-[52px]" : "pe-4"
                  ),
                  children: [
                    prefix != null && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                      "span",
                      {
                        id: prefixId,
                        "aria-hidden": !showAffixes || void 0,
                        className: cn(
                          "me-1 shrink-0 text-m3-on-surface-variant",
                          !showAffixes && "invisible",
                          disabled && "opacity-38"
                        ),
                        children: prefix
                      }
                    ),
                    multiline ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                      _field.Field.Control,
                      {
                        ref,
                        render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "textarea", { rows }),
                        id,
                        value,
                        defaultValue,
                        onChange: handleChange,
                        required,
                        placeholder: showPlaceholder ? placeholder : void 0,
                        onFocus: handleFocus,
                        onBlur: handleBlur,
                        "aria-describedby": describedBy,
                        className: controlClassName,
                        style: controlStyle,
                        ...props
                      }
                    ) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                      _input.Input,
                      {
                        ref,
                        id,
                        type,
                        value,
                        defaultValue,
                        onChange: handleChange,
                        required,
                        placeholder: showPlaceholder ? placeholder : void 0,
                        onFocus: handleFocus,
                        onBlur: handleBlur,
                        "aria-describedby": describedBy,
                        className: controlClassName,
                        style: controlStyle,
                        ...props
                      }
                    ),
                    suffix != null && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                      "span",
                      {
                        id: suffixId,
                        "aria-hidden": !showAffixes || void 0,
                        className: cn(
                          "ms-1 shrink-0 text-m3-on-surface-variant",
                          !showAffixes && "invisible",
                          disabled && "opacity-38"
                        ),
                        children: suffix
                      }
                    )
                  ]
                }
              ),
              (error || trailingIcon) && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                MaterialSymbol,
                {
                  icon: error ? "error" : trailingIcon,
                  size: iconSize,
                  fill: error ? true : void 0,
                  className: cn(
                    "pointer-events-none absolute end-3 top-1/2 -translate-y-1/2",
                    disabled && "opacity-38",
                    error ? "text-m3-error" : "text-m3-on-surface-variant"
                  )
                }
              ),
              variant === "filled" && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  "div",
                  {
                    className: cn(
                      "pointer-events-none absolute inset-x-0 bottom-0 h-px",
                      disabled ? "bg-transparent" : error ? "bg-m3-error" : "bg-m3-on-surface-variant group-hover/field:bg-m3-on-surface"
                    )
                  }
                ),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  _framermotion.motion.div,
                  {
                    className: cn(
                      "pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-center",
                      error ? "bg-m3-error" : "bg-m3-primary"
                    ),
                    initial: false,
                    animate: { scaleX: focused || error ? 1 : 0 },
                    transition: reduceMotion ? { duration: 0 } : springs2.fastSpatial
                  }
                )
              ] }),
              label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                _field.Field.Label,
                {
                  render: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
                    _framermotion.motion.label,
                    {
                      className: cn(
                        "pointer-events-none absolute z-[1]",
                        variant === "outlined" ? "px-1" : "px-0",
                        disabled && "opacity-38",
                        floated ? "md-body-small" : labelRestClass,
                        error ? "text-m3-error" : focused ? "text-m3-primary" : "text-m3-on-surface-variant"
                      ),
                      initial: false,
                      animate: {
                        top: variant === "outlined" ? floated ? -8 : centerY - labelRestHalf : floated ? 8 : centerY - labelRestHalf,
                        insetInlineStart: variant === "outlined" ? floated ? leadingIcon ? 40 : 12 : leadingIcon ? 48 : 16 : leadingIcon ? 48 : 16
                      },
                      transition: reduceMotion ? { duration: 0 } : springs2.fastSpatial,
                      children: [
                        label,
                        required && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "text-m3-error", children: " *" })
                      ]
                    }
                  )
                }
              )
            ]
          }
        ),
        helperText && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          _field.Field.Description,
          {
            id: helperId,
            role: error ? "alert" : void 0,
            className: cn(
              "mt-1 px-4 md-body-small",
              disabled && "opacity-38",
              error ? "text-m3-error" : "text-m3-on-surface-variant"
            ),
            children: helperText
          }
        )
      ]
    }
  );
});

// ../../src/components/m3/SearchBar.tsx




var springs3 = springs;
var sizeHeights2 = { sm: 40, md: 56, lg: 72 };
var SearchBar = React27.forwardRef(function SearchBar2({
  value,
  onChange,
  placeholder = "Search",
  size = "md",
  leadingIcon = "search",
  trailingIcons = [],
  onTrailingIconClick,
  onSubmit,
  fullWidth = false,
  disabled = false,
  className,
  onKeyDown,
  ...props
}, ref) {
  const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
  const visibleTrailingIcons = trailingIcons.slice(0, 2);
  const trailingHit = size === "sm" ? "h-8 w-8" : "h-12 w-12";
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    "div",
    {
      className: cn(
        "relative inline-flex min-w-0 max-w-[720px]",
        fullWidth ? "w-full" : "w-full sm:min-w-[360px] sm:w-[360px]",
        disabled && "pointer-events-none opacity-38",
        className
      ),
      children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
        "div",
        {
          className: cn(
            "m3-state flex w-full items-center rounded-full px-6 transition-[background-color,box-shadow] duration-200",
            // AndroidX SearchBarDefaults uses tonal + shadow elevation level 0,
            // including while its input has focus.
            "bg-m3-surface-container-high"
          ),
          style: { height: sizeHeights2[size] },
          children: [
            leadingIcon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: leadingIcon, size: 24, className: "shrink-0 text-m3-on-surface" }),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              _input.Input,
              {
                ref,
                type: "text",
                role: "searchbox",
                "aria-label": placeholder,
                value,
                onChange,
                disabled,
                placeholder,
                onKeyDown: (e) => {
                  if (e.key === "Enter") _optionalChain([onSubmit, 'optionalCall', _109 => _109()]);
                  _optionalChain([onKeyDown, 'optionalCall', _110 => _110(e)]);
                },
                className: cn(
                  "h-full min-w-0 flex-1 bg-transparent text-m3-on-surface outline-none placeholder:text-m3-on-surface-variant md-body-large",
                  leadingIcon ? "ps-4" : "ps-0",
                  visibleTrailingIcons.length > 0 ? "pe-1" : "pe-0"
                ),
                ...props
              }
            ),
            visibleTrailingIcons.map((entry, index) => {
              const icon = typeof entry === "string" ? entry : entry.icon;
              const action = typeof entry === "string" ? onTrailingIconClick ? () => {
                onTrailingIconClick(icon, index);
              } : void 0 : entry.onClick;
              if (!action) {
                return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  "span",
                  {
                    "aria-hidden": "true",
                    className: cn("grid shrink-0 place-items-center text-m3-on-surface-variant", trailingHit),
                    children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon, size: 24 })
                  },
                  `${icon}-${index}`
                );
              }
              return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
                _framermotion.motion.button,
                {
                  type: "button",
                  "aria-label": typeof entry === "string" ? icon.replace(/_/g, " ") : entry.label,
                  disabled,
                  onClick: action,
                  whileTap: disabled || reduceMotion ? void 0 : { scale: 0.9 },
                  transition: reduceMotion ? { duration: 0 } : springs3.fastVisual,
                  className: cn(
                    "m3-state m3-focus relative grid shrink-0 place-items-center overflow-hidden rounded-full text-m3-on-surface-variant outline-none",
                    trailingHit
                  ),
                  children: [
                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon, size: 24 })
                  ]
                },
                `${icon}-${index}`
              );
            })
          ]
        }
      )
    }
  );
});

// ../../src/components/m3/SearchView.tsx






var springs4 = springs;
var FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, details, [tabindex]:not([tabindex="-1"])';
var SearchView = React28.forwardRef(function SearchView2({
  open,
  onOpenChange,
  mode = "full-screen",
  placeholder = "Search",
  value,
  defaultValue,
  onValueChange,
  recentSearches = [],
  onRecentSelect,
  onRecentRemove,
  leadingIcon,
  trailingActions,
  children,
  autoFocus = true,
  className
}, ref) {
  const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
  const directionRootRef = React28.useRef(null);
  const direction = useTextDirection(directionRootRef);
  const fullScreen = mode === "full-screen";
  const inputRef = React28.useRef(null);
  const dockedPanelRef = React28.useRef(null);
  const dockedRestoreFocusRef = React28.useRef(null);
  const [active, setActive] = React28.useState(-1);
  const reactId = React28.useId();
  const listId = `m3-sv-${reactId.replace(/:/g, "")}`;
  const setInputRef = React28.useCallback(
    (node) => {
      inputRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );
  const isControlled = value !== void 0;
  const [inner, setInner] = React28.useState(_nullishCoalesce(defaultValue, () => ( "")));
  const query = isControlled ? value : inner;
  const setQuery = React28.useCallback(
    (v) => {
      if (!isControlled) setInner(v);
      _optionalChain([onValueChange, 'optionalCall', _111 => _111(v)]);
    },
    [isControlled, onValueChange]
  );
  const dialogActionsRef = React28.useRef({ unmount() {
  }, close() {
  } });
  const handleDialogOpenChange = (nextOpen, eventDetails) => {
    if (!nextOpen) eventDetails.preventUnmountOnClose();
    onOpenChange(nextOpen);
  };
  const handleDialogExited = () => _optionalChain([dialogActionsRef, 'access', _112 => _112.current, 'optionalAccess', _113 => _113.unmount, 'call', _114 => _114()]);
  const showRecents = query.trim() === "" && recentSearches.length > 0;
  React28.useEffect(() => {
    if (active >= recentSearches.length) setActive(-1);
  }, [active, recentSearches.length]);
  React28.useEffect(() => {
    if (fullScreen || !open) return;
    dockedRestoreFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => {
      if (autoFocus) _optionalChain([inputRef, 'access', _115 => _115.current, 'optionalAccess', _116 => _116.focus, 'call', _117 => _117()]);
      else _optionalChain([dockedPanelRef, 'access', _118 => _118.current, 'optionalAccess', _119 => _119.focus, 'call', _120 => _120()]);
    });
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      _optionalChain([dockedRestoreFocusRef, 'access', _121 => _121.current, 'optionalAccess', _122 => _122.focus, 'optionalCall', _123 => _123()]);
    };
  }, [autoFocus, fullScreen, open]);
  const handleRecentSelect = (q) => {
    setQuery(q);
    setActive(-1);
    _optionalChain([onRecentSelect, 'optionalCall', _124 => _124(q)]);
  };
  const handleRecentRemove = (q) => {
    _optionalChain([onRecentRemove, 'optionalCall', _125 => _125(q)]);
    setActive(-1);
  };
  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowDown" && showRecents) {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, recentSearches.length - 1));
    } else if (e.key === "ArrowUp" && showRecents) {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      if (showRecents && active >= 0 && recentSearches[active] != null) {
        e.preventDefault();
        handleRecentSelect(recentSearches[active]);
      }
    }
  };
  const handleDockedKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onOpenChange(false);
      return;
    }
    if (e.key !== "Tab" || !dockedPanelRef.current) return;
    const focusables = Array.from(
      dockedPanelRef.current.querySelectorAll(FOCUSABLE)
    ).filter((element) => !element.hasAttribute("disabled"));
    if (focusables.length === 0) {
      e.preventDefault();
      dockedPanelRef.current.focus();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === dockedPanelRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
  const closeButtonClassName = "m3-state relative ms-1 grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full text-m3-on-surface";
  const closeControl = fullScreen ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _dialog.Dialog.Close, { render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "button", { type: "button", "aria-label": "Close search", className: closeButtonClassName }), children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
    _nullishCoalesce(leadingIcon, () => ( /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: direction === "rtl" ? "arrow_forward" : "arrow_back", size: 24 })))
  ] }) : /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
    "button",
    {
      type: "button",
      onClick: () => onOpenChange(false),
      "aria-label": "Close search",
      className: closeButtonClassName,
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
        _nullishCoalesce(leadingIcon, () => ( /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: direction === "rtl" ? "arrow_forward" : "arrow_back", size: 24 })))
      ]
    }
  );
  const inputControls = /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
    "div",
    {
      className: cn(
        "flex h-14 shrink-0 items-center bg-m3-surface-container-high",
        fullScreen && "rounded-full"
      ),
      children: [
        closeControl,
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          _input.Input,
          {
            ref: setInputRef,
            type: "text",
            role: showRecents ? "combobox" : "searchbox",
            "aria-label": placeholder,
            "aria-expanded": showRecents ? open : void 0,
            "aria-haspopup": showRecents ? "listbox" : void 0,
            "aria-autocomplete": showRecents ? "list" : void 0,
            "aria-controls": showRecents ? listId : void 0,
            "aria-activedescendant": showRecents && active >= 0 ? `${listId}-${active}` : void 0,
            value: query,
            placeholder,
            onChange: (e) => {
              setQuery(e.target.value);
              setActive(-1);
            },
            onKeyDown: handleInputKeyDown,
            className: "h-full min-w-0 flex-1 bg-transparent px-4 text-m3-on-surface outline-none placeholder:text-m3-on-surface-variant md-body-large"
          }
        ),
        query !== "" && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
          "button",
          {
            type: "button",
            onClick: () => {
              setQuery("");
              setActive(-1);
              _optionalChain([inputRef, 'access', _126 => _126.current, 'optionalAccess', _127 => _127.focus, 'call', _128 => _128()]);
            },
            "aria-label": "Clear search text",
            className: "m3-state relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full text-m3-on-surface",
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "close", size: 24 })
            ]
          }
        ),
        trailingActions && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "flex shrink-0 items-center pe-1", children: trailingActions })
      ]
    }
  );
  const inputRow = fullScreen ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "shrink-0 bg-m3-surface-container-low px-4 py-2", children: inputControls }) : inputControls;
  const resultsArea = /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    !fullScreen && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { "aria-hidden": "true", className: "h-px w-full shrink-0 bg-m3-outline" }),
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "m3-scroll min-h-0 flex-1 overflow-y-auto py-2", children: [
      showRecents && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "relative", children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "ul", { id: listId, role: "listbox", "aria-label": "Recent searches", className: "py-1", children: recentSearches.map((q, i) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events -- combobox keyboard input owns option navigation and selection
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
            "li",
            {
              id: `${listId}-${i}`,
              role: "option",
              "aria-selected": active === i,
              ref: (el) => {
                if (active === i && el) el.scrollIntoView({ block: "nearest" });
              },
              onMouseEnter: () => setActive(i),
              onClick: () => handleRecentSelect(q),
              className: cn(
                "m3-state relative flex h-12 cursor-pointer items-center overflow-hidden px-4",
                onRecentRemove && "pe-16",
                active === i && "bg-m3-on-surface/8"
              ),
              children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  MaterialSymbol,
                  {
                    icon: "history",
                    size: 24,
                    className: "me-3 shrink-0 text-m3-on-surface-variant"
                  }
                ),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "flex-1 truncate md-label-large text-m3-on-surface", children: q })
              ]
            },
            q
          )
        )) }),
        onRecentRemove && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { "aria-label": "Recent search removal actions", className: "pointer-events-none absolute inset-x-0 top-1", children: recentSearches.map((q, i) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
          "button",
          {
            type: "button",
            "aria-label": `Remove ${q} from recent searches`,
            onClick: () => {
              handleRecentRemove(q);
            },
            className: "m3-state m3-focus pointer-events-auto absolute end-2 grid h-12 w-12 place-items-center overflow-hidden rounded-full text-m3-on-surface-variant outline-none",
            style: { top: i * 48 },
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "close", size: 20 })
            ]
          },
          q
        )) })
      ] }),
      !showRecents && children
    ] })
  ] });
  const panelClassName = cn(
    "flex flex-col outline-none",
    fullScreen ? "fixed inset-0 z-[90] bg-m3-surface-container-low" : "m3-elevation-3 relative z-[90] min-h-[240px] max-h-[66.667dvh] w-full min-w-[360px] max-w-[720px] overflow-hidden rounded-[28px] bg-m3-surface-container-high",
    className
  );
  const panelMotionProps = {
    initial: reduceMotion ? false : fullScreen ? { y: -48, opacity: 0 } : { y: -8, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: reduceMotion ? { y: 0, opacity: 1 } : fullScreen ? { y: -48, opacity: 0 } : { y: -8, opacity: 0 },
    transition: reduceMotion ? { duration: 0 } : fullScreen ? springs4.fastSpatial : { duration: durations.short4 / 1e3, ease: "easeOut" }
  };
  if (fullScreen) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { ref: directionRootRef, className: "contents", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _directionprovider.DirectionProvider, { direction, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _dialog.Dialog.Root,
      {
        open,
        onOpenChange: handleDialogOpenChange,
        actionsRef: dialogActionsRef,
        disablePointerDismissal: true,
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { onExitComplete: handleDialogExited, children: open && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _dialog.Dialog.Portal, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          _dialog.Dialog.Popup,
          {
            render: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
              _framermotion.motion.div,
              {
                dir: direction,
                "aria-label": placeholder,
                tabIndex: -1,
                className: panelClassName,
                ...panelMotionProps,
                children: [
                  inputRow,
                  resultsArea
                ]
              }
            ),
            initialFocus: autoFocus ? inputRef : false
          }
        ) }) })
      }
    ) }) });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { ref: directionRootRef, className: "contents", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _directionprovider.DirectionProvider, { direction, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: open && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, React28.Fragment, { children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _framermotion.motion.button,
      {
        type: "button",
        "aria-label": "Dismiss search",
        onClick: () => onOpenChange(false),
        className: "fixed inset-0 z-[80] cursor-default bg-m3-scrim/32",
        initial: reduceMotion ? false : { opacity: 0 },
        animate: { opacity: 1 },
        exit: reduceMotion ? { opacity: 1 } : { opacity: 0 },
        transition: reduceMotion ? { duration: 0 } : { duration: durations.short4 / 1e3, ease: "easeOut" }
      }
    ),
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
      _framermotion.motion.div,
      {
        ref: dockedPanelRef,
        dir: direction,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": placeholder,
        tabIndex: -1,
        onKeyDown: handleDockedKeyDown,
        className: panelClassName,
        ...panelMotionProps,
        children: [
          inputRow,
          resultsArea
        ]
      }
    )
  ] }, "m3-search-view-docked") }) }) });
});

// ../../src/components/m3/Autocomplete.tsx


var _autocomplete = require('@base-ui/react/autocomplete');


var springs5 = springs;
var Autocomplete = React29.forwardRef(function Autocomplete2({
  options,
  value,
  onChange,
  label,
  placeholder = "Type to filter",
  fullWidth = false,
  disabled = false,
  id,
  name,
  form,
  required = false,
  "aria-label": ariaLabel,
  className
}, ref) {
  const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
  const rootRef = React29.useRef(null);
  const direction = useTextDirection(rootRef);
  const generatedId = React29.useId();
  const inputId = _nullishCoalesce(id, () => ( `m3-autocomplete-${generatedId.replace(/:/g, "")}`));
  const [focused, setFocused] = React29.useState(false);
  const [open, setOpen] = React29.useState(false);
  const active = focused || open;
  const popupMotion = {
    initial: reduceMotion ? false : { opacity: 0, scale: 0.96, y: -4 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: reduceMotion ? { duration: 0 } : springs5.fastSpatial,
    style: { transformOrigin: "top center" }
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _directionprovider.DirectionProvider, { direction, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    _autocomplete.Autocomplete.Root,
    {
      items: options,
      value,
      onValueChange: (next) => onChange(next),
      onOpenChange: setOpen,
      disabled,
      mode: "list",
      children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
        "div",
        {
          ref: rootRef,
          "data-m3-extension": "autocomplete",
          className: cn("relative", fullWidth && "w-full", disabled && "pointer-events-none opacity-38", className),
          children: [
            label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "label", { htmlFor: inputId, className: "mb-1 block px-1 md-body-small text-m3-on-surface-variant", children: label }),
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
              "div",
              {
                className: cn(
                  "relative flex h-14 items-center rounded-m3-xs border transition-[border-color,box-shadow] duration-150",
                  disabled ? "border-m3-outline/12" : active ? "border-m3-primary shadow-[inset_0_0_0_1px_var(--md-primary)]" : "border-m3-outline hover:border-m3-on-surface"
                ),
                children: [
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                    _autocomplete.Autocomplete.Input,
                    {
                      ref,
                      id: inputId,
                      name,
                      form,
                      required,
                      "aria-label": label ? void 0 : _nullishCoalesce(ariaLabel, () => ( placeholder)),
                      placeholder,
                      onFocus: () => setFocused(true),
                      onBlur: () => setFocused(false),
                      className: "h-full w-full bg-transparent ps-4 pe-12 text-m3-on-surface outline-none placeholder:text-m3-on-surface-variant md-body-large"
                    }
                  ),
                  /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
                    _autocomplete.Autocomplete.Trigger,
                    {
                      "aria-label": "Toggle suggestions",
                      className: "m3-state m3-focus absolute end-0 grid h-12 w-12 cursor-pointer place-items-center overflow-hidden rounded-full text-m3-on-surface-variant outline-none [&[data-popup-open]>span]:rotate-180",
                      children: [
                        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
                        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "inline-flex transition-transform duration-200", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "arrow_drop_down", size: 24 }) })
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _autocomplete.Autocomplete.Portal, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _autocomplete.Autocomplete.Positioner, { side: "bottom", sideOffset: 4, className: "z-10 outline-none", children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
              _autocomplete.Autocomplete.Popup,
              {
                dir: direction,
                render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.motion.div, { ...popupMotion }),
                className: "m3-scroll m3-elevation-2 max-h-72 w-[var(--anchor-width)] overflow-y-auto rounded-m3-xs bg-m3-surface-container py-2 outline-none",
                children: [
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _autocomplete.Autocomplete.List, { className: "m-0 list-none p-0", children: (option) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
                    _autocomplete.Autocomplete.Item,
                    {
                      value: option,
                      className: "m3-state relative flex h-12 cursor-pointer list-none items-center overflow-hidden px-4 outline-none md-body-large text-m3-on-surface data-[highlighted]:bg-m3-on-surface/8",
                      children: [
                        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
                        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "flex-1 truncate", children: option }),
                        option === value && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "check", size: 20, fill: true, className: "text-m3-primary" })
                      ]
                    },
                    option
                  ) }),
                  options.every((o) => {
                    const q = value.trim().toLowerCase();
                    return q !== "" && !o.toLowerCase().includes(q);
                  }) && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "px-4 py-3 md-body-medium text-m3-on-surface-variant", children: "No matches" })
                ]
              }
            ) }) })
          ]
        }
      )
    }
  ) });
});

// ../../src/components/m3/Checkbox.tsx


var _checkbox = require('@base-ui/react/checkbox');

var springs6 = springs;
var Checkbox = React30.forwardRef(function Checkbox2({
  checked,
  indeterminate = false,
  onChange,
  label,
  disabled = false,
  error = false,
  className,
  ...props
}, ref) {
  const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
  const { defaultChecked, ...rootProps } = props;
  const [internalChecked, setInternalChecked] = React30.useState(_nullishCoalesce(defaultChecked, () => ( false)));
  const actualChecked = _nullishCoalesce(checked, () => ( internalChecked));
  const isFilled = actualChecked || indeterminate;
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
    _checkbox.Checkbox.Root,
    {
      ref,
      checked,
      defaultChecked,
      indeterminate,
      disabled,
      nativeButton: true,
      onCheckedChange: (nextChecked) => {
        if (checked === void 0) setInternalChecked(nextChecked);
        _optionalChain([onChange, 'optionalCall', _129 => _129(nextChecked)]);
      },
      ...rootProps,
      className: cn(
        "group relative inline-flex min-h-12 items-center outline-none",
        disabled ? "pointer-events-none text-m3-on-surface/38" : error ? "text-m3-error" : isFilled ? "text-m3-primary" : "text-m3-on-surface-variant",
        className
      ),
      render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
        _framermotion.motion.button,
        {
          whileTap: disabled || reduceMotion ? void 0 : { scale: 0.95 },
          transition: reduceMotion ? { duration: 0 } : springs6.fastVisual
        }
      ),
      children: [
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: "m3-state relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full group-focus-visible:outline-[3px_solid_var(--md-primary)] group-focus-visible:outline-offset-2", children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
            _framermotion.motion.span,
            {
              className: cn(
                "relative grid h-[18px] w-[18px] place-items-center rounded-[2px] border-2 transition-colors duration-150",
                isFilled ? disabled ? "border-m3-on-surface/38 bg-m3-on-surface/38" : error ? "border-m3-error bg-m3-error" : "border-m3-primary bg-m3-primary" : disabled ? "border-m3-on-surface/38 bg-transparent" : error ? "border-m3-error bg-transparent" : "border-m3-on-surface-variant bg-transparent"
              ),
              whileTap: disabled || reduceMotion ? void 0 : { scale: 0.85 },
              transition: reduceMotion ? { duration: 0 } : springs6.expressive,
              children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "svg", { viewBox: "0 0 24 24", "aria-hidden": "true", className: "h-3 w-3", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  _framermotion.motion.path,
                  {
                    d: "M20 6 9 17l-5-5",
                    fill: "none",
                    strokeWidth: 3.5,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    className: disabled ? "stroke-m3-surface" : error ? "stroke-m3-on-error" : "stroke-m3-on-primary",
                    initial: false,
                    animate: { pathLength: actualChecked && !indeterminate ? 1 : 0, opacity: actualChecked && !indeterminate ? 1 : 0 },
                    transition: reduceMotion ? { duration: 0 } : springs6.expressive
                  }
                ) }),
                indeterminate && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  _framermotion.motion.span,
                  {
                    className: cn(
                      "absolute h-[2px] w-[10px] rounded-full",
                      disabled ? "bg-m3-surface" : error ? "bg-m3-on-error" : "bg-m3-on-primary"
                    ),
                    initial: { scale: 0 },
                    animate: { scale: 1 },
                    transition: reduceMotion ? { duration: 0 } : springs6.expressive
                  }
                )
              ]
            }
          )
        ] }),
        label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: cn("pr-3 md-body-large", disabled ? "text-m3-on-surface/38" : "text-m3-on-surface"), children: label })
      ]
    }
  );
});

// ../../src/components/m3/Radio.tsx


var _radiogroup = require('@base-ui/react/radio-group');
var _radio = require('@base-ui/react/radio');

var springs7 = springs;
var M3RadioGroupContext = React31.createContext(null);
var Radio = React31.forwardRef(function Radio2({
  checked = false,
  onChange,
  value,
  label,
  disabled = false,
  error = false,
  className,
  ...props
}, ref) {
  const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
  const generatedValue = React31.useId();
  const radioValue = _nullishCoalesce(value, () => ( generatedValue));
  const group = React31.useContext(M3RadioGroupContext);
  const actualChecked = group ? group.selectedValue === radioValue : checked;
  React31.useEffect(() => {
    if (checked) _optionalChain([group, 'optionalAccess', _130 => _130.setGroupValue, 'call', _131 => _131(radioValue)]);
  }, [checked, group, radioValue]);
  React31.useEffect(() => {
    _optionalChain([group, 'optionalAccess', _132 => _132.registerChangeHandler, 'call', _133 => _133(radioValue, onChange)]);
    return () => _optionalChain([group, 'optionalAccess', _134 => _134.registerChangeHandler, 'call', _135 => _135(radioValue, void 0)]);
  }, [group, onChange, radioValue]);
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
    _radio.Radio.Root,
    {
      ref,
      value: radioValue,
      disabled,
      nativeButton: true,
      ...props,
      onClick: () => {
        if (!group) _optionalChain([onChange, 'optionalCall', _136 => _136()]);
      },
      "aria-checked": actualChecked,
      className: cn(
        "group relative inline-flex min-h-12 items-center outline-none",
        disabled ? "pointer-events-none text-m3-on-surface/38" : error ? "text-m3-error" : actualChecked ? "text-m3-primary" : "text-m3-on-surface-variant",
        className
      ),
      render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
        _framermotion.motion.button,
        {
          whileTap: disabled || reduceMotion ? void 0 : { scale: 0.95 },
          transition: reduceMotion ? { duration: 0 } : springs7.fastVisual
        }
      ),
      children: [
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: "m3-state relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full group-focus-visible:outline-[3px_solid_var(--md-primary)] group-focus-visible:outline-offset-2", children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            "span",
            {
              className: cn(
                "grid h-5 w-5 place-items-center rounded-full border-2 transition-colors duration-150",
                disabled ? "border-m3-on-surface/38" : error ? "border-m3-error" : actualChecked ? "border-m3-primary" : "border-m3-on-surface-variant"
              ),
              children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                _framermotion.motion.span,
                {
                  className: cn(
                    "h-[10px] w-[10px] rounded-full",
                    disabled ? "bg-m3-on-surface/38" : error ? "bg-m3-error" : "bg-m3-primary"
                  ),
                  initial: false,
                  animate: { scale: actualChecked ? 1 : 0 },
                  transition: reduceMotion ? { duration: 0 } : springs7.expressive
                }
              )
            }
          )
        ] }),
        label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: cn("pr-3 md-body-large", disabled ? "text-m3-on-surface/38" : "text-m3-on-surface"), children: label })
      ]
    }
  );
});
var RadioGroup = React31.forwardRef(function RadioGroup2({
  label,
  className,
  children,
  value,
  defaultValue,
  onValueChange,
  ...props
}, ref) {
  const [groupValue, setGroupValue] = React31.useState(defaultValue);
  const changeHandlersRef = React31.useRef(/* @__PURE__ */ new Map());
  const registerChangeHandler = React31.useCallback(
    (nextValue, handler) => {
      if (handler) changeHandlersRef.current.set(nextValue, handler);
      else changeHandlersRef.current.delete(nextValue);
    },
    []
  );
  const handleValueChange = React31.useCallback(
    (nextValue) => {
      if (value === void 0) setGroupValue(nextValue);
      _optionalChain([onValueChange, 'optionalCall', _137 => _137(nextValue)]);
      _optionalChain([changeHandlersRef, 'access', _138 => _138.current, 'access', _139 => _139.get, 'call', _140 => _140(nextValue), 'optionalCall', _141 => _141()]);
    },
    [onValueChange, value]
  );
  const selectedValue = _nullishCoalesce(value, () => ( groupValue));
  const bridge = React31.useMemo(
    () => ({ selectedValue, setGroupValue, registerChangeHandler }),
    [selectedValue, setGroupValue, registerChangeHandler]
  );
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, M3RadioGroupContext.Provider, { value: bridge, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    _radiogroup.RadioGroup,
    {
      ref,
      value: _nullishCoalesce(selectedValue, () => ( "")),
      onValueChange: handleValueChange,
      "aria-label": label,
      ...props,
      className: cn("flex flex-col", className),
      children
    }
  ) });
});
RadioGroup.displayName = "RadioGroup";

// ../../src/components/m3/Switch.tsx


var _switch = require('@base-ui/react/switch');


var springs8 = springs;
var Switch = React32.forwardRef(function Switch2({
  checked,
  onCheckedChange,
  disabled = false,
  showIcon = false,
  showUnselectedIcon = false,
  className,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  ...props
}, ref) {
  const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
  const rootRef = React32.useRef(null);
  const direction = useTextDirection(rootRef);
  const { defaultChecked, ...rootProps } = props;
  const [internalChecked, setInternalChecked] = React32.useState(_nullishCoalesce(defaultChecked, () => ( false)));
  const actualChecked = _nullishCoalesce(checked, () => ( internalChecked));
  const [pressed, setPressed] = React32.useState(false);
  const thumbSize = pressed ? 28 : actualChecked || showUnselectedIcon ? 24 : 16;
  const thumbOffset = actualChecked ? pressed ? 20 : 24 : 4;
  const thumbX = direction === "rtl" ? -thumbOffset : thumbOffset;
  const stateLayerX = (direction === "rtl" ? -1 : 1) * (thumbOffset + thumbSize / 2 - 20);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _directionprovider.DirectionProvider, { direction, children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
    _switch.Switch.Root,
    {
      ref: (node) => {
        rootRef.current = node;
        const button = node;
        if (typeof ref === "function") ref(button);
        else if (ref) ref.current = button;
      },
      checked,
      defaultChecked,
      disabled,
      nativeButton: true,
      onCheckedChange: (nextChecked) => {
        if (checked === void 0) setInternalChecked(nextChecked);
        _optionalChain([onCheckedChange, 'optionalCall', _142 => _142(nextChecked)]);
      },
      ...rootProps,
      onPointerDown: (event) => {
        setPressed(true);
        _optionalChain([onPointerDown, 'optionalCall', _143 => _143(event)]);
      },
      onPointerUp: (event) => {
        setPressed(false);
        _optionalChain([onPointerUp, 'optionalCall', _144 => _144(event)]);
      },
      onPointerLeave: (event) => {
        setPressed(false);
        _optionalChain([onPointerLeave, 'optionalCall', _145 => _145(event)]);
      },
      className: cn(
        "group relative inline-flex h-12 w-[52px] shrink-0 items-center border-0 bg-transparent outline-none",
        disabled ? "pointer-events-none text-m3-on-surface/38" : actualChecked ? "text-m3-on-primary" : "text-m3-on-surface-variant",
        className
      ),
      render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "button", {}),
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          "span",
          {
            "aria-hidden": "true",
            className: cn(
              "pointer-events-none absolute inset-x-0 top-2 h-8 rounded-full border-2 transition-colors duration-150",
              disabled ? actualChecked ? "border-m3-on-surface/12 bg-m3-on-surface/12" : "border-m3-on-surface/12 bg-m3-surface-container-highest" : actualChecked ? "border-m3-primary bg-m3-primary" : "border-m3-outline bg-m3-surface-container-highest"
            )
          }
        ),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          _framermotion.motion.span,
          {
            "aria-hidden": "true",
            className: "m3-state absolute start-0 top-1 z-10 h-10 w-10 overflow-hidden rounded-full group-focus-visible:outline-[3px_solid_var(--md-primary)] group-focus-visible:outline-offset-2",
            initial: false,
            animate: { x: stateLayerX },
            transition: reduceMotion ? { duration: 0 } : springs8.defaultSpatial,
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled })
          }
        ),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          _switch.Switch.Thumb,
          {
            className: cn(
              "pointer-events-none absolute start-0 top-1/2 z-20 grid place-items-center rounded-full shadow-[0_1px_3px_1px_rgba(0,0,0,0.15)] transition-colors duration-150",
              disabled ? actualChecked ? "bg-m3-surface" : "bg-m3-on-surface/38" : actualChecked ? "bg-m3-on-primary" : "bg-m3-outline"
            ),
            render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              _framermotion.motion.span,
              {
                initial: false,
                animate: { x: thumbX, y: "-50%", width: thumbSize, height: thumbSize },
                transition: reduceMotion ? { duration: 0 } : springs8.defaultSpatial
              }
            ),
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { initial: false, children: (showIcon && actualChecked || showUnselectedIcon && !actualChecked) && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              _framermotion.motion.span,
              {
                className: "grid place-items-center",
                initial: reduceMotion ? false : { opacity: 0, scale: 0.5 },
                animate: { opacity: 1, scale: 1 },
                exit: reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 },
                transition: reduceMotion ? { duration: 0 } : springs8.fastVisual,
                children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  MaterialSymbol,
                  {
                    icon: actualChecked ? "check" : "close",
                    size: 16,
                    className: cn(
                      disabled && actualChecked && "text-m3-on-surface/38",
                      disabled && !actualChecked && "text-m3-surface-container-highest/38",
                      !disabled && actualChecked && "text-m3-on-primary-container",
                      !disabled && !actualChecked && "text-m3-surface-container-highest"
                    )
                  }
                )
              },
              actualChecked ? "check" : "close"
            ) })
          }
        )
      ]
    }
  ) });
});

// ../../src/components/m3/Slider.tsx


var _slider = require('@base-ui/react/slider');


var springs9 = springs;
var sizeGeometry = {
  xs: { track: 16, handle: 44, radius: 8 },
  sm: { track: 24, handle: 44, radius: 8 },
  md: { track: 40, handle: 52, radius: 12 },
  lg: { track: 56, handle: 68, radius: 16 },
  xl: { track: 96, handle: 108, radius: 28 }
};
var Slider = React33.forwardRef(function Slider2({
  value,
  onChange,
  variant: variantProp,
  min = 0,
  max = 100,
  step = 1,
  stops = false,
  discrete = false,
  showValueLabel = false,
  insetIcons,
  orientation = "horizontal",
  size = "xs",
  disabled = false,
  name,
  rangeNames,
  form,
  fullWidth = false,
  className,
  ...rest
}, ref) {
  const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
  const rootRef = React33.useRef(null);
  const direction = useTextDirection(rootRef);
  const [active, setActive] = React33.useState(false);
  const [hover, setHover] = React33.useState(false);
  const [focused, setFocused] = React33.useState(false);
  const safeStep = step > 0 ? step : 1;
  const isRange = typeof value !== "number";
  const variant = isRange ? "range" : _nullishCoalesce(variantProp, () => ( "standard"));
  const vertical = orientation === "vertical";
  const geometry = sizeGeometry[size];
  const engaged = active || hover;
  const handleWidth = active || focused ? 2 : 4;
  const values = typeof value === "number" ? [value] : value;
  const fractions = values.map((item) => {
    const raw = max === min ? 0 : (item - min) / (max - min);
    return Math.min(1, Math.max(0, raw));
  });
  const firstFraction = _nullishCoalesce(fractions[0], () => ( 0));
  const lastFraction = _nullishCoalesce(fractions[fractions.length - 1], () => ( firstFraction));
  const showStops = stops || discrete;
  const tickCount = showStops ? Math.max(2, Math.min(100, Math.round((max - min) / safeStep) + 1)) : 0;
  const ariaLabel = rest["aria-label"];
  const handleValueChange = (next) => {
    if (isRange) {
      const nextValues = typeof next === "number" ? [next, next] : next;
      onChange([
        _nullishCoalesce(nextValues[0], () => ( min)),
        _nullishCoalesce(nextValues[1], () => ( max))
      ]);
    } else {
      onChange(typeof next === "number" ? next : _nullishCoalesce(next[0], () => ( min)));
    }
  };
  const isFractionActive = (fraction) => {
    if (variant === "range") return fraction >= firstFraction && fraction <= lastFraction;
    if (variant === "centered") {
      return fraction >= Math.min(0.5, firstFraction) && fraction <= Math.max(0.5, firstFraction);
    }
    return fraction <= firstFraction;
  };
  const segments = variant === "range" ? [
    { start: 0, end: firstFraction, active: false, gapEnd: true },
    { start: firstFraction, end: lastFraction, active: true, gapStart: true, gapEnd: true },
    { start: lastFraction, end: 1, active: false, gapStart: true }
  ] : variant === "centered" ? firstFraction >= 0.5 ? [
    { start: 0, end: 0.5, active: false },
    { start: 0.5, end: firstFraction, active: true, gapEnd: true },
    { start: firstFraction, end: 1, active: false, gapStart: true }
  ] : [
    { start: 0, end: firstFraction, active: false, gapEnd: true },
    { start: firstFraction, end: 0.5, active: true, gapStart: true },
    { start: 0.5, end: 1, active: false }
  ] : [
    { start: 0, end: firstFraction, active: true, gapEnd: true },
    { start: firstFraction, end: 1, active: false, gapStart: true }
  ];
  const controlCrossSize = Math.max(48, geometry.handle);
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
    "div",
    {
      ref: (node) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      className: cn(
        "relative select-none",
        vertical ? fullWidth ? "h-full" : "h-64" : fullWidth ? "w-full" : "w-64",
        disabled && "pointer-events-none",
        className
      ),
      ...rest,
      children: [
        isRange && rangeNames && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "input", { type: "hidden", name: rangeNames[0], form, value: values[0], disabled }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "input", { type: "hidden", name: rangeNames[1], form, value: values[1], disabled })
        ] }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _directionprovider.DirectionProvider, { direction, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          _slider.Slider.Root,
          {
            value,
            min,
            max,
            step: safeStep,
            orientation,
            disabled,
            name: isRange && rangeNames ? void 0 : name,
            form,
            onValueChange: handleValueChange,
            children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
              _slider.Slider.Control,
              {
                onFocusCapture: () => setFocused(true),
                onBlurCapture: (event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
                },
                onPointerDown: () => setActive(true),
                onPointerUp: () => setActive(false),
                onPointerCancel: () => setActive(false),
                onPointerEnter: () => setHover(true),
                onPointerLeave: () => {
                  setHover(false);
                  setActive(false);
                },
                className: cn(
                  "m3-focus relative flex cursor-pointer touch-none items-center justify-center rounded-full outline-none",
                  vertical ? "h-full" : "w-full",
                  focused && "outline-[3px_solid_var(--md-primary)] outline-offset-2"
                ),
                style: vertical ? { width: controlCrossSize } : { height: controlCrossSize },
                children: [
                  /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
                    _slider.Slider.Track,
                    {
                      className: "relative",
                      style: vertical ? { width: geometry.track, height: "100%" } : { width: "100%", height: geometry.track },
                      children: [
                        segments.map((segment, index) => {
                          const startGap = segment.gapStart ? 6 : 0;
                          const endGap = segment.gapEnd ? 6 : 0;
                          const length = Math.max(0, segment.end - segment.start) * 100;
                          const radius = geometry.radius;
                          const inside = 2;
                          return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                            "span",
                            {
                              className: cn(
                                "pointer-events-none absolute",
                                disabled ? segment.active ? "bg-m3-on-surface/38" : "bg-m3-on-surface/12" : segment.active ? "bg-m3-primary" : "bg-m3-secondary-container"
                              ),
                              style: vertical ? {
                                bottom: `calc(${segment.start * 100}% + ${startGap}px)`,
                                height: `max(0px, calc(${length}% - ${startGap + endGap}px))`,
                                width: geometry.track,
                                borderRadius: `${segment.end === 1 ? radius : inside}px ${segment.end === 1 ? radius : inside}px ${segment.start === 0 ? radius : inside}px ${segment.start === 0 ? radius : inside}px`
                              } : {
                                insetInlineStart: `calc(${segment.start * 100}% + ${startGap}px)`,
                                width: `max(0px, calc(${length}% - ${startGap + endGap}px))`,
                                height: geometry.track,
                                borderStartStartRadius: segment.start === 0 ? radius : inside,
                                borderEndStartRadius: segment.start === 0 ? radius : inside,
                                borderStartEndRadius: segment.end === 1 ? radius : inside,
                                borderEndEndRadius: segment.end === 1 ? radius : inside
                              }
                            },
                            `segment-${index}`
                          );
                        }),
                        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "pointer-events-none absolute inset-0", "aria-hidden": "true", children: (showStops ? Array.from({ length: tickCount }, (_, i) => i / (tickCount - 1)) : [1]).map(
                          (fraction, index) => {
                            const hiddenByThumb = fractions.some((thumbFraction) => Math.abs(thumbFraction - fraction) < 1e-3);
                            if (hiddenByThumb) return null;
                            return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                              "span",
                              {
                                className: cn(
                                  "absolute h-1 w-1 rounded-full",
                                  disabled ? "bg-m3-on-surface/38" : isFractionActive(fraction) ? "bg-m3-on-primary" : "bg-m3-on-secondary-container"
                                ),
                                style: vertical ? {
                                  bottom: `${fraction * 100}%`,
                                  insetInlineStart: "50%",
                                  transform: `translate(${direction === "rtl" ? "50%" : "-50%"}, 50%)`
                                } : {
                                  insetInlineStart: `${fraction * 100}%`,
                                  top: "50%",
                                  transform: `translate(${direction === "rtl" ? "50%" : "-50%"}, -50%)`
                                }
                              },
                              index
                            );
                          }
                        ) }),
                        insetIcons && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "pointer-events-none absolute inset-0 z-10", "aria-hidden": "true", children: [
                          /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                            MaterialSymbol,
                            {
                              icon: insetIcons.start,
                              size: 20,
                              className: cn(
                                "absolute",
                                isFractionActive(0) ? "text-m3-on-primary" : "text-m3-on-secondary-container"
                              ),
                              style: vertical ? {
                                bottom: 10,
                                insetInlineStart: "50%",
                                transform: `translateX(${direction === "rtl" ? "50%" : "-50%"})`
                              } : { insetInlineStart: 10, top: "50%", transform: "translateY(-50%)" }
                            }
                          ),
                          /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                            MaterialSymbol,
                            {
                              icon: insetIcons.end,
                              size: 20,
                              className: cn(
                                "absolute",
                                isFractionActive(1) ? "text-m3-on-primary" : "text-m3-on-secondary-container"
                              ),
                              style: vertical ? {
                                top: 10,
                                insetInlineStart: "50%",
                                transform: `translateX(${direction === "rtl" ? "50%" : "-50%"})`
                              } : { insetInlineEnd: 10, top: "50%", transform: "translateY(-50%)" }
                            }
                          )
                        ] }),
                        values.map((item, index) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                          _slider.Slider.Thumb,
                          {
                            index: isRange ? index : void 0,
                            getAriaLabel: () => isRange ? `${index === 0 ? "Start" : "End"}${ariaLabel ? ` ${ariaLabel}` : " value"}` : _nullishCoalesce(ariaLabel, () => ( "Slider value")),
                            className: "pointer-events-none outline-none",
                            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                              _framermotion.motion.span,
                              {
                                className: cn(
                                  "block rounded-full",
                                  disabled ? "bg-m3-on-surface/38" : "bg-m3-primary"
                                ),
                                initial: false,
                                animate: vertical ? { width: geometry.handle, height: handleWidth } : { width: handleWidth, height: geometry.handle },
                                transition: reduceMotion ? { duration: 0 } : springs9.fastVisual
                              }
                            )
                          },
                          index
                        ))
                      ]
                    }
                  ),
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: showValueLabel && (engaged || focused) && values.map((item, index) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                    _framermotion.motion.span,
                    {
                      className: "pointer-events-none absolute inline-block whitespace-nowrap rounded-full bg-m3-inverse-surface px-2 py-1 text-m3-inverse-on-surface md-label-large",
                      style: vertical ? {
                        bottom: `${(_nullishCoalesce(fractions[index], () => ( 0))) * 100}%`,
                        insetInlineStart: "100%",
                        marginInlineStart: 8,
                        y: "50%"
                      } : {
                        insetInlineStart: `${(_nullishCoalesce(fractions[index], () => ( 0))) * 100}%`,
                        bottom: "100%",
                        marginBottom: 8,
                        x: direction === "rtl" ? "50%" : "-50%"
                      },
                      initial: reduceMotion ? false : { opacity: 0, scale: 0.6 },
                      animate: { opacity: 1, scale: 1 },
                      exit: reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.6 },
                      transition: reduceMotion ? { duration: 0 } : springs9.expressive,
                      children: item
                    },
                    `value-${index}`
                  )) })
                ]
              }
            )
          }
        ) })
      ]
    }
  );
});

// ../../src/components/m3/Chip.tsx












var springs10 = springs;
var sizeHeights3 = { xs: 28, sm: 32, md: 40 };
var Chip = React34.forwardRef(function Chip2({
  variant = "assist",
  selected = false,
  onSelect,
  onClick,
  onRemove,
  removeLabel = "Remove",
  leadingIcon,
  avatar,
  trailingIcon,
  elevated = false,
  size = "sm",
  disabled = false,
  className,
  children
}, ref) {
  const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
  const isInput = variant === "input";
  const isSelectable = variant === "filter";
  const showCheck = selected && isSelectable;
  const selectedContainer = selected && (isSelectable || isInput);
  const hasLeadingContent = showCheck || Boolean(leadingIcon);
  const selectionProgress = _framermotion.useMotionValue.call(void 0, hasLeadingContent ? 1 : 0);
  const leadingSlotWidth = _framermotion.useTransform.call(void 0, selectionProgress, [0, 1], [8, 26]);
  const trailingBalanceWidth = _framermotion.useTransform.call(void 0, selectionProgress, [0, 1], [8, 0]);
  React34.useEffect(() => {
    const animation = _framermotion.animate.call(void 0, selectionProgress, hasLeadingContent ? 1 : 0, {
      ...reduceMotion ? { duration: 0 } : springs10.fastSpatial
    });
    return () => animation.stop();
  }, [hasLeadingContent, reduceMotion, selectionProgress]);
  const flatColorClass = variant === "assist" ? "border-m3-outline-variant bg-transparent text-m3-on-surface" : "border-m3-outline-variant bg-transparent text-m3-on-surface-variant";
  const elevatedColorClass = variant === "assist" ? "border-transparent bg-m3-surface-container-low text-m3-on-surface" : "border-transparent bg-m3-surface-container-low text-m3-on-surface-variant";
  const leadingIconClass = selectedContainer ? isInput ? "text-m3-primary" : "text-m3-on-secondary-container" : variant === "assist" || variant === "filter" || variant === "suggestion" ? "text-m3-primary" : "text-m3-on-surface-variant";
  const trailingIconClass = selectedContainer ? "text-m3-on-secondary-container" : "text-m3-on-surface-variant";
  const visualClassName = cn(
    "relative inline-flex select-none items-center rounded-m3-sm border md-label-large transition-[background-color,border-color,box-shadow] duration-150",
    selectedContainer ? "border-transparent bg-m3-secondary-container text-m3-on-secondary-container" : elevated ? cn(
      "m3-elevation-1 hover:[box-shadow:0_1px_2px_0_rgb(0_0_0/0.30),0_2px_6px_2px_rgb(0_0_0/0.15)]",
      elevatedColorClass
    ) : flatColorClass,
    disabled && "pointer-events-none opacity-38",
    className
  );
  const interactiveClassName = cn(
    visualClassName,
    "m3-state m3-focus overflow-hidden outline-none",
    isSelectable ? "px-2" : showCheck || leadingIcon || trailingIcon ? "gap-2 px-2" : "gap-2 px-4"
  );
  const content = /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
    isSelectable ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _framermotion.motion.span,
      {
        "aria-hidden": "true",
        className: "inline-flex shrink-0 items-center justify-start overflow-hidden",
        style: { width: leadingSlotWidth },
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { initial: false, mode: "wait", children: showCheck ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          _framermotion.motion.span,
          {
            className: "inline-flex shrink-0 items-center text-m3-on-secondary-container",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: reduceMotion ? { duration: 0 } : springs10.fastVisual,
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "check", size: 18 })
          },
          "check"
        ) : leadingIcon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          _framermotion.motion.span,
          {
            className: "inline-flex shrink-0 items-center",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: reduceMotion ? { duration: 0 } : springs10.fastVisual,
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: leadingIcon, size: 18, className: leadingIconClass })
          },
          "leading"
        ) })
      }
    ) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { initial: false, mode: "wait", children: isInput && avatar != null ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _framermotion.motion.span,
      {
        "aria-hidden": "true",
        className: "inline-flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full [&>*]:h-full [&>*]:w-full [&>*]:object-cover",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: reduceMotion ? { duration: 0 } : springs10.fastVisual,
        children: avatar
      },
      "avatar"
    ) : leadingIcon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _framermotion.motion.span,
      {
        className: "inline-flex shrink-0 items-center",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: reduceMotion ? { duration: 0 } : springs10.fastVisual,
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: leadingIcon, size: 18, className: leadingIconClass })
      },
      "leading"
    ) }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "truncate", children }),
    !isInput && trailingIcon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      MaterialSymbol,
      {
        icon: trailingIcon,
        size: 18,
        className: cn("shrink-0", isSelectable && "ms-2", trailingIconClass)
      }
    ),
    isSelectable && !trailingIcon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.motion.span, { "aria-hidden": "true", className: "shrink-0", style: { width: trailingBalanceWidth } })
  ] });
  const motionProps = {
    whileTap: disabled || reduceMotion ? void 0 : { scale: 0.96 },
    transition: reduceMotion ? { duration: 0 } : springs10.fastVisual
  };
  if (isInput) {
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
      "span",
      {
        role: "group",
        "aria-label": typeof children === "string" ? `${children} input chip` : "Input chip",
        className: visualClassName,
        style: { height: sizeHeights3[size] },
        children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            _button.Button,
            {
              ref,
              "data-m3-chip": "",
              disabled,
              onClick,
              className: cn(
                "m3-state m3-focus relative flex h-full min-w-0 flex-1 items-center gap-2 overflow-hidden outline-none",
                avatar != null ? "ps-1" : leadingIcon ? "ps-2" : "ps-4"
              ),
              render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.motion.button, { ...motionProps }),
              children: content
            }
          ),
          onRemove && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            _button.Button,
            {
              type: "button",
              "data-m3-chip-remove": "",
              disabled,
              "aria-label": removeLabel,
              onClick: onRemove,
              className: cn(
                "m3-state m3-focus relative -my-2 -me-2 grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full outline-none transition-colors duration-150",
                trailingIconClass
              ),
              children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "cancel", size: 18 })
            }
          )
        ]
      }
    );
  }
  if (!isSelectable) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _button.Button,
      {
        ref,
        "data-m3-chip": "",
        disabled,
        onClick,
        className: interactiveClassName,
        style: { height: sizeHeights3[size] },
        render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.motion.button, { ...motionProps }),
        children: content
      }
    );
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    _toggle.Toggle,
    {
      ref,
      "data-m3-chip": "",
      pressed: selected,
      onPressedChange: (nextPressed) => _optionalChain([onSelect, 'optionalCall', _146 => _146(nextPressed)]),
      disabled,
      className: interactiveClassName,
      style: { height: sizeHeights3[size] },
      render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.motion.button, { ...motionProps }),
      children: content
    }
  );
});
var ChipGroup = React34.forwardRef(function ChipGroup2({ label = "Chips", className, children, onKeyDown, onFocus, ...props }, ref) {
  const rootRef = React34.useRef(null);
  const direction = useTextDirection(rootRef);
  const setRootRef = React34.useCallback(
    (node) => {
      rootRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );
  const getChips = React34.useCallback(
    () => Array.from(_nullishCoalesce(_optionalChain([rootRef, 'access', _147 => _147.current, 'optionalAccess', _148 => _148.querySelectorAll, 'call', _149 => _149("button[data-m3-chip]")]), () => ( []))).filter((chip) => !chip.disabled),
    []
  );
  React34.useLayoutEffect(() => {
    const chips = getChips();
    if (chips.length === 0) return;
    const current = _nullishCoalesce(chips.find((chip) => chip.tabIndex === 0), () => ( chips[0]));
    chips.forEach((chip) => {
      chip.tabIndex = chip === current ? 0 : -1;
    });
  }, [children, getChips]);
  return (
    // A chip group owns the official delegated arrow/removal keyboard contract.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      "div",
      {
        ...props,
        ref: setRootRef,
        role: "group",
        "aria-label": label,
        className: cn("flex flex-wrap items-center gap-2", className),
        onFocus: (event) => {
          const chip = event.target.closest("button[data-m3-chip]");
          if (chip) getChips().forEach((item) => {
            item.tabIndex = item === chip ? 0 : -1;
          });
          _optionalChain([onFocus, 'optionalCall', _150 => _150(event)]);
        },
        onKeyDown: (event) => {
          _optionalChain([onKeyDown, 'optionalCall', _151 => _151(event)]);
          if (event.defaultPrevented) return;
          const chip = event.target.closest("button[data-m3-chip]");
          if (!chip) return;
          const chips = getChips();
          const index = chips.indexOf(chip);
          let nextIndex;
          const horizontalStep = event.key === "ArrowRight" ? direction === "rtl" ? -1 : 1 : event.key === "ArrowLeft" ? direction === "rtl" ? 1 : -1 : 0;
          if (horizontalStep !== 0) nextIndex = (index + horizontalStep + chips.length) % chips.length;
          if (event.key === "ArrowDown") nextIndex = (index + 1) % chips.length;
          if (event.key === "ArrowUp") nextIndex = (index - 1 + chips.length) % chips.length;
          if (event.key === "Home") nextIndex = 0;
          if (event.key === "End") nextIndex = chips.length - 1;
          if (nextIndex !== void 0) {
            event.preventDefault();
            _optionalChain([chips, 'access', _152 => _152[nextIndex], 'optionalAccess', _153 => _153.focus, 'call', _154 => _154()]);
            return;
          }
          if (event.key !== "Delete" && event.key !== "Backspace") return;
          const group = chip.closest('[role="group"]');
          const remove = _optionalChain([group, 'optionalAccess', _155 => _155.querySelector, 'call', _156 => _156("button[data-m3-chip-remove]")]);
          if (!remove) return;
          event.preventDefault();
          remove.click();
          requestAnimationFrame(() => {
            const remaining = getChips();
            _optionalChain([remaining, 'access', _157 => _157[Math.min(index, remaining.length - 1)], 'optionalAccess', _158 => _158.focus, 'call', _159 => _159()]);
          });
        },
        children
      }
    )
  );
});
ChipGroup.displayName = "ChipGroup";

// ../../src/components/m3/Tabs.tsx

var _tabs = require('@base-ui/react/tabs');



function spring2(transition) {
  return { ...transition, type: "spring" };
}
var Tabs = React35.forwardRef(function Tabs2({
  items,
  value,
  onChange,
  variant = "primary",
  fullWidth = false,
  className
}, ref) {
  const uid = React35.useId();
  const indicatorId = `m3-tab-indicator-${uid}`;
  const pillId = `m3-tab-pill-${uid}`;
  const isPrimary = variant === "primary";
  const isTonal = variant === "tonal";
  const primaryHasIcons = isPrimary && items.some((item) => item.icon);
  const scrollerRef = React35.useRef(null);
  const direction = useTextDirection(scrollerRef);
  const [canScrollStart, setCanScrollStart] = React35.useState(false);
  const [canScrollEnd, setCanScrollEnd] = React35.useState(false);
  const updateOverflow = React35.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const inlineOffset = direction === "rtl" ? -el.scrollLeft : el.scrollLeft;
    const maxOffset = el.scrollWidth - el.clientWidth;
    setCanScrollStart(inlineOffset > 4);
    setCanScrollEnd(inlineOffset < maxOffset - 4);
  }, [direction]);
  React35.useEffect(() => {
    updateOverflow();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateOverflow, { passive: true });
    const ro = new ResizeObserver(updateOverflow);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateOverflow);
      ro.disconnect();
    };
  }, [updateOverflow, items.length]);
  const scrollTabs = (towardEnd) => {
    const el = scrollerRef.current;
    if (!el) return;
    const inlineDelta = (towardEnd ? 1 : -1) * Math.max(el.clientWidth * 0.75, 120);
    el.scrollBy({ left: direction === "rtl" ? -inlineDelta : inlineDelta, behavior: "smooth" });
  };
  const labelRefs = React35.useRef(/* @__PURE__ */ new Map());
  const [labelWidths, setLabelWidths] = React35.useState({});
  const measureLabels = React35.useCallback(() => {
    const next = {};
    labelRefs.current.forEach((el, v) => {
      next[v] = el.getBoundingClientRect().width;
    });
    setLabelWidths((prev) => {
      const keys = Object.keys(next);
      const unchanged = keys.length === Object.keys(prev).length && keys.every((k) => prev[k] === next[k]);
      return unchanged ? prev : next;
    });
  }, []);
  React35.useLayoutEffect(() => {
    measureLabels();
    const ro = new ResizeObserver(measureLabels);
    labelRefs.current.forEach((el) => {
      ro.observe(el);
    });
    let cancelled = false;
    void _optionalChain([document, 'access', _160 => _160.fonts, 'optionalAccess', _161 => _161.ready, 'access', _162 => _162.then, 'call', _163 => _163(() => {
      if (!cancelled) measureLabels();
    })]);
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [measureLabels, items]);
  const tablist = (
    // BaseTabs.List renders the tablist <div> (role="tablist") and doubles as
    // the horizontal scroller.
    // activateOnFocus = automatic activation: arrows move focus AND select.
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _tabs.Tabs.List,
      {
        ref: scrollerRef,
        activateOnFocus: true,
        className: cn(
          "m3-scroll flex flex-1 items-stretch overflow-x-auto",
          isPrimary ? cn(primaryHasIcons ? "h-16" : "h-12", "border-b border-m3-outline-variant") : "h-12",
          variant === "secondary" && "border-b border-m3-surface-variant bg-m3-surface"
        ),
        children: items.map((item) => {
          const active = item.value === value;
          const measuredWidth = Math.max(24, _nullishCoalesce(labelWidths[item.value], () => ( 0))) + 4;
          const textColor = active ? isPrimary ? "text-m3-primary" : isTonal ? "text-m3-on-secondary-container" : "text-m3-on-surface" : "text-m3-on-surface-variant";
          return (
            // BaseTabs.Tab owns role="tab", aria-selected and the roving
            // tabindex — no manual onKeyDown/aria wiring needed anymore.
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
              _tabs.Tabs.Tab,
              {
                value: item.value,
                className: cn(
                  "m3-state m3-focus relative flex shrink-0 items-center justify-center",
                  isPrimary && primaryHasIcons ? "flex-col gap-1 pb-2 pt-3" : "gap-2 px-4",
                  "min-w-[96px]",
                  fullWidth && "flex-1",
                  textColor
                ),
                children: [
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
                  active && isPrimary && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                    _framermotion.motion.div,
                    {
                      layoutId: indicatorId,
                      transition: spring2(springs.expressive),
                      className: cn(
                        "absolute bottom-0 h-[3px] rounded-[3px] bg-m3-primary"
                      ),
                      style: {
                        width: measuredWidth,
                        insetInlineStart: `calc(50% - ${measuredWidth / 2}px)`
                      }
                    }
                  ),
                  active && variant === "secondary" && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                    _framermotion.motion.div,
                    {
                      layoutId: indicatorId,
                      transition: spring2(springs.expressive),
                      className: "absolute inset-x-0 bottom-0 h-0.5 bg-m3-primary"
                    }
                  ),
                  active && isTonal && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                    _framermotion.motion.div,
                    {
                      layoutId: pillId,
                      transition: spring2(springs.expressive),
                      className: "absolute inset-x-1 inset-y-2 rounded-full bg-m3-secondary-container"
                    }
                  ),
                  item.icon && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: "relative", children: [
                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: item.icon, size: 24, fill: active }),
                    item.badge !== void 0 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "absolute -end-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-m3-error px-1 text-[10px] font-semibold leading-none text-m3-on-error", children: item.badge })
                  ] }),
                  !item.icon && item.badge !== void 0 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "absolute end-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-m3-error px-1 text-[10px] font-semibold leading-none text-m3-on-error", children: item.badge }),
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                    "span",
                    {
                      ref: (el) => {
                        if (el) labelRefs.current.set(item.value, el);
                        else labelRefs.current.delete(item.value);
                      },
                      className: "relative md-label-large",
                      children: item.label
                    }
                  )
                ]
              },
              item.value
            )
          );
        })
      }
    )
  );
  return (
    // BaseTabs.Root renders the outer wrapper <div> and owns the controlled
    // value + change events; the scroll arrows are plain siblings (not tabs).
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _directionprovider.DirectionProvider, { direction, children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
      _tabs.Tabs.Root,
      {
        ref,
        value,
        onValueChange: (v) => onChange(v),
        className: cn(
          "flex items-stretch",
          fullWidth ? "w-full" : "w-fit max-w-full",
          className
        ),
        children: [
          canScrollStart && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
            "button",
            {
              type: "button",
              "aria-label": "Scroll tabs backward",
              onClick: () => scrollTabs(false),
              className: "m3-state m3-focus relative flex h-12 w-12 shrink-0 items-center justify-center self-center text-m3-on-surface-variant",
              children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: direction === "rtl" ? "chevron_right" : "chevron_left", size: 24 })
              ]
            }
          ),
          tablist,
          canScrollEnd && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
            "button",
            {
              type: "button",
              "aria-label": "Scroll tabs forward",
              onClick: () => scrollTabs(true),
              className: "m3-state m3-focus relative flex h-12 w-12 shrink-0 items-center justify-center self-center text-m3-on-surface-variant",
              children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: direction === "rtl" ? "chevron_left" : "chevron_right", size: 24 })
              ]
            }
          )
        ]
      }
    ) })
  );
});
Tabs.displayName = "Tabs";

// ../../src/components/m3/NavigationBar.tsx



function spring3(transition) {
  return { ...transition, type: "spring" };
}
var NavigationBar = React36.forwardRef(function NavigationBar2({
  items,
  value,
  onChange,
  fullWidth = true,
  variant = "short",
  iconPosition = "top",
  arrangement = "equal",
  className
}, ref) {
  const uid = React36.useId();
  const pillId = `m3-nav-pill-${uid}`;
  const isShort = variant === "short";
  const isHorizontal = isShort && iconPosition === "start";
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    "nav",
    {
      ref,
      "aria-label": "Primary",
      className: cn(
        "flex items-stretch",
        isShort ? "bg-m3-surface-container" : "bg-m3-surface m3-elevation-2",
        isShort ? "h-16 px-2" : "h-20 px-2",
        fullWidth ? "w-full" : "w-fit",
        isShort && arrangement === "centered" && "justify-center gap-2",
        className
      ),
      children: items.map((item) => {
        const active = item.value === value;
        return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
          "button",
          {
            type: "button",
            "aria-current": active ? "page" : void 0,
            onClick: () => onChange(item.value),
            className: cn(
              "m3-state m3-focus relative flex items-center justify-center",
              isHorizontal ? "h-16 min-w-24 px-2" : "flex-1 flex-col gap-1",
              !isShort && "pt-2",
              isShort && arrangement === "centered" && "flex-none"
            ),
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
              /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
                "span",
                {
                  className: cn(
                    "relative flex items-center justify-center rounded-full",
                    isHorizontal ? "h-10 gap-2 px-4" : "h-8 w-14"
                  ),
                  children: [
                    active && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                      _framermotion.motion.div,
                      {
                        layoutId: pillId,
                        transition: spring3(springs.expressive),
                        className: "absolute inset-0 rounded-full bg-m3-secondary-container"
                      }
                    ),
                    item.icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                      MaterialSymbol,
                      {
                        icon: item.icon,
                        size: 24,
                        fill: active,
                        className: cn("relative", active ? "text-m3-on-secondary-container" : "text-m3-on-surface-variant")
                      }
                    ),
                    item.badge !== void 0 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "absolute -right-1.5 -top-1 z-10 flex h-4 min-w-4 items-center justify-center rounded-full bg-m3-error px-1 text-[10px] font-semibold leading-none text-m3-on-error", children: item.badge }),
                    isHorizontal && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: cn("relative md-label-medium", active ? "text-m3-on-secondary-container" : "text-m3-on-surface-variant"), children: item.label })
                  ]
                }
              ),
              !isHorizontal && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: cn("md-label-medium", active ? isShort ? "text-m3-secondary" : "text-m3-on-surface" : "text-m3-on-surface-variant"), children: item.label })
            ]
          },
          item.value
        );
      })
    }
  );
});
NavigationBar.displayName = "NavigationBar";

// ../../src/components/m3/NavigationDrawer.tsx




function spring4(transition) {
  return { ...transition, type: "spring" };
}
var NavigationDrawer = React37.forwardRef(function NavigationDrawer2({
  items,
  value,
  onChange,
  variant = "modal",
  open,
  onClose,
  header,
  footer,
  fullHeight = false,
  className
}, ref) {
  const uid = React37.useId();
  const pillId = `m3-drawer-pill-${uid}`;
  const directionAnchorRef = React37.useRef(null);
  const direction = useTextDirection(directionAnchorRef);
  const isControlled = open !== void 0;
  const [uncontrolledOpen, setUncontrolledOpen] = React37.useState(false);
  const showModal = variant === "modal" && (open !== void 0 ? open : uncontrolledOpen);
  const dialogActionsRef = React37.useRef(null);
  const handleOpenChange = React37.useCallback(
    (nextOpen, eventDetails) => {
      if (!nextOpen) {
        eventDetails.preventUnmountOnClose();
        if (!isControlled) setUncontrolledOpen(false);
        _optionalChain([onClose, 'optionalCall', _164 => _164()]);
      } else if (!isControlled) {
        setUncontrolledOpen(true);
      }
    },
    [isControlled, onClose]
  );
  const handleClose = React37.useCallback(() => {
    _optionalChain([dialogActionsRef, 'access', _165 => _165.current, 'optionalAccess', _166 => _166.close, 'call', _167 => _167()]);
  }, []);
  const body = /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    header && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "px-4 pb-2 pt-4", children: header }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "ul", { className: "flex flex-col gap-0", children: items.map((item) => {
      const active = item.value === value;
      return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "li", { children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
        "button",
        {
          type: "button",
          "aria-current": active ? "page" : void 0,
          onClick: () => {
            onChange(item.value);
            if (variant === "modal") handleClose();
          },
          className: "m3-state m3-focus relative flex h-14 w-full items-center rounded-full pe-6 ps-4",
          children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
            active && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              _framermotion.motion.div,
              {
                layoutId: pillId,
                transition: spring4(springs.expressive),
                className: "absolute inset-0 rounded-full bg-m3-secondary-container"
              }
            ),
            item.icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              MaterialSymbol,
              {
                icon: item.icon,
                size: 24,
                fill: active,
                className: cn("relative", active ? "text-m3-on-secondary-container" : "text-m3-on-surface-variant")
              }
            ),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              "span",
              {
                className: cn(
                  "md-label-large relative min-w-0 flex-1",
                  item.icon && "ms-3",
                  active ? "text-m3-on-secondary-container" : "text-m3-on-surface-variant"
                ),
                children: item.label
              }
            ),
            item.badge !== void 0 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              "span",
              {
                className: cn(
                  "md-label-large relative ms-3 shrink-0",
                  active ? "text-m3-on-secondary-container" : "text-m3-on-surface-variant"
                ),
                children: item.badge
              }
            )
          ]
        }
      ) }, item.value);
    }) }),
    footer && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "mt-auto p-2", children: footer })
  ] });
  if (variant === "standard") {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { ref: directionAnchorRef, className: "contents", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      "nav",
      {
        ref,
        "aria-label": "Navigation drawer",
        dir: direction,
        className: cn(
          "m3-scroll flex w-[360px] min-w-[240px] max-w-full shrink-0 flex-col overflow-y-auto bg-m3-surface p-3",
          fullHeight && "h-full",
          className
        ),
        children: body
      }
    ) });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { ref: directionAnchorRef, className: "contents", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _dialog.Dialog.Root, { open: showModal, onOpenChange: handleOpenChange, actionsRef: dialogActionsRef, children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _dialog.Dialog.Portal, { children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _dialog.Dialog.Backdrop,
      {
        render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          _framermotion.motion.div,
          {
            className: "fixed inset-0 z-[75] bg-m3-scrim/32",
            initial: { opacity: 0 },
            animate: { opacity: showModal ? 1 : 0 },
            transition: spring4(springs.defaultVisual)
          }
        )
      }
    ),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _dialog.Dialog.Popup,
      {
        render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          _framermotion.motion.nav,
          {
            ref,
            "aria-label": "Navigation drawer",
            dir: direction,
            className: "m3-scroll m3-elevation-1 fixed inset-y-0 start-0 z-[75] flex w-[360px] min-w-[240px] max-w-full flex-col overflow-y-auto rounded-e-2xl bg-m3-surface-container-low p-3 focus:outline-none",
            initial: { x: direction === "rtl" ? "100%" : "-100%" },
            animate: { x: showModal ? 0 : direction === "rtl" ? "100%" : "-100%" },
            transition: spring4(springs.defaultSpatial),
            onAnimationComplete: () => {
              if (!showModal) _optionalChain([dialogActionsRef, 'access', _168 => _168.current, 'optionalAccess', _169 => _169.unmount, 'call', _170 => _170()]);
            }
          }
        ),
        children: body
      }
    )
  ] }) }) });
});
NavigationDrawer.displayName = "NavigationDrawer";

// ../../src/components/m3/NavigationRail.tsx




function spring5(transition) {
  return { ...transition, type: "spring" };
}
var NavigationRail = React38.forwardRef(function NavigationRail2({
  items,
  value,
  onChange,
  header,
  menuIcon = "menu",
  onMenuClick,
  variant = "wide",
  expanded = false,
  expandedWidth = 360,
  expandedMode = "standard",
  foldingLine = false,
  className
}, ref) {
  const uid = React38.useId();
  const pillId = `m3-rail-pill-${uid}`;
  const rootRef = React38.useRef(null);
  const modalTriggerRef = React38.useRef(null);
  const restoreModalFocusRef = React38.useRef(false);
  const direction = useTextDirection(rootRef);
  const isWide = variant === "wide";
  const isExpanded = isWide && expanded;
  const isModalExpanded = isExpanded && expandedMode === "modal";
  const railWidth = Math.min(360, Math.max(220, expandedWidth));
  React38.useEffect(() => {
    if (!isModalExpanded && restoreModalFocusRef.current) {
      const frame = requestAnimationFrame(() => {
        _optionalChain([modalTriggerRef, 'access', _171 => _171.current, 'optionalAccess', _172 => _172.focus, 'call', _173 => _173()]);
        restoreModalFocusRef.current = false;
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [isModalExpanded]);
  const requestMenuChange = React38.useCallback(() => {
    if (expandedMode === "modal") restoreModalFocusRef.current = true;
    _optionalChain([onMenuClick, 'optionalCall', _174 => _174()]);
  }, [expandedMode, onMenuClick]);
  const panelContent = /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    (onMenuClick && (expandedMode !== "modal" || isModalExpanded) || header) && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: cn("mb-10 flex flex-col gap-2", isExpanded ? "items-stretch" : "items-center"), children: [
      onMenuClick && (expandedMode !== "modal" || isModalExpanded) && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
        "button",
        {
          type: "button",
          "aria-label": "Menu",
          "aria-expanded": isExpanded,
          title: "Menu",
          onClick: requestMenuChange,
          className: cn(
            "m3-state m3-focus relative flex h-12 items-center rounded-full text-m3-on-surface-variant",
            isExpanded ? "w-full gap-3 px-4" : "w-12 justify-center"
          ),
          children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: menuIcon, size: 24 }),
            isExpanded && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-label-large", children: "Menu" })
          ]
        }
      ),
      header && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: cn("flex", isExpanded ? "justify-start" : "justify-center"), children: header })
    ] }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "ul", { className: cn(
      "flex flex-col",
      isExpanded ? "items-stretch gap-0" : isWide ? "items-center gap-1" : "items-center gap-3"
    ), children: items.map((item) => {
      const active = item.value === value;
      return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "li", { children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
        "button",
        {
          type: "button",
          "aria-current": active ? "page" : void 0,
          onClick: () => onChange(item.value),
          className: cn(
            "m3-state m3-focus relative flex items-center",
            isExpanded ? "h-14 w-full gap-2 rounded-full px-4" : cn(isWide ? "h-16 w-24" : "w-20", "flex-col gap-1 pb-2 pt-1")
          ),
          children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
              "span",
              {
                className: cn(
                  "relative flex items-center justify-center rounded-full",
                  isExpanded ? "h-14 w-full justify-start gap-2" : "h-8 w-14"
                ),
                children: [
                  active && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                    _framermotion.motion.div,
                    {
                      layoutId: pillId,
                      transition: spring5(springs.expressive),
                      className: cn(
                        "absolute rounded-full bg-m3-secondary-container",
                        isExpanded ? "inset-0" : "inset-0"
                      )
                    }
                  ),
                  item.icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                    MaterialSymbol,
                    {
                      icon: item.icon,
                      size: 24,
                      fill: active,
                      className: cn("relative", active ? "text-m3-on-secondary-container" : "text-m3-on-surface-variant")
                    }
                  ),
                  isExpanded && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: cn("relative md-label-large", active ? "text-m3-on-secondary-container" : "text-m3-on-surface-variant"), children: item.label }),
                  item.badge !== void 0 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: cn(
                    "z-10 flex h-4 min-w-4 items-center justify-center rounded-full bg-m3-error px-1 text-[10px] font-semibold leading-none text-m3-on-error",
                    isExpanded ? "relative ms-auto" : "absolute -end-1.5 -top-1"
                  ), children: item.badge })
                ]
              }
            ),
            !isExpanded && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: cn("md-label-medium", active ? "text-m3-secondary" : "text-m3-on-surface-variant"), children: item.label })
          ]
        }
      ) }, item.value);
    }) })
  ] });
  const inlinePanel = /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    _framermotion.motion.div,
    {
      initial: false,
      animate: isExpanded ? { x: 0 } : void 0,
      transition: spring5(springs.fastSpatial),
      style: isExpanded ? { width: railWidth } : void 0,
      className: cn(
        isExpanded ? "flex h-full flex-col items-stretch gap-1 bg-m3-surface px-4" : "contents"
      ),
      children: panelContent
    }
  );
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    "nav",
    {
      ref: (node) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      "aria-label": "Primary",
      style: isExpanded && !isModalExpanded ? { width: railWidth } : void 0,
      className: cn(
        "relative flex min-h-full shrink-0 flex-col gap-3 bg-m3-surface",
        isWide ? "py-11" : "py-3",
        isExpanded && !isModalExpanded ? "items-stretch" : "items-center",
        isWide && (!isExpanded || isModalExpanded) ? "w-24" : !isWide ? "w-20" : void 0,
        foldingLine && "border-e border-m3-outline-variant",
        className
      ),
      children: expandedMode === "modal" ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
        onMenuClick && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
          "button",
          {
            ref: modalTriggerRef,
            type: "button",
            "aria-label": "Menu",
            "aria-expanded": isModalExpanded,
            title: "Menu",
            onClick: requestMenuChange,
            className: "m3-state m3-focus relative mb-10 flex h-12 w-12 items-center justify-center rounded-full text-m3-on-surface-variant",
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: menuIcon, size: 24 })
            ]
          }
        ),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          _dialog.Dialog.Root,
          {
            open: isModalExpanded,
            onOpenChange: (nextOpen) => {
              if (!nextOpen) requestMenuChange();
            },
            modal: true,
            children: isModalExpanded && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _dialog.Dialog.Portal, { children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _dialog.Dialog.Backdrop, { className: "fixed inset-0 z-[74] bg-m3-scrim/32" }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                _dialog.Dialog.Popup,
                {
                  role: "dialog",
                  "aria-modal": "true",
                  "aria-label": "Expanded navigation rail",
                  dir: direction,
                  render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                    _framermotion.motion.div,
                    {
                      initial: { x: direction === "rtl" ? "100%" : "-100%" },
                      animate: { x: 0 },
                      transition: spring5(springs.fastSpatial)
                    }
                  ),
                  className: "fixed inset-y-0 start-0 z-[75] flex flex-col items-stretch gap-1 rounded-e-2xl bg-m3-surface-container-low px-4 pb-4 pt-11 m3-elevation-3 outline-none",
                  style: { width: railWidth },
                  children: panelContent
                }
              )
            ] })
          }
        ),
        !isModalExpanded && inlinePanel
      ] }) : inlinePanel
    }
  );
});
NavigationRail.displayName = "NavigationRail";

// ../../src/components/m3/TopAppBar.tsx

var _toolbar = require('@base-ui/react/toolbar');


function spring6(transition) {
  return { ...transition, type: "spring" };
}
var heights = {
  small: 64,
  center: 64,
  medium: 112,
  large: 152,
  "medium-flexible": 112,
  "large-flexible": 120
};
function AppBarIconButton({
  icon,
  label,
  onClick,
  toolbar = false,
  variant = "standard"
}) {
  const classes = cn(
    "m3-state m3-focus relative flex h-12 w-12 items-center justify-center rounded-full",
    variant === "filled" ? "bg-m3-secondary-container text-m3-on-secondary-container" : "text-m3-on-surface-variant"
  );
  const content = /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon, size: 24 })
  ] });
  if (toolbar) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _toolbar.Toolbar.Button, { "aria-label": _nullishCoalesce(label, () => ( icon)), title: label, onClick, className: classes, children: content });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "button", { type: "button", "aria-label": _nullishCoalesce(label, () => ( icon)), title: label, onClick, className: classes, children: content });
}
var EMPTY_ACTIONS = [];
var TopAppBar = React39.forwardRef(function TopAppBar2({
  title,
  subtitle,
  variant = "small",
  actions = EMPTY_ACTIONS,
  search: search2,
  image,
  logo,
  onBack,
  scrollBehavior = "none",
  scrollTargetRef,
  expandedHeight,
  titleAlignment = "start",
  fullWidth = true,
  className
}, ref) {
  const [scrolled, setScrolled] = React39.useState(false);
  const [collapsed, setCollapsed] = React39.useState(false);
  const [hidden, setHidden] = React39.useState(false);
  const [internalSearchOpen, setInternalSearchOpen] = React39.useState(_nullishCoalesce(_optionalChain([search2, 'optionalAccess', _175 => _175.defaultOpen]), () => ( false)));
  const [internalSearchValue, setInternalSearchValue] = React39.useState(_nullishCoalesce(_optionalChain([search2, 'optionalAccess', _176 => _176.defaultValue]), () => ( "")));
  const isTwoRow = variant === "medium" || variant === "large" || variant.endsWith("-flexible");
  const isExpressive = variant.endsWith("-flexible");
  const officialHeight = isExpressive && subtitle ? variant === "medium-flexible" ? 136 : 152 : heights[variant];
  const resolvedHeight = Math.max(64, _nullishCoalesce(expandedHeight, () => ( officialHeight)));
  const threshold = isTwoRow ? resolvedHeight - 64 : 4;
  const leadingVisual = _nullishCoalesce(logo, () => ( image));
  const searchOpen = search2 ? _nullishCoalesce(search2.open, () => ( internalSearchOpen)) : false;
  const searchValue = search2 ? _nullishCoalesce(search2.value, () => ( internalSearchValue)) : "";
  const setSearchOpen = React39.useCallback((nextOpen) => {
    if (_optionalChain([search2, 'optionalAccess', _177 => _177.open]) === void 0) setInternalSearchOpen(nextOpen);
    _optionalChain([search2, 'optionalAccess', _178 => _178.onOpenChange, 'optionalCall', _179 => _179(nextOpen)]);
  }, [search2]);
  const setSearchValue = React39.useCallback((nextValue) => {
    if (_optionalChain([search2, 'optionalAccess', _180 => _180.value]) === void 0) setInternalSearchValue(nextValue);
    _optionalChain([search2, 'optionalAccess', _181 => _181.onChange, 'optionalCall', _182 => _182(nextValue)]);
  }, [search2]);
  React39.useEffect(() => {
    if (scrollBehavior === "none") {
      setScrolled(false);
      setCollapsed(false);
      setHidden(false);
      return;
    }
    const el = _nullishCoalesce(_optionalChain([scrollTargetRef, 'optionalAccess', _183 => _183.current]), () => ( null));
    const readTop = () => el ? el.scrollTop : window.scrollY;
    let previousTop = readTop();
    const onScroll = () => {
      const top = readTop();
      const delta = top - previousTop;
      previousTop = top;
      setScrolled(top > 0);
      if (scrollBehavior === "pinned") {
        setCollapsed(false);
        setHidden(false);
      } else if (scrollBehavior === "exit-until-collapsed") {
        setCollapsed(isTwoRow && top > threshold);
        setHidden(false);
      } else {
        setCollapsed(false);
        if (top <= 0 || delta < 0) setHidden(false);
        else if (delta > 0) setHidden(true);
      }
    };
    onScroll();
    const target = _nullishCoalesce(el, () => ( window));
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, [isTwoRow, scrollBehavior, scrollTargetRef, threshold]);
  const barState = scrolled ? "bg-m3-surface-container" : "bg-m3-surface";
  const actionsRow = actions.length > 0 || search2 ? (
    // Base UI Toolbar: roving tabindex + arrow keys across the action buttons.
    // Renders the same <div> as before, plus role="toolbar"/aria-orientation.
    // (Empty `actions` keeps the original plain spacer div — no empty toolbar.)
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _toolbar.Toolbar.Root, { className: "ml-auto flex items-center gap-1", children: [
      search2 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
        AppBarIconButton,
        {
          toolbar: true,
          icon: "search",
          label: _nullishCoalesce(search2.ariaLabel, () => ( "Search")),
          onClick: () => setSearchOpen(true)
        }
      ),
      actions.map((action, i) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, AppBarIconButton, { toolbar: true, icon: action.icon, label: action.label, onClick: action.onClick, variant: action.variant }, `${action.icon}-${i}`))
    ] })
  ) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "ml-auto flex items-center gap-1" });
  const titleContent = /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: cn("min-w-0 px-2", subtitle ? "flex flex-col" : "md-title-large"), children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-title-large truncate", children: title }),
    subtitle && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-label-medium truncate text-m3-on-surface-variant", children: subtitle })
  ] });
  const searchView = search2 ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    SearchView,
    {
      open: searchOpen,
      onOpenChange: setSearchOpen,
      mode: search2.mode,
      placeholder: _nullishCoalesce(_nullishCoalesce(search2.placeholder, () => ( search2.ariaLabel)), () => ( "Search")),
      value: searchValue,
      onValueChange: setSearchValue,
      recentSearches: search2.recentSearches,
      onRecentSelect: (value) => {
        setSearchValue(value);
        _optionalChain([search2, 'access', _184 => _184.onRecentSelect, 'optionalCall', _185 => _185(value)]);
        _optionalChain([search2, 'access', _186 => _186.onSubmit, 'optionalCall', _187 => _187(value)]);
      },
      onRecentRemove: search2.onRecentRemove,
      trailingActions: search2.onSubmit ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
        "button",
        {
          type: "button",
          "aria-label": "Submit search",
          onClick: () => _optionalChain([search2, 'access', _188 => _188.onSubmit, 'optionalCall', _189 => _189(searchValue)]),
          className: "m3-state m3-focus relative grid h-12 w-12 place-items-center rounded-full",
          children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "search", size: 24 })
          ]
        }
      ) : void 0,
      children: search2.children
    }
  ) : null;
  if (!isTwoRow) {
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
        "header",
        {
          ref,
          style: { transitionDuration: `${durations.medium2}ms`, transitionTimingFunction: easings.standard },
          className: cn(
            "sticky top-0 z-40 transition-[background-color,transform]",
            hidden && "-translate-y-full",
            barState,
            fullWidth && "w-full",
            className
          ),
          children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "relative flex h-16 items-center px-1", children: [
            onBack && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, AppBarIconButton, { icon: "arrow_back", label: "Back", onClick: onBack }),
            leadingVisual && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "ml-1 flex h-10 shrink-0 items-center", children: leadingVisual }),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: cn("min-w-0", variant === "center" && "absolute left-1/2 max-w-[60%] -translate-x-1/2 text-center"), children: titleContent }),
            actionsRow
          ] })
        }
      ),
      searchView
    ] });
  }
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
      _framermotion.motion.header,
      {
        ref,
        animate: {
          height: collapsed ? 64 : resolvedHeight,
          backgroundColor: scrolled ? "var(--md-surface-container)" : "var(--md-surface)",
          y: hidden ? "-100%" : 0
        },
        transition: {
          height: spring6(springs.defaultSpatial),
          backgroundColor: { duration: durations.medium2 / 1e3, ease: [0.2, 0, 0, 1] },
          y: spring6(springs.fastSpatial)
        },
        className: cn(
          "sticky top-0 z-40 overflow-hidden",
          fullWidth && "w-full",
          className
        ),
        children: [
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "absolute inset-x-0 top-0 flex h-16 items-center px-1", children: [
            onBack && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, AppBarIconButton, { icon: "arrow_back", label: "Back", onClick: onBack }),
            leadingVisual && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "ml-1 flex h-10 shrink-0 items-center", children: leadingVisual }),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: collapsed && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
              _framermotion.motion.span,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                transition: spring6(springs.fastVisual),
                className: cn(
                  "max-w-[60%] px-2",
                  subtitle ? "flex flex-col" : "md-title-large"
                ),
                children: [
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-title-large truncate", children: title }),
                  subtitle && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-label-medium truncate text-m3-on-surface-variant", children: subtitle })
                ]
              }
            ) }),
            actionsRow
          ] }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: !collapsed && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
            _framermotion.motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: 12 },
              transition: spring6(springs.defaultSpatial),
              className: cn(
                "absolute inset-x-4 bottom-1",
                titleAlignment === "center" && "text-center"
              ),
              children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  "span",
                  {
                    className: cn(
                      "block whitespace-normal break-words",
                      variant === "medium" && "md-headline-small",
                      variant === "large" && "md-headline-medium",
                      variant === "medium-flexible" && "md-headline-medium",
                      variant === "large-flexible" && "md-display-small"
                    ),
                    children: title
                  }
                ),
                subtitle && isExpressive && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: cn(
                  "block whitespace-normal break-words text-m3-on-surface-variant",
                  variant === "large-flexible" ? "md-title-medium" : "md-label-large"
                ), children: subtitle })
              ]
            },
            "hero-title"
          ) })
        ]
      }
    ),
    searchView
  ] });
});
TopAppBar.displayName = "TopAppBar";

// ../../src/components/m3/BottomAppBar.tsx




function spring7(transition) {
  return { ...transition, type: "spring" };
}
var EMPTY_ACTIONS2 = [];
var EMPTY_TRAILING_ACTIONS = [];
var BottomAppBar = React40.forwardRef(function BottomAppBar2({
  navigationIcon,
  actions = EMPTY_ACTIONS2,
  trailingActions = EMPTY_TRAILING_ACTIONS,
  fab,
  variant = "flexible",
  arrangement = "between",
  expandedHeight,
  scrollBehavior = "none",
  scrollTargetRef,
  fabPosition = "end",
  fullWidth = true,
  className
}, ref) {
  const [fabPressed, setFabPressed] = React40.useState(false);
  const [hidden, setHidden] = React40.useState(false);
  const height = variant === "flexible" ? Number.isFinite(expandedHeight) && (_nullishCoalesce(expandedHeight, () => ( 0))) > 0 ? expandedHeight : 64 : 80;
  const resolvedArrangement = variant === "standard" ? "start" : arrangement;
  React40.useEffect(() => {
    if (scrollBehavior === "none") {
      setHidden(false);
      return;
    }
    const target = _nullishCoalesce(_optionalChain([scrollTargetRef, 'optionalAccess', _190 => _190.current]), () => ( window));
    const readTop = () => target instanceof Window ? window.scrollY : target.scrollTop;
    let previousTop = readTop();
    const onScroll = () => {
      const top = readTop();
      const delta = top - previousTop;
      previousTop = top;
      setHidden(top > 0 && delta > 0);
    };
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, [scrollBehavior, scrollTargetRef]);
  const fabButton = fab ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
    _framermotion.motion.button,
    {
      type: "button",
      "aria-label": fab.icon,
      onClick: fab.onClick,
      onPointerDown: () => setFabPressed(true),
      onPointerUp: () => setFabPressed(false),
      onPointerLeave: () => setFabPressed(false),
      animate: { borderRadius: fabPressed ? 28 : 16, scale: fabPressed ? 0.95 : 1 },
      transition: spring7(springs.expressiveEffects),
      className: "m3-state m3-focus m3-elevation-3 relative flex h-14 w-14 items-center justify-center bg-m3-primary-container",
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: fab.icon, size: 24, fill: true, className: "text-m3-on-primary-container" })
      ]
    }
  ) : null;
  return (
    // Base UI Toolbar: the bar <div> gains role="toolbar" and the icon
    // buttons below become Toolbar.Buttons (roving tabindex + arrow keys).
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
      _toolbar.Toolbar.Root,
      {
        ref,
        style: {
          height,
          transform: hidden ? "translateY(100%)" : void 0,
          transitionDuration: `${durations.medium2}ms`,
          transitionTimingFunction: easings.standard
        },
        className: cn(
          "relative flex items-center bg-m3-surface-container px-4 transition-transform",
          resolvedArrangement === "start" && "justify-start",
          resolvedArrangement === "between" && "justify-between",
          resolvedArrangement === "around" && "justify-around",
          resolvedArrangement === "evenly" && "justify-evenly",
          resolvedArrangement === "fixed" && "justify-center gap-8",
          fullWidth && "w-full",
          className
        ),
        children: [
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-center gap-1", children: [
            navigationIcon && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
              _toolbar.Toolbar.Button,
              {
                "aria-label": _nullishCoalesce(navigationIcon.label, () => ( navigationIcon.icon)),
                title: navigationIcon.label,
                onClick: navigationIcon.onClick,
                className: "m3-state m3-focus relative flex h-12 w-12 items-center justify-center rounded-full text-m3-on-surface-variant",
                children: [
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: navigationIcon.icon, size: 24 })
                ]
              }
            ),
            actions.map((action, i) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
              _toolbar.Toolbar.Button,
              {
                "aria-label": _nullishCoalesce(action.label, () => ( action.icon)),
                title: action.label,
                onClick: action.onClick,
                className: "m3-state m3-focus relative flex h-12 w-12 items-center justify-center rounded-full text-m3-on-surface-variant",
                children: [
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: action.icon, size: 24 })
                ]
              },
              `${action.icon}-${i}`
            ))
          ] }),
          fabButton && fabPosition === "center" && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "absolute -top-7 left-1/2 z-10 -translate-x-1/2", children: fabButton }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "flex items-center gap-1", children: trailingActions.map((action, i) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
            _toolbar.Toolbar.Button,
            {
              "aria-label": action.label,
              title: action.label,
              onClick: action.onClick,
              className: "m3-state m3-focus relative flex h-12 w-12 items-center justify-center rounded-full text-m3-on-surface-variant",
              children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: action.icon, size: 24 })
              ]
            },
            `${action.icon}-${i}`
          )) }),
          fabButton && fabPosition === "end" && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: cn("shrink-0", variant === "standard" ? "ms-auto" : "ms-2"), children: fabButton })
        ]
      }
    )
  );
});
BottomAppBar.displayName = "BottomAppBar";

// ../../src/components/m3/Toolbar.tsx




function spring8(transition) {
  return { ...transition, type: "spring" };
}
var standardColors = {
  container: "bg-m3-surface-container",
  icon: "text-m3-on-surface",
  activeBg: "bg-m3-secondary-container",
  activeIcon: "text-m3-on-secondary-container"
};
var vibrantColors = {
  container: "bg-m3-primary-container",
  icon: "text-m3-on-primary-container",
  activeBg: "bg-m3-surface-container",
  activeIcon: "text-m3-on-surface"
};
var colorStyles2 = {
  standard: standardColors,
  vibrant: vibrantColors,
  surface: standardColors,
  primary: vibrantColors,
  secondary: { container: "bg-m3-secondary-container", icon: "text-m3-on-secondary-container", activeBg: "bg-m3-on-secondary-container/12", activeIcon: "text-m3-on-secondary-container" },
  tertiary: { container: "bg-m3-tertiary-container", icon: "text-m3-on-tertiary-container", activeBg: "bg-m3-on-tertiary-container/12", activeIcon: "text-m3-on-tertiary-container" }
};
var Toolbar3 = React41.forwardRef(function Toolbar4({
  icons = [],
  children,
  fab,
  variant = "floating",
  color = "standard",
  position = "bottom",
  orientation = "horizontal",
  width = 560,
  fullWidth = false,
  docked = false,
  className
}, ref) {
  const c = colorStyles2[color];
  const isVertical = orientation === "vertical";
  const renderIconButton = (item, i) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
    _toolbar.Toolbar.Button,
    {
      "aria-label": _nullishCoalesce(item.label, () => ( item.icon)),
      title: item.label,
      "aria-pressed": item.active === void 0 ? void 0 : item.active,
      onClick: item.onClick,
      className: cn(
        "m3-state m3-focus relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
        item.active ? c.activeIcon : c.icon,
        item.active && c.activeBg
      ),
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: item.icon, size: 24, fill: item.active })
      ]
    },
    `${item.icon}-${i}`
  );
  const content = /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    icons.map(renderIconButton),
    children,
    fab && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: cn("flex shrink-0", !isVertical && "ml-auto"), children: fab })
  ] });
  if (variant === "dockable") {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { ref, className: cn("w-full", className), children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _toolbar.Toolbar.Root,
      {
        orientation: "horizontal",
        style: {
          width: !docked && !fullWidth ? width : void 0,
          transitionDuration: `${durations.medium2}ms`,
          transitionTimingFunction: easings.standard
        },
        className: cn(
          "flex h-16 items-center gap-1 transition-all",
          docked ? "w-full rounded-none px-2" : cn("mx-auto rounded-full px-2", fullWidth ? "w-full" : "justify-center"),
          c.container
        ),
        children: content
      }
    ) });
  }
  return (
    // render prop: the toolbar root *is* the animated pill — Base UI clones the
    // motion.div with its toolbar props, framer-motion keeps the entrance spring.
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _toolbar.Toolbar.Root,
      {
        ref,
        orientation,
        render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          _framermotion.motion.div,
          {
            initial: {
              opacity: 0,
              x: isVertical ? position === "right" ? 12 : -12 : fullWidth ? 0 : "-50%",
              y: isVertical ? "-50%" : position === "bottom" ? 12 : -12,
              scale: 0.96
            },
            animate: { opacity: 1, x: isVertical ? 0 : fullWidth ? 0 : "-50%", y: isVertical ? "-50%" : 0, scale: 1 },
            transition: spring8(springs.expressiveEffects),
            style: !isVertical ? {
              width: fullWidth ? "calc(100% - 2rem)" : `min(${width}px, calc(100% - 2rem))`,
              transitionDuration: `${durations.medium2}ms`,
              transitionTimingFunction: easings.standard
            } : {
              transitionDuration: `${durations.medium2}ms`,
              transitionTimingFunction: easings.standard
            },
            className: cn(
              "absolute flex items-center justify-center gap-1 rounded-full",
              isVertical ? "px-2 py-4" : "px-2 py-2",
              isVertical ? "w-16 flex-col" : "h-16 flex-row",
              !isVertical && (position === "bottom" ? "bottom-4" : "top-4"),
              !isVertical && (fullWidth ? "left-4" : "left-1/2"),
              isVertical && (position === "right" ? "right-4" : "left-4"),
              isVertical && "top-1/2",
              c.container,
              className
            )
          }
        ),
        children: content
      }
    )
  );
});
Toolbar3.displayName = "Toolbar";

// ../../src/components/m3/Menu.tsx







function spring9(transition) {
  return { ...transition, type: "spring" };
}
function MenuRowContent({
  item,
  isSegmented,
  color,
  hasSubmenu = false,
  direction
}) {
  const resolvedIcon = item.selected && item.selectedIcon ? item.selectedIcon : item.icon;
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
    resolvedIcon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      MaterialSymbol,
      {
        icon: resolvedIcon,
        size: isSegmented ? 20 : 24,
        fill: item.selected,
        className: cn(
          !item.destructive && !item.selected && "text-m3-on-surface-variant",
          item.selected && color === "standard" && "text-m3-on-tertiary-container",
          item.selected && color === "vibrant" && "text-m3-on-tertiary"
        )
      }
    ),
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "block truncate", children: item.label }),
      item.supportingText && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "block truncate md-body-medium opacity-80", children: item.supportingText })
    ] }),
    item.badge !== void 0 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-label-small ms-auto flex min-h-5 min-w-5 items-center justify-center rounded-full bg-m3-error px-1 text-m3-on-error", children: item.badge }),
    item.trailingIcon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: item.trailingIcon, size: 20 }),
    item.shortcut && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-label-small ms-auto ps-4 text-m3-on-surface-variant", children: item.shortcut }),
    hasSubmenu && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      MaterialSymbol,
      {
        icon: direction === "rtl" ? "chevron_left" : "chevron_right",
        size: 20,
        className: "text-m3-on-surface-variant"
      }
    )
  ] });
}
function MenuItems({
  items,
  isSegmented,
  color,
  direction
}) {
  const interactiveIndexes = items.flatMap((item, index) => (_nullishCoalesce(item.type, () => ( "item"))) === "item" ? [index] : []);
  const firstItem = interactiveIndexes[0];
  const lastItem = interactiveIndexes.at(-1);
  const itemClass = (item, i) => cn(
    "m3-state relative flex w-full cursor-pointer list-none items-center text-start md-body-large outline-none focus-visible:outline-[3px] focus-visible:outline-m3-secondary focus-visible:outline-offset-2",
    isSegmented ? cn(
      "min-h-11 gap-3 px-4 py-2",
      (i === firstItem || (_nullishCoalesce(_optionalChain([items, 'access', _191 => _191[i - 1], 'optionalAccess', _192 => _192.type]), () => ( "item"))) !== "item") && "rounded-t-xl",
      (i === lastItem || (_nullishCoalesce(_optionalChain([items, 'access', _193 => _193[i + 1], 'optionalAccess', _194 => _194.type]), () => ( "item"))) !== "item") && "rounded-b-xl",
      i !== firstItem && (_nullishCoalesce(_optionalChain([items, 'access', _195 => _195[i - 1], 'optionalAccess', _196 => _196.type]), () => ( "item"))) === "item" && "rounded-t-[4px]",
      i !== lastItem && (_nullishCoalesce(_optionalChain([items, 'access', _197 => _197[i + 1], 'optionalAccess', _198 => _198.type]), () => ( "item"))) === "item" && "rounded-b-[4px]",
      i !== lastItem && (_nullishCoalesce(_optionalChain([items, 'access', _199 => _199[i + 1], 'optionalAccess', _200 => _200.type]), () => ( "item"))) === "item" && "mb-0.5",
      color === "standard" ? "bg-m3-surface-container-low" : "bg-m3-tertiary-container",
      item.selected && "rounded-xl",
      item.selected && (color === "standard" ? "bg-m3-tertiary-container text-m3-on-tertiary-container" : "bg-m3-tertiary text-m3-on-tertiary")
    ) : "h-12 gap-3 px-3",
    item.disabled ? "pointer-events-none opacity-38" : item.destructive ? "text-m3-error" : "text-m3-on-surface"
  );
  return items.map((item, i) => {
    const type = _nullishCoalesce(item.type, () => ( "item"));
    if (type === "divider") {
      return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { role: "separator", className: "my-2 h-px bg-m3-outline-variant" }, i);
    }
    if (type === "label") {
      return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _menu.Menu.Group, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _menu.Menu.GroupLabel, { className: "md-label-small px-3 pb-1 pt-2 text-m3-on-surface-variant", children: item.label }) }, i);
    }
    if (_optionalChain([item, 'access', _201 => _201.submenu, 'optionalAccess', _202 => _202.length])) {
      return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _menu.Menu.SubmenuRoot, { children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _menu.Menu.SubmenuTrigger, { disabled: item.disabled, className: itemClass(item, i), children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MenuRowContent, { item, isSegmented, color, hasSubmenu: true, direction }) }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _menu.Menu.Portal, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _menu.Menu.Positioner, { side: "inline-end", align: "start", sideOffset: 4, alignOffset: -4, className: "z-[51] outline-none", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          _menu.Menu.Popup,
          {
            dir: direction,
            render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              _framermotion.motion.div,
              {
                initial: { opacity: 0, scale: 0.94, x: direction === "rtl" ? 6 : -6 },
                animate: { opacity: 1, scale: 1, x: 0 },
                transition: spring9(springs.fastSpatial)
              }
            ),
            className: cn(
              "max-w-[280px] bg-m3-surface-container m3-elevation-2 outline-none",
              isSegmented ? "min-w-[180px] rounded-[4px] p-1" : "min-w-[112px] rounded-[4px] py-2"
            ),
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MenuItems, { items: item.submenu, isSegmented, color, direction })
          }
        ) }) })
      ] }, i);
    }
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _menu.Menu.Item,
      {
        disabled: item.disabled,
        role: _nullishCoalesce(item.role, () => ( "menuitem")),
        "aria-checked": item.role && item.role !== "menuitem" ? Boolean(item.selected) : void 0,
        closeOnClick: item.closeOnClick,
        onClick: () => _optionalChain([item, 'access', _203 => _203.onClick, 'optionalCall', _204 => _204()]),
        className: itemClass(item, i),
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MenuRowContent, { item, isSegmented, color, direction })
      },
      i
    );
  });
}
var Menu = React42.forwardRef(function Menu2({
  trigger,
  items,
  open,
  onOpenChange,
  placement = "bottom-start",
  variant = "segmented",
  color = "standard",
  className
}, ref) {
  const isControlled = open !== void 0;
  const [internalOpen, setInternalOpen] = React42.useState(false);
  const isOpen = open !== void 0 ? open : internalOpen;
  const isSegmented = variant === "segmented";
  const directionRootRef = React42.useRef(null);
  const direction = useTextDirection(directionRootRef);
  const actionsRef = React42.useRef({ unmount() {
  }, close() {
  } });
  const setOpen = React42.useCallback(
    (next) => {
      if (!isControlled) setInternalOpen(next);
      _optionalChain([onOpenChange, 'optionalCall', _205 => _205(next)]);
    },
    [isControlled, onOpenChange]
  );
  const handleOpenChange = React42.useCallback(
    (nextOpen, eventDetails) => {
      if (!nextOpen) eventDetails.preventUnmountOnClose();
      setOpen(nextOpen);
    },
    [setOpen]
  );
  const panelMotion = {
    initial: { opacity: 0, scale: 0.9, y: -4 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -4 },
    transition: spring9(springs.fastVisual)
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { ref: directionRootRef, className: "contents", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _directionprovider.DirectionProvider, { direction, children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _menu.Menu.Root, { open: isOpen, onOpenChange: handleOpenChange, actionsRef, children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _menu.Menu.Trigger,
      {
        ref,
        render: React42.isValidElement(trigger) ? trigger : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "button", { type: "button", className: "inline-flex", children: trigger }),
        className: cn(
          "inline-flex focus:outline-none focus-visible:outline-[3px] focus-visible:outline-m3-secondary focus-visible:outline-offset-2",
          className
        )
      }
    ),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { onExitComplete: () => _optionalChain([actionsRef, 'access', _206 => _206.current, 'optionalAccess', _207 => _207.unmount, 'call', _208 => _208()]), children: isOpen && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _menu.Menu.Portal, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _menu.Menu.Positioner,
      {
        side: "bottom",
        align: placement === "bottom-end" ? "end" : "start",
        sideOffset: 4,
        className: "z-50 outline-none",
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          _menu.Menu.Popup,
          {
            dir: direction,
            render: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.motion.div, { ...panelMotion }),
            className: cn(
              "max-w-[280px] bg-m3-surface-container m3-elevation-2 outline-none",
              isSegmented ? "min-w-[180px] rounded-[4px] p-1" : "min-w-[112px] rounded-[4px] py-2"
            ),
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MenuItems, { items, isSegmented, color, direction })
          }
        )
      }
    ) }) })
  ] }) }) });
});
Menu.displayName = "Menu";

// ../../src/components/m3/DatePicker.tsx



var FIRST_YEAR = 1900;
var LAST_YEAR = 2100;
function getLocaleWeekConfig(locale) {
  const resolvedLocale = new Intl.DateTimeFormat(locale).resolvedOptions().locale;
  const localeApi = new Intl.Locale(resolvedLocale);
  const weekInfo = _nullishCoalesce(_optionalChain([localeApi, 'access', _209 => _209.getWeekInfo, 'optionalCall', _210 => _210()]), () => ( localeApi.weekInfo));
  const firstDay = (_nullishCoalesce(_optionalChain([weekInfo, 'optionalAccess', _211 => _211.firstDay]), () => ( 7))) % 7;
  const narrow = new Intl.DateTimeFormat(locale, { weekday: "narrow" });
  const long = new Intl.DateTimeFormat(locale, { weekday: "long" });
  const sunday = new Date(2024, 0, 7);
  const weekdays = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(2024, 0, sunday.getDate() + (firstDay + index) % 7);
    return { initial: narrow.format(day), long: long.format(day) };
  });
  return { firstDay, weekdays };
}
function monthName(month, locale, width = "long") {
  return new Intl.DateTimeFormat(locale, { month: width }).format(new Date(2024, month, 1));
}
function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isoOf(d) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}
function getMonthGrid(cursor, firstDay) {
  const first = startOfMonth(cursor);
  const leadingDays = (first.getDay() - firstDay + 7) % 7;
  const start = new Date(first.getFullYear(), first.getMonth(), 1 - leadingDays);
  const cells = [];
  for (let i = 0; i < 42; i++) {
    cells.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  }
  return cells;
}
function formatHeadline(d, locale) {
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(d);
}
function formatShort(d, locale) {
  return new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }).format(d);
}
function advanceRange(current, d) {
  if (!current.start) return { start: d, end: void 0 };
  if (!current.end) {
    if (startOfDay(d) >= startOfDay(current.start)) return { start: current.start, end: d };
    return { start: d, end: void 0 };
  }
  return { start: d, end: void 0 };
}
var FOCUSABLE2 = 'a[href], button:not([disabled]), textarea, input, select, details, [tabindex]:not([tabindex="-1"])';
function DatePickerInput({
  label = "Date",
  locale,
  value,
  onChange,
  minDate,
  maxDate,
  requestFocus = false
}) {
  const inputRef = React43.useRef(null);
  const format = React43.useMemo(() => {
    const parts = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(new Date(2006, 10, 22));
    const order = parts.filter((part) => part.type === "year" || part.type === "month" || part.type === "day").map((part) => part.type);
    const separators = [];
    let sawDatePart = false;
    let pendingLiteral = "";
    for (const part of parts) {
      if (part.type === "year" || part.type === "month" || part.type === "day") {
        if (sawDatePart) separators.push(pendingLiteral || "/");
        sawDatePart = true;
        pendingLiteral = "";
      } else if (sawDatePart) {
        pendingLiteral += part.value;
      }
    }
    const pattern = order.map((part, index) => {
      const token = part === "year" ? "YYYY" : part === "month" ? "MM" : "DD";
      return `${token}${_nullishCoalesce(separators[index], () => ( ""))}`;
    }).join("");
    return { order, separators, pattern };
  }, [locale]);
  const digitsFor = React43.useCallback(
    (date) => format.order.map(
      (part) => part === "year" ? String(date.getFullYear()).padStart(4, "0") : part === "month" ? String(date.getMonth() + 1).padStart(2, "0") : String(date.getDate()).padStart(2, "0")
    ).join(""),
    [format.order]
  );
  const displayDigits = React43.useCallback(
    (digits) => {
      const lengths = format.order.map((part) => part === "year" ? 4 : 2);
      let cursor = 0;
      return lengths.map((length, index) => {
        const segment = digits.slice(cursor, cursor + length);
        cursor += length;
        const hasFollowingDigits = digits.length > cursor;
        return `${segment}${segment && hasFollowingDigits ? _nullishCoalesce(format.separators[index], () => ( "")) : ""}`;
      }).join("");
    },
    [format]
  );
  const [text, setText] = React43.useState(() => value ? displayDigits(digitsFor(value)) : "");
  const [error, setError] = React43.useState("");
  React43.useEffect(() => {
    setText(value ? displayDigits(digitsFor(value)) : "");
    setError("");
  }, [value, digitsFor, displayDigits]);
  React43.useEffect(() => {
    if (!requestFocus) return;
    const frame = requestAnimationFrame(() => _optionalChain([inputRef, 'access', _212 => _212.current, 'optionalAccess', _213 => _213.focus, 'call', _214 => _214()]));
    return () => cancelAnimationFrame(frame);
  }, [requestFocus]);
  const handleInput = (raw) => {
    const digits = raw.replace(/\D/g, "").slice(0, 8);
    setText(displayDigits(digits));
    if (digits.length < 8) {
      setError("");
      return;
    }
    let cursor = 0;
    const values = {};
    for (const part of format.order) {
      const length = part === "year" ? 4 : 2;
      values[part] = Number(digits.slice(cursor, cursor + length));
      cursor += length;
    }
    const next = new Date(_nullishCoalesce(values.year, () => ( 0)), (_nullishCoalesce(values.month, () => ( 1))) - 1, _nullishCoalesce(values.day, () => ( 1)));
    const valid = next.getFullYear() === values.year && next.getMonth() === (_nullishCoalesce(values.month, () => ( 1))) - 1 && next.getDate() === values.day && next.getFullYear() >= FIRST_YEAR && next.getFullYear() <= LAST_YEAR;
    if (!valid) {
      setError(`Enter a valid date in ${format.pattern} format`);
      return;
    }
    if (minDate && startOfDay(next) < startOfDay(minDate)) {
      setError(`Date must be on or after ${minDate.toLocaleDateString()}`);
      return;
    }
    if (maxDate && startOfDay(next) > startOfDay(maxDate)) {
      setError(`Date must be on or before ${maxDate.toLocaleDateString()}`);
      return;
    }
    setError("");
    _optionalChain([onChange, 'optionalCall', _215 => _215(next)]);
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "px-6 py-4", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    TextField,
    {
      ref: inputRef,
      variant: "outlined",
      label,
      placeholder: format.pattern,
      value: text,
      onChange: (e) => handleInput(e.target.value),
      helperText: error || format.pattern,
      error: error !== "",
      inputMode: "numeric",
      autoComplete: "off",
      fullWidth: true,
      className: "[&_label]:bg-m3-surface-container-high!"
    }
  ) });
}
function DateRangePickerInput({
  range,
  onRangeChange,
  minDate,
  maxDate,
  locale,
  requestFocus = false
}) {
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      DatePickerInput,
      {
        label: "Start date",
        locale,
        value: _optionalChain([range, 'optionalAccess', _216 => _216.start]),
        minDate,
        maxDate,
        requestFocus,
        onChange: (start) => {
          const end = _optionalChain([range, 'optionalAccess', _217 => _217.end]) && startOfDay(range.end) >= startOfDay(start) ? range.end : void 0;
          _optionalChain([onRangeChange, 'optionalCall', _218 => _218({ start, end })]);
        }
      }
    ),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      DatePickerInput,
      {
        label: "End date",
        locale,
        value: _optionalChain([range, 'optionalAccess', _219 => _219.end]),
        minDate: _nullishCoalesce(_optionalChain([range, 'optionalAccess', _220 => _220.start]), () => ( minDate)),
        maxDate,
        onChange: (end) => _optionalChain([onRangeChange, 'optionalCall', _221 => _221({ start: _optionalChain([range, 'optionalAccess', _222 => _222.start]), end })])
      }
    )
  ] });
}
function DatePickerCalendar({
  direction,
  locale,
  value,
  onChange,
  minDate,
  maxDate,
  animatedHeader = false,
  selectionMode = "single",
  range,
  onRangeChange,
  onRequestInput
}) {
  const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
  const [internal, setInternal] = React43.useState(void 0);
  const wasControlled = React43.useRef(value !== void 0);
  if (value !== void 0) wasControlled.current = true;
  const selected = wasControlled.current ? value : internal;
  const [internalRange, setInternalRange] = React43.useState({});
  const rangeOn = selectionMode === "range";
  const rangeWasControlled = React43.useRef(range !== void 0);
  if (range !== void 0) rangeWasControlled.current = true;
  const rangeSel = rangeOn ? rangeWasControlled.current ? range : internalRange : void 0;
  const [hoverDate, setHoverDate] = React43.useState(void 0);
  const previewFrom = rangeOn && _optionalChain([rangeSel, 'optionalAccess', _223 => _223.start]) !== void 0 && _optionalChain([rangeSel, 'optionalAccess', _224 => _224.end]) === void 0 ? rangeSel.start : void 0;
  const [cursor, setCursor] = React43.useState(() => startOfMonth(_nullishCoalesce(_nullishCoalesce(value, () => ( _optionalChain([range, 'optionalAccess', _225 => _225.start]))), () => ( /* @__PURE__ */ new Date()))));
  const [view, setView] = React43.useState("month");
  const [rovingOverride, setRovingOverride] = React43.useState(null);
  const pillId = React43.useId();
  const selectedYearRef = React43.useRef(null);
  const gridRef = React43.useRef(null);
  React43.useEffect(() => {
    if (view === "year") _optionalChain([selectedYearRef, 'access', _226 => _226.current, 'optionalAccess', _227 => _227.scrollIntoView, 'call', _228 => _228({ block: "center" })]);
  }, [view]);
  React43.useEffect(() => {
    setRovingOverride(null);
  }, [cursor]);
  const localeWeek = React43.useMemo(() => getLocaleWeekConfig(locale), [locale]);
  const cells = React43.useMemo(
    () => getMonthGrid(cursor, localeWeek.firstDay),
    [cursor, localeWeek.firstDay]
  );
  const years = React43.useMemo(() => {
    const list = [];
    for (let y = FIRST_YEAR; y <= LAST_YEAR; y++) list.push(y);
    return list;
  }, []);
  const isDisabledDay = React43.useCallback(
    (d) => {
      if (d.getFullYear() < FIRST_YEAR || d.getFullYear() > LAST_YEAR) return true;
      if (minDate && startOfDay(d) < startOfDay(minDate)) return true;
      if (maxDate && startOfDay(d) > startOfDay(maxDate)) return true;
      return false;
    },
    [minDate, maxDate]
  );
  const handleSelect = (d) => {
    if (rangeOn) {
      const next = advanceRange(_nullishCoalesce(rangeSel, () => ( {})), d);
      setInternalRange(next);
      _optionalChain([onRangeChange, 'optionalCall', _229 => _229(next)]);
      return;
    }
    setInternal(d);
    _optionalChain([onChange, 'optionalCall', _230 => _230(d)]);
  };
  const navigate = (dir) => {
    setCursor((current) => {
      const next = view === "year" ? new Date(current.getFullYear() + dir * 12, current.getMonth(), 1) : new Date(current.getFullYear(), current.getMonth() + dir, 1);
      if (next.getFullYear() < FIRST_YEAR) return new Date(FIRST_YEAR, 0, 1);
      if (next.getFullYear() > LAST_YEAR) return new Date(LAST_YEAR, 11, 1);
      return next;
    });
  };
  const today = React43.useMemo(() => /* @__PURE__ */ new Date(), []);
  const anchor = rangeOn ? _optionalChain([rangeSel, 'optionalAccess', _231 => _231.start]) : selected;
  const highlightYear = (_nullishCoalesce(anchor, () => ( cursor))).getFullYear();
  const activeIso = React43.useMemo(() => {
    if (rovingOverride) return rovingOverride;
    const inView = (d) => cells.some((c) => sameDay(c, d));
    const pick = _nullishCoalesce(_nullishCoalesce(_nullishCoalesce(_nullishCoalesce((anchor && inView(anchor) && !isDisabledDay(anchor) ? anchor : void 0), () => ( (inView(today) && !isDisabledDay(today) ? today : void 0))), () => ( cells.find((c) => c.getMonth() === cursor.getMonth() && !isDisabledDay(c)))), () => ( cells.find((c) => !isDisabledDay(c)))), () => ( cells[0]));
    return isoOf(pick);
  }, [rovingOverride, cells, anchor, today, cursor, isDisabledDay]);
  const focusCell = (iso) => {
    requestAnimationFrame(() => {
      _optionalChain([gridRef, 'access', _232 => _232.current, 'optionalAccess', _233 => _233.querySelector, 'call', _234 => _234(`button[data-iso="${iso}"]`), 'optionalAccess', _235 => _235.focus, 'call', _236 => _236()]);
    });
  };
  const handleDayKeyDown = (e, idx) => {
    const current = cells[idx];
    let target;
    if (e.key === "ArrowLeft") {
      target = new Date(
        current.getFullYear(),
        current.getMonth(),
        current.getDate() + (direction === "rtl" ? 1 : -1)
      );
    } else if (e.key === "ArrowRight") {
      target = new Date(
        current.getFullYear(),
        current.getMonth(),
        current.getDate() + (direction === "rtl" ? -1 : 1)
      );
    } else if (e.key === "ArrowUp") target = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 7);
    else if (e.key === "ArrowDown") target = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 7);
    else if (e.key === "Home") target = new Date(current.getFullYear(), current.getMonth(), current.getDate() - idx % 7);
    else if (e.key === "End") target = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 6 - idx % 7);
    else if (e.key === "PageUp" || e.key === "PageDown") {
      const direction2 = e.key === "PageUp" ? -1 : 1;
      const targetMonth = current.getMonth() + (e.shiftKey ? direction2 * 12 : direction2);
      const lastDay = new Date(current.getFullYear(), targetMonth + 1, 0).getDate();
      target = new Date(current.getFullYear(), targetMonth, Math.min(current.getDate(), lastDay));
    } else return;
    e.preventDefault();
    if (target.getFullYear() < FIRST_YEAR || target.getFullYear() > LAST_YEAR || isDisabledDay(target)) return;
    if (target.getMonth() !== cursor.getMonth() || target.getFullYear() !== cursor.getFullYear()) {
      setCursor(startOfMonth(target));
    }
    setRovingOverride(isoOf(target));
    focusCell(isoOf(target));
  };
  const weekRows = [];
  for (let r = 0; r < 6; r++) weekRows.push(cells.slice(r * 7, r * 7 + 7));
  const headerLabel = view === "year" ? String(cursor.getFullYear()) : `${monthName(cursor.getMonth(), locale)} ${cursor.getFullYear()}`;
  const selectedPillClass = "bg-m3-primary";
  const selectedTextClass = "text-m3-on-primary";
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "mb-1 flex items-center justify-between", children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
        "button",
        {
          type: "button",
          onClick: () => setView((v) => v === "month" ? "year" : "month"),
          className: "m3-state m3-focus md-title-large cursor-pointer rounded-full px-3 py-1 whitespace-nowrap text-m3-on-surface outline-none",
          children: animatedHeader ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { mode: "popLayout", initial: false, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            _framermotion.motion.span,
            {
              initial: reduceMotion ? false : { opacity: 0, y: 6 },
              animate: { opacity: 1, y: 0 },
              exit: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 },
              transition: reduceMotion ? { duration: 0 } : springs.fastVisual,
              className: "block",
              children: headerLabel
            },
            headerLabel
          ) }) : headerLabel
        }
      ),
      /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-center", children: [
        onRequestInput && !rangeOn && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          "button",
          {
            type: "button",
            "aria-label": "Switch to date input",
            onClick: onRequestInput,
            className: "m3-state m3-focus flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-m3-on-surface outline-none",
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "edit" })
          }
        ),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          "button",
          {
            type: "button",
            "aria-label": view === "year" ? "Previous years" : "Previous month",
            onClick: () => navigate(-1),
            className: "m3-state m3-focus flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-m3-on-surface outline-none",
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: direction === "rtl" ? "chevron_right" : "chevron_left" })
          }
        ),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          "button",
          {
            type: "button",
            "aria-label": view === "year" ? "Next years" : "Next month",
            onClick: () => navigate(1),
            className: "m3-state m3-focus flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-m3-on-surface outline-none",
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: direction === "rtl" ? "chevron_left" : "chevron_right" })
          }
        )
      ] })
    ] }),
    view === "month" ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { role: "grid", ref: gridRef, children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { role: "row", className: "grid grid-cols-7 justify-items-center", children: localeWeek.weekdays.map((w, i) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
        "span",
        {
          role: "columnheader",
          "aria-label": w.long,
          className: "flex h-10 w-10 items-center justify-center md-label-medium text-m3-on-surface-variant",
          children: w.initial
        },
        `${w.long}-${i}`
      )) }),
      weekRows.map((week, r) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { role: "row", className: "grid grid-cols-7 justify-items-center", children: week.map((day, c) => {
        const iso = isoOf(day);
        const idx = r * 7 + c;
        const isSelected = !rangeOn && selected !== void 0 && sameDay(day, selected);
        const isToday = sameDay(day, today);
        const inMonth = day.getMonth() === cursor.getMonth();
        const disabled = isDisabledDay(day);
        const isRangeStart = rangeOn && _optionalChain([rangeSel, 'optionalAccess', _237 => _237.start]) !== void 0 && sameDay(day, rangeSel.start);
        const isRangeEnd = rangeOn && _optionalChain([rangeSel, 'optionalAccess', _238 => _238.end]) !== void 0 && sameDay(day, rangeSel.end);
        const inCommittedRange = rangeOn && _optionalChain([rangeSel, 'optionalAccess', _239 => _239.start]) !== void 0 && _optionalChain([rangeSel, 'optionalAccess', _240 => _240.end]) !== void 0 && startOfDay(day) > startOfDay(rangeSel.start) && startOfDay(day) < startOfDay(rangeSel.end);
        const previewEnd = previewFrom !== void 0 && hoverDate !== void 0 && sameDay(day, hoverDate) && startOfDay(day) > startOfDay(previewFrom);
        const inPreviewRange = previewFrom !== void 0 && hoverDate !== void 0 && startOfDay(day) > startOfDay(previewFrom) && startOfDay(day) < startOfDay(hoverDate);
        const previewRestart = previewFrom !== void 0 && hoverDate !== void 0 && sameDay(day, hoverDate) && startOfDay(day) < startOfDay(previewFrom);
        const bandKind = isRangeStart && !isRangeEnd ? "start" : isRangeEnd && !isRangeStart ? "end" : inCommittedRange ? "mid" : previewEnd ? "preview-end" : inPreviewRange ? "preview-mid" : null;
        const rangeProps = rangeOn && previewFrom !== void 0 ? {
          onMouseEnter: () => setHoverDate(day),
          onMouseLeave: () => setHoverDate(void 0),
          onFocus: () => setHoverDate(day),
          onBlur: () => setHoverDate(void 0)
        } : {};
        return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
          "div",
          {
            role: "gridcell",
            "aria-selected": isSelected || isRangeStart || isRangeEnd || inCommittedRange || void 0,
            "aria-current": isToday ? "date" : void 0,
            "aria-disabled": disabled || void 0,
            className: "relative flex w-full items-center justify-center",
            children: [
              bandKind && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                "span",
                {
                  "aria-hidden": "true",
                  className: cn(
                    "pointer-events-none absolute inset-y-1",
                    bandKind === "start" && "start-1/2 end-0 rounded-s-full bg-m3-secondary-container",
                    bandKind === "end" && "start-0 end-1/2 rounded-e-full bg-m3-secondary-container",
                    bandKind === "mid" && "inset-x-0 bg-m3-secondary-container",
                    bandKind === "preview-end" && "start-0 end-1/2 rounded-e-full bg-m3-secondary-container/44",
                    bandKind === "preview-mid" && "inset-x-0 bg-m3-secondary-container/44"
                  )
                }
              ),
              /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
                "button",
                {
                  type: "button",
                  "data-iso": iso,
                  disabled,
                  tabIndex: iso === activeIso ? 0 : -1,
                  "aria-label": `${monthName(day.getMonth(), locale)} ${day.getDate()}, ${day.getFullYear()}${isRangeStart ? ", start of range" : isRangeEnd ? ", end of range" : ""}`,
                  onClick: () => handleSelect(day),
                  onKeyDown: (e) => handleDayKeyDown(e, idx),
                  ...rangeProps,
                  className: cn(
                    "m3-state m3-focus relative my-0.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full md-body-large outline-none",
                    disabled && "pointer-events-none opacity-38",
                    !isSelected && isToday && "border border-m3-primary text-m3-primary",
                    !isSelected && (previewEnd || previewRestart) && "border border-m3-primary",
                    !isSelected && !isToday && !previewEnd && !previewRestart && (inMonth ? "text-m3-on-surface" : "text-m3-on-surface-variant")
                  ),
                  children: [
                    rangeOn ? isRangeStart && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                      _framermotion.motion.span,
                      {
                        layoutId: `${pillId}-start`,
                        className: cn("absolute inset-0 rounded-full", selectedPillClass),
                        transition: reduceMotion ? { duration: 0 } : springs.expressive
                      }
                    ) : isSelected && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                      _framermotion.motion.span,
                      {
                        layoutId: pillId,
                        className: cn("absolute inset-0 rounded-full", selectedPillClass),
                        transition: reduceMotion ? { duration: 0 } : springs.expressive
                      }
                    ),
                    rangeOn && isRangeEnd && !isRangeStart && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                      _framermotion.motion.span,
                      {
                        layoutId: `${pillId}-end`,
                        className: cn("absolute inset-0 rounded-full", selectedPillClass),
                        transition: reduceMotion ? { duration: 0 } : springs.expressive
                      }
                    ),
                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                      "span",
                      {
                        className: cn(
                          "relative z-10",
                          (isSelected || isRangeStart || isRangeEnd) && selectedTextClass,
                          inCommittedRange && "text-m3-on-secondary-container"
                        ),
                        children: day.getDate()
                      }
                    )
                  ]
                }
              )
            ]
          },
          iso
        );
      }) }, `week-${r}`))
    ] }) : (
      /* Official year grid: 3 columns, 1900–2100. */
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "m3-scroll grid h-[300px] grid-cols-3 justify-items-center gap-x-3 gap-y-2 overflow-y-auto pt-2", children: years.map((y) => {
        const isCurrent = y === highlightYear;
        return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          "button",
          {
            type: "button",
            ref: isCurrent ? selectedYearRef : void 0,
            onClick: () => {
              setCursor(new Date(y, cursor.getMonth(), 1));
              setView("month");
            },
            className: cn(
              "m3-state m3-focus md-body-large h-9 w-[72px] cursor-pointer rounded-full outline-none",
              isCurrent ? "bg-m3-primary text-m3-on-primary" : "text-m3-on-surface-variant"
            ),
            children: y
          },
          y
        );
      }) })
    )
  ] });
}
var DatePickerModal = React43.forwardRef(
  function DatePickerModal2({
    value,
    onChange,
    locale,
    minDate,
    maxDate,
    open = false,
    onOpenChange,
    closeOnSelect = false,
    className,
    selectionMode = "single",
    range,
    onRangeChange,
    initialDisplayMode = "calendar",
    showModeToggle = true,
    confirmLabel = "OK",
    dismissLabel = "Cancel",
    onConfirm,
    onDismiss
  }, ref) {
    const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
    const directionAnchorRef = React43.useRef(null);
    const direction = useTextDirection(directionAnchorRef);
    const panelRef = React43.useRef(null);
    const setPanelRef = React43.useCallback(
      (node) => {
        panelRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );
    const restoreFocusRef = React43.useRef(null);
    const [picked, setPicked] = React43.useState(value);
    const [pickedRange, setPickedRange] = React43.useState(_nullishCoalesce(range, () => ( {})));
    const [displayMode, setDisplayMode] = React43.useState(initialDisplayMode);
    const rangeOn = selectionMode === "range";
    const inputMode = displayMode === "input";
    const rangeSel = rangeOn ? pickedRange : void 0;
    React43.useEffect(() => {
      if (!open) return;
      setPicked(value);
      setPickedRange(_nullishCoalesce(range, () => ( {})));
      setDisplayMode(initialDisplayMode);
    }, [initialDisplayMode, open, range, value]);
    React43.useEffect(() => {
      if (!open) return;
      const onKey = (e) => {
        if (e.key === "Escape") {
          setPicked(value);
          setPickedRange(_nullishCoalesce(range, () => ( {})));
          _optionalChain([onDismiss, 'optionalCall', _241 => _241()]);
          _optionalChain([onOpenChange, 'optionalCall', _242 => _242(false)]);
        }
      };
      window.addEventListener("keydown", onKey);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = prevOverflow;
      };
    }, [onDismiss, onOpenChange, open, range, value]);
    React43.useEffect(() => {
      if (!open) return;
      restoreFocusRef.current = document.activeElement;
      const timer = window.setTimeout(() => {
        const day = _optionalChain([panelRef, 'access', _243 => _243.current, 'optionalAccess', _244 => _244.querySelector, 'call', _245 => _245(
          'button[data-iso][tabindex="0"]'
        )]);
        if (day) day.focus();
        else _optionalChain([panelRef, 'access', _246 => _246.current, 'optionalAccess', _247 => _247.focus, 'call', _248 => _248()]);
      }, 0);
      return () => {
        window.clearTimeout(timer);
        _optionalChain([restoreFocusRef, 'access', _249 => _249.current, 'optionalAccess', _250 => _250.focus, 'optionalCall', _251 => _251()]);
      };
    }, [open]);
    const handleTab = (e) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = Array.from(
        panelRef.current.querySelectorAll(FOCUSABLE2)
      ).filter((el) => !el.hasAttribute("disabled"));
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const handleSelect = (d) => {
      setPicked(d);
      if (closeOnSelect) {
        _optionalChain([onChange, 'optionalCall', _252 => _252(d)]);
        _optionalChain([onConfirm, 'optionalCall', _253 => _253(d)]);
        _optionalChain([onOpenChange, 'optionalCall', _254 => _254(false)]);
      }
    };
    const handleRangeChange = (r) => {
      setPickedRange(r);
      if (r.start && r.end && closeOnSelect) {
        _optionalChain([onRangeChange, 'optionalCall', _255 => _255(r)]);
        _optionalChain([onConfirm, 'optionalCall', _256 => _256(r)]);
        _optionalChain([onOpenChange, 'optionalCall', _257 => _257(false)]);
      }
    };
    const handleConfirm = () => {
      if (rangeOn) {
        if (!pickedRange.start || !pickedRange.end) return;
        _optionalChain([onRangeChange, 'optionalCall', _258 => _258(pickedRange)]);
        _optionalChain([onConfirm, 'optionalCall', _259 => _259(pickedRange)]);
      } else {
        if (!picked) return;
        _optionalChain([onChange, 'optionalCall', _260 => _260(picked)]);
        _optionalChain([onConfirm, 'optionalCall', _261 => _261(picked)]);
      }
      _optionalChain([onOpenChange, 'optionalCall', _262 => _262(false)]);
    };
    const handleDismiss = () => {
      setPicked(value);
      setPickedRange(_nullishCoalesce(range, () => ( {})));
      _optionalChain([onDismiss, 'optionalCall', _263 => _263()]);
      _optionalChain([onOpenChange, 'optionalCall', _264 => _264(false)]);
    };
    const headlineDate = _nullishCoalesce(picked, () => ( /* @__PURE__ */ new Date()));
    const headline = formatHeadline(headlineDate, locale);
    let rangeHeadline;
    if (_optionalChain([rangeSel, 'optionalAccess', _265 => _265.start]) && _optionalChain([rangeSel, 'optionalAccess', _266 => _266.end])) {
      rangeHeadline = `${formatShort(rangeSel.start, locale)} \u2013 ${formatShort(rangeSel.end, locale)}`;
    } else if (_optionalChain([rangeSel, 'optionalAccess', _267 => _267.start])) {
      rangeHeadline = /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
        formatShort(rangeSel.start, locale),
        " \u2013 ",
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "text-m3-on-surface-variant", children: "End date" })
      ] });
    } else {
      rangeHeadline = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "text-m3-on-surface-variant", children: "Start date" });
    }
    const headerLabel = inputMode ? rangeOn ? "Enter dates" : "Select date" : rangeOn ? "Selected dates" : "Selected date";
    const modeToggle = showModeToggle ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      "button",
      {
        type: "button",
        "aria-label": inputMode ? "Switch to calendar" : "Switch to date input",
        onClick: () => setDisplayMode(inputMode ? "calendar" : "input"),
        className: "m3-state m3-focus grid h-12 w-12 shrink-0 place-items-center rounded-full text-m3-on-surface outline-none",
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: inputMode ? "calendar_month" : "edit" })
      }
    ) : null;
    const confirmDisabled = rangeOn ? !pickedRange.start || !pickedRange.end : picked === void 0;
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { ref: directionAnchorRef, className: "contents", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: open && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "fixed inset-0 z-[80] flex items-center justify-center p-4", children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
        _framermotion.motion.div,
        {
          initial: reduceMotion ? false : { opacity: 0 },
          animate: { opacity: 1 },
          exit: reduceMotion ? { opacity: 1 } : { opacity: 0 },
          transition: reduceMotion ? { duration: 0 } : { duration: durations.short4 / 1e3, ease: "easeOut" },
          className: "absolute inset-0 bg-m3-scrim/32",
          onClick: handleDismiss
        }
      ),
      /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
        _framermotion.motion.div,
        {
          ref: setPanelRef,
          dir: direction,
          role: "dialog",
          "aria-modal": "true",
          "aria-label": rangeOn ? "Choose date range" : "Choose date",
          tabIndex: -1,
          onKeyDown: handleTab,
          initial: reduceMotion ? false : { scale: 0.9, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: reduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 },
          transition: reduceMotion ? { duration: 0 } : springs.expressive,
          className: cn(
            "m3-elevation-3 relative flex h-[568px] max-h-[calc(100dvh-32px)] w-[360px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-[28px] bg-m3-surface-container-high outline-none",
            className
          ),
          children: [
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex h-[120px] shrink-0 flex-col justify-center gap-1 px-6", children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-label-large text-m3-on-surface-variant", children: headerLabel }),
              /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-center justify-between gap-2", children: [
                rangeOn ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-title-large leading-tight text-m3-on-surface", children: rangeHeadline }) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-headline-large text-m3-on-surface-variant", children: headline }),
                modeToggle
              ] })
            ] }),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "h-px w-full shrink-0 bg-m3-outline-variant" }),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: cn("m3-scroll min-h-0 flex-1 overflow-y-auto", !inputMode && "px-4 pb-2 pt-2"), children: inputMode ? rangeOn ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              DateRangePickerInput,
              {
                locale,
                range: pickedRange,
                onRangeChange: handleRangeChange,
                minDate,
                maxDate,
                requestFocus: true
              }
            ) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              DatePickerInput,
              {
                locale,
                value: picked,
                onChange: handleSelect,
                minDate,
                maxDate,
                requestFocus: true
              }
            ) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              DatePickerCalendar,
              {
                direction,
                locale,
                value: picked,
                onChange: handleSelect,
                minDate,
                maxDate,
                animatedHeader: true,
                selectionMode,
                range: pickedRange,
                onRangeChange: rangeOn ? handleRangeChange : void 0
              }
            ) }),
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex h-16 shrink-0 items-center justify-end gap-2 px-4", children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                "button",
                {
                  type: "button",
                  onClick: handleDismiss,
                  className: "m3-state m3-focus md-label-large h-10 rounded-full px-3 text-m3-primary outline-none",
                  children: dismissLabel
                }
              ),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                "button",
                {
                  type: "button",
                  disabled: confirmDisabled,
                  onClick: handleConfirm,
                  className: "m3-state m3-focus md-label-large h-10 rounded-full px-3 text-m3-primary outline-none disabled:pointer-events-none disabled:text-m3-on-surface/38",
                  children: confirmLabel
                }
              )
            ] })
          ]
        }
      )
    ] }) }) });
  }
);
DatePickerModal.displayName = "DatePickerModal";
var DatePicker = React43.forwardRef(function DatePicker2({
  value,
  defaultValue,
  onChange,
  locale,
  minDate,
  maxDate,
  presentation = "docked",
  open,
  onOpenChange,
  closeOnSelect = false,
  fullWidth = false,
  selectionMode = "single",
  range,
  onRangeChange,
  initialDisplayMode = "calendar",
  showModeToggle = true,
  confirmLabel = "OK",
  dismissLabel = "Cancel",
  onConfirm,
  onDismiss,
  className
}, ref) {
  const [internalValue, setInternalValue] = React43.useState(defaultValue);
  const [internalRange, setInternalRange] = React43.useState({});
  const activeValue = _nullishCoalesce(value, () => ( internalValue));
  const activeRange = _nullishCoalesce(range, () => ( internalRange));
  const handleDateChange = React43.useCallback(
    (next) => {
      if (value === void 0) setInternalValue(next);
      _optionalChain([onChange, 'optionalCall', _268 => _268(next)]);
    },
    [onChange, value]
  );
  const handleRangeChange = React43.useCallback(
    (next) => {
      if (range === void 0) setInternalRange(next);
      _optionalChain([onRangeChange, 'optionalCall', _269 => _269(next)]);
    },
    [onRangeChange, range]
  );
  if (presentation === "modal") {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      DatePickerModal,
      {
        ref,
        open,
        onOpenChange,
        closeOnSelect,
        locale,
        value: activeValue,
        onChange: handleDateChange,
        minDate,
        maxDate,
        selectionMode,
        range: activeRange,
        onRangeChange: handleRangeChange,
        initialDisplayMode,
        showModeToggle,
        confirmLabel,
        dismissLabel,
        onConfirm,
        onDismiss,
        className
      }
    );
  }
  if (presentation === "docked" && selectionMode === "single") {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      DatePickerDocked,
      {
        ref,
        value: activeValue,
        onChange: handleDateChange,
        locale,
        minDate,
        maxDate,
        open,
        onOpenChange,
        fullWidth,
        initialDisplayMode,
        showModeToggle,
        className
      }
    );
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    DatePickerInline,
    {
      ref,
      value: activeValue,
      onChange: handleDateChange,
      locale,
      minDate,
      maxDate,
      fullWidth,
      selectionMode,
      range: activeRange,
      onRangeChange: handleRangeChange,
      initialDisplayMode,
      showModeToggle,
      className
    }
  );
});
var DatePickerInline = React43.forwardRef(function DatePickerInline2({
  value,
  onChange,
  locale,
  minDate,
  maxDate,
  fullWidth = false,
  selectionMode = "single",
  range,
  onRangeChange,
  initialDisplayMode = "calendar",
  showModeToggle = true,
  className
}, ref) {
  const rootRef = React43.useRef(null);
  const direction = useTextDirection(rootRef);
  const rangeOn = selectionMode === "range";
  const [displayMode, setDisplayMode] = React43.useState(initialDisplayMode);
  const inputMode = displayMode === "input";
  const [internalRange, setInternalRange] = React43.useState({});
  const rangeWasControlled = React43.useRef(range !== void 0);
  if (range !== void 0) rangeWasControlled.current = true;
  const activeRange = rangeWasControlled.current ? range : internalRange;
  const handleInlineRangeChange = (nextRange) => {
    if (!rangeWasControlled.current) setInternalRange(nextRange);
    _optionalChain([onRangeChange, 'optionalCall', _270 => _270(nextRange)]);
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    "div",
    {
      ref: (node) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      className: cn(
        "rounded-[28px] bg-m3-surface-container-high p-6",
        fullWidth ? "w-full" : "w-[328px]",
        className
      ),
      children: inputMode ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-center justify-between px-3", children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-title-large text-m3-on-surface", children: rangeOn ? "Enter dates" : "Select date" }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            "button",
            {
              type: "button",
              "aria-label": "Switch to calendar",
              onClick: () => setDisplayMode("calendar"),
              className: "m3-state m3-focus grid h-12 w-12 place-items-center rounded-full text-m3-on-surface outline-none",
              children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "calendar_month" })
            }
          )
        ] }),
        rangeOn ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          DateRangePickerInput,
          {
            locale,
            range: activeRange,
            onRangeChange: handleInlineRangeChange,
            minDate,
            maxDate,
            requestFocus: true
          }
        ) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          DatePickerInput,
          {
            locale,
            value,
            onChange,
            minDate,
            maxDate,
            requestFocus: true
          }
        )
      ] }) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
        DatePickerCalendar,
        {
          direction,
          locale,
          value,
          onChange,
          minDate,
          maxDate,
          selectionMode,
          range: activeRange,
          onRangeChange: handleInlineRangeChange,
          onRequestInput: showModeToggle ? () => setDisplayMode("input") : void 0
        }
      )
    }
  );
});
var DatePickerDocked = React43.forwardRef(function DatePickerDocked2({
  value,
  onChange,
  locale,
  minDate,
  maxDate,
  open,
  onOpenChange,
  fullWidth = false,
  initialDisplayMode = "calendar",
  showModeToggle = true,
  className
}, ref) {
  const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
  const rootRef = React43.useRef(null);
  const direction = useTextDirection(rootRef);
  const [internalOpen, setInternalOpen] = React43.useState(false);
  const isOpenControlled = open !== void 0;
  const popupOpen = isOpenControlled ? open : internalOpen;
  const setOpen = React43.useCallback(
    (next) => {
      if (!isOpenControlled) setInternalOpen(next);
      _optionalChain([onOpenChange, 'optionalCall', _271 => _271(next)]);
    },
    [isOpenControlled, onOpenChange]
  );
  const setRef = React43.useCallback(
    (node) => {
      rootRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );
  React43.useEffect(() => {
    if (!popupOpen) return;
    const handlePointerDown = (event) => {
      if (!_optionalChain([rootRef, 'access', _272 => _272.current, 'optionalAccess', _273 => _273.contains, 'call', _274 => _274(event.target)])) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [popupOpen, setOpen]);
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { ref: setRef, className: cn("relative", fullWidth ? "w-full" : "w-[328px]", className), children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      TextField,
      {
        label: "Date",
        value: value ? new Intl.DateTimeFormat(locale).format(value) : "",
        placeholder: "Choose date",
        trailingIcon: "calendar_today",
        readOnly: true,
        role: "combobox",
        "aria-haspopup": "dialog",
        "aria-expanded": popupOpen,
        onFocus: () => setOpen(true),
        onClick: () => setOpen(true),
        fullWidth: true
      }
    ),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: popupOpen && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _framermotion.motion.div,
      {
        dir: direction,
        role: "dialog",
        "aria-label": "Choose date",
        className: "m3-elevation-3 absolute start-0 top-[64px] z-50 rounded-[28px]",
        initial: reduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -8, scale: 0.98 },
        transition: reduceMotion ? { duration: 0 } : springs.fastSpatial,
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          DatePickerInline,
          {
            value,
            onChange: (next) => {
              _optionalChain([onChange, 'optionalCall', _275 => _275(next)]);
              setOpen(false);
            },
            locale,
            minDate,
            maxDate,
            initialDisplayMode,
            showModeToggle
          }
        )
      }
    ) })
  ] });
});
DatePickerDocked.displayName = "DatePickerDocked";

// ../../src/components/m3/TimePicker.tsx



var DIAL_CENTER = 128;
var DIAL_RADIUS = 104;
var HOUR_AUTO_SWITCH_MS = 100;
var OUTER_24H_RADIUS = 101;
var INNER_24H_RADIUS = 69;
var OUTER_RING_HOURS = Array.from({ length: 12 }, (_, i) => i);
var INNER_RING_HOURS = Array.from({ length: 12 }, (_, i) => i + 12);
var HOURS_12 = Array.from({ length: 12 }, (_, i) => i + 1);
var HOURS_24 = Array.from({ length: 24 }, (_, i) => i);
var MINUTES = Array.from({ length: 60 }, (_, i) => i);
var SCROLL_ITEM_HEIGHT = 40;
var FOCUSABLE3 = 'a[href], button:not([disabled]), textarea, input, select, details, [tabindex]:not([tabindex="-1"])';
var DIAL_POSITIONS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
function pad2(n) {
  return String(n).padStart(2, "0");
}
function systemUses24Hour() {
  const hourCycle = new Intl.DateTimeFormat(void 0, { hour: "numeric" }).resolvedOptions().hourCycle;
  return hourCycle === "h23" || hourCycle === "h24";
}
function validateTime(value) {
  if (!Number.isInteger(value.hour) || value.hour < 0 || value.hour > 23) {
    throw new RangeError("TimePicker hour must be an integer from 0 to 23");
  }
  if (!Number.isInteger(value.minute) || value.minute < 0 || value.minute > 59) {
    throw new RangeError("TimePicker minute must be an integer from 0 to 59");
  }
  return value;
}
function hourForDisplay(hour, use24h) {
  if (use24h) return hour;
  return hour % 12 === 0 ? 12 : hour % 12;
}
function inputNumber(value, min, max) {
  if (!/^\d{1,2}$/.test(value)) return null;
  const number = Number(value);
  return number >= min && number <= max ? number : null;
}
function TimeScrollField({
  label,
  value,
  options,
  format,
  optionLabel,
  onChange
}) {
  const listRef = React44.useRef(null);
  const skipScrollSyncRef = React44.useRef(false);
  const optionId = React44.useId();
  const selectedIndex = Math.max(0, options.indexOf(value));
  React44.useEffect(() => {
    if (skipScrollSyncRef.current) {
      skipScrollSyncRef.current = false;
      return;
    }
    const list = listRef.current;
    if (!list) return;
    const nextTop = selectedIndex * SCROLL_ITEM_HEIGHT;
    if (Math.abs(list.scrollTop - nextTop) > 1) list.scrollTop = nextTop;
  }, [selectedIndex]);
  const selectIndex = (index, fromScroll = false) => {
    const bounded = Math.max(0, Math.min(options.length - 1, index));
    const next = options[bounded];
    if (next !== value) {
      skipScrollSyncRef.current = fromScroll;
      onChange(next);
    }
  };
  const handleKeyDown = (event) => {
    let nextIndex = null;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = selectedIndex - 1;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = selectedIndex + 1;
    if (event.key === "PageUp") nextIndex = selectedIndex - 3;
    if (event.key === "PageDown") nextIndex = selectedIndex + 3;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = options.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    selectIndex(nextIndex);
  };
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "relative h-[120px] w-[100px] overflow-hidden rounded-[8px] bg-m3-surface-container-highest", children: [
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
      "div",
      {
        ref: listRef,
        role: "listbox",
        tabIndex: 0,
        "aria-label": label,
        "aria-orientation": "vertical",
        "aria-activedescendant": `${optionId}-${selectedIndex}`,
        onKeyDown: handleKeyDown,
        onScroll: (event) => selectIndex(Math.round(event.currentTarget.scrollTop / SCROLL_ITEM_HEIGHT), true),
        className: "m3-focus h-full snap-y snap-mandatory overflow-y-auto overscroll-contain outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { "aria-hidden": "true", className: "h-10 snap-none" }),
          options.map((option, index) => {
            const selected = index === selectedIndex;
            return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              "div",
              {
                id: `${optionId}-${index}`,
                role: "option",
                tabIndex: -1,
                "aria-label": optionLabel(option),
                "aria-selected": selected,
                onClick: () => {
                  selectIndex(index);
                  _optionalChain([listRef, 'access', _276 => _276.current, 'optionalAccess', _277 => _277.focus, 'call', _278 => _278()]);
                },
                onKeyDown: (event) => {
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  selectIndex(index);
                  _optionalChain([listRef, 'access', _279 => _279.current, 'optionalAccess', _280 => _280.focus, 'call', _281 => _281()]);
                },
                className: cn(
                  "md-display-medium flex h-10 snap-center cursor-pointer select-none items-center justify-center tabular-nums",
                  selected ? "bg-m3-primary-container text-m3-on-primary-container" : "text-m3-on-surface-variant"
                ),
                children: format(option)
              },
              option
            );
          }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { "aria-hidden": "true", className: "h-10 snap-none" })
        ]
      }
    ),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      "div",
      {
        "aria-hidden": "true",
        className: "pointer-events-none absolute inset-x-0 top-10 h-10 rounded-[8px] border-2 border-m3-primary"
      }
    )
  ] });
}
function dialPosition(n, radius = DIAL_RADIUS) {
  const theta = n * 30 * Math.PI / 180;
  return {
    x: DIAL_CENTER + radius * Math.sin(theta),
    y: DIAL_CENTER - radius * Math.cos(theta)
  };
}
var TimePickerInline = React44.forwardRef(function TimePickerInline2({
  value,
  defaultValue,
  onChange,
  displayMode = "dial",
  use24h: use24hProp,
  fullWidth = false,
  className
}, ref) {
  const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
  const [internal, setInternal] = React44.useState(
    () => validateTime(_nullishCoalesce(defaultValue, () => ( { hour: 0, minute: 0 })))
  );
  const [system24h, setSystem24h] = React44.useState(false);
  React44.useEffect(() => setSystem24h(systemUses24Hour()), []);
  const use24h = _nullishCoalesce(use24hProp, () => ( system24h));
  const time = value === void 0 ? internal : validateTime(value);
  const [mode, setMode] = React44.useState("hour");
  const [hourInput, setHourInput] = React44.useState(() => pad2(hourForDisplay(time.hour, use24h)));
  const [minuteInput, setMinuteInput] = React44.useState(() => pad2(time.minute));
  const hourHelpId = React44.useId();
  const minuteHelpId = React44.useId();
  const switchTimer = React44.useRef(null);
  const dialRef = React44.useRef(null);
  const dragPointerRef = React44.useRef(null);
  const editingInputRef = React44.useRef(null);
  const hourInputRef = React44.useRef(null);
  const minuteInputRef = React44.useRef(null);
  const amRef = React44.useRef(null);
  const pmRef = React44.useRef(null);
  React44.useEffect(() => {
    return () => {
      if (switchTimer.current !== null) window.clearTimeout(switchTimer.current);
    };
  }, []);
  React44.useEffect(() => {
    if (editingInputRef.current !== "hour" || displayMode !== "input") {
      setHourInput(pad2(hourForDisplay(time.hour, use24h)));
    }
  }, [displayMode, time.hour, use24h]);
  React44.useEffect(() => {
    if (editingInputRef.current !== "minute" || displayMode !== "input") {
      setMinuteInput(pad2(time.minute));
    }
  }, [displayMode, time.minute]);
  const update = (next) => {
    const merged = validateTime({ ...time, ...next });
    if (value === void 0) setInternal(merged);
    _optionalChain([onChange, 'optionalCall', _282 => _282(merged)]);
  };
  const isPM = time.hour >= 12;
  const hour12 = hourForDisplay(time.hour, false);
  const hourLabel = use24h ? pad2(time.hour) : String(hour12);
  const hourInputMin = use24h ? 0 : 1;
  const hourInputMax = use24h ? 23 : 12;
  const parsedHourInput = inputNumber(hourInput, hourInputMin, hourInputMax);
  const parsedMinuteInput = inputNumber(minuteInput, 0, 59);
  const hourInputValid = parsedHourInput !== null;
  const minuteInputValid = parsedMinuteInput !== null;
  const doubleRing = use24h && mode === "hour";
  const handleRadius = doubleRing && time.hour >= 12 ? INNER_24H_RADIUS : DIAL_RADIUS;
  const tickRadius = doubleRing && time.hour >= 12 ? OUTER_24H_RADIUS : INNER_24H_RADIUS;
  const angle = mode === "hour" ? (use24h ? time.hour % 12 : hour12) * 30 : time.minute * 6;
  const scheduleModeSwitch = () => {
    if (switchTimer.current !== null) window.clearTimeout(switchTimer.current);
    switchTimer.current = window.setTimeout(() => setMode("minute"), HOUR_AUTO_SWITCH_MS);
  };
  const setHour24 = (h, autoSwitch = true) => {
    update({ hour: h });
    if (autoSwitch) scheduleModeSwitch();
  };
  const setHourOnDial = (n, autoSwitch = true) => {
    const base = n % 12;
    update({ hour: isPM ? base + 12 : base });
    if (autoSwitch) scheduleModeSwitch();
  };
  const setMinuteOnDial = (n) => {
    update({ minute: n * 5 % 60 });
  };
  const dialValues = React44.useMemo(
    () => mode === "minute" ? DIAL_POSITIONS.map((position) => position * 5 % 60) : use24h ? [...OUTER_RING_HOURS, ...INNER_RING_HOURS] : [...DIAL_POSITIONS],
    [mode, use24h]
  );
  const selectedDialValue = mode === "minute" ? time.minute : use24h ? time.hour : hour12;
  const rovingDialValue = dialValues.includes(selectedDialValue) ? selectedDialValue : dialValues.reduce((nearest, candidate) => {
    const candidateDistance = Math.min(
      Math.abs(candidate - selectedDialValue),
      60 - Math.abs(candidate - selectedDialValue)
    );
    const nearestDistance = Math.min(
      Math.abs(nearest - selectedDialValue),
      60 - Math.abs(nearest - selectedDialValue)
    );
    return candidateDistance < nearestDistance ? candidate : nearest;
  }, _nullishCoalesce(dialValues[0], () => ( 0)));
  const focusDialValue = (nextValue) => {
    requestAnimationFrame(() => {
      _optionalChain([dialRef, 'access', _283 => _283.current, 'optionalAccess', _284 => _284.querySelector, 'call', _285 => _285(`button[data-dial-value="${nextValue}"]`), 'optionalAccess', _286 => _286.focus, 'call', _287 => _287()]);
    });
  };
  const handleNumberClick = (n, autoSwitch) => {
    if (mode === "hour") setHourOnDial(n, autoSwitch);
    else setMinuteOnDial(n);
  };
  const selectPointerPosition = (clientX, clientY) => {
    const rect = _optionalChain([dialRef, 'access', _288 => _288.current, 'optionalAccess', _289 => _289.getBoundingClientRect, 'call', _290 => _290()]);
    if (!rect) return;
    const dx = (clientX - rect.left) / rect.width * 256 - DIAL_CENTER;
    const dy = (clientY - rect.top) / rect.height * 256 - DIAL_CENTER;
    const degrees = Math.atan2(dx, -dy) * 180 / Math.PI;
    const normalized = (degrees + 360) % 360;
    if (mode === "minute") {
      update({ minute: Math.round(normalized / 6) % 60 });
      return;
    }
    const clockHour = Math.round(normalized / 30) % 12;
    if (use24h) {
      const innerRing = Math.hypot(dx, dy) < (OUTER_24H_RADIUS + INNER_24H_RADIUS) / 2;
      update({ hour: innerRing ? clockHour + 12 : clockHour });
    } else {
      setHourOnDial(clockHour === 0 ? 12 : clockHour, false);
    }
  };
  const handleDialPointerDown = (e) => {
    dragPointerRef.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
    selectPointerPosition(e.clientX, e.clientY);
  };
  const handleDialPointerMove = (e) => {
    if (dragPointerRef.current !== e.pointerId) return;
    selectPointerPosition(e.clientX, e.clientY);
  };
  const handleDialPointerEnd = (e) => {
    if (dragPointerRef.current !== e.pointerId) return;
    selectPointerPosition(e.clientX, e.clientY);
    dragPointerRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (mode === "hour") scheduleModeSwitch();
  };
  const handleDialKeyDown = (e, currentValue) => {
    const dir = e.key === "ArrowUp" || e.key === "ArrowRight" ? 1 : e.key === "ArrowDown" || e.key === "ArrowLeft" ? -1 : 0;
    if (dir === 0) return;
    e.preventDefault();
    const currentIndex = Math.max(0, dialValues.indexOf(currentValue));
    const nextValue = dialValues[(currentIndex + dir + dialValues.length) % dialValues.length];
    if (mode === "minute") update({ minute: nextValue });
    else if (use24h) update({ hour: nextValue });
    else setHourOnDial(nextValue, false);
    focusDialValue(nextValue);
  };
  const handleMeridiem = (m) => {
    update({ hour: m === "AM" ? time.hour % 12 : time.hour % 12 + 12 });
  };
  const handleMeridiemKeyDown = (e, _m) => {
    const toAM = e.key === "ArrowUp" || e.key === "ArrowLeft";
    const toPM = e.key === "ArrowDown" || e.key === "ArrowRight";
    if (!toAM && !toPM) return;
    e.preventDefault();
    const target = toAM ? "AM" : "PM";
    handleMeridiem(target);
    _optionalChain([(toAM ? amRef : pmRef), 'access', _291 => _291.current, 'optionalAccess', _292 => _292.focus, 'call', _293 => _293()]);
  };
  const setDisplayedHour = (displayHour) => {
    update({ hour: use24h ? displayHour : displayHour % 12 + (isPM ? 12 : 0) });
  };
  const handleHourInputChange = (event) => {
    const nextInput = event.currentTarget.value;
    if (!/^\d{0,2}$/.test(nextInput)) return;
    setHourInput(nextInput);
    setMode("hour");
    const nextHour = inputNumber(nextInput, hourInputMin, hourInputMax);
    if (nextHour !== null) setDisplayedHour(nextHour);
  };
  const handleMinuteInputChange = (event) => {
    const nextInput = event.currentTarget.value;
    if (!/^\d{0,2}$/.test(nextInput)) return;
    setMinuteInput(nextInput);
    setMode("minute");
    const nextMinute = inputNumber(nextInput, 0, 59);
    if (nextMinute !== null) update({ minute: nextMinute });
  };
  const handleInputKeyDown = (event, field) => {
    if (event.key === "Enter") {
      if (field === "hour" && hourInputValid) _optionalChain([minuteInputRef, 'access', _294 => _294.current, 'optionalAccess', _295 => _295.focus, 'call', _296 => _296()]);
      if (field === "minute" && minuteInputValid) event.currentTarget.blur();
      return;
    }
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    const direction = event.key === "ArrowUp" ? 1 : -1;
    if (field === "hour") {
      const current = _nullishCoalesce(parsedHourInput, () => ( hourForDisplay(time.hour, use24h)));
      const range = hourInputMax - hourInputMin + 1;
      const next = (current - hourInputMin + direction + range) % range + hourInputMin;
      setHourInput(pad2(next));
      setDisplayedHour(next);
    } else {
      const current = _nullishCoalesce(parsedMinuteInput, () => ( time.minute));
      const next = (current + direction + 60) % 60;
      setMinuteInput(pad2(next));
      update({ minute: next });
    }
  };
  const periodSelector = (variant) => {
    if (use24h) return null;
    const horizontal = variant === "horizontal";
    const size = variant === "vertical" ? "h-20 w-[52px] flex-col rounded-full" : variant === "horizontal" ? "h-[38px] w-[216px] flex-row rounded-[8px]" : variant === "input" ? "h-[72px] w-[52px] flex-col rounded-[8px]" : "h-[120px] w-14 flex-col rounded-full";
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      "div",
      {
        role: "radiogroup",
        "aria-label": "Meridiem",
        className: cn("flex shrink-0 items-stretch border border-m3-outline", size),
        children: ["AM", "PM"].map((meridiem, index) => {
          const current = meridiem === "AM" === !isPM;
          return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, React44.Fragment, { children: [
            index === 1 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              "span",
              {
                "aria-hidden": "true",
                className: cn(
                  "shrink-0 bg-m3-outline",
                  horizontal ? "h-full w-px" : "h-px w-full"
                )
              }
            ),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              "button",
              {
                type: "button",
                ref: meridiem === "AM" ? amRef : pmRef,
                role: "radio",
                "aria-checked": current,
                tabIndex: current ? 0 : -1,
                onClick: () => handleMeridiem(meridiem),
                onKeyDown: (event) => handleMeridiemKeyDown(event, meridiem),
                className: cn(
                  "m3-state m3-focus md-title-medium flex min-h-0 min-w-0 flex-1 cursor-pointer items-center justify-center outline-none transition-colors",
                  horizontal ? index === 0 ? "rounded-s-[8px] rounded-e-none" : "rounded-e-[8px] rounded-s-none" : variant === "vertical" || variant === "scroll" ? index === 0 ? "rounded-t-full rounded-b-none" : "rounded-b-full rounded-t-none" : index === 0 ? "rounded-t-[8px] rounded-b-none" : "rounded-b-[8px] rounded-t-none",
                  current ? "bg-m3-tertiary-container text-m3-on-tertiary-container" : "text-m3-on-surface-variant"
                ),
                children: meridiem
              }
            )
          ] }, meridiem);
        })
      }
    );
  };
  const theta = angle * Math.PI / 180;
  const selX = DIAL_CENTER + handleRadius * Math.sin(theta);
  const selY = DIAL_CENTER - handleRadius * Math.cos(theta);
  const readoutSegment = (label, target) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    "button",
    {
      type: "button",
      onClick: () => setMode(target),
      "aria-pressed": mode === target,
      "aria-label": `${target === "hour" ? "Hour" : "Minute"} ${label}`,
      className: cn(
        // Official: 96×80dp time-selector segment, corner-small (8dp) shape;
        // active on primary-container, inactive on surface-container-highest
        "m3-state m3-focus flex h-20 shrink-0 cursor-pointer items-center justify-center rounded-[8px] outline-none transition-colors",
        use24h ? "w-[114px]" : "w-24",
        mode === target ? "bg-m3-primary-container text-m3-on-primary-container" : "bg-m3-surface-container-highest text-m3-on-surface"
      ),
      children: label
    }
  );
  const clockReadout = /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-center justify-center md-display-large tabular-nums", children: [
    readoutSegment(hourLabel, "hour"),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { "aria-hidden": "true", className: "text-m3-on-surface", children: ":" }),
    readoutSegment(pad2(time.minute), "minute")
  ] });
  const rootClassName = cn(
    // Official: container surface-container-high at elevation level 3
    "rounded-[28px] bg-m3-surface-container-high p-6 m3-elevation-3",
    displayMode === "horizontal" ? fullWidth ? "w-full" : "w-fit max-w-full" : fullWidth ? "w-full" : "w-[328px]",
    className
  );
  if (displayMode === "input") {
    const hourError = use24h ? "Enter an hour from 0 to 23" : "Enter an hour from 1 to 12";
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { ref, role: "group", "aria-label": "Time input", className: rootClassName, children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-start justify-center gap-3", dir: "ltr", children: [
      /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-start", children: [
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "w-24", children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            "input",
            {
              ref: hourInputRef,
              type: "text",
              role: "spinbutton",
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 2,
              value: hourInput,
              "aria-label": "Hour",
              "aria-valuemin": hourInputMin,
              "aria-valuemax": hourInputMax,
              "aria-valuenow": _nullishCoalesce(parsedHourInput, () => ( void 0)),
              "aria-invalid": !hourInputValid,
              "aria-describedby": hourHelpId,
              onFocus: () => {
                editingInputRef.current = "hour";
                setMode("hour");
              },
              onBlur: () => {
                editingInputRef.current = null;
                setHourInput(pad2(hourForDisplay(time.hour, use24h)));
              },
              onChange: handleHourInputChange,
              onKeyDown: (event) => handleInputKeyDown(event, "hour"),
              className: cn(
                "m3-focus h-[72px] w-24 rounded-[8px] text-center md-display-medium tabular-nums outline-none",
                !hourInputValid ? "border-2 border-m3-error bg-m3-surface-container-highest text-m3-error" : mode === "hour" ? "border-2 border-m3-primary bg-m3-primary-container text-m3-on-primary-container" : "border border-transparent bg-m3-surface-container-highest text-m3-on-surface"
              )
            }
          ),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            "span",
            {
              id: hourHelpId,
              "aria-live": "polite",
              className: cn(
                "mt-[7px] block min-h-8 text-center md-body-small",
                hourInputValid ? "text-m3-on-surface-variant" : "text-m3-error"
              ),
              children: hourInputValid ? "Hour" : hourError
            }
          )
        ] }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          "span",
          {
            "aria-hidden": "true",
            className: "flex h-[72px] w-6 shrink-0 items-center justify-center text-m3-on-surface md-display-large",
            children: ":"
          }
        ),
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "w-24", children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            "input",
            {
              ref: minuteInputRef,
              type: "text",
              role: "spinbutton",
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 2,
              value: minuteInput,
              "aria-label": "Minute",
              "aria-valuemin": 0,
              "aria-valuemax": 59,
              "aria-valuenow": _nullishCoalesce(parsedMinuteInput, () => ( void 0)),
              "aria-invalid": !minuteInputValid,
              "aria-describedby": minuteHelpId,
              onFocus: () => {
                editingInputRef.current = "minute";
                setMode("minute");
              },
              onBlur: () => {
                editingInputRef.current = null;
                setMinuteInput(pad2(time.minute));
              },
              onChange: handleMinuteInputChange,
              onKeyDown: (event) => handleInputKeyDown(event, "minute"),
              className: cn(
                "m3-focus h-[72px] w-24 rounded-[8px] text-center md-display-medium tabular-nums outline-none",
                !minuteInputValid ? "border-2 border-m3-error bg-m3-surface-container-highest text-m3-error" : mode === "minute" ? "border-2 border-m3-primary bg-m3-primary-container text-m3-on-primary-container" : "border border-transparent bg-m3-surface-container-highest text-m3-on-surface"
              )
            }
          ),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            "span",
            {
              id: minuteHelpId,
              "aria-live": "polite",
              className: cn(
                "mt-[7px] block min-h-8 text-center md-body-small",
                minuteInputValid ? "text-m3-on-surface-variant" : "text-m3-error"
              ),
              children: minuteInputValid ? "Minute" : "Enter a minute from 0 to 59"
            }
          )
        ] })
      ] }),
      periodSelector("input")
    ] }) });
  }
  if (displayMode === "scroll") {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { ref, role: "group", "aria-label": "Time scroll picker", className: rootClassName, children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-start justify-center gap-2", dir: "ltr", children: [
      /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-start", children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          TimeScrollField,
          {
            label: "Hour",
            value: use24h ? time.hour : hour12,
            options: use24h ? HOURS_24 : HOURS_12,
            format: pad2,
            optionLabel: (hour) => `${hour} ${hour === 1 ? "hour" : "hours"}`,
            onChange: setDisplayedHour
          }
        ),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          "span",
          {
            "aria-hidden": "true",
            className: "flex h-[120px] w-4 shrink-0 items-center justify-center text-m3-on-surface md-display-large",
            children: ":"
          }
        ),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
          TimeScrollField,
          {
            label: "Minute",
            value: time.minute,
            options: MINUTES,
            format: pad2,
            optionLabel: (minute) => `${minute} ${minute === 1 ? "minute" : "minutes"}`,
            onChange: (minute) => update({ minute })
          }
        )
      ] }),
      periodSelector("scroll")
    ] }) });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { ref, role: "group", "aria-label": "Time picker", className: rootClassName, children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
    "div",
    {
      className: cn(
        displayMode === "horizontal" && "flex flex-col items-center justify-center gap-6 min-[560px]:flex-row min-[560px]:gap-9"
      ),
      children: [
        displayMode === "horizontal" ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex shrink-0 flex-col items-center justify-center", children: [
          clockReadout,
          !use24h && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "mt-4", children: periodSelector("horizontal") })
        ] }) : /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "mb-4 flex items-center justify-center gap-3", children: [
          clockReadout,
          periodSelector("vertical")
        ] }),
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
          "div",
          {
            ref: dialRef,
            role: "radiogroup",
            "aria-label": `${mode === "hour" ? "Hour" : "Minute"} dial`,
            onPointerDown: handleDialPointerDown,
            onPointerMove: handleDialPointerMove,
            onPointerUp: handleDialPointerEnd,
            onPointerCancel: handleDialPointerEnd,
            className: "relative mx-auto h-[256px] w-[256px] touch-none select-none rounded-full bg-m3-surface-container-highest",
            children: [
              mode === "minute" && Array.from({ length: 60 }, (_, minute) => {
                const tickTheta = minute * 6 * Math.PI / 180;
                const tickRadius2 = 118;
                const major = minute % 5 === 0;
                return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  "span",
                  {
                    "aria-hidden": "true",
                    className: cn(
                      "pointer-events-none absolute z-[1] -translate-x-1/2 -translate-y-1/2 rounded-full bg-m3-on-surface-variant",
                      major ? "h-1 w-1" : "h-0.5 w-0.5"
                    ),
                    style: {
                      left: DIAL_CENTER + tickRadius2 * Math.sin(tickTheta),
                      top: DIAL_CENTER - tickRadius2 * Math.cos(tickTheta)
                    }
                  },
                  `minute-tick-${minute}`
                );
              }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                _framermotion.motion.span,
                {
                  className: "absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-m3-primary",
                  style: { left: selX - 24, top: selY - 24 },
                  initial: reduceMotion ? false : { scale: 0 },
                  animate: { scale: 1 },
                  transition: reduceMotion ? { duration: 0 } : springs.expressiveEffects
                }
              ),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                _framermotion.motion.div,
                {
                  className: "pointer-events-none absolute z-0 rounded-full bg-m3-primary",
                  style: {
                    left: DIAL_CENTER - 1,
                    bottom: DIAL_CENTER,
                    width: 2,
                    height: DIAL_RADIUS,
                    transformOrigin: "bottom center"
                  },
                  animate: { rotate: angle, height: handleRadius },
                  transition: reduceMotion ? { duration: 0 } : springs.defaultVisual
                }
              ),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "absolute left-1/2 top-1/2 z-30 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-m3-primary" }),
              doubleRing && /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                _framermotion.motion.span,
                {
                  className: "absolute z-10 h-1.5 w-1.5 rounded-full bg-m3-primary",
                  style: {
                    left: DIAL_CENTER + tickRadius * Math.sin(theta) - 3,
                    top: DIAL_CENTER - tickRadius * Math.cos(theta) - 3
                  },
                  initial: reduceMotion ? false : { scale: 0 },
                  animate: { scale: 1 },
                  transition: reduceMotion ? { duration: 0 } : springs.expressiveEffects
                }
              ),
              doubleRing ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
                OUTER_RING_HOURS.map((h) => {
                  const { x, y } = dialPosition(h === 0 ? 12 : h, OUTER_24H_RADIUS);
                  const isActive = h === time.hour;
                  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                    "button",
                    {
                      type: "button",
                      "aria-label": `${h}:00`,
                      role: "radio",
                      "aria-checked": isActive,
                      tabIndex: h === rovingDialValue ? 0 : -1,
                      "data-dial-value": h,
                      onClick: (event) => setHour24(h, event.detail > 0),
                      onKeyDown: (event) => handleDialKeyDown(event, h),
                      style: { left: x - 24, top: y - 24 },
                      className: "m3-state m3-focus absolute z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full outline-none",
                      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                        "span",
                        {
                          className: cn(
                            isActive ? "text-m3-on-primary" : "text-m3-on-surface-variant",
                            "md-label-large tabular-nums"
                          ),
                          children: pad2(h)
                        }
                      )
                    },
                    `h${h}`
                  );
                }),
                INNER_RING_HOURS.map((h) => {
                  const { x, y } = dialPosition(h === 12 ? 12 : h - 12, INNER_24H_RADIUS);
                  const isActive = h === time.hour;
                  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                    "button",
                    {
                      type: "button",
                      "aria-label": `${h}:00`,
                      role: "radio",
                      "aria-checked": isActive,
                      tabIndex: h === rovingDialValue ? 0 : -1,
                      "data-dial-value": h,
                      onClick: (event) => setHour24(h, event.detail > 0),
                      onKeyDown: (event) => handleDialKeyDown(event, h),
                      style: { left: x - 24, top: y - 24 },
                      className: "m3-state m3-focus absolute z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full outline-none",
                      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                        "span",
                        {
                          className: cn(
                            isActive ? "text-m3-on-primary" : "text-m3-on-surface",
                            "md-body-large tabular-nums"
                          ),
                          children: pad2(h)
                        }
                      )
                    },
                    `h${h}`
                  );
                })
              ] }) : (
                /* Hour / minute numbers (48px hit areas; adjacent centers ≈ 54px apart) */
                DIAL_POSITIONS.map((n) => {
                  const { x, y } = dialPosition(n);
                  const label = mode === "hour" ? String(n) : pad2(n * 5 % 60);
                  const isActive = mode === "hour" ? n === hour12 : n * 5 % 60 === time.minute;
                  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                    "button",
                    {
                      type: "button",
                      "aria-label": mode === "hour" ? `${n} hours` : `${n * 5 % 60} minutes`,
                      role: "radio",
                      "aria-checked": isActive,
                      tabIndex: (mode === "hour" ? n : n * 5 % 60) === rovingDialValue ? 0 : -1,
                      "data-dial-value": mode === "hour" ? n : n * 5 % 60,
                      onClick: (event) => handleNumberClick(n, event.detail > 0),
                      onKeyDown: (event) => handleDialKeyDown(event, mode === "hour" ? n : n * 5 % 60),
                      style: { left: x - 24, top: y - 24 },
                      className: "m3-state m3-focus absolute z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full outline-none",
                      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                        "span",
                        {
                          className: cn(
                            isActive ? "text-m3-on-primary" : "text-m3-on-surface",
                            "md-body-large"
                          ),
                          children: label
                        }
                      )
                    },
                    n
                  );
                })
              )
            ]
          }
        )
      ]
    }
  ) });
});
var TimePickerDialog = React44.forwardRef(function TimePickerDialog2({
  open,
  onOpenChange,
  value,
  defaultValue,
  onChange,
  initialDisplayMode,
  use24h,
  confirmLabel,
  dismissLabel,
  onConfirm,
  onDismiss,
  className
}, ref) {
  const reduceMotion = _nullishCoalesce(_framermotion.useReducedMotion.call(void 0, ), () => ( false));
  const panelRef = React44.useRef(null);
  const restoreFocusRef = React44.useRef(null);
  const sourceHour = _nullishCoalesce(_nullishCoalesce(_optionalChain([value, 'optionalAccess', _297 => _297.hour]), () => ( _optionalChain([defaultValue, 'optionalAccess', _298 => _298.hour]))), () => ( 0));
  const sourceMinute = _nullishCoalesce(_nullishCoalesce(_optionalChain([value, 'optionalAccess', _299 => _299.minute]), () => ( _optionalChain([defaultValue, 'optionalAccess', _300 => _300.minute]))), () => ( 0));
  const source = React44.useMemo(
    () => validateTime({ hour: sourceHour, minute: sourceMinute }),
    [sourceHour, sourceMinute]
  );
  const [staged, setStaged] = React44.useState(() => validateTime(source));
  const [mode, setMode] = React44.useState(initialDisplayMode);
  const setPanelRef = React44.useCallback(
    (node) => {
      panelRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );
  React44.useEffect(() => {
    if (!open) return;
    setStaged(validateTime(source));
    setMode(initialDisplayMode);
  }, [initialDisplayMode, open, source]);
  React44.useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => _optionalChain([panelRef, 'access', _301 => _301.current, 'optionalAccess', _302 => _302.focus, 'call', _303 => _303()]));
    const handleEscape = (event) => {
      if (event.key !== "Escape") return;
      _optionalChain([onDismiss, 'optionalCall', _304 => _304()]);
      _optionalChain([onOpenChange, 'optionalCall', _305 => _305(false)]);
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
      _optionalChain([restoreFocusRef, 'access', _306 => _306.current, 'optionalAccess', _307 => _307.focus, 'optionalCall', _308 => _308()]);
    };
  }, [onDismiss, onOpenChange, open]);
  const dismiss = () => {
    _optionalChain([onDismiss, 'optionalCall', _309 => _309()]);
    _optionalChain([onOpenChange, 'optionalCall', _310 => _310(false)]);
  };
  const confirm = () => {
    _optionalChain([onChange, 'optionalCall', _311 => _311(staged)]);
    _optionalChain([onConfirm, 'optionalCall', _312 => _312(staged)]);
    _optionalChain([onOpenChange, 'optionalCall', _313 => _313(false)]);
  };
  const nextMode = mode === "dial" ? "input" : mode === "input" ? "scroll" : "dial";
  const handleTab = (event) => {
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusable = Array.from(panelRef.current.querySelectorAll(FOCUSABLE3));
    if (focusable.length === 0) {
      event.preventDefault();
      panelRef.current.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: open && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "fixed inset-0 z-[80] flex items-center justify-center p-4", children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      _framermotion.motion.button,
      {
        type: "button",
        "aria-label": "Dismiss time picker",
        onClick: dismiss,
        className: "absolute inset-0 cursor-default bg-m3-scrim/32",
        initial: reduceMotion ? false : { opacity: 0 },
        animate: { opacity: 1 },
        exit: reduceMotion ? { opacity: 1 } : { opacity: 0 },
        transition: reduceMotion ? { duration: 0 } : void 0
      }
    ),
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0,
      _framermotion.motion.div,
      {
        ref: setPanelRef,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Choose time",
        tabIndex: -1,
        onKeyDown: handleTab,
        className: cn(
          "m3-elevation-3 relative max-h-[calc(100dvh-32px)] overflow-y-auto rounded-[28px] bg-m3-surface-container-high p-6 outline-none",
          className
        ),
        initial: reduceMotion ? false : { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 },
        transition: reduceMotion ? { duration: 0 } : springs.expressive,
        children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
            TimePicker,
            {
              presentation: "inline",
              displayMode: mode,
              value: staged,
              onChange: setStaged,
              use24h,
              className: "m3-elevation-0 rounded-none bg-transparent p-0"
            }
          ),
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "mt-4 flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
              "button",
              {
                type: "button",
                "aria-label": `Switch to ${nextMode} mode`,
                onClick: () => setMode(nextMode),
                className: "m3-state m3-focus grid h-12 w-12 place-items-center rounded-full text-m3-on-surface-variant outline-none",
                children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                  MaterialSymbol,
                  {
                    icon: nextMode === "dial" ? "schedule" : nextMode === "input" ? "keyboard" : "swap_vert"
                  }
                )
              }
            ),
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                "button",
                {
                  type: "button",
                  onClick: dismiss,
                  className: "m3-state m3-focus h-12 rounded-full px-4 md-label-large text-m3-primary outline-none",
                  children: dismissLabel
                }
              ),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
                "button",
                {
                  type: "button",
                  onClick: confirm,
                  className: "m3-state m3-focus h-12 rounded-full px-4 md-label-large text-m3-primary outline-none",
                  children: confirmLabel
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] }) });
});
TimePickerDialog.displayName = "TimePickerDialog";
var TimePicker = React44.forwardRef(function TimePicker2({
  presentation = "inline",
  open = false,
  onOpenChange,
  confirmLabel = "OK",
  dismissLabel = "Cancel",
  onConfirm,
  onDismiss,
  displayMode = "dial",
  value,
  defaultValue,
  onChange,
  use24h,
  className,
  ...props
}, ref) {
  const [internalModalValue, setInternalModalValue] = React44.useState(defaultValue);
  const activeModalValue = _nullishCoalesce(value, () => ( internalModalValue));
  const handleModalChange = React44.useCallback(
    (next) => {
      if (value === void 0) setInternalModalValue(next);
      _optionalChain([onChange, 'optionalCall', _314 => _314(next)]);
    },
    [onChange, value]
  );
  if (presentation === "modal") {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
      TimePickerDialog,
      {
        ref,
        open,
        onOpenChange,
        value: activeModalValue,
        onChange: handleModalChange,
        initialDisplayMode: displayMode === "horizontal" ? "dial" : displayMode,
        use24h,
        confirmLabel,
        dismissLabel,
        onConfirm,
        onDismiss,
        className
      }
    );
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0,
    TimePickerInline,
    {
      ref,
      value,
      defaultValue,
      onChange,
      displayMode,
      use24h,
      className,
      ...props
    }
  );
});

// ../../src/lib/m3/types.ts
var categoryLabels = {
  actions: "Actions",
  communication: "Communication",
  containment: "Containment",
  selection: "Selection",
  textinput: "Text input",
  navigation: "Navigation"
};

// ../../src/lib/m3/registry.ts
var COMPONENT_DIR = "src/components/m3";
var TABLE = [
  { meta: buttonMeta, file: "Button" },
  { meta: iconButtonMeta, file: "IconButton" },
  { meta: fabMeta, file: "FAB" },
  { meta: extendedFabMeta, file: "ExtendedFab" },
  { meta: fabMenuMeta, file: "FabMenu" },
  { meta: splitButtonMeta, file: "SplitButton" },
  { meta: buttonGroupMeta, file: "ButtonGroup" },
  { meta: segmentedButtonMeta, file: "SegmentedButton" },
  { meta: badgeMeta, file: "Badge" },
  { meta: linearProgressMeta, file: "LinearProgress" },
  { meta: circularProgressMeta, file: "CircularProgress" },
  { meta: loadingIndicatorMeta, file: "LoadingIndicator" },
  { meta: snackbarMeta, file: "Snackbar" },
  { meta: tooltipMeta, file: "Tooltip" },
  { meta: bannerMeta, file: "Banner" },
  { meta: dialogMeta, file: "Dialog" },
  { meta: dividerMeta, file: "Divider" },
  { meta: cardMeta, file: "Card" },
  { meta: listMeta, file: "List" },
  { meta: bottomSheetMeta, file: "BottomSheet" },
  { meta: sideSheetMeta, file: "SideSheet" },
  { meta: carouselMeta, file: "Carousel" },
  { meta: textFieldMeta, file: "TextField" },
  { meta: searchBarMeta, file: "SearchBar" },
  { meta: searchViewMeta, file: "SearchView" },
  { meta: autocompleteMeta, file: "Autocomplete" },
  { meta: checkboxMeta, file: "Checkbox" },
  { meta: radioMeta, file: "Radio" },
  { meta: switchMeta, file: "Switch" },
  { meta: sliderMeta, file: "Slider" },
  { meta: chipMeta, file: "Chip" },
  { meta: tabsMeta, file: "Tabs" },
  { meta: navigationBarMeta, file: "NavigationBar" },
  { meta: navigationDrawerMeta, file: "NavigationDrawer" },
  { meta: navigationRailMeta, file: "NavigationRail" },
  { meta: topAppBarMeta, file: "TopAppBar" },
  { meta: bottomAppBarMeta, file: "BottomAppBar" },
  { meta: toolbarMeta, file: "Toolbar" },
  { meta: menuMeta, file: "Menu" },
  { meta: datePickerMeta, file: "DatePicker" },
  { meta: timePickerMeta, file: "TimePicker" }
];
var REGISTRY_VERSION = "1.0.0";
var m3Registry = {
  library: "m3-expressive-react",
  version: REGISTRY_VERSION,
  description: "A Material 3 and Material 3 Expressive React component library with 39 official component implementations plus two clearly labeled composites retained for compatibility: Banner (Material 2 / Flutter heritage) and Autocomplete (text-field + combobox). Every entry ships with structured design-guideline metadata for agentic consumption.",
  spec: "https://m3.material.io",
  totalCount: TABLE.length,
  categories: ["actions", "communication", "containment", "selection", "textinput", "navigation"],
  components: TABLE.map((row) => ({
    ...row.meta,
    file: `${COMPONENT_DIR}/${row.file}.tsx`
  }))
};
function getComponent(id) {
  return m3Registry.components.find((c) => c.id === id);
}
function getComponentsByCategory(category) {
  return m3Registry.components.filter((c) => c.category === category);
}
function searchComponents(query) {
  const q = query.trim().toLowerCase();
  if (!q) return m3Registry.components;
  return m3Registry.components.filter((c) => {
    const haystack = [
      c.id,
      c.name,
      c.description,
      categoryLabels[c.category],
      ..._nullishCoalesce(c.variants, () => ( [])),
      ...c.props.map((p) => p.name)
    ].join(" ").toLowerCase();
    return haystack.includes(q);
  });
}

// ../../src/lib/m3/themes.ts
var errorLight = {
  error: "#B3261E",
  onError: "#FFFFFF",
  errorContainer: "#F9DEDC",
  onErrorContainer: "#410E0B"
};
var errorDark = {
  error: "#F2B8B5",
  onError: "#601410",
  errorContainer: "#8C1D18",
  onErrorContainer: "#F9DEDC"
};
var baseline = {
  id: "baseline",
  label: "Material Violet",
  description: "The official Material 3 baseline scheme \u2014 the reference purple used across m3.material.io and the Expressive announcement.",
  seed: "#6750A4",
  light: {
    primary: "#6750A4",
    onPrimary: "#FFFFFF",
    primaryContainer: "#E9DDFF",
    onPrimaryContainer: "#22005D",
    secondary: "#625B71",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#E8DEF8",
    onSecondaryContainer: "#1E192B",
    tertiary: "#7E5260",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#FFD9E2",
    onTertiaryContainer: "#31101D",
    ...errorLight,
    surface: "#FEF7FF",
    onSurface: "#1D1B20",
    surfaceVariant: "#E7E0EC",
    onSurfaceVariant: "#49454F",
    surfaceDim: "#DED8E1",
    surfaceBright: "#FEF7FF",
    surfaceContainerLowest: "#FFFFFF",
    surfaceContainerLow: "#F7F2FA",
    surfaceContainer: "#F3EDF7",
    surfaceContainerHigh: "#ECE6F0",
    surfaceContainerHighest: "#E6E0E9",
    outline: "#79747E",
    outlineVariant: "#CAC4D0",
    inverseSurface: "#322F35",
    inverseOnSurface: "#F5EFF7",
    inversePrimary: "#D0BCFF",
    scrim: "#000000",
    shadow: "#000000"
  },
  dark: {
    primary: "#D0BCFF",
    onPrimary: "#381E72",
    primaryContainer: "#4F378B",
    onPrimaryContainer: "#EADDFF",
    secondary: "#CCC2DC",
    onSecondary: "#332D41",
    secondaryContainer: "#4A4458",
    onSecondaryContainer: "#E8DEF8",
    tertiary: "#EFB8C8",
    onTertiary: "#492532",
    tertiaryContainer: "#633B48",
    onTertiaryContainer: "#FFD9E2",
    ...errorDark,
    surface: "#141218",
    onSurface: "#E6E0E9",
    surfaceVariant: "#49454F",
    onSurfaceVariant: "#CAC4D0",
    surfaceDim: "#141218",
    surfaceBright: "#3B383E",
    surfaceContainerLowest: "#0F0D13",
    surfaceContainerLow: "#1D1B20",
    surfaceContainer: "#211F26",
    surfaceContainerHigh: "#2B2930",
    surfaceContainerHighest: "#36343B",
    outline: "#938F99",
    outlineVariant: "#49454F",
    inverseSurface: "#E6E0E9",
    inverseOnSurface: "#322F35",
    inversePrimary: "#6750A4",
    scrim: "#000000",
    shadow: "#000000"
  },
  swatch: ["#6750A4", "#D0BCFF", "#7E5260", "#FFD9E2"]
};
var ocean = {
  id: "ocean",
  label: "Ocean Blue",
  description: "A confident blue scheme generated from a Google-blue seed. Calm neutrals with a cool cast and a pink-lavender tertiary accent.",
  seed: "#0B57D0",
  light: {
    primary: "#0B57D0",
    onPrimary: "#FFFFFF",
    primaryContainer: "#D3E3FD",
    onPrimaryContainer: "#041E49",
    secondary: "#575E71",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#DBE2F9",
    onSecondaryContainer: "#141B2C",
    tertiary: "#725572",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#FDD7FA",
    onTertiaryContainer: "#2A122A",
    ...errorLight,
    surface: "#F9F9FF",
    onSurface: "#191C20",
    surfaceVariant: "#E0E2EC",
    onSurfaceVariant: "#44474E",
    surfaceDim: "#D9D9E0",
    surfaceBright: "#F9F9FF",
    surfaceContainerLowest: "#FFFFFF",
    surfaceContainerLow: "#F3F3FA",
    surfaceContainer: "#EDEFF6",
    surfaceContainerHigh: "#E7E9F1",
    surfaceContainerHighest: "#E2E4EB",
    outline: "#74777F",
    outlineVariant: "#C4C6D0",
    inverseSurface: "#2E3036",
    inverseOnSurface: "#F1F0F7",
    inversePrimary: "#A8C7FA",
    scrim: "#000000",
    shadow: "#000000"
  },
  dark: {
    primary: "#A8C7FA",
    onPrimary: "#062E6F",
    primaryContainer: "#0842A0",
    onPrimaryContainer: "#D3E3FD",
    secondary: "#BFC6DC",
    onSecondary: "#293042",
    secondaryContainer: "#3F4759",
    onSecondaryContainer: "#DBE2F9",
    tertiary: "#E2B9DC",
    onTertiary: "#422A41",
    tertiaryContainer: "#5A4159",
    onTertiaryContainer: "#FDD7FA",
    ...errorDark,
    surface: "#111318",
    onSurface: "#E2E2E9",
    surfaceVariant: "#44474E",
    onSurfaceVariant: "#C4C6D0",
    surfaceDim: "#111318",
    surfaceBright: "#37393E",
    surfaceContainerLowest: "#0C0E13",
    surfaceContainerLow: "#191C20",
    surfaceContainer: "#1D2024",
    surfaceContainerHigh: "#282A2F",
    surfaceContainerHighest: "#33353A",
    outline: "#8E9099",
    outlineVariant: "#44474E",
    inverseSurface: "#E2E2E9",
    inverseOnSurface: "#2E3036",
    inversePrimary: "#0B57D0",
    scrim: "#000000",
    shadow: "#000000"
  },
  swatch: ["#0B57D0", "#A8C7FA", "#725572", "#FDD7FA"]
};
var emerald = {
  id: "emerald",
  label: "Emerald Fresh",
  description: "A vivid green scheme with warm gray neutrals and a teal tertiary. Reads as fresh, natural and energetic in both modes.",
  seed: "#006E1C",
  light: {
    primary: "#006E1C",
    onPrimary: "#FFFFFF",
    primaryContainer: "#94F990",
    onPrimaryContainer: "#002204",
    secondary: "#52634F",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#D5E8CF",
    onSecondaryContainer: "#101F10",
    tertiary: "#38656A",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#BCEBF0",
    onTertiaryContainer: "#002023",
    ...errorLight,
    surface: "#F7FBF2",
    onSurface: "#191D17",
    surfaceVariant: "#DEE5D8",
    onSurfaceVariant: "#424940",
    surfaceDim: "#D7DBD2",
    surfaceBright: "#F7FBF2",
    surfaceContainerLowest: "#FFFFFF",
    surfaceContainerLow: "#F1F5EC",
    surfaceContainer: "#EBEFE6",
    surfaceContainerHigh: "#E6EAE1",
    surfaceContainerHighest: "#E0E4DB",
    outline: "#72796F",
    outlineVariant: "#C2C9BD",
    inverseSurface: "#2E322B",
    inverseOnSurface: "#EFF2E9",
    inversePrimary: "#79DC77",
    scrim: "#000000",
    shadow: "#000000"
  },
  dark: {
    primary: "#79DC77",
    onPrimary: "#00390A",
    primaryContainer: "#005313",
    onPrimaryContainer: "#94F990",
    secondary: "#B9CCB4",
    onSecondary: "#243424",
    secondaryContainer: "#3A4B39",
    onSecondaryContainer: "#D5E8CF",
    tertiary: "#A0CFD4",
    onTertiary: "#00363B",
    tertiaryContainer: "#1F4D52",
    onTertiaryContainer: "#BCEBF0",
    ...errorDark,
    surface: "#10140F",
    onSurface: "#E0E4DB",
    surfaceVariant: "#424940",
    onSurfaceVariant: "#C2C9BD",
    surfaceDim: "#10140F",
    surfaceBright: "#363A34",
    surfaceContainerLowest: "#0B0F0A",
    surfaceContainerLow: "#191D17",
    surfaceContainer: "#1D211B",
    surfaceContainerHigh: "#272B25",
    surfaceContainerHighest: "#323630",
    outline: "#8C9388",
    outlineVariant: "#424940",
    inverseSurface: "#E0E4DB",
    inverseOnSurface: "#2E322B",
    inversePrimary: "#006E1C",
    scrim: "#000000",
    shadow: "#000000"
  },
  swatch: ["#006E1C", "#79DC77", "#38656A", "#BCEBF0"]
};
var coral = {
  id: "coral",
  label: "Warm Coral",
  description: "A warm, expressive scheme from the signature M3E orange accent. Toasty neutrals with an olive tertiary for contrast.",
  seed: "#FB7C41",
  light: {
    primary: "#96490B",
    onPrimary: "#FFFFFF",
    primaryContainer: "#FFDCC2",
    onPrimaryContainer: "#331200",
    secondary: "#74593F",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#FFDCC2",
    onSecondaryContainer: "#2A1707",
    tertiary: "#5C6236",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#E0E8B7",
    onTertiaryContainer: "#1A1D00",
    ...errorLight,
    surface: "#FFF8F5",
    onSurface: "#221A15",
    surfaceVariant: "#F3DFD1",
    onSurfaceVariant: "#52443A",
    surfaceDim: "#E8D7CC",
    surfaceBright: "#FFF8F5",
    surfaceContainerLowest: "#FFFFFF",
    surfaceContainerLow: "#FFF1E8",
    surfaceContainer: "#FFE9DC",
    surfaceContainerHigh: "#F9E2D4",
    surfaceContainerHighest: "#F3DCCC",
    outline: "#84736A",
    outlineVariant: "#D7C2B4",
    inverseSurface: "#382E29",
    inverseOnSurface: "#FFEDE3",
    inversePrimary: "#FFB68B",
    scrim: "#000000",
    shadow: "#000000"
  },
  dark: {
    primary: "#FFB68B",
    onPrimary: "#522300",
    primaryContainer: "#753500",
    onPrimaryContainer: "#FFDCC2",
    secondary: "#E2BFA4",
    onSecondary: "#422B15",
    secondaryContainer: "#5A412A",
    onSecondaryContainer: "#FFDCC2",
    tertiary: "#C4CC9D",
    onTertiary: "#2E3300",
    tertiaryContainer: "#444A20",
    onTertiaryContainer: "#E0E8B7",
    ...errorDark,
    surface: "#1A120D",
    onSurface: "#F1DFD4",
    surfaceVariant: "#52443A",
    onSurfaceVariant: "#D7C2B4",
    surfaceDim: "#1A120D",
    surfaceBright: "#423934",
    surfaceContainerLowest: "#140C08",
    surfaceContainerLow: "#221A15",
    surfaceContainer: "#281E18",
    surfaceContainerHigh: "#332822",
    surfaceContainerHighest: "#3F332C",
    outline: "#9C8378",
    outlineVariant: "#52443A",
    inverseSurface: "#F1DFD4",
    inverseOnSurface: "#382E29",
    inversePrimary: "#96490B",
    scrim: "#000000",
    shadow: "#000000"
  },
  swatch: ["#96490B", "#FFB68B", "#5C6236", "#E0E8B7"]
};
var m3Themes = [baseline, ocean, emerald, coral];
var defaultThemeId = "baseline";
function getTheme(id) {
  return m3Themes.find((t) => t.id === id);
}
var themeIds = m3Themes.map((t) => t.id);
function schemeToCssVars(scheme) {
  const out = {};
  for (const [key, value] of Object.entries(scheme)) {
    const kebab = key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    out[`--md-${kebab}`] = value;
  }
  return out;
}












































































































exports.Autocomplete = Autocomplete; exports.Badge = Badge; exports.Banner = Banner; exports.BottomAppBar = BottomAppBar; exports.BottomSheet = BottomSheet; exports.Button = Button; exports.ButtonGroup = ButtonGroup; exports.Card = Card; exports.Carousel = Carousel; exports.Checkbox = Checkbox; exports.Chip = Chip; exports.ChipGroup = ChipGroup; exports.CircularProgress = CircularProgress; exports.DatePicker = DatePicker; exports.Dialog = Dialog; exports.Divider = Divider; exports.ExtendedFab = ExtendedFab; exports.Fab = Fab; exports.FabMenu = FabMenu; exports.IconButton = IconButton; exports.LinearProgress = LinearProgress; exports.List = List; exports.ListItem = ListItem; exports.LoadingIndicator = LoadingIndicator; exports.MaterialSymbol = MaterialSymbol; exports.Menu = Menu; exports.NavigationBar = NavigationBar; exports.NavigationDrawer = NavigationDrawer; exports.NavigationRail = NavigationRail; exports.Radio = Radio; exports.RadioGroup = RadioGroup; exports.Ripple = Ripple; exports.SearchBar = SearchBar; exports.SearchView = SearchView; exports.SegmentedButton = SegmentedButton; exports.SideSheet = SideSheet; exports.Slider = Slider; exports.Snackbar = Snackbar; exports.SplitButton = SplitButton; exports.Switch = Switch; exports.Tabs = Tabs; exports.TextField = TextField; exports.TimePicker = TimePicker; exports.Toolbar = Toolbar3; exports.Tooltip = Tooltip; exports.TopAppBar = TopAppBar; exports.autocompleteMeta = autocompleteMeta; exports.badgeMeta = badgeMeta; exports.bannerMeta = bannerMeta; exports.bottomAppBarMeta = bottomAppBarMeta; exports.bottomSheetMeta = bottomSheetMeta; exports.buttonGroupMeta = buttonGroupMeta; exports.buttonMeta = buttonMeta; exports.cardMeta = cardMeta; exports.carouselMeta = carouselMeta; exports.categoryLabels = categoryLabels; exports.checkboxMeta = checkboxMeta; exports.chipMeta = chipMeta; exports.circularProgressMeta = circularProgressMeta; exports.colorRoles = colorRoles; exports.colorVar = colorVar; exports.datePickerMeta = datePickerMeta; exports.defaultThemeId = defaultThemeId; exports.dialogMeta = dialogMeta; exports.dividerMeta = dividerMeta; exports.durations = durations; exports.easings = easings; exports.elevations = elevations; exports.extendedFabMeta = extendedFabMeta; exports.fabMenuMeta = fabMenuMeta; exports.fabMeta = fabMeta; exports.getComponent = getComponent; exports.getComponentsByCategory = getComponentsByCategory; exports.getTheme = getTheme; exports.iconButtonMeta = iconButtonMeta; exports.linearProgressMeta = linearProgressMeta; exports.listMeta = listMeta; exports.loadingIndicatorMeta = loadingIndicatorMeta; exports.m3Registry = m3Registry; exports.m3Themes = m3Themes; exports.menuMeta = menuMeta; exports.navigationBarMeta = navigationBarMeta; exports.navigationDrawerMeta = navigationDrawerMeta; exports.navigationRailMeta = navigationRailMeta; exports.radioMeta = radioMeta; exports.schemeToCssVars = schemeToCssVars; exports.searchBarMeta = searchBarMeta; exports.searchComponents = searchComponents; exports.searchViewMeta = searchViewMeta; exports.segmentedButtonMeta = segmentedButtonMeta; exports.shapeMorph = shapeMorph; exports.shapes = shapes; exports.sideSheetMeta = sideSheetMeta; exports.sliderMeta = sliderMeta; exports.snackbarMeta = snackbarMeta; exports.splitButtonMeta = splitButtonMeta; exports.springs = springs; exports.stateOpacities = stateOpacities; exports.switchMeta = switchMeta; exports.tabsMeta = tabsMeta; exports.textFieldMeta = textFieldMeta; exports.themeIds = themeIds; exports.timePickerMeta = timePickerMeta; exports.toolbarMeta = toolbarMeta; exports.tooltipMeta = tooltipMeta; exports.topAppBarMeta = topAppBarMeta; exports.typeScale = typeScale;
