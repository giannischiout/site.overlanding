"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BedDouble, Cog, Mountain, Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/pricing";
import type { Vehicle } from "@/types/content";
import { paths } from "@/lib/paths";
import { capitalize, pluralize } from "@/lib/text";

type Props = {
  vehicle: Vehicle;
  /** Rental days for the chosen dates; 0 when no dates are set */
  days: number;
  priority?: boolean;
};

export function VehicleCard({ vehicle, days, priority }: Props) {
  const [photo, setPhoto] = useState(0);
  // The photo area pulses until the first shot has loaded
  const [loaded, setLoaded] = useState(false);
  const lowStock = vehicle.stock <= 2;

  return (
    <article className="group rounded-panel shadow-card hover:shadow-card-hover relative flex h-full flex-col overflow-hidden bg-white ring-1 ring-black/[0.04] transition-[box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1">
      {/* Photo with hover-to-browse: each third of the image shows another shot */}
      <div
        className={cn(
          "bg-sky relative aspect-[4/3] overflow-hidden",
          !loaded && "animate-pulse motion-reduce:animate-none",
        )}
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse") return;
          const box = event.currentTarget.getBoundingClientRect();
          const index = Math.floor(
            ((event.clientX - box.left) / box.width) * vehicle.images.length,
          );
          setPhoto(Math.min(vehicle.images.length - 1, Math.max(0, index)));
        }}
        onPointerLeave={() => setPhoto(0)}
      >
        {vehicle.images.map((image, index) => (
          <Image
            key={image.url + index}
            src={image.url}
            alt={index === 0 ? image.alt : ""}
            fill
            priority={priority && index === 0}
            onLoad={index === 0 ? () => setLoaded(true) : undefined}
            sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw"
            className={cn(
              "object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]",
              photo === index ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {vehicle.fRoadApproved && (
            <span className="text-basalt rounded-control flex items-center gap-1 bg-white/95 px-2.5 py-1 text-xs font-semibold shadow-sm">
              <Mountain size={13} strokeWidth={2.25} className="text-link" />
              F-road approved
            </span>
          )}
          {lowStock && (
            <span className="rounded-control bg-warn-soft text-warn px-2.5 py-1 text-xs font-semibold shadow-sm">
              Only {vehicle.stock} left
            </span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {vehicle.images.map((image, index) => (
            <span
              key={image.url + index}
              className={cn(
                "h-1.5 rounded-full bg-white transition-all duration-300",
                photo === index ? "w-4 opacity-100" : "w-1.5 opacity-60",
              )}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-link text-xs font-bold tracking-[0.12em] uppercase">
              {vehicle.category.name}
            </p>
            <h3 className="mt-1 truncate text-xl font-bold tracking-[-0.02em]">
              {/* The link covers the whole card */}
              <Link
                href={paths.vehicle(vehicle.id)}
                className="after:rounded-panel after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-[var(--ring)]"
              >
                {vehicle.brand.name} {vehicle.model}
              </Link>
            </h3>
          </div>
          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold">
            <Star size={14} className="fill-star text-star" />
            {vehicle.rating.toFixed(1)}
            <span className="text-muted-foreground font-normal">
              ({vehicle.reviews})
            </span>
          </span>
        </div>

        <ul className="text-muted-foreground grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
          <Spec icon={<Users size={15} />}>{vehicle.seats} seats</Spec>
          <Spec icon={<BedDouble size={15} />}>
            {vehicle.sleeps ? `Sleeps ${vehicle.sleeps}` : "No beds"}
          </Spec>
          <Spec icon={<Cog size={15} />}>
            {vehicle.transmission === "automatic" ? "Automatic" : "Manual"}
          </Spec>
          <Spec icon={<DriveIcon />}>
            {vehicle.drive === "4x4" ? "4x4" : "2WD"} ·{" "}
            {capitalize(vehicle.fuel)}
          </Spec>
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 border-t pt-4">
          <div>
            <p className="tabular text-2xl font-bold tracking-[-0.02em]">
              {formatPrice(vehicle.basePricePerDay)}
              <span className="text-muted-foreground text-sm font-medium">
                {" "}
                / day
              </span>
            </p>
            <p className="text-muted-foreground text-sm">
              {days
                ? `${formatPrice(vehicle.basePricePerDay * days)} for ${pluralize(days, "day")}`
                : "Unlimited km included"}
            </p>
          </div>
          <span className="bg-primary-light text-link group-hover:bg-aurora group-hover:text-basalt rounded-control px-4 py-2.5 text-sm font-bold transition-colors duration-300">
            Select
          </span>
        </div>
      </div>
    </article>
  );
}

function Spec({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex min-w-0 items-center gap-2">
      <span className="text-foreground/70 shrink-0">{icon}</span>
      <span className="truncate">{children}</span>
    </li>
  );
}

function DriveIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <rect x="2" y="1.5" width="3" height="4" rx="1" />
      <rect x="11" y="1.5" width="3" height="4" rx="1" />
      <rect x="2" y="10.5" width="3" height="4" rx="1" />
      <rect x="11" y="10.5" width="3" height="4" rx="1" />
      <path d="M8 3.5v9M5 3.5h6M5 12.5h6" />
    </svg>
  );
}
