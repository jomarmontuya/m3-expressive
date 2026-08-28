"use client";

/**
 * PLAYGROUND_SPECS — typed registry for the component-page Props Playground.
 *
 * Each spec declares the controls (segmented / switch / text / slider) for ONE
 * component, how to live-render the component from the current control values,
 * and how to generate the matching copy-paste code (imports from the published
 * `m3-expressive-react` package). Controls only ever expose props that exist
 * on the real component API — nothing invented.
 *
 * Components without an entry here get NO playground (zero impact on their page).
 */

import * as React from "react";
import { Button } from "@/components/m3/Button";
import type { ButtonSize, ButtonVariant } from "@/components/m3/Button";
import { IconButton } from "@/components/m3/IconButton";
import type { IconButtonSize, IconButtonVariant } from "@/components/m3/IconButton";
import { Fab } from "@/components/m3/FAB";
import type { FabColor, FabSize } from "@/components/m3/FAB";
import { ExtendedFab } from "@/components/m3/ExtendedFab";
import { Chip } from "@/components/m3/Chip";
import type { ChipSize, ChipVariant } from "@/components/m3/Chip";
import { Badge } from "@/components/m3/Badge";
import type { BadgeColor } from "@/components/m3/Badge";
import { Switch } from "@/components/m3/Switch";
import { Slider } from "@/components/m3/Slider";
import { Divider } from "@/components/m3/Divider";
import type { DividerColor, DividerInset, DividerOrientation } from "@/components/m3/Divider";
import { CircularProgress } from "@/components/m3/CircularProgress";
import type { CircularProgressColor } from "@/components/m3/CircularProgress";
import { Checkbox } from "@/components/m3/Checkbox";
import { Radio } from "@/components/m3/Radio";
import { TextField } from "@/components/m3/TextField";
import type { TextFieldVariant } from "@/components/m3/TextField";
import { LinearProgress } from "@/components/m3/LinearProgress";
import type { LinearProgressColor } from "@/components/m3/LinearProgress";
import { LoadingIndicator } from "@/components/m3/LoadingIndicator";
import type { LoadingIndicatorColor } from "@/components/m3/LoadingIndicator";
import { Tooltip } from "@/components/m3/Tooltip";
import { Card } from "@/components/m3/Card";
import type { CardShape, CardVariant } from "@/components/m3/Card";
import { Snackbar } from "@/components/m3/Snackbar";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { Menu } from "@/components/m3/Menu";
import type { MenuPlacement } from "@/components/m3/Menu";
import { Dialog } from "@/components/m3/Dialog";
import { Banner } from "@/components/m3/Banner";
import { SearchBar } from "@/components/m3/SearchBar";
import type { SearchBarSize } from "@/components/m3/SearchBar";
import { Autocomplete } from "@/components/m3/Autocomplete";
import { Tabs } from "@/components/m3/Tabs";
import { SegmentedButton } from "@/components/m3/SegmentedButton";
import type { SegmentedButtonSize } from "@/components/m3/SegmentedButton";
import { ButtonGroup } from "@/components/m3/ButtonGroup";
import type {
  ButtonGroupSelection,
  ButtonGroupSize,
  ButtonGroupVariant,
} from "@/components/m3/ButtonGroup";
import { List, ListItem } from "@/components/m3/List";
import { Toolbar } from "@/components/m3/Toolbar";
import type { ToolbarColor, ToolbarVariant } from "@/components/m3/Toolbar";
import { DatePicker } from "@/components/m3/DatePicker";
import { TimePicker } from "@/components/m3/TimePicker";

/**
 * Stage Switch with an accessible name. The library Switch forwards its ref
 * to the DOM button but takes no aria props, so the name is attached via ref.
 */
function StageSwitch({
  checked,
  onCheckedChange,
  disabled,
  label,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled: boolean;
  label: string;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    ref.current?.setAttribute("aria-label", label);
  }, [label]);
  return <Switch ref={ref} checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} />;
}

export type PlaygroundValue = string | number | boolean;
export type PlaygroundValues = Record<string, PlaygroundValue>;

export type PlaygroundControl =
  | {
      kind: "segmented";
      key: string;
      label: string;
      icon?: string;
      options: { value: string; label: string }[];
      disabledWhen?: (v: PlaygroundValues) => boolean;
    }
  | {
      kind: "switch";
      key: string;
      label: string;
      icon?: string;
      disabledWhen?: (v: PlaygroundValues) => boolean;
    }
  | {
      kind: "text";
      key: string;
      label: string;
      icon?: string;
      disabledWhen?: (v: PlaygroundValues) => boolean;
    }
  | {
      kind: "slider";
      key: string;
      label: string;
      icon?: string;
      min: number;
      max: number;
      step: number;
      disabledWhen?: (v: PlaygroundValues) => boolean;
    };

export interface PlaygroundSpec {
  /** Registry id of the target component, e.g. "button". */
  id: string;
  /** Exported symbol name used in the generated code, e.g. "Button". */
  component: string;
  /** One-line explainer shown under the Playground heading. */
  explainer: string;
  defaults: PlaygroundValues;
  controls: PlaygroundControl[];
  /**
   * Optional key for the stage swap animation: when its value changes the
   * stage cross-fades (for structural swaps the component's own motion can't
   * express). Components whose own motion covers prop changes omit it.
   */
  stageKey?: (v: PlaygroundValues) => string;
  render: (v: PlaygroundValues, set: (key: string, value: PlaygroundValue) => void) => React.ReactNode;
  code: (v: PlaygroundValues) => string;
}

/* ------------------------------------------------------------------ */
/* Shared value helpers                                                */
/* ------------------------------------------------------------------ */

export const pgStr = (v: PlaygroundValue | undefined, fallback: string): string =>
  typeof v === "string" ? v : fallback;

export const pgNum = (v: PlaygroundValue | undefined, fallback: number): number => {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) return Number(v);
  return fallback;
};

const joinCode = (component: string, props: string[], body?: string): string => {
  const open = `<${component}${props.length ? " " + props.join(" ") : ""}`;
  return `import { ${component} } from "m3-expressive-react";\n\n${
    body ? `${open}>\n  ${body}\n</${component}>` : `${open} />`
  }`;
};

const sizeOptions = (values: string[]) => values.map((v) => ({ value: v, label: v }));

/* Date/time playground helpers — dates/times can't live in PlaygroundValue
   (string | number | boolean), so they are stored as "YYYY-MM-DD" / "H:m"
   strings and parsed on render. */
const PG_MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "YYYY-MM-DD" → local Date (undefined when empty/malformed). */
function pgIso(s: PlaygroundValue | undefined): Date | undefined {
  if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return undefined;
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Local Date → "YYYY-MM-DD". */
function pgIsoStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** "H:m" → [hour, minute] (defaults 9:41, the official docs sample time). */
function pgTime(s: PlaygroundValue | undefined): [number, number] {
  const m = typeof s === "string" && /^\d{1,2}:\d{1,2}$/.test(s) ? s.split(":").map(Number) : [9, 41];
  return [m[0] ?? 9, m[1] ?? 41];
}

/** Readout label — 24h "09:41" / 12h "9:41 AM". */
function pgTimeLabel(h: number, m: number, use24h: boolean): string {
  const mm = String(m).padStart(2, "0");
  if (use24h) return `${String(h).padStart(2, "0")}:${mm}`;
  const period = h < 12 ? "AM" : "PM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${mm} ${period}`;
}

/* ------------------------------------------------------------------ */
/* PLAYGROUND_SPECS — 30 components                                   */
/* ------------------------------------------------------------------ */

export const PLAYGROUND_SPECS: Record<string, PlaygroundSpec> = {
  /* ---------------------------------------------------------------- */
  button: {
    id: "button",
    component: "Button",
    explainer: "Flip variants, sizes and states live — the code below mirrors every control 1:1.",
    defaults: { variant: "filled", size: "md", icon: false, disabled: false, label: "Get started" },
    controls: [
      {
        kind: "segmented",
        key: "variant",
        label: "Variant",
        icon: "category",
        options: sizeOptions(["filled", "tonal", "outlined", "text", "elevated"]),
      },
      {
        kind: "segmented",
        key: "size",
        label: "Size",
        icon: "straighten",
        options: sizeOptions(["xs", "sm", "md", "lg", "xl"]),
      },
      { kind: "switch", key: "icon", label: "Leading icon", icon: "bolt" },
      { kind: "switch", key: "disabled", label: "Disabled", icon: "block" },
      { kind: "text", key: "label", label: "Label", icon: "edit" },
    ],
    render: (v) => {
      const label = pgStr(v.label, "").trim();
      return (
        <Button
          variant={pgStr(v.variant, "filled") as ButtonVariant}
          size={pgStr(v.size, "md") as ButtonSize}
          icon={v.icon === true ? "bolt" : undefined}
          disabled={v.disabled === true}
        >
          {label || undefined}
        </Button>
      );
    },
    code: (v) => {
      const props: string[] = [];
      if (v.variant !== "filled") props.push(`variant="${pgStr(v.variant, "filled")}"`);
      if (v.size !== "md") props.push(`size="${pgStr(v.size, "md")}"`);
      if (v.icon === true) props.push('icon="bolt"');
      if (v.disabled === true) props.push("disabled");
      const label = pgStr(v.label, "").trim();
      return joinCode("Button", props, label || undefined);
    },
  },

  /* ---------------------------------------------------------------- */
  "icon-button": {
    id: "icon-button",
    component: "IconButton",
    explainer: "Toggleable on/off icon button — selection recolors the glyph and pops it with the expressive spring.",
    defaults: { variant: "standard", size: "md", toggleable: true, selected: false, disabled: false, icon: "favorite" },
    controls: [
      {
        kind: "segmented",
        key: "variant",
        label: "Variant",
        icon: "category",
        options: sizeOptions(["standard", "filled", "tonal", "outlined"]),
      },
      {
        kind: "segmented",
        key: "size",
        label: "Size",
        icon: "straighten",
        options: sizeOptions(["xs", "sm", "md", "lg", "xl"]),
      },
      { kind: "switch", key: "toggleable", label: "Toggleable", icon: "toggle_on" },
      {
        kind: "switch",
        key: "selected",
        label: "Selected",
        icon: "check_circle",
        disabledWhen: (v) => v.toggleable !== true,
      },
      { kind: "switch", key: "disabled", label: "Disabled", icon: "block" },
      { kind: "text", key: "icon", label: "Icon name", icon: "emoji_symbols" },
    ],
    render: (v, set) => {
      const toggleable = v.toggleable === true;
      return (
        <IconButton
          variant={pgStr(v.variant, "standard") as IconButtonVariant}
          size={pgStr(v.size, "md") as IconButtonSize}
          icon={pgStr(v.icon, "favorite").trim() || "favorite"}
          toggleable={toggleable}
          selected={toggleable ? v.selected === true : undefined}
          onSelectedChange={toggleable ? (s) => set("selected", s) : undefined}
          disabled={v.disabled === true}
          aria-label="Favorite"
        />
      );
    },
    code: (v) => {
      const toggleable = v.toggleable === true;
      const props: string[] = [];
      if (v.variant !== "standard") props.push(`variant="${pgStr(v.variant, "standard")}"`);
      if (v.size !== "md") props.push(`size="${pgStr(v.size, "md")}"`);
      props.push(`icon="${pgStr(v.icon, "favorite").trim() || "favorite"}"`);
      if (toggleable) props.push("toggleable");
      if (toggleable && v.selected === true) props.push("selected");
      if (v.disabled === true) props.push("disabled");
      return joinCode("IconButton", props);
    },
  },

  /* ---------------------------------------------------------------- */
  fab: {
    id: "fab",
    component: "Fab",
    explainer: "Pick the FAB color role and expressive size (40–132dp); lowered drops rest elevation to level 1.",
    defaults: { color: "primary", size: "medium", lowered: false, disabled: false, icon: "add" },
    controls: [
      {
        kind: "segmented",
        key: "color",
        label: "Color role",
        icon: "palette",
        options: sizeOptions(["primary", "secondary", "tertiary", "surface"]),
      },
      {
        kind: "segmented",
        key: "size",
        label: "Size",
        icon: "straighten",
        options: [
          { value: "small", label: "S" },
          { value: "medium", label: "M" },
          { value: "large", label: "L" },
          { value: "extra-large", label: "XL" },
        ],
      },
      { kind: "switch", key: "lowered", label: "Lowered elevation", icon: "south" },
      { kind: "switch", key: "disabled", label: "Disabled", icon: "block" },
      { kind: "text", key: "icon", label: "Icon name", icon: "emoji_symbols" },
    ],
    render: (v) => (
      <Fab
        color={pgStr(v.color, "primary") as FabColor}
        size={pgStr(v.size, "medium") as FabSize}
        icon={pgStr(v.icon, "add").trim() || "add"}
        lowered={v.lowered === true}
        disabled={v.disabled === true}
        aria-label="Create"
      />
    ),
    code: (v) => {
      const props: string[] = [];
      if (v.color !== "primary") props.push(`color="${pgStr(v.color, "primary")}"`);
      if (v.size !== "medium") props.push(`size="${pgStr(v.size, "medium")}"`);
      props.push(`icon="${pgStr(v.icon, "add").trim() || "add"}"`);
      if (v.lowered === true) props.push("lowered");
      if (v.disabled === true) props.push("disabled");
      return joinCode("Fab", props);
    },
  },

  /* ---------------------------------------------------------------- */
  "extended-fab": {
    id: "extended-fab",
    component: "ExtendedFab",
    explainer:
      "Icon + label FAB. Height is fixed at the official 56dp — ExtendedFab has no size prop, so color, icon, label and elevation are the real knobs.",
    defaults: { color: "primary", lowered: false, disabled: false, icon: "edit", label: "Compose" },
    controls: [
      {
        kind: "segmented",
        key: "color",
        label: "Color role",
        icon: "palette",
        options: sizeOptions(["primary", "secondary", "tertiary", "surface"]),
      },
      { kind: "switch", key: "lowered", label: "Lowered elevation", icon: "south" },
      { kind: "switch", key: "disabled", label: "Disabled", icon: "block" },
      { kind: "text", key: "icon", label: "Icon name", icon: "emoji_symbols" },
      { kind: "text", key: "label", label: "Label", icon: "edit" },
    ],
    render: (v) => (
      <ExtendedFab
        color={pgStr(v.color, "primary") as FabColor}
        icon={pgStr(v.icon, "edit").trim() || "edit"}
        label={pgStr(v.label, "Compose").trim() || "Compose"}
        lowered={v.lowered === true}
        disabled={v.disabled === true}
      />
    ),
    code: (v) => {
      const props: string[] = [];
      if (v.color !== "primary") props.push(`color="${pgStr(v.color, "primary")}"`);
      props.push(`icon="${pgStr(v.icon, "edit").trim() || "edit"}"`);
      props.push(`label="${pgStr(v.label, "Compose").trim() || "Compose"}"`);
      if (v.lowered === true) props.push("lowered");
      if (v.disabled === true) props.push("disabled");
      return joinCode("ExtendedFab", props);
    },
  },

  /* ---------------------------------------------------------------- */
  chip: {
    id: "chip",
    component: "Chip",
    explainer: "Assist / filter / input / suggestion — the check and cancel affordances follow the variant and state.",
    defaults: { variant: "filter", size: "sm", selected: true, removable: false, elevated: false, disabled: false, label: "Filters" },
    controls: [
      {
        kind: "segmented",
        key: "variant",
        label: "Variant",
        icon: "category",
        options: sizeOptions(["assist", "filter", "input", "suggestion"]),
      },
      {
        kind: "segmented",
        key: "size",
        label: "Size",
        icon: "straighten",
        options: sizeOptions(["xs", "sm", "md"]),
      },
      {
        kind: "switch",
        key: "selected",
        label: "Selected",
        icon: "check_circle",
        disabledWhen: (v) => pgStr(v.variant, "filter") === "input",
      },
      {
        kind: "switch",
        key: "removable",
        label: "Removable (input)",
        icon: "cancel",
        disabledWhen: (v) => pgStr(v.variant, "filter") !== "input",
      },
      { kind: "switch", key: "elevated", label: "Elevated", icon: "arrow_upward" },
      { kind: "switch", key: "disabled", label: "Disabled", icon: "block" },
      { kind: "text", key: "label", label: "Label", icon: "edit" },
    ],
    render: (v, set) => {
      const variant = pgStr(v.variant, "filter") as ChipVariant;
      const selectable = variant !== "input";
      const removable = variant === "input" && v.removable === true;
      return (
        <Chip
          variant={variant}
          size={pgStr(v.size, "sm") as ChipSize}
          selected={selectable ? v.selected === true : false}
          onSelect={selectable ? (s) => set("selected", s) : undefined}
          onRemove={removable ? () => set("removable", false) : undefined}
          elevated={v.elevated === true}
          disabled={v.disabled === true}
        >
          {pgStr(v.label, "Chip").trim() || "Chip"}
        </Chip>
      );
    },
    code: (v) => {
      const variant = pgStr(v.variant, "filter");
      const selectable = variant !== "input";
      const props: string[] = [];
      if (variant !== "assist") props.push(`variant="${variant}"`);
      if (v.size !== "sm") props.push(`size="${pgStr(v.size, "sm")}"`);
      if (selectable) props.push("onSelect={handleSelect}");
      if (selectable && v.selected === true) props.push("selected");
      if (variant === "input" && v.removable === true) props.push("onRemove={handleRemove}");
      if (v.elevated === true) props.push("elevated");
      if (v.disabled === true) props.push("disabled");
      return joinCode("Chip", props, pgStr(v.label, "Chip").trim() || "Chip");
    },
  },

  /* ---------------------------------------------------------------- */
  badge: {
    id: "badge",
    component: "Badge",
    explainer: "Dot vs count badge pinned to a host icon button — counts above max collapse to “99+”.",
    defaults: { showDot: false, value: "3", color: "error" },
    controls: [
      { kind: "switch", key: "showDot", label: "Dot instead of count", icon: "circle" },
      { kind: "text", key: "value", label: "Count", icon: "pin", disabledWhen: (v) => v.showDot === true },
      {
        kind: "segmented",
        key: "color",
        label: "Color",
        icon: "palette",
        options: sizeOptions(["error", "primary", "tertiary"]),
      },
    ],
    stageKey: (v) => (v.showDot === true ? "dot" : "value"),
    render: (v) => {
      const showDot = v.showDot === true;
      const raw = pgStr(v.value, "").trim();
      const value = raw === "" ? undefined : Number.isNaN(Number(raw)) ? raw : Number(raw);
      return (
        <Badge value={showDot ? undefined : value} showDot={showDot} color={pgStr(v.color, "error") as BadgeColor}>
          <IconButton icon="mail" aria-label="Messages" />
        </Badge>
      );
    },
    code: (v) => {
      const showDot = v.showDot === true;
      const raw = pgStr(v.value, "").trim();
      const valueProp = raw === "" ? undefined : Number.isNaN(Number(raw)) ? `"${raw}"` : `{${raw}}`;
      const props: string[] = [];
      if (showDot) props.push("showDot");
      else if (valueProp !== undefined) props.push(`value=${valueProp}`);
      if (v.color !== "error") props.push(`color="${pgStr(v.color, "error")}"`);
      const open = `<Badge${props.length ? " " + props.join(" ") : ""}>`;
      return `import { Badge, IconButton } from "m3-expressive-react";\n\n${open}\n  <IconButton icon="mail" aria-label="Messages" />\n</Badge>`;
    },
  },

  /* ---------------------------------------------------------------- */
  switch: {
    id: "switch",
    component: "Switch",
    explainer:
      "Flip the stage switch or the controls — the on-thumb check glyph is built into the component (its API has no icon props).",
    defaults: { checked: false, disabled: false },
    controls: [
      { kind: "switch", key: "checked", label: "On", icon: "toggle_on" },
      { kind: "switch", key: "disabled", label: "Disabled", icon: "block" },
    ],
    render: (v, set) => (
      <StageSwitch
        label="Playground switch"
        checked={v.checked === true}
        onCheckedChange={(on) => set("checked", on)}
        disabled={v.disabled === true}
      />
    ),
    code: (v) => {
      const props: string[] = [];
      if (v.checked === true) props.push("checked");
      props.push("onCheckedChange={setChecked}");
      if (v.disabled === true) props.push("disabled");
      return joinCode("Switch", props);
    },
  },

  /* ---------------------------------------------------------------- */
  slider: {
    id: "slider",
    component: "Slider",
    explainer: "Drag the stage slider or the Value control — add discrete ticks, a value bubble or a bigger step.",
    defaults: { value: 40, step: "1", discrete: false, showValueLabel: false, disabled: false },
    controls: [
      { kind: "slider", key: "value", label: "Value", icon: "linear_scale", min: 0, max: 100, step: 1 },
      {
        kind: "segmented",
        key: "step",
        label: "Step",
        icon: "grid_view",
        options: sizeOptions(["1", "5", "10"]),
      },
      { kind: "switch", key: "discrete", label: "Discrete ticks", icon: "grain" },
      { kind: "switch", key: "showValueLabel", label: "Value bubble", icon: "label" },
      { kind: "switch", key: "disabled", label: "Disabled", icon: "block" },
    ],
    render: (v, set) => (
      <Slider
        value={pgNum(v.value, 40)}
        onChange={(n) => set("value", n)}
        step={pgNum(v.step, 1)}
        discrete={v.discrete === true}
        showValueLabel={v.showValueLabel === true}
        disabled={v.disabled === true}
        aria-label="Playground value"
      />
    ),
    code: (v) => {
      const step = pgNum(v.step, 1);
      const props: string[] = [`value={${pgNum(v.value, 40)}}`, "onChange={setValue}"];
      if (step !== 1) props.push(`step={${step}}`);
      if (v.discrete === true) props.push("discrete");
      if (v.showValueLabel === true) props.push("showValueLabel");
      if (v.disabled === true) props.push("disabled");
      return joinCode("Slider", props);
    },
  },

  /* ---------------------------------------------------------------- */
  divider: {
    id: "divider",
    component: "Divider",
    explainer: "Horizontal or vertical, with the official M3 insets — shown in a mini list for context.",
    defaults: { orientation: "horizontal", inset: "none", color: "outline-variant" },
    controls: [
      {
        kind: "segmented",
        key: "orientation",
        label: "Orientation",
        icon: "swap_horiz",
        options: sizeOptions(["horizontal", "vertical"]),
      },
      {
        kind: "segmented",
        key: "inset",
        label: "Inset",
        icon: "format_indent_increase",
        options: sizeOptions(["none", "start", "middle", "end"]),
      },
      {
        kind: "segmented",
        key: "color",
        label: "Color",
        icon: "palette",
        options: sizeOptions(["outline-variant", "outline"]),
      },
    ],
    stageKey: (v) => pgStr(v.orientation, "horizontal"),
    render: (v) => {
      const orientation = pgStr(v.orientation, "horizontal") as DividerOrientation;
      const inset = pgStr(v.inset, "none") as DividerInset;
      const color = pgStr(v.color, "outline-variant") as DividerColor;
      if (orientation === "vertical") {
        return (
          <div className="flex items-center justify-center gap-5">
            <span className="md-body-medium text-m3-on-surface-variant">Start</span>
            <Divider orientation="vertical" inset={inset} color={color} className="h-32" />
            <span className="md-body-medium text-m3-on-surface-variant">End</span>
          </div>
        );
      }
      return (
        <div className="w-full max-w-xs rounded-2xl border border-m3-outline-variant p-3">
          <div className="px-1 py-2.5 md-body-medium text-m3-on-surface">Inbox</div>
          <Divider inset={inset} color={color} />
          <div className="px-1 py-2.5 md-body-medium text-m3-on-surface">Starred</div>
        </div>
      );
    },
    code: (v) => {
      const props: string[] = [];
      if (v.orientation !== "horizontal") props.push(`orientation="${pgStr(v.orientation, "horizontal")}"`);
      if (v.inset !== "none") props.push(`inset="${pgStr(v.inset, "none")}"`);
      if (v.color !== "outline-variant") props.push(`color="${pgStr(v.color, "outline-variant")}"`);
      return joinCode("Divider", props);
    },
  },

  /* ---------------------------------------------------------------- */
  "circular-progress": {
    id: "circular-progress",
    component: "CircularProgress",
    explainer: "Indeterminate sweep or determinate arc with the fixed stop dot — drag the value while determinate.",
    defaults: { mode: "indeterminate", value: 64, color: "primary" },
    controls: [
      {
        kind: "segmented",
        key: "mode",
        label: "Mode",
        icon: "autorenew",
        options: sizeOptions(["indeterminate", "determinate"]),
      },
      {
        kind: "slider",
        key: "value",
        label: "Value",
        icon: "linear_scale",
        min: 0,
        max: 100,
        step: 1,
        disabledWhen: (v) => v.mode !== "determinate",
      },
      {
        kind: "segmented",
        key: "color",
        label: "Color",
        icon: "palette",
        options: sizeOptions(["primary", "secondary", "tertiary", "error"]),
      },
    ],
    stageKey: (v) => pgStr(v.mode, "indeterminate"),
    render: (v) => (
      <CircularProgress
        value={v.mode === "determinate" ? pgNum(v.value, 64) : undefined}
        color={pgStr(v.color, "primary") as CircularProgressColor}
      />
    ),
    code: (v) => {
      const props: string[] = [];
      if (v.mode === "determinate") props.push(`value={${pgNum(v.value, 64)}}`);
      if (v.color !== "primary") props.push(`color="${pgStr(v.color, "primary")}"`);
      return joinCode("CircularProgress", props);
    },
  },

  /* ---------------------------------------------------------------- */
  checkbox: {
    id: "checkbox",
    component: "Checkbox",
    explainer:
      "Click the stage checkbox or flip Checked — the checkmark and the indeterminate dash draw themselves on the expressive spring.",
    defaults: { checked: false, indeterminate: false, disabled: false, error: false, label: "Sync account" },
    controls: [
      { kind: "switch", key: "checked", label: "Checked", icon: "check_box" },
      { kind: "switch", key: "indeterminate", label: "Indeterminate", icon: "indeterminate_check_box" },
      { kind: "switch", key: "disabled", label: "Disabled", icon: "block" },
      { kind: "switch", key: "error", label: "Error", icon: "error" },
      { kind: "text", key: "label", label: "Label", icon: "edit" },
    ],
    render: (v, set) => {
      const label = pgStr(v.label, "").trim();
      return (
        <Checkbox
          checked={v.checked === true}
          indeterminate={v.indeterminate === true}
          onChange={(checked) => set("checked", checked)}
          label={label || undefined}
          disabled={v.disabled === true}
          error={v.error === true}
        />
      );
    },
    code: (v) => {
      const props: string[] = [];
      if (v.checked === true) props.push("checked");
      if (v.indeterminate === true) props.push("indeterminate");
      props.push("onChange={setChecked}");
      if (v.disabled === true) props.push("disabled");
      if (v.error === true) props.push("error");
      const label = pgStr(v.label, "").trim();
      if (label) props.push(`label="${label}"`);
      return joinCode("Checkbox", props);
    },
  },

  /* ---------------------------------------------------------------- */
  radio: {
    id: "radio",
    component: "Radio",
    explainer:
      "A radio selects but never unselects — clicking always fires onChange, so the inner dot springs in and stays.",
    defaults: { checked: false, error: false, disabled: false, label: "Day trip" },
    controls: [
      { kind: "switch", key: "checked", label: "Selected", icon: "radio_button_checked" },
      { kind: "switch", key: "error", label: "Error", icon: "error" },
      { kind: "switch", key: "disabled", label: "Disabled", icon: "block" },
      { kind: "text", key: "label", label: "Label", icon: "edit" },
    ],
    render: (v, set) => {
      const label = pgStr(v.label, "").trim();
      return (
        <Radio
          checked={v.checked === true}
          onChange={() => set("checked", true)}
          label={label || undefined}
          disabled={v.disabled === true}
          error={v.error === true}
        />
      );
    },
    code: (v) => {
      const props: string[] = [];
      if (v.checked === true) props.push("checked");
      props.push("onChange={handleSelect}");
      if (v.disabled === true) props.push("disabled");
      if (v.error === true) props.push("error");
      const label = pgStr(v.label, "").trim();
      if (label) props.push(`label="${label}"`);
      return joinCode("Radio", props);
    },
  },

  /* ---------------------------------------------------------------- */
  "text-field": {
    id: "text-field",
    component: "TextField",
    explainer:
      "Outlined or filled container with the floating label — Error recolors the border, label, helper line and trailing icon.",
    defaults: { variant: "outlined", error: false, leadingIcon: false, label: "Username", helperText: "Letters, numbers and underscores" },
    controls: [
      {
        kind: "segmented",
        key: "variant",
        label: "Variant",
        icon: "category",
        options: sizeOptions(["outlined", "filled"]),
      },
      { kind: "switch", key: "error", label: "Error", icon: "error" },
      { kind: "switch", key: "leadingIcon", label: "Input icon", icon: "search" },
      { kind: "text", key: "label", label: "Label", icon: "edit" },
      {
        kind: "text",
        key: "helperText",
        label: "Helper text",
        icon: "info",
        disabledWhen: (v) => v.error === true,
      },
    ],
    render: (v) => (
      <div className="w-[280px]">
        <TextField
          variant={pgStr(v.variant, "outlined") as TextFieldVariant}
          label={pgStr(v.label, "").trim() || undefined}
          helperText={pgStr(v.helperText, "").trim() || undefined}
          error={v.error === true}
          leadingIcon={v.leadingIcon === true ? "search" : undefined}
        />
      </div>
    ),
    code: (v) => {
      const props: string[] = [];
      if (v.variant !== "outlined") props.push(`variant="${pgStr(v.variant, "outlined")}"`);
      if (v.error === true) props.push("error");
      if (v.leadingIcon === true) props.push('leadingIcon="search"');
      const label = pgStr(v.label, "").trim();
      if (label) props.push(`label="${label}"`);
      const helperText = pgStr(v.helperText, "").trim();
      if (helperText) props.push(`helperText="${helperText}"`);
      return joinCode("TextField", props);
    },
  },

  /* ---------------------------------------------------------------- */
  "linear-progress": {
    id: "linear-progress",
    component: "LinearProgress",
    explainer:
      "Indeterminate sweep or a determinate bar with the trailing stop dot — Wavey switches to the Expressive wavy line.",
    defaults: { mode: "indeterminate", value: 60, wavey: false, color: "primary", label: "" },
    controls: [
      {
        kind: "segmented",
        key: "mode",
        label: "Mode",
        icon: "autorenew",
        options: sizeOptions(["indeterminate", "determinate"]),
      },
      {
        kind: "slider",
        key: "value",
        label: "Value",
        icon: "linear_scale",
        min: 0,
        max: 100,
        step: 1,
        disabledWhen: (v) => v.mode !== "determinate",
      },
      { kind: "switch", key: "wavey", label: "Wavey (M3E)", icon: "waves" },
      {
        kind: "segmented",
        key: "color",
        label: "Color",
        icon: "palette",
        options: sizeOptions(["primary", "secondary", "tertiary", "error"]),
      },
      { kind: "text", key: "label", label: "Label", icon: "edit" },
    ],
    stageKey: (v) => pgStr(v.mode, "indeterminate"),
    render: (v) => {
      const label = pgStr(v.label, "").trim();
      return (
        <div className="w-[320px]">
          <LinearProgress
            value={v.mode === "determinate" ? pgNum(v.value, 60) : undefined}
            wavey={v.wavey === true}
            color={pgStr(v.color, "primary") as LinearProgressColor}
            label={label || undefined}
            fullWidth
          />
        </div>
      );
    },
    code: (v) => {
      const props: string[] = [];
      if (v.mode === "determinate") props.push(`value={${pgNum(v.value, 60)}}`);
      if (v.wavey === true) props.push("wavey");
      if (v.color !== "primary") props.push(`color="${pgStr(v.color, "primary")}"`);
      const label = pgStr(v.label, "").trim();
      if (label) props.push(`label="${label}"`);
      return joinCode("LinearProgress", props);
    },
  },

  /* ---------------------------------------------------------------- */
  "loading-indicator": {
    id: "loading-indicator",
    component: "LoadingIndicator",
    explainer:
      "The signature M3E shape-morphing loader — turning Animate off rests it at a 38%-opacity circle (the reduced-motion fallback).",
    defaults: { size: 48, active: true, color: "primary" },
    controls: [
      { kind: "slider", key: "size", label: "Size", icon: "photo_size_select_large", min: 24, max: 96, step: 8 },
      { kind: "switch", key: "active", label: "Animate", icon: "animation" },
      {
        kind: "segmented",
        key: "color",
        label: "Color",
        icon: "palette",
        options: sizeOptions(["primary", "secondary", "tertiary", "error"]),
      },
    ],
    render: (v) => (
      <LoadingIndicator
        size={pgNum(v.size, 48)}
        active={v.active !== false}
        color={pgStr(v.color, "primary") as LoadingIndicatorColor}
      />
    ),
    code: (v) => {
      const props: string[] = [];
      const size = pgNum(v.size, 48);
      if (size !== 48) props.push(`size={${size}}`);
      if (v.active === false) props.push("active={false}");
      if (v.color !== "primary") props.push(`color="${pgStr(v.color, "primary")}"`);
      return joinCode("LoadingIndicator", props);
    },
  },

  /* ---------------------------------------------------------------- */
  tooltip: {
    id: "tooltip",
    component: "Tooltip",
    explainer:
      "Hover or focus the trigger (500ms show delay) — Rich swaps the plain label for a titled card with an action.",
    defaults: { rich: false, title: "Archived", actionLabel: "Undo", placement: "top", content: "Adds to your archived list" },
    controls: [
      { kind: "switch", key: "rich", label: "Rich", icon: "article" },
      {
        kind: "text",
        key: "title",
        label: "Title",
        icon: "title",
        disabledWhen: (v) => v.rich !== true,
      },
      {
        kind: "text",
        key: "actionLabel",
        label: "Action label",
        icon: "touch_app",
        disabledWhen: (v) => v.rich !== true,
      },
      {
        kind: "segmented",
        key: "placement",
        label: "Placement",
        icon: "swap_vert",
        options: sizeOptions(["top", "bottom"]),
      },
      { kind: "text", key: "content", label: "Content", icon: "edit" },
    ],
    stageKey: (v) => (v.rich === true ? "rich" : "plain"),
    render: (v) => {
      const rich = v.rich === true;
      const title = pgStr(v.title, "").trim();
      const actionLabel = pgStr(v.actionLabel, "").trim();
      return (
        <Tooltip
          rich={rich}
          title={rich && title ? title : undefined}
          actionLabel={rich && actionLabel ? actionLabel : undefined}
          placement={pgStr(v.placement, "top") as "top" | "bottom"}
          content={pgStr(v.content, "").trim() || "Adds to your archived list"}
        >
          <Button variant="outlined" size="sm">
            Hover me
          </Button>
        </Tooltip>
      );
    },
    code: (v) => {
      const rich = v.rich === true;
      const props: string[] = [];
      if (rich) props.push("rich");
      const title = pgStr(v.title, "").trim();
      if (rich && title) props.push(`title="${title}"`);
      const actionLabel = pgStr(v.actionLabel, "").trim();
      if (rich && actionLabel) props.push(`actionLabel="${actionLabel}"`);
      if (v.placement !== "top") props.push(`placement="${pgStr(v.placement, "top")}"`);
      props.push(`content="${pgStr(v.content, "").trim() || "Adds to your archived list"}"`);
      const open = `<Tooltip${props.length ? " " + props.join(" ") : ""}>`;
      return `import { Tooltip, Button } from "m3-expressive-react";\n\n${open}\n  <Button variant="outlined" size="sm">Hover me</Button>\n</Tooltip>`;
    },
  },

  /* ---------------------------------------------------------------- */
  card: {
    id: "card",
    component: "Card",
    explainer:
      "Elevated / filled / outlined surfaces at the M3 medium or M3E extra-large shape — Clickable adds press morph, state layer and ripple.",
    defaults: { variant: "elevated", shape: "medium", interactive: false },
    controls: [
      {
        kind: "segmented",
        key: "variant",
        label: "Variant",
        icon: "category",
        options: sizeOptions(["elevated", "filled", "outlined"]),
      },
      {
        kind: "segmented",
        key: "shape",
        label: "Shape",
        icon: "rounded_corner",
        options: [
          { value: "medium", label: "Medium" },
          { value: "extraLarge", label: "Extra large" },
        ],
      },
      { kind: "switch", key: "interactive", label: "Clickable", icon: "ads_click" },
    ],
    render: (v) => {
      const interactive = v.interactive === true;
      return (
        <Card
          variant={pgStr(v.variant, "elevated") as CardVariant}
          shape={pgStr(v.shape, "medium") as CardShape}
          interactive={interactive}
          onClick={interactive ? () => undefined : undefined}
        >
          <div className="flex h-[160px] w-[280px] flex-col gap-1 p-5">
            <MaterialSymbol icon="image" size={28} />
            <div className="md-title-medium text-m3-on-surface">Headline</div>
            <div className="md-body-medium text-m3-on-surface-variant">
              {interactive ? "Click me" : "Supporting text"}
            </div>
          </div>
        </Card>
      );
    },
    code: (v) => {
      const interactive = v.interactive === true;
      const props: string[] = [];
      if (v.variant !== "elevated") props.push(`variant="${pgStr(v.variant, "elevated")}"`);
      if (v.shape !== "medium") props.push(`shape="${pgStr(v.shape, "medium")}"`);
      if (interactive) props.push("onClick={handleClick}");
      const open = `<Card${props.length ? " " + props.join(" ") : ""}>`;
      const supporting = interactive ? "Click me" : "Supporting text";
      return `import { Card, MaterialSymbol } from "m3-expressive-react";\n\n${open}\n  <MaterialSymbol icon="image" size={28} />\n  <div className="md-title-medium">Headline</div>\n  <div className="md-body-medium">${supporting}</div>\n</Card>`;
    },
  },

  /* ---------------------------------------------------------------- */
  snackbar: {
    id: "snackbar",
    component: "Snackbar",
    explainer:
      "Trigger-driven feedback — Show snackbar opens it near the stage center; it auto-dismisses, closes via the ✕ or swipes away.",
    defaults: { open: false, actionLabel: true, message: "Archived" },
    controls: [
      { kind: "switch", key: "actionLabel", label: "Show action", icon: "touch_app" },
      { kind: "text", key: "message", label: "Message", icon: "edit" },
    ],
    render: (v, set) => (
      <div className="relative flex items-center justify-center">
        <Button icon="notifications" onClick={() => set("open", true)}>
          Show snackbar
        </Button>
        <Snackbar
          open={v.open === true}
          message={pgStr(v.message, "").trim() || "Archived"}
          actionLabel={v.actionLabel === true ? "Undo" : undefined}
          onClose={() => set("open", false)}
          className="bottom-24 left-1/2 -translate-x-1/2"
        />
      </div>
    ),
    code: (v) => {
      const props: string[] = ["open={open}", `message="${pgStr(v.message, "").trim() || "Archived"}"`];
      if (v.actionLabel === true) props.push('actionLabel="Undo"');
      props.push("onClose={handleClose}");
      return joinCode("Snackbar", props);
    },
  },

  /* ---------------------------------------------------------------- */
  menu: {
    id: "menu",
    component: "Menu",
    explainer:
      "Trigger-attached list — Options drops the elevation-2 sheet under the button; Esc or an outside click closes it.",
    defaults: { open: false, placement: "bottom-start", icons: true, shortcuts: true, destructive: true, disabled: false },
    controls: [
      {
        kind: "segmented",
        key: "placement",
        label: "Placement",
        icon: "swap_horiz",
        options: sizeOptions(["bottom-start", "bottom-end"]),
      },
      { kind: "switch", key: "icons", label: "Leading icons", icon: "image" },
      { kind: "switch", key: "shortcuts", label: "Shortcuts", icon: "keyboard_command_key" },
      { kind: "switch", key: "destructive", label: "Destructive item", icon: "delete" },
      { kind: "switch", key: "disabled", label: "Disabled item", icon: "block" },
    ],
    render: (v, set) => {
      const icons = v.icons === true;
      const shortcuts = v.shortcuts === true;
      const items: { label: string; icon?: string; shortcut?: string; destructive?: boolean; disabled?: boolean }[] = [
        { label: "Edit", icon: icons ? "edit" : undefined, shortcut: shortcuts ? "⌘E" : undefined },
        { label: "Duplicate", icon: icons ? "content_copy" : undefined, shortcut: shortcuts ? "⌘D" : undefined },
      ];
      if (v.destructive === true) items.push({ label: "Delete", icon: icons ? "delete" : undefined, destructive: true });
      if (v.disabled === true) items.push({ label: "Archive", icon: icons ? "archive" : undefined, disabled: true });
      return (
        <div className="relative flex items-center justify-center">
          <Menu
            trigger={
              <Button variant="outlined" size="sm" icon="more_vert">
                Options
              </Button>
            }
            items={items}
            open={v.open === true}
            onOpenChange={(o) => set("open", o)}
            placement={pgStr(v.placement, "bottom-start") as MenuPlacement}
          />
        </div>
      );
    },
    code: (v) => {
      const icons = v.icons === true;
      const shortcuts = v.shortcuts === true;
      const rows: string[] = [
        `  { label: "Edit"${icons ? ', icon: "edit"' : ""}${shortcuts ? ', shortcut: "⌘E"' : ""} },`,
        `  { label: "Duplicate"${icons ? ', icon: "content_copy"' : ""}${shortcuts ? ', shortcut: "⌘D"' : ""} },`,
      ];
      if (v.destructive === true) {
        rows.push('  { type: "divider" },');
        rows.push(`  { label: "Delete"${icons ? ', icon: "delete"' : ""}, destructive: true },`);
      }
      if (v.disabled === true) {
        rows.push(`  { label: "Archive"${icons ? ', icon: "archive"' : ""}, disabled: true },`);
      }
      const props: string[] = [
        "trigger={<Button variant=\"outlined\" size=\"sm\">Options</Button>}",
        "items={items}",
      ];
      if (v.placement !== "bottom-start") props.push(`placement="${pgStr(v.placement, "bottom-start")}"`);
      const open = `<Menu${props.length ? " " + props.join(" ") : ""} />`;
      return `import { Menu, Button } from "m3-expressive-react";\n\nconst items = [\n${rows.join("\n")}\n];\n\n${open}`;
    },
  },

  /* ---------------------------------------------------------------- */
  dialog: {
    id: "dialog",
    component: "Dialog",
    explainer:
      "Modal scrim + centered card — Fullscreen swaps the centered card for a full-viewport sheet; scrim taps close unless you turn Scrim dismiss off.",
    defaults: { open: false, fullscreen: false, icon: true, dismissible: true, headline: "Reset settings?" },
    controls: [
      { kind: "switch", key: "fullscreen", label: "Fullscreen", icon: "fullscreen" },
      { kind: "switch", key: "icon", label: "Header icon", icon: "restart_alt" },
      { kind: "switch", key: "dismissible", label: "Scrim dismiss", icon: "touch_app" },
      { kind: "text", key: "headline", label: "Headline", icon: "title" },
    ],
    render: (v, set) => {
      const close = () => set("open", false);
      return (
        <div className="relative flex items-center justify-center">
          <Button icon="settings_backup_restore" onClick={() => set("open", true)}>
            Open dialog
          </Button>
          <Dialog
            open={v.open === true}
            onClose={close}
            fullscreen={v.fullscreen === true}
            icon={v.icon === true ? "restart_alt" : undefined}
            headline={pgStr(v.headline, "").trim() || "Reset settings?"}
            dismissible={v.dismissible !== false}
            actions={
              <>
                <Button variant="text" onClick={close}>
                  Cancel
                </Button>
                <Button variant="text" onClick={close}>
                  Reset
                </Button>
              </>
            }
          >
            This will reset all app settings to their defaults. Your files won&apos;t be affected.
          </Dialog>
        </div>
      );
    },
    code: (v) => {
      const props: string[] = ["open={open}", "onClose={handleClose}"];
      if (v.fullscreen === true) props.push("fullscreen");
      if (v.icon === true) props.push('icon="restart_alt"');
      props.push(`headline="${pgStr(v.headline, "").trim() || "Reset settings?"}"`);
      if (v.dismissible === false) props.push("dismissible={false}");
      const open = `<Dialog${props.length ? " " + props.join(" ") : ""}>`;
      return `import { Dialog, Button } from "m3-expressive-react";\n\n${open}\n  This will reset all app settings to their defaults.\n  <>\n    <Button variant="text" onClick={handleClose}>Cancel</Button>\n    <Button variant="text" onClick={handleReset}>Reset</Button>\n  </>\n</Dialog>`;
    },
  },

  /* ---------------------------------------------------------------- */
  banner: {
    id: "banner",
    component: "Banner",
    explainer:
      "Inline system notice — toggling Open collapses the container through AnimatePresence; actions sit at the trailing edge.",
    defaults: { open: true, icon: true, actions: true, fullWidth: false, text: "You're offline — messages will send once you reconnect" },
    controls: [
      { kind: "switch", key: "open", label: "Open", icon: "visibility" },
      { kind: "switch", key: "icon", label: "Leading icon", icon: "wifi_off" },
      { kind: "switch", key: "actions", label: "Action buttons", icon: "touch_app" },
      { kind: "switch", key: "fullWidth", label: "Full width", icon: "resize_width" },
      { kind: "text", key: "text", label: "Text", icon: "edit" },
    ],
    stageKey: (v) => (v.open === true ? "open" : "closed"),
    render: (v, set) => (
      <div className="w-[420px] max-w-full">
        <Banner
          open={v.open !== false}
          icon={v.icon === true ? "wifi_off" : undefined}
          text={pgStr(v.text, "").trim() || "You're offline — messages will send once you reconnect"}
          fullWidth={v.fullWidth === true}
          actions={
            v.actions === true
              ? [
                  { label: "Retry", onClick: () => undefined },
                  { label: "Dismiss", onClick: () => set("open", false) },
                ]
              : undefined
          }
        />
      </div>
    ),
    code: (v) => {
      const props: string[] = ["open={open}"];
      if (v.icon === true) props.push('icon="wifi_off"');
      props.push(`text="${pgStr(v.text, "").trim() || "You're offline — messages will send once you reconnect"}"`);
      if (v.fullWidth === true) props.push("fullWidth");
      const open = `<Banner${props.length ? " " + props.join(" ") : ""}`;
      if (v.actions === true) {
        return `import { Banner } from "m3-expressive-react";\n\n${open}\n  actions={[\n    { label: "Retry", onClick: handleRetry },\n    { label: "Dismiss", onClick: handleClose },\n  ]}\n/>`;
      }
      return `${open} />`;
    },
  },

  /* ---------------------------------------------------------------- */
  "search-bar": {
    id: "search-bar",
    component: "SearchBar",
    explainer:
      "Type live on the stage — the pill grows at lg and the trailing icons complete the M3 search experience; Enter fires onSubmit.",
    defaults: { value: "", size: "md", trailing: true, disabled: false, placeholder: "Search photos" },
    controls: [
      {
        kind: "segmented",
        key: "size",
        label: "Size",
        icon: "straighten",
        options: sizeOptions(["sm", "md", "lg"]),
      },
      { kind: "switch", key: "trailing", label: "Trailing icons", icon: "mic" },
      { kind: "switch", key: "disabled", label: "Disabled", icon: "block" },
      { kind: "text", key: "placeholder", label: "Placeholder", icon: "edit" },
    ],
    render: (v, set) => (
      <div className="w-[360px] max-w-full">
        <SearchBar
          value={pgStr(v.value, "")}
          onChange={(e) => set("value", e.target.value)}
          placeholder={pgStr(v.placeholder, "").trim() || "Search photos"}
          size={pgStr(v.size, "md") as SearchBarSize}
          trailingIcons={v.trailing === true ? ["mic", "image"] : []}
          disabled={v.disabled === true}
          fullWidth
        />
      </div>
    ),
    code: (v) => {
      const props: string[] = ["value={query}", "onChange={(e) => setQuery(e.target.value)}"];
      const placeholder = pgStr(v.placeholder, "").trim() || "Search photos";
      if (placeholder) props.push(`placeholder="${placeholder}"`);
      if (v.size !== "md") props.push(`size="${pgStr(v.size, "md")}"`);
      if (v.trailing === true) props.push('trailingIcons={["mic", "image"]}');
      if (v.disabled === true) props.push("disabled");
      return joinCode("SearchBar", props);
    },
  },

  /* ---------------------------------------------------------------- */
  autocomplete: {
    id: "autocomplete",
    component: "Autocomplete",
    explainer:
      "Type-ahead text field — suggestions filter as you type and fill the input on click; selection lands back in the control.",
    defaults: { value: "", label: "Fruit", disabled: false },
    controls: [
      { kind: "text", key: "label", label: "Label", icon: "edit" },
      { kind: "switch", key: "disabled", label: "Disabled", icon: "block" },
    ],
    render: (v, set) => (
      <div className="w-[280px] max-w-full">
        <Autocomplete
          options={["Apple", "Banana", "Cherry", "Durian", "Elderberry", "Fig", "Guava"]}
          value={pgStr(v.value, "")}
          onChange={(x) => set("value", x)}
          label={pgStr(v.label, "").trim() || undefined}
          placeholder="Type a fruit…"
          disabled={v.disabled === true}
        />
      </div>
    ),
    code: (v) => {
      const props: string[] = ["options={fruits}", "value={value}", "onChange={setValue}"];
      const label = pgStr(v.label, "").trim();
      if (label) props.push(`label="${label}"`);
      props.push('placeholder="Type a fruit…"');
      if (v.disabled === true) props.push("disabled");
      const open = `<Autocomplete${props.length ? " " + props.join(" ") : ""} />`;
      return `import { Autocomplete } from "m3-expressive-react";\n\nconst fruits = ["Apple", "Banana", "Cherry", "Durian", "Elderberry", "Fig", "Guava"];\n\n${open}`;
    },
  },

  /* ---------------------------------------------------------------- */
  tabs: {
    id: "tabs",
    component: "Tabs",
    explainer:
      "Primary or secondary navigation — the active indicator springs under the selected tab; Secondary drops to the compact 64dp row.",
    defaults: { variant: "primary", value: "chats", badges: false, fullWidth: false },
    controls: [
      {
        kind: "segmented",
        key: "variant",
        label: "Variant",
        icon: "category",
        options: sizeOptions(["primary", "secondary"]),
      },
      { kind: "switch", key: "badges", label: "Badges", icon: "mark_chat_unread" },
      { kind: "switch", key: "fullWidth", label: "Full width", icon: "resize_width" },
    ],
    stageKey: (v) => pgStr(v.variant, "primary"),
    render: (v, set) => (
      <div className="w-[420px] max-w-full">
        <Tabs
          items={[
            { value: "home", icon: "home", label: "Home" },
            { value: "chats", icon: "chat", label: "Chats", badge: v.badges === true ? 3 : undefined },
            { value: "calls", icon: "call", label: "Calls" },
          ]}
          value={pgStr(v.value, "chats")}
          onChange={(x) => set("value", x)}
          variant={pgStr(v.variant, "primary") as "primary" | "secondary"}
          fullWidth={v.fullWidth === true}
        />
      </div>
    ),
    code: (v) => {
      const rows = [
        '  { value: "home", icon: "home", label: "Home" },',
        `  { value: "chats", icon: "chat", label: "Chats"${v.badges === true ? ", badge: 3" : ""} },`,
        '  { value: "calls", icon: "call", label: "Calls" },',
      ];
      const props: string[] = ["items={items}", "value={value}", "onChange={setValue}"];
      if (v.variant !== "primary") props.push(`variant="${pgStr(v.variant, "primary")}"`);
      if (v.fullWidth === true) props.push("fullWidth");
      const open = `<Tabs${props.length ? " " + props.join(" ") : ""} />`;
      return `import { Tabs } from "m3-expressive-react";\n\nconst items = [\n${rows.join("\n")}\n];\n\n${open}`;
    },
  },

  /* ---------------------------------------------------------------- */
  "segmented-button": {
    id: "segmented-button",
    component: "SegmentedButton",
    explainer:
      "Connected choice set — Single picks one segment; Multiple toggles independent checkmarks with the M3E press morph.",
    defaults: { type: "single", size: "sm", icons: true, sel: "day" },
    controls: [
      {
        kind: "segmented",
        key: "type",
        label: "Type",
        icon: "category",
        options: sizeOptions(["single", "multiple"]),
      },
      {
        kind: "segmented",
        key: "size",
        label: "Size",
        icon: "straighten",
        options: sizeOptions(["sm", "md"]),
      },
      { kind: "switch", key: "icons", label: "Segment icons", icon: "calendar_view_day" },
    ],
    stageKey: (v) => `${pgStr(v.type, "single")}-${pgStr(v.size, "sm")}`,
    render: (v, set) => {
      const multiple = v.type === "multiple";
      const selStr = pgStr(v.sel, "day");
      const icon = v.icons === true;
      return (
        <SegmentedButton
          type={multiple ? "multiple" : "single"}
          size={pgStr(v.size, "sm") as SegmentedButtonSize}
          options={[
            { value: "day", label: "Day", icon: icon ? "calendar_view_day" : undefined },
            { value: "week", label: "Week", icon: icon ? "calendar_view_week" : undefined },
            { value: "month", label: "Month", icon: icon ? "calendar_view_month" : undefined },
          ]}
          value={multiple ? selStr.split(",").filter(Boolean) : selStr}
          onValueChange={(next) => set("sel", Array.isArray(next) ? next.join(",") : next)}
        />
      );
    },
    code: (v) => {
      const icon = v.icons === true;
      const rows = [
        `  { value: "day", label: "Day"${icon ? ', icon: "calendar_view_day"' : ""} },`,
        `  { value: "week", label: "Week"${icon ? ', icon: "calendar_view_week"' : ""} },`,
        `  { value: "month", label: "Month"${icon ? ', icon: "calendar_view_month"' : ""} },`,
      ];
      const props: string[] = [];
      if (v.type === "multiple") props.push('type="multiple"');
      props.push("options={options}", "value={selected}", "onValueChange={setSelected}");
      if (v.size !== "sm") props.push(`size="${pgStr(v.size, "sm")}"`);
      const open = `<SegmentedButton${props.length ? " " + props.join(" ") : ""} />`;
      return `import { SegmentedButton } from "m3-expressive-react";\n\nconst options = [\n${rows.join("\n")}\n];\n\n${open}`;
    },
  },

  /* ---------------------------------------------------------------- */
  "button-group": {
    id: "button-group",
    component: "ButtonGroup",
    explainer:
      "Merged adjacent buttons — selection modes highlight pressed items and the tonal or filled variants recolor the whole set.",
    defaults: { variant: "outlined", selection: "single", size: "md", icons: false, sel: "bold" },
    controls: [
      {
        kind: "segmented",
        key: "variant",
        label: "Variant",
        icon: "category",
        options: sizeOptions(["outlined", "filled", "tonal"]),
      },
      {
        kind: "segmented",
        key: "selection",
        label: "Selection",
        icon: "radio_button_checked",
        options: sizeOptions(["none", "single", "multiple"]),
      },
      {
        kind: "segmented",
        key: "size",
        label: "Size",
        icon: "straighten",
        options: sizeOptions(["sm", "md", "lg"]),
      },
      { kind: "switch", key: "icons", label: "Button icons", icon: "format_bold" },
    ],
    stageKey: (v) => `${pgStr(v.selection, "single")}-${pgStr(v.size, "md")}`,
    render: (v, set) => {
      const selection = pgStr(v.selection, "single") as ButtonGroupSelection;
      const icon = v.icons === true;
      return (
        <ButtonGroup
          buttons={[
            { id: "bold", label: "Bold", icon: icon ? "format_bold" : undefined },
            { id: "italic", label: "Italic", icon: icon ? "format_italic" : undefined },
            { id: "underline", label: "Underline", icon: icon ? "format_underlined" : undefined },
          ]}
          variant={pgStr(v.variant, "outlined") as ButtonGroupVariant}
          selection={selection}
          value={selection === "none" ? undefined : pgStr(v.sel, "bold").split(",").filter(Boolean)}
          onValueChange={(next) => set("sel", next.join(","))}
          size={pgStr(v.size, "md") as ButtonGroupSize}
        />
      );
    },
    code: (v) => {
      const icon = v.icons === true;
      const rows = [
        `  { id: "bold", label: "Bold"${icon ? ', icon: "format_bold"' : ""} },`,
        `  { id: "italic", label: "Italic"${icon ? ', icon: "format_italic"' : ""} },`,
        `  { id: "underline", label: "Underline"${icon ? ', icon: "format_underlined"' : ""} },`,
      ];
      const props: string[] = ["buttons={buttons}"];
      if (v.variant !== "outlined") props.push(`variant="${pgStr(v.variant, "outlined")}"`);
      if (v.selection !== "none") props.push(`selection="${pgStr(v.selection, "single")}"`, "value={selected}", "onValueChange={setSelected}");
      if (v.size !== "md") props.push(`size="${pgStr(v.size, "md")}"`);
      const open = `<ButtonGroup${props.length ? " " + props.join(" ") : ""} />`;
      return `import { ButtonGroup } from "m3-expressive-react";\n\nconst buttons = [\n${rows.join("\n")}\n];\n\n${open}`;
    },
  },

  /* ---------------------------------------------------------------- */
  list: {
    id: "list",
    component: "List",
    explainer:
      "M3 list rows at 56/72/88dp — supporting text grows rows to two lines; dividers, leading icons and trailing affordances complete the anatomy.",
    defaults: { dividers: false, supporting: true, icons: true, trailing: true },
    controls: [
      { kind: "switch", key: "dividers", label: "Dividers", icon: "border_horizontal" },
      { kind: "switch", key: "supporting", label: "Supporting text", icon: "subject" },
      { kind: "switch", key: "icons", label: "Leading icons", icon: "image" },
      { kind: "switch", key: "trailing", label: "Trailing icons", icon: "chevron_right" },
    ],
    render: (v) => {
      const supporting = v.supporting === true;
      const leading = v.icons === true;
      const trailingIcon = v.trailing === true ? "chevron_right" : undefined;
      return (
        <div className="w-[360px] max-w-full">
          <List dividers={v.dividers === true}>
            <ListItem
              headline="Inbox"
              supporting={supporting ? "Unread messages" : undefined}
              leading={leading ? <MaterialSymbol icon="inbox" /> : undefined}
              trailingIcon={trailingIcon}
              selected
              onClick={() => undefined}
            />
            <ListItem
              headline="Sent"
              supporting={supporting ? "Messages you've sent" : undefined}
              leading={leading ? <MaterialSymbol icon="send" /> : undefined}
              trailingIcon={trailingIcon}
              onClick={() => undefined}
            />
            <ListItem
              headline="Drafts"
              supporting={supporting ? "Unfinished drafts" : undefined}
              leading={leading ? <MaterialSymbol icon="draft" /> : undefined}
              trailingIcon={trailingIcon}
              onClick={() => undefined}
            />
          </List>
        </div>
      );
    },
    code: (v) => {
      const supporting = v.supporting === true;
      const leading = v.icons === true;
      const trailingIcon = v.trailing === true ? '\n    trailingIcon="chevron_right"' : "";
      const row = (headline: string, icon: string, sup: string, selected: boolean): string => {
        const props = [
          `headline="${headline}"`,
          supporting ? `supporting="${sup}"` : "",
          leading ? `leading={<MaterialSymbol icon="${icon}" />}` : "",
          trailingIcon,
          selected ? "\n    selected" : "",
          "\n    onClick={handleClick}",
        ].filter(Boolean);
        return `  <ListItem\n    ${props.map((p) => p.replace(/^\n\s+/, "")).join("\n    ")}\n  />`;
      };
      const rows = [row("Inbox", "inbox", "Unread messages", true), row("Sent", "send", "Messages you've sent", false), row("Drafts", "draft", "Unfinished drafts", false)];
      const open = `<List${v.dividers === true ? " dividers" : ""}>`;
      return `import { List, ListItem, MaterialSymbol } from "m3-expressive-react";\n\n${open}\n${rows.join("\n")}\n</List>`;
    },
  },

  /* ---------------------------------------------------------------- */
  toolbar: {
    id: "toolbar",
    component: "Toolbar",
    explainer:
      "Floating icon rail — Floating pins the pill to a positioned edge; Dockable morphs square and full-bleed the moment Docked is on.",
    defaults: { variant: "floating", color: "surface", docked: false, position: "bottom", width: 280 },
    controls: [
      {
        kind: "segmented",
        key: "variant",
        label: "Variant",
        icon: "category",
        options: sizeOptions(["floating", "dockable"]),
      },
      {
        kind: "segmented",
        key: "color",
        label: "Color",
        icon: "palette",
        options: sizeOptions(["surface", "primary", "secondary", "tertiary"]),
      },
      {
        kind: "segmented",
        key: "position",
        label: "Position",
        icon: "swap_vert",
        options: sizeOptions(["top", "bottom"]),
        disabledWhen: (v) => v.variant !== "floating",
      },
      {
        kind: "switch",
        key: "docked",
        label: "Docked",
        icon: "dock_to_bottom",
        disabledWhen: (v) => v.variant !== "dockable",
      },
      {
        kind: "slider",
        key: "width",
        label: "Width",
        icon: "straighten",
        min: 200,
        max: 300,
        step: 10,
        disabledWhen: (v) => v.docked === true,
      },
    ],
    stageKey: (v) => `${pgStr(v.variant, "floating")}-${pgStr(v.position, "bottom")}`,
    render: (v) => {
      const icons = [
        { icon: "format_bold", label: "Bold", active: true },
        { icon: "format_italic", label: "Italic" },
        { icon: "format_underlined", label: "Underline" },
        { icon: "more_horiz", label: "More" },
      ];
      const color = pgStr(v.color, "surface") as ToolbarColor;
      const width = pgNum(v.width, 280);
      if (v.variant === "dockable") {
        return (
          <div className="w-[320px] max-w-full">
            <Toolbar icons={icons} variant="dockable" color={color} docked={v.docked === true} width={width} />
          </div>
        );
      }
      return (
        <div className="relative h-[220px] w-[320px] max-w-full overflow-hidden rounded-m3-lg border border-m3-outline-variant">
          <Toolbar icons={icons} color={color} position={pgStr(v.position, "bottom") as "top" | "bottom"} width={width} />
        </div>
      );
    },
    code: (v) => {
      const rows = [
        '  { icon: "format_bold", label: "Bold", active: true },',
        '  { icon: "format_italic", label: "Italic" },',
        '  { icon: "format_underlined", label: "Underline" },',
        '  { icon: "more_horiz", label: "More" },',
      ];
      const props: string[] = ["icons={icons}"];
      if (v.variant === "dockable") props.push('variant="dockable"');
      if (v.color !== "surface") props.push(`color="${pgStr(v.color, "surface")}"`);
      if (v.variant === "dockable" && v.docked === true) props.push("docked");
      if (v.variant === "floating" && v.position === "top") props.push('position="top"');
      const width = pgNum(v.width, 280);
      if (width !== 280 && v.docked !== true) props.push(`width={${width}}`);
      const open = `<Toolbar${props.length ? " " + props.join(" ") : ""} />`;
      return `import { Toolbar } from "m3-expressive-react";\n\nconst icons = [\n${rows.join("\n")}\n];\n\n${open}`;
    },
  },

  /* ---------------------------------------------------------------- */
  "date-picker": {
    id: "date-picker",
    component: "DatePicker",
    explainer:
      "Pick live on the calendar — Range switches to the start/end band selection; Modal presents the official scrim dialog that only closes on a complete range.",
    defaults: { presentation: "inline", mode: "single", open: false, closeOnSelect: true, value: "", start: "", end: "" },
    controls: [
      {
        kind: "segmented",
        key: "presentation",
        label: "Presentation",
        icon: "web_asset",
        options: sizeOptions(["inline", "modal"]),
      },
      {
        kind: "segmented",
        key: "mode",
        label: "Selection mode",
        icon: "date_range",
        options: sizeOptions(["single", "range"]),
      },
      {
        kind: "switch",
        key: "closeOnSelect",
        label: "Close on pick",
        icon: "logout",
        disabledWhen: (v) => v.presentation !== "modal",
      },
    ],
    stageKey: (v) => `${pgStr(v.presentation, "inline")}-${pgStr(v.mode, "single")}`,
    render: (v, set) => {
      const modal = v.presentation === "modal";
      const range = v.mode === "range";
      const picked =
        v.value !== "" ? PG_MONTHS_SHORT[pgIso(v.value)!.getMonth()] + " " + pgIso(v.value)!.getDate() : "";
      const pair =
        v.start !== "" && v.end !== ""
          ? `${PG_MONTHS_SHORT[pgIso(v.start)!.getMonth()]} ${pgIso(v.start)!.getDate()} – ${PG_MONTHS_SHORT[pgIso(v.end)!.getMonth()]} ${pgIso(v.end)!.getDate()}`
          : v.start !== ""
            ? `${PG_MONTHS_SHORT[pgIso(v.start)!.getMonth()]} ${pgIso(v.start)!.getDate()} – …`
            : "";
      const readout = range ? pair : picked;
      return (
        <div className="flex flex-col items-center gap-4">
          {modal && (
            <Button
              icon="calendar_today"
              onClick={() => set("open", true)}
              variant={readout ? "tonal" : "filled"}
            >
              {readout || "Pick a date"}
            </Button>
          )}
          {readout && !modal && (
            <div className="rounded-[16px] bg-m3-secondary-container px-4 py-2 md-title-medium text-m3-on-secondary-container tabular-nums">
              {readout}
            </div>
          )}
          <DatePicker
            presentation={modal ? "modal" : "inline"}
            selectionMode={range ? "range" : "single"}
            open={v.open === true}
            onOpenChange={(o) => set("open", o)}
            closeOnSelect={v.closeOnSelect !== false}
            value={range ? undefined : (pgIso(v.value) ?? undefined)}
            onChange={(d) => set("value", pgIsoStr(d))}
            range={range ? { start: pgIso(v.start) ?? undefined, end: pgIso(v.end) ?? undefined } : undefined}
            onRangeChange={(r) => {
              set("start", r.start ? pgIsoStr(r.start) : "");
              set("end", r.end ? pgIsoStr(r.end) : "");
            }}
          />
        </div>
      );
    },
    code: (v) => {
      const props: string[] = [];
      if (v.presentation === "modal") {
        props.push('presentation="modal"', "open={open}", "onOpenChange={setOpen}");
        if (v.closeOnSelect === false) props.push("closeOnSelect={false}");
      }
      if (v.mode === "range") {
        props.push('selectionMode="range"', "range={range}", "onRangeChange={setRange}");
      } else {
        props.push("value={value}", "onChange={setValue}");
      }
      return joinCode("DatePicker", props);
    },
  },

  /* ---------------------------------------------------------------- */
  "time-picker": {
    id: "time-picker",
    component: "TimePicker",
    explainer:
      "Drag or tap the clock dial — 24h swaps to the official double-ring face (outer 00–11, inner 12–23) with a digital 96×80dp readout.",
    defaults: { use24h: false, time: "9:41" },
    controls: [{ kind: "switch", key: "use24h", label: "24-hour", icon: "schedule" }],
    stageKey: (v) => (v.use24h === true ? "24h" : "12h"),
    render: (v, set) => {
      const [h, m] = pgTime(v.time);
      return (
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-[20px] bg-m3-surface-container px-6 py-2 md-title-large text-m3-on-surface tabular-nums">
            {pgTimeLabel(h, m, v.use24h === true)}
          </div>
          <TimePicker
            value={{ hour: h, minute: m }}
            onChange={(t) => set("time", `${t.hour}:${t.minute}`)}
            use24h={v.use24h === true}
          />
        </div>
      );
    },
    code: (v) => {
      const props: string[] = ["value={time}", "onChange={setTime}"];
      if (v.use24h === true) props.push("use24h");
      return joinCode("TimePicker", props);
    },
  },
};

export function getPlaygroundSpec(id: string): PlaygroundSpec | undefined {
  return PLAYGROUND_SPECS[id];
}
