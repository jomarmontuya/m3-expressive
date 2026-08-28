"use client";

import * as React from "react";
import { Badge } from "@/components/m3/Badge";
import { LinearProgress } from "@/components/m3/LinearProgress";
import { CircularProgress } from "@/components/m3/CircularProgress";
import { LoadingIndicator } from "@/components/m3/LoadingIndicator";
import { Snackbar } from "@/components/m3/Snackbar";
import { Tooltip } from "@/components/m3/Tooltip";
import { Banner } from "@/components/m3/Banner";
import { Dialog } from "@/components/m3/Dialog";
import { Divider } from "@/components/m3/Divider";
import { Button } from "@/components/m3/Button";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";

export function BadgeDemo() {
  const [count, setCount] = React.useState(3);
  return (
    <div className="flex flex-wrap items-center gap-6 p-2">
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        aria-label={`Inbox, ${count} unread`}
        className="m3-state relative rounded-full p-2 text-m3-on-surface-variant"
      >
        <MaterialSymbol icon="inbox" size={24} />
        <Badge value={count} />
      </button>
      <span className="relative text-m3-on-surface-variant">
        <MaterialSymbol icon="notifications" size={24} />
        <Badge showDot />
      </span>
      <span className="relative text-m3-on-surface-variant">
        <MaterialSymbol icon="shopping_cart" size={24} />
        <Badge value={250} color="primary" />
      </span>
      <span className="relative text-m3-on-surface-variant">
        <MaterialSymbol icon="chat_bubble" size={24} />
        <Badge value="new" color="tertiary" />
      </span>
      <span className="relative text-m3-on-surface-variant opacity-60">
        <MaterialSymbol icon="mail" size={24} />
        <Badge value={12} disabled />
      </span>
      <span className="flex items-center gap-3">
        <Badge value={99} max={99} />
        <Badge value={142} max={99} />
      </span>
    </div>
  );
}

export function LinearProgressDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6 p-2">
      <LinearProgress value={40} label="Downloading" fullWidth />
      <LinearProgress value={70} color="secondary" label="Storage used" height={8} fullWidth />
      <LinearProgress color="tertiary" label="Loading…" fullWidth />
      <LinearProgress value={60} wavey color="error" label="Syncing" fullWidth />
      <LinearProgress wavey color="primary" fullWidth />
    </div>
  );
}

export function CircularProgressDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6 p-2">
      <CircularProgress value={25} />
      <CircularProgress value={50} color="secondary" />
      <CircularProgress value={75} color="tertiary" size={64} thickness={6} />
      <CircularProgress color="error" />
      <CircularProgress size={32} thickness={3} />
    </div>
  );
}

export function LoadingIndicatorDemo() {
  const [active, setActive] = React.useState(true);
  return (
    <div className="flex flex-wrap items-center gap-6 p-2">
      <LoadingIndicator size={40} active={active} />
      <LoadingIndicator size={48} active={active} />
      <LoadingIndicator size={72} color="secondary" active={active} />
      <LoadingIndicator size={56} color="tertiary" active={active} />
      <LoadingIndicator size={48} color="error" active={active} />
      <Button
        variant="tonal"
        icon={active ? "pause" : "play_arrow"}
        onClick={() => setActive((a) => !a)}
      >
        {active ? "Pause" : "Play"}
      </Button>
    </div>
  );
}

export function SnackbarDemo() {
  const [simpleOpen, setSimpleOpen] = React.useState(false);
  const [actionOpen, setActionOpen] = React.useState(false);
  return (
    <div className="flex flex-wrap items-center gap-6 p-2">
      <Button variant="tonal" onClick={() => setSimpleOpen(true)}>
        Simple snackbar
      </Button>
      <Button variant="filled" icon="archive" onClick={() => setActionOpen(true)}>
        Snackbar with action
      </Button>
      <p className="w-full md-body-medium text-m3-on-surface-variant">
        Snackbars are swipe-dismissable — flick or drag one in any direction to dismiss.
      </p>
      <Snackbar
        open={simpleOpen}
        message="File sent"
        onClose={() => setSimpleOpen(false)}
      />
      {/* Official M3: only one snackbar at a time — stack the demo pair so
          both are legible when open simultaneously. */}
      <Snackbar
        open={actionOpen}
        message="Photo archived"
        icon="archive"
        actionLabel="Undo"
        onAction={() => setActionOpen(false)}
        onClose={() => setActionOpen(false)}
        className="bottom-24"
      />
    </div>
  );
}

export function TooltipDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6 p-2">
      <Tooltip content="Add to favorites">
        <Button variant="text" icon="favorite">
          Like
        </Button>
      </Tooltip>
      <Tooltip content="Delete this file permanently">
        <Button variant="text" icon="delete" />
      </Tooltip>
      <Tooltip
        rich
        title="Attach file"
        content="Attach documents, images, or videos up to 25 MB per file."
        actionLabel="Learn more"
        placement="bottom"
      >
        <Button variant="outlined" icon="attach_file">
          Attach
        </Button>
      </Tooltip>
    </div>
  );
}

export function BannerDemo() {
  const [open, setOpen] = React.useState(true);
  return (
    <div className="flex flex-wrap items-center gap-6 p-2">
      {!open && (
        <Button variant="tonal" icon="visibility" onClick={() => setOpen(true)}>
          Show banner
        </Button>
      )}
      <Banner
        icon="wifi_off"
        text="You're offline. Messages will send once you reconnect."
        actions={[
          { label: "Retry", onClick: () => setOpen(false) },
          { label: "Dismiss", onClick: () => setOpen(false) },
        ]}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      />
    </div>
  );
}

export function DialogDemo() {
  const [basicOpen, setBasicOpen] = React.useState(false);
  const [fullOpen, setFullOpen] = React.useState(false);
  return (
    <div className="flex flex-wrap items-center gap-6 p-2">
      <Button variant="tonal" onClick={() => setBasicOpen(true)}>
        Open dialog
      </Button>
      <Button variant="outlined" onClick={() => setFullOpen(true)}>
        Fullscreen dialog
      </Button>
      <Dialog
        open={basicOpen}
        onClose={() => setBasicOpen(false)}
        icon="delete"
        headline="Reset settings?"
        actions={
          <>
            <Button variant="text" onClick={() => setBasicOpen(false)}>
              Cancel
            </Button>
            <Button variant="filled" onClick={() => setBasicOpen(false)}>
              Reset
            </Button>
          </>
        }
      >
        This will reset all app settings back to their defaults. Preferences like theme and
        language will be lost.
      </Dialog>
      <Dialog
        open={fullOpen}
        onClose={() => setFullOpen(false)}
        fullscreen
        headline="Edit profile"
        actions={
          <>
            <Button variant="text" onClick={() => setFullOpen(false)}>
              Cancel
            </Button>
            <Button variant="filled" onClick={() => setFullOpen(false)}>
              Save
            </Button>
          </>
        }
      >
        Fullscreen dialogs are ideal for immersive tasks like composing or editing.
      </Dialog>
    </div>
  );
}

export function DividerDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6 p-2">
      <div className="w-full max-w-xs">
        <p className="md-body-medium text-m3-on-surface py-2">Full width</p>
        <Divider />
        <p className="md-body-medium text-m3-on-surface py-2">Inset start</p>
        <Divider inset="start" />
        <p className="md-body-medium text-m3-on-surface py-2">Inset middle</p>
        <Divider inset="middle" />
        <p className="md-body-medium text-m3-on-surface py-2">Thick outline</p>
        <Divider thickness={2} color="outline" />
      </div>
      <div className="flex h-16 items-stretch gap-4">
        <span className="md-body-medium text-m3-on-surface-variant">Left</span>
        <Divider orientation="vertical" />
        <span className="md-body-medium text-m3-on-surface-variant">Center</span>
        <Divider orientation="vertical" inset="middle" color="outline" />
        <span className="md-body-medium text-m3-on-surface-variant">Right</span>
      </div>
    </div>
  );
}

export const feedbackDemoMap: Record<string, React.ComponentType> = {
  badge: BadgeDemo,
  "linear-progress": LinearProgressDemo,
  "circular-progress": CircularProgressDemo,
  "loading-indicator": LoadingIndicatorDemo,
  snackbar: SnackbarDemo,
  tooltip: TooltipDemo,
  banner: BannerDemo,
  dialog: DialogDemo,
  divider: DividerDemo,
};
