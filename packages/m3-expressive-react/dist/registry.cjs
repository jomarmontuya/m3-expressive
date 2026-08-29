"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkBBN2XBAPcjs = require('./chunk-BBN2XBAP.cjs');










































var _chunkGKCKVHSGcjs = require('./chunk-GKCKVHSG.cjs');

// ../../src/lib/m3/registry.ts
var COMPONENT_DIR = "src/components/m3";
var TABLE = [
  { meta: _chunkGKCKVHSGcjs.buttonMeta, file: "Button" },
  { meta: _chunkGKCKVHSGcjs.iconButtonMeta, file: "IconButton" },
  { meta: _chunkGKCKVHSGcjs.fabMeta, file: "FAB" },
  { meta: _chunkGKCKVHSGcjs.extendedFabMeta, file: "ExtendedFab" },
  { meta: _chunkGKCKVHSGcjs.fabMenuMeta, file: "FabMenu" },
  { meta: _chunkGKCKVHSGcjs.splitButtonMeta, file: "SplitButton" },
  { meta: _chunkGKCKVHSGcjs.buttonGroupMeta, file: "ButtonGroup" },
  { meta: _chunkGKCKVHSGcjs.segmentedButtonMeta, file: "SegmentedButton" },
  { meta: _chunkGKCKVHSGcjs.badgeMeta, file: "Badge" },
  { meta: _chunkGKCKVHSGcjs.linearProgressMeta, file: "LinearProgress" },
  { meta: _chunkGKCKVHSGcjs.circularProgressMeta, file: "CircularProgress" },
  { meta: _chunkGKCKVHSGcjs.loadingIndicatorMeta, file: "LoadingIndicator" },
  { meta: _chunkGKCKVHSGcjs.snackbarMeta, file: "Snackbar" },
  { meta: _chunkGKCKVHSGcjs.tooltipMeta, file: "Tooltip" },
  { meta: _chunkGKCKVHSGcjs.bannerMeta, file: "Banner" },
  { meta: _chunkGKCKVHSGcjs.dialogMeta, file: "Dialog" },
  { meta: _chunkGKCKVHSGcjs.dividerMeta, file: "Divider" },
  { meta: _chunkGKCKVHSGcjs.cardMeta, file: "Card" },
  { meta: _chunkGKCKVHSGcjs.listMeta, file: "List" },
  { meta: _chunkGKCKVHSGcjs.bottomSheetMeta, file: "BottomSheet" },
  { meta: _chunkGKCKVHSGcjs.sideSheetMeta, file: "SideSheet" },
  { meta: _chunkGKCKVHSGcjs.carouselMeta, file: "Carousel" },
  { meta: _chunkGKCKVHSGcjs.textFieldMeta, file: "TextField" },
  { meta: _chunkGKCKVHSGcjs.searchBarMeta, file: "SearchBar" },
  { meta: _chunkGKCKVHSGcjs.searchViewMeta, file: "SearchView" },
  { meta: _chunkGKCKVHSGcjs.autocompleteMeta, file: "Autocomplete" },
  { meta: _chunkGKCKVHSGcjs.checkboxMeta, file: "Checkbox" },
  { meta: _chunkGKCKVHSGcjs.radioMeta, file: "Radio" },
  { meta: _chunkGKCKVHSGcjs.switchMeta, file: "Switch" },
  { meta: _chunkGKCKVHSGcjs.sliderMeta, file: "Slider" },
  { meta: _chunkGKCKVHSGcjs.chipMeta, file: "Chip" },
  { meta: _chunkGKCKVHSGcjs.tabsMeta, file: "Tabs" },
  { meta: _chunkGKCKVHSGcjs.navigationBarMeta, file: "NavigationBar" },
  { meta: _chunkGKCKVHSGcjs.navigationDrawerMeta, file: "NavigationDrawer" },
  { meta: _chunkGKCKVHSGcjs.navigationRailMeta, file: "NavigationRail" },
  { meta: _chunkGKCKVHSGcjs.topAppBarMeta, file: "TopAppBar" },
  { meta: _chunkGKCKVHSGcjs.bottomAppBarMeta, file: "BottomAppBar" },
  { meta: _chunkGKCKVHSGcjs.toolbarMeta, file: "Toolbar" },
  { meta: _chunkGKCKVHSGcjs.menuMeta, file: "Menu" },
  { meta: _chunkGKCKVHSGcjs.datePickerMeta, file: "DatePicker" },
  { meta: _chunkGKCKVHSGcjs.timePickerMeta, file: "TimePicker" }
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
      _chunkBBN2XBAPcjs.categoryLabels[c.category],
      ..._nullishCoalesce(c.variants, () => ( [])),
      ...c.props.map((p) => p.name)
    ].join(" ").toLowerCase();
    return haystack.includes(q);
  });
}






exports.REGISTRY_VERSION = REGISTRY_VERSION; exports.getComponent = getComponent; exports.getComponentsByCategory = getComponentsByCategory; exports.m3Registry = m3Registry; exports.searchComponents = searchComponents;
