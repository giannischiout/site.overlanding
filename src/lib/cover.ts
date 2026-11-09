import { CANCELLATION } from "@/data/policies";
import type { DamageScenario } from "@/data/scenarios";
import type { Protection } from "@/types/content";

/**
 * How a cover level handles a damage scenario, and what the renter pays:
 * - "not-covered": the whole repair
 * - "excess": covered, but the renter pays the first part (the excess)
 * - "under-excess": covered, but the repair is cheaper than the excess, so the renter pays it all
 * - "full": covered with nothing to pay
 */
export function coverOutcome(scenario: DamageScenario, protection: Protection) {
  const { repairCost } = scenario;
  if (!scenario.coveredBy.includes(protection.id)) {
    return { status: "not-covered", pay: repairCost } as const;
  }
  if (protection.excess === 0) return { status: "full", pay: 0 } as const;
  if (repairCost <= protection.excess) return { status: "under-excess", pay: repairCost } as const;
  return { status: "excess", pay: protection.excess } as const;
}

/** Fee for cancelling a booking this many days before pickup */
export function cancellationFee(daysBefore: number, dailyRate: number) {
  return daysBefore >= CANCELLATION.freeUntilDays ? 0 : dailyRate;
}
