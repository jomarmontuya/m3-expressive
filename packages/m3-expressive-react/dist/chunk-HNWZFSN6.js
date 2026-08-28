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

export {
  buttonGroupMeta,
  dividerMeta,
  datePickerMeta,
  sideSheetMeta,
  dialogMeta,
  snackbarMeta,
  navigationDrawerMeta,
  listMeta,
  cardMeta,
  segmentedButtonMeta,
  sliderMeta,
  textFieldMeta,
  autocompleteMeta,
  navigationRailMeta,
  chipMeta,
  bannerMeta,
  checkboxMeta,
  fabMeta,
  tabsMeta,
  loadingIndicatorMeta,
  menuMeta,
  bottomAppBarMeta,
  extendedFabMeta,
  circularProgressMeta,
  badgeMeta,
  searchBarMeta,
  searchViewMeta,
  splitButtonMeta,
  switchMeta,
  timePickerMeta,
  radioMeta,
  toolbarMeta,
  iconButtonMeta,
  tooltipMeta,
  fabMenuMeta,
  navigationBarMeta,
  topAppBarMeta,
  bottomSheetMeta,
  buttonMeta,
  linearProgressMeta
};
//# sourceMappingURL=chunk-HNWZFSN6.js.map