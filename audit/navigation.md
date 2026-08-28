# Navigation Family — M3/M3E Spec Audit (Task 2-c)

Scope: `Tabs.tsx`, `NavigationBar.tsx`, `NavigationDrawer.tsx`, `NavigationRail.tsx`, `TopAppBar.tsx`, `BottomAppBar.tsx`, `Toolbar.tsx`, `Menu.tsx`, `navigation-demos.tsx`, and the 8 corresponding meta blocks in `src/lib/m3/meta.ts`.
Verification: `bunx tsc --noEmit` → 0 errors in all assigned files (only 4 pre-existing scaffold errors remain in `examples/`+`skills/`); `bun run lint` → 0 errors matching m3/showcase.

Legend per component: (1) spec target, (2) previous implementation, (3) deviations found, (4) required changes, (5) changes implemented, (6) remaining limitations.

---

## 1. Tabs (`src/components/m3/Tabs.tsx`)

1. **Spec (m3.material.io/tabs):** primary tabs 64dp tall, icon (24dp, filled when active) + label (label-large), active indicator = 3dp underline in primary color, centered under content; secondary tabs 48dp tall with a tonal (secondary-container) pill indicator; min tab width ≈ 96dp; min touch target 48dp; scrollable tabs show leading/trailing arrows while content overflows in that direction; keyboard per WAI-ARIA tabs pattern (roving tabindex, ArrowLeft/Right + Home/End, automatic activation); badge support on the icon.
2. **Before:** primary row `h-16` (64px) ✓ with 3px underline; but **secondary reused the same 64px row** (spec: 48dp); label was `md-title-small` (spec: label-large); horizontal scroll existed but **no scroll arrows**; **no keyboard navigation** (no roving tabindex/arrows).
3. **Deviations:** secondary height 64→48 missing; label type style wrong; scroll arrows missing; roving tabindex/arrow keys missing.
4. **Required:** 48dp secondary row; label-large; scroll arrows on overflow direction; roving-tabindex arrow-key activation; keep 3dp underline + pill.
5. **Implemented:** row height is `h-16` (primary) / `h-12` (secondary); secondary pill resized (`inset-x-1 inset-y-2` → 32dp pill in the 48dp row); label span → `md-label-large`; scroll state tracked via scroll listener + `ResizeObserver`, chevron arrow buttons (48dp, state layer + ripple) render only while overflow exists in that direction and scroll by 75% viewport; roving tabindex (`tabIndex={active ? 0 : -1}`) with `ArrowLeft/Right/Home/End` focus + automatic `onChange` activation; `fill={active}` icon/outline switch and badge retained; springs.expressive layoutId indicators unchanged.
6. **Limitations:** ~~underline width is the spec-approximate `w-1/3` centered~~ **Resolved (round 8, task 8-a verification):** the underline is now sized to the measured label text width — per-tab label spans are measured via `getBoundingClientRect` with a `ResizeObserver` per label + `document.fonts.ready` re-measure; `w-1/3` remains only as the pre-measurement fallback. Live check: indicator 37.1px == label 37.1px (3px height). `aria-controls`/tabpanel linkage is left to consumers since the component renders only the tab strip.

## 2. NavigationBar (`src/components/m3/NavigationBar.tsx`)

1. **Spec:** 80dp bar on surface-container; destinations 3–5; active icon 24dp inside a **64×32dp secondary-container pill**, inactive icon 24dp; badge (error) on icon; label-medium; active label on-surface, inactive on-surface-variant; ripple + 8/10% state layers.
2. **Before:** `h-20` surface-container bar, `h-8 w-16` (32×64) pill, 24dp icons with `fill={active}`, error badges, `md-label-medium`, correct on-* colors, `aria-label="Primary"`, `aria-current="page"`, layoutId pill on springs.expressive.
3. **Deviations:** none found — all audited tokens matched official values.
4. **Required:** none.
5. **Implemented:** no code change; meta anatomy text updated to name the 64×32dp pill and 24dp icons explicitly.
6. **Limitations:** no arrow-key handling — the WAI-ARIA/navigator patterns don't require it for `role=navigation` links-style controls; each destination is natively tabbable with a ≥48dp target.

## 3. NavigationDrawer (`src/components/m3/NavigationDrawer.tsx`)

1. **Spec:** container width **360dp** (modal *and* standard), surface-container-low, 16dp trailing corners; 56dp full-width `Corner.Full` pill items (12dp horizontal inset); active = secondary-container pill with on-secondary-container icon+label; inactive = **on-surface-variant** icon and label; 24dp icons; badges; modal = 32% scrim, closes on scrim/Escape/destination select; modal is an `aria-modal` dialog requiring focus management (initial focus, Tab trap, focus return).
2. **Before:** modal width **320px**, standard **280px**, corners `rounded-3xl` (24px); scrim `/50`; inactive label used `text-m3-on-surface` (spec: on-surface-variant); Escape ✓ + scrim ✓ but **no focus trap, no initial/return focus, no scroll lock**; selecting a destination did **not** dismiss the modal drawer; item height 56dp ✓ pill ✓.
3. **Deviations:** width 320/280 vs 360; scrim 50% vs 32%; corners 24 vs 16dp; inactive label color; missing focus trap/restore; missing select-closes behavior.
4. **Required:** 360dp both variants; /32 scrim; 16dp trailing corners; inactive label on-surface-variant; focus trap + restore; close modal on select.
5. **Implemented:** modal `w-[360px] rounded-r-2xl`, standard `w-[360px] rounded-2xl` (border dropped — spec drawer separates tonally, not by stroke); scrim `bg-m3-scrim/32`; inactive label → `text-m3-on-surface-variant`; on open: body scroll lock, panel focused (`tabIndex={-1}`, `focus:outline-none`), `Tab`/`Shift+Tab` cycle trapped inside the panel; on close: listeners removed, scroll restored, focus returned to the previously focused element; selecting a destination now also closes the modal variant (standard stays pinned).
6. **Limitations:** none functional; M3E direction note — Google is deprecating the drawer in favor of the expanded rail; out of scope, documented here only.

## 4. NavigationRail (`src/components/m3/NavigationRail.tsx`)

1. **Spec:** 80dp wide rail; destination = 24dp icon inside a **56×32dp** secondary-container active capsule + label-medium label; header slot for FAB; **optional leading menu icon** (official anatomy item — the M3E expanded/collapsed rail toggle); badge support; on-surface-variant inactive content.
2. **Before:** `w-20` (80dp) ✓, `h-8 w-14` (32×56) capsule ✓, header slot ✓, labels ✓, colors ✓ — but **no menu icon**.
3. **Deviations:** missing optional menu icon affordance.
4. **Required:** optional leading menu icon.
5. **Implemented:** new `menuIcon` (name, default `"menu"`) + `onMenuClick` props; when `onMenuClick` is set a 48dp `m3-state` icon button renders above the header slot. Rail demo passes `onMenuClick` to exercise it.
6. **Limitations:** container color stays `bg-m3-surface-container-low` — the m3 rail spec lists a surface/surface-container (optional) tint; surface-container-low is a documented M3 role consistent with the drawer, kept deliberately. The M3E *expanded* rail (drawer replacement) is a separate component and out of scope.

## 5. TopAppBar (`src/components/m3/TopAppBar.tsx`)

1. **Spec:** heights 64 / 64 (center) / 112 (medium) / 152 (large); rest container = **surface**; on-scroll = **surface-container color fill with no shadow** (M3 replaces the M2 elevation shadow with tonal color — confirmed via m3.material.io overview "M2 top app bar with elevation to separate; M3: on scroll a color fill overlay separates the app bar" and the MDC "M3 removed the drop shadow" issue); flexible titles collapse into the 64dp row; large headline = **headline-large** (36), medium = headline-small (24), on-scroll title = title-large; icon hit targets ≥ 44dp.
2. **Before:** heights all correct ✓; scrolled state added `bg-m3-surface-container m3-elevation-2` — the **shadow is M2 legacy**; rest was `bg-transparent` (spec: surface); icon buttons 40px; large hero title `md-headline-medium` (28) instead of `md-headline-large`; CSS transition used hardcoded `duration-300`.
3. **Deviations:** M2-style scroll shadow; rest color; 40→44dp hit target; large title type scale; transition not token-driven.
4. **Required:** remove scroll shadow (color fill only); rest = surface; 44dp icon buttons; large → headline-large; token-driven durations.
5. **Implemented:** `barState = scrolled ? "bg-m3-surface-container" : "bg-m3-surface"`; small/center header fades background-color via CSS transition using `durations.medium2` + `easings.standard` tokens; the flexible `motion.header` now animates `backgroundColor` in framer (per-value transition: height on `springs.defaultSpatial`, color on `durations.medium2` with the M3 standard curve `[0.2,0,0,1]` — framer's `Easing` type rejects cubic-bezier strings, arrays are the native form); `AppBarIconButton` → `h-11 w-11` (44px); large hero title → `md-headline-large`.
6. **Limitations:** collapse threshold remains `height − 64` (48/88px) — the official pin behavior tracks the title scrolling out of view; close enough visually and configurable via the scroll observer.

## 6. BottomAppBar (`src/components/m3/BottomAppBar.tsx`)

1. **Spec:** 80dp surface-container bar; navigation icon (optional, leading) + actions (48dp targets, on-surface-variant), trailing icons; center-docked FAB (primary-container) notching the bar; M3 elevation is **tonal-only** (MDC: 3dp elevation with `addElevationShadow=false` — no shadow drawn); M3E press shape morph.
2. **Before:** 80dp surface-container ✓, 48px action buttons ✓, trailing icons ✓, docked FAB with 16→28 morph + `m3-elevation-3` ✓ — but **no navigation icon** (official anatomy item).
3. **Deviations:** missing navigationIcon; otherwise compliant (shadowless tonal bar already matched M3 practice).
4. **Required:** add optional leading navigation icon.
5. **Implemented:** new `navigationIcon?: { icon; label?; onClick? }` prop (type alias `BottomAppBarNavigationIcon` exported), rendered first in the leading group with aria-label/title + ripple; demo passes `{ icon: "menu", label: "Menu" }`.
6. **Limitations:** no true *notch* cutout — M3's default docked FAB overlaps the bar's top edge (ours: half above, half inside), matching the official default; a cut-out cradle is an optional platform nicety. Meta notes the M3E guidance that the docked Toolbar supersedes this component.

## 7. Toolbar (M3E) (`src/components/m3/Toolbar.tsx`)

1. **Spec (Material 3 Expressive):** floating toolbar = pill container, default width **560dp**, elevation 2, four container-color roles (surface/primary/secondary/tertiary container + on-container pairs); active items get an **on-container/12% pill** + filled icon; dockable variant morphs pill ↔ square full-width docked bar (elevation 1); M3E docked toolbar is *shorter* than the deprecated 80dp bottom app bar — canonical height 56dp; corner morphs are the signature M3E behavior.
2. **Before:** width 560 default ✓, colors ✓ (on-container/12 active pill ✓), dockable morph ✓ — but bars were `h-16` (64px), and the dock/floating transitions used hardcoded `transition-all duration-300`.
3. **Deviations:** height 64 vs 56dp; transitions not token-driven.
4. **Required:** 56dp pill/bar height; token-driven transition duration/easing.
5. **Implemented:** both variants `h-14` (56px, padding rebalanced `px-2`/`px-3` so 48px buttons still fit); `transitionDuration: durations.medium2` + `transitionTimingFunction: easings.standard` applied via inline style (tokens) for the dock morph and floating entrance; floating entrance still `springs.expressiveEffects`.
6. **Limitations:** press-level corner morph on individual items is delegated to Ripple + state layers (item press scale isn't spec-mandated for toolbar items); item count guidance (3–5) documented in meta.

## 8. Menu (`src/components/m3/Menu.tsx`)

1. **Spec:** container = **4dp** corners (extra-small), surface-container, elevation 2, 8dp vertical padding; items min-height **48dp**, label body-large, **24dp leading icon in a 12px gutter**, trailing shortcut text, dividers, section labels; disabled 38%/38%+12%; opens from the top origin (fastVisual scale); closes on item click / outside press / Escape; ARIA `role=menu`/`menuitem` + trigger `aria-haspopup`/`aria-expanded`; WAI-ARIA keyboard: focus first item on open, ArrowUp/Down/Home/End cycle, Escape/Tab close with focus returned to the trigger.
2. **Before:** radius 4px ✓, surface-container ✓, elevation-2 ✓, `py-2` ✓, 48dp items ✓, shortcut ✓, divider ✓, label ✓, disabled ✓ — but icons were **20px** (spec 24), **no keyboard navigation**, **no aria-haspopup/expanded**, focus was never moved into the menu or restored on close.
3. **Deviations:** icon size; keyboard + focus management; trigger ARIA attributes.
4. **Required:** 24dp icons; full WAI-ARIA menu keyboard pattern; aria on trigger.
5. **Implemented:** icon `size={24}`; trigger cloned with `aria-haspopup="menu"` + `aria-expanded` and `ArrowDown` opens (original trigger onClick/onKeyDown preserved); on open, focus moves to the first enabled item (`requestAnimationFrame`, roving `tabIndex={-1}` on items); panel `onKeyDown`: ArrowUp/Down wrap, Home/End jump, Escape closes + restores trigger focus, Tab closes and lets focus flow; item activation closes + restores trigger focus; outside-mousedown close retained.
6. **Limitations:** no submenu/cascade stagger — M3's single-surface scale-from-origin motion is implemented (spec-conformant); `aria-controls` id linking omitted (single anchored panel).

## 9. Cross-component consistency notes

- **Springs/typing:** every transition goes through the file-local `spring()` helper re-narrowing tokens to framer's `Transition` (documented batch convention; tokens.ts was already centrally fixed, helper is harmless). New per-value transitions (TopAppBar color) use `durations`/`easings`/standard-curve arrays — no magic numbers.
- **Colors:** only `m3-*` classes / `var(--md-*)` used everywhere (e.g. TopAppBar animates `var(--md-surface-container)`).
- **State layers:** all interactive surfaces keep `.m3-state` (8% hover / 10% focus+pressed) + Ripple; disabled Menu items 38%.
- **Touch targets:** Tabs ≥48dp, nav destinations ≥48dp, app-bar/toolbar icon buttons 44–48dp.
- **layoutId namespaces:** per-instance `React.useId()` prefixes kept (tabs/drawer/bar/rail pills don't cross-talk on one page).
- **Scrim inconsistency (pre-existing, out of scope):** my drawer now uses the official **32%** scrim while Dialog (50%), BottomSheet, and SideSheet (other agents' files) still use 50% — flagging for a future cross-batch pass; not changed here per scope rules.
- **Demo contract:** `navigation-demos.tsx` keeps all 8 named demos and the `navigationDemoMap` keys; only visual/behavioral additions (rail menu icon, bottom-bar navigation icon, drawer 360dp + label-large headline).
- **Meta blocks:** all 8 metas updated in place (`tabsMeta`, `navigationBarMeta`, `navigationDrawerMeta`, `navigationRailMeta`, `topAppBarMeta`, `bottomAppBarMeta`, `toolbarMeta`, `menuMeta`) — descriptions/anatomy/states/props now state the official values (360dp drawer, 64/48dp tabs, 64×32 & 56×32 pills, no-shadow app bars, 24dp menu icons, keyboard support, new rail/bottom-bar props). Component files still re-export their meta from `@/lib/m3/meta` (single source of truth preserved).
Resolved (round 3, task 3-c): underline indicator now measures label text width via ResizeObserver + fonts.ready.
