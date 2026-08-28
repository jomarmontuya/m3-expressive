import { M3RegistryEntry, M3Category, M3Registry } from './types.cjs';

declare const REGISTRY_VERSION = "1.0.0";
/**
 * The full agentic-compatible registry. Powers /api/registry, /llms.txt
 * and the docs showcase — single source of truth.
 */
declare const m3Registry: M3Registry;
declare function getComponent(id: string): M3RegistryEntry | undefined;
declare function getComponentsByCategory(category: M3Category): M3RegistryEntry[];
declare function searchComponents(query: string): M3RegistryEntry[];

export { REGISTRY_VERSION, getComponent, getComponentsByCategory, m3Registry, searchComponents };
