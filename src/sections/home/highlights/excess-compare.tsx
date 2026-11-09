import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/pricing";
import { PROTECTIONS } from "@/data/extras";

/** What you would pay after a gravel chip, basic cover vs zero excess */
export function ExcessCompare() {
  const basic = PROTECTIONS.find((p) => p.id === "basic");
  const premium = PROTECTIONS.find((p) => p.id === "premium");
  if (!basic || !premium) return null;
  const rows = [
    { name: `${basic.name} cover`, excess: basic.excess, width: "100%" },
    { name: `${premium.name} cover`, excess: premium.excess, width: "2%" },
  ];

  return (
    <div className="rounded-control bg-sky flex flex-col gap-3 p-4 text-sm">
      <p className="text-muted-foreground text-xs font-semibold">
        Most you pay if the windscreen cracks
      </p>
      {rows.map((row) => (
        <div key={row.name} className="flex flex-col gap-1.5">
          <div className="flex justify-between font-semibold">
            <span>{row.name}</span>
            <span className="tabular">{formatPrice(row.excess)}</span>
          </div>
          <div className="h-2 rounded-full bg-white">
            <div
              className={cn("h-full rounded-full", row.excess ? "bg-warn/70" : "bg-aurora")}
              style={{ width: row.width }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
