import * as React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { motion, Transition } from 'framer-motion';

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
interface M3ComponentMeta {
    /** kebab-case id, e.g. "button" */
    id: string;
    /** PascalCase display name, e.g. "Button" */
    name: string;
    category: M3Category;
    /** One-sentence official-style description */
    description: string;
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
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
type ButtonShape = "full" | "large" | "medium" | "small";
interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onDragStart" | "onDrag" | "onDragEnd" | "onDragOver" | "onDragEnter" | "onDragLeave" | "onDrop"> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Corner shape. M3E default "full" morphs toward 20dp on press. */
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
/**
 * M3 Expressive Button.
 * Press morphs the corner shape (full → 20dp) with the bouncy expressive
 * spring — the hallmark M3E interaction. Plays for keyboard presses too
 * (Space/Enter), via the shared shapeMorph token pair.
 */
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

type IconButtonVariant = "standard" | "filled" | "tonal" | "outlined";
type IconButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
/**
 * Button attributes minus the handlers framer-motion re-defines with its own
 * (motion-specific) signatures — spreading the DOM versions onto motion.button
 * would be a type conflict.
 */
interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onDragStart" | "onDrag" | "onDragEnd"> {
    variant?: IconButtonVariant;
    size?: IconButtonSize;
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
 * When `toggleable`, the selected state recolors the icon to the primary
 * role (standard/outlined) and pops it in with the expressive spring.
 */
declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;

type FabColor = "primary" | "secondary" | "tertiary" | "surface";
type FabSize = "small" | "medium" | "large" | "extra-large";
/**
 * Button attributes minus the handlers framer-motion re-defines with its own
 * (motion-specific) signatures — spreading the DOM versions onto motion.button
 * would be a type conflict.
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
 * Official elevation: level 3 at rest → level 4 on hover/pressed (lowered:
 * 1 → 2). Press squeezes with the expressive spring. Disabled drops to the
 * on-surface 12%/38% disabled tokens with no elevation.
 */
declare const Fab: React.ForwardRefExoticComponent<FabProps & React.RefAttributes<HTMLButtonElement>>;

/**
 * Button attributes minus the handlers framer-motion re-defines with its own
 * (motion-specific) signatures — spreading the DOM versions onto motion.button
 * would be a type conflict.
 */
interface ExtendedFabProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onDragStart" | "onDrag" | "onDragEnd"> {
    color?: FabColor;
    /** Material Symbols ligature name, e.g. "edit" */
    icon: string;
    /** Text label rendered next to the icon */
    label: string;
    /** Lowered elevation (level 1 instead of 3) */
    lowered?: boolean;
}
/**
 * M3 Extended FAB — a wider floating action button with an icon and
 * text label, for the primary action when an icon alone is not clear.
 * Official anatomy: 56dp height, 16dp corners, 24dp icon, 8dp icon-label
 * gap, 20dp horizontal padding, label-large text. Elevation 3 → 4 on
 * hover/pressed (lowered: 1 → 2); disabled uses the on-surface 12%/38%
 * tokens with no elevation.
 */
declare const ExtendedFab: React.ForwardRefExoticComponent<ExtendedFabProps & React.RefAttributes<HTMLButtonElement>>;

interface FabMenuAction {
    /** Material Symbols ligature name for the action FAB */
    icon: string;
    /** Optional label shown as a tooltip-style chip next to the action FAB */
    label?: string;
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
 * M3 Expressive FabMenu — a small FAB that expands into a staggered row or
 * column of related action FABs. The main 'edit' icon rotates 45° into a
 * close affordance while the actions spring in one after another
 * (50ms stagger = durations.short1 token). Dismisses on Escape and
 * outside-pointerdown like any transient menu surface.
 *
 * Docked (`docked`): the closed FAB is flush at the bottom-center of its
 * positioning context; when open its bottom corners square off (shape morph
 * from the shape tokens on springs.expressiveEffects) and the actions cascade
 * above it — see `dockedTo` for the screen vs bottom-app-bar targets. The
 * anchor uses `right: calc(50% - 20px)` so the widening cascade never shifts
 * the FAB horizontally.
 */
declare const FabMenu: React.ForwardRefExoticComponent<FabMenuProps & React.RefAttributes<HTMLDivElement>>;

type SplitButtonVariant = "filled" | "tonal" | "outlined";
type SplitButtonSize = "sm" | "md" | "lg";
interface SplitButtonItem {
    label: string;
    icon?: string;
    onClick?: () => void;
}
interface SplitButtonProps {
    label: string;
    onClick?: () => void;
    items: SplitButtonItem[];
    variant?: SplitButtonVariant;
    size?: SplitButtonSize;
    disabled?: boolean;
    className?: string;
}
/**
 * M3 Expressive Split button — two joined pill segments: the left one fires
 * the default action, the right one opens a dropdown of related actions.
 * The menu is a standard M3 menu surface: 4dp corners, elevation 2,
 * 48dp menu items with Arrow/Home/End keyboard navigation.
 */
declare const SplitButton: React.ForwardRefExoticComponent<SplitButtonProps & React.RefAttributes<HTMLDivElement>>;

type ButtonGroupVariant = "outlined" | "filled" | "tonal";
type ButtonGroupSelection = "none" | "single" | "multiple";
type ButtonGroupSize = "sm" | "md" | "lg";
interface ButtonGroupItem {
    id: string;
    label?: string;
    icon?: string;
    onClick?: () => void;
}
interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    buttons: ButtonGroupItem[];
    variant?: ButtonGroupVariant;
    selection?: ButtonGroupSelection;
    /** Controlled selected ids; omit to let the group manage its own state */
    value?: string[];
    onValueChange?: (value: string[]) => void;
    /** M3E: hovered/selected button flex-grows with a layout spring */
    variableWidths?: boolean;
    size?: ButtonGroupSize;
    disabled?: boolean;
}
/**
 * M3 Expressive connected button group — a row of pill buttons with a 4px
 * gutter and shared emphasis. Supports single/multiple selection and the
 * signature M3E variable-width treatment where the hovered segment grows.
 * The 40dp small size exposes an expanded 48dp touch target via an
 * invisible ::before hit-area extension.
 */
declare const ButtonGroup: React.ForwardRefExoticComponent<ButtonGroupProps & React.RefAttributes<HTMLDivElement>>;

type SegmentedButtonType = "single" | "multiple";
type SegmentedButtonSize = "sm" | "md";
interface SegmentedButtonOption {
    value: string;
    label?: string;
    icon?: string;
}
interface SegmentedButtonProps extends React.HTMLAttributes<HTMLDivElement> {
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
 */
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
    /** Largest count shown before collapsing to "{max}+". Default 99. */
    max?: number;
    disabled?: boolean;
    className?: string;
}
/**
 * M3 Badge — a small status marker for another element.
 * With `children` it pins to the anchor's top-right corner using the official
 * offsets (content badge overhangs 4px right / 2px top; the 6px dot sits flush
 * in the corner). Standalone it renders a 16px pill or a 6px dot; a single
 * digit renders as a 16×16 badge. Changing `value` remounts the badge,
 * popping in with the bouncy M3E spring.
 */
declare function Badge({ value, showDot, children, color, max, disabled, className, }: BadgeProps): string | number | bigint | boolean | react_jsx_runtime.JSX.Element | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null;

type LinearProgressColor = "primary" | "secondary" | "tertiary" | "error";
interface LinearProgressProps {
    /** 0–100. Omit for the indeterminate sweeping indicator. */
    value?: number;
    /** M3 Expressive wavy indicator line instead of a flat bar. */
    wavey?: boolean;
    color?: LinearProgressColor;
    /** Track height in px (flat bar only — the wavy line is fixed at 20px). Default 4. */
    height?: number;
    /** Stretch to the container width. */
    fullWidth?: boolean;
    /** Optional label rendered above the track (with % when determinate). */
    label?: string;
    className?: string;
}
/**
 * M3 Linear progress indicator — flat (baseline) or Expressive wavy.
 * Determinate mode animates the active indicator with a spring and leaves a
 * 4px gap before the trailing stop indicator dot, per the M3E spec.
 */
declare function LinearProgress({ value, wavey, color, height, fullWidth, label, className, }: LinearProgressProps): react_jsx_runtime.JSX.Element;

type CircularProgressColor = "primary" | "secondary" | "tertiary" | "error";
interface CircularProgressProps {
    /** 0–100. Omit for the indeterminate sweeping arc. */
    value?: number;
    /** Outer diameter in px. Default 48. */
    size?: number;
    /** Indicator stroke width in px. Default 4. */
    thickness?: number;
    color?: CircularProgressColor;
    /** Accessible name announced by screen readers. Default "Loading". */
    ariaLabel?: string;
    className?: string;
}
/**
 * M3 Circular progress indicator.
 * Determinate: a round-capped arc grows with a spring, stopping a 4px gap
 * before the fixed 4px stop indicator dot at 12 o'clock (official M3E track
 * gap + stop dot). Indeterminate: the M3 arc grows to ~270° and contracts
 * while the ring rotates.
 */
declare function CircularProgress({ value, size, thickness, color, ariaLabel, className, }: CircularProgressProps): react_jsx_runtime.JSX.Element;

type LoadingIndicatorColor = "primary" | "secondary" | "tertiary" | "error";
interface LoadingIndicatorProps {
    /** Container size in px (square). Default 48 (official ContainerHeight). */
    size?: number;
    /** false pauses the morphing + spinning animations and rests at a circle at 38% opacity. Default true. */
    active?: boolean;
    color?: LoadingIndicatorColor;
    className?: string;
}
/**
 * M3 EXPRESSIVE Loading indicator (2025) — the signature shape-morphing loader.
 * The container rotates continuously one full turn (official 4666ms global
 * rotation) while its corner shape morphs in 650ms steps, with two dashed
 * arcs spinning on top. Colors follow the official tokens: container =
 * `*-container` role, arcs = matching `on-*-container` role.
 * Set `active={false}` to rest at a static circle at 38% opacity (also used
 * automatically for users with reduced-motion enabled).
 */
declare function LoadingIndicator({ size, active, color, className, }: LoadingIndicatorProps): react_jsx_runtime.JSX.Element;

interface SnackbarProps {
    /** Controls visibility (rendered through AnimatePresence). */
    open: boolean;
    message: string;
    /** Optional leading Material Symbol name. */
    icon?: string;
    /** Trailing text action, e.g. "Undo". */
    actionLabel?: string;
    onAction?: () => void;
    /** Called by auto-dismiss and the trailing close icon. */
    onClose?: () => void;
    /** Auto-dismiss in ms. 0 keeps the snackbar sticky. Default 4000. */
    duration?: number;
    className?: string;
}
/**
 * M3 Snackbar — brief confirmation feedback at the bottom of the screen on an
 * inverse surface (4dp corners, elevation 3, 344–672px per the official web
 * spec), with a text action and close control. Per M3 it is swipe-dismissable
 * in any direction (80px drag or 500px/s flick). The optional leading icon is a
 * documented extension beyond the base M3 anatomy (text + action + close).
 */
declare function Snackbar({ open, message, icon, actionLabel, onAction, onClose, duration, className, }: SnackbarProps): react_jsx_runtime.JSX.Element;

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
    placement?: "top" | "bottom";
    /** Trigger element. */
    children: React.ReactNode;
    className?: string;
}
/**
 * M3 Tooltip — a text label that appears on hover, keyboard focus, or touch
 * long-press. Plain tooltips are 4dp-cornered inverse-surface labels (4/8px
 * padding, 200px max, 8dp caret); rich tooltips add a title and optional
 * action on a surface-container card (12dp corners, level-2 elevation,
 * outline border). Shows after a 500ms delay and hides after 600ms, and the
 * trigger receives aria-describedby while the tooltip is visible.
 */
declare function Tooltip({ content, rich, title, actionLabel, onAction, placement, children, className, }: TooltipProps): react_jsx_runtime.JSX.Element;

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
 * M3 Banner — a prominent, screen-wide message at the top of a screen section
 * with optional icon and text action buttons. Per the official spec the
 * container has square corners (shape none) and full width, and the action row
 * sits below the content above a divider, end-aligned (official reference
 * implementation), on surface-container-low.
 */
declare function Banner({ icon, text, actions, open, onClose, fullWidth, className, }: BannerProps): react_jsx_runtime.JSX.Element;

interface DialogProps {
    open: boolean;
    /** Scrim click + Escape + close handling; ignored when dismissible is false. */
    onClose?: () => void;
    /** Leading Material Symbol centered above the headline. */
    icon?: string;
    headline?: string;
    /** Dialog body content. */
    children?: React.ReactNode;
    /** Row of action buttons, right-aligned with the official 8dp gap. */
    actions?: React.ReactNode;
    /** Edge-to-edge full screen variant. */
    fullscreen?: boolean;
    /** Allow Escape and scrim-tap dismissal. Default true. */
    dismissible?: boolean;
    className?: string;
}
/**
 * M3 Dialog — a modal window that blocks the page underneath with a 32%
 * scrim. Basic dialogs center on screen on surface-container-high with
 * 28dp corners, elevation 3 and the official 280–560dp width range;
 * fullscreen dialogs cover the viewport edge-to-edge. The headline and
 * body are wired via aria-labelledby / aria-describedby, focus is trapped
 * inside while open, Escape/scrim dismiss when dismissible, and focus
 * returns to the triggering element on close.
 */
declare function Dialog({ open, onClose, icon, headline, children, actions, fullscreen, dismissible, className, }: DialogProps): react_jsx_runtime.JSX.Element;

type DividerInset = "none" | "start" | "middle" | "end";
type DividerColor = "outline" | "outline-variant";
type DividerOrientation = "horizontal" | "vertical";
interface DividerProps {
    /**
     * Inset. Horizontal "start" uses the official M3 list divider insets:
     * 16dp left / 24dp right (M3 lists specs). "middle" = 16dp equal indents
     * (M3 divider guideline: inset dividers are equally indented by default);
     * "end" is a library extension. Default "none" (full-bleed).
     */
    inset?: DividerInset;
    /** Stroke thickness in px. Default 1 (official 1dp). */
    thickness?: number;
    color?: DividerColor;
    orientation?: DividerOrientation;
    className?: string;
}
/**
 * M3 Divider — a 1dp line that groups content in lists and layouts.
 * Supports start/middle/end insets and a vertical orientation.
 */
declare function Divider({ inset, thickness, color, orientation, className, }: DividerProps): react_jsx_runtime.JSX.Element;

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
}
/**
 * M3 Expressive Card — a 12dp-corner containment surface (M3 shape.medium;
 * pass shape="extraLarge" for 28dp M3E hero cards).
 * Interactive cards morph to the pressed shape (medium → small) and scale
 * to 97% with the signature expressive spring, lift to elevation 2 on
 * hover and emit a ripple (state layer 8% hover / 10% pressed).
 */
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
    /**
     * Full-width dividers between rows (divide-y). The official list divider
     * inset is 16dp start / 24dp end (M3 lists spec) — for inset dividers use
     * <Divider inset="start" /> in flow layouts instead.
     */
    dividers?: boolean;
    children?: React.ReactNode;
}
/**
 * M3 List — a vertical collection of ListItem rows.
 * Long lists scroll with the thin m3-scroll styling.
 */
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
    /** Leading slot — a 24px MaterialSymbol or an avatar */
    leading?: React.ReactNode;
    /** Trailing text, e.g. metadata ("128") */
    trailing?: React.ReactNode;
    /** Trailing Material Symbol name (shortcut for trailing icon) */
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
interface BottomSheetProps {
    open: boolean;
    onClose: () => void;
    /** "modal" overlays a 32% scrim; "standard" renders inline without a scrim (open ignored) */
    variant?: BottomSheetVariant;
    title?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    /** Max height of the sheet (default "calc(100dvh - 72px)" — official 72dp top margin) */
    maxHeight?: string;
    className?: string;
}
/**
 * M3 Bottom Sheet — a surface anchored to the bottom edge with a 32×4dp
 * drag handle (22dp from the top). Container is surface-container-low with
 * 28dp top corners at elevation 1, spanning full width up to 640dp.
 * Modal sheets fade the official 32% black scrim, spring up with the
 * default spatial spring, support drag-to-dismiss (pull > 120px or fast
 * downward fling), close on Escape, lock body scroll, trap Tab focus and
 * restore focus to the trigger on close. Standard sheets render inline
 * without a scrim.
 */
declare const BottomSheet: React.ForwardRefExoticComponent<BottomSheetProps & React.RefAttributes<HTMLDivElement>>;

type SideSheetSide = "left" | "right";
type SideSheetVariant = "modal" | "standard";
interface SideSheetProps {
    open: boolean;
    onClose: () => void;
    /** Edge the sheet is anchored to (default "right") */
    side?: SideSheetSide;
    /** "modal" overlays a 32% scrim; "standard" renders inline on surface (open ignored) */
    variant?: SideSheetVariant;
    title?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    /** Panel width in px (default 360; official max-width 400dp) */
    width?: number;
    className?: string;
}
/**
 * M3 Side Sheet — a secondary surface anchored to the left or right edge
 * with the official 16dp radius on the inner (docked) edge only — the
 * corners touching the screen edge stay square. Modal sheets slide in over
 * a 32% scrim at elevation 1 with the default spatial spring, close on
 * Escape, lock body scroll, trap Tab focus and restore focus to the
 * trigger on close; standard sheets render inline as a persistent
 * surface-toned panel with no scrim. Content padding is 24dp with 12dp
 * between top elements.
 */
declare const SideSheet: React.ForwardRefExoticComponent<SideSheetProps & React.RefAttributes<HTMLDivElement>>;

type TextFieldVariant = "filled" | "outlined";
type TextFieldSize = "xs" | "sm" | "md" | "lg";
interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    variant?: TextFieldVariant;
    size?: TextFieldSize;
    label?: string;
    helperText?: string;
    error?: boolean;
    /** Leading Material Symbol name */
    leadingIcon?: string;
    /** Trailing Material Symbol name (overridden by the error icon) */
    trailingIcon?: string;
    fullWidth?: boolean;
}
/**
 * M3 Text field — outlined (default) and filled containers with the
 * floating label animation (label docks into the outlined border gap
 * or rises inside the filled container, on the fast spatial spring).
 */
declare const TextField: React.ForwardRefExoticComponent<TextFieldProps & React.RefAttributes<HTMLInputElement>>;

type SearchBarSize = "sm" | "md" | "lg";
interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    size?: SearchBarSize;
    /** Leading Material Symbol name (defaults to "search") */
    leadingIcon?: string;
    /** Trailing inline icon buttons, as Material Symbol names */
    trailingIcons?: string[];
    /** Called when the user presses Enter */
    onSubmit?: () => void;
    fullWidth?: boolean;
    disabled?: boolean;
}
/**
 * M3 Search bar — a rounded-full pill that elevates and lightens its
 * surface when focused. Enter triggers `onSubmit`.
 */
declare const SearchBar: React.ForwardRefExoticComponent<SearchBarProps & React.RefAttributes<HTMLInputElement>>;

type SearchViewMode = "full-screen" | "docked";
interface SearchViewProps {
    /** Whether the search view is shown. */
    open: boolean;
    /** Called when the view requests to open or close (Escape, leading icon). */
    onOpenChange: (open: boolean) => void;
    /** `full-screen` covers the viewport as a modal dialog; `docked` renders inline above its results. */
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
     * Results content below the divider. Rendered whenever recent-search
     * suggestions are not shown (i.e. the query is non-empty, or no
     * `recentSearches` were provided).
     */
    children?: React.ReactNode;
    /** Focus the query input when the full-screen view opens. Default true (full-screen only). */
    autoFocus?: boolean;
    className?: string;
}
/**
 * M3 Search view — the expanded companion of the search bar: a persistent,
 * full-width search surface for larger, richer search that expands over the
 * UI (m3.material.io/components/search-view).
 *
 * The 56dp input row sits on surface-container-high with a 1dp
 * outline-variant divider below it (the official full-bleed treatment;
 * elevation stays 0 because the view replaces the surface). While the query
 * is empty, recent-search suggestion rows are shown — leading history icon,
 * label-large text, optional per-row close — and are keyboard navigable
 * (ArrowUp/ArrowDown walk an active index, Enter selects, via
 * aria-activedescendant). In "full-screen" mode the view covers the viewport
 * as a modal dialog (role="dialog" aria-modal, focus trapped inside and
 * restored to the trigger on close, Escape closes, body scroll locks); in
 * "docked" mode it renders inline above its results. The query input is the
 * forwarded ref target.
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
declare const SearchView: React.ForwardRefExoticComponent<SearchViewProps & React.RefAttributes<HTMLInputElement>>;

interface AutocompleteProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    className?: string;
}
/**
 * M3 Autocomplete — an outlined text field that suggests options from a
 * filterable dropdown menu. Supports full keyboard navigation
 * (ArrowUp/ArrowDown/Enter/Escape) and outside-click dismissal.
 */
declare const Autocomplete: React.ForwardRefExoticComponent<AutocompleteProps & React.RefAttributes<HTMLInputElement>>;

interface CheckboxProps {
    checked?: boolean;
    indeterminate?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    error?: boolean;
    className?: string;
}
/**
 * M3 Checkbox — a 48px touch target with an 18px rounded box.
 * The checkmark draws itself via animated `pathLength` on the
 * expressive spring; indeterminate shows a white dash.
 */
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLButtonElement>>;

interface RadioProps {
    checked?: boolean;
    onChange?: () => void;
    label?: string;
    disabled?: boolean;
    /** Applies the error color to the ring and inner dot. */
    error?: boolean;
    className?: string;
}
/**
 * M3 Radio button — a 48px touch target with a 20px ring (2dp stroke) and
 * a 10dp inner dot that springs in (scale 0 → 1) on the expressive spring
 * when selected. Wrap a set of Radios in `RadioGroup` for roving arrow-key
 * navigation.
 */
declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLButtonElement>>;
interface RadioGroupProps {
    /** Accessible name for the group (rendered as aria-label on role="radiogroup"). */
    label?: string;
    className?: string;
    children?: React.ReactNode;
}
/**
 * M3 Radio group — a `role="radiogroup"` wrapper that adds the official
 * radio keyboard behavior: ArrowUp/ArrowLeft move to (and select) the
 * previous enabled radio, ArrowDown/ArrowRight the next, wrapping around.
 */
declare function RadioGroup({ label, className, children }: RadioGroupProps): react_jsx_runtime.JSX.Element;

interface SwitchProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}
/**
 * M3 Switch — 52×32 track with a thumb that grows 16 → 24px and slides
 * on the default spatial spring. Pressing squashes the thumb to 28px.
 * The checked thumb shows an on-primary "check" glyph.
 */
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    /** Shows tick dots at each step on the inactive track */
    discrete?: boolean;
    /** Shows the value bubble while hovering or dragging */
    showValueLabel?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    className?: string;
}
/**
 * M3 Expressive slider — a thick 16px track with the signature tall thin
 * handle (4×44dp) that widens to 6dp while engaged, and 4dp on-surface stop
 * indicator dots (one at the track end; one per step when `discrete`).
 * Pointer-driven with full keyboard support (arrows ±step, PageUp/PageDown
 * ±10 steps, Home/End) and an optional value bubble. The interactive row is
 * 48dp tall to satisfy the touch-target guideline.
 */
declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLDivElement>>;

type ChipVariant = "assist" | "filter" | "input" | "suggestion";
type ChipSize = "xs" | "sm" | "md";
interface ChipProps {
    variant?: ChipVariant;
    selected?: boolean;
    onSelect?: (selected: boolean) => void;
    /** Input chips: renders a trailing cancel affordance */
    onRemove?: () => void;
    leadingIcon?: string;
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
 */
declare const Chip: React.ForwardRefExoticComponent<ChipProps & React.RefAttributes<HTMLButtonElement>>;

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
    /** primary = 64dp icon+label columns with a sliding 3dp underline sized to the label text; secondary = 48dp expressive tonal pill row */
    variant?: "primary" | "secondary";
    /** Stretch to the container width and distribute tabs equally */
    fullWidth?: boolean;
    className?: string;
}
/**
 * M3 Tabs — organize content across different screens, data sets and interactions.
 * Primary tabs are the official 64dp icon+label columns with a 3dp active
 * indicator — a shared-layout underline sized to the measured label text width
 * (ResizeObserver + document.fonts.ready); secondary tabs are the 48dp Expressive
 * tonal pill row. Horizontally scrollable when tabs overflow — per spec,
 * leading/trailing scroll arrows appear while content overflows in that
 * direction. Roving tabindex with ArrowLeft/Right/Home/End (automatic
 * activation) follows the WAI-ARIA tabs pattern.
 */
declare function Tabs({ items, value, onChange, variant, fullWidth, className, }: TabsProps): react_jsx_runtime.JSX.Element;

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
    className?: string;
}
/**
 * M3 Navigation Bar — primary app navigation for small screens.
 * Fixed 80dp bar; the active destination gets a tonal pill that springs
 * between icons via a shared layout transition (layoutId).
 * Accepts 3–5 destinations.
 */
declare function NavigationBar({ items, value, onChange, fullWidth, className, }: NavigationBarProps): react_jsx_runtime.JSX.Element;

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
    /** modal slides over a scrim; standard is a static inline panel — both 360dp wide per the M3 spec */
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
 * Official container: 360dp wide, surface-container-low, 16dp trailing
 * corners; 56dp full-width pill items (active = secondary-container).
 * The modal variant slides in from the left over a 32% scrim, traps focus,
 * and closes on Escape / scrim click / destination select (focus returned on
 * close). The standard variant is a static inline panel.
 */
declare function NavigationDrawer({ items, value, onChange, variant, open, onClose, header, footer, fullHeight, className, }: NavigationDrawerProps): react_jsx_runtime.JSX.Element;

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
    /** Draw a hinge/fold divider along the leading edge (foldable devices) */
    foldingLine?: boolean;
    className?: string;
}
/**
 * M3 Navigation Rail — side navigation for medium/extended screens
 * (tablets, foldables). 80dp vertical bar with an optional header slot
 * (commonly a FAB); the active destination pill springs between items
 * via a shared layout transition (layoutId).
 */
declare function NavigationRail({ items, value, onChange, header, menuIcon, onMenuClick, foldingLine, className, }: NavigationRailProps): react_jsx_runtime.JSX.Element;

type TopAppBarVariant = "small" | "center" | "medium" | "large";
interface TopAppBarAction {
    icon: string;
    label?: string;
    onClick?: () => void;
}
interface TopAppBarProps {
    title: string;
    variant?: TopAppBarVariant;
    actions?: TopAppBarAction[];
    onBack?: () => void;
    /** Scroll container to observe; defaults to the window. */
    scrollTargetRef?: React.RefObject<HTMLElement | null>;
    fullWidth?: boolean;
    className?: string;
}
/**
 * M3 Top App Bar — all four official variants (small, center-aligned,
 * medium flexible, large flexible). On scroll, the bar gains a surface
 * container background + elevation; medium/large titles collapse from the
 * big bottom position into the 64dp top row with a spring height animation.
 */
declare function TopAppBar({ title, variant, actions, onBack, scrollTargetRef, fullWidth, className, }: TopAppBarProps): react_jsx_runtime.JSX.Element;

interface BottomAppBarAction {
    icon: string;
    label?: string;
    onClick?: () => void;
}
type BottomAppBarNavigationIcon = BottomAppBarAction;
interface BottomAppBarFab {
    icon: string;
    onClick?: () => void;
}
interface BottomAppBarProps {
    /** Leading navigation icon (official anatomy item; typically the hamburger/menu affordance) */
    navigationIcon?: BottomAppBarNavigationIcon;
    actions?: BottomAppBarAction[];
    /** Trailing Material Symbol icon names */
    trailingIcons?: string[];
    /** Center-docked FAB that notches the bar */
    fab?: BottomAppBarFab;
    fullWidth?: boolean;
    className?: string;
}
/**
 * M3 Bottom App Bar — primary navigation and key actions at the bottom of
 * small screens. 80dp surface-container bar with leading actions, trailing
 * icons and an optional center-docked FAB that notches the top edge and
 * morphs its corner shape on press (M3 Expressive).
 */
declare function BottomAppBar({ navigationIcon, actions, trailingIcons, fab, fullWidth, className, }: BottomAppBarProps): react_jsx_runtime.JSX.Element;

interface ToolbarIconItem {
    icon: string;
    label?: string;
    onClick?: () => void;
    active?: boolean;
}
type ToolbarVariant = "floating" | "dockable";
type ToolbarColor = "surface" | "primary" | "secondary" | "tertiary";
interface ToolbarProps {
    icons: ToolbarIconItem[];
    variant?: ToolbarVariant;
    /** Container color role (maps to the matching container + on-container colors) */
    color?: ToolbarColor;
    /** Floating placement inside a positioned ancestor */
    position?: "top" | "bottom";
    /** Pill width for the floating variant (px) */
    width?: number;
    fullWidth?: boolean;
    /** Dockable variant: square corners + elevation 1 when docked, pill otherwise */
    docked?: boolean;
    className?: string;
}
/**
 * M3 Expressive Toolbar — NEW in 2025. A compact pill of contextual actions.
 * Floating variant hovers over content (top/bottom, centered); dockable
 * variant morphs between a floating pill and a square, docked full-width bar.
 */
declare function Toolbar({ icons, variant, color, position, width, fullWidth, docked, className, }: ToolbarProps): react_jsx_runtime.JSX.Element;

type MenuItemType = "item" | "divider" | "label";
interface MenuItemData {
    type?: MenuItemType;
    label?: string;
    icon?: string;
    shortcut?: string;
    disabled?: boolean;
    destructive?: boolean;
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
    className?: string;
}
/**
 * M3 Menu — transient surface showing a list of choices on a temporary
 * surface. Anchors to its trigger, springs open from the top origin
 * (fastVisual scale), and closes on item click, outside press, or Escape.
 * Official container: 4dp corners, surface-container, elevation 2, 8dp
 * vertical padding around 48dp items with 24dp leading icons in a 12dp
 * gutter. ARIA: role=menu/menuitem on the panel with aria-haspopup/expanded
 * on the trigger; ArrowUp/Down/Home/End move focus, Escape/Tab close and
 * return focus to the trigger.
 */
declare function Menu({ trigger, items, open, onOpenChange, placement, className, }: MenuProps): react_jsx_runtime.JSX.Element;

interface DatePickerProps {
    /** Currently selected date */
    value?: Date;
    onChange?: (d: Date) => void;
    /** Earliest selectable date (days before are disabled) */
    minDate?: Date;
    /** Latest selectable date (days after are disabled) */
    maxDate?: Date;
    /**
     * 'inline' (default): the embedded rounded-[28px] calendar panel.
     * 'modal': the official M3 modal date picker — 328×512dp portrait /
     * 568×368dp landscape dialog on surface-container-high (elevation 3,
     * 28dp corners) over a 32% scrim, with a selected-date header
     * ("Selected date" label-large + display-size headline). Controlled via
     * open/onOpenChange like Dialog; selection applies live and no action
     * buttons are shown.
     */
    presentation?: "inline" | "modal";
    /** Modal only — controls visibility (fully controlled, Dialog/SearchView style). */
    open?: boolean;
    /** Modal only — called with the next open state on scrim click, Escape, or day pick. */
    onOpenChange?: (open: boolean) => void;
    /** Modal only — close automatically when a day is picked. Default true. */
    closeOnSelect?: boolean;
    /** Inline only: stretch to the container width */
    fullWidth?: boolean;
    className?: string;
}
/**
 * M3 Date Picker.
 *
 * Inline presentation — a rounded-[28px] surface-container-high panel
 * with a month grid, a tappable "month year" header that flips into a
 * 4-column year grid (1988 → current year + 10), today outlined in
 * primary, and a spring-animated selection pill shared via layoutId
 * (scoped per instance). The grid exposes ARIA grid roles with roving
 * tabindex and arrow-key day navigation (←/→/↑/↓), Home/End for week
 * start/end. Nav chevrons are 48dp targets.
 *
 * Modal presentation (presentation="modal") — the official M3 date
 * picker dialog: 328×512dp portrait (header stacked on top of the
 * calendar, divider between) / 568×368dp landscape (header as a 168dp
 * vertically-centered left column) at viewport ≥ 600px, 32% scrim,
 * spring scale 0.9→1 + fade entry (mirrored exit), live-applied
 * selection with no action buttons, Escape/scrim dismissal, focus trap
 * with initial focus on the selected/today day and restore to the
 * opener, body scroll lock, and the same ARIA-grid calendar internals.
 * The forwardRef lands on the inline root / the modal dialog panel.
 */
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
    onChange?: (t: TimePickerValue) => void;
    /**
     * 24-hour format: the readout shows 0–23 and the dial switches to the
     * official double-ring clock face — outer ring 00–11, inner ring 12–23.
     */
    use24h?: boolean;
    /** Stretch to the container width */
    fullWidth?: boolean;
    className?: string;
}
/**
 * M3 clock-face Time Picker — official dial geometry (androidx material3
 * TimePickerTokens): 256dp clock face on surface-container-highest, 48dp
 * primary selection handle with 8dp center dot and 2dp track. The picker
 * container is surface-container-high at elevation level 3. The digital
 * readout uses the official 96×80dp time-selector segments (8dp corners,
 * display-large labels; active segment on primary-container, inactive on
 * surface-container-highest) and the vertical 52×80dp period selector has
 * a 1dp outline with the active option on tertiary-container. Hour numbers
 * sit on a 12-number ring (AM/PM preserved), minute marks map to n×5 with
 * 48px hit areas; arrows on the dial increment/decrement hour/minute and
 * picking an hour auto-advances to minute editing after 600ms. In 24-hour
 * mode the dial becomes the official double-ring face: outer ring 00–11
 * (00 at top, 06 at bottom), inner ring 12–23 (12 at top, 18 at bottom) at
 * the official 101dp/69dp radii, with the selection handle traveling between
 * rings (hours 12–23 on the inner ring) and a small dot marking the same
 * clock position on the opposite ring.
 */
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
declare function Ripple({ className, disabled }: RippleProps): react_jsx_runtime.JSX.Element;

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

export { Autocomplete, type AutocompleteProps, Badge, type BadgeProps, Banner, type BannerProps, BottomAppBar, type BottomAppBarProps, BottomSheet, type BottomSheetProps, Button, ButtonGroup, type ButtonGroupProps, type ButtonProps, type ButtonSize, type ButtonVariant, Card, type CardProps, Checkbox, type CheckboxProps, Chip, type ChipProps, CircularProgress, type CircularProgressProps, DatePicker, type DatePickerProps, Dialog, type DialogProps, Divider, type DividerProps, ExtendedFab, type ExtendedFabProps, Fab, FabMenu, type FabMenuDockTarget, type FabMenuProps, type FabProps, IconButton, type IconButtonProps, LinearProgress, type LinearProgressProps, List, ListItem, type ListItemProps, type ListProps, LoadingIndicator, type LoadingIndicatorProps, type M3Category, type M3ColorScheme, type M3ComponentMeta, type M3Guidelines, type M3Registry, type M3RegistryEntry, type M3Spring, type M3ThemeDef, MaterialSymbol, type MaterialSymbolProps, Menu, type MenuItemData, type MenuProps, NavigationBar, type NavigationBarProps, NavigationDrawer, type NavigationDrawerProps, NavigationRail, type NavigationRailProps, type PaletteColor, type PropDoc, Radio, RadioGroup, type RadioGroupProps, type RadioProps, Ripple, type RippleProps, SearchBar, type SearchBarProps, SearchView, type SearchViewMode, type SearchViewProps, SegmentedButton, type SegmentedButtonProps, SideSheet, type SideSheetProps, Slider, type SliderProps, Snackbar, type SnackbarProps, SplitButton, type SplitButtonProps, Switch, type SwitchProps, Tabs, type TabsProps, TextField, type TextFieldProps, TimePicker, type TimePickerProps, type TimePickerValue, Toolbar, type ToolbarProps, Tooltip, type TooltipProps, TopAppBar, type TopAppBarProps, autocompleteMeta, badgeMeta, bannerMeta, bottomAppBarMeta, bottomSheetMeta, buttonGroupMeta, buttonMeta, cardMeta, categoryLabels, checkboxMeta, chipMeta, circularProgressMeta, colorRoles, colorVar, datePickerMeta, defaultThemeId, dialogMeta, dividerMeta, durations, easings, elevations, extendedFabMeta, fabMenuMeta, fabMeta, getComponent, getComponentsByCategory, getTheme, iconButtonMeta, linearProgressMeta, listMeta, loadingIndicatorMeta, m3Registry, m3Themes, menuMeta, navigationBarMeta, navigationDrawerMeta, navigationRailMeta, radioMeta, schemeToCssVars, searchBarMeta, searchComponents, searchViewMeta, segmentedButtonMeta, shapeMorph, shapes, sideSheetMeta, sliderMeta, snackbarMeta, splitButtonMeta, springs, stateOpacities, switchMeta, tabsMeta, textFieldMeta, themeIds, timePickerMeta, toolbarMeta, tooltipMeta, topAppBarMeta, typeScale };
