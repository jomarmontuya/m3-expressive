"use client";

import * as React from "react";
import { Button } from "@/components/m3/Button";
import { IconButton } from "@/components/m3/IconButton";
import { Fab } from "@/components/m3/FAB";
import { ExtendedFab } from "@/components/m3/ExtendedFab";
import { FabMenu } from "@/components/m3/FabMenu";
import { BottomAppBar } from "@/components/m3/BottomAppBar";
import { SplitButton } from "@/components/m3/SplitButton";
import { ButtonGroup } from "@/components/m3/ButtonGroup";
import { SegmentedButton } from "@/components/m3/SegmentedButton";

/* ------------------------------------------------------------------ */
/* Shared demo caption                                                 */
/* ------------------------------------------------------------------ */
function Caption({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-full md-label-medium text-m3-on-surface-variant">{children}</span>
  );
}

/* ------------------------------------------------------------------ */
/* Button (existing reference component)                               */
/* ------------------------------------------------------------------ */
export function ButtonDemo() {
  const [uploading, setUploading] = React.useState(false);

  const simulateUpload = () => {
    setUploading(true);
    window.setTimeout(() => setUploading(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-2">
      <Caption>Variants</Caption>
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="filled" icon="edit">Compose</Button>
        <Button variant="tonal" icon="save">Save</Button>
        <Button variant="outlined" trailingIcon="arrow_forward">Next</Button>
        <Button variant="text">Learn more</Button>
        <Button variant="elevated" icon="print">Print</Button>
      </div>
      <Caption>Sizes</Caption>
      <div className="flex flex-wrap items-center gap-4">
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra large</Button>
      </div>
      <Caption>Loading, icons &amp; disabled</Caption>
      <div className="flex flex-wrap items-center gap-4">
        <Button loading>Loading</Button>
        <Button
          variant="tonal"
          icon="cloud_upload"
          loading={uploading}
          onClick={simulateUpload}
        >
          {uploading ? "Uploading…" : "Upload"}
        </Button>
        <Button variant="outlined" icon="favorite" trailingIcon="expand_more">
          Category
        </Button>
        <Button variant="text" icon="open_in_new">Docs</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Icon button                                                         */
/* ------------------------------------------------------------------ */
export function IconButtonDemo() {
  const [liked, setLiked] = React.useState(false);
  const [muted, setMuted] = React.useState(false);

  return (
    <div className="flex flex-wrap items-center gap-4 p-2">
      <Caption>Variants</Caption>
      <div className="flex flex-wrap items-center gap-2">
        <IconButton icon="settings" aria-label="Settings" />
        <IconButton variant="filled" icon="add" aria-label="Add" />
        <IconButton variant="tonal" icon="favorite" aria-label="Favorite" />
        <IconButton variant="outlined" icon="delete" aria-label="Delete" />
        <IconButton icon="share" disabled aria-label="Share (disabled)" />
      </div>
      <Caption>Sizes 28–64</Caption>
      <div className="flex flex-wrap items-center gap-2">
        <IconButton size="xs" icon="more_vert" aria-label="More" />
        <IconButton size="sm" icon="more_vert" aria-label="More" />
        <IconButton size="md" icon="more_vert" aria-label="More" />
        <IconButton size="lg" icon="more_vert" aria-label="More" />
        <IconButton size="xl" icon="more_vert" aria-label="More" />
      </div>
      <Caption>Toggleable</Caption>
      <div className="flex flex-wrap items-center gap-2">
        <IconButton
          toggleable
          selected={liked}
          onSelectedChange={setLiked}
          icon={liked ? "favorite" : "favorite_border"}
          aria-label="Like"
        />
        <IconButton
          toggleable
          variant="tonal"
          selected={muted}
          onSelectedChange={setMuted}
          icon={muted ? "volume_off" : "volume_up"}
          aria-label="Mute"
        />
        <IconButton toggleable icon="bookmark" variant="outlined" aria-label="Save" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FAB                                                                 */
/* ------------------------------------------------------------------ */
export function FabDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4 p-2">
      <Caption>Colors</Caption>
      <div className="flex flex-wrap items-center gap-4">
        <Fab icon="add" aria-label="Create" onClick={() => {}} />
        <Fab color="secondary" icon="edit" aria-label="Edit" onClick={() => {}} />
        <Fab color="tertiary" icon="favorite" aria-label="Like" onClick={() => {}} />
        <Fab color="surface" icon="search" aria-label="Search" onClick={() => {}} />
      </div>
      <Caption>Sizes 40–132</Caption>
      <div className="flex flex-wrap items-center gap-4">
        <Fab size="small" icon="add" aria-label="Add small" />
        <Fab icon="add" aria-label="Add medium" />
        <Fab size="large" icon="add" aria-label="Add large" />
        <Fab size="extra-large" icon="add" aria-label="Add extra large" />
      </div>
      <Caption>Lowered &amp; disabled</Caption>
      <div className="flex flex-wrap items-center gap-4">
        <Fab lowered icon="add" aria-label="Add (lowered)" />
        <Fab disabled icon="add" aria-label="Add (disabled)" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Extended FAB                                                        */
/* ------------------------------------------------------------------ */
export function ExtendedFabDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4 p-2">
      <Caption>Colors</Caption>
      <div className="flex flex-wrap items-center gap-4">
        <ExtendedFab icon="add" label="Create" />
        <ExtendedFab color="secondary" icon="send" label="Send" />
        <ExtendedFab color="tertiary" icon="directions" label="Navigate" />
        <ExtendedFab color="surface" icon="filter" label="Filter" />
      </div>
      <Caption>Lowered &amp; disabled</Caption>
      <div className="flex flex-wrap items-center gap-4">
        <ExtendedFab icon="archive" label="Archive" lowered />
        <ExtendedFab icon="block" label="Disabled" disabled />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Fab menu (M3E)                                                      */
/* ------------------------------------------------------------------ */
export function FabMenuDemo() {
  const [lastAction, setLastAction] = React.useState<string | null>(null);

  return (
    <div className="flex flex-wrap items-start gap-10 p-2">
      <div className="flex flex-col items-center gap-3">
        <Caption>Vertical</Caption>
        <div className="h-40">
          <FabMenu
            actions={[
              { icon: "photo_camera", label: "Camera", onClick: () => setLastAction("Camera") },
              { icon: "image", label: "Gallery", onClick: () => setLastAction("Gallery") },
              { icon: "mic", label: "Voice note", onClick: () => setLastAction("Voice note") },
            ]}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Caption>Horizontal</Caption>
        <FabMenu
          direction="horizontal"
          color="secondary"
          actions={[
            { icon: "person_add", label: "Invite", onClick: () => setLastAction("Invite") },
            { icon: "group_add", label: "New group", onClick: () => setLastAction("New group") },
          ]}
        />
      </div>
      <div className="flex flex-col items-center gap-3">
        <Caption>Controlled</Caption>
        <ControlledFabMenu />
      </div>
      <div className="flex flex-col items-center gap-3">
        <Caption>Docked · bottom corners square when open</Caption>
        <DockedFabMenuStage onAction={setLastAction} />
      </div>
      {lastAction && (
        <span className="self-center md-label-large text-m3-on-surface-variant">
          Last action: {lastAction}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Docked fab menu stage (M3E)                                         */
/* ------------------------------------------------------------------ */
/**
 * Docked fab-menu stage. Two bordered, fixed-height scenes:
 * - "Screen": the FabMenu uses `dockedTo="screen"` (position: fixed); the
 *   stage carries a transform so it becomes the containing block for the
 *   fixed menu — the FAB docks to the stage's bottom edge instead of the
 *   real viewport, showing the screen-docking behavior without page
 *   disruption.
 * - "Bottom app bar": the FabMenu uses `dockedTo="bottom-app-bar"` anchored
 *   inside the relative content area that sits directly above an 80dp
 *   BottomAppBar; when open the FAB's bottom corners square off onto the bar
 *   and the actions cascade as a horizontal row flush on top of it.
 */
function DockedFabMenuStage({ onAction }: { onAction: (label: string) => void }) {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <div
        data-testid="docked-fab-stage-screen"
        className="relative h-64 w-48 overflow-hidden rounded-lg border border-m3-outline-variant bg-m3-surface [transform:translateZ(0)]"
      >
        <span className="absolute left-3 top-3 z-10 md-label-small text-m3-on-surface-variant">
          Screen
        </span>
        <FabMenu
          docked
          actions={[
            { icon: "photo_camera", label: "Camera", onClick: () => onAction("Camera") },
            { icon: "image", label: "Gallery", onClick: () => onAction("Gallery") },
            { icon: "mic", label: "Voice note", onClick: () => onAction("Voice note") },
          ]}
        />
      </div>
      <div
        data-testid="docked-fab-stage-bar"
        className="flex h-64 w-48 flex-col overflow-hidden rounded-lg border border-m3-outline-variant bg-m3-surface"
      >
        <div className="relative flex-1">
          <FabMenu
            docked
            dockedTo="bottom-app-bar"
            color="tertiary"
            actions={[
              { icon: "edit", label: "Draft", onClick: () => onAction("Draft") },
              { icon: "attach_file", label: "Attach", onClick: () => onAction("Attach") },
            ]}
          />
        </div>
        <BottomAppBar
          navigationIcon={{ icon: "menu", label: "Menu" }}
          trailingIcons={["more_vert"]}
        />
      </div>
    </div>
  );
}

function ControlledFabMenu() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="h-32">
      <FabMenu
        open={open}
        onOpenChange={setOpen}
        color="tertiary"
        actions={[
          { icon: "alarm", label: "Remind me" },
          { icon: "poll", label: "Poll" },
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Split button (M3E)                                                  */
/* ------------------------------------------------------------------ */
export function SplitButtonDemo() {
  const [format, setFormat] = React.useState("PDF");

  return (
    <div className="flex flex-wrap items-center gap-4 p-2">
      <Caption>Variants &amp; sizes</Caption>
      <div className="flex flex-wrap items-center gap-4">
        <SplitButton
          label="Export"
          onClick={() => setFormat("PDF (default)")}
          items={[
            { label: "Export as PDF", icon: "picture_as_pdf", onClick: () => setFormat("PDF") },
            { label: "Export as DOCX", icon: "description", onClick: () => setFormat("DOCX") },
            { label: "Export as CSV", icon: "table_view", onClick: () => setFormat("CSV") },
          ]}
        />
        <SplitButton
          variant="tonal"
          size="sm"
          label="Share"
          items={[
            { label: "Copy link", icon: "link", onClick: () => setFormat("link") },
            { label: "Send email", icon: "mail", onClick: () => setFormat("email") },
          ]}
        />
        <SplitButton
          variant="outlined"
          size="lg"
          label="Options"
          items={[
            { label: "Rename", icon: "edit", onClick: () => setFormat("rename") },
            { label: "Duplicate", icon: "content_copy", onClick: () => setFormat("duplicate") },
            { label: "Move", icon: "drive_file_move", onClick: () => setFormat("move") },
          ]}
        />
        <SplitButton label="Disabled" disabled items={[{ label: "Nothing to see" }]} />
      </div>
      <Caption>Last chosen: {format}</Caption>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Button group (M3E)                                                  */
/* ------------------------------------------------------------------ */
export function ButtonGroupDemo() {
  const [range, setRange] = React.useState<string[]>(["week"]);
  const [styles, setStyles] = React.useState<string[]>(["bold"]);
  const [view, setView] = React.useState<string[]>(["list"]);

  return (
    <div className="flex flex-wrap items-center gap-4 p-2">
      <Caption>Single selection</Caption>
      <div className="flex flex-wrap items-center gap-4">
        <ButtonGroup
          selection="single"
          size="sm"
          value={range}
          onValueChange={setRange}
          buttons={[
            { id: "day", label: "Day" },
            { id: "week", label: "Week" },
            { id: "month", label: "Month" },
          ]}
        />
        <ButtonGroup
          variant="tonal"
          size="sm"
          buttons={[
            { id: "prev", icon: "chevron_left", label: "Back" },
            { id: "today", label: "Today" },
            { id: "next", icon: "chevron_right", label: "Forward" },
          ]}
        />
      </div>
      <Caption>Multiple selection</Caption>
      <ButtonGroup
        selection="multiple"
        size="sm"
        value={styles}
        onValueChange={setStyles}
        buttons={[
          { id: "bold", icon: "format_bold" },
          { id: "italic", icon: "format_italic" },
          { id: "underline", icon: "format_underlined" },
        ]}
      />
      <Caption>Filled &amp; disabled</Caption>
      <div className="flex flex-wrap items-center gap-4">
        <ButtonGroup
          variant="filled"
          size="sm"
          buttons={[
            { id: "reply", label: "Reply" },
            { id: "forward", label: "Forward" },
          ]}
        />
        <ButtonGroup
          size="sm"
          disabled
          buttons={[
            { id: "a", label: "One" },
            { id: "b", label: "Two" },
          ]}
        />
      </div>
      <Caption>Variable widths (M3E hover growth)</Caption>
      <div className="w-full max-w-xl">
        <ButtonGroup
          variableWidths
          selection="single"
          value={view}
          onValueChange={setView}
          buttons={[
            { id: "list", icon: "view_list", label: "List" },
            { id: "grid", icon: "grid_view", label: "Grid" },
            { id: "map", icon: "map", label: "Map" },
          ]}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Segmented button                                                    */
/* ------------------------------------------------------------------ */
export function SegmentedButtonDemo() {
  const [view, setView] = React.useState<string | string[]>("map");
  const [filters, setFilters] = React.useState<string | string[]>(["flights"]);

  return (
    <div className="flex flex-wrap items-center gap-4 p-2">
      <Caption>Single selection (check springs in)</Caption>
      <SegmentedButton
        options={[
          { value: "list", icon: "view_list", label: "List" },
          { value: "map", icon: "map", label: "Map" },
          { value: "gallery", icon: "photo_library", label: "Gallery" },
        ]}
        value={view}
        onValueChange={setView}
      />
      <Caption>Multiple selection · sm</Caption>
      <SegmentedButton
        type="multiple"
        size="sm"
        options={[
          { value: "flights", label: "Flights", icon: "flight" },
          { value: "hotels", label: "Hotels", icon: "hotel" },
          { value: "cars", label: "Cars", icon: "directions_car" },
        ]}
        value={filters}
        onValueChange={setFilters}
      />
      <Caption>Icon only · disabled</Caption>
      <SegmentedButton
        disabled
        options={[
          { value: "sun", icon: "light_mode" },
          { value: "moon", icon: "dark_mode" },
          { value: "auto", icon: "routines" },
        ]}
      />
      <Caption>
        View: {Array.isArray(view) ? view.join(", ") : view || "none"} · Filters:{" "}
        {Array.isArray(filters) ? filters.join(", ") : filters || "none"}
      </Caption>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Batch demo map                                                      */
/* ------------------------------------------------------------------ */
export const actionsDemoMap: Record<string, React.ComponentType> = {
  button: ButtonDemo,
  "icon-button": IconButtonDemo,
  fab: FabDemo,
  "extended-fab": ExtendedFabDemo,
  "fab-menu": FabMenuDemo,
  "split-button": SplitButtonDemo,
  "button-group": ButtonGroupDemo,
  "segmented-button": SegmentedButtonDemo,
};
