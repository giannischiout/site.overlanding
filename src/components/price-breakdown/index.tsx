import type { ReactNode } from "react";
import { formatPrice, type PriceLine } from "@/lib/pricing";

type Props = {
  lines: PriceLine[];
  total: number;
  /** Shown under the total, e.g. what's due today */
  footnote?: ReactNode;
};

/** Itemised price lines and the total, as shown on the vehicle and checkout pages */
export function PriceBreakdown({ lines, total, footnote }: Props) {
  return (
    <dl className="flex flex-col gap-2 border-t pt-4 text-[15px]">
      {lines.map((line) => (
        <div key={line.label} className="flex justify-between gap-4">
          <dt className="text-muted-foreground">{line.label}</dt>
          <dd className="tabular font-medium">{formatPrice(line.amount)}</dd>
        </div>
      ))}
      <div className="mt-2 flex items-baseline justify-between border-t pt-3">
        <dt className="font-bold">Total</dt>
        <dd className="tabular text-2xl font-bold">{formatPrice(total)}</dd>
      </div>
      {footnote && <p className="text-muted-foreground text-sm">{footnote}</p>}
    </dl>
  );
}
