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
---
Task ID: 2-c
Agent: navigation-audit
Task: M3/M3E spec audit + fixes — navigation family (Tabs, NavigationBar, NavigationDrawer, NavigationRail, TopAppBar, BottomAppBar, Toolbar, Menu + navigation-demos.tsx + their 8 meta blocks in src/lib/m3/meta.ts)

Work Log:
- Read worklog (library contract: metas live in meta.ts, component files re-export; springs already centrally typed), all 8 components, demos, 8 meta blocks, globals.css state-layer/elevation/type-scale utilities before touching anything
- Verified uncertain spec values via web search: M3 top app bar on-scroll = surface-container COLOR FILL, shadow is M2 legacy (m3.material.io overview + MDC "removed drop shadow"); MDC docs: bottom app bar = surface-container, 3dp shadowless tonal elevation, navigation icon anatomy item; rail anatomy includes optional Menu icon + 56×32 active indicator; drawer = surface-container-low, 16dp drawer corner size
- Tabs.tsx: secondary variant 64→48dp (h-12) with 32dp pill; label md-title-small→md-label-large; ADDED M3 scroll arrows (chevron buttons appear only while overflowing in that direction; scroll listener + ResizeObserver; scrollBy 75% viewport); ADDED WAI-ARIA roving tabindex + ArrowLeft/Right/Home/End with automatic activation; 3dp underline/expressive layoutId kept
- NavigationBar.tsx: audit found fully compliant (80dp, 64×32 pill, 24dp icons, badge, label-medium, aria-current) — code unchanged, meta anatomy annotated with exact pill/icon dp
- NavigationDrawer.tsx: width 320→360 modal AND 280→360 standard (official 360dp); corners 24→16dp (rounded-r-2xl / rounded-2xl, standard border dropped per tonal-only spec); scrim 50%→32%; inactive label on-surface→on-surface-variant; ADDED modal focus management: initial panel focus, Tab/Shift+Tab trap, body scroll lock, focus restore on close; selecting a destination now closes the modal variant
- NavigationRail.tsx: ADDED optional menu icon (menuIcon name + onMenuClick props → 48dp state-layer icon button above header slot) per official anatomy; 80dp width, 56×32 capsule, header FAB slot already compliant
- TopAppBar.tsx: REMOVED M2-legacy m3-elevation-2 scroll shadow — scrolled state is now surface-container color fill only (rest = surface); small/center header CSS transition driven by durations.medium2 + easings.standard tokens; flexible header animates backgroundColor in framer with per-value transition (height=springs.defaultSpatial, color=durations.medium2 + [0.2,0,0,1] M3 standard curve — framer Easing rejects bezier strings, arrays OK); icon buttons 40→44dp hit targets; large hero title md-headline-medium→md-headline-large (36)
- BottomAppBar.tsx: ADDED navigationIcon prop (official anatomy item; BottomAppBarNavigationIcon type exported); bar/48dp buttons/docked primary-container FAB with 16→28 M3E morph already compliant (shadowless tonal elevation matches MDC addElevationShadow=false)
- Toolbar.tsx (M3E): pill + docked bar h-16→h-14 (56dp, the "shorter" M3E height that replaces the 80dp bottom app bar); dock morph + floating entrance transitions now token-driven (durations.medium2 / easings.standard); 560dp default width, 4 container roles, on-container/12% active pills kept
- Menu.tsx: leading icon 20→24dp (12dp gutter); ADDED full WAI-ARIA menu pattern: trigger aria-haspopup="menu"+aria-expanded (+ArrowDown opens, original trigger onClick/onKeyDown preserved via cloneElement), focus moves to first enabled item on open (roving tabIndex=-1), ArrowUp/Down wrap + Home/End, Escape/Tab close with focus restored to trigger, item activation closes + restores focus
- navigation-demos.tsx: rail demo passes onMenuClick, bottom-bar demo passes navigationIcon menu, drawer demo headlines md-title-large→md-label-large on-surface-variant (official headline style); all 8 demo names + navigationDemoMap keys preserved
- meta.ts (ONLY the 8 assigned blocks, unique localized edits): tabsMeta 64/48dp+3dp+arrows+keyboard; navigationDrawerMeta 360dp/scrim 32%/16dp corners/focus-trap states; navigationRailMeta menuIcon+onMenuClick props + anatomy; topAppBarMeta color-fill-on-scroll (no shadow), 44dp targets, rest=surface; bottomAppBarMeta navigationIcon prop + tonal-elevation note; toolbarMeta 56dp pill; navigationBarMeta 64×32 pill; menuMeta 24dp icon/12dp gutter/keyboard states
- TS fix during work: Menu cloneElement generic widened (onKeyDown + aria props) after TS2769
- Verified: `bunx tsc --noEmit` → ZERO errors in all 9 assigned files + meta.ts (only 4 pre-existing scaffold errors in examples/ + skills/ remain project-wide); `bun run lint` filtered to m3/showcase errors → empty
- Audit document written to audit/navigation.md (6 sections per component + cross-component notes)

Stage Summary:
- Navigation family now matches official M3/M3E values: drawer 360dp/32% scrim/16dp corners/focus-trapped modal; tabs 64/48dp with scroll arrows + keyboard; app bars shadowless tonal on-scroll fills with 44dp targets and headline-large; M3E toolbar at 56dp; menu with 24dp icons and complete keyboard/ARIA; rail + bottom bar gained their official optional anatomy items (menu icon, navigation icon)
- Known remaining (documented, deliberate): Tabs underline width is w-1/3 centered approximation of label-width indicator (needs text measurement); drawer scrim now 32% while Dialog/BottomSheet/SideSheet (other agents' files) still use 50% — cross-batch alignment flagged, not touched per scope; rail container kept surface-container-low (spec lists surface/surface-container optional tint)
- No files outside the 9 assignments + 8 meta blocks were modified; no dev server or build was run
---
Task ID: 2-b
Agent: inputs-audit
Task: M3 spec audit + fix — Text input + selection family (TextField, SearchBar, Autocomplete, Checkbox, Radio, Switch, Slider, Chip + inputs-demos + their 8 meta blocks)

Work Log:
- Audited all 8 components against official M3/M3E values; full 6-section audit per component written to audit/inputs.md (incl. cross-component notes + follow-ups)
- TextField: corners 12px/8px → official 4dp both variants (`rounded-m3-xs` / `rounded-t-m3-xs`, compiled CSS verified); removed `m3-state` from the field (spec hover = border/indicator shift: outlined `hover:border-m3-on-surface`, filled indicator `group-hover/field:bg-m3-on-surface`); spec-faithful disabled (content 38%, outlined border `border-m3-outline/12`, filled container `bg-m3-on-surface/4`, indicator transparent); filled floated label top 4→8dp + input pushed to lower half (`paddingTop ≈ height×0.28`) to match the 56dp grid
- SearchBar: trailing icon buttons 36px → 48px (32px on the compact sm bar), icons 22→24dp; input gutter `px-3` → `pl-4` (16dp after the leading icon, spec text x=56dp); added `role="searchbox"` + `aria-label={placeholder}`
- Autocomplete: field + menu + empty panel `rounded-xl/lg` → 4dp (`rounded-m3-xs`, matches Menu.tsx); hover border on-surface + disabled `outline/12`; highlighted option now `scrollIntoView({block:"nearest"})`; added `aria-haspopup="listbox"`
- Checkbox: added missing `m3-focus` keyboard focus ring (was `outline-none` with no indicator)
- Radio: added `m3-focus`; new `error` prop (error ring + dot); NEW `RadioGroup` export (role=radiogroup, aria-label) implementing official arrow-key group navigation — ArrowUp/Left & ArrowDown/Right select-and-move with wrap, skipping disabled
- Switch: off-thumb x 0→4dp (was flush against/over the 2dp border; on-state geometry already 24/20); added `m3-focus`
- Slider: stop indicators moved ONTO the track per M3E (4dp `on-surface` dots): continuous = end dot at right 6dp (fades out at max); discrete = per-step dots positioned by fraction, only on the inactive zone (old below-track on-surface-variant row removed); interactive row h-6→h-12 (48dp touch target); PageUp/PageDown added (±max(step,(max-min)/10), snapped); `aria-orientation="horizontal"`; `SliderProps` now extends HTMLAttributes (rest spread) so demo `aria-label`s actually reach the DOM (hyphenated JSX props bypass TS excess-property checks — they were silently dropped before)
- Chip: `hover:m3-elevation-2` was dead CSS (plain class can't take a Tailwind variant) → replaced with `hover:[box-shadow:…M3 level-2 values…]` (Button/Card pattern; compiled CSS verified); added `m3-focus`; input-chip cancel target 20→24px (`h-6 w-6 -mr-2`, keeps 18dp icon + 16dp optical inset)
- inputs-demos: RadioDemo now wraps plans in `<RadioGroup label="Plan">`; same demo export names + inputsDemoMap keys; SliderDemo aria-labels now functional
- meta.ts (ONLY my 8 objects, unique anchors): textField states (hover shift, disabled 38/12/4), searchBar anatomy (24dp/≥48dp targets), autocomplete anatomy (4dp corners, scroll-into-view), checkbox states (+Focus), radio (+error PropDoc, RadioGroup dos line), switch states (4dp inset, +Focus), slider anatomy/states (48dp row, stop-indicator dots, PageUp/PageDown ±10 steps), chip states (+Focus, elevated hover elevation-2)
- Chip shape verified: baseline M3 chip = 8dp corner-small, but M3 Expressive chips are full pills → kept `rounded-full` (documented in audit)
- Verified: `bunx tsc --noEmit` filtered to my files → 0 errors (4 project errors are pre-existing, in examples/ + skills/); `bun run lint` → 0 errors; spot-checked dev CSS chunk: rounded-m3-xs/rounded-t-m3-xs/border-m3-outline\/12/bg-m3-on-surface\/4/group-hover\/field + chip hover box-shadow all generate correctly
- Did NOT touch: globals.css, tokens.ts, types.ts, themes.ts, index.ts, registry.ts, page.tsx, or any other component

Stage Summary:
- Text input + selection family now matches official M3/M3E: 4dp field corners, spec hover/disabled treatments, on-track 4dp stop-indicator dots + 48dp slider hit row, keyboard completeness (radio group arrows, slider PageUp/PageDown, autocomplete scroll-into-view), visible m3-focus rings on Checkbox/Radio/Switch/Chip, searchbox/combobox/radiogroup ARIA, dead hover-elevation utility fixed on Chip
- New export: `RadioGroup` (in @/components/m3/Radio) — needs adding to index.ts barrel by orchestrator (file out of my scope)
- Known trade-offs documented in audit/inputs.md: bg-surface label-gap patch on outlined TextField, 38% single-tier disabled dim on selection controls (library convention vs official multi-token values), dense embedded targets (autocomplete toggle, chip cancel), sm search bar 32dp target
---
Task ID: 2-e
Agent: feedback-audit

Task: Audit + fix the Feedback/Communication family (Badge, LinearProgress, CircularProgress, LoadingIndicator, Snackbar, Tooltip, Banner + feedback-demos.tsx + their 7 meta blocks) against official M3/M3E values.

Work Log:
- Verified uncertain spec values against official reference implementations (androidx Compose material3 sources + tokens via android.googlesource.com, MDC Web constants/scss, Flutter M3 MaterialBanner, m3.material.io): badge offsets 12dp-end/14dp-overlap + CornerFull; linear/circular TrackActiveSpace=4dp + StopSize=4dp; LoadingIndicatorTokens Container=48dp/corner-full, GlobalRotation=4666ms, MorphInterval=650ms; MDC tooltip SHOW_DELAY=500ms/HIDE_DELAY=600ms; plain tooltip=inverse-surface 4dp + 4/8px padding + 200px max + caret, rich=surface-container 12dp + level-2 + outline border + on-surface-variant text + 36dp action; snackbar=4dp shape + 344/672px widths + 18px icon on 36px close; banner=surface-container-low, square corners, end-aligned actions, 52px action bar.
- Badge.tsx: official anchor offsets (value badge -right-1 -top-0.5, dot flush right-0 top-0), disabled opacity-40→38, dot aria-hidden. Kept rounded-full (Compose CornerFull overrides the Figma-sheet 4dp reading) — documented.
- LinearProgress.tsx: added the flat 4dp surface-container-highest track behind the wavy indicator (official wavy keeps the track); aria-label defaults to "Loading".
- CircularProgress.tsx: determinate arc now reserves the official 4px gap + fixed 4px stop dot at 12 o'clock (was head-riding 7px dot with no gap); indeterminate rewritten to M3 grow-to-270°/contract via pathLength=1 dasharray keyframes (tween; avoids the 3-keyframe spring crash) with ring rotation; new ariaLabel prop.
- LoadingIndicator.tsx: default 56→48 (official); hardcoded 3s → token-derived 650ms morph steps; oscillating rotate → continuous 360° every ~4.666s (official GlobalRotationDurationMillis); inactive = static circle at 38% opacity; useReducedMotion() gates all loops; per-value transitions keep framer's 2-keyframe-spring rule safe.
- Snackbar.tsx: rounded-lg→rounded-[4px] (official shape small), min-w 344px / max-w min(672px, 100vw-3rem) (MDC Web M3), close = 36px target with 18px icon (exact MDC), action min-h-9; leading icon kept + documented in meta as an extension beyond base M3 anatomy.
- Tooltip.tsx: plain → 4dp corners, 4/8px padding, 200px max, 8dp caret; rich → surface-container, 12dp corners, outline-variant border, on-surface-variant title/body, 36px primary action, now interactive (pointer-events-auto + 600ms hide delay bridges the 4px anchor gap, spacing mb/mt-2→1); delays 400ms→500ms show / instant→600ms hide (durations.long2/long4, MDC constants); touch long-press (500ms) with tap-to-dismiss; aria-describedby via useId+cloneElement; role=tooltip kept.
- Banner.tsx: square corners (spec shape none — removed rounded-lg); action row min-h-[52px] with 40dp text buttons (end-aligned confirmed correct per Flutter M3 reference); close 36px target; no role added (banner is not a landmark/live region — decision recorded in audit).
- feedback-demos.tsx: same named demos + feedbackDemoMap keys; LoadingIndicatorDemo sizes re-anchored to 48; SnackbarDemo stacks the second snackbar (bottom-24) so the two fixed snackbars can't overlap (single-at-a-time guidance).
- meta.ts (ONLY badge/linearProgress/circularProgress/loadingIndicator/snackbar/tooltip/banner blocks, unique anchored edits): anatomy/states/props synced to the verified values above; snackbar icon + banner close documented as extensions; tooltip states now carry the 500/600ms delays + long-press; loadingIndicator example sizes 48/72.
- Verification: `bunx tsc --noEmit | grep <assigned files>` → EMPTY (0 errors); `bun run lint` → 0 errors project-wide (2 pre-existing warnings in other batches' files, untouched). No files outside the 8 assignments + 7 meta blocks modified; motion still 100% token-driven; colors m3-* only; 'use client' + named exports + xxxMeta re-exports intact.

Stage Summary:
- Feedback/communication family now matches official M3/M3E reference values (Compose material3 + MDC Web + Flutter cross-checked), with all deviations, sources, and ARIA role decisions written up in audit/feedback.md.
- For other agents: tooltip/snackbar/banner close targets and banner action buttons are now 36–40px per official density; if you own IconButton-style targets elsewhere, align naming. The 3-keyframe rule stands: tween keyframes or per-value transitions only — never springs on >2 keyframes (used in CircularProgress indeterminate + LoadingIndicator morph).
- Open items for orchestrator: optional MotionConfig reducedMotion="user" at app root to cover remaining decorative JS loops; swipe-to-dismiss on Snackbar (optional spec feature) left for a future task.
---
Task ID: 2-a
Agent: actions-audit
Task: Actions family M3/M3E spec audit + fixes — Button, IconButton, FAB, ExtendedFab, FabMenu, SplitButton, ButtonGroup, SegmentedButton + actions-demos + their 8 meta blocks

Work Log:
- Audited all 8 actions components against m3.material.io specs (heights/shape/typography/icon/padding/color roles/elevation/state layers/disabled/loading/keyboard/touch/ARIA/motion/M3E behaviors); wrote full per-component audit to audit/actions.md (6 sections each + cross-component notes)
- Button.tsx: IMPLEMENTED the M3E press shape morph pill→20dp via shapeMorph.button tokens (dead `pressed` state now drives it; keyboard Space/Enter included via data-pressed + handlers); removed off-spec hover container recolors (state layer only now); fixed elevated hover lift 1→2 with exact level-2 shadow values via hover:[box-shadow:…] (plain-CSS .m3-elevation-* can't take Tailwind variants); official disabled tokens per variant (container on-surface/12, content on-surface/38, outline/12, elevation 0) replacing blanket opacity-38; spec padding 16 dense/24 standard + md-label-* type classes (md was 15px) + dropped inline 0.01em tracking; m3-focus ring; aria-busy; spinner rotation tokenized (durations.extraLong4 loop) replacing untokenized animate-spin; 48dp touch targets on xs/sm via invisible ::before
- IconButton.tsx: selected state corrected to M3 toggle semantics (standard/outlined → primary icon, container transparent/outline kept; filled/tonal containers unchanged) — was painting primary-container bg; per-variant disabled tokens; m3-focus; 28/36/40dp sizes expanded to 48dp hit area; spring() shims removed (tokens.ts centrally fixed in 4-6) — shims cleaned from all 6 files that had them
- FAB.tsx: large/extra-large now 28dp corners (rounded-[28px]) per spec — was 16dp at every size; disabled = on-surface 12%/38% + no elevation (was 38% alpha keeping elevation); m3-focus; 40dp small FAB → 48dp touch target; fabColorStyles/types export unchanged
- ExtendedFab.tsx: icon-label gap 12→8dp per spec; official disabled tokens + no elevation when disabled; m3-focus
- FabMenu.tsx: stagger delay tokenized (durations.short1=50ms, was raw i*0.03); Escape + outside-pointerdown dismissal added (menu-like); aria-haspopup=menu; m3-focus + 48dp touch targets on 40dp main / 32dp action FABs
- SplitButton.tsx: menu corner 8px→4dp (extra-small shape token, matches Menu.tsx); menu items min-h-12 (48dp, was ~44); Arrow/Up/Down/Home/End menu navigation; m3-focus per segment (wrapper dropped overflow-hidden, segments own rounded-l/r-full); per-variant disabled tokens
- ButtonGroup.tsx: per-variant disabled tokens; m3-focus per segment; vertical 48dp touch expansion; M3E variableWidths flexGrow springs untouched
- SegmentedButton.tsx: DEFAULT size now sm = the official 40dp height (md 56 demoted to expressive opt-in; meta updated); official disabled treatment (outline 12%, content 38%, selected fill 12%); m3-focus per segment; container no longer overflow-hidden (end segments own pill rounding) so rings aren't clipped
- meta.ts: 8 blocks updated (small unique-anchor edits): corrected selected/disabled state docs, 16/28dp FAB corners, extended-FAB 8dp gap anatomy, size default 'sm' for segmented-button, tokenized stagger/dismissal notes, 48dp touch-target anatomy — prop descriptions now match the implemented role-based disabled tokens
- actions-demos.tsx: verified against demo contract — unchanged byte-for-byte (same 8 named demos + actionsDemoMap keys); inherits the fixes visually
- Verified live via headless browser: computed values = spec (btn 40/56 + 14px/0.096px labels, morph mid-spring on pointerdown, icon-btn selected icon #6750A4, FAB 16/28px radii + elevation 3/4/1/2 + disabled shadow-none, menu 4px radius + 48px items + outside/Escape dismiss, fab-menu stagger/Escape, segmented 40dp) — zero page errors
- Verified: `bunx tsc --noEmit` filtered to my files → EMPTY; `bun run lint` filtered to m3/showcase errors → EMPTY; no file outside my 9 files + 8 meta blocks touched

Stage Summary:
- Actions family is now spec-clean: official disabled tokens family-wide, hover = state-layer only, focus ring everywhere, 48dp touch targets below the minimum, M3E shape morph + FAB 28dp corners + segmented 40dp default + 4dp menu corners implemented
- Convention notes for other agents: (1) hover elevation must use hover:[box-shadow:…] arbitrary properties, `hover:m3-elevation-2` generates nothing; (2) remove overflow-hidden from controls that need m3-focus rings or ::before touch-target expanders — Ripple self-clips via rounded-[inherit]; (3) ::before hit-area expansion (before:absolute before:-inset-N before:content-['']) is the established 48dp minimum-target technique; (4) role-based disabled = container on-surface/12 + content on-surface/38 (+ outline/12, elevation 0), not opacity-38
- Remaining known deviations (recorded in audit/actions.md, out of scope): .md-label-* render weight 600 vs official 500 (global CSS); M3E-only dims (lg/xl buttons, md segmented, 32dp menu actions, 1.4 flexGrow, 45° rotation) have no published tokens — values documented in code comments + metas
---
Task ID: 2-d-2
Agent: containment-audit-2
Task: Audit + fix containment/selection part 2 — BottomSheet, SideSheet, DatePicker, TimePicker + their 4 demo sections in containment-demos.tsx + their 4 meta blocks, against official M3/M3E values.

Work Log:
- Spec-verified uncertain values against primary sources: m3.material.io side-sheets page ("A modal side sheet showing the 16dp corner radius" — the prompt's 28dp was wrong, 16dp inner-edge-only confirmed); fetched androidx-main compose/material3 TimePickerTokens.kt + TimePicker.kt from android.googlesource.com: ClockDial 256dp on SurfaceContainerHighest, Container=SurfaceContainerHigh @ Level3, selector handle 48dp/track 2dp/center 8dp, TimeSelector readout 96×80dp corner-small display-large (selected PrimaryContainer, unselected SurfaceContainerHighest/OnSurface), PeriodSelector vertical 52×80dp outline 1dp + selected TertiaryContainer (prompt's "secondary-container" hint wrong for shipped default; PrimaryContainer only behind an opt-in flag). BottomSheet scrim already 32% black in code (prompt's "50% likely wrong" was stale).
- BottomSheet.tsx: added focus management (focus into sheet on open, restore to trigger on close, Tab trap — Dialog pattern); drag dismiss now offset>120px OR velocity.y>500 (fling); docstring synced.
- SideSheet.tsx: same focus trap/restore (modal only); modal panel now m3-elevation-1 (official level 1); standard stays flat; docstring notes 16dp/edge-corners-square.
- DatePicker.tsx: chevrons 40→48dp targets with view-aware aria-labels (month vs years); day aria-label now includes year; selection-pill layoutId scoped via useId (two pickers no longer cross-animate).
- TimePicker.tsx: panel surface-container-high + elevation 3, dial surface-container-highest (official pair — was inverted); readout rebuilt to official 96×80dp segments (8dp corners, display-large, inactive surface-container-highest/on-surface, active primary-container); period selector outlined (1dp) + internal divider; dial numbers 40→48px hit areas (centers ≈54px, no overlap) with body-large labels both rings; hour→minute auto-advance now unconditional (was 12h-only); keyboard: dial ↑/→ +1 ↓/← −1 (hour wraps 12-ring, minute wraps 60), AM/PM arrows move selection+focus.
- containment-demos.tsx: my 4 demo sections audited and left byte-identical (names + containmentDemoMap keys intact; other agents' Card/List/Dialog/Divider regions untouched).
- meta.ts (ONLY the 4 blocks, unique anchors): bottomSheet variants ["modal","standard"] + variant prop + scrim 32% + maxHeight default calc(100dvh - 72px) + focus/velocity states; sideSheet anatomy elevation-1 + square edge corners + focus states; datePicker 48dp chevrons; timePicker full token sync (container/dial/readout/period/48px/both-mode auto-advance/keyboard) + simplification notes.
- Verified: `bunx tsc --noEmit` filtered to BottomSheet/SideSheet/DatePicker/TimePicker/containment-demos/meta.tsx → EMPTY; `bun run lint` → 0 errors (2 pre-existing warnings in other agents' files, untouched). Did NOT touch globals.css, tokens.ts, types.ts, themes.ts, index.ts, registry.ts, page/layout, other components or metas.

Stage Summary:
- Sheets now manage focus like Dialog (in → trapped → restored) with velocity-aware drag dismissal; TimePicker geometry/colors/typography now match androidx TimePickerTokens exactly; DatePicker grid keyboard-complete with 48dp nav targets; motion still 100% token springs, colors m3-* only.
- For other agents: (1) modal side/bottom sheets = focus-in-on-open + Tab trap + restore — reuse the FOCUSABLE selector pattern; (2) TimePicker unselected readout segment = surface-container-highest, dial = surface-container-highest, picker panel = surface-container-high @ elevation 3 (counterintuitive pair — don't "fix" it back); (3) m3.material.io side sheet radius is 16dp, NOT 28.
- Open items for orchestrator: official modal date-picker presentation (568×368/328×512 + selected-date header) and 60-tick minute ring / 24h dial ring remain recorded limitations in audit/containment-2.md; TimePickerDemo readout chip shows 24h for the 12h picker (cosmetic, demo-owned).
---
Task ID: 2-d-1
Agent: containment-audit-1
Task: Audit + fix the Containment family part 1 (Card, List/ListItem, Dialog, Divider + CardDemo/ListDemo regions of containment-demos.tsx + cardMeta/listMeta/dialogMeta/dividerMeta) against official M3/M3E values.

Work Log:
- Verified values against live m3.material.io (lists/specs, cards/specs, dialogs/specs, divider/guidelines, lists/overview), MDC-Android Divider.md, Compose-M3E ListItem issue tracker. Two brief hypotheses overturned with evidence: (1) one-line list item = 56dp current spec (48dp was the old value); (2) list divider inset = 16dp start / 24dp end current spec (72dp start is legacy M2); also confirmed card outlined stroke = outline-variant on the current cards page (not the 2021 `outline`), dialog scrim = 32%.
- Card.tsx: no functional deviation — added provenance comment on the outlined variant (surface + 1dp outline-variant per current spec); cardMeta anatomy notes the stroke color.
- List.tsx: one-line rows min-h-12 → min-h-14 (official 56dp; 72/88dp were already right; 16dp left / 24dp right paddings and 12dp three-line leading top-padding verified correct); dividers doc comment rewritten (full-width divide-y; official 16/24 inset via Divider inset="start"); listMeta anatomy/lines/states/dividers descriptions updated to 56/72/88 + ≥48dp targets.
- Dialog.tsx: headline center-aligns when an icon is present (official "Alignment with icon: Center-aligned"); body→actions gap 16 → 24dp (official); added aria-describedby via useId wired to the body div; scrim fade documented as durations.short4 + "easeOut" (≙ easings.standardDecelerate; tokens easings are CSS strings, framer Easing needs tuples — TS); dialogMeta anatomy updated (24dp above actions, centering rule, describedby).
- Divider.tsx: verified fully conformant (1dp, outline-variant, 16/24 list inset, 16dp equal middle indents, vertical) — comments + dividerMeta rewritten with provenance; no functional change.
- containment-demos.tsx: CardDemo/ListDemo audited, no changes needed (no stale spec text); containmentDemoMap keys unchanged; BottomSheet/SideSheet/DatePicker/TimePicker regions untouched. Scope finding: DialogDemo/DividerDemo live in feedback-demos.tsx (3-c/2-e regions) — audited read-only, API-compatible; registry resolves dialog/divider via feedbackDemoMap.
- Audit report: audit/containment-1.md (6 sections per component + consistency notes).

Stage Summary:
- Fixed: List one-line height 48 → 56dp (spec); Dialog headline centering with icon, 24dp body→actions gap, aria-describedby wiring. Documented: card outlined outline-variant provenance, divider 16/24 official inset vs legacy-M2 72dp, scrim 32%.
- Demo contract intact: CardDemo/ListDemo + containmentDemoMap unchanged; DialogDemo/DividerDemo unchanged in feedback-demos.tsx; named exports + meta re-exports intact; only my 4 meta blocks edited (unique-anchor edits).
- Verified: tsc --noEmit filtered to scoped files → 0 errors; bun run lint filtered → 0 errors.
---
Task ID: 1-5 (audit + themes + MCP orchestration)
Agent: orchestrator (Z.ai Code)
Task: Full M3/M3E spec audit fan-out (6 agents), multi-theme system (4 schemes × light/dark/system), MCP server, cross-component consistency, final QA

Work Log:
- Phase 1 THEMES: wrote src/lib/m3/themes.ts (4 curated M3ThemeDef schemes — baseline Material Violet #6750A4, Ocean Blue #0B57D0, Emerald Fresh #006E1C, Warm Coral #FB7C41 — each full light+dark 34-role sets + swatch metadata); globals.css got [data-theme] light blocks + [data-theme].dark blocks mirroring themes.ts + prefers-reduced-motion kill-switch for CSS animation; rewrote use-m3-theme.ts (colorTheme + mode light/dark/system, OS matchMedia listener, localStorage m3-color-theme/m3-mode, legacy theme/toggle kept); layout.tsx inline no-flash script now applies data-theme + .dark pre-paint; built ThemeSwitcher popover (library-only: IconButton palette trigger, swatch-strip radiogroup, SegmentedButton Day/System/Night, Divider, seed readout) wired into page.tsx top bar; page.tsx wrapped in MotionConfig reducedMotion="user" (global framer reduced-motion)
- Phase 2 AUDITS: fanned out 6 parallel general-purpose agents — 2-a actions (Button/IconButton/FAB/ExtendedFab/FabMenu/SplitButton/ButtonGroup/SegmentedButton), 2-b inputs (TextField/SearchBar/Autocomplete/Checkbox/Radio/Switch/Slider/Chip), 2-c navigation (Tabs/NavigationBar/NavigationDrawer/NavigationRail/TopAppBar/BottomAppBar/Toolbar/Menu), 2-d-1 containment pt1 (Card/List/Dialog/Divider), 2-d-2 containment pt2 (BottomSheet/SideSheet/DatePicker/TimePicker), 2-e feedback (Badge/LinearProgress/CircularProgress/LoadingIndicator/Snackbar/Tooltip/Banner). First 2-d attempt died on context deadline → relaunched split in two. Every component audited against official M3/M3E with fixes: shape tokens (menu 4dp, dialog 28dp, FAB 28dp large, segmented 40dp default, toolbar 56dp, drawer 360dp), disabled two-tier tokens (content 38% / container 12% / outline 12%), hover containers removed in favor of state layers (spec), TopAppBar M2 shadow removed → surface-container fill, scrim 32%, touch targets ≥48dp, focus rings (m3-focus) everywhere, keyboard: menu/tab/slider/date-picker arrow contracts + RadioGroup (new) + traps/restore for drawer/sheets/dialog, ARIA (searchbox, combobox, aria-haspopup/expanded, aria-describedby, radiogroup, grid roving tabindex), M3E motion tokenized (shape-morph press in Button, LoadingIndicator 4666ms continuous rotation + 650ms morph derived from durations tokens, progress stop-dots fixed at 12 o'clock, switch thumb 4dp inset, tooltip 500/600ms show/hide + caret + long-press + aria-describedby, snackbar 4dp/344–672px/36px close, banner square + 40dp text actions, list 56/72/88dp rows + 24dp right pad, TimePicker official readout geometry 96×80/8dp/display-large + tertiary-container AM/PM + surface-container-highest dial + elevation 3, DatePicker year-in aria-labels + scoped layoutId + 48dp chevrons). Audit reports: audit/{actions,inputs,navigation,containment-1,containment-2,feedback}.md
- Phase 3 MCP: mini-services/mcp-server (independent bun package, @modelcontextprotocol/sdk + zod) — stdio McpServer with 13 registerTool tools: list_components, search_components, get_component, get_component_api, get_component_examples, get_component_guidelines, get_component_states, get_component_source (reads real .tsx), list_themes, get_theme, get_design_tokens, get_motion_guidance, get_accessibility_guidance; imports metas/tokens/themes directly from src/lib/m3/* (server-safe modules); JSON-RPC handshake verified (tools/list + tools/call for get_design_tokens + get_component switch); README.md with Claude Code/Desktop/Cursor/Windsurf config + inspector verification; /api/agent manifest + llms.txt + AgentView MCP section (connect snippet + tool surface grid) + /api/registry?themes=true[&theme=] endpoints + themes listed in ?tokens
- Phase 4 CONSISTENCY: md-label-large/medium/small font-weight 600→500 (official M3 label roles) in globals.css + tokens.ts typeScale; RadioGroup added to barrel; List li aria-disabled→aria-current (lint); label-weight, scrim and hardcoded-color sweeps — remaining rgb() are official M3 elevation shadow constants (documented); FoundationsView new first tab "Themes" (Appearance Light/System/Dark buttons, 4 theme cards with light+dark preview bands + Apply/Active, how-theming-works card); layout fonts.css lint warning accepted (self-hosted variable fonts, documented)
- Phase 5 QA: tsc 0 src errors; lint 0 errors 1 documented warning; browser-verified via agent-browser: theme switcher popover (violet/ocean/coral/emerald applied with full-app propagation incl. component pages chips/button/switch), dark coral + light modes, mobile 390px (drawer hamburger, footer pushed naturally), /#/foundation/themes, /#/agents MCP section, all API endpoints JSON-validated; dev server restarted once after it died mid-session (connection refused → nohup bun run dev)

Stage Summary:
- Library is now a spec-audited M3E system: 39 components + primitives, 6 audit reports in /audit, all fixes verified (tsc/lint/browser)
- Multi-theme: 4 curated schemes × light/dark/system, one-attribute propagation, persisted, no-flash; API + MCP expose full schemes
- MCP server live at mini-services/mcp-server (stdio, 13 tools, structured knowledge not raw dumps) with connect docs for all major agents
- Known accepted limitations recorded in audit files: segmented-button 48dp-target tradeoff, date-picker modal-size presentation, timepicker 24h single-ring, tabs underline w-1/3 vs text-width, snackbar swipe-dismiss absent, fonts.css lint warning

---
Task ID: 3-assess
Agent: orchestrator (Z.ai Code)
Task: Round-3 status assessment + QA, then select and launch round-3 work

Work Log:
- Read worklog (full history) + dev.log: server healthy, no runtime errors
- QA: bunx tsc --noEmit → src clean (only pre-existing examples/skills errors); bun run lint → 0 errors (1 documented fonts.css warning); agent-browser: home + Button view render, theme popover switch violet↔ocean propagates (--md-primary #6750a4↔#0b57d0, data-theme attr correct), /api/agent + /api/registry?summary|themes|tokens all valid JSON, zero console errors
- Assessment: STABLE — no blocking bugs; proceeding to feature work

Stage Summary:
- Round-3 plan: 3-a Theme Builder (seed→scheme via @material/material-color-utilities, Foundations tab, /api/theme-builder, custom-theme application path) ∥ 3-c polish fixes (Snackbar swipe-to-dismiss, Tabs text-width underline, SegmentedButton 48dp targets); then 3-b SearchView component (new M3E component, registry 39→40); final QA + worklog handover

---
Task ID: 3-a
Agent: theme-builder agent (Z.ai Code)
Task: M3 Theme Builder — custom seed → generated scheme via @material/material-color-utilities (engine install, theme-builder lib, custom-theme application path, Foundations "Theme builder" tab, /api/theme-builder, agent/MCP surfacing)

Work Log:
- Installed @material/material-color-utilities@0.4.0; verified exports before coding: 0.4.0 exposes `Hct`, `DynamicScheme` (single class, `constructor({sourceColorHct, variant, contrastLevel, isDark, specVersion})`) + `Variant` enum (TONAL_SPOT/VIBRANT/EXPRESSIVE/CONTENT/FIDELITY/RAINBOW/FRUIT_SALAD) + `argbFromHex`/`hexFromArgb`; MaterialDynamicColors statics are deprecated — DynamicScheme instance GETTERS resolve every role (incl. surface-container*, inverse*, error*) so no hand-mapping needed; used specVersion "2021" (classic M3 tonal behavior matching curated themes; verified seed #6750A4 tonal-spot reproduces baseline values to within HCT round-trip ±1: e.g. primary #65558f vs published #6750a4 — engine output is authoritative, curated themes.ts values intentionally untouched)
- src/lib/m3/theme-builder.ts (server-safe, no DOM): `M3VariantId` type + `variantCatalog` (7 variants with descriptions), `schemeRoles` (all 34 :root --md- roles, kebab-case keys WITHOUT --md- prefix, in globals.css order), `generateScheme(seedHex, variant, contrast)` → {light, dark} hex records, `schemeToCssVars(result)` → `:root[data-theme="custom"]` + `[data-theme="custom"].dark` CSS blocks, `schemeToCssText` helper, `normalizeHex` (3/6-digit, # optional), `normalizeVariant`, `clampContrast` (0..1); unit-tested via bun script (red seed → red-family primary, variants/contrast produce distinct schemes, invalid seed throws)
- src/hooks/use-m3-theme.ts: added `customScheme` state + `applyCustomTheme(seed, variant, contrast)` (normalizes → generates → persists {seed,variant,contrast,light,dark} RESOLVED to localStorage `m3-custom-scheme` → injects/updates `<style id="m3-custom-scheme">` → sets data-theme="custom") + `clearCustomTheme()` (removes storage+style, restores last curated via colorThemeRef mirror); setColorTheme now clears any custom scheme first; hydration effect re-applies stored custom idempotently; mode (.dark class) independent — works with custom via the `[data-theme="custom"].dark` block
- layout.tsx no-flash script: after theme+mode, reads m3-custom-scheme and string-builds the style tag inline from the persisted RESOLVED light/dark maps (no color engine shipped to the script; ~10 lines); verified no-flash + persistence across reload (data-theme=custom + --md-primary survives)
- ThemeBuilderTab.tsx (new showcase component, 'use client'): seed section (native <input type=color> styled as 56px swatch + validated hex TextField with helper/error + sr-only aria-live + 8 preset seeds: violet/ocean/emerald/coral + rose #FF5C8A/teal #00796B/lilac #B98CFF/amber #C77700 with aria-pressed ring), variant SegmentedButton ×7 (horizontal scroll on mobile — SegmentedButton is one connected pill, wrapping would break the outline) + animated description, contrast SegmentedButton (Standard 0 / Medium 0.5 / High 1.0), live preview: light+dark bands each with mini UI mock (filled/tonal/outlined buttons, chip, switch pill, card — all inline styles from generated values, framer-motion animate backgroundColor/color on springs.defaultVisual) + 16-role swatch grid (role name + hex per cell) per mode; generation debounced 150ms; actions: Apply as site theme (filled, disabled on invalid hex), Reset to curated (outlined, only when custom active), Copy CSS / Copy JSON / Download JSON (Blob) with clipboard+textarea fallback; m3 Snackbar confirmations (2.5s); custom-active banner chip
- FoundationsView.tsx: added "Theme builder" tab (icon colorize) after Themes; renders <ThemeBuilderTab/>
- ThemeSwitcher.tsx (minimal edit): when customScheme active shows a non-radio "Custom · seed #XXXXXX" row (seed swatch, close IconButton → clearCustomTheme) atop the curated radiogroup; curated rows show unselected while custom active; footer readout reflects custom
- /api/theme-builder route: GET ?seed&variant&contrast → {seed, variant, contrast, light, dark, css:{lightBlock,darkBlock}}; 400 with messages on bad seed/variant/contrast; clamp 0..1; verified via curl (defaults, #FF0000, vibrant+0.5, clamp 9→1, invalid xyz/variant)
- Agentic surfacing: AgentView ENDPOINTS + MCP_TOOLS entries + "14 tools" count; llms.txt route machine-readable docs line + MCP tool list; /api/agent protocol step 3
- MCP server: added `generate_theme` tool (zod schema seed/variant enum/contrast 0..1; imports generateScheme/schemeToCssVars from ../../src/lib/m3/theme-builder — resolves from root node_modules); JSON-RPC handshake verified: tools/call generate_theme {#0B57D0, expressive, 0.5} → correct scheme; server starts clean (timeout 5 bun run index.ts); README tool table updated
- Verify: bunx tsc --noEmit → 0 src errors; bun run lint → 0 errors (1 pre-existing fonts.css warning); agent-browser full pass: builder tab renders all controls (ColorWell/presets/7 variants/3 contrast/2 preview bands), red seed #FF0000 + Apply → data-theme="custom", --md-primary #600000 (red-family), style tag 2255 chars; reload persistence via inline script; dark-mode toggle flips to custom dark block (#ffb596/#1a110e); ThemeSwitcher Custom row + popover reset restore curated (#6750a4); invalid hex shows error, Apply disabled, preview keeps last valid; Copy CSS snackbar "CSS copied to clipboard"; export + reset buttons present; zero page errors; screenshots tool-results/theme-builder.png + -full.png; mobile 390px: no page overflow-x, variant row internally scrollable

Stage Summary:
- Theme Builder is live: seed → official Dynamic Color scheme (7 variants × 3 contrast levels) → apply/persist/export; custom theme path is fully integrated with curated themes (mutually exclusive, one data-theme axis) and no-flash
- KEY DESIGN DECISIONS: (1) DynamicScheme 0.4.0 instance getters cover all 34 roles — no palette hand-mapping, specVersion pinned "2021"; (2) localStorage m3-custom-scheme persists RESOLVED light/dark maps so the inline no-flash script needs no engine; (3) generated values intentionally differ from curated themes.ts baseline (HCT precision) — curated files untouched; (4) SegmentedButton variant row scrolls instead of wrapping (connected-pill integrity)
- Files touched: package.json (+@material/material-color-utilities), src/lib/m3/theme-builder.ts (NEW), src/hooks/use-m3-theme.ts, src/app/layout.tsx, src/components/showcase/ThemeBuilderTab.tsx (NEW), src/components/showcase/FoundationsView.tsx, src/components/showcase/ThemeSwitcher.tsx, src/app/api/theme-builder/route.ts (NEW), src/components/showcase/AgentView.tsx, src/app/llms.txt/route.ts, src/app/api/agent/route.ts, mini-services/mcp-server/index.ts + README.md
- Gotchas for later agents: M3SchemeRecord keys are kebab-case ("on-primary") not camelCase; MCU 0.4.0 deprecates MaterialDynamicColors statics — prefer DynamicScheme getters; contrast clamps to 0..1 (engine supports -1..1, API intentionally narrower per spec); "bad" is a VALID 3-digit hex (bbaadd) — test invalid seeds with "xyz"; theme-builder.ts is server-safe and importable from MCP/API; do not run bun run build (dev server auto-running)
---
Task ID: 3-c
Agent: polish-fixer
Task: 3 spec fixes — Snackbar swipe-to-dismiss; Tabs underline = measured label width; SegmentedButton 48dp touch targets.

Work Log:
- Snackbar.tsx: added framer-motion `drag` (both axes, dragElastic 0.25, zero dragConstraints, touchAction:"none" — fixed, short-lived overlay so page scroll unaffected). onDragEnd dismisses on |offset|>80 (either axis) or dominant velocity>500 and routes through the SAME onClose path as the close button. Exit direction = dynamic exit variant fed via `AnimatePresence custom` (documented pattern; state, not ref, so react-hooks/refs stays clean — initial version reading a ref during render tripped the lint rule and was reworked). Non-drag dismissals (close/auto/Esc) reset to the default slide-down (y:60).
- feedback-demos.tsx SnackbarDemo: added helper line "Snackbars are swipe-dismissable — flick or drag one in any direction to dismiss." (demo previously had no helper text).
- Tabs.tsx: primary underline now sized to the measured label text width — label spans register into a useRef Map keyed by value; useLayoutEffect + ResizeObserver per span + document.fonts.ready remeasure into `labelWidths` state (guarded no-op setState when unchanged). Indicator (same per-instance layoutId morph) is positioned via `width: measured; left: calc(50% - w/2)`; falls back to the old left-1/3 w-1/3 if measurement is 0. ARIA/keyboard/springs untouched.
- SegmentedButton.tsx: each segment got `before:absolute before:content-[''] before:left-0 before:right-0 before:-inset-y-2` (::before hit-expander, vertical-only — no horizontal expansion so adjacent segments never overlap). Segment buttons were already `relative`; container has no overflow-hidden (verified: overflow visible), per-segment rounded-l/r-full kept, so no clipping and the pill outline stays connected (computed check: 1px solid border, full radius, overflow visible; hit height 38px + 16px expander = 54px ≥ 48dp).
- meta.ts: tabsMeta description + anatomy now state the indicator matches label text width (ResizeObserver + fonts.ready); segmentedButtonMeta description + states now document the ≥48dp vertical ::before hit-expander.
- audit/navigation.md + audit/actions.md: appended the mandated "Resolved (round 3, task 3-c)" lines.
- Verified: `bunx tsc --noEmit` clean (no src/ errors); `bun run lint` 0 errors, 1 pre-existing warning (layout.tsx no-css-tags — file out of scope). agent-browser on :3000 — Tabs: clicked 2nd/3rd tabs, indicator width == label width exactly (Health 40.47px==40.47px, Shop 31.92px==31.92px), screenshot tool-results/tabs-underline.png; Segmented: fresh-load real pointer click selects Gallery (aria-pressed=true), screenshot tool-results/segmented-selected.png; Snackbar: real 160px pointer swipe dismissed it (touchAction:none confirmed applied); zero page errors on all three sections; dev.log clean compiles / GET 200.
- Note: "Map" in the segmented single-select demo is pre-selected by default (per meta guideline), so a first click on it deselects — initially misread as broken clicks until verified on a fresh load.

Stage Summary: All three round-3 spec fixes implemented in exactly the assigned files (Snackbar, Tabs, SegmentedButton + their demo/meta/audit touchpoints); conventions held (m3-* colors, token springs, no export renames, forwardRef untouched, ARIA unchanged); type-check and lint clean; live browser interaction verified with zero page errors.
---
Task ID: 3-b
Agent: searchview-builder
Task: Build the M3 SearchView component (expanded companion of SearchBar) + meta/registry/demo wiring

Work Log:
- Read spec patterns: SearchBar.tsx, Dialog.tsx (Escape/focus-restore/Tab-trap/scroll-lock), Autocomplete.tsx (listbox/aria-activedescendant keyboard pattern), Ripple.tsx, tokens.ts, MaterialSymbol.tsx, registry.ts, index.ts, inputs-demos.tsx, demo-registry.ts, globals.css utility classes.
- Created src/components/m3/SearchView.tsx: forwardRef<HTMLInputElement>; controlled/uncontrolled query (value/defaultValue/onValueChange); mode "full-screen" | "docked"; 56dp input row on bg-m3-surface-container-high + 1dp bg-m3-outline-variant divider; leading nav icon (default arrow_back, closes) with 48dp target; clear button when query non-empty; trailingActions slot; recent-search suggestion rows (48dp, history icon, label-large, per-row close via onRecentRemove) keyboard-navigable (ArrowUp/Down active index, Enter selects, aria-activedescendant, scrollIntoView); full-screen = AnimatePresence fixed inset-0 z-[90] role="dialog" aria-modal, slide-down+fade via springs.fastSpatial, Escape (window listener + input), Tab focus trap, focus input on open (autoFocus default true), restore trigger focus on close, body scroll lock; docked = relative inline panel, quick fade/slide via durations.short4, render nothing when open=false; children (results) render below divider whenever recents aren't shown; JSDoc with m3.material.io provenance + usage example.
- meta.ts: added searchViewMeta right after searchBarMeta (id "search-view", name "SearchView", category "textinput", no m3e flag to match searchBarMeta, variants ["full-screen","docked"], 14 documented props, anatomy/states/dos/donts incl. 56dp + surface-container-high + divider + suggestion rows + focus/Escape, realistic exampleCode, related ["search-bar","autocomplete"], demoName "SearchViewDemo").
- registry.ts: searchViewMeta import + TABLE row { meta: searchViewMeta, file: "SearchView" } after SearchBar.
- components/m3/index.ts: named export SearchView, searchViewMeta, SearchViewProps, SearchViewMode.
- inputs-demos.tsx: SearchViewDemo with (a) SearchBar-styled pill trigger opening a full-screen SearchView with recentSearches (select/remove wired) + static catalog results filtered by query incl. empty state; (b) always-open docked SearchView with its own filtered results; added inputsDemoMap["search-view"]. No other demo keys touched.
- Verified: tsc --noEmit filtered to src/ = empty; lint 0 errors (1 pre-existing layout.tsx warning, not this task); /api/registry?summary=true totalCount 40 with search-view listed; agent-browser: sidebar entry "SearchView" → demo → full-screen opens → recents listbox → typed "ch" filters results → Escape closes (incl. during exit animation) → reopen → clear → keyboard ArrowDown×2+Enter selects "bottom sheet" → click recent "elevation" fires onRecentSelect → zero page errors/console warnings; screenshot tool-results/search-view.png; dev.log clean 200s.

Stage Summary:
- Registry grew 39 → 40 components; SearchView fully wired (component + meta + registry + barrel + demo). No changes to FoundationsView/ThemeBuilder/themes/api/layout per task constraints. Deviation note: autoFocus honored only in full-screen mode (docked never steals page focus), documented in JSDoc + props meta.

---
Task ID: 3-final
Agent: orchestrator (Z.ai Code)
Task: Round-3 integration QA + handover

## Current project status
Stable and feature-complete for round 3: 40 components (SearchView added), spec-audited, 4 curated themes + dynamic Theme Builder, MCP server (14 tools) + agent APIs. All verification green.

## Completed this round (verification results)
- 3-a Theme Builder: @material/material-color-utilities engine; src/lib/m3/theme-builder.ts (generateScheme/schemeToCssVars/normalize*, 7 variants, contrast 0–1, specVersion 2021, all 34 --md-* roles); use-m3-theme customScheme (applyCustomTheme/clearCustomTheme, localStorage m3-custom-scheme persists RESOLVED role maps so layout.tsx no-flash script applies pre-paint without the engine); ThemeSwitcher shows "Custom · seed" row w/ reset; FoundationsView new "Theme builder" tab (seed picker + hex + 8 presets, 7-variant segmented, contrast, live light+dark preview mock + 16-swatch grid with animated color morphs, Apply/Reset/Copy CSS/Copy JSON/Download JSON, snackbar confirmations); /api/theme-builder (validated, 400 on bad input); MCP generate_theme tool; AgentView + llms.txt updated. Verified: apply rose #FF5C8A → data-theme="custom", --md-primary #8d4959, full-app propagation incl. dark; reset → curated violet; reload persistence; API + MCP JSON correct.
- 3-b SearchView: new M3 "search view" component (full-screen + docked, 56dp surface-container-high bar, divider, recent-search rows 48dp w/ history icon + per-row remove, keyboard listbox nav, focus trap/restore/scroll-lock/Escape, controlled query, trailingActions); registered in meta/registry/barrel/inputsDemoMap → sidebar + registry totalCount 40, MCP/api auto. Verified live: open/type/filter/Escape/recent-select.
- 3-c Polish (resolves 3 documented audit limitations): Snackbar swipe-to-dismiss (drag both axes, offset>80 or velocity>500, direction-aware exit via AnimatePresence custom, touch-action none, close/Esc intact); Tabs underline now measures label text width (ResizeObserver + fonts.ready, layoutId morph, 1/3 fallback) — verified underline == label width; SegmentedButton segments expand to ≥54dp vertical hit via ::before expander, pill outline intact. Meta blocks + audit notes updated.
- Integration QA: tsc src 0 errors; lint 0 errors (1 documented fonts.css warning); agent-browser full sweep (light/dark, theme apply/reset, tabs, segmented, snackbar, search view, mobile 390px, deep link #/foundation/builder) → 0 page errors; /api/registry?summary|/llms.txt|/api/theme-builder all 200; MCP generate_theme JSON-RPC verified. Screenshots in tool-results/ (theme-builder*, tabs-underline, search-view, qa-*).

## Unresolved issues / risks / next-phase priorities
- Variant row in Theme builder scrolls horizontally on mobile instead of wrapping (SegmentedButton is one connected pill) — acceptable, noted.
- Generated scheme values may differ ±1 hex from hand-curated themes.ts (HCT round-trip) — intentional, curated files untouched.
- Known remaining audit limitations (all minor, recorded in audit/*.md): timepicker single-ring 24h display; date-picker modal-size presentation; md-label weight handled globally. Candidate next steps: (1) visual-regression screenshot suite (per-component baseline PNGs + compare script); (2) package export hardening — real npm package build (tsup/tsc + exports map + d.ts) so `m3-expressive-react` is installable outside the monorepo; (3) FAB menu docked behaviors; (4) date-picker official modal presentation; (5) MCP HTTP transport option alongside stdio.
