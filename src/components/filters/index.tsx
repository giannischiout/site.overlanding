"use client";

import type { IFilters } from "@/types";
import { SelectField } from "@/components/hook-form/fIelds/select";
import { MultiToggle } from "@/components/hook-form/fIelds/multi-toggle";
import { Divider } from "@/components/divider";
import { useMemo, useState } from "react";
import { BsSortDown } from "react-icons/bs";
import { Funnel, X } from "lucide-react";

type Props = {
  filters: IFilters;
};

const DriveOptions = [
  { label: "AWD", value: "awd" },
  { label: "4WD", value: "4wd" },
  { label: "FWD", value: "fwd" },
  { label: "RWD", value: "rwd" },
];

const SleepOptions = [
  { label: "1+", value: "1" },
  { label: "2+", value: "2" },
  { label: "4+", value: "4" },
  { label: "5+", value: "5" },
  { label: "7+", value: "7" },
];

const SortOptions = [
  { label: "Price: low to high", value: "low" },
  { label: "Price: high to low", value: "high" },
  { label: "Highest rating", value: "rating" },
  { label: "Most Popular", value: "popular" },
];

type FilterState = {
  category: string;
  sleeps: string[];
  drive: string[];
  sortBy: string;
};

const INITIAL_STATE = {
  category: "",
  sleeps: [],
  drive: [],
  sortBy: "",
};

export function VehicleFilters({ filters }: Props) {
  const [filtersState, setFiltersState] = useState<FilterState>(INITIAL_STATE);

  const updateFilter = (key: string, value: string | string[]) => {
    setFiltersState((prevState) => ({ ...prevState, [key]: value }));
  };

  const clearFilters = () => {
    setFiltersState(INITIAL_STATE);
  };

  const activeFilters = useMemo(() => {
    return Object.values(filtersState).some((value) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== "" && value !== undefined;
    });
  }, [filtersState]);

  return (
    <div>
      <div className="flex w-full items-end gap-4 dark:bg-transparent">
        <SelectField
          icon={<Funnel size={14} className="text-gray-400" />}
          label="Category"
          placeholder="Select Category"
          items={filters.categories}
          value={filtersState.category}
          onChange={(val) => updateFilter("category", val)}
          valueKey="id"
          labelKey="name"
        />
        <Divider />
        <MultiToggle
          icon={<Funnel size={14} className="text-gray-400" />}
          label="Sleep Capacity"
          options={SleepOptions}
          value={filtersState.sleeps}
          onChange={(val) => updateFilter("sleeps", val)}
        />
        <Divider />
        <MultiToggle
          icon={<Funnel size={14} className="text-gray-400" />}
          label="Drive"
          options={DriveOptions}
          value={filtersState.drive}
          onChange={(val) => updateFilter("drive", val)}
        />
        <Divider />
        <SelectField
          icon={<BsSortDown />}
          label="Sort by"
          className="w-full dark:bg-white"
          placeholder="Sort by..."
          labelStyle="text-muted-foreground"
          items={SortOptions}
          value={filtersState.sortBy}
          onChange={(val) => updateFilter("sortBy", val)}
        />
      </div>
      {activeFilters && (
        <div
          onClick={clearFilters}
          className="bg-primary text-primary-foreground mt-2 inline-flex h-[30px] cursor-pointer items-center gap-1 rounded-md px-2 text-sm font-medium"
        >
          <span className="text-nowrap">Clear all</span>
          <X size={14} />
        </div>
      )}
    </div>
  );
}
