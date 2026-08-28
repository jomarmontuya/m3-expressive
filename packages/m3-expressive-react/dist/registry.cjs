"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkQFKXKI3Tcjs = require('./chunk-QFKXKI3T.cjs');










































var _chunkZ7NDHSF3cjs = require('./chunk-Z7NDHSF3.cjs');

// ../../src/lib/m3/registry.ts
var COMPONENT_DIR = "src/components/m3";
var TABLE = [
  { meta: _chunkZ7NDHSF3cjs.buttonMeta, file: "Button" },
  { meta: _chunkZ7NDHSF3cjs.iconButtonMeta, file: "IconButton" },
  { meta: _chunkZ7NDHSF3cjs.fabMeta, file: "FAB" },
  { meta: _chunkZ7NDHSF3cjs.extendedFabMeta, file: "ExtendedFab" },
  { meta: _chunkZ7NDHSF3cjs.fabMenuMeta, file: "FabMenu" },
  { meta: _chunkZ7NDHSF3cjs.splitButtonMeta, file: "SplitButton" },
  { meta: _chunkZ7NDHSF3cjs.buttonGroupMeta, file: "ButtonGroup" },
  { meta: _chunkZ7NDHSF3cjs.segmentedButtonMeta, file: "SegmentedButton" },
  { meta: _chunkZ7NDHSF3cjs.badgeMeta, file: "Badge" },
  { meta: _chunkZ7NDHSF3cjs.linearProgressMeta, file: "LinearProgress" },
  { meta: _chunkZ7NDHSF3cjs.circularProgressMeta, file: "CircularProgress" },
  { meta: _chunkZ7NDHSF3cjs.loadingIndicatorMeta, file: "LoadingIndicator" },
  { meta: _chunkZ7NDHSF3cjs.snackbarMeta, file: "Snackbar" },
  { meta: _chunkZ7NDHSF3cjs.tooltipMeta, file: "Tooltip" },
  { meta: _chunkZ7NDHSF3cjs.bannerMeta, file: "Banner" },
  { meta: _chunkZ7NDHSF3cjs.dialogMeta, file: "Dialog" },
  { meta: _chunkZ7NDHSF3cjs.dividerMeta, file: "Divider" },
  { meta: _chunkZ7NDHSF3cjs.cardMeta, file: "Card" },
  { meta: _chunkZ7NDHSF3cjs.listMeta, file: "List" },
  { meta: _chunkZ7NDHSF3cjs.bottomSheetMeta, file: "BottomSheet" },
  { meta: _chunkZ7NDHSF3cjs.sideSheetMeta, file: "SideSheet" },
  { meta: _chunkZ7NDHSF3cjs.carouselMeta, file: "Carousel" },
  { meta: _chunkZ7NDHSF3cjs.textFieldMeta, file: "TextField" },
  { meta: _chunkZ7NDHSF3cjs.searchBarMeta, file: "SearchBar" },
  { meta: _chunkZ7NDHSF3cjs.searchViewMeta, file: "SearchView" },
  { meta: _chunkZ7NDHSF3cjs.autocompleteMeta, file: "Autocomplete" },
  { meta: _chunkZ7NDHSF3cjs.checkboxMeta, file: "Checkbox" },
  { meta: _chunkZ7NDHSF3cjs.radioMeta, file: "Radio" },
  { meta: _chunkZ7NDHSF3cjs.switchMeta, file: "Switch" },
  { meta: _chunkZ7NDHSF3cjs.sliderMeta, file: "Slider" },
  { meta: _chunkZ7NDHSF3cjs.chipMeta, file: "Chip" },
  { meta: _chunkZ7NDHSF3cjs.tabsMeta, file: "Tabs" },
  { meta: _chunkZ7NDHSF3cjs.navigationBarMeta, file: "NavigationBar" },
  { meta: _chunkZ7NDHSF3cjs.navigationDrawerMeta, file: "NavigationDrawer" },
  { meta: _chunkZ7NDHSF3cjs.navigationRailMeta, file: "NavigationRail" },
  { meta: _chunkZ7NDHSF3cjs.topAppBarMeta, file: "TopAppBar" },
  { meta: _chunkZ7NDHSF3cjs.bottomAppBarMeta, file: "BottomAppBar" },
  { meta: _chunkZ7NDHSF3cjs.toolbarMeta, file: "Toolbar" },
  { meta: _chunkZ7NDHSF3cjs.menuMeta, file: "Menu" },
  { meta: _chunkZ7NDHSF3cjs.datePickerMeta, file: "DatePicker" },
  { meta: _chunkZ7NDHSF3cjs.timePickerMeta, file: "TimePicker" }
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