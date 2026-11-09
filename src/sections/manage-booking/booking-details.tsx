import Image from "next/image";
import { TripSummary } from "@/components/trip-summary";
import { PROTECTIONS } from "@/data/extras";
import { findPickupLocation } from "@/data/pickup-locations";
import { formatPrice } from "@/lib/pricing";
import type { ConfirmedBooking } from "@/store/use-booking-store";
import type { Vehicle } from "@/types/content";

type Props = { booking: ConfirmedBooking; vehicle: Vehicle };

export function BookingDetails({ booking, vehicle }: Props) {
  const protection = PROTECTIONS.find((p) => p.id === booking.protectionId);

  return (
    <section className="rounded-panel overflow-hidden bg-white ring-1 ring-black/[0.06]">
      <div className="relative aspect-[21/9]">
        <Image
          src={vehicle.image.url}
          alt={vehicle.image.alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-5 p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
              {booking.reference} · {booking.driver.firstName}{" "}
              {booking.driver.lastName}
            </p>
            <h2 className="text-2xl font-bold">
              {vehicle.brand.name} {vehicle.model}
            </h2>
          </div>
          <p className="sm:text-right">
            <span className="text-muted-foreground block text-sm">Total</span>
            <span className="tabular text-2xl font-bold">
              {formatPrice(booking.total)}
            </span>
          </p>
        </div>
        <div className="border-t pt-5">
          <TripSummary
            from={booking.trip.from}
            to={booking.trip.to}
            pickup={findPickupLocation(booking.trip.pickupId)}
            dropoff={findPickupLocation(booking.trip.dropoffId)}
            pickupTime={booking.trip.pickupTime}
            dropoffTime={booking.trip.dropoffTime}
          />
        </div>
        {protection && (
          <p className="text-muted-foreground border-t pt-4 text-[15px]">
            <span className="text-foreground font-semibold">
              {protection.name} cover
            </span>
            {protection.excess === 0
              ? " · nothing to pay if something happens"
              : ` · up to ${formatPrice(protection.excess)} excess`}
          </p>
        )}
      </div>
    </section>
  );
}
