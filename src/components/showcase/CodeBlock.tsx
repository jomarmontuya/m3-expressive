"use client";

import * as React from "react";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { cn } from "@/lib/utils";

/**
 * CodeBlock — proper code viewer.
 *
 * Header bar: language chip (tsx / json / text) on the left, copy button on
 * the right (safely inset — never overlapping the code). Body: highlighted
 * snippet with light format normalization (no trailing whitespace, blank-line
 * runs collapsed, trimmed edges) so generated markup always prints cleanly.
 *
 * `maxHeight` (px) caps the <pre> and makes it scroll vertically — used by
 * the full-file Source view so a 900-line DatePicker doesn't dominate the
 * page. Omit it for snippets (default: grow with content).
 */
export function CodeBlock({
  code,
  className,
  language = "tsx",
  maxHeight,
}: {
  code: string;
  className?: string;
  language?: string;
  maxHeight?: number;
}) {
  const [copied, setCopied] = React.useState(false);

  /** Light formatter: trim trailing spaces, collapse 2+ blank lines to one. */
  const formatted = React.useMemo(
    () => code.replace(/[ \t]+$/gm, "").replace(/\n{2,}/g, "\n\n").trim(),
    [code]
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(formatted);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = formatted;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className={cn("overflow-hidden rounded-xl border border-m3-outline-variant bg-m3-surface-container-lowest", className)}>
      {/* header bar — language chip + copy action */}
      <div className="flex items-center justify-between gap-2 border-b border-m3-outline-variant bg-m3-surface-container-low py-1.5 pl-4 pr-2">
        <div className="flex items-center gap-2 md-label-small uppercase tracking-wider text-m3-on-surface-variant">
          <MaterialSymbol icon="code" size={14} className="text-m3-primary" />
          {language}
        </div>
        <button
          onClick={() => void copy()}
          aria-label={copied ? "Copied" : "Copy code"}
          className="m3-state m3-focus flex h-10 w-10 items-center justify-center rounded-full text-m3-on-surface-variant"
        >
          <MaterialSymbol
            icon={copied ? "check" : "content_copy"}
            size={18}
            fill={copied}
            className={copied ? "text-m3-primary" : undefined}
          />
        </button>
        <span role="status" aria-live="polite" className="sr-only">
          {copied ? "Code copied to clipboard" : ""}
        </span>
      </div>
      <pre
        aria-label={`${language} code block`}
        className={cn(
          "m3-scroll m3-focus overflow-x-auto p-4 text-[13px] leading-relaxed",
          maxHeight != null && "overflow-y-auto"
        )}
        style={maxHeight != null ? { maxHeight } : undefined}
      >
        <code className="font-mono text-m3-on-surface">{highlight(formatted)}</code>
      </pre>
    </div>
  );
}

/** Ultra-light JSX highlighting: strings, keywords, tags, comments */
function highlight(code: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // tokenize with a simple regex pass
  const pattern =
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(import|from|export|const|let|function|return|default|type|interface|true|false|null|undefined)\b|(<\/?[A-Z][A-Za-z0-9]*|<|\/>|\/\/[^\n]*)|([A-Za-z_$][\w$]*)(?==)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = pattern.exec(code)) !== null) {
    if (m.index > last) nodes.push(code.slice(last, m.index));
    const [full, str, kw, tag, attr] = m;
    if (str) {
      nodes.push(
        <span key={key++} className="text-[#0a7d55] dark:text-[#7ee2b0]">
          {full}
        </span>
      );
    } else if (kw) {
      nodes.push(
        <span key={key++} className="text-[#8430a8] dark:text-[#d0bcff] font-medium">
          {full}
        </span>
      );
    } else if (tag) {
      nodes.push(
        <span key={key++} className="text-[#23539e] dark:text-[#a8c7fa]">
          {full}
        </span>
      );
    } else if (attr) {
      nodes.push(
        <span key={key++} className="text-[#9a4800] dark:text-[#ffb782]">
          {full}
        </span>
      );
    }
    last = m.index + full.length;
  }
  if (last < code.length) nodes.push(code.slice(last));
  return nodes;
}
