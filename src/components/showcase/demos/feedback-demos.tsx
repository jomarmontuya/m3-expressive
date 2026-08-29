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
import { IconButton } from "@/components/m3/IconButton";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";

export function BadgeDemo() {
  const [count, setCount] = React.useState(3);
  return (
    <div className="flex flex-wrap items-center gap-6 p-2">
      <Badge value={count} ariaLabel={`${count} unread messages`}>
        <IconButton
          variant="standard"
          size="sm"
          icon="inbox"
          onClick={() => setCount((c) => c + 1)}
          aria-label="Inbox"
        />
      </Badge>
      <Badge showDot ariaLabel="New notifications">
        <span className="text-m3-on-surface-variant">
          <MaterialSymbol icon="notifications" size={24} />
        </span>
      </Badge>
      <Badge value={250} color="primary" ariaLabel="250 cart items">
        <span className="text-m3-on-surface-variant">
          <MaterialSymbol icon="shopping_cart" size={24} />
        </span>
      </Badge>
      <Badge value="new" color="tertiary" ariaLabel="New chat message">
        <span className="text-m3-on-surface-variant">
          <MaterialSymbol icon="chat_bubble" size={24} />
        </span>
      </Badge>
      <span className="flex items-center gap-3">
        <Badge value={99} max={99} ariaLabel="99 saved items">
          <MaterialSymbol icon="bookmark" size={24} />
        </Badge>
        <Badge value={142} max={99} ariaLabel="More than 99 saved items">
          <MaterialSymbol icon="bookmark" size={24} />
        </Badge>
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
      <LinearProgress value={60} wavy color="error" label="Syncing" fullWidth />
      <LinearProgress wavy color="primary" fullWidth />
    </div>
  );
}

export function CircularProgressDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6 p-2">
      <CircularProgress value={25} />
      <CircularProgress value={50} color="secondary" />
      <CircularProgress value={75} color="tertiary" size={64} thickness={6} />
      <CircularProgress value={60} wavy color="secondary" />
      <CircularProgress wavy color="primary" />
      <CircularProgress color="error" />
      <CircularProgress size={32} thickness={3} />
    </div>
  );
}

export function LoadingIndicatorDemo() {
  const [active, setActive] = React.useState(true);
  return (
    <div className="flex flex-wrap items-center gap-6 p-2">
      <LoadingIndicator size={40} active={active} ariaLabel="Loading compact preview" />
      <LoadingIndicator size={48} active={active} ariaLabel="Loading preview" />
      <LoadingIndicator variant="contained" size={72} color="secondary" active={active} ariaLabel="Loading media" />
      <LoadingIndicator variant="contained" size={56} color="tertiary" active={active} ariaLabel="Loading recommendations" />
      <LoadingIndicator variant="contained" size={48} color="error" active={active} ariaLabel="Retrying request" />
      <LoadingIndicator progress={0} ariaLabel="Upload at 0 percent" />
      <LoadingIndicator progress={0.5} color="secondary" ariaLabel="Upload at 50 percent" />
      <LoadingIndicator progress={1} color="tertiary" ariaLabel="Upload complete" />
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
  const [activeSnackbar, setActiveSnackbar] = React.useState<
    "simple" | "action" | null
  >(null);
  const [status, setStatus] = React.useState("");
  return (
    <div className="flex flex-wrap items-center gap-6 p-2">
      <Button
        variant="tonal"
        onClick={() => {
          setActiveSnackbar("simple");
          setStatus("File sent.");
        }}
      >
        Simple snackbar
      </Button>
      <Button
        variant="filled"
        icon="archive"
        onClick={() => {
          setActiveSnackbar("action");
          setStatus("Photo archived. Undo is available in the snackbar.");
        }}
      >
        Snackbar with action
      </Button>
      <p className="w-full md-body-medium text-m3-on-surface-variant">
        Snackbars are swipe-dismissable — flick or drag one in any direction to dismiss.
      </p>
      <p
        role="status"
        aria-live="polite"
        className="w-full md-body-medium text-m3-on-surface"
      >
        {status}
      </p>
      <Snackbar
        open={activeSnackbar !== null}
        message={activeSnackbar === "action" ? "Photo archived" : "File sent"}
        icon={activeSnackbar === "action" ? "archive" : undefined}
        actionLabel={activeSnackbar === "action" ? "Undo" : undefined}
        actionOnNewLine={activeSnackbar === "action"}
        onAction={() => {
          setActiveSnackbar(null);
          setStatus("Archive undone.");
        }}
        onClose={() => setActiveSnackbar(null)}
        className="sm:left-1/2 sm:-translate-x-1/2"
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
        persistent
        title="Attach file"
        content="Attach documents, images, or videos up to 25 MB per file."
        actionLabel="Learn more"
        showCaret
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
        Full-screen dialog
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
        fullScreen
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
        <p className="md-body-medium text-m3-on-surface py-2">Generic start inset (16 / 0)</p>
        <Divider inset="start" />
        <p className="md-body-medium text-m3-on-surface py-2">List preset (16 / 24)</p>
        <Divider inset="list" semantic />
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
