'use client';

import * as React from "react";
import { TextField } from "@/components/m3/TextField";
import { SearchBar } from "@/components/m3/SearchBar";
import { SearchView } from "@/components/m3/SearchView";
import { Autocomplete } from "@/components/m3/Autocomplete";
import { MaterialSymbol } from "@/components/m3/MaterialSymbol";
import { Checkbox } from "@/components/m3/Checkbox";
import { Radio, RadioGroup } from "@/components/m3/Radio";
import { Switch } from "@/components/m3/Switch";
import { Slider } from "@/components/m3/Slider";
import { Chip, ChipGroup } from "@/components/m3/Chip";

/* ------------------------------------------------------------------ */
/* Text field                                                          */
/* ------------------------------------------------------------------ */

export function TextFieldDemo() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("not-an-email");
  return (
    <div className="flex max-w-sm flex-col gap-6 p-2">
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        helperText="What should we call you?"
        leadingIcon="person"
        required
        fullWidth
      />
      <TextField
        label="Email"
        variant="filled"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error
        helperText="Enter a valid email address"
        fullWidth
      />
      <TextField
        label="Support code"
        placeholder="M3-XXXX"
        trailingIcon="content_paste"
        helperText="Found in Settings → About"
        fullWidth
      />
      <TextField label="Disabled field" value="Locked value" disabled fullWidth readOnly />
      <div className="flex min-w-0 flex-col items-stretch gap-4 sm:flex-row sm:items-end">
        <TextField size="sm" label="Small" className="min-w-0" fullWidth />
        <TextField size="lg" label="Large" className="min-w-0" fullWidth />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Search bar                                                          */
/* ------------------------------------------------------------------ */

export function SearchBarDemo() {
  const [query, setQuery] = React.useState("");
  const [preset, setPreset] = React.useState("M3");
  const [lastAction, setLastAction] = React.useState("No search action used");
  return (
    <div className="flex max-w-xl flex-col gap-6 p-2">
      <SearchBar
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        trailingIcons={[
          { icon: "mic", label: "Voice search", onClick: () => setLastAction("Voice search") },
          { icon: "close", label: "Clear search", onClick: () => setQuery("") },
        ]}
        placeholder="Search components…"
      />
      <SearchBar
        size="sm"
        value={preset}
        onChange={(e) => setPreset(e.target.value)}
        fullWidth
        trailingIcons={[{ icon: "filter_list", label: "Filter results", onClick: () => setLastAction("Filters") }]}
      />
      <SearchBar size="lg" value="" onChange={() => {}} leadingIcon="travel_explore" placeholder="Large, disabled" fullWidth disabled />
      <span className="md-body-small text-m3-on-surface-variant">{lastAction}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Search view                                                         */
/* ------------------------------------------------------------------ */

const CATALOG = [
  "Search bar", "Search view", "Text field", "Autocomplete", "Checkbox",
  "Chip", "Dialog", "Bottom sheet", "Navigation drawer", "Slider",
  "Snackbar", "Tabs", "Banner", "FAB",
];

/** Static result rows filtered by the current query, with an empty state. */
function SearchResultRows({ query }: { query: string }) {
  const q = query.trim().toLowerCase();
  const matches = CATALOG.filter((c) => c.toLowerCase().includes(q));
  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
        <MaterialSymbol icon="search_off" size={40} className="text-m3-on-surface-variant" />
        <p className="md-body-large text-m3-on-surface-variant">No results for “{query}”</p>
      </div>
    );
  }
  return (
    <ul>
      {matches.map((m) => (
        <li
          key={m}
          className="m3-state relative flex min-h-12 cursor-pointer items-center gap-3 overflow-hidden px-4 md-body-large text-m3-on-surface"
        >
          <MaterialSymbol icon="search" size={20} className="text-m3-on-surface-variant" />
          <span className="truncate">{m}</span>
        </li>
      ))}
    </ul>
  );
}

export function SearchViewDemo() {
  const [open, setOpen] = React.useState(false);
  const [recents, setRecents] = React.useState(["navigation rail", "bottom sheet", "chips", "elevation"]);
  const [fullQuery, setFullQuery] = React.useState("");
  const [dockedQuery, setDockedQuery] = React.useState("");
  const [dockedOpen, setDockedOpen] = React.useState(false);
  const [lastAction, setLastAction] = React.useState("Nothing selected yet");
  return (
    <div className="flex max-w-xl flex-col gap-6 p-2">
      {/* (a) Full-screen search view, opened from a SearchBar-style trigger */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="m3-state flex h-14 w-full items-center gap-3 rounded-full bg-m3-surface-container-high px-4 text-left"
        >
          <MaterialSymbol icon="search" size={24} className="shrink-0 text-m3-on-surface-variant" />
          <span className="md-body-large text-m3-on-surface-variant">Search the catalog…</span>
        </button>
        <p className="md-body-small text-m3-on-surface-variant">{lastAction}</p>
      </div>
      <SearchView
        open={open}
        onOpenChange={setOpen}
        value={fullQuery}
        onValueChange={setFullQuery}
        recentSearches={recents}
        onRecentSelect={(q) => setLastAction(`Selected recent: “${q}”`)}
        onRecentRemove={(q) => setRecents((r) => r.filter((x) => x !== q))}
      >
        <SearchResultRows query={fullQuery} />
      </SearchView>

      {/* (b) Docked search view — floating above a dismissible scrim */}
      <div className="flex flex-col gap-3">
        <p className="md-label-large text-m3-on-surface">Docked mode</p>
        <button
          type="button"
          onClick={() => setDockedOpen(true)}
          className="m3-state m3-focus h-12 rounded-full bg-m3-secondary-container px-5 md-label-large text-m3-on-secondary-container outline-none"
        >
          Open docked search
        </button>
        <SearchView
          open={dockedOpen}
          mode="docked"
          value={dockedQuery}
          onOpenChange={setDockedOpen}
          onValueChange={setDockedQuery}
          placeholder="Search tokens"
        >
          <SearchResultRows query={dockedQuery} />
        </SearchView>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Autocomplete                                                        */
/* ------------------------------------------------------------------ */

const FRAMEWORKS = ["React", "Vue", "Angular", "Svelte", "Solid", "Qwik", "Preact", "Ember"];

export function AutocompleteDemo() {
  const [framework, setFramework] = React.useState("");
  const [stack, setStack] = React.useState("React");
  return (
    <div className="flex max-w-md flex-col gap-6 p-2">
      <Autocomplete options={FRAMEWORKS} value={framework} onChange={setFramework} label="Framework" name="framework" required placeholder="Type to filter…" fullWidth />
      <Autocomplete options={FRAMEWORKS} value={stack} onChange={setStack} label="Preselected" fullWidth />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Checkbox                                                            */
/* ------------------------------------------------------------------ */

export function CheckboxDemo() {
  const [design, setDesign] = React.useState(true);
  const [engineering, setEngineering] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(true);
  return (
    <div className="flex flex-wrap items-center gap-6 p-2">
      <div className="flex flex-col gap-1">
        <Checkbox
          checked={design && engineering}
          indeterminate={design !== engineering}
          onChange={(c) => {
            setDesign(c);
            setEngineering(c);
          }}
          label="Select all"
        />
        <Checkbox name="disciplines" value="design" checked={design} onChange={setDesign} label="Design" />
        <Checkbox name="disciplines" value="engineering" checked={engineering} onChange={setEngineering} label="Engineering" />
      </div>
      <div className="flex flex-col gap-1">
        <Checkbox checked={subscribed} onChange={setSubscribed} label="Email updates" />
        <Checkbox name="terms" defaultChecked label="Terms accepted" />
        <Checkbox checked error onChange={() => {}} label="Sync failed" />
        <Checkbox checked disabled label="Archived" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Radio                                                               */
/* ------------------------------------------------------------------ */

const PLANS = ["free", "standard", "pro"] as const;

export function RadioDemo() {
  const [plan, setPlan] = React.useState<string>("standard");
  return (
    <div className="flex flex-wrap items-center gap-6 p-2">
      <RadioGroup label="Plan" name="plan" value={plan} onValueChange={setPlan} className="gap-1">
        {PLANS.map((p) => (
          <Radio
            key={p}
            value={p}
            label={p.charAt(0).toUpperCase() + p.slice(1)}
          />
        ))}
      </RadioGroup>
      <RadioGroup label="Digest frequency" name="digest" defaultValue="daily" className="gap-1">
        <Radio value="daily" label="Daily" />
        <Radio value="weekly" label="Weekly" />
      </RadioGroup>
      <Radio checked={false} disabled label="Unavailable" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Switch                                                              */
/* ------------------------------------------------------------------ */

export function SwitchDemo() {
  const [wifi, setWifi] = React.useState(true);
  const [bluetooth, setBluetooth] = React.useState(false);
  return (
    <div className="flex flex-wrap items-center gap-6 p-2">
      <div className="flex items-center gap-3">
        <Switch aria-label="Wi-Fi" name="wifi" checked={wifi} onCheckedChange={setWifi} />
        <span className="md-body-medium text-m3-on-surface-variant">Wi-Fi {wifi ? "on" : "off"}</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch aria-label="Bluetooth" name="bluetooth" checked={bluetooth} onCheckedChange={setBluetooth} showUnselectedIcon />
        <span className="md-body-medium text-m3-on-surface-variant">Bluetooth</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch aria-label="Auto updates" name="auto_updates" defaultChecked showIcon />
        <span className="md-body-medium text-m3-on-surface-variant">Auto updates</span>
      </div>
      <Switch aria-label="Enabled setting unavailable" checked disabled />
      <Switch aria-label="Disabled setting unavailable" disabled />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Slider                                                              */
/* ------------------------------------------------------------------ */

export function SliderDemo() {
  const [volume, setVolume] = React.useState(40);
  const [steps, setSteps] = React.useState(3);
  const [balance, setBalance] = React.useState(60);
  const [range, setRange] = React.useState<[number, number]>([25, 75]);
  return (
    <div className="flex max-w-xl flex-wrap items-center gap-6 p-2">
      <Slider
        value={volume}
        onChange={setVolume}
        name="volume"
        size="md"
        insetIcons={{ start: "volume_down", end: "volume_up" }}
        showValueLabel
        fullWidth
        aria-label="Volume"
      />
      <div className="w-full">
        <div className="mb-2 md-body-medium text-m3-on-surface-variant">Steps: {steps}</div>
        <Slider value={steps} onChange={setSteps} min={0} max={10} stops showValueLabel fullWidth aria-label="Steps" />
      </div>
      <Slider variant="centered" value={balance} onChange={setBalance} showValueLabel fullWidth aria-label="Balance" />
      <Slider
        variant="range"
        value={range}
        onChange={setRange}
        rangeNames={["priceMin", "priceMax"]}
        stops
        fullWidth
        aria-label="Price range"
      />
      <div className="h-64">
        <Slider orientation="vertical" size="lg" value={volume} onChange={setVolume} showValueLabel aria-label="Vertical level" />
      </div>
      <Slider value={70} onChange={() => {}} disabled fullWidth aria-label="Disabled slider" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Chip                                                                */
/* ------------------------------------------------------------------ */

const FILTER_TAGS = ["landscape", "portrait", "night"];

export function ChipDemo() {
  const [filters, setFilters] = React.useState<string[]>(["landscape"]);
  const [tags, setTags] = React.useState<string[]>(["material", "expressive"]);

  const toggleFilter = (tag: string, next: boolean) =>
    setFilters((prev) => (next ? [...prev, tag] : prev.filter((t) => t !== tag)));

  return (
    <div className="flex flex-wrap items-center gap-6 p-2">
      <div className="flex flex-wrap items-center gap-2">
        <Chip>Assist</Chip>
        <Chip elevated leadingIcon="auto_awesome">
          Elevated
        </Chip>
        <Chip variant="assist" trailingIcon="open_in_new">
          Open docs
        </Chip>
      </div>
      <ChipGroup label="Photo filters">
        {FILTER_TAGS.map((tag) => (
          <Chip
            key={tag}
            variant="filter"
            selected={filters.includes(tag)}
            onSelect={(next) => toggleFilter(tag, next)}
          >
            {tag}
          </Chip>
        ))}
      </ChipGroup>
      <ChipGroup label="Editable tags">
        {tags.map((tag) => (
          <Chip
            key={tag}
            variant="input"
            avatar={
              <span className="grid place-items-center bg-m3-primary-container md-label-small text-m3-on-primary-container">
                {tag[0]?.toUpperCase()}
              </span>
            }
            onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
          >
            {tag}
          </Chip>
        ))}
        {tags.length === 0 && <span className="md-body-medium text-m3-on-surface-variant">All tags removed</span>}
      </ChipGroup>
      <div className="flex flex-wrap items-center gap-2">
        <Chip variant="suggestion" size="md">
          Suggestion
        </Chip>
        <Chip size="xs">Tiny</Chip>
        <Chip disabled>Disabled</Chip>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Batch demo map                                                      */
/* ------------------------------------------------------------------ */

export const inputsDemoMap: Record<string, React.ComponentType> = {
  "text-field": TextFieldDemo,
  "search-bar": SearchBarDemo,
  "search-view": SearchViewDemo,
  autocomplete: AutocompleteDemo,
  checkbox: CheckboxDemo,
  radio: RadioDemo,
  switch: SwitchDemo,
  slider: SliderDemo,
  chip: ChipDemo,
};
