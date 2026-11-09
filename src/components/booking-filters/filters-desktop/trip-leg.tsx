import { useRef } from "react";
import { SelectPickup } from "@/components/booking-filters/fields/select-pickup";
import { DateTrigger } from "@/components/booking-filters/fields/date-time-picker/date-trigger";
import { TimeTrigger } from "@/components/booking-filters/fields/date-time-picker/time-trigger";
import { shortDate } from "@/lib/dates";
import { timeOptions } from "@/lib/pickup-times";
import { useFilterStore } from "@/store/use-filters-store";

const LEGS = {
  pickup: {
    location: "pickup",
    time: "pickupTime",
    date: "from",
    labels: {
      location: "Pickup location",
      short: "Pickup",
      date: "Pickup date",
      time: "Pickup time",
    },
  },
  dropoff: {
    location: "dropoff",
    time: "dropoffTime",
    date: "to",
    labels: {
      location: "Dropoff location",
      short: "Return",
      date: "Dropoff date",
      time: "Dropoff time",
    },
  },
} as const;

type Props = {
  leg: keyof typeof LEGS;
  top: string;
};

/** One half of the booking bar: where, which day and what time */
export function TripLeg({ leg, top }: Props) {
  const { location, time, date, labels } = LEGS[leg];
  const locationRef = useRef<HTMLDivElement | null>(null);
  const timeRef = useRef<HTMLDivElement | null>(null);
  const alignRight = leg === "dropoff";

  const locations = useFilterStore((state) => state.locations);
  const locationValue = useFilterStore((state) => state[location]);
  const timeValue = useFilterStore((state) => state[time]);
  const dateValue = useFilterStore((state) => state.range[date]);
  const openPopover = useFilterStore((state) => state.openPopover);
  const setField = useFilterStore((state) => state.setField);
  const onClose = useFilterStore((state) => state.onClose);
  const onToggle = useFilterStore((state) => state.onToggle);
  const isDatePickerOpen = openPopover === "dateRange";

  return (
    <div className="flex min-w-0 flex-1 gap-0">
      <SelectPickup
        top={top}
        label={labels.location}
        shortLabel={labels.short}
        accent
        alignRight={alignRight}
        isDatePickerOpen={isDatePickerOpen}
        open={openPopover === location}
        onClose={() => onClose(location)}
        onToggle={() => onToggle(location)}
        anchorRef={locationRef}
        options={locations}
        value={locationValue}
        onChange={(value) => setField(location, value)}
      />
      <span
        aria-hidden
        className="bg-border mx-1 h-8 w-px shrink-0 self-center"
      />
      <DateTrigger
        label={labels.date}
        shortLabel="Date"
        value={shortDate(dateValue)}
        active={isDatePickerOpen}
        onClick={() => onToggle("dateRange")}
      />
      <TimeTrigger
        label={labels.time}
        shortLabel="Time"
        top={top}
        alignRight={alignRight}
        open={openPopover === time}
        options={timeOptions}
        value={timeValue}
        anchorRef={timeRef}
        onClose={() => onClose(time)}
        onToggle={() => onToggle(time)}
        onChange={(value) => setField(time, value)}
      />
    </div>
  );
}
