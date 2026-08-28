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

export interface M3ComponentMeta {
  /** kebab-case id, e.g. "button" */
  id: string;
  /** PascalCase display name, e.g. "Button" */
  name: string;
  category: M3Category;
  /** One-sentence official-style description */
  description: string;
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

export interface M3RegistryEntry extends M3ComponentMeta {
  /** File path of the component implementation */
  file: string;
}

export interface M3Registry {
  library: "m3-expressive-react";
  version: string;
  description: string;
  spec: string;
  totalCount: number;
  categories: M3Category[];
  components: M3RegistryEntry[];
}
