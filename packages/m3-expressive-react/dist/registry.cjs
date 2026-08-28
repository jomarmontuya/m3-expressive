"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkQFKXKI3Tcjs = require('./chunk-QFKXKI3T.cjs');









































var _chunkWEC2GTG6cjs = require('./chunk-WEC2GTG6.cjs');

// ../../src/lib/m3/registry.ts
var COMPONENT_DIR = "src/components/m3";
var TABLE = [
  { meta: _chunkWEC2GTG6cjs.buttonMeta, file: "Button" },
  { meta: _chunkWEC2GTG6cjs.iconButtonMeta, file: "IconButton" },
  { meta: _chunkWEC2GTG6cjs.fabMeta, file: "FAB" },
  { meta: _chunkWEC2GTG6cjs.extendedFabMeta, file: "ExtendedFab" },
  { meta: _chunkWEC2GTG6cjs.fabMenuMeta, file: "FabMenu" },
  { meta: _chunkWEC2GTG6cjs.splitButtonMeta, file: "SplitButton" },
  { meta: _chunkWEC2GTG6cjs.buttonGroupMeta, file: "ButtonGroup" },
  { meta: _chunkWEC2GTG6cjs.segmentedButtonMeta, file: "SegmentedButton" },
  { meta: _chunkWEC2GTG6cjs.badgeMeta, file: "Badge" },
  { meta: _chunkWEC2GTG6cjs.linearProgressMeta, file: "LinearProgress" },
  { meta: _chunkWEC2GTG6cjs.circularProgressMeta, file: "CircularProgress" },
  { meta: _chunkWEC2GTG6cjs.loadingIndicatorMeta, file: "LoadingIndicator" },
  { meta: _chunkWEC2GTG6cjs.snackbarMeta, file: "Snackbar" },
  { meta: _chunkWEC2GTG6cjs.tooltipMeta, file: "Tooltip" },
  { meta: _chunkWEC2GTG6cjs.bannerMeta, file: "Banner" },
  { meta: _chunkWEC2GTG6cjs.dialogMeta, file: "Dialog" },
  { meta: _chunkWEC2GTG6cjs.dividerMeta, file: "Divider" },
  { meta: _chunkWEC2GTG6cjs.cardMeta, file: "Card" },
  { meta: _chunkWEC2GTG6cjs.listMeta, file: "List" },
  { meta: _chunkWEC2GTG6cjs.bottomSheetMeta, file: "BottomSheet" },
  { meta: _chunkWEC2GTG6cjs.sideSheetMeta, file: "SideSheet" },
  { meta: _chunkWEC2GTG6cjs.textFieldMeta, file: "TextField" },
  { meta: _chunkWEC2GTG6cjs.searchBarMeta, file: "SearchBar" },
  { meta: _chunkWEC2GTG6cjs.searchViewMeta, file: "SearchView" },
  { meta: _chunkWEC2GTG6cjs.autocompleteMeta, file: "Autocomplete" },
  { meta: _chunkWEC2GTG6cjs.checkboxMeta, file: "Checkbox" },
  { meta: _chunkWEC2GTG6cjs.radioMeta, file: "Radio" },
  { meta: _chunkWEC2GTG6cjs.switchMeta, file: "Switch" },
  { meta: _chunkWEC2GTG6cjs.sliderMeta, file: "Slider" },
  { meta: _chunkWEC2GTG6cjs.chipMeta, file: "Chip" },
  { meta: _chunkWEC2GTG6cjs.tabsMeta, file: "Tabs" },
  { meta: _chunkWEC2GTG6cjs.navigationBarMeta, file: "NavigationBar" },
  { meta: _chunkWEC2GTG6cjs.navigationDrawerMeta, file: "NavigationDrawer" },
  { meta: _chunkWEC2GTG6cjs.navigationRailMeta, file: "NavigationRail" },
  { meta: _chunkWEC2GTG6cjs.topAppBarMeta, file: "TopAppBar" },
  { meta: _chunkWEC2GTG6cjs.bottomAppBarMeta, file: "BottomAppBar" },
  { meta: _chunkWEC2GTG6cjs.toolbarMeta, file: "Toolbar" },
  { meta: _chunkWEC2GTG6cjs.menuMeta, file: "Menu" },
  { meta: _chunkWEC2GTG6cjs.datePickerMeta, file: "DatePicker" },
  { meta: _chunkWEC2GTG6cjs.timePickerMeta, file: "TimePicker" }
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