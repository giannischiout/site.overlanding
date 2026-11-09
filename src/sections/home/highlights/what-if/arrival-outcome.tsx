import type { ArrivalScenario } from "@/data/scenarios";
import { Payoff } from "./payoff";

type Props = { scenario: ArrivalScenario };

/** A late landing, minute by minute, ending in the payoff */
export function ArrivalOutcome({ scenario }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <ol className="flex flex-col">
        {scenario.timeline.map((step) => (
          <li
            key={step.time}
            className="relative grid grid-cols-[4rem_1fr] gap-x-4 border-l-2 border-black/10 pb-5 pl-6 last:border-transparent last:pb-0"
          >
            <span
              aria-hidden
              className="bg-aurora ring-sky absolute top-1.5 -left-[7px] size-3 rounded-[3px] ring-4"
            />
            <span className="tabular font-mono text-sm font-semibold">{step.time}</span>
            <span className="text-[15px] leading-snug">{step.text}</span>
          </li>
        ))}
      </ol>
      <Payoff label="Late arrival" detail="Shuttle, desk and keys" message="No extra charge" delay={200} />
    </div>
  );
}
