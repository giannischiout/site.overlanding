"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  BedDouble,
  Briefcase,
  CalendarDays,
  Check,
  Cog,
  Fuel,
  Mountain,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { VehicleCard } from "@/components/vehicle-card";
import { Stepper } from "@/components/stepper";
import { TripSummary } from "@/components/trip-summary";
import { cn } from "@/lib/utils";
import { formatPrice, quote, rentalDays } from "@/lib/pricing";
import { EXTRAS, PROTECTIONS } from "@/data/extras";
import { useFilterStore } from "@/store/use-filters-store";
import { useBookingStore } from "@/store/use-booking-store";
import type { Vehicle } from "@/types/content";

const INCLUDED = [
  "Unlimited kilometres",
  "Collision damage waiver (CDW)",
  "24/7 roadside assistance",
  "Free Keflavík Airport shuttle",
  "Winter tyres from Oct to Apr",
  "All taxes and VAT",
];

export function VehicleDetailView({ vehicle, similar }: { vehicle: Vehicle; similar: Vehicle[] }) {
  const router = useRouter();
  const [photo, setPhoto] = useState(0);

  const { range, pickup, dropoff, pickupTime, dropoffTime, onOpen, setCurrentScreen } = useFilterStore();
  const { protectionId, extras, setProtection, setExtra, startCheckout } = useBookingStore();

  const days = rentalDays(range.from, range.to);
  const oneWay = !!pickup && !!dropoff && pickup.id !== dropoff.id;
  const { lines, total } = quote({ vehicle, days, protectionId, extras, oneWay });
  const extrasForVehicle = EXTRAS.filter((extra) => !extra.campingOnly || vehicle.sleeps > 0);

  const openDates = () => {
    if (window.matchMedia("(min-width: 961px)").matches) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCurrentScreen("summary");
    }
    onOpen("dateRange");
  };

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
    router.push("/book/checkout");
  };

  return (
    <div className="pt-6 pb-24 md:pt-8">
      <Link
        href={`/book/vehicles?category=${vehicle.category.id}`}
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-semibold"
      >
        <ArrowLeft size={16} />
        All {vehicle.category.name.toLowerCase()}
      </Link>

      {/* Gallery */}
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_220px] lg:grid-cols-[1fr_280px]">
        <div className="bg-sky relative aspect-[16/10] overflow-hidden rounded-[22px] shadow-[0_18px_40px_-28px_rgb(6_20_16/0.6)]">
          {vehicle.images.map((image, index) => (
            <Image
              key={image.url + index}
              src={image.url}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 70vw, 100vw"
              className={cn(
                "object-cover transition-opacity duration-500",
                photo === index ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
          <span className="bg-basalt/70 absolute right-4 bottom-4 rounded-full px-3 py-1 text-sm font-semibold text-white backdrop-blur">
            {photo + 1} / {vehicle.images.length}
          </span>
        </div>
        <ul className="grid grid-cols-3 gap-3 md:grid-cols-1 md:grid-rows-3">
          {vehicle.images.map((image, index) => (
            <li key={image.url + index} className="min-h-0">
              <button
                type="button"
                onClick={() => setPhoto(index)}
                aria-label={`Show photo ${index + 1}`}
                aria-pressed={photo === index}
                className={cn(
                  "relative block aspect-[4/3] w-full overflow-hidden rounded-2xl transition-[box-shadow,opacity] duration-200 md:aspect-auto md:h-full",
                  photo === index
                    ? "shadow-[0_0_0_3px_var(--background),0_0_0_5px_var(--link)]"
                    : "opacity-75 hover:opacity-100",
                )}
              >
                <Image src={image.url} alt="" fill sizes="280px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
        <div className="flex min-w-0 flex-col gap-12">
          {/* Title */}
          <header className="flex flex-col gap-3">
            <p className="text-link text-sm font-bold tracking-[0.12em] uppercase">
              {vehicle.category.name} · {vehicle.year}
            </p>
            <h1 className="text-4xl font-bold tracking-[-0.02em] md:text-5xl">
              {vehicle.brand.name} {vehicle.model}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px]">
              <span className="flex items-center gap-1.5 font-semibold">
                <Star size={16} className="fill-[#f5b400] text-[#f5b400]" />
                {vehicle.rating.toFixed(1)}
                <span className="text-muted-foreground font-normal">
                  · {vehicle.reviews} reviews
                </span>
              </span>
              {vehicle.fRoadApproved && (
                <span className="bg-primary-light text-link flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold">
                  <Mountain size={14} /> F-road approved
                </span>
              )}
            </div>
            <p className="text-muted-foreground mt-2 max-w-[64ch] text-lg leading-relaxed">
              {vehicle.description}
            </p>
          </header>

          {/* Specs */}
          <section aria-labelledby="specs" className="flex flex-col gap-5">
            <h2 id="specs" className="text-2xl font-bold tracking-[-0.02em]">Specifications</h2>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <SpecTile icon={<Users size={20} />} label="Seats" value={`${vehicle.seats}`} />
              <SpecTile icon={<BedDouble size={20} />} label="Sleeps" value={vehicle.sleeps ? `${vehicle.sleeps}` : "—"} />
              <SpecTile icon={<Cog size={20} />} label="Gearbox" value={vehicle.transmission === "automatic" ? "Automatic" : "Manual"} />
              <SpecTile icon={<Mountain size={20} />} label="Drive" value={vehicle.drive === "4x4" ? "4x4" : "Front-wheel"} />
              <SpecTile icon={<Fuel size={20} />} label="Fuel" value={vehicle.fuel[0].toUpperCase() + vehicle.fuel.slice(1)} />
              <SpecTile icon={<Briefcase size={20} />} label="Large bags" value={`${vehicle.luggage}`} />
            </ul>
          </section>

          {/* Features */}
          <section aria-labelledby="features" className="flex flex-col gap-5">
            <h2 id="features" className="text-2xl font-bold tracking-[-0.02em]">On board</h2>
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {vehicle.features.map((feature) => (
                <li key={feature.id} className="flex gap-3">
                  <span className="bg-primary-light text-link mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full">
                    <Check size={14} strokeWidth={2.75} />
                  </span>
                  <span>
                    <span className="block font-semibold">{feature.name}</span>
                    <span className="text-muted-foreground text-[15px]">{feature.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Protection */}
          <section aria-labelledby="protection" className="flex flex-col gap-5">
            <div>
              <h2 id="protection" className="text-2xl font-bold tracking-[-0.02em]">Choose your protection</h2>
              <p className="text-muted-foreground mt-1">
                Gravel, sand and wind are part of driving in Iceland. Excess is the most you pay if something happens.
              </p>
            </div>
            <div role="radiogroup" aria-label="Protection" className="grid gap-3 md:grid-cols-3">
              {PROTECTIONS.map((protection) => {
                const selected = protectionId === protection.id;
                return (
                  <button
                    key={protection.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setProtection(protection.id)}
                    className={cn(
                      "relative flex flex-col gap-3 rounded-[20px] bg-white p-5 text-left ring-1 transition-[box-shadow] duration-200",
                      selected
                        ? "shadow-[0_14px_30px_-20px_rgb(6_20_16/0.5)] ring-2 ring-[var(--link)]"
                        : "ring-black/[0.08] hover:ring-black/20",
                    )}
                  >
                    {protection.recommended && (
                      <span className="bg-aurora text-basalt absolute -top-2.5 right-4 rounded-full px-2.5 py-0.5 text-xs font-bold">
                        Most chosen
                      </span>
                    )}
                    <span className="flex items-center justify-between">
                      <span className="flex items-center gap-2 font-bold">
                        <ShieldCheck size={18} className="text-link" />
                        {protection.name}
                      </span>
                      <span
                        className={cn(
                          "flex size-5 items-center justify-center rounded-full border-2",
                          selected ? "border-[var(--link)] bg-[var(--link)]" : "border-[var(--border)]",
                        )}
                      >
                        {selected && <span className="size-2 rounded-full bg-white" />}
                      </span>
                    </span>
                    <span className="text-2xl font-bold">
                      {protection.pricePerDay ? `+${formatPrice(protection.pricePerDay)}` : "Included"}
                      {protection.pricePerDay > 0 && (
                        <span className="text-muted-foreground text-sm font-medium"> / day</span>
                      )}
                    </span>
                    <span className="text-sm font-semibold">
                      {protection.excess ? `${formatPrice(protection.excess)} excess` : "No excess"}
                    </span>
                    <ul className="text-muted-foreground flex flex-col gap-1.5 border-t pt-3 text-sm">
                      {protection.covers.map((item) => (
                        <li key={item} className="flex gap-2">
                          <Check size={14} className="text-link mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Extras */}
          <section aria-labelledby="extras" className="flex flex-col gap-5">
            <h2 id="extras" className="text-2xl font-bold tracking-[-0.02em]">Add extras</h2>
            <ul className="divide-y overflow-hidden rounded-[20px] bg-white ring-1 ring-black/[0.06]">
              {extrasForVehicle.map((extra) => (
                <li key={extra.id} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <p className="font-semibold">{extra.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {extra.description} · {formatPrice(extra.price)} / {extra.per}
                    </p>
                  </div>
                  <Stepper
                    label={extra.name}
                    value={extras[extra.id] ?? 0}
                    max={extra.id === "driver" ? 3 : 4}
                    onChange={(value) => setExtra(extra.id, value)}
                  />
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="included" className="bg-sky flex flex-col gap-5 rounded-[22px] p-6 md:p-8">
            <h2 id="included" className="text-2xl font-bold tracking-[-0.02em]">Always included</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-center gap-2.5 font-medium">
                  <Check size={16} strokeWidth={2.75} className="text-link shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Price summary */}
        <aside className="lg:row-span-1">
          <div className="sticky top-[calc(var(--nav-height)+104px)] flex flex-col gap-5 rounded-[22px] bg-white p-6 shadow-[0_1px_2px_rgb(6_20_16/0.06),0_24px_48px_-28px_rgb(6_20_16/0.45)] ring-1 ring-black/[0.04]">
            <p className="text-3xl font-bold tracking-[-0.02em]">
              {formatPrice(vehicle.basePricePerDay)}
              <span className="text-muted-foreground text-base font-medium"> / day</span>
            </p>

            <button type="button" onClick={openDates} className="hover:bg-hover -mx-2 rounded-2xl p-2 text-left transition-colors">
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
              <dl className="flex flex-col gap-2 border-t pt-4 text-[15px]">
                {lines.map((line) => (
                  <div key={line.label} className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{line.label}</dt>
                    <dd className="tabular font-medium">{formatPrice(line.amount)}</dd>
                  </div>
                ))}
                <div className="mt-2 flex items-baseline justify-between border-t pt-3">
                  <dt className="font-bold">Total</dt>
                  <dd className="tabular text-2xl font-bold">{formatPrice(total)}</dd>
                </div>
              </dl>
            ) : (
              <p className="bg-primary-light flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm">
                <CalendarDays size={16} className="text-link shrink-0" />
                Add your dates to see the full price.
              </p>
            )}

            <button
              type="button"
              onClick={onContinue}
              className="bg-basalt hover:bg-basalt-2 h-14 rounded-full text-base font-bold text-white transition-colors"
            >
              {days ? "Continue to booking" : "Choose dates"}
            </button>
            <p className="text-muted-foreground text-center text-sm">
              Free cancellation up to 7 days before pickup
            </p>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section aria-labelledby="similar" className="mt-24 flex flex-col gap-6">
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

function SpecTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <li className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/[0.05]">
      <span className="bg-sky text-foreground/80 flex size-10 shrink-0 items-center justify-center rounded-xl">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-muted-foreground text-[13px]">{label}</span>
        <span className="font-bold">{value}</span>
      </span>
    </li>
  );
}
