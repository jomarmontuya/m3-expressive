# M3 Spec Audit — Text Input + Selection family (Task 2-b)

Scope: `TextField`, `SearchBar`, `Autocomplete`, `Checkbox`, `Radio`, `Switch`, `Slider`, `Chip`, `inputs-demos.tsx`, and the 8 corresponding meta blocks in `src/lib/m3/meta.ts`.
Reference: official Material 3 / M3 Expressive spec (m3.material.io component guidelines + token tables).
Verification: `bunx tsc --noEmit` filtered to audited files → 0 errors (project total 4 pre-existing errors, all in `examples/` and `skills/` scaffolding); `bun run lint` → 0 errors (1 pre-existing warning in `layout.tsx`).

---

## 1. TextField

**(1) Material specification**
- Outlined: height 56dp, 1dp `outline` stroke; focused stroke 2dp primary; hover stroke `on-surface`; shape = corner extra-small **4dp**.
- Filled: height 56dp, container `surface-container-highest`, top corners 4dp, bottom indicator 1dp `on-surface-variant` (hover: `on-surface`), focused indicator 2dp primary (error: 2dp error).
- Floating label: body-large resting, body-small floated; outlined label docks into the border gap; filled label rises to 8dp from the top and input text sits in the lower half (~24–48dp of the 56dp grid).
- Colors: label idle `on-surface-variant`, focused `primary`, error replaces on border/label/indicator/icons/supporting.
- Disabled (official values): input content/label/icons = `on-surface` **38%**, outlined border = `outline` **12%**, filled container = `on-surface` **4%**.
- Leading icon 24dp at 12dp gutter; input text body-large; supporting text body-small (12px) at 16dp inset.
- A11y: label↔input id association, `aria-invalid` + `aria-describedby` for errors.

**(2) Current implementation**
- Outlined default + filled variants, M3E height scale xs/sm/md/lg = 32/40/56/72; floating label on `springs.fastSpatial`; outlined focus = border-primary + 1px inset primary shadow (≈2dp); filled 1px indicator + scaleX 2dp primary bar; error color set; helper row; leading/trailing Material Symbols; whole component `opacity-38` when disabled; `m3-state` on the field container.

**(3) Deviations found**
1. Corner radius: outlined used `rounded-xl` (12px) at md, filled used `rounded-t-lg` (8px) — spec is 4dp both.
2. Hover: `m3-state` painted an 8% overlay over the whole field; spec hover for text fields is a border/indicator color shift (`outline`→`on-surface`), not a state layer.
3. Disabled: blanket 38% on the container made the outlined border 38% (spec 12%) and filled container 38% (spec 4%).
4. Filled label floated at top 4px (spec 8dp); input text vertically centered overlapped the floated-label band (spec puts input text in the lower half).

**(4) Required changes**
- 4dp corners both variants; remove `m3-state` from the container; add spec hover (`hover:border-m3-on-surface` outlined, `group-hover/field:bg-m3-on-surface` filled indicator); split disabled into 38% content + 12% outline border / 4% filled container; filled floated label top 8; push filled input text into the lower half.

**(5) Changes implemented**
- `fieldRadius = rounded-m3-xs` (outlined), `fieldTopRadius = rounded-t-m3-xs` (filled) — both resolve to 4px via the `--radius-m3-xs` token (compiled CSS verified: `border-radius: 4px`).
- Container: `m3-state` removed, `group/field` added; outlined idle = `border-m3-outline hover:border-m3-on-surface`; disabled outlined = `border-m3-outline/12`; disabled filled = `bg-m3-on-surface/4` with transparent indicator.
- `opacity-38` moved onto input, label, both icons, and helper text individually; disabled suppresses hover shifts and error border.
- Filled floated label `top: 8`; filled input gets `paddingTop: round(height×0.28)` (16px @56) so text occupies the spec's lower band.
- Focus (2px primary) via border + inset shadow retained; motion unchanged (`springs.fastSpatial`).

**(6) Remaining limitations**
- The docked outlined label masks the border with `bg-m3-surface`; on non-`surface` page backgrounds the gap patch can mismatch. A transparent field-corner technique (pseudo-element gap) would be fully background-agnostic; left as-is because the showcase surface is `surface` and the pattern is library-wide.
- M3E size scale (xs/sm/lg) has no official spec grid; 4dp radius + proportional label offsets applied.
- Error icon replaces (not stacks with) a custom trailing icon; spec allows the error icon to displace the trailing icon — matches.

---

## 2. SearchBar

**(1) Material specification**
- Height 56dp full-pill (`surface-container-high`); focused/pressed: `surface-container-highest` + elevation 2. Leading icon 24dp, 16dp inset; query text body-large starting 16dp after the icon; trailing icon 24dp with generous (≥48dp) targets. `searchbox` semantics.

**(2) Current implementation**
- rounded-full pill, focus → elevation-2 + `surface-container-highest`, `m3-state` hover layer, leading icon `ml-4` (16dp), input `px-3` (12dp gutter), trailing icon buttons `h-9 w-9` (36px) with 22dp icons, Enter → `onSubmit`.

**(3) Deviations found**
1. Trailing icon targets 36px < 48dp touch guideline; icons 22dp (spec 24dp).
2. Input left padding 12dp after the icon (spec: 16dp gap → text starts at 56dp from edge).
3. Input had no role/accessible name (`placeholder` only is not a reliable label).

**(4) Required changes**
- ≥48dp targets on md/lg (32dp on the compact sm bar), 24dp trailing icons, `pl-4` input gutter, `role="searchbox"` + `aria-label`.

**(5) Changes implemented**
- `trailingHit = sm ? h-8 w-8 : h-12 w-12`; icon size 24; button margin tightened to `mr-1`, end spacer to `mr-3` so the right inset stays 16dp.
- Input `pl-4` (16dp after the 24dp icon), `pr-1` when trailing icons present (spacer supplies the 16dp), else `pr-4`.
- Added `role="searchbox"` and `aria-label={placeholder}` (caller `aria-label` still wins via the props spread).

**(6) Remaining limitations**
- sm (40dp bar) can't host a 48dp target without overflow; the compact bar uses a 32dp target — documented trade-off for the non-standard M3E size.
- Spec search *view* behaviors (dock, back navigation) are out of scope for the bar component.

---

## 3. Autocomplete

**(1) Material specification**
- Combobox over an outlined text field: 56dp, 1dp `outline` border, focused 2dp primary; hover border `on-surface`; menu container = `surface-container`, elevation 2, **corner extra-small 4dp** (M3 menu container shape), 48dp option rows with 8% hover state; full combobox/listbox ARIA; ArrowUp/Down/Enter/Escape.

**(2) Current implementation**
- h-14 outlined field, rotating `arrow_drop_down` toggle, filter menu (`rounded-lg` = 16px), h-12 rows, hover 8% layer + Ripple, selected check, "No matches" panel, ArrowUp/Down/Enter/Escape, outside-pointerdown close, `role="combobox"`/`aria-expanded`/`aria-controls`/`aria-activedescendant`/`aria-autocomplete`.

**(3) Deviations found**
1. Field corners 12px and menu corners 16px — spec 4dp (menu container shape extra-small; Menu.tsx in this library already uses 4px).
2. No hover border shift on the closed field; disabled border stayed full `outline`.
3. Keyboard highlight didn't scroll the highlighted option into view (long lists).

**(4) Required changes**
- 4dp corners on field + menu + empty panel; hover/disabled border tokens; `scrollIntoView` on highlight; `aria-haspopup="listbox"`.

**(5) Changes implemented**
- `rounded-m3-xs` on field, menu, and empty-state panel.
- Border logic: open → primary + inset shadow; disabled → `border-m3-outline/12`; else `border-m3-outline hover:border-m3-on-surface`.
- Option `li` ref callback calls `el.scrollIntoView({ block: "nearest" })` when highlighted (arrow keys now keep the active row visible).
- Added `aria-haspopup="listbox"`.

**(6) Remaining limitations**
- Label renders above the field (body-small, on-surface-variant) instead of as a floating label inside — an exposed-dropdown presentation; converting to an in-field floating label would duplicate TextField's geometry and is a larger refactor.
- Trailing toggle target is 36px (embedded dense control; spec shows a 24dp icon with 8dp margins).
- No roving `aria-owns`/typeahead; activedescendant pattern is complete for the required keys.

---

## 4. Checkbox

**(1) Material specification**
- 18dp box, 2dp rounded corners (radius 2dp), 2dp stroke `on-surface-variant` unchecked; checked = primary container fill + on-primary check; error recolors box/check; indeterminate dash; 48dp touch target with 8%/10% state layers; checkmark drawn via pathLength on the expressive spring; Space/Enter activation; `aria-checked` incl. `"mixed"`; visible keyboard focus ring.

**(2) Current implementation**
- 48px target (`h-12 w-12` grid), 18px `rounded-[2px] border-2` box, pathLength check on `springs.expressive`, indeterminate 2×10px dash, error variant, ripple + state layer, `aria-checked`, whileTap squash 0.85 on the box.

**(3) Deviations found**
1. No visible keyboard focus indicator: `outline-none` without `m3-focus` — a11y failure.

**(4) Required changes**
- Add the shared 3px primary focus ring.

**(5) Changes implemented**
- `m3-focus` added to the button class list (`outline` is not clipped by the element's own `overflow-hidden`).

**(6) Remaining limitations**
- Indeterminate dash is 10px wide (inner box is 14px); official glyph proportions vary between baseline/Expressive renders — left as designed, still clearly legible.

---

## 5. Radio

**(1) Material specification**
- 20dp ring (2dp stroke), 10dp inner dot, dot springs in on selection; 48dp target; error state colors the ring + dot; `role="radio"`/`aria-checked` inside `role="radiogroup"`; **arrow-key group navigation selects and moves between enabled radios** (wrapping); visible focus ring.

**(2) Current implementation**
- 48px target, 20px `border-2` ring, 10px dot scale 0→1 on `springs.expressive`, checked ring/dot primary, ripple/state layer, `whileTap 0.95`. No error state, no focus ring, no group keyboard behavior (standalone buttons only).

**(3) Deviations found**
1. Missing `m3-focus` (invisible keyboard focus).
2. Missing error state (spec: error color on ring/dot).
3. Missing arrow-key group navigation (required by task: "implement if missing").

**(4) Required changes**
- Add `m3-focus`; add `error` prop; add a `RadioGroup` wrapper implementing `role="radiogroup"` + roving arrow-key select-and-move (ArrowUp/Left previous, ArrowDown/Right next, wrapping, skipping disabled).

**(5) Changes implemented**
- `m3-focus` on the Radio button.
- New `error` prop: ring `border-m3-error`, dot `bg-m3-error`, ripple/state tint error.
- New exported `RadioGroup` (`role="radiogroup"`, `aria-label`, `flex flex-col`): keydown handler collects enabled `[role="radio"]` buttons, focuses + clicks the next/previous one with wrap-around; clicking selects via the existing controlled callback.
- `radioMeta`: `error` prop documented; dos updated ("Group related Radios in a RadioGroup so arrow keys move and select…").

**(6) Remaining limitations**
- Roving tabindex (only the checked radio tabbable) is not enforced because selection state lives in the app, not the group; every enabled radio stays tabbable. Arrow-key behavior per spec is implemented — documented trade-off.
- `RadioGroup` is exported from `@/components/m3/Radio`; the `index.ts` barrel (owned by another task) lists explicit exports and can't be edited under scope rules — add `RadioGroup` there in a follow-up.

---

## 6. Switch

**(1) Material specification**
- Track 52×32dp (2dp `outline` border, `surface-container-highest` fill off / `primary` on); thumb 16dp off → 24dp on, press expands to 28dp; off thumb rests with a gap from the edge (official grid: 4dp inset), on-thumb at 24dp (pressed clamps to 20dp); 16dp check icon (primary) on the on-thumb; thumb slides on the default spatial spring; state layer on the track; Space toggles (native button); visible focus ring.

**(2) Current implementation**
- 52×32 `border-2` track, `role="switch"` + `aria-checked`, thumb 16/24/28 with x 0/24/20 on `springs.defaultSpatial`, on-thumb `check` 16dp, pointer pressed state, `m3-state` on track.

**(3) Deviations found**
1. Off thumb sat at x=0 — flush against/over the 2dp border (spec has a clear gap; on-state right gap was already 4dp, making travel asymmetric).
2. No visible keyboard focus ring.

**(4) Required changes**
- Off-thumb x 0→4; add `m3-focus`.

**(5) Changes implemented**
- `thumbX = checked ? (pressed ? 20 : 24) : 4` (geometry comment added); `m3-focus` added.

**(6) Remaining limitations**
- Disabled uses the library-wide 38% overall dim; official tokens dim track/thumb separately (on-container 12% track + on-surface 38% thumb). Visually close; kept for library consistency (same convention in Checkbox/Radio/Chip).
- Press expansion while off+pressed at x=4 is within bounds (4..32 of 52) ✓.

---

## 7. Slider

**(1) Material specification (M3E)**
- Expressive slider: 16dp-thick track (primary active / `surface-container-highest` inactive), signature tall thin handle 4×44dp widening to 6dp on hover/drag, **4dp on-surface stop-indicator dots on the track** (one at the inactive end by default; one per step when discrete), value label bubble on the active handle; keyboard: arrows ±step, **PageUp/PageDown**, Home/End; `role="slider"` with `aria-valuemin/max/now`, horizontal orientation; ≥48dp touch target with a generous handle hit area.

**(2) Current implementation**
- 16px track, 4×44 handle widening to 6 (`springs.fastVisual`), pointer capture drag + step snapping, arrows/Home/End, `role="slider"` + value aria, `m3-focus`, bubble on `springs.expressive`; discrete ticks were 4px dots in a row **below** the track; interactive row only h-6 (24px); `aria-label` passed in the demo was silently dropped (hyphenated JSX props skip TS excess-property checks and the component had no rest spread).

**(3) Deviations found**
1. Stop indicators misplaced: below the track (`on-surface-variant`) instead of 4dp `on-surface` dots **on** the track (end dot missing entirely for continuous sliders).
2. Touch target 24px < 48dp.
3. Missing PageUp/PageDown.
4. Missing `aria-orientation`; `aria-label`/other aria props never reached the DOM.

**(4) Required changes**
- Move stop dots onto the track (end dot always; per-step dots on the inactive zone when discrete); 48dp interactive row; PageUp/PageDown (±10 steps); `aria-orientation` + rest-prop passthrough.

**(5) Changes implemented**
- Track rebuilt: relative 16px layer — bars (overflow-hidden, rounded-full), stop-indicator layer, then handle (last = covers dots). Discrete: `tickCount` dots absolutely positioned by fraction (inset 6dp), rendered only where `f > fraction` (inactive zone). Continuous: single 4dp `bg-m3-on-surface` end dot at `right-6px`, faded out at 100%.
- Interactive row `h-6` → `h-12` (48dp hit area; handle still overflows freely, bubble spacing unchanged).
- Keyboard: `PageUp`/`PageDown` → `snap(value ± max(step, (max-min)/10))`.
- `aria-orientation="horizontal"`; `SliderProps` now extends `Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">` with `{...rest}` on the slider element — demo `aria-label="Volume"` now lands in the DOM.
- Old below-track tick row removed; `sliderMeta` anatomy/states updated (48dp hit row, stop-indicator dots, PageUp/PageDown).

**(6) Remaining limitations**
- M3E "gapped" discrete track (track segments separated at each stop) not implemented — dots mark the stops per the documented stop-indicator token; gap-morph is a larger expressive upgrade.
- Bubble is optional (`showValueLabel`); spec shows the value label while active — default off preserves current API, demos enable it.
- Vertical orientation unsupported (matches spec scope of the original component).

---

## 8. Chip

**(1) Material specification**
- Height 32dp (M3E adds a scale), label-large, 16dp horizontal padding, 8dp icon↔label gap; **shape**: baseline M3 chip container = corner small 8dp, but M3 **Expressive** chips are full pills — `rounded-full` is correct for this library (verified intent; kept). Leading icon 18dp, trailing close 18dp; selected filter/assist = `secondary-container` + leading check (animated width-in); input chips have a cancel affordance; elevated chips = elevation 1, hover elevation 2; 8%/10% state layers; visible focus ring.

**(2) Current implementation**
- rounded-full, heights 28/32/40, `px-4`, `gap-2`, label-large, 18dp icons, animated check (width 0→18, `springs.fastSpatial`), input-chip cancel span (Enter/Space), elevated variant, ripple + state layer, `aria-pressed`, whileTap 0.96.

**(3) Deviations found**
1. `hover:m3-elevation-2` is dead CSS — `.m3-elevation-*` are plain classes, Tailwind can't apply a variant to them (known project pitfall from the Card batch), so elevated chips never lifted on hover.
2. No visible keyboard focus ring.
3. Cancel affordance hit area 20px (< dense-target guidance; icon itself is the spec's 18dp).

**(4) Required changes**
- Replace hover elevation with an arbitrary hover `box-shadow` (exact M3 level-2 values — same pattern Button.tsx/Card.tsx already use); add `m3-focus`; enlarge cancel target to 24px (`h-6 w-6 -mr-2`, keeps 16dp optical inset).

**(5) Changes implemented**
- `hover:[box-shadow:0_1px_2px_0_rgb(0_0_0/0.30),0_2px_6px_2px_rgb(0_0_0/0.15)]` — verified in compiled CSS (`box-shadow: 0 1px 2px #0000004d, 0 2px 6px 2px #00000026` under `@media (hover:hover)`), transition already includes box-shadow.
- `m3-focus` added; cancel span `h-5 w-5 -mr-1.5` → `h-6 w-6 -mr-2`.

**(6) Remaining limitations**
- Assist chips remain selectable (Expressive-era behavior; baseline M3 treats assist chips as non-selectable actions) — matches the task's stated rule "selected filter/assist = secondary-container + check".
- Suggestion chips don't show a selected check (only filter/assist do), matching the task rule.

---

## 9. Demos (`inputs-demos.tsx`)

**(1) Spec being followed** — demos must showcase the spec states; contract: same exported demo components + `inputsDemoMap` keys.
**(2) Current** — 8 demos; RadioDemo wrapped radios in a plain `div` (no group semantics).
**(3) Deviation** — radio group not exposed through `RadioGroup`, so the new arrow-key behavior was unused in the demo.
**(4) Required** — swap the wrapper.
**(5) Implemented** — `<RadioGroup label="Plan" className="gap-1">` replaces the div; imports updated; all export names and `inputsDemoMap` keys unchanged; Slider `aria-label`s now functional via the Slider rest props.
**(6) Limitations** — none.

---

## 10. Meta blocks (meta.ts, 8 objects edited, unique anchors)

- `textFieldMeta.states` → hover = outline→on-surface / filled indicator darkens; disabled = "38% content, 12% outline border or 4% filled container".
- `searchBarMeta.anatomy` → trailing icon buttons "(24dp icons, ≥48dp targets)".
- `autocompleteMeta.anatomy` → "4dp corners" field, "(surface-container, elevation-2, 4dp corners)" menu, highlight scroll note.
- `checkboxMeta.states` → added "Focus (3px primary ring)".
- `radioMeta` → added `error` PropDoc; dos → RadioGroup arrow-key guidance.
- `switchMeta.states` → "Off (outline track, outline thumb at 4dp inset)" + "Focus (3px primary ring)".
- `sliderMeta` → anatomy: 48dp hit row, "4dp on-surface stop-indicator dots on the inactive track (one per step when discrete)"; states: "arrows ±step, PageUp/PageDown ±10 steps, Home/End".
- `chipMeta.states` → added "Focus (3px primary ring)", "Elevated (elevation-1, hover elevation-2)".

---

## Cross-component consistency notes

1. **Motion**: every animation still goes through `springs` from `@/lib/m3/tokens` retyped as `Transition` per file (label float `fastSpatial`, checkmark `pathLength` `expressive`, switch slide `defaultSpatial`, handle grow + check width-in `fastVisual`/`fastSpatial`, chip press `fastVisual`) — no raw easings, no keyframe-spring mixes (single-value animates only).
2. **Color**: only `m3-*` Tailwind classes / `var(--md-*)`; new opacity modifiers (`/12`, `/4`, `/8`) compile to `color-mix` (verified in the dev CSS chunk) and fall back safely.
3. **Focus**: Checkbox, Radio, Switch, Chip previously had `outline-none` with no ring; all four now use the shared `m3-focus` (3px primary ring) like Slider — keyboard focus is visible across the family. TextField/SearchBar/Autocomplete convey focus through the spec'd 2dp primary indicator treatment instead (and inputs keep `outline-none` by design).
4. **Disabled**: two-tier official values implemented where the spec defines them (TextField); selection controls keep the library-wide 38% single-tier dim (official values are near-equivalent composites) — documented in metas.
5. **Shape**: fields/menus at 4dp (corner extra-small), chips/search bar full pill (Expressive), switch/slider pills — radius via `--radius-m3-*` tokens.
6. **Touch targets**: search-bar trailing buttons and the slider row now ≥48dp; embedded dense affordances (autocomplete toggle, chip cancel) trade target size for the spec's dense geometry — flagged per component.
7. **A11y**: `aria-checked`/`role` coverage complete (checkbox incl. `mixed`); radio gained group navigation; slider gained orientation + label passthrough; searchbar gained searchbox role/label; text field label association, `aria-invalid`, `aria-describedby` unchanged.
8. **Library contract**: all 8 files keep `'use client'`, named exports, and re-export their meta from `@/lib/m3/meta`; demos keep the same export names and `inputsDemoMap` keys. Only the 9 assigned files + 8 meta blocks were touched.

## Unfixed / follow-ups (with reasons)

- `index.ts` barrel can't export the new `RadioGroup` (out-of-scope file) — orchestrator follow-up.
- Outlined TextField label gap uses a `bg-m3-surface` patch; background-agnostic corner-gap needs a mask/pseudo-element rework.
- Switch/Checkbox/Radio/Chip disabled = 38% overall (library convention) vs official multi-token dimming; a central `disabledTokens` in tokens.ts would fix all components at once (out of scope).
- Slider M3E gapped-track discrete style and always-on value label are expressive upgrades, not fixes.

---

## Date Picker — Resolved (round 4, task 4-b)

Note: the DatePicker audit itself lives in `audit/containment-2.md` (§ DatePicker) — this
file had no date-picker section, so the resolution note requested for task 4-b is
appended here verbatim alongside the full note added under containment-2.md.

**Resolved (round 4, task 4-b):** the documented gap — "the official modal picker is
568×368dp (landscape) / 328×512dp (portrait) with a selected-date header, which this
simplified grid intentionally omits" — is now implemented in `DatePicker.tsx` as
`presentation="modal"` (default stays `"inline"`, zero breaking change):

- **API**: `presentation?: 'inline' | 'modal'`, `open?: boolean` +
  `onOpenChange?: (open: boolean) => void` (controlled, Dialog/SearchView house style),
  `closeOnSelect?: boolean` (default true, modal only). Inline props/exports/ARIA untouched.
- **Panel**: surface-container-high, 28dp corners, elevation 3, 32% scrim
  (`bg-m3-scrim/32`), no action buttons (M3 live-apply; Escape/scrim always dismiss).
- **Portrait** (< 600px viewport): 328×512dp — header block on top ("Selected date"
  label-large + display-small headline "Fri, Aug 21" + outline-variant divider) above the
  shared calendar grid, internal scroll, max-w/max-h viewport caps.
- **Landscape** (≥ 600px, via `matchMedia`): 568×368dp — header as a 168dp left column
  with vertically centered headline-small, calendar on the right.
- **Motion**: panel scale 0.9→1 + fade on `springs.expressive`, scrim fade on
  `durations.short4`/easeOut (Dialog house pattern); animated month-year label
  (popLayout slide/fade, modal only).
- **A11y**: `role="dialog"` `aria-modal="true"` `aria-label="Choose date"`; focus trap
  (Dialog FOCUSABLE pattern); initial focus on the selected/today day; focus restore to
  the opener; body scroll lock; grid keeps its ARIA-grid/arrow-key semantics.
- **Selected day in modal** uses the official androidx `SelectedDateContainerColor`
  (primary-container circle); every other day state matches the inline grid exactly.
- **Wiring**: `datePickerMeta` updated (variants + modal, 4 new props, description/
  anatomy/states/dos/donts/exampleCode); `DatePickerDemo` gained an outlined
  text-field-style trigger pill + landscape note; verified `bunx tsc --noEmit` (0 errors
  in src/), `bun run lint` (0 errors), and agent-browser QA with portrait/landscape
  screenshots in `tool-results/`.
