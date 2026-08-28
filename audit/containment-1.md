# Audit — Containment family part 1 (Task 2-d-1)

Scope: `Card`, `List/ListItem`, `Dialog`, `Divider` (+ `CardDemo`/`ListDemo` in `containment-demos.tsx` + the `cardMeta`/`listMeta`/`dialogMeta`/`dividerMeta` blocks in `meta.ts`).

Verification sources (fetched live): m3.material.io `components/lists/specs`, `components/cards/specs`, `components/dialogs/specs`, `components/divider/guidelines`, `components/lists/overview`; MDC-Android `docs/components/Divider.md`; Compose-M3E ListItem issue tracker entry. Key spec rows scraped from the official pages are quoted inline below.

**Important scope finding.** `DialogDemo` and `DividerDemo` do **not** live in `containment-demos.tsx` — they (and the `dialog:`/`divider:` registry keys) live in `feedback-demos.tsx`, written by task 3-c and audited by task 2-e. Per the no-cross-region rule I did **not** touch them; they resolve correctly through `feedbackDemoMap` (verified in `demo-registry.ts`), so the demo contract for all 4 components holds: `containmentDemoMap` keeps `card` + `list`, and `dialog`/`divider` come from `feedbackDemoMap`. I audited those two demo sections **read-only** — both remain API-compatible with the fixed Dialog/Divider (no `aria-describedby` assumptions, icon+headline dialogs render per the new centering rule correctly).

Per-component sections: (1) spec, (2) implementation before, (3) deviations, (4) required changes, (5) implemented, (6) remaining limitations.

---

## 1. Card

**Material spec.** Elevated: `surface-container-low` + elevation 1; filled: `surface-container-highest` + elevation 0; outlined: surface + 1dp stroke; 12dp medium corners (M3E adds 28dp extra-large); interactive hover 8% state layer, pressed 10%; press shape morph; disabled content 38%.
**Verified value change vs. brief.** The brief hypothesized outlined = "1dp `outline`". The **current official page** (`m3.material.io/components/cards/specs` → "Outlined card color roles: 1. Surface, 2. Outline variant") uses **outline-variant** — matching Compose `OutlinedCardTokens.OutlineColor = OutlineVariant` and superseding the 2021 token sheet's `outline`. Hover elevation 2 is a brief/M3E-prescribed lift (the strict M3 token keeps level 1 on hover); kept per brief.
**Before.** Colors, 12dp/28dp shapes (inline `shapes.*`), hover-elevation-2 (exact `.m3-elevation-2` shadow as a Tailwind arbitrary property, elevated variant only), press morph `shapeMorph.card` (medium→small) + 97% scale on `springs.expressive`, `.m3-state` 8%/10%, ripple, role=button + Enter/Space, `m3-focus` — all present.
**Deviations found.** None functional. Only unverifiable documentation: the outlined stroke color had no provenance note; docs claimed hover 2 without scoping.
**Required / implemented.** No behavioral change required. Added a provenance comment on the outlined variant documenting the verified outline-variant finding so the next auditor doesn't "fix" it back to `outline`. Meta anatomy now records "outlined = surface + 1dp outline-variant stroke".
**Remaining limitations.** No `disabled` prop on Card (official has a disabled state at 38%; meta documents the content-styling workaround). Hover elevation is applied only to the elevated variant (correct M3 — filled/outlined stay level 0; brief's generic phrasing was resolved in favor of the component spec). Hover shadow transition is CSS `transition-shadow duration-200` because `.m3-elevation-*` are plain CSS classes framer can't tween — 200ms = `durations.short4`, same precedent as Button's `transition-colors duration-150`.

## 2. List / ListItem

**Material spec (official page values).** Heights: "either **56dp, 72dp, or 88dp**" (overview + M3E issue: "56dp for one line items; 72dp two; 88dp three") → the brief's 48dp one-line guess was **superseded**: 56dp one-line is current spec. Paddings (specs table): label/leading left 16dp, **trailing right 24dp**, leading icon top padding **12dp when height ≥88dp**, trailing left padding 16dp; "Divider inset left **16dp** / right **24dp**" → the brief's "inset start = 72dp" is the **legacy M2 value**, not current M3. Leading slot 40dp; headline body-large; supporting body-medium `on-surface-variant`; selected = secondary-container + on-secondary-container; disabled 38%; hover 8% / pressed 10% + ripple; ul/li + native button semantics.
**Before.** One-line 48dp ✗; 72/88dp ✓; 16dp left + 24dp right padding ✓ (verified correct — not "wrong 24"); 40dp leading, gap-4 (16dp) ✓; three-line `pt-3` (12dp) top padding ✓; body-large/body-medium/label-small ✓; selected/disabled/state layer/ripple/Enter-Space/ul-li ✓.
**Deviations found.** (1) One-line rows 48dp instead of 56dp. (2) Misleading `dividers` doc comment implying the CSS `divide-y` full-width rule was the official 16/24 inset. (3) meta propagated the 48dp figure in three places.
**Required / implemented.** `min-h-12` → `min-h-14` (56px) with comment; `dividers` comment rewritten (full-width divide-y; official 16/24 inset available via `<Divider inset="start"/>`); listMeta anatomy/`lines` prop/`states` updated to 56/72/88 + "≥48dp touch targets"; `dividers` prop description now states full-width and points at the inset Divider.
**Remaining limitations.** `List.dividers` cannot render the official 16/24-inset divider inside the ul without invalid HTML (a `div role=separator` child of `ul`); full-width dividers are spec-valid, and the inset value remains available on `Divider`. Trailing helper-text type style (`md-label-small`) could not be confirmed against the specs page (its typography table is image-only); kept as-is.

## 3. Dialog

**Material spec (official page values).** Container 28dp corners, min 280dp / max 560dp; **icon 24dp, "Alignment with icon: Center-aligned; alignment without icon: Start-aligned"** (headline centering rule); 24dp container padding; **8dp between buttons**; 16dp icon→title and title→body; **24dp body→actions**; scrim 32% black (verified — the brief's "50%?" alternative is wrong); headline-small 24; body-medium `on-surface-variant`; fullscreen: 0dp corners, 56dp header + 56dp bottom action bar; focus trap + restore, Escape/scrim dismiss when dismissible, body scroll lock, `role=dialog aria-modal aria-labelledby aria-describedby`.
**Before.** 28dp/280–560/elevation 3/surface-container-high ✓; 32% scrim ✓; 24dp padding ✓; 8dp action gap ✓; 16dp title→body ✓; focus trap/restore, Escape, scrim dismiss, scroll lock, labelledby ✓. Deviations: headline **always** start-aligned (wrong with icon — official centers icon+headline); body→actions gap 16dp (official 24dp); **no `aria-describedby`**; scrim used raw `"easeOut"` literal.
**Required / implemented.** Headline gets `text-center` when `icon` is set (icon stays centered); action row `pt-4` → `pt-6` (24dp); `bodyId = useId()` wired `id` → `aria-describedby` when children present; scrim transition keeps `durations.short4` with a comment mapping `"easeOut"` ≙ `easings.standardDecelerate` (tokens' easings are CSS strings, not framer `Easing` tuples — TS rejected the raw string); dialogMeta anatomy updated (24dp above actions, centering rule, describedby wiring).
**Remaining limitations.** With multiple dialogs open, a single Escape closes all (no dialog stack); headline-less dialogs have no accessible name (callers are guided to always pass `headline` — meta "dos"); fullscreen variant doesn't yet pin a 56dp header/56dp action bar geometry (content flows naturally; official fullscreen metrics noted in meta).

## 4. Divider

**Material spec (verified).** 1dp thickness; color `outline-variant` (decorative; `outline` = heavier option); **list divider inset = 16dp start / 24dp end** (M3 lists specs — supersedes M2's 72dp); divider guideline: "Inset dividers are equally indented from both sides by default" (= our 16dp/16dp middle); MDC-Android `MaterialDividerItemDecoration` achieves inset/middle with 16dp/16dp; vertical support; `role=separator` + `aria-orientation`.
**Before.** All of the above was already implemented correctly (`start` = `ml-4 mr-6`, `middle` = `mx-4`, 1px default, outline-variant default, vertical orientation). The only defect was documentation: the inset was described as "aligns with list item text" (list text actually starts at 16+40+16 = 72px with a leading icon) and no source distinguished the M2 72dp value from the current M3 16/24.
**Required / implemented.** Comments + dividerMeta rewritten with the verified provenance: start = official list insets 16/24 ("72dp start inset is the legacy M2 value"), middle = 16dp equal indents per the divider guideline, end = 16dp library extension. **No functional change** — the brief's hypothesized 72dp start inset was rejected on evidence.
**Remaining limitations.** No `component`/`as` prop, so a Divider can't render as `li` for inset use directly inside a `ul` (the List `dividers` prop covers the common case full-width); middle/end presets are documented extensions, not numbered official variants.

## 5. Demos (`containment-demos.tsx` — my regions only)

`CardDemo` (lines 22–71) and `ListDemo` (lines 77–119) audited: **no changes needed** — no text references the old 48dp height, the outlined card copy doesn't name a border color, and the 56dp/72dp/88dp geometry flows through automatically. `containmentDemoMap` keys unchanged (`card`, `list` + the other agent's four). `BottomSheetDemo`/`SideSheetDemo`/`DatePickerDemo`/`TimePickerDemo` regions untouched. `DialogDemo`/`DividerDemo` verified read-only in `feedback-demos.tsx` (other agent's region) — still compile and match the fixed Dialog API.

## 6. Cross-component consistency notes

- **Motion**: springs only via `transition={springs.*}` (Card expressive, List fastVisual, Dialog expressive); durations via `durations.short4`; the two remaining CSS/named-easing transitions (Card hover-shadow `duration-200`, Dialog scrim `"easeOut"`) are documented tokens-equivalents with the same precedent as the reference Button.
- **Colors**: all `m3-*`/`var(--md-*)`; scrim via `bg-m3-scrim/32`.
- **State layers**: 8% hover / 10% pressed via shared `.m3-state`; focus rings via `.m3-focus`; press shape morphs via `shapeMorph`.
- **Geometry truth table** (official, scraped): list 56/72/88dp; list divider inset 16/24dp; card outlined stroke outline-variant; dialog scrim 32%; dialog body→actions 24dp. Two brief hypotheses were overturned with evidence (list 48dp one-line, divider start 72dp) and recorded in meta so they don't regress.
- **Touch targets**: one-line rows now 56dp; interactive cards are full-surface targets; dialog action buttons come from the 40dp text-button reference.
- **Verification**: `bunx tsc --noEmit | grep (Card|List|Dialog|Divider|containment-demos|meta).tsx` → empty; `bun run lint | grep -iE error | grep (m3|showcase)` → empty. (Full-project tsc shows only pre-existing errors under `examples/` and `skills/`.) No files outside the 4 components + 4 meta blocks + this audit/worklog were modified; `containment-demos.tsx` is byte-identical.
