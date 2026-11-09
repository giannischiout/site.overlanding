import { FilterPanel } from "@/components/booking-filters";
import { cn } from "@/lib/utils";
import { useLift } from "@/sections/home/hero/use-lift";

/**
 * The booking bar. The slot holds the bar's place in the page while the bar
 * lifts to centre itself and the calendar on screen.
 */
export function BookingSlot({ datePickerOpen }: { datePickerOpen: boolean }) {
  const { slotRef, lift } = useLift(datePickerOpen);

  return (
    <div
      ref={slotRef}
      className="relative mt-6 w-full px-3 md:mt-10 md:px-5 min-[961px]:w-fit min-[961px]:max-w-[calc(100%-48px)] min-[961px]:px-0"
    >
      <div
        style={{ transform: lift ? `translateY(${-lift}px)` : undefined }}
        className={cn(
          "text-foreground rounded-panel shadow-float relative bg-white p-1.5 ring-1 ring-black/5 min-[961px]:pl-2",
          "transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)]",
          datePickerOpen ? "z-[60]" : "z-10",
        )}
      >
        <FilterPanel top="calc(100% + 12px)" />
      </div>
    </div>
  );
}
