"use client";
"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }"use client";

// ../../src/components/m3/Button.tsx
var _react = require('react'); var React3 = _interopRequireWildcard(_react); var React = _interopRequireWildcard(_react); var React2 = _interopRequireWildcard(_react); var React4 = _interopRequireWildcard(_react); var React5 = _interopRequireWildcard(_react); var React6 = _interopRequireWildcard(_react); var React7 = _interopRequireWildcard(_react); var React8 = _interopRequireWildcard(_react); var React9 = _interopRequireWildcard(_react); var React10 = _interopRequireWildcard(_react); var React11 = _interopRequireWildcard(_react); var React12 = _interopRequireWildcard(_react); var React13 = _interopRequireWildcard(_react); var React14 = _interopRequireWildcard(_react); var React15 = _interopRequireWildcard(_react); var React16 = _interopRequireWildcard(_react); var React17 = _interopRequireWildcard(_react); var React18 = _interopRequireWildcard(_react); var React19 = _interopRequireWildcard(_react); var React20 = _interopRequireWildcard(_react); var React21 = _interopRequireWildcard(_react); var React22 = _interopRequireWildcard(_react); var React23 = _interopRequireWildcard(_react); var React24 = _interopRequireWildcard(_react); var React25 = _interopRequireWildcard(_react); var React26 = _interopRequireWildcard(_react); var React27 = _interopRequireWildcard(_react); var React28 = _interopRequireWildcard(_react); var React29 = _interopRequireWildcard(_react); var React30 = _interopRequireWildcard(_react); var React31 = _interopRequireWildcard(_react); var React32 = _interopRequireWildcard(_react); var React33 = _interopRequireWildcard(_react); var React34 = _interopRequireWildcard(_react); var React35 = _interopRequireWildcard(_react);
var _framermotion = require('framer-motion');

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
function Ripple({ className, disabled }) {
  const hostRef = React.useRef(null);
  const [items, setItems] = React.useState([]);
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
  }, []);
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
}
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

// ../../src/lib/m3/meta.ts
var buttonGroupMeta = {
  id: "button-group",
  name: "Button group",
  category: "actions",
  description: "New in Material 3 Expressive: a connected group of pill buttons that share a 4px gutter and act or select together. M3E's variable-width treatment lets the hovered segment playfully grow with a layout spring.",
  importLine: `import { ButtonGroup } from "@/components/m3";`,
  variants: ["outlined", "filled", "tonal"],
  props: [
    { name: "buttons", type: `{ id: string; label?: string; icon?: string; onClick?: () => void }[]`, description: "Segments of the group, keyed by id." },
    { name: "variant", type: `'outlined' | 'filled' | 'tonal'`, default: `'outlined'`, description: "Base emphasis of unselected segments." },
    { name: "selection", type: `'none' | 'single' | 'multiple'`, default: `'none'`, description: "Whether segments act independently or track selection." },
    { name: "value", type: `string[]`, description: "Controlled selected ids; omit for uncontrolled state." },
    { name: "onValueChange", type: `(value: string[]) => void`, description: "Called with the next selected ids." },
    { name: "variableWidths", type: `boolean`, default: `false`, description: "M3E: hovered/selected segment flex-grows to 1.4 with a spring." },
    { name: "size", type: `'sm' | 'md' | 'lg'`, default: `'md'`, description: "Segment height: 40 / 56 / 76 px." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables every segment: container drops to on-surface 12%, content to 38%." }
  ],
  guidelines: {
    whenToUse: [
      "Use a button group to cluster closely related actions of equal emphasis.",
      "Use selection='single' for mutually exclusive choices, like a time range.",
      "Use selection='multiple' for toggling independent formatting-style options.",
      "Use variableWidths on wide layouts for the expressive hover-growth effect."
    ],
    anatomy: ["4px gutter between segments", "Pill segments (40/56/76px tall)", "State layer + ripple per segment", "Secondary-container selected container", "48dp minimum touch target (invisible ::before extension)"],
    states: ["Unselected (variant colors)", "Selected (secondary-container, transparent border)", "Hover (8% state layer, grows when variableWidths)", "Focus (3px focus ring)", "Pressed (96% scale)", "Disabled (on-surface 12% container / 38% content)"],
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
  description: "A divider is a 1dp thin line that groups content in lists and layouts, separating content into clear groups.",
  importLine: `import { Divider } from "@/components/m3";`,
  variants: ["full-width", "inset-start", "inset-middle", "inset-end", "vertical"],
  props: [
    { name: "inset", type: `'none' | 'start' | 'middle' | 'end'`, default: `'none'`, description: "Horizontal 'start' uses the official M3 list divider insets: 16dp left / 24dp right (the 72dp start inset is the legacy M2 value). 'middle' = 16dp equal indents per the M3 divider guideline; 'end' is a library extension." },
    { name: "thickness", type: `number`, default: `1`, description: "Stroke thickness in px (official 1dp)." },
    { name: "color", type: `'outline' | 'outline-variant'`, default: `'outline-variant'`, description: "Line color role." },
    { name: "orientation", type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: "Direction of the line." }
  ],
  guidelines: {
    whenToUse: [
      "Separate related list items and table rows.",
      "Group sections inside cards, sheets, and dialogs.",
      "Use vertical dividers to split side-by-side content regions."
    ],
    anatomy: ["Divider line (1dp, outline-variant)", "Optional insets (start = 16dp left / 24dp right per the M3 lists spec, middle = 16dp equal indents per the M3 divider guideline, end = 16dp extension)"],
    states: ["Full-width", "Inset (start/middle/end)", "Vertical"],
    dos: [
      "Use inset dividers under list items to align with their text (official 16dp/24dp insets)",
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
<Divider orientation="vertical" />`,
  related: ["card", "list", "navigation-drawer"],
  demoName: "DividerDemo"
};
var datePickerMeta = {
  id: "date-picker",
  name: "Date Picker",
  category: "selection",
  description: "Date pickers let users select a date from a calendar month grid on a surface-container-high panel, with a tappable header that switches to a year grid, ARIA grid semantics with arrow-key day navigation, and clamping via min/max dates. Two presentations share the same calendar internals: the compact inline grid, and the official modal picker \u2014 328\xD7512dp portrait / 568\xD7368dp landscape (viewport \u2265 600px) with a selected-date header, 32% scrim, spring scale+fade entry, live-applied selection and no action buttons.",
  importLine: `import { DatePicker } from "@/components/m3";`,
  variants: ["month-view", "year-view", "modal"],
  props: [
    { name: "value", type: `Date`, description: "Selected date. Uncontrolled when omitted." },
    { name: "onChange", type: `(d: Date) => void`, description: "Fires when a day is picked." },
    { name: "minDate", type: `Date`, description: "Earliest selectable date; earlier days render disabled (38%)." },
    { name: "maxDate", type: `Date`, description: "Latest selectable date; later days render disabled (38%)." },
    { name: "presentation", type: `'inline' | 'modal'`, default: `'inline'`, description: "Embedded calendar grid, or the official modal picker (328\xD7512dp portrait / 568\xD7368dp landscape at viewport \u2265 600px) with selected-date header and 32% scrim." },
    { name: "open", type: `boolean`, description: "Modal only \u2014 controls visibility (fully controlled, like Dialog/SearchView)." },
    { name: "onOpenChange", type: `(open: boolean) => void`, description: "Modal only \u2014 called with the next open state on scrim click, Escape, or day pick." },
    { name: "closeOnSelect", type: `boolean`, default: `true`, description: "Modal only \u2014 close automatically when a day is picked (M3 live-apply; Escape/scrim always dismiss)." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." },
    { name: "className", type: `string`, description: "Extra classes for the container." }
  ],
  guidelines: {
    whenToUse: [
      "Use an inline date picker when choosing a date is the primary in-page task.",
      "Use minDate/maxDate to constrain scheduling to valid ranges.",
      "Pair with a readout chip to show the formatted selected date.",
      'Use presentation="modal" for the official picker dialog \u2014 328\xD7512dp portrait / 568\xD7368dp landscape with selected-date header, 32% scrim and live-apply selection.',
      "Give the modal a text-field-style trigger that echoes the chosen date, and let Escape/scrim dismiss it."
    ],
    anatomy: ["Container (28px corners, surface-container-high)", "Header (month-year label + 48dp prev/next chevron targets)", "ARIA grid: weekday row (label-medium columnheaders) + 6\xD77 day grid (40dp circular cells, roving tabindex)", "Year grid (4 columns)", "Modal: dialog on surface-container-high (28dp corners, elevation 3, no action buttons) \u2014 portrait stacks a header block (label-large \u201CSelected date\u201D + display-small headline + divider) above the calendar; landscape puts the header in a 168dp vertically-centered left column"],
    states: ["Idle day", "Hover (8% state layer)", "Today (primary outline + aria-current)", "Selected (inline: primary pill via layoutId \xB7 modal: primary-container circle, androidx SelectedDateContainerColor)", "Other month (on-surface-variant)", "Disabled (38% opacity)", "Keyboard (arrow keys move focus \xB11 day / \xB11 week, Home/End week bounds, Enter selects)", "Modal open (32% scrim + body scroll locked; scale 0.9\u21921 spring entry; focus moves to the selected/today day, Tab trapped, restored to the opener on close)", "Modal dismissal (Escape / scrim tap always dismiss; day pick applies immediately and closes when closeOnSelect)"],
    dos: [
      "Show the selected date in context next to the picker",
      "Clamp with min/max when dates have real-world constraints",
      "Keep the selected-day pill circular and high-contrast (primary/on-primary)"
    ],
    donts: [
      "Don't force users to scroll years one month at a time \u2014 use the year grid",
      "Don't hide disabled days entirely; dim them to 38%",
      "Don't use the picker for date ranges (extend it deliberately)",
      "Don't add confirm/cancel buttons to the modal \u2014 M3 applies the selection live and Escape/scrim dismiss"
    ]
  },
  exampleCode: `// Inline calendar grid (default)
<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date(2024, 0, 1)}
  maxDate={new Date(2026, 11, 31)}
/>

// Official modal picker (328\xD7512 portrait / 568\xD7368 landscape)
const [open, setOpen] = React.useState(false);
// ...an outlined text-field-style trigger calls setOpen(true)
<DatePicker
  presentation="modal"
  open={open}
  onOpenChange={setOpen}
  value={date}
  onChange={setDate}
/>`,
  related: ["time-picker", "card", "bottom-sheet"],
  demoName: "DatePickerDemo"
};
var sideSheetMeta = {
  id: "side-sheet",
  name: "Side Sheet",
  category: "containment",
  description: "Side sheets are surfaces anchored to the left or right edge used for secondary content like filters or details; modal variants overlay a 32% scrim, standard variants sit inline with the layout on surface. The official 16dp radius rounds the inner (docked) edge only.",
  importLine: `import { SideSheet } from "@/components/m3";`,
  variants: ["modal", "standard"],
  props: [
    { name: "open", type: `boolean`, description: "Controls modal visibility. Ignored by the standard variant." },
    { name: "onClose", type: `() => void`, description: "Called on scrim click or Escape (modal)." },
    { name: "side", type: `'left' | 'right'`, default: `'right'`, description: "Edge the panel is anchored to; corners round on the inner side." },
    { name: "variant", type: `'modal' | 'standard'`, default: `'modal'`, description: "Overlay with scrim, or persistent inline panel." },
    { name: "title", type: `string`, description: "Panel heading (md-title-large) above a divider." },
    { name: "children", type: `React.ReactNode`, description: "Scrollable content." },
    { name: "footer", type: `React.ReactNode`, description: "Pinned footer above a divider." },
    { name: "width", type: `number`, default: `360`, description: "Panel width in px (official max-width 400dp; values above 400 are clamped)." },
    { name: "className", type: `string`, description: "Extra classes for the panel." }
  ],
  guidelines: {
    whenToUse: [
      "Use side sheets for supplemental tasks (filters, details, settings) alongside main content.",
      "Use the modal variant on small screens where the sheet must take focus.",
      "Use the standard variant in split-view layouts where content stays visible."
    ],
    anatomy: ["Panel (modal: surface-container-low at elevation 1 \xB7 standard: surface, 16dp inner-edge corners only \u2014 edge corners stay square \xB7 24dp padding \xB7 width 360dp capped at 400dp)", "Title + 12dp gap + divider", "Scrollable content", "Optional footer"],
    states: ["Hidden", "Enter (spring x \xB1100% \u2192 0)", "Open (32% scrim + body scroll locked for modal; focus moves into the sheet, Tab is trapped and restored to the trigger on close)", "Closed (scrim tap / Escape)"],
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
  exampleCode: `<SideSheet open={open} onClose={() => setOpen(false)} side="right" title="Filters">
  <List>{filterItems}</List>
</SideSheet>
<SideSheet variant="standard" open={false} onClose={() => {}} title="Details">
  {inlineContent}
</SideSheet>`,
  related: ["bottom-sheet", "card", "list"],
  demoName: "SideSheetDemo"
};
var dialogMeta = {
  id: "dialog",
  name: "Dialog",
  category: "containment",
  description: "Dialogs inform users about a task and can contain critical information or require decisions \u2014 a modal surface over a 32% scrim that blocks interaction until resolved. Focus is trapped inside while open and returns to the trigger on close.",
  importLine: `import { Dialog } from "@/components/m3";`,
  variants: ["basic", "fullscreen", "dismissible", "non-dismissible"],
  props: [
    { name: "open", type: `boolean`, description: "Controls visibility." },
    { name: "onClose", type: `() => void`, description: "Scrim click / Escape / dismiss handler." },
    { name: "icon", type: `string`, description: "Material Symbol above the headline." },
    { name: "headline", type: `string`, description: "Dialog headline (headline-small)." },
    { name: "children", type: `React.ReactNode`, description: "Supporting body content (body-medium)." },
    { name: "actions", type: `React.ReactNode`, description: "Right-aligned action buttons." },
    { name: "fullscreen", type: `boolean`, default: `false`, description: "Edge-to-edge variant for immersive tasks." },
    { name: "dismissible", type: `boolean`, default: `true`, description: "false forces an explicit action choice." }
  ],
  guidelines: {
    whenToUse: [
      "Require an explicit decision (confirm destructive actions like delete or reset).",
      "Present critical information that interrupts the current flow.",
      "Use fullscreen for immersive creation or editing tasks."
    ],
    anatomy: ["Scrim (32% over page)", "Surface (surface-container-high, 28dp corners, elevation 3, min 280dp / max 560dp wide, 24dp padding)", "Optional icon (24dp primary, centered above the headline; the headline center-aligns with it, start-aligns without)", "Headline (headline-small)", "Body (body-medium, on-surface-variant, wired via aria-describedby)", "Action row (text buttons, right-aligned, 8dp gap, 24dp above / 24dp sides+below)"],
    states: ["Entering (scale 0.9 \u2192 1 with expressive spring)", "Open (32% scrim, body scroll locked, focus trapped)", "Dismiss (Escape / scrim tap when dismissible; focus returns to the trigger)", "Exiting"],
    dos: [
      "Keep dialogs focused on one decision",
      "Order actions: dismissive (text) left, confirmatory (filled) right",
      "Use non-dismissible mode only when a choice is truly required",
      "Give the dialog a headline so aria-labelledby announces it"
    ],
    donts: [
      "Don't open dialogs from dialogs",
      "Don't use dialogs for long, scrollable content \u2014 use a side sheet",
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
  importLine: `import { Snackbar } from "@/components/m3";`,
  variants: ["with-action", "with-icon", "sticky"],
  props: [
    { name: "open", type: `boolean`, description: "Controls visibility." },
    { name: "message", type: `string`, description: "The brief confirmation text." },
    { name: "icon", type: `string`, description: "Leading Material Symbol name (extension \u2014 the base M3 anatomy is text + action + close only)." },
    { name: "actionLabel", type: `string`, description: 'Trailing text action label, e.g. "Undo".' },
    { name: "onAction", type: `() => void`, description: "Action press handler." },
    { name: "onClose", type: `() => void`, description: "Dismiss handler (auto-dismiss + close icon)." },
    { name: "duration", type: `number`, default: `4000`, description: "Auto-dismiss in ms; 0 = sticky." }
  ],
  guidelines: {
    whenToUse: [
      'Confirm completed background actions ("Photo archived") with an optional undo.',
      "Surface transient, low-priority status that doesn't require a response.",
      "Pair with a text action to let users reverse the change."
    ],
    anatomy: ["Inverse-surface container (4dp corners, elevation 3, min 344px / max 672px per the official web spec)", "Optional leading icon (extension)", "Message (body-medium)", "Text action (inverse-primary, label-large)", "Close control (18px icon on a 36px target)"],
    states: ["Entering (spring up from bottom)", "Visible (4s auto-dismiss)", "Exiting (spring down)"],
    dos: [
      "Keep messages to one or two short sentences",
      'Offer at most one text action \u2014 usually "Undo"',
      "Let snackbars dismiss on their own; don't stack them"
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
  description: "Navigation drawers provide ergonomic access to destinations in an app. The modal variant slides over a scrim on compact screens; the standard variant docks as a static panel. Active items carry a spring-animated tonal pill.",
  importLine: `import { NavigationDrawer } from "@/components/m3";`,
  variants: ["modal", "standard"],
  props: [
    { name: "items", type: `NavItem[]`, description: "Destinations: value, label, optional icon, optional trailing badge." },
    { name: "value", type: `string`, description: "Controlled selected destination value." },
    { name: "onChange", type: `(v: string) => void`, description: "Called with the newly selected value." },
    { name: "variant", type: `'modal' | 'standard'`, default: `'modal'`, description: "Modal overlays with a 32% scrim; standard docks statically. Official container width is 360dp for both." },
    { name: "open", type: `boolean`, description: "Controls the modal drawer. Omit for uncontrolled (starts closed)." },
    { name: "onClose", type: `() => void`, description: "Fired on scrim click or Escape." },
    { name: "header", type: `ReactNode`, description: "Headline area above the destination list." },
    { name: "footer", type: `ReactNode`, description: "Content pinned to the bottom of the drawer." },
    { name: "fullHeight", type: `boolean`, default: `false`, description: "Stretch the standard drawer to container height." }
  ],
  guidelines: {
    whenToUse: [
      "Use a modal drawer for compact screens or transient navigation over content.",
      "Use a standard drawer on medium/large screens where navigation is always reachable.",
      "Group 5\u201310 destinations; overflow into a 'More' item rather than scrolling."
    ],
    anatomy: ["Container (360dp wide, surface-container-low, 16dp trailing corners)", "Scrim (modal only, 32%)", "Destination rows (56dp full-width pill, 24dp icon + label + optional badge)", "Optional header (label-large headline) and footer slots"],
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
  header={<span className="md-title-large">Mail</span>}
  items={[{ value: "inbox", icon: "inbox", label: "Inbox", badge: 24 }]}
/>`,
  related: ["navigation-bar", "navigation-rail", "menu"],
  demoName: "NavigationDrawerDemo"
};
var listMeta = {
  id: "list",
  name: "List",
  category: "containment",
  description: "Lists are continuous, vertical indexes of text or images, composed of one-line, two-line, or three-line items with optional leading icons, avatars and trailing metadata.",
  importLine: `import { List, ListItem } from "@/components/m3";`,
  variants: ["single-line", "two-line", "three-line"],
  props: [
    { name: "dividers", type: `boolean`, default: `false`, description: 'Full-width outline-variant dividers between rows; the official list divider inset (16dp start / 24dp end) is available via <Divider inset="start" />.' },
    { name: "className", type: `string`, description: "Extra classes for the ul container." },
    { name: "children", type: `React.ReactNode`, description: "ListItem rows." },
    { name: "headline", type: `React.ReactNode`, description: "ListItem primary text. Required." },
    { name: "supporting", type: `React.ReactNode`, description: "ListItem secondary text; grows the row to 72dp." },
    { name: "overline", type: `string`, description: "ListItem small text above the headline." },
    { name: "lines", type: `1 | 2 | 3`, description: "Official line count: 56dp / 72dp / 88dp rows. Defaults to 2 when supporting/overline is set; 3 wraps supporting to two lines and top-aligns content." },
    { name: "leading", type: `React.ReactNode`, description: "ListItem 40px-wide leading slot: icon or avatar." },
    { name: "trailing", type: `React.ReactNode`, description: "ListItem trailing text (md-label-small)." },
    { name: "trailingIcon", type: `string`, description: "ListItem trailing Material Symbol name." },
    { name: "selected", type: `boolean`, default: `false`, description: "Highlights the row with secondary container." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Dims the row to 38% and blocks interaction." },
    { name: "onClick", type: `(e: MouseEvent<HTMLButtonElement>) => void`, description: "Makes the row interactive (button, ripple, state layer)." }
  ],
  guidelines: {
    whenToUse: [
      "Use lists for homogeneous, scrollable collections of items (contacts, settings, files).",
      "Use list items with supporting text when each row needs context.",
      "Use a leading icon or avatar when items are identifiable at a glance."
    ],
    anatomy: ["Row container (56dp one-line, 72dp two-line, 88dp three-line; 16dp left / 24dp right padding; 12dp leading-icon top padding on three-line)", "Leading slot (40px wide, icon/avatar)", "Text block (overline, headline, supporting)", "Trailing slot (metadata text or icon)"],
    states: ["Enabled", "Hover (8% state layer)", "Focus (3px ring)", "Pressed (ripple + 98% scale)", "Selected (secondary-container background)", "Disabled (38% opacity)", "Keyboard (rows are buttons: Enter/Space activate; 56dp rows give \u226548dp touch targets)"],
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
  importLine: `import { Card } from "@/components/m3";`,
  variants: ["elevated", "filled", "outlined"],
  props: [
    { name: "variant", type: `'elevated' | 'filled' | 'outlined'`, default: `'elevated'`, description: "Visual treatment: shadowed, tonal, or stroked." },
    { name: "shape", type: `'medium' | 'extraLarge'`, default: `'medium'`, description: "Corner shape: official 12dp medium, or M3E extra-large 28dp for hero cards." },
    { name: "interactive", type: `boolean`, description: "Press shape morph, hover elevation, state layer, ripple and Enter/Space keyboard activation. Defaults to true when onClick is set." },
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
    states: ["Rest (elevation 1 for elevated)", "Hover (elevation 2 + 8% state layer)", "Focus (3px focus ring)", "Pressed (10% state layer, shape morph medium\u2192small + 97% scale, expressive spring)", "Disabled (38% opacity via content styling)"],
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
  description: "Segmented buttons help people select options, switch views, or sort elements inside one connected pill outline. Selected segments fill with a tonal color and reveal a check with a springy width animation. Each segment expands its touch target to \u226548dp vertically via an invisible ::before hit area (vertical-only, so adjacent segments never overlap).",
  importLine: `import { SegmentedButton } from "@/components/m3";`,
  variants: ["single", "multiple"],
  props: [
    { name: "options", type: `{ value: string; label?: string; icon?: string }[]`, description: "Segments, keyed by value." },
    { name: "type", type: `'single' | 'multiple'`, default: `'single'`, description: "Single emits a string; multiple emits a string array." },
    { name: "value", type: `string | string[]`, description: "Controlled value \u2014 string for single, string[] for multiple." },
    { name: "onValueChange", type: `(value: string | string[]) => void`, description: "Called with the next value; deselecting in single mode emits ''." },
    { name: "size", type: `'sm' | 'md'`, default: `'sm'`, description: "Height: 40px (the official spec height); 'md' 56px is an opt-in M3E expressive scale-up." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables every segment: outline drops to 12%, content to on-surface 38%." }
  ],
  guidelines: {
    whenToUse: [
      "Use segmented buttons to choose between 2\u20135 related options on a single screen.",
      "Use them as a compact alternative to radio buttons for switching views or filters.",
      "Use type='multiple' for independent on/off filters, like day/time filters in a date picker."
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
  description: "Sliders let users pick a value from a continuous or discrete range by dragging a tall thin handle along a thick track.",
  importLine: `import { Slider } from "@/components/m3";`,
  variants: ["continuous", "discrete"],
  props: [
    { name: "value", type: `number`, description: "Controlled value." },
    { name: "onChange", type: `(value: number) => void`, description: "Called with the snapped value on drag and keyboard changes." },
    { name: "min", type: `number`, default: `0`, description: "Minimum value." },
    { name: "max", type: `number`, default: `100`, description: "Maximum value." },
    { name: "step", type: `number`, default: `1`, description: "Increment to snap to." },
    { name: "discrete", type: `boolean`, default: `false`, description: "Shows tick dots under the track." },
    { name: "showValueLabel", type: `boolean`, default: `false`, description: "Value bubble above the handle while engaged." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables the slider (38% opacity)." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." }
  ],
  guidelines: {
    whenToUse: [
      "Use for settings where an approximate value is fine (volume, brightness).",
      "Use discrete + ticks when users should sense the exact stops.",
      "Pair with a numeric readout when precision matters."
    ],
    anatomy: ["16px thick track (primary active / surface-container-highest inactive)", "4\xD744px tall handle (widens to 6px when engaged) inside a 48dp hit row", "4dp on-surface stop-indicator dots on the inactive track (one per step when discrete)", "Optional value bubble"],
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
  discrete
  showValueLabel
  fullWidth
/>`,
  related: ["radio", "switch", "checkbox"],
  demoName: "SliderDemo",
  m3e: true
};
var textFieldMeta = {
  id: "text-field",
  name: "TextField",
  category: "textinput",
  description: "Text fields let users enter and edit a single line of text, with a floating label and a filled or outlined container.",
  importLine: `import { TextField } from "@/components/m3";`,
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
    anatomy: ["Container (outlined stroke or filled surface + indicator)", "Floating label", "Input text", "Optional leading/trailing icon", "Helper or error text"],
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
  description: "An autocomplete is a text field that presents a filterable list of suggestions, selecting a value from a known set.",
  importLine: `import { Autocomplete } from "@/components/m3";`,
  variants: ["outlined"],
  props: [
    { name: "options", type: `string[]`, description: "All selectable options." },
    { name: "value", type: `string`, description: "Controlled text value (the selection or free text)." },
    { name: "onChange", type: `(value: string) => void`, description: "Called with the typed text or a chosen option." },
    { name: "label", type: `string`, description: "Label rendered above the field." },
    { name: "placeholder", type: `string`, description: "Hint text for the input." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables the field and menu (38% opacity)." }
  ],
  guidelines: {
    whenToUse: [
      "Use when users must pick from a long list of known values (countries, tags, accounts).",
      "Use instead of a select when users may want to type to filter.",
      "Keep the option set under ~100 items for instant filtering."
    ],
    anatomy: ["Outlined text field (4dp corners)", "Trailing drop-down toggle", "Dropdown menu (surface-container, elevation-2, 4dp corners)", "Option rows with selected check (keyboard highlight scrolls into view)"],
    states: ["Enabled", "Focused (primary stroke, menu open)", "Highlighted option (8% state layer)", "Selected option (check icon)", "Disabled (38% opacity)"],
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
  demoName: "AutocompleteDemo"
};
var navigationRailMeta = {
  id: "navigation-rail",
  name: "Navigation rail",
  category: "navigation",
  description: "Navigation rails provide ergonomic access to primary destinations on medium screens like tablets and foldables. The active destination gets a tonal capsule that springs between icons; a header slot above hosts a FAB or branding.",
  importLine: `import { NavigationRail } from "@/components/m3";`,
  variants: ["3 destinations", "4 destinations", "5 destinations", "with header", "folding-line"],
  props: [
    { name: "items", type: `NavItem[]`, description: "Destinations (3\u20137): value, label, optional icon, optional badge." },
    { name: "value", type: `string`, description: "Controlled selected destination value." },
    { name: "onChange", type: `(v: string) => void`, description: "Called with the newly selected value." },
    { name: "header", type: `ReactNode`, description: "Slot above the items \u2014 typically a FAB." },
    { name: "menuIcon", type: `string`, default: `'menu'`, description: "Material Symbol for the optional leading menu icon (official rail anatomy item)." },
    { name: "onMenuClick", type: `() => void`, description: "Renders the leading menu icon and handles its press (e.g. expand into a drawer)." },
    { name: "foldingLine", type: `boolean`, default: `false`, description: "Draws a hinge divider along the leading edge for foldables." }
  ],
  guidelines: {
    whenToUse: [
      "Use on medium screens (600\u2013840dp window widths) where a drawer is too heavy.",
      "Use a navigation bar on compact screens and a drawer on expanded screens.",
      "Put a FAB in the header slot when the screen's primary action is available everywhere."
    ],
    anatomy: ["80dp surface-container-low rail", "Optional leading menu icon", "Optional header slot (FAB)", "Destination (24dp icon in a 56\xD732dp capsule + label-medium label)", "Active tonal capsule (shared-layout transition)"],
    states: ["Active (secondary-container capsule, filled icon)", "Inactive (on-surface-variant)", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (ripple)"],
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
  importLine: `import { Chip } from "@/components/m3";`,
  variants: ["assist", "filter", "input", "suggestion"],
  props: [
    { name: "variant", type: `'assist' | 'filter' | 'input' | 'suggestion'`, default: `'assist'`, description: "Chip semantics and affordances." },
    { name: "selected", type: `boolean`, default: `false`, description: "Selected state (filter/assist show a leading check)." },
    { name: "onSelect", type: `(selected: boolean) => void`, description: "Called with the next selected state on click." },
    { name: "onRemove", type: `() => void`, description: "Input chips: renders a trailing cancel affordance." },
    { name: "leadingIcon", type: `string`, description: "Leading Material Symbol name (replaced by the check when selected)." },
    { name: "trailingIcon", type: `string`, description: "Trailing Material Symbol name (non-input variants)." },
    { name: "elevated", type: `boolean`, default: `false`, description: "Raises the unselected chip (elevation-1, container-low surface)." },
    { name: "size", type: `'xs' | 'sm' | 'md'`, default: `'sm'`, description: "Expressive height scale: xs=28, sm=32, md=40." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables the chip (38% opacity)." },
    { name: "children", type: `ReactNode`, description: "Label text." }
  ],
  guidelines: {
    whenToUse: [
      "Use filter chips to toggle content filters in a set.",
      "Use input chips to represent entities (people, tags) the user added.",
      "Use assist and suggestion chips for contextual quick actions."
    ],
    anatomy: ["Rounded-full container", "Optional leading icon / animated check", "Label (label-large)", "Optional trailing icon or cancel affordance"],
    states: ["Enabled", "Hover (8% state layer)", "Focus (3px primary ring)", "Pressed (96% scale)", "Selected (secondary-container + check)", "Elevated (elevation-1, hover elevation-2)", "Disabled (38% opacity)"],
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
<Chip variant="input" leadingIcon="person" onRemove={removeGuest}>
  Guest
</Chip>`,
  related: ["checkbox", "radio", "autocomplete"],
  demoName: "ChipDemo"
};
var bannerMeta = {
  id: "banner",
  name: "Banner",
  category: "communication",
  description: "Banners display a prominent, screen-wide message with optional actions. They sit at the top of a screen or section and stay until dismissed by the user.",
  importLine: `import { Banner } from "@/components/m3";`,
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
    anatomy: ["Container (surface-container-low, square corners \u2014 shape none per the M3 banner spec)", "Leading icon (on-surface-variant, 24dp)", "Message (body-medium)", "Action row (52px) end-aligned above an outline-variant divider with 40dp text buttons", "Optional close icon"],
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
  demoName: "BannerDemo"
};
var checkboxMeta = {
  id: "checkbox",
  name: "Checkbox",
  category: "selection",
  description: "Checkboxes let users select one or more items from a set, toggling each option on or off (or to an indeterminate state).",
  importLine: `import { Checkbox } from "@/components/m3";`,
  variants: ["checked", "unchecked", "indeterminate"],
  props: [
    { name: "checked", type: `boolean`, default: `false`, description: "Whether the box is checked." },
    { name: "indeterminate", type: `boolean`, default: `false`, description: "Shows a dash (mixed state); aria-checked='mixed'." },
    { name: "onChange", type: `(checked: boolean) => void`, description: "Called with the next checked state." },
    { name: "label", type: `string`, description: "Label rendered beside the box." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables the control (38% opacity)." },
    { name: "error", type: `boolean`, default: `false`, description: "Applies the error color to box, check and ripple." }
  ],
  guidelines: {
    whenToUse: [
      "Use for multiple independent selections in a set.",
      "Use indeterminate for a parent that reflects partially-selected children.",
      "Use a single checkbox to opt in or out of one condition."
    ],
    anatomy: ["48px touch target", "18px rounded box (2px border)", "Animated checkmark / indeterminate dash", "Optional label (body-large)"],
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
  description: "A floating action button (FAB) represents the primary or most common action on a screen, floating above content with a tonal container and shadow. M3 Expressive adds small to extra-large sizes and a bouncy press spring.",
  importLine: `import { Fab } from "@/components/m3";`,
  variants: ["primary", "secondary", "tertiary", "surface"],
  props: [
    { name: "color", type: `'primary' | 'secondary' | 'tertiary' | 'surface'`, default: `'primary'`, description: "Tonal color role of the FAB container." },
    { name: "size", type: `'small' | 'medium' | 'large' | 'extra-large'`, default: `'medium'`, description: "Container size: 40 / 56 / 96 / 132 px." },
    { name: "icon", type: `string`, description: "Material Symbols ligature name, e.g. 'add'." },
    { name: "lowered", type: `boolean`, default: `false`, description: "Uses elevation 1 instead of 3 (for FABs flanking dialogs or extended FABs)." },
    { name: "aria-label", type: `string`, description: "Strongly recommended \u2014 the icon alone has no text alternative." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables interaction: container drops to on-surface 12%, icon to 38%, elevation to 0." },
    { name: "onClick", type: `() => void`, description: "Handler fired when the FAB is activated." }
  ],
  guidelines: {
    whenToUse: [
      "Use a FAB for the single most common or important action on a screen, like 'Compose' or 'Create'.",
      "Use the surface color when the FAB needs to blend with a colorful layout, or tertiary for a contrasting accent.",
      "Use lowered when the FAB shares a screen with a dialog or another extended FAB."
    ],
    anatomy: ["Rounded tonal container (16dp corners; 28dp on large/extra-large)", "Elevation shadow (level 3, or 1 when lowered)", "Material Symbol icon (24\u201348px)", "State layer + ripple", "48dp minimum touch target on the 40dp small FAB"],
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
<Fab color="surface" size="small" icon="edit" lowered aria-label="Edit" />`,
  related: ["extended-fab", "fab-menu", "icon-button", "button"],
  demoName: "FabDemo"
};
var tabsMeta = {
  id: "tabs",
  name: "Tabs",
  category: "navigation",
  description: "Tabs organize content across different screens, data sets, and other interactions. Primary tabs are 64dp icon+label columns with a spring-animated 3dp underline sized to the active label's measured text width (ResizeObserver + fonts.ready); the M3 Expressive secondary style slides a tonal pill between 48dp destinations. Scroll arrows appear when tabs overflow.",
  importLine: `import { Tabs } from "@/components/m3";`,
  variants: ["primary", "secondary"],
  props: [
    { name: "items", type: `NavItem[]`, description: "Tab definitions: value, label, optional Material Symbol icon and badge." },
    { name: "value", type: `string`, description: "Controlled selected tab value." },
    { name: "onChange", type: `(v: string) => void`, description: "Called with the newly selected value." },
    { name: "variant", type: `'primary' | 'secondary'`, default: `'primary'`, description: "Primary shows icon-over-label columns (64dp) with a 3dp underline; secondary shows expressive tonal pills (48dp)." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to container width and distribute tabs equally; overflow scrolls horizontally." }
  ],
  guidelines: {
    whenToUse: [
      "Use tabs to switch between peer views of the same content level (Today / Health / Shop).",
      "Use at the top of a screen for in-context navigation, not for app-level destinations.",
      "Use the secondary variant for a lighter, more expressive in-page filter row."
    ],
    anatomy: ["Tab row container (64dp primary / 48dp secondary, bottom divider on primary)", "Tab (24dp icon + label-large label, state layer + ripple, 96dp min width)", "Active indicator (shared-layout 3dp underline sized to the label text width via ResizeObserver + fonts.ready, or tonal pill)", "Scroll arrows (appear while tabs overflow in that direction)"],
    states: ["Selected (primary color / tonal pill, filled icon)", "Unselected (on-surface-variant)", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (ripple)", "Keyboard (roving tabindex; ArrowLeft/Right, Home/End move and activate)"],
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
  description: "The M3 Expressive loading indicator is a shape-morphing container with counter-spinning dashed arcs \u2014 a playful, branded way to hold attention during longer waits.",
  importLine: `import { LoadingIndicator } from "@/components/m3";`,
  variants: ["primary", "secondary", "tertiary", "error"],
  props: [
    { name: "size", type: `number`, default: `48`, description: "Square container size in px (official 48dp container)." },
    { name: "active", type: `boolean`, default: `true`, description: "false pauses the morph + spin and rests at a circle at 38% opacity." },
    { name: "color", type: `'primary' | 'secondary' | 'tertiary' | 'error'`, default: `'primary'`, description: "Container color; arcs use the matching on-container role." }
  ],
  guidelines: {
    whenToUse: [
      "Use for full-screen or section-level loading moments that last more than a second.",
      "Use the Expressive morphing style to reinforce brand personality during waits.",
      "Use `active={false}` to freeze the animation in paused or completed states."
    ],
    anatomy: ["Shape-morphing container (color-container role), rotating one full turn every ~4.7s (official 4666ms) with 650ms morph steps", "Outer dashed arc (on-container role)", "Inner dashed arc, counter-rotating"],
    states: ["Active (continuous rotation + shape morph)", "Paused (active=false \u2014 static circle at 38% opacity; also used for reduced-motion users)"],
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
  exampleCode: `<LoadingIndicator size={48} />
<LoadingIndicator size={72} color="tertiary" />
<LoadingIndicator active={false} color="secondary" />`,
  related: ["circular-progress", "linear-progress"],
  demoName: "LoadingIndicatorDemo"
};
var menuMeta = {
  id: "menu",
  name: "Menu",
  category: "navigation",
  description: "Menus display a list of choices on a temporary surface, anchored to a trigger. Items support icons, keyboard shortcuts, section labels, dividers and destructive styling; the panel springs open from its top origin. Arrow keys move between items; Escape or Tab closes and returns focus to the trigger.",
  importLine: `import { Menu } from "@/components/m3";`,
  variants: ["bottom-start", "bottom-end", "with icons", "with shortcuts", "with sections"],
  props: [
    { name: "trigger", type: `ReactNode`, description: "Clickable element the menu anchors to; cloned with the open handler." },
    { name: "items", type: `MenuItemData[]`, description: "Entries: item (label/icon/shortcut/disabled/destructive), divider, or label." },
    { name: "open", type: `boolean`, description: "Controlled open state; omit for internal state." },
    { name: "onOpenChange", type: `(open: boolean) => void`, description: "Notifies open/close changes in controlled mode." },
    { name: "placement", type: `'bottom-start' | 'bottom-end'`, default: `'bottom-start'`, description: "Anchor edge and transform origin." }
  ],
  guidelines: {
    whenToUse: [
      "Use for overflow actions that don't fit an app bar or toolbar.",
      "Use for context actions on an item (edit, duplicate, delete).",
      "Group related commands with labels and dividers."
    ],
    anatomy: ["Container (surface-container, elevation 2, 4dp corners, 8dp vertical padding)", "Menu items (48dp, state layer + ripple)", "Leading icon (24dp, 12dp gutter)", "Shortcut hint (trailing)", "Section labels and dividers"],
    states: ["Enabled (on-surface)", "Disabled (38% opacity)", "Destructive (error color)", "Hover (8% state layer)", "Focus (3px focus ring)", "Keyboard (ArrowUp/Down, Home/End move focus; Escape/Tab close and restore trigger focus; trigger exposes aria-haspopup/aria-expanded)"],
    dos: [
      "Keep menus to 5\u201310 items; nest rarely and never more than one level",
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
  description: "Bottom app bars provide access to a bottom navigation drawer and up to four actions, including an optional center-docked FAB that notches the bar. The M3 Expressive FAB morphs its corner shape on press.",
  importLine: `import { BottomAppBar } from "@/components/m3";`,
  variants: ["actions only", "with center-docked FAB", "with trailing icons"],
  props: [
    { name: "navigationIcon", type: `{ icon: string; label?: string; onClick?: () => void }`, description: "Optional leading navigation icon (official anatomy item; typically the hamburger menu)." },
    { name: "actions", type: `{ icon: string; label?: string; onClick?: () => void }[]`, description: "Leading icon actions." },
    { name: "trailingIcons", type: `string[]`, description: "Trailing Material Symbol icon names." },
    { name: "fab", type: `{ icon: string; onClick?: () => void }`, description: "Center-docked FAB that notches the bar." },
    { name: "fullWidth", type: `boolean`, default: `true`, description: "Stretch to container width." }
  ],
  guidelines: {
    whenToUse: [
      "Use on small screens to pair the primary action (FAB) with contextual actions.",
      "Use when the screen benefits from a persistent primary action reachable by thumb.",
      "Prefer a navigation bar when destinations \u2014 not actions \u2014 are the priority."
    ],
    anatomy: ["80dp surface-container bar (tonal elevation only \u2014 M3 draws no shadow)", "Navigation icon (optional, leading, 48dp target)", "Leading action icons", "Optional center-docked notched FAB", "Trailing action icons"],
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
  trailingIcons={["more_vert"]}
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
  importLine: `import { ExtendedFab } from "@/components/m3";`,
  variants: ["primary", "secondary", "tertiary", "surface"],
  props: [
    { name: "color", type: `'primary' | 'secondary' | 'tertiary' | 'surface'`, default: `'primary'`, description: "Tonal color role of the container." },
    { name: "icon", type: `string`, description: "Leading Material Symbols ligature name." },
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
    anatomy: ["Rounded (16dp corners) tonal container", "Elevation shadow (level 3, or 1 when lowered)", "24px Material Symbol icon (8dp gap to label, 20dp side padding)", "Label text (label-large 14px; rendered 600 here vs the official 500 \u2014 recorded global deviation)", "State layer + ripple"],
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
<ExtendedFab color="surface" icon="filter" label="Filter" lowered />`,
  related: ["fab", "fab-menu", "button", "icon-button"],
  demoName: "ExtendedFabDemo"
};
var circularProgressMeta = {
  id: "circular-progress",
  name: "Circular progress",
  category: "communication",
  description: "Circular progress indicators display progress by animating an arc along a circular track, for compact or inline loading states.",
  importLine: `import { CircularProgress } from "@/components/m3";`,
  variants: ["determinate", "indeterminate"],
  props: [
    { name: "value", type: `number`, description: "0\u2013100 progress. Omit for indeterminate." },
    { name: "size", type: `number`, default: `48`, description: "Outer diameter in px." },
    { name: "thickness", type: `number`, default: `4`, description: "Indicator stroke width in px." },
    { name: "color", type: `'primary' | 'secondary' | 'tertiary' | 'error'`, default: `'primary'`, description: "Active indicator color role." },
    { name: "ariaLabel", type: `string`, default: `'Loading'`, description: "Accessible name for the progressbar role." }
  ],
  guidelines: {
    whenToUse: [
      "Use circular indicators where space is tight: buttons, list rows, toolbars.",
      "Use determinate when a measurable task (e.g. file upload) has clear completion.",
      "Use indeterminate when the wait length is unknown."
    ],
    anatomy: ["Circular track (surface-container-highest)", "Active indicator arc (color role, round caps)", "Stop indicator: 4px dot fixed at 12 o'clock behind a 4px gap (determinate only, official TrackActiveSpace)"],
    states: ["Determinate (spring-animated arc, stops 4px short of the dot)", "Indeterminate (arc grows to ~270\xB0 and contracts while the ring rotates)"],
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
  importLine: `import { Badge } from "@/components/m3";`,
  variants: ["error", "primary", "tertiary", "dot"],
  props: [
    { name: "value", type: `number | string`, description: 'Count or short label to show. Numbers above `max` collapse to "{max}+".' },
    { name: "showDot", type: `boolean`, default: `false`, description: "Show a 6px dot instead of a value, when a count is not helpful (decorative, aria-hidden)." },
    { name: "children", type: `React.ReactNode`, description: "Anchor element the badge pins to its top-right corner." },
    { name: "color", type: `'error' | 'primary' | 'tertiary'`, default: `'error'`, description: "Badge color role." },
    { name: "max", type: `number`, default: `99`, description: 'Maximum count before showing "99+".' },
    { name: "disabled", type: `boolean`, default: `false`, description: "Dims the badge to 38% and blocks interaction." }
  ],
  guidelines: {
    whenToUse: [
      "Use a large badge with a number to indicate unread items on icons or navigation destinations.",
      "Use a small dot when the exact count is irrelevant but attention is needed.",
      "Anchor badges to the top-right of icons and avatars."
    ],
    anatomy: ["Anchor element (icon, avatar, tab)", "Badge container (16px min-width pill with full corners, or 6px dot) pinned top-right \u2014 text badge overhangs 4px right / 2px top, dot sits flush in the corner", "Value text (label-small) or dot fill"],
    states: ["Default", "Updated (value change pops with the bouncy spring)", "Disabled (38% opacity)"],
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
  exampleCode: `<span className="relative">
  <MaterialSymbol icon="inbox" />
  <Badge value={12} max={99} />
</span>
<Badge showDot color="tertiary" />
<Badge value={250} color="primary" />`,
  related: ["icon-button", "chip", "navigation-bar"],
  demoName: "BadgeDemo"
};
var searchBarMeta = {
  id: "search-bar",
  name: "SearchBar",
  category: "textinput",
  description: "A search bar is a rounded text field dedicated to search queries, elevating on focus and offering quick trailing actions.",
  importLine: `import { SearchBar } from "@/components/m3";`,
  variants: ["sm", "md", "lg"],
  props: [
    { name: "value", type: `string`, description: "Controlled query text." },
    { name: "onChange", type: `(e: ChangeEvent<HTMLInputElement>) => void`, description: "Change handler for the query." },
    { name: "placeholder", type: `string`, default: `'Search'`, description: "Hint text shown when empty." },
    { name: "size", type: `'sm' | 'md' | 'lg'`, default: `'md'`, description: "Expressive height scale: sm=40, md=56, lg=72." },
    { name: "leadingIcon", type: `string`, default: `'search'`, description: "Leading Material Symbol name." },
    { name: "trailingIcons", type: `string[]`, description: "Trailing inline icon buttons (Material Symbol names)." },
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
    anatomy: ["Rounded-full container", "Leading search icon", "Query input (body-large)", "Optional trailing icon buttons (24dp icons, \u226548dp targets)"],
    states: ["Enabled", "Focused (elevation-2 + highest surface)", "Hover (state layer)", "Disabled (38% opacity)"],
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
  trailingIcons={["mic", "close"]}
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
  description: "The expanded companion of the search bar: a persistent search surface for larger, richer search that expands over the UI with a 56dp input row, recent-search suggestion rows and a full results area.",
  importLine: `import { SearchView } from "@/components/m3";`,
  variants: ["full-screen", "docked"],
  props: [
    { name: "open", type: `boolean`, description: "Whether the search view is shown." },
    { name: "onOpenChange", type: `(open: boolean) => void`, description: "Called when the view requests to open or close (Escape, leading icon)." },
    { name: "mode", type: `'full-screen' | 'docked'`, default: `'full-screen'`, description: "full-screen covers the viewport as a modal dialog; docked renders inline above its results." },
    { name: "placeholder", type: `string`, default: `'Search'`, description: "Hint text, also used as the accessible dialog label." },
    { name: "value", type: `string`, description: "Controlled query text." },
    { name: "defaultValue", type: `string`, description: "Initial query for uncontrolled usage." },
    { name: "onValueChange", type: `(v: string) => void`, description: "Called on every query edit, clear, or recent-search selection." },
    { name: "recentSearches", type: `string[]`, description: "Recent-search suggestion rows, shown while the query is empty." },
    { name: "onRecentSelect", type: `(q: string) => void`, description: "Invoked when a recent search is chosen (click or Enter)." },
    { name: "onRecentRemove", type: `(q: string) => void`, description: "Trailing close icon per row; omit to hide the removal affordance." },
    { name: "leadingIcon", type: `ReactNode`, default: `arrow_back icon`, description: "Leading navigation icon node; clicking it closes the view." },
    { name: "trailingActions", type: `ReactNode`, description: "Extra trailing controls rendered after the clear button." },
    { name: "children", type: `ReactNode`, description: "Results content below the divider; hidden while recent suggestions show." },
    { name: "autoFocus", type: `boolean`, default: `true`, description: "Focus the query input when the full-screen view opens." }
  ],
  guidelines: {
    whenToUse: [
      "Use for larger, richer search experiences \u2014 query building, filters and result sets that need room.",
      "Use as the expanded companion of a search bar: tapping the bar opens the view over the UI.",
      "Use recent-search rows to reduce retyping for repeat queries."
    ],
    anatomy: ["56dp input row on surface-container-high", "Leading navigation icon (arrow back / close)", "Query input (body-large)", "Trailing clear + custom action icons (24dp icons, \u226548dp targets)", "1dp outline-variant divider", "Scrollable results or recent-search suggestion rows (48dp, history icon, label-large)"],
    states: ["Rest (elevation 0 \u2014 the view replaces the surface)", "Input focused (caret + on-surface text)", "Suggestion rows: hover/focus state layer", "Divider permanently separates input from content"],
    dos: [
      "Keep the input row exactly 56dp on surface-container-high with a 1dp outline-variant divider below.",
      "Provide an obvious way out \u2014 a leading arrow-back icon that closes, plus Escape in full-screen mode.",
      "Restore focus to the trigger when the full-screen view closes.",
      "Keep recent rows keyboard-reachable: ArrowUp/ArrowDown walk the list, Enter selects."
    ],
    donts: [
      "Don't stack a scrim under the full-screen view \u2014 it is opaque and replaces the surface.",
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
  importLine: `import { SplitButton } from "@/components/m3";`,
  variants: ["filled", "tonal", "outlined"],
  props: [
    { name: "label", type: `string`, description: "Label of the primary action segment." },
    { name: "onClick", type: `() => void`, description: "Handler fired by the primary segment." },
    { name: "items", type: `{ label: string; icon?: string; onClick?: () => void }[]`, description: "Dropdown menu actions; the menu closes after one is chosen." },
    { name: "variant", type: `'filled' | 'tonal' | 'outlined'`, default: `'filled'`, description: "Visual emphasis of the joined container." },
    { name: "size", type: `'sm' | 'md' | 'lg'`, default: `'md'`, description: "Height: 40 / 56 / 76 px." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables both segments, dims to 38% opacity." }
  ],
  guidelines: {
    whenToUse: [
      "Use a split button when one action is far more common than its alternatives, like 'Send' vs 'Send later'.",
      "Use it in toolbars where several related commands must share one slot.",
      "Use the outlined variant when the split button sits next to filled buttons of higher emphasis."
    ],
    anatomy: ["Joined pill container", "Primary action segment (state layer + ripple)", "1px divider (20% current color)", "40px arrow segment (arrow_drop_down)", "Dropdown menu (surface-container, elevation 2, 4dp corners, 48dp items)"],
    states: ["Enabled", "Hover (8% state layer per segment)", "Focus (3px focus ring)", "Pressed (96% scale on the pill)", "Menu open (arrow rotated, fade/scale menu, Arrow/Home/End navigation)", "Disabled (on-surface 12% container / 38% content)"],
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
  importLine: `import { Switch } from "@/components/m3";`,
  variants: ["checked", "unchecked"],
  props: [
    { name: "checked", type: `boolean`, default: `false`, description: "Whether the switch is on." },
    { name: "onCheckedChange", type: `(checked: boolean) => void`, description: "Called with the next state." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables the switch (38% opacity)." }
  ],
  guidelines: {
    whenToUse: [
      "Use for a single setting that takes effect immediately.",
      "Use in settings rows with a label on the left and the switch on the right.",
      "Use instead of a checkbox when the change applies instantly."
    ],
    anatomy: ["52\xD732 rounded-full track", "Thumb (16px off, 24px on, 28px pressed)", "Optional check glyph on the on-thumb"],
    states: ["Off (outline track, outline thumb at 4dp inset)", "On (primary track, on-primary thumb + check)", "Focus (3px primary ring)", "Pressed (thumb squashes to 28px)", "Disabled (38% opacity)"],
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
  description: "Time pickers let users select a time using an analog clock dial with a digital readout; the readout segments switch between hour and minute editing, AM/PM toggles meridiem, and arrow keys step the dial. In 24-hour mode the dial switches to the official double-ring face \u2014 outer ring 00\u201311, inner ring 12\u201323 \u2014 with the selection handle traveling between rings; only 5-minute marks are labelled in minute mode.",
  importLine: `import { TimePicker } from "@/components/m3";`,
  variants: ["12-hour", "24-hour-double-ring"],
  props: [
    { name: "value", type: `{ hour: number; minute: number }`, description: "Selected time (hour 0\u201323, minute 0\u201359). Defaults to 10:30 when uncontrolled." },
    { name: "onChange", type: `(t: { hour: number; minute: number }) => void`, description: "Fires on any dial, readout or meridiem change." },
    { name: "use24h", type: `boolean`, default: `false`, description: "Renders the readout 0\u201323, hides AM/PM, and switches the dial to the official double-ring 24h face: outer ring 00\u201311 (00 at the top, 06 at the bottom, 101dp radius) and inner ring 12\u201323 (12 at the top, 18 at the bottom, 69dp radius). The selection handle travels between rings; arrows step the full 0\u201323 range. Hour\u2192minute auto-advance applies in both modes." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." },
    { name: "className", type: `string`, description: "Extra classes for the container." }
  ],
  guidelines: {
    whenToUse: [
      "Use an inline time picker when picking a time is the primary in-page task.",
      "Use with a date picker for scheduling flows.",
      "Use the 24h readout for locales or domains that require it."
    ],
    anatomy: ["Container (28px corners, surface-container-high, elevation 3, 24dp padding)", "Readout: two 96\xD780dp time-selector segments (8dp corner-small, display-large; active on primary-container, inactive on surface-container-highest/on-surface) + 52\xD780dp vertical period selector with 1dp outline (active option on tertiary-container)", "Dial (256dp circle, surface-container-highest, elevation 1)", "12 number positions (radius 104px, 48px hit areas); 24h hour dial = double ring per androidx tokens \u2014 outer ring 00\u201311 at 101dp (label-large, on-surface-variant), inner ring 12\u201323 at 69dp (body-large, on-surface)", "48dp primary selection handle, 2dp track and 8dp center dot; in 24h mode the handle travels between rings with a small cross-ring dot at the same clock position"],
    states: ["Hour editing", "Minute editing (marks = n\xD75)", "Selected number (48dp primary handle, spring scale)", "24h double-ring hour dial (outer 00\u201311 \xB7 inner 12\u201323; handle on the selected hour's ring, springs between rings)", "AM / PM selected (tertiary-container pill inside the outlined column)", "Active readout segment (primary-container, 8dp corners)", "Auto-switch (hour \u2192 minute after 600ms, both meridiem modes)", "Keyboard (Tab to dial/readout/AM-PM; Enter picks; \u2191/\u2192 +1 \xB7 \u2193/\u2190 \u22121 \u2014 full 0\u201323 wrap in 24h; arrows move meridiem)"],
    dos: [
      "Show the current selection in the readout while editing the other segment",
      "Use the 24h double-ring dial for locales that expect it \u2014 both half-days stay visible, no AM/PM arithmetic",
      "Keep the hand and pill in sync with the selected value",
      "Pad minute labels to two digits for readability"
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
<TimePicker use24h value={time} onChange={setTime} />`,
  related: ["date-picker", "card", "bottom-sheet"],
  demoName: "TimePickerDemo"
};
var radioMeta = {
  id: "radio",
  name: "Radio",
  category: "selection",
  description: "Radio buttons let users select exactly one option from a set of mutually exclusive choices.",
  importLine: `import { Radio } from "@/components/m3";`,
  variants: ["checked", "unchecked"],
  props: [
    { name: "checked", type: `boolean`, default: `false`, description: "Whether this radio is selected." },
    { name: "onChange", type: `() => void`, description: "Called when the radio is clicked." },
    { name: "label", type: `string`, description: "Label rendered beside the circle." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables the control (38% opacity)." },
    { name: "error", type: `boolean`, default: `false`, description: "Applies the error color to the ring and inner dot." }
  ],
  guidelines: {
    whenToUse: [
      "Use for mutually exclusive options where exactly one can be selected.",
      "Use when all options should be visible up front (vs. a dropdown).",
      "Preselect the most common option instead of leaving the group empty."
    ],
    anatomy: ["48px touch target", "20px ring (2px border)", "Inner dot (springs in when selected)", "Optional label (body-large)"],
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
  exampleCode: `<Radio checked={plan === "pro"} onChange={() => setPlan("pro")} label="Pro" />`,
  related: ["checkbox", "switch", "slider"],
  demoName: "RadioDemo"
};
var toolbarMeta = {
  id: "toolbar",
  name: "Toolbar",
  category: "navigation",
  description: "New in Material 3 Expressive: a compact, dismissible pill of contextual actions that floats over content. Four container-color roles; the dockable variant morphs between a floating pill and a square full-width docked bar.",
  importLine: `import { Toolbar } from "@/components/m3";`,
  m3e: true,
  variants: ["floating", "dockable", "surface", "primary", "secondary", "tertiary"],
  props: [
    { name: "icons", type: `{ icon: string; label?: string; onClick?: () => void; active?: boolean }[]`, description: "Toolbar actions; active items get a tinted pill and filled icon." },
    { name: "variant", type: `'floating' | 'dockable'`, default: `'floating'`, description: "Floating hovers over content; dockable toggles pill \u2194 docked bar via the docked prop." },
    { name: "color", type: `'surface' | 'primary' | 'secondary' | 'tertiary'`, default: `'surface'`, description: "Container color role (container + on-container pair)." },
    { name: "position", type: `'top' | 'bottom'`, default: `'bottom'`, description: "Floating placement edge inside a positioned ancestor." },
    { name: "width", type: `number`, default: `560`, description: "Pill width in px for the floating variant." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch pill/bar to container width." },
    { name: "docked", type: `boolean`, default: `false`, description: "Dockable variant: true = square corners + elevation 1, full width." }
  ],
  guidelines: {
    whenToUse: [
      "Use to expose 3\u20135 contextual actions tied to the visible content (M3 Expressive pattern).",
      "Use floating for immersive editors and media viewers; dockable for tool palettes that pin during work.",
      "Pick a container color that complements the content without hiding it."
    ],
    anatomy: ["Pill container (rounded-full, 56dp tall, elevation 2) or docked bar (square, elevation 1)", "48dp icon buttons with state layer", "Active item on-container 12% tint pill + filled icon"],
    states: ["Rest (container color, elevation)", "Active item (on-container 12% pill, filled icon)", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (ripple, expressive scale)"],
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
    color="primary"
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
  importLine: `import { IconButton } from "@/components/m3";`,
  variants: ["standard", "filled", "tonal", "outlined"],
  props: [
    { name: "variant", type: `'standard' | 'filled' | 'tonal' | 'outlined'`, default: `'standard'`, description: "Visual emphasis of the icon button." },
    { name: "size", type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`, default: `'md'`, description: "Container size: 28 / 36 / 40 / 48 / 64 px." },
    { name: "icon", type: `string`, description: "Material Symbols ligature name, e.g. 'favorite'." },
    { name: "toggleable", type: `boolean`, default: `false`, description: "Turns the button into a two-state toggle (e.g. bookmark, mute)." },
    { name: "selected", type: `boolean`, description: "Controlled selected state; omit to let the button manage its own state." },
    { name: "onSelectedChange", type: `(selected: boolean) => void`, description: "Called with the next selected state when toggled." },
    { name: "aria-label", type: `string`, description: "Required for accessibility \u2014 the icon alone has no text alternative." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables interaction: container drops to on-surface 12% (filled/tonal), icon to 38%." }
  ],
  guidelines: {
    whenToUse: [
      "Use an icon button when horizontal space is limited and the icon alone clearly communicates the action.",
      "Use the filled or tonal variant for high-emphasis compact actions.",
      "Use toggleable for on/off state actions such as favorite, bookmark, mute, or pin.",
      "Use standard inside app bars and toolbars where several actions sit side by side."
    ],
    anatomy: ["Circular container (state layer + ripple)", "Material Symbol icon (filled when selected)", "48dp minimum touch target (invisible ::before extension below 48dp containers)"],
    states: ["Enabled", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (96% scale spring)", "Selected (primary icon per spec for standard/outlined + filled glyph; filled/tonal containers unchanged)", "Disabled (on-surface 12% container / 38% icon)"],
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
  importLine: `import { Tooltip } from "@/components/m3";`,
  variants: ["plain", "rich"],
  props: [
    { name: "content", type: `React.ReactNode`, description: "Tooltip text or body content." },
    { name: "rich", type: `boolean`, default: `false`, description: "Use the rich layout with title + action." },
    { name: "title", type: `string`, description: "Rich only \u2014 bold title above the content." },
    { name: "actionLabel", type: `string`, description: "Rich only \u2014 optional action label." },
    { name: "onAction", type: `() => void`, description: "Rich only \u2014 action press handler." },
    { name: "placement", type: `'top' | 'bottom'`, default: `'top'`, description: "Side of the trigger the tooltip appears on." },
    { name: "children", type: `React.ReactNode`, description: "Trigger element." }
  ],
  guidelines: {
    whenToUse: [
      "Label icon-only buttons and controls that lack visible text.",
      "Show helpful context on hover without taking permanent space.",
      "Use rich tooltips for icon actions needing explanation plus a learn-more link."
    ],
    anatomy: ["Trigger element (linked via aria-describedby)", "Plain: inverse-surface label, 4dp corners, 4/8px padding, 200px max, 8dp caret, body-small", "Rich: surface-container card, 12dp corners, outline border, level-2 elevation, title-small + body-medium (on-surface-variant) + action"],
    states: ["Hidden", "Entering (fade + scale after a 500ms show delay)", "Visible (hover / focus-within / touch long-press)", "Exiting (600ms hide delay)"],
    dos: [
      "Keep plain tooltips to a single short phrase",
      "Trigger on hover, keyboard focus, and touch long-press",
      "Prefer placement=top; flip to bottom near the viewport edge"
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
<Tooltip rich title="Attach file" content="Up to 25 MB." actionLabel="Learn more">
  <Button variant="outlined" icon="attach_file">Attach</Button>
</Tooltip>`,
  related: ["snackbar", "icon-button", "menu"],
  demoName: "TooltipDemo"
};
var fabMenuMeta = {
  id: "fab-menu",
  name: "Fab menu",
  category: "actions",
  description: "New in Material 3 Expressive: a FAB that expands into a playful, staggered cascade of related quick actions. The main icon rotates into a close affordance, keeping one entry point for a small action cluster. The docked variant anchors flush to the bottom edge \u2014 the screen edge or directly above a bottom app bar \u2014 and squares the FAB's bottom corners when open so the menu visually connects to the edge.",
  importLine: `import { FabMenu } from "@/components/m3";`,
  variants: ["primary", "secondary", "tertiary", "surface", "docked \xB7 screen", "docked \xB7 bottom app bar"],
  props: [
    { name: "actions", type: `{ icon: string; label?: string; onClick?: () => void }[]`, description: "Quick actions revealed on open." },
    { name: "direction", type: `'horizontal' | 'vertical'`, default: `'vertical'`, description: "Expansion direction of the action row/column. Ignored while docked \u2014 docking fixes the cascade (screen = vertical above, bottom app bar = horizontal row)." },
    { name: "docked", type: `boolean`, default: `false`, description: "Dock the menu to the bottom edge: closed FAB sits flush bottom-center; when open the FAB's bottom corners morph square (16px \u2192 0 shape morph) and the actions cascade above/on the bar." },
    { name: "dockedTo", type: `'screen' | 'bottom-app-bar'`, default: `'screen'`, description: "Docking target. 'screen' pins position:fixed to the viewport bottom (or a transformed ancestor, e.g. a demo stage) with a vertical cascade; 'bottom-app-bar' anchors absolute inside the nearest positioned ancestor so the FAB rests on the bar below and actions open as a horizontal row flush on top of it." },
    { name: "color", type: `'primary' | 'secondary' | 'tertiary' | 'surface'`, default: `'primary'`, description: "Tonal color role of the main FAB." },
    { name: "open", type: `boolean`, description: "Controlled open state; omit for uncontrolled behavior." },
    { name: "onOpenChange", type: `(open: boolean) => void`, description: "Called when the menu opens or closes." }
  ],
  guidelines: {
    whenToUse: [
      "Use a fab menu to cluster 2\u20135 related quick actions behind a single entry point.",
      "Use it when screen space is too tight for separate extended FABs or buttons.",
      "Prefer it for creation flows: attach a photo, record audio, add a file."
    ],
    anatomy: ["Main small FAB (40px, rotating icon, 48dp touch target)", "Action FABs (32px, primary-container, 48dp touch target)", "Inverse-surface label chips", "Staggered spring entrance (50ms = durations.short1 token)", "Dismisses on Escape / outside press", "Docked: FAB flush bottom-center; open state squares the bottom corners (shapes.large \u2192 shapes.none morph on springs.expressiveEffects) to connect with the screen edge or bar"],
    states: ["Closed (single FAB)", "Open (icon rotated 45\xB0, actions visible)", "Action hover/press (state layer + 96% scale)", "Main FAB hover/press (103% / 94% expressive spring)", "Dismissed (Escape or outside pointerdown)", "Docked closed (FAB flush at the bottom-center of the edge/bar)", "Docked open (bottom corners square, actions cascade upward / along the bar)"],
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
  description: "Navigation bars let people switch between primary destinations in an app. The active destination is highlighted with a tonal pill behind the icon that springs into place \u2014 the signature M3 Expressive shared-layout motion.",
  importLine: `import { NavigationBar } from "@/components/m3";`,
  variants: ["3 destinations", "4 destinations", "5 destinations"],
  props: [
    { name: "items", type: `NavItem[]`, description: "Destinations (3\u20135): value, label, optional icon, optional badge (dot or count)." },
    { name: "value", type: `string`, description: "Controlled selected destination value." },
    { name: "onChange", type: `(v: string) => void`, description: "Called with the newly selected value." },
    { name: "fullWidth", type: `boolean`, default: `true`, description: "Block-level full-width bar; set false for an inline fit-content bar." }
  ],
  guidelines: {
    whenToUse: [
      "Use for top-level destinations on small screens where a navigation drawer doesn't fit.",
      "Use with 3 to 5 destinations of equal importance.",
      "Combine with a navigation rail or drawer on larger breakpoints."
    ],
    anatomy: ["80dp surface-container bar", "Destination (24dp icon in a 64\xD732dp capsule + label-medium label, state layer + ripple)", "Active tonal pill (64\xD732dp, shared-layout transition)", "Optional badge on the icon"],
    states: ["Active (secondary-container pill, filled icon, on-surface label)", "Inactive (on-surface-variant)", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (ripple)"],
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
  description: "Top app bars display information and actions at the top of a screen. Small and center-aligned are fixed 64dp rows; medium (112dp) and large (152dp) are flexible \u2014 on scroll the bar gains a surface-container color fill (M3 replaces the M2 shadow with tonal color) while the headline collapses into the top row with a spring.",
  importLine: `import { TopAppBar } from "@/components/m3";`,
  m3e: true,
  variants: ["small", "center", "medium", "large"],
  props: [
    { name: "title", type: `string`, description: "Screen title. Large type for medium/large variants, title-large for small/center." },
    { name: "variant", type: `'small' | 'center' | 'medium' | 'large'`, default: `'small'`, description: "Official height/emphasis scale: 64 / 64 centered / 112 flexible / 152 flexible." },
    { name: "actions", type: `{ icon: string; label?: string; onClick?: () => void }[]`, description: "Trailing icon actions." },
    { name: "onBack", type: `() => void`, description: "Shows the leading arrow_back button." },
    { name: "scrollTargetRef", type: `RefObject<HTMLElement | null>`, description: "Scroll container to watch; defaults to window scroll." },
    { name: "fullWidth", type: `boolean`, default: `true`, description: "Stretch to container width." }
  ],
  guidelines: {
    whenToUse: [
      "Use small for screens needing maximum content density.",
      "Use center-aligned for primary pages without back navigation.",
      "Use medium/large for hierarchical pages with long titles that reward scroll collapse."
    ],
    anatomy: ["Bar container (surface-container fill on scroll \u2014 M3 uses tonal color, not a shadow)", "Leading navigation icon (44dp hit target)", "Title (collapses for flexible variants)", "Trailing action icons"],
    states: ["Rest (surface)", "Scrolled (surface-container color fill; no shadow in M3)", "Flexible collapsed (64dp, title in top row)", "Hover/focus on icons (state layer, focus ring)"],
    dos: [
      "Match variant to hierarchy: large for top-level, small for detail screens",
      "Limit actions to the most important 2\u20133; overflow the rest into a menu",
      "Pass an inner scroll container ref when the page scrolls inside a frame"
    ],
    donts: [
      "Don't put brand logos or tabs in the top app bar \u2014 use navigation components",
      "Don't let the flexible title wrap to more than one line",
      "Don't use medium/large variants on every screen; reserve them for hierarchy peaks"
    ]
  },
  exampleCode: `const scrollRef = useRef<HTMLDivElement>(null);
<TopAppBar
  variant="large"
  title="Gallery"
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
  importLine: `import { BottomSheet } from "@/components/m3";`,
  variants: ["modal", "standard"],
  props: [
    { name: "open", type: `boolean`, description: "Controls modal visibility (animated with AnimatePresence)." },
    { name: "onClose", type: `() => void`, description: "Called on scrim click, Escape, or drag-down past 120px (or a fast downward fling)." },
    { name: "variant", type: `'modal' | 'standard'`, default: `'modal'`, description: "Overlay with scrim + focus trap, or persistent inline panel without one." },
    { name: "title", type: `string`, description: "Sheet heading (md-title-large)." },
    { name: "children", type: `React.ReactNode`, description: "Scrollable sheet content." },
    { name: "footer", type: `React.ReactNode`, description: "Pinned footer row above a divider." },
    { name: "maxHeight", type: `string`, default: `'calc(100dvh - 72px)'`, description: "Maximum sheet height (official 72dp top margin)." },
    { name: "className", type: `string`, description: "Extra classes for the sheet panel." }
  ],
  guidelines: {
    whenToUse: [
      "Use a bottom sheet to expose in-context supplementary content without leaving the page.",
      "Use for pickers and option lists on mobile-first layouts.",
      "Use the footer for a primary confirmation action."
    ],
    anatomy: ["Scrim (32% black, modal only)", "Sheet container (28px top corners, surface-container-low, elevation 1, full width up to 640dp)", "Drag handle (32\xD74dp on-surface-variant, 22dp from the top)", "Title (title-large)", "Scrollable content", "Optional footer"],
    states: ["Hidden", "Enter (spring y 100% \u2192 0)", "Open (32% scrim, body scroll locked, focus moves into the sheet and is trapped; restored to the trigger on close)", "Dragging (bottom elastic 0.6)", "Dismissed (drag > 120px or velocity > 500, scrim tap, Escape)"],
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
  importLine: `import { Button } from "@/components/m3";`,
  variants: ["filled", "tonal", "outlined", "text", "elevated"],
  props: [
    { name: "variant", type: `'filled' | 'tonal' | 'outlined' | 'text' | 'elevated'`, default: `'filled'`, description: "Visual emphasis of the button." },
    { name: "size", type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`, default: `'md'`, description: "M3E adds expressive sizes: xs(32) sm(40) md(56) lg(76) xl(96)." },
    { name: "shape", type: `'full' | 'large' | 'medium' | 'small'`, default: `'full'`, description: "Corner radius; M3E default pill morphs on press." },
    { name: "icon", type: `string`, description: "Leading Material Symbol name." },
    { name: "trailingIcon", type: `string`, description: "Trailing Material Symbol name." },
    { name: "loading", type: `boolean`, default: `false`, description: "Shows inline progress spinner and disables the button." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." }
  ],
  guidelines: {
    whenToUse: [
      "Use a filled button for the highest-emphasis action on a screen (one per region).",
      "Use tonal for medium-emphasis secondary actions.",
      "Use outlined or text for low-emphasis tertiary actions like 'Learn more'.",
      "Use elevated when the button needs separation from a patterned background."
    ],
    anatomy: ["Container (shape-morphing pill)", "State layer", "Label text (label-large 14px; rendered 600 here vs the official 500 \u2014 recorded global deviation)", "Optional leading/trailing icon"],
    states: ["Enabled", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (shape morph pill\u219220dp + 96% scale)", "Disabled (on-surface 12% container / 38% content, no elevation)"],
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
  importLine: `import { LinearProgress } from "@/components/m3";`,
  variants: ["determinate", "indeterminate", "wavy-determinate", "wavy-indeterminate"],
  props: [
    { name: "value", type: `number`, description: "0\u2013100 progress. Omit for indeterminate." },
    { name: "wavey", type: `boolean`, default: `false`, description: "M3 Expressive wavy line with sliding + amplitude-pulse motion." },
    { name: "color", type: `'primary' | 'secondary' | 'tertiary' | 'error'`, default: `'primary'`, description: "Active indicator color role." },
    { name: "height", type: `number`, default: `4`, description: "Flat track height in px (wavy line is fixed at 20px)." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." },
    { name: "label", type: `string`, description: "Optional label above the track; percentage shown when determinate." }
  ],
  guidelines: {
    whenToUse: [
      "Use linear indicators for operations that happen along a line: loading content, uploads, multi-step flows.",
      "Use determinate when progress is measurable; indeterminate otherwise.",
      "Use the Expressive wavy variant to add brand personality to casual, playful moments."
    ],
    anatomy: ["Track (surface-container-highest, 4dp, visible in flat and wavy variants)", "Active indicator (color role)", "Stop indicator: 4px dot after a 4px gap at the track end (determinate)", "Optional label + percentage"],
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
<LinearProgress wavey value={60} color="error" fullWidth />`,
  related: ["circular-progress", "loading-indicator", "slider"],
  demoName: "LinearProgressDemo"
};

// ../../src/components/m3/Button.tsx

var sizeStyles = {
  xs: { height: "32px", padding: "0 16px", typeClass: "md-label-medium", iconSize: 16, gap: "4px", touchTarget: "before:absolute before:-inset-y-2 before:content-['']" },
  sm: { height: "40px", padding: "0 24px", typeClass: "md-label-large", iconSize: 18, gap: "8px", touchTarget: "before:absolute before:-inset-y-1 before:content-['']" },
  md: { height: "56px", padding: "0 24px", typeClass: "md-label-large", iconSize: 20, gap: "8px", touchTarget: "" },
  lg: { height: "76px", padding: "0 32px", typeClass: "md-title-medium", iconSize: 24, gap: "8px", touchTarget: "" },
  xl: { height: "96px", padding: "0 40px", typeClass: "md-title-large", iconSize: 28, gap: "12px", touchTarget: "" }
};
var variantStyles = {
  filled: "bg-m3-primary text-m3-on-primary",
  tonal: "bg-m3-secondary-container text-m3-on-secondary-container",
  outlined: "border border-m3-outline bg-transparent text-m3-primary",
  text: "bg-transparent text-m3-primary px-3!",
  elevated: "m3-elevation-1 bg-m3-surface-container-low text-m3-primary hover:[box-shadow:0_1px_2px_0_rgb(0_0_0/0.30),0_2px_6px_2px_rgb(0_0_0/0.15)]"
};
var disabledStyles = {
  filled: "bg-m3-on-surface/12 text-m3-on-surface/38 shadow-none!",
  tonal: "bg-m3-on-surface/12 text-m3-on-surface/38 shadow-none!",
  outlined: "border border-m3-on-surface/12 text-m3-on-surface/38",
  text: "text-m3-on-surface/38 px-3!",
  elevated: "bg-m3-on-surface/12 text-m3-on-surface/38"
};
var shapeStyles = {
  full: "rounded-full",
  large: "rounded-2xl",
  medium: "rounded-xl",
  small: "rounded-lg"
};
var Button = React3.forwardRef(function Button2({
  variant = "filled",
  size = "md",
  shape = "full",
  icon,
  trailingIcon,
  loading = false,
  fullWidth = false,
  className,
  children,
  disabled,
  onKeyDown,
  onKeyUp,
  onBlur,
  ...props
}, ref) {
  const s = sizeStyles[size];
  const isDisabled = disabled || loading;
  const [pressed, setPressed] = React3.useState(false);
  const morphs = shape === "full" && !isDisabled;
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
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    _framermotion.motion.button,
    {
      ref,
      type: "button",
      disabled: isDisabled,
      "aria-busy": loading || void 0,
      "data-pressed": pressed || void 0,
      onPointerDown: () => setPressed(true),
      onPointerUp: () => setPressed(false),
      onPointerLeave: () => setPressed(false),
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      onBlur: handleBlur,
      whileTap: isDisabled ? void 0 : { scale: 0.96 },
      animate: morphs ? { borderRadius: pressed ? shapeMorph.button.pressed : shapeMorph.button.rest } : void 0,
      transition: { scale: springs.fastVisual, borderRadius: springs.expressiveEffects },
      className: cn(
        "m3-state m3-focus relative inline-flex select-none items-center justify-center",
        "transition-colors duration-150",
        s.typeClass,
        isDisabled ? disabledStyles[variant] : variantStyles[variant],
        morphs ? void 0 : shapeStyles[shape],
        fullWidth && "w-full",
        isDisabled && "pointer-events-none",
        s.touchTarget,
        className
      ),
      style: {
        height: s.height,
        padding: s.padding,
        gap: s.gap
      },
      ...props,
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { initial: false, children: loading && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          _framermotion.motion.span,
          {
            initial: { width: 0, opacity: 0, marginRight: 0 },
            animate: { width: s.iconSize, opacity: 1, marginRight: parseInt(s.gap) },
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
        !loading && icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon, size: s.iconSize, fill: variant === "filled" }),
        children,
        trailingIcon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: trailingIcon, size: s.iconSize, fill: variant === "filled" })
      ]
    }
  );
});

// ../../src/components/m3/IconButton.tsx



var sizeStyles2 = {
  xs: { container: 28, icon: 16, touchTarget: "before:absolute before:-inset-[10px] before:content-['']" },
  sm: { container: 36, icon: 20, touchTarget: "before:absolute before:-inset-1.5 before:content-['']" },
  md: { container: 40, icon: 24, touchTarget: "before:absolute before:-inset-1 before:content-['']" },
  lg: { container: 48, icon: 28, touchTarget: "" },
  xl: { container: 64, icon: 36, touchTarget: "" }
};
var variantStyles2 = {
  standard: "bg-transparent text-m3-on-surface-variant",
  filled: "bg-m3-primary text-m3-on-primary",
  tonal: "bg-m3-secondary-container text-m3-on-secondary-container",
  outlined: "border border-m3-outline bg-transparent text-m3-on-surface-variant"
};
var selectedStyles = {
  standard: "text-m3-primary",
  filled: "",
  tonal: "",
  outlined: "text-m3-primary"
};
var disabledStyles2 = {
  standard: "text-m3-on-surface/38",
  filled: "bg-m3-on-surface/12 text-m3-on-surface/38",
  tonal: "bg-m3-on-surface/12 text-m3-on-surface/38",
  outlined: "border border-m3-on-surface/12 text-m3-on-surface/38"
};
var IconButton = React4.forwardRef(function IconButton2({
  variant = "standard",
  size = "md",
  icon,
  toggleable = false,
  selected,
  onSelectedChange,
  disabled,
  className,
  onClick,
  type,
  ...props
}, ref) {
  const s = sizeStyles2[size];
  const [internalSelected, setInternalSelected] = React4.useState(false);
  const isSelected = toggleable ? _nullishCoalesce(selected, () => ( internalSelected)) : false;
  const handleClick = React4.useCallback(
    (e) => {
      if (toggleable) {
        const next = !isSelected;
        if (selected === void 0) setInternalSelected(next);
        _optionalChain([onSelectedChange, 'optionalCall', _7 => _7(next)]);
      }
      _optionalChain([onClick, 'optionalCall', _8 => _8(e)]);
    },
    [toggleable, isSelected, selected, onSelectedChange, onClick]
  );
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    _framermotion.motion.button,
    {
      ref,
      type: _nullishCoalesce(type, () => ( "button")),
      disabled,
      onClick: handleClick,
      whileTap: disabled ? void 0 : { scale: 0.96 },
      transition: springs.fastVisual,
      "aria-pressed": toggleable ? isSelected : void 0,
      className: cn(
        "m3-state m3-focus relative inline-flex select-none items-center justify-center rounded-full",
        "transition-colors duration-150",
        variantStyles2[variant],
        toggleable && isSelected && selectedStyles[variant],
        disabled && disabledStyles2[variant],
        disabled && "pointer-events-none",
        s.touchTarget,
        className
      ),
      style: { width: s.container, height: s.container },
      ...props,
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
  );
});

// ../../src/components/m3/FAB.tsx



var sizeStyles3 = {
  small: { container: 40, icon: 24, shape: "rounded-2xl", touchTarget: "before:absolute before:-inset-1 before:content-['']" },
  medium: { container: 56, icon: 24, shape: "rounded-2xl", touchTarget: "" },
  large: { container: 96, icon: 36, shape: "rounded-[28px]", touchTarget: "" },
  "extra-large": { container: 132, icon: 48, shape: "rounded-[28px]", touchTarget: "" }
};
var fabColorStyles = {
  primary: "bg-m3-primary-container text-m3-on-primary-container",
  secondary: "bg-m3-secondary-container text-m3-on-secondary-container",
  tertiary: "bg-m3-tertiary-container text-m3-on-tertiary-container",
  surface: "bg-m3-surface-container-high text-m3-on-surface"
};
var Fab = React5.forwardRef(function Fab2({ color = "primary", size = "medium", icon, lowered = false, disabled, className, ...props }, ref) {
  const s = sizeStyles3[size];
  const [hovered, setHovered] = React5.useState(false);
  const restElevation = lowered ? "m3-elevation-1" : "m3-elevation-3";
  const hoverElevation = lowered ? "m3-elevation-2" : "m3-elevation-4";
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    _framermotion.motion.button,
    {
      ref,
      type: "button",
      disabled,
      whileHover: disabled ? void 0 : { scale: 1.03 },
      whileTap: disabled ? void 0 : { scale: 0.94 },
      transition: springs.expressive,
      onHoverStart: () => setHovered(true),
      onHoverEnd: () => setHovered(false),
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
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon, size: s.icon })
      ]
    }
  );
});

// ../../src/components/m3/ExtendedFab.tsx



var ExtendedFab = React6.forwardRef(
  function ExtendedFab2({ color = "primary", icon, label, lowered = false, disabled, className, ...props }, ref) {
    const [hovered, setHovered] = React6.useState(false);
    const restElevation = lowered ? "m3-elevation-1" : "m3-elevation-3";
    const hoverElevation = lowered ? "m3-elevation-2" : "m3-elevation-4";
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
      _framermotion.motion.button,
      {
        ref,
        type: "button",
        disabled,
        whileHover: disabled ? void 0 : { scale: 1.03 },
        whileTap: disabled ? void 0 : { scale: 0.94 },
        transition: springs.expressive,
        onHoverStart: () => setHovered(true),
        onHoverEnd: () => setHovered(false),
        className: cn(
          "m3-state m3-focus relative inline-flex select-none items-center justify-center overflow-hidden rounded-2xl px-5",
          "gap-2 md-label-large",
          "transition-[background-color,box-shadow] duration-200",
          disabled ? "bg-m3-on-surface/12 text-m3-on-surface/38" : fabColorStyles[color],
          disabled ? void 0 : hovered ? hoverElevation : restElevation,
          disabled && "pointer-events-none",
          className
        ),
        style: { height: 56 },
        ...props,
        children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon, size: 24 }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { children: label })
        ]
      }
    );
  }
);

// ../../src/components/m3/FabMenu.tsx



var FabMenu = React7.forwardRef(function FabMenu2({
  actions,
  direction = "vertical",
  color = "primary",
  open,
  onOpenChange,
  docked = false,
  dockedTo = "screen",
  className,
  ...props
}, ref) {
  const [internalOpen, setInternalOpen] = React7.useState(false);
  const isOpen = _nullishCoalesce(open, () => ( internalOpen));
  const containerRef = React7.useRef(null);
  const setOpen = React7.useCallback(
    (next) => {
      if (open === void 0) setInternalOpen(next);
      _optionalChain([onOpenChange, 'optionalCall', _9 => _9(next)]);
    },
    [open, onOpenChange]
  );
  React7.useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, setOpen]);
  const setRefs = React7.useCallback(
    (node) => {
      containerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );
  const isVertical = direction === "vertical";
  const isDocked = docked === true;
  const docksToScreen = isDocked && dockedTo === "screen";
  const verticalCascade = isDocked ? docksToScreen : isVertical;
  const shapeRest = `${shapes.large} ${shapes.large} ${shapes.large} ${shapes.large}`;
  const shapeDockedOpen = `${shapes.large} ${shapes.large} ${shapes.none} ${shapes.none}`;
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    "div",
    {
      ref: setRefs,
      className: cn(
        isDocked ? cn(
          // Anchor by the right edge, 20px (half the 40dp FAB) right of
          // center, so the widening cascade grows away from the FAB.
          "bottom-0 right-[calc(50%_-_20px)] z-50 flex gap-3",
          docksToScreen ? "fixed flex-col items-end" : "absolute flex-row items-end"
        ) : cn(
          "relative inline-flex gap-3",
          isVertical ? "flex-col items-end" : "flex-row items-center"
        ),
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: isOpen && actions.map((action, i) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
          _framermotion.motion.div,
          {
            initial: { scale: 0, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0, opacity: 0 },
            transition: { ...springs.expressive, delay: i * durations.short1 / 1e3 },
            className: cn(
              "inline-flex items-center gap-3",
              verticalCascade ? "flex-row" : "flex-col"
            ),
            children: [
              action.label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "whitespace-nowrap rounded bg-m3-inverse-surface px-2 py-0.5 md-label-medium text-m3-inverse-on-surface", children: action.label }),
              /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
                _framermotion.motion.button,
                {
                  type: "button",
                  "aria-label": action.label,
                  onClick: () => {
                    _optionalChain([action, 'access', _10 => _10.onClick, 'optionalCall', _11 => _11()]);
                    setOpen(false);
                  },
                  whileTap: { scale: 0.96 },
                  transition: springs.fastVisual,
                  className: "m3-state m3-focus relative m3-elevation-1 inline-flex h-8 w-8 select-none items-center justify-center rounded-full bg-m3-primary-container text-m3-on-primary-container before:absolute before:-inset-2 before:content-['']",
                  children: [
                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: action.icon, size: 18 })
                  ]
                }
              )
            ]
          },
          `${action.icon}-${i}`
        )) }),
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
          _framermotion.motion.button,
          {
            type: "button",
            "aria-haspopup": "menu",
            "aria-expanded": isOpen,
            "aria-label": isOpen ? "Close actions menu" : "Open actions menu",
            onClick: () => setOpen(!isOpen),
            whileHover: { scale: 1.03 },
            whileTap: { scale: 0.94 },
            transition: springs.expressive,
            animate: isDocked ? {
              // M3E shape morph: bottom corners square off to connect the
              // open menu to the edge/bar (BottomAppBar FAB morph pattern).
              borderRadius: isOpen ? shapeDockedOpen : shapeRest,
              transition: springs.expressiveEffects
            } : void 0,
            className: cn(
              "m3-state m3-focus relative m3-elevation-3 inline-flex h-10 w-10 select-none items-center justify-center rounded-2xl",
              "transition-[background-color,box-shadow] duration-200",
              "before:absolute before:-inset-1 before:content-['']",
              fabColorStyles[color]
            ),
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                _framermotion.motion.span,
                {
                  animate: { rotate: isOpen ? 45 : 0 },
                  transition: springs.expressiveEffects,
                  className: "inline-flex",
                  children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "edit", size: 24 })
                }
              )
            ]
          }
        )
      ]
    }
  );
});

// ../../src/components/m3/SplitButton.tsx



var sizeStyles4 = {
  sm: { height: 40, padding: "0 20px", icon: 20 },
  md: { height: 56, padding: "0 24px", icon: 24 },
  lg: { height: 76, padding: "0 32px", icon: 28 }
};
var variantStyles3 = {
  filled: "bg-m3-primary text-m3-on-primary",
  tonal: "bg-m3-secondary-container text-m3-on-secondary-container",
  outlined: "border border-m3-outline bg-transparent text-m3-primary"
};
var disabledStyles3 = {
  filled: "bg-m3-on-surface/12 text-m3-on-surface/38",
  tonal: "bg-m3-on-surface/12 text-m3-on-surface/38",
  outlined: "border border-m3-on-surface/12 text-m3-on-surface/38"
};
var SplitButton = React8.forwardRef(function SplitButton2({ label, onClick, items, variant = "filled", size = "md", disabled = false, className }, ref) {
  const [open, setOpen] = React8.useState(false);
  const containerRef = React8.useRef(null);
  const menuRef = React8.useRef(null);
  const s = sizeStyles4[size];
  React8.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);
  const setRefs = React8.useCallback(
    (node) => {
      containerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );
  const handleMenuKeyDown = (e) => {
    const menuItems = Array.from(
      _nullishCoalesce(_optionalChain([menuRef, 'access', _12 => _12.current, 'optionalAccess', _13 => _13.querySelectorAll, 'call', _14 => _14('[role="menuitem"]')]), () => ( []))
    );
    if (menuItems.length === 0) return;
    const currentIndex = menuItems.indexOf(document.activeElement);
    let nextIndex = null;
    if (e.key === "ArrowDown") nextIndex = currentIndex < 0 ? 0 : Math.min(currentIndex + 1, menuItems.length - 1);
    else if (e.key === "ArrowUp") nextIndex = currentIndex < 0 ? menuItems.length - 1 : Math.max(currentIndex - 1, 0);
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = menuItems.length - 1;
    if (nextIndex !== null) {
      e.preventDefault();
      _optionalChain([menuItems, 'access', _15 => _15[nextIndex], 'optionalAccess', _16 => _16.focus, 'call', _17 => _17()]);
    }
  };
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { ref: setRefs, className: cn("relative inline-flex", className), children: [
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
      _framermotion.motion.div,
      {
        whileTap: disabled ? void 0 : { scale: 0.96 },
        transition: springs.fastVisual,
        className: cn(
          "inline-flex items-stretch rounded-full",
          "transition-colors duration-150",
          disabled ? disabledStyles3[variant] : variantStyles3[variant],
          disabled && "pointer-events-none"
        ),
        children: [
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
            "button",
            {
              type: "button",
              disabled,
              onClick,
              className: cn(
                "m3-state m3-focus relative inline-flex select-none items-center justify-center rounded-l-full md-label-large",
                "focus-visible:z-10"
              ),
              style: { height: s.height, padding: s.padding },
              children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
                label
              ]
            }
          ),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { "aria-hidden": "true", className: "w-px self-stretch bg-current opacity-20" }),
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
            "button",
            {
              type: "button",
              disabled,
              "aria-haspopup": "menu",
              "aria-expanded": open,
              "aria-label": `More actions for ${label}`,
              onClick: () => setOpen((o) => !o),
              className: "m3-state m3-focus relative inline-flex w-10 select-none items-center justify-center rounded-r-full focus-visible:z-10",
              children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                  _framermotion.motion.span,
                  {
                    animate: { rotate: open ? 180 : 0 },
                    transition: springs.fastSpatial,
                    className: "inline-flex",
                    children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "arrow_drop_down", size: s.icon })
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: open && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      _framermotion.motion.div,
      {
        ref: menuRef,
        role: "menu",
        "aria-label": `${label} actions`,
        initial: { opacity: 0, scale: 0.92, y: -6 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: -6 },
        transition: springs.fastSpatial,
        onKeyDown: handleMenuKeyDown,
        style: { transformOrigin: "top left", borderRadius: 4 },
        className: "m3-elevation-2 absolute left-0 top-full z-20 mt-2 min-w-[220px] overflow-hidden bg-m3-surface-container",
        children: items.map((item, i) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: () => {
              _optionalChain([item, 'access', _18 => _18.onClick, 'optionalCall', _19 => _19()]);
              setOpen(false);
            },
            className: "m3-state m3-focus flex min-h-12 w-full items-center gap-3 px-4 py-2 text-left text-m3-on-surface md-label-large",
            children: [
              item.icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: item.icon, size: 20, className: "text-m3-on-surface-variant" }),
              item.label
            ]
          },
          `${item.label}-${i}`
        ))
      }
    ) })
  ] });
});

// ../../src/components/m3/ButtonGroup.tsx



var sizeStyles5 = {
  sm: { height: 40, padding: "0 20px", icon: 18 },
  md: { height: 56, padding: "0 24px", icon: 20 },
  lg: { height: 76, padding: "0 32px", icon: 24 }
};
var variantStyles4 = {
  outlined: "border border-m3-outline bg-transparent text-m3-on-surface",
  filled: "bg-m3-surface-container-highest text-m3-on-surface",
  tonal: "bg-m3-secondary-container text-m3-on-secondary-container"
};
var selectedStyles2 = "border-transparent bg-m3-secondary-container text-m3-on-secondary-container";
var disabledStyles4 = {
  outlined: "border border-m3-on-surface/12 text-m3-on-surface/38",
  filled: "bg-m3-on-surface/12 text-m3-on-surface/38",
  tonal: "bg-m3-on-surface/12 text-m3-on-surface/38"
};
var ButtonGroup = React9.forwardRef(function ButtonGroup2({
  buttons,
  variant = "outlined",
  selection = "none",
  value,
  onValueChange,
  variableWidths = false,
  size = "md",
  disabled = false,
  className,
  ...props
}, ref) {
  const [internalValue, setInternalValue] = React9.useState([]);
  const [hoveredId, setHoveredId] = React9.useState(null);
  const isControlled = value !== void 0;
  const selectedIds = isControlled ? value : internalValue;
  const s = sizeStyles5[size];
  const toggle = React9.useCallback(
    (id) => {
      let next;
      if (selection === "single") {
        next = selectedIds.includes(id) ? [] : [id];
      } else if (selection === "multiple") {
        next = selectedIds.includes(id) ? selectedIds.filter((v) => v !== id) : [...selectedIds, id];
      } else {
        return;
      }
      if (!isControlled) setInternalValue(next);
      _optionalChain([onValueChange, 'optionalCall', _20 => _20(next)]);
    },
    [selection, selectedIds, isControlled, onValueChange]
  );
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    "div",
    {
      ref,
      role: "group",
      className: cn("inline-flex gap-[4px]", variableWidths && "w-full", className),
      ...props,
      children: buttons.map((btn) => {
        const isSelected = selection !== "none" && selectedIds.includes(btn.id);
        const isHot = variableWidths && !disabled && (hoveredId === btn.id || isSelected);
        return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
          _framermotion.motion.button,
          {
            type: "button",
            disabled,
            "aria-pressed": selection !== "none" ? isSelected : void 0,
            onClick: () => {
              toggle(btn.id);
              _optionalChain([btn, 'access', _21 => _21.onClick, 'optionalCall', _22 => _22()]);
            },
            onHoverStart: variableWidths ? () => setHoveredId(btn.id) : void 0,
            onHoverEnd: variableWidths ? () => setHoveredId((cur) => cur === btn.id ? null : cur) : void 0,
            whileTap: disabled ? void 0 : { scale: 0.96 },
            animate: variableWidths ? { flexGrow: isHot ? 1.4 : 1 } : void 0,
            transition: variableWidths ? { scale: springs.fastVisual, flexGrow: springs.defaultSpatial } : springs.fastVisual,
            className: cn(
              "m3-state m3-focus relative inline-flex select-none items-center justify-center gap-2 rounded-full md-label-large",
              "transition-colors duration-150",
              "before:absolute before:-inset-y-1 before:content-['']",
              s.padding,
              disabled ? disabledStyles4[variant] : variantStyles4[variant],
              !disabled && isSelected && selectedStyles2,
              disabled && "pointer-events-none"
            ),
            style: variableWidths ? { height: s.height, flexBasis: 0, minWidth: 0 } : { height: s.height },
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
              btn.icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: btn.icon, size: s.icon }),
              btn.label
            ]
          },
          btn.id
        );
      })
    }
  );
});

// ../../src/components/m3/SegmentedButton.tsx



var sizeStyles6 = {
  sm: { height: 40, icon: 18 },
  md: { height: 56, icon: 20 }
};
var SegmentedButton = React10.forwardRef(
  function SegmentedButton2({ options, type = "single", value, onValueChange, size = "sm", disabled = false, className, ...props }, ref) {
    const [internalValue, setInternalValue] = React10.useState([]);
    const isControlled = value !== void 0;
    const selectedList = isControlled ? Array.isArray(value) ? value : [value] : internalValue;
    const s = sizeStyles6[size];
    const select = React10.useCallback(
      (v) => {
        let next;
        if (type === "single") {
          next = selectedList.includes(v) ? [] : [v];
        } else {
          next = selectedList.includes(v) ? selectedList.filter((x) => x !== v) : [...selectedList, v];
        }
        if (!isControlled) setInternalValue(next);
        _optionalChain([onValueChange, 'optionalCall', _23 => _23(type === "single" ? _nullishCoalesce(next[0], () => ( "")) : next)]);
      },
      [type, selectedList, isControlled, onValueChange]
    );
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "div",
      {
        ref,
        role: "group",
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
            _framermotion.motion.button,
            {
              type: "button",
              disabled,
              "aria-pressed": isSelected,
              onClick: () => select(option.value),
              whileTap: disabled ? void 0 : { scale: 0.97 },
              transition: springs.fastVisual,
              className: cn(
                "m3-state m3-focus relative flex h-full flex-1 items-center justify-center gap-2 px-4",
                /* 48dp touch target: invisible ::before hit-expander, vertical-only
                   (horizontal expansion would dead-zone across adjacent segments). */
                "before:absolute before:content-[''] before:left-0 before:right-0 before:-inset-y-2",
                "md-label-large transition-colors duration-150",
                i > 0 && (disabled ? "border-l border-m3-on-surface/12" : "border-l border-m3-outline"),
                i === 0 && "rounded-l-full",
                i === options.length - 1 && "rounded-r-full",
                disabled ? isSelected ? "bg-m3-on-surface/12 text-m3-on-surface/38" : "bg-transparent text-m3-on-surface/38" : isSelected ? "bg-m3-secondary-container text-m3-on-secondary-container" : "bg-transparent text-m3-on-surface"
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
                option.icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: option.icon, size: s.icon }),
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
function Badge({
  value,
  showDot = false,
  children,
  color = "error",
  max = 99,
  disabled = false,
  className
}) {
  const hasValue = value !== void 0 && value !== "";
  const display = typeof value === "number" && value > max ? `${max}+` : value;
  const stateCls = disabled ? "pointer-events-none opacity-38" : "";
  const badge = showDot ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _framermotion.motion.span,
    {
      initial: { scale: 0 },
      animate: { scale: 1 },
      transition: asTransition(springs.bouncy),
      "aria-hidden": "true",
      className: cn("block h-[6px] w-[6px] rounded-full", colorStyles[color], className)
    },
    "dot"
  ) : hasValue ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _framermotion.motion.span,
    {
      initial: { scale: 0 },
      animate: { scale: 1 },
      transition: asTransition(springs.bouncy),
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
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: cn("inline-flex", stateCls), children: badge });
  }
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: "relative inline-flex", children: [
    children,
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "span",
      {
        className: cn(
          "absolute inline-flex",
          // Official BadgedBox offsets: text badge 12dp from end / 14dp overlap;
          // icon-only dot flush with the anchor corner.
          showDot ? "right-0 top-0" : "-right-1 -top-0.5",
          stateCls
        ),
        children: badge
      }
    )
  ] });
}

// ../../src/components/m3/LinearProgress.tsx


var asTransition2 = (s) => s;
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
var WAVE_PATH = wavePath(240, 20, 20);
function WaveSvg({ stroke, slideDuration }) {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _framermotion.motion.svg,
    {
      viewBox: "0 0 200 20",
      preserveAspectRatio: "none",
      className: "block h-full w-[200%]",
      animate: { x: ["0%", "-10%"] },
      transition: { duration: slideDuration, repeat: Infinity, ease: "linear" },
      "aria-hidden": "true",
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        "path",
        {
          d: WAVE_PATH,
          fill: "none",
          stroke,
          strokeWidth: 3,
          strokeLinecap: "round",
          vectorEffect: "non-scaling-stroke"
        }
      )
    }
  );
}
function PulsingWave({ stroke, slideDuration }) {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _framermotion.motion.div,
    {
      className: "h-full w-full",
      style: { transformOrigin: "50% 50%" },
      animate: { scaleY: [1, 1.4, 1] },
      transition: { duration: durations.extraLong4 / 1e3, repeat: Infinity, ease: "easeInOut" },
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, WaveSvg, { stroke, slideDuration })
    }
  );
}
function LinearProgress({
  value,
  wavey = false,
  color = "primary",
  height = 4,
  fullWidth = false,
  label,
  className
}) {
  const determinate = typeof value === "number";
  const v = determinate ? Math.min(100, Math.max(0, value)) : 0;
  const stroke = colorVar(color);
  const slide = durations.extraLong2 / 1e3;
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    "div",
    {
      role: "progressbar",
      "aria-valuemin": determinate ? 0 : void 0,
      "aria-valuemax": determinate ? 100 : void 0,
      "aria-valuenow": determinate ? Math.round(v) : void 0,
      "aria-label": _nullishCoalesce(label, () => ( "Loading")),
      className: cn("flex flex-col gap-1", fullWidth && "w-full", className),
      children: [
        (label || determinate) && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-center justify-between", children: [
          label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-label-medium text-m3-on-surface-variant", children: label }),
          determinate && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: "md-label-medium text-m3-on-surface-variant", children: [
            Math.round(v),
            "%"
          ] })
        ] }),
        wavey ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "relative h-5 overflow-hidden rounded-full", children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-m3-surface-container-highest" }),
          determinate ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "absolute inset-y-0 left-0 overflow-hidden", style: { width: `${v}%` }, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, PulsingWave, { stroke, slideDuration: slide }) }) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, PulsingWave, { stroke, slideDuration: slide }),
          determinate && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
            "span",
            {
              className: "absolute right-0 top-1/2 h-[4px] w-[4px] -translate-y-1/2 rounded-full",
              style: { background: stroke }
            }
          )
        ] }) : /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
          "div",
          {
            className: "relative overflow-visible rounded-full bg-m3-surface-container-highest",
            style: { height },
            children: [
              determinate ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                _framermotion.motion.div,
                {
                  className: "absolute left-0 top-0 h-full rounded-full",
                  style: { background: stroke, maxWidth: "calc(100% - 8px)" },
                  initial: { width: 0 },
                  animate: { width: `${v}%` },
                  transition: asTransition2(springs.defaultSpatial)
                }
              ) : /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "absolute inset-0 overflow-hidden rounded-full", children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                  _framermotion.motion.div,
                  {
                    className: "absolute top-0 h-full rounded-full",
                    style: { background: stroke, width: "35%" },
                    animate: { left: ["-35%", "100%"] },
                    transition: {
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
                    animate: { left: ["100%", "-60%"] },
                    transition: {
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
                  className: "absolute right-0 top-1/2 h-[4px] w-[4px] -translate-y-1/2 rounded-full",
                  style: { background: stroke }
                }
              )
            ]
          }
        )
      ]
    }
  );
}

// ../../src/components/m3/CircularProgress.tsx


var asTransition3 = (s) => s;
function CircularProgress({
  value,
  size = 48,
  thickness = 4,
  color = "primary",
  ariaLabel = "Loading",
  className
}) {
  const determinate = typeof value === "number";
  const v = determinate ? Math.min(100, Math.max(0, value)) : 0;
  const stroke = colorVar(color);
  const cx = size / 2;
  const r = (size - thickness) / 2 - 1;
  const c = 2 * Math.PI * r;
  const gap = 4;
  const maxArc = c - gap - thickness;
  const arcLen = v / 100 * maxArc;
  const offset = c - arcLen;
  const dotR = thickness / 2;
  const arc = 0.15;
  const spin = durations.long2 * 3 / 1e3;
  const track = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    "circle",
    {
      cx,
      cy: cx,
      r,
      fill: "none",
      stroke: "var(--md-surface-container-highest)",
      strokeWidth: thickness
    }
  );
  if (!determinate) {
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
      _framermotion.motion.svg,
      {
        role: "progressbar",
        "aria-label": ariaLabel,
        width: size,
        height: size,
        viewBox: `0 0 ${size} ${size}`,
        className: cn("shrink-0", className),
        animate: { rotate: 360 },
        transition: { duration: spin, repeat: Infinity, ease: "linear" },
        children: [
          track,
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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
              animate: { strokeDasharray: [`${arc} ${1 - arc}`, "0.75 0.25", `${arc} ${1 - arc}`] },
              transition: { duration: spin, repeat: Infinity, ease: "easeInOut" }
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    _framermotion.motion.svg,
    {
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": Math.round(v),
      "aria-label": ariaLabel,
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`,
      className: cn("shrink-0", className),
      children: [
        track,
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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
            initial: { strokeDashoffset: c },
            animate: { strokeDashoffset: offset },
            transition: asTransition3(springs.defaultSpatial)
          }
        ),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "circle", { cx, cy: cx - r, r: dotR, fill: stroke })
      ]
    }
  );
}

// ../../src/components/m3/LoadingIndicator.tsx


var asTransition4 = (s) => s;
var containerStyles = {
  primary: "bg-m3-primary-container",
  secondary: "bg-m3-secondary-container",
  tertiary: "bg-m3-tertiary-container",
  error: "bg-m3-error-container"
};
function LoadingIndicator({
  size = 48,
  active = true,
  color = "primary",
  className
}) {
  const reduceMotion = _framermotion.useReducedMotion.call(void 0, );
  const spinning = active && !reduceMotion;
  const globalRotation = durations.extraLong4 * 4.666 / 1e3;
  const morphStep = durations.extraLong4 * 0.65 / 1e3;
  const spin = durations.extraLong4 / 1e3;
  const arcStroke = colorVar(`on-${color}-container`);
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    _framermotion.motion.div,
    {
      role: "status",
      "aria-label": "Loading",
      className: cn("relative flex items-center justify-center", containerStyles[color], className),
      style: { width: size, height: size },
      animate: spinning ? { borderRadius: ["50%", "24%", "50%"], rotate: 360, opacity: 1 } : { borderRadius: "50%", rotate: 0, opacity: active ? 1 : 0.38 },
      transition: spinning ? {
        // Per-value transitions: tween keyframes for the morph (springs
        // only support two keyframes), linear for the endless rotation.
        borderRadius: { duration: morphStep * 2, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: globalRotation, repeat: Infinity, ease: "linear" },
        opacity: { duration: durations.short4 / 1e3 }
      } : asTransition4(springs.fastVisual),
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          _framermotion.motion.div,
          {
            className: "absolute inset-0",
            animate: spinning ? { rotate: 360 } : { rotate: 0 },
            transition: spinning ? { duration: spin, repeat: Infinity, ease: "linear" } : asTransition4(springs.fastVisual),
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "svg", { viewBox: "0 0 100 100", className: "h-full w-full", "aria-hidden": "true", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
              "circle",
              {
                cx: "50",
                cy: "50",
                r: "27",
                fill: "none",
                stroke: arcStroke,
                strokeWidth: "5",
                strokeLinecap: "round",
                strokeDasharray: "50 120"
              }
            ) })
          }
        ),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          _framermotion.motion.div,
          {
            className: "absolute inset-0",
            animate: spinning ? { rotate: -360 } : { rotate: 0 },
            transition: spinning ? { duration: spin * 1.6, repeat: Infinity, ease: "linear" } : asTransition4(springs.fastVisual),
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "svg", { viewBox: "0 0 100 100", className: "h-full w-full", "aria-hidden": "true", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
              "circle",
              {
                cx: "50",
                cy: "50",
                r: "17.5",
                fill: "none",
                stroke: arcStroke,
                strokeWidth: "5",
                strokeLinecap: "round",
                strokeDasharray: "30 80"
              }
            ) })
          }
        )
      ]
    }
  );
}

// ../../src/components/m3/Snackbar.tsx



var asTransition5 = (s) => s;
var DEFAULT_EXIT = { x: 0, y: 60 };
function exitDirectionFor(offset, velocity) {
  const src = Math.abs(offset.x) > 80 || Math.abs(offset.y) > 80 ? offset : velocity;
  if (Math.abs(src.x) >= Math.abs(src.y)) {
    return { x: src.x >= 0 ? 160 : -160, y: 0 };
  }
  return { x: 0, y: src.y >= 0 ? 60 : -60 };
}
var exitVariants = {
  exit: (dir) => ({
    x: dir.x,
    y: dir.y,
    opacity: 0,
    transition: asTransition5(springs.expressive)
  })
};
function Snackbar({
  open,
  message,
  icon,
  actionLabel,
  onAction,
  onClose,
  duration = 4e3,
  className
}) {
  React11.useEffect(() => {
    if (!open || !duration || duration <= 0) return;
    const t = window.setTimeout(() => _optionalChain([onClose, 'optionalCall', _24 => _24()]), duration);
    return () => window.clearTimeout(t);
  }, [open, duration, onClose]);
  const [exitDir, setExitDir] = React11.useState(DEFAULT_EXIT);
  React11.useEffect(() => {
    if (open) setExitDir(DEFAULT_EXIT);
  }, [open]);
  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    const far = Math.abs(offset.x) > 80 || Math.abs(offset.y) > 80;
    const flick = Math.abs(velocity.x) > 500 || Math.abs(velocity.y) > 500;
    if (!far && !flick) return;
    setExitDir(exitDirectionFor(offset, velocity));
    _optionalChain([onClose, 'optionalCall', _25 => _25()]);
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { custom: exitDir, children: open && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    _framermotion.motion.div,
    {
      role: "status",
      "aria-live": "polite",
      initial: { y: 60, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: "exit",
      variants: exitVariants,
      drag: true,
      dragElastic: 0.25,
      dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
      onDragEnd: handleDragEnd,
      transition: asTransition5(springs.expressive),
      style: { touchAction: "none" },
      className: cn(
        "m3-elevation-3 md-body-medium fixed bottom-6 left-6 z-[70] flex min-h-12 min-w-[344px] max-w-[min(672px,calc(100vw-3rem))] items-center gap-3 rounded-[4px] bg-m3-inverse-surface px-4 py-3 text-m3-inverse-on-surface",
        className
      ),
      children: [
        icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon, size: 18, className: "shrink-0" }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "flex-1", children: message }),
        actionLabel && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          "button",
          {
            type: "button",
            onClick: onAction,
            className: "m3-state md-label-large min-h-9 shrink-0 rounded-full px-3 uppercase text-m3-inverse-primary",
            children: actionLabel
          }
        ),
        onClose && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          "button",
          {
            type: "button",
            onClick: onClose,
            "aria-label": "Close",
            className: "m3-state flex size-9 shrink-0 items-center justify-center rounded-full text-m3-inverse-on-surface",
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "close", size: 18 })
          }
        )
      ]
    }
  ) });
}

// ../../src/components/m3/Tooltip.tsx



var asTransition6 = (s) => s;
var SHOW_DELAY = durations.long2;
var HIDE_DELAY = durations.long4;
var LONG_PRESS_DELAY = durations.long2;
function Tooltip({
  content,
  rich = false,
  title,
  actionLabel,
  onAction,
  placement = "top",
  children,
  className
}) {
  const [visible, setVisible] = React12.useState(false);
  const timer = React12.useRef(null);
  const tooltipId = React12.useId();
  const cancel = React12.useCallback(() => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);
  const scheduleShow = React12.useCallback(
    (delay) => {
      cancel();
      timer.current = window.setTimeout(() => {
        timer.current = null;
        setVisible(true);
      }, delay);
    },
    [cancel]
  );
  const scheduleHide = React12.useCallback(() => {
    cancel();
    timer.current = window.setTimeout(() => {
      timer.current = null;
      setVisible(false);
    }, HIDE_DELAY);
  }, [cancel]);
  const hideNow = React12.useCallback(() => {
    cancel();
    setVisible(false);
  }, [cancel]);
  React12.useEffect(() => cancel, [cancel]);
  const handlePointerEnter = (e) => {
    if (e.pointerType === "touch") return;
    scheduleShow(SHOW_DELAY);
  };
  const handlePointerLeave = (e) => {
    if (e.pointerType === "touch") return;
    scheduleHide();
  };
  const handlePointerDown = (e) => {
    if (e.pointerType === "touch") scheduleShow(LONG_PRESS_DELAY);
  };
  const handlePointerUp = (e) => {
    if (e.pointerType !== "touch") return;
    if (timer.current !== null) {
      cancel();
    } else {
      setVisible((v) => !v);
    }
  };
  const trigger = React12.isValidElement(children) ? React12.cloneElement(children, { "aria-describedby": tooltipId }) : children;
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    "span",
    {
      className: cn("relative inline-flex", className),
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerCancel: hideNow,
      onFocus: () => scheduleShow(SHOW_DELAY),
      onBlur: hideNow,
      children: [
        trigger,
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: visible && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
          _framermotion.motion.span,
          {
            role: "tooltip",
            id: tooltipId,
            initial: { opacity: 0, scale: 0.8, y: placement === "top" ? 4 : -4, x: "-50%" },
            animate: { opacity: 1, scale: 1, y: 0, x: "-50%" },
            exit: { opacity: 0, scale: 0.9, y: placement === "top" ? 4 : -4, x: "-50%" },
            transition: asTransition6(springs.fastVisual),
            className: cn(
              "absolute left-1/2 z-50",
              placement === "top" ? "bottom-full mb-1" : "top-full mt-1",
              rich ? (
                // Rich tooltips stay interactive (title + action); the 600ms
                // hide delay lets the pointer cross the 4px anchor gap.
                "m3-elevation-2 pointer-events-auto w-max max-w-[320px] rounded-[12px] border border-m3-outline-variant bg-m3-surface-container px-4 py-3 text-m3-on-surface-variant"
              ) : "md-body-small pointer-events-none inline-flex min-h-6 max-w-[200px] items-center rounded-[4px] bg-m3-inverse-surface px-2 py-1 text-m3-inverse-on-surface"
            ),
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                "span",
                {
                  "aria-hidden": "true",
                  className: cn(
                    "absolute left-1/2 -ml-1 h-2 w-2 rotate-45",
                    rich ? placement === "top" ? "-bottom-1 border-b border-r border-m3-outline-variant bg-m3-surface-container" : "-top-1 border-l border-t border-m3-outline-variant bg-m3-surface-container" : placement === "top" ? "-bottom-1 bg-m3-inverse-surface" : "-top-1 bg-m3-inverse-surface"
                  )
                }
              ),
              rich ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: "block", children: [
                title && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-title-small block", children: title }),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-body-medium block", children: content }),
                actionLabel && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                  "button",
                  {
                    type: "button",
                    onClick: onAction,
                    className: "m3-state md-label-large -ml-2 mt-2 inline-flex min-h-9 items-center rounded-full px-2 text-m3-primary",
                    children: actionLabel
                  }
                )
              ] }) : content
            ]
          }
        ) })
      ]
    }
  );
}

// ../../src/components/m3/Banner.tsx


var asTransition7 = (s) => s;
function Banner({
  icon,
  text,
  actions,
  open = true,
  onClose,
  fullWidth = false,
  className
}) {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { initial: false, children: open && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _framermotion.motion.div,
    {
      initial: { height: 0, opacity: 0 },
      animate: { height: "auto", opacity: 1 },
      exit: { height: 0, opacity: 0 },
      transition: asTransition7(springs.defaultSpatial),
      className: cn("overflow-hidden", fullWidth && "w-full", className),
      children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "bg-m3-surface-container-low", children: [
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
      ] })
    }
  ) });
}

// ../../src/components/m3/Dialog.tsx



var FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, details, [tabindex]:not([tabindex="-1"])';
function Dialog({
  open,
  onClose,
  icon,
  headline,
  children,
  actions,
  fullscreen = false,
  dismissible = true,
  className
}) {
  const headlineId = React13.useId();
  const bodyId = React13.useId();
  const panelRef = React13.useRef(null);
  const restoreFocusRef = React13.useRef(null);
  React13.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape" && dismissible) _optionalChain([onClose, 'optionalCall', _26 => _26()]);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, dismissible, onClose]);
  React13.useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement;
    const timer = window.setTimeout(() => _optionalChain([panelRef, 'access', _27 => _27.current, 'optionalAccess', _28 => _28.focus, 'call', _29 => _29()]), 0);
    return () => {
      window.clearTimeout(timer);
      _optionalChain([restoreFocusRef, 'access', _30 => _30.current, 'optionalAccess', _31 => _31.focus, 'optionalCall', _32 => _32()]);
    };
  }, [open]);
  const handleTab = (e) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = Array.from(
      panelRef.current.querySelectorAll(FOCUSABLE)
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: open && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    "div",
    {
      className: cn(
        "fixed inset-0 z-[80] flex items-center justify-center p-6",
        fullscreen && "p-0"
      ),
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          _framermotion.motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: {
              duration: durations.short4 / 1e3,
              ease: "easeOut"
            },
            className: "absolute inset-0 bg-m3-scrim/32",
            onClick: () => {
              if (dismissible) _optionalChain([onClose, 'optionalCall', _33 => _33()]);
            }
          }
        ),
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
          _framermotion.motion.div,
          {
            ref: panelRef,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": headline ? headlineId : void 0,
            "aria-describedby": children ? bodyId : void 0,
            tabIndex: -1,
            onKeyDown: handleTab,
            initial: { scale: 0.9, y: 20, opacity: 0 },
            animate: { scale: 1, y: 0, opacity: 1 },
            exit: { scale: 0.9, y: 20, opacity: 0 },
            transition: springs.expressive,
            className: cn(
              "m3-elevation-3 relative w-full bg-m3-surface-container-high p-6 outline-none",
              fullscreen ? "h-full max-w-none rounded-none" : "min-w-[280px] max-w-[560px] rounded-[28px]",
              className
            ),
            children: [
              icon && // Official: 24dp primary icon, center-aligned, 16dp above the headline
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "mb-4 flex justify-center", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon, size: 24, className: "text-m3-primary" }) }),
              headline && // Official: headline center-aligns when an icon is present, start-aligns otherwise
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                "h2",
                {
                  id: headlineId,
                  className: cn("md-headline-small mb-4 text-m3-on-surface", icon && "text-center"),
                  children: headline
                }
              ),
              children && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { id: bodyId, className: "md-body-medium text-m3-on-surface-variant", children }),
              actions && // Official action area: 8dp between text buttons, 24dp above / 24dp sides+below
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "flex flex-wrap items-center justify-end gap-2 pt-6", children: actions })
            ]
          }
        )
      ]
    }
  ) });
}

// ../../src/components/m3/Divider.tsx

var horizontalInsets = {
  none: "",
  // Official M3 list divider insets (lists specs): 16dp left / 24dp right
  // (the 72dp start inset is the legacy M2 value, superseded by these)
  start: "ml-4 mr-6",
  // M3 divider guideline: inset dividers are equally indented (16dp)
  middle: "mx-4",
  end: "mr-4"
};
var verticalInsets = {
  none: "",
  start: "mt-4",
  middle: "my-4",
  end: "mb-4"
};
function Divider({
  inset = "none",
  thickness = 1,
  color = "outline-variant",
  orientation = "horizontal",
  className
}) {
  const horizontal = orientation === "horizontal";
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    "div",
    {
      role: "separator",
      "aria-orientation": orientation,
      className: cn(
        "shrink-0",
        horizontal ? "w-full" : "h-full self-stretch",
        horizontal ? horizontalInsets[inset] : verticalInsets[inset],
        color === "outline" ? "bg-m3-outline" : "bg-m3-outline-variant",
        className
      ),
      style: horizontal ? { height: thickness } : { width: thickness }
    }
  );
}

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
var Card = React14.forwardRef(function Card2({ variant = "elevated", shape = "medium", interactive, onClick, className, children, ...props }, ref) {
  const isInteractive = _nullishCoalesce(interactive, () => ( Boolean(onClick)));
  const handleKeyDown = React14.useCallback(
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
      role: isInteractive ? "button" : void 0,
      tabIndex: isInteractive ? 0 : void 0,
      onClick: isInteractive ? onClick : void 0,
      onKeyDown: isInteractive ? handleKeyDown : void 0,
      whileTap: isInteractive ? { scale: 0.97, borderRadius: shapeMorph.card.pressed } : void 0,
      style: {
        borderRadius: isInteractive ? shapeMorph.card.rest : shape === "extraLarge" ? shapes.extraLarge : shapes.medium
      },
      transition: springs.expressive,
      className: cn(
        "relative overflow-hidden",
        shapeStyles2[shape],
        variantStyles5[variant],
        isInteractive && "m3-state m3-focus cursor-pointer outline-none transition-shadow duration-200",
        isInteractive && variant === "elevated" && hoverElevation2,
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



var List = React15.forwardRef(function List2({ dividers = false, className, children, ...props }, ref) {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    "ul",
    {
      ref,
      className: cn(
        "m3-scroll flex w-full flex-col",
        dividers && "divide-y divide-m3-outline-variant",
        className
      ),
      ...props,
      children
    }
  );
});
var ListItem = React15.forwardRef(function ListItem2({
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
  const isButton = Boolean(onClick);
  const hasSupporting = supporting !== void 0 || overline !== void 0;
  const lineCount = _nullishCoalesce(lines, () => ( (hasSupporting ? 2 : 1)));
  const isThreeLine = lineCount >= 3;
  const contentColor = selected ? "text-m3-on-secondary-container" : void 0;
  const content = /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    leading && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "span",
      {
        className: cn(
          "flex w-10 shrink-0 items-center justify-center",
          isThreeLine && "self-start pt-3",
          _nullishCoalesce(contentColor, () => ( "text-m3-on-surface-variant"))
        ),
        children: leading
      }
    ),
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: cn("min-w-0 flex-1", isThreeLine && "self-start"), children: [
      overline && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-label-small block truncate", children: overline }),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: cn("md-body-large block truncate", _nullishCoalesce(contentColor, () => ( "text-m3-on-surface"))), children: headline }),
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
    (trailing !== void 0 || trailingIcon !== void 0) && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
      "span",
      {
        className: cn(
          "ml-auto flex shrink-0 items-center gap-2 md-label-small",
          isThreeLine && "self-start pt-3",
          _nullishCoalesce(contentColor, () => ( "text-m3-on-surface-variant"))
        ),
        children: [
          trailing,
          trailingIcon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: trailingIcon, size: 24 })
        ]
      }
    )
  ] });
  const rowClassName = cn(
    // Official paddings: label/leading left 16dp, trailing right 24dp
    "relative flex w-full items-center gap-4 overflow-hidden pl-4 pr-6 text-left",
    lineCount === 1 && "min-h-14",
    // 56dp official one-line height
    lineCount === 2 && "min-h-[72px] py-3",
    isThreeLine && "min-h-[88px] py-3",
    !disabled && isButton && "m3-state m3-focus cursor-pointer outline-none"
  );
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    "li",
    {
      ref,
      className: cn(
        selected && "bg-m3-secondary-container text-m3-on-secondary-container",
        disabled && "opacity-38",
        className
      ),
      "aria-current": selected ? "true" : void 0,
      children: isButton ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
        _framermotion.motion.button,
        {
          type: "button",
          disabled,
          whileTap: disabled ? void 0 : { scale: 0.98 },
          transition: springs.fastVisual,
          onClick,
          className: rowClassName,
          children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
            content
          ]
        }
      ) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: rowClassName, children: content })
    }
  );
});

// ../../src/components/m3/BottomSheet.tsx



var FOCUSABLE2 = 'a[href], button:not([disabled]), textarea, input, select, details, [tabindex]:not([tabindex="-1"])';
var BottomSheet = React16.forwardRef(function BottomSheet2({ open, onClose, variant = "modal", title, children, footer, maxHeight, className }, ref) {
  const isModal = variant === "modal";
  const panelRef = React16.useRef(null);
  const restoreFocusRef = React16.useRef(null);
  React16.useEffect(() => {
    if (!isModal || !open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isModal, open, onClose]);
  React16.useEffect(() => {
    if (!isModal || !open) return;
    restoreFocusRef.current = document.activeElement;
    const timer = window.setTimeout(() => _optionalChain([panelRef, 'access', _34 => _34.current, 'optionalAccess', _35 => _35.focus, 'call', _36 => _36()]), 0);
    return () => {
      window.clearTimeout(timer);
      _optionalChain([restoreFocusRef, 'access', _37 => _37.current, 'optionalAccess', _38 => _38.focus, 'optionalCall', _39 => _39()]);
    };
  }, [isModal, open]);
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
  const handle = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    "div",
    {
      "aria-hidden": "true",
      className: "mx-auto mt-[22px] mb-[22px] h-1 w-8 shrink-0 cursor-grab rounded-full bg-m3-on-surface-variant"
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
          className
        ),
        style: { maxHeight: _nullishCoalesce(maxHeight, () => ( "calc(100dvh - 72px)")) },
        children: [
          handle,
          titleEl,
          contentEl,
          footerEl
        ]
      }
    );
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: open && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { ref, className: "fixed inset-0 z-[85]", children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      _framermotion.motion.div,
      {
        className: "absolute inset-0 bg-m3-scrim/32",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: durations.short4 / 1e3, ease: "easeOut" },
        onClick: onClose
      }
    ),
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
      _framermotion.motion.div,
      {
        ref: panelRef,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": title,
        tabIndex: -1,
        onKeyDown: handleTab,
        className: cn(
          // Official: full width up to 640dp; 56dp side margins when detached (>640dp windows)
          "absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-[640px] flex-col rounded-t-[28px] m3-elevation-1 bg-m3-surface-container-low px-6 pb-6 outline-none sm:left-14 sm:right-14 sm:w-auto",
          className
        ),
        style: { maxHeight: _nullishCoalesce(maxHeight, () => ( "calc(100dvh - 72px)")) },
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
        transition: springs.defaultSpatial,
        drag: "y",
        dragConstraints: { top: 0 },
        dragElastic: { top: 0, bottom: 0.6 },
        onDragEnd: (_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 500) onClose();
        },
        children: [
          handle,
          titleEl,
          contentEl,
          footerEl
        ]
      }
    )
  ] }) });
});

// ../../src/components/m3/SideSheet.tsx



var FOCUSABLE3 = 'a[href], button:not([disabled]), textarea, input, select, details, [tabindex]:not([tabindex="-1"])';
var SideSheet = React17.forwardRef(function SideSheet2({
  open,
  onClose,
  side = "right",
  variant = "modal",
  title,
  children,
  footer,
  width = 360,
  className
}, ref) {
  const isModal = variant === "modal";
  const isRight = side === "right";
  const panelRef = React17.useRef(null);
  const restoreFocusRef = React17.useRef(null);
  React17.useEffect(() => {
    if (!isModal || !open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isModal, open, onClose]);
  React17.useEffect(() => {
    if (!isModal || !open) return;
    restoreFocusRef.current = document.activeElement;
    const timer = window.setTimeout(() => _optionalChain([panelRef, 'access', _40 => _40.current, 'optionalAccess', _41 => _41.focus, 'call', _42 => _42()]), 0);
    return () => {
      window.clearTimeout(timer);
      _optionalChain([restoreFocusRef, 'access', _43 => _43.current, 'optionalAccess', _44 => _44.focus, 'optionalCall', _45 => _45()]);
    };
  }, [isModal, open]);
  const handleTab = (e) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = Array.from(
      panelRef.current.querySelectorAll(FOCUSABLE3)
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
  const header = title ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "h2", { className: "md-title-large shrink-0 px-1 pb-3 text-m3-on-surface", children: title }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "mb-3 shrink-0 border-b border-m3-outline-variant" })
  ] }) : null;
  const footerEl = footer ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "mt-2 shrink-0 border-t border-m3-outline-variant pt-2", children: footer }) : null;
  const contentEl = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "m3-scroll min-h-0 flex-1 overflow-y-auto", children });
  if (!isModal) {
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
      "div",
      {
        ref,
        role: "complementary",
        className: cn(
          // Standard side sheet is surface-toned; 16dp radius on the inner edge only
          "inline-flex h-[320px] flex-col overflow-hidden border border-m3-outline-variant bg-m3-surface p-6",
          isRight ? "rounded-l-[16px]" : "rounded-r-[16px]",
          className
        ),
        style: { width: Math.min(width, 400) },
        children: [
          header,
          contentEl,
          footerEl
        ]
      }
    );
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: open && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { ref, className: "fixed inset-0 z-[85]", children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      _framermotion.motion.div,
      {
        className: "absolute inset-0 bg-m3-scrim/32",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: durations.short4 / 1e3, ease: "easeOut" },
        onClick: onClose
      }
    ),
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
      _framermotion.motion.div,
      {
        ref: panelRef,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": title,
        tabIndex: -1,
        onKeyDown: handleTab,
        className: cn(
          "absolute top-0 flex h-full max-w-[400px] flex-col bg-m3-surface-container-low p-6 outline-none m3-elevation-1",
          isRight ? "right-0 rounded-l-[16px]" : "left-0 rounded-r-[16px]",
          className
        ),
        style: { width: Math.min(width, 400) },
        initial: isRight ? { x: "100%" } : { x: "-100%" },
        animate: { x: 0 },
        exit: isRight ? { x: "100%" } : { x: "-100%" },
        transition: springs.defaultSpatial,
        children: [
          header,
          contentEl,
          footerEl
        ]
      }
    )
  ] }) });
});

// ../../src/components/m3/TextField.tsx



var springs2 = springs;
var sizeHeights = { xs: 32, sm: 40, md: 56, lg: 72 };
var fieldRadius = "rounded-m3-xs";
var fieldTopRadius = "rounded-t-m3-xs";
var TextField = React18.forwardRef(function TextField2({
  variant = "outlined",
  size = "md",
  label,
  helperText,
  error = false,
  leadingIcon,
  trailingIcon,
  fullWidth = false,
  disabled = false,
  required = false,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  className,
  onFocus,
  onBlur,
  ...props
}, ref) {
  const [focused, setFocused] = React18.useState(false);
  const autoId = React18.useId();
  const inputId = _nullishCoalesce(id, () => ( `m3-tf-${autoId.replace(/:/g, "")}`));
  const helperId = helperText ? `${inputId}-helper` : void 0;
  const hasValue = value != null && String(value).length > 0;
  const floated = focused || hasValue;
  const height = sizeHeights[size];
  const centerY = height / 2;
  const compact = size === "xs" || size === "sm";
  const iconSize = compact ? 20 : 24;
  const inputTextClass = compact ? "md-body-medium" : "md-body-large";
  const labelRestClass = compact ? "md-body-medium" : "md-body-large";
  const labelRestHalf = compact ? 10 : 12;
  const showPlaceholder = placeholder != null && (!label || floated);
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: cn("relative", fullWidth && "w-full", className), children: [
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
      "div",
      {
        className: cn(
          "group/field relative flex items-center transition-[border-color,box-shadow] duration-150",
          variant === "outlined" ? cn(
            "border bg-transparent",
            fieldRadius,
            error && !disabled ? "border-m3-error" : focused ? "border-m3-primary shadow-[inset_0_0_0_1px_var(--md-primary)]" : disabled ? "border-m3-outline/12" : "border-m3-outline hover:border-m3-on-surface"
          ) : cn(fieldTopRadius, disabled ? "bg-m3-on-surface/4" : "bg-m3-surface-container-highest")
        ),
        style: { height },
        children: [
          leadingIcon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
            MaterialSymbol,
            {
              icon: leadingIcon,
              size: iconSize,
              className: cn(
                "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2",
                disabled && "opacity-38",
                error ? "text-m3-error" : focused ? "text-m3-primary" : "text-m3-on-surface-variant"
              )
            }
          ),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
            "input",
            {
              ref,
              id: inputId,
              type,
              value,
              onChange,
              disabled,
              required,
              placeholder: showPlaceholder ? placeholder : void 0,
              "aria-invalid": error || void 0,
              "aria-describedby": helperId,
              onFocus: (e) => {
                setFocused(true);
                _optionalChain([onFocus, 'optionalCall', _46 => _46(e)]);
              },
              onBlur: (e) => {
                setFocused(false);
                _optionalChain([onBlur, 'optionalCall', _47 => _47(e)]);
              },
              className: cn(
                "h-full w-full bg-transparent text-m3-on-surface outline-none placeholder:text-m3-on-surface-variant",
                inputTextClass,
                disabled && "opacity-38",
                leadingIcon ? "pl-12" : "pl-4",
                error || trailingIcon ? "pr-12" : "pr-4"
              ),
              style: variant === "filled" && label ? { paddingTop: Math.round(height * 0.28) } : void 0,
              ...props
            }
          ),
          (error || trailingIcon) && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
            MaterialSymbol,
            {
              icon: error ? "error" : trailingIcon,
              size: iconSize,
              fill: error ? true : void 0,
              className: cn(
                "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2",
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
                transition: springs2.fastSpatial
              }
            )
          ] }),
          label && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
            _framermotion.motion.label,
            {
              htmlFor: inputId,
              className: cn(
                "pointer-events-none absolute z-[1]",
                variant === "outlined" ? "bg-m3-surface px-1" : "px-0",
                disabled && "opacity-38",
                floated ? "md-body-small" : labelRestClass,
                error ? "text-m3-error" : focused ? "text-m3-primary" : "text-m3-on-surface-variant"
              ),
              initial: false,
              animate: {
                top: variant === "outlined" ? floated ? -8 : centerY - labelRestHalf : floated ? 8 : centerY - labelRestHalf,
                left: variant === "outlined" ? floated ? leadingIcon ? 40 : 12 : leadingIcon ? 48 : 16 : leadingIcon ? 48 : 16
              },
              transition: springs2.fastSpatial,
              children: [
                label,
                required && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "text-m3-error", children: " *" })
              ]
            }
          )
        ]
      }
    ),
    helperText && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "div",
      {
        id: helperId,
        className: cn("mt-1 px-4 md-body-small", disabled && "opacity-38", error ? "text-m3-error" : "text-m3-on-surface-variant"),
        children: helperText
      }
    )
  ] });
});

// ../../src/components/m3/SearchBar.tsx



var springs3 = springs;
var sizeHeights2 = { sm: 40, md: 56, lg: 72 };
var SearchBar = React19.forwardRef(function SearchBar2({
  value,
  onChange,
  placeholder = "Search",
  size = "md",
  leadingIcon = "search",
  trailingIcons = [],
  onSubmit,
  fullWidth = false,
  disabled = false,
  className,
  ...props
}, ref) {
  const [focused, setFocused] = React19.useState(false);
  const trailingHit = size === "sm" ? "h-8 w-8" : "h-12 w-12";
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: cn("relative inline-flex", fullWidth && "w-full", disabled && "pointer-events-none opacity-38", className), children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    "div",
    {
      className: cn(
        "m3-state flex w-full items-center rounded-full transition-[background-color,box-shadow] duration-200",
        focused ? "m3-elevation-2 bg-m3-surface-container-highest" : "bg-m3-surface-container-high"
      ),
      style: { height: sizeHeights2[size] },
      children: [
        leadingIcon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: leadingIcon, size: 24, className: "ml-4 shrink-0 text-m3-on-surface-variant" }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          "input",
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
              if (e.key === "Enter") _optionalChain([onSubmit, 'optionalCall', _48 => _48()]);
            },
            onFocus: () => setFocused(true),
            onBlur: () => setFocused(false),
            className: cn(
              "h-full min-w-0 flex-1 bg-transparent pl-4 text-m3-on-surface outline-none placeholder:text-m3-on-surface-variant md-body-large",
              trailingIcons.length > 0 ? "pr-1" : "pr-4"
            ),
            ...props
          }
        ),
        trailingIcons.map((icon) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
          _framermotion.motion.button,
          {
            type: "button",
            "aria-label": icon.replace(/_/g, " "),
            tabIndex: disabled ? -1 : 0,
            whileTap: disabled ? void 0 : { scale: 0.9 },
            transition: springs3.fastVisual,
            className: cn(
              "m3-state relative mr-1 grid shrink-0 place-items-center overflow-hidden rounded-full text-m3-on-surface",
              trailingHit
            ),
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon, size: 24 })
            ]
          },
          icon
        )),
        trailingIcons.length > 0 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "mr-3" })
      ]
    }
  ) });
});

// ../../src/components/m3/SearchView.tsx



var springs4 = springs;
var FOCUSABLE4 = 'a[href], button:not([disabled]), textarea, input, select, details, [tabindex]:not([tabindex="-1"])';
var SearchView = React20.forwardRef(function SearchView2({
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
  const fullScreen = mode === "full-screen";
  const panelRef = React20.useRef(null);
  const inputRef = React20.useRef(null);
  const restoreFocusRef = React20.useRef(null);
  const [active, setActive] = React20.useState(-1);
  const reactId = React20.useId();
  const listId = `m3-sv-${reactId.replace(/:/g, "")}`;
  React20.useImperativeHandle(ref, () => inputRef.current, []);
  const isControlled = value !== void 0;
  const [inner, setInner] = React20.useState(_nullishCoalesce(defaultValue, () => ( "")));
  const query = isControlled ? value : inner;
  const setQuery = React20.useCallback(
    (v) => {
      if (!isControlled) setInner(v);
      _optionalChain([onValueChange, 'optionalCall', _49 => _49(v)]);
    },
    [isControlled, onValueChange]
  );
  const showRecents = query.trim() === "" && recentSearches.length > 0;
  const handleRecentSelect = (q) => {
    setQuery(q);
    setActive(-1);
    _optionalChain([onRecentSelect, 'optionalCall', _50 => _50(q)]);
  };
  const handleRecentRemove = (q) => {
    _optionalChain([onRecentRemove, 'optionalCall', _51 => _51(q)]);
    setActive(-1);
  };
  React20.useEffect(() => {
    if (!open || !fullScreen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, fullScreen, onOpenChange]);
  React20.useEffect(() => {
    if (!open || !fullScreen) return;
    restoreFocusRef.current = document.activeElement;
    let timer = 0;
    if (autoFocus) timer = window.setTimeout(() => _optionalChain([inputRef, 'access', _52 => _52.current, 'optionalAccess', _53 => _53.focus, 'call', _54 => _54()]), 0);
    return () => {
      window.clearTimeout(timer);
      _optionalChain([restoreFocusRef, 'access', _55 => _55.current, 'optionalAccess', _56 => _56.focus, 'optionalCall', _57 => _57()]);
    };
  }, [open, fullScreen, autoFocus]);
  const handleTab = (e) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = Array.from(
      panelRef.current.querySelectorAll(FOCUSABLE4)
    ).filter((el) => !el.hasAttribute("disabled"));
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const activeEl = document.activeElement;
    if (e.shiftKey && (activeEl === first || activeEl === panelRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && activeEl === last) {
      e.preventDefault();
      first.focus();
    }
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
    } else if (e.key === "Escape") {
      onOpenChange(false);
    }
  };
  const panel = /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    _framermotion.motion.div,
    {
      ref: panelRef,
      role: "dialog",
      "aria-modal": fullScreen || void 0,
      "aria-label": placeholder,
      tabIndex: -1,
      onKeyDown: fullScreen ? handleTab : void 0,
      initial: fullScreen ? { y: -48, opacity: 0 } : { y: -8, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: fullScreen ? { y: -48, opacity: 0 } : { y: -8, opacity: 0 },
      transition: fullScreen ? springs4.fastSpatial : { duration: durations.short4 / 1e3, ease: "easeOut" },
      className: cn(
        "flex flex-col bg-m3-surface outline-none",
        fullScreen ? "fixed inset-0 z-[90]" : "relative w-full overflow-hidden",
        className
      ),
      children: [
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex h-14 shrink-0 items-center bg-m3-surface-container-high", children: [
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
            "button",
            {
              type: "button",
              onClick: () => onOpenChange(false),
              "aria-label": "Close search",
              className: "m3-state relative ml-1 grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full text-m3-on-surface",
              children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
                _nullishCoalesce(leadingIcon, () => ( /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "arrow_back", size: 24 })))
              ]
            }
          ),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
            "input",
            {
              ref: inputRef,
              type: "text",
              role: "combobox",
              "aria-label": placeholder,
              "aria-expanded": showRecents,
              "aria-haspopup": "listbox",
              "aria-autocomplete": "list",
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
                _optionalChain([inputRef, 'access', _58 => _58.current, 'optionalAccess', _59 => _59.focus, 'call', _60 => _60()]);
              },
              "aria-label": "Clear search text",
              className: "m3-state relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full text-m3-on-surface",
              children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "close", size: 24 })
              ]
            }
          ),
          trailingActions && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "flex shrink-0 items-center pr-1", children: trailingActions })
        ] }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { "aria-hidden": "true", className: "h-px w-full shrink-0 bg-m3-outline-variant" }),
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "m3-scroll min-h-0 flex-1 overflow-y-auto py-2", children: [
          showRecents && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "ul", { id: listId, role: "listbox", "aria-label": "Recent searches", className: "py-1", children: recentSearches.map((q, i) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
            "li",
            {
              id: `${listId}-${i}`,
              role: "option",
              "aria-selected": false,
              ref: (el) => {
                if (active === i && el) el.scrollIntoView({ block: "nearest" });
              },
              onMouseEnter: () => setActive(i),
              onClick: () => handleRecentSelect(q),
              className: cn(
                "m3-state relative flex min-h-12 cursor-pointer items-center overflow-hidden px-4",
                active === i && "bg-m3-on-surface/8"
              ),
              children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                  MaterialSymbol,
                  {
                    icon: "history",
                    size: 24,
                    className: "mr-3 shrink-0 text-m3-on-surface-variant"
                  }
                ),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "flex-1 truncate md-label-large text-m3-on-surface", children: q }),
                onRecentRemove && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
                  "button",
                  {
                    type: "button",
                    "aria-label": `Remove ${q} from recent searches`,
                    onClick: (e) => {
                      e.stopPropagation();
                      handleRecentRemove(q);
                    },
                    className: "m3-state relative -mr-2 grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full text-m3-on-surface-variant",
                    children: [
                      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
                      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "close", size: 20 })
                    ]
                  }
                )
              ]
            },
            q
          )) }),
          !showRecents && children
        ] })
      ]
    }
  );
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: open && panel });
});

// ../../src/components/m3/Autocomplete.tsx



var springs5 = springs;
var Autocomplete = React21.forwardRef(function Autocomplete2({ options, value, onChange, label, placeholder = "Type to filter", fullWidth = false, disabled = false, className }, ref) {
  const [open, setOpen] = React21.useState(false);
  const [highlighted, setHighlighted] = React21.useState(-1);
  const rootRef = React21.useRef(null);
  const reactId = React21.useId();
  const listId = `m3-ac-${reactId.replace(/:/g, "")}`;
  const filtered = React21.useMemo(() => {
    const q = value.trim().toLowerCase();
    return q ? options.filter((o) => o.toLowerCase().includes(q)) : options;
  }, [options, value]);
  const openMenu = React21.useCallback(() => {
    if (disabled) return;
    setOpen(true);
    setHighlighted(-1);
  }, [disabled]);
  React21.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);
  const select = (option) => {
    onChange(option);
    setOpen(false);
    setHighlighted(-1);
  };
  const onKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlighted(0);
      } else {
        setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlighted(Math.max(filtered.length - 1, 0));
      } else {
        setHighlighted((h) => Math.max(h - 1, 0));
      }
    } else if (e.key === "Enter") {
      if (open && highlighted >= 0 && filtered[highlighted] != null) {
        e.preventDefault();
        select(filtered[highlighted]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    "div",
    {
      ref: rootRef,
      className: cn("relative", fullWidth && "w-full", disabled && "pointer-events-none opacity-38", className),
      children: [
        label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "mb-1 px-1 md-body-small text-m3-on-surface-variant", children: label }),
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
          "div",
          {
            className: cn(
              "m3-state relative flex h-14 items-center rounded-m3-xs border transition-[border-color,box-shadow] duration-150",
              open && !disabled ? "border-m3-primary shadow-[inset_0_0_0_1px_var(--md-primary)]" : disabled ? "border-m3-outline/12" : "border-m3-outline hover:border-m3-on-surface"
            ),
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                "input",
                {
                  ref,
                  type: "text",
                  role: "combobox",
                  "aria-expanded": open,
                  "aria-haspopup": "listbox",
                  "aria-controls": listId,
                  "aria-autocomplete": "list",
                  "aria-activedescendant": open && highlighted >= 0 ? `${listId}-${highlighted}` : void 0,
                  value,
                  disabled,
                  placeholder,
                  onChange: (e) => {
                    onChange(e.target.value);
                    setOpen(true);
                    setHighlighted(-1);
                  },
                  onFocus: openMenu,
                  onKeyDown,
                  className: "h-full w-full bg-transparent pl-4 pr-12 text-m3-on-surface outline-none placeholder:text-m3-on-surface-variant md-body-large"
                }
              ),
              /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
                _framermotion.motion.button,
                {
                  type: "button",
                  "aria-label": "Toggle suggestions",
                  tabIndex: -1,
                  whileTap: { scale: 0.9 },
                  transition: springs5.fastVisual,
                  onClick: () => open ? setOpen(false) : openMenu(),
                  className: "m3-state absolute right-1.5 grid h-9 w-9 place-items-center overflow-hidden rounded-full text-m3-on-surface-variant",
                  children: [
                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                      _framermotion.motion.span,
                      {
                        initial: false,
                        animate: { rotate: open ? 180 : 0 },
                        transition: springs5.fastSpatial,
                        className: "inline-flex",
                        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "arrow_drop_down", size: 24 })
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _framermotion.AnimatePresence, { children: [
          open && filtered.length > 0 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
            _framermotion.motion.ul,
            {
              id: listId,
              role: "listbox",
              initial: { opacity: 0, scale: 0.96, y: -4 },
              animate: { opacity: 1, scale: 1, y: 0 },
              exit: { opacity: 0, scale: 0.96, y: -4 },
              transition: springs5.fastSpatial,
              style: { transformOrigin: "top center" },
              className: "m3-scroll m3-elevation-2 absolute z-10 mt-1 max-h-72 w-full overflow-y-auto rounded-m3-xs bg-m3-surface-container py-2",
              children: filtered.map((option, i) => {
                const isSelected = option === value;
                const isHighlighted = i === highlighted;
                return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
                  "li",
                  {
                    id: `${listId}-${i}`,
                    ref: (el) => {
                      if (isHighlighted && el) el.scrollIntoView({ block: "nearest" });
                    },
                    role: "option",
                    "aria-selected": isSelected,
                    onMouseEnter: () => setHighlighted(i),
                    onClick: () => select(option),
                    className: cn(
                      "m3-state relative flex h-12 cursor-pointer items-center overflow-hidden px-4 md-body-large text-m3-on-surface",
                      isHighlighted && "bg-m3-on-surface/8"
                    ),
                    children: [
                      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
                      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "flex-1 truncate", children: option }),
                      isSelected && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "check", size: 20, fill: true, className: "text-m3-primary" })
                    ]
                  },
                  option
                );
              })
            }
          ),
          open && filtered.length === 0 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
            _framermotion.motion.div,
            {
              initial: { opacity: 0, y: -4 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -4 },
              transition: springs5.fastSpatial,
              className: "m3-elevation-2 absolute z-10 mt-1 w-full rounded-m3-xs bg-m3-surface-container px-4 py-3 md-body-medium text-m3-on-surface-variant",
              children: "No matches"
            },
            "empty"
          )
        ] })
      ]
    }
  );
});

// ../../src/components/m3/Checkbox.tsx



var springs6 = springs;
var Checkbox = React22.forwardRef(function Checkbox2({ checked = false, indeterminate = false, onChange, label, disabled = false, error = false, className }, ref) {
  const isFilled = checked || indeterminate;
  const handleToggle = () => {
    if (disabled) return;
    _optionalChain([onChange, 'optionalCall', _61 => _61(indeterminate ? true : !checked)]);
  };
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    _framermotion.motion.button,
    {
      ref,
      type: "button",
      role: "checkbox",
      "aria-checked": indeterminate ? "mixed" : checked,
      disabled,
      onClick: handleToggle,
      whileTap: disabled ? void 0 : { scale: 0.95 },
      transition: springs6.fastVisual,
      className: cn(
        "m3-state m3-focus relative inline-flex items-center overflow-hidden rounded-full outline-none",
        error ? "text-m3-error" : isFilled ? "text-m3-primary" : "text-m3-on-surface-variant",
        disabled && "pointer-events-none opacity-38",
        className
      ),
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "grid h-12 w-12 shrink-0 place-items-center", children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
          _framermotion.motion.span,
          {
            className: cn(
              "relative grid h-[18px] w-[18px] place-items-center rounded-[2px] border-2 transition-colors duration-150",
              isFilled ? error ? "border-m3-error bg-m3-error" : "border-m3-primary bg-m3-primary" : error ? "border-m3-error bg-transparent" : "border-m3-on-surface-variant bg-transparent"
            ),
            whileTap: disabled ? void 0 : { scale: 0.85 },
            transition: springs6.expressive,
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "svg", { viewBox: "0 0 24 24", "aria-hidden": "true", className: "h-3 w-3", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                _framermotion.motion.path,
                {
                  d: "M20 6 9 17l-5-5",
                  fill: "none",
                  strokeWidth: 3.5,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: error ? "stroke-m3-on-error" : "stroke-m3-on-primary",
                  initial: false,
                  animate: { pathLength: checked && !indeterminate ? 1 : 0, opacity: checked && !indeterminate ? 1 : 0 },
                  transition: springs6.expressive
                }
              ) }),
              indeterminate && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                _framermotion.motion.span,
                {
                  className: cn("absolute h-[2px] w-[10px] rounded-full", error ? "bg-m3-on-error" : "bg-m3-on-primary"),
                  initial: { scale: 0 },
                  animate: { scale: 1 },
                  transition: springs6.expressive
                }
              )
            ]
          }
        ) }),
        label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "pr-3 text-m3-on-surface md-body-large", children: label })
      ]
    }
  );
});

// ../../src/components/m3/Radio.tsx



var springs7 = springs;
var Radio = React23.forwardRef(function Radio2({ checked = false, onChange, label, disabled = false, error = false, className }, ref) {
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    _framermotion.motion.button,
    {
      ref,
      type: "button",
      role: "radio",
      "aria-checked": checked,
      disabled,
      onClick: () => _optionalChain([onChange, 'optionalCall', _62 => _62()]),
      whileTap: disabled ? void 0 : { scale: 0.95 },
      transition: springs7.fastVisual,
      className: cn(
        "m3-state m3-focus relative inline-flex items-center overflow-hidden rounded-full outline-none",
        error ? "text-m3-error" : checked ? "text-m3-primary" : "text-m3-on-surface-variant",
        disabled && "pointer-events-none opacity-38",
        className
      ),
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "grid h-12 w-12 shrink-0 place-items-center", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          "span",
          {
            className: cn(
              "grid h-5 w-5 place-items-center rounded-full border-2 transition-colors duration-150",
              error ? "border-m3-error" : checked ? "border-m3-primary" : "border-m3-on-surface-variant"
            ),
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
              _framermotion.motion.span,
              {
                className: cn("h-[10px] w-[10px] rounded-full", error ? "bg-m3-error" : "bg-m3-primary"),
                initial: false,
                animate: { scale: checked ? 1 : 0 },
                transition: springs7.expressive
              }
            )
          }
        ) }),
        label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "pr-3 text-m3-on-surface md-body-large", children: label })
      ]
    }
  );
});
function RadioGroup({ label, className, children }) {
  const onKeyDown = React23.useCallback((e) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowRight" && e.key !== "ArrowUp" && e.key !== "ArrowLeft") return;
    const root = e.currentTarget;
    const radios = Array.from(root.querySelectorAll('[role="radio"]:not([disabled])'));
    if (radios.length === 0) return;
    const forward = e.key === "ArrowDown" || e.key === "ArrowRight";
    const current = radios.indexOf(document.activeElement);
    const base = current === -1 ? 0 : current;
    const next = forward ? (base + 1) % radios.length : (base - 1 + radios.length) % radios.length;
    e.preventDefault();
    radios[next].focus();
    radios[next].click();
  }, []);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { role: "radiogroup", "aria-label": label, onKeyDown, className: cn("flex flex-col", className), children });
}

// ../../src/components/m3/Switch.tsx



var springs8 = springs;
var Switch = React24.forwardRef(function Switch2({ checked = false, onCheckedChange, disabled = false, className }, ref) {
  const [pressed, setPressed] = React24.useState(false);
  const thumbSize = pressed ? 28 : checked ? 24 : 16;
  const thumbX = checked ? pressed ? 20 : 24 : 4;
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _framermotion.motion.button,
    {
      ref,
      type: "button",
      role: "switch",
      "aria-checked": checked,
      disabled,
      onClick: () => _optionalChain([onCheckedChange, 'optionalCall', _63 => _63(!checked)]),
      onPointerDown: () => setPressed(true),
      onPointerUp: () => setPressed(false),
      onPointerLeave: () => setPressed(false),
      className: cn(
        "m3-state m3-focus relative inline-flex h-8 w-[52px] shrink-0 items-center rounded-full border-2 outline-none transition-colors duration-150",
        checked ? "border-m3-primary bg-m3-primary text-m3-on-primary" : "border-m3-outline bg-m3-surface-container-highest text-m3-on-surface-variant",
        disabled && "pointer-events-none opacity-38",
        className
      ),
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        _framermotion.motion.span,
        {
          className: cn(
            "absolute left-0 top-1/2 grid place-items-center rounded-full shadow-[0_1px_3px_1px_rgba(0,0,0,0.15)] transition-colors duration-150",
            checked ? "bg-m3-on-primary" : "bg-m3-outline"
          ),
          initial: false,
          animate: { x: thumbX, y: "-50%", width: thumbSize, height: thumbSize },
          transition: springs8.defaultSpatial,
          children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { initial: false, children: checked && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
            _framermotion.motion.span,
            {
              className: "grid place-items-center",
              initial: { opacity: 0, scale: 0.5 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.5 },
              transition: springs8.fastVisual,
              children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "check", size: 16, className: "text-m3-primary" })
            },
            "check"
          ) })
        }
      )
    }
  );
});

// ../../src/components/m3/Slider.tsx



var springs9 = springs;
var Slider = React25.forwardRef(function Slider2({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  discrete = false,
  showValueLabel = false,
  disabled = false,
  fullWidth = false,
  className,
  ...rest
}, ref) {
  const trackRef = React25.useRef(null);
  const [active, setActive] = React25.useState(false);
  const [hover, setHover] = React25.useState(false);
  const safeStep = step > 0 ? step : 1;
  const clamp = (v) => Math.min(max, Math.max(min, v));
  const snap = (v) => {
    const snapped = Math.round((v - min) / safeStep) * safeStep + min;
    return clamp(Number(snapped.toFixed(6)));
  };
  const frac = max === min ? 0 : (value - min) / (max - min);
  const fraction = Math.min(1, Math.max(0, frac));
  const valueFromClientX = (clientX) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const f = rect.width === 0 ? 0 : (clientX - rect.left) / rect.width;
    onChange(snap(clamp(min + f * (max - min))));
  };
  const onPointerDown = (e) => {
    if (disabled) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setActive(true);
    valueFromClientX(e.clientX);
  };
  const onPointerMove = (e) => {
    if (disabled || !active) return;
    valueFromClientX(e.clientX);
  };
  const endDrag = () => setActive(false);
  const onKeyDown = (e) => {
    if (disabled) return;
    const page = Math.max(safeStep, (max - min) / 10);
    let next;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = snap(value + safeStep);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = snap(value - safeStep);
        break;
      case "PageUp":
        next = snap(value + page);
        break;
      case "PageDown":
        next = snap(value - page);
        break;
      case "Home":
        next = min;
        break;
      case "End":
        next = max;
        break;
      default:
        return;
    }
    e.preventDefault();
    if (next !== value) onChange(next);
  };
  const engaged = active || hover;
  const handleWidth = engaged ? 6 : 4;
  const tickCount = discrete ? Math.max(2, Math.min(24, Math.round((max - min) / safeStep) + 1)) : 0;
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    "div",
    {
      ref,
      className: cn("relative select-none", fullWidth ? "w-full" : "w-64", disabled && "pointer-events-none opacity-38", className),
      children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
        "div",
        {
          ref: trackRef,
          role: "slider",
          tabIndex: disabled ? -1 : 0,
          "aria-valuemin": min,
          "aria-valuemax": max,
          "aria-valuenow": value,
          "aria-orientation": "horizontal",
          onPointerDown,
          onPointerMove,
          onPointerUp: endDrag,
          onPointerCancel: endDrag,
          onPointerEnter: () => setHover(true),
          onPointerLeave: () => {
            setHover(false);
            endDrag();
          },
          onKeyDown,
          ...rest,
          className: "m3-focus relative flex h-12 w-full cursor-pointer touch-none items-center rounded-full outline-none",
          children: [
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "relative h-4 w-full", children: [
              /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "absolute inset-0 flex overflow-hidden rounded-full", children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "h-full bg-m3-primary", style: { width: `${fraction * 100}%` } }),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "h-full flex-1 bg-m3-surface-container-highest" })
              ] }),
              discrete && tickCount > 1 ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "pointer-events-none absolute inset-x-[6px] inset-y-0", "aria-hidden": "true", children: Array.from({ length: tickCount }, (_, i) => {
                const f = i / (tickCount - 1);
                if (f <= fraction) return null;
                return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                  "span",
                  {
                    className: "absolute top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-m3-on-surface",
                    style: { left: `${f * 100}%` }
                  },
                  i
                );
              }) }) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "pointer-events-none absolute inset-y-0 right-[6px] flex items-center", "aria-hidden": "true", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                "span",
                {
                  className: "h-1 w-1 rounded-full bg-m3-on-surface transition-opacity duration-150",
                  style: { opacity: fraction >= 1 ? 0 : 1 }
                }
              ) }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                "span",
                {
                  className: "pointer-events-none absolute top-1/2",
                  style: { left: `${fraction * 100}%`, transform: "translate(-50%, -50%)" },
                  children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                    _framermotion.motion.span,
                    {
                      className: "block rounded-full bg-m3-primary",
                      initial: false,
                      animate: { width: handleWidth, height: 44 },
                      transition: springs9.fastVisual
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: showValueLabel && engaged && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
              _framermotion.motion.span,
              {
                className: "pointer-events-none absolute bottom-full mb-2 inline-block whitespace-nowrap rounded-full bg-m3-primary px-2 py-0.5 text-m3-on-primary md-label-medium",
                style: { left: `${fraction * 100}%`, x: "-50%" },
                initial: { opacity: 0, scale: 0.6, y: 4 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.6, y: 4 },
                transition: springs9.expressive,
                children: value
              },
              "value-bubble"
            ) })
          ]
        }
      )
    }
  );
});

// ../../src/components/m3/Chip.tsx



var springs10 = springs;
var sizeHeights3 = { xs: 28, sm: 32, md: 40 };
var Chip = React26.forwardRef(function Chip2({
  variant = "assist",
  selected = false,
  onSelect,
  onRemove,
  leadingIcon,
  trailingIcon,
  elevated = false,
  size = "sm",
  disabled = false,
  className,
  children
}, ref) {
  const isInput = variant === "input";
  const isSelectable = variant === "filter" || variant === "assist" || variant === "suggestion";
  const showCheck = selected && (variant === "filter" || variant === "assist");
  const handleClick = () => {
    if (disabled) return;
    if (isSelectable) _optionalChain([onSelect, 'optionalCall', _64 => _64(!selected)]);
  };
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    _framermotion.motion.button,
    {
      ref,
      type: "button",
      disabled,
      onClick: handleClick,
      whileTap: disabled ? void 0 : { scale: 0.96 },
      transition: springs10.fastVisual,
      "aria-pressed": isSelectable ? selected : void 0,
      className: cn(
        "m3-state m3-focus relative inline-flex select-none items-center gap-2 overflow-hidden rounded-full border px-4 md-label-large transition-[background-color,border-color,box-shadow] duration-150",
        elevated && !selected ? "m3-elevation-1 border-transparent bg-m3-surface-container-low text-m3-primary hover:[box-shadow:0_1px_2px_0_rgb(0_0_0/0.30),0_2px_6px_2px_rgb(0_0_0/0.15)]" : showCheck ? "border-transparent bg-m3-secondary-container text-m3-on-secondary-container" : "border-m3-outline bg-transparent text-m3-on-surface",
        disabled && "pointer-events-none opacity-38",
        className
      ),
      style: { height: sizeHeights3[size] },
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, { disabled }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { initial: false, mode: "wait", children: showCheck ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          _framermotion.motion.span,
          {
            className: "inline-flex shrink-0 items-center justify-center overflow-hidden",
            initial: { width: 0, opacity: 0 },
            animate: { width: 18, opacity: 1 },
            exit: { width: 0, opacity: 0 },
            transition: springs10.fastSpatial,
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
            transition: springs10.fastVisual,
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: leadingIcon, size: 18 })
          },
          "leading"
        ) }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "truncate", children }),
        isInput && onRemove && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          "span",
          {
            role: "button",
            tabIndex: disabled ? -1 : 0,
            "aria-label": "Remove",
            onClick: (e) => {
              e.stopPropagation();
              if (!disabled) onRemove();
            },
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                e.preventDefault();
                if (!disabled) onRemove();
              }
            },
            className: "m3-state -mr-2 grid h-6 w-6 shrink-0 place-items-center overflow-hidden rounded-full text-m3-on-surface-variant transition-colors duration-150 hover:text-m3-on-surface",
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "cancel", size: 18 })
          }
        ),
        !isInput && trailingIcon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: trailingIcon, size: 18, className: "shrink-0" })
      ]
    }
  );
});

// ../../src/components/m3/Tabs.tsx



function spring2(transition) {
  return { ...transition, type: "spring" };
}
function Tabs({
  items,
  value,
  onChange,
  variant = "primary",
  fullWidth = false,
  className
}) {
  const uid = React27.useId();
  const indicatorId = `m3-tab-indicator-${uid}`;
  const pillId = `m3-tab-pill-${uid}`;
  const isPrimary = variant === "primary";
  const scrollerRef = React27.useRef(null);
  const [canScrollStart, setCanScrollStart] = React27.useState(false);
  const [canScrollEnd, setCanScrollEnd] = React27.useState(false);
  const updateOverflow = React27.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollStart(el.scrollLeft > 4);
    setCanScrollEnd(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);
  React27.useEffect(() => {
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
  const scrollTabs = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.75, 120), behavior: "smooth" });
  };
  const tabRefs = React27.useRef([]);
  const onTabKeyDown = (e, index) => {
    let next = null;
    if (e.key === "ArrowRight") next = (index + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    if (next === null) return;
    e.preventDefault();
    _optionalChain([tabRefs, 'access', _65 => _65.current, 'access', _66 => _66[next], 'optionalAccess', _67 => _67.focus, 'call', _68 => _68()]);
    onChange(items[next].value);
  };
  const labelRefs = React27.useRef(/* @__PURE__ */ new Map());
  const [labelWidths, setLabelWidths] = React27.useState({});
  const measureLabels = React27.useCallback(() => {
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
  React27.useLayoutEffect(() => {
    measureLabels();
    const ro = new ResizeObserver(measureLabels);
    labelRefs.current.forEach((el) => ro.observe(el));
    let cancelled = false;
    _optionalChain([document, 'access', _69 => _69.fonts, 'optionalAccess', _70 => _70.ready, 'access', _71 => _71.then, 'call', _72 => _72(() => {
      if (!cancelled) measureLabels();
    })]);
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [measureLabels, items]);
  const tablist = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    "div",
    {
      ref: scrollerRef,
      role: "tablist",
      className: cn(
        "m3-scroll flex flex-1 items-stretch overflow-x-auto",
        isPrimary ? "h-16 border-b border-m3-outline-variant" : "h-12"
      ),
      children: items.map((item, index) => {
        const active = item.value === value;
        const measuredWidth = _nullishCoalesce(labelWidths[item.value], () => ( 0));
        const textColor = active ? isPrimary ? "text-m3-primary" : "text-m3-on-secondary-container" : "text-m3-on-surface-variant";
        return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
          "button",
          {
            ref: (el) => {
              tabRefs.current[index] = el;
            },
            type: "button",
            role: "tab",
            "aria-selected": active,
            tabIndex: active ? 0 : -1,
            onKeyDown: (e) => onTabKeyDown(e, index),
            onClick: () => onChange(item.value),
            className: cn(
              "m3-state relative flex shrink-0 items-center justify-center",
              isPrimary ? "flex-col gap-1 pb-2 pt-3" : "gap-2 px-4",
              "min-w-[96px]",
              fullWidth && "flex-1",
              textColor
            ),
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
              isPrimary ? active && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                _framermotion.motion.div,
                {
                  layoutId: indicatorId,
                  transition: spring2(springs.expressive),
                  className: cn(
                    "absolute bottom-0 h-[3px] rounded-full bg-m3-primary",
                    measuredWidth === 0 && "left-1/3 w-1/3"
                  ),
                  style: measuredWidth > 0 ? {
                    width: measuredWidth,
                    left: `calc(50% - ${measuredWidth / 2}px)`
                  } : void 0
                }
              ) : active && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                _framermotion.motion.div,
                {
                  layoutId: pillId,
                  transition: spring2(springs.expressive),
                  className: "absolute inset-x-1 inset-y-2 rounded-full bg-m3-secondary-container"
                }
              ),
              item.icon && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: "relative", children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: item.icon, size: 24, fill: active }),
                item.badge !== void 0 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-m3-error px-1 text-[10px] font-semibold leading-none text-m3-on-error", children: item.badge })
              ] }),
              !item.icon && item.badge !== void 0 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-m3-error px-1 text-[10px] font-semibold leading-none text-m3-on-error", children: item.badge }),
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
        );
      })
    }
  );
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    "div",
    {
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
            onClick: () => scrollTabs(-1),
            className: "m3-state relative flex h-12 w-12 shrink-0 items-center justify-center self-center text-m3-on-surface-variant",
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "chevron_left", size: 24 })
            ]
          }
        ),
        tablist,
        canScrollEnd && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
          "button",
          {
            type: "button",
            "aria-label": "Scroll tabs forward",
            onClick: () => scrollTabs(1),
            className: "m3-state relative flex h-12 w-12 shrink-0 items-center justify-center self-center text-m3-on-surface-variant",
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "chevron_right", size: 24 })
            ]
          }
        )
      ]
    }
  );
}

// ../../src/components/m3/NavigationBar.tsx



function spring3(transition) {
  return { ...transition, type: "spring" };
}
function NavigationBar({
  items,
  value,
  onChange,
  fullWidth = true,
  className
}) {
  const uid = React28.useId();
  const pillId = `m3-nav-pill-${uid}`;
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    "nav",
    {
      "aria-label": "Primary",
      className: cn(
        "flex h-20 items-stretch bg-m3-surface-container px-2",
        fullWidth ? "w-full" : "w-fit",
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
            className: "m3-state relative flex flex-1 flex-col items-center justify-center gap-1 pt-2",
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
              /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: "relative flex h-8 w-16 items-center justify-center rounded-full", children: [
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
                item.badge !== void 0 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "absolute -right-1.5 -top-1 z-10 flex h-4 min-w-4 items-center justify-center rounded-full bg-m3-error px-1 text-[10px] font-semibold leading-none text-m3-on-error", children: item.badge })
              ] }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: cn("md-label-medium", active ? "text-m3-on-surface" : "text-m3-on-surface-variant"), children: item.label })
            ]
          },
          item.value
        );
      })
    }
  );
}

// ../../src/components/m3/NavigationDrawer.tsx



function spring4(transition) {
  return { ...transition, type: "spring" };
}
function NavigationDrawer({
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
}) {
  const uid = React29.useId();
  const pillId = `m3-drawer-pill-${uid}`;
  const isControlled = open !== void 0;
  const [uncontrolledOpen, setUncontrolledOpen] = React29.useState(false);
  const showModal = variant === "modal" && (open !== void 0 ? open : uncontrolledOpen);
  const handleClose = React29.useCallback(() => {
    if (!isControlled) setUncontrolledOpen(false);
    _optionalChain([onClose, 'optionalCall', _73 => _73()]);
  }, [isControlled, onClose]);
  const panelRef = React29.useRef(null);
  const restoreFocusRef = React29.useRef(null);
  React29.useEffect(() => {
    if (!showModal) return;
    restoreFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    _optionalChain([panelRef, 'access', _74 => _74.current, 'optionalAccess', _75 => _75.focus, 'call', _76 => _76({ preventScroll: true })]);
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = Array.from(
        panel.querySelectorAll(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      const inside = !!active && panel.contains(active);
      if (e.shiftKey && (active === first || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      _optionalChain([restoreFocusRef, 'access', _77 => _77.current, 'optionalAccess', _78 => _78.focus, 'optionalCall', _79 => _79()]);
    };
  }, [showModal, handleClose]);
  const body = /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    header && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "px-4 pb-2 pt-4", children: header }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "ul", { className: "flex flex-col gap-1", children: items.map((item) => {
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
          className: "m3-state relative flex h-14 w-full items-center rounded-full px-4",
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
                  "md-label-large relative ml-3",
                  active ? "text-m3-on-secondary-container" : "text-m3-on-surface-variant"
                ),
                children: item.label
              }
            ),
            item.badge !== void 0 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "relative ml-auto rounded-full bg-m3-error px-1.5 py-0.5 text-xs font-medium leading-none text-m3-on-error", children: item.badge })
          ]
        }
      ) }, item.value);
    }) }),
    footer && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "mt-auto p-2", children: footer })
  ] });
  if (variant === "standard") {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "nav",
      {
        "aria-label": "Navigation drawer",
        className: cn(
          "m3-scroll flex w-[360px] shrink-0 flex-col overflow-y-auto rounded-2xl bg-m3-surface-container-low p-3",
          fullHeight && "h-full",
          className
        ),
        children: body
      }
    );
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: showModal && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "fixed inset-0 z-[75]", role: "dialog", "aria-modal": "true", "aria-label": "Navigation drawer", children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      _framermotion.motion.div,
      {
        className: "absolute inset-0 bg-m3-scrim/32",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: spring4(springs.defaultVisual),
        onClick: handleClose
      }
    ),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      _framermotion.motion.nav,
      {
        ref: panelRef,
        tabIndex: -1,
        "aria-label": "Navigation drawer",
        className: "m3-scroll absolute left-0 top-0 flex h-full w-[360px] flex-col overflow-y-auto rounded-r-2xl bg-m3-surface-container-low p-3 focus:outline-none",
        initial: { x: "-100%" },
        animate: { x: 0 },
        exit: { x: "-100%" },
        transition: spring4(springs.defaultSpatial),
        children: body
      }
    )
  ] }, "m3-drawer") });
}

// ../../src/components/m3/NavigationRail.tsx



function spring5(transition) {
  return { ...transition, type: "spring" };
}
function NavigationRail({
  items,
  value,
  onChange,
  header,
  menuIcon = "menu",
  onMenuClick,
  foldingLine = false,
  className
}) {
  const uid = React30.useId();
  const pillId = `m3-rail-pill-${uid}`;
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    "nav",
    {
      "aria-label": "Primary",
      className: cn(
        "flex min-h-full w-20 shrink-0 flex-col items-center gap-3 bg-m3-surface-container-low py-3",
        foldingLine && "border-r border-m3-outline-variant",
        className
      ),
      children: [
        onMenuClick && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
          "button",
          {
            type: "button",
            "aria-label": "Menu",
            title: "Menu",
            onClick: onMenuClick,
            className: "m3-state relative mb-2 flex h-12 w-12 items-center justify-center rounded-full text-m3-on-surface-variant",
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: menuIcon, size: 24 })
            ]
          }
        ),
        header && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "mb-2 flex justify-center", children: header }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "ul", { className: "flex flex-col items-center gap-3", children: items.map((item) => {
          const active = item.value === value;
          return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "li", { children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
            "button",
            {
              type: "button",
              "aria-current": active ? "page" : void 0,
              onClick: () => onChange(item.value),
              className: "m3-state relative flex w-16 flex-col items-center gap-1 pb-2 pt-1",
              children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
                /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: "relative flex h-8 w-14 items-center justify-center rounded-full", children: [
                  active && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                    _framermotion.motion.div,
                    {
                      layoutId: pillId,
                      transition: spring5(springs.expressive),
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
                  item.badge !== void 0 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "absolute -right-1.5 -top-1 z-10 flex h-4 min-w-4 items-center justify-center rounded-full bg-m3-error px-1 text-[10px] font-semibold leading-none text-m3-on-error", children: item.badge })
                ] }),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: cn("md-label-medium", active ? "text-m3-on-surface" : "text-m3-on-surface-variant"), children: item.label })
              ]
            }
          ) }, item.value);
        }) })
      ]
    }
  );
}

// ../../src/components/m3/TopAppBar.tsx



function spring6(transition) {
  return { ...transition, type: "spring" };
}
var heights = {
  small: 64,
  center: 64,
  medium: 112,
  large: 152
};
function AppBarIconButton({ icon, label, onClick }) {
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    "button",
    {
      type: "button",
      "aria-label": _nullishCoalesce(label, () => ( icon)),
      title: label,
      onClick,
      className: "m3-state relative flex h-11 w-11 items-center justify-center rounded-full text-m3-on-surface-variant",
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon, size: 24 })
      ]
    }
  );
}
function TopAppBar({
  title,
  variant = "small",
  actions = [],
  onBack,
  scrollTargetRef,
  fullWidth = true,
  className
}) {
  const [scrolled, setScrolled] = React31.useState(false);
  const isFlexible = variant === "medium" || variant === "large";
  const collapsed = isFlexible && scrolled;
  const threshold = isFlexible ? heights[variant] - 64 : 4;
  React31.useEffect(() => {
    const el = _nullishCoalesce(_optionalChain([scrollTargetRef, 'optionalAccess', _80 => _80.current]), () => ( null));
    const readTop = () => el ? el.scrollTop : window.scrollY;
    const onScroll = () => setScrolled(readTop() > threshold);
    onScroll();
    const target = _nullishCoalesce(el, () => ( window));
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, [scrollTargetRef, threshold]);
  const barState = scrolled ? "bg-m3-surface-container" : "bg-m3-surface";
  const actionsRow = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "ml-auto flex items-center gap-1", children: actions.map((action, i) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, AppBarIconButton, { icon: action.icon, label: action.label, onClick: action.onClick }, `${action.icon}-${i}`)) });
  if (!isFlexible) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "header",
      {
        style: { transitionDuration: `${durations.medium2}ms`, transitionTimingFunction: easings.standard },
        className: cn(
          "sticky top-0 z-40 transition-[background-color]",
          barState,
          fullWidth && "w-full",
          className
        ),
        children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "relative flex h-16 items-center px-1", children: [
          onBack && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, AppBarIconButton, { icon: "arrow_back", label: "Back", onClick: onBack }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
            "span",
            {
              className: cn(
                "md-title-large px-2",
                variant === "center" && "absolute left-1/2 max-w-[60%] -translate-x-1/2 truncate text-center"
              ),
              children: title
            }
          ),
          actionsRow
        ] })
      }
    );
  }
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    _framermotion.motion.header,
    {
      animate: {
        height: collapsed ? 64 : heights[variant],
        backgroundColor: scrolled ? "var(--md-surface-container)" : "var(--md-surface)"
      },
      transition: {
        height: spring6(springs.defaultSpatial),
        backgroundColor: { duration: durations.medium2 / 1e3, ease: [0.2, 0, 0, 1] }
      },
      className: cn(
        "sticky top-0 z-40 overflow-hidden",
        fullWidth && "w-full",
        className
      ),
      children: [
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "absolute inset-x-0 top-0 flex h-16 items-center px-1", children: [
          onBack && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, AppBarIconButton, { icon: "arrow_back", label: "Back", onClick: onBack }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: collapsed && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
            _framermotion.motion.span,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: spring6(springs.fastVisual),
              className: "md-title-large max-w-[60%] truncate px-2",
              children: title
            }
          ) }),
          actionsRow
        ] }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: !collapsed && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          _framermotion.motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 12 },
            transition: spring6(springs.defaultSpatial),
            className: "absolute inset-x-4 bottom-1",
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: cn("block truncate", variant === "large" ? "md-headline-large" : "md-headline-small"), children: title })
          },
          "hero-title"
        ) })
      ]
    }
  );
}

// ../../src/components/m3/BottomAppBar.tsx



function spring7(transition) {
  return { ...transition, type: "spring" };
}
function BottomAppBar({
  navigationIcon,
  actions = [],
  trailingIcons = [],
  fab,
  fullWidth = true,
  className
}) {
  const [fabPressed, setFabPressed] = React32.useState(false);
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    "div",
    {
      className: cn(
        "relative flex h-20 items-center justify-between bg-m3-surface-container px-4",
        fullWidth && "w-full",
        className
      ),
      children: [
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-center gap-1", children: [
          navigationIcon && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
            "button",
            {
              type: "button",
              "aria-label": _nullishCoalesce(navigationIcon.label, () => ( navigationIcon.icon)),
              title: navigationIcon.label,
              onClick: navigationIcon.onClick,
              className: "m3-state relative flex h-12 w-12 items-center justify-center rounded-full text-m3-on-surface-variant",
              children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: navigationIcon.icon, size: 24 })
              ]
            }
          ),
          actions.map((action, i) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
            "button",
            {
              type: "button",
              "aria-label": _nullishCoalesce(action.label, () => ( action.icon)),
              title: action.label,
              onClick: action.onClick,
              className: "m3-state relative flex h-12 w-12 items-center justify-center rounded-full text-m3-on-surface-variant",
              children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: action.icon, size: 24 })
              ]
            },
            `${action.icon}-${i}`
          ))
        ] }),
        fab && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "absolute -top-7 left-1/2 z-10 -translate-x-1/2", children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
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
            className: "m3-state m3-elevation-3 relative flex h-14 w-14 items-center justify-center bg-m3-primary-container",
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: fab.icon, size: 24, fill: true, className: "text-m3-on-primary-container" })
            ]
          }
        ) }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "flex items-center gap-1", children: trailingIcons.map((icon, i) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
          "button",
          {
            type: "button",
            "aria-label": icon,
            className: "m3-state relative flex h-12 w-12 items-center justify-center rounded-full text-m3-on-surface-variant",
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon, size: 24 })
            ]
          },
          `${icon}-${i}`
        )) })
      ]
    }
  );
}

// ../../src/components/m3/Toolbar.tsx


function spring8(transition) {
  return { ...transition, type: "spring" };
}
var colorStyles2 = {
  surface: { container: "bg-m3-surface-container-high", icon: "text-m3-on-surface", activeBg: "bg-m3-on-surface/12" },
  primary: { container: "bg-m3-primary-container", icon: "text-m3-on-primary-container", activeBg: "bg-m3-on-primary-container/12" },
  secondary: { container: "bg-m3-secondary-container", icon: "text-m3-on-secondary-container", activeBg: "bg-m3-on-secondary-container/12" },
  tertiary: { container: "bg-m3-tertiary-container", icon: "text-m3-on-tertiary-container", activeBg: "bg-m3-on-tertiary-container/12" }
};
function Toolbar({
  icons,
  variant = "floating",
  color = "surface",
  position = "bottom",
  width = 560,
  fullWidth = false,
  docked = false,
  className
}) {
  const c = colorStyles2[color];
  const renderIconButton = (item, i) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    "button",
    {
      type: "button",
      "aria-label": _nullishCoalesce(item.label, () => ( item.icon)),
      title: item.label,
      "aria-pressed": item.active || void 0,
      onClick: item.onClick,
      className: cn(
        "m3-state relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
        c.icon,
        item.active && c.activeBg
      ),
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: item.icon, size: 24, fill: item.active })
      ]
    },
    `${item.icon}-${i}`
  );
  if (variant === "dockable") {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: cn("w-full", className), children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "div",
      {
        style: {
          width: !docked && !fullWidth ? width : void 0,
          transitionDuration: `${durations.medium2}ms`,
          transitionTimingFunction: easings.standard
        },
        className: cn(
          "flex h-14 items-center gap-1 transition-all",
          docked ? "w-full rounded-none px-3 m3-elevation-1" : cn("mx-auto rounded-full px-2 m3-elevation-2", fullWidth ? "w-full" : "justify-center"),
          c.container
        ),
        children: icons.map(renderIconButton)
      }
    ) });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _framermotion.motion.div,
    {
      initial: { opacity: 0, x: fullWidth ? 0 : "-50%", y: position === "bottom" ? 12 : -12, scale: 0.96 },
      animate: { opacity: 1, x: fullWidth ? 0 : "-50%", y: 0, scale: 1 },
      transition: spring8(springs.expressiveEffects),
      style: fullWidth ? { width: "calc(100% - 2rem)" } : { width, transitionDuration: `${durations.medium2}ms`, transitionTimingFunction: easings.standard },
      className: cn(
        "m3-elevation-2 absolute flex items-center justify-center gap-1 rounded-full px-2 py-1",
        position === "bottom" ? "bottom-4" : "top-4",
        fullWidth ? "left-4" : "left-1/2",
        c.container,
        className
      ),
      children: icons.map(renderIconButton)
    }
  );
}

// ../../src/components/m3/Menu.tsx



function spring9(transition) {
  return { ...transition, type: "spring" };
}
function Menu({
  trigger,
  items,
  open,
  onOpenChange,
  placement = "bottom-start",
  className
}) {
  const isControlled = open !== void 0;
  const [internalOpen, setInternalOpen] = React33.useState(false);
  const isOpen = open !== void 0 ? open : internalOpen;
  const rootRef = React33.useRef(null);
  const triggerAreaRef = React33.useRef(null);
  const itemRefs = React33.useRef([]);
  const setOpen = React33.useCallback(
    (next) => {
      if (!isControlled) setInternalOpen(next);
      _optionalChain([onOpenChange, 'optionalCall', _81 => _81(next)]);
    },
    [isControlled, onOpenChange]
  );
  const getEnabledIndexes = React33.useCallback(() => {
    const idxs = [];
    items.forEach((item, index) => {
      if ((_nullishCoalesce(item.type, () => ( "item"))) === "item" && !item.disabled) idxs.push(index);
    });
    return idxs;
  }, [items]);
  const focusItemAt = React33.useCallback(
    (pos) => {
      const idxs = getEnabledIndexes();
      if (idxs.length === 0) return;
      const wrapped = (pos % idxs.length + idxs.length) % idxs.length;
      _optionalChain([itemRefs, 'access', _82 => _82.current, 'access', _83 => _83[idxs[wrapped]], 'optionalAccess', _84 => _84.focus, 'call', _85 => _85()]);
    },
    [getEnabledIndexes]
  );
  const restoreTriggerFocus = React33.useCallback(() => {
    const area = triggerAreaRef.current;
    if (!area) return;
    const target = area.querySelector(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    (_nullishCoalesce(target, () => ( area))).focus();
  }, []);
  React33.useEffect(() => {
    if (!isOpen) return;
    const onMouseDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, setOpen]);
  React33.useEffect(() => {
    if (!isOpen) return;
    const raf = requestAnimationFrame(() => focusItemAt(0));
    return () => cancelAnimationFrame(raf);
  }, [isOpen, focusItemAt]);
  const onPanelKeyDown = (e) => {
    const idxs = getEnabledIndexes();
    const count = idxs.length;
    const active = document.activeElement;
    const pos = idxs.findIndex((idx) => itemRefs.current[idx] === active);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusItemAt(pos < 0 ? 0 : pos + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusItemAt(pos < 0 ? count - 1 : pos - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusItemAt(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusItemAt(count - 1);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      restoreTriggerFocus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };
  const originalOnClick = React33.isValidElement(trigger) ? trigger.props.onClick : void 0;
  const originalOnKeyDown = React33.isValidElement(trigger) ? trigger.props.onKeyDown : void 0;
  const handleTriggerClick = (e) => {
    _optionalChain([originalOnClick, 'optionalCall', _86 => _86(e)]);
    setOpen(!isOpen);
  };
  const handleTriggerKeyDown = (e) => {
    _optionalChain([originalOnKeyDown, 'optionalCall', _87 => _87(e)]);
    if (!e.defaultPrevented && e.key === "ArrowDown" && !isOpen) {
      e.preventDefault();
      setOpen(true);
    }
  };
  const triggerAriaProps = {
    "aria-haspopup": "menu",
    "aria-expanded": isOpen
  };
  const triggerNode = React33.isValidElement(trigger) ? React33.cloneElement(
    trigger,
    {
      onClick: handleTriggerClick,
      onKeyDown: handleTriggerKeyDown,
      ...triggerAriaProps
    }
  ) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "button", { type: "button", onClick: handleTriggerClick, onKeyDown: handleTriggerKeyDown, ...triggerAriaProps, className: "inline-flex", children: trigger });
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { ref: rootRef, className: cn("relative inline-flex", className), children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { ref: triggerAreaRef, tabIndex: -1, className: "inline-flex focus:outline-none", children: triggerNode }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: isOpen && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      _framermotion.motion.div,
      {
        role: "menu",
        "aria-orientation": "vertical",
        initial: { opacity: 0, scale: 0.9, y: -4 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: -4 },
        transition: spring9(springs.fastVisual),
        onKeyDown: onPanelKeyDown,
        style: { transformOrigin: placement === "bottom-end" ? "top right" : "top left" },
        className: cn(
          "absolute top-full z-50 mt-1 min-w-[180px] max-w-[280px] rounded-[4px] bg-m3-surface-container m3-elevation-2 py-2",
          placement === "bottom-start" ? "left-0" : "right-0"
        ),
        children: items.map((item, i) => {
          const type = _nullishCoalesce(item.type, () => ( "item"));
          if (type === "divider") {
            return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { role: "separator", className: "my-2 h-px bg-m3-outline-variant" }, i);
          }
          if (type === "label") {
            return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "md-label-small px-3 pb-1 pt-2 text-m3-on-surface-variant", children: item.label }, i);
          }
          return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
            "button",
            {
              ref: (el) => {
                itemRefs.current[i] = el;
              },
              type: "button",
              role: "menuitem",
              tabIndex: -1,
              disabled: item.disabled,
              onClick: () => {
                _optionalChain([item, 'access', _88 => _88.onClick, 'optionalCall', _89 => _89()]);
                setOpen(false);
                restoreTriggerFocus();
              },
              className: cn(
                "m3-state relative flex h-12 w-full items-center gap-3 px-3 text-left md-body-large",
                item.disabled ? "pointer-events-none opacity-38" : item.destructive ? "text-m3-error" : "text-m3-on-surface"
              ),
              children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Ripple, {}),
                item.icon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                  MaterialSymbol,
                  {
                    icon: item.icon,
                    size: 24,
                    className: cn(!item.destructive && "text-m3-on-surface-variant")
                  }
                ),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "truncate", children: item.label }),
                item.shortcut && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-label-small ml-auto pl-4 text-m3-on-surface-variant", children: item.shortcut })
              ]
            },
            i
          );
        })
      }
    ) })
  ] });
}

// ../../src/components/m3/DatePicker.tsx



var MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var WEEKDAYS = [
  { initial: "S", long: "Sunday" },
  { initial: "M", long: "Monday" },
  { initial: "T", long: "Tuesday" },
  { initial: "W", long: "Wednesday" },
  { initial: "T", long: "Thursday" },
  { initial: "F", long: "Friday" },
  { initial: "S", long: "Saturday" }
];
var FIRST_YEAR = 1988;
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
function getMonthGrid(cursor) {
  const first = startOfMonth(cursor);
  const start = new Date(first.getFullYear(), first.getMonth(), 1 - first.getDay());
  const cells = [];
  for (let i = 0; i < 42; i++) {
    cells.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  }
  return cells;
}
function formatHeadline(d) {
  return `${WEEKDAYS[d.getDay()].long.slice(0, 3)}, ${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
}
var FOCUSABLE5 = 'a[href], button:not([disabled]), textarea, input, select, details, [tabindex]:not([tabindex="-1"])';
function DatePickerCalendar({
  value,
  onChange,
  minDate,
  maxDate,
  tone = "primary",
  animatedHeader = false
}) {
  const [internal, setInternal] = React34.useState(void 0);
  const selected = _nullishCoalesce(value, () => ( internal));
  const [cursor, setCursor] = React34.useState(() => startOfMonth(_nullishCoalesce(value, () => ( /* @__PURE__ */ new Date()))));
  const [view, setView] = React34.useState("month");
  const [rovingOverride, setRovingOverride] = React34.useState(null);
  const pillId = React34.useId();
  const selectedYearRef = React34.useRef(null);
  const gridRef = React34.useRef(null);
  React34.useEffect(() => {
    if (view === "year") _optionalChain([selectedYearRef, 'access', _90 => _90.current, 'optionalAccess', _91 => _91.scrollIntoView, 'call', _92 => _92({ block: "center" })]);
  }, [view]);
  React34.useEffect(() => {
    setRovingOverride(null);
  }, [cursor]);
  const cells = React34.useMemo(() => getMonthGrid(cursor), [cursor]);
  const years = React34.useMemo(() => {
    const list = [];
    const last = (/* @__PURE__ */ new Date()).getFullYear() + 10;
    for (let y = FIRST_YEAR; y <= last; y++) list.push(y);
    return list;
  }, []);
  const isDisabledDay = React34.useCallback(
    (d) => {
      if (minDate && startOfDay(d) < startOfDay(minDate)) return true;
      if (maxDate && startOfDay(d) > startOfDay(maxDate)) return true;
      return false;
    },
    [minDate, maxDate]
  );
  const handleSelect = (d) => {
    setInternal(d);
    _optionalChain([onChange, 'optionalCall', _93 => _93(d)]);
  };
  const navigate = (dir) => {
    setCursor(
      (c) => view === "year" ? new Date(c.getFullYear() + dir * 12, c.getMonth(), 1) : new Date(c.getFullYear(), c.getMonth() + dir, 1)
    );
  };
  const today = /* @__PURE__ */ new Date();
  const highlightYear = (_nullishCoalesce(selected, () => ( cursor))).getFullYear();
  const activeIso = React34.useMemo(() => {
    if (rovingOverride) return rovingOverride;
    const inView = (d) => cells.some((c) => sameDay(c, d));
    const pick = _nullishCoalesce(_nullishCoalesce(_nullishCoalesce(_nullishCoalesce((selected && inView(selected) && !isDisabledDay(selected) ? selected : void 0), () => ( (inView(today) && !isDisabledDay(today) ? today : void 0))), () => ( cells.find((c) => c.getMonth() === cursor.getMonth() && !isDisabledDay(c)))), () => ( cells.find((c) => !isDisabledDay(c)))), () => ( cells[0]));
    return isoOf(pick);
  }, [rovingOverride, cells, selected, today, cursor, isDisabledDay]);
  const focusCell = (iso) => {
    requestAnimationFrame(() => {
      _optionalChain([gridRef, 'access', _94 => _94.current, 'optionalAccess', _95 => _95.querySelector, 'call', _96 => _96(`button[data-iso="${iso}"]`), 'optionalAccess', _97 => _97.focus, 'call', _98 => _98()]);
    });
  };
  const handleDayKeyDown = (e, idx) => {
    let delta = 0;
    if (e.key === "ArrowLeft") delta = -1;
    else if (e.key === "ArrowRight") delta = 1;
    else if (e.key === "ArrowUp") delta = -7;
    else if (e.key === "ArrowDown") delta = 7;
    else if (e.key === "Home") delta = -(idx % 7);
    else if (e.key === "End") delta = 6 - idx % 7;
    else return;
    e.preventDefault();
    let i = idx + delta;
    while (i >= 0 && i < cells.length && isDisabledDay(cells[i])) i += delta;
    if (i < 0 || i >= cells.length) return;
    const target = cells[i];
    if (target.getMonth() !== cursor.getMonth() || target.getFullYear() !== cursor.getFullYear()) {
      setCursor(startOfMonth(target));
    }
    setRovingOverride(isoOf(target));
    focusCell(isoOf(target));
  };
  const weekRows = [];
  for (let r = 0; r < 6; r++) weekRows.push(cells.slice(r * 7, r * 7 + 7));
  const headerLabel = view === "year" ? String(cursor.getFullYear()) : `${MONTH_NAMES[cursor.getMonth()]} ${cursor.getFullYear()}`;
  const selectedPillClass = tone === "primary-container" ? "bg-m3-primary-container" : "bg-m3-primary";
  const selectedTextClass = tone === "primary-container" ? "text-m3-on-primary-container" : "text-m3-on-primary";
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "mb-1 flex items-center justify-between", children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        "button",
        {
          type: "button",
          onClick: () => setView((v) => v === "month" ? "year" : "month"),
          className: "m3-state m3-focus md-title-large cursor-pointer rounded-full px-3 py-1 text-m3-on-surface outline-none",
          children: animatedHeader ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { mode: "popLayout", initial: false, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
            _framermotion.motion.span,
            {
              initial: { opacity: 0, y: 6 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -6 },
              transition: springs.fastVisual,
              className: "block",
              children: headerLabel
            },
            headerLabel
          ) }) : headerLabel
        }
      ),
      /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-center", children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          "button",
          {
            type: "button",
            "aria-label": view === "year" ? "Previous years" : "Previous month",
            onClick: () => navigate(-1),
            className: "m3-state m3-focus flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-m3-on-surface outline-none",
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "chevron_left" })
          }
        ),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          "button",
          {
            type: "button",
            "aria-label": view === "year" ? "Next years" : "Next month",
            onClick: () => navigate(1),
            className: "m3-state m3-focus flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-m3-on-surface outline-none",
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, MaterialSymbol, { icon: "chevron_right" })
          }
        )
      ] })
    ] }),
    view === "month" ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { role: "grid", ref: gridRef, children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { role: "row", className: "grid grid-cols-7 justify-items-center", children: WEEKDAYS.map((w, i) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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
        const isSelected = selected !== void 0 && sameDay(day, selected);
        const isToday = sameDay(day, today);
        const inMonth = day.getMonth() === cursor.getMonth();
        const disabled = isDisabledDay(day);
        return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          "div",
          {
            role: "gridcell",
            "aria-selected": isSelected || void 0,
            "aria-current": isToday ? "date" : void 0,
            "aria-disabled": disabled || void 0,
            className: "flex items-center justify-center",
            children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
              "button",
              {
                type: "button",
                "data-iso": iso,
                disabled,
                tabIndex: iso === activeIso ? 0 : -1,
                "aria-label": `${MONTH_NAMES[day.getMonth()]} ${day.getDate()}, ${day.getFullYear()}`,
                onClick: () => handleSelect(day),
                onKeyDown: (e) => handleDayKeyDown(e, idx),
                className: cn(
                  "m3-state m3-focus relative my-0.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full md-body-large outline-none",
                  disabled && "pointer-events-none opacity-38",
                  !isSelected && isToday && "border border-m3-primary text-m3-primary",
                  !isSelected && !isToday && (inMonth ? "text-m3-on-surface" : "text-m3-on-surface-variant")
                ),
                children: [
                  isSelected && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                    _framermotion.motion.span,
                    {
                      layoutId: pillId,
                      className: cn("absolute inset-0 rounded-full", selectedPillClass),
                      transition: springs.expressive
                    }
                  ),
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: cn("relative z-10", isSelected && selectedTextClass), children: day.getDate() })
                ]
              }
            )
          },
          iso
        );
      }) }, `week-${r}`))
    ] }) : (
      /* Year grid: 4 columns, 1988 → current year + 10 */
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "m3-scroll grid h-[300px] grid-cols-4 content-start gap-1 overflow-y-auto pt-2", children: years.map((y) => {
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
              "m3-state m3-focus md-body-large h-10 cursor-pointer rounded-full outline-none",
              isCurrent ? "bg-m3-primary-container text-m3-on-primary-container" : "text-m3-on-surface"
            ),
            children: y
          },
          y
        );
      }) })
    )
  ] });
}
var DatePickerModal = React34.forwardRef(
  function DatePickerModal2({ value, onChange, minDate, maxDate, open = false, onOpenChange, closeOnSelect = true, className }, ref) {
    const panelRef = React34.useRef(null);
    const restoreFocusRef = React34.useRef(null);
    const [landscape, setLandscape] = React34.useState(false);
    const [picked, setPicked] = React34.useState(void 0);
    React34.useEffect(() => {
      const mq = window.matchMedia("(min-width: 600px)");
      const update = () => setLandscape(mq.matches);
      update();
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }, []);
    React34.useEffect(() => {
      if (!open) return;
      const onKey = (e) => {
        if (e.key === "Escape") _optionalChain([onOpenChange, 'optionalCall', _99 => _99(false)]);
      };
      window.addEventListener("keydown", onKey);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = prevOverflow;
      };
    }, [open, onOpenChange]);
    React34.useEffect(() => {
      if (!open) return;
      restoreFocusRef.current = document.activeElement;
      const timer = window.setTimeout(() => {
        const day = _optionalChain([panelRef, 'access', _100 => _100.current, 'optionalAccess', _101 => _101.querySelector, 'call', _102 => _102(
          'button[data-iso][tabindex="0"]'
        )]);
        if (day) day.focus();
        else _optionalChain([panelRef, 'access', _103 => _103.current, 'optionalAccess', _104 => _104.focus, 'call', _105 => _105()]);
      }, 0);
      return () => {
        window.clearTimeout(timer);
        _optionalChain([restoreFocusRef, 'access', _106 => _106.current, 'optionalAccess', _107 => _107.focus, 'optionalCall', _108 => _108()]);
      };
    }, [open]);
    const handleTab = (e) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = Array.from(
        panelRef.current.querySelectorAll(FOCUSABLE5)
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
      _optionalChain([onChange, 'optionalCall', _109 => _109(d)]);
      if (closeOnSelect) _optionalChain([onOpenChange, 'optionalCall', _110 => _110(false)]);
    };
    const headlineDate = _nullishCoalesce(_nullishCoalesce(value, () => ( picked)), () => ( /* @__PURE__ */ new Date()));
    const headline = formatHeadline(headlineDate);
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _framermotion.AnimatePresence, { children: open && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "fixed inset-0 z-[80] flex items-center justify-center p-4", children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        _framermotion.motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: {
            duration: durations.short4 / 1e3,
            ease: "easeOut"
          },
          className: "absolute inset-0 bg-m3-scrim/32",
          onClick: () => _optionalChain([onOpenChange, 'optionalCall', _111 => _111(false)])
        }
      ),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        _framermotion.motion.div,
        {
          ref: panelRef,
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "Choose date",
          tabIndex: -1,
          onKeyDown: handleTab,
          initial: { scale: 0.9, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.9, opacity: 0 },
          transition: springs.expressive,
          className: cn(
            "m3-elevation-3 relative flex overflow-hidden rounded-[28px] bg-m3-surface-container-high outline-none",
            landscape ? "h-[368px] max-h-[calc(100dvh-32px)] w-[568px] max-w-[calc(100vw-32px)]" : "h-[512px] max-h-[calc(100dvh-32px)] w-[328px] max-w-[calc(100vw-32px)] flex-col",
            className
          ),
          children: landscape ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex w-[168px] shrink-0 flex-col justify-center gap-1 px-4", children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-label-large text-m3-on-surface-variant", children: "Selected date" }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-headline-small leading-tight text-m3-on-surface", children: headline })
            ] }),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "m3-scroll min-w-0 flex-1 overflow-y-auto px-4 py-1", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
              DatePickerCalendar,
              {
                value: _nullishCoalesce(value, () => ( picked)),
                onChange: handleSelect,
                minDate,
                maxDate,
                tone: "primary-container",
                animatedHeader: true
              }
            ) })
          ] }) : /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex shrink-0 flex-col gap-1 px-6 pb-3 pt-6", children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-label-large text-m3-on-surface-variant", children: "Selected date" }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "md-display-small text-m3-on-surface", children: headline })
            ] }),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "h-px w-full shrink-0 bg-m3-outline-variant" }),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "m3-scroll min-h-0 flex-1 overflow-y-auto px-4 pb-2 pt-2", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
              DatePickerCalendar,
              {
                value: _nullishCoalesce(value, () => ( picked)),
                onChange: handleSelect,
                minDate,
                maxDate,
                tone: "primary-container",
                animatedHeader: true
              }
            ) })
          ] })
        }
      )
    ] }) });
  }
);
DatePickerModal.displayName = "DatePickerModal";
var DatePicker = React34.forwardRef(function DatePicker2({
  value,
  onChange,
  minDate,
  maxDate,
  presentation = "inline",
  open,
  onOpenChange,
  closeOnSelect = true,
  fullWidth = false,
  className
}, ref) {
  if (presentation === "modal") {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      DatePickerModal,
      {
        ref,
        open,
        onOpenChange,
        closeOnSelect,
        value,
        onChange,
        minDate,
        maxDate,
        className
      }
    );
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    "div",
    {
      ref,
      className: cn(
        "rounded-[28px] bg-m3-surface-container-high p-6",
        fullWidth ? "w-full" : "w-[328px]",
        className
      ),
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        DatePickerCalendar,
        {
          value,
          onChange,
          minDate,
          maxDate
        }
      )
    }
  );
});

// ../../src/components/m3/TimePicker.tsx



var DIAL_CENTER = 128;
var DIAL_RADIUS = 104;
var HOUR_AUTO_SWITCH_MS = 600;
var OUTER_24H_RADIUS = 101;
var INNER_24H_RADIUS = 69;
var OUTER_RING_HOURS = Array.from({ length: 12 }, (_, i) => i);
var INNER_RING_HOURS = Array.from({ length: 12 }, (_, i) => i + 12);
var DIAL_POSITIONS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
function pad2(n) {
  return String(n).padStart(2, "0");
}
function dialPosition(n, radius = DIAL_RADIUS) {
  const theta = n * 30 * Math.PI / 180;
  return {
    x: DIAL_CENTER + radius * Math.sin(theta),
    y: DIAL_CENTER - radius * Math.cos(theta)
  };
}
var TimePicker = React35.forwardRef(function TimePicker2({ value, onChange, use24h = false, fullWidth = false, className }, ref) {
  const [internal, setInternal] = React35.useState({ hour: 10, minute: 30 });
  const time = _nullishCoalesce(value, () => ( internal));
  const [mode, setMode] = React35.useState("hour");
  const switchTimer = React35.useRef(null);
  const amRef = React35.useRef(null);
  const pmRef = React35.useRef(null);
  React35.useEffect(() => {
    return () => {
      if (switchTimer.current !== null) window.clearTimeout(switchTimer.current);
    };
  }, []);
  const update = (next) => {
    const merged = { ...time, ...next };
    setInternal(merged);
    _optionalChain([onChange, 'optionalCall', _112 => _112(merged)]);
  };
  const isPM = time.hour >= 12;
  const hour12 = time.hour % 12 === 0 ? 12 : time.hour % 12;
  const hourLabel = use24h ? pad2(time.hour) : String(hour12);
  const doubleRing = use24h && mode === "hour";
  const handleRadius = doubleRing && time.hour >= 12 ? INNER_24H_RADIUS : DIAL_RADIUS;
  const tickRadius = doubleRing && time.hour >= 12 ? OUTER_24H_RADIUS : INNER_24H_RADIUS;
  const angle = mode === "hour" ? (use24h ? time.hour % 12 : hour12) * 30 : time.minute * 6;
  const scheduleModeSwitch = () => {
    if (switchTimer.current !== null) window.clearTimeout(switchTimer.current);
    switchTimer.current = window.setTimeout(() => setMode("minute"), HOUR_AUTO_SWITCH_MS);
  };
  const setHour24 = (h) => {
    update({ hour: h });
    scheduleModeSwitch();
  };
  const setHourOnDial = (n) => {
    const base = n % 12;
    update({ hour: isPM ? base + 12 : base });
    scheduleModeSwitch();
  };
  const setMinuteOnDial = (n) => {
    update({ minute: n * 5 % 60 });
  };
  const handleNumberClick = (n) => {
    if (mode === "hour") setHourOnDial(n);
    else setMinuteOnDial(n);
  };
  const handleDialKeyDown = (e) => {
    const dir = e.key === "ArrowUp" || e.key === "ArrowRight" ? 1 : e.key === "ArrowDown" || e.key === "ArrowLeft" ? -1 : 0;
    if (dir === 0) return;
    e.preventDefault();
    if (mode === "hour") {
      if (use24h) {
        update({ hour: (time.hour + dir + 24) % 24 });
        scheduleModeSwitch();
      } else {
        const next = hour12 + dir;
        setHourOnDial(next < 1 ? 12 : next > 12 ? 1 : next);
      }
    } else {
      update({ minute: (time.minute + dir + 60) % 60 });
    }
  };
  const handleMeridiem = (m) => {
    update({ hour: m === "AM" ? time.hour % 12 : time.hour % 12 + 12 });
  };
  const handleMeridiemKeyDown = (e, m) => {
    const toAM = e.key === "ArrowUp" || e.key === "ArrowLeft";
    const toPM = e.key === "ArrowDown" || e.key === "ArrowRight";
    if (!toAM && !toPM) return;
    e.preventDefault();
    const target = toAM ? "AM" : "PM";
    handleMeridiem(target);
    _optionalChain([(toAM ? amRef : pmRef), 'access', _113 => _113.current, 'optionalAccess', _114 => _114.focus, 'call', _115 => _115()]);
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
        "m3-state m3-focus flex h-20 w-24 shrink-0 cursor-pointer items-center justify-center rounded-[8px] outline-none transition-colors",
        mode === target ? "bg-m3-primary-container text-m3-on-primary-container" : "bg-m3-surface-container-highest text-m3-on-surface"
      ),
      children: label
    }
  );
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    "div",
    {
      ref,
      className: cn(
        // Official: container surface-container-high at elevation level 3
        "rounded-[28px] bg-m3-surface-container-high p-6 m3-elevation-3",
        fullWidth ? "w-full" : "w-[328px]",
        className
      ),
      children: [
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "mb-4 flex items-center justify-center gap-3", children: [
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-center justify-center md-display-large tabular-nums", children: [
            readoutSegment(hourLabel, "hour"),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { "aria-hidden": "true", className: "text-m3-on-surface", children: ":" }),
            readoutSegment(pad2(time.minute), "minute")
          ] }),
          !use24h && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
            "div",
            {
              role: "radiogroup",
              "aria-label": "Meridiem",
              className: "flex h-20 w-[52px] shrink-0 flex-col items-stretch rounded-full border border-m3-outline",
              children: ["AM", "PM"].map((m, i) => {
                const isCurrent = m === "AM" === !isPM;
                return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, React35.Fragment, { children: [
                  i === 1 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { "aria-hidden": "true", className: "h-px w-full shrink-0 bg-m3-outline" }),
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                    "button",
                    {
                      type: "button",
                      ref: m === "AM" ? amRef : pmRef,
                      role: "radio",
                      "aria-checked": isCurrent,
                      onClick: () => handleMeridiem(m),
                      onKeyDown: (e) => handleMeridiemKeyDown(e, m),
                      className: cn(
                        "m3-state m3-focus md-title-medium flex min-h-0 flex-1 cursor-pointer items-center justify-center rounded-full outline-none transition-colors",
                        isCurrent ? "bg-m3-tertiary-container text-m3-on-tertiary-container" : "text-m3-on-surface-variant"
                      ),
                      children: m
                    }
                  )
                ] }, m);
              })
            }
          )
        ] }),
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "m3-elevation-1 relative mx-auto h-[256px] w-[256px] select-none rounded-full bg-m3-surface-container-highest", children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
            _framermotion.motion.span,
            {
              className: "absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-m3-primary",
              style: { left: selX - 24, top: selY - 24 },
              initial: { scale: 0 },
              animate: { scale: 1 },
              transition: springs.expressiveEffects
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
              transition: springs.defaultVisual
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
              initial: { scale: 0 },
              animate: { scale: 1 },
              transition: springs.expressiveEffects
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
                  onClick: () => setHour24(h),
                  onKeyDown: handleDialKeyDown,
                  style: { left: x - 20, top: y - 20 },
                  className: "m3-state m3-focus absolute z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full outline-none",
                  children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                    "span",
                    {
                      className: cn(
                        isActive ? "text-m3-on-primary" : "text-m3-on-surface-variant",
                        "md-label-large tabular-nums"
                      ),
                      children: h === 0 ? "00" : String(h)
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
                  onClick: () => setHour24(h),
                  onKeyDown: handleDialKeyDown,
                  style: { left: x - 18, top: y - 18 },
                  className: "m3-state m3-focus absolute z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full outline-none",
                  children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                    "span",
                    {
                      className: cn(
                        isActive ? "text-m3-on-primary" : "text-m3-on-surface",
                        "md-body-large tabular-nums"
                      ),
                      children: String(h)
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
                  onClick: () => handleNumberClick(n),
                  onKeyDown: handleDialKeyDown,
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
        ] })
      ]
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
  description: "A complete Material 3 Expressive (M3E) React component library. Every component is built on official M3 design tokens (color roles, shape scale, Roboto Flex typography, physics-based spring motion, state layers) and ships with structured design-guideline metadata for agentic consumption.",
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









































































































exports.Autocomplete = Autocomplete; exports.Badge = Badge; exports.Banner = Banner; exports.BottomAppBar = BottomAppBar; exports.BottomSheet = BottomSheet; exports.Button = Button; exports.ButtonGroup = ButtonGroup; exports.Card = Card; exports.Checkbox = Checkbox; exports.Chip = Chip; exports.CircularProgress = CircularProgress; exports.DatePicker = DatePicker; exports.Dialog = Dialog; exports.Divider = Divider; exports.ExtendedFab = ExtendedFab; exports.Fab = Fab; exports.FabMenu = FabMenu; exports.IconButton = IconButton; exports.LinearProgress = LinearProgress; exports.List = List; exports.ListItem = ListItem; exports.LoadingIndicator = LoadingIndicator; exports.MaterialSymbol = MaterialSymbol; exports.Menu = Menu; exports.NavigationBar = NavigationBar; exports.NavigationDrawer = NavigationDrawer; exports.NavigationRail = NavigationRail; exports.Radio = Radio; exports.RadioGroup = RadioGroup; exports.Ripple = Ripple; exports.SearchBar = SearchBar; exports.SearchView = SearchView; exports.SegmentedButton = SegmentedButton; exports.SideSheet = SideSheet; exports.Slider = Slider; exports.Snackbar = Snackbar; exports.SplitButton = SplitButton; exports.Switch = Switch; exports.Tabs = Tabs; exports.TextField = TextField; exports.TimePicker = TimePicker; exports.Toolbar = Toolbar; exports.Tooltip = Tooltip; exports.TopAppBar = TopAppBar; exports.autocompleteMeta = autocompleteMeta; exports.badgeMeta = badgeMeta; exports.bannerMeta = bannerMeta; exports.bottomAppBarMeta = bottomAppBarMeta; exports.bottomSheetMeta = bottomSheetMeta; exports.buttonGroupMeta = buttonGroupMeta; exports.buttonMeta = buttonMeta; exports.cardMeta = cardMeta; exports.categoryLabels = categoryLabels; exports.checkboxMeta = checkboxMeta; exports.chipMeta = chipMeta; exports.circularProgressMeta = circularProgressMeta; exports.colorRoles = colorRoles; exports.colorVar = colorVar; exports.datePickerMeta = datePickerMeta; exports.defaultThemeId = defaultThemeId; exports.dialogMeta = dialogMeta; exports.dividerMeta = dividerMeta; exports.durations = durations; exports.easings = easings; exports.elevations = elevations; exports.extendedFabMeta = extendedFabMeta; exports.fabMenuMeta = fabMenuMeta; exports.fabMeta = fabMeta; exports.getComponent = getComponent; exports.getComponentsByCategory = getComponentsByCategory; exports.getTheme = getTheme; exports.iconButtonMeta = iconButtonMeta; exports.linearProgressMeta = linearProgressMeta; exports.listMeta = listMeta; exports.loadingIndicatorMeta = loadingIndicatorMeta; exports.m3Registry = m3Registry; exports.m3Themes = m3Themes; exports.menuMeta = menuMeta; exports.navigationBarMeta = navigationBarMeta; exports.navigationDrawerMeta = navigationDrawerMeta; exports.navigationRailMeta = navigationRailMeta; exports.radioMeta = radioMeta; exports.schemeToCssVars = schemeToCssVars; exports.searchBarMeta = searchBarMeta; exports.searchComponents = searchComponents; exports.searchViewMeta = searchViewMeta; exports.segmentedButtonMeta = segmentedButtonMeta; exports.shapeMorph = shapeMorph; exports.shapes = shapes; exports.sideSheetMeta = sideSheetMeta; exports.sliderMeta = sliderMeta; exports.snackbarMeta = snackbarMeta; exports.splitButtonMeta = splitButtonMeta; exports.springs = springs; exports.stateOpacities = stateOpacities; exports.switchMeta = switchMeta; exports.tabsMeta = tabsMeta; exports.textFieldMeta = textFieldMeta; exports.themeIds = themeIds; exports.timePickerMeta = timePickerMeta; exports.toolbarMeta = toolbarMeta; exports.tooltipMeta = tooltipMeta; exports.topAppBarMeta = topAppBarMeta; exports.typeScale = typeScale;
//# sourceMappingURL=index.cjs.map