import { getVehicle } from "@/data";
import { formatPrice, quote } from "@/lib/pricing";

const INCLUDED = ["Unlimited kilometres", "Airport pickup", "VAT"];

/**
 * A real quote for a week in our best-selling camper with zero-excess cover.
 * Computed with the checkout's pricing code, so it can never drift from the real numbers.
 */
export function SampleQuote() {
  const vehicle = getVehicle("vw-california-ocean");
  if (!vehicle) return null;
  const { lines, total } = quote({
    vehicle,
    days: 7,
    protectionId: "premium",
    extras: {},
    oneWay: false,
  });

  return (
    <div className="rounded-control bg-sky tabular p-4 text-sm">
      <p className="text-muted-foreground mb-3 text-xs font-semibold">
        Sample quote · a week with zero excess
      </p>
      <ul className="flex flex-col gap-1.5">
        {lines.map((line) => (
          <li key={line.label} className="flex justify-between gap-3">
            <span>{line.label}</span>
            <span>{formatPrice(line.amount)}</span>
          </li>
        ))}
        {INCLUDED.map((label) => (
          <li key={label} className="text-muted-foreground flex justify-between gap-3">
            <span>{label}</span>
            <span>Included</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex justify-between border-t border-dashed border-black/15 pt-3 font-bold">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </p>
      <p className="text-muted-foreground mt-1 text-xs">Extra to pay at the desk: €0</p>
    </div>
  );
}
