import { CalendarDays } from "lucide-react";
import { PriceBreakdown } from "@/components/price-breakdown";
import { TripSummary } from "@/components/trip-summary";
import { formatPrice, type PriceLine } from "@/lib/pricing";
import { useFilterStore } from "@/store/use-filters-store";

type Props = {
  pricePerDay: number;
  days: number;
  lines: PriceLine[];
  total: number;
  onEditTrip: () => void;
  onContinue: () => void;
};

/** The sticky booking card: trip details, the price breakdown and the next step */
export function PriceSummary({ pricePerDay, days, lines, total, onEditTrip, onContinue }: Props) {
  const { range, pickup, dropoff, pickupTime, dropoffTime } = useFilterStore();

  return (
    <aside>
      <div className="rounded-panel shadow-panel sticky top-[calc(var(--nav-height)+104px)] flex flex-col gap-5 bg-white p-6 ring-1 ring-black/[0.04]">
        <p className="text-3xl font-bold tracking-[-0.02em]">
          {formatPrice(pricePerDay)}
          <span className="text-muted-foreground text-base font-medium"> / day</span>
        </p>

        <button
          type="button"
          onClick={onEditTrip}
          className="hover:bg-hover rounded-panel -mx-2 p-2 text-left transition-colors"
        >
          <TripSummary
            from={range.from}
            to={range.to}
            pickup={pickup}
            dropoff={dropoff}
            pickupTime={pickupTime.label}
            dropoffTime={dropoffTime.label}
          />
        </button>

        {days ? (
          <PriceBreakdown lines={lines} total={total} />
        ) : (
          <p className="bg-primary-light rounded-control flex items-center gap-2 px-3 py-2.5 text-sm">
            <CalendarDays size={16} className="text-link shrink-0" />
            Add your dates to see the full price.
          </p>
        )}

        <button type="button" onClick={onContinue} className="btn-primary h-14 text-base">
          {days ? "Continue to booking" : "Choose dates"}
        </button>
        <p className="text-muted-foreground text-center text-sm">
          Free cancellation up to 7 days before pickup
        </p>
      </div>
    </aside>
  );
}
