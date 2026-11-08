import Image from "next/image";
import Link from "next/link";
import { Check, Star } from "lucide-react";
import { getVehicle } from "@/data";
import { PROTECTIONS } from "@/data/extras";
import { formatPrice, quote } from "@/lib/pricing";

const STATS = [
  { value: "4.9", label: "average from 6,400+ reviews", icon: Star },
  { value: "18,000+", label: "trips around Iceland since 2014" },
  { value: "1.6 yrs", label: "average age of the fleet" },
  { value: "24/7", label: "roadside help in English" },
];

const STEPS = [
  { title: "Book in two minutes", text: "Pick dates, a vehicle and your cover. Nothing to pay today." },
  {
    title: "Collect at the airport",
    text: "Our shuttle leaves arrivals every 20 minutes and we track your flight, so a late landing is fine.",
  },
  { title: "Drop off and fly home", text: "Leave it at our depot with any amount of fuel. We drive you to departures." },
];

const SMALL_PRINT = [
  "Serviced and winterised in our own Keflavík workshop",
  "Locals on the phone day and night, not a call centre",
  "Unlimited kilometres on every vehicle",
];

/**
 * Why rent with us: each claim is shown, not described. The sample quote is computed with
 * the same pricing code the checkout uses, so it can never drift from the real numbers.
 */
export function Highlights() {
  return (
    <section aria-labelledby="why-us" className="flex flex-col gap-10 py-16 md:gap-12 md:py-24">
      <header className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <h2 id="why-us" className="max-w-3xl text-4xl font-bold tracking-[-0.02em] text-balance md:text-[3.5rem] md:leading-[1.02]">
          An Icelandic company, on the road with you
        </h2>
        <Link href="/book/vehicles" className="btn-primary w-fit px-6 py-3.5">
          Find your vehicle
        </Link>
      </header>

      <dl className="rounded-panel grid grid-cols-2 overflow-hidden bg-white ring-1 ring-black/[0.05] lg:grid-cols-4">
        {STATS.map(({ value, label, icon: Icon }, index) => (
          <div
            key={label}
            className={`flex flex-col gap-1 p-6 md:p-8 ${index % 2 ? "border-l" : ""} ${index > 1 ? "border-t lg:border-t-0" : ""} ${index === 2 ? "lg:border-l" : ""}`}
          >
            <dt className="sr-only">{label}</dt>
            <dd className="flex items-center gap-2 text-4xl font-bold tracking-[-0.02em] md:text-5xl">
              {value}
              {Icon && <Icon size={28} className="fill-star text-star" />}
            </dd>
            <dd className="text-muted-foreground text-[15px] leading-snug">{label}</dd>
          </div>
        ))}
      </dl>

      <ul className="grid gap-5 lg:grid-cols-3">
        <Proof
          title="The price you see is the price you pay"
          text="Kilometres, VAT, airport pickup and basic cover are in every quote. Nothing extra at the desk."
        >
          <SampleQuote />
        </Proof>
        <Proof
          title="Cover for what Iceland throws at a car"
          text="Gravel, sand and ash, tyres and windscreen are all in one plan, with nothing to pay if something happens."
        >
          <ExcessCompare />
        </Proof>
        <Proof
          title="Free to cancel until a week before"
          text="Plans change with the weather. Move or cancel without a fee up to 7 days before pickup."
        >
          <CancelTimeline />
        </Proof>
      </ul>

      <div className="grid gap-5 lg:grid-cols-[5fr_7fr]">
        <div className="bg-basalt rounded-panel relative min-h-[400px] overflow-hidden text-white">
          <Image
            src="/assets/fleet/1721220300289-b12765c054b6.jpg"
            alt="Camper van parked under the northern lights"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
          <div className="from-basalt/90 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
          <figure className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 md:p-8">
            <blockquote className="text-xl leading-snug font-semibold text-balance md:text-2xl">
              &ldquo;The van was spotless, the heater kept us warm at minus eight, and when we got
              a stone chip they sorted it over the phone in ten minutes.&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-3 text-sm text-white/80">
              <span className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={14} className="fill-star text-star" />
                ))}
              </span>
              Hanna &amp; Jonas, California Ocean · February
            </figcaption>
          </figure>
        </div>

        <div className="bg-sky rounded-panel flex flex-col gap-8 p-6 md:p-10">
          <h3 className="text-2xl font-bold tracking-[-0.02em] md:text-3xl">How it works</h3>
          <ol className="flex flex-col gap-6">
            {STEPS.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                <span className="bg-basalt text-aurora row-span-2 flex size-9 items-center justify-center rounded-full text-sm font-bold">
                  {index + 1}
                </span>
                <p className="font-bold">{step.title}</p>
                <p className="text-muted-foreground text-[15px] leading-snug">{step.text}</p>
              </li>
            ))}
          </ol>
          <ul className="mt-auto flex flex-col gap-2 border-t border-black/10 pt-6 text-[15px]">
            {SMALL_PRINT.map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <Check size={17} className="text-link mt-0.5 shrink-0" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Proof({ title, text, children }: { title: string; text: string; children: React.ReactNode }) {
  return (
    <li className="rounded-panel shadow-card flex flex-col gap-3 bg-white p-6 ring-1 ring-black/[0.04] md:p-7">
      <h3 className="text-xl leading-snug font-bold tracking-[-0.01em]">{title}</h3>
      <p className="text-muted-foreground text-[15px] leading-relaxed">{text}</p>
      <div className="pt-3">{children}</div>
    </li>
  );
}

/** A real quote for a week in our best-selling camper with zero-excess cover */
function SampleQuote() {
  const vehicle = getVehicle("vw-california-ocean");
  if (!vehicle) return null;
  const { lines, total } = quote({ vehicle, days: 7, protectionId: "premium", extras: {}, oneWay: false });
  const included = ["Unlimited kilometres", "Airport pickup", "VAT"];

  return (
    <div className="rounded-control bg-sky tabular p-4 text-sm">
      <p className="text-muted-foreground mb-3 text-xs font-semibold">Sample quote · a week with zero excess</p>
      <ul className="flex flex-col gap-1.5">
        {lines.map((line) => (
          <li key={line.label} className="flex justify-between gap-3">
            <span>{line.label}</span>
            <span>{formatPrice(line.amount)}</span>
          </li>
        ))}
        {included.map((label) => (
          <li key={label} className="text-muted-foreground flex justify-between gap-3">
            <span>{label}</span>
            <span>Included</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex justify-between border-t border-dashed border-black/15 pt-3 font-bold">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </p>
      <p className="text-muted-foreground mt-1 text-xs">Extra to pay at the desk: €0</p>
    </div>
  );
}

/** What you would pay after a gravel chip, basic cover vs zero excess */
function ExcessCompare() {
  const basic = PROTECTIONS.find((p) => p.id === "basic");
  const premium = PROTECTIONS.find((p) => p.id === "premium");
  if (!basic || !premium) return null;
  const rows = [
    { name: `${basic.name} cover`, excess: basic.excess, width: "100%" },
    { name: `${premium.name} cover`, excess: premium.excess, width: "2%" },
  ];

  return (
    <div className="rounded-control bg-sky flex flex-col gap-3 p-4 text-sm">
      <p className="text-muted-foreground text-xs font-semibold">Most you pay if the windscreen cracks</p>
      {rows.map((row) => (
        <div key={row.name} className="flex flex-col gap-1.5">
          <div className="flex justify-between font-semibold">
            <span>{row.name}</span>
            <span className="tabular">{formatPrice(row.excess)}</span>
          </div>
          <div className="h-2 rounded-full bg-white">
            <div
              className={`h-full rounded-full ${row.excess ? "bg-warn/70" : "bg-aurora"}`}
              style={{ width: row.width }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Today → free cancellation → 7 days before pickup → pickup */
function CancelTimeline() {
  return (
    <div className="rounded-control bg-sky p-4 text-sm">
      <div className="flex h-2 overflow-hidden rounded-full">
        <div className="bg-aurora w-[78%]" />
        <div className="w-[22%] bg-white" />
      </div>
      <div className="relative mt-2 h-10 text-xs">
        <span className="absolute left-0 font-semibold">Today</span>
        <span className="text-link absolute left-[39%] -translate-x-1/2 font-semibold whitespace-nowrap">
          Cancel free
        </span>
        <span className="absolute left-[78%] -translate-x-1/2 text-center leading-tight">
          7 days
          <br />
          before
        </span>
        <span className="absolute right-0 font-semibold">Pickup</span>
      </div>
    </div>
  );
}
