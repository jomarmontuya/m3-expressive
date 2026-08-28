"use client";

import * as React from "react";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { cn } from "@/lib/utils";

export function CodeBlock({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className={cn("group relative overflow-hidden rounded-xl border border-m3-outline-variant bg-m3-surface-container-lowest", className)}>
      <button
        onClick={copy}
        aria-label="Copy code"
        className="m3-state absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full text-m3-on-surface-variant opacity-70 transition-opacity hover:opacity-100"
      >
        <MaterialSymbol icon={copied ? "check" : "content_copy"} size={18} fill={copied} className={copied ? "text-m3-primary" : undefined} />
      </button>
      <pre className="m3-scroll overflow-x-auto p-4 pr-12 text-[13px] leading-relaxed">
        <code className="font-mono text-m3-on-surface">{highlight(code)}</code>
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
