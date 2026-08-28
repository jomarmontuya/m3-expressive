"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkQFKXKI3Tcjs = require('./chunk-QFKXKI3T.cjs');










































var _chunkTFUGHWMVcjs = require('./chunk-TFUGHWMV.cjs');

// ../../src/lib/m3/registry.ts
var COMPONENT_DIR = "src/components/m3";
var TABLE = [
  { meta: _chunkTFUGHWMVcjs.buttonMeta, file: "Button" },
  { meta: _chunkTFUGHWMVcjs.iconButtonMeta, file: "IconButton" },
  { meta: _chunkTFUGHWMVcjs.fabMeta, file: "FAB" },
  { meta: _chunkTFUGHWMVcjs.extendedFabMeta, file: "ExtendedFab" },
  { meta: _chunkTFUGHWMVcjs.fabMenuMeta, file: "FabMenu" },
  { meta: _chunkTFUGHWMVcjs.splitButtonMeta, file: "SplitButton" },
  { meta: _chunkTFUGHWMVcjs.buttonGroupMeta, file: "ButtonGroup" },
  { meta: _chunkTFUGHWMVcjs.segmentedButtonMeta, file: "SegmentedButton" },
  { meta: _chunkTFUGHWMVcjs.badgeMeta, file: "Badge" },
  { meta: _chunkTFUGHWMVcjs.linearProgressMeta, file: "LinearProgress" },
  { meta: _chunkTFUGHWMVcjs.circularProgressMeta, file: "CircularProgress" },
  { meta: _chunkTFUGHWMVcjs.loadingIndicatorMeta, file: "LoadingIndicator" },
  { meta: _chunkTFUGHWMVcjs.snackbarMeta, file: "Snackbar" },
  { meta: _chunkTFUGHWMVcjs.tooltipMeta, file: "Tooltip" },
  { meta: _chunkTFUGHWMVcjs.bannerMeta, file: "Banner" },
  { meta: _chunkTFUGHWMVcjs.dialogMeta, file: "Dialog" },
  { meta: _chunkTFUGHWMVcjs.dividerMeta, file: "Divider" },
  { meta: _chunkTFUGHWMVcjs.cardMeta, file: "Card" },
  { meta: _chunkTFUGHWMVcjs.listMeta, file: "List" },
  { meta: _chunkTFUGHWMVcjs.bottomSheetMeta, file: "BottomSheet" },
  { meta: _chunkTFUGHWMVcjs.sideSheetMeta, file: "SideSheet" },
  { meta: _chunkTFUGHWMVcjs.carouselMeta, file: "Carousel" },
  { meta: _chunkTFUGHWMVcjs.textFieldMeta, file: "TextField" },
  { meta: _chunkTFUGHWMVcjs.searchBarMeta, file: "SearchBar" },
  { meta: _chunkTFUGHWMVcjs.searchViewMeta, file: "SearchView" },
  { meta: _chunkTFUGHWMVcjs.autocompleteMeta, file: "Autocomplete" },
  { meta: _chunkTFUGHWMVcjs.checkboxMeta, file: "Checkbox" },
  { meta: _chunkTFUGHWMVcjs.radioMeta, file: "Radio" },
  { meta: _chunkTFUGHWMVcjs.switchMeta, file: "Switch" },
  { meta: _chunkTFUGHWMVcjs.sliderMeta, file: "Slider" },
  { meta: _chunkTFUGHWMVcjs.chipMeta, file: "Chip" },
  { meta: _chunkTFUGHWMVcjs.tabsMeta, file: "Tabs" },
  { meta: _chunkTFUGHWMVcjs.navigationBarMeta, file: "NavigationBar" },
  { meta: _chunkTFUGHWMVcjs.navigationDrawerMeta, file: "NavigationDrawer" },
  { meta: _chunkTFUGHWMVcjs.navigationRailMeta, file: "NavigationRail" },
  { meta: _chunkTFUGHWMVcjs.topAppBarMeta, file: "TopAppBar" },
  { meta: _chunkTFUGHWMVcjs.bottomAppBarMeta, file: "BottomAppBar" },
  { meta: _chunkTFUGHWMVcjs.toolbarMeta, file: "Toolbar" },
  { meta: _chunkTFUGHWMVcjs.menuMeta, file: "Menu" },
  { meta: _chunkTFUGHWMVcjs.datePickerMeta, file: "DatePicker" },
  { meta: _chunkTFUGHWMVcjs.timePickerMeta, file: "TimePicker" }
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