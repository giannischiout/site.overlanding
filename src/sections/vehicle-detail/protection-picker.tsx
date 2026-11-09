import { Check, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/pricing";
import { PROTECTIONS } from "@/data/extras";
import { useBookingStore } from "@/store/use-booking-store";

export function ProtectionPicker() {
  const protectionId = useBookingStore((state) => state.protectionId);
  const setProtection = useBookingStore((state) => state.setProtection);

  return (
    <section aria-labelledby="protection" className="flex flex-col gap-5">
      <div>
        <h2 id="protection" className="text-2xl font-bold tracking-[-0.02em]">
          Choose your protection
        </h2>
        <p className="text-muted-foreground mt-1">
          Gravel, sand and wind are part of driving in Iceland. Excess is the most you pay if
          something happens.
        </p>
      </div>
      <div role="radiogroup" aria-label="Protection" className="grid gap-3 md:grid-cols-3">
        {PROTECTIONS.map((protection) => {
          const selected = protectionId === protection.id;
          return (
            <button
              key={protection.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setProtection(protection.id)}
              className={cn(
                "rounded-panel relative flex flex-col gap-3 bg-white p-5 text-left ring-1 transition-[box-shadow] duration-200",
                selected
                  ? "shadow-[0_14px_30px_-20px_rgb(6_20_16/0.5)] ring-2 ring-[var(--link)]"
                  : "ring-black/[0.08] hover:ring-black/20",
              )}
            >
              {protection.recommended && (
                <span className="bg-aurora text-basalt rounded-control absolute -top-2.5 right-4 px-2.5 py-0.5 text-xs font-bold">
                  Most chosen
                </span>
              )}
              <span className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-bold">
                  <ShieldCheck size={18} className="text-link" />
                  {protection.name}
                </span>
                <span
                  className={cn(
                    "flex size-5 items-center justify-center rounded-full border-2",
                    selected
                      ? "border-[var(--link)] bg-[var(--link)]"
                      : "border-[var(--border)]",
                  )}
                >
                  {selected && <span className="size-2 rounded-full bg-white" />}
                </span>
              </span>
              <span className="text-2xl font-bold">
                {protection.pricePerDay
                  ? `+${formatPrice(protection.pricePerDay)}`
                  : "Included"}
                {protection.pricePerDay > 0 && (
                  <span className="text-muted-foreground text-sm font-medium"> / day</span>
                )}
              </span>
              <span className="text-sm font-semibold">
                {protection.excess ? `${formatPrice(protection.excess)} excess` : "No excess"}
              </span>
              <ul className="text-muted-foreground flex flex-col gap-1.5 border-t pt-3 text-sm">
                {protection.covers.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check size={14} className="text-link mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </section>
  );
}
