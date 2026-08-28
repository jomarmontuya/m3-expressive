"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/m3/Button";
import { SegmentedButton } from "@/components/m3/SegmentedButton";
import { TextField } from "@/components/m3/TextField";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { Snackbar } from "@/components/m3/Snackbar";
import { springs } from "@/lib/m3/tokens";
import { useM3Theme } from "@/hooks/use-m3-theme";
import {
  generateScheme,
  schemeToCssText,
  normalizeHex,
  variantCatalog,
  type M3VariantId,
  type M3SchemeRecord,
} from "@/lib/m3/theme-builder";

/* ------------------------------------------------------------------ */
/* Preset seeds (4 curated-theme seeds + 4 tasteful extras)            */
/* ------------------------------------------------------------------ */
const PRESETS: { hex: string; name: string }[] = [
  { hex: "#6750A4", name: "Violet" },
  { hex: "#0B57D0", name: "Ocean" },
  { hex: "#006E1C", name: "Emerald" },
  { hex: "#FB7C41", name: "Coral" },
  { hex: "#FF5C8A", name: "Rose" },
  { hex: "#00796B", name: "Teal" },
  { hex: "#B98CFF", name: "Lilac" },
  { hex: "#C77700", name: "Amber" },
];

/** Key roles shown in the preview swatch grids. */
const GRID_ROLES = [
  "primary",
  "on-primary",
  "primary-container",
  "on-primary-container",
  "secondary-container",
  "on-secondary-container",
  "tertiary-container",
  "on-tertiary-container",
  "error",
  "error-container",
  "surface-variant",
  "on-surface-variant",
  "surface-container-high",
  "surface-container-highest",
  "outline",
  "outline-variant",
] as const;

const CONTRAST_OPTIONS = [
  { value: "0", label: "Standard" },
  { value: "0.5", label: "Medium" },
  { value: "1", label: "High" },
];

const spring = springs.defaultVisual as React.ComponentProps<typeof motion.div>["transition"];

/* ------------------------------------------------------------------ */
/* Theme builder tab                                                   */
/* ------------------------------------------------------------------ */
export function ThemeBuilderTab() {
  const { customScheme, applyCustomTheme, clearCustomTheme } = useM3Theme();

  /* ----- controls ----- */
  const [seed, setSeed] = React.useState("#6750A4");
  const [seedInput, setSeedInput] = React.useState("#6750A4");
  const [hexError, setHexError] = React.useState<string | null>(null);
  const [variant, setVariant] = React.useState<M3VariantId>("tonal-spot");
  const [contrast, setContrast] = React.useState(0);

  const setSeedFromValid = (hex: string) => {
    setSeed(hex);
    setSeedInput(hex.toUpperCase());
    setHexError(null);
  };

  const onSeedInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setSeedInput(raw);
    const normalized = normalizeHex(raw);
    if (normalized) {
      setSeed(normalized);
      setHexError(null);
    } else {
      setHexError("Use a 3- or 6-digit hex value, e.g. #6750A4");
    }
  };

  /* ----- debounced generation (150ms while dragging the picker) ----- */
  const [debounced, setDebounced] = React.useState({ seed, variant, contrast });
  React.useEffect(() => {
    const t = window.setTimeout(() => setDebounced({ seed, variant, contrast }), 150);
    return () => window.clearTimeout(t);
  }, [seed, variant, contrast]);

  const generated = React.useMemo(() => {
    try {
      return generateScheme(debounced.seed, debounced.variant, debounced.contrast);
    } catch {
      return null;
    }
  }, [debounced]);

  const activeVariant = variantCatalog.find((v) => v.id === debounced.variant) ?? variantCatalog[0];

  /* ----- snackbar ----- */
  const [snack, setSnack] = React.useState<{ open: boolean; message: string; icon: string }>({
    open: false,
    message: "",
    icon: "check_circle",
  });
  const showSnack = React.useCallback((message: string, icon = "check_circle") => {
    setSnack({ open: true, message, icon });
  }, []);
  const closeSnack = React.useCallback(() => setSnack((s) => ({ ...s, open: false })), []);

  /* ----- actions ----- */
  const onApply = () => {
    if (applyCustomTheme(seed, variant, contrast)) {
      showSnack(`Custom theme applied — seed ${seed.toUpperCase()}`);
    }
  };
  const onReset = () => {
    clearCustomTheme();
    showSnack("Restored the curated theme", "restart_alt");
  };

  const copyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showSnack(`${label} copied to clipboard`, "content_copy");
    } catch {
      // Clipboard API unavailable (permissions/insecure context) — textarea fallback.
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        showSnack(`${label} copied to clipboard`, "content_copy");
      } catch {
        showSnack(`Could not copy ${label}`, "error");
      }
      ta.remove();
    }
  };

  const downloadJson = () => {
    if (!generated) return;
    const payload = JSON.stringify(
      { seed: seed.toUpperCase(), variant, contrast, light: generated.light, dark: generated.dark },
      null,
      2
    );
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `m3-scheme-${seed.replace("#", "")}-${variant}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showSnack("Scheme JSON downloaded", "download");
  };

  const json = generated
    ? JSON.stringify(
        { seed: seed.toUpperCase(), variant, contrast, light: generated.light, dark: generated.dark },
        null,
        2
      )
    : "";

  return (
    <div>
      {/* ---------- controls card ---------- */}
      <div className="rounded-3xl border border-m3-outline-variant p-5 sm:p-6">
        {/* Seed */}
        <div className="flex items-center gap-2">
          <MaterialSymbol icon="colorize" size={20} className="text-m3-primary" />
          <span className="md-title-medium text-m3-on-surface">Seed color</span>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <label className="flex cursor-pointer items-center gap-3">
            <span className="md-label-medium text-m3-on-surface-variant">Pick</span>
            <span className="relative inline-block h-14 w-14 overflow-hidden rounded-2xl border border-m3-outline-variant transition-transform active:scale-95">
              <input
                type="color"
                value={seed}
                onChange={(e) => setSeedFromValid(e.target.value)}
                aria-label="Seed color picker"
                className="absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)] cursor-pointer border-0 bg-transparent p-0"
              />
            </span>
          </label>
          <div className="w-44">
            <TextField
              label="Hex"
              size="sm"
              leadingIcon="tag"
              value={seedInput}
              onChange={onSeedInputChange}
              error={!!hexError}
              helperText={hexError ?? "e.g. #6750A4"}
              aria-invalid={!!hexError}
            />
          </div>
          <span aria-live="polite" className="sr-only">
            {hexError ?? `Seed color ${seed.toUpperCase()}`}
          </span>
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Preset seed colors">
            {PRESETS.map((p) => (
              <button
                key={p.hex}
                type="button"
                title={`${p.name} ${p.hex}`}
                aria-label={`${p.name} preset seed ${p.hex}`}
                aria-pressed={seed.toLowerCase() === p.hex.toLowerCase()}
                onClick={() => setSeedFromValid(p.hex)}
                className={`m3-state m3-focus h-9 w-9 rounded-full border transition-transform hover:scale-110 active:scale-95 ${
                  seed.toLowerCase() === p.hex.toLowerCase()
                    ? "border-m3-primary ring-2 ring-m3-primary"
                    : "border-m3-outline-variant"
                }`}
                style={{ backgroundColor: p.hex }}
              />
            ))}
          </div>
        </div>

        {/* Variant */}
        <div className="mt-8 flex items-center gap-2">
          <MaterialSymbol icon="tune" size={20} className="text-m3-primary" />
          <span className="md-title-medium text-m3-on-surface">Palette style</span>
        </div>
        <div className="m3-scroll mt-4 -mx-1 overflow-x-auto px-1 pb-1">
          <SegmentedButton
            type="single"
            size="sm"
            value={variant}
            onValueChange={(v) => v && setVariant(v as M3VariantId)}
            options={variantCatalog.map((v) => ({ value: v.id, label: v.label }))}
            aria-label="Dynamic color palette style"
            className="whitespace-nowrap"
          />
        </div>
        <motion.p
          key={activeVariant.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.fastVisual}
          className="mt-3 max-w-3xl md-body-medium text-m3-on-surface-variant"
        >
          <strong className="text-m3-on-surface">{activeVariant.label}</strong> — {activeVariant.description}
        </motion.p>

        {/* Contrast */}
        <div className="mt-8 flex items-center gap-2">
          <MaterialSymbol icon="contrast" size={20} className="text-m3-primary" />
          <span className="md-title-medium text-m3-on-surface">Contrast level</span>
        </div>
        <div className="mt-4">
          <SegmentedButton
            type="single"
            size="sm"
            value={String(contrast)}
            onValueChange={(v) => v !== "" && setContrast(Number(v))}
            options={CONTRAST_OPTIONS}
            aria-label="Contrast level"
          />
          <span className="ml-3 md-body-small text-m3-on-surface-variant">
            {contrast === 0 ? "Spec defaults" : contrast === 0.5 ? "Boosted contrast (0.5)" : "Maximum contrast (1.0)"}
          </span>
        </div>
      </div>

      {/* ---------- live preview ---------- */}
      {generated && (
        <>
          <div className="mt-10 flex items-center gap-2">
            <MaterialSymbol icon="visibility" size={20} className="text-m3-primary" />
            <span className="md-title-medium text-m3-on-surface">Live preview</span>
            <span className="md-body-small text-m3-on-surface-variant">
              · seed {seed.toUpperCase()} · {activeVariant.label}
            </span>
          </div>
          <div className="mt-4 grid gap-4">
            <PreviewBand scheme={generated.light} mode="Light" />
            <PreviewBand scheme={generated.dark} mode="Dark" />
          </div>
        </>
      )}

      {/* ---------- actions ---------- */}
      <div className="mt-10 rounded-3xl border border-m3-outline-variant p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <MaterialSymbol icon="deployed_code" size={20} className="text-m3-primary" />
          <span className="md-title-medium text-m3-on-surface">Use this scheme</span>
        </div>

        {customScheme && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springs.fastVisual}
            className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-m3-primary-container px-4 py-3 text-m3-on-primary-container"
          >
            <MaterialSymbol icon="check_circle" size={20} fill />
            <span className="md-label-large">
              Custom scheme active — seed {customScheme.seed.toUpperCase()} ·{" "}
              {variantCatalog.find((v) => v.id === customScheme.variant)?.label} · contrast {customScheme.contrast}
            </span>
          </motion.div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button variant="filled" icon="palette" onClick={onApply} disabled={!!hexError}>
            Apply as site theme
          </Button>
          {customScheme && (
            <Button variant="outlined" icon="restart_alt" onClick={onReset}>
              Reset to curated
            </Button>
          )}
          <span className="mx-1 hidden h-6 w-px bg-m3-outline-variant sm:block" aria-hidden />
          <Button
            variant="outlined"
            icon="content_copy"
            onClick={() => copyText(schemeToCssText(generated!), "CSS")}
            disabled={!generated}
          >
            Copy CSS
          </Button>
          <Button
            variant="outlined"
            icon="data_object"
            onClick={() => copyText(json, "JSON")}
            disabled={!generated}
          >
            Copy JSON
          </Button>
          <Button variant="outlined" icon="download" onClick={downloadJson} disabled={!generated}>
            Download JSON
          </Button>
        </div>

        <p className="mt-4 max-w-3xl md-body-small text-m3-on-surface-variant">
          Applying injects all 34 <code className="font-mono">--md-*</code> roles as{" "}
          <code className="font-mono">:root[data-theme=&quot;custom&quot;]</code> /{" "}
          <code className="font-mono">[data-theme=&quot;custom&quot;].dark</code> blocks, persists the scheme
          (pre-paint, no flash), and re-themes every component. Agents:{" "}
          <code className="font-mono">GET /api/theme-builder?seed=#FF0000&amp;variant=vibrant&amp;contrast=0.5</code>.
        </p>
      </div>

      <Snackbar open={snack.open} message={snack.message} icon={snack.icon} onClose={closeSnack} duration={2500} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Preview band — mini UI mock + swatch grid for one mode              */
/* ------------------------------------------------------------------ */
function PreviewBand({ scheme, mode }: { scheme: M3SchemeRecord; mode: string }) {
  const bg = (role: string) => ({ backgroundColor: scheme[role as keyof M3SchemeRecord] }) as React.CSSProperties;
  return (
    <motion.section
      aria-label={`${mode} scheme preview`}
      className="rounded-3xl border border-m3-outline-variant p-4 sm:p-6"
      animate={{ backgroundColor: scheme.surface }}
      transition={spring}
    >
      <div className="flex items-center justify-between gap-2">
        <motion.span className="md-label-large" animate={{ color: scheme["on-surface"] }} transition={spring}>
          {mode} scheme
        </motion.span>
        <motion.span
          className="rounded-full border px-2.5 py-1 md-label-small"
          animate={{ color: scheme["on-surface-variant"], borderColor: scheme["outline-variant"] }}
          transition={spring}
        >
          generated · 34 roles
        </motion.span>
      </div>

      {/* mini UI mock */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <motion.button
          type="button"
          tabIndex={-1}
          className="h-10 rounded-full px-5 md-label-large"
          animate={{ backgroundColor: scheme.primary, color: scheme["on-primary"] }}
          transition={spring}
        >
          Filled
        </motion.button>
        <motion.button
          type="button"
          tabIndex={-1}
          className="h-10 rounded-full px-5 md-label-large"
          animate={{ backgroundColor: scheme["secondary-container"], color: scheme["on-secondary-container"] }}
          transition={spring}
        >
          Tonal
        </motion.button>
        <motion.button
          type="button"
          tabIndex={-1}
          className="h-10 rounded-full border px-5 md-label-large"
          animate={{ backgroundColor: "rgba(0,0,0,0)", color: scheme.primary, borderColor: scheme.outline }}
          transition={spring}
        >
          Outlined
        </motion.button>
        <motion.span
          className="inline-flex h-8 items-center rounded-lg px-3 md-label-medium"
          animate={{ backgroundColor: scheme["tertiary-container"], color: scheme["on-tertiary-container"] }}
          transition={spring}
        >
          chip
        </motion.span>
        {/* switch-like pill (decorative) */}
        <motion.span
          aria-hidden
          className="relative inline-block h-8 w-[52px] rounded-full border-2"
          animate={{ backgroundColor: scheme.primary, borderColor: scheme.primary }}
          transition={spring}
        >
          <motion.span
            className="absolute right-[3px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full"
            animate={{ backgroundColor: scheme["on-primary"] }}
            transition={spring}
          />
        </motion.span>
      </div>

      {/* card mock */}
      <motion.div
        className="mt-4 max-w-md rounded-2xl border p-4"
        animate={{ backgroundColor: scheme["surface-container-lowest"], borderColor: scheme["outline-variant"] }}
        transition={spring}
      >
        <motion.div className="md-title-medium" animate={{ color: scheme["on-surface"] }} transition={spring}>
          Card on lowest container
        </motion.div>
        <motion.p className="mt-1 md-body-small" animate={{ color: scheme["on-surface-variant"] }} transition={spring}>
          Supporting text sits on the surface-container role with on-surface-variant content.
        </motion.p>
        <motion.div className="mt-3 md-label-large" animate={{ color: scheme.primary }} transition={spring}>
          Text action →
        </motion.div>
      </motion.div>

      {/* swatch grid */}
      <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
        {GRID_ROLES.map((role) => (
          <div key={role} className="overflow-hidden rounded-xl border border-m3-outline-variant/60">
            <motion.div
              className="h-12"
              animate={{ backgroundColor: scheme[role] }}
              transition={spring}
              title={`${role}: ${scheme[role]}`}
            />
            <div className="px-2 py-1.5">
              <div className="truncate md-label-small text-m3-on-surface-variant">{role}</div>
              <div className="font-mono text-[10px] text-m3-on-surface">{scheme[role]}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
