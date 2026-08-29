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

export { type M3Category, type M3ComponentMeta, type M3ComponentSpec, type M3Guidelines, type M3Registry, type M3RegistryEntry, type M3SpecReferenceId, type M3SpecStatus, type PropDoc, categoryLabels };
