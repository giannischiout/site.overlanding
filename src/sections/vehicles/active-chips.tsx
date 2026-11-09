import { X } from "lucide-react";
import type { FilterChip, FilterState } from "@/sections/vehicles/filter-state";

type Props = {
  chips: FilterChip[];
  onChange: (patch: Partial<FilterState>) => void;
  onClear: () => void;
};

export function ActiveChips({ chips, onChange, onClear }: Props) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.label}
          type="button"
          onClick={() => onChange(chip.patch)}
          className="bg-primary-light text-link rounded-control flex h-8 items-center gap-1.5 pr-2.5 pl-3 text-sm font-semibold"
        >
          {chip.label}
          <X size={14} strokeWidth={2.5} />
          <span className="sr-only">Remove filter</span>
        </button>
      ))}
      <button
        type="button"
        onClick={onClear}
        className="text-muted-foreground hover:text-foreground ml-1 text-sm font-semibold underline-offset-4 hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}
