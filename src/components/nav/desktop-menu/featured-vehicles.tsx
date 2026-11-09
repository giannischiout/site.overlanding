import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/pricing";
import { paths } from "@/lib/paths";
import type { Vehicle } from "@/types/content";

type Props = {
  vehicles: Vehicle[];
  onNavigate: () => void;
};

export function FeaturedVehicles({ vehicles, onNavigate }: Props) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold tracking-[0.22em] text-white/50 uppercase">
        Most booked
      </p>
      <ul className="flex flex-col gap-1">
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            <Link
              href={paths.vehicle(vehicle.id)}
              onClick={onNavigate}
              className="rounded-control -mx-2 flex items-center gap-3 p-2 transition-colors duration-150 hover:bg-white/[0.06]"
            >
              <span className="rounded-inner relative h-12 w-16 shrink-0 overflow-hidden">
                <Image src={vehicle.image.url} alt="" fill sizes="64px" className="object-cover" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-[15px] font-semibold text-white">
                  {vehicle.brand.name} {vehicle.model}
                </span>
                <span className="tabular text-sm text-white/55">
                  {vehicle.sleeps ? `Sleeps ${vehicle.sleeps}` : `Seats ${vehicle.seats}`} · from{" "}
                  {formatPrice(vehicle.basePricePerDay)}/day
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
