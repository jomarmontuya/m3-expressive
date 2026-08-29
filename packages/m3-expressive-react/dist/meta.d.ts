import { M3ComponentSpec, M3ComponentMeta } from './types.js';

/**
 * Audited Material sources for the 41 registry components.
 *
 * `materialUrl` points to the official live overview page. The pinned sources
 * below supply implementation detail where the overview page is not specific
 * enough. Banner and Autocomplete are library compatibility extensions, so
 * their `materialUrl` is deliberately null.
 */

declare const SPEC_AUDITED_AT: "2026-08-28";
declare const pinnedSpecReferences: {
    readonly "androidx-compose-material3": {
        readonly label: "AndroidX Compose Material3";
        readonly revision: "38aa2e813c80c10eb2326e211f9091ee7d79e069";
        readonly url: "https://android.googlesource.com/platform/frameworks/support/+/38aa2e813c80c10eb2326e211f9091ee7d79e069/compose/material3/material3/";
    };
    readonly "material-web": {
        readonly label: "Material Web";
        readonly revision: "cac97678831d48d4eb4a606ca50f92673a1dc20c";
        readonly url: "https://github.com/material-components/material-web/tree/cac97678831d48d4eb4a606ca50f92673a1dc20c";
    };
    readonly "flutter-material": {
        readonly label: "Flutter Material";
        readonly revision: "d3b14c876900e553bc736ca19295fc09e3853e8e";
        readonly url: "https://github.com/flutter/flutter/blob/d3b14c876900e553bc736ca19295fc09e3853e8e/packages/flutter/lib/src/material/banner.dart";
    };
    readonly "base-ui-react": {
        readonly label: "Base UI React";
        readonly revision: "254f4744f0a241c20697b9eeab33402f4469a081";
        readonly url: "https://github.com/mui/base-ui/tree/254f4744f0a241c20697b9eeab33402f4469a081/packages/react/src/autocomplete";
    };
};
declare const componentSpecs: {
    readonly button: M3ComponentSpec;
    readonly "icon-button": M3ComponentSpec;
    readonly fab: M3ComponentSpec;
    readonly "extended-fab": M3ComponentSpec;
    readonly "fab-menu": M3ComponentSpec;
    readonly "split-button": M3ComponentSpec;
    readonly "button-group": M3ComponentSpec;
    readonly "segmented-button": M3ComponentSpec;
    readonly badge: M3ComponentSpec;
    readonly "linear-progress": M3ComponentSpec;
    readonly "circular-progress": M3ComponentSpec;
    readonly "loading-indicator": M3ComponentSpec;
    readonly snackbar: M3ComponentSpec;
    readonly tooltip: M3ComponentSpec;
    readonly banner: M3ComponentSpec;
    readonly dialog: M3ComponentSpec;
    readonly divider: M3ComponentSpec;
    readonly card: M3ComponentSpec;
    readonly list: M3ComponentSpec;
    readonly "bottom-sheet": M3ComponentSpec;
    readonly "side-sheet": M3ComponentSpec;
    readonly carousel: M3ComponentSpec;
    readonly "text-field": M3ComponentSpec;
    readonly "search-bar": M3ComponentSpec;
    readonly "search-view": M3ComponentSpec;
    readonly autocomplete: M3ComponentSpec;
    readonly checkbox: M3ComponentSpec;
    readonly radio: M3ComponentSpec;
    readonly switch: M3ComponentSpec;
    readonly slider: M3ComponentSpec;
    readonly chip: M3ComponentSpec;
    readonly tabs: M3ComponentSpec;
    readonly "navigation-bar": M3ComponentSpec;
    readonly "navigation-drawer": M3ComponentSpec;
    readonly "navigation-rail": M3ComponentSpec;
    readonly "top-app-bar": M3ComponentSpec;
    readonly "bottom-app-bar": M3ComponentSpec;
    readonly toolbar: M3ComponentSpec;
    readonly menu: M3ComponentSpec;
    readonly "date-picker": M3ComponentSpec;
    readonly "time-picker": M3ComponentSpec;
};

/**
 * MATERIAL 3 EXPRESSIVE — COMPONENT METADATA (single source of truth)
 *
 * Server-safe module (no "use client"): importable from API routes,
 * RSC and client components alike. Each component file in
 * src/components/m3 re-exports its meta from here.
 */

declare const buttonGroupMeta: M3ComponentMeta;
declare const dividerMeta: M3ComponentMeta;
declare const datePickerMeta: M3ComponentMeta;
declare const sideSheetMeta: M3ComponentMeta;
declare const carouselMeta: M3ComponentMeta;
declare const dialogMeta: M3ComponentMeta;
declare const snackbarMeta: M3ComponentMeta;
declare const navigationDrawerMeta: M3ComponentMeta;
declare const listMeta: M3ComponentMeta;
declare const cardMeta: M3ComponentMeta;
declare const segmentedButtonMeta: M3ComponentMeta;
declare const sliderMeta: M3ComponentMeta;
declare const textFieldMeta: M3ComponentMeta;
declare const autocompleteMeta: M3ComponentMeta;
declare const navigationRailMeta: M3ComponentMeta;
declare const chipMeta: M3ComponentMeta;
declare const bannerMeta: M3ComponentMeta;
declare const checkboxMeta: M3ComponentMeta;
declare const fabMeta: M3ComponentMeta;
declare const tabsMeta: M3ComponentMeta;
declare const loadingIndicatorMeta: M3ComponentMeta;
declare const menuMeta: M3ComponentMeta;
declare const bottomAppBarMeta: M3ComponentMeta;
declare const extendedFabMeta: M3ComponentMeta;
declare const circularProgressMeta: M3ComponentMeta;
declare const badgeMeta: M3ComponentMeta;
declare const searchBarMeta: M3ComponentMeta;
declare const searchViewMeta: M3ComponentMeta;
declare const splitButtonMeta: M3ComponentMeta;
declare const switchMeta: M3ComponentMeta;
declare const timePickerMeta: M3ComponentMeta;
declare const radioMeta: M3ComponentMeta;
declare const toolbarMeta: M3ComponentMeta;
declare const iconButtonMeta: M3ComponentMeta;
declare const tooltipMeta: M3ComponentMeta;
declare const fabMenuMeta: M3ComponentMeta;
declare const navigationBarMeta: M3ComponentMeta;
declare const topAppBarMeta: M3ComponentMeta;
declare const bottomSheetMeta: M3ComponentMeta;
declare const buttonMeta: M3ComponentMeta;
declare const linearProgressMeta: M3ComponentMeta;

export { SPEC_AUDITED_AT, autocompleteMeta, badgeMeta, bannerMeta, bottomAppBarMeta, bottomSheetMeta, buttonGroupMeta, buttonMeta, cardMeta, carouselMeta, checkboxMeta, chipMeta, circularProgressMeta, componentSpecs, datePickerMeta, dialogMeta, dividerMeta, extendedFabMeta, fabMenuMeta, fabMeta, iconButtonMeta, linearProgressMeta, listMeta, loadingIndicatorMeta, menuMeta, navigationBarMeta, navigationDrawerMeta, navigationRailMeta, pinnedSpecReferences, radioMeta, searchBarMeta, searchViewMeta, segmentedButtonMeta, sideSheetMeta, sliderMeta, snackbarMeta, splitButtonMeta, switchMeta, tabsMeta, textFieldMeta, timePickerMeta, toolbarMeta, tooltipMeta, topAppBarMeta };
