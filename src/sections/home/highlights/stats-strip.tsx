import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
  { value: "4.9", label: "average from 6,400+ reviews", icon: Star },
  { value: "18,000+", label: "trips around Iceland since 2014" },
  { value: "1.6 yrs", label: "average age of the fleet" },
  { value: "24/7", label: "roadside help in English" },
];

export function StatsStrip() {
  return (
    <dl className="rounded-panel grid grid-cols-2 overflow-hidden bg-white ring-1 ring-black/[0.05] lg:grid-cols-4">
      {STATS.map(({ value, label, icon: Icon }, index) => (
        <div
          key={label}
          className={cn(
            "flex flex-col gap-1 p-6 md:p-8",
            index % 2 && "border-l",
            index > 1 && "border-t lg:border-t-0",
            index === 2 && "lg:border-l",
          )}
        >
          <dt className="sr-only">{label}</dt>
          <dd className="flex items-center gap-2 text-4xl font-bold tracking-[-0.02em] md:text-5xl">
            {value}
            {Icon && <Icon size={28} className="fill-star text-star" />}
          </dd>
          <dd className="text-muted-foreground text-[15px] leading-snug">{label}</dd>
        </div>
      ))}
    </dl>
  );
}
