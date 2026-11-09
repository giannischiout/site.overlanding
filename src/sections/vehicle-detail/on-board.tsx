import { Check } from "lucide-react";
import type { Feature } from "@/types/content";

export function OnBoard({ features }: { features: Feature[] }) {
  return (
    <section aria-labelledby="features" className="flex flex-col gap-5">
      <h2 id="features" className="text-2xl font-bold tracking-[-0.02em]">
        On board
      </h2>
      <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {features.map((feature) => (
          <li key={feature.id} className="flex gap-3">
            <span className="bg-primary-light text-link mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full">
              <Check size={14} strokeWidth={2.75} />
            </span>
            <span>
              <span className="block font-semibold">{feature.name}</span>
              <span className="text-muted-foreground text-[15px]">
                {feature.description}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
