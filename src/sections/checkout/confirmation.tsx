"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle2, Mail, Phone, Plane } from "lucide-react";
import { useBookingHydrated } from "@/components/booking-hydrator";
import { TripSummary } from "@/components/trip-summary";
import { formatPrice } from "@/lib/pricing";
import locations from "@/data/pickup-locations.json";
import { useBookingStore } from "@/store/use-booking-store";
import { Steps } from "@/sections/checkout/steps";
import type { PickupLocation, Vehicle } from "@/types/content";

const NEXT_STEPS = [
  {
    icon: Mail,
    title: "Check your inbox",
    text: "Your confirmation and a secure payment link are on their way.",
  },
  {
    icon: Plane,
    title: "Land and meet us",
    text: "Our shuttle runs from the bus stop outside arrivals every 20 minutes. Follow the green signs.",
  },
  {
    icon: Phone,
    title: "We're on call",
    text: "Road help, weather questions or a change of plan: +354 555 0199, any hour.",
  },
];

export function ConfirmationView({ vehicles }: { vehicles: Vehicle[] }) {
  const hydrated = useBookingHydrated();
  const booking = useBookingStore((s) => s.confirmed);

  // The reservation is made: empty the cart so a new booking starts fresh
  useEffect(() => {
    if (hydrated && booking) {
      useBookingStore.setState({ vehicleId: null, trip: null, extras: {} });
    }
  }, [hydrated, booking]);

  if (!hydrated) return <div className="min-h-[60vh]" />;

  const vehicle = booking && vehicles.find((v) => v.id === booking.vehicleId);
  if (!booking || !vehicle) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-3xl font-bold">No booking to show</h1>
        <p className="text-muted-foreground">Your confirmation is in your email. Start a new booking any time.</p>
        <Link href="/book/vehicles" className="btn-primary px-6 py-3">
          Browse vehicles
        </Link>
      </div>
    );
  }

  const all = locations as PickupLocation[];

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10">
      <div className="flex justify-center">
        <Steps current={2} />
      </div>

      <header className="flex flex-col items-center gap-4 text-center">
        <span className="bg-primary-light text-link animate-in zoom-in-50 flex size-16 items-center justify-center rounded-full duration-500">
          <CheckCircle2 size={34} strokeWidth={2} />
        </span>
        <h1 className="text-4xl font-bold tracking-[-0.02em] md:text-5xl">
          You&apos;re all set, {booking.driver.firstName}
        </h1>
        <p className="text-muted-foreground max-w-[48ch] text-lg">
          We&apos;ve reserved your {vehicle.brand.name} {vehicle.model}. A confirmation is on its way to{" "}
          <strong className="text-foreground">{booking.driver.email}</strong>.
        </p>
        <p className="bg-sky rounded-control px-4 py-2 font-mono text-sm font-semibold tracking-wider">
          Booking reference {booking.reference}
        </p>
      </header>

      <section className="overflow-hidden rounded-panel bg-white shadow-panel ring-1 ring-black/[0.04]">
        <div className="relative aspect-[21/9]">
          <Image src={vehicle.image.url} alt={vehicle.image.alt} fill sizes="768px" className="object-cover" />
        </div>
        <div className="flex flex-col gap-5 p-6 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-link text-xs font-bold tracking-[0.1em] uppercase">{vehicle.category.name}</p>
              <p className="text-2xl font-bold">{vehicle.brand.name} {vehicle.model}</p>
            </div>
            <p className="text-right">
              <span className="text-muted-foreground block text-sm">Total</span>
              <span className="tabular text-2xl font-bold">{formatPrice(booking.total)}</span>
            </p>
          </div>
          <div className="border-t pt-5">
            <TripSummary
              from={booking.trip.from}
              to={booking.trip.to}
              pickup={all.find((l) => l.id === booking.trip.pickupId)}
              dropoff={all.find((l) => l.id === booking.trip.dropoffId)}
              pickupTime={booking.trip.pickupTime}
              dropoffTime={booking.trip.dropoffTime}
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {NEXT_STEPS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex flex-col gap-2 rounded-panel bg-white p-5 ring-1 ring-black/[0.05]">
            <Icon size={20} className="text-link" />
            <p className="font-bold">{title}</p>
            <p className="text-muted-foreground text-[15px] leading-snug">{text}</p>
          </div>
        ))}
      </section>

      <div className="flex justify-center">
        <Link href="/" className="btn-secondary px-6 py-3">
          Back to home
        </Link>
      </div>
    </div>
  );
}
