import * as React from 'react';
import { motion, Transition } from 'framer-motion';
import { CheckboxRootProps } from '@base-ui/react/checkbox';
import { RadioRootProps } from '@base-ui/react/radio';
import { SwitchRootProps } from '@base-ui/react/switch';

/**
 * MATERIAL 3 EXPRESSIVE — LIBRARY CONTRACT TYPES
 *
 * Every component file in `@/components/m3` exports:
 *   1. The component (named export, e.g. `Button`)
 *   2. Its metadata object (e.g. `buttonMeta: M3ComponentMeta`)
 *
 * Metadata powers BOTH the docs showcase AND the agentic API
 * (`/api/registry`, `/llms.txt`), keeping a single source of truth.
 */
type M3Category = "actions" | "communication" | "containment" | "selection" | "textinput" | "navigation";
declare const categoryLabels: Record<M3Category, string>;
interface PropDoc {
    /** Prop name, e.g. "variant" */
    name: string;
    /** TypeScript type as a readable string, e.g. "'filled' | 'tonal' | 'outlined'" */
    type: string;
    /** Default value as string, e.g. "'filled'" */
    default?: string;
    /** What the prop does */
    description: string;
}
interface M3Guidelines {
    /** When to use this component */
    whenToUse: string[];
    /** Anatomy parts, ordered from bottom to top layer */
    anatomy?: string[];
    /** Key states: enabled / hover / focus / pressed / disabled / selected … */
    states?: string[];
    /** Do's from official Material guidelines */
    dos?: string[];
    /** Don'ts from official Material guidelines */
    donts?: string[];
}
/** The audited Material source and web implementation notes for one component. */
type M3SpecStatus = "material-3" | "material-3-expressive" | "material-3-and-expressive" | "extension";
/** Pinned source sets used when a live Material page needs implementation detail. */
type M3SpecReferenceId = "androidx-compose-material3" | "material-web" | "flutter-material" | "base-ui-react";
interface M3ComponentSpec {
    /** Whether the component belongs to Material 3, Material 3 Expressive, or this library. */
    status: M3SpecStatus;
    /** Official Material overview page; extensions intentionally have no current M3 page. */
    materialUrl: string | null;
    /** Date of the per-component Material audit. */
    auditedAt: "2026-08-28";
    /** Pinned implementation source sets consulted by this audit. */
    references: readonly M3SpecReferenceId[];
    /** How platform behavior maps to browser behavior in this library. */
    webMapping: string;
    /** Intentional difference from the audited source, if any. */
    deviations: readonly string[];
}
interface M3ComponentMeta {
    /** kebab-case id, e.g. "button" */
    id: string;
    /** PascalCase display name, e.g. "Button" */
    name: string;
    category: M3Category;
    /** One-sentence official-style description */
    description: string;
    /** Required audited Material traceability record. */
    spec: M3ComponentSpec;
    /** Full import line agents should emit */
    importLine: string;
    /** Named variant values the `variant`-like props accept */
    variants?: string[];
    /** Full prop documentation */
    props: PropDoc[];
    guidelines: M3Guidelines;
    /** Minimal runnable usage example (JSX string) */
    exampleCode: string;
    /** true = component is new in Material 3 Expressive (2025) */
    m3e?: boolean;
    /** Related component ids */
    related?: string[];
    /** Exported demo component name in showcase demos */
    demoName: string;
}
interface M3RegistryEntry extends M3ComponentMeta {
    /** File path of the component implementation */
    file: string;
}
interface M3Registry {
    library: "m3-expressive-react";
    version: string;
    description: string;
    spec: string;
    totalCount: number;
    categories: M3Category[];
    components: M3RegistryEntry[];
}

/**
 * MATERIAL 3 EXPRESSIVE — COMPONENT METADATA (single source of truth)
 *
 * Server-safe module (no "use client"): importable from API routes,
 * RSC and client components alike. Each component file in
 * src/components/m3 re-exports its meta from here.
 */

declare const buttonGroupMeta: M3ComponentMeta;
declare const dividerMeta: M3ComponentMeta;
declare const datePickerMeta: M3ComponentMeta;
declare const sideSheetMeta: M3ComponentMeta;
declare const carouselMeta: M3ComponentMeta;
declare const dialogMeta: M3ComponentMeta;
declare const snackbarMeta: M3ComponentMeta;
declare const navigationDrawerMeta: M3ComponentMeta;
declare const listMeta: M3ComponentMeta;
declare const cardMeta: M3ComponentMeta;
declare const segmentedButtonMeta: M3ComponentMeta;
declare const sliderMeta: M3ComponentMeta;
declare const textFieldMeta: M3ComponentMeta;
declare const autocompleteMeta: M3ComponentMeta;
declare const navigationRailMeta: M3ComponentMeta;
declare const chipMeta: M3ComponentMeta;
declare const bannerMeta: M3ComponentMeta;
declare const checkboxMeta: M3ComponentMeta;
declare const fabMeta: M3ComponentMeta;
declare const tabsMeta: M3ComponentMeta;
declare const loadingIndicatorMeta: M3ComponentMeta;
declare const menuMeta: M3ComponentMeta;
declare const bottomAppBarMeta: M3ComponentMeta;
declare const extendedFabMeta: M3ComponentMeta;
declare const circularProgressMeta: M3ComponentMeta;
declare const badgeMeta: M3ComponentMeta;
declare const searchBarMeta: M3ComponentMeta;
declare const searchViewMeta: M3ComponentMeta;
declare const splitButtonMeta: M3ComponentMeta;
declare const switchMeta: M3ComponentMeta;
declare const timePickerMeta: M3ComponentMeta;
declare const radioMeta: M3ComponentMeta;
declare const toolbarMeta: M3ComponentMeta;
declare const iconButtonMeta: M3ComponentMeta;
declare const tooltipMeta: M3ComponentMeta;
declare const fabMenuMeta: M3ComponentMeta;
declare const navigationBarMeta: M3ComponentMeta;
declare const topAppBarMeta: M3ComponentMeta;
declare const bottomSheetMeta: M3ComponentMeta;
declare const buttonMeta: M3ComponentMeta;
declare const linearProgressMeta: M3ComponentMeta;

type ButtonVariant = "filled" | "tonal" | "outlined" | "text" | "elevated";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "extra-small" | "small" | "medium" | "large" | "extra-large";
type ButtonShape = "round" | "square" | "full" | "large" | "medium" | "small";
/**
 * Button attributes minus the handlers framer-motion re-defines with its own
 * (motion-specific) signatures — those DOM versions would conflict once they
 * reach the motion element through Base UI's `render` composition.
 */
type ButtonNativeProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onDragStart" | "onDrag" | "onDragEnd" | "onDragOver" | "onDragEnter" | "onDragLeave" | "onDrop">;
interface ButtonCommonProps {
    size?: ButtonSize;
    /** Official round/square shape. Legacy fixed-radius names remain supported. */
    shape?: ButtonShape;
    /** Leading Material Symbol name */
    icon?: string;
    /** Trailing Material Symbol name */
    trailingIcon?: string;
    /** Shows a spinner (replacing the leading icon) and disables interaction */
    loading?: boolean;
    /** Stretch to container width */
    fullWidth?: boolean;
    /** Rendered content — use for text labels */
    children?: React.ReactNode;
}
type ButtonToggleProps = {
    variant?: Exclude<ButtonVariant, "text">;
    /** Enables the current M3 toggle-button selected contract. Text buttons cannot toggle. */
    toggleable: true;
    /** Controlled selected state. Omit for internal state. */
    selected?: boolean;
    onSelectedChange?: (selected: boolean) => void;
} | {
    variant?: ButtonVariant;
    toggleable?: false;
    selected?: never;
    onSelectedChange?: never;
};
type ButtonProps = ButtonNativeProps & ButtonCommonProps & ButtonToggleProps;
/**
 * M3 Expressive Button.
 *
 * Layering: Base UI's headless `Button` owns the native <button> semantics,
 * the `type="button"` default and disabled/focus handling (it guards click +
 * pointer events while disabled); the `render` prop composes it with a
 * framer-motion element so WE keep the visuals — press scale, the M3E shape
 * morph, springs and the M3 state layer. Press morphs the corner shape
 * to the size-specific pressed corner with the expressive spring. Keyboard
 * presses through Space and Enter use the same state.
 */
/** Material 3 Expressive button for user actions. @see https://m3.material.io/components/buttons/overview */
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

type IconButtonVariant = "standard" | "filled" | "tonal" | "outlined";
type IconButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "extra-small" | "small" | "medium" | "large" | "extra-large";
type IconButtonWidth = "narrow" | "standard" | "default" | "wide";
type IconButtonShape = "round" | "square";
/**
 * Button attributes minus the handlers framer-motion re-defines with its own
 * (motion-specific) signatures — those DOM versions would conflict once they
 * reach the motion element through Base UI's `render` composition.
 */
interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onDragStart" | "onDrag" | "onDragEnd"> {
    variant?: IconButtonVariant;
    size?: IconButtonSize;
    /** Official narrow, standard, or wide container width. */
    width?: IconButtonWidth;
    /** Round toggles to square when selected; square toggles to round. */
    shape?: IconButtonShape;
    /** Material Symbols ligature name, e.g. "favorite" */
    icon: string;
    /** Enables on/off toggle behavior with a spring pop on selection */
    toggleable?: boolean;
    /** Controlled selected state (requires toggleable) */
    selected?: boolean;
    onSelectedChange?: (selected: boolean) => void;
}
/**
 * M3 Icon button — a compact pressable icon with a state layer and ripple.
 *
 * Layering: Base UI's headless `Button` owns the native <button> semantics,
 * the `type` default and disabled/focus handling (it guards click + pointer
 * events while disabled); the `render` prop composes it with a framer-motion
 * element so WE keep the visuals — press scale spring, M3 state layer and
 * the selected pop. When `toggleable`, the selected state recolors the icon
 * to the primary role (standard/outlined) and pops it in with the expressive
 * spring (`aria-pressed` stays wired for assistive tech).
 */
/** Material 3 icon button for compact actions. @see https://m3.material.io/components/icon-buttons/overview */
declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;

type FabColor = "primary" | "secondary" | "tertiary" | "primary-container" | "secondary-container" | "tertiary-container" | "surface";
type FabSize = "small" | "standard" | "medium" | "large" | "extra-large";
/**
 * Button attributes minus the handlers framer-motion re-defines with its own
 * (motion-specific) signatures — those DOM versions would conflict once they
 * reach the motion element through Base UI's `render` composition.
 */
interface FabProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onDragStart" | "onDrag" | "onDragEnd"> {
    color?: FabColor;
    size?: FabSize;
    /** Material Symbols ligature name, e.g. "add" */
    icon: string;
    /** Lowered elevation (level 1 instead of 3) for FABs that share a screen with extended FABs or dialogs */
    lowered?: boolean;
}
/**
 * M3 Floating action button (FAB) — the highest-emphasis action on a screen.
 *
 * Layering: Base UI's headless `Button` owns the native <button> semantics,
 * the `type="button"` default and disabled/focus handling (it guards click +
 * pointer events while disabled); the `render` prop composes it with a
 * framer-motion element so WE keep the visuals — the expressive hover/tap
 * springs and the M3 state layer. Official elevation: level 3 at rest →
 * level 4 on hover/pressed (lowered: 1 → 2). Disabled drops to the
 * on-surface 12%/38% disabled tokens with no elevation.
 */
/** Material 3 Expressive floating action button. @see https://m3.material.io/components/floating-action-button/overview */
declare const Fab: React.ForwardRefExoticComponent<FabProps & React.RefAttributes<HTMLButtonElement>>;

type ExtendedFabSize = "small" | "medium" | "large";
/**
 * Button attributes minus the handlers framer-motion re-defines with its own
 * (motion-specific) signatures — those DOM versions would conflict once they
 * reach the motion element through Base UI's `render` composition.
 */
interface ExtendedFabProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onDragStart" | "onDrag" | "onDragEnd"> {
    color?: FabColor;
    size?: ExtendedFabSize;
    /** Material Symbols ligature name, e.g. "edit" */
    icon?: string;
    /** Text label rendered next to the icon */
    label: string;
    /** Lowered elevation (level 1 instead of 3) */
    lowered?: boolean;
}
/**
 * M3 Extended FAB — a wider floating action button with an icon and
 * text label, for the primary action when an icon alone is not clear.
 *
 * Layering: Base UI's headless `Button` owns the native <button> semantics,
 * the `type="button"` default and disabled/focus handling (it guards click +
 * pointer events while disabled); the `render` prop composes it with a
 * framer-motion element so WE keep the visuals — the expressive hover/tap
 * springs and the M3 state layer. The current M3E set is small 56dp,
 * medium 80dp, and large 96dp, with matching shape, type, and spacing tokens.
 * Elevation 3 → 4 on hover (lowered: 1 → 2);
 * disabled uses the on-surface 12%/38% tokens with no elevation.
 */
/** Material 3 Expressive extended FAB for primary actions. @see https://m3.material.io/components/extended-fab/overview */
declare const ExtendedFab: React.ForwardRefExoticComponent<ExtendedFabProps & React.RefAttributes<HTMLButtonElement>>;

interface FabMenuAction {
    /** Material Symbols ligature name for the action FAB */
    icon: string;
    /** Optional label shown as a tooltip-style chip next to the action FAB */
    label?: string;
    /** Accessible name when no visible label is supplied. */
    ariaLabel?: string;
    onClick?: () => void;
}
interface FabMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Actions revealed when the menu opens */
    actions: FabMenuAction[];
    direction?: "horizontal" | "vertical";
    color?: FabColor;
    /** Controlled open state; omit to let the menu manage its own state */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Closed-state Material Symbol. */
    icon?: string;
    /** Open-state Material Symbol. */
    closeIcon?: string;
    /**
     * Dock the menu to the bottom edge. Closed: the FAB sits flush bottom-center.
     * Open: the FAB's bottom corners morph square (shapes.large → shapes.none)
     * so the menu connects to the edge/bar while the actions cascade upward.
     * Docking fixes the cascade layout, so `direction` is ignored while docked.
     */
    docked?: boolean;
    /**
     * Docking target (only with `docked`).
     * - 'screen' (default): pins `position: fixed` to the viewport bottom — or to
     *   a transformed ancestor, e.g. a demo stage — with a vertical cascade above
     *   the FAB.
     * - 'bottom-app-bar': anchors `position: absolute; bottom: 0` inside the
     *   nearest positioned ancestor, so the FAB rests directly on a bottom app
     *   bar below and the actions open as a horizontal row flush on top of it.
     */
    dockedTo?: FabMenuDockTarget;
}
type FabMenuDockTarget = "screen" | "bottom-app-bar";
/**
 * M3 Expressive FabMenu — a 56dp FAB that expands into a staggered row or
 * column of 56dp extended action buttons. The main icon changes to a close
 * affordance while the actions spring in one after another
 * (50ms stagger = durations.short1 token).
 *
 * Built on Base UI's headless Menu: Root owns the open state, outside
 * pointerdown + Escape dismissal and focus restoration; Trigger wraps the
 * main FAB (aria-haspopup/expanded) while keeping the hover/tap springs and
 * docked shape morph; the action cascade stays a custom in-flow flex layout
 * (a floating popup positioner cannot express the docked screen / bottom
 * app bar modes) with each action as a Menu.Item for roving focus and
 * Enter/Space activation. The menu is kept mounted while the staggered
 * exit plays (`preventUnmountOnClose` + `actionsRef.unmount`).
 */
/** Material 3 Expressive FAB menu for related actions. @see https://m3.material.io/components/fab-menu/overview */
declare const FabMenu: React.ForwardRefExoticComponent<FabMenuProps & React.RefAttributes<HTMLDivElement>>;

type SplitButtonVariant = "filled" | "tonal" | "outlined" | "elevated";
type SplitButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "extra-small" | "small" | "medium" | "large" | "extra-large";
interface SplitButtonItem {
    label: string;
    icon?: string;
    onClick?: () => void;
}
interface SplitButtonProps {
    /** Visible leading label. Omit for the official icon-only leading segment. */
    label?: string;
    /** Optional leading Material Symbol. */
    icon?: string;
    /** Required accessible name when the leading segment is icon-only. */
    ariaLabel?: string;
    onClick?: () => void;
    items: SplitButtonItem[];
    variant?: SplitButtonVariant;
    size?: SplitButtonSize;
    disabled?: boolean;
    className?: string;
}
/**
 * M3 Expressive Split button — two joined pill segments: the start one fires
 * the default action, the end one opens a dropdown of related actions.
 * The menu is a standard M3 menu surface: 4dp corners, elevation 2,
 * 48dp menu items.
 *
 * Built on Base UI's headless Menu: the dropdown segment is a Menu.Trigger
 * (aria-haspopup/expanded + ArrowDown keyboard open), and the popup owns
 * roving focus, Arrow/Home/End navigation, typeahead, outside-press and
 * Escape dismissal with focus restore. The joined pill, press squash and
 * rotating chevron stay ours. The menu is kept mounted while the exit
 * spring plays (`preventUnmountOnClose` + `actionsRef.unmount`).
 */
/** Material 3 Expressive split button for default and related actions. @see https://m3.material.io/components/split-button/overview */
declare const SplitButton: React.ForwardRefExoticComponent<SplitButtonProps & React.RefAttributes<HTMLDivElement>>;

type ButtonGroupVariant = "outlined" | "filled" | "tonal" | "elevated";
type ButtonGroupSelection = "none" | "single" | "multiple" | "single-required" | "multiple-required";
type ButtonGroupLayout = "standard" | "connected";
type ButtonGroupSize = "xs" | "sm" | "md" | "lg" | "xl" | "extra-small" | "small" | "medium" | "large" | "extra-large";
interface ButtonGroupItem {
    id: string;
    label?: string;
    icon?: string;
    ariaLabel?: string;
    onClick?: () => void;
}
interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    buttons: ButtonGroupItem[];
    variant?: ButtonGroupVariant;
    /** Standard uses official size gaps; connected uses 2dp gaps and asymmetric shapes. */
    layout?: ButtonGroupLayout;
    shape?: "round" | "square";
    selection?: ButtonGroupSelection;
    /** Controlled selected ids; omit to let the group manage its own state */
    value?: string[];
    onValueChange?: (value: string[]) => void;
    /** Legacy alias: false disables the standard 15% pressed-width redistribution. */
    variableWidths?: boolean;
    /** Width share added to the pressed item. Official default is 0.15. */
    expandedRatio?: number;
    size?: ButtonGroupSize;
    disabled?: boolean;
}
/**
 * M3 Expressive button group — standard groups use official size-aware gaps
 * (18/12/8/8/8dp) and the
 * official pressed-width redistribution; connected groups use a 2dp gap and
 * asymmetric inner corners. Both support optional or required selection.
 * The 40dp small size exposes an expanded 48dp touch target via an
 * invisible ::before hit-area extension.
 *
 * No Base UI primitive for a connected button group in v1.0.0-rc.0 — custom
 * container retained. The container stays a plain semantic group
 * (`role="group"`; `aria-label` reaches it through the `...props` spread).
 * Each segment is our M3 Button layer (Base UI `Button` + framer-motion
 * `render` composition), so segments inherit the same native-<button>
 * disabled/focus handling as the standalone buttons.
 */
/** Material 3 Expressive group for related buttons. @see https://m3.material.io/components/button-groups/overview */
declare const ButtonGroup: React.ForwardRefExoticComponent<ButtonGroupProps & React.RefAttributes<HTMLDivElement>>;

type SegmentedButtonType = "single" | "multiple";
type SegmentedButtonSize = "sm" | "md";
interface SegmentedButtonOption {
    value: string;
    label?: string;
    icon?: string;
    ariaLabel?: string;
}
interface SegmentedButtonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "defaultChecked"> {
    options: SegmentedButtonOption[];
    type?: SegmentedButtonType;
    /** Controlled value: string for single, string[] for multiple; omit for uncontrolled */
    value?: string | string[];
    onValueChange?: (value: string | string[]) => void;
    size?: SegmentedButtonSize;
    disabled?: boolean;
}
/**
 * M3 Segmented buttons — connected segments inside one pill outline for
 * selecting between 2–5 choices. Selected segments fill with the
 * secondary-container color and a check icon springs open.
 *
 * Built on Base UI's headless ToggleGroup/Toggle: the group owns the pressed
 * state, `aria-pressed`, roving arrow-key focus and disabled propagation,
 * while this layer keeps the M3 Expressive visuals (connected pill outline,
 * 48dp touch expanders, springy check icon, ripple).
 */
/** Material 3 segmented button for grouped choices. @see https://m3.material.io/components/segmented-buttons/overview */
declare const SegmentedButton: React.ForwardRefExoticComponent<SegmentedButtonProps & React.RefAttributes<HTMLDivElement>>;

type BadgeColor = "error" | "primary" | "tertiary";
interface BadgeProps {
    /** Count or short text to display. Numbers above `max` render as "{max}+". */
    value?: number | string;
    /** Renders a 6px dot instead of a value (used when a count is irrelevant). */
    showDot?: boolean;
    /** Anchor element the badge pins to (icon, avatar, button…). */
    children?: React.ReactNode;
    color?: BadgeColor;
    /** Largest count shown before collapsing to "{max}+". Capped at 999 so the label stays within four characters. */
    max?: number;
    /** Concise description appended to the destination for assistive technology. */
    ariaLabel?: string;
    className?: string;
}
/**
 * No Base UI primitive for badge in v1.0.0-rc.0 — custom implementation retained.
 * (Base UI added `badge` only after 1.0.0-rc.0 — it is absent from the installed
 * package's exports — and our anchored/count/dot API is richer anyway.)
 *
 * M3 Badge — a small status marker for another element.
 * With `children` it pins to the anchor's logical top-end corner using the
 * official offsets (content badge overhangs 4px inline-end / 2px top; the dot sits flush
 * in the corner). Standalone it renders a 16px full-round badge or a
 * 6px full-round dot, matching the AndroidX Material3 token shapes; a single
 * digit renders as a 16×16 badge. Large labels are limited to the official
 * four characters, including a trailing "+". Changing `value` remounts the badge,
 * popping in with the bouncy M3E spring.
 */
/** Material 3 badge for status or notification counts. @see https://m3.material.io/components/badges/overview */
declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;

type LinearProgressColor = "primary" | "secondary" | "tertiary" | "error";
interface LinearProgressProps {
    /** 0–100. Omit for the indeterminate sweeping indicator. */
    value?: number;
    /** M3 Expressive wavy indicator line instead of a flat bar. */
    wavey?: boolean;
    /** M3 Expressive wavy indicator line. Preferred spelling; overrides `wavey`. */
    wavy?: boolean;
    color?: LinearProgressColor;
    /** Track height in px (flat bar only — the wavy line is fixed at 10px). Default 4. */
    height?: number;
    /** Stretch to the container width. */
    fullWidth?: boolean;
    /** Optional label rendered above the track (with % when determinate). */
    label?: string;
    className?: string;
}
/**
 * M3 Linear progress indicator — flat (baseline) or Expressive wavy. The
 * wavy track is 10dp high with a 40dp determinate wavelength and a tighter
 * 20dp indeterminate wavelength.
 * Semantics come from Base UI's Progress parts: `Root` renders the
 * `role="progressbar"` element (aria-valuenow/min/max + a valuetext, and
 * `data-indeterminate`/`data-progressing`/`data-complete` state attributes),
 * `Track` is the visible rail and `Indicator` is the value-sliced bar (Base UI
 * applies `inset-inline-start: 0` + the percentage `width` inline when
 * determinate, and nothing while indeterminate). All M3 visuals stay ours via
 * className; no buffer/range styling exists in the M3 spec or the current API.
 */
/** Material 3 linear progress indicator. @see https://m3.material.io/components/progress-indicators/overview */
declare const LinearProgress: React.ForwardRefExoticComponent<LinearProgressProps & React.RefAttributes<HTMLDivElement>>;

type CircularProgressColor = "primary" | "secondary" | "tertiary" | "error";
interface CircularProgressProps {
    /** 0–100. Omit for the indeterminate sweeping arc. */
    value?: number;
    /** Outer diameter in px. Default 40 for flat and 48 for wavy. */
    size?: number;
    /** Indicator stroke width in px. Default 4. */
    thickness?: number;
    /** M3 Expressive circular waveform. Uses the official 48dp default size. */
    wavy?: boolean;
    /** @deprecated Use `wavy`. Kept for compatibility with LinearProgress. */
    wavey?: boolean;
    color?: CircularProgressColor;
    /** Accessible name announced by screen readers. Default "Loading". */
    ariaLabel?: string;
    className?: string;
}
/**
 * M3 Circular progress indicator. The flat indicator defaults to 40dp; the
 * Expressive wavy indicator defaults to 48dp so the waveform stays legible.
 * Determinate: a round-capped arc grows with a spring and leaves a real 4dp
 * transparent gap before and after the remaining track. Circular indicators
 * do not use the linear indicator's stop dot. Indeterminate: the M3 arc grows
 * to ~270° and contracts while the ring rotates, without a visible track.
 *
 * No radial primitive — custom SVG retained; Progress.Root donates the
 * `role="progressbar"` semantics (aria-valuenow/min/max + valuetext, and the
 * `data-indeterminate`/`data-progressing`/`data-complete` states) from a
 * wrapper element while the ring itself stays a plain `aria-hidden` SVG.
 */
/** Material 3 circular progress indicator. @see https://m3.material.io/components/progress-indicators/overview */
declare const CircularProgress: React.ForwardRefExoticComponent<CircularProgressProps & React.RefAttributes<HTMLDivElement>>;

type LoadingIndicatorColor = "primary" | "secondary" | "tertiary" | "error";
type LoadingIndicatorVariant = "uncontained" | "contained";
interface LoadingIndicatorProps {
    /** Container size in px (square). Default 48 (official ContainerHeight). */
    size?: number;
    /** 0–1 progress. When set, the indicator morphs from Circle to SoftBurst. */
    progress?: number;
    /** false pauses the morph and rests at a circle at 38% opacity. Default true. */
    active?: boolean;
    /** Official uncontained indicator or the 48dp tonal container variant. */
    variant?: LoadingIndicatorVariant;
    color?: LoadingIndicatorColor;
    /** Purpose announced while active. Default "Loading". */
    ariaLabel?: string;
    className?: string;
}
/**
 * No Base UI primitive for the expressive loading indicator in v1.0.0-rc.0 — custom implementation retained.
 *
 * M3 Expressive loading indicator. The official default is uncontained;
 * `variant="contained"` places the same 38dp indicator in a 48dp tonal
 * container. Set `progress` to use the official determinate Circle-to-SoftBurst
 * morph. Without progress, each morph starts at the official 650ms interval
 * while the indicator makes the official 4666ms global rotation. Reduced motion
 * renders a static, full-opacity result while keeping progress semantics. Inactive
 * indeterminate indicators leave the accessibility tree so they stop announcing
 * progress.
 */
/** Material 3 Expressive loading indicator. @see https://m3.material.io/components/loading-indicator/overview */
declare const LoadingIndicator: React.ForwardRefExoticComponent<LoadingIndicatorProps & React.RefAttributes<HTMLDivElement>>;

interface SnackbarProps {
    /** Controls visibility (rendered through the Base UI toast manager). */
    open: boolean;
    message: string;
    /** Optional leading Material Symbol name. */
    icon?: string;
    /** Trailing text action, e.g. "Undo". */
    actionLabel?: string;
    onAction?: () => void;
    /** Put the action below the message. Use for long actions or compact widths. */
    actionOnNewLine?: boolean;
    /** Called by auto-dismiss, swipe, Escape and the trailing close icon. */
    onClose?: () => void;
    /** Auto-dismiss for messages without actions. Actionable snackbars stay until acted on or dismissed. Default 4000. */
    duration?: number;
    className?: string;
}
/**
 * M3 Snackbar — brief confirmation feedback at the bottom of the screen on an
 * inverse surface (4dp corners, elevation 3, responsive compact width and a
 * current 600dp maximum), with a text action and close control. Actionable
 * snackbars do not auto-dismiss, and long actions can move to a new line.
 * The optional leading icon is a documented extension beyond the base M3
 * anatomy (text + action + close).
 *
 * Migrated onto the Base UI Toast primitive (rc.0), which now owns the toast
 * lifecycle: auto-dismiss timers (paused on hover, keyboard focus and window
 * blur), Escape-to-close, F6 viewport focus, ARIA wiring (the viewport is the
 * polite live region; the card is a focusable `role="dialog"` — replacing the
   * old `role="status"` on the card itself), one shared visible instance
   * across component mounts, and swipe-to-dismiss in any
 * direction (40px threshold, replacing the framer-motion drag handler with
 * its 80px/500px-per-second gesture rules). framer-motion was dropped here
 * because Base UI freezes the card's `transform` inline while swiping — a
 * motion-driven transform would fight it, and JS springs cannot participate
 * in Base UI's transition-end detection.
 */
/** Material 3 snackbar for transient feedback. @see https://m3.material.io/components/snackbar/overview */
declare const Snackbar: React.ForwardRefExoticComponent<SnackbarProps & React.RefAttributes<HTMLDivElement>>;

interface TooltipProps {
    /** Plain text or rich body content. */
    content: React.ReactNode;
    /** Rich (plain tooltip + title + action) variant. */
    rich?: boolean;
    /** Rich only — bold title above the content. */
    title?: string;
    /** Rich only — optional action below the content. */
    actionLabel?: string;
    onAction?: () => void;
    /** Rich only. Up to two short actions. */
    actions?: TooltipAction[];
    /** Carets are optional in current Material guidance. Default false. */
    showCaret?: boolean;
    /** Rich only. Open on click and stay open until another interaction. */
    persistent?: boolean;
    /** Persistent rich only. Open when the component first mounts. */
    defaultOpen?: boolean;
    placement?: TooltipPlacement;
    align?: TooltipAlign;
    /** Trigger element. */
    children: React.ReactNode;
    className?: string;
}
type TooltipPlacement = "top" | "bottom" | "left" | "right" | "start" | "end";
type TooltipAlign = "start" | "center" | "end";
interface TooltipAction {
    label: string;
    onClick?: () => void;
}
/**
 * M3 Tooltip — a text label that appears on hover or keyboard focus.
 * Plain tooltips are 4dp-cornered inverse-surface labels (4/8px padding,
 * 200px max, with an opt-in caret); rich tooltips add a title and up to two
 * actions on a surface-container card (12dp corners and level-2 elevation).
 * Shows after a 500ms delay. Transient tooltips hide 1.5 seconds
 * after leaving the target region. Rich tooltips default to bottom-end and
 * can opt into click-triggered persistent behavior; the trigger
 * receives aria-describedby from Base UI while the tooltip is visible.
 *
 * Built on Base UI's headless Tooltip: Provider owns the shared
 * show/hide delays, Root the open lifecycle, Trigger the hover/focus
 * listeners and aria wiring, Positioner the anchored placement with
 * collision avoidance, and Popup stays hoverable so rich-tooltip actions
 * remain clickable across the 4px anchor gap. Portals + `role="tooltip"`
 * + aria-describedby are handled for us. A 500ms touch long-press opens the
 * same popup because Base UI deliberately limits its hover listener to mouse.
 */
/** Material 3 tooltip for contextual help. @see https://m3.material.io/components/tooltips/overview */
declare const Tooltip: React.ForwardRefExoticComponent<TooltipProps & React.RefAttributes<HTMLElement>>;

interface BannerAction {
    label: string;
    onClick?: () => void;
}
interface BannerProps {
    /** Leading Material Symbol name. */
    icon?: string;
    text: string;
    /** Text buttons, right-aligned under the text above a divider. */
    actions?: BannerAction[];
    /** Collapses the banner when false (rendered through AnimatePresence). */
    open?: boolean;
    onClose?: () => void;
    fullWidth?: boolean;
    className?: string;
}
/**
 * Material 2 / Flutter Banner extension — banners are not in the current M3
 * component catalog. This compatibility component keeps the Flutter Material
 * banner anatomy: a prominent, screen-wide message at the top of a screen
 * section with optional icon and text action buttons. The
 * container has square corners (shape none) and full width, and the action row
 * sits below the content above a divider, end-aligned (official reference
 * implementation), on surface-container-low.
 */
/** Material 2 and Flutter banner compatibility extension. @see https://m2.material.io/components/banners */
declare const Banner: React.ForwardRefExoticComponent<BannerProps & React.RefAttributes<HTMLDivElement>>;

interface DialogProps {
    open: boolean;
    /** Scrim click + Escape + close handling; ignored when dismissible is false. */
    onClose: () => void;
    /** Leading Material Symbol centered above the headline. */
    icon?: string;
    headline?: string;
    /** Accessible name used when no visible headline is present. */
    ariaLabel?: string;
    /** Dialog body content. */
    children?: React.ReactNode;
    /** Trailing action buttons. Full-screen dialogs place them in a 56dp bottom bar. */
    actions?: React.ReactNode;
    /** @deprecated Use `fullScreen`. */
    fullscreen?: boolean;
    /** Edge-to-edge full-screen variant with the official header app bar. */
    fullScreen?: boolean;
    /** Allow Escape and scrim-tap dismissal. Default true. */
    dismissible?: boolean;
    className?: string;
}
/**
 * M3 Dialog — a modal window that blocks the page underneath with a 32%
 * scrim. Basic dialogs center on screen on surface-container-high with
 * 28dp corners, elevation 3 and the official 280–560dp width range;
 * full-screen dialogs cover the viewport edge-to-edge and move the close
 * affordance and headline into the official 56dp header app bar. Full-screen
 * actions stay pinned in a separate 56dp bottom bar.
 * Titles and actions stay pinned while long body content scrolls inside the
 * bounded panel.
 *
 * Built on Base UI's headless Dialog: Root owns the focus trap, page
 * scroll lock, focus restore to the trigger, Escape/outside-press
 * dismissal and aria-modal wiring; Backdrop is the scrim and Popup the
 * panel. Our `open`/`onClose` API stays the public contract — Base UI's
 * `onOpenChange` reasons are filtered through `dismissible` (non-dismissible
 * dialogs ignore escape/outside reasons). The M3 entrance (scale 0.9 → 1
 * on the expressive spring, scrim fade) is framer-motion composed via the
 * element-form `render` prop; Base UI defers unmounting until the exit
 * animation finishes (`preventUnmountOnClose` + `actionsRef.unmount`).
 */
/** Material 3 dialog for focused decisions. @see https://m3.material.io/components/dialogs/overview */
declare const Dialog: React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<HTMLDivElement>>;

type DividerInset = "none" | "start" | "middle" | "end" | "list";
type DividerColor = "outline" | "outline-variant";
type DividerOrientation = "horizontal" | "vertical";
interface DividerProps {
    /**
     * Inset. "start" is the generic 16dp start / 0dp end inset. "list" is
     * the M3 list preset with 16dp start / 24dp end. "middle" uses 16dp on
     * both inline edges; "end" is a library extension.
     */
    inset?: DividerInset;
    /** Stroke thickness in px. Default 1 (official 1dp). */
    thickness?: number;
    color?: DividerColor;
    orientation?: DividerOrientation;
    /** Expose role="separator" semantics. Decorative by default. */
    semantic?: boolean;
    className?: string;
}
/**
 * M3 Divider — a 1dp line that groups content in lists and layouts.
 * Supports start/middle/end insets and a vertical orientation.
 *
 * Built on the Base UI Separator primitive. Dividers are decorative by
 * default (`role="none"`); `semantic` opts into separator semantics and
 * orientation announcement. M3 visuals are applied via className/style.
 * A future labeled-divider variant would render this separator plus a
 * text span; no label prop exists in the public API yet.
 */
/** Material 3 divider for visual or semantic separation. @see https://m3.material.io/components/divider/overview */
declare const Divider: React.ForwardRefExoticComponent<DividerProps & React.RefAttributes<HTMLDivElement>>;

type CardVariant = "elevated" | "filled" | "outlined";
/** M3 cards rest at medium (12dp); M3 Expressive adds extra-large (28dp) for hero cards. */
type CardShape = "medium" | "extraLarge";
interface CardProps extends Omit<React.ComponentPropsWithoutRef<typeof motion.div>, "children"> {
    children?: React.ReactNode;
    /** Visual treatment: elevated (shadow), filled (highest container), outlined (stroke) */
    variant?: CardVariant;
    /** Corner shape: medium 12dp (M3 default) or extraLarge 28dp (M3E hero cards) */
    shape?: CardShape;
    /** Enables press shape morph, state layer, ripple and keyboard activation. Defaults to true when onClick is provided. */
    interactive?: boolean;
    /** Disables the card action and applies its variant-specific disabled container, outline and 38% content tokens. */
    disabled?: boolean;
}
/**
 * M3 Expressive Card — a 12dp-corner containment surface (M3 shape.medium;
 * pass shape="extraLarge" for 28dp M3E hero cards).
 * Interactive cards morph to the pressed shape (medium → small) and scale
 * to 97% with the signature expressive spring. Elevated cards lift to
 * elevation 2 on hover, filled cards lift to elevation 1, and every active
 * card emits a state layer (8% hover / 10% pressed) plus ripple.
 */
/** Material 3 card for grouped content and actions. @see https://m3.material.io/components/cards/overview */
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;

type ListVariant = "standard" | "segmented";
type ListSelectionMode = "none" | "single" | "multiple";
interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
    /** Current M3 Expressive list treatment. Default "standard". */
    variant?: ListVariant;
    /** Adds listbox/option semantics and roving arrow-key focus. */
    selectionMode?: ListSelectionMode;
    /**
     * Full-width dividers between rows (divide-y). The official list divider
     * inset is 16dp start / 24dp end (M3 lists spec). Use
     * <Divider inset="list" /> when an inset divider is part of the list flow.
     */
    dividers?: boolean;
    children?: React.ReactNode;
}
/**
 * M3 List — a vertical collection of ListItem rows.
 * Long lists scroll with the thin m3-scroll styling.
 */
/** Material 3 list for related rows. @see https://m3.material.io/components/lists/overview */
declare const List: React.ForwardRefExoticComponent<ListProps & React.RefAttributes<HTMLUListElement>>;
interface ListItemProps {
    /** Primary text (md-body-large) */
    headline: React.ReactNode;
    /** Secondary text below the headline (md-body-medium); grows the row to 72dp */
    supporting?: React.ReactNode;
    /** Small caps-style text above the headline (md-label-small) */
    overline?: string;
    /**
     * Official line count: 1 → 56dp, 2 → 72dp, 3 → 88dp.
     * Defaults to 2 when supporting/overline is set, otherwise 1.
     * lines={3} top-aligns content and wraps supporting text to two lines.
     */
    lines?: 1 | 2 | 3;
    /** Leading slot — a 20px MaterialSymbol or an avatar */
    leading?: React.ReactNode;
    /** Trailing text, e.g. metadata ("128") */
    trailing?: React.ReactNode;
    /** Trailing 20px Material Symbol name (shortcut for trailing icon) */
    trailingIcon?: string;
    /** Highlights the row with the secondary container color */
    selected?: boolean;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}
/**
 * M3 ListItem — a single list row.
 * Official heights: one-line 56dp, two-line 72dp, three-line 88dp
 * (m3.material.io lists specs). Rows with onClick render as buttons with
 * state layer (8% hover / 10% pressed), ripple, native Enter/Space
 * activation and ≥48dp touch targets.
 */
declare const ListItem: React.ForwardRefExoticComponent<ListItemProps & React.RefAttributes<HTMLLIElement>>;

type BottomSheetVariant = "modal" | "standard";
type BottomSheetState = "partial" | "expanded";
interface BottomSheetProps {
    open: boolean;
    onClose: () => void;
    /** "modal" overlays a 32% scrim; "standard" renders inline without a scrim (open ignored) */
    variant?: BottomSheetVariant;
    title?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    /** Controlled height state. */
    sheetState?: BottomSheetState;
    /** Initial uncontrolled height state. Default "partial". */
    defaultState?: BottomSheetState;
    onStateChange?: (state: BottomSheetState) => void;
    /** Height used by the partial state. Default "50dvh". */
    partialHeight?: string;
    /** Max height override. Defaults to a 72dp compact top margin and 56dp above 640px. */
    maxHeight?: string;
    className?: string;
}
/**
 * M3 Bottom Sheet — a surface anchored to the bottom edge with a 32×4dp
 * drag handle (22dp from the top). Container is surface-container-low with
   * 28dp top corners at elevation 1, spanning full width up to 640dp. Expanded
   * sheets keep a 72dp top margin on compact windows and 56dp above 640px.
 * Modal sheets fade the official 32% black scrim, spring up with the
 * default spatial spring, support drag-to-dismiss (pull > 120px or fast
 * downward fling), close on Escape, lock body scroll, trap Tab focus and
 * restore focus to the trigger on close. The drag handle is a real button:
 * click, Enter or Space cycles between partial and expanded heights. Standard
 * sheets render inline without a scrim.
 *
 * The modal variant is built on Base UI's headless Dialog: Root owns the
 * focus trap, scroll lock, Escape dismissal, focus restore and aria-modal;
 * Backdrop is the scrim; Popup is the sheet — kept mounted while the
 * framer-motion slide/drag exit plays via `preventUnmountOnClose` +
 * `actionsRef.unmount`. Drag-to-dismiss stays a framer-motion gesture on
 * the sheet (a Base UI primitive for swipeable sheets does not exist in
 * v1.0.0-rc.0).
 */
/** Material 3 bottom sheet for supplementary content. @see https://m3.material.io/components/bottom-sheets/overview */
declare const BottomSheet: React.ForwardRefExoticComponent<BottomSheetProps & React.RefAttributes<HTMLDivElement>>;

type SideSheetSide = "start" | "end" | "left" | "right";
type SideSheetVariant = "modal" | "standard";
interface SideSheetProps {
    open: boolean;
    onClose: () => void;
    /** Logical inline edge. "left" and "right" remain aliases for start/end. */
    side?: SideSheetSide;
    /** "modal" overlays a 32% scrim; "standard" renders inline on surface. */
    variant?: SideSheetVariant;
    title?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    /** Panel width in px (default 360; official max-width 400dp) */
    width?: number;
    className?: string;
}
/**
 * M3 Side Sheet — a secondary surface anchored to a logical inline edge
 * with the official 16dp radius on the inner (docked) edge only — the
 * corners touching the screen edge stay square. Modal sheets slide in over
 * a 32% scrim at elevation 1 with the default spatial spring, close on
 * Escape, lock body scroll, trap Tab focus and restore focus to the
 * trigger on close; standard sheets render inline as a surface-toned panel
 * with no scrim and unmount when `open` is false. Content padding is 24dp
 * with 12dp between top elements. The optional footer is a start-aligned
 * 72dp-minimum action area with 16dp top and 24dp bottom padding.
 *
 * The modal variant is built on Base UI's headless Dialog: Root owns the
 * focus trap, scroll lock, Escape dismissal, focus restore and aria-modal;
 * Backdrop is the scrim; Popup is the sheet — kept mounted while the
 * framer-motion slide exit plays via `preventUnmountOnClose` +
 * `actionsRef.unmount`. (No Base UI primitive for docked side surfaces
 * exists in v1.0.0-rc.0; the standard variant stays a custom panel.)
 */
/** Material 3 side sheet for supplementary content. @see https://m3.material.io/components/side-sheets/overview */
declare const SideSheet: React.ForwardRefExoticComponent<SideSheetProps & React.RefAttributes<HTMLDivElement>>;

type CarouselLayout = "multi-browse" | "uncontained" | "hero" | "full-screen" | "inline";
type CarouselAlignment = "start" | "center" | "end";
type CarouselTone = "primary" | "secondary" | "tertiary" | "surface";
type CarouselShape = "round" | "square";
/** Optional compatibility affordance. Current Material carousels default to no arrows. */
type CarouselArrows = "auto" | "always" | "never";
type CarouselUncontainedMode = "standard" | "multi-aspect";
/**
 * One snap item. Items render tonal containers with a large MaterialSymbol
 * and an md-label-large label (the library has no image assets); give an item
 * href or onClick to make the whole slide an actionable control.
 */
interface CarouselItem {
    id: string;
    label?: string;
    /** Material Symbols ligature name, e.g. "beach_access" */
    icon?: string;
    /** Container color role of the item background */
    tone?: CarouselTone;
    /** Renders the item as a link */
    href?: string;
    /** Renders the item as a button; receives the item on activation */
    onClick?: (item: CarouselItem) => void;
    /** Item width ratio used by the uncontained multi-aspect configuration. */
    aspectRatio?: number;
}
interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    items: CarouselItem[];
    /**
     * Official layout strategies (m3.material.io/components/carousel):
     * multi-browse — flexible items that resize at the viewport edges;
     * uncontained — fixed-size items that scroll without changing aspect ratio;
     * hero — one focal item with one or two smaller items;
     * full-screen — one edge-to-edge item per view.
     * `inline` remains as a deprecated alias for `full-screen`.
     */
    layout?: CarouselLayout;
    /** Scroll-snap alignment of items. */
    alignment?: CarouselAlignment;
    /** multi-browse visible-item hint, clamped to 1–5. */
    itemCount?: number;
    /** Item corners: 28dp (extraLarge, M3E) or square. */
    shape?: CarouselShape;
    /** Optional compatibility arrows: "auto" reveals
     * circular 48dp buttons on hover/focus while content overflows in that
     * direction; "always" keeps them visible and keyboard-reachable. Current
     * Material guidance discourages arrows, so the default is "never". */
    arrows?: CarouselArrows;
    /** Equal-size or mixed-ratio uncontained configuration. */
    uncontainedMode?: CarouselUncontainedMode;
    /** Shared ratio for standard uncontained items. Default 16:9. */
    itemAspectRatio?: number;
    /** Required accessibility path on scrolling pages, except full-screen. */
    showAllHref?: string;
    /** Button alternative to showAllHref for opening the complete vertical list. */
    onShowAll?: () => void;
    showAllLabel?: string;
    /** Accessible name of the carousel region. */
    ariaLabel?: string;
    className?: string;
}
/**
 * M3 Expressive Carousel — a horizontally scrollable, scroll-snapped
 * collection of items with the four current layout strategies
 * (multi-browse / uncontained / hero / full-screen), 8dp gaps and shaped items.
 *
 * Provenance: https://m3.material.io/components/carousel/overview
 *
 * Dynamic widths follow scroll position: multi-browse items move through
 * large, medium and small keyline sizes; hero keeps one large item with one
 * or two 40–56dp small items. Reduced-motion users get stable equal widths.
 * Full-screen is a vertical portrait feed with edge snap. Every layout adds
 * a scroll parallax effect, removed under reduced motion. Items use CSS
 * scroll-snap, the native scrollbar is hidden, and Arrow keys rove focus
 * between slides. ArrowUp/ArrowDown leave the carousel. Optional circular
 * compatibility arrows can be opted in, but are absent by default.
 *
 * ```tsx
 * <Carousel
 *   layout="multi-browse"
 *   itemCount={4}
 *   items={[
 *     { id: "beach", label: "Beach day", icon: "beach_access", tone: "primary" },
 *     { id: "hike", label: "Hiking", icon: "hiking", tone: "secondary" },
 *     { id: "museum", label: "Museums", icon: "museum", tone: "tertiary" },
 *   ]}
 * />
 * ```
 */
/** Material 3 Expressive carousel for browsing items. @see https://m3.material.io/components/carousel/overview */
declare const Carousel: React.ForwardRefExoticComponent<CarouselProps & React.RefAttributes<HTMLDivElement>>;

type TextFieldVariant = "filled" | "outlined";
type TextFieldSize = "xs" | "sm" | "md" | "lg";
interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
    variant?: TextFieldVariant;
    size?: TextFieldSize;
    label?: string;
    helperText?: string;
    error?: boolean;
    /** Leading Material Symbol name */
    leadingIcon?: string;
    /** Trailing Material Symbol name (overridden by the error icon) */
    trailingIcon?: string;
    /** Content shown immediately before the editable text. */
    prefix?: React.ReactNode;
    /** Content shown immediately after the editable text. */
    suffix?: React.ReactNode;
    /** Render a vertically growing textarea instead of a single-line input. */
    multiline?: boolean;
    /** Initial visible lines when `multiline` is true. */
    rows?: number;
    fullWidth?: boolean;
}
/**
 * M3 Text field — outlined (default) and filled containers with the
 * floating label animation (label docks into the outlined border gap
 * or rises inside the filled container, on the fast spatial spring).
 *
 * Built on Base UI `Field` + `Input` (v1.0.0-rc.0): `Field.Root` owns the
 * disabled/invalid state and wires `aria-labelledby` (label), `aria-invalid`
 * and `aria-describedby` (supporting text) onto the input for free. The
 * floating motion label is rendered through `Field.Label`'s `render` prop so
 * the label↔control association stays automatic while the M3E dock/rise
 * animation stays ours. `Field.Error` is intentionally unused: M3 recolors
 * the supporting text in the error state instead of swapping in a distinct
 * error message, so `helperText` always maps to `Field.Description` and the
 * error state flows through `Field.Root`'s `invalid` prop.
 */
/** Material 3 text field for labeled input. @see https://m3.material.io/components/text-fields/overview */
declare const TextField: React.ForwardRefExoticComponent<TextFieldProps & React.RefAttributes<HTMLInputElement>>;

type SearchBarSize = "sm" | "md" | "lg";
interface SearchBarTrailingAction {
    icon: string;
    label: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}
interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    size?: SearchBarSize;
    /** Leading Material Symbol name (defaults to "search") */
    leadingIcon?: string;
    /**
     * Trailing Material Symbols. Strings stay decorative for compatibility;
     * pass an action object (or `onTrailingIconClick`) to render a button.
     */
    trailingIcons?: Array<string | SearchBarTrailingAction>;
    /** Legacy aggregate action handler for string entries in `trailingIcons`. */
    onTrailingIconClick?: (icon: string, index: number) => void;
    /** Called when the user presses Enter */
    onSubmit?: () => void;
    fullWidth?: boolean;
    disabled?: boolean;
}
/**
 * M3 Search bar — a rounded-full surface-container-high pill at the
 * official level-0 tonal and shadow elevation. Enter triggers `onSubmit`.
 *
 * The underlying element is Base UI's `Input` (v1.0.0-rc.0), which renders a
 * native `<input>` (via Field.Control) and stays composable with `Field`
 * wrappers. It is used standalone here because the M3 search bar carries no
 * visible label — `aria-label` falls back to the placeholder, exactly as
 * before. Trailing strings are decorative; actionable entries require an
 * explicit callback so the component never creates inert icon buttons.
 */
/** Material 3 search bar for search queries. @see https://m3.material.io/components/search/overview */
declare const SearchBar: React.ForwardRefExoticComponent<SearchBarProps & React.RefAttributes<HTMLInputElement>>;

type SearchViewMode = "full-screen" | "docked";
interface SearchViewProps {
    /** Whether the search view is shown. */
    open: boolean;
    /** Called when the view requests to open or close (Escape, leading icon). */
    onOpenChange: (open: boolean) => void;
    /** `full-screen` covers the viewport; `docked` opens a floating result surface over a scrim. */
    mode?: SearchViewMode;
    /** Hint text, also used as the accessible dialog label. Default "Search". */
    placeholder?: string;
    /** Controlled query text. */
    value?: string;
    /** Initial query for uncontrolled usage. */
    defaultValue?: string;
    /** Called on every query edit, clear, or recent-search selection. */
    onValueChange?: (v: string) => void;
    /** Recent-search suggestion rows, shown while the query is empty. */
    recentSearches?: string[];
    /** Invoked when a recent search is chosen (click or Enter). */
    onRecentSelect?: (q: string) => void;
    /** Trailing close icon per row; omit to hide the removal affordance. */
    onRecentRemove?: (q: string) => void;
    /** Leading navigation icon node; clicking it closes the view. Defaults to an arrow_back icon. */
    leadingIcon?: React.ReactNode;
    /** Extra trailing controls rendered after the clear button. */
    trailingActions?: React.ReactNode;
    /**
     * Results content below the search header. Rendered whenever recent-search
     * suggestions are not shown (i.e. the query is non-empty, or no
     * `recentSearches` were provided).
     */
    children?: React.ReactNode;
    /** Focus the query input when either view opens. Default true. */
    autoFocus?: boolean;
    className?: string;
}
/**
 * M3 Search view — the expanded companion of the search bar: a persistent,
 * full-width search surface for larger, richer search that expands over the
 * UI (m3.material.io/components/search-view).
 *
 * The docked view uses the official 360–720dp width, 240dp minimum height,
 * two-thirds viewport height cap, 28dp corners, elevation 3, and a scrim. The
 * current full-screen contained style keeps a 56dp focused search bar without
 * a baseline divider inside a surface-container-low viewport. While the query
 * is empty, recent-search suggestion rows are shown — leading history icon,
 * label-large text, optional per-row close — and are keyboard navigable
 * (ArrowUp/ArrowDown walk an active index, Enter selects, via
 * aria-activedescendant). In "full-screen" mode the view covers the viewport
 * as a modal dialog built on Base UI `Dialog` (v1.0.0-rc.0): the modal shell
 * owns Escape, body scroll lock, focus trap, initial focus on the query
 * input, focus restore to the opener and the role="dialog"/aria-modal
 * wiring, while our motion.div (rendered via `Dialog.Popup`'s render prop)
 * keeps the M3E slide-and-fade entrance/exit; in "docked" mode it renders
 * inline above its results with no dialog machinery. The query input is a
 * Base UI `Input` and the forwarded ref target.
 *
 * @example
 * const [open, setOpen] = React.useState(false);
 * <SearchBar value={q} onChange={(e) => setQ(e.target.value)} onFocus={() => setOpen(true)} />
 * <SearchView
 *   open={open}
 *   onOpenChange={setOpen}
 *   recentSearches={recents}
 *   onRecentSelect={(q) => setQ(q)}
 *   onRecentRemove={(q) => setRecents(recents.filter((r) => r !== q))}
 * >
 *   <ProductResults query={q} />
 * </SearchView>
 */
/** Material 3 search view for focused search. @see https://m3.material.io/components/search/overview */
declare const SearchView: React.ForwardRefExoticComponent<SearchViewProps & React.RefAttributes<HTMLInputElement>>;

interface AutocompleteProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    id?: string;
    name?: string;
    form?: string;
    required?: boolean;
    "aria-label"?: string;
    className?: string;
}
/**
 * Library extension, not a standalone M3 component. It composes the
 * official outlined TextField geometry with an official Menu-style popup.
 *
 * Built on Base UI's headless Autocomplete: Root owns the combobox state,
 * live list filtering (`mode="list"` — the input query filters `options`
 * internally), ArrowUp/Down/Enter/Escape keyboard contract, outside-press
 * dismissal and the full combobox ARIA wiring (role=combobox on the input,
 * listbox/option roles, aria-expanded/activedescendant). Input is the text
 * field (ref forwarded to our public ref), Trigger is the rotating chevron,
 * Positioner anchors and matches the anchor width, and List/Item render the
 * options with roving highlight (`data-highlighted` drives the active
 * shade). Only the M3 outlined-field and surface visuals + the entrance
 * spring are ours; typing or selecting both flow through our public
 * `value`/`onChange` contract.
 */
/** Material 3 text-field and combobox compatibility extension. @see https://m3.material.io/components/text-fields/overview */
declare const Autocomplete: React.ForwardRefExoticComponent<AutocompleteProps & React.RefAttributes<HTMLInputElement>>;

interface CheckboxProps extends Omit<CheckboxRootProps, "checked" | "onCheckedChange" | "className" | "render" | "children"> {
    checked?: boolean;
    indeterminate?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    error?: boolean;
    className?: string;
    /** Form value submitted when checked. Native default is "on". */
    value?: string;
    /** Optional value submitted when unchecked. */
    uncheckedValue?: string;
    readOnly?: boolean;
    required?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
}
/**
 * M3 Checkbox — a 48px touch target with an 18px rounded box.
 * The checkmark draws itself via animated `pathLength` on the
 * expressive spring; indeterminate shows a white dash.
 *
 * Built on Base UI's headless Checkbox Root: it owns the `role="checkbox"`,
 * `aria-checked`/mixed state, hidden form input and keyboard activation.
 * Our `checked`/`indeterminate` props drive it as a controlled component and
 * Base UI's `onCheckedChange(nextChecked)` is adapted to our public
 * `onChange(checked)` — the reported value matches the old semantics
 * (an indeterminate box resolves to checked on click). The checkmark/dash
 * stay custom (framer-motion pathLength springs — no Base UI primitive
 * animates SVG paths).
 */
/** Material 3 checkbox for independent selection. @see https://m3.material.io/components/checkbox/overview */
declare const Checkbox: React.ForwardRefExoticComponent<Omit<CheckboxProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

interface RadioProps extends Omit<RadioRootProps<string>, "value" | "className" | "render" | "children"> {
    checked?: boolean;
    onChange?: () => void;
    /** Stable value used by RadioGroup and native form submission. */
    value?: string;
    label?: string;
    disabled?: boolean;
    /** Applies the error color to the ring and inner dot. */
    error?: boolean;
    className?: string;
    readOnly?: boolean;
    required?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
}
/**
 * M3 Radio button — a 48px touch target with a 20px ring (2dp stroke) and
 * a 10dp inner dot that springs in (scale 0 → 1) on the expressive spring
 * when selected. Wrap a set of Radios in `RadioGroup` for roving arrow-key
 * navigation (now handled by Base UI's RadioGroup).
 */
/** Material 3 radio button for exclusive selection. @see https://m3.material.io/components/radio-button/overview */
declare const Radio: React.ForwardRefExoticComponent<Omit<RadioProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
    /** Accessible name for the group (rendered as aria-label on role="radiogroup"). */
    label?: string;
    name?: string;
    form?: string;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
}
/**
 * M3 Radio group — a `role="radiogroup"` wrapper. Keyboard behavior
 * (ArrowUp/ArrowLeft → previous enabled radio, ArrowDown/ArrowRight → next,
 * wrapping, focus-follows-selection) is owned by Base UI's RadioGroup.
 * The selected value is mirrored from the child Radios' `checked` props and
 * every change is routed back through the selected Radio's `onChange`.
 */
declare const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>;

interface SwitchProps extends Omit<SwitchRootProps, "checked" | "onCheckedChange" | "className" | "render" | "children"> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    /** Show the optional checked-state icon. Official default is false. */
    showIcon?: boolean;
    /** Show the official optional close icon in the unchecked thumb. */
    showUnselectedIcon?: boolean;
    className?: string;
    value?: string;
    uncheckedValue?: string;
    readOnly?: boolean;
    required?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
}
/**
 * M3 Switch — 52×32 track with a thumb that grows 16 → 24px and slides
 * on the default spatial spring. Pressing squashes the thumb to 28px.
 * Checked and unchecked thumbs support the official optional glyphs. A
 * separate 40dp circular state layer follows the thumb over the 52×32 track.
 *
 * Built on Base UI's headless Switch Root + Thumb: the Root owns the
 * `role="switch"`, `aria-checked`, hidden form input and keyboard
 * activation (adapted to our public `checked`/`onCheckedChange` API); the
 * M3 thumb + track visuals and spring motion are unchanged.
 */
/** Material 3 switch for binary settings. @see https://m3.material.io/components/switch/overview */
declare const Switch: React.ForwardRefExoticComponent<Omit<SwitchProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

type SliderOrientation = "horizontal" | "vertical";
type SliderSize = "xs" | "sm" | "md" | "lg" | "xl";
interface SliderCommonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    min?: number;
    max?: number;
    step?: number;
    /** Current M3 "stops" configuration. */
    stops?: boolean;
    /** Legacy alias for `stops`. */
    discrete?: boolean;
    showValueLabel?: boolean;
    /** Optional Material Symbols inset into the start and end of the track. */
    insetIcons?: {
        start: string;
        end: string;
    };
    orientation?: SliderOrientation;
    /** Official M3E size scale. xs is the official default. */
    size?: SliderSize;
    disabled?: boolean;
    /** Native form name. Range sliders submit both values under this name. */
    name?: string;
    /** Distinct native form names for the start and end values of a range slider. */
    rangeNames?: readonly [string, string];
    /** Id of the owning form when the slider renders outside it. */
    form?: string;
    fullWidth?: boolean;
    className?: string;
}
interface SliderSingleProps extends SliderCommonProps {
    value: number;
    onChange: (value: number) => void;
    variant?: "standard" | "centered";
}
interface SliderRangeProps extends SliderCommonProps {
    value: readonly [number, number];
    onChange: (value: [number, number]) => void;
    variant: "range";
}
type SliderProps = SliderSingleProps | SliderRangeProps;
/**
 * Current M3 Expressive slider. The official default is a horizontal,
 * extra-small standard slider. `variant="centered"`, `variant="range"`,
 * vertical orientation and the sm/md/lg/xl sizes select the other official
 * configurations. Base UI owns pointer, keyboard and range-thumb behavior.
 */
/** Material 3 Expressive slider for value selection. @see https://m3.material.io/components/sliders/overview */
declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLDivElement>>;

type ChipVariant = "assist" | "filter" | "input" | "suggestion";
type ChipSize = "xs" | "sm" | "md";
interface ChipProps {
    variant?: ChipVariant;
    selected?: boolean;
    onSelect?: (selected: boolean) => void;
    /** Primary action for assist, input, and suggestion chips. */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    /** Input chips: renders a trailing cancel affordance */
    onRemove?: () => void;
    /** Accessible name for an input chip's remove action. */
    removeLabel?: string;
    leadingIcon?: string;
    /** Input chips: 24dp circular avatar. Takes precedence over leadingIcon. */
    avatar?: React.ReactNode;
    trailingIcon?: string;
    elevated?: boolean;
    size?: ChipSize;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
}
/**
 * M3 Chip — compact interactive elements: assist, filter (with the
 * animated leading check), input (with a cancel affordance) and
 * suggestion. Press squashes to 96% on the fast visual spring.
 *
 * Built on Base UI headless parts: only filter chips render a Toggle and own
 * selected state. Assist and suggestion chips are actions. Input chips keep
 * separate primary and remove actions without nested interactive elements.
 */
/** Material 3 chip for compact actions and filters. @see https://m3.material.io/components/chips/overview */
declare const Chip: React.ForwardRefExoticComponent<ChipProps & React.RefAttributes<HTMLButtonElement>>;
interface ChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Accessible name for the chip collection. */
    label?: string;
}
/**
 * Keyboard wrapper for a related chip collection. Arrow keys move through
 * chips. Home and End move to the first or last chip. Delete and Backspace
 * activate the focused input chip's remove action.
 */
declare const ChipGroup: React.ForwardRefExoticComponent<ChipGroupProps & React.RefAttributes<HTMLDivElement>>;

interface NavItem$3 {
    value: string;
    icon?: string;
    label: string;
    badge?: string | number;
}
interface TabsProps {
    items: NavItem$3[];
    value: string;
    onChange: (v: string) => void;
    /** primary uses a label-width indicator; secondary uses the official full-tab-width underline; tonal preserves the old pill extension. */
    variant?: "primary" | "secondary" | "tonal";
    /** Stretch to the container width and distribute tabs equally */
    fullWidth?: boolean;
    className?: string;
}
/**
 * M3 Tabs — organize content across different screens, data sets and interactions.
 * Built on the Base UI Tabs primitive (imported as `BaseTabs` because this
 * module also exports a `Tabs`): `Tabs.Root` is the controlled wrapper,
 * `Tabs.List` the `role="tablist"` scroller and `Tabs.Tab` each
 * `role="tab"` button. Base UI owns the WAI-ARIA tabs behavior — roving
 * tabindex, ArrowLeft/Right + Home/End with looping, and automatic
 * activation on arrow-key focus (`activateOnFocus`) — exactly the
 * keyboard/ARIA contract this component implemented by hand before.
 *
 * The selection indicator intentionally stays a framer-motion shared-layout
 * overlay (NOT `Tabs.Indicator`): the primary underline matches the measured
 * label width, while the secondary underline matches the full tab width.
 *
 * Primary tabs are 64dp icon+label columns. Secondary tabs use the official
 * 48dp surface row. The old 48dp tonal pill row remains as `variant="tonal"`.
 * Leading and trailing scroll arrows remain custom because Base UI Tabs has
 * no scroller primitive.
 */
/** Material 3 tabs for peer content sections. @see https://m3.material.io/components/tabs/overview */
declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;

interface NavItem$2 {
    value: string;
    icon?: string;
    label: string;
    badge?: string | number;
}
interface NavigationBarProps {
    items: NavItem$2[];
    value: string;
    onChange: (v: string) => void;
    /** Render as a block-level full-width bar (default). */
    fullWidth?: boolean;
    /** short is the current 64dp M3E bar; tall keeps the 80dp baseline M3 bar. */
    variant?: "short" | "tall";
    /** Short bars can put the icon above or before the label. */
    iconPosition?: "top" | "start";
    /** Centered is recommended for medium-width screens; equal fits compact screens. */
    arrangement?: "equal" | "centered";
    className?: string;
}
/**
 * M3 Navigation Bar — primary app navigation for compact and medium screens.
 * The current M3E short bar is 64dp and supports top or start icon positions;
 * the 80dp baseline bar remains available as the tall variant.
 * Accepts 3–5 destinations. The active destination button carries
 * `aria-current="page"`; Base UI has no primitive for this pattern, so the
 * roving/tab behavior stays intentionally simple (every destination is
 * tabbable) which suits a 3–5 item bar.
 */
/** Material 3 navigation bar for top-level destinations. @see https://m3.material.io/components/navigation-bar/overview */
declare const NavigationBar: React.ForwardRefExoticComponent<NavigationBarProps & React.RefAttributes<HTMLElement>>;

interface NavItem$1 {
    value: string;
    icon?: string;
    label: string;
    badge?: string | number;
}
interface NavigationDrawerProps {
    items: NavItem$1[];
    value: string;
    onChange: (v: string) => void;
    /** Modal slides over a scrim; standard is static inline. Both adapt from 240–360dp. */
    variant?: "modal" | "standard";
    /** Controls the modal drawer (standard is always visible). Uncontrolled defaults to closed. */
    open?: boolean;
    onClose?: () => void;
    /** Headline area rendered above the items */
    header?: React.ReactNode;
    /** Content pushed to the bottom of the drawer */
    footer?: React.ReactNode;
    /** Stretch to the container height (standard variant) */
    fullHeight?: boolean;
    className?: string;
}
/**
 * M3 Navigation Drawer — side navigation for destinations.
 * Official container: 240–360dp wide, surface-container-low, 16dp trailing
 * corners; 56dp full-width pill items (active = secondary-container).
 *
 * The modal variant is presented with the Base UI Dialog primitive:
 * `Dialog.Root/Portal/Backdrop/Popup` own Escape + scrim dismissal, the
 * focus trap, focus restore on close, and body scroll lock. The standard
 * variant stays a static inline panel, so dialog semantics do not apply.
 *
 * Animation note: the M3 slide uses a physics spring, which framer-motion
 * drives on the main thread (no CSS transition for Base UI to await before
 * unmounting). So on close we call `preventUnmountOnClose()` in
 * `onOpenChange` and imperatively `unmount()` the dialog once the slide-out
 * spring completes (`onAnimationComplete`) — the documented Base UI escape
 * hatch for externally-animated popups.
 */
/** Material 3 navigation drawer for top-level destinations. @see https://m3.material.io/components/navigation-drawer/overview */
declare const NavigationDrawer: React.ForwardRefExoticComponent<NavigationDrawerProps & React.RefAttributes<HTMLElement>>;

interface NavItem {
    value: string;
    icon?: string;
    label: string;
    badge?: string | number;
}
interface NavigationRailProps {
    items: NavItem[];
    value: string;
    onChange: (v: string) => void;
    /** Slot above the items — typically a FAB */
    header?: React.ReactNode;
    /** Leading menu icon (official rail anatomy item); renders when onMenuClick is set */
    menuIcon?: string;
    /** Called when the leading menu icon is pressed (showing the icon also toggles the expanded rail) */
    onMenuClick?: () => void;
    /** wide is the current M3E rail; narrow keeps the compact 80dp baseline rail. */
    variant?: "wide" | "narrow";
    /** Expands a wide rail from 96dp to a horizontal 220–360dp layout. */
    expanded?: boolean;
    /** Expanded wide-rail width, clamped to the official 220–360dp range. */
    expandedWidth?: number;
    /** Standard expansion affects layout; modal expansion overlays content and traps focus. */
    expandedMode?: "standard" | "modal";
    /** Draw a hinge/fold divider along the leading edge (foldable devices) */
    foldingLine?: boolean;
    className?: string;
}
/**
 * M3 Navigation Rail — side navigation for medium and expanded screens.
 * The current M3E wide rail morphs between a 96dp collapsed rail and a
 * 220–360dp expanded rail. The 80dp narrow baseline remains available.
 */
/** Material 3 Expressive navigation rail for wider screens. @see https://m3.material.io/components/navigation-rail/overview */
declare const NavigationRail: React.ForwardRefExoticComponent<NavigationRailProps & React.RefAttributes<HTMLElement>>;

type TopAppBarVariant = "small" | "center" | "medium" | "large" | "medium-flexible" | "large-flexible";
type TopAppBarScrollBehavior = "none" | "pinned" | "enter-always" | "exit-until-collapsed";
interface TopAppBarAction {
    icon: string;
    label?: string;
    onClick?: () => void;
    /** Filled trailing actions use the secondary-container tonal treatment. */
    variant?: "standard" | "filled";
}
interface TopAppBarSearch {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    mode?: SearchViewMode;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    ariaLabel?: string;
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
    recentSearches?: string[];
    onRecentSelect?: (value: string) => void;
    onRecentRemove?: (value: string) => void;
    children?: React.ReactNode;
}
interface TopAppBarProps {
    title: React.ReactNode;
    /** Flexible app bars can show a subtitle in expanded and collapsed states. */
    subtitle?: string;
    variant?: TopAppBarVariant;
    actions?: TopAppBarAction[];
    /** Search action and its SearchView configuration. */
    search?: TopAppBarSearch;
    /** Optional product image slot before the title. */
    image?: React.ReactNode;
    /** Optional logo slot before the title. Takes precedence over image. */
    logo?: React.ReactNode;
    onBack?: () => void;
    /** Official scroll behavior. The default `none` keeps the app bar static. */
    scrollBehavior?: TopAppBarScrollBehavior;
    /** Scroll container to observe when scrollBehavior is not `none`; defaults to the window. */
    scrollTargetRef?: React.RefObject<HTMLElement | null>;
    /** Override the official expanded height; values below 64 are clamped. */
    expandedHeight?: number;
    /** Flexible title and subtitle alignment. */
    titleAlignment?: "start" | "center";
    fullWidth?: boolean;
    className?: string;
}
/** Material 3 Expressive top app bar for navigation and actions. @see https://m3.material.io/components/app-bars/overview */
declare const TopAppBar: React.ForwardRefExoticComponent<TopAppBarProps & React.RefAttributes<HTMLElement>>;

interface BottomAppBarAction {
    icon: string;
    label?: string;
    onClick?: () => void;
}
interface BottomAppBarTrailingAction extends BottomAppBarAction {
    label: string;
}
type BottomAppBarNavigationIcon = BottomAppBarAction;
type BottomAppBarScrollBehavior = "none" | "exit-always";
interface BottomAppBarFab {
    icon: string;
    onClick?: () => void;
}
interface BottomAppBarProps {
    /** Leading navigation icon (official anatomy item; typically the hamburger/menu affordance) */
    navigationIcon?: BottomAppBarNavigationIcon;
    actions?: BottomAppBarAction[];
    /** Trailing labeled action objects. */
    trailingActions?: BottomAppBarTrailingAction[];
    /** FAB that docks at the bar edge; center placement overlaps without a cutout. */
    fab?: BottomAppBarFab;
    /** flexible is the current 64dp docked-toolbar form; standard is the 80dp baseline bar. */
    variant?: "flexible" | "standard";
    /** Flexible content distribution. Standard always uses start arrangement. */
    arrangement?: "start" | "between" | "around" | "evenly" | "fixed";
    /** Flexible expanded height. Any positive finite number is accepted. */
    expandedHeight?: number;
    /** Official bottom app bar scroll policy. The default keeps the bar visible. */
    scrollBehavior?: BottomAppBarScrollBehavior;
    /** Scroll container to observe for an opt-in scroll behavior; defaults to the window. */
    scrollTargetRef?: React.RefObject<HTMLElement | null>;
    /** Official FAB placement is end. Center is kept as a compatibility extension. */
    fabPosition?: "end" | "center";
    fullWidth?: boolean;
    className?: string;
}
/** Material 3 bottom app bar for persistent actions. @see https://m3.material.io/components/app-bars/overview */
declare const BottomAppBar: React.ForwardRefExoticComponent<BottomAppBarProps & React.RefAttributes<HTMLDivElement>>;

interface ToolbarIconItem {
    icon: string;
    label?: string;
    onClick?: () => void;
    active?: boolean;
}
type ToolbarVariant = "floating" | "dockable";
type ToolbarColor = "standard" | "vibrant" | "surface" | "primary" | "secondary" | "tertiary";
interface ToolbarProps {
    icons?: ToolbarIconItem[];
    /** Arbitrary toolbar controls, including Buttons and text fields. */
    children?: React.ReactNode;
    /** Optional FAB placed at the trailing edge of a horizontal toolbar. */
    fab?: React.ReactNode;
    variant?: ToolbarVariant;
    /** Official standard or vibrant colors. Legacy color-role aliases remain supported. */
    color?: ToolbarColor;
    /** Floating placement inside a positioned ancestor */
    position?: "top" | "bottom" | "left" | "right";
    /** Floating toolbars support horizontal and vertical layouts. */
    orientation?: "horizontal" | "vertical";
    /** Pill width for the floating variant (px) */
    width?: number;
    fullWidth?: boolean;
    /** Dockable variant: square corners and full width when docked, pill otherwise. */
    docked?: boolean;
    className?: string;
}
/**
 * M3 Expressive Toolbar — NEW in 2025. A compact pill of contextual actions.
 * Floating variant hovers over content (top/bottom, centered); dockable
 * variant morphs between a floating pill and a square, docked full-width bar.
 *
 * Built on the Base UI Toolbar primitive (imported as `BaseToolbar` because
 * this module also exports a `Toolbar`): `Toolbar.Root` provides the
 * `role="toolbar"` container with roving tabindex + arrow-key navigation, and
 * each action is a `Toolbar.Button` that registers itself via context. The
 * floating variant composes the entrance spring through Base UI's `render`
 * prop so the bar keeps its framer-motion animation while still being the
 * toolbar root (Base UI merges role/aria/handlers onto the motion element).
 */
/** Material 3 Expressive toolbar for frequent actions. @see https://m3.material.io/components/toolbars/overview */
declare const Toolbar: React.ForwardRefExoticComponent<ToolbarProps & React.RefAttributes<HTMLDivElement>>;

type MenuItemType = "item" | "divider" | "label";
interface MenuItemData {
    type?: MenuItemType;
    label?: string;
    icon?: string;
    /** Optional trailing Material Symbol. */
    trailingIcon?: string;
    /** Optional numeric or short-text badge in the trailing slot. */
    badge?: string | number;
    shortcut?: string;
    disabled?: boolean;
    destructive?: boolean;
    /** Controlled selected or checked state for M3E selectable menu items. */
    selected?: boolean;
    /** Optional icon shown instead of icon while selected. */
    selectedIcon?: string;
    /** Optional second line used by expressive menu items. */
    supportingText?: string;
    /** Selectable semantics. */
    role?: "menuitem" | "menuitemcheckbox" | "menuitemradio";
    /** Keep the popup open after activation, useful for checkable items. */
    closeOnClick?: boolean;
    /** Nested choices shown in a motion-enabled cascading submenu. */
    submenu?: MenuItemData[];
    onClick?: () => void;
}
type MenuPlacement = "bottom-start" | "bottom-end";
interface MenuProps {
    /** Clickable element the menu attaches to (cloned with the open handler) */
    trigger: React.ReactNode;
    items: MenuItemData[];
    /** Controlled open state; omit for internal state */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    placement?: MenuPlacement;
    /** segmented is the current M3E menu; standard keeps the baseline M3 list. */
    variant?: "segmented" | "standard";
    /** Vibrant menus use the tertiary color family and should be used sparingly. */
    color?: "standard" | "vibrant";
    className?: string;
}
/**
 * M3 Menu — transient surface showing a list of choices on a temporary
 * surface. Anchors to its trigger, springs open from the top origin
 * (fastVisual scale), and closes on item click, outside press, or Escape.
 * Official container: 4dp corners, surface-container, elevation 2, 8dp
 * vertical padding around 48dp items with 24dp leading icons in a 12dp
 * gutter.
 *
 * Built on Base UI's headless Menu: Root owns open state, outside-press +
 * Escape dismissal and focus restore to the trigger; Trigger composes with
 * the rendered trigger element (aria-haspopup/expanded, click and ArrowDown
 * keyboard open — the user's own onClick/onKeyDown still fire); Positioner
 * anchors the popup and handles collision avoidance; Item owns roving
 * focus, typeahead and Enter/Space activation, closing the menu on select.
 * Only the M3 surface visuals and the fastVisual spring are ours.
 */
/** Material 3 menu for contextual choices. @see https://m3.material.io/components/menus/overview */
declare const Menu: React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<HTMLButtonElement>>;

/** Official date-range shape (androidx DateRangePicker / MaterialDatePicker) */
interface DateRange {
    start?: Date;
    end?: Date;
}
type DatePickerDisplayMode = "calendar" | "input";
interface DatePickerProps {
    /** Locale used for date order, labels, and the first day of the week. */
    locale?: string;
    /** Currently selected date */
    value?: Date;
    /** Initial selected date for uncontrolled use. */
    defaultValue?: Date;
    onChange?: (d: Date) => void;
    /** Earliest selectable date (days before are disabled) */
    minDate?: Date;
    /** Latest selectable date (days after are disabled) */
    maxDate?: Date;
    /**
     * 'docked' (default): an outlined text field with an anchored calendar popup.
     * 'inline': the embedded rounded-[28px] calendar panel.
     * 'modal': the official M3 360×568dp dialog on surface-container-high (elevation 3,
     * 28dp corners) over a 32% scrim, with a selected-date header
     * ("Selected date" label-large + display-size headline). Controlled via
     * open/onOpenChange like Dialog; selection is staged until confirmation.
     */
    presentation?: "docked" | "inline" | "modal";
    /** Modal only — controls visibility (fully controlled, Dialog/SearchView style). */
    open?: boolean;
    /** Modal only — called with the next open state on scrim click, Escape, or day pick. */
    onOpenChange?: (open: boolean) => void;
    /** Modal only — legacy live-apply behavior. Official default is false. */
    closeOnSelect?: boolean;
    /** Modal confirmation button label. */
    confirmLabel?: string;
    /** Modal dismissal button label. */
    dismissLabel?: string;
    /** Called after the staged modal selection is confirmed. */
    onConfirm?: (selection: Date | DateRange) => void;
    /** Called when the modal dismissal action or scrim is used. */
    onDismiss?: () => void;
    /** Inline only: stretch to the container width */
    fullWidth?: boolean;
    /** 'single' (default) picks one date via value/onChange; 'range' picks a
     * start/end pair via range/onRangeChange (tap start, then end; a tap
     * before the start restarts — androidx DateRangePicker convention). */
    selectionMode?: "single" | "range";
    /** Range mode — controlled range; uncontrolled when omitted. */
    range?: DateRange;
    /** Range mode — fires on every tap with the next range (partial included). */
    onRangeChange?: (r: DateRange) => void;
    /** Official default is calendar. Input enables localized numeric date entry. */
    initialDisplayMode?: DatePickerDisplayMode;
    /** Show the calendar/input toggle for single-date selection. Default true. */
    showModeToggle?: boolean;
    className?: string;
}
/**
 * M3 Date Picker.
 *
 * Inline presentation — a rounded-[28px] surface-container-high panel
 * with a month grid, a tappable "month year" header that flips into a
 * 3-column year grid (1900–2100), today outlined in
 * primary, and a spring-animated selection pill shared via layoutId
 * (scoped per instance). The grid exposes ARIA grid roles with roving
 * tabindex and arrow-key day navigation (←/→/↑/↓), Home/End for week
 * start/end. Nav chevrons are 48dp targets.
 *
 * Modal presentation (presentation="modal") — the official M3 date
 * picker dialog: 360×568dp, 32% scrim, spring scale 0.9→1 + fade entry
 * (mirrored exit), staged selection with dismiss/confirm actions,
 * Escape/scrim dismissal, focus trap
 * with initial focus on the selected/today day and restore to the
 * opener, body scroll lock, and the same ARIA-grid calendar internals.
 *
 * selectionMode="range" — official M3 date-range selection in BOTH
 * presentations: the first tap sets the start, a tap ≥ start completes the
 * range, a tap < start (or any tap once complete) restarts; in-between
 * days carry a continuous secondary-container band (start cell = right half
 * with rounded-left edge under the circle, end cell = left half with
 * rounded-right edge, mid cells square, square cuts at week-row edges, a
 * 4dp vertical inset keeps adjacent week stripes separate) while start/end
 * days are 40dp circles; hovering/focusing while only the start is set
 * previews the tentative range. ARIA: start/end/in-between days are
 * aria-selected with "start/end of range" label suffixes; arrow-key
 * navigation is unchanged. In the modal the header shows Start/End date
 * placeholders (or the formatted pair) and closeOnSelect only closes once
 * the range is complete — Escape/scrim mid-selection never fabricate an
 * end. The forwardRef lands on the inline root / the modal dialog panel.
 */
/** Material 3 date picker for calendar selection. @see https://m3.material.io/components/date-pickers/overview */
declare const DatePicker: React.ForwardRefExoticComponent<DatePickerProps & React.RefAttributes<HTMLDivElement>>;

interface TimePickerValue {
    /** 0–23 */
    hour: number;
    /** 0–59 */
    minute: number;
}
interface TimePickerProps {
    /** Selected time (24h fields: hour 0–23, minute 0–59) */
    value?: TimePickerValue;
    /** Initial time when the picker is uncontrolled. Ignored when `value` is provided. */
    defaultValue?: TimePickerValue;
    onChange?: (t: TimePickerValue) => void;
    /**
     * `dial` is the existing vertical analog picker. `horizontal` uses the
     * official landscape analog layout. `input` provides numeric text fields,
     * and `scroll` provides the official three-row scroll fields.
     */
    displayMode?: "dial" | "horizontal" | "input" | "scroll";
    /** Inline compatibility layout or the official modal dialog. */
    presentation?: "inline" | "modal";
    /** Modal visibility. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    confirmLabel?: string;
    dismissLabel?: string;
    onConfirm?: (value: TimePickerValue) => void;
    onDismiss?: () => void;
    /**
     * 24-hour format: the readout shows 0–23 and the dial switches to the
     * official double-ring clock face — hours 00–11 outside, 12–23 inside.
     * When omitted, the browser's system hour cycle is used.
     */
    use24h?: boolean;
    /** Stretch to the container width */
    fullWidth?: boolean;
    className?: string;
}
/** Material 3 time picker for clock selection. @see https://m3.material.io/components/time-pickers/overview */
declare const TimePicker: React.ForwardRefExoticComponent<TimePickerProps & React.RefAttributes<HTMLDivElement>>;

interface MaterialSymbolProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Material Symbols ligature name, e.g. "home", "arrow_forward", "favorite" */
    icon: string;
    /** 0 = outlined (default), 1 = filled */
    fill?: boolean;
    /** 100–700 weight axis */
    weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
    /** -50–200 grade axis (adjusts emphasis without changing size) */
    grade?: -50 | 0 | 200;
    /** 20–48 optical size */
    opticalSize?: 20 | 24 | 40 | 48;
    /** Convenience size (sets fontSize). Default 24px via CSS. */
    size?: number;
    /** Skip font-variation overrides (inherit from CSS vars) */
    raw?: boolean;
}
/**
 * Material Symbols Rounded — the official Material 3 icon set,
 * rendered through Google's variable icon font.
 *
 * Usage: <MaterialSymbol icon="home" size={20} fill weight={500} />
 */
/** Google Material Symbols icon font wrapper. @see https://m3.material.io/styles/icons/overview */
declare const MaterialSymbol: React.ForwardRefExoticComponent<MaterialSymbolProps & React.RefAttributes<HTMLSpanElement>>;

interface RippleProps {
    /** Uses currentColor of the parent as the ink color */
    className?: string;
    /** Suppress ripple spawning (e.g. when the control is disabled) */
    disabled?: boolean;
}
/**
 * Material ripple — touch feedback that emanates from the press point.
 *
 * Renders an overlay span and listens (capture phase) on its PARENT
 * element for pointerdown, so ripples fire wherever the press lands
 * (icon, label, padding). The parent should be `relative overflow-hidden`
 * with a defined `color`.
 */
/** Material state-layer ripple feedback. @see https://m3.material.io/foundations/interaction/states/state-layers */
declare const Ripple: React.ForwardRefExoticComponent<RippleProps & React.RefAttributes<HTMLSpanElement>>;

declare const springs: {
    /** Spring fast spatial — large element translation */
    fastSpatial: Transition;
    /** Spring fast visual effects — scale/fade of small elements */
    fastVisual: Transition;
    /** Spring fast default */
    fastDefault: Transition;
    /** Spring default spatial */
    defaultSpatial: Transition;
    /** Spring default visual effects */
    defaultVisual: Transition;
    /** Spring slow spatial */
    slowSpatial: Transition;
    /** Spring slow visual effects */
    slowVisual: Transition;
    /** Expressive spatial — energetic move-in of large transitions */
    expressiveSpatial: Transition;
    /** Expressive effects — shape morphs and playful transforms */
    expressiveEffects: Transition;
    /** Expressive default — THE signature bouncy M3E spring */
    expressive: Transition;
    /** Bouncier variant for celebratory moments */
    bouncy: Transition;
};
type M3Spring = (typeof springs)[keyof typeof springs];
declare const easings: {
    readonly standard: "cubic-bezier(0.2, 0, 0, 1)";
    readonly standardAccelerate: "cubic-bezier(0.3, 0, 1, 1)";
    readonly standardDecelerate: "cubic-bezier(0, 0, 0, 1)";
    readonly emphasized: "cubic-bezier(0.2, 0, 0, 1)";
    readonly emphasizedAccelerate: "cubic-bezier(0.3, 0, 0.8, 0.15)";
    readonly emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1)";
    readonly linear: "linear";
};
declare const durations: {
    readonly short1: 50;
    readonly short2: 100;
    readonly short3: 150;
    readonly short4: 200;
    readonly medium1: 250;
    readonly medium2: 300;
    readonly medium3: 350;
    readonly medium4: 400;
    readonly long1: 450;
    readonly long2: 500;
    readonly long3: 550;
    readonly long4: 600;
    readonly extraLong1: 700;
    readonly extraLong2: 800;
    readonly extraLong3: 900;
    readonly extraLong4: 1000;
};
declare const shapes: {
    readonly none: "0px";
    readonly extraSmall: "4px";
    readonly small: "8px";
    readonly medium: "12px";
    readonly large: "16px";
    readonly largeIncreased: "20px";
    readonly extraLarge: "28px";
    readonly extraExtraLarge: "36px";
    readonly full: "9999px";
};
/** Shape morph pairs used by expressive press interactions */
declare const shapeMorph: {
    /** buttons: rest = full (pill) → pressed = largeIncreased */
    readonly button: {
        readonly rest: "9999px";
        readonly pressed: "20px";
    };
    /** cards: rest = medium → pressed = small */
    readonly card: {
        readonly rest: "12px";
        readonly pressed: "8px";
    };
};
declare const stateOpacities: {
    readonly hover: 0.08;
    readonly focus: 0.1;
    readonly pressed: 0.1;
    readonly dragged: 0.16;
};
declare const typeScale: {
    readonly displayLarge: {
        readonly fontSize: 57;
        readonly lineHeight: 64;
        readonly letterSpacing: -0.25;
        readonly weight: 400;
    };
    readonly displayMedium: {
        readonly fontSize: 45;
        readonly lineHeight: 52;
        readonly letterSpacing: 0;
        readonly weight: 400;
    };
    readonly displaySmall: {
        readonly fontSize: 36;
        readonly lineHeight: 44;
        readonly letterSpacing: 0;
        readonly weight: 400;
    };
    readonly headlineLarge: {
        readonly fontSize: 32;
        readonly lineHeight: 40;
        readonly letterSpacing: 0;
        readonly weight: 400;
    };
    readonly headlineMedium: {
        readonly fontSize: 28;
        readonly lineHeight: 36;
        readonly letterSpacing: 0;
        readonly weight: 400;
    };
    readonly headlineSmall: {
        readonly fontSize: 24;
        readonly lineHeight: 32;
        readonly letterSpacing: 0;
        readonly weight: 400;
    };
    readonly titleLarge: {
        readonly fontSize: 22;
        readonly lineHeight: 28;
        readonly letterSpacing: 0;
        readonly weight: 400;
    };
    readonly titleMedium: {
        readonly fontSize: 16;
        readonly lineHeight: 24;
        readonly letterSpacing: 0.15;
        readonly weight: 500;
    };
    readonly titleSmall: {
        readonly fontSize: 14;
        readonly lineHeight: 20;
        readonly letterSpacing: 0.1;
        readonly weight: 500;
    };
    readonly bodyLarge: {
        readonly fontSize: 16;
        readonly lineHeight: 24;
        readonly letterSpacing: 0.5;
        readonly weight: 400;
    };
    readonly bodyMedium: {
        readonly fontSize: 14;
        readonly lineHeight: 20;
        readonly letterSpacing: 0.25;
        readonly weight: 400;
    };
    readonly bodySmall: {
        readonly fontSize: 12;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.4;
        readonly weight: 400;
    };
    readonly labelLarge: {
        readonly fontSize: 14;
        readonly lineHeight: 20;
        readonly letterSpacing: 0.1;
        readonly weight: 500;
    };
    readonly labelMedium: {
        readonly fontSize: 12;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.5;
        readonly weight: 500;
    };
    readonly labelSmall: {
        readonly fontSize: 11;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.5;
        readonly weight: 500;
    };
};
declare const elevations: readonly [0, 1, 2, 3, 4, 5];
declare const colorRoles: readonly [{
    readonly token: "primary";
    readonly light: "#6750A4";
    readonly dark: "#D0BCFF";
    readonly usage: "Primary actions, key components, FABs";
}, {
    readonly token: "on-primary";
    readonly light: "#FFFFFF";
    readonly dark: "#381E72";
    readonly usage: "Text/icons on primary";
}, {
    readonly token: "primary-container";
    readonly light: "#E9DDFF";
    readonly dark: "#4F378B";
    readonly usage: "Tonal containers, selected states";
}, {
    readonly token: "on-primary-container";
    readonly light: "#22005D";
    readonly dark: "#EADDFF";
    readonly usage: "Content inside primary containers";
}, {
    readonly token: "secondary";
    readonly light: "#625B71";
    readonly dark: "#CCC2DC";
    readonly usage: "Less prominent components";
}, {
    readonly token: "secondary-container";
    readonly light: "#E8DEF8";
    readonly dark: "#4A4458";
    readonly usage: "Secondary tonal containers";
}, {
    readonly token: "tertiary";
    readonly light: "#7E5260";
    readonly dark: "#EFB8C8";
    readonly usage: "Contrasting accents (badges, FABs)";
}, {
    readonly token: "tertiary-container";
    readonly light: "#FFD9E2";
    readonly dark: "#633B48";
    readonly usage: "Tertiary tonal containers";
}, {
    readonly token: "error";
    readonly light: "#B3261E";
    readonly dark: "#F2B8B5";
    readonly usage: "Error states, destructive actions";
}, {
    readonly token: "error-container";
    readonly light: "#F9DEDC";
    readonly dark: "#8C1D18";
    readonly usage: "Error containers and highlights";
}, {
    readonly token: "surface";
    readonly light: "#FEF7FF";
    readonly dark: "#141218";
    readonly usage: "Default backgrounds";
}, {
    readonly token: "surface-container-lowest";
    readonly light: "#FFFFFF";
    readonly dark: "#0F0D13";
    readonly usage: "Lowest emphasis containers (cards)";
}, {
    readonly token: "surface-container-low";
    readonly light: "#F7F2FA";
    readonly dark: "#1D1B20";
    readonly usage: "Low emphasis containers";
}, {
    readonly token: "surface-container";
    readonly light: "#F3EDF7";
    readonly dark: "#211F26";
    readonly usage: "Medium emphasis (sheets, menus)";
}, {
    readonly token: "surface-container-high";
    readonly light: "#ECE6F0";
    readonly dark: "#2B2930";
    readonly usage: "High emphasis (nav drawers)";
}, {
    readonly token: "surface-container-highest";
    readonly light: "#E6E0E9";
    readonly dark: "#36343B";
    readonly usage: "Highest emphasis (dialogs)";
}, {
    readonly token: "on-surface";
    readonly light: "#1D1B20";
    readonly dark: "#E6E0E9";
    readonly usage: "Primary text/icons";
}, {
    readonly token: "on-surface-variant";
    readonly light: "#49454F";
    readonly dark: "#CAC4D0";
    readonly usage: "Secondary text/icons";
}, {
    readonly token: "outline";
    readonly light: "#79747E";
    readonly dark: "#938F99";
    readonly usage: "Borders, dividers, interactive strokes";
}, {
    readonly token: "outline-variant";
    readonly light: "#CAC4D0";
    readonly dark: "#49454F";
    readonly usage: "Decorative strokes, dividers";
}, {
    readonly token: "inverse-surface";
    readonly light: "#322F35";
    readonly dark: "#E6E0E9";
    readonly usage: "Snackbars, tooltips";
}, {
    readonly token: "inverse-on-surface";
    readonly light: "#F5EFF7";
    readonly dark: "#322F35";
    readonly usage: "Text on inverse surfaces";
}, {
    readonly token: "inverse-primary";
    readonly light: "#D0BCFF";
    readonly dark: "#6750A4";
    readonly usage: "Accents on inverse surfaces";
}, {
    readonly token: "scrim";
    readonly light: "#000000";
    readonly dark: "#000000";
    readonly usage: "Scrim over modal content";
}];
/** CSS variable string for a color role token, e.g. "primary-container" → "var(--md-primary-container)" */
declare function colorVar(token: string): string;
/** M3 supported color palettes for components (primary/secondary/tertiary/error) */
declare const paletteColor: {
    readonly primary: "primary";
    readonly secondary: "secondary";
    readonly tertiary: "tertiary";
    readonly error: "error";
};
type PaletteColor = keyof typeof paletteColor;

/**
 * The full agentic-compatible registry. Powers /api/registry, /llms.txt
 * and the docs showcase — single source of truth.
 */
declare const m3Registry: M3Registry;
declare function getComponent(id: string): M3RegistryEntry | undefined;
declare function getComponentsByCategory(category: M3Category): M3RegistryEntry[];
declare function searchComponents(query: string): M3RegistryEntry[];

/**
 * MATERIAL 3 EXPRESSIVE — CURATED THEME REGISTRY (server-safe)
 *
 * Each theme ships a complete M3 color scheme pair (light + dark) built from
 * official Material token roles. Values follow Material Theme Builder tonal
 * palettes for each seed color. The active theme id is applied to
 * `<html data-theme="…">` and combined with the `.dark` class for dark mode;
 * both persist to localStorage (see src/hooks/use-m3-theme.ts).
 *
 * This module intentionally has NO "use client" and NO React imports so the
 * MCP server, API routes and RSC can consume it directly.
 */
/** One full M3 color scheme. Keys mirror the --md-* CSS custom properties. */
interface M3ColorScheme {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    secondary: string;
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    tertiary: string;
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;
    error: string;
    onError: string;
    errorContainer: string;
    onErrorContainer: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
    surfaceDim: string;
    surfaceBright: string;
    surfaceContainerLowest: string;
    surfaceContainerLow: string;
    surfaceContainer: string;
    surfaceContainerHigh: string;
    surfaceContainerHighest: string;
    outline: string;
    outlineVariant: string;
    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;
    scrim: string;
    shadow: string;
}
interface M3ThemeDef {
    id: string;
    label: string;
    description: string;
    /** Seed color the scheme was generated from (Material Theme Builder style). */
    seed: string;
    light: M3ColorScheme;
    dark: M3ColorScheme;
    /** Small preview strip for theme pickers (token role → swatch hex). */
    swatch: string[];
}
/** Curated themes, in picker order. The first entry is the default. */
declare const m3Themes: M3ThemeDef[];
declare const defaultThemeId = "baseline";
declare function getTheme(id: string): M3ThemeDef | undefined;
/** All valid theme ids (for validation). */
declare const themeIds: string[];
/** Flatten a scheme into the --md-* CSS custom property map. */
declare function schemeToCssVars(scheme: M3ColorScheme): Record<string, string>;

export { Autocomplete, type AutocompleteProps, Badge, type BadgeProps, Banner, type BannerProps, BottomAppBar, type BottomAppBarProps, BottomSheet, type BottomSheetProps, Button, ButtonGroup, type ButtonGroupProps, type ButtonProps, type ButtonSize, type ButtonVariant, Card, type CardProps, Carousel, type CarouselAlignment, type CarouselItem, type CarouselLayout, type CarouselProps, type CarouselShape, type CarouselTone, Checkbox, type CheckboxProps, Chip, ChipGroup, type ChipGroupProps, type ChipProps, CircularProgress, type CircularProgressProps, DatePicker, type DatePickerProps, type DateRange, Dialog, type DialogProps, Divider, type DividerProps, ExtendedFab, type ExtendedFabProps, Fab, FabMenu, type FabMenuDockTarget, type FabMenuProps, type FabProps, IconButton, type IconButtonProps, LinearProgress, type LinearProgressProps, List, ListItem, type ListItemProps, type ListProps, LoadingIndicator, type LoadingIndicatorProps, type M3Category, type M3ColorScheme, type M3ComponentMeta, type M3ComponentSpec, type M3Guidelines, type M3Registry, type M3RegistryEntry, type M3SpecReferenceId, type M3SpecStatus, type M3Spring, type M3ThemeDef, MaterialSymbol, type MaterialSymbolProps, Menu, type MenuItemData, type MenuProps, NavigationBar, type NavigationBarProps, NavigationDrawer, type NavigationDrawerProps, NavigationRail, type NavigationRailProps, type PaletteColor, type PropDoc, Radio, RadioGroup, type RadioGroupProps, type RadioProps, Ripple, type RippleProps, SearchBar, type SearchBarProps, SearchView, type SearchViewMode, type SearchViewProps, SegmentedButton, type SegmentedButtonProps, SideSheet, type SideSheetProps, Slider, type SliderProps, Snackbar, type SnackbarProps, SplitButton, type SplitButtonProps, Switch, type SwitchProps, Tabs, type TabsProps, TextField, type TextFieldProps, TimePicker, type TimePickerProps, type TimePickerValue, Toolbar, type ToolbarProps, Tooltip, type TooltipProps, TopAppBar, type TopAppBarProps, autocompleteMeta, badgeMeta, bannerMeta, bottomAppBarMeta, bottomSheetMeta, buttonGroupMeta, buttonMeta, cardMeta, carouselMeta, categoryLabels, checkboxMeta, chipMeta, circularProgressMeta, colorRoles, colorVar, datePickerMeta, defaultThemeId, dialogMeta, dividerMeta, durations, easings, elevations, extendedFabMeta, fabMenuMeta, fabMeta, getComponent, getComponentsByCategory, getTheme, iconButtonMeta, linearProgressMeta, listMeta, loadingIndicatorMeta, m3Registry, m3Themes, menuMeta, navigationBarMeta, navigationDrawerMeta, navigationRailMeta, radioMeta, schemeToCssVars, searchBarMeta, searchComponents, searchViewMeta, segmentedButtonMeta, shapeMorph, shapes, sideSheetMeta, sliderMeta, snackbarMeta, splitButtonMeta, springs, stateOpacities, switchMeta, tabsMeta, textFieldMeta, themeIds, timePickerMeta, toolbarMeta, tooltipMeta, topAppBarMeta, typeScale };
