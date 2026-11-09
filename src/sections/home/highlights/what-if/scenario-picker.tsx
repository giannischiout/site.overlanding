import { ArrowRight } from "lucide-react";
import type { Scenario } from "@/data/scenarios";
import { cn } from "@/lib/utils";

type Props = {
  scenarios: Scenario[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function ScenarioPicker({ scenarios, selectedId, onSelect }: Props) {
  return (
    <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1.5">
      {scenarios.map((scenario) => {
        const selected = scenario.id === selectedId;
        return (
          <li key={scenario.id}>
            <button
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(scenario.id)}
              className={cn(
                "rounded-control group flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-[15px] font-semibold transition-colors lg:py-3.5",
                "focus-visible:ring-ring outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                selected
                  ? "bg-basalt text-white"
                  : "bg-sky hover:bg-hover lg:bg-transparent",
              )}
            >
              {scenario.label}
              <ArrowRight
                size={16}
                aria-hidden
                className={cn(
                  "hidden shrink-0 transition-transform lg:block motion-reduce:transition-none",
                  selected ? "text-aurora translate-x-0" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60",
                )}
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
