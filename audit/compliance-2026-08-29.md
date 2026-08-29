# Material 3 component compliance report

Date: 2026-08-29

## Verdict

The registry contains 41 React components:

- 39 are spec-compliant web implementations of current Material Design 3 or Material 3 Expressive components.
- `Banner` is a clearly labeled Material 2 and Flutter compatibility extension.
- `Autocomplete` is a clearly labeled text-field and combobox extension. Material 3 does not publish it as a standalone component.

"Spec-compliant web implementation" means the public states, geometry, tokens, semantics, and interaction rules follow the current Google sources, with documented web mappings where Android and web input models differ. It does not mean pixel-identical output across Android, Flutter, Compose, and browsers.

## Source order

The audit used this order when sources differed or omitted a value:

1. The current live component pages at `https://m3.material.io`.
2. AndroidX Compose Material3 source and token files when the live page did not expose an implementation value. Audited reference: `38aa2e813c80c10eb2326e211f9091ee7d79e069`.
3. Material Web docs and source as a web behavior baseline only. Audited reference: `cac97678831d48d4eb4a606ca50f92673a1dc20c`.

Material Web is useful but is not the full M3 Expressive specification. It covers only part of this registry and is in maintenance mode.

Jomar supplied the source-currency evidence for this pass: every component spec page used by the 2026-08-28 per-component audit was last modified on or before 2026-04-28, and those specs remain current on 2026-08-29. This pass therefore reused that source set and checked implementation behavior against the live pages without doing a new modification-date scrape.

## Component scorecard

| Component | Classification | Result |
|---|---|---|
| Button | Material 3 and M3 Expressive | Compliant web implementation |
| IconButton | Material 3 | Compliant web implementation |
| FAB | Material 3 and M3 Expressive | Compliant web implementation |
| ExtendedFab | Material 3 and M3 Expressive | Compliant web implementation |
| FabMenu | Material 3 Expressive | Compliant web implementation |
| SplitButton | Material 3 Expressive | Compliant web implementation |
| ButtonGroup | Material 3 Expressive | Compliant web implementation |
| SegmentedButton | Material 3 | Compliant web implementation |
| Badge | Material 3 | Compliant web implementation |
| LinearProgress | Material 3 and M3 Expressive | Compliant web implementation |
| CircularProgress | Material 3 and M3 Expressive | Compliant web implementation |
| LoadingIndicator | Material 3 Expressive | Compliant web implementation |
| Snackbar | Material 3 | Compliant web implementation |
| Tooltip | Material 3 | Compliant web implementation |
| Banner | Compatibility extension | Material 2 and Flutter heritage, not an official current M3 component |
| Dialog | Material 3 | Compliant web implementation |
| Divider | Material 3 | Compliant web implementation |
| Card | Material 3 | Compliant web implementation |
| List | Material 3 | Compliant web implementation |
| BottomSheet | Material 3 | Compliant web implementation |
| SideSheet | Material 3 | Compliant web implementation |
| Carousel | Material 3 Expressive | Compliant web implementation |
| TextField | Material 3 | Compliant web implementation |
| SearchBar | Material 3 | Compliant web implementation |
| SearchView | Material 3 | Compliant web implementation |
| Autocomplete | Compatibility extension | Text-field and combobox composite, not an official standalone M3 component |
| Checkbox | Material 3 | Compliant web implementation |
| Radio | Material 3 | Compliant web implementation |
| Switch | Material 3 | Compliant web implementation |
| Slider | Material 3 and M3 Expressive | Compliant web implementation |
| Chip | Material 3 | Compliant web implementation |
| Tabs | Material 3 | Compliant web implementation |
| NavigationBar | Material 3 | Compliant web implementation |
| NavigationDrawer | Material 3 | Compliant web implementation |
| NavigationRail | Material 3 and M3 Expressive | Compliant web implementation |
| TopAppBar | Material 3 and M3 Expressive | Compliant web implementation |
| BottomAppBar | Material 3 | Compliant web implementation |
| Toolbar | Material 3 Expressive | Compliant web implementation |
| Menu | Material 3 | Compliant web implementation |
| DatePicker | Material 3 | Compliant web implementation |
| TimePicker | Material 3 | Compliant web implementation |

## Web mappings and retained choices

- `TopAppBar` maps Android nested-scroll and fling behavior to discrete browser scroll-state transitions.
- `Carousel` keeps the official layout categories and keyline intent. It uses logical browser scrolling and CSS parallax instead of Android platform masking. Previous and next controls, arrow keys, padding, and item order follow text direction.
- `BottomSheet` exposes a configurable partial anchor because a browser library cannot rely on the same content-derived anchor contract as Compose in every layout.
- `NavigationRail` has a standard in-layout mode and a modal expanded mode. Modal mode uses dialog semantics, focus trapping, scroll locking, a scrim, and blocked background interaction.
- `TimePicker` keeps official 12-hour and 24-hour dial geometry. The web version adds the WAI-ARIA radio roving-focus pattern for keyboard use.
- Direct JavaScript reduced-motion fallbacks exist only in components that call `useReducedMotion`; other Framer Motion use is not covered by that hook automatically. The package CSS token contract suppresses CSS keyframes, transitions, and smooth scrolling under `prefers-reduced-motion: reduce`.
- Feedback corrections keep Divider insets inside available horizontal or vertical space, restore the Tooltip trigger focus-visible ring, omit a non-M3 disabled Badge state, and document LoadingIndicator's Compose-derived determinate Circle-to-SoftBurst progress mapping.
- Directional geometry uses logical start and end behavior. This includes connected buttons, fields, slider tracks, date ranges, drawers, rails, tabs, menus, sheets, and carousel controls.
- Compatibility props and non-standard variants remain only where metadata labels them as extensions or opt-ins.

## Verification evidence

- Repository typecheck: `bunx tsc --noEmit` passed.
- Lint: `bun run lint` passed with 0 errors and the known `src/app/layout.tsx` `@next/next/no-css-tags` warning.
- Package typecheck: `packages/m3-expressive-react` `bun run typecheck` passed.
- Package build: `bun run build:package` passed.
- Source diff check: `git diff --check -- . ':(exclude)packages/m3-expressive-react/dist/**'` passed. Generated `dist/` is excluded because its bundler output contains pre-existing trailing whitespace.
- Component contract: all files in `src/components/m3/` retain the client-component and named `forwardRef` contract.
- Stable page-layout audit: 41/41 routes passed at desktop `1440x1000` and mobile `390x844`; 82 screenshots, 28 contact sheets, and measured evidence are in `tool-results/page-audit-2026-08-29/`.
- Browser evidence: no page horizontal overflow and no captured console errors or warnings on the 41 stable routes. Focus, RTL, modal background blocking, sheet close behavior, and picker keyboard behavior also received focused runtime checks.
- Visual regression: the full 41-component capture plus a focused `SideSheet` retry produced a final report with 0 changed, 0 new, and 0 missing components. The first pass briefly saved the `Carousel` route under `SideSheet`; the verified retry measured `SideSheet` at 0.7483%, inside the minor band.

## Review history

Independent read-only family reviews found and then rechecked issues across actions and navigation, inputs and pickers, and feedback and containment. The final fresh review verdicts are recorded below after the corrected worktree is reviewed.

- Actions and navigation: APPROVE after the correction pass and focused Menu nested-RTL recheck.
- Inputs and pickers: APPROVE after the correction pass and focused element-scoped direction recheck.
- Feedback and containment: APPROVE after the correction pass, Badge source arbitration, and focused Carousel nested-RTL recheck.

Historical files in `audit/` remain local evidence. This report replaces their interim verdicts and stale geometry notes.
