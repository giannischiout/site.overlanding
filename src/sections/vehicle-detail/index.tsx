"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { VehicleCard } from "@/components/vehicle-card";
import { quote, rentalDays } from "@/lib/pricing";
import { useOpenDatePicker } from "@/hooks/use-open-date-picker";
import { usePendingPush } from "@/hooks/use-pending-push";
import { useFilterStore } from "@/store/use-filters-store";
import { useBookingStore } from "@/store/use-booking-store";
import type { Vehicle } from "@/types/content";
import { AlwaysIncluded } from "@/sections/vehicle-detail/always-included";
import { ExtrasList } from "@/sections/vehicle-detail/extras-list";
import { Gallery } from "@/sections/vehicle-detail/gallery";
import { OnBoard } from "@/sections/vehicle-detail/on-board";
import { PriceSummary } from "@/sections/vehicle-detail/price-summary";
import { ProtectionPicker } from "@/sections/vehicle-detail/protection-picker";
import { Specifications } from "@/sections/vehicle-detail/specifications";
import { VehicleHeader } from "@/sections/vehicle-detail/vehicle-header";
import { paths } from "@/lib/paths";

type Props = {
  vehicle: Vehicle;
  similar: Vehicle[];
};

export function VehicleDetailView({ vehicle, similar }: Props) {
  const { push, isPending } = usePendingPush();
  const openDates = useOpenDatePicker();
  const { range, pickup, dropoff, pickupTime, dropoffTime } = useFilterStore();
  const { protectionId, extras, startCheckout } = useBookingStore();

  const days = rentalDays(range.from, range.to);
  const oneWay = !!pickup && !!dropoff && pickup.id !== dropoff.id;
  const { lines, total } = quote({
    vehicle,
    days,
    protectionId,
    extras,
    oneWay,
  });

  const onContinue = () => {
    if (!range.from || !range.to || !pickup || !dropoff) {
      openDates();
      return;
    }
    startCheckout(vehicle.id, {
      from: range.from.toISOString(),
      to: range.to.toISOString(),
      pickupId: pickup.id,
      dropoffId: dropoff.id,
      pickupTime: pickupTime.value,
      dropoffTime: dropoffTime.value,
    });
    push(paths.checkout);
  };

  return (
    <div className="pt-6 pb-24 md:pt-8">
      <Link
        href={paths.vehicles(vehicle.category.id)}
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-semibold"
      >
        <ArrowLeft size={16} />
        All {vehicle.category.name.toLowerCase()}
      </Link>

      <Gallery images={vehicle.images} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
        <div className="flex min-w-0 flex-col gap-12">
          <VehicleHeader vehicle={vehicle} />
          <Specifications vehicle={vehicle} />
          <OnBoard features={vehicle.features} />
          <ProtectionPicker />
          <ExtrasList vehicle={vehicle} />
          <AlwaysIncluded />
        </div>
        <PriceSummary
          pricePerDay={vehicle.basePricePerDay}
          days={days}
          lines={lines}
          total={total}
          onEditTrip={openDates}
          onContinue={onContinue}
          continuing={isPending}
        />
      </div>

      {similar.length > 0 && (
        <section
          aria-labelledby="similar"
          className="mt-24 flex flex-col gap-6"
        >
          <h2 id="similar" className="text-3xl font-bold tracking-[-0.02em]">
            More {vehicle.category.name.toLowerCase()}
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((v) => (
              <li key={v.id}>
                <VehicleCard vehicle={v} days={days} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
