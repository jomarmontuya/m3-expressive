import type { M3Category, M3ComponentMeta, M3Registry, M3RegistryEntry } from "./types";
import { categoryLabels } from "./types";

import { buttonMeta } from "@/lib/m3/meta";
import { iconButtonMeta } from "@/lib/m3/meta";
import { fabMeta } from "@/lib/m3/meta";
import { extendedFabMeta } from "@/lib/m3/meta";
import { fabMenuMeta } from "@/lib/m3/meta";
import { splitButtonMeta } from "@/lib/m3/meta";
import { buttonGroupMeta } from "@/lib/m3/meta";
import { segmentedButtonMeta } from "@/lib/m3/meta";
import { badgeMeta } from "@/lib/m3/meta";
import { linearProgressMeta } from "@/lib/m3/meta";
import { circularProgressMeta } from "@/lib/m3/meta";
import { loadingIndicatorMeta } from "@/lib/m3/meta";
import { snackbarMeta } from "@/lib/m3/meta";
import { tooltipMeta } from "@/lib/m3/meta";
import { bannerMeta } from "@/lib/m3/meta";
import { dialogMeta } from "@/lib/m3/meta";
import { dividerMeta } from "@/lib/m3/meta";
import { cardMeta } from "@/lib/m3/meta";
import { listMeta } from "@/lib/m3/meta";
import { bottomSheetMeta } from "@/lib/m3/meta";
import { sideSheetMeta } from "@/lib/m3/meta";
import { carouselMeta } from "@/lib/m3/meta";
import { textFieldMeta } from "@/lib/m3/meta";
import { searchBarMeta } from "@/lib/m3/meta";
import { searchViewMeta } from "@/lib/m3/meta";
import { autocompleteMeta } from "@/lib/m3/meta";
import { checkboxMeta } from "@/lib/m3/meta";
import { radioMeta } from "@/lib/m3/meta";
import { switchMeta } from "@/lib/m3/meta";
import { sliderMeta } from "@/lib/m3/meta";
import { chipMeta } from "@/lib/m3/meta";
import { tabsMeta } from "@/lib/m3/meta";
import { navigationBarMeta } from "@/lib/m3/meta";
import { navigationDrawerMeta } from "@/lib/m3/meta";
import { navigationRailMeta } from "@/lib/m3/meta";
import { topAppBarMeta } from "@/lib/m3/meta";
import { bottomAppBarMeta } from "@/lib/m3/meta";
import { toolbarMeta } from "@/lib/m3/meta";
import { menuMeta } from "@/lib/m3/meta";
import { datePickerMeta } from "@/lib/m3/meta";
import { timePickerMeta } from "@/lib/m3/meta";

const COMPONENT_DIR = "src/components/m3";

interface RegistryRow {
  meta: M3ComponentMeta;
  file: string;
}

const TABLE: RegistryRow[] = [
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
  { meta: carouselMeta, file: "Carousel" },
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
  { meta: timePickerMeta, file: "TimePicker" },
];

export const REGISTRY_VERSION = "1.0.0";

/**
 * The full agentic-compatible registry. Powers /api/registry, /llms.txt
 * and the docs showcase — single source of truth.
 */
export const m3Registry: M3Registry = {
  library: "m3-expressive-react",
  version: REGISTRY_VERSION,
  description:
    "A complete Material 3 Expressive (M3E) React component library. Every component is built on official M3 design tokens (color roles, shape scale, Roboto Flex typography, physics-based spring motion, state layers) and ships with structured design-guideline metadata for agentic consumption.",
  spec: "https://m3.material.io",
  totalCount: TABLE.length,
  categories: ["actions", "communication", "containment", "selection", "textinput", "navigation"],
  components: TABLE.map((row) => ({
    ...row.meta,
    file: `${COMPONENT_DIR}/${row.file}.tsx`,
  })),
};

export function getComponent(id: string): M3RegistryEntry | undefined {
  return m3Registry.components.find((c) => c.id === id);
}

export function getComponentsByCategory(category: M3Category): M3RegistryEntry[] {
  return m3Registry.components.filter((c) => c.category === category);
}

export function searchComponents(query: string): M3RegistryEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return m3Registry.components;
  return m3Registry.components.filter((c) => {
    const haystack = [
      c.id,
      c.name,
      c.description,
      categoryLabels[c.category],
      ...(c.variants ?? []),
      ...c.props.map((p) => p.name),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
