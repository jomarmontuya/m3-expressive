"use client";

import * as React from "react";

export type M3Theme = "light" | "dark";

/**
 * Lightweight M3 theme controller — toggles the `.dark` class on <html>
 * and persists to localStorage ('m3-theme'), matching the inline script
 * in layout.tsx that prevents flash-of-wrong-theme.
 */
export function useM3Theme() {
  const [theme, setTheme] = React.useState<M3Theme>("light");

  React.useEffect(() => {
    const current = document.documentElement.classList.contains("dark") ? "dark" : "light";
    setTheme(current);
  }, []);

  const apply = React.useCallback((next: M3Theme) => {
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("m3-theme", next);
    } catch {
      /* private mode */
    }
    setTheme(next);
  }, []);

  const toggle = React.useCallback(() => {
    apply(theme === "dark" ? "light" : "dark");
  }, [theme, apply]);

  return { theme, setTheme: apply, toggle };
}
