import dayjs from "dayjs";
import { DayPicker as ReactDayPicker } from "react-day-picker";
import { useFilterStore } from "@/store/use-filters-store";

type Props = {
  numberOfMonths?: number;
};

/**
 * Two clicks make a trip: the first picks up, the second returns. Clicking again after
 * that starts a new trip rather than stretching the old one. The calendar stays open
 * until the visitor closes it (Done, Esc, clicking outside, or Back on mobile).
 */
export function DayPicker({ numberOfMonths = 2 }: Props) {
  const range = useFilterStore((state) => state.range);
  const setDateField = useFilterStore((state) => state.setDateField);

  const onDayClick = (day: Date) => {
    const { from, to } = range;

    // No trip yet, a finished trip, or a day before the pickup: start again from this day
    if (!from || to || dayjs(day).isBefore(from, "day")) {
      setDateField({ from: day, to: undefined });
      return;
    }

    setDateField({ from, to: day });
  };

  return (
    <ReactDayPicker
      animate
      mode="range"
      weekStartsOn={1}
      disabled={{ before: new Date() }}
      startMonth={new Date()}
      defaultMonth={range.from ?? undefined}
      selected={{
        from: range.from || undefined,
        to: range.to || undefined,
      }}
      // Selection is driven by onDayClick so the rules above win over the default range logic
      onSelect={() => {}}
      onDayClick={(day, modifiers) => {
        if (!modifiers.disabled) onDayClick(day);
      }}
      numberOfMonths={numberOfMonths}
      pagedNavigation={false}
    />
  );
}
