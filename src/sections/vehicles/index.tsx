"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, SlidersHorizontal } from "lucide-react";
import SimpleBar from "simplebar-react";
import { rentalDays } from "@/lib/pricing";
import { pluralize } from "@/lib/text";
import { useOpenDatePicker } from "@/hooks/use-open-date-picker";
import { useFilterStore } from "@/store/use-filters-store";
import { FiltersPanel } from "@/sections/vehicles/filters-panel";
import { ActiveChips } from "@/sections/vehicles/active-chips";
import { CategoryTabs } from "@/sections/vehicles/category-tabs";
import { MobileFiltersDialog } from "@/sections/vehicles/mobile-filters-dialog";
import { ResultsGrid } from "@/sections/vehicles/results-grid";
import { SortSelect } from "@/sections/vehicles/sort-select";
import {
  activeChips,
  applyFilters,
  initialFilters,
  priceBounds,
  type FilterState,
} from "@/sections/vehicles/filter-state";
import type { IFilters } from "@/types";
import type { Vehicle } from "@/types/content";
import { paths } from "@/lib/paths";

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
  const openDates = useOpenDatePicker();
  const days = rentalDays(range.from, range.to);

  const results = useMemo(
    () => applyFilters(vehicles, category, state),
    [vehicles, category, state],
  );
  const chips = activeChips(state, bounds, filters.features);
  const current = filters.categories.find((c) => c.id === category) ?? null;

  const update = (patch: Partial<FilterState>) =>
    setState((previous) => ({ ...previous, ...patch }));
  const clear = () =>
    setState((previous) => ({
      ...initialFilters(bounds),
      sort: previous.sort,
    }));

  // The category lives in the URL so results can be shared and survive a refresh
  const selectCategory = (id: string | null) => {
    setCategory(id);
    const url = paths.vehicles(id);
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

  const panel = (
    <FiltersPanel
      state={state}
      bounds={bounds}
      features={filters.features}
      onChange={update}
    />
  );

  return (
    <section className="pt-6 pb-24 md:pt-8">
      <CategoryTabs
        categories={filters.categories}
        total={vehicles.length}
        active={category}
        onSelect={selectCategory}
      />

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
        <aside className="hidden lg:block">
          {/* Scrollbar appears only while the pointer is over the panel (SimpleBar autoHide) */}
          <div className="rounded-panel sticky top-[calc(var(--bar-top)+104px)] overflow-hidden bg-white transition-[top] duration-300 ease-out">
            <SimpleBar
              autoHide
              style={{ maxHeight: "calc(100vh - var(--bar-top) - 128px)" }}
            >
              <div className="p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-lg font-bold">Filters</h2>
                  {chips.length > 0 && (
                    <button
                      type="button"
                      onClick={clear}
                      className="text-link text-sm font-semibold hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                {panel}
              </div>
            </SimpleBar>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-muted-foreground" aria-live="polite">
              <strong className="text-foreground">{results.length}</strong>{" "}
              {results.length === 1 ? "vehicle" : "vehicles"}
              {days ? ` · prices for ${pluralize(days, "day")}` : ""}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="rounded-control flex h-10 items-center gap-2 border bg-white px-4 text-sm font-semibold lg:hidden"
              >
                <SlidersHorizontal size={16} />
                Filters
                {chips.length > 0 && (
                  <span className="bg-basalt flex size-5 items-center justify-center rounded-full text-xs text-white">
                    {chips.length}
                  </span>
                )}
              </button>
              <SortSelect
                value={state.sort}
                onChange={(sort) => update({ sort })}
              />
            </div>
          </div>

          {!days && (
            <button
              type="button"
              onClick={openDates}
              className="bg-primary-light hover:bg-aurora-soft/50 rounded-panel mt-4 flex w-full items-center gap-3 px-4 py-3 text-left transition-colors"
            >
              <CalendarDays size={20} className="text-link shrink-0" />
              <span className="text-[15px]">
                <strong>Add your dates</strong> to see the total price and
                what&apos;s available.
              </span>
            </button>
          )}

          {chips.length > 0 && (
            <ActiveChips chips={chips} onChange={update} onClear={clear} />
          )}

          <ResultsGrid
            results={results}
            days={days}
            inCategory={!!category}
            onClear={clear}
            onShowAll={() => selectCategory(null)}
          />
        </div>
      </div>

      <MobileFiltersDialog
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        resultCount={results.length}
        onClear={clear}
      >
        {panel}
      </MobileFiltersDialog>
    </section>
  );
}
