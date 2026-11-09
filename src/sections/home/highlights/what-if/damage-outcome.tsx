import { useRef } from "react";
import { PROTECTIONS } from "@/data/extras";
import type { DamageScenario } from "@/data/scenarios";
import { useInView } from "@/hooks/use-in-view";
import { coverOutcome } from "@/lib/cover";
import { formatPrice } from "@/lib/pricing";
import type { Protection } from "@/types/content";
import { Payoff } from "@/components/payoff";

type Props = { scenario: DamageScenario };

type Outcome = ReturnType<typeof coverOutcome>;

const BAR_STAGGER = 120;

/** Plain-words reason for the amount, so each row reads as a sentence */
function explain(outcome: Outcome, protection: Protection) {
  const excess = formatPrice(protection.excess);
  const reasons: Record<Outcome["status"], string> = {
    "not-covered": "Not covered, so you pay the whole repair",
    excess: `Covered, but you pay the first ${excess} (the excess)`,
    "under-excess": `Covered, but the repair is under your ${excess} excess`,
    full: "Covered in full",
  };
  return reasons[outcome.status];
}

const dailyPrice = (protection: Protection) =>
  protection.pricePerDay ? `+${formatPrice(protection.pricePerDay)}/day` : "Included";

/**
 * What you pay for this damage with each cover. The costly rows are quiet bars, scaled to the
 * repair bill; the cover that pays nothing is the payoff, revealed after the bars have filled.
 */
export function DamageOutcome({ scenario }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const rows = PROTECTIONS.map((protection) => ({
    protection,
    outcome: coverOutcome(scenario, protection),
  }));
  const costly = rows.filter((row) => row.outcome.pay > 0);
  const free = rows.filter((row) => row.outcome.pay === 0);

  return (
    <div ref={ref} data-play={inView} className="tabular flex flex-col gap-5">
      <div className="flex items-baseline justify-between gap-3 border-b border-black/10 pb-3">
        <span className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
          Repair bill
        </span>
        <span className="font-semibold">{formatPrice(scenario.repairCost)}</span>
      </div>
      <p className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
        What you pay with each cover
      </p>
      <ul className="flex flex-col gap-4">
        {costly.map(({ protection, outcome }, index) => (
          <li key={protection.id} className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-3">
              <span className="flex flex-col">
                <span className="font-semibold">
                  {protection.name} cover{" "}
                  <span className="text-muted-foreground text-sm font-normal">
                    · {dailyPrice(protection)}
                  </span>
                </span>
                <span className="text-muted-foreground text-sm">
                  {explain(outcome, protection)}
                </span>
              </span>
              <span className="text-warn text-xl font-semibold">{formatPrice(outcome.pay)}</span>
            </div>
            <div className="h-2 rounded-[3px] bg-white">
              <div
                className="bar-grow bg-warn/50 h-full rounded-[3px]"
                style={{
                  width: `${(outcome.pay / scenario.repairCost) * 100}%`,
                  animationDelay: `${index * BAR_STAGGER}ms`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      {free.map(({ protection, outcome }) => (
        <Payoff
          key={protection.id}
          label={`${protection.name} cover · ${dailyPrice(protection)}`}
          detail={explain(outcome, protection)}
          delay={costly.length * BAR_STAGGER + 350}
        />
      ))}
    </div>
  );
}
