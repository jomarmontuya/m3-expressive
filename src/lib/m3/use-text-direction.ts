"use client";

import * as React from "react";

export type TextDirection = "ltr" | "rtl";

/**
 * Keep direction-aware JavaScript behavior in sync with an element's resolved
 * direction. Omitting the ref preserves document-level behavior.
 */
export function useTextDirection(elementRef?: React.RefObject<HTMLElement | null>): TextDirection {
  const [direction, setDirection] = React.useState<TextDirection>("ltr");

  React.useLayoutEffect(() => {
    const root = elementRef?.current ?? document.documentElement;
    const updateDirection = () => {
      setDirection(getComputedStyle(root).direction === "rtl" ? "rtl" : "ltr");
    };

    updateDirection();
    const observer = new MutationObserver(updateDirection);
    observer.observe(document.documentElement, {
      subtree: true,
      attributes: true,
      attributeFilter: ["dir", "class", "style"],
    });
    return () => observer.disconnect();
  });

  return direction;
}
