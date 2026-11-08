"use client";

import { FilterPanel } from "@/components/booking-filters";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/store/use-filters-store";

/**
 * The booking bar docked under the nav on every booking page. It rises into place on
 * arrival and stays there, so dates and locations can change without leaving the results.
 */
export function BookingBar() {
  const isDatePickerOpen = useFilterStore(
    (state) => state.openPopover === "dateRange",
  );

  return (
    <>
      <div
        aria-hidden
        className={cn(
          "fixed inset-0 z-[39] hidden bg-[var(--backdrop)] backdrop-blur-[2px] transition-opacity duration-300 min-[961px]:block",
          isDatePickerOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div className="sticky top-[var(--nav-height)] z-40 border-b bg-white/90 backdrop-blur-md">
        <div className="page-container animate-in fade-in slide-in-from-bottom-6 py-2.5 duration-700 ease-[var(--ease-out-expo)] min-[961px]:py-3">
          <div
            className={cn(
              "relative mx-auto w-full rounded-2xl bg-white p-1 ring-1 ring-black/[0.08] transition-shadow duration-300 min-[961px]:max-w-[1040px] min-[961px]:pl-3",
              isDatePickerOpen
                ? "shadow-[0_0_0_3px_var(--aurora),0_18px_40px_-18px_rgb(6_20_16/0.35)]"
                : "shadow-[0_10px_30px_-18px_rgb(6_20_16/0.35)]",
            )}
          >
            <FilterPanel top="calc(100% + 10px)" />
          </div>
        </div>
      </div>
    </>
  );
}
