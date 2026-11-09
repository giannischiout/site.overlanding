import { Stepper } from "@/components/stepper";
import { formatPrice } from "@/lib/pricing";
import { EXTRAS } from "@/data/extras";
import { useBookingStore } from "@/store/use-booking-store";
import type { Vehicle } from "@/types/content";

export function ExtrasList({ vehicle }: { vehicle: Vehicle }) {
  const extras = useBookingStore((state) => state.extras);
  const setExtra = useBookingStore((state) => state.setExtra);
  // Camping gear only makes sense in a vehicle you can sleep in
  const available = EXTRAS.filter(
    (extra) => !extra.campingOnly || vehicle.sleeps > 0,
  );

  return (
    <section aria-labelledby="extras" className="flex flex-col gap-5">
      <h2 id="extras" className="text-2xl font-bold tracking-[-0.02em]">
        Add extras
      </h2>
      <ul className="rounded-panel divide-y overflow-hidden bg-white ring-1 ring-black/[0.06]">
        {available.map((extra) => (
          <li
            key={extra.id}
            className="flex items-center justify-between gap-4 px-5 py-4"
          >
            <div className="min-w-0">
              <p className="font-semibold">{extra.name}</p>
              <p className="text-muted-foreground text-sm">
                {extra.description} · {formatPrice(extra.price)} / {extra.per}
              </p>
            </div>
            <Stepper
              label={extra.name}
              value={extras[extra.id] ?? 0}
              max={extra.id === "driver" ? 3 : 4}
              onChange={(value) => setExtra(extra.id, value)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
