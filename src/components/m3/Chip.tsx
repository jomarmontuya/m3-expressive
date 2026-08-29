'use client';
/* eslint-disable max-lines -- chip variants and delegated group keyboard behavior share one public contract */

import * as React from "react";
import {
  AnimatePresence,
  animate as animateValue,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import type { Transition } from "framer-motion";
import { Toggle } from "@base-ui/react/toggle";
import { Button } from "@base-ui/react/button";
import { cn } from "@/lib/utils";
import { springs as springsTokens } from "@/lib/m3/tokens";
import { useTextDirection } from "@/lib/m3/use-text-direction";
import { Ripple } from "./Ripple";
import { MaterialSymbol } from "./MaterialSymbol";

/** Token springs retyped as framer-motion Transitions (`type` widens to string). */
const springs = springsTokens as { [K in keyof typeof springsTokens]: Transition };

export type ChipVariant = "assist" | "filter" | "input" | "suggestion";
export type ChipSize = "xs" | "sm" | "md";

/** The official M3 chip is 32dp. xs/md are opt-in library extensions. */
const sizeHeights: Record<ChipSize, number> = { xs: 28, sm: 32, md: 40 };

export interface ChipProps {
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
export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  {
    variant = "assist",
    selected = false,
    onSelect,
    onClick,
    onRemove,
    removeLabel = "Remove",
    leadingIcon,
    avatar,
    trailingIcon,
    elevated = false,
    size = "sm",
    disabled = false,
    className,
    children,
  },
  ref
) {
  const reduceMotion = useReducedMotion() ?? false;
  const isInput = variant === "input";
  const isSelectable = variant === "filter";
  const showCheck = selected && isSelectable;
  const selectedContainer = selected && (isSelectable || isInput);
  const hasLeadingContent = showCheck || Boolean(leadingIcon);
  const selectionProgress = useMotionValue(hasLeadingContent ? 1 : 0);
  const leadingSlotWidth = useTransform(selectionProgress, [0, 1], [8, 26]);
  const trailingBalanceWidth = useTransform(selectionProgress, [0, 1], [8, 0]);

  React.useEffect(() => {
    const animation = animateValue(selectionProgress, hasLeadingContent ? 1 : 0, {
      ...(reduceMotion ? { duration: 0 } : springs.fastSpatial),
    });
    return () => animation.stop();
  }, [hasLeadingContent, reduceMotion, selectionProgress]);

  const flatColorClass =
    variant === "assist"
      ? "border-m3-outline-variant bg-transparent text-m3-on-surface"
      : "border-m3-outline-variant bg-transparent text-m3-on-surface-variant";
  const elevatedColorClass =
    variant === "assist"
      ? "border-transparent bg-m3-surface-container-low text-m3-on-surface"
      : "border-transparent bg-m3-surface-container-low text-m3-on-surface-variant";
  const leadingIconClass = selectedContainer
    ? isInput
      ? "text-m3-primary"
      : "text-m3-on-secondary-container"
    : variant === "assist" || variant === "filter" || variant === "suggestion"
      ? "text-m3-primary"
      : "text-m3-on-surface-variant";
  const trailingIconClass = selectedContainer
    ? "text-m3-on-secondary-container"
    : "text-m3-on-surface-variant";

  const visualClassName = cn(
    "relative inline-flex select-none items-center rounded-m3-sm border md-label-large transition-[background-color,border-color,box-shadow] duration-150",
    selectedContainer
      ? "border-transparent bg-m3-secondary-container text-m3-on-secondary-container"
      : elevated
        ? cn(
            "m3-elevation-1 hover:[box-shadow:0_1px_2px_0_rgb(0_0_0/0.30),0_2px_6px_2px_rgb(0_0_0/0.15)]",
            elevatedColorClass
          )
        : flatColorClass,
    disabled && "pointer-events-none opacity-38",
    className
  );
  const interactiveClassName = cn(
    visualClassName,
    "m3-state m3-focus overflow-hidden outline-none",
    isSelectable
      ? "px-2"
      : showCheck || leadingIcon || trailingIcon
        ? "gap-2 px-2"
        : "gap-2 px-4"
  );

  const content = (
    <>
      <Ripple disabled={disabled} />
      {isSelectable ? (
        <motion.span
          aria-hidden="true"
          className="inline-flex shrink-0 items-center justify-start overflow-hidden"
          style={{ width: leadingSlotWidth }}
        >
          <AnimatePresence initial={false} mode="wait">
            {showCheck ? (
              <motion.span
                key="check"
                className="inline-flex shrink-0 items-center text-m3-on-secondary-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={reduceMotion ? { duration: 0 } : springs.fastVisual}
              >
                <MaterialSymbol icon="check" size={18} />
              </motion.span>
            ) : (
              leadingIcon && (
                <motion.span
                  key="leading"
                  className="inline-flex shrink-0 items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={reduceMotion ? { duration: 0 } : springs.fastVisual}
                >
                  <MaterialSymbol icon={leadingIcon} size={18} className={leadingIconClass} />
                </motion.span>
              )
            )}
          </AnimatePresence>
        </motion.span>
      ) : (
        <AnimatePresence initial={false} mode="wait">
          {isInput && avatar != null ? (
          <motion.span
            key="avatar"
            aria-hidden="true"
            className="inline-flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full [&>*]:h-full [&>*]:w-full [&>*]:object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : springs.fastVisual}
          >
            {avatar}
          </motion.span>
          ) : (
            leadingIcon && (
              <motion.span
                key="leading"
                className="inline-flex shrink-0 items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={reduceMotion ? { duration: 0 } : springs.fastVisual}
              >
                <MaterialSymbol icon={leadingIcon} size={18} className={leadingIconClass} />
              </motion.span>
            )
          )}
        </AnimatePresence>
      )}
      <span className="truncate">{children}</span>
      {!isInput && trailingIcon && (
        <MaterialSymbol
          icon={trailingIcon}
          size={18}
          className={cn("shrink-0", isSelectable && "ms-2", trailingIconClass)}
        />
      )}
      {isSelectable && !trailingIcon && (
        <motion.span aria-hidden="true" className="shrink-0" style={{ width: trailingBalanceWidth }} />
      )}
    </>
  );

  const motionProps = {
    whileTap: disabled || reduceMotion ? undefined : ({ scale: 0.96 } as const),
    transition: reduceMotion ? { duration: 0 } : springs.fastVisual,
  };

  if (isInput) {
    return (
      <span
        role="group"
        aria-label={typeof children === "string" ? `${children} input chip` : "Input chip"}
        className={visualClassName}
        style={{ height: sizeHeights[size] }}
      >
        <Button
          ref={ref}
          data-m3-chip=""
          disabled={disabled}
          onClick={onClick}
          className={cn(
            "m3-state m3-focus relative flex h-full min-w-0 flex-1 items-center gap-2 overflow-hidden outline-none",
            avatar != null ? "ps-1" : leadingIcon ? "ps-2" : "ps-4"
          )}
          render={<motion.button {...motionProps} />}
        >
          {content}
        </Button>
        {onRemove && (
          <Button
            type="button"
            data-m3-chip-remove=""
            disabled={disabled}
            aria-label={removeLabel}
            onClick={onRemove}
            className={cn(
              "m3-state m3-focus relative -my-2 -me-2 grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full outline-none transition-colors duration-150",
              trailingIconClass
            )}
          >
            <MaterialSymbol icon="cancel" size={18} />
          </Button>
        )}
      </span>
    );
  }

  if (!isSelectable) {
    return (
      <Button
        ref={ref}
        data-m3-chip=""
        disabled={disabled}
        onClick={onClick}
        className={interactiveClassName}
        style={{ height: sizeHeights[size] }}
        render={<motion.button {...motionProps} />}
      >
        {content}
      </Button>
    );
  }

  return (
    <Toggle
      ref={ref}
      data-m3-chip=""
      pressed={selected}
      onPressedChange={(nextPressed) => onSelect?.(nextPressed)}
      disabled={disabled}
      className={interactiveClassName}
      style={{ height: sizeHeights[size] }}
      render={<motion.button {...motionProps} />}
    >
      {content}
    </Toggle>
  );
});

export interface ChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accessible name for the chip collection. */
  label?: string;
}

/**
 * Keyboard wrapper for a related chip collection. Arrow keys move through
 * chips. Home and End move to the first or last chip. Delete and Backspace
 * activate the focused input chip's remove action.
 */
export const ChipGroup = React.forwardRef<HTMLDivElement, ChipGroupProps>(function ChipGroup(
  { label = "Chips", className, children, onKeyDown, onFocus, ...props },
  ref
) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const direction = useTextDirection(rootRef);
  const setRootRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  const getChips = React.useCallback(
    () =>
      Array.from(rootRef.current?.querySelectorAll<HTMLButtonElement>("button[data-m3-chip]") ?? [])
        .filter((chip) => !chip.disabled),
    []
  );

  React.useLayoutEffect(() => {
    const chips = getChips();
    if (chips.length === 0) return;
    const current = chips.find((chip) => chip.tabIndex === 0) ?? chips[0];
    chips.forEach((chip) => {
      chip.tabIndex = chip === current ? 0 : -1;
    });
  }, [children, getChips]);

  return (
    // A chip group owns the official delegated arrow/removal keyboard contract.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      {...props}
      ref={setRootRef}
      role="group"
      aria-label={label}
      className={cn("flex flex-wrap items-center gap-2", className)}
      onFocus={(event) => {
        const chip = (event.target as HTMLElement).closest<HTMLButtonElement>("button[data-m3-chip]");
        if (chip) getChips().forEach((item) => { item.tabIndex = item === chip ? 0 : -1; });
        onFocus?.(event);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        const chip = (event.target as HTMLElement).closest<HTMLButtonElement>("button[data-m3-chip]");
        if (!chip) return;
        const chips = getChips();
        const index = chips.indexOf(chip);
        let nextIndex: number | undefined;
        const horizontalStep = event.key === "ArrowRight" ? (direction === "rtl" ? -1 : 1) : event.key === "ArrowLeft" ? (direction === "rtl" ? 1 : -1) : 0;
        if (horizontalStep !== 0) nextIndex = (index + horizontalStep + chips.length) % chips.length;
        if (event.key === "ArrowDown") nextIndex = (index + 1) % chips.length;
        if (event.key === "ArrowUp") nextIndex = (index - 1 + chips.length) % chips.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = chips.length - 1;
        if (nextIndex !== undefined) {
          event.preventDefault();
          chips[nextIndex]?.focus();
          return;
        }
        if (event.key !== "Delete" && event.key !== "Backspace") return;
        const group = chip.closest<HTMLElement>('[role="group"]');
        const remove = group?.querySelector<HTMLButtonElement>("button[data-m3-chip-remove]");
        if (!remove) return;
        event.preventDefault();
        remove.click();
        requestAnimationFrame(() => {
          const remaining = getChips();
          remaining[Math.min(index, remaining.length - 1)]?.focus();
        });
      }}
    >
      {children}
    </div>
  );
});

ChipGroup.displayName = "ChipGroup";

export { chipMeta } from "@/lib/m3/meta";
