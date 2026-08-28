'use client';

import * as React from "react";
import { TextField } from "@/components/m3/TextField";
import { SearchBar } from "@/components/m3/SearchBar";
import { Autocomplete } from "@/components/m3/Autocomplete";
import { Checkbox } from "@/components/m3/Checkbox";
import { Radio, RadioGroup } from "@/components/m3/Radio";
import { Switch } from "@/components/m3/Switch";
import { Slider } from "@/components/m3/Slider";
import { Chip } from "@/components/m3/Chip";

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
      <div className="flex items-end gap-4">
        <TextField size="sm" label="Small" fullWidth />
        <TextField size="lg" label="Large" fullWidth />
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
  return (
    <div className="flex max-w-xl flex-col gap-6 p-2">
      <SearchBar
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        trailingIcons={["mic", "close"]}
        placeholder="Search components…"
      />
      <SearchBar size="sm" value={preset} onChange={(e) => setPreset(e.target.value)} fullWidth trailingIcons={["filter_list"]} />
      <SearchBar size="lg" value="" onChange={() => {}} leadingIcon="travel_explore" placeholder="Large, disabled" fullWidth disabled />
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
      <Autocomplete options={FRAMEWORKS} value={framework} onChange={setFramework} label="Framework" placeholder="Type to filter…" fullWidth />
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
        <Checkbox checked={design} onChange={setDesign} label="Design" />
        <Checkbox checked={engineering} onChange={setEngineering} label="Engineering" />
      </div>
      <div className="flex flex-col gap-1">
        <Checkbox checked={subscribed} onChange={setSubscribed} label="Email updates" />
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
      <RadioGroup label="Plan" className="gap-1">
        {PLANS.map((p) => (
          <Radio
            key={p}
            checked={plan === p}
            onChange={() => setPlan(p)}
            label={p.charAt(0).toUpperCase() + p.slice(1)}
          />
        ))}
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
        <Switch checked={wifi} onCheckedChange={setWifi} />
        <span className="md-body-medium text-m3-on-surface-variant">Wi-Fi {wifi ? "on" : "off"}</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch checked={bluetooth} onCheckedChange={setBluetooth} />
        <span className="md-body-medium text-m3-on-surface-variant">Bluetooth</span>
      </div>
      <Switch checked disabled />
      <Switch disabled />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Slider                                                              */
/* ------------------------------------------------------------------ */

export function SliderDemo() {
  const [volume, setVolume] = React.useState(40);
  const [steps, setSteps] = React.useState(3);
  return (
    <div className="flex max-w-md flex-wrap items-center gap-6 p-2">
      <Slider value={volume} onChange={setVolume} showValueLabel fullWidth aria-label="Volume" />
      <div className="w-full">
        <div className="mb-2 md-body-medium text-m3-on-surface-variant">Steps: {steps}</div>
        <Slider value={steps} onChange={setSteps} min={0} max={10} discrete showValueLabel fullWidth aria-label="Steps" />
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
      <div className="flex flex-wrap items-center gap-2">
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
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <Chip
            key={tag}
            variant="input"
            leadingIcon="tag"
            onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
          >
            {tag}
          </Chip>
        ))}
        {tags.length === 0 && <span className="md-body-medium text-m3-on-surface-variant">All tags removed</span>}
      </div>
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
  autocomplete: AutocompleteDemo,
  checkbox: CheckboxDemo,
  radio: RadioDemo,
  switch: SwitchDemo,
  slider: SliderDemo,
  chip: ChipDemo,
};
