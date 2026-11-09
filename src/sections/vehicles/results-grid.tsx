import { VehicleCard } from "@/components/vehicle-card";
import type { Vehicle } from "@/types/content";

type Props = {
  results: Vehicle[];
  /** Rental days for the chosen dates; 0 when no dates are set */
  days: number;
  inCategory: boolean;
  onClear: () => void;
  onShowAll: () => void;
};

export function ResultsGrid({ results, days, inCategory, onClear, onShowAll }: Props) {
  if (!results.length) {
    return (
      <div className="rounded-panel mt-6 flex flex-col items-center gap-3 bg-white px-6 py-16 text-center ring-1 ring-black/[0.04]">
        <p className="text-xl font-bold">No vehicles match these filters</p>
        <p className="text-muted-foreground max-w-[42ch]">
          Try a wider price range or fewer features
          {inCategory ? ", or look across every vehicle type." : "."}
        </p>
        <div className="mt-2 flex gap-2">
          <button type="button" onClick={onClear} className="btn-primary px-5 py-2.5 text-sm">
            Clear filters
          </button>
          {inCategory && (
            <button type="button" onClick={onShowAll} className="btn-secondary px-5 py-2.5 text-sm">
              Show all vehicles
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {results.map((vehicle, index) => (
        <li
          key={vehicle.id}
          className="animate-in fade-in slide-in-from-bottom-2 duration-500"
          style={{
            animationDelay: `${Math.min(index, 8) * 40}ms`,
            animationFillMode: "both",
          }}
        >
          <VehicleCard vehicle={vehicle} days={days} priority={index < 3} />
        </li>
      ))}
    </ul>
  );
}
