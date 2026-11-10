"use client";

import { FilterPanel } from "@/components/booking-filters";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { BOOKING_DESKTOP_QUERY } from "@/lib/breakpoints";
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
  // The results hold still under the open calendar, as on the home page
  useScrollLock(isDatePickerOpen, { query: BOOKING_DESKTOP_QUERY });

  return (
    <>
      <div
        aria-hidden
        className={cn(
          "fixed inset-0 z-[39] hidden bg-[var(--backdrop)] backdrop-blur-[2px] transition-opacity duration-300 min-[961px]:block",
          isDatePickerOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div className="sticky top-[var(--bar-top)] z-40 border-b bg-white/90 backdrop-blur-md transition-[top] duration-300 ease-out">
        <div className="page-container animate-in fade-in slide-in-from-bottom-6 py-2.5 duration-700 ease-[var(--ease-out-expo)] min-[961px]:py-3">
          {/* Flat on the strip: no border or shadow, so it reads as part of the toolbar */}
          <div className="rounded-panel relative mx-auto w-full bg-white p-1 min-[961px]:max-w-[1040px] min-[961px]:pl-3">
            <FilterPanel top="calc(100% + 10px)" />
          </div>
        </div>
      </div>
    </>
  );
}
