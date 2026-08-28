"use client";

import * as React from "react";

/**
 * M3 theme controller — manages BOTH axes of the Material 3 theme:
 *
 * 1. Color scheme (curated themes from src/lib/m3/themes.ts)
 *    → applied as `<html data-theme="…">` (baseline = attribute removed)
 * 2. Light/dark mode ("light" | "dark" | "system")
 *    → applied as the `.dark` class on <html>
 *
 * Both persist to localStorage and are mirrored by the no-flash inline
 * script in src/app/layout.tsx. When mode === "system" the hook follows
 * the user's prefers-color-scheme, including live OS changes.
 */

export type M3Mode = "light" | "dark" | "system";
export type M3LegacyTheme = "light" | "dark";

const COLOR_KEY = "m3-color-theme";
const MODE_KEY = "m3-mode";

export function applyColorTheme(id: string) {
  const html = document.documentElement;
  if (!id || id === "baseline") html.removeAttribute("data-theme");
  else html.setAttribute("data-theme", id);
}

export function resolveDark(mode: M3Mode): boolean {
  if (typeof window === "undefined") return false;
  if (mode === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return mode === "dark";
}

export function applyMode(mode: M3Mode): boolean {
  const dark = resolveDark(mode);
  document.documentElement.classList.toggle("dark", dark);
  return dark;
}

export interface UseM3ThemeResult {
  /** Active curated color scheme id ("baseline" | "ocean" | "emerald" | "coral"). */
  colorTheme: string;
  setColorTheme: (id: string) => void;
  /** Active mode preference ("light" | "dark" | "system"). */
  mode: M3Mode;
  setMode: (mode: M3Mode) => void;
  /** Resolved dark state (mode === "system" follows the OS). */
  isDark: boolean;
  /** Legacy helpers kept for convenience. */
  theme: M3LegacyTheme;
  toggle: () => void;
}

export function useM3Theme(): UseM3ThemeResult {
  const [colorTheme, setColorThemeState] = React.useState("baseline");
  const [mode, setModeState] = React.useState<M3Mode>("system");
  const [isDark, setIsDark] = React.useState(false);

  // Hydrate from localStorage + DOM (the inline script already applied them).
  React.useEffect(() => {
    let storedColor = "baseline";
    let storedMode: M3Mode = "system";
    try {
      storedColor = localStorage.getItem(COLOR_KEY) || "baseline";
      const m = localStorage.getItem(MODE_KEY);
      if (m === "light" || m === "dark" || m === "system") storedMode = m;
    } catch {
      /* private mode */
    }
    setColorThemeState(storedColor);
    setModeState(storedMode);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  // Follow OS changes while mode === "system".
  React.useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setIsDark(applyMode("system"));
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mode]);

  const setColorTheme = React.useCallback((id: string) => {
    applyColorTheme(id);
    try {
      localStorage.setItem(COLOR_KEY, id);
    } catch {
      /* private mode */
    }
    setColorThemeState(id);
  }, []);

  const setMode = React.useCallback((next: M3Mode) => {
    const dark = applyMode(next);
    try {
      localStorage.setItem(MODE_KEY, next);
    } catch {
      /* private mode */
    }
    setModeState(next);
    setIsDark(dark);
  }, []);

  const toggle = React.useCallback(() => {
    setMode(isDark ? "light" : "dark");
  }, [isDark, setMode]);

  return {
    colorTheme,
    setColorTheme,
    mode,
    setMode,
    isDark,
    theme: isDark ? "dark" : "light",
    toggle,
  };
}
