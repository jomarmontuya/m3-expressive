"use client";

import * as React from "react";
import { Button } from "@/components/m3/Button";
import { Card } from "@/components/m3/Card";
import { Chip } from "@/components/m3/Chip";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { SegmentedButton } from "@/components/m3/SegmentedButton";
import { CodeBlock } from "./CodeBlock";
import type { Route } from "./Sidebar";

const INSTALL_COMMAND =
  "bunx shadcn@latest add jomarmontuya/m3-expressive/button#v0.1.0-beta.1";

const BUTTON_EXAMPLE = `import { Button } from "@/components/m3/Button";

export function Actions() {
  return (
    <div className="flex gap-2">
      <Button variant="filled" icon="save">Save changes</Button>
      <Button variant="tonal">Preview</Button>
      <Button variant="text">Cancel</Button>
    </div>
  );
}`;

const MOTION_EXAMPLE = `import { motion } from "framer-motion";
import { springs } from "@/lib/m3/tokens";

<motion.div
  animate={{ scale: 1.05 }}
  transition={springs.expressive}
/>`;

export function DocsView({ navigate }: { navigate: (route: Route) => void }) {
  const [tab, setTab] = React.useState<"install" | "start">("install");

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="md-label-large text-m3-primary">Documentation</div>
      <h1 className="mt-1 md-display-small font-semibold text-m3-on-surface">
        Install and get started
      </h1>
      <p className="mt-3 max-w-3xl md-body-large text-m3-on-surface-variant">
        Install components from this GitHub repository with the shadcn CLI. The source lands in your app,
        and the first component automatically adds the shared Material tokens, fonts, helpers, and runtime dependencies.
      </p>

      <div className="mt-6">
        <SegmentedButton
          type="single"
          size="md"
          value={tab}
          onValueChange={(value) => {
            if (typeof value === "string" && value !== "") setTab(value as "install" | "start");
          }}
          options={[
            { value: "install", label: "Installation", icon: "download" },
            { value: "start", label: "Getting started", icon: "rocket_launch" },
          ]}
          aria-label="Documentation sections"
        />
      </div>

      <div className="mt-8">
        {tab === "install" ? <InstallTab navigate={navigate} /> : <StartTab navigate={navigate} />}
      </div>
    </div>
  );
}

function InstallTab({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <div className="space-y-6">
      <InfoCards />

      <Step number="01" title="Prepare your app" icon="check_circle">
        <p className="md-body-medium text-m3-on-surface-variant">
          Use a React app with Tailwind CSS 4 and a valid <code className="font-mono">components.json</code> file.
          The shadcn CLI uses its aliases to place components and shared files in the correct folders.
        </p>
      </Step>

      <Step number="02" title="Add a component" icon="download">
        <p className="mb-3 md-body-medium text-m3-on-surface-variant">
          Run one command from your app root. The version tag keeps the install repeatable.
        </p>
        <CodeBlock language="bash" code={INSTALL_COMMAND} />
        <div className="mt-3 flex gap-2 rounded-2xl bg-m3-surface-container-low p-4">
          <MaterialSymbol icon="auto_awesome" size={18} className="mt-0.5 shrink-0 text-m3-primary" />
          <p className="md-body-small text-m3-on-surface-variant">
            You do not need to add <code className="font-mono">m3-base</code> yourself. Every component depends on it,
            so the CLI installs the Material setup automatically.
          </p>
        </div>
      </Step>

      <Step number="03" title="Import the local source" icon="code">
        <p className="mb-3 md-body-medium text-m3-on-surface-variant">
          Import each component from the file that the CLI added to your app.
        </p>
        <CodeBlock language="tsx" code={BUTTON_EXAMPLE} />
      </Step>

      <Step number="04" title="Add more components" icon="widgets">
        <p className="mb-4 md-body-medium text-m3-on-surface-variant">
          Replace <code className="font-mono">button</code> in the install command with any component ID shown in this catalog.
          Shared setup is reused instead of copied again.
        </p>
        <Button variant="tonal" icon="grid_view" onClick={() => navigate({ kind: "components" })}>
          Browse all 41 components
        </Button>
      </Step>
    </div>
  );
}

function StartTab({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <div className="space-y-6">
      <Step number="✦" title="Use direct imports" icon="code">
        <p className="mb-3 md-body-medium text-m3-on-surface-variant">
          Each component is local source. There is no package barrel and no hidden runtime wrapper.
        </p>
        <CodeBlock language="tsx" code={BUTTON_EXAMPLE} />
      </Step>

      <Step number="✦" title="Use Material motion tokens" icon="animation">
        <p className="mb-3 md-body-medium text-m3-on-surface-variant">
          The base item installs the shared spring tokens used by the components.
        </p>
        <CodeBlock language="tsx" code={MOTION_EXAMPLE} />
      </Step>

      <Step number="✦" title="Choose a theme" icon="palette">
        <p className="mb-4 md-body-medium text-m3-on-surface-variant">
          Use the baseline Material scheme, add <code className="font-mono">className=&quot;dark&quot;</code>, or set
          <code className="ml-1 font-mono">data-theme</code> to <code className="font-mono">ocean</code>,
          <code className="ml-1 font-mono">emerald</code>, or <code className="ml-1 font-mono">coral</code>.
        </p>
        <Button variant="outlined" icon="palette" onClick={() => navigate({ kind: "foundations" })}>
          Open design foundations
        </Button>
      </Step>
    </div>
  );
}

function InfoCards() {
  const items = [
    { icon: "download", title: "One command", body: "The CLI resolves component and shared setup dependencies." },
    { icon: "folder_copy", title: "Local source", body: "Installed files belong to your app and can be changed." },
    { icon: "verified", title: "Pinned beta", body: "The tag fixes every registry dependency to one reviewed version." },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <Card key={item.title} variant="filled" className="p-4">
          <MaterialSymbol icon={item.icon} size={22} fill className="text-m3-primary" />
          <div className="mt-3 md-title-medium">{item.title}</div>
          <p className="mt-1 md-body-small text-m3-on-surface-variant">{item.body}</p>
        </Card>
      ))}
    </div>
  );
}

function Step({
  number,
  title,
  icon,
  children,
}: {
  number: string;
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <Card variant="outlined" className="p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <Chip variant="assist" size="sm">{number}</Chip>
        <MaterialSymbol icon={icon} size={22} fill className="text-m3-primary" />
        <h2 className="md-title-large text-m3-on-surface">{title}</h2>
      </div>
      {children}
    </Card>
  );
}
