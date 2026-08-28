# Containment/selection audit — part 2 (Task 2-d-2)

Scope: `BottomSheet.tsx`, `SideSheet.tsx`, `DatePicker.tsx`, `TimePicker.tsx`, the
BottomSheet/SideSheet/DatePicker/TimePicker demo sections of `containment-demos.tsx`,
and the `bottomSheetMeta` / `sideSheetMeta` / `datePickerMeta` / `timePickerMeta`
blocks of `meta.ts`.

Spec sources used: m3.material.io component specs + (authoritative for pickers)
androidx-main `compose/material3` `TimePickerTokens.kt` / `TimePicker.kt` fetched
from android.googlesource.com during this audit. Where this tasking prompt and the
official sources disagreed, the official source won (both cases noted below).

---

## BottomSheet

1. **Material specification being followed.** Modal bottom sheet: 28dp top corners,
   surface-container-low, elevation level 1, full width up to 640dp (56dp margins on
   >640dp windows), 32×4dp on-surface-variant drag handle 22dp from the top, modal
   scrim = black at 32%, height capped at screen − 72dp; standard variant = same
   container, inline, no scrim. Drag-to-dismiss, Escape close, scroll lock for modal.
2. **Current implementation (before fix).** Corners/container/handle/640dp/72dp margin
   already correct; scrim already `bg-m3-scrim/32` = black 32% (the audit prompt's
   "ours is 50%" was stale — code and `--md-scrim` are 32%, correct).
3. **Deviations found.**
   - No focus management: focus never moved into the open sheet, never restored to the
     trigger on close, and Tab could escape to the page behind (modal).
   - Drag-to-dismiss used offset-only (`> 120px`); a fast downward fling didn't dismiss.
   - Meta drift: `variants: ["modal"]` (component ships `standard` too), scrim
     documented as "50%", `maxHeight` default documented `'85vh'` vs actual
     `calc(100dvh - 72px)`, no `variant` prop doc.
4. **Required changes.** Add focus-move/restore + Tab trap (Dialog pattern); add
   velocity threshold to drag dismissal; sync meta.
5. **Changes implemented.**
   - `FOCUSABLE` selector + `panelRef`/`restoreFocusRef`; on open (modal) focus moves
     to the sheet (tabIndex −1, `outline-none`), on close focus returns to the trigger;
     `onKeyDown` Tab trap with Shift-Tab wrap.
   - `onDragEnd`: dismiss when `offset.y > 120 || velocity.y > 500`.
   - Docstring + meta updated (variants, variant prop, scrim 32%, elevation 1, 640dp,
     handle 22dp, velocity dismiss, focus behavior, maxHeight default).
6. **Remaining limitations.** Spring `y: "100%"` slide uses the default spatial spring
   (official uses the emphasized EasingDurationCurve; spring is our library-wide
   motion convention). No nested-sheet support (documented as a dont).

## SideSheet

1. **Material specification being followed.** Side sheet: 360dp standard width
   (cap 400dp), **16dp corner radius on the inner (docked) edge only** — verified
   against m3.material.io, which literally captions its anatomy image "A modal side
   sheet showing the 16dp corner radius" (the tasking prompt's "28dp" is wrong);
   edge corners stay square. Modal = 32% scrim, blocks content, Escape + scroll lock;
   standard = no scrim, inline on surface. 24dp padding, 12dp between top elements.
2. **Current implementation (before fix).** Radius/widths/colors/variants/scrim/
   Escape/scroll-lock all already correct.
3. **Deviations found.**
   - No focus trap/restore for the modal variant.
   - No elevation on the modal panel (official sheet container elevation = level 1).
4. **Required changes.** Focus management; elevation 1 on modal panel; meta sync.
5. **Changes implemented.**
   - Same focus pattern as Dialog/BottomSheet: focus into panel on open, restore on
     close, Tab trap (modal only).
   - `m3-elevation-1` on the modal panel; standard stays flat (inline, elevation 0).
   - Docstring + meta anatomy/states updated (elevation 1, edge corners square, focus).
6. **Remaining limitations.** Standard demo panel is a fixed 320px-tall inline block —
   real standard side sheets span the layout height; demo-context trade-off (kept).
   No drag/swipe-to-dismiss gesture (official side sheet has no drag affordance either).

## DatePicker

1. **Material specification being followed.** Compact simplified inline picker:
   28dp surface-container-high panel, month-year header toggle, weekday row
   (label-medium columnheaders), 6×7 grid of 40dp circular day cells, selected =
   primary circle + on-primary, today = 1dp primary outline, disabled (min/max) = 38%,
   48dp prev/next chevron targets, month ⇄ year views, ARIA grid semantics.
2. **Current implementation (before fix).** Grid/roles/roving tabindex/arrow keys/
   Home/End/today/disabled already correct (documented landscape 568×368 / portrait
   328×512 omission in meta).
3. **Deviations found.**
   - Chevrons were 40×40 — below the 48dp minimum touch target.
   - Day-cell `aria-label` omitted the year ("March 8" → ambiguous across months).
   - `layoutId="m3-day-pill"` was a module-global string: two pickers on one page would
     cross-animate the selection pill between instances.
4. **Required changes.** 48dp chevron targets; year in the accessible name; scope the
   layoutId per instance.
5. **Changes implemented.**
   - Chevrons `h-12 w-12` (48dp) with view-aware labels ("Previous/Next month" /
     "Previous/Next years").
   - `aria-label` now "Month D, YYYY".
   - `const pillId = React.useId()` → `layoutId={pillId}`.
6. **Remaining limitations.** (recorded) Not the official modal presentation: no
   selected-date header, no text-input entry, no 568×368/328×512 dialog sizing; day
   cells stay 40dp (official dense calendar grid — 7×48 would overflow the 328dp
   width); no `aria-rowcount/colcount` on the grid.

   **Resolved (round 4, task 4-b):** the official modal presentation now ships as
   `presentation="modal"` on the same component — 328×512dp portrait (header block:
   label-large "Selected date" + display-small "Fri, Aug 21" headline + divider, then
   the shared calendar grid) and 568×368dp landscape at viewport ≥ 600px via
   `matchMedia` (header as a 168dp vertically-centered left column). Surface-container-high
   panel, 28dp corners, elevation 3, 32% scrim (`bg-m3-scrim/32`), no action buttons
   (live-apply; Escape/scrim dismiss), spring scale 0.9→1 + fade entry/exit
   (`springs.expressive`), focus trap + initial focus on the selected/today day +
   restore to opener + body scroll lock (Dialog pattern), animated month-year label.
   API: `open`/`onOpenChange` (controlled, Dialog/SearchView style) + `closeOnSelect`
   (default true). Modal selected-day circle uses androidx
   `SelectedDateContainerColor` = primary-container; all other day states identical to
   inline; inline presentation byte-unchanged (calendar internals extracted into a
   shared internal subcomponent). Remaining: no text-input entry, day cells stay 40dp,
   no `aria-rowcount/colcount` on the grid (unchanged).

## TimePicker

1. **Material specification being followed.** Clock dial time picker per androidx
   `TimePickerTokens` (verified this audit): 256dp dial (`ClockDialContainerSize`) on
   surface-container-highest (`ClockDialColor`), picker container surface-container-high
   at elevation level 3 (`ContainerColor`/`ContainerElevation`), 48dp primary selector
   handle, 2dp track, 8dp center dot, 96×80dp time-selector readout segments
   (`TimeSelectorContainerWidth/Height`, shape corner-small = 8dp, display-large
   labels, selected primary-container/on-primary-container, unselected
   surface-container-highest/on-surface), vertical 52×80dp period selector
   (`PeriodSelectorVertical*`) with 1dp outline and selected = **tertiary**-container
   (`PeriodSelectorSelectedContainerColor = TertiaryContainer` — the tasking prompt's
   "secondary-container" hint is wrong for the shipped default; primary-container only
   applies behind the opt-in `isUpdatedTimepickerToggleEnabled` flag), hour→minute
   auto-advance.
2. **Current implementation (before fix).** Dial size/handle/track/center dot, 52×80
   period column, tertiary-container selection, 5-minute marks already correct.
3. **Deviations found.**
   - Panel was surface-container-highest/elevation 0; official is
     surface-container-high at elevation level 3 — and the dial was
     surface-container-high vs official surface-container-highest (inverted pair).
   - Readout segments were 56dp pills (rounded-full, display-medium, no inactive
     fill) vs official 96×80dp, 8dp corners, display-large, inactive
     surface-container-highest.
   - Period selector lacked the official 1dp outline + internal divider.
   - Dial number hit areas 40px < 48dp; minute labels used body-medium (official
     clock-dial label font = body-large for both rings).
   - Hour→minute auto-switch was gated on `!use24h`; official flow advances in both.
   - Dial was pointer-only; AM/PM and readout were Tab/Enter only (no arrow keys).
4. **Required changes.** Swap container/dial colors + add elevation 3; official
   readout segment geometry; outline the period column; 48px dial targets; unify
   body-large labels; unconditional auto-advance; arrow-key dial + meridiem.
5. **Changes implemented.**
   - Panel `bg-m3-surface-container-high m3-elevation-3`; dial
     `bg-m3-surface-container-highest`.
   - Readout: two `h-20 w-24 rounded-[8px]` segments, `md-display-large`, inactive
     `bg-m3-surface-container-highest text-m3-on-surface`, active
     `bg-m3-primary-container text-m3-on-primary-container`; `aria-label`s.
   - Period selector: `rounded-full border border-m3-outline` + 1px divider between
     AM/PM; arrows ↑/↓/←/→ move the selection and focus (radio pattern); refs added.
   - Dial numbers `h-12 w-12` (adjacent centers ≈ 54px, no overlap), all labels
     `md-body-large`; ↑/→ = +1, ↓/← = −1 (hour wraps the 12-ring, minute wraps 0–59).
   - `scheduleModeSwitch()` runs for both meridiem modes; docstring rewritten to the
     verified token values.
6. **Remaining limitations.** (recorded) 24h mode keeps the 12-number ring with AM/PM
   preserved (official 24h dial uses a different ring/readout arrangement); only
   5-minute marks are drawn on the minute ring (official has a 60-tick ring under the
   labels); no drag-around-the-dial gesture; readout row uses an 8dp (gap-2-level)
   gap to fit 96+96+colon+52 inside the compact 328dp panel.

   **Resolved (round 5, task 5-c):** the 24h "single-ring" limitation is closed —
   `use24h` now renders the official double-ring clock face, implemented per the
   Material source of truth (fetched this round): material-components-android
   `TimePickerClockPresenter.HOUR_CLOCK_24_VALUES` = "00","1"…"11","12"…"23" with
   `RadialViewGroup` LEVEL_1 = outer / LEVEL_2 = inner at `LEVEL_RADIUS_RATIO = .66f`,
   and androidx-compose `TimePicker.moveSelector` (inner tap ⇒ hour < 12) +
   `OuterCircleToSizeRatio = 101.dp` / `InnerCircleToSizeRatio = 69.dp`. Shipped
   layout: **outer ring 00–11 (00 at the 12 o'clock position, 06 at the bottom,
   radius 101px, md-label-large, on-surface-variant)** and **inner ring 12–23
   (12 at the top, 18 at the bottom, radius 69px, md-body-large, on-surface)**;
   the 48dp primary handle + 2dp track spring between rings (handle on the inner
   ring for hours 12–23, matching androidx `selectorPos`), with a small
   cross-ring dot at the same clock position on the opposite ring; aria-labels
   "H:00" (e.g. "0:00", "23:00"); arrow keys step the full 0–23 range with wrap.
   12h mode and the minute ring remain byte-identical. (Note: an earlier tasking
   sketch placed 13–23 on the outer ring with 00 at the bottom; the official
   sources above put 00–11 outer / 12–23 inner — implemented per source.)
   Still open: 60-tick minute ring, drag gesture.

## Demo sections (containment-demos.tsx)

BottomSheetDemo / SideSheetDemo / DatePickerDemo / TimePickerDemo audited, left
byte-for-byte unchanged: demo names + `containmentDemoMap` keys intact, all colors
m3-* tokens, triggers are real Buttons (≥48dp), both sheet variants exercised,
readout chips are presentation-only. They inherit the fixes visually (focus trap,
32% scrim docs, picker geometry).

## Meta blocks

- `bottomSheetMeta`: variants + `variant` prop added, scrim 50%→32% (modal-only),
  elevation 1 / 640dp / 22dp-handle anatomy, focus trap/restore + velocity states,
  `maxHeight` default corrected to `calc(100dvh - 72px)`.
- `sideSheetMeta`: anatomy now says elevation 1 (modal) and "edge corners stay
  square"; states add focus move/trap/restore.
- `datePickerMeta`: anatomy notes 48dp chevron targets.
- `timePickerMeta`: full sync to verified tokens (container surface-container-high +
  elevation 3, dial surface-container-highest, 96×80dp 8dp-corner readout segments,
  outlined period column, 48px dial targets, both-mode auto-advance, keyboard map) +
  description records the 12-ring/5-minute-mark simplifications.

## Consistency notes / cross-cutting

- Motion: springs only from `@/lib/m3/tokens` (`springs.defaultSpatial`,
  `springs.expressive`, `springs.expressiveEffects`, `springs.defaultVisual`); the
  only tweens are scrim fades at `durations.short4` — the established Dialog pattern.
- Colors: exclusively m3-* classes / `bg-m3-scrim/32`; state layers via `.m3-state`
  (8% hover) + `.m3-focus` rings on every interactive element; no raw hex anywhere.
- Focus management for all three modals (BottomSheet, SideSheet, and the pre-existing
  Dialog pattern) is now identical: focus in on open → Tab trapped → restore on close.
- Verified: `bunx tsc --noEmit` filtered to the 6 assigned files → **empty**;
  `bun run lint` → 0 errors (2 pre-existing warnings in other agents' files, incl.
  List.tsx, untouched). Files NOT touched: globals.css, tokens.ts, types.ts,
  themes.ts, page/layout, index.ts, registry.ts, Card/List/Dialog demo+meta regions,
  and all other agents' components/metas.
