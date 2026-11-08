"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { VehicleCard } from "@/components/vehicle-card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { formatPrice, rentalDays } from "@/lib/pricing";
import { useFilterStore } from "@/store/use-filters-store";
import { FiltersPanel } from "@/sections/vehicles/filters-panel";
import {
  SORT_OPTIONS,
  applyFilters,
  countActive,
  initialFilters,
  priceBounds,
  type FilterState,
  type SortKey,
} from "@/sections/vehicles/filter-state";
import type { IFilters } from "@/types";
import type { Vehicle } from "@/types/content";

type Props = {
  vehicles: Vehicle[];
  filters: IFilters;
  initialCategory: string | null;
};

export function VehiclesView({ vehicles, filters, initialCategory }: Props) {
  const bounds = useMemo(() => priceBounds(vehicles), [vehicles]);
  const [category, setCategory] = useState<string | null>(initialCategory);
  const [state, setState] = useState<FilterState>(() => initialFilters(bounds));
  const [mobileOpen, setMobileOpen] = useState(false);

  const range = useFilterStore((s) => s.range);
  const onOpen = useFilterStore((s) => s.onOpen);
  const setCurrentScreen = useFilterStore((s) => s.setCurrentScreen);
  const days = rentalDays(range.from, range.to);

  const results = useMemo(
    () => applyFilters(vehicles, category, state),
    [vehicles, category, state],
  );
  const active = countActive(state, bounds);
  const current = filters.categories.find((c) => c.id === category) ?? null;

  const update = (patch: Partial<FilterState>) =>
    setState((previous) => ({ ...previous, ...patch }));
  const clear = () => setState((previous) => ({ ...initialFilters(bounds), sort: previous.sort }));

  // The category lives in the URL so results can be shared and survive a refresh
  const selectCategory = (id: string | null) => {
    setCategory(id);
    const url = id ? `/book/vehicles?category=${id}` : "/book/vehicles";
    window.history.replaceState(null, "", url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Back/forward between categories
  useEffect(() => {
    const onPop = () =>
      setCategory(new URLSearchParams(window.location.search).get("category"));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const openDates = () => {
    if (window.matchMedia("(min-width: 961px)").matches) {
      window.scrollTo({ top: 0 });
      onOpen("dateRange");
    } else {
      setCurrentScreen("summary");
      onOpen("dateRange");
    }
  };

  return (
    <section className="pt-6 pb-24 md:pt-8">
      {/* Categories: scroll sideways on small screens */}
      <nav aria-label="Vehicle types" className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] [scrollbar-width:none]">
        <ul className="flex w-max gap-2.5 pb-1">
          <CategoryTab
            active={!category}
            onClick={() => selectCategory(null)}
            label="All vehicles"
            meta={`${vehicles.length}`}
          />
          {filters.categories.map((c) => (
            <CategoryTab
              key={c.id}
              active={category === c.id}
              onClick={() => selectCategory(c.id)}
              label={c.name}
              meta={`from ${formatPrice(c.fromPrice)}`}
              image={c.image.url}
            />
          ))}
        </ul>
      </nav>

      <header className="mt-8 flex flex-col gap-2 md:mt-10">
        <h1 className="text-4xl font-bold tracking-[-0.02em] md:text-5xl">
          {current?.name ?? "Our whole fleet"}
        </h1>
        <p className="text-muted-foreground max-w-[62ch] text-lg leading-relaxed">
          {current?.description ??
            "Every vehicle comes with unlimited kilometres, collision cover, 24/7 roadside help and free airport pickup."}
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
        {/* Desktop filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-[calc(var(--nav-height)+104px)] max-h-[calc(100vh-var(--nav-height)-128px)] overflow-y-auto rounded-panel bg-white p-6 shadow-card ring-1 ring-black/[0.04] [scrollbar-width:thin]">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Filters</h2>
              {active > 0 && (
                <button type="button" onClick={clear} className="text-link text-sm font-semibold hover:underline">
                  Clear all
                </button>
              )}
            </div>
            <FiltersPanel state={state} bounds={bounds} features={filters.features} onChange={update} />
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-muted-foreground" aria-live="polite">
              <strong className="text-foreground">{results.length}</strong>{" "}
              {results.length === 1 ? "vehicle" : "vehicles"}
              {days ? ` · prices for ${days} ${days === 1 ? "day" : "days"}` : ""}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex h-10 items-center gap-2 rounded-control border bg-white px-4 text-sm font-semibold lg:hidden"
              >
                <SlidersHorizontal size={16} />
                Filters
                {active > 0 && (
                  <span className="bg-basalt flex size-5 items-center justify-center rounded-full text-xs text-white">
                    {active}
                  </span>
                )}
              </button>
              <SortSelect value={state.sort} onChange={(sort) => update({ sort })} />
            </div>
          </div>

          {!days && (
            <button
              type="button"
              onClick={openDates}
              className="bg-primary-light mt-4 flex w-full items-center gap-3 rounded-panel px-4 py-3 text-left transition-colors hover:bg-[#d6f2e4]"
            >
              <CalendarDays size={20} className="text-link shrink-0" />
              <span className="text-[15px]">
                <strong>Add your dates</strong> to see the total price and what&apos;s available.
              </span>
            </button>
          )}

          {active > 0 && (
            <ActiveChips state={state} bounds={bounds} features={filters.features} onChange={update} onClear={clear} />
          )}

          {results.length ? (
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((vehicle, index) => (
                <li key={vehicle.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${Math.min(index, 8) * 40}ms`, animationFillMode: "both" }}>
                  <VehicleCard vehicle={vehicle} days={days} priority={index < 3} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 flex flex-col items-center gap-3 rounded-panel bg-white px-6 py-16 text-center ring-1 ring-black/[0.04]">
              <p className="text-xl font-bold">No vehicles match these filters</p>
              <p className="text-muted-foreground max-w-[42ch]">
                Try a wider price range or fewer features
                {category ? ", or look across every vehicle type." : "."}
              </p>
              <div className="mt-2 flex gap-2">
                <button type="button" onClick={clear} className="btn-primary px-5 py-2.5 text-sm">
                  Clear filters
                </button>
                {category && (
                  <button type="button" onClick={() => selectCategory(null)} className="btn-secondary px-5 py-2.5 text-sm">
                    Show all vehicles
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters */}
      <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogContent className="flex max-h-[92svh] flex-col gap-0 overflow-hidden rounded-panel p-0 sm:max-w-md">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <DialogTitle className="text-lg font-bold">Filters</DialogTitle>
          </div>
          <div className="overflow-y-auto px-5 py-5">
            <FiltersPanel state={state} bounds={bounds} features={filters.features} onChange={update} />
          </div>
          <div className="flex gap-2 border-t p-4">
            <button type="button" onClick={clear} className="btn-secondary h-12 px-5">
              Clear
            </button>
            <button type="button" onClick={() => setMobileOpen(false)} className="btn-primary h-12 flex-1">
              Show {results.length} {results.length === 1 ? "vehicle" : "vehicles"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function CategoryTab({
  active,
  onClick,
  label,
  meta,
  image,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  meta: string;
  image?: string;
}) {
  return (
    <li>
      <button
        type="button"
        aria-pressed={active}
        onClick={onClick}
        className={cn(
          "flex h-16 items-center gap-3 rounded-panel py-2 pr-5 pl-2 text-left ring-1 transition-[background-color,box-shadow,color] duration-200",
          !image && "pl-5",
          active
            ? "bg-basalt text-white ring-transparent shadow-[0_10px_24px_-14px_rgb(6_20_16/0.7)]"
            : "bg-white ring-black/[0.06] hover:ring-black/20",
        )}
      >
        {image && (
          <span className="relative size-12 shrink-0 overflow-hidden rounded-control">
            <Image src={image} alt="" fill sizes="48px" className="object-cover" />
          </span>
        )}
        <span className="flex flex-col">
          <span className="text-[15px] font-bold whitespace-nowrap">{label}</span>
          <span className={cn("text-[13px] whitespace-nowrap", active ? "text-aurora" : "text-muted-foreground")}>
            {meta}
          </span>
        </span>
      </button>
    </li>
  );
}

function SortSelect({ value, onChange }: { value: SortKey; onChange: (value: SortKey) => void }) {
  return (
    <label className="relative flex h-10 items-center rounded-control border bg-white pr-9 pl-4 text-sm font-semibold">
      <span className="text-muted-foreground mr-1 font-medium">Sort:</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortKey)}
        className="cursor-pointer appearance-none bg-transparent font-semibold outline-none"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-3" />
    </label>
  );
}

function ActiveChips({
  state,
  bounds,
  features,
  onChange,
  onClear,
}: {
  state: FilterState;
  bounds: [number, number];
  features: IFilters["features"];
  onChange: (patch: Partial<FilterState>) => void;
  onClear: () => void;
}) {
  const chips: { label: string; remove: () => void }[] = [];
  if (state.price[0] !== bounds[0] || state.price[1] !== bounds[1])
    chips.push({ label: `${formatPrice(state.price[0])}–${formatPrice(state.price[1])}`, remove: () => onChange({ price: bounds }) });
  if (state.transmission !== "any")
    chips.push({ label: state.transmission === "automatic" ? "Automatic" : "Manual", remove: () => onChange({ transmission: "any" }) });
  if (state.fourByFour) chips.push({ label: "4x4 only", remove: () => onChange({ fourByFour: false }) });
  if (state.fRoad) chips.push({ label: "F-road approved", remove: () => onChange({ fRoad: false }) });
  if (state.sleeps) chips.push({ label: `Sleeps ${state.sleeps}+`, remove: () => onChange({ sleeps: 0 }) });
  if (state.seats) chips.push({ label: `${state.seats}+ seats`, remove: () => onChange({ seats: 0 }) });
  state.fuel.forEach((fuel) =>
    chips.push({ label: fuel[0].toUpperCase() + fuel.slice(1), remove: () => onChange({ fuel: state.fuel.filter((f) => f !== fuel) }) }),
  );
  state.features.forEach((id) =>
    chips.push({
      label: features.find((f) => f.id === id)?.name ?? id,
      remove: () => onChange({ features: state.features.filter((f) => f !== id) }),
    }),
  );

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.label}
          type="button"
          onClick={chip.remove}
          className="bg-primary-light text-link flex h-8 items-center gap-1.5 rounded-control pr-2.5 pl-3 text-sm font-semibold"
        >
          {chip.label}
          <X size={14} strokeWidth={2.5} />
          <span className="sr-only">Remove filter</span>
        </button>
      ))}
      <button type="button" onClick={onClear} className="text-muted-foreground hover:text-foreground ml-1 text-sm font-semibold underline-offset-4 hover:underline">
        Clear all
      </button>
    </div>
  );
}
