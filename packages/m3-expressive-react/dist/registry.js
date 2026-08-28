import {
  categoryLabels
} from "./chunk-EL3OZXJK.js";
import {
  autocompleteMeta,
  badgeMeta,
  bannerMeta,
  bottomAppBarMeta,
  bottomSheetMeta,
  buttonGroupMeta,
  buttonMeta,
  cardMeta,
  checkboxMeta,
  chipMeta,
  circularProgressMeta,
  datePickerMeta,
  dialogMeta,
  dividerMeta,
  extendedFabMeta,
  fabMenuMeta,
  fabMeta,
  iconButtonMeta,
  linearProgressMeta,
  listMeta,
  loadingIndicatorMeta,
  menuMeta,
  navigationBarMeta,
  navigationDrawerMeta,
  navigationRailMeta,
  radioMeta,
  searchBarMeta,
  searchViewMeta,
  segmentedButtonMeta,
  sideSheetMeta,
  sliderMeta,
  snackbarMeta,
  splitButtonMeta,
  switchMeta,
  tabsMeta,
  textFieldMeta,
  timePickerMeta,
  toolbarMeta,
  tooltipMeta,
  topAppBarMeta
} from "./chunk-U6T3G7AB.js";

// ../../src/lib/m3/registry.ts
var COMPONENT_DIR = "src/components/m3";
var TABLE = [
  { meta: buttonMeta, file: "Button" },
  { meta: iconButtonMeta, file: "IconButton" },
  { meta: fabMeta, file: "FAB" },
  { meta: extendedFabMeta, file: "ExtendedFab" },
  { meta: fabMenuMeta, file: "FabMenu" },
  { meta: splitButtonMeta, file: "SplitButton" },
  { meta: buttonGroupMeta, file: "ButtonGroup" },
  { meta: segmentedButtonMeta, file: "SegmentedButton" },
  { meta: badgeMeta, file: "Badge" },
  { meta: linearProgressMeta, file: "LinearProgress" },
  { meta: circularProgressMeta, file: "CircularProgress" },
  { meta: loadingIndicatorMeta, file: "LoadingIndicator" },
  { meta: snackbarMeta, file: "Snackbar" },
  { meta: tooltipMeta, file: "Tooltip" },
  { meta: bannerMeta, file: "Banner" },
  { meta: dialogMeta, file: "Dialog" },
  { meta: dividerMeta, file: "Divider" },
  { meta: cardMeta, file: "Card" },
  { meta: listMeta, file: "List" },
  { meta: bottomSheetMeta, file: "BottomSheet" },
  { meta: sideSheetMeta, file: "SideSheet" },
  { meta: textFieldMeta, file: "TextField" },
  { meta: searchBarMeta, file: "SearchBar" },
  { meta: searchViewMeta, file: "SearchView" },
  { meta: autocompleteMeta, file: "Autocomplete" },
  { meta: checkboxMeta, file: "Checkbox" },
  { meta: radioMeta, file: "Radio" },
  { meta: switchMeta, file: "Switch" },
  { meta: sliderMeta, file: "Slider" },
  { meta: chipMeta, file: "Chip" },
  { meta: tabsMeta, file: "Tabs" },
  { meta: navigationBarMeta, file: "NavigationBar" },
  { meta: navigationDrawerMeta, file: "NavigationDrawer" },
  { meta: navigationRailMeta, file: "NavigationRail" },
  { meta: topAppBarMeta, file: "TopAppBar" },
  { meta: bottomAppBarMeta, file: "BottomAppBar" },
  { meta: toolbarMeta, file: "Toolbar" },
  { meta: menuMeta, file: "Menu" },
  { meta: datePickerMeta, file: "DatePicker" },
  { meta: timePickerMeta, file: "TimePicker" }
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
      categoryLabels[c.category],
      ...c.variants ?? [],
      ...c.props.map((p) => p.name)
    ].join(" ").toLowerCase();
    return haystack.includes(q);
  });
}
export {
  REGISTRY_VERSION,
  getComponent,
  getComponentsByCategory,
  m3Registry,
  searchComponents
};
//# sourceMappingURL=registry.js.map