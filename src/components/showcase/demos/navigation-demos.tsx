'use client';

import * as React from "react";
import { motion } from "framer-motion";
import { Tabs } from "@/components/m3/Tabs";
import { NavigationBar } from "@/components/m3/NavigationBar";
import { NavigationDrawer } from "@/components/m3/NavigationDrawer";
import { NavigationRail } from "@/components/m3/NavigationRail";
import { TopAppBar } from "@/components/m3/TopAppBar";
import { BottomAppBar } from "@/components/m3/BottomAppBar";
import { Toolbar } from "@/components/m3/Toolbar";
import { Menu } from "@/components/m3/Menu";
import type { MenuItemData } from "@/components/m3/Menu";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { Button } from "@/components/m3/Button";
import { springs } from "@/lib/m3/tokens";
import type { Transition } from "framer-motion";

/** framer-motion's legacy `Spring` type drops the "spring" literal, so tokens.springs widens to `string`; re-narrow for `Transition`. */
function spring(transition: (typeof springs)[keyof typeof springs]): Transition {
  return { ...transition, type: "spring" };
}

/* ------------------------------------------------------------------ */
/* Shared demo data                                                    */
/* ------------------------------------------------------------------ */

const tabItems = [
  { value: "today", icon: "calendar_month", label: "Today" },
  { value: "health", icon: "favorite", label: "Health" },
  { value: "shop", icon: "shopping_bag", label: "Shop" },
];

const scrollTabItems = [
  { value: "all", label: "All" },
  { value: "coffee", icon: "local_cafe", label: "Coffee" },
  { value: "brunch", icon: "bakery_dining", label: "Brunch" },
  { value: "noodles", icon: "ramen_dining", label: "Noodles" },
  { value: "dessert", icon: "icecream", label: "Dessert" },
  { value: "drinks", icon: "local_bar", label: "Drinks" },
];

const navItems = [
  { value: "home", icon: "home", label: "Home" },
  { value: "search", icon: "search", label: "Search" },
  { value: "favorites", icon: "favorite", label: "Favorites", badge: 3 },
  { value: "profile", icon: "person", label: "Profile" },
];

const drawerItems = [
  { value: "inbox", icon: "inbox", label: "Inbox", badge: 24 },
  { value: "starred", icon: "star", label: "Starred" },
  { value: "sent", icon: "send", label: "Sent" },
  { value: "drafts", icon: "draft", label: "Drafts" },
  { value: "trash", icon: "delete", label: "Trash" },
];

const LIST_ROWS = Array.from({ length: 18 }, (_, i) => i);

function ListRows() {
  return (
    <>
      {LIST_ROWS.map((i) => (
        <div key={i} className="flex items-center gap-3 border-b border-m3-outline-variant/50 px-4 py-3">
          <MaterialSymbol icon="person" size={20} className="text-m3-on-surface-variant" />
          <span className="md-body-medium text-m3-on-surface">Contact {i + 1}</span>
        </div>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Demos                                                               */
/* ------------------------------------------------------------------ */

export function TabsDemo() {
  const [primary, setPrimary] = React.useState("today");
  const [secondary, setSecondary] = React.useState("all");
  return (
    <div className="flex flex-wrap items-start gap-6 p-2">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-m3-outline-variant">
        <Tabs items={tabItems} value={primary} onChange={setPrimary} fullWidth />
      </div>
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-m3-outline-variant">
        <Tabs items={scrollTabItems} value={secondary} onChange={setSecondary} variant="secondary" fullWidth />
      </div>
    </div>
  );
}

export function NavigationBarDemo() {
  const [value, setValue] = React.useState("home");
  return (
    <div className="flex flex-wrap items-start gap-6 p-2">
      <div className="flex h-64 w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-m3-outline-variant">
        <div className="flex flex-1 items-center justify-center p-4 text-center">
          <span className="md-body-medium text-m3-on-surface-variant">
            Content area — tap a destination. The active pill springs between icons.
          </span>
        </div>
        <NavigationBar items={navItems} value={value} onChange={setValue} fullWidth />
      </div>
    </div>
  );
}

export function NavigationDrawerDemo() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalValue, setModalValue] = React.useState("inbox");
  const [standardValue, setStandardValue] = React.useState("starred");
  return (
    <div className="flex flex-wrap items-start gap-6 p-2">
      <div className="flex max-w-xs flex-col items-start gap-3">
        <Button variant="filled" icon="menu" onClick={() => setModalOpen(true)}>
          Open modal drawer
        </Button>
        <p className="md-body-small text-m3-on-surface-variant">
          Modal drawers slide over a scrim. Press Escape or the scrim to dismiss.
        </p>
      </div>
      <div className="h-80 overflow-hidden rounded-2xl border border-m3-outline-variant">
        <NavigationDrawer
          variant="standard"
          fullHeight
          items={drawerItems}
          value={standardValue}
          onChange={setStandardValue}
          header={<span className="md-label-large text-m3-on-surface-variant">Mail</span>}
        />
      </div>
      <NavigationDrawer
        variant="modal"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        items={drawerItems}
        value={modalValue}
        onChange={setModalValue}
        header={<span className="md-label-large text-m3-on-surface-variant">Mail</span>}
        footer={
          <Button variant="text" icon="settings">
            Settings
          </Button>
        }
      />
    </div>
  );
}

export function NavigationRailDemo() {
  const [value, setValue] = React.useState("home");
  return (
    <div className="flex flex-wrap items-start gap-6 p-2">
      <div className="flex h-80 w-full max-w-2xl overflow-hidden rounded-2xl border border-m3-outline-variant">
        <NavigationRail
          items={navItems}
          value={value}
          onChange={setValue}
          onMenuClick={() => {}}
          header={
            <motion.button
              type="button"
              aria-label="Compose"
              whileTap={{ scale: 0.92 }}
              transition={spring(springs.fastVisual)}
              className="m3-state m3-elevation-1 flex h-10 w-10 items-center justify-center rounded-xl bg-m3-primary-container text-m3-on-primary-container"
            >
              <MaterialSymbol icon="edit" size={20} />
            </motion.button>
          }
        />
        <div className="flex flex-1 items-center justify-center p-4 text-center">
          <span className="md-body-medium text-m3-on-surface-variant">
            Rail navigation for medium screens — the header slot hosts a FAB.
          </span>
        </div>
      </div>
    </div>
  );
}

export function TopAppBarDemo() {
  const smallScrollRef = React.useRef<HTMLDivElement>(null);
  const largeScrollRef = React.useRef<HTMLDivElement>(null);
  const actions = [
    { icon: "search", label: "Search" },
    { icon: "more_vert", label: "More options" },
  ];
  return (
    <div className="flex flex-wrap items-start gap-6 p-2">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-m3-outline-variant">
        <TopAppBar
          variant="small"
          title="Small app bar"
          onBack={() => {}}
          actions={actions}
          scrollTargetRef={smallScrollRef}
        />
        <div ref={smallScrollRef} className="m3-scroll h-48 overflow-y-auto">
          <ListRows />
        </div>
      </div>
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-m3-outline-variant">
        <TopAppBar
          variant="large"
          title="Large flexible app bar"
          onBack={() => {}}
          actions={actions}
          scrollTargetRef={largeScrollRef}
        />
        <div ref={largeScrollRef} className="m3-scroll h-48 overflow-y-auto">
          <ListRows />
        </div>
      </div>
    </div>
  );
}

export function BottomAppBarDemo() {
  return (
    <div className="flex flex-wrap items-start gap-6 p-2">
      <div className="relative flex h-52 w-full max-w-2xl flex-col justify-end overflow-hidden rounded-2xl border border-m3-outline-variant">
        <div className="flex flex-1 items-center justify-center p-4 text-center">
          <span className="md-body-medium text-m3-on-surface-variant">
            Screen content — the center-docked FAB notches the bar and morphs on press.
          </span>
        </div>
        <BottomAppBar
          fullWidth
          navigationIcon={{ icon: "menu", label: "Menu" }}
          actions={[
            { icon: "check_box", label: "Select" },
            { icon: "edit", label: "Edit" },
          ]}
          trailingIcons={["more_vert"]}
          fab={{ icon: "add", onClick: () => {} }}
        />
      </div>
    </div>
  );
}

export function ToolbarDemo() {
  const [docked, setDocked] = React.useState(false);
  const floatingIcons = [
    { icon: "arrow_back", label: "Back" },
    { icon: "grid_view", label: "Grid view", active: true },
    { icon: "favorite", label: "Favorite" },
    { icon: "delete", label: "Delete" },
    { icon: "more_vert", label: "More" },
  ];
  return (
    <div className="flex flex-wrap items-start gap-6 p-2">
      <div className="relative h-40 w-full max-w-xl overflow-hidden rounded-2xl border border-m3-outline-variant bg-m3-surface">
        <span className="absolute left-4 top-4 md-label-large text-m3-on-surface-variant">
          Floating — bottom position
        </span>
        <Toolbar icons={floatingIcons} variant="floating" position="bottom" color="surface" />
      </div>
      <div className="relative h-40 w-full max-w-xl overflow-hidden rounded-2xl border border-m3-outline-variant bg-m3-surface">
        <span className="absolute left-4 top-4 md-label-large text-m3-on-surface-variant">
          Floating — primary container, top position
        </span>
        <Toolbar icons={floatingIcons} variant="floating" position="top" color="primary" width={420} />
      </div>
      <div className="w-full max-w-xl">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <Button variant={docked ? "filled" : "outlined"} size="sm" onClick={() => setDocked((d) => !d)}>
            {docked ? "Undock" : "Dock"}
          </Button>
          <span className="md-body-small text-m3-on-surface-variant">
            Dockable toolbar — {docked ? "docked: square corners, elevation 1" : "floating pill, elevation 2"}
          </span>
        </div>
        <div className="overflow-hidden rounded-2xl border border-m3-outline-variant">
          <Toolbar
            icons={floatingIcons.slice(0, 4)}
            variant="dockable"
            color="secondary"
            docked={docked}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}

export function MenuDemo() {
  const [lastAction, setLastAction] = React.useState<string | null>(null);
  const fileItems: MenuItemData[] = [
    { type: "label", label: "File" },
    { icon: "note_add", label: "New file", shortcut: "⌘N", onClick: () => setLastAction("New file") },
    { icon: "folder_open", label: "Open…", shortcut: "⌘O", onClick: () => setLastAction("Open") },
    { icon: "save", label: "Save", shortcut: "⌘S", disabled: true },
    { type: "divider" },
    { icon: "delete", label: "Delete project", shortcut: "⇧⌫", destructive: true, onClick: () => setLastAction("Delete project") },
  ];
  const overflowItems: MenuItemData[] = [
    { icon: "push_pin", label: "Pin to top" },
    { icon: "content_copy", label: "Duplicate" },
    { icon: "download", label: "Download" },
    { type: "divider" },
    { icon: "report", label: "Report", destructive: true },
  ];
  return (
    <div className="flex flex-wrap items-start gap-6 p-2">
      <div className="flex flex-col items-start gap-3">
        <Menu
          trigger={
            <Button variant="tonal" trailingIcon="arrow_drop_down">
              File
            </Button>
          }
          items={fileItems}
        />
        {lastAction && <span className="md-body-small text-m3-on-surface-variant">Last action: {lastAction}</span>}
      </div>
      <div className="flex flex-col items-start gap-3">
        <span className="md-body-small text-m3-on-surface-variant">bottom-end placement</span>
        <Menu
          placement="bottom-end"
          trigger={
            <button
              type="button"
              aria-label="More options"
              className="m3-state relative flex h-10 w-10 items-center justify-center rounded-full text-m3-on-surface-variant"
            >
              <MaterialSymbol icon="more_vert" size={24} />
            </button>
          }
          items={overflowItems}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Registry map                                                        */
/* ------------------------------------------------------------------ */

export const navigationDemoMap: Record<string, React.ComponentType> = {
  tabs: TabsDemo,
  "navigation-bar": NavigationBarDemo,
  "navigation-drawer": NavigationDrawerDemo,
  "navigation-rail": NavigationRailDemo,
  "top-app-bar": TopAppBarDemo,
  "bottom-app-bar": BottomAppBarDemo,
  toolbar: ToolbarDemo,
  menu: MenuDemo,
};
