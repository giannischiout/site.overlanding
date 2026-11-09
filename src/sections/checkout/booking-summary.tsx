import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { PriceBreakdown } from "@/components/price-breakdown";
import { TripSummary } from "@/components/trip-summary";
import { formatPrice, type PriceLine } from "@/lib/pricing";
import type { PickupLocation, Vehicle } from "@/types/content";
import type { Trip } from "@/store/use-booking-store";

type Props = {
  vehicle: Vehicle;
  protectionName?: string;
  trip: Trip;
  pickup?: PickupLocation;
  dropoff?: PickupLocation;
  lines: PriceLine[];
  total: number;
  submitting: boolean;
  onSubmit: () => void;
};

/** The sticky summary beside the checkout form. Holds the desktop submit button. */
export function BookingSummary({
  vehicle,
  protectionName,
  trip,
  pickup,
  dropoff,
  lines,
  total,
  submitting,
  onSubmit,
}: Props) {
  return (
    <aside>
      <div className="rounded-panel shadow-panel sticky top-[calc(var(--nav-height)+24px)] flex flex-col gap-5 bg-white p-6 ring-1 ring-black/[0.04]">
        <div className="flex gap-4">
          <span className="rounded-control relative h-20 w-28 shrink-0 overflow-hidden">
            <Image src={vehicle.image.url} alt="" fill sizes="112px" className="object-cover" />
          </span>
          <div className="min-w-0">
            <p className="text-link text-xs font-bold tracking-[0.1em] uppercase">
              {vehicle.category.name}
            </p>
            <p className="text-lg leading-tight font-bold">
              {vehicle.brand.name} {vehicle.model}
            </p>
            <p className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
              <ShieldCheck size={14} className="text-link" /> {protectionName} protection
            </p>
          </div>
        </div>
        <div className="border-t pt-4">
          <TripSummary
            from={trip.from}
            to={trip.to}
            pickup={pickup}
            dropoff={dropoff}
            pickupTime={trip.pickupTime}
            dropoffTime={trip.dropoffTime}
          />
        </div>
        <PriceBreakdown lines={lines} total={total} footnote={`Due today: ${formatPrice(0)}`} />
        <button
          type="button"
          disabled={submitting}
          onClick={onSubmit}
          className="btn-primary hidden h-14 text-base lg:block"
        >
          {submitting ? "Reserving…" : "Reserve now"}
        </button>
        <p className="text-muted-foreground text-center text-sm">
          Free cancellation up to 7 days before pickup
        </p>
      </div>
    </aside>
  );
}
