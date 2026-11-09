import type { ReactNode } from "react";
import { BedDouble, Briefcase, Cog, Fuel, Mountain, Users } from "lucide-react";
import { capitalize } from "@/lib/text";
import type { Vehicle } from "@/types/content";

export function Specifications({ vehicle }: { vehicle: Vehicle }) {
  return (
    <section aria-labelledby="specs" className="flex flex-col gap-5">
      <h2 id="specs" className="text-2xl font-bold tracking-[-0.02em]">
        Specifications
      </h2>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <SpecTile
          icon={<Users size={20} />}
          label="Seats"
          value={`${vehicle.seats}`}
        />
        <SpecTile
          icon={<BedDouble size={20} />}
          label="Sleeps"
          value={vehicle.sleeps ? `${vehicle.sleeps}` : "—"}
        />
        <SpecTile
          icon={<Cog size={20} />}
          label="Gearbox"
          value={vehicle.transmission === "automatic" ? "Automatic" : "Manual"}
        />
        <SpecTile
          icon={<Mountain size={20} />}
          label="Drive"
          value={vehicle.drive === "4x4" ? "4x4" : "Front-wheel"}
        />
        <SpecTile
          icon={<Fuel size={20} />}
          label="Fuel"
          value={capitalize(vehicle.fuel)}
        />
        <SpecTile
          icon={<Briefcase size={20} />}
          label="Large bags"
          value={`${vehicle.luggage}`}
        />
      </ul>
    </section>
  );
}

function SpecTile({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="rounded-panel flex items-center gap-3 bg-white p-4 ring-1 ring-black/[0.05]">
      <span className="bg-sky text-foreground/80 rounded-control flex size-10 shrink-0 items-center justify-center">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-muted-foreground text-[13px]">{label}</span>
        <span className="font-bold">{value}</span>
      </span>
    </li>
  );
}
