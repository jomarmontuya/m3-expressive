type M3VariantId = "tonal-spot" | "vibrant" | "expressive" | "content" | "fidelity" | "rainbow" | "fruit-salad";
interface M3VariantDef {
    id: M3VariantId;
    label: string;
    description: string;
}
/** The 7 Dynamic Color variants exposed by the engine (Material Theme Builder styles). */
declare const variantCatalog: M3VariantDef[];
/** All valid variant ids (for validation). */
declare const variantIds: M3VariantId[];
/**
 * Every `--md-*` color role defined in :root of globals.css, in the order they
 * appear there (34 roles). Keys are the role names WITHOUT the `--md-` prefix.
 * All of them have dedicated getters on DynamicScheme (i.e. they are all
 * MaterialDynamicColors roles), so nothing needs hand-mapping from palettes.
 */
declare const schemeRoles: readonly ["primary", "on-primary", "primary-container", "on-primary-container", "secondary", "on-secondary", "secondary-container", "on-secondary-container", "tertiary", "on-tertiary", "tertiary-container", "on-tertiary-container", "error", "on-error", "error-container", "on-error-container", "surface", "on-surface", "surface-variant", "on-surface-variant", "surface-dim", "surface-bright", "surface-container-lowest", "surface-container-low", "surface-container", "surface-container-high", "surface-container-highest", "outline", "outline-variant", "inverse-surface", "inverse-on-surface", "inverse-primary", "scrim", "shadow"];
type M3SchemeRole = (typeof schemeRoles)[number];
type M3SchemeRecord = Record<M3SchemeRole, string>;
interface GeneratedScheme {
    light: M3SchemeRecord;
    dark: M3SchemeRecord;
}
/**
 * Normalize a seed hex string: accepts 3 or 6 digit hex with or without "#"
 * and returns lowercase "#rrggbb". Returns null for anything invalid.
 */
declare function normalizeHex(input: string): string | null;
/** Validate a variant id. Returns null for anything invalid. */
declare function normalizeVariant(input: string): M3VariantId | null;
/** Clamp a contrast level into the 0..1 range (standard → high). */
declare function clampContrast(input: number): number;
/**
 * Generate the full light + dark M3 scheme for a seed color.
 *
 * @param seedHex       Seed color — 3 or 6 digit hex, "#" optional.
 * @param variant       One of the 7 Dynamic Color variants (default "tonal-spot").
 * @param contrastLevel 0 (standard), 0.5 (medium) or 1 (high) — clamped to 0..1.
 * @throws Error with a human-readable message when the seed is invalid.
 */
declare function generateScheme(seedHex: string, variant?: M3VariantId, contrastLevel?: number): GeneratedScheme;
/**
 * Render the generated scheme as the two CSS custom-property blocks used by
 * the custom theme system:
 *   lightBlock → `:root[data-theme="custom"] { … }`
 *   darkBlock  → `[data-theme="custom"].dark { … }`
 */
declare function schemeToCssVars(result: GeneratedScheme): {
    lightBlock: string;
    darkBlock: string;
};
/** The two blocks joined with a newline — convenience for copy-to-clipboard. */
declare function schemeToCssText(result: GeneratedScheme): string;

export { type GeneratedScheme, type M3SchemeRecord, type M3SchemeRole, type M3VariantDef, type M3VariantId, clampContrast, generateScheme, normalizeHex, normalizeVariant, schemeRoles, schemeToCssText, schemeToCssVars, variantCatalog, variantIds };
