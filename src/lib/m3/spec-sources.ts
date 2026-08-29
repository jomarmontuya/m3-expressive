/**
 * Audited Material sources for the 41 registry components.
 *
 * `materialUrl` points to the official live overview page. The pinned sources
 * below supply implementation detail where the overview page is not specific
 * enough. Banner and Autocomplete are library compatibility extensions, so
 * their `materialUrl` is deliberately null.
 */
import type { M3ComponentSpec, M3SpecReferenceId } from "./types";

export const SPEC_AUDITED_AT = "2026-08-28" as const;

export const pinnedSpecReferences = {
  "androidx-compose-material3": {
    label: "AndroidX Compose Material3",
    revision: "38aa2e813c80c10eb2326e211f9091ee7d79e069",
    url: "https://android.googlesource.com/platform/frameworks/support/+/38aa2e813c80c10eb2326e211f9091ee7d79e069/compose/material3/material3/",
  },
  "material-web": {
    label: "Material Web",
    revision: "cac97678831d48d4eb4a606ca50f92673a1dc20c",
    url: "https://github.com/material-components/material-web/tree/cac97678831d48d4eb4a606ca50f92673a1dc20c",
  },
  "flutter-material": {
    label: "Flutter Material",
    revision: "d3b14c876900e553bc736ca19295fc09e3853e8e",
    url: "https://github.com/flutter/flutter/blob/d3b14c876900e553bc736ca19295fc09e3853e8e/packages/flutter/lib/src/material/banner.dart",
  },
  "base-ui-react": {
    label: "Base UI React",
    revision: "254f4744f0a241c20697b9eeab33402f4469a081",
    url: "https://github.com/mui/base-ui/tree/254f4744f0a241c20697b9eeab33402f4469a081/packages/react/src/autocomplete",
  },
} as const satisfies Record<
  M3SpecReferenceId,
  { label: string; revision: string; url: string }
>;

const m3 = (
  materialUrl: string,
  webMapping: string,
  deviations: readonly string[] = [],
): M3ComponentSpec => ({
  status: "material-3",
  materialUrl,
  auditedAt: SPEC_AUDITED_AT,
  references: ["androidx-compose-material3", "material-web"],
  webMapping,
  deviations,
});

const expressive = (
  materialUrl: string,
  webMapping: string,
  deviations: readonly string[] = [],
): M3ComponentSpec => ({
  status: "material-3-expressive",
  materialUrl,
  auditedAt: SPEC_AUDITED_AT,
  references: ["androidx-compose-material3"],
  webMapping,
  deviations,
});

const both = (
  materialUrl: string,
  webMapping: string,
  deviations: readonly string[] = [],
): M3ComponentSpec => ({
  status: "material-3-and-expressive",
  materialUrl,
  auditedAt: SPEC_AUDITED_AT,
  references: ["androidx-compose-material3", "material-web"],
  webMapping,
  deviations,
});

const extension = (
  references: readonly M3SpecReferenceId[],
  webMapping: string,
  deviations: readonly string[] = [],
): M3ComponentSpec => ({
  status: "extension",
  materialUrl: null,
  auditedAt: SPEC_AUDITED_AT,
  references,
  webMapping,
  deviations,
});

const buttons = "https://m3.material.io/components/buttons/overview";
const appBars = "https://m3.material.io/components/app-bars/overview";
const progress = "https://m3.material.io/components/progress-indicators/overview";
const search = "https://m3.material.io/components/search/overview";

export const componentSpecs = {
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
  "time-picker": m3("https://m3.material.io/components/time-pickers/overview", "Uses a browser clock dial with WAI-ARIA radio roving focus.", ["ARIA radio focus is a web accessibility addition to the dial interaction."]),
} as const satisfies Record<string, M3ComponentSpec>;
