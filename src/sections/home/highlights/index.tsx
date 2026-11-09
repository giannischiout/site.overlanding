import Link from "next/link";
import { paths } from "@/lib/paths";
import { CancelTimeline } from "@/sections/home/highlights/cancel-timeline";
import { ExcessCompare } from "@/sections/home/highlights/excess-compare";
import { HowItWorks } from "@/sections/home/highlights/how-it-works";
import { ProofCard } from "@/sections/home/highlights/proof-card";
import { ReviewPanel } from "@/sections/home/highlights/review-panel";
import { SampleQuote } from "@/sections/home/highlights/sample-quote";
import { StatsStrip } from "@/sections/home/highlights/stats-strip";

/** Why rent with us: each claim is shown, not described */
export function Highlights() {
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

      <ul className="grid gap-5 lg:grid-cols-3">
        <ProofCard
          title="The price you see is the price you pay"
          text="Kilometres, VAT, airport pickup and basic cover are in every quote. Nothing extra at the desk."
        >
          <SampleQuote />
        </ProofCard>
        <ProofCard
          title="Cover for what Iceland throws at a car"
          text="Gravel, sand and ash, tyres and windscreen are all in one plan, with nothing to pay if something happens."
        >
          <ExcessCompare />
        </ProofCard>
        <ProofCard
          title="Free to cancel until a week before"
          text="Plans change with the weather. Move or cancel without a fee up to 7 days before pickup."
        >
          <CancelTimeline />
        </ProofCard>
      </ul>

      <div className="grid gap-5 lg:grid-cols-[5fr_7fr]">
        <ReviewPanel />
        <HowItWorks />
      </div>
    </section>
  );
}
