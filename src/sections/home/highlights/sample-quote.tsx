import { formatPrice } from "@/lib/pricing";
import { sampleBooking } from "@/lib/sample-booking";
import { Payoff } from "@/components/payoff";

const INCLUDED = ["Unlimited kilometres", "Airport pickup", "VAT"];

/** The sample booking as a receipt: every line, then the total and what's left to pay at the desk */
export function SampleQuote() {
  const booking = sampleBooking();
  if (!booking) return null;

  return (
    <div className="tabular flex flex-col gap-5 text-[15px] md:text-base">
      <ul className="flex flex-col gap-2.5">
        {booking.lines.map((line) => (
          <li key={line.label} className="flex justify-between gap-3">
            <span>{line.label}</span>
            <span className="font-semibold">{formatPrice(line.amount)}</span>
          </li>
        ))}
        {INCLUDED.map((label) => (
          <li key={label} className="text-muted-foreground flex justify-between gap-3">
            <span>{label}</span>
            <span>Included</span>
          </li>
        ))}
      </ul>
      <div className="flex items-baseline justify-between gap-4 border-t border-dashed border-black/20 pt-5">
        <span className="font-semibold">Total for the week</span>
        <span className="text-3xl font-bold tracking-[-0.02em]">{formatPrice(booking.total)}</span>
      </div>
      <Payoff label="At the desk" detail="When you collect the keys" message="Nothing extra to pay" delay={200} />
    </div>
  );
}
