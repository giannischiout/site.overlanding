import Link from "next/link";
import { VehicleCard } from "@/components/vehicle-card";
import { paths } from "@/lib/paths";
import type { CategoryWithStats, Vehicle } from "@/types/content";

type Props = {
  category: CategoryWithStats;
  vehicles: Vehicle[];
  /** Trip length, so cards show the price for the whole route */
  days: number;
};

export function TripVehicles({ category, vehicles, days }: Props) {
  return (
    <section
      aria-labelledby="trip-vehicles-title"
      className="flex flex-col gap-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2
          id="trip-vehicles-title"
          className="text-3xl font-bold tracking-[-0.02em] text-balance"
        >
          What we&rsquo;d drive: {category.name}
        </h2>
        <Link
          href={paths.vehicles(category.id)}
          className="text-link font-semibold hover:underline"
        >
          All {category.count} {category.name}
        </Link>
      </div>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            <VehicleCard vehicle={vehicle} days={days} />
          </li>
        ))}
      </ul>
    </section>
  );
}
