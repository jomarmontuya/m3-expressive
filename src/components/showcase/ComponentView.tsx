"use client";

import * as React from "react";
import { getComponent, m3Registry } from "@/lib/m3/registry";
import { categoryLabels, type M3RegistryEntry } from "@/lib/m3/types";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { Chip } from "@/components/m3/Chip";
import { demoRegistry } from "./demo-registry";
import { CodeBlock } from "./CodeBlock";
import type { Route } from "./Sidebar";

export function ComponentView({ id, navigate }: { id: string; navigate: (r: Route) => void }) {
  const meta: M3RegistryEntry | undefined = getComponent(id);
  const Demo = demoRegistry[id];

  if (!meta) {
    return (
      <div className="flex flex-col items-center gap-4 p-16 text-center">
        <MaterialSymbol icon="missing_controller" size={64} className="text-m3-on-surface-variant" />
        <h1 className="md-headline-medium">Component not found</h1>
        <p className="md-body-large text-m3-on-surface-variant">
          No component with id “{id}”. Try the sidebar.
        </p>
      </div>
    );
  }

  const siblings = m3SortedIds();
  const idx = siblings.indexOf(meta.id);
  const prev = idx > 0 ? siblings[idx - 1] : undefined;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : undefined;

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      {/* header */}
      <div className="md-label-large text-m3-primary">{categoryLabels[meta.category]}</div>
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
      <div className="mt-8 rounded-[28px] border border-m3-outline-variant bg-m3-surface-container-lowest">
        <div className="flex items-center justify-between rounded-t-[27px] border-b border-m3-outline-variant bg-m3-surface-container-low px-5 py-3">
          <div className="flex items-center gap-2 md-label-medium text-m3-on-surface-variant">
            <span className="h-2.5 w-2.5 rounded-full bg-m3-primary" />
            Live demo — interact with it
          </div>
          <code className="hidden font-mono text-[12px] text-m3-on-surface-variant sm:block">{meta.importLine}</code>
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

      {/* example code */}
      <section className="mt-8">
        <h2 className="md-title-large mb-3">Usage</h2>
        <CodeBlock code={meta.exampleCode} />
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
            <div className="mb-2 md-title-medium">States</div>
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
                <div className="mb-3 flex items-center gap-2 md-title-medium text-m3-on-surface">
                  <MaterialSymbol icon="check_circle" size={22} fill className="text-[#1b7f4d]" />
                  Do
                </div>
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
                <div className="mb-3 flex items-center gap-2 md-title-medium text-m3-on-surface">
                  <MaterialSymbol icon="cancel" size={22} fill className="text-m3-error" />
                  Don&apos;t
                </div>
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
        <div className="overflow-x-auto rounded-2xl border border-m3-outline-variant">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="bg-m3-surface-container-low">
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <th key={h} className="px-4 py-3 md-label-medium text-m3-on-surface-variant">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {meta.props.map((p, i) => (
                <tr key={p.name} className={i % 2 ? "bg-m3-surface-container-lowest/60" : "bg-m3-surface-container-lowest"}>
                  <td className="px-4 py-3 font-mono text-[13px] text-m3-primary">{p.name}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-m3-on-surface">{p.type}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-m3-on-surface-variant">{p.default ?? "—"}</td>
                  <td className="px-4 py-3 md-body-medium text-m3-on-surface-variant">{p.description}</td>
                </tr>
              ))}
              <tr className="bg-m3-surface-container-lowest">
                <td className="px-4 py-3 font-mono text-[13px] text-m3-primary">…rest</td>
                <td className="px-4 py-3 font-mono text-[12px] text-m3-on-surface">native props</td>
                <td className="px-4 py-3 text-m3-on-surface-variant">—</td>
                <td className="px-4 py-3 md-body-medium text-m3-on-surface-variant">
                  All native element props + <code>className</code> are forwarded.
                </td>
              </tr>
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
      <div className="mb-3 flex items-center gap-2 md-title-medium">
        <MaterialSymbol icon={icon} size={22} fill className="text-m3-primary" />
        {title}
      </div>
      {children}
    </div>
  );
}

function m3SortedIds(): string[] {
  // stable order from the registry
  return m3Registry.components.map((c) => c.id);
}
