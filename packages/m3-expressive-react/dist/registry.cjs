"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkQFKXKI3Tcjs = require('./chunk-QFKXKI3T.cjs');









































var _chunkYEYXHVHUcjs = require('./chunk-YEYXHVHU.cjs');

// ../../src/lib/m3/registry.ts
var COMPONENT_DIR = "src/components/m3";
var TABLE = [
  { meta: _chunkYEYXHVHUcjs.buttonMeta, file: "Button" },
  { meta: _chunkYEYXHVHUcjs.iconButtonMeta, file: "IconButton" },
  { meta: _chunkYEYXHVHUcjs.fabMeta, file: "FAB" },
  { meta: _chunkYEYXHVHUcjs.extendedFabMeta, file: "ExtendedFab" },
  { meta: _chunkYEYXHVHUcjs.fabMenuMeta, file: "FabMenu" },
  { meta: _chunkYEYXHVHUcjs.splitButtonMeta, file: "SplitButton" },
  { meta: _chunkYEYXHVHUcjs.buttonGroupMeta, file: "ButtonGroup" },
  { meta: _chunkYEYXHVHUcjs.segmentedButtonMeta, file: "SegmentedButton" },
  { meta: _chunkYEYXHVHUcjs.badgeMeta, file: "Badge" },
  { meta: _chunkYEYXHVHUcjs.linearProgressMeta, file: "LinearProgress" },
  { meta: _chunkYEYXHVHUcjs.circularProgressMeta, file: "CircularProgress" },
  { meta: _chunkYEYXHVHUcjs.loadingIndicatorMeta, file: "LoadingIndicator" },
  { meta: _chunkYEYXHVHUcjs.snackbarMeta, file: "Snackbar" },
  { meta: _chunkYEYXHVHUcjs.tooltipMeta, file: "Tooltip" },
  { meta: _chunkYEYXHVHUcjs.bannerMeta, file: "Banner" },
  { meta: _chunkYEYXHVHUcjs.dialogMeta, file: "Dialog" },
  { meta: _chunkYEYXHVHUcjs.dividerMeta, file: "Divider" },
  { meta: _chunkYEYXHVHUcjs.cardMeta, file: "Card" },
  { meta: _chunkYEYXHVHUcjs.listMeta, file: "List" },
  { meta: _chunkYEYXHVHUcjs.bottomSheetMeta, file: "BottomSheet" },
  { meta: _chunkYEYXHVHUcjs.sideSheetMeta, file: "SideSheet" },
  { meta: _chunkYEYXHVHUcjs.textFieldMeta, file: "TextField" },
  { meta: _chunkYEYXHVHUcjs.searchBarMeta, file: "SearchBar" },
  { meta: _chunkYEYXHVHUcjs.searchViewMeta, file: "SearchView" },
  { meta: _chunkYEYXHVHUcjs.autocompleteMeta, file: "Autocomplete" },
  { meta: _chunkYEYXHVHUcjs.checkboxMeta, file: "Checkbox" },
  { meta: _chunkYEYXHVHUcjs.radioMeta, file: "Radio" },
  { meta: _chunkYEYXHVHUcjs.switchMeta, file: "Switch" },
  { meta: _chunkYEYXHVHUcjs.sliderMeta, file: "Slider" },
  { meta: _chunkYEYXHVHUcjs.chipMeta, file: "Chip" },
  { meta: _chunkYEYXHVHUcjs.tabsMeta, file: "Tabs" },
  { meta: _chunkYEYXHVHUcjs.navigationBarMeta, file: "NavigationBar" },
  { meta: _chunkYEYXHVHUcjs.navigationDrawerMeta, file: "NavigationDrawer" },
  { meta: _chunkYEYXHVHUcjs.navigationRailMeta, file: "NavigationRail" },
  { meta: _chunkYEYXHVHUcjs.topAppBarMeta, file: "TopAppBar" },
  { meta: _chunkYEYXHVHUcjs.bottomAppBarMeta, file: "BottomAppBar" },
  { meta: _chunkYEYXHVHUcjs.toolbarMeta, file: "Toolbar" },
  { meta: _chunkYEYXHVHUcjs.menuMeta, file: "Menu" },
  { meta: _chunkYEYXHVHUcjs.datePickerMeta, file: "DatePicker" },
  { meta: _chunkYEYXHVHUcjs.timePickerMeta, file: "TimePicker" }
];
var REGISTRY_VERSION = "1.0.0";
var m3Registry = {
  library: "m3-expressive-react",
  version: REGISTRY_VERSION,
  description: "A complete Material 3 Expressive (M3E) React component library. Every component is built on official M3 design tokens (color roles, shape scale, Roboto Flex typography, physics-based spring motion, state layers) and ships with structured design-guideline metadata for agentic consumption.",
  spec: "https://m3.material.io",
  totalCount: TABLE.length,
  categories: ["actions", "communication", "containment", "selection", "textinput", "navigation"],
  components: TABLE.map((row) => ({
    ...row.meta,
    file: `${COMPONENT_DIR}/${row.file}.tsx`
  }))
};
function getComponent(id) {
  return m3Registry.components.find((c) => c.id === id);
}
function getComponentsByCategory(category) {
  return m3Registry.components.filter((c) => c.category === category);
}
function searchComponents(query) {
  const q = query.trim().toLowerCase();
  if (!q) return m3Registry.components;
  return m3Registry.components.filter((c) => {
    const haystack = [
      c.id,
      c.name,
      c.description,
      _chunkQFKXKI3Tcjs.categoryLabels[c.category],
      ..._nullishCoalesce(c.variants, () => ( [])),
      ...c.props.map((p) => p.name)
    ].join(" ").toLowerCase();
    return haystack.includes(q);
  });
}






exports.REGISTRY_VERSION = REGISTRY_VERSION; exports.getComponent = getComponent; exports.getComponentsByCategory = getComponentsByCategory; exports.m3Registry = m3Registry; exports.searchComponents = searchComponents;
//# sourceMappingURL=registry.cjs.map