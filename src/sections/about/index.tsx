import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { paths } from "@/lib/paths";

const DECISIONS = [
  {
    title: "Show it, don't claim it",
    text: "Rental sites all say “no hidden fees” and “full cover”. Here the home page lets you try it: pick a cracked windscreen or a sandstorm and see what each cover level actually costs you.",
  },
  {
    title: "One source for every price",
    text: "The checkout's pricing function also prices the home page receipt, the What-if panel and the cancel preview in Manage booking. Change a daily rate once and every number on the site follows.",
  },
  {
    title: "A map built from real terrain",
    text: "Coastline, glaciers, lakes and roads are drawn from geographic data as server-rendered SVG, so about 40 KB of paths arrive as HTML and never ship as JavaScript. Routes follow the actual roads.",
  },
  {
    title: "Motion only where something changes",
    text: "Bars fill, routes draw and the €0 payoff unmasks once, when they come into view. Visitors who ask their device for less motion get the final state with no movement.",
  },
];

const STACK = [
  "Next.js 15 App Router",
  "React 19",
  "TypeScript",
  "Tailwind CSS 4",
  "Zustand",
  "React Hook Form + Zod",
  "Radix primitives",
];

const TRY = [
  { label: "The What-if panel", href: `${paths.home}#why-us` },
  { label: "A road trip, day by day", href: paths.roadTrip("glacier-country") },
  { label: "Book a camper end to end", href: paths.vehicles() },
  { label: "Manage the demo booking", href: paths.manageBooking },
];

/** About this site: a short case study, since Aurora Campers is a portfolio project */
export function AboutView() {
  return (
    <article className="flex flex-col gap-16 md:gap-24">
      <header className="flex max-w-4xl flex-col gap-5">
        <p className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
          About this site
        </p>
        <h1 className="text-5xl leading-[1.02] font-bold tracking-[-0.03em] text-balance md:text-7xl">
          A camper rental site built to be tried, not just read
        </h1>
        <p className="text-muted-foreground max-w-[58ch] text-lg leading-relaxed md:text-xl">
          Aurora Campers is a portfolio project: the front end of a rental
          company for driving Iceland. The company is made up. The booking flow,
          pricing and road trips work for real, with no back end behind them.
        </p>
      </header>

      <section
        aria-labelledby="decisions-title"
        className="flex flex-col gap-8"
      >
        <h2
          id="decisions-title"
          className="text-3xl font-bold tracking-[-0.02em]"
        >
          Decisions that shaped it
        </h2>
        <ol className="rounded-panel grid gap-px overflow-hidden bg-black/10 md:grid-cols-2">
          {DECISIONS.map((decision, index) => (
            <li
              key={decision.title}
              className="flex flex-col gap-3 bg-[var(--background)] p-6 md:p-8"
            >
              <span className="text-link font-mono text-sm font-semibold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-bold tracking-[-0.01em]">
                {decision.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {decision.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-12 lg:grid-cols-2">
        <section aria-labelledby="stack-title" className="flex flex-col gap-5">
          <h2
            id="stack-title"
            className="text-3xl font-bold tracking-[-0.02em]"
          >
            Built with
          </h2>
          <ul className="flex flex-wrap gap-2">
            {STACK.map((item) => (
              <li
                key={item}
                className="rounded-control bg-white px-3.5 py-2 text-[15px] font-semibold ring-1 ring-black/[0.06]"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="try-title" className="flex flex-col gap-5">
          <h2 id="try-title" className="text-3xl font-bold tracking-[-0.02em]">
            Worth trying
          </h2>
          <ul className="flex flex-col divide-y divide-black/10 border-y border-black/10">
            {TRY.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="group flex items-center justify-between gap-4 py-4 font-semibold"
                >
                  {item.label}
                  <ArrowUpRight
                    size={18}
                    aria-hidden
                    className="text-link transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
