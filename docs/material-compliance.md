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

Compatibility extensions also pin their implementation references: Flutter Material Banner at `d3b14c876900e553bc736ca19295fc09e3853e8e`, and Base UI Autocomplete at `254f4744f0a241c20697b9eeab33402f4469a081`.

Material Web is useful but is not the full M3 Expressive specification. It covers only part of this registry and is in maintenance mode.

Jomar supplied the source-currency evidence for this pass: every component spec page used by the 2026-08-28 per-component audit was last modified on or before 2026-04-28, and those specs remain current on 2026-08-29. This pass therefore reused that source set and checked implementation behavior against the live pages without doing a new modification-date scrape.

Per-component exact source references are exposed through `meta.spec` for agent and documentation consumers.

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
- Direct JavaScript reduced-motion fallbacks exist only in components that call `useReducedMotion`; other Framer Motion use is not covered by that hook automatically. The registry CSS contract suppresses CSS keyframes, transitions, and smooth scrolling under `prefers-reduced-motion: reduce`.
- Feedback corrections keep Divider insets inside available horizontal or vertical space, restore the Tooltip trigger focus-visible ring, omit a non-M3 disabled Badge state, and document LoadingIndicator's Compose-derived determinate Circle-to-SoftBurst progress mapping.
- Directional geometry uses logical start and end behavior. This includes connected buttons, fields, slider tracks, date ranges, drawers, rails, tabs, menus, sheets, and carousel controls.
- Compatibility props and non-standard variants remain only where metadata labels them as extensions or opt-ins.

## Verification evidence

The final implementation and open-source cleanup recorded these results:

- Reproducible install: `bun install --frozen-lockfile` passed with no changes.
- Repository typecheck: `bunx tsc --noEmit` passed.
- Lint: `bun run lint` passed with 0 errors and the known `src/app/layout.tsx` `@next/next/no-css-tags` warning.
- Showcase production build: `bun run build` passed.
- Registry contract check: `bun run registry:check` found `m3-base` plus all 41 component IDs, source files, and pinned dependencies.
- Official schema check: `bun run registry:validate` validated `registry.json` with the shadcn CLI.
- Registry consumer check: `bun run registry:smoke` installed all 41 items into a clean temporary Next.js app, then passed TypeScript and a production build.
- Full diff check: `git diff --check` and `git diff --cached --check` passed.
- Component contract: all files in `src/components/m3/` retain the client-component and named `forwardRef` contract. Comment-stripped transpilation was identical before and after the 43 source-comment edits.
- Source resolution: all 39 direct component-comment URLs and all 40 unique live or pinned metadata URLs resolved.

The visual-regression scripts and screenshot baselines were removed on 2026-08-30 because their pixel comparison did not prove Material specification compliance. Visual changes now require direct browser review against the cited Material sources.

## Rerunnable release gates

Run these commands from a fresh checkout before release:

1. `bun run lint`
2. `bunx tsc --noEmit`
3. `bun run registry:check`
4. `bun run registry:validate`
5. `bun run registry:smoke`
6. `bun run build`

CI reruns these gates from a clean checkout on push or pull request.

## Review history

Independent read-only family reviews found and then rechecked issues across actions and navigation, inputs and pickers, and feedback and containment. The final fresh review verdicts are recorded below after the corrected worktree is reviewed.

- Actions and navigation: APPROVE after the correction pass and focused Menu nested-RTL recheck.
- Inputs and pickers: APPROVE after the correction pass and focused element-scoped direction recheck.
- Feedback and containment: APPROVE after the correction pass, Badge source arbitration, and focused Carousel nested-RTL recheck.

Per-family interim reviews are not tracked release documentation. This report is the tracked compliance reference.
