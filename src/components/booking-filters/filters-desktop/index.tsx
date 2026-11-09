import { useRef } from "react";
import { CarFront } from "lucide-react";
import { SearchButton } from "@/components/booking-filters/fields/search-button";
import { useSearchVehicles } from "@/components/booking-filters/use-search-vehicles";
import { DatePopover } from "@/components/booking-filters/filters-desktop/date-popover";
import { TripLeg } from "@/components/booking-filters/filters-desktop/trip-leg";
import { useBarKeyboard } from "@/components/booking-filters/filters-desktop/use-bar-keyboard";

export function FiltersDesktop({ top = "110%" }: { top: string }) {
  const barRef = useRef<HTMLDivElement | null>(null);
  const { keepFocusInside } = useBarKeyboard(barRef);
  const { search, isPending } = useSearchVehicles();

  return (
    <div
      ref={barRef}
      onKeyDown={keepFocusInside}
      className="desktop-filters items-stretch gap-2"
    >
      <div className="flex min-w-0 flex-1 items-center">
        <TripLeg leg="pickup" top={top} />
        {/* The route between the two legs of the trip */}
        <div
          aria-hidden
          className="relative flex w-10 shrink-0 items-center justify-center xl:w-20"
        >
          <span className="absolute inset-x-2 top-1/2 h-0.5 -translate-y-1/2 bg-[radial-gradient(circle,var(--link)_1px,transparent_1.5px)] bg-[length:7px_2px] bg-repeat-x opacity-60" />
          <span className="bg-primary-light text-link relative flex size-8 items-center justify-center rounded-full ring-4 ring-white">
            <CarFront size={15} strokeWidth={2} />
          </span>
        </div>
        <TripLeg leg="dropoff" top={top} />
      </div>
      <SearchButton onSubmit={search} pending={isPending} />
      <DatePopover top={top} anchorRef={barRef} />
    </div>
  );
}
