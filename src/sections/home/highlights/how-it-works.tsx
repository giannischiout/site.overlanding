import { Check } from "lucide-react";

const STEPS = [
  {
    title: "Book in two minutes",
    text: "Pick dates, a vehicle and your cover. Nothing to pay today.",
  },
  {
    title: "Collect at the airport",
    text: "Our shuttle leaves arrivals every 20 minutes and we track your flight, so a late landing is fine.",
  },
  {
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
  );
}
