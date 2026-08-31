/**
 * MATERIAL 3 EXPRESSIVE — LIBRARY CONTRACT TYPES
 *
 * Component metadata powers the docs showcase and generated shadcn registry.
 */

export type M3Category =
  | "actions"
  | "communication"
  | "containment"
  | "selection"
  | "textinput"
  | "navigation";

export const categoryLabels: Record<M3Category, string> = {
  actions: "Actions",
  communication: "Communication",
  containment: "Containment",
  selection: "Selection",
  textinput: "Text input",
  navigation: "Navigation",
};

export interface PropDoc {
  /** Prop name, e.g. "variant" */
  name: string;
  /** TypeScript type as a readable string, e.g. "'filled' | 'tonal' | 'outlined'" */
  type: string;
  /** Default value as string, e.g. "'filled'" */
  default?: string;
  /** What the prop does */
  description: string;
}

export interface M3Guidelines {
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
export type M3SpecStatus =
  | "material-3"
  | "material-3-expressive"
  | "material-3-and-expressive"
  | "extension";

/** Pinned source sets used when a live Material page needs implementation detail. */
export type M3SpecReferenceId =
  | "androidx-compose-material3"
  | "material-web"
  | "flutter-material"
  | "base-ui-react";

export interface M3ComponentSpec {
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

export interface M3ComponentMeta {
  /** kebab-case id, e.g. "button" */
  id: string;
  /** PascalCase display name, e.g. "Button" */
  name: string;
  category: M3Category;
  /** One-sentence official-style description */
  description: string;
  /** Required audited Material traceability record. */
  spec: M3ComponentSpec;
  /** Direct local import used in examples */
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

export interface M3RegistryEntry extends M3ComponentMeta {
  /** File path of the component implementation */
  file: string;
}

export interface M3Registry {
  library: "m3-expressive";
  version: string;
  description: string;
  spec: string;
  totalCount: number;
  categories: M3Category[];
  components: M3RegistryEntry[];
}
