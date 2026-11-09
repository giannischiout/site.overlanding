import { Check } from "lucide-react";

const INCLUDED = [
  "Unlimited kilometres",
  "Collision damage waiver (CDW)",
  "24/7 roadside assistance",
  "Free Keflavík Airport shuttle",
  "Winter tyres from Oct to Apr",
  "All taxes and VAT",
];

export function AlwaysIncluded() {
  return (
    <section
      aria-labelledby="included"
      className="bg-sky rounded-panel flex flex-col gap-5 p-6 md:p-8"
    >
      <h2 id="included" className="text-2xl font-bold tracking-[-0.02em]">
        Always included
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {INCLUDED.map((item) => (
          <li key={item} className="flex items-center gap-2.5 font-medium">
            <Check size={16} strokeWidth={2.75} className="text-link shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
