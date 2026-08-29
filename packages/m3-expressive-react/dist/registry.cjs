"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkQFKXKI3Tcjs = require('./chunk-QFKXKI3T.cjs');










































var _chunkJACYCSMIcjs = require('./chunk-JACYCSMI.cjs');

// ../../src/lib/m3/registry.ts
var COMPONENT_DIR = "src/components/m3";
var TABLE = [
  { meta: _chunkJACYCSMIcjs.buttonMeta, file: "Button" },
  { meta: _chunkJACYCSMIcjs.iconButtonMeta, file: "IconButton" },
  { meta: _chunkJACYCSMIcjs.fabMeta, file: "FAB" },
  { meta: _chunkJACYCSMIcjs.extendedFabMeta, file: "ExtendedFab" },
  { meta: _chunkJACYCSMIcjs.fabMenuMeta, file: "FabMenu" },
  { meta: _chunkJACYCSMIcjs.splitButtonMeta, file: "SplitButton" },
  { meta: _chunkJACYCSMIcjs.buttonGroupMeta, file: "ButtonGroup" },
  { meta: _chunkJACYCSMIcjs.segmentedButtonMeta, file: "SegmentedButton" },
  { meta: _chunkJACYCSMIcjs.badgeMeta, file: "Badge" },
  { meta: _chunkJACYCSMIcjs.linearProgressMeta, file: "LinearProgress" },
  { meta: _chunkJACYCSMIcjs.circularProgressMeta, file: "CircularProgress" },
  { meta: _chunkJACYCSMIcjs.loadingIndicatorMeta, file: "LoadingIndicator" },
  { meta: _chunkJACYCSMIcjs.snackbarMeta, file: "Snackbar" },
  { meta: _chunkJACYCSMIcjs.tooltipMeta, file: "Tooltip" },
  { meta: _chunkJACYCSMIcjs.bannerMeta, file: "Banner" },
  { meta: _chunkJACYCSMIcjs.dialogMeta, file: "Dialog" },
  { meta: _chunkJACYCSMIcjs.dividerMeta, file: "Divider" },
  { meta: _chunkJACYCSMIcjs.cardMeta, file: "Card" },
  { meta: _chunkJACYCSMIcjs.listMeta, file: "List" },
  { meta: _chunkJACYCSMIcjs.bottomSheetMeta, file: "BottomSheet" },
  { meta: _chunkJACYCSMIcjs.sideSheetMeta, file: "SideSheet" },
  { meta: _chunkJACYCSMIcjs.carouselMeta, file: "Carousel" },
  { meta: _chunkJACYCSMIcjs.textFieldMeta, file: "TextField" },
  { meta: _chunkJACYCSMIcjs.searchBarMeta, file: "SearchBar" },
  { meta: _chunkJACYCSMIcjs.searchViewMeta, file: "SearchView" },
  { meta: _chunkJACYCSMIcjs.autocompleteMeta, file: "Autocomplete" },
  { meta: _chunkJACYCSMIcjs.checkboxMeta, file: "Checkbox" },
  { meta: _chunkJACYCSMIcjs.radioMeta, file: "Radio" },
  { meta: _chunkJACYCSMIcjs.switchMeta, file: "Switch" },
  { meta: _chunkJACYCSMIcjs.sliderMeta, file: "Slider" },
  { meta: _chunkJACYCSMIcjs.chipMeta, file: "Chip" },
  { meta: _chunkJACYCSMIcjs.tabsMeta, file: "Tabs" },
  { meta: _chunkJACYCSMIcjs.navigationBarMeta, file: "NavigationBar" },
  { meta: _chunkJACYCSMIcjs.navigationDrawerMeta, file: "NavigationDrawer" },
  { meta: _chunkJACYCSMIcjs.navigationRailMeta, file: "NavigationRail" },
  { meta: _chunkJACYCSMIcjs.topAppBarMeta, file: "TopAppBar" },
  { meta: _chunkJACYCSMIcjs.bottomAppBarMeta, file: "BottomAppBar" },
  { meta: _chunkJACYCSMIcjs.toolbarMeta, file: "Toolbar" },
  { meta: _chunkJACYCSMIcjs.menuMeta, file: "Menu" },
  { meta: _chunkJACYCSMIcjs.datePickerMeta, file: "DatePicker" },
  { meta: _chunkJACYCSMIcjs.timePickerMeta, file: "TimePicker" }
];
var REGISTRY_VERSION = "1.0.0";
var m3Registry = {
  library: "m3-expressive-react",
  version: REGISTRY_VERSION,
  description: "A Material 3 and Material 3 Expressive React component library with 39 official component implementations plus two clearly labeled composites retained for compatibility: Banner (Material 2 / Flutter heritage) and Autocomplete (text-field + combobox). Every entry ships with structured design-guideline metadata for agentic consumption.",
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