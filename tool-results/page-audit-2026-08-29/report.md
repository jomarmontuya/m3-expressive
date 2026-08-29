# M3 Expressive showcase visual audit — 2026-08-29

## Result

- **41 PASS, 0 ISSUE.** I inspected the actual fresh full-page image for each registered component at both viewports.
- **82 screenshots total:** 41 desktop captures at `1440 × 1000` and 41 mobile captures at `390 × 844`. Full-page PNGs are in `desktop/` and `mobile/`; 28 derived contact sheets in `contact-sheets/` support the image review.
- The fresh route records show **no document or body horizontal overflow**, no browser console messages, and no page errors across either viewport. See `desktop-results.json`, `mobile-results.json`, and `responsive-evidence.json`.

## Per-component evidence

Each PASS means the saved desktop and mobile images were visually checked for overlapping text, clipping/cut-off controls, page overflow, bad wrapping, spacing/padding/gap defects, crowded controls, and broken layout.

| Component | Desktop — 1440 × 1000 | Mobile — 390 × 844 |
|---|---|---|
| button | PASS — `desktop/button.png` | PASS — `mobile/button.png` |
| icon-button | PASS — `desktop/icon-button.png` | PASS — `mobile/icon-button.png` |
| fab | PASS — `desktop/fab.png` | PASS — `mobile/fab.png` |
| extended-fab | PASS — `desktop/extended-fab.png` | PASS — `mobile/extended-fab.png` |
| fab-menu | PASS — `desktop/fab-menu.png` | PASS — `mobile/fab-menu.png` |
| split-button | PASS — `desktop/split-button.png` | PASS — `mobile/split-button.png` |
| button-group | PASS — `desktop/button-group.png` | PASS — `mobile/button-group.png` |
| segmented-button | PASS — `desktop/segmented-button.png` | PASS — `mobile/segmented-button.png` |
| badge | PASS — `desktop/badge.png` | PASS — `mobile/badge.png` |
| linear-progress | PASS — `desktop/linear-progress.png` | PASS — `mobile/linear-progress.png` |
| circular-progress | PASS — `desktop/circular-progress.png` | PASS — `mobile/circular-progress.png` |
| loading-indicator | PASS — `desktop/loading-indicator.png` | PASS — `mobile/loading-indicator.png` |
| snackbar | PASS — `desktop/snackbar.png` | PASS — `mobile/snackbar.png` |
| tooltip | PASS — `desktop/tooltip.png` | PASS — `mobile/tooltip.png` |
| banner | PASS — `desktop/banner.png` | PASS — `mobile/banner.png` |
| dialog | PASS — `desktop/dialog.png` | PASS — `mobile/dialog.png` |
| divider | PASS — `desktop/divider.png` | PASS — `mobile/divider.png` |
| card | PASS — `desktop/card.png` | PASS — `mobile/card.png` |
| list | PASS — `desktop/list.png` | PASS — `mobile/list.png` |
| bottom-sheet | PASS — `desktop/bottom-sheet.png` | PASS — `mobile/bottom-sheet.png` |
| side-sheet | PASS — `desktop/side-sheet.png` | PASS — `mobile/side-sheet.png` |
| carousel | PASS — `desktop/carousel.png` | PASS — `mobile/carousel.png` |
| checkbox | PASS — `desktop/checkbox.png` | PASS — `mobile/checkbox.png` |
| radio | PASS — `desktop/radio.png` | PASS — `mobile/radio.png` |
| switch | PASS — `desktop/switch.png` | PASS — `mobile/switch.png` |
| slider | PASS — `desktop/slider.png` | PASS — `mobile/slider.png` |
| chip | PASS — `desktop/chip.png` | PASS — `mobile/chip.png` |
| date-picker | PASS — `desktop/date-picker.png` | PASS — `mobile/date-picker.png` |
| time-picker | PASS — `desktop/time-picker.png` | PASS — `mobile/time-picker.png` |
| text-field | PASS — `desktop/text-field.png` | PASS — `mobile/text-field.png` |
| search-bar | PASS — `desktop/search-bar.png` | PASS — `mobile/search-bar.png` |
| search-view | PASS — `desktop/search-view.png` | PASS — `mobile/search-view.png` |
| autocomplete | PASS — `desktop/autocomplete.png` | PASS — `mobile/autocomplete.png` |
| tabs | PASS — `desktop/tabs.png` | PASS — `mobile/tabs.png` |
| navigation-bar | PASS — `desktop/navigation-bar.png` | PASS — `mobile/navigation-bar.png` |
| navigation-drawer | PASS — `desktop/navigation-drawer.png` | PASS — `mobile/navigation-drawer.png` |
| navigation-rail | PASS — `desktop/navigation-rail.png` | PASS — `mobile/navigation-rail.png` |
| top-app-bar | PASS — `desktop/top-app-bar.png` | PASS — `mobile/top-app-bar.png` |
| bottom-app-bar | PASS — `desktop/bottom-app-bar.png` | PASS — `mobile/bottom-app-bar.png` |
| toolbar | PASS — `desktop/toolbar.png` | PASS — `mobile/toolbar.png` |
| menu | PASS — `desktop/menu.png` | PASS — `mobile/menu.png` |

## Machine evidence

- `desktop-results.json` and `mobile-results.json`: per-route capture record, document/body widths, console output, and page-error output.
- `responsive-evidence.json`: 41/41 captures at each viewport; every PNG has its required width (`1440px` desktop, `390px` mobile); document and body overflow were `0px`; console/page-error lists were empty.
- `contact-sheets/desktop-01.png` through `contact-sheets/desktop-14.png` and `contact-sheets/mobile-01.png` through `contact-sheets/mobile-14.png`: review copies derived only from the 82 evidence PNGs.

## Limitations

- This is a closed-state, full-page layout audit of the live local showcase. Interactive overlays such as menus, dialogs, sheets, snackbars, tooltips, and picker portals were not opened, so active-overlay placement is not covered.
- This uses the supplied dirty worktree and already-running local app. Only generated artifacts in `tool-results/page-audit-2026-08-29/` changed; source, package files, `audit/`, `worklog.md`, commits, and remote state were untouched.
