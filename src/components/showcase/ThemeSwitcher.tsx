"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconButton } from "@/components/m3/IconButton";
import { SegmentedButton } from "@/components/m3/SegmentedButton";
import { Divider } from "@/components/m3/Divider";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { useM3Theme, type M3Mode } from "@/hooks/use-m3-theme";
import { m3Themes } from "@/lib/m3/themes";
import { springs } from "@/lib/m3/tokens";

/**
 * App-shell theme switcher — proof that the entire application is themed by
 * the library's token system. Built exclusively from library components
 * (IconButton, SegmentedButton, Divider, MaterialSymbol) and M3 motion tokens.
 *
 * Two axes (per Material 3 theming guidance):
 *  - Color scheme: 4 curated M3 schemes (see src/lib/m3/themes.ts)
 *  - Light/dark mode: light · system · dark
 */
export function ThemeSwitcher() {
  const { colorTheme, setColorTheme, mode, setMode, customScheme, clearCustomTheme } = useM3Theme();
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  // Close on outside pointerdown + Escape (returning focus to the trigger).
  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // On open, move focus to the checked radio (first one if none is checked).
  React.useEffect(() => {
    if (!open || !rootRef.current) return;
    const id = window.requestAnimationFrame(() => {
      const radios = rootRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
      if (!radios?.length) return;
      const checked = Array.from(radios).find((r) => r.getAttribute("aria-checked") === "true");
      (checked ?? radios[0]).focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  // Radiogroup keyboard pattern: arrows/Home/End move focus and selection.
  const onRadiogroupKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(e.key)) return;
    const radios = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]'));
    if (!radios.length) return;
    e.preventDefault();
    const i = radios.indexOf(document.activeElement as HTMLButtonElement);
    let next: number;
    if (e.key === "Home") next = 0;
    else if (e.key === "End") next = radios.length - 1;
    else if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1 + radios.length) % radios.length;
    else next = (i - 1 + radios.length) % radios.length;
    radios[next].focus();
    radios[next].click();
  };

  const activeTheme = m3Themes.find((t) => t.id === colorTheme) ?? m3Themes[0];

  return (
    <div ref={rootRef} className="relative">
      <IconButton
        ref={triggerRef}
        icon="palette"
        variant="tonal"
        selected={open}
        aria-label="Change color theme"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Theme settings"
            initial={{ opacity: 0, scale: 0.92, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={springs.fastVisual}
            style={{ transformOrigin: "top right" }}
            className="absolute right-0 top-12 z-50 w-[300px] max-w-[calc(100vw-1.5rem)] rounded-xl border border-m3-outline-variant/50 bg-m3-surface-container m3-elevation-2 p-2"
          >
            <div className="px-2 pb-1.5 pt-1.5 md-label-medium text-m3-on-surface-variant">
              Color scheme
            </div>

            <div
              role="radiogroup"
              aria-label="Color schemes"
              tabIndex={-1}
              onKeyDown={onRadiogroupKeyDown}
            >
              {/* Active custom (Theme Builder) scheme — shown only while active */}
              {customScheme && (
                <div className="m3-state flex w-full items-center gap-3 rounded-lg bg-m3-secondary-container px-2 py-2 text-left text-m3-on-secondary-container">
                  <span
                    className="h-6 w-10 shrink-0 rounded-full border border-m3-outline-variant/60"
                    style={{ backgroundColor: customScheme.seed }}
                  />
                  <span className="flex-1 md-label-large">
                    Custom · seed {customScheme.seed.toUpperCase()}
                  </span>
                  <IconButton
                    icon="close"
                    size="sm"
                    variant="standard"
                    aria-label="Remove custom scheme and restore curated theme"
                    onClick={clearCustomTheme}
                  />
                </div>
              )}
              {m3Themes.map((theme) => {
                const selected = !customScheme && theme.id === activeTheme.id;
                return (
                  <button
                    key={theme.id}
                    role="radio"
                    aria-checked={selected}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setColorTheme(theme.id)}
                    className={`m3-state m3-focus flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left ${
                      selected ? "bg-m3-secondary-container text-m3-on-secondary-container" : "text-m3-on-surface"
                    }`}
                  >
                    {/* scheme swatch strip (primary / inverse-primary / tertiary / surface) */}
                    <span className="flex h-6 w-10 shrink-0 overflow-hidden rounded-full border border-m3-outline-variant/60">
                      {theme.swatch.map((c) => (
                        <span key={c} className="h-full flex-1" style={{ backgroundColor: c }} />
                      ))}
                    </span>
                    <span className="flex-1 md-label-large">{theme.label}</span>
                    {selected && <MaterialSymbol icon="check" size={20} className="text-m3-primary" />}
                  </button>
                );
              })}
            </div>

            <div className="px-2 pb-1.5 pt-3 md-label-medium text-m3-on-surface-variant">Appearance</div>
            <div className="px-1 pb-1">
              <SegmentedButton
                size="sm"
                type="single"
                value={mode}
                onValueChange={(v) => setMode(((v as M3Mode) || "system") ?? "system")}
                options={[
                  { value: "light", label: "Light" },
                  { value: "system", label: "Auto" },
                  { value: "dark", label: "Dark" },
                ]}
                aria-label="Light, system or dark mode"
              />
            </div>

            <Divider className="my-1.5" />

            <div className="flex items-center gap-2 px-2 py-1.5">
              <MaterialSymbol icon="style" size={18} className="text-m3-on-surface-variant" />
              <span className="md-body-small text-m3-on-surface-variant">
                {customScheme
                  ? `Custom scheme · seed ${customScheme.seed.toUpperCase()}`
                  : `${activeTheme.label} · seed ${activeTheme.seed}`}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
