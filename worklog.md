# Project Worklog — Material 3 Expressive React Library

---

Task ID: 1-2
Agent: orchestrator (Z.ai Code)
Task: Project setup + M3E foundation (tokens, types, fonts, MaterialSymbol, Ripple, reference Button)

Work Log:
- Explored scaffold: Next.js 16 + Tailwind 4 + shadcn + framer-motion 12 + next-themes available
- Wrote `src/app/globals.css`: complete M3 color token system (24 roles × light/dark), type scale classes `md-*`, state layer `.m3-state`, focus ring `.m3-focus`, elevation `.m3-elevation-*`, Material Symbols CSS, ripple keyframes, m3-scroll utility, Tailwind mapping `bg-m3-*`/`text-m3-*`
- Wrote `src/app/layout.tsx`: Roboto Flex + Material Symbols Rounded via Google Fonts, inline no-flash theme script (localStorage `m3-theme`), M3 metadata
- Wrote `src/lib/m3/tokens.ts`: springs (fastSpatial→bouncy, expressive default 380/22), easings, durations, shapes, shapeMorph pairs, stateOpacities, typeScale, colorRoles table
- Wrote `src/lib/m3/types.ts`: `M3ComponentMeta` contract (id, category, description, importLine, variants, props, guidelines, exampleCode, m3e flag, demoName)
- Wrote `src/components/m3/MaterialSymbol.tsx` (icon font wrapper w/ fill/weight/grade/opsz)
- Wrote `src/components/m3/Ripple.tsx` (pointer-origin ripple, state-layer companion)
- Wrote `src/components/m3/Button.tsx` — REFERENCE PATTERN: 'use client', forwardRef, motion.button, Ripple child, size scale xs(32)/sm(40)/md(56)/lg(76)/xl(96), variants filled/tonal/outlined/text/elevated, shape morph press, `buttonMeta: M3ComponentMeta` export, `demoName: "ButtonDemo"`
- Wrote `src/hooks/use-m3-theme.ts` (light/dark toggle hook)

Stage Summary:
- Library contract established: every component file in src/components/m3 must:
  1. start with 'use client'
  2. export the component (named export)
  3. export `<id>Meta: M3ComponentMeta` from '@/lib/m3/types'
  4. export a `<Name>Demo` in src/components/showcase/demos/<batch>-demos.tsx + a batch DemoMap
- Tokens available: `springs/easings/durations/shapes/shapeMorph/stateOpacities` from '@/lib/m3/tokens'
- Tailwind color classes: bg-m3-*, text-m3-*, border-m3-* (24 roles, e.g. bg-m3-primary, text-m3-on-surface-variant, bg-m3-surface-container-high)
- Type classes: md-display-large … md-label-small
- NO imports from '@/components/ui' (shadcn) allowed inside src/components/m3/**

---
---

Task ID: 3-c
Agent: feedback-batch
Task: Feedback + communication batch — Badge, LinearProgress, CircularProgress, LoadingIndicator (M3E), Snackbar, Tooltip, Banner, Dialog (containment), Divider (containment) + feedback-demos.tsx

Work Log:
- Read worklog + reference files (Button.tsx, types.ts, tokens.ts, Ripple, MaterialSymbol, globals.css) before writing
- `src/components/m3/Badge.tsx` — anchor badge (-top-1 -right-2 on children wrapper) + standalone 16px pill / 6px dot; error/primary/tertiary colors, max=99 → "99+", disabled; value change remounts motion.span with springs.bouncy pop (key={value})
- `src/components/m3/LinearProgress.tsx` — flat track (surface-container-highest, overflow-visible) with spring-animated active bar (springs.defaultSpatial, maxWidth calc(100% - 8px)) + 4px trailing stop-indicator dot; indeterminate = two sweeping bars (durations.medium2 ×3 loop); wavey = SVG sine path (viewBox 0 0 200 20, strokeWidth 3 non-scaling, round caps) sliding one period per loop inside overflow-hidden + scaleY amplitude pulse; determinate wave clips via width%; optional label + % row
- `src/components/m3/CircularProgress.tsx` — track stroke var(--md-surface-container-highest); determinate round-cap arc (dasharray=circumference, dashoffset animated springs.defaultSpatial) + computed stop dot at end angle; indeterminate = ~270°-gap arc (dasharray arc/(c-arc)) with strokeDashoffset keyframes + svg rotate 360° linear infinite (durations.long2 ×3)
- `src/components/m3/LoadingIndicator.tsx` (m3e: true) — SIGNATURE M3E loader: container morphs borderRadius 50%→24%→50% + rotate 0→45→0 (3s easeInOut loop) on color-container bg; two dashed SVG arcs (dasharray "50 120" r27 / "30 80" r17.5) spin ±360° (durations.extraLong4 linear, inner ×1.6) with on-container stroke; active=false rests at circle + stops spin
- `src/components/m3/Snackbar.tsx` — fixed bottom-6 left-6 z-[70], inverse-surface rounded-lg min-h-12 m3-elevation-3; icon/actionLabel (inverse-primary uppercase)/close icon; duration 4000 auto-onClose (0 = sticky); AnimatePresence y:60 spring expressive
- `src/components/m3/Tooltip.tsx` — relative inline-flex wrapper, 400ms hover/focus-within delay (durations.medium4), plain inverse pill (min-h-6 rounded-full md-body-small) / rich card (surface-container-highest rounded-xl m3-elevation-2, title-small + body-medium + primary action); placement top|bottom, x:"−50%" handled in motion values (no Tailwind translate conflict), springs.fastVisual
- `src/components/m3/Banner.tsx` — surface-container-low rounded-lg, icon + body-medium + close; actions row (text buttons rounded-full text-m3-primary) right-aligned above border-t outline-variant divider; AnimatePresence height 0↔auto collapse (springs.defaultSpatial)
- `src/components/m3/Dialog.tsx` — z-[80] scrim bg-m3-scrim/50 (fade durations.short4) + surface-container-highest rounded-3xl max-w-[560px] m3-elevation-3 (fullscreen: rounded-none h-full max-w-none); scale 0.9→1 + y 20→0 springs.expressive; Escape + scrim click (dismissible), body scroll lock effect; icon/headline-small/body-medium/actions row
- `src/components/m3/Divider.tsx` — role="separator", horizontal/vertical, thickness, outline|outline-variant, 16px insets none/start/middle/end
- `src/components/showcase/demos/feedback-demos.tsx` — 9 interactive demos (Badge pop-on-click counter, dot/value/99+/disabled; LinearProgress determinate+indeterminate+wavey; CircularProgress 25/50/75/indeterminate sizes; LoadingIndicator sizes×colors + Pause/Play Button toggle; Snackbar simple + undo; Tooltip plain + rich; Banner retry/dismiss + reopen; Dialog basic + fullscreen; Divider all insets + vertical) + feedbackDemoMap
- TS FIX (batch-wide, my files only): framer-motion 12 rejects tokens.ts spring literals because `satisfies Record<string, Spring>` widens `type` to `string`; added per-file `const asTransition = (s: M3Spring): Transition => s as Transition;` helper and wrapped every springs.* passed to a motion `transition` prop (pre-existing same errors remain in Button.tsx etc. — not my files, left untouched per scope rules). Dialog's easings.standard cubic-bezier string is not a framer Easing — scrim fade uses ease "easeOut" instead
- NOTE on token scale: literal durations.medium2 (300ms) sweep and durations.long2 (500ms) rotation read as frantic; used token multipliers (×3) to stay token-driven while matching M3 motion feel. Stop-indicator gap = 4px dot + 4px gap = maxWidth calc(100% - 8px)
- Verified: `bunx tsc --noEmit` → zero errors in all 10 files of this batch (remaining project errors belong to other batches' files + scaffold examples/skills)

Stage Summary:
- New components: Badge, LinearProgress, CircularProgress, LoadingIndicator (m3e), Snackbar, Tooltip, Banner, Dialog, Divider — each file: 'use client', named component export, <id>Meta: M3ComponentMeta with full props/guidelines/exampleCode/demoName
- Demo map: feedbackDemoMap in src/components/showcase/demos/feedback-demos.tsx (badge, linear-progress, circular-progress, loading-indicator, snackbar, tooltip, banner, dialog, divider)
- Convention note for other batches: wrap springs.* tokens with `as Transition` (or cast) when passing to framer-motion transition props, and avoid easings.* cubic-bezier strings in framer `ease` (use named easings or cast)
- Remaining for orchestrator: index.ts barrel + registry entries for these 9 ids, page.tsx sections, Button.tsx-family tsc cleanup
Task ID: 3-b
Agent: inputs-batch
Task: Text input + selection components — TextField, SearchBar, Autocomplete, Checkbox, Radio, Switch, Slider, Chip + inputs-demos.tsx

Work Log:
- Followed reference Button.tsx pattern exactly: 'use client', forwardRef, named component export + `<id>Meta: M3ComponentMeta`, springs for all motion, m3-state on interactive surfaces, md-* type classes, M3 tailwind color tokens, no shadcn/radix imports
- TextField.tsx: outlined (default) + filled variants, xs/sm/md/lg heights (32/40/56/72), floating label via motion.label on springs.fastSpatial (outlined label docks into border gap with bg-m3-surface px-1; filled label rises inside + 1px indicator that grows a 2px primary bar via scaleX), error states (error color border/indicator/label/icon + helper), leading/trailing Material Symbols, helper text row, disabled 38%, required asterisk
- SearchBar.tsx: rounded-full surface-container-high pill, focus → elevation-2 + surface-container-highest, leading icon (default 'search'), trailingIcons rendered as inline m3-state icon buttons w/ Ripple, Enter → onSubmit, sizes sm/md/lg (40/56/72)
- Autocomplete.tsx: outlined md-size combobox with rotating 'arrow_drop_down' toggle; case-insensitive includes filter; AnimatePresence menu (surface-container, elevation-2, rounded-lg, fade/scale on springs.fastSpatial); rows h-12 with hover state layer + selected check; keyboard ArrowUp/Down highlight, Enter select, Escape close; document pointerdown outside-click close; "No matches" empty state; combobox/listbox ARIA
- Checkbox.tsx: 48px touch target, 18px rounded-[2px] box; animated checkmark via motion.path pathLength 0→1 on springs.expressive (stroke-m3-on-primary / on-error); indeterminate white dash springs in; error recolors box/check/ripple; press squashes box (0.85) on expressive spring
- Radio.tsx: 48px target, 20px ring, inner 10px dot animates scale 0→1 on springs.expressive; checked ring border-m3-primary
- Switch.tsx: 52×32 track (off: surface-container-highest + outline border; on: primary), thumb 16→24px slides x on springs.defaultSpatial, press squashes thumb to 28px (x clamps 0/20), on-thumb 'check' MaterialSymbol on on-primary, AnimatePresence fade
- Slider.tsx: M3E thick slider — 16px rounded track (primary active / surface-container-highest rest), 4×44px tall thin handle widening to 6px when hovered/dragged; pointer capture drag with clamp + step snapping; keyboard role="slider" (arrows, Home/End); showValueLabel bubble (bg-m3-primary, md-label-medium) springs in via AnimatePresence; discrete tick dots (capped 24); disabled state
- Chip.tsx: assist/filter/input/suggestion variants; sizes xs/sm/md (28/32/40); rounded-full px-4 md-label-large; elevated → elevation-1 surface-container-low; selected filter/assist → secondary-container + AnimatePresence leading 'check' (width 0→18 on fastSpatial); input chips get trailing 'cancel' span[role=button] (stopPropagation, Enter/Space support) calling onRemove; press scale 0.96 springs.fastVisual; Ripple + m3-state
- All 8 metas: category textinput (TextField/SearchBar/Autocomplete) / selection (rest), official-style descriptions, full PropDoc[], whenToUse/anatomy/states/dos/donts, exampleCode, related, demoName; sliderMeta.m3e = true
- inputs-demos.tsx: 8 interactive demos (controlled state, error/disabled/indeterminate/elevated/discrete states shown) + `inputsDemoMap: Record<string, React.ComponentType>` keyed by component id
- tsc --noEmit note: pre-existing project-wide framer-motion 12.26 type issue — tokens.ts springs widen `type: "spring"` to string (SpringOptions has no `type`), so `transition={springs.x}` errors (also in reference Button.tsx and other agents' files). Fixed WITHOUT touching tokens.ts: each component file locally retypes the imported token springs `const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition }` — call sites keep the exact `springs.x` reference style. VERIFIED: tsc filtered to (TextField|SearchBar|Autocomplete|Checkbox|Radio|Switch|Slider|Chip|inputs-demos) → 0 errors

Stage Summary:
- New components: src/components/m3/{TextField,SearchBar,Autocomplete,Checkbox,Radio,Switch,Slider,Chip}.tsx — each exports component + `<id>Meta` (ids: text-field, search-bar, autocomplete, checkbox, radio, switch, slider, chip)
- Demos: src/components/showcase/demos/inputs-demos.tsx exports TextFieldDemo, SearchBarDemo, AutocompleteDemo, CheckboxDemo, RadioDemo, SwitchDemo, SliderDemo, ChipDemo + inputsDemoMap
- Registry integration note: <id>Meta importLines assume `@/components/m3` barrel (index.ts owned by another task); demos import per-file paths so they work before the barrel lands
- Springs typing quirk documented above — future batches can reuse the one-line `springsTokens as Transition` retyping or fix tokens.ts centrally (out of scope for 3-b)
---
Task ID: 3-a
Agent: actions-batch
Task: Actions components batch — IconButton, FAB, ExtendedFab, FabMenu, SplitButton, ButtonGroup, SegmentedButton + actions-demos.tsx

Work Log:
- Created `src/components/m3/IconButton.tsx` — standard/filled/tonal/outlined, sizes 28/36/40/48/64, toggleable with controlled/uncontrolled selection, spring icon pop on toggle (keyed remount + expressiveEffects spring), selected→primary-container for standard/outlined, Ripple + m3-state, opacity-38 disabled, `iconButtonMeta`
- Created `src/components/m3/FAB.tsx` — colors primary/secondary/tertiary/surface (exported shared `fabColorStyles` map + `FabColor`/`FabSize` types), sizes 40/56/96/132, rounded-2xl, elevation 3→4 on hover (1→2 when lowered) via state-driven classes, whileHover 1.03 / whileTap 0.94 with springs.expressive, `fabMeta`
- Created `src/components/m3/ExtendedFab.tsx` — reuses fabColorStyles, h-56 px-5 gap-3 md-label-large, icon+label, same FAB motion/elevation, `extendedFabMeta`
- Created `src/components/m3/FabMenu.tsx` (M3E) — vertical/horizontal expansion, main small FAB with 'edit' icon rotating 45° when open, staggered action FABs (delay i*0.03, scale/opacity 0→1, springs.expressive) with AnimatePresence exit, inverse-surface label chips, 32px primary-container action FABs, controlled (open/onOpenChange) or uncontrolled, `fabMenuMeta` (m3e: true)
- Created `src/components/m3/SplitButton.tsx` (M3E) — joined pill segments in overflow-hidden wrapper (dropdown rendered OUTSIDE the clip as sibling), 1px bg-current/20 divider, right 40px arrow segment rotates arrow_drop_down 180° when open, AnimatePresence scale/fade menu on bg-m3-surface-container m3-elevation-2 rounded-lg, outside-pointerdown + Escape close via document listeners, sm/md/lg 40/56/76, `splitButtonMeta` (m3e: true)
- Created `src/components/m3/ButtonGroup.tsx` (M3E) — 4px-gutter pill group, outlined/filled/tonal variants, none/single/multiple selection with controlled `value: string[]` or internal state, variableWidths hover/selected flexGrow 1.4 with springs.defaultSpatial (per-value transition map so tap keeps fastVisual), Ripple + m3-state per segment, `buttonGroupMeta` (m3e: true)
- Created `src/components/m3/SegmentedButton.tsx` — connected pill outline container, flex-1 segments, type single/multiple with `value?: string | string[]` union callback, AnimatePresence width-animated leading 'check', always-on segment dividers, whileTap 0.97 fastVisual, sm/md 40/56, `segmentedButtonMeta`
- Created `src/components/showcase/demos/actions-demos.tsx` — ButtonDemo (existing Button: 5 variants, 5 sizes, loading, icons, disabled), IconButtonDemo (variants/sizes/toggleable), FabDemo (colors/sizes/lowered/disabled), ExtendedFabDemo, FabMenuDemo (vertical/horizontal/controlled + last-action feedback), SplitButtonDemo (variants/sizes/selection feedback), ButtonGroupDemo (single/multiple/filled/tonal/variableWidths), SegmentedButtonDemo (single/multiple/icon-only/disabled), + `actionsDemoMap` for 8 ids
- All motion goes through a tiny per-file `spring()` shim that re-pins tokens' widened `type: string` to the literal "spring" required by framer-motion's Transition union (zero casts, tokens values preserved)

Issues & Notes:
- Pre-existing project-wide tsc errors exist in OTHER files (tokens.ts `satisfies` widens `type` to string → every motion `transition={springs.x}` errors; also examples/, skills/, and other agents' components e.g. Autocomplete/Badge/Banner/BottomSheet/List/Menu/NavigationBar and reference Button.tsx itself). Not touched per scope rules — future batches can adopt the same `spring()` shim or fix tokens.ts with `as const`-style typing
- Component props extending ButtonHTMLAttributes use `Omit<..., "onAnimationStart"|"onAnimationEnd"|"onAnimationIteration"|"onDragStart"|"onDrag"|"onDragEnd">` because framer-motion's HTMLMotionProps redefines those handlers; spreading raw DOM handlers onto motion.button is a type conflict
- tsc now reports ZERO errors for all 8 files in this batch

Stage Summary:
- Actions category complete: 8 components with full M3ComponentMeta (id/name/category/description/importLine/variants/props/guidelines/exampleCode/m3e/related/demoName)
- m3e-flagged: fab-menu, split-button, button-group
- Demo contract honored: per-file imports (no barrel), `actionsDemoMap` keyed by meta ids
- Reusable exports for next batches: `FabColor`, `FabSize`, `fabColorStyles` from FAB.tsx
---
---
Task ID: 3-d
Agent: navigation-batch
Task: Navigation components batch — Tabs, NavigationBar, NavigationDrawer, NavigationRail, TopAppBar, BottomAppBar, Toolbar (M3E), Menu + navigation-demos.tsx

Work Log:
- Wrote `src/components/m3/Tabs.tsx`: primary (icon+label columns, 64dp, sliding 3px underline) + secondary (tonal pill) variants; shared-layout indicator via framer-motion layoutId + springs.expressive; horizontal scroll (m3-scroll); Ripple + m3-state per tab; badge support.
- Wrote `src/components/m3/NavigationBar.tsx`: 80dp surface-container bar, flex-1 destinations, icon capsule pill (layoutId "m3-nav-pill*"), filled active icon, count/dot badges, labels md-label-medium.
- Wrote `src/components/m3/NavigationDrawer.tsx`: modal (fixed z-[75], scrim bg-m3-scrim/50 fade + 320dp rounded-r-3xl panel slide with springs.defaultSpatial, Escape + scrim-click close, controlled/uncontrolled open) + standard (280dp rounded-3xl bordered static); 56dp pill items with trailing badges; header/footer slots.
- Wrote `src/components/m3/NavigationRail.tsx`: 80dp surface-container-low rail, header slot (FAB), 56×32 icon capsule pill (layoutId "m3-rail-pill*"), foldingLine hinge divider option.
- Wrote `src/components/m3/TopAppBar.tsx`: all 4 variants (small/center 64dp, medium 112dp, large 152dp); scroll observation via scrollTargetRef or window; scrolled → bg-m3-surface-container + m3-elevation-2; flexible titles collapse 112/152→64dp via motion height animation + AnimatePresence crossfade of bottom headline ↔ top-row md-title-large; back + action icon buttons.
- Wrote `src/components/m3/BottomAppBar.tsx`: 80dp surface-container bar, leading actions, trailing icons, center-docked notched FAB (inline motion.button, primary-container, elevation-3, M3E corner morph 16→28 + scale on press).
- Wrote `src/components/m3/Toolbar.tsx` (M3E, m3e: true): floating pill (absolute top/bottom, centered, width default 560, 4 color roles surface/primary/secondary/tertiary container pairs, active items get on-container/12 pill + filled icon) + dockable (pill ↔ square full-width elevation-1 bar via docked prop).
- Wrote `src/components/m3/Menu.tsx`: trigger cloning (preserves original onClick, no nested buttons), items/dividers/labels with icons 20dp, shortcuts, disabled 38%, destructive error color; panel surface-container rounded-[4px] elevation-2, scale 0.9/y-4 → 1 with springs.fastVisual, origin per placement; outside mousedown + Escape close.
- Wrote `src/components/showcase/demos/navigation-demos.tsx`: 8 demos (TabsDemo, NavigationBarDemo, NavigationDrawerDemo, NavigationRailDemo, TopAppBarDemo, BottomAppBarDemo, ToolbarDemo, MenuDemo) + navigationDemoMap; app-bar/nav demos framed in rounded-2xl bordered containers; TopAppBar demos use inner h-48 scrollable divs via useRef scrollTargetRef with tall filler; Toolbar demo includes dock/undock Button toggle; Menu demo shows icons, shortcuts, divider, disabled + destructive items.
- Each m3 file: 'use client', named component export + <id>Meta: M3ComponentMeta (id, category 'navigation', full PropDocs, guidelines with whenToUse/anatomy/states/dos/donts, exampleCode, related, demoName); local duplicated NavItem interface; only react/framer-motion/cn/tokens/types/Ripple/MaterialSymbol imports.

Stage Summary:
- Notes for other agents:
  1. layoutId pills are namespaced per instance with React.useId() (e.g. `m3-nav-pill-:r1:`) so multiple instances on one page don't share-layout into each other; spec names kept as prefixes.
  2. IMPORTANT: framer-motion 12.26 deprecated `Spring` type no longer declares `type`, so `springs` in tokens.ts widens `type` to `string` and `transition={springs.x}` fails tsc (TS2322) — this hits Button.tsx and other batches too. Fix centrally by adding `as const` on each spring or typing the object; meanwhile each 3-d file carries a tiny local `spring()` helper that re-narrows `{...s, type: "spring"}` to Transition. Remove helpers once tokens.ts is fixed.
  3. `.md-label-*` classes are unlayered CSS (font-weight 600) and override Tailwind font-weight utilities — do not rely on `font-medium` on top of them.
  4. `Fab` from '@/components/m3/FAB' exists (created by another batch) but the rail demo uses an inline mini-FAB to stay self-contained.
---
Task ID: 3-e
Agent: containment-batch

Task: Containment components batch — Card, List/ListItem, BottomSheet, SideSheet, DatePicker, TimePicker + containment-demos.tsx

Work Log:
- Read worklog + Button.tsx reference, types.ts, tokens.ts, Ripple.tsx, MaterialSymbol.tsx, globals.css before writing
- Wrote `src/components/m3/Card.tsx` — elevated/filled/outlined variants on rounded-[20px]; interactive mode (default derived from onClick) gets m3-state, Ripple, role="button" + tabIndex + Enter/Space activation, whileTap scale 0.97 with springs.expressive; elevated+interactive lifts to elevation 2 on hover. NOTE: `.m3-elevation-*` are plain CSS classes so Tailwind `hover:m3-elevation-2` generates nothing; used a Tailwind arbitrary property `hover:[box-shadow:...]` (exact M3 level-2 values) so the hover elevation transition actually animates
- Wrote `src/components/m3/List.tsx` — List (ul, dividers via divide-y divide-m3-outline-variant, m3-scroll) + ListItem (headline/supporting/overline/leading w-10/trailing/trailingIcon/selected/disabled/onClick); min-h-14 single-line → min-h-[72px] with supporting; interactive rows are motion.button with Ripple + m3-state + whileTap 0.98; selected = secondary-container with matching leading/trailing colors
- Wrote `src/components/m3/BottomSheet.tsx` — fixed inset-0 z-[85], scrim fade, rounded-t-[28px] sheet with drag handle, y 100%→0 on springs.defaultSpatial, drag-to-dismiss (offset.y > 120), Escape close + body scroll lock, scrollable content + footer
- Wrote `src/components/m3/SideSheet.tsx` — modal (scrim, side left/right with mirrored corner rounding, x ±100%→0 springs.defaultSpatial, Escape + scroll lock) and standard (inline h-[320px] bordered panel, open ignored by design)
- Wrote `src/components/m3/DatePicker.tsx` — internal month cursor, Sunday-start 6×7 grid, tappable "Month Year" header → 4-col year grid (1988→current+10, auto-scrolls to highlighted year), today outlined in primary, selected day pill via motion.span layoutId="m3-day-pill" + springs.expressive, min/max clamping with opacity-38 disabled days, prev/next (month or ±12y in year view)
- Wrote `src/components/m3/TimePicker.tsx` — display readout (hour/minute segments switch editing mode), AM/PM column (12h), 256px dial with trig-positioned numbers (radius 104), minute marks n×5, 36px primary selection pill (springs.expressiveEffects scale), spring-animated hand (animate rotate) + center dot, auto hour→minute switch after 600ms in 12h mode; use24h keeps the 12-ring and preserves AM/PM state (documented in meta)
- Wrote `src/components/showcase/demos/containment-demos.tsx` — CardDemo (3 variants, interactive w/ icon + nested button w/ stopPropagation), ListDemo (icons, selected, trailing text + trailingIcon, dividers), BottomSheetDemo (8-item scrollable playlist sheet w/ footer), SideSheetDemo (modal + standard inline), DatePickerDemo (controlled + readout chip), TimePickerDemo (controlled + readout), plus containmentDemoMap
- TS FIX (important for other agents): framer-motion 12 rejects tokens.ts springs because `satisfies Record<string, Spring>` widens `type` to `string` while Transition requires the `"spring"` literal → this is the pre-existing error in Button.tsx/IconButton/FAB/etc. Fixed per-file WITHOUT touching tokens.ts using a local helper: `const spring = (s: M3Spring): Transition => ({ ...s, type: "spring" });` and passing `transition={spring(springs.x)}`. Recommend a follow-up fix inside tokens.ts itself, then the helper can be deleted everywhere. Same pattern fixed the scrim fade: spring transition instead of `ease: easings.standard` (framer's Easing type only accepts named strings or a 4-number tuple, not the cubic-bezier string)
- Card props extend `Omit<React.ComponentPropsWithoutRef<typeof motion.div>, "children">` so the rest-spread into motion.div typechecks (raw React HTMLAttributes conflict with framer's onDrag/onAnimationStart signatures)

Stage Summary:
- New components ready for registry/index: card, list (List+ListItem), bottom-sheet, side-sheet (containment) + date-picker, time-picker (selection); each file exports the component(s) + `<id>Meta: M3ComponentMeta`
- Demos exported: CardDemo, ListDemo, BottomSheetDemo, SideSheetDemo, DatePickerDemo, TimePickerDemo + containmentDemoMap in src/components/showcase/demos/containment-demos.tsx
- `bunx tsc --noEmit` reports ZERO errors in all 7 files of this batch (remaining project errors are the same pre-existing Transition-type issue in Button/IconButton/FAB/SegmentedButton/SplitButton/ButtonGroup from other batches)
- Did NOT touch: index.ts, registry.ts, page.tsx, layout.tsx, globals.css, tokens.ts or any file outside the assigned list
---
Task ID: 4-6
Agent: orchestrator (Z.ai Code)
Task: Agentic API layer + docs showcase + E2E verification & fixes

Work Log:
- Created src/components/m3/index.ts (public barrel: 39 components + primitives + tokens + registry)
- Created src/lib/m3/registry.ts (aggregates metas into M3Registry; getComponent/searchComponents/getComponentsByCategory)
- Created API routes: /api/registry (full|?component=|?q=|?summary|?tokens), /api/agent (capability manifest + design rules + import map), /llms.txt (llms.txt-convention handbook)
- Fixed centrally: tokens.ts springs typing (Transition factory — kills the TS2322 spring-literal issue in all 40 files); rewrote Ripple to capture-phase parent listener + restored disabled prop; fixed 7 narrow spring() helper signatures; fixed Button props motion-conflict Omit
- Built showcase: page.tsx (hash router, top bar, sticky footer, mobile drawer), Sidebar (search + categorized nav), HomeView (hero, M3E cards, motion strip, quick start), FoundationsView (color/typography/shape/elevation/motion/state-layers/icons incl. spring playground + icon axis playground), ComponentView (live demo stage, usage code, guidelines, props table, related, prev/next), AgentView (endpoints + system-prompt snippet), CodeBlock (copy + lightweight JSX highlighter), demo-registry.ts (5 demo maps merged)
- BUG FIX (critical): 'use client' component files export client-reference proxies to server code — registry metas were empty in API routes. Solution: wrote extraction script that moved all 39 metas into server-safe src/lib/m3/meta.ts (single source of truth); component files now re-export their meta from it; registry imports from meta.ts
- BUG FIX: framer-motion "Only two keyframes supported with spring" — MotionTab spring playground used 3-keyframe borderRadius with spring transition; fixed with per-value transition (x: spring, borderRadius: tween). NOTE: this crash permanently kills framer's scheduler for the whole browser session — always close+reopen browser after such crashes
- BUG FIX: Tabs secondary active label invisible (label span lacked `relative`, pill painted over it)
- BUG FIX: replaced invalid 'brochure' Material Symbol with 'widgets'
- BUG FIX: demo stage overflow-hidden clipped Menu dropdown — removed, rounded header explicitly
- Self-hosted fonts: public/fonts/{material-symbols-rounded,roboto-flex-latin}.woff2 + fonts.css; layout.tsx now uses /fonts/fonts.css (no external dependency; icons never break)
- Verified via agent-browser: home (light+dark), FAB/Dialog/Menu/LoadingIndicator/DatePicker pages, foundations tabs + spring playground, agents page, mobile 390px + NavigationDrawer, all API endpoints, llms.txt; tsc 0 src errors; lint 0 errors

Stage Summary:
- COMPLETE LIBRARY: 39 components + MaterialSymbol + Ripple + tokens; 7 flagged m3e (fab-menu, split-button, button-group, loading-indicator, slider, top-app-bar, toolbar)
- Agentic surface: /api/agent → /api/registry[?component|q|summary|tokens] → /llms.txt; metadata = props schemas + official guidelines + examples
- Architecture lesson recorded: keep shareable data modules free of 'use client'; metas live in src/lib/m3/meta.ts
- All user-visible routes: single page / with hash routing (#/component/<id>, #/foundation/<tab>, #/agents)
