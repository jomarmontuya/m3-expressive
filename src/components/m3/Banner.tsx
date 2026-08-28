"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
 * M3 Banner — a prominent, dismissible surface-displayed message at the top of
 * a screen section, with optional icon and text action buttons.
 */
export function Banner({
  icon,
  text,
  actions,
  open = true,
  onClose,
  fullWidth = false,
  className,
}: BannerProps) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={asTransition(springs.defaultSpatial)}
          className={cn("overflow-hidden", fullWidth && "w-full", className)}
        >
          <div className="rounded-lg bg-m3-surface-container-low">
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
                  className="m3-state shrink-0 rounded-full p-1 text-m3-on-surface-variant"
                >
                  <MaterialSymbol icon="close" size={20} />
                </button>
              )}
            </div>
            {actions && actions.length > 0 && (
              <div className="flex flex-wrap items-center justify-end gap-2 border-t border-m3-outline-variant px-2 py-1">
                {actions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    onClick={action.onClick}
                    className="m3-state md-label-large rounded-full px-3 py-2 text-m3-primary"
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
}

export { bannerMeta } from "@/lib/m3/meta";
