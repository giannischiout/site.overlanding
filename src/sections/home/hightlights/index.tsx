import Image from "next/image";
import Link from "next/link";
import {
  BadgeEuro,
  Bus,
  CalendarCheck,
  Headset,
  type LucideIcon,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

// Placeholder figures: replace with the company's real numbers before launch
const STATS = [
  { value: "4.9", label: "average from 6,400+ reviews", icon: Star },
  { value: "18,000+", label: "trips around Iceland since 2014" },
  { value: "1.6 yrs", label: "average age of the fleet" },
  { value: "24/7", label: "roadside help in English" },
];

const REASONS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: BadgeEuro,
    title: "The price you see is the price you pay",
    text: "Unlimited kilometres, CDW, VAT and airport pickup are in every quote. No fees at the desk.",
  },
  {
    icon: ShieldCheck,
    title: "Zero-excess protection that means it",
    text: "Gravel, sand, ash, tyres and windscreen. One plan covers what Iceland actually throws at a car.",
  },
  {
    icon: Bus,
    title: "Meet-and-greet at Keflavík",
    text: "Our shuttle leaves arrivals every 20 minutes. We track your flight and wait if you land late.",
  },
  {
    icon: CalendarCheck,
    title: "Free cancellation up to 7 days",
    text: "Plans change with the weather. Move or cancel without a fee until a week before pickup.",
  },
  {
    icon: Sparkles,
    title: "Serviced by our own mechanics",
    text: "Every vehicle is checked, cleaned and winterised in our Keflavík workshop between rentals.",
  },
  {
    icon: Headset,
    title: "Locals on the phone, day and night",
    text: "Road closures, aurora forecasts or a flat tyre at 2 a.m.: you reach a person who lives here.",
  },
];

const STEPS = [
  { title: "Book in two minutes", text: "Pick dates, a vehicle and your cover. Nothing to pay today." },
  { title: "Collect at the airport", text: "Hop on our shuttle, sign once and get a walk-through of the vehicle." },
  { title: "Drop off and fly home", text: "Leave it at our depot with any amount of fuel. We drive you to departures." },
];

export function Highlights() {
  return (
    <section aria-labelledby="why-us" className="flex flex-col gap-10 py-16 md:gap-14 md:py-24">
      <header className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="flex max-w-2xl flex-col gap-3">
          <p className="text-link text-sm font-bold tracking-[0.16em] uppercase">Why rent with us</p>
          <h2 id="why-us" className="text-4xl font-bold tracking-[-0.02em] text-balance md:text-[3.5rem] md:leading-[1.02]">
            An Icelandic company, on the road with you
          </h2>
        </div>
        <Link
          href="/book/vehicles"
          className="bg-basalt hover:bg-basalt-2 w-fit rounded-full px-6 py-3.5 font-semibold text-white transition-colors"
        >
          Find your vehicle
        </Link>
      </header>

      {/* Proof */}
      <dl className="grid grid-cols-2 overflow-hidden rounded-[22px] bg-white ring-1 ring-black/[0.05] lg:grid-cols-4">
        {STATS.map(({ value, label, icon: Icon }, index) => (
          <div
            key={label}
            className={`flex flex-col gap-1 p-6 md:p-8 ${index % 2 ? "border-l" : ""} ${index > 1 ? "border-t lg:border-t-0" : ""} ${index === 2 ? "lg:border-l" : ""}`}
          >
            <dt className="sr-only">{label}</dt>
            <dd className="flex items-center gap-2 text-4xl font-bold tracking-[-0.02em] md:text-5xl">
              {value}
              {Icon && <Icon size={28} className="fill-[#f5b400] text-[#f5b400]" />}
            </dd>
            <dd className="text-muted-foreground text-[15px] leading-snug">{label}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-5 lg:grid-cols-[5fr_7fr]">
        <div className="bg-basalt relative min-h-[420px] overflow-hidden rounded-[22px] text-white">
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
                  <Star key={i} size={14} className="fill-[#f5b400] text-[#f5b400]" />
                ))}
              </span>
              Hanna &amp; Jonas, California Ocean · February
            </figcaption>
          </figure>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-[22px] bg-[var(--border)] ring-1 ring-black/[0.05] sm:grid-cols-2">
          {REASONS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex flex-col gap-3 bg-white p-6 md:p-7">
              <span className="bg-primary-light text-link flex size-11 items-center justify-center rounded-xl">
                <Icon size={21} strokeWidth={2} />
              </span>
              <h3 className="text-lg leading-snug font-bold">{title}</h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">{text}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* How it works */}
      <div className="bg-sky grid gap-8 rounded-[22px] p-6 md:grid-cols-[auto_1fr] md:items-center md:gap-14 md:p-10">
        <div className="relative hidden aspect-[4/3] w-[300px] overflow-hidden rounded-2xl md:block">
          <Image
            src="/assets/fleet/1671719367451-7bf05ae9549c.jpg"
            alt="Hand holding a car key in front of a rental car"
            fill
            sizes="300px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-bold tracking-[-0.02em] md:text-3xl">How it works</h3>
          <ol className="grid gap-6 sm:grid-cols-3">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-2">
                <span className="bg-basalt text-aurora flex size-9 items-center justify-center rounded-full text-sm font-bold">
                  {index + 1}
                </span>
                <p className="font-bold">{step.title}</p>
                <p className="text-muted-foreground text-[15px] leading-snug">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
