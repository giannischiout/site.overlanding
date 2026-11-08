"use client";

import { Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
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
      <Group title="Price per day">
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
      </Group>

      <Group title="Transmission">
        <Segmented
          value={state.transmission}
          options={[
            { value: "any", label: "Any" },
            { value: "automatic", label: "Automatic" },
            { value: "manual", label: "Manual" },
          ]}
          onChange={(transmission) => onChange({ transmission })}
        />
      </Group>

      <Group title="Terrain">
        <Toggle
          label="4x4 only"
          hint="All- or four-wheel drive"
          checked={state.fourByFour}
          onChange={(fourByFour) => onChange({ fourByFour })}
        />
        <Toggle
          label="F-road approved"
          hint="Allowed on mountain roads into the Highlands"
          checked={state.fRoad}
          onChange={(fRoad) => onChange({ fRoad })}
        />
      </Group>

      <Group title="Sleeps at least">
        <Segmented
          value={state.sleeps}
          options={[0, 2, 3, 4, 6].map((n) => ({ value: n, label: n ? `${n}` : "Any" }))}
          onChange={(sleeps) => onChange({ sleeps })}
        />
      </Group>

      <Group title="Seats at least">
        <Segmented
          value={state.seats}
          options={[0, 2, 4, 5, 7].map((n) => ({ value: n, label: n ? `${n}` : "Any" }))}
          onChange={(seats) => onChange({ seats })}
        />
      </Group>

      <Group title="Fuel">
        <div className="flex flex-wrap gap-2">
          {FUELS.map((fuel) => (
            <Chip
              key={fuel.value}
              active={state.fuel.includes(fuel.value)}
              onClick={() => onChange({ fuel: toggle(state.fuel, fuel.value) })}
            >
              {fuel.label}
            </Chip>
          ))}
        </div>
      </Group>

      <Group title="Features">
        <div className="flex flex-wrap gap-2">
          {features.map((feature) => (
            <Chip
              key={feature.id}
              active={state.features.includes(feature.id)}
              onClick={() => onChange({ features: toggle(state.features, feature.id) })}
            >
              {feature.name}
            </Chip>
          ))}
        </div>
      </Group>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={title} className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0">
      <h3 className="text-[15px] font-bold">{title}</h3>
      {children}
    </div>
  );
}

function Segmented<T extends string | number>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="bg-sky flex rounded-full p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "h-9 flex-1 rounded-full px-2 text-sm font-medium transition-[background-color,color,box-shadow] duration-200",
            value === option.value
              ? "text-foreground bg-white shadow-[0_1px_3px_rgb(6_20_16/0.15)]"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between gap-4 text-left"
    >
      <span className="flex flex-col">
        <span className="text-[15px] font-medium">{label}</span>
        <span className="text-muted-foreground text-[13px] leading-snug">{hint}</span>
      </span>
      <span
        className={cn(
          "relative h-6 w-10 shrink-0 rounded-full transition-colors duration-200",
          checked ? "bg-[var(--link)]" : "bg-[var(--border)]",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-300 ease-[var(--ease-out-expo)]",
            checked && "translate-x-4",
          )}
        />
      </span>
    </button>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-colors duration-150",
        active
          ? "border-[var(--link)] bg-primary-light text-link"
          : "hover:border-foreground/30 bg-white",
      )}
    >
      {active && <Check size={14} strokeWidth={2.5} />}
      {children}
    </button>
  );
}
