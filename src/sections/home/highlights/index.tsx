import Link from "next/link";
import { paths } from "@/lib/paths";
import { sampleBooking } from "@/lib/sample-booking";
import { HowItWorks } from "@/sections/home/highlights/how-it-works";
import { ReviewPanel } from "@/sections/home/highlights/review-panel";
import { SampleQuote } from "@/sections/home/highlights/sample-quote";
import { StatsStrip } from "@/sections/home/highlights/stats-strip";
import { WhatIf } from "@/sections/home/highlights/what-if";

/** Why rent with us: each claim is shown, not described */
export function Highlights() {
  const booking = sampleBooking();

  return (
    <section aria-labelledby="why-us" className="flex flex-col gap-10 py-16 md:gap-12 md:py-24">
      <header className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <h2
          id="why-us"
          className="max-w-3xl text-4xl font-bold tracking-[-0.02em] text-balance md:text-[3.5rem] md:leading-[1.02]"
        >
          An Icelandic company, on the road with you
        </h2>
        <Link href={paths.vehicles()} className="btn-primary w-fit px-6 py-3.5">
          Find your vehicle
        </Link>
      </header>

      <StatsStrip />

      {booking && (
        <WhatIf
          deskReceipt={<SampleQuote />}
          booking={{
            name: `${booking.vehicle.brand.name} ${booking.vehicle.model}`,
            days: booking.days,
            dailyRate: booking.vehicle.basePricePerDay,
            total: booking.total,
          }}
        />
      )}

      <div className="grid gap-5 lg:grid-cols-[5fr_7fr]">
        <ReviewPanel />
        <HowItWorks />
      </div>
    </section>
  );
}
