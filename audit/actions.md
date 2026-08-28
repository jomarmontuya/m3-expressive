# ACTIONS family — Material 3 / M3 Expressive audit + fixes (Task 2-a)

Scope: `Button.tsx`, `IconButton.tsx`, `FAB.tsx`, `ExtendedFab.tsx`, `FabMenu.tsx`,
`SplitButton.tsx`, `ButtonGroup.tsx`, `SegmentedButton.tsx`,
`showcase/demos/actions-demos.tsx`, and the 8 matching meta blocks in `src/lib/m3/meta.ts`.
Verified live against the running dev server (computed styles + interactions via headless browser)
and against m3.material.io component specs (training knowledge; one web spot-check confirmed
Google's own label-large = 14px / weight 500, i.e. our global 600 is a recorded deviation).

Sources used for numeric claims:
- m3.material.io/components/button/specs · /extended-fab/specs · /floating-action-button/specs ·
  /icon-button/specs · /segmented-button/specs · /button-group (M3E update) · state-layer & elevation docs.

---

## Button.tsx

**1. Material specification being followed.** Common buttons: heights 40dp (M3) and the M3E scale
32/40/56/76/96; full-pill shape that morphs pill → 20dp while pressed (M3E); label-large
(14px, 500 official weight, 0.1px tracking); horizontal padding 24px standard / 16px dense;
icon+label gap 8px; icon 18–20dp dense→standard ramp; variants filled (primary/on-primary),
tonal (secondary-container/on-secondary-container), outlined (1px outline + primary label),
text (primary label), elevated (surface-container-low + level 1 → level 2 on hover, primary label);
hover/focus/pressed state layers 8%/10%/10%; disabled = on-surface 12% container + on-surface 38%
content, outlined/text keep transparent container with 12% outline, elevation drops to 0; loading
indicator replaces the leading icon; Space activates on keyup, Enter on keydown; 3px primary
focus ring; M3E shape morph on press.

**2. Current implementation (before fix).** Heights/scale ✓; variants ✓ colors; `.m3-state` +
`Ripple` ✓; loading spinner + disable ✓; but: dead `pressed` state (morph claimed in docs,
never implemented); hover recolored containers (`hover:bg-m3-primary/90`,
`hover:bg-m3-secondary-container/85`, `hover:bg-m3-primary/8`) instead of state layers;
`hover:m3-elevation-2` on elevated (plain-CSS class — Tailwind generates no variant, so it
never worked); blanket `opacity-38` disabled; md button label 15px (nonstandard); padding
20/28/36/48 (spec 24 standard / 16 dense); tracking `0.01em` inline; no focus ring; no
`aria-busy`; spinner used untokenized CSS `animate-spin`; no touch-target expansion below 48dp.

**3. Deviations found.**
- M3E press shape-morph pill→20dp absent (spec/`shapeMorph` token existed, unused).
- Hover mutated container colors (spec: container color never changes; state layer only).
- Elevated hover lift broken (`hover:m3-elevation-2` is not a Tailwind utility variant).
- Disabled state off-spec (38% whole-button alpha vs 12%/38% role split + no elevation).
- Typography: md 15px; padding off-spec at standard sizes; inline `0.01em` tracking.
- No focus-visible ring; no `aria-busy` while loading; keyboard press didn't drive the (intended)
  morph; spinner CSS animation not tokenized.

**4. Required changes.** Implement the morph with `shapeMorph.button` + token springs; delete
hover container recolors; state-driven/arbitrary-property level-2 hover shadow for elevated;
per-variant official disabled tokens; spec padding (16 dense / 24 standard) + `md-*` type classes;
`m3-focus` ring; keyboard-driven pressed state; `aria-busy`; tokenized spinner rotation.

**5. Changes implemented.** All of §4: `animate={{borderRadius: pressed ? shapeMorph.button.pressed
: shapeMorph.button.rest}}` with `{scale: springs.fastVisual, borderRadius: springs.expressiveEffects}`;
`data-pressed` drives the 10% pressed state layer for keyboard users too; `disabledStyles` per
variant (`bg-m3-on-surface/12 text-m3-on-surface/38`, outlined border 12%, `shadow-none!` for
elevated/filled/tonal); sizes now 16/24/24/32/40 padding, gap 4/8/8/8/12, icons 16/18/20/24/28,
type xs=`md-label-medium` sm/md=`md-label-large` lg=`md-title-medium` xl=`md-title-large`;
spinner = framer `rotate:360` loop at `durations.extraLong4` (1s) linear; `m3-state m3-focus`;
`aria-busy`; invisible `::before` hit-area extension to 48dp on xs (32→48) and sm (40→48);
`overflow-hidden` removed from the host (ripple self-clips) so the expander isn't clipped.

**6. Remaining limitation.** (a) `md-label-large` renders weight 600 vs official 500 — global
`.md-*` deviation, out of my file scope (recorded, not fixed). (b) lg/xl padding/type are M3E-only
expressive scale-ups with no official dp tokens — chose 32/40px and title-medium/title-large,
documented in code. (c) Button icon sizes keep the 16–28 ramp; the classic M3 40dp button icon is
18dp ✓ (sm); 56dp M3E medium has no documented icon token — 20dp chosen, documented.

---

## IconButton.tsx

**1. Spec.** 40×40dp container, 24dp icon (M3); M3E container scale 28/36/40/48/64 with 16/20/24/28/36
icons; toggle semantics: standard & outlined selected icon = **primary** (container stays
transparent, outline unchanged), filled = primary/on-primary, tonal = secondary-container/on-
secondary-container (unchanged when selected); glyph fills when selected; state layers; disabled =
content on-surface 38%, filled/tonal container on-surface 12%, outlined border 12%; 48dp touch
target; `aria-pressed`.

**2. Before.** Sizes/icons ✓; toggle + spring pop ✓; `aria-pressed` ✓. But selected state painted a
**primary-container** background on standard/outlined (not in the M3 spec); blanket `opacity-38`
disabled; no focus ring; `spring()` shim still present though tokens.ts was centrally fixed in
task 4-6; no touch-target expansion (md is 40dp).

**3. Deviations.** Selected colors per variant; disabled tokens; missing 3px focus ring; <48dp
targets; stale shim.

**4. Required.** Fix selected color mapping; per-variant disabled tokens; add `m3-focus`; add
48dp hit-area expansion for xs/sm/md; drop shim, call token springs directly.

**5. Implemented.** `selectedStyles` = `text-m3-primary` for standard/outlined (filled/tonal "") +
fill-on-selected glyph; `disabledStyles` per variant; `m3-focus`; `before:` expander
28→48 / 36→48 / 40→48; direct `springs.fastVisual` / `springs.expressiveEffects`.

**6. Remaining.** Android Compose paints *no* container for any selected icon button; we keep
filled/tonal containers visible when selected (matches the M3 filled/tonal token table where
container color doesn't change between states). Visual identical to before for those variants.

---

## FAB.tsx

**1. Spec.** Sizes 40/56/96/132 (small/medium/large/extra-large), icons 24/24/36/48; corners 16dp,
**28dp on large/extra-large**; colors primary/secondary/tertiary/surface = *-container pairs
(surface = surface-container-high + on-surface); elevation 3 rest → 4 hover/pressed, lowered 1 → 2;
disabled = container on-surface 12% + icon 38%, elevation 0; 48dp touch target; press scale (M3E).

**2. Before.** Sizes/colors/elevation logic ✓; but `rounded-2xl` (16px) on **all** sizes (28dp
missing on large/XL); disabled kept rest elevation + blanket 38% alpha; no focus ring; no touch
expansion on the 40dp small FAB; stale `spring()` shim.

**3. Deviations.** Shape on large/XL; disabled tokens; focus ring; touch target.

**4. Required.** Per-size shape map; disabled → on-surface tokens + no shadow; `m3-focus`; small-FAB
hit-area expansion; direct token springs.

**5. Implemented.** `shape` per size (`rounded-2xl` / `rounded-[28px]`); disabled branch
`bg-m3-on-surface/12 text-m3-on-surface/38` with elevation classes removed; `m3-focus`;
`before:-inset-1` (40→48); springs called directly; exported `fabColorStyles`/types unchanged
(ExtendedFab/FabMenu unaffected).

**6. Remaining.** Source for elevation: m3.material.io FAB spec elevation tokens (rest level 3,
hover level 4, pressed level 4 — on web, pressed keeps the hover level because the pointer remains
over the element; recorded in meta). Dragged 16% state layer handled by `.m3-state` contract.

---

## ExtendedFab.tsx

**1. Spec.** Height 56dp, 16dp corners, 24dp icon, **8dp icon-label gap**, 20dp side padding,
label-large; same color roles/elevation/disabled rules as FAB.

**2. Before.** Height/padding/icon/colors/elevation ✓; gap-3 (12px) instead of 8dp; disabled
blanket 38% + kept elevation; no focus ring; stale shim.

**3. Deviations.** Gap; disabled; focus ring.

**4. Required.** gap-2; official disabled tokens; `m3-focus`; direct springs.

**5. Implemented.** All of §4 (label keeps `md-label-large`; disabled = on-surface 12%/38% +
`shadow-none!` effect via removing elevation classes; height 56 needs no touch expansion).

**6. Remaining.** The 8dp gap and 20dp padding are the M3 extended-FAB anatomy values; Google's
spec page is JS-rendered so exact table cells couldn't be scraped — values match the anatomy
diagram and our other icon+label gap rules (8dp); noted in meta.

---

## FabMenu.tsx (M3E)

**1. Spec/expected behavior.** M3E fab menu: small (40dp) FAB entry point rotating its icon 45°
into a close affordance; staggered 0→1 spring expansion of 32dp action FABs with rotation;
inverse-surface labels; menu-like dismissal (Escape / outside press); `aria-expanded`/
`aria-haspopup`; 48dp touch targets on 40/32dp controls; all motion tokenized.

**2. Before.** Expansion/rotation/labels ✓; but stagger delay was a raw `i * 0.03` (arbitrary,
untokenized); no Escape/outside dismissal; no `aria-haspopup`; no focus rings; no touch-target
expansion; stale shim.

**3. Deviations.** Untokenized stagger; missing dismissal; missing ARIA-haspopup; focus/touch gaps.

**4. Required.** Tokenize the stagger (`durations.short1` = 50ms); add dismissal listeners;
`aria-haspopup="menu"`; `m3-focus` + `::before` expanders (40→48, 32→48); direct springs.

**5. Implemented.** `delay: (i * durations.short1) / 1000`; document-level pointerdown/Escape
listeners while open; `aria-haspopup` + kept `aria-expanded` + dynamic `aria-label`;
`m3-state m3-focus` on main + action FABs; `before:-inset-1` / `before:-inset-2`; removed
`overflow-hidden` where the expander would clip; forwardRef now also exposes the container node.

**6. Remaining.** Action FABs stay primary-container regardless of the main FAB's `color`
(intentional hierarchy: menu items are tonal chips under the accent FAB); the 32dp action size and
45° rotation are M3E behaviors without a published dp table — kept and documented in meta.

**Resolved (round 4, task 4-c).** Added the M3E docked fab menu: new `docked` +
`dockedTo: 'screen' | 'bottom-app-bar'` props (default `'screen'`). Screen docking pins
`position: fixed; bottom: 0` to the viewport — or to a transformed ancestor such as a demo stage,
which becomes the containing block — with the closed FAB flush bottom-center and a vertical
cascade growing upward above it; bottom-app-bar docking anchors `position: absolute; bottom: 0`
inside the nearest positioned ancestor so the FAB rests directly on a bottom app bar and the
actions open as a horizontal row flush on top of the bar. Open-state shape morph animates the
main FAB's borderRadius `"16px 16px 16px 16px"` → `"16px 16px 0px 0px"` built from
`tokens.shapes.large`/`shapes.none` on `springs.expressiveEffects` (the BottomAppBar center-FAB
morph pattern); the docked root anchors by `right: calc(50% - 20px)` so the widening cascade
never shifts the FAB horizontally. Docking overrides `direction` (documented in JSDoc + meta).
Polish pass: label chips gain `whitespace-nowrap`, chip typography confirmed on the type-scale
token (`md-label-medium`), icon rotation stays on `springs.expressiveEffects`, entrance stagger
stays `durations.short1` + `springs.expressive`, `m3-focus` rings and 48dp `::before` hit
expanders unchanged; declined the optional surface-container underlay (would collide with the
bar's own surface-container and add noise — the connection reads through the squared corners).
Floating vertical/horizontal behavior byte-identical (non-docked renders no inline borderRadius).
Demo: `FabMenuDemo` gained a bordered "Docked" stage pair — screen-docked fixed menu inside a
transform stage + bottom-app-bar-docked menu above a real `BottomAppBar`. Verified: tsc clean,
lint 0 errors, agent-browser borderRadius eval open vs closed (bottom corners 0px vs 16px),
Escape dismissal + cascade intact, screenshot `tool-results/fab-menu-docked.png`.

---

## SplitButton.tsx (M3E)

**1. Spec/expected behavior.** Two joined pill segments; 1px 20%-current divider; 40px arrow
segment with rotating `arrow_drop_down`; menu = standard M3 menu surface (4dp corners = extra-small
shape token, elevation 2, 48dp items, label-large, Arrow/Home/End navigation, Escape + outside
dismiss); `aria-haspopup`/`aria-expanded`/`role=menu|menuitem`; disabled tokens as per buttons.

**2. Before.** Structure/ARIA/dismissal ✓; but menu used `rounded-lg` (8px) instead of the 4dp
menu-corner token; items were ~44px (py-3, no min-height); no in-menu keyboard navigation; no
focus rings; blanket `opacity-38` disabled; stale shim.

**3. Deviations.** Menu radius, item height, keyboard nav, focus rings, disabled tokens.

**4. Required.** 4dp menu corners (matches `Menu.tsx`), `min-h-12` (48dp) items, Arrow/Up/Down/
Home/End handler, `m3-focus` per segment, per-variant disabled tokens, direct springs.

**5. Implemented.** All of §4. Pill segments now own their rounding (`rounded-l-full`/
`rounded-r-full`) so the wrapper could drop `overflow-hidden` and focus rings aren't clipped;
menu gained `aria-label` + `onKeyDown` navigation; `disabledStyles` mirror the button family.

**6. Remaining.** Opening the menu doesn't auto-move focus into the first item (focus stays on the
trigger; Tab/Arrow reaches items). Auto-focus-in-menu is a pattern choice — recorded, not
blocking; M3 allows either when the trigger retains `aria-expanded` state.

---

## ButtonGroup.tsx (M3E)

**1. Spec/expected behavior.** M3E button group: pill segments with 4dp gutter (not the legacy
connected 1px-divider style); heights 40/56/76; selected = secondary-container + transparent
border; outlined base = 1px outline + on-surface label; variableWidths hover/selected flexGrow
(M3E signature); `aria-pressed` per segment; 48dp touch target on the 40dp size; disabled tokens.

**2. Before.** Gutter/variants/selection/variableWidths ✓; but blanket `opacity-38` disabled; no
focus rings; no touch expansion; stale shim.

**3. Deviations.** Disabled tokens; focus ring; touch target.

**4. Required.** Per-variant disabled tokens (12%/38%); `m3-focus` per segment; vertical
`::before` expansion (40→48) — horizontal expansion skipped to avoid overlapping neighboring
segments across the 4px gutter; direct springs.

**5. Implemented.** All of §4; per-value transition map (scale fastVisual, flexGrow
defaultSpatial) preserved; group `role="group"` + `aria-pressed` kept.

**6. Remaining.** Segments do not render the legacy 1px dividers — M3E's gutter treatment
intentionally replaces them (documented in meta anatomy). Hover-growth uses flexGrow (layout
spring), not width — no official token for the 1.4 factor; kept as the established M3E interpretation.

---

## SegmentedButton.tsx

**1. Spec.** Height **40dp** (2–5 connected segments in one pill outline, 1px dividers, selected
segment = secondary-container + leading check, unselected label on-surface, `aria-pressed`,
state layers, 3px focus ring; disabled = outline 12% + content on-surface 38%).

**2. Before.** Structure/selection/check motion ✓; but **default size md = 56dp** (spec is 40dp);
container `overflow-hidden` clipped focus rings; disabled = whole-control 38% alpha; no focus
rings; stale shim.

**3. Deviations.** Default height; disabled tokens; focus ring; shim.

**4. Required.** Default `size="sm"` (40dp) with md documented as an expressive opt-in; official
disabled treatment incl. 12% selected fill; `m3-focus` per segment; end segments own the pill
rounding so `overflow-hidden` could be removed; direct springs.

**5. Implemented.** All of §4. Note the height contract is preserved: container stays 40dp; the
visible 38px segment box is the 40dp container minus the two 1px outline strokes.

**6. Remaining.** No touch-target expansion possible inside the shared 40dp pill without breaking
the connected shape (recorded tradeoff). Radio-style `role="radiogroup"` semantics were considered
and rejected: Material keeps toggle-button (`aria-pressed`) semantics for segmented buttons on web.

---

## actions-demos.tsx

**1. Contract.** Must keep exporting ButtonDemo, IconButtonDemo, FabDemo, ExtendedFabDemo,
FabMenuDemo, SplitButtonDemo, ButtonGroupDemo, SegmentedButtonDemo + `actionsDemoMap` keyed by
the 8 meta ids; demos must exercise spec states.

**2–3. Audit result.** Contract intact; all demos already show variants/sizes/disabled/loading/
toggle/selection states with correct `aria-label`s on icon-only controls. Demo visuals improve
automatically via the component fixes (spec disabled colors, 40dp segmented default, 28dp large
FAB corners). No deviations against the demo contract.

**4–5. Changes implemented.** None required — left byte-identical on purpose (explicit contract
requirement), except inheriting the component fixes.

**6. Remaining.** The ButtonDemo "Sizes" row still labels 76/96 as "Large/Extra large" — matches
the component's public API, fine.

---

## meta.ts (8 blocks)

Updated only my 8 metas, small unique-anchor edits:
- **buttonMeta**: anatomy label text note (14px; 600 vs official 500 recorded); states now
  "Pressed (shape morph pill→20dp + 96% scale)" (now true) and official disabled tokens.
- **iconButtonMeta**: selected state corrected (primary icon for standard/outlined; containers
  unchanged); disabled tokens; 48dp touch target anatomy.
- **fabMeta**: 16dp/28dp corners per size; elevation 4 while pressed; disabled tokens; small-FAB
  touch target.
- **extendedFabMeta**: 8dp gap / 20dp padding anatomy; disabled tokens; weight-deviation note.
- **fabMenuMeta**: stagger = durations.short1 token; Escape/outside dismissal; touch targets.
- **splitButtonMeta**: menu anatomy (4dp corners, 48dp items); keyboard nav; disabled tokens.
- **buttonGroupMeta**: 48dp touch target anatomy; disabled tokens.
- **segmentedButtonMeta**: `size` default `'sm'` = official 40dp, md = expressive opt-in;
  disabled tokens; matching `disabled` prop descriptions across all 8.

---

## Cross-component consistency notes

1. **Disabled state is now role-based everywhere** (container on-surface 12% / content 38% /
   outline 12% / elevation 0) instead of `opacity-38` — consistent across Button, IconButton, FAB,
   ExtendedFab, SplitButton, ButtonGroup, SegmentedButton. `pointer-events-none` kept so
   `.m3-state` hover/press layers and ripples stay suppressed.
2. **Hover never recolors containers** in the actions family; feedback comes exclusively from the
   shared `.m3-state` layers (8/10/10%, 16% dragged per globals) — matches the M3 state model.
   Only the elevated button and FABs change elevation on hover (documented workaround: arbitrary
   `hover:[box-shadow:…]` with exact M3 level-2 values, since `.m3-elevation-*` are unlayered CSS).
3. **Focus rings**: every interactive element now carries `m3-focus` (3px primary outline, offset 2).
   Containers that clipped outlines (SplitButton pill, SegmentedButton pill) no longer use
   `overflow-hidden`; segments own their end-rounding instead.
4. **48dp touch targets** are added via an invisible `::before` hit-area extension on every
   sub-48dp control (buttons xs/sm, icon buttons xs/sm/md, small FAB, FabMenu 40/32dp, button-group
   segments vertically). Expanded areas can overlap siblings by a few px in dense rows — the
   standard tradeoff for meeting the minimum-target guideline without breaking 40dp visuals.
   SegmentedButton is the one exception (container-bound, recorded).
5. **Motion**: all transitions resolve to `springs.*` / `durations.*` tokens directly (the local
   `spring()` shims are gone from every file in this family — tokens.ts was centrally fixed in
   task 4-6). The stagger uses `durations.short1`, the spinner uses `durations.extraLong4`.
   No keyframe-array + spring combos (the known framer crash pattern).
6. **Known global deviations (recorded, not fixed — out of scope)**: `.md-label-large` renders
   weight 600 vs official 500; M3E-only sizes (lg/xl buttons, md segmented, 32dp fab-menu actions,
   1.4 flexGrow factor, 45° menu rotation) have no published dp/curve tokens; values documented in
   code + meta comments.
7. **Verification**: `bunx tsc --noEmit` filtered to my 10 files → 0 errors; `bun run lint` filtered
   to m3/showcase errors → none; live browser checks confirmed computed spec values (40/56 button
   heights, 14px/0.096px labels, shape-morph mid-animation, primary selected icon color, FAB
   16/28px radii + level 3/4 shadows, 4px menu radius + 48px items, 40dp segmented control,
   Escape/outside dismissal) and zero page errors.
Resolved (round 3, task 3-c): segments expand touch target to ≥48dp vertically via ::before hit-expander.
