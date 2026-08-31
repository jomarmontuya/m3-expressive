"use client";

import * as React from "react";
import { getComponent, m3Registry } from "@/lib/m3/registry";
import { categoryLabels, type M3RegistryEntry } from "@/lib/m3/types";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { Chip } from "@/components/m3/Chip";
import { Button } from "@/components/m3/Button";
import { SegmentedButton } from "@/components/m3/SegmentedButton";
import { demoRegistry } from "./demo-registry";
import { CodeBlock } from "./CodeBlock";
import { PropsPlayground } from "./PropsPlayground";
import { getPlaygroundSpec } from "./playground-specs";
import type { Route } from "./Sidebar";

export function ComponentView({
  id,
  code,
  navigate,
}: {
  id: string;
  code?: "source";
  navigate: (r: Route) => void;
}) {
  const meta: M3RegistryEntry | undefined = getComponent(id);
  const Demo = demoRegistry[id];
  const [codeTab, setCodeTab] = React.useState<"usage" | "source">(code === "source" ? "source" : "usage");
  const [importCopied, setImportCopied] = React.useState(false);

  const copyImportLine = async () => {
    if (!meta) return;
    try {
      await navigator.clipboard.writeText(meta.importLine);
    } catch {
      /* clipboard unavailable — the text stays selectable */
    }
    setImportCopied(true);
    setTimeout(() => setImportCopied(false), 1600);
  };

  // Deep links (#/component/<id>/source) and dep-chip jumps land here —
  // honor the route even when only the hash suffix changed (no remount).
  React.useEffect(() => {
    if (code === "source") setCodeTab("source");
  }, [code]);

  if (!meta) {
    return (
      <div className="flex flex-col items-center gap-4 p-16 text-center">
        <MaterialSymbol icon="missing_controller" size={64} className="text-m3-on-surface-variant" />
        <h1 className="md-headline-medium">Component not found</h1>
        <p className="md-body-large text-m3-on-surface-variant">
          No component with id “{id}”.
        </p>
        <Button variant="filled" icon="grid_view" onClick={() => navigate({ kind: "components" })}>
          Browse all components
        </Button>
      </div>
    );
  }

  const siblings = m3SortedIds();
  const idx = siblings.indexOf(meta.id);
  const prev = idx > 0 ? siblings[idx - 1] : undefined;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : undefined;
  const playgroundSpec = getPlaygroundSpec(meta.id);

  // Fully copy-runnable usage snippet: package import (+ hooks import when
  // the example keeps local state) + the example itself.
  const usageCode = (() => {
    const lines: string[] = [];
    if (/React\.useState/.test(meta.exampleCode)) lines.push(`import * as React from "react";`);
    else if (/\buseState\(/.test(meta.exampleCode)) lines.push(`import { useState } from "react";`);
    lines.push(meta.importLine);
    return lines.join("\n") + "\n\n" + meta.exampleCode;
  })();

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 md-label-large">
          <li>
            <button
              onClick={() => navigate({ kind: "components" })}
              className="m3-state m3-focus rounded-full px-2 py-1 text-m3-on-surface-variant hover:text-m3-primary"
            >
              Components
            </button>
          </li>
          <li aria-hidden="true" className="text-m3-on-surface-variant/60">/</li>
          <li>
            <button
              onClick={() => navigate({ kind: "components", cat: meta.category })}
              className="m3-state m3-focus rounded-full px-2 py-1 text-m3-on-surface-variant hover:text-m3-primary"
            >
              {categoryLabels[meta.category]}
            </button>
          </li>
          <li aria-hidden="true" className="text-m3-on-surface-variant/60">/</li>
          <li aria-current="page" className="px-2 py-1 text-m3-primary">{meta.name}</li>
        </ol>
      </nav>
      <div className="mt-1 flex flex-wrap items-center gap-3">
        <h1 className="md-display-small font-semibold text-m3-on-surface">{meta.name}</h1>
        {meta.m3e && (
          <span className="rounded-full bg-m3-tertiary-container px-3 py-1 md-label-medium text-m3-on-tertiary-container">
            New in M3 Expressive
          </span>
        )}
      </div>
      <p className="mt-3 max-w-3xl md-body-large text-m3-on-surface-variant">{meta.description}</p>

      {/* live demo */}
      <section className="mt-8" aria-label="Live demo">
        <h2 className="sr-only">Live demo</h2>
        <div className="rounded-[28px] border border-m3-outline-variant bg-m3-surface-container-lowest">
        <div className="flex items-center justify-between gap-3 rounded-t-[27px] border-b border-m3-outline-variant bg-m3-surface-container-low px-5 py-3">
          <div className="flex items-center gap-2 md-label-medium text-m3-on-surface-variant">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-m3-primary" />
            Live demo — interact with it
          </div>
          <button
            onClick={() => void copyImportLine()}
            title="Copy import line"
            className="m3-state m3-focus flex min-w-0 items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[12px] text-m3-on-surface-variant"
          >
            <MaterialSymbol
              icon={importCopied ? "check" : "content_copy"}
              size={14}
              fill={importCopied}
              className={importCopied ? "shrink-0 text-m3-primary" : "shrink-0"}
            />
            <span className={importCopied ? "shrink-0 text-m3-primary" : "truncate"}>
              {importCopied ? "Copied!" : meta.importLine}
            </span>
          </button>
          <span role="status" aria-live="polite" className="sr-only">
            {importCopied ? "Import line copied to clipboard" : ""}
          </span>
        </div>
        <div className="p-4 sm:p-8">
          {Demo ? (
            <Demo />
          ) : (
            <div className="p-8 text-center md-body-medium text-m3-on-surface-variant">
              Demo coming soon
            </div>
          )}
        </div>
        </div>
      </section>

      {/* props playground (only for components with a PLAYGROUND_SPECS entry) */}
      {playgroundSpec && (
        <section className="mt-8" aria-label="Playground">
          <h2 className="md-title-large text-m3-on-surface">Playground</h2>
          <p className="mt-1 md-body-medium text-m3-on-surface-variant">{playgroundSpec.explainer}</p>
          <PropsPlayground key={meta.id} spec={playgroundSpec} />
        </section>
      )}

      {/* usage + full source code (ShadCN-style: you own the implementation) */}
      <section className="mt-8" aria-label="Code">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="md-title-large">Code</h2>
          <SegmentedButton
            type="single"
            size="sm"
            value={codeTab}
            onValueChange={(v) => {
              if (typeof v === "string" && v !== "") setCodeTab(v as "usage" | "source");
            }}
            options={[
              { value: "usage", label: "Usage" },
              { value: "source", label: "Source" },
            ]}
          />
        </div>
        {codeTab === "usage" ? (
          <CodeBlock code={usageCode} />
        ) : (
          <ComponentSource key={meta.id} id={meta.id} file={meta.file} navigate={navigate} />
        )}
      </section>

      {/* guidelines */}
      <section className="mt-10">
        <h2 className="md-title-large mb-4">Design guidelines</h2>

        <GuidelineBlock title="When to use" icon="lightbulb">
          <ul className="list-disc space-y-1.5 pl-5">
            {meta.guidelines.whenToUse.map((g, i) => (
              <li key={i} className="md-body-medium text-m3-on-surface-variant">{g}</li>
            ))}
          </ul>
        </GuidelineBlock>

        {meta.guidelines.anatomy && (
          <GuidelineBlock title="Anatomy" icon="analytics">
            <ol className="list-decimal space-y-1.5 pl-5">
              {meta.guidelines.anatomy.map((g, i) => (
                <li key={i} className="md-body-medium text-m3-on-surface-variant">{g}</li>
              ))}
            </ol>
          </GuidelineBlock>
        )}

        {meta.guidelines.states && (
          <div className="mt-4">
            <h3 className="mb-2 md-title-medium">States</h3>
            <div className="flex flex-wrap gap-2">
              {meta.guidelines.states.map((s) => (
                <Chip key={s} variant="assist" size="xs">
                  {s}
                </Chip>
              ))}
            </div>
          </div>
        )}

        {(meta.guidelines.dos || meta.guidelines.donts) && (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {meta.guidelines.dos && (
              <div className="rounded-2xl border border-m3-outline-variant bg-m3-surface-container-lowest p-5">
                <h3 className="mb-3 flex items-center gap-2 md-title-medium text-m3-on-surface">
                  <MaterialSymbol icon="check_circle" size={22} fill className="text-[#1b7f4d]" />
                  Do
                </h3>
                <ul className="space-y-2">
                  {meta.guidelines.dos.map((d, i) => (
                    <li key={i} className="flex gap-2 md-body-medium text-m3-on-surface-variant">
                      <MaterialSymbol icon="check" size={18} className="mt-0.5 shrink-0 text-[#1b7f4d]" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {meta.guidelines.donts && (
              <div className="rounded-2xl border border-m3-outline-variant bg-m3-surface-container-lowest p-5">
                <h3 className="mb-3 flex items-center gap-2 md-title-medium text-m3-on-surface">
                  <MaterialSymbol icon="cancel" size={22} fill className="text-m3-error" />
                  Don&apos;t
                </h3>
                <ul className="space-y-2">
                  {meta.guidelines.donts.map((d, i) => (
                    <li key={i} className="flex gap-2 md-body-medium text-m3-on-surface-variant">
                      <MaterialSymbol icon="close" size={18} className="mt-0.5 shrink-0 text-m3-error" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </section>

      {/* props */}
      <section className="mt-10">
        <h2 className="md-title-large mb-4">Props</h2>
        {/* phone: stacked cards — the 4-column table does not fit and horizontal
            scroll hides the type/description. sm+: the classic table. */}
        <div className="space-y-3 sm:hidden">
          {meta.props.map((p) => (
            <div key={p.name} className="rounded-2xl border border-m3-outline-variant bg-m3-surface-container-lowest p-4">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <code className="font-mono text-[13px] font-medium text-m3-primary">{p.name}</code>
                {p.default ? (
                  <code className="rounded-full bg-m3-surface-container-low px-2 py-0.5 font-mono text-[11px] text-m3-on-surface-variant">
                    default: {p.default}
                  </code>
                ) : null}
              </div>
              <p className="mt-1.5 break-words font-mono text-[12px] leading-relaxed text-m3-on-surface">{p.type}</p>
              <p className="mt-2 md-body-medium text-m3-on-surface-variant">{p.description}</p>
            </div>
          ))}
        </div>
        <div className="hidden overflow-x-auto rounded-2xl border border-m3-outline-variant sm:block">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="bg-m3-surface-container-low">
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 md-label-medium text-m3-on-surface-variant">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {meta.props.map((p, i) => (
                <tr key={p.name} className={i % 2 ? "bg-m3-surface-container-lowest/60" : "bg-m3-surface-container-lowest"}>
                  <td className="px-4 py-3 align-top font-mono text-[13px] text-m3-primary">{p.name}</td>
                  <td className="max-w-[300px] break-words px-4 py-3 align-top font-mono text-[12px] text-m3-on-surface">{p.type}</td>
                  <td className="px-4 py-3 align-top font-mono text-[12px] text-m3-on-surface-variant">{p.default ?? "—"}</td>
                  <td className="w-[38%] max-w-[52ch] px-4 py-3 align-top md-body-medium text-m3-on-surface-variant">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* related */}
      {meta.related && meta.related.length > 0 && (
        <section className="mt-10">
          <h2 className="md-title-large mb-4">Related components</h2>
          <div className="flex flex-wrap gap-2">
            {meta.related.map((r) => {
              const rel = getComponent(r);
              if (!rel) return null;
              return (
                <Chip key={r} variant="suggestion" trailingIcon="arrow_forward" onSelect={() => navigate({ kind: "component", id: r })}>
                  {rel.name}
                </Chip>
              );
            })}
          </div>
        </section>
      )}

      {/* prev / next */}
      <div className="mt-12 flex items-center justify-between border-t border-m3-outline-variant pt-6">
        {prev ? (
          <button
            onClick={() => navigate({ kind: "component", id: prev })}
            className="m3-state m3-focus flex items-center gap-2 rounded-full px-4 py-2 text-left md-label-large text-m3-primary"
          >
            <MaterialSymbol icon="arrow_back" size={20} />
            {getComponent(prev)?.name}
          </button>
        ) : <span />}
        {next ? (
          <button
            onClick={() => navigate({ kind: "component", id: next })}
            className="m3-state m3-focus flex items-center gap-2 rounded-full px-4 py-2 text-right md-label-large text-m3-primary"
          >
            {getComponent(next)?.name}
            <MaterialSymbol icon="arrow_forward" size={20} />
          </button>
        ) : <span />}
      </div>
    </div>
  );
}

function GuidelineBlock({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 rounded-2xl bg-m3-surface-container-low p-5">
      <h3 className="mb-3 flex items-center gap-2 md-title-medium">
        <MaterialSymbol icon={icon} size={22} fill className="text-m3-primary" />
        {title}
      </h3>
      {children}
    </div>
  );
}

function m3SortedIds(): string[] {
  // stable order from the registry
  return m3Registry.components.map((c) => c.id);
}

/* ------------------------------------------------------------------ */
/* Source code tab — the real .tsx file from /api/component-source.   */
/* ------------------------------------------------------------------ */

type SourceState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; source: string; path: string; lines: number; bytes: number };

function ComponentSource({
  id,
  file,
  navigate,
}: {
  id: string;
  file: string;
  navigate: (r: Route) => void;
}) {
  const [state, setState] = React.useState<SourceState>({ status: "loading" });
  const [attempt, setAttempt] = React.useState(0);

  React.useEffect(() => {
    let alive = true;
    setState({ status: "loading" });
    fetch(`/api/component-source?id=${encodeURIComponent(id)}`)
      .then(async (res) => {
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.source) throw new Error(json?.error ?? `HTTP ${res.status}`);
        return json as { source: string; path: string; lines: number; bytes: number };
      })
      .then((json) => {
        if (alive) setState({ status: "ready", source: json.source, path: json.path, lines: json.lines, bytes: json.bytes });
      })
      .catch((e: unknown) => {
        if (alive) setState({ status: "error", message: e instanceof Error ? e.message : String(e) });
      });
    return () => {
      alive = false;
    };
  }, [id, attempt]);

  const deps = React.useMemo(() => (state.status === "ready" ? parseImports(state.source) : null), [state]);

  if (state.status === "loading") {
    return (
      <div
        className="overflow-hidden rounded-xl border border-m3-outline-variant bg-m3-surface-container-lowest"
        aria-busy="true"
        aria-label="Loading source code"
      >
        <div className="flex items-center gap-3 border-b border-m3-outline-variant bg-m3-surface-container-low px-4 py-3">
          <MaterialSymbol icon="progress_activity" size={18} className="animate-spin text-m3-primary" />
          <span className="md-label-medium text-m3-on-surface-variant">Reading {file}…</span>
        </div>
        <div className="space-y-3 p-4">
          {[92, 76, 84, 58].map((w, i) => (
            <div key={i} className="h-3 animate-pulse rounded-md bg-m3-surface-container" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-m3-outline-variant bg-m3-surface-container-lowest p-5">
        <div className="flex items-center gap-2 md-title-medium text-m3-error">
          <MaterialSymbol icon="error" size={22} fill />
          Couldn&apos;t load source
        </div>
        <p className="md-body-medium text-m3-on-surface-variant">{state.message}</p>
        <Button variant="tonal" size="sm" icon="refresh" onClick={() => setAttempt((n) => n + 1)}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* file facts */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-m3-surface-container-low px-3 py-1.5 font-mono text-[12px] text-m3-on-surface-variant">
          <MaterialSymbol icon="description" size={14} className="text-m3-primary" />
          {state.path}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-m3-surface-container-low px-3 py-1.5 md-label-small text-m3-on-surface-variant">
          <MaterialSymbol icon="format_list_numbered" size={14} />
          {state.lines} lines
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-m3-surface-container-low px-3 py-1.5 md-label-small text-m3-on-surface-variant">
          <MaterialSymbol icon="hard_drive" size={14} />
          {(state.bytes / 1024).toFixed(1)} KB
        </span>
      </div>

      <CodeBlock code={state.source} maxHeight={560} />

      {/* what else must be copied alongside this file */}
      {deps && (deps.m3.length > 0 || deps.libs.length > 0 || deps.externals.length > 0) && (
        <div className="rounded-xl border border-m3-outline-variant bg-m3-surface-container-lowest p-4">
          <div className="mb-2 flex items-center gap-2 md-label-medium text-m3-on-surface-variant">
            <MaterialSymbol icon="account_tree" size={16} className="text-m3-primary" />
            This file imports — copy these too (keep the same folder layout)
          </div>
          <div className="flex flex-wrap gap-2">
            {deps.m3.map(({ base, entry }) =>
              entry ? (
                <Chip
                  key={base}
                  variant="suggestion"
                  trailingIcon="arrow_outward"
                  onSelect={() => navigate({ kind: "component", id: entry.id, code: "source" })}
                >
                  {entry.name}
                </Chip>
              ) : (
                <Chip key={base} variant="assist" size="xs" leadingIcon="widgets">
                  {base}
                </Chip>
              )
            )}
            {deps.libs.map((l) => (
              <Chip key={l} variant="assist" size="xs" leadingIcon="settings">
                {l}
              </Chip>
            ))}
            {deps.externals.map((x) => (
              <Chip key={x} variant="assist" size="xs" leadingIcon="inventory_2">
                {x}
              </Chip>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface SourceDeps {
  /** Local m3 files this component imports; `entry` set when it is a registry component */
  m3: { base: string; entry?: M3RegistryEntry }[];
  /** @/lib/* imports (tokens, utils, …) */
  libs: string[];
  /** external runtime packages (React, Framer Motion, and similar) */
  externals: string[];
}

/** Pull every `from "…"` specifier out of a source file and group it. */
function parseImports(source: string): SourceDeps {
  const m3 = new Set<string>();
  const libs = new Set<string>();
  const externals = new Set<string>();
  const re = /from\s+["']([^"']+)["']/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source)) !== null) {
    const spec = m[1];
    if (spec.startsWith(".")) {
      m3.add(spec.replace(/^\.\.?\//, "").replace(/\.(tsx|ts)$/, ""));
    } else if (spec.startsWith("@/components/m3/")) {
      m3.add(spec.slice("@/components/m3/".length).replace(/\.(tsx|ts)$/, ""));
    } else if (spec.startsWith("@/lib/")) {
      libs.add(spec.replace(/^@\//, ""));
    } else {
      externals.add(spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]);
    }
  }
  return {
    m3: [...m3].sort().map((base) => ({
      base,
      entry: m3Registry.components.find((c) => c.file === `src/components/m3/${base}.tsx`),
    })),
    libs: [...libs].sort(),
    externals: [...externals].sort(),
  };
}
