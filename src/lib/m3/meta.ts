/**
 * MATERIAL 3 EXPRESSIVE — COMPONENT METADATA (single source of truth)
 *
 * Server-safe module used by the catalog, registry generator, and audits.
 */
import type { M3ComponentMeta } from "./types";
import { componentSpecs } from "./spec-sources";

export { componentSpecs, pinnedSpecReferences, SPEC_AUDITED_AT } from "./spec-sources";

export const buttonGroupMeta: M3ComponentMeta = {
  id: "button-group",
  name: "Button group",
  category: "actions",
  description:
    "New in Material 3 Expressive: standard button groups use size-aware 18/12/8/8/8dp gaps; connected groups use 2dp gaps and size-aware asymmetric corners. Both support five official sizes, selected shape inversion, and pressed-width redistribution.",
  importLine: `import { ButtonGroup } from "@/components/m3/ButtonGroup";`,
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
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables every segment: container drops to on-surface 12%, content to 38%." },
  ],
  guidelines: {
    whenToUse: [
      "Use a button group to cluster closely related actions of equal emphasis.",
      "Use selection='single' for mutually exclusive choices, like a time range.",
      "Use selection='multiple' for toggling independent formatting-style options.",
      "Use the standard layout for the official pressed-width redistribution; connected groups keep stable widths.",
    ],
    anatomy: ["Standard 18/12/8/8/8dp size gap or connected 2dp gap", "Five size-matched button containers (32/40/56/96/136dp)", "Size-aware connected outer/inner shapes", "State layer + ripple per segment", "48dp minimum touch target for small visual sizes"],
    states: ["Unselected (variant colors and resting shape)", "Selected (variant selected color and inverted round/square shape)", "Hover (8% state layer, grows when variableWidths)", "Focus (3px focus ring)", "Pressed (96% scale and size-aware corner morph)", "Disabled (on-surface 12% container / 38% content)"],
    dos: [
      "Keep 2–5 segments in one group so emphasis stays balanced",
      "Give every segment an id; pair icons with labels when space allows",
      "Use the same size and variant as neighboring buttons",
    ],
    donts: [
      "Don't mix actions and navigation in the same group",
      "Don't use a group for a single button — use Button instead",
      "Don't combine single selection with multiple on/off semantics",
    ],
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
  demoName: "ButtonGroupDemo",
};

export const dividerMeta: M3ComponentMeta = {
  id: "divider",
  name: "Divider",
  category: "containment",
  description:
    "A divider is a decorative 1dp line that groups content in lists and layouts. Separator semantics are opt-in when the line represents a meaningful boundary.",
  importLine: `import { Divider } from "@/components/m3/Divider";`,
  spec: componentSpecs.divider,
  variants: ["full-width", "inset-start", "list-inset", "inset-middle", "inset-end", "vertical"],
  props: [
    { name: "inset", type: `'none' | 'start' | 'middle' | 'end' | 'list'`, default: `'none'`, description: "'start' is the generic 16dp start / 0dp end inset. 'list' is the official list preset with 16dp start / 24dp end. 'middle' uses 16dp on both edges; 'end' is a library extension." },
    { name: "thickness", type: `number`, default: `1`, description: "Stroke thickness in px (official 1dp)." },
    { name: "color", type: `'outline' | 'outline-variant'`, default: `'outline-variant'`, description: "Line color role." },
    { name: "orientation", type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: "Direction of the line." },
    { name: "semantic", type: `boolean`, default: `false`, description: "Opt into role=separator and aria-orientation. The default divider is decorative." },
  ],
  guidelines: {
    whenToUse: [
      "Separate related list items and table rows.",
      "Group sections inside cards, sheets, and dialogs.",
      "Use vertical dividers to split side-by-side content regions.",
    ],
    anatomy: ["Decorative divider line by default (1dp, outline-variant)", "Generic start inset (16dp/0dp)", "List preset (16dp start / 24dp end)", "Optional semantic separator role"],
    states: ["Full-width", "Inset (start/middle/end)", "Vertical"],
    dos: [
      "Use inset='list' under list items for the official 16dp/24dp insets",
      "Set semantic only when the line communicates a meaningful content boundary",
      "Keep dividers subtle — outline-variant for decoration",
      "Pair vertical dividers with generous side spacing",
    ],
    donts: [
      "Don't use dividers to replace whitespace everywhere",
      "Don't nest dividers inside dividers or box everything in lines",
      "Don't use the stronger outline color for purely decorative separation",
    ],
  },
  exampleCode: `<Divider />
<Divider inset="start" />
<Divider inset="list" />
<Divider orientation="vertical" semantic />`,
  related: ["card", "list", "navigation-drawer"],
  demoName: "DividerDemo",
};

export const datePickerMeta: M3ComponentMeta = {
  id: "date-picker",
  name: "Date Picker",
  category: "selection",
  description:
    "Date pickers support localized calendar and numeric input modes, single-date or range selection, and a 1900–2100 three-column year grid. The official default is a docked text field with an anchored popup; inline and modal presentations remain available.",
  importLine: `import { DatePicker } from "@/components/m3/DatePicker";`,
  spec: componentSpecs["date-picker"],
  variants: ["docked", "calendar · inline", "input", "year-view", "modal", "range · inline", "range · modal"],
  props: [
    { name: "value", type: `Date`, description: "Selected date. Uncontrolled when omitted." },
    { name: "defaultValue", type: `Date`, description: "Initial single date for uncontrolled use; shared across popup reopen and calendar/input modes." },
    { name: "onChange", type: `(d: Date) => void`, description: "Fires when a day is picked (single mode)." },
    { name: "locale", type: `string`, description: "Locale used for date order, labels, and first day of the week." },
    { name: "selectionMode", type: `'single' | 'range'`, default: `'single'`, description: "Pick one date, or a start/end range: tap start, then end (tap ≥ start completes); tapping before the start or once complete restarts with a fresh start." },
    { name: "initialDisplayMode", type: `'calendar' | 'input'`, default: `'calendar'`, description: "Initial single-date entry mode. Input mode accepts a localized numeric date." },
    { name: "showModeToggle", type: `boolean`, default: `true`, description: "Single-date mode only — show the calendar/input toggle." },
    { name: "range", type: `{ start?: Date; end?: Date }`, description: "Range mode — controlled selected range; omit for uncontrolled state. Partial ranges (start only) are valid states." },
    { name: "onRangeChange", type: `(range: { start?: Date; end?: Date }) => void`, description: "Range mode — fires on every tap with the next range (partial ranges included)." },
    { name: "minDate", type: `Date`, description: "Earliest selectable date; earlier days render disabled (38%)." },
    { name: "maxDate", type: `Date`, description: "Latest selectable date; later days render disabled (38%)." },
    { name: "presentation", type: `'docked' | 'inline' | 'modal'`, default: `'docked'`, description: "Official text-field popup, embedded compatibility panel, or 360×568dp modal." },
    { name: "open", type: `boolean`, description: "Controls modal visibility and optionally controls the docked popup. Inline ignores it." },
    { name: "onOpenChange", type: `(open: boolean) => void`, description: "Called when the modal or docked popup requests a visibility change." },
    { name: "closeOnSelect", type: `boolean`, default: `false`, description: "Compatibility live-apply mode. The official default stages selection until confirmation." },
    { name: "confirmLabel", type: `string`, default: `'OK'`, description: "Modal confirmation action label." },
    { name: "dismissLabel", type: `string`, default: `'Cancel'`, description: "Modal dismissal action label." },
    { name: "onConfirm", type: `(selection: Date | DateRange) => void`, description: "Called after the staged modal selection is confirmed." },
    { name: "onDismiss", type: `() => void`, description: "Called when the modal is dismissed." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." },
    { name: "className", type: `string`, description: "Extra classes for the container." },
  ],
  guidelines: {
    whenToUse: [
      "Use the default docked field and popup for space-efficient date selection; use inline only when date choice is the primary in-page task.",
      "Use minDate/maxDate to constrain scheduling to valid ranges.",
      "Pair with a readout chip to show the formatted selected date.",
      "Use presentation=\"modal\" for the official 360×568dp picker dialog with staged confirm and dismiss actions.",
      "Give the modal a text-field-style trigger that echoes the chosen date, and let Escape/scrim dismiss it.",
      "Use selectionMode='range' for check-in/check-out and event spans — the band reads as one stripe per week row between the start/end circles.",
    ],
    anatomy: ["Outlined docked text field and anchored popup", "Container (28dp corners, surface-container-high)", "Header (month-year label, mode toggle, 48dp previous/next targets)", "Localized weekday row + 6×7 ARIA day grid with roving tabindex", "1900–2100 year grid (3 columns)", "Localized separator-safe input fields", "Modal (360×568dp, 28dp corners, elevation 3, confirm and dismiss actions)", "Secondary-container range band with primary start/end circles"],
    states: ["Docked closed/open", "Idle day", "Hover", "Today", "Selected", "Other month", "Disabled", "Calendar or localized input mode", "Keyboard arrows, Home/End, PageUp/PageDown, and Shift+PageUp/PageDown", "Modal open", "Modal staged selection", "Range"],
    dos: [
      "Show the selected date in context next to the picker",
      "Clamp with min/max when dates have real-world constraints",
      "Keep the selected-day pill circular and high-contrast (primary/on-primary)",
      "Show start/end placeholders until both dates are picked — the modal header and readouts echo the partial range",
    ],
    donts: [
      "Don't force users to scroll years one month at a time — use the year grid",
      "Don't hide disabled days entirely; dim them to 38%",
      "Don't confirm a range until both start and end are valid",
      "Don't apply staged modal edits before the user confirms them",
    ],
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

// Official modal picker (360×568, staged selection)
const [open, setOpen] = React.useState(false);
// ...an outlined text-field-style trigger calls setOpen(true)
<DatePicker
  presentation="modal"
  open={open}
  onOpenChange={setOpen}
  value={date}
  onChange={setDate}
/>

// Range selection (selectionMode="range") — tap start, then end
const [range, setRange] = React.useState<{ start?: Date; end?: Date }>({});
<DatePicker selectionMode="range" range={range} onRangeChange={setRange} />

// Start in official keyboard input mode
<DatePicker initialDisplayMode="input" value={date} onChange={setDate} />

// Range modal — header shows Start/End date placeholders until the pair is
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
  demoName: "DatePickerDemo",
};

export const sideSheetMeta: M3ComponentMeta = {
  id: "side-sheet",
  name: "Side Sheet",
  category: "containment",
  description:
    "Side sheets are dialog surfaces anchored to a logical inline edge and automatically mirror in RTL. Modal variants overlay a 32% scrim; standard variants sit inline. The official 16dp radius rounds the inner edge only.",
  importLine: `import { SideSheet } from "@/components/m3/SideSheet";`,
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
    { name: "className", type: `string`, description: "Extra classes for the panel." },
  ],
  guidelines: {
    whenToUse: [
      "Use side sheets for supplemental tasks (filters, details, settings) alongside main content.",
      "Use the modal variant on small screens where the sheet must take focus.",
      "Use the standard variant in split-view layouts where the sheet occupies layout space while open.",
    ],
    anatomy: ["Dialog panel (modal or standard; 16dp inner-edge corners; 24dp padding; width capped at 400dp and compact viewport width)", "Title and always-visible 48dp close control", "Scrollable content", "Optional start-aligned 72dp-minimum action area"],
    states: ["Hidden when open=false", "Enter (modal spring x ±100% → 0)", "Open (32% scrim + body scroll locked for modal; standard stays in layout)", "Closed (visible close control; modal also supports scrim tap / Escape)"],
    dos: [
      "Keep panel width between 240–400px (official max-width is 400dp)",
      "Pair the modal variant with a scrim tap to dismiss",
      "Reserve footers for confirm/cancel actions",
    ],
    donts: [
      "Don't use side sheets for primary navigation (use a navigation drawer)",
      "Don't open modal side sheets on top of dialogs",
      "Don't let panel content scroll the page behind it",
    ],
  },
  exampleCode: `<SideSheet open={open} onClose={() => setOpen(false)} side="end" title="Filters">
  <List>{filterItems}</List>
</SideSheet>
<SideSheet variant="standard" open={detailsOpen} onClose={() => setDetailsOpen(false)} title="Details">
  {inlineContent}
</SideSheet>`,
  related: ["bottom-sheet", "card", "list"],
  demoName: "SideSheetDemo",
};

export const carouselMeta: M3ComponentMeta = {
  id: "carousel",
  name: "Carousel",
  category: "containment",
  description:
    "Material 3 Expressive carousels support multi-browse, standard or multi-aspect uncontained, hero, and vertical portrait full-screen layouts. Items use parallax, snap scrolling, keyboard movement, and reduced-motion fallbacks.",
  importLine: `import { Carousel } from "@/components/m3/Carousel";`,
  spec: componentSpecs.carousel,
  variants: ["multi-browse", "uncontained", "hero", "full-screen"],
  props: [
    { name: "items", type: `CarouselItem[]`, description: "Snap items: id, optional label, icon, tone, href/onClick, and an optional aspectRatio for uncontained mixed-ratio content." },
    { name: "layout", type: `CarouselLayout`, default: `'multi-browse'`, description: "Four official strategies. inline remains a deprecated alias for full-screen." },
    { name: "alignment", type: `'start' | 'center' | 'end'`, default: `'start'`, description: "Scroll-snap alignment of items." },
    { name: "itemCount", type: `number`, default: `4`, description: "Visible-item hint. Multi-browse keeps the official large + medium + small minimum composition, so it clamps to 3–5." },
    { name: "shape", type: `'round' | 'square'`, default: `'round'`, description: "Item corners: 28dp (M3E extra-large) or square." },
    { name: "arrows", type: `'auto' | 'always' | 'never'`, default: `'never'`, description: "Compatibility-only navigation arrows. Current Material guidance defaults to no in-carousel arrows." },
    { name: "uncontainedMode", type: `'standard' | 'multi-aspect'`, default: `'standard'`, description: "Equal-size standard items, or mixed item aspect ratios constrained by current Material guidance." },
    { name: "itemAspectRatio", type: `number`, default: `16 / 9`, description: "Shared width ratio for the standard uncontained configuration." },
    { name: "showAllHref", type: `string`, description: "Required all-items path for non-full-screen carousels on vertically scrolling pages." },
    { name: "onShowAll", type: `() => void`, description: "Button alternative to showAllHref that opens the complete vertical item list." },
    { name: "showAllLabel", type: `string`, default: `'Show all'`, description: "Accessible all-items action label." },
    { name: "ariaLabel", type: `string`, description: "Accessible name of the carousel region (defaults to a derived label)." },
    { name: "className", type: `string`, description: "Extra classes for the scroller." },
  ],
  guidelines: {
    whenToUse: [
      "Use carousels to browse a small, visually rich collection of similar content (media cards, destination tiles).",
      "Use multi-browse when items share equal importance and flexible widths should show several at once.",
      "Use hero when one featured item deserves emphasis and the rest are secondary.",
      "Use uncontained for fixed-width items and full-screen for one edge-to-edge item per view.",
    ],
    anatomy: ["Focusable scroller with snap and parallax", "Multi-browse large, medium, and small keyline items", "Hero focal item with 40–56dp supporting items", "Vertical portrait full-screen items with edge snap", "Standard equal-size or multi-aspect uncontained items", "Roving focus with ArrowUp/ArrowDown exit", "Show all path below non-full-screen carousels"],
    states: ["Rest", "Scroll-position focal sizing", "Hover state layer", "Visible focus ring", "Pressed ripple", "Snapped", "Reduced motion (stable equal widths and immediate scrolling)"],
    dos: [
      "Use multi-browse for mixed or equal-importance content, hero for featured content, and full-screen for edge-to-edge imagery",
      "Keep 1–5 items visible (official multi-browse range)",
      "Give every item a label (or accessible name) so the carousel is describable",
      "Use item aspectRatio only with uncontainedMode='multi-aspect'",
      "Provide showAllHref or onShowAll on vertically scrolling pages, except for full-screen feeds",
    ],
    donts: [
      "Don't nest carousels inside carousels",
      "Don't put primary actions inside carousel items (items are browse/navigation, not task buttons)",
      "Don't resize items from pointer hover; expressive sizing follows scroll position",
      "Don't add in-carousel arrows unless compatibility needs require them",
    ],
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
  demoName: "CarouselDemo",
};

export const dialogMeta: M3ComponentMeta = {
  id: "dialog",
  name: "Dialog",
  category: "containment",
  description:
    "Dialogs inform users about a task and can contain critical information or require decisions — a modal surface over a 32% scrim that blocks interaction until resolved. Focus is trapped inside while open and returns to the trigger on close.",
  importLine: `import { Dialog } from "@/components/m3/Dialog";`,
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
    { name: "ariaLabel", type: `string`, description: "Accessible name used when the dialog has no visible headline." },
  ],
  guidelines: {
    whenToUse: [
      "Require an explicit decision (confirm destructive actions like delete or reset).",
      "Present critical information that interrupts the current flow.",
      "Use fullscreen for immersive creation or editing tasks.",
    ],
    anatomy: ["Scrim (32% over page)", "Alert dialog surface (surface-container-high, 28dp corners, elevation 3, 280–560dp wide)", "Optional icon and required accessible name", "Bounded scrolling body", "Pinned title and action regions", "Full-screen 56dp header with required close control", "Full-screen 56dp bottom action bar"],
    states: ["Entering (scale 0.9 → 1 with expressive spring)", "Open (32% scrim, body scroll locked, focus trapped)", "Dismiss (Escape / scrim tap when dismissible; focus returns to the trigger)", "Exiting"],
    dos: [
      "Keep dialogs focused on one decision",
      "Order actions: dismissive (text) left, confirmatory (filled) right",
      "Use non-dismissible mode only when a choice is truly required",
      "Give the dialog a headline so aria-labelledby announces it",
    ],
    donts: [
      "Don't open dialogs from dialogs",
      "Don't hide the title or actions when the bounded body scrolls",
      "Don't block the app with confirmation dialogs for trivial actions",
    ],
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
  demoName: "DialogDemo",
};

export const snackbarMeta: M3ComponentMeta = {
  id: "snackbar",
  name: "Snackbar",
  category: "communication",
  description:
    "Snackbars inform users of a process that an app has performed or will perform, appearing briefly at the bottom of the screen on an inverse surface.",
  importLine: `import { Snackbar } from "@/components/m3/Snackbar";`,
  spec: componentSpecs.snackbar,
  variants: ["with-action", "with-icon", "sticky"],
  props: [
    { name: "open", type: `boolean`, description: "Controls visibility." },
    { name: "message", type: `string`, description: "The brief confirmation text." },
    { name: "icon", type: `string`, description: "Leading Material Symbol name (extension — the base M3 anatomy is text + action + close only)." },
    { name: "actionLabel", type: `string`, description: "Trailing text action label, e.g. \"Undo\"." },
    { name: "onAction", type: `() => void`, description: "Action press handler." },
    { name: "actionOnNewLine", type: `boolean`, default: `false`, description: "Moves the action below the message for compact widths or long labels." },
    { name: "onClose", type: `() => void`, description: "Dismiss handler (auto-dismiss + close icon)." },
    { name: "duration", type: `number`, default: `4000`, description: "Auto-dismiss in ms for messages without an action. Actionable snackbars stay until acted on or dismissed; 0 is sticky." },
  ],
  guidelines: {
    whenToUse: [
      "Confirm completed background actions (\"Photo archived\") with an optional undo.",
      "Surface transient, low-priority status that doesn't require a response.",
      "Pair with a text action to let users reverse the change.",
    ],
    anatomy: ["Responsive inverse-surface container (4dp corners, elevation 3, viewport-safe width, 600dp maximum)", "Optional leading icon (extension)", "Message", "Inline or new-line text action", "Close control"],
    states: ["Entering", "Visible (timed when no action)", "Actionable (persistent until action or dismissal)", "Singleton replacement (a new snackbar replaces the visible one)", "Exiting"],
    dos: [
      "Keep messages to one or two short sentences",
      "Offer at most one text action — usually \"Undo\"",
      "Let snackbars dismiss on their own; don't stack them",
      "Provide equivalent inline feedback or a persistent action when a timed message contains important information",
    ],
    donts: [
      "Don't use snackbars for critical errors that require action — use a dialog",
      "Don't put focus-requiring controls or forms inside a snackbar",
      "Don't block the UI or require dismissal to continue",
    ],
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
  demoName: "SnackbarDemo",
};

export const navigationDrawerMeta: M3ComponentMeta = {
  id: "navigation-drawer",
  name: "Navigation drawer",
  category: "navigation",
  description:
    "Baseline Material 3 navigation drawers provide ergonomic access to destinations. Modal uses surface-container-low at elevation 1 over a scrim; standard docks as a square surface at elevation 0. Active items carry a spring-animated tonal pill.",
  importLine: `import { NavigationDrawer } from "@/components/m3/NavigationDrawer";`,
  spec: componentSpecs["navigation-drawer"],
  variants: ["modal", "standard"],
  props: [
    { name: "items", type: `NavItem[]`, description: "Destinations: value, label, optional icon, optional trailing badge." },
    { name: "value", type: `string`, description: "Controlled selected destination value." },
    { name: "onChange", type: `(v: string) => void`, description: "Called with the newly selected value." },
    { name: "variant", type: `'modal' | 'standard'`, default: `'modal'`, description: "Baseline modal uses surface-container-low, elevation 1, and a 32% scrim; baseline standard uses square surface at elevation 0. Official width adapts from 240–360dp." },
    { name: "open", type: `boolean`, description: "Controls the modal drawer. Omit for uncontrolled (starts closed)." },
    { name: "onClose", type: `() => void`, description: "Fired on scrim click or Escape." },
    { name: "header", type: `ReactNode`, description: "Headline area above the destination list; use title-small typography." },
    { name: "footer", type: `ReactNode`, description: "Content pinned to the bottom of the drawer." },
    { name: "fullHeight", type: `boolean`, default: `false`, description: "Stretch the standard drawer to container height." },
  ],
  guidelines: {
    whenToUse: [
      "Use a modal drawer for compact screens or transient navigation over content.",
      "Use a standard drawer on medium/large screens where navigation is always reachable.",
      "Group 5–10 destinations; overflow into a 'More' item rather than scrolling.",
    ],
    anatomy: ["Responsive 240–360dp container (modal = surface-container-low, elevation 1, 16dp trailing corners; standard = square surface, elevation 0)", "Scrim (modal only, 32%)", "Destination rows (56dp full-width pill, 24dp icon + label + optional label-large badge)", "Optional header (title-small headline) and footer slots"],
    states: ["Active (secondary-container pill, on-secondary-container label)", "Inactive (on-surface-variant icon + label)", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (ripple)", "Modal open (focus trapped, Escape/scrim/select closes, focus returned on close)"],
    dos: [
      "Show the user's current location with the active pill",
      "Use icons consistently across destinations",
      "Close the modal drawer after choosing a destination on small screens",
    ],
    donts: [
      "Don't put destructive or edit actions in a navigation drawer",
      "Don't nest more than one level of hierarchy",
      "Don't block the modal drawer's scrim interactions with custom handlers",
    ],
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
  demoName: "NavigationDrawerDemo",
};

export const listMeta: M3ComponentMeta = {
  id: "list",
  name: "List",
  category: "containment",
  description:
    "Lists are vertical indexes of one-, two-, or three-line items. Current M3E supports standard continuous rows and segmented groups with 2dp gaps, shaped outer/inner corners, selection shapes, and interaction morphs.",
  importLine: `import { List, ListItem } from "@/components/m3/List";`,
  spec: componentSpecs.list,
  variants: ["standard", "segmented", "single-line", "two-line", "three-line"],
  props: [
    { name: "variant", type: `'standard' | 'segmented'`, default: `'standard'`, description: "Continuous list or current expressive segmented treatment." },
    { name: "dividers", type: `boolean`, default: `false`, description: "Full-width outline-variant dividers between rows; use <Divider inset=\"list\" /> for the official 16dp start / 24dp end list preset." },
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
    { name: "onClick", type: `(e: MouseEvent<HTMLButtonElement>) => void`, description: "Makes the row interactive (button, ripple, state layer)." },
  ],
  guidelines: {
    whenToUse: [
      "Use lists for homogeneous, scrollable collections of items (contacts, settings, files).",
      "Use list items with supporting text when each row needs context.",
      "Use a leading icon or avatar when items are identifiable at a glance.",
    ],
    anatomy: ["Standard continuous or segmented 2dp-gap group", "Row container (56/72/88dp; 16dp inline padding)", "Segmented unselected 4dp rest shape and selected 16dp shape", "20dp leading and trailing icons, text, and trailing slots", "Non-color selected indicator"],
    states: ["Enabled", "Hover", "Visible focus", "Pressed", "Selected (secondary container plus non-color cue)", "Disabled", "Roving Arrow/Home/End keyboard focus in selection modes"],
    dos: [
      "Keep list items visually identical in structure for scannability",
      "Use dividers only when rows are dense or multi-line",
      "Truncate long headline/supporting text to a single line",
    ],
    donts: [
      "Don't mix cards and list rows for the same type of content",
      "Don't put primary actions in list rows — use trailing icons for secondary actions",
      "Don't wrap list items in nested interactive elements",
    ],
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
  demoName: "ListDemo",
};

export const cardMeta: M3ComponentMeta = {
  id: "card",
  name: "Card",
  category: "containment",
  description:
    "Cards contain content and actions about a single subject, elevated with a shadow, a filled container, or an outline. M3 Expressive cards morph their shape and scale on press with a springy bounce.",
  importLine: `import { Card } from "@/components/m3/Card";`,
  spec: componentSpecs.card,
  variants: ["elevated", "filled", "outlined"],
  props: [
    { name: "variant", type: `'elevated' | 'filled' | 'outlined'`, default: `'elevated'`, description: "Visual treatment: shadowed, tonal, or stroked." },
    { name: "shape", type: `'medium' | 'extraLarge'`, default: `'medium'`, description: "Corner shape: official 12dp medium, or M3E extra-large 28dp for hero cards." },
    { name: "interactive", type: `boolean`, description: "Press shape morph, hover elevation, state layer, ripple and Enter/Space keyboard activation. Defaults to true when onClick is set." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Blocks activation, removes focusability, keeps role=button with aria-disabled for action cards, and applies variant-specific disabled tokens." },
    { name: "onClick", type: `(e: MouseEvent<HTMLDivElement>) => void`, description: "Click handler; makes the card focusable with role button." },
    { name: "className", type: `string`, description: "Extra classes for the card container (width, padding)." },
    { name: "children", type: `React.ReactNode`, description: "Card content." },
  ],
  guidelines: {
    whenToUse: [
      "Use cards to group related content and actions about a single subject.",
      "Use elevated cards on patterned or busy backgrounds to create separation.",
      "Use filled cards when a tonal container fits the surrounding color scheme.",
      "Use outlined cards for lightweight, medium-emphasis grouping with many cards on screen.",
    ],
    anatomy: ["Container (12dp medium corners; M3E allows 28dp extra-large for hero cards; 16dp left/right padding; outlined = surface + 1dp outline-variant stroke)", "State layer + ripple (interactive cards)", "Optional supporting visual, headline, supporting text", "Optional actions row"],
    states: ["Rest (elevation 1 for elevated)", "Hover (elevated rises to level 2; filled rises to level 1; 8% state layer)", "Focus (3px focus ring)", "Pressed (10% state layer, selected shape morph + 97% scale)", "Disabled (variant-specific container/outline tokens, 38% content, role=button + aria-disabled when action-backed)"],
    dos: [
      "Keep card padding generous (16–24px) and content scannable",
      "Use one interactive region per card; nest buttons carefully or make the whole card tappable",
      "Pick one emphasis level (elevated/filled/outlined) per screen region",
    ],
    donts: [
      "Don't overload a card with multiple unrelated subjects",
      "Don't nest cards inside cards",
      "Don't use elevation and outline together on the same card",
    ],
  },
  exampleCode: `<Card variant="elevated" className="w-64 p-6">
  <span className="md-title-medium">Elevated card</span>
  <p className="md-body-medium text-m3-on-surface-variant">Supporting text</p>
</Card>
<Card variant="outlined" interactive onClick={() => {}} className="w-64 p-6">
  <span className="md-title-medium">Tappable card</span>
</Card>`,
  related: ["list", "bottom-sheet", "side-sheet"],
  demoName: "CardDemo",
};

export const segmentedButtonMeta: M3ComponentMeta = {
  id: "segmented-button",
  name: "Segmented button",
  category: "actions",
  description:
    "Not recommended for new work: use ButtonGroup instead. This compatibility component keeps the baseline 40dp segmented control, while its 56dp medium size is a library extension. Each segment expands its touch target to ≥48dp vertically via an invisible ::before hit area.",
  importLine: `import { SegmentedButton } from "@/components/m3/SegmentedButton";`,
  spec: componentSpecs["segmented-button"],
  variants: ["single · not recommended", "multiple · not recommended", "56dp medium · library extension"],
  props: [
    { name: "options", type: `{ value: string; label?: string; icon?: string }[]`, description: "Segments, keyed by value." },
    { name: "type", type: `'single' | 'multiple'`, default: `'single'`, description: "Single emits a string; multiple emits a string array." },
    { name: "value", type: `string | string[]`, description: "Controlled value — string for single, string[] for multiple." },
    { name: "onValueChange", type: `(value: string | string[]) => void`, description: "Called with the next value; deselecting in single mode emits ''." },
    { name: "size", type: `'sm' | 'md'`, default: `'sm'`, description: "40dp is the baseline size. The 56dp md size is a library extension, not an official M3 size." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables every segment: outline drops to 12%, content to on-surface 38%." },
  ],
  guidelines: {
    whenToUse: [
      "Do not start new work with SegmentedButton; use ButtonGroup for current M3 Expressive controls.",
      "Keep this component only when an existing screen must preserve its connected segmented-control contract.",
      "Use the 56dp md size only when the library extension is an explicit product decision.",
    ],
    anatomy: ["Connected pill outline (border-m3-outline)", "Equal-width segments (40/56px tall)", "1px dividers between segments", "Secondary-container selected fill", "Leading check icon on selection"],
    states: ["Unselected (on-surface label)", "Selected (secondary-container + check)", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (97% scale spring)", "Touch target (≥48dp vertically via ::before hit-expander; no horizontal expansion, so adjacent segments never overlap)", "Disabled (outline 12%, content on-surface 38%, selected fill on-surface 12%)"],
    dos: [
      "Keep segments to 2–5, with equal-width content",
      "Use short labels, optionally paired with an icon",
      "Pre-select the most likely option so the control has a defined state",
    ],
    donts: [
      "Don't use segmented buttons to trigger actions — they represent selection state",
      "Don't use for mutually exclusive choices when a switch or checkbox fits better",
      "Don't make text wrap; keep labels short enough to fit one line",
    ],
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
  demoName: "SegmentedButtonDemo",
};

export const sliderMeta: M3ComponentMeta = {
  id: "slider",
  name: "Slider",
  category: "selection",
  description:
    "Current Material 3 Expressive sliders support standard, centered, and range values in horizontal or vertical layouts. Five official size configurations scale the track and handle, with optional inset icons, stops, value labels, and native form association.",
  importLine: `import { Slider } from "@/components/m3/Slider";`,
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
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." },
  ],
  guidelines: {
    whenToUse: [
      "Use for settings where an approximate value is fine (volume, brightness).",
      "Use stops when users should sense the exact steps.",
      "Pair with a numeric readout when precision matters.",
    ],
    anatomy: ["Rounded segmented track (primary active / secondary-container inactive)", "Tall thin handle with a minimum 48dp interaction target", "Optional 4dp stop indicators (on-primary over active, on-secondary-container over inactive)", "Optional inset track icons and value label", "Range configuration with two independently keyboard-operable handles and optional distinct form names"],
    states: ["Enabled", "Hover (handle widens, bubble appears)", "Drag (pointer captured)", "Focused (3px ring; arrows ±step, PageUp/PageDown ±10 steps, Home/End)", "Disabled (38% opacity)"],
    dos: [
      "Keep ranges small enough to scan; factor big ranges into steps",
      "Show the value label while dragging for feedback",
      "Support keyboard arrows and Home/End for accessibility",
    ],
    donts: [
      "Don't use a slider for a small set of options — use chips or radios",
      "Don't require pixel-precise dragging; snapping to a step helps",
      "Don't trigger expensive side effects on every tick; debounce instead",
    ],
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
  m3e: true,
};

export const textFieldMeta: M3ComponentMeta = {
  id: "text-field",
  name: "TextField",
  category: "textinput",
  description:
    "Text fields accept single-line or multiline text in filled or outlined containers, with floating labels, optional prefix/suffix content, icons, supporting text, validation, and native form attributes.",
  importLine: `import { TextField } from "@/components/m3/TextField";`,
  spec: componentSpecs["text-field"],
  variants: ["outlined", "filled"],
  props: [
    { name: "variant", type: `'outlined' | 'filled'`, default: `'outlined'`, description: "Container style: outlined stroke or filled surface with a bottom indicator." },
    { name: "size", type: `'xs' | 'sm' | 'md' | 'lg'`, default: `'md'`, description: "Expressive height scale: xs=32, sm=40, md=56, lg=72." },
    { name: "label", type: `string`, description: "Floating label; docks into the border gap when focused or filled." },
    { name: "value", type: `string | number | readonly string[]`, description: "Controlled input value." },
    { name: "onChange", type: `(e: ChangeEvent<HTMLInputElement>) => void`, description: "Change handler for the native input." },
    { name: "type", type: `string`, default: `'text'`, description: "Native input type (email, password, number…)." },
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
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." },
  ],
  guidelines: {
    whenToUse: [
      "Use to capture short, single-line input such as names, emails, or codes.",
      "Prefer outlined on open layouts and filled inside dense, contained UI like dialogs.",
      "Use helperText for hints and error only for validation failures.",
    ],
    anatomy: ["Outlined stroke or filled surface with indicator", "Floating label", "Single-line input or multiline text area", "Optional icons with the official 16dp icon-to-text gap", "Optional prefix/suffix linked through aria-describedby", "Supporting text; error messages use role=alert"],
    states: ["Enabled", "Hover (outline shifts to on-surface / filled indicator darkens)", "Focused (2px primary stroke / primary indicator, label floats)", "Error (error color + error icon)", "Disabled (38% content, 12% outline border or 4% filled container)"],
    dos: [
      "Always provide a label — placeholders alone disappear while typing",
      "Use the matching type/inputMode so users get the right keyboard",
      "Keep helper text to a single short line",
    ],
    donts: [
      "Don't use a text field to trigger actions — use a button",
      "Don't show an error before the user has interacted with the field",
      "Don't place two fields' helper texts so they can be confused",
    ],
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
  demoName: "TextFieldDemo",
};

export const autocompleteMeta: M3ComponentMeta = {
  id: "autocomplete",
  name: "Autocomplete",
  category: "textinput",
  description:
    "Library extension: Material 3 does not publish a standalone Autocomplete component. This composite combines the official outlined text-field treatment with accessible combobox/listbox behavior for filterable suggestions.",
  importLine: `import { Autocomplete } from "@/components/m3/Autocomplete";`,
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
    { name: "name / form / required", type: `native input props`, description: "Native form association and validation forwarded to the combobox input." },
  ],
  guidelines: {
    whenToUse: [
      "Use when users must pick from a long list of known values (countries, tags, accounts).",
      "Use instead of a select when users may want to type to filter.",
      "Keep the option set under ~100 items for instant filtering.",
    ],
    anatomy: ["Outlined text field (4dp corners)", "48dp trailing drop-down target", "Dropdown menu (surface-container, elevation-2, 4dp corners)", "Option rows with selected check (keyboard highlight scrolls into view)"],
    states: ["Enabled", "Focused or open (primary stroke from the real Base UI state)", "Highlighted option (8% state layer)", "Selected option (check icon)", "Disabled (38% opacity)"],
    dos: [
      "Match options case-insensitively while filtering",
      "Support keyboard navigation: arrows, Enter, Escape",
      "Show a check on the currently selected option",
    ],
    donts: [
      "Don't force a selection if free text is valid — use a TextField instead",
      "Don't truncate option labels without a tooltip or wrap",
      "Don't open the menu when the field is disabled",
    ],
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
  m3e: false,
};

export const navigationRailMeta: M3ComponentMeta = {
  id: "navigation-rail",
  name: "Navigation rail",
  category: "navigation",
  description:
    "Navigation rails provide primary navigation on medium and expanded screens. The current 96dp wide rail expands into a standard in-layout 220–360dp rail by default; an explicit modal mode adds a 32% scrim and a focus trap. The 80dp narrow baseline remains available.",
  importLine: `import { NavigationRail } from "@/components/m3/NavigationRail";`,
  spec: componentSpecs["navigation-rail"],
  variants: ["wide collapsed", "standard expanded · default", "modal expanded · focus trapped", "narrow", "with header", "folding-line"],
  props: [
    { name: "items", type: `NavItem[]`, description: "Destinations (3–7): value, label, optional icon, optional badge." },
    { name: "value", type: `string`, description: "Controlled selected destination value." },
    { name: "onChange", type: `(v: string) => void`, description: "Called with the newly selected value." },
    { name: "header", type: `ReactNode`, description: "Slot above the items — typically a FAB." },
    { name: "menuIcon", type: `string`, default: `'menu'`, description: "Material Symbol for the optional leading menu icon (official rail anatomy item)." },
    { name: "onMenuClick", type: `() => void`, description: "Renders the leading menu icon and handles its press (e.g. expand into a drawer)." },
    { name: "variant", type: `'wide' | 'narrow'`, default: `'wide'`, description: "Current M3E 96dp/expanded rail, or the 80dp baseline rail." },
    { name: "expanded", type: `boolean`, default: `false`, description: "Open the wide rail's horizontal-item layout." },
    { name: "expandedMode", type: `'standard' | 'modal'`, default: `'standard'`, description: "Standard expands in layout. Modal overlays content with a 32% scrim, traps focus, closes on Escape/outside press, and restores focus." },
    { name: "expandedWidth", type: `number`, default: `360`, description: "Expanded width, clamped to the official 220–360dp range." },
    { name: "foldingLine", type: `boolean`, default: `false`, description: "Draws a hinge divider along the leading edge for foldables." },
  ],
  guidelines: {
    whenToUse: [
      "Use on medium screens (600–840dp window widths) where a drawer is too heavy.",
      "Use a navigation bar on compact screens and a drawer on expanded screens.",
      "Put a FAB in the header slot when the screen's primary action is available everywhere.",
    ],
    anatomy: ["Wide rail (96dp collapsed; 220–360dp expanded) or narrow rail (80dp)", "Optional leading menu icon", "Optional header slot (FAB)", "Collapsed destination (24dp icon in a 56×32dp capsule + label-medium)", "Expanded destination (56dp full-width horizontal pill + label-large)"],
    states: ["Active (secondary-container capsule, filled icon)", "Inactive (on-surface-variant)", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (ripple)", "Expanded standard (in layout)", "Expanded modal (scrim, focus trap, Escape/outside dismissal, focus restoration)"],
    dos: [
      "Only show labels when they add meaning — capsules alone work for familiar destinations",
      "Keep 3–7 destinations in the rail",
      "Align the rail with the app's content margin",
    ],
    donts: [
      "Don't use a rail as a toolbar for actions",
      "Don't mix rail destinations with drawer destinations inconsistently",
      "Don't add more than one rail per screen",
    ],
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
  demoName: "NavigationRailDemo",
};

export const chipMeta: M3ComponentMeta = {
  id: "chip",
  name: "Chip",
  category: "selection",
  description:
    "Chips are compact elements that represent an input, attribute, or action — assist, filter, input, and suggestion variants.",
  importLine: `import { Chip, ChipGroup } from "@/components/m3/Chip";`,
  spec: componentSpecs.chip,
  variants: ["assist", "filter", "input", "suggestion"],
  props: [
    { name: "variant", type: `'assist' | 'filter' | 'input' | 'suggestion'`, default: `'assist'`, description: "Chip semantics and affordances." },
    { name: "selected", type: `boolean`, default: `false`, description: "Filter chips only — controlled selected state with a leading check." },
    { name: "onSelect", type: `(selected: boolean) => void`, description: "Filter chips only — called with the next selected state." },
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
    { name: "ChipGroup label", type: `string`, default: `'Chips'`, description: "Accessible collection name. Arrow keys move focus; Home/End jump; Delete/Backspace remove focused input chips." },
  ],
  guidelines: {
    whenToUse: [
      "Use filter chips to toggle content filters in a set.",
      "Use input chips to represent entities (people, tags) the user added.",
      "Use assist and suggestion chips for contextual quick actions.",
    ],
    anatomy: ["32dp container with 8dp corners and 16dp iconless padding", "Variant-specific label, icon, outline, and selected-container color roles", "Optional leading icon / animated check / 24dp input-chip avatar", "Label (label-large)", "Optional trailing icon or 48dp cancel target", "Optional ChipGroup keyboard wrapper"],
    states: ["Enabled action", "Hover (8% state layer)", "Focus (3px primary ring)", "Pressed (96% scale)", "Filter or input selected (secondary-container/on-secondary-container)", "Elevated (surface-container-low, elevation-1, hover elevation-2)", "Disabled"],
    dos: [
      "Keep chip labels to one or two words",
      "Let filter chips toggle independently",
      "Give every input chip a visible remove affordance",
    ],
    donts: [
      "Don't use chips for primary navigation — use tabs or a nav rail",
      "Don't mix chip variants in the same row",
      "Don't truncate more than a word; wrap the row instead",
    ],
  },
  exampleCode: `<Chip variant="filter" selected={active} onSelect={setActive}>
  Landscape
</Chip>
<Chip variant="input" avatar={<img src={guest.photo} alt="" />} onRemove={removeGuest}>
  Guest
</Chip>
<ChipGroup label="Filters">{filterChips}</ChipGroup>`,
  related: ["checkbox", "radio", "autocomplete"],
  demoName: "ChipDemo",
};

export const bannerMeta: M3ComponentMeta = {
  id: "banner",
  name: "Banner",
  category: "communication",
  description:
    "Library extension from Material 2 and Flutter: Material 3 does not publish Banner as a current standalone component. It displays a persistent screen-wide message with optional actions.",
  importLine: `import { Banner } from "@/components/m3/Banner";`,
  spec: componentSpecs.banner,
  variants: ["with-icon", "with-actions", "dismissible"],
  props: [
    { name: "icon", type: `string`, description: "Leading Material Symbol name." },
    { name: "text", type: `string`, description: "The banner message." },
    { name: "actions", type: `{ label: string; onClick?: () => void }[]`, description: "Right-aligned text buttons below a divider." },
    { name: "open", type: `boolean`, default: `true`, description: "Collapses the banner when false." },
    { name: "onClose", type: `() => void`, description: "Renders a trailing close icon when provided." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." },
  ],
  guidelines: {
    whenToUse: [
      "Announce system-level conditions (offline, updates, permission prompts) that affect the whole screen.",
      "Offer follow-up actions the user can take now, like Retry or Update.",
      "Keep visible until resolved — unlike snackbars, banners persist.",
    ],
    anatomy: ["Extension container (surface-container-low, square corners)", "Leading icon (on-surface-variant, 24dp)", "Message (body-medium)", "Action row (52px) end-aligned above an outline-variant divider with 40dp text buttons", "Optional close icon"],
    states: ["Expanded", "Collapsing (height spring)", "Dismissed"],
    dos: [
      "Use one banner per screen so the message stays prominent",
      "Provide clear dismiss and action affordances",
      "Write text in one or two lines maximum",
    ],
    donts: [
      "Don't use banners for transient confirmations — use a snackbar",
      "Don't interrupt input flows with banners mid-form",
      "Don't stack multiple banners in the same region",
    ],
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
  m3e: false,
};

export const checkboxMeta: M3ComponentMeta = {
  id: "checkbox",
  name: "Checkbox",
  category: "selection",
  description:
    "Checkboxes let users select one or more items from a set, toggling each option on or off (or to an indeterminate state).",
  importLine: `import { Checkbox } from "@/components/m3/Checkbox";`,
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
    { name: "name / form / required / readOnly", type: `native form props`, description: "Forwarded through the Base UI hidden form input." },
  ],
  guidelines: {
    whenToUse: [
      "Use for multiple independent selections in a set.",
      "Use indeterminate for a parent that reflects partially-selected children.",
      "Use a single checkbox to opt in or out of one condition.",
    ],
    anatomy: ["48px touch target", "40dp circular state layer isolated from the label", "18px rounded box (2px border)", "Animated checkmark / indeterminate dash", "Optional label (body-large)"],
    states: ["Enabled", "Hover (state layer)", "Focus (3px primary ring)", "Pressed (box squashes on the expressive spring)", "Checked (primary fill + drawn check)", "Indeterminate (dash)", "Error", "Disabled (38% opacity)"],
    dos: [
      "Keep labels positive ('Send me updates') so checking means agreeing",
      "Use the indeterminate state to summarize child checkboxes",
      "Give each checkbox its own clear label",
    ],
    donts: [
      "Don't use a checkbox when only one option can be active — use a radio",
      "Don't trigger destructive actions directly from a check",
      "Don't nest checkboxes inside one another",
    ],
  },
  exampleCode: `<Checkbox
  checked={subscribed}
  onChange={setSubscribed}
  label="Email me product updates"
/>`,
  related: ["radio", "switch", "chip"],
  demoName: "CheckboxDemo",
};

export const fabMeta: M3ComponentMeta = {
  id: "fab",
  name: "FAB",
  category: "actions",
  description:
    "A floating action button represents the primary action on a screen. Current M3E sizes are standard 56dp, medium 80dp, and large 96dp. The old 40dp small and 132dp extra-large sizes remain explicit compatibility options.",
  importLine: `import { Fab } from "@/components/m3/FAB";`,
  spec: componentSpecs.fab,
  variants: ["primary-container · default", "secondary-container", "tertiary-container", "primary", "secondary", "tertiary", "surface · legacy"],
  props: [
    { name: "color", type: `FabColor`, default: `'primary-container'`, description: "Defaults to the current primary-container role. Solid and other container roles remain available; surface is a legacy compatibility role." },
    { name: "size", type: `FabSize`, default: `'standard'`, description: "Official 56 / 80 / 96dp sizes, plus legacy 40 / 132dp options." },
    { name: "icon", type: `string`, description: "Material Symbols ligature name, e.g. 'add'." },
    { name: "lowered", type: `boolean`, default: `false`, description: "Uses elevation 1 instead of 3 (for FABs flanking dialogs or extended FABs)." },
    { name: "aria-label", type: `string`, description: "Strongly recommended — the icon alone has no text alternative." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables interaction: container drops to on-surface 12%, icon to 38%, elevation to 0." },
    { name: "onClick", type: `() => void`, description: "Handler fired when the FAB is activated." },
  ],
  guidelines: {
    whenToUse: [
      "Use a FAB for the single most common or important action on a screen, like 'Compose' or 'Create'.",
      "Use a container color by default, or tertiary for a contrasting accent.",
      "Use lowered when the FAB shares a screen with a dialog or another extended FAB.",
    ],
    anatomy: ["Rounded tonal container (16/20/28dp official corners)", "Elevation shadow (level 3, or 1 when lowered)", "Material Symbol icon (24/28/32dp official sizes)", "State layer + ripple", "48dp minimum touch target on the legacy 40dp small FAB"],
    states: ["Enabled (elevation 3)", "Hover (elevation 4, 103% scale)", "Focus (3px focus ring)", "Pressed (94% scale spring, elevation 4)", "Disabled (on-surface 12% container / 38% icon, no elevation)"],
    dos: [
      "Show at most one FAB per screen (or per section of very long screens)",
      "Position the FAB in the bottom-right corner for scannability",
      "Pick an icon that instantly communicates the action it performs",
    ],
    donts: [
      "Don't use a FAB for minor or destructive actions",
      "Don't use more than one FAB competing for the primary action",
      "Don't place a FAB inside dialogs or cards where an inline button is clearer",
    ],
  },
  exampleCode: `<Fab icon="add" aria-label="Create" onClick={create} />
<Fab color="tertiary" size="large" icon="favorite" aria-label="Like" />
<Fab color="surface" size="small" icon="edit" lowered aria-label="Legacy surface FAB" />`,
  related: ["extended-fab", "fab-menu", "icon-button", "button"],
  demoName: "FabDemo",
};

export const tabsMeta: M3ComponentMeta = {
  id: "tabs",
  name: "Tabs",
  category: "navigation",
  description:
    "Tabs organize peer views. Primary tabs use 64dp icon-and-label columns with an indicator inset 2dp beyond each side of the label. Official secondary tabs use a 48dp surface row with a full-tab-width underline; the old tonal pill is retained as an explicitly named compatibility variant.",
  importLine: `import { Tabs } from "@/components/m3/Tabs";`,
  spec: componentSpecs.tabs,
  variants: ["primary", "secondary", "tonal · compatibility"],
  props: [
    { name: "items", type: `NavItem[]`, description: "Tab definitions: value, label, optional Material Symbol icon and badge." },
    { name: "value", type: `string`, description: "Controlled selected tab value." },
    { name: "onChange", type: `(v: string) => void`, description: "Called with the newly selected value." },
    { name: "variant", type: `'primary' | 'secondary' | 'tonal'`, default: `'primary'`, description: "Primary extends the underline 2dp beyond each label side; secondary uses the official full-tab-width underline; tonal preserves the former pill extension." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to container width and distribute tabs equally; overflow scrolls horizontally." },
  ],
  guidelines: {
    whenToUse: [
      "Use tabs to switch between peer views of the same content level (Today / Health / Shop).",
      "Use at the top of a screen for in-context navigation, not for app-level destinations.",
      "Use secondary for a compact 48dp row with a full-width selected underline.",
    ],
    anatomy: ["64dp primary or 48dp secondary surface row", "Tab with optional 24dp icon and label", "Primary label width + 2dp each side or secondary full-tab-width 3dp underline", "Compatibility tonal pill", "Overflow scroll controls"],
    states: ["Selected (primary or on-surface content plus underline)", "Unselected (on-surface-variant)", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (ripple)", "Keyboard (roving tabindex; ArrowLeft/Right, Home/End move and activate)"],
    dos: [
      "Keep tab labels short — a single word is ideal",
      "Order tabs by importance or logical reading order",
      "Keep the selected tab obvious via the animated indicator",
    ],
    donts: [
      "Don't use tabs for sequential steps — use a stepper or buttons instead",
      "Don't combine tabs and bottom navigation for the same content level",
      "Don't truncate labels; scroll instead",
    ],
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
  demoName: "TabsDemo",
};

export const loadingIndicatorMeta: M3ComponentMeta = {
  id: "loading-indicator",
  name: "Loading indicator",
  category: "communication",
  description:
    "The M3 Expressive loading indicator loops through seven official polygon shapes when indeterminate. With progress, it uses the official determinate Circle-to-SoftBurst morph from 0 to 1. The uncontained indicator is the default; a contained tonal treatment is available for stronger emphasis.",
  importLine: `import { LoadingIndicator } from "@/components/m3/LoadingIndicator";`,
  spec: componentSpecs["loading-indicator"],
  variants: ["indeterminate", "determinate Circle-to-SoftBurst", "uncontained", "contained", "primary", "secondary", "tertiary", "error"],
  props: [
    { name: "size", type: `number`, default: `48`, description: "Square container size in px (official 48dp container)." },
    { name: "progress", type: `number`, description: "0–1 determinate progress. Values are clamped and morph the indicator from Circle at 0 to SoftBurst at 1." },
    { name: "active", type: `boolean`, default: `true`, description: "Indeterminate only. false pauses the morph + spin and rests at a circle at 38% opacity." },
    { name: "variant", type: `'uncontained' | 'contained'`, default: `'uncontained'`, description: "Official plain indicator or tonal 48dp container treatment." },
    { name: "color", type: `'primary' | 'secondary' | 'tertiary' | 'error'`, default: `'primary'`, description: "Container color; arcs use the matching on-container role." },
    { name: "ariaLabel", type: `string`, default: `'Loading'`, description: "Purpose label announced by the progressbar. Inactive indeterminate indicators leave the accessibility tree." },
  ],
  guidelines: {
    whenToUse: [
      "Use for full-screen or section-level loading moments that last more than a second.",
      "Use the Expressive morphing style to reinforce brand personality during waits.",
      "Pass progress from 0 to 1 when the task has measurable completion.",
      "Use `active={false}` only to pause an indeterminate indicator.",
    ],
    anatomy: ["38dp indicator, uncontained by default", "Optional 48dp round tonal container", "Determinate: Circle → SoftBurst as progress moves from 0 to 1, with a 180° counterclockwise rotation", "Indeterminate: SoftBurst → Cookie9Sided → Pentagon → Pill → Sunny → Cookie4Sided → Oval", "Indeterminate rotation completes every 4666ms with a morph step every 650ms"],
    states: ["Determinate (progressbar from 0 to 1)", "Indeterminate (continuous rotation + shape morph)", "Reduced motion (static full-opacity result)", "Paused indeterminate (active=false — static circle at 38% opacity and removed from the accessibility tree)"],
    dos: [
      "Size it generously (48px+) — this indicator is meant to be seen",
      "Keep surrounding text calm and brief while it runs",
      "Match the container color to the page's tonal palette",
    ],
    donts: [
      "Don't use for micro-waits under one second — use CircularProgress",
      "Don't place on busy backgrounds that hide the shape morph",
      "Don't run multiple morphing loaders on one screen",
    ],
  },
  m3e: true,
  exampleCode: `<LoadingIndicator size={48} ariaLabel="Loading profile" />
<LoadingIndicator progress={0.5} ariaLabel="Uploading profile" />
<LoadingIndicator variant="contained" size={72} color="tertiary" ariaLabel="Loading media" />
<LoadingIndicator active={false} color="secondary" />`,
  related: ["circular-progress", "linear-progress"],
  demoName: "LoadingIndicatorDemo",
};

export const menuMeta: M3ComponentMeta = {
  id: "menu",
  name: "Menu",
  category: "navigation",
  description:
    "Menus display choices on a temporary surface. The current segmented M3E style supports shaped 44dp items, selection shape morphs, supporting text, standard or vibrant colors, keyboard navigation, labels and dividers; the baseline 48dp list remains available.",
  importLine: `import { Menu } from "@/components/m3/Menu";`,
  spec: componentSpecs.menu,
  variants: ["segmented", "standard", "standard color", "vibrant color", "bottom-start", "bottom-end"],
  props: [
    { name: "trigger", type: `ReactNode`, description: "Clickable element the menu anchors to; cloned with the open handler." },
    { name: "items", type: `MenuItemData[]`, description: "Items can include selection, selected icon, supporting text, trailing icon, badge, checkbox/radio role, shortcut, disabled/destructive state, labels, dividers, and a recursive submenu." },
    { name: "open", type: `boolean`, description: "Controlled open state; omit for internal state." },
    { name: "onOpenChange", type: `(open: boolean) => void`, description: "Notifies open/close changes in controlled mode." },
    { name: "placement", type: `'bottom-start' | 'bottom-end'`, default: `'bottom-start'`, description: "Anchor edge and transform origin." },
    { name: "variant", type: `'segmented' | 'standard'`, default: `'segmented'`, description: "Current expressive segmented items or baseline M3 list items." },
    { name: "color", type: `'standard' | 'vibrant'`, default: `'standard'`, description: "Surface-based standard scheme or higher-emphasis tertiary scheme." },
  ],
  guidelines: {
    whenToUse: [
      "Use for overflow actions that don't fit an app bar or toolbar.",
      "Use for context actions on an item (edit, duplicate, delete).",
      "Group related commands with labels and dividers.",
    ],
    anatomy: ["Container (baseline minimum width 112dp; surface-container, elevation 2, 4dp corners)", "Segmented items (44dp minimum, 2dp gaps, 12dp outer/4dp inner corners reset within each divider/label group, selected 12dp shape)", "Leading/trailing icons and optional badge", "Optional supporting text and shortcut", "Section labels, dividers, and cascading submenus"],
    states: ["Enabled (on-surface)", "Disabled (38% opacity)", "Destructive (error color)", "Hover (8% state layer)", "Focus (3px focus ring)", "Submenu open", "Keyboard (Arrow keys and Home/End move focus; submenu keys traverse levels; Escape/Tab close and restore trigger focus)"],
    dos: [
      "Keep menus to 5–10 items and keep submenu depth shallow",
      "Show keyboard shortcuts to teach power-user paths",
      "Reserve error color for genuinely destructive actions",
    ],
    donts: [
      "Don't use a menu as primary navigation — it hides destinations",
      "Don't put form inputs inside menu items",
      "Don't open menus on hover; require a click or tap",
    ],
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
  demoName: "MenuDemo",
};

export const bottomAppBarMeta: M3ComponentMeta = {
  id: "bottom-app-bar",
  name: "Bottom app bar",
  category: "navigation",
  description:
    "Bottom app bars hold key actions on small screens. The library keeps a 64dp flexible form with configurable arrangements as a compatibility surface; the 80dp standard baseline remains available. Every trailing action is a labeled action object, and an optional end FAB uses expressive press shape morphing.",
  importLine: `import { BottomAppBar } from "@/components/m3/BottomAppBar";`,
  spec: componentSpecs["bottom-app-bar"],
  variants: ["flexible · compatibility", "standard · baseline", "with end FAB", "center FAB · compatibility"],
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
    { name: "fullWidth", type: `boolean`, default: `true`, description: "Stretch to container width." },
  ],
  guidelines: {
    whenToUse: [
      "Use on small screens to pair the primary action (FAB) with contextual actions.",
      "Use when the screen benefits from a persistent primary action reachable by thumb.",
      "Prefer a navigation bar when destinations — not actions — are the priority.",
    ],
    anatomy: ["64dp flexible compatibility or 80dp baseline surface-container bar", "Navigation icon (optional, leading, 48dp target)", "Compatibility configurable distribution or baseline fixed start arrangement", "Optional end FAB", "Labeled trailing action objects"],
    states: ["Rest (surface-container, FAB elevation 3)", "FAB pressed (shape morph 16→28 + 95% scale)", "Icon hover (8% state layer)", "Focus (3px focus ring)"],
    dos: [
      "Keep 2–4 actions total so the FAB stays the visual anchor",
      "Use icons with clear, conventional meanings",
      "Give the bar breathing room from scrollable content",
    ],
    donts: [
      "Don't use both a bottom app bar and a navigation bar at the same height",
      "Don't place text buttons in the bar — icons only",
      "Don't exceed four actions plus the FAB",
    ],
  },
  exampleCode: `<BottomAppBar
  actions={[{ icon: "check_box", label: "Select" }, { icon: "edit", label: "Edit" }]}
  trailingActions={[{ icon: "more_vert", label: "More options" }]}
  fab={{ icon: "add" }}
/>`,
  related: ["top-app-bar", "fab", "navigation-bar"],
  demoName: "BottomAppBarDemo",
};

export const extendedFabMeta: M3ComponentMeta = {
  id: "extended-fab",
  name: "Extended FAB",
  category: "actions",
  description:
    "An extended floating action button is a wider FAB that pairs an icon with a short text label, making the primary action unmistakable on wide screens and content-heavy layouts.",
  importLine: `import { ExtendedFab } from "@/components/m3/ExtendedFab";`,
  spec: componentSpecs["extended-fab"],
  variants: ["primary-container · default", "secondary-container", "tertiary-container", "primary", "secondary", "tertiary", "surface · legacy"],
  props: [
    { name: "color", type: `FabColor`, default: `'primary-container'`, description: "Defaults to the current primary-container role. Solid and other container roles remain available; surface is a legacy compatibility role." },
    { name: "size", type: `'small' | 'medium' | 'large'`, default: `'small'`, description: "Official 56 / 80 / 96dp extended FAB sizes." },
    { name: "icon", type: `string`, description: "Optional leading Material Symbols ligature name." },
    { name: "label", type: `string`, description: "Short action label, e.g. 'Compose'." },
    { name: "lowered", type: `boolean`, default: `false`, description: "Uses elevation 1 instead of 3." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables interaction: container drops to on-surface 12%, content to 38%, elevation to 0." },
    { name: "onClick", type: `() => void`, description: "Handler fired when the FAB is activated." },
  ],
  guidelines: {
    whenToUse: [
      "Use an extended FAB when a plain FAB's icon doesn't clearly communicate the action.",
      "Use it for the most common action on screens with room for a wider element, like 'Start tour' or 'New event'.",
      "Prefer an icon-only FAB on compact screens; swap to extended on tablets and desktop.",
    ],
    anatomy: ["56/80/96dp tonal container with 16/20/28dp corners", "Elevation shadow (level 3, or 1 when lowered)", "Optional 24/28/32dp Material Symbol", "Size-matched label type and 8/16/20dp gap", "State layer + ripple"],
    states: ["Enabled (elevation 3)", "Hover (elevation 4, 103% scale)", "Focus (3px focus ring)", "Pressed (94% scale spring, elevation 4)", "Disabled (on-surface 12% container / 38% content, no elevation)"],
    dos: [
      "Keep the label to one or two words",
      "Use the same color role as the screen's FAB if both appear in a flow",
      "Anchor it in the bottom-right corner like a standard FAB",
    ],
    donts: [
      "Don't use an extended FAB and an icon-only FAB for the same action on one screen",
      "Don't use it for secondary or destructive actions",
      "Don't wrap long labels — use a regular button instead",
    ],
  },
  exampleCode: `<ExtendedFab icon="edit" label="Compose" onClick={compose} />
<ExtendedFab color="tertiary" icon="directions" label="Navigate" />
<ExtendedFab color="surface" icon="filter" label="Legacy filter" lowered />`,
  related: ["fab", "fab-menu", "button", "icon-button"],
  demoName: "ExtendedFabDemo",
};

export const circularProgressMeta: M3ComponentMeta = {
  id: "circular-progress",
  name: "Circular progress",
  category: "communication",
  description:
    "Circular progress indicators display progress by animating an arc along a circular track, for compact or inline loading states.",
  importLine: `import { CircularProgress } from "@/components/m3/CircularProgress";`,
  spec: componentSpecs["circular-progress"],
  variants: ["flat determinate", "flat indeterminate", "wavy determinate", "wavy indeterminate"],
  props: [
    { name: "value", type: `number`, description: "0–100 progress. Omit for indeterminate." },
    { name: "size", type: `number`, description: "Outer diameter. Defaults to 40dp flat or 48dp wavy." },
    { name: "thickness", type: `number`, default: `4`, description: "Indicator stroke width in px." },
    { name: "wavy", type: `boolean`, default: `false`, description: "Use the M3E circular waveform. The old wavey spelling remains as a deprecated alias." },
    { name: "color", type: `'primary' | 'secondary' | 'tertiary' | 'error'`, default: `'primary'`, description: "Active indicator color role." },
    { name: "ariaLabel", type: `string`, default: `'Loading'`, description: "Accessible name for the progressbar role." },
  ],
  guidelines: {
    whenToUse: [
      "Use circular indicators where space is tight: buttons, list rows, toolbars.",
      "Use determinate when a measurable task (e.g. file upload) has clear completion.",
      "Use indeterminate when the wait length is unknown.",
    ],
    anatomy: ["40dp flat or 48dp wavy circular geometry", "Determinate active indicator and secondary-container track separated by real transparent 4dp gaps", "Indeterminate active arc without a visible track", "No linear-style stop dot"],
    states: ["Determinate (spring-animated active arc plus separated track)", "Indeterminate (arc grows to ~270° and contracts while the ring rotates)"],
    dos: [
      "Match indicator size to its context (small inline spinners in buttons)",
      "Keep at least 4px clearance so round caps don't clip",
      "Pair indeterminate spinners with a concise status message",
    ],
    donts: [
      "Don't place two competing spinners next to each other",
      "Don't use circular progress as decoration",
      "Don't block the whole screen for background tasks — surface progress inline",
    ],
  },
  exampleCode: `<CircularProgress value={75} />
<CircularProgress size={32} thickness={3} color="secondary" />
<CircularProgress color="error" />`,
  related: ["linear-progress", "loading-indicator", "button"],
  demoName: "CircularProgressDemo",
};

export const badgeMeta: M3ComponentMeta = {
  id: "badge",
  name: "Badge",
  category: "communication",
  description:
    "Badges are small status descriptors for UI elements — a count or dot anchored to an icon, avatar, or navigation item that indicates it requires attention.",
  importLine: `import { Badge } from "@/components/m3/Badge";`,
  spec: componentSpecs.badge,
  variants: ["error", "primary", "tertiary", "dot"],
  props: [
    { name: "value", type: `number | string`, description: "Count or short label to show, limited to four display characters. Numbers above max collapse to max+." },
    { name: "showDot", type: `boolean`, default: `false`, description: "Show a 6px dot instead of a value. Its meaning is still attached to the destination for assistive technology." },
    { name: "children", type: `React.ReactNode`, description: "Anchor element the badge pins to logical top-end and mirrors in RTL." },
    { name: "color", type: `'error' | 'primary' | 'tertiary'`, default: `'error'`, description: "Badge color role." },
    { name: "max", type: `number`, default: `999`, description: "Maximum count before max+; capped at 999 to preserve the official four-character limit." },
    { name: "ariaLabel", type: `string`, description: "Concise badge meaning attached to the destination through aria-describedby." },
  ],
  guidelines: {
    whenToUse: [
      "Use a large badge with a number to indicate unread items on icons or navigation destinations.",
      "Use a small dot when the exact count is irrelevant but attention is needed.",
      "Anchor badges to the logical top-end of icons and avatars.",
    ],
    anatomy: ["Anchor element (icon, avatar, tab)", "Badge container (16px min-width pill or 6px dot) pinned to logical top-end and mirrored in RTL; text badge overhangs 4px inline-end / 2px top", "Value text (label-small) or dot fill"],
    states: ["Default", "Updated (value change pops with the bouncy spring)"],
    dos: [
      "Use large badges with counts for email, chat, and cart-style surfaces",
      "Switch to a dot once counts exceed what users can act on",
      "Keep badge text to four characters or fewer (e.g. \"99+\")",
    ],
    donts: [
      "Don't use badges for critical errors — use a banner or dialog",
      "Don't place badges on text-only actions or buttons with labels",
      "Don't animate a badge on every update in rapidly-changing lists",
    ],
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
  demoName: "BadgeDemo",
};

export const searchBarMeta: M3ComponentMeta = {
  id: "search-bar",
  name: "SearchBar",
  category: "textinput",
  description:
    "A search bar is a rounded text field dedicated to search queries. The official default is 56dp high, 360–720dp wide, and uses 24dp horizontal padding; compact and large sizes are library extensions.",
  importLine: `import { SearchBar } from "@/components/m3/SearchBar";`,
  spec: componentSpecs["search-bar"],
  variants: ["md · official", "sm · extension", "lg · extension"],
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
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables the bar (38% opacity)." },
  ],
  guidelines: {
    whenToUse: [
      "Use at the top of a screen or list to search within its content.",
      "Use trailing icons for contextual actions like voice search or filters.",
      "Use the large size when search is the primary task of the screen.",
    ],
    anatomy: ["56dp rounded-full container, 360–720dp wide", "24dp horizontal padding", "Leading search icon", "Query input (body-large)", "Optional trailing icon buttons (24dp icons, ≥48dp targets)"],
    states: ["Enabled", "Focused (official level-0 elevation)", "Hover (state layer)", "Disabled"],
    dos: [
      "Keep the placeholder short — the query area is the label",
      "Submit on Enter and keep results immediately visible",
      "Offer a clear/cancel affordance once a query exists",
    ],
    donts: [
      "Don't use a search bar for structured filtering — use selects or chips",
      "Don't hide the submit action behind a delay or extra click",
      "Don't stack multiple search bars on one screen",
    ],
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
  demoName: "SearchBarDemo",
};

export const searchViewMeta: M3ComponentMeta = {
  id: "search-view",
  name: "SearchView",
  category: "textinput",
  description:
    "The expanded companion of the search bar: full-screen uses the current contained 56dp focused bar on surface-container-low; docked uses a 360–720dp floating result surface over a scrim.",
  importLine: `import { SearchView } from "@/components/m3/SearchView";`,
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
    { name: "autoFocus", type: `boolean`, default: `true`, description: "Focus the query input when either view opens." },
  ],
  guidelines: {
    whenToUse: [
      "Use for larger, richer search experiences — query building, filters and result sets that need room.",
      "Use as the expanded companion of a search bar: tapping the bar opens the view over the UI.",
      "Use recent-search rows to reduce retyping for repeat queries.",
    ],
    anatomy: ["Contained 56dp focused bar without a baseline divider on full-screen surface-container-low", "Docked surface (360–720dp wide, min 240dp high, max two-thirds viewport height, 28dp corners, elevation 3) over a 32% scrim", "Leading navigation icon", "Query input", "48dp trailing targets", "Docked divider", "Scrollable results or recent searches"],
    states: ["Rest (elevation 0 — the view replaces the surface)", "Input focused (caret + on-surface text)", "Suggestion rows: combobox/listbox semantics only while the recent-search list exists", "Docked divider separates input from content"],
    dos: [
      "Keep the current contained full-screen bar at 56dp without the old baseline divider.",
      "Provide an obvious way out — a leading arrow-back icon that closes, plus Escape in full-screen mode.",
      "Restore focus to the trigger when the full-screen view closes.",
      "Keep recent rows keyboard-reachable: ArrowUp/ArrowDown walk the list, Enter selects.",
    ],
    donts: [
      "Don't stack a scrim under the full-screen view; use the scrim only for docked mode.",
      "Don't show suggestion rows and results at once; results take over once a query exists.",
      "Don't use a search view for structured filtering — it is free-form query entry.",
    ],
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
  demoName: "SearchViewDemo",
};

export const splitButtonMeta: M3ComponentMeta = {
  id: "split-button",
  name: "Split button",
  category: "actions",
  description:
    "New in Material 3 Expressive: a split button joins a primary action with an arrow segment that opens a dropdown of related actions, saving space while keeping the default action one tap away.",
  importLine: `import { SplitButton } from "@/components/m3/SplitButton";`,
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
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables both segments, dims to 38% opacity." },
  ],
  guidelines: {
    whenToUse: [
      "Use a split button when one action is far more common than its alternatives, like 'Send' vs 'Send later'.",
      "Use it in toolbars where several related commands must share one slot.",
      "Use the outlined variant when the split button sits next to filled buttons of higher emphasis.",
    ],
    anatomy: ["Two separated round segments with a 2dp gap", "Primary action segment with optional leading icon", "Dedicated dropdown icon offset by -1/-1/-2/-3/-6dp for xs/sm/md/lg/xl", "Dropdown menu with 24dp popup icons (surface-container, elevation 2, 4dp corners, 48dp items)"],
    states: ["Enabled", "Hover (8% state layer per segment)", "Focus (3px focus ring)", "Pressed (size-specific shape morph on the active half)", "Menu open (arrow rotated, fade/scale menu, Arrow/Home/End navigation)", "Disabled (tokenized container and content roles)"],
    dos: [
      "Keep the primary action and menu items closely related",
      "Close the menu after a choice is made",
      "Order menu items by expected frequency of use",
    ],
    donts: [
      "Don't nest submenus inside the dropdown",
      "Don't overload the menu — keep it to 3–7 items",
      "Don't use a split button when the action has no meaningful default",
    ],
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
  demoName: "SplitButtonDemo",
};

export const switchMeta: M3ComponentMeta = {
  id: "switch",
  name: "Switch",
  category: "selection",
  description:
    "A switch toggles the state of a single setting on or off, committing the change immediately.",
  importLine: `import { Switch } from "@/components/m3/Switch";`,
  spec: componentSpecs.switch,
  variants: ["checked", "unchecked"],
  props: [
    { name: "checked", type: `boolean`, default: `false`, description: "Whether the switch is on." },
    { name: "defaultChecked", type: `boolean`, default: `false`, description: "Initial state for uncontrolled use." },
    { name: "onCheckedChange", type: `(checked: boolean) => void`, description: "Called with the next state." },
    { name: "showIcon", type: `boolean`, default: `false`, description: "Show the optional checked thumb icon." },
    { name: "showUnselectedIcon", type: `boolean`, default: `false`, description: "Show the official optional close icon in the unchecked thumb." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables the switch (38% opacity)." },
    { name: "name / form / value / required / readOnly", type: `native form props`, description: "Forwarded through the Base UI hidden form input." },
  ],
  guidelines: {
    whenToUse: [
      "Use for a single setting that takes effect immediately.",
      "Use in settings rows with a label on the left and the switch on the right.",
      "Use instead of a checkbox when the change applies instantly.",
    ],
    anatomy: ["52×32 rounded-full visual track", "40dp circular state layer centered on the thumb", "Thumb (16px off, 24px on or icon-bearing off, 28px pressed)", "Optional checked and unchecked glyphs", "Hidden named form input"],
    states: ["Off (outline track, outline thumb at 4dp inset; optional close icon)", "On (primary track, on-primary thumb; optional check icon)", "Focus (3px primary ring)", "Pressed (thumb grows to 28px)", "Disabled (token-specific track, thumb, and icon opacity)"],
    dos: [
      "Label the setting, not the state — 'Wi-Fi', not 'On'",
      "Apply the change immediately; don't require a save step",
      "Keep one switch per row in lists",
    ],
    donts: [
      "Don't use a switch for actions — use a button",
      "Don't stack switches where checkboxes in a list would be clearer",
      "Don't require an extra confirmation for low-risk toggles",
    ],
  },
  exampleCode: `<Switch
  aria-label="Wi-Fi"
  checked={wifi}
  onCheckedChange={setWifi}
/>`,
  related: ["checkbox", "radio", "slider"],
  demoName: "SwitchDemo",
};

export const timePickerMeta: M3ComponentMeta = {
  id: "time-picker",
  name: "Time Picker",
  category: "selection",
  description:
    "Time pickers select a time through a dial, keyboard input, or three-row scroll layout. The official modal stages changes and provides dismiss/confirm actions plus a dial/input/scroll toggle; inline layouts remain compatible.",
  importLine: `import { TimePicker } from "@/components/m3/TimePicker";`,
  spec: componentSpecs["time-picker"],
  variants: ["modal", "dial · inline", "horizontal · inline", "input · inline", "scroll · inline", "12-hour", "24-hour-double-ring"],
  props: [
    { name: "value", type: `{ hour: number; minute: number }`, description: "Controlled selected time (hour 0–23, minute 0–59)." },
    { name: "defaultValue", type: `{ hour: number; minute: number }`, default: `{ hour: 0, minute: 0 }`, description: "Initial value for uncontrolled use." },
    { name: "onChange", type: `(t: { hour: number; minute: number }) => void`, description: "Fires on any dial, readout or meridiem change." },
    { name: "displayMode", type: `'dial' | 'horizontal' | 'input' | 'scroll'`, default: `'dial'`, description: "Official presentation. Dial remains the backward-compatible default." },
    { name: "presentation", type: `'inline' | 'modal'`, default: `'inline'`, description: "Compatibility inline layout or official staged modal dialog." },
    { name: "open / onOpenChange", type: `boolean / (open: boolean) => void`, description: "Modal visibility contract." },
    { name: "confirmLabel / dismissLabel", type: `string`, default: `'OK' / 'Cancel'`, description: "Modal action labels." },
    { name: "onConfirm / onDismiss", type: `callbacks`, description: "Modal completion callbacks." },
    { name: "use24h", type: `boolean`, description: "Overrides the system hour-cycle preference. In dial modes, 24-hour time uses the official double-ring face." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." },
    { name: "className", type: `string`, description: "Extra classes for the container." },
  ],
  guidelines: {
    whenToUse: [
      "Use an inline time picker when picking a time is the primary in-page task.",
      "Use with a date picker for scheduling flows.",
      "Use the 24h readout for locales or domains that require it.",
    ],
    anatomy: ["Modal surface with 48dp mode and action targets", "Vertical or horizontal analog layout with a 256dp dial", "24-hour 00–11 outer / 12–23 inner double ring at 101dp and 69dp radii", "Validated numeric input fields", "Three-row scroll fields", "Shared staged hour/minute value"],
    states: ["Hour editing", "Minute editing", "Pointer drag or keyboard dial selection", "Validated intermediate text input", "Scroll snap selection", "12-hour meridiem", "24-hour 00–11 outer / 12–23 inner double ring", "Modal staged selection", "Controlled or uncontrolled value"],
    dos: [
      "Show the current selection in the readout while editing the other segment",
      "Use the 24h double-ring dial for locales that expect it; hours 00–11 stay outside and 12–23 stay inside",
      "Keep the hand and pill in sync with the selected value",
      "Use input for keyboard-heavy tasks and scroll for touch wheel selection",
    ],
    donts: [
      "Don't hide the AM/PM state when the readout shows 12-hour values",
      "Don't keep the 12h single ring when use24h is set — the official face carries both half-days on two rings",
      "Don't make the dial smaller than 256px — numbers need 48px hit areas",
      "Don't use the time picker for durations",
    ],
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
  demoName: "TimePickerDemo",
};

export const radioMeta: M3ComponentMeta = {
  id: "radio",
  name: "Radio",
  category: "selection",
  description:
    "Radio buttons let users select exactly one option from a set of mutually exclusive choices.",
  importLine: `import { Radio, RadioGroup } from "@/components/m3/Radio";`,
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
    { name: "RadioGroup name / form / required / readOnly", type: `native form props`, description: "Group-level form semantics." },
  ],
  guidelines: {
    whenToUse: [
      "Use for mutually exclusive options where exactly one can be selected.",
      "Use when all options should be visible up front (vs. a dropdown).",
      "Preselect the most common option instead of leaving the group empty.",
    ],
    anatomy: ["48px touch target", "40dp circular state layer isolated from the label", "20px ring (2px border)", "Inner dot (springs in when selected)", "Optional label (body-large)"],
    states: ["Enabled", "Hover (state layer)", "Pressed (95% scale)", "Selected (primary ring + dot)", "Disabled (38% opacity)"],
    dos: [
      "Group related Radios in a RadioGroup so arrow keys move and select within the set",
      "Keep option labels short and parallel",
      "Order options logically (frequency, size, risk…)",
    ],
    donts: [
      "Don't use radios for multi-select — use checkboxes",
      "Don't add an 'apply' step; radios commit as a group on submit",
      "Don't use a radio to toggle something on/off — use a switch",
    ],
  },
  exampleCode: `<RadioGroup name="plan" defaultValue="pro" onValueChange={setPlan} label="Plan">
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" />
</RadioGroup>`,
  related: ["checkbox", "switch", "slider"],
  demoName: "RadioDemo",
};

export const toolbarMeta: M3ComponentMeta = {
  id: "toolbar",
  name: "Toolbar",
  category: "navigation",
  description:
    "New in Material 3 Expressive: a 64dp pill of contextual actions with 8dp internal horizontal padding and at least 16dp outside padding. Toggle actions always expose aria-pressed=true or false. The dockable variant morphs between a horizontal pill and a square full-width docked bar.",
  importLine: `import { Toolbar } from "@/components/m3/Toolbar";`,
  spec: componentSpecs.toolbar,
  m3e: true,
  variants: ["horizontal floating", "vertical floating", "dockable", "standard", "vibrant"],
  props: [
    { name: "icons", type: `{ icon: string; label?: string; onClick?: () => void; active?: boolean }[]`, description: "Optional toolbar actions; active items get a tinted pill and filled icon." },
    { name: "children", type: `React.ReactNode`, description: "Arbitrary toolbar controls, including Buttons and text fields." },
    { name: "fab", type: `React.ReactNode`, description: "Optional FAB at the trailing edge of a horizontal toolbar." },
    { name: "variant", type: `'floating' | 'dockable'`, default: `'floating'`, description: "Floating hovers over content; dockable toggles pill ↔ docked bar via the docked prop." },
    { name: "color", type: `ToolbarColor`, default: `'standard'`, description: "Official standard or vibrant mapping. surface/primary/secondary/tertiary remain compatibility aliases." },
    { name: "position", type: `'top' | 'bottom' | 'left' | 'right'`, default: `'bottom'`, description: "Floating placement edge inside a positioned ancestor." },
    { name: "orientation", type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: "Floating toolbar axis and keyboard arrow direction." },
    { name: "width", type: `number`, default: `560`, description: "Pill width in px for the floating variant." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch pill/bar to container width." },
    { name: "docked", type: `boolean`, default: `false`, description: "Dockable variant: true = square corners and full width." },
  ],
  guidelines: {
    whenToUse: [
      "Use to expose 3–5 contextual actions tied to the visible content (M3 Expressive pattern).",
      "Use floating for immersive editors and media viewers; dockable for tool palettes that pin during work.",
      "Pick a container color that complements the content without hiding it.",
    ],
    anatomy: ["At least 16dp outside padding from the parent edge", "Pill container (64dp cross-axis, full corners) or 64dp docked bar", "48dp icon buttons with state layer", "Standard selected tint or vibrant surface-container selected pill"],
    states: ["Rest (standard surface-container or vibrant primary-container)", "Toggle unselected (aria-pressed=false)", "Toggle selected (aria-pressed=true with standard tint or vibrant surface-container/on-surface)", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (ripple, expressive scale)"],
    dos: [
      "Group actions the user needs for the current selection",
      "Use the active pill to mark toggled modes (e.g. grid on)",
      "Let the dockable bar pin when the user starts a task, and float again when done",
    ],
    donts: [
      "Don't exceed five icons — move overflow into a menu",
      "Don't cover critical content with the floating pill",
      "Don't mix more than one toolbar color on the same screen",
    ],
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
  demoName: "ToolbarDemo",
};

export const iconButtonMeta: M3ComponentMeta = {
  id: "icon-button",
  name: "Icon button",
  category: "actions",
  description:
    "Icon buttons let people take a compact action with a single tap, using an icon as the label. Toggleable icon buttons flip between unselected and selected states with a springy M3 Expressive pop.",
  importLine: `import { IconButton } from "@/components/m3/IconButton";`,
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
    { name: "aria-label", type: `string`, description: "Required for accessibility — the icon alone has no text alternative." },
    { name: "disabled", type: `boolean`, default: `false`, description: "Disables interaction: filled containers use on-surface 10%, outlined borders 12%, and content 38%." },
  ],
  guidelines: {
    whenToUse: [
      "Use an icon button when horizontal space is limited and the icon alone clearly communicates the action.",
      "Use the filled or tonal variant for high-emphasis compact actions.",
      "Use toggleable for on/off state actions such as favorite, bookmark, mute, or pin.",
      "Use standard inside app bars and toolbars where several actions sit side by side.",
    ],
    anatomy: ["Five heights with narrow/standard/wide widths", "Round or square container with selected shape morph", "Size-matched Material Symbol icon", "48dp minimum touch target for small visual sizes"],
    states: ["Enabled", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (96% scale spring)", "Selected (filled primary/on-primary, tonal secondary/on-secondary, outlined inverse-surface/inverse-on-surface)", "Unselected filled toggle (surface-container/on-surface-variant)", "Disabled (10% filled container / 12% outline / 38% content)"],
    dos: [
      "Always provide an aria-label or tooltip — the icon is the only label",
      "Pick icons with a single, well-understood meaning",
      "Keep filled icon buttons to the most important action in a toolbar",
    ],
    donts: [
      "Don't use an icon-only button for destructive or irreversible actions without a confirmation",
      "Don't combine more than one filled icon button in the same toolbar region",
      "Don't animate the icon glyph itself in a way that changes its meaning",
    ],
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
  demoName: "IconButtonDemo",
};

export const tooltipMeta: M3ComponentMeta = {
  id: "tooltip",
  name: "Tooltip",
  category: "communication",
  description:
    "Tooltips display informative text when users hover over, focus on, or long-press an element — a compact plain label or a rich card with title and action.",
  importLine: `import { Tooltip } from "@/components/m3/Tooltip";`,
  spec: componentSpecs.tooltip,
  variants: ["plain", "rich"],
  props: [
    { name: "content", type: `React.ReactNode`, description: "Tooltip text or body content." },
    { name: "rich", type: `boolean`, default: `false`, description: "Use the rich layout with title and up to two actions." },
    { name: "title", type: `string`, description: "Rich only — bold title above the content." },
    { name: "actionLabel", type: `string`, description: "Rich only — optional action label." },
    { name: "onAction", type: `() => void`, description: "Rich only — action press handler." },
    { name: "actions", type: `TooltipAction[]`, description: "Rich only. Up to two short actions." },
    { name: "showCaret", type: `boolean`, default: `false`, description: "Opt in to the optional caret." },
    { name: "persistent", type: `boolean`, default: `false`, description: "Rich only. Open on click/tap and stay open after leaving the target until another interaction." },
    { name: "defaultOpen", type: `boolean`, default: `false`, description: "Persistent rich only. Show on page load for new-feature education." },
    { name: "placement", type: `'top' | 'bottom' | 'left' | 'right' | 'start' | 'end'`, description: "Preferred side. Plain defaults top; rich defaults bottom." },
    { name: "align", type: `'start' | 'center' | 'end'`, description: "Anchor alignment. Plain defaults center; rich defaults end for the bottom-right placement." },
    { name: "children", type: `React.ReactNode`, description: "Trigger element." },
  ],
  guidelines: {
    whenToUse: [
      "Label icon-only buttons and controls that lack visible text.",
      "Show helpful context on hover without taking permanent space.",
      "Use rich tooltips for icon actions needing explanation plus a learn-more link.",
    ],
    anatomy: ["Trigger linked through aria-describedby", "Plain inverse-surface label without a caret by default", "Rich surface-container card at bottom-end by default with title, body, and up to two actions", "Optional 16×8dp caret"],
    states: ["Hidden", "Entering (fade + scale after a 500ms show delay)", "Transient (hover, focus, or long-press; hides 1.5 seconds after leaving)", "Persistent rich (click/tap or page-load; remains after pointer exit until another interaction)"],
    dos: [
      "Keep plain tooltips to a single short phrase",
      "Trigger on hover, keyboard focus, and touch long-press",
      "Choose a preferred placement and let collision handling keep it in the viewport",
      "Use persistent rich tooltips only for click/tap or page-load education",
    ],
    donts: [
      "Don't put essential information only in a tooltip — it must be discoverable without hover",
      "Don't use tooltips on disabled elements",
      "Don't nest interactive content in plain tooltips",
    ],
  },
  exampleCode: `<Tooltip content="Add to favorites">
  <Button variant="text" icon="favorite" />
</Tooltip>
<Tooltip rich persistent title="Attach file" content="Attach documents, images, or videos up to 25 MB per file." actionLabel="Learn more" showCaret>
  <Button variant="outlined" icon="attach_file">Attach</Button>
</Tooltip>`,
  related: ["snackbar", "icon-button", "menu"],
  demoName: "TooltipDemo",
};

export const fabMenuMeta: M3ComponentMeta = {
  id: "fab-menu",
  name: "Fab menu",
  category: "actions",
  description:
    "New in Material 3 Expressive: a separate 56dp container-colored close button reveals a staggered cascade of 56dp solid-color extended action buttons. Horizontal and docked layouts remain documented library extensions.",
  importLine: `import { FabMenu } from "@/components/m3/FabMenu";`,
  spec: componentSpecs["fab-menu"],
  variants: ["primary", "secondary", "tertiary", "primary-container", "secondary-container", "tertiary-container", "surface", "docked · screen", "docked · bottom app bar"],
  props: [
    { name: "actions", type: `FabMenuAction[]`, description: "Quick actions with icon, optional visible label, ariaLabel, and handler." },
    { name: "direction", type: `'horizontal' | 'vertical'`, default: `'vertical'`, description: "Expansion direction of the action row/column. Ignored while docked — docking fixes the cascade (screen = vertical above, bottom app bar = horizontal row)." },
    { name: "docked", type: `boolean`, default: `false`, description: "Dock the menu to the bottom edge: closed FAB sits flush bottom-center; when open the FAB's bottom corners morph square (16px → 0 shape morph) and the actions cascade above/on the bar." },
    { name: "dockedTo", type: `'screen' | 'bottom-app-bar'`, default: `'screen'`, description: "Docking target. 'screen' pins position:fixed to the viewport bottom (or a transformed ancestor, e.g. a demo stage) with a vertical cascade; 'bottom-app-bar' anchors absolute inside the nearest positioned ancestor so the FAB rests on the bar below and actions open as a horizontal row flush on top of it." },
    { name: "color", type: `FabColor`, default: `'primary'`, description: "Color family: the trigger/close button uses its container role while revealed actions use the matching solid role." },
    { name: "open", type: `boolean`, description: "Controlled open state; omit for uncontrolled behavior." },
    { name: "onOpenChange", type: `(open: boolean) => void`, description: "Called when the menu opens or closes." },
    { name: "icon", type: `string`, default: `'edit'`, description: "Closed-state Material Symbol." },
    { name: "closeIcon", type: `string`, default: `'close'`, description: "Open-state Material Symbol." },
  ],
  guidelines: {
    whenToUse: [
      "Use a fab menu to cluster 2–5 related quick actions behind a single entry point.",
      "Use it when screen space is too tight for separate extended FABs or buttons.",
      "Prefer it for creation flows: attach a photo, record audio, add a file.",
    ],
    anatomy: ["Separate 56dp container-colored trigger/close button with 24dp closed icon and 20dp close icon", "56dp solid-color extended action buttons with 24dp icon and title-medium label", "Staggered spring entrance (50ms = durations.short1 token)", "Dismisses on Escape / outside press", "Extension: docked FAB flush bottom-center; open state squares the bottom corners to connect with the screen edge or bar"],
    states: ["Closed (single FAB)", "Open (close icon and actions visible)", "Action hover/press (state layer + 96% scale)", "Main FAB hover/press (103% / 94% expressive spring)", "Dismissed (Escape or outside pointerdown)", "Extension: docked closed/open shape morph"],
    dos: [
      "Keep each action's label short and noun-like ('Camera', 'Gallery')",
      "Limit the menu to 2–5 actions so the cascade stays scannable",
      "Close the menu after an action is chosen",
      "Use docked for creation flows that live at the bottom edge — above a bottom app bar it keeps one connected surface with the bar",
    ],
    donts: [
      "Don't put destructive actions in the menu",
      "Don't nest menus inside the menu",
      "Don't use it as a navigation drawer substitute",
      "Don't combine docked with direction — docking fixes the cascade layout (screen = vertical above, bottom app bar = horizontal row)",
      "Don't wrap the docked menu in an overflow-hidden container without a fixed-height stage or it clips the fixed/absolute anchoring",
    ],
  },
  exampleCode: `<FabMenu
  actions={[
    { icon: "photo_camera", label: "Camera", onClick: openCamera },
    { icon: "image", label: "Gallery", onClick: openGallery },
    { icon: "mic", label: "Voice note", onClick: recordAudio },
  ]}
/>

// Docked — flush to the bottom edge, bottom corners square when open.
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
  demoName: "FabMenuDemo",
};

export const navigationBarMeta: M3ComponentMeta = {
  id: "navigation-bar",
  name: "Navigation bar",
  category: "navigation",
  description:
    "Navigation bars switch between 3–5 primary destinations. The current short M3E bar is 64dp surface-container and uses secondary for the active top label. The 80dp baseline bar uses surface with elevation 2 and on-surface for its active label.",
  importLine: `import { NavigationBar } from "@/components/m3/NavigationBar";`,
  spec: componentSpecs["navigation-bar"],
  variants: ["short top-icon", "short start-icon", "short centered", "tall baseline"],
  props: [
    { name: "items", type: `NavItem[]`, description: "Destinations (3–5): value, label, optional icon, optional badge (dot or count)." },
    { name: "value", type: `string`, description: "Controlled selected destination value." },
    { name: "onChange", type: `(v: string) => void`, description: "Called with the newly selected value." },
    { name: "fullWidth", type: `boolean`, default: `true`, description: "Block-level full-width bar; set false for an inline fit-content bar." },
    { name: "variant", type: `'short' | 'tall'`, default: `'short'`, description: "64dp current M3E bar or 80dp baseline bar." },
    { name: "iconPosition", type: `'top' | 'start'`, default: `'top'`, description: "Short bar icon placement." },
    { name: "arrangement", type: `'equal' | 'centered'`, default: `'equal'`, description: "Equal for compact widths; centered for medium widths." },
  ],
  guidelines: {
    whenToUse: [
      "Use for top-level destinations on small screens where a navigation drawer doesn't fit.",
      "Use with 3 to 5 destinations of equal importance.",
      "Combine with a navigation rail or drawer on larger breakpoints.",
    ],
    anatomy: ["Current short: 64dp surface-container", "Baseline tall: 80dp surface with elevation 2", "Top-icon destination (24dp icon in a 56×32dp pill + label-medium)", "Start-icon destination (40dp-high pill around icon and label)", "Optional badge on the icon"],
    states: ["Current short active (secondary-container pill, filled icon; top label = secondary, start label = on-secondary-container)", "Baseline tall active (secondary-container pill, filled icon, on-surface label)", "Inactive (on-surface-variant)", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (ripple)"],
    dos: [
      "Keep destination labels short and descriptive",
      "Use badges only to surface genuinely new content",
      "Mirror the selected destination with the visible screen",
    ],
    donts: [
      "Don't exceed five destinations — group less-used ones elsewhere",
      "Don't use the bar for in-screen actions like save or share",
      "Don't hide labels — icons alone are ambiguous",
    ],
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
  demoName: "NavigationBarDemo",
};

export const topAppBarMeta: M3ComponentMeta = {
  id: "top-app-bar",
  name: "Top app bar",
  category: "navigation",
  description:
    "Top app bars display screen information and actions. Baseline variants are 64dp small/center, 112dp medium, and 152dp large; current flexible variants add larger type and subtitles. When search is configured, a search action activates the current SearchView overlay instead of replacing the title inline.",
  importLine: `import { TopAppBar } from "@/components/m3/TopAppBar";`,
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
    { name: "fullWidth", type: `boolean`, default: `true`, description: "Stretch to container width." },
  ],
  guidelines: {
    whenToUse: [
      "Use small for screens needing maximum content density.",
      "Use center-aligned for primary pages without back navigation.",
      "Use medium/large for hierarchical pages with long titles that reward scroll collapse.",
    ],
    anatomy: ["Baseline bar container (surface-container fill on scroll — M3 uses tonal color, not a shadow)", "Current flexible title and optional subtitle", "Leading navigation icon (48dp hit target)", "Trailing action icons", "Optional Search action + SearchView overlay"],
    states: ["Baseline static default (surface, no scroll reaction)", "Current flexible expanded/collapsed type treatments", "Pinned opt-in (surface-container after scroll)", "Enter-always opt-in", "Exit-until-collapsed opt-in (64dp title row)", "SearchView active from Search action", "Hover/focus on icons (state layer, focus ring)"],
    dos: [
      "Match variant to hierarchy: large for top-level, small for detail screens",
      "Limit actions to the most important 2–3; overflow the rest into a menu",
      "Pass an inner scroll container ref when the page scrolls inside a frame",
    ],
    donts: [
      "Don't combine a logo, product image, and search treatment in the same bar",
      "Don't let the flexible title wrap to more than one line",
      "Don't use medium/large variants on every screen; reserve them for hierarchy peaks",
    ],
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
  demoName: "TopAppBarDemo",
};

export const bottomSheetMeta: M3ComponentMeta = {
  id: "bottom-sheet",
  name: "Bottom Sheet",
  category: "containment",
  description:
    "Bottom sheets are surfaces anchored to the bottom of the screen that present supplementary content with a drag handle for pull-to-dismiss; the modal variant overlays a 32% scrim, the standard variant renders inline without one.",
  importLine: `import { BottomSheet } from "@/components/m3/BottomSheet";`,
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
    { name: "className", type: `string`, description: "Extra classes for the sheet panel." },
  ],
  guidelines: {
    whenToUse: [
      "Use a bottom sheet to expose in-context supplementary content without leaving the page.",
      "Use for pickers and option lists on mobile-first layouts.",
      "Use the footer for a primary confirmation action.",
    ],
    anatomy: ["Scrim (modal only)", "28dp top-corner sheet container", "Focusable 48dp handle target containing the 32×4dp visual handle", "Title", "Scrollable content", "Optional footer"],
    states: ["Hidden", "Partial", "Expanded", "Handle click/Enter/Space cycles height", "Dragging", "Dismissed"],
    dos: [
      "Keep sheet content short and task-focused",
      "Always provide an onClose handler",
      "Add a footer when the sheet completes an action",
    ],
    donts: [
      "Don't nest bottom sheets inside dialogs or other sheets",
      "Don't place critical irreversible actions in a dismissible sheet",
      "Don't stack multiple bottom sheets at once",
    ],
  },
  exampleCode: `<BottomSheet open={open} onClose={() => setOpen(false)} title="Choose a playlist">
  <List>{items}</List>
</BottomSheet>`,
  related: ["side-sheet", "card", "list"],
  demoName: "BottomSheetDemo",
};

export const buttonMeta: M3ComponentMeta = {
  id: "button",
  name: "Button",
  category: "actions",
  description:
    "Buttons trigger actions or events, such as submitting a form or opening a dialog. M3 Expressive adds a bouncy shape-morph press interaction and five emphasis sizes.",
  importLine: `import { Button } from "@/components/m3/Button";`,
  spec: componentSpecs.button,
  variants: ["filled", "tonal", "outlined", "text", "elevated"],
  props: [
    { name: "variant", type: `'filled' | 'tonal' | 'outlined' | 'text' | 'elevated'`, default: `'filled'`, description: "Visual emphasis of the button." },
    { name: "size", type: `ButtonSize`, default: `'sm'`, description: "Official 32 / 40 / 56 / 96 / 136dp sizes; long-form aliases are accepted." },
    { name: "shape", type: `ButtonShape`, default: `'round'`, description: "Official round or square resting shape. Toggle selection inverts round ↔ square; legacy fixed-radius names remain supported." },
    { name: "icon", type: `string`, description: "Leading Material Symbol name." },
    { name: "trailingIcon", type: `string`, description: "Trailing Material Symbol name." },
    { name: "loading", type: `boolean`, default: `false`, description: "Shows inline progress spinner and disables the button." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." },
    { name: "toggleable", type: `boolean`, default: `false`, description: "Enables the official two-state toggle-button contract for filled, tonal, outlined, and elevated buttons. Text buttons are rejected at the type boundary." },
    { name: "selected", type: `boolean`, description: "Controlled selected state; omit for internal state." },
    { name: "onSelectedChange", type: `(selected: boolean) => void`, description: "Called with the next toggle state." },
  ],
  guidelines: {
    whenToUse: [
      "Use a filled button for the highest-emphasis action on a screen (one per region).",
      "Use tonal for medium-emphasis secondary actions.",
      "Use outlined or text for low-emphasis tertiary actions like 'Learn more'.",
      "Use elevated when the button needs separation from a patterned background.",
    ],
    anatomy: ["Five size-matched round/square containers", "State layer", "Official size-matched label type", "Optional size-matched leading/trailing icon", "48dp touch target for 32/40dp visual sizes"],
    states: ["Enabled", "Hover (8% state layer)", "Focus (3px focus ring)", "Pressed (per-size corner morph 8/8/12/16/16dp + 96% scale)", "Toggle selected/unselected (aria-pressed and round/square inversion; unavailable for text)", "Disabled (on-surface 12% container / 38% content, no elevation)"],
    dos: [
      "Use one filled button per view region to signal the primary action",
      "Order buttons by emphasis: filled → tonal → outlined → text (rightmost = least emphasis)",
      "Label with a verb ('Save', 'Get started')",
    ],
    donts: [
      "Don't place two filled buttons side by side",
      "Don't use a button for navigation to another page — use a text button or card",
      "Don't wrap long sentences in button labels",
    ],
  },
  exampleCode: `<Button variant="filled" icon="edit">Compose</Button>
<Button variant="tonal" size="lg">Save draft</Button>
<Button variant="outlined" trailingIcon="arrow_forward">Next</Button>
<Button variant="text">Learn more</Button>`,
  related: ["fab", "icon-button", "button-group", "split-button"],
  demoName: "ButtonDemo",
};

export const linearProgressMeta: M3ComponentMeta = {
  id: "linear-progress",
  name: "Linear progress",
  category: "communication",
  description:
    "Linear progress indicators express an unspecified wait time or display the length of a process. Material 3 Expressive adds a signature wavy indicator that slides and pulses.",
  importLine: `import { LinearProgress } from "@/components/m3/LinearProgress";`,
  spec: componentSpecs["linear-progress"],
  variants: ["determinate", "indeterminate", "wavy-determinate", "wavy-indeterminate"],
  props: [
    { name: "value", type: `number`, description: "0–100 progress. Omit for indeterminate." },
    { name: "wavy", type: `boolean`, default: `false`, description: "M3 Expressive wavy line. The old wavey spelling remains as a deprecated alias." },
    { name: "color", type: `'primary' | 'secondary' | 'tertiary' | 'error'`, default: `'primary'`, description: "Active indicator color role." },
    { name: "height", type: `number`, default: `4`, description: "Flat track height in px. The wavy container is fixed at 10dp." },
    { name: "fullWidth", type: `boolean`, default: `false`, description: "Stretch to the container width." },
    { name: "label", type: `string`, description: "Optional label above the track; percentage shown when determinate." },
  ],
  guidelines: {
    whenToUse: [
      "Use linear indicators for operations that happen along a line: loading content, uploads, multi-step flows.",
      "Use determinate when progress is measurable; indeterminate otherwise.",
      "Use the Expressive wavy variant to add brand personality to casual, playful moments.",
    ],
    anatomy: ["Secondary-container track from the logical progress edge", "Active indicator grows from inline-start and mirrors in RTL", "10dp wavy container with 40dp determinate or 20dp indeterminate wavelength", "Real transparent 4dp active-track gap", "4dp stop indicator at inline-end", "Optional label and percentage"],
    states: ["Determinate (spring-animated fill)", "Indeterminate (two sweeping bars / sliding wave)"],
    dos: [
      "Keep indicators in the same position across screens so layout doesn't jump",
      "Prefer the wavy variant sparingly, for expressive product moments",
      "Pair with a label for operations longer than a few seconds",
    ],
    donts: [
      "Don't use progress indicators for actions that complete instantly",
      "Don't switch between determinate and indeterminate mid-process",
      "Don't stack multiple progress bars for one operation",
    ],
  },
  exampleCode: `<LinearProgress value={40} label="Downloading" fullWidth />
<LinearProgress color="tertiary" fullWidth />
<LinearProgress wavy value={60} color="error" fullWidth />`,
  related: ["circular-progress", "loading-indicator", "slider"],
  demoName: "LinearProgressDemo",
};
