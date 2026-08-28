"use client";

import * as React from "react";
import { Card } from "@/components/m3/Card";
import { List, ListItem } from "@/components/m3/List";
import { BottomSheet } from "@/components/m3/BottomSheet";
import { SideSheet } from "@/components/m3/SideSheet";
import { DatePicker } from "@/components/m3/DatePicker";
import { TimePicker } from "@/components/m3/TimePicker";
import { Carousel } from "@/components/m3/Carousel";
import { Button } from "@/components/m3/Button";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";

/**
 * Containment + selection demos for the M3 Expressive showcase.
 * Each demo is self-contained with local state.
 */

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

export function CardDemo() {
  const [joined, setJoined] = React.useState(false);
  return (
    <div className="flex flex-wrap items-start gap-6 p-2">
      <Card variant="elevated" className="w-64 p-6">
        <span className="md-title-medium text-m3-on-surface">Elevated</span>
        <p className="md-body-medium text-m3-on-surface-variant">
          A shadowed card on surface-container-low at elevation 1 (12dp corners; hovers to
          elevation 2).
        </p>
      </Card>

      <Card variant="filled" className="w-64 p-6">
        <span className="md-title-medium text-m3-on-surface">Filled</span>
        <p className="md-body-medium text-m3-on-surface-variant">
          Uses the highest surface container for a solid tonal treatment.
        </p>
      </Card>

      <Card
        variant="outlined"
        interactive
        onClick={() => setJoined((j) => !j)}
        className="w-64 p-6"
      >
        <MaterialSymbol icon="palette" size={28} className="text-m3-primary" />
        <span className="md-title-medium text-m3-on-surface">Interactive</span>
        <p className="md-body-medium text-m3-on-surface-variant">
          Outlined card with a press shape morph, state layer and ripple.
        </p>
        <span
          onClick={(e) => e.stopPropagation()}
          className="mt-3 inline-block"
        >
          <Button size="sm" variant={joined ? "filled" : "tonal"} onClick={() => setJoined((j) => !j)}>
            {joined ? "Joined" : "Join"}
          </Button>
        </span>
      </Card>

      <Card variant="elevated" shape="extraLarge" className="w-64 p-6">
        <MaterialSymbol icon="auto_awesome" size={28} className="text-m3-primary" />
        <span className="md-title-medium text-m3-on-surface">M3E hero</span>
        <p className="md-body-medium text-m3-on-surface-variant">
          Expressive hero card using the 28dp extra-large shape.
        </p>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* List                                                                */
/* ------------------------------------------------------------------ */

export function ListDemo() {
  return (
    <div className="flex flex-wrap items-start gap-6 p-2">
      <List dividers className="w-[360px] overflow-hidden rounded-[20px] bg-m3-surface py-1">
        <ListItem
          leading={<MaterialSymbol icon="photo" />}
          headline="Photos"
          supporting="Yesterday · 24 items"
          onClick={() => {}}
        />
        <ListItem
          leading={<MaterialSymbol icon="favorite" />}
          headline="Favorites"
          supporting="Starred places you saved"
          trailing="128"
          selected
          onClick={() => {}}
        />
        <ListItem
          leading={<MaterialSymbol icon="archive" />}
          headline="Archive"
          supporting="Older than 90 days"
          trailingIcon="more_vert"
          onClick={() => {}}
        />
      </List>

      <List className="w-[360px] overflow-hidden rounded-[20px] bg-m3-surface-container py-1">
        <ListItem leading={<MaterialSymbol icon="timer" />} headline="Single line" onClick={() => {}} />
        <ListItem
          leading={<MaterialSymbol icon="description" />}
          headline="Three line"
          supporting={
            "Three-line rows grow to the official 88dp height: the headline stays on one line while the supporting text wraps over two lines and the content top-aligns."
          }
          lines={3}
          trailingIcon="more_vert"
          onClick={() => {}}
        />
      </List>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Bottom Sheet                                                        */
/* ------------------------------------------------------------------ */

export function BottomSheetDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-wrap items-start gap-6 p-2">
      <Button variant="tonal" icon="keyboard_arrow_up" onClick={() => setOpen(true)}>
        Open modal bottom sheet
      </Button>

      {/* Standard (persistent, inline, no scrim) */}
      <BottomSheet variant="standard" open={false} onClose={() => {}} title="Standard">
        <List>
          <ListItem leading={<MaterialSymbol icon="bookmark" />} headline="Saved" onClick={() => {}} />
          <ListItem leading={<MaterialSymbol icon="history" />} headline="Recent" onClick={() => {}} />
        </List>
      </BottomSheet>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Choose a playlist"
        footer={
          <Button variant="filled" fullWidth onClick={() => setOpen(false)}>
            Done
          </Button>
        }
      >
        <List>
          {[
            { icon: "music_note", name: "Focus Flow", meta: "42 songs" },
            { icon: "headphones", name: "Deep Work", meta: "31 songs" },
            { icon: "sunny", name: "Morning Boost", meta: "18 songs" },
            { icon: "bedtime", name: "Wind Down", meta: "25 songs" },
            { icon: "directions_run", name: "Run Cycle", meta: "37 songs" },
            { icon: "restaurant", name: "Dinner Jazz", meta: "22 songs" },
            { icon: "flight", name: "Travel Mix", meta: "29 songs" },
            { icon: "auto_awesome", name: "Discover Weekly", meta: "30 songs" },
          ].map((p) => (
            <ListItem
              key={p.name}
              leading={<MaterialSymbol icon={p.icon} />}
              headline={p.name}
              supporting={`${p.meta} · Made for you`}
              trailingIcon="more_vert"
              onClick={() => setOpen(false)}
            />
          ))}
        </List>
      </BottomSheet>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Side Sheet                                                          */
/* ------------------------------------------------------------------ */

export function SideSheetDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-wrap items-start gap-6 p-2">
      <Button variant="tonal" icon="open_in_new" onClick={() => setOpen(true)}>
        Open modal side sheet
      </Button>

      {/* Standard (persistent, inline, surface-toned) */}
      <SideSheet variant="standard" open={false} onClose={() => {}} side="right" title="Details">
        <List>
          <ListItem leading={<MaterialSymbol icon="label" />} headline="Design" onClick={() => {}} />
          <ListItem leading={<MaterialSymbol icon="code" />} headline="Engineering" selected onClick={() => {}} />
          <ListItem leading={<MaterialSymbol icon="campaign" />} headline="Marketing" onClick={() => {}} />
        </List>
      </SideSheet>

      {/* Modal */}
      <SideSheet
        open={open}
        onClose={() => setOpen(false)}
        side="right"
        title="Filters"
        footer={
          <Button variant="filled" fullWidth onClick={() => setOpen(false)}>
            Apply filters
          </Button>
        }
      >
        <List>
          <ListItem
            leading={<MaterialSymbol icon="check_circle" />}
            headline="Recently added"
            selected
            onClick={() => {}}
          />
          <ListItem
            leading={<MaterialSymbol icon="radio_button_unchecked" />}
            headline="Alphabetical"
            onClick={() => {}}
          />
          <ListItem
            leading={<MaterialSymbol icon="radio_button_unchecked" />}
            headline="Most played"
            onClick={() => {}}
          />
          <ListItem
            leading={<MaterialSymbol icon="radio_button_unchecked" />}
            headline="Shared with me"
            onClick={() => {}}
          />
        </List>
      </SideSheet>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Date Picker                                                         */
/* ------------------------------------------------------------------ */

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>(() => new Date());
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalDate, setModalDate] = React.useState<Date | undefined>(() => new Date());
  // Range selection (selectionMode="range") — shared by the inline picker,
  // the readout card and the range modal so all three stay in sync
  const [range, setRange] = React.useState<{ start?: Date; end?: Date }>({});
  const [rangeModalOpen, setRangeModalOpen] = React.useState(false);
  // "Fri, Aug 21" — same format as the modal header headline
  const fmt = (d: Date) =>
    `${d.toLocaleDateString("en-US", { weekday: "short" })}, ${d.toLocaleDateString("en-US", { month: "short" })} ${d.getDate()}`;
  // "Aug 21" / "Aug 21 – Aug 28" — the range-pair format from the modal header
  const fmtShort = (d: Date) =>
    `${d.toLocaleDateString("en-US", { month: "short" })} ${d.getDate()}`;
  const fmtRange = (r: { start?: Date; end?: Date }) =>
    r.start && r.end
      ? `${fmtShort(r.start)} – ${fmtShort(r.end)}`
      : r.start
        ? `${fmtShort(r.start)} – …`
        : "Select range";
  return (
    <div className="flex flex-wrap items-start gap-6 p-2">
      {/* Inline presentation (default) */}
      <DatePicker value={date} onChange={setDate} />
      <div className="flex flex-col justify-center gap-1 self-center rounded-[20px] bg-m3-secondary-container p-4 text-m3-on-secondary-container">
        <span className="md-label-medium">Selected date</span>
        <span className="md-title-medium tabular-nums">
          {date ? date.toDateString() : "None"}
        </span>
      </div>

      {/* Official modal presentation: outlined text-field-style trigger.
          Landscape layout (568×368) renders automatically at viewport ≥ 600px. */}
      <div className="flex w-full flex-col gap-3">
        <span className="md-label-large text-m3-on-surface">
          Modal presentation — 328×512dp portrait, 568×368dp landscape at viewport ≥ 600px
        </span>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="m3-state m3-focus flex h-14 w-64 cursor-pointer items-center justify-between gap-3 rounded-m3-xs border border-m3-outline px-4 outline-none hover:border-m3-on-surface"
          >
            <span
              className={`md-body-large truncate ${modalDate ? "text-m3-on-surface" : "text-m3-on-surface-variant"}`}
            >
              {modalDate ? fmt(modalDate) : "Choose date"}
            </span>
            <MaterialSymbol icon="calendar_today" size={24} className="shrink-0 text-m3-on-surface-variant" />
          </button>
          <span className="md-body-small text-m3-on-surface-variant">
            Selection applies live · Escape / scrim dismiss
          </span>
        </div>
      </div>

      <DatePicker
        presentation="modal"
        open={modalOpen}
        onOpenChange={setModalOpen}
        value={modalDate}
        onChange={setModalDate}
      />

      {/* Range selection: inline picker + live readout + range modal trigger */}
      <div className="flex w-full flex-col gap-3" data-testid="date-range-demo">
        <span className="md-label-large text-m3-on-surface">
          Range selection — tap the start, then the end; tapping before the start restarts
        </span>
        <div className="flex flex-wrap items-start gap-6">
          <div data-testid="date-range-inline">
            <DatePicker
              selectionMode="range"
              range={range}
              onRangeChange={setRange}
            />
          </div>
          <div
            data-testid="date-range-readout"
            className="flex flex-col justify-center gap-1 self-center rounded-[20px] bg-m3-secondary-container p-4 text-m3-on-secondary-container"
          >
            <span className="md-label-medium">Selected range</span>
            <span className="md-title-medium tabular-nums" data-testid="range-start">
              {range.start ? fmtShort(range.start) : "Start date"}
            </span>
            <span className="md-title-medium tabular-nums" data-testid="range-end">
              {range.end ? fmtShort(range.end) : "End date"}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            data-testid="range-modal-trigger"
            onClick={() => setRangeModalOpen(true)}
            className="m3-state m3-focus flex h-14 w-64 cursor-pointer items-center justify-between gap-3 rounded-m3-xs border border-m3-outline px-4 outline-none hover:border-m3-on-surface"
          >
            <span
              className={`md-body-large truncate ${range.start && range.end ? "text-m3-on-surface" : "text-m3-on-surface-variant"}`}
            >
              {fmtRange(range)}
            </span>
            <MaterialSymbol icon="date_range" size={24} className="shrink-0 text-m3-on-surface-variant" />
          </button>
          <span className="md-body-small text-m3-on-surface-variant">
            Modal closes only when the range is complete · Escape / scrim dismiss
          </span>
        </div>
      </div>

      <DatePicker
        presentation="modal"
        selectionMode="range"
        open={rangeModalOpen}
        onOpenChange={setRangeModalOpen}
        range={range}
        onRangeChange={setRange}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Time Picker                                                         */
/* ------------------------------------------------------------------ */

export function TimePickerDemo() {
  const [time, setTime] = React.useState({ hour: 10, minute: 30 });
  const [time24, setTime24] = React.useState({ hour: 18, minute: 30 });
  return (
    <div className="flex flex-wrap items-start gap-6 p-2">
      <div className="flex flex-col items-center gap-2">
        <TimePicker value={time} onChange={setTime} />
        <span className="md-label-medium text-m3-on-surface-variant">12-hour · AM/PM selector</span>
      </div>
      <div className="flex flex-col items-center gap-2" data-testid="timepicker-24h">
        <TimePicker use24h value={time24} onChange={setTime24} />
        <span className="md-label-medium text-m3-on-surface-variant">24-hour double-ring dial</span>
      </div>
      <div className="flex flex-col justify-center gap-1 self-center rounded-[20px] bg-m3-tertiary-container p-4 text-m3-on-tertiary-container">
        <span className="md-label-medium">Selected time</span>
        <span className="md-display-small tabular-nums">
          {String(time.hour).padStart(2, "0")}:{String(time.minute).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Carousel                                                            */
/* ------------------------------------------------------------------ */

const carouselItems = [
  { id: "beach", label: "Beach day", icon: "beach_access", tone: "primary" },
  { id: "hike", label: "Hiking", icon: "hiking", tone: "secondary" },
  { id: "museum", label: "Museums", icon: "museum", tone: "tertiary" },
  { id: "food", label: "Food tours", icon: "restaurant", tone: "surface" },
  { id: "flight", label: "Getaways", icon: "flight_takeoff", tone: "secondary" },
  { id: "park", label: "Parks", icon: "park", tone: "tertiary" },
  { id: "music", label: "Festivals", icon: "festival", tone: "primary" },
  { id: "photo", label: "Photo spots", icon: "photo_camera", tone: "surface" },
] as const;

export function CarouselDemo() {
  const [picked, setPicked] = React.useState<string | null>(null);
  const items = React.useMemo(
    () =>
      carouselItems.map((it) => ({
        ...it,
        onClick: (item: { id: string }) => setPicked(item.id),
      })),
    []
  );
  return (
    <div className="m3-scroll w-full overflow-x-auto pb-1"><div className="flex w-full min-w-[720px] flex-col gap-3 p-2" data-testid="carousel-demo">
      {/* multi-browse — flexible widths + the M3E hover-grow */}
      <section className="flex flex-col gap-2">
        <span className="md-label-large text-m3-on-surface">
          Multi-browse — hover or focus an item: it springs to ~1.12× while neighbors shrink
        </span>
        <Carousel items={items} layout="multi-browse" itemCount={4} ariaLabel="Weekend getaways" />
        <span className="md-label-medium text-m3-on-surface-variant" data-testid="carousel-picked">
          {picked ? `Opened: ${picked}` : "Tap an item · 4 visible + a 24px peek · Arrow keys rove focus"}
        </span>
      </section>

      {/* hero — one large leading item, smaller rest */}
      <section className="mt-2 flex flex-col gap-2">
        <span className="md-label-large text-m3-on-surface">
          Hero — featured item takes ~66% width; the rest are smaller (3:2 proportions)
        </span>
        <Carousel items={items.slice(0, 5)} layout="hero" ariaLabel="Featured getaways" />
      </section>

      {/* inline — one full-width item per view, with visible navigation arrows */}
      <section className="mt-2 flex flex-col gap-2">
        <span className="md-label-large text-m3-on-surface">
          Inline — one full-width item per view, with navigation arrows (arrows=&quot;always&quot;)
        </span>
        <Carousel
          items={items.slice(0, 5)}
          layout="inline"
          arrows="always"
          ariaLabel="Full-bleed getaways"
        />
      </section>
    </div></div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo map                                                            */
/* ------------------------------------------------------------------ */

export const containmentDemoMap: Record<string, React.ComponentType> = {
  card: CardDemo,
  list: ListDemo,
  "bottom-sheet": BottomSheetDemo,
  "side-sheet": SideSheetDemo,
  "date-picker": DatePickerDemo,
  "time-picker": TimePickerDemo,
  carousel: CarouselDemo,
};
