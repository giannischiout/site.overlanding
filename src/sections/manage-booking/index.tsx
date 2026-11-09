"use client";

import Link from "next/link";
import { useState } from "react";
import { Phone } from "lucide-react";
import { useBookingHydrated } from "@/components/booking-hydrator";
import { demoBooking, findBooking } from "@/lib/manage-booking";
import { paths } from "@/lib/paths";
import {
  useBookingStore,
  type ConfirmedBooking,
} from "@/store/use-booking-store";
import type { Vehicle } from "@/types/content";
import { BookingDetails } from "./booking-details";
import { CancelPanel } from "./cancel-panel";
import { LookupForm } from "./lookup-form";

type Props = { vehicles: Vehicle[] };

/**
 * Find a booking by reference and email, then view or cancel it.
 * Front-end only: it searches the booking made in this browser plus a demo booking.
 */
export function ManageBookingView({ vehicles }: Props) {
  const hydrated = useBookingHydrated();
  const confirmed = useBookingStore((state) => state.confirmed);
  const [booking, setBooking] = useState<ConfirmedBooking | null>(null);
  const [notFound, setNotFound] = useState(false);
  const vehicle = booking && vehicles.find((v) => v.id === booking.vehicleId);

  const lookup = ({
    reference,
    email,
  }: {
    reference: string;
    email: string;
  }) => {
    const found = findBooking([confirmed, demoBooking()], reference, email);
    setBooking(found ?? null);
    setNotFound(!found);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10">
      <header className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-[-0.02em] md:text-5xl">
          Manage your booking
        </h1>
        <p className="text-muted-foreground max-w-[52ch] text-lg">
          Check your dates and cover, or cancel. Changing dates or vehicle is
          quickest by phone.
        </p>
      </header>

      {booking && vehicle ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start">
          <BookingDetails booking={booking} vehicle={vehicle} />
          <div className="flex flex-col gap-6">
            <CancelPanel
              key={booking.reference}
              booking={booking}
              vehicle={vehicle}
            />
            <section className="rounded-panel flex flex-col gap-2 bg-white p-6 ring-1 ring-black/[0.06]">
              <h2 className="font-bold">Change dates or vehicle</h2>
              <p className="text-muted-foreground text-[15px]">
                A local picks up day and night and changes it while you&rsquo;re
                on the line.
              </p>
              <a
                href="tel:+3545550199"
                className="text-link mt-1 flex w-fit items-center gap-2 font-semibold hover:underline"
              >
                <Phone size={16} aria-hidden /> +354 555 0199
              </a>
            </section>
            <button
              type="button"
              onClick={() => setBooking(null)}
              className="text-muted-foreground hover:text-foreground w-fit text-sm font-semibold"
            >
              Look up another booking
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          {/* Before the store rehydrates, a booking made in this browser can't be found yet */}
          <LookupForm onLookup={lookup} notFound={hydrated && notFound} />
          <aside className="flex flex-col gap-3 lg:pt-8">
            <h2 className="font-bold">No reference?</h2>
            <p className="text-muted-foreground leading-relaxed">
              It&rsquo;s in the confirmation email we sent when you booked.
              Can&rsquo;t find it? Call us and we&rsquo;ll look it up by name.
            </p>
            <Link
              href={paths.vehicles()}
              className="text-link w-fit font-semibold hover:underline"
            >
              Or start a new booking
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
