/**
 * MATERIAL 3 EXPRESSIVE REACT — public barrel
 * import { Button, Card, Dialog, m3Registry } from "@/components/m3";
 */

export { Button, buttonMeta, type ButtonProps, type ButtonVariant, type ButtonSize } from "./Button";
export { IconButton, iconButtonMeta, type IconButtonProps } from "./IconButton";
export { Fab, fabMeta, type FabProps } from "./FAB";
export { ExtendedFab, extendedFabMeta, type ExtendedFabProps } from "./ExtendedFab";
export { FabMenu, fabMenuMeta, type FabMenuProps } from "./FabMenu";
export { SplitButton, splitButtonMeta, type SplitButtonProps } from "./SplitButton";
export { ButtonGroup, buttonGroupMeta, type ButtonGroupProps } from "./ButtonGroup";
export { SegmentedButton, segmentedButtonMeta, type SegmentedButtonProps } from "./SegmentedButton";
export { Badge, badgeMeta, type BadgeProps } from "./Badge";
export { LinearProgress, linearProgressMeta, type LinearProgressProps } from "./LinearProgress";
export { CircularProgress, circularProgressMeta, type CircularProgressProps } from "./CircularProgress";
export { LoadingIndicator, loadingIndicatorMeta, type LoadingIndicatorProps } from "./LoadingIndicator";
export { Snackbar, snackbarMeta, type SnackbarProps } from "./Snackbar";
export { Tooltip, tooltipMeta, type TooltipProps } from "./Tooltip";
export { Banner, bannerMeta, type BannerProps } from "./Banner";
export { Dialog, dialogMeta, type DialogProps } from "./Dialog";
export { Divider, dividerMeta, type DividerProps } from "./Divider";
export { Card, cardMeta, type CardProps } from "./Card";
export { List, ListItem, listMeta, type ListProps, type ListItemProps } from "./List";
export { BottomSheet, bottomSheetMeta, type BottomSheetProps } from "./BottomSheet";
export { SideSheet, sideSheetMeta, type SideSheetProps } from "./SideSheet";
export { TextField, textFieldMeta, type TextFieldProps } from "./TextField";
export { SearchBar, searchBarMeta, type SearchBarProps } from "./SearchBar";
export { Autocomplete, autocompleteMeta, type AutocompleteProps } from "./Autocomplete";
export { Checkbox, checkboxMeta, type CheckboxProps } from "./Checkbox";
export { Radio, radioMeta, type RadioProps } from "./Radio";
export { Switch, switchMeta, type SwitchProps } from "./Switch";
export { Slider, sliderMeta, type SliderProps } from "./Slider";
export { Chip, chipMeta, type ChipProps } from "./Chip";
export { Tabs, tabsMeta, type TabsProps } from "./Tabs";
export { NavigationBar, navigationBarMeta, type NavigationBarProps } from "./NavigationBar";
export { NavigationDrawer, navigationDrawerMeta, type NavigationDrawerProps } from "./NavigationDrawer";
export { NavigationRail, navigationRailMeta, type NavigationRailProps } from "./NavigationRail";
export { TopAppBar, topAppBarMeta, type TopAppBarProps } from "./TopAppBar";
export { BottomAppBar, bottomAppBarMeta, type BottomAppBarProps } from "./BottomAppBar";
export { Toolbar, toolbarMeta, type ToolbarProps } from "./Toolbar";
export { Menu, menuMeta, type MenuProps, type MenuItemData } from "./Menu";
export { DatePicker, datePickerMeta, type DatePickerProps } from "./DatePicker";
export { TimePicker, timePickerMeta, type TimePickerProps, type TimePickerValue } from "./TimePicker";

/* Primitives */
export { MaterialSymbol, type MaterialSymbolProps } from "./MaterialSymbol";
export { Ripple, type RippleProps } from "./Ripple";

/* Tokens + registry */
export { springs, easings, durations, shapes, shapeMorph, stateOpacities, typeScale, elevations, colorRoles, colorVar, type M3Spring, type PaletteColor } from "@/lib/m3/tokens";
export { m3Registry, getComponent, searchComponents, getComponentsByCategory } from "@/lib/m3/registry";
export * from "@/lib/m3/types";
