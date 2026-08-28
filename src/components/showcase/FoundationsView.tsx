"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Tabs } from "@/components/m3/Tabs";
import { Switch } from "@/components/m3/Switch";
import { Slider } from "@/components/m3/Slider";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { Button } from "@/components/m3/Button";
import { Card } from "@/components/m3/Card";
import { colorRoles, springs, shapes, typeScale, stateOpacities } from "@/lib/m3/tokens";

const TABS = [
  { value: "color", label: "Color", icon: "palette" },
  { value: "typography", label: "Typography", icon: "text_fields" },
  { value: "shape", label: "Shape", icon: "rounded_corner" },
  { value: "elevation", label: "Elevation", icon: "layers" },
  { value: "motion", label: "Motion", icon: "animation" },
  { value: "states", label: "State layers", icon: "touch_app" },
  { value: "icons", label: "Icons", icon: "interests" },
];

export function FoundationsView({ tab = "color", onTab }: { tab?: string; onTab: (t: string) => void }) {
  const activeTab = TABS.some((t) => t.value === tab) ? tab : "color";
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="md-label-large text-m3-primary">Design foundations</div>
      <h1 className="mt-1 md-display-small font-semibold">The M3 Expressive system</h1>
      <p className="mt-3 max-w-3xl md-body-large text-m3-on-surface-variant">
        Every component is assembled from the official Material 3 token system: a 24-role color
        scheme with light and dark variants, the Roboto Flex variable type scale, a 9-step shape
        scale, 6 elevation levels, physics-based spring motion, and state layers.
      </p>

      <div className="mt-6 border-b border-m3-outline-variant">
        <Tabs items={TABS} value={activeTab} onChange={onTab} variant="secondary" />
      </div>

      <div className="mt-8">
        {activeTab === "color" && <ColorTab />}
        {activeTab === "typography" && <TypographyTab />}
        {activeTab === "shape" && <ShapeTab />}
        {activeTab === "elevation" && <ElevationTab />}
        {activeTab === "motion" && <MotionTab />}
        {activeTab === "states" && <StatesTab />}
        {activeTab === "icons" && <IconsTab />}
      </div>
    </div>
  );
}

/* ================= COLOR ================= */
function ColorTab() {
  return (
    <div>
      <SectionTitle
        title="Dynamic color roles"
        text="Each role ships in light and dark schemes. Components reference tokens — never raw hex — so themes switch automatically."
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {colorRoles.map((role) => (
          <div key={role.token} className="overflow-hidden rounded-2xl border border-m3-outline-variant">
            <div
              className="flex h-16 items-end justify-between p-3"
              style={{ background: `var(--md-${role.token})` }}
            >
              <span
                className="md-label-large"
                style={{ color: `var(--md-on-surface)` }}
              >
                {role.token}
              </span>
            </div>
            <div className="bg-m3-surface-container-lowest p-3">
              <div className="flex gap-3 md-label-small text-m3-on-surface-variant">
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full border border-m3-outline-variant" style={{ background: role.light }} />
                  {role.light}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full border border-m3-outline-variant" style={{ background: role.dark }} />
                  {role.dark}
                </span>
              </div>
              <p className="mt-1.5 md-body-small text-m3-on-surface-variant">{role.usage}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl bg-m3-surface-container-low p-5">
        <div className="md-title-medium">Usage in Tailwind</div>
        <code className="mt-2 block whitespace-pre-wrap font-mono text-[13px] text-m3-on-surface-variant">
{`<button className="bg-m3-primary text-m3-on-primary hover:opacity-95">
  Primary action
</button>
<div className="bg-m3-surface-container-high text-m3-on-surface" />
<span className="border border-m3-outline-variant" />`}
        </code>
      </div>
    </div>
  );
}

/* ================= TYPOGRAPHY ================= */
function TypographyTab() {
  const families: { name: string; cls: string; note: string }[] = [
    { name: "Display Large 57", cls: "md-display-large", note: "Hero moments, short emphatic text" },
    { name: "Display Medium 45", cls: "md-display-medium", note: "Large emphatic text" },
    { name: "Display Small 36", cls: "md-display-small", note: "Emphasis while remaining readable" },
    { name: "Headline Large 32", cls: "md-headline-large", note: "High-emphasis headlines" },
    { name: "Headline Medium 28", cls: "md-headline-medium", note: "Medium-emphasis headlines" },
    { name: "Headline Small 24", cls: "md-headline-small", note: "Section headers" },
    { name: "Title Large 22", cls: "md-title-large", note: "Dialog headers" },
    { name: "Title Medium 16/500", cls: "md-title-medium", note: "List items, nav labels" },
    { name: "Title Small 14/500", cls: "md-title-small", note: "Tabs, secondary headers" },
    { name: "Body Large 16", cls: "md-body-large", note: "Long-form body copy" },
    { name: "Body Medium 14", cls: "md-body-medium", note: "Dense body copy" },
    { name: "Body Small 12", cls: "md-body-small", note: "Supporting text" },
    { name: "Label Large 14/600", cls: "md-label-large", note: "Buttons, chips" },
    { name: "Label Medium 12/600", cls: "md-label-medium", note: "Nav bar labels" },
    { name: "Label Small 11/600", cls: "md-label-small", note: "Badges, tags" },
  ];
  return (
    <div>
      <SectionTitle
        title="Roboto Flex — the variable type system"
        text="M3 Expressive uses Roboto Flex with optical size, weight and grade axes. All 15 M3 roles are exposed as md-* utility classes."
      />
      <div className="overflow-hidden rounded-2xl border border-m3-outline-variant">
        {families.map((f, i) => (
          <div
            key={f.name}
            className={`flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:justify-between ${i !== 0 ? "border-t border-m3-outline-variant" : ""} bg-m3-surface-container-lowest`}
          >
            <span className={`${f.cls} text-m3-on-surface`}>Expressive</span>
            <div className="sm:text-right">
              <div className="md-label-medium text-m3-on-surface">{f.name}</div>
              <div className="md-body-small text-m3-on-surface-variant">
                {f.note} · .{f.cls}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= SHAPE ================= */
function ShapeTab() {
  const scale: { name: string; value: string; note: string }[] = [
    { name: "None", value: shapes.none, note: "Sheets edge-to-edge" },
    { name: "Extra small", value: shapes.extraSmall, note: "Menus, snackbars" },
    { name: "Small", value: shapes.small, note: "Chips, compact buttons" },
    { name: "Medium", value: shapes.medium, note: "Cards at rest" },
    { name: "Large", value: shapes.large, note: "Pressed cards, rails" },
    { name: "Large increased", value: shapes.largeIncreased, note: "Pressed pills — the M3E morph target" },
    { name: "Extra large", value: shapes.extraLarge, note: "FABs, extended FABs, dialogs" },
    { name: "Extra extra large", value: shapes.extraExtraLarge, note: "Large sheets, pickers" },
    { name: "Full", value: shapes.full, note: "Default button & pill shape" },
  ];
  return (
    <div>
      <SectionTitle
        title="Shape morphing is the M3E signature"
        text="M3 Expressive animates corner radius between states — most famously buttons morphing from a full pill to a squarish pill on press."
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {scale.map((s) => (
          <div key={s.name} className="text-center">
            <div
              className="mx-auto flex h-24 w-full max-w-[140px] items-center justify-center bg-m3-primary-container"
              style={{ borderRadius: s.value === "9999px" ? "24px" : s.value }}
            >
              <span className="md-label-medium text-m3-on-primary-container">{s.value}</span>
            </div>
            <div className="mt-2 md-title-small">{s.name}</div>
            <div className="md-body-small text-m3-on-surface-variant">{s.note}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-2xl bg-m3-surface-container-low p-6 text-center">
        <div className="md-title-medium mb-4">Try it — press and hold the buttons:</div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="filled" size="lg">Hold me</Button>
          <Button variant="tonal" size="lg" shape="large">Large shape</Button>
          <Button variant="outlined" size="lg" shape="medium">Medium shape</Button>
        </div>
      </div>
    </div>
  );
}

/* ================= ELEVATION ================= */
function ElevationTab() {
  return (
    <div>
      <SectionTitle
        title="Six elevation levels"
        text="Elevation is expressed with shadows (level 0–5). Tonal surfaces also shift color with elevation via the surface-container roles."
      />
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {["m3-elevation-0", "m3-elevation-1", "m3-elevation-2", "m3-elevation-3", "m3-elevation-4", "m3-elevation-5"].map((el, i) => (
          <div key={el} className="text-center">
            <div
              className={`mx-auto flex h-24 w-full items-center justify-center rounded-2xl bg-m3-surface-container-low ${i === 0 ? "border border-m3-outline-variant" : el}`}
            >
              <span className="md-label-large text-m3-on-surface-variant">dp {i}</span>
            </div>
            <div className="mt-2 md-label-medium text-m3-on-surface-variant">.{el}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Card variant="elevated" className="p-4">
          <div className="md-title-medium">Elevated card</div>
          <p className="md-body-small text-m3-on-surface-variant">dp1 + surface-container-low</p>
        </Card>
        <Card variant="filled" className="p-4">
          <div className="md-title-medium">Filled card</div>
          <p className="md-body-small text-m3-on-surface-variant">dp0 + surface-container-highest</p>
        </Card>
        <Card variant="outlined" className="p-4">
          <div className="md-title-medium">Outlined card</div>
          <p className="md-body-small text-m3-on-surface-variant">dp0 + outline border</p>
        </Card>
      </div>
    </div>
  );
}

/* ================= MOTION ================= */
const SPRING_ROWS = [
  { name: "fastSpatial", use: "Large element translation", k: 1200, d: 200 },
  { name: "fastVisual", use: "Scale/fade of small elements", k: 1600, d: 200 },
  { name: "fastDefault", use: "Default fast", k: 1400, d: 200 },
  { name: "defaultSpatial", use: "Default layout moves", k: 800, d: 170 },
  { name: "defaultVisual", use: "Default visual effects", k: 1000, d: 180 },
  { name: "slowSpatial", use: "Slow spatial", k: 500, d: 140 },
  { name: "slowVisual", use: "Slow visual", k: 600, d: 150 },
  { name: "expressiveSpatial", use: "Energetic large moves", k: 1400, d: 190 },
  { name: "expressiveEffects", use: "Shape morphs", k: 1000, d: 130 },
  { name: "expressive", use: "THE bouncy M3E default", k: 380, d: 22 },
  { name: "bouncy", use: "Celebratory pops", k: 500, d: 18 },
] as const;

function MotionTab() {
  const [springName, setSpringName] = React.useState<string>("expressive");
  const [runId, setRunId] = React.useState(0);
  const spring = springs[springName as keyof typeof springs];

  return (
    <div>
      <SectionTitle
        title="Physics, not durations"
        text="M3E replaces easing curves with mass-spring-damper systems. Stiffness controls speed; damping controls bounce."
      />

      <div className="rounded-2xl bg-m3-surface-container-low p-6">
        <div className="flex flex-wrap items-center gap-2">
          {SPRING_ROWS.map((s) => (
            <button
              key={s.name}
              onClick={() => setSpringName(s.name)}
              className={`m3-state rounded-full px-3 py-1.5 md-label-medium transition-colors ${
                springName === s.name
                  ? "bg-m3-primary text-m3-on-primary"
                  : "bg-m3-surface-container-highest text-m3-on-surface-variant"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
        <div className="relative mt-6 h-16 overflow-hidden rounded-full bg-m3-surface-container-highest">
          <motion.div
            key={`${springName}-${runId}`}
            className="absolute left-3 top-1/2 h-12 w-12 -translate-y-1/2 bg-m3-primary"
            initial={{ x: 0, borderRadius: "50%" }}
            animate={{ x: "min(72vw, 640px)", borderRadius: ["50%", "32%", "50%"] }}
            transition={{
              x: spring,
              borderRadius: { duration: 1.4, ease: "easeInOut" },
            }}
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="md-body-medium text-m3-on-surface-variant">
            <code className="font-mono">{`springs.${springName}`}</code> — stiffness {spring.stiffness}, damping {spring.damping}
          </div>
          <Button icon="play_arrow" onClick={() => setRunId((r) => r + 1)}>
            Play
          </Button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-m3-outline-variant">
        <div className="grid grid-cols-3 bg-m3-surface-container-low p-3 md-label-medium text-m3-on-surface-variant">
          <span>Token</span>
          <span>Stiffness / Damping</span>
          <span>Used for</span>
        </div>
        {SPRING_ROWS.map((s, i) => (
          <div
            key={s.name}
            className={`grid grid-cols-3 p-3 md-body-medium ${i % 2 ? "bg-m3-surface-container-lowest" : "bg-m3-surface"} ${springName === s.name ? "text-m3-primary" : "text-m3-on-surface"}`}
          >
            <span className="font-mono">{s.name}</span>
            <span className="font-mono">{s.k} / {s.d}</span>
            <span className="text-m3-on-surface-variant">{s.use}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STATE LAYERS ================= */
function StatesTab() {
  const rows = [
    { state: "Hover", opacity: stateOpacities.hover, note: "Mouse over an interactive element" },
    { state: "Focus", opacity: stateOpacities.focus, note: "Keyboard focus — plus a 3px focus ring (.m3-focus)" },
    { state: "Pressed", opacity: stateOpacities.pressed, note: "Active touch / click" },
    { state: "Dragged", opacity: stateOpacities.dragged, note: "Element is being dragged (16%)" },
  ];
  return (
    <div>
      <SectionTitle
        title="A tint of the content color"
        text="M3 communicates state with a semi-transparent layer of the element's own color (currentColor). Hover 8%, focus 10%, pressed 10%, dragged 16%."
      />
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.state} className="flex flex-wrap items-center gap-4 rounded-2xl bg-m3-surface-container-low p-4">
            <div
              className="relative flex h-12 min-w-40 items-center justify-center rounded-full bg-m3-primary text-m3-on-primary"
            >
              <span className="relative z-10 md-label-large">{r.state}</span>
              <span className="absolute inset-0 rounded-full bg-white" style={{ opacity: r.opacity }} />
            </div>
            <div className="md-body-medium text-m3-on-surface-variant">
              {r.note} — <code className="font-mono">{Math.round(r.opacity * 100)}%</code>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 md-body-medium text-m3-on-surface-variant">
        Every interactive component in this library applies state layers automatically via the
        <code className="mx-1 rounded bg-m3-surface-container-highest px-1.5 py-0.5 font-mono text-[13px]">.m3-state</code>
        utility class.
      </p>
    </div>
  );
}

/* ================= ICONS ================= */
const GALLERY = [
  "home", "search", "favorite", "settings", "add", "check", "close", "arrow_back",
  "more_vert", "menu", "edit", "delete", "share", "download", "star", "person",
  "notifications", "shopping_cart", "mail", "calendar_month", "schedule", "play_arrow",
  "photo_camera", "attachment", "mic", "send", "refresh", "filter_alt",
];

function IconsTab() {
  const [weight, setWeight] = React.useState(400);
  const [fill, setFill] = React.useState(false);
  const [grade, setGrade] = React.useState(0);

  return (
    <div>
      <SectionTitle
        title="Material Symbols Rounded"
        text="Icons come from Google's variable Material Symbols font with FILL, wght, GRAD and opsz axes — no icon library needed."
      />
      <div className="rounded-2xl bg-m3-surface-container-low p-6">
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-7 lg:grid-cols-14">
          {GALLERY.map((icon) => (
            <div key={icon} className="flex flex-col items-center gap-1 text-m3-on-surface-variant">
              <MaterialSymbol icon={icon} size={28} weight={weight as 400} fill={fill} grade={grade as 0} />
              <span className="w-full truncate text-center text-[10px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex max-w-xl flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="w-32 md-label-large">Fill</span>
            <Switch checked={fill} onCheckedChange={setFill} />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 md-label-large">Weight {weight}</span>
            <Slider value={weight} onChange={(v) => setWeight(Math.round(v / 100) * 100)} min={100} max={700} step={100} fullWidth />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 md-label-large">Grade {grade}</span>
            <Slider value={grade} onChange={setGrade} min={-50} max={200} step={50} discrete fullWidth />
          </div>
        </div>
        <CodeSample />
      </div>
    </div>
  );
}

function CodeSample() {
  return (
    <div className="mt-6 rounded-xl border border-m3-outline-variant bg-m3-surface-container-lowest p-4 font-mono text-[13px] text-m3-on-surface-variant">
      {"<MaterialSymbol icon=\"favorite\" size={28} fill weight={500} grade={0} />"}
    </div>
  );
}

function SectionTitle({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-6 max-w-3xl">
      <h2 className="md-headline-small font-medium text-m3-on-surface">{title}</h2>
      <p className="mt-2 md-body-large text-m3-on-surface-variant">{text}</p>
    </div>
  );
}
