"use client";

/**
 * PropsPlayground — live interactive variant/state controls on component pages.
 *
 * Left: the target component rendered live on a neutral dot-grid stage (the
 * component's own motion animates variant/size changes; structural swaps
 * cross-fade via AnimatePresence on token springs). Right: the spec's control
 * column (SegmentedButton / Switch / TextField / Slider). Below: a CodeBlock
 * that mirrors the current control state 1:1, with the usual copy button.
 *
 * Specs live in ./playground-specs (PLAYGROUND_SPECS). Components without a
 * spec entry get no playground section at all (handled in ComponentView).
 */

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { springs } from "@/lib/m3/tokens";
import { SegmentedButton } from "@/components/m3/SegmentedButton";
import { Switch } from "@/components/m3/Switch";
import { TextField } from "@/components/m3/TextField";
import { Slider } from "@/components/m3/Slider";
import { Button } from "@/components/m3/Button";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { CodeBlock } from "./CodeBlock";
import type { PlaygroundControl, PlaygroundSpec, PlaygroundValue, PlaygroundValues } from "./playground-specs";

/** tokens.ts `satisfies` widens spring `type` to string; narrow for framer-motion. */
const fastSpatial = springs.fastSpatial as Transition;

export function PropsPlayground({ spec }: { spec: PlaygroundSpec }) {
  const [values, setValues] = React.useState<PlaygroundValues>(spec.defaults);

  const set = React.useCallback((key: string, value: PlaygroundValue) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = React.useCallback(() => setValues(spec.defaults), [spec]);

  const code = React.useMemo(() => spec.code(values), [spec, values]);

  const stageKeyValue = spec.stageKey ? spec.stageKey(values) : "static";

  /** Screen-reader summary of the current configuration (polite live region). */
  const summary = React.useMemo(() => {
    const parts = spec.controls.map((c) => {
      const v = values[c.key];
      switch (c.kind) {
        case "switch":
          return `${c.label} ${v === true ? "on" : "off"}`;
        case "slider":
          return `${c.label} ${typeof v === "number" ? v : pgNumberOf(v, c.min)}`;
        case "text":
          return `${c.label} ${typeof v === "string" && v.trim() !== "" ? `"${v}"` : "(empty)"}`;
        default:
          return `${c.label} ${typeof v === "string" ? v : "(default)"}`;
      }
    });
    return `${spec.component} playground — ${parts.join("; ")}`;
  }, [spec, values]);

  return (
    <div className="mt-4 overflow-hidden rounded-[28px] border border-m3-outline-variant bg-m3-surface-container-lowest">
      {/* header bar */}
      <div className="flex items-center justify-between gap-2 border-b border-m3-outline-variant bg-m3-surface-container-low px-5 py-3">
        <div className="flex items-center gap-2 md-label-medium text-m3-on-surface-variant">
          <span className="h-2.5 w-2.5 rounded-full bg-m3-tertiary" />
          Playground — configure, preview, copy
        </div>
        <Button variant="text" size="xs" icon="restart_alt" onClick={reset}>
          Reset
        </Button>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* stage — neutral dot grid over surface-container-lowest */}
        <div
          className="flex min-h-[260px] items-center justify-center p-6 sm:p-10"
          style={{
            backgroundImage: "radial-gradient(var(--md-outline-variant) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={stageKeyValue}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={fastSpatial}
              className="flex items-center justify-center"
            >
              {spec.render(values, set)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* controls column */}
        <div className="space-y-5 border-t border-m3-outline-variant bg-m3-surface-container-low p-5 lg:border-l lg:border-t-0">
          {spec.controls.map((c) => (
            <Control key={c.key} control={c} values={values} set={set} />
          ))}
        </div>
      </div>

      {/* generated code — mirrors the controls 1:1 */}
      <div className="border-t border-m3-outline-variant p-4 sm:p-5">
        <div className="mb-2 flex items-center gap-2 md-label-medium text-m3-on-surface-variant">
          <MaterialSymbol icon="code" size={16} className="text-m3-primary" />
          Generated code — mirrors the controls 1:1
        </div>
        <CodeBlock code={code} />
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {summary}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Controls                                                            */
/* ------------------------------------------------------------------ */

function Control({
  control: c,
  values,
  set,
}: {
  control: PlaygroundControl;
  values: PlaygroundValues;
  set: (key: string, value: PlaygroundValue) => void;
}) {
  const disabled = c.disabledWhen?.(values) ?? false;

  if (c.kind === "segmented") {
    return (
      <div>
        <ControlHeading label={c.label} icon={c.icon ?? "category"} />
        <div className="m3-scroll max-w-full overflow-x-auto pb-1">
          <SegmentedButton
            type="single"
            size="sm"
            value={typeof values[c.key] === "string" ? (values[c.key] as string) : ""}
            onValueChange={(v) => {
              if (typeof v === "string" && v !== "") set(c.key, v);
            }}
            options={c.options}
            disabled={disabled}
            aria-label={c.label}
            className="whitespace-nowrap"
          />
        </div>
      </div>
    );
  }

  if (c.kind === "switch") {
    return (
      <div className="flex items-center justify-between gap-3">
        <ControlLabel label={c.label} icon={c.icon ?? "toggle_on"} />
        {/* M3 Switch takes no aria props — attach the accessible name via ref */}
        <LabeledSwitch
          label={c.label}
          checked={values[c.key] === true}
          disabled={disabled}
          onChange={(on) => set(c.key, on)}
        />
      </div>
    );
  }

  if (c.kind === "text") {
    return (
      <div>
        <ControlHeading label={c.label} icon={c.icon ?? "edit"} />
        <TextField
          size="sm"
          fullWidth
          label={c.label}
          value={typeof values[c.key] === "string" ? (values[c.key] as string) : ""}
          onChange={(e) => set(c.key, e.target.value)}
          leadingIcon={c.icon}
          disabled={disabled}
        />
      </div>
    );
  }

  // slider
  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2">
        <ControlLabel label={c.label} icon={c.icon ?? "linear_scale"} />
        <span className="font-mono text-[12px] text-m3-on-surface">{pgNumberOf(values[c.key], c.min)}</span>
      </div>
      <Slider
        fullWidth
        value={pgNumberOf(values[c.key], c.min)}
        min={c.min}
        max={c.max}
        step={c.step}
        onChange={(n) => set(c.key, n)}
        disabled={disabled}
        aria-label={c.label}
      />
    </div>
  );
}

function ControlHeading({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="mb-2 flex items-center gap-1.5 md-label-medium text-m3-on-surface-variant">
      <MaterialSymbol icon={icon} size={16} className="text-m3-primary" />
      {label}
    </div>
  );
}

function ControlLabel({ label, icon }: { label: string; icon: string }) {
  return (
    <span className="flex items-center gap-1.5 md-body-medium text-m3-on-surface">
      <MaterialSymbol icon={icon} size={16} className="text-m3-primary" />
      {label}
    </span>
  );
}

/**
 * The library Switch forwards its ref to the DOM button, so the accessible
 * name can be attached imperatively (its props don't include aria-label).
 */
function LabeledSwitch({
  label,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  checked: boolean;
  disabled: boolean;
  onChange: (checked: boolean) => void;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    ref.current?.setAttribute("aria-label", label);
  }, [label]);
  return <Switch ref={ref} checked={checked} disabled={disabled} onCheckedChange={onChange} />;
}

function pgNumberOf(v: PlaygroundValue | undefined, fallback: number): number {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) return Number(v);
  return fallback;
}
