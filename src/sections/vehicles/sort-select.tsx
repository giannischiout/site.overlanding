import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS, type SortKey } from "@/sections/vehicles/filter-state";

const isSortKey = (value: string): value is SortKey =>
  SORT_OPTIONS.some((option) => option.value === value);

type Props = {
  value: SortKey;
  onChange: (value: SortKey) => void;
};

export function SortSelect({ value, onChange }: Props) {
  return (
    <label className="rounded-control relative flex h-10 items-center border bg-white pr-9 pl-4 text-sm font-semibold">
      <span className="text-muted-foreground mr-1 font-medium">Sort:</span>
      <select
        value={value}
        onChange={(event) => {
          if (isSortKey(event.target.value)) onChange(event.target.value);
        }}
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
