import Image from "next/image";
import Link from "next/link";
import type { Media, Navigation } from "@/types/content";

type Props = {
  vehicles: Navigation["vehicles"];
  onNavigate?: () => void;
};

export function OurCars({ vehicles, onNavigate }: Props) {
  const { categories, bestSellingVehicles } = vehicles;

  return (
    // -mx-2 lines the rows' content up with the page edge; their padding is the hover area
    <div className="-mx-2 grid gap-8 lg:grid-cols-[2fr_1fr] lg:gap-12">
      <div>
        <h2 className="text-muted-foreground mb-3 px-2 text-sm">
          Vehicle types
        </h2>
        <ul className="grid gap-1 lg:grid-cols-2">
          {categories.map((category) => (
            <MenuRow
              key={category.id}
              href={`/book/vehicles?category=${category.id}`}
              image={category.image}
              title={category.name}
              subtitle={category.description}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-muted-foreground mb-3 px-2 text-sm">
          Best sellers
        </h2>
        <ul className="grid gap-1">
          {bestSellingVehicles.map((vehicle) => (
            <MenuRow
              key={vehicle.id}
              href={`/book/vehicles/${vehicle.id}`}
              image={vehicle.image}
              title={`${vehicle.brand.name} ${vehicle.model}`}
              subtitle={`Seats ${vehicle.seats}, sleeps ${vehicle.sleeps}`}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function MenuRow({
  href,
  image,
  title,
  subtitle,
  onNavigate,
}: {
  href: string;
  image: Media;
  title: string;
  subtitle: string;
  onNavigate?: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onNavigate}
        className="group flex items-center gap-4 rounded-xl p-2 transition-colors duration-150 ease-out hover:bg-hover"
      >
        <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md bg-hover">
          <Image
            src={image.url}
            alt=""
            fill
            sizes="80px"
            className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
        </span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-[15px] font-medium">{title}</span>
          <span className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {subtitle}
          </span>
        </span>
      </Link>
    </li>
  );
}
