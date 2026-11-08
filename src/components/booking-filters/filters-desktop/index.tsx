import { useEffect, useRef, type KeyboardEvent } from "react";
import dayjs from "dayjs";
import { CarFront } from "lucide-react";
import { SelectPickup } from "@/components/booking-filters/fields/select-pickup";
import { timeOptions } from "@/_mockup";
import { DateTrigger } from "@/components/booking-filters/fields/date-time-picker/date-trigger";
import { TimeTrigger } from "@/components/booking-filters/fields/date-time-picker/time-trigger";
import { SearchButton } from "@/components/booking-filters/fields/search-button";
import { Popover } from "@/components/popover";
import { DayPicker } from "@/components/day-picker";
import { Button } from "@/components/ui/button";
import { POPOVERS, useFilterStore } from "@/store/use-filters-store";
import { useSearchVehicles } from "@/components/booking-filters/use-search-vehicles";

const formatDate = (date: Date | null | undefined) =>
  date ? dayjs(date).format("MMM D") : null;

function getRangeSummary(from?: Date | null, to?: Date | null) {
  if (!from) return "Choose your pickup date";
  if (!to) return "Now choose your dropoff date";
  const days = dayjs(to).diff(dayjs(from), "day");
  return `${formatDate(from)} to ${formatDate(to)}, ${days} ${days === 1 ? "day" : "days"}`;
}

export function FiltersDesktop({ top = "110%" }: { top: string }) {
  const filtersRef = useRef<HTMLDivElement | null>(null);
  const pickupRef = useRef<HTMLDivElement | null>(null);
  const dropoffRef = useRef<HTMLDivElement | null>(null);
  const pickupTimeRef = useRef<HTMLDivElement | null>(null);
  const dropoffTimeRef = useRef<HTMLDivElement | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const {
    locations,
    dropoffTime,
    pickupTime,
    pickup,
    dropoff,
    range,
    openPopover,
    setField,
    setDateField,
    onClose,
    onToggle,
  } = useFilterStore();

  const isDatePickerOpen = openPopover === POPOVERS.dateRange;
  const onSearch = useSearchVehicles();

  // Esc closes whichever menu is open
  useEffect(() => {
    if (!openPopover) return undefined;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose(openPopover);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openPopover, onClose]);

  // Keyboard users land in the calendar on open and return to the trigger on close
  useEffect(() => {
    if (!isDatePickerOpen) return undefined;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => {
      filtersRef.current
        ?.querySelector<HTMLElement>("[data-date-popover] button")
        ?.focus({ preventScroll: true });
    }, 50);
    return () => {
      window.clearTimeout(timer);
      returnFocusRef.current?.focus({ preventScroll: true });
    };
  }, [isDatePickerOpen]);

  // Tab stays inside the bar and calendar while the backdrop covers the page
  const keepFocusInside = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isDatePickerOpen || event.key !== "Tab") return;
    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'button:not([disabled]):not([tabindex="-1"])',
      ),
    ).filter((element) => getComputedStyle(element).visibility !== "hidden");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      ref={filtersRef}
      onKeyDown={keepFocusInside}
      className="desktop-filters items-stretch gap-2"
    >
      <div className="grid min-w-0 flex-1 gap-1 xl:flex xl:items-center xl:gap-0">
        <div className="flex min-w-0 gap-0">
          <SelectPickup
            top={top}
            label="Pickup location"
            shortLabel="Pickup"
            accent
            isDatePickerOpen={isDatePickerOpen}
            open={openPopover === POPOVERS.pickup}
            onClose={() => onClose(POPOVERS.pickup)}
            onToggle={() => onToggle(POPOVERS.pickup)}
            anchorRef={pickupRef}
            options={locations}
            value={pickup}
            onChange={(val) => setField(POPOVERS.pickup, val)}
          />
          <span aria-hidden className="bg-border mx-1 hidden h-8 w-px shrink-0 self-center xl:block" />
          <DateTrigger
            label="Pickup date"
            shortLabel="Date"
            value={formatDate(range.from)}
            active={isDatePickerOpen}
            onClick={() => onToggle(POPOVERS.dateRange)}
          />
          <TimeTrigger
            label="Pickup time"
            shortLabel="Time"
            top={top}
            open={openPopover === POPOVERS.pickupTime}
            options={timeOptions}
            value={pickupTime}
            anchorRef={pickupTimeRef}
            onClose={() => onClose(POPOVERS.pickupTime)}
            onToggle={() => onToggle(POPOVERS.pickupTime)}
            onChange={(val) => setField(POPOVERS.pickupTime, val)}
          />
        </div>
        {/* The route between the two legs of the trip */}
        <div aria-hidden className="relative hidden w-20 shrink-0 items-center justify-center xl:flex">
          <span className="absolute inset-x-2 top-1/2 h-0.5 -translate-y-1/2 bg-[radial-gradient(circle,var(--link)_1px,transparent_1.5px)] bg-[length:7px_2px] bg-repeat-x opacity-60" />
          <span className="bg-primary-light text-link relative flex size-8 items-center justify-center rounded-full ring-4 ring-white">
            <CarFront size={15} strokeWidth={2} />
          </span>
        </div>
        <div className="flex min-w-0 gap-0">
          <SelectPickup
            top={top}
            label="Dropoff location"
            shortLabel="Return"
            accent
            alignRight
            isDatePickerOpen={isDatePickerOpen}
            anchorRef={dropoffRef}
            open={openPopover === POPOVERS.dropoff}
            onClose={() => onClose(POPOVERS.dropoff)}
            onToggle={() => onToggle(POPOVERS.dropoff)}
            options={locations}
            value={dropoff}
            onChange={(val) => setField(POPOVERS.dropoff, val)}
          />
          <span aria-hidden className="bg-border mx-1 hidden h-8 w-px shrink-0 self-center xl:block" />
          <DateTrigger
            label="Dropoff date"
            shortLabel="Date"
            value={formatDate(range.to)}
            active={isDatePickerOpen}
            onClick={() => onToggle(POPOVERS.dateRange)}
          />
          <TimeTrigger
            label="Dropoff time"
            shortLabel="Time"
            top={top}
            alignRight
            open={openPopover === POPOVERS.dropoffTime}
            options={timeOptions}
            value={dropoffTime}
            anchorRef={dropoffTimeRef}
            onClose={() => onClose(POPOVERS.dropoffTime)}
            onToggle={() => onToggle(POPOVERS.dropoffTime)}
            onChange={(val) => setField(POPOVERS.dropoffTime, val)}
          />
        </div>
      </div>
      <SearchButton onSubmit={onSearch} />

      {/* Date popover: positioned against the whole bar */}
      <Popover
        top={top}
        flip={false}
        className="w-full min-w-0 p-0"
        onClose={() => onClose(POPOVERS.dateRange)}
        open={isDatePickerOpen}
        anchorRef={filtersRef}
      >
        <div
          data-date-popover
          role="dialog"
          aria-label="Choose your dates"
          className="flex w-full flex-col"
        >
          <div className="flex justify-center p-6 pb-2">
            <DayPicker />
          </div>
          <div className="flex items-center justify-between gap-4 border-t px-6 py-4">
            <p aria-live="polite" className="text-[15px] font-medium">
              {getRangeSummary(range.from, range.to)}
            </p>
            <div className="flex items-center gap-2">
              {range.from && (
                <Button
                  variant="ghost"
                  onClick={() =>
                    setDateField({ from: undefined, to: undefined })
                  }
                >
                  Clear dates
                </Button>
              )}
              <Button onClick={() => onClose(POPOVERS.dateRange)}>Done</Button>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
}
