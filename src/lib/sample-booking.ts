import { getVehicle } from "@/data";
import { quote } from "@/lib/pricing";

const SAMPLE = { vehicleId: "vw-california-ocean", days: 7, protectionId: "premium" } as const;

/**
 * The home page's example booking: a week in our best-selling camper with zero-excess cover.
 * Priced with the checkout's own code, so the numbers can never drift from the real ones.
 */
export function sampleBooking() {
  const vehicle = getVehicle(SAMPLE.vehicleId);
  if (!vehicle) return null;
  const { lines, total } = quote({
    vehicle,
    days: SAMPLE.days,
    protectionId: SAMPLE.protectionId,
    extras: {},
    oneWay: false,
  });
  return { vehicle, days: SAMPLE.days, lines, total };
}
