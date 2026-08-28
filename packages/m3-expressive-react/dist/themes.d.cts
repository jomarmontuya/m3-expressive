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

export { type M3ColorScheme, type M3ThemeDef, defaultThemeId, getTheme, m3Themes, schemeToCssVars, themeIds };
