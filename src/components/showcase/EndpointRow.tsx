"use client";

import * as React from "react";
import { Card } from "@/components/m3/Card";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";

/** One agent-API endpoint card with a copy-the-path affordance. */
export function EndpointRow({ method, path, desc }: { method: string; path: string; desc: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(path);
    } catch {
      /* clipboard unavailable — the path is still selectable text */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <Card variant="outlined" className="p-0">
      <div className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center">
        <span className="rounded-md bg-m3-primary-container px-2 py-1 font-mono text-[11px] font-semibold text-m3-on-primary-container">
          {method}
        </span>
        <code className="font-mono text-[13px] font-medium text-m3-on-surface">{path}</code>
        <button
          onClick={() => void copy()}
          aria-label={copied ? "Copied" : `Copy ${path}`}
          className="m3-state m3-focus flex h-10 w-10 shrink-0 items-center justify-center self-start rounded-full text-m3-on-surface-variant sm:self-auto"
        >
          <MaterialSymbol
            icon={copied ? "check" : "content_copy"}
            size={18}
            fill={copied}
            className={copied ? "text-m3-primary" : undefined}
          />
        </button>
        <span className="md-body-small text-m3-on-surface-variant sm:ml-auto sm:max-w-md sm:text-right">
          {desc}
        </span>
      </div>
    </Card>
  );
}
