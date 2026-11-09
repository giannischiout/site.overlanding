"use client";

import { FilterChip } from "@/sections/vehicles/controls/filter-chip";
import { FilterGroup } from "@/sections/vehicles/controls/filter-group";
import { Segmented } from "@/sections/vehicles/controls/segmented";
import { ToggleSwitch } from "@/sections/vehicles/controls/toggle-switch";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/lib/pricing";
import type { Feature, Fuel } from "@/types/content";
import type { FilterState } from "@/sections/vehicles/filter-state";

type Props = {
  state: FilterState;
  bounds: [number, number];
  features: Feature[];
  onChange: (patch: Partial<FilterState>) => void;
};

const FUELS: { value: Fuel; label: string }[] = [
  { value: "diesel", label: "Diesel" },
  { value: "petrol", label: "Petrol" },
  { value: "hybrid", label: "Hybrid" },
];

export function FiltersPanel({ state, bounds, features, onChange }: Props) {
  const toggle = <T,>(list: T[], value: T) =>
    list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

  return (
    <div className="flex flex-col divide-y">
      <FilterGroup title="Price per day">
        <div className="flex items-center justify-between text-sm font-semibold tabular">
          <span>{formatPrice(state.price[0])}</span>
          <span>{formatPrice(state.price[1])}{state.price[1] === bounds[1] ? "+" : ""}</span>
        </div>
        <Slider
          min={bounds[0]}
          max={bounds[1]}
          step={10}
          minStepsBetweenThumbs={1}
          value={state.price}
          onValueChange={(value) => onChange({ price: [value[0], value[1]] })}
          className="mt-4 [&_[data-slot=slider-range]]:bg-[var(--link)] [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-[var(--link)] [&_[data-slot=slider-track]]:bg-[var(--border)]"
          aria-label="Price per day"
        />
      </FilterGroup>

      <FilterGroup title="Transmission">
        <Segmented
          value={state.transmission}
          options={[
            { value: "any", label: "Any" },
            { value: "automatic", label: "Automatic" },
            { value: "manual", label: "Manual" },
          ]}
          onChange={(transmission) => onChange({ transmission })}
        />
      </FilterGroup>

      <FilterGroup title="Terrain">
        <ToggleSwitch
          label="4x4 only"
          hint="All- or four-wheel drive"
          checked={state.fourByFour}
          onChange={(fourByFour) => onChange({ fourByFour })}
        />
        <ToggleSwitch
          label="F-road approved"
          hint="Allowed on mountain roads into the Highlands"
          checked={state.fRoad}
          onChange={(fRoad) => onChange({ fRoad })}
        />
      </FilterGroup>

      <FilterGroup title="Sleeps at least">
        <Segmented
          value={state.sleeps}
          options={[0, 2, 3, 4, 6].map((n) => ({ value: n, label: n ? `${n}` : "Any" }))}
          onChange={(sleeps) => onChange({ sleeps })}
        />
      </FilterGroup>

      <FilterGroup title="Seats at least">
        <Segmented
          value={state.seats}
          options={[0, 2, 4, 5, 7].map((n) => ({ value: n, label: n ? `${n}` : "Any" }))}
          onChange={(seats) => onChange({ seats })}
        />
      </FilterGroup>

      <FilterGroup title="Fuel">
        <div className="flex flex-wrap gap-2">
          {FUELS.map((fuel) => (
            <FilterChip
              key={fuel.value}
              active={state.fuel.includes(fuel.value)}
              onClick={() => onChange({ fuel: toggle(state.fuel, fuel.value) })}
            >
              {fuel.label}
            </FilterChip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Features">
        <div className="flex flex-wrap gap-2">
          {features.map((feature) => (
            <FilterChip
              key={feature.id}
              active={state.features.includes(feature.id)}
              onClick={() => onChange({ features: toggle(state.features, feature.id) })}
            >
              {feature.name}
            </FilterChip>
          ))}
        </div>
      </FilterGroup>
    </div>
  );
}
