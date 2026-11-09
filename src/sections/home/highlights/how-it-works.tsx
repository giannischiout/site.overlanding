import { Check } from "lucide-react";

/** The trip from our side, told as a timeline rather than numbered feature steps */
const STEPS = [
  {
    when: "Today",
    title: "Book in two minutes",
    text: "Pick dates, a vehicle and your cover. Nothing to pay today.",
  },
  {
    when: "Landing day",
    title: "Collect at the airport",
    text: "Our shuttle leaves arrivals every 20 minutes and we track your flight, so a late landing is fine.",
  },
  {
    when: "Last day",
    title: "Drop off and fly home",
    text: "Leave it at our depot with any amount of fuel. We drive you to departures.",
  },
];

const SMALL_PRINT = [
  "Serviced and winterised in our own Keflavík workshop",
  "Locals on the phone day and night, not a call centre",
  "Unlimited kilometres on every vehicle",
];

export function HowItWorks() {
  return (
    <div className="bg-sky rounded-panel flex flex-col gap-8 p-6 md:p-10">
      <h3 className="text-2xl font-bold tracking-[-0.02em] md:text-3xl">How it works</h3>
      <ol className="flex flex-col">
        {STEPS.map((step) => (
          <li
            key={step.title}
            className="relative grid gap-1 border-l-2 border-black/10 pb-7 pl-6 last:border-transparent last:pb-0 md:grid-cols-[8.5rem_1fr] md:gap-x-6 md:pl-8"
          >
            <span
              aria-hidden
              className="bg-aurora ring-sky absolute top-1.5 -left-[7px] size-3 rounded-[3px] ring-4"
            />
            <p className="text-muted-foreground pt-0.5 font-mono text-xs tracking-wide uppercase md:row-span-2">
              {step.when}
            </p>
            <p className="font-bold">{step.title}</p>
            <p className="text-muted-foreground text-[15px] leading-snug md:col-start-2">{step.text}</p>
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
  );
}
