import { Mountain, Star } from "lucide-react";
import type { Vehicle } from "@/types/content";

export function VehicleHeader({ vehicle }: { vehicle: Vehicle }) {
  return (
    <header className="flex flex-col gap-3">
      <p className="text-link text-sm font-bold tracking-[0.12em] uppercase">
        {vehicle.category.name} · {vehicle.year}
      </p>
      <h1 className="text-4xl font-bold tracking-[-0.02em] md:text-5xl">
        {vehicle.brand.name} {vehicle.model}
      </h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px]">
        <span className="flex items-center gap-1.5 font-semibold">
          <Star size={16} className="fill-star text-star" />
          {vehicle.rating.toFixed(1)}
          <span className="text-muted-foreground font-normal">
            · {vehicle.reviews} reviews
          </span>
        </span>
        {vehicle.fRoadApproved && (
          <span className="bg-primary-light text-link rounded-control flex items-center gap-1.5 px-3 py-1 text-sm font-semibold">
            <Mountain size={14} /> F-road approved
          </span>
        )}
      </div>
      <p className="text-muted-foreground mt-2 max-w-[64ch] text-lg leading-relaxed">
        {vehicle.description}
      </p>
    </header>
  );
}
