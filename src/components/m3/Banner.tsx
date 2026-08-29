"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/m3/tokens";
import type { M3Spring } from "@/lib/m3/tokens";
import { MaterialSymbol } from "./MaterialSymbol";

/** tokens.ts `satisfies` widens spring `type` to string; narrow for framer-motion. */
const asTransition = (s: M3Spring): Transition => s as Transition;

export interface BannerAction {
  label: string;
  onClick?: () => void;
}

export interface BannerProps {
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
// Dismiss-on-click banner — Base UI Collapsible adds no value for this shape
/** Material 2 and Flutter banner compatibility extension. @see https://m2.material.io/components/banners */
export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  function Banner(
    {
      icon,
      text,
      actions,
      open = true,
      onClose,
      fullWidth = false,
      className,
    },
    ref,
  ) {
  const reduceMotion = useReducedMotion() ?? false;
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          ref={ref}
          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={
            reduceMotion
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : asTransition(springs.defaultSpatial)
          }
          className={cn("overflow-hidden", fullWidth && "w-full", className)}
        >
          <div
            data-material-extension="m2-banner"
            className="bg-m3-surface-container-low"
          >
            <div className="flex items-start gap-4 px-4 py-3">
              {icon && (
                <MaterialSymbol
                  icon={icon}
                  size={24}
                  className="shrink-0 text-m3-on-surface-variant"
                />
              )}
              <p className="md-body-medium flex-1 text-m3-on-surface">{text}</p>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Dismiss banner"
                  className="m3-state flex size-9 shrink-0 items-center justify-center rounded-full text-m3-on-surface-variant"
                >
                  <MaterialSymbol icon="close" size={20} />
                </button>
              )}
            </div>
            {actions && actions.length > 0 && (
              <div className="flex min-h-[52px] flex-wrap items-center justify-end gap-2 border-t border-m3-outline-variant px-2 py-1">
                {actions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    onClick={action.onClick}
                    className="m3-state md-label-large flex h-10 items-center rounded-full px-3 text-m3-primary"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    );
  },
);

Banner.displayName = "Banner";

export { bannerMeta } from "@/lib/m3/meta";
