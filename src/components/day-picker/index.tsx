import { useEffect, useRef } from "react";
import dayjs from "dayjs";
import { DayPicker as ReactDayPicker } from "react-day-picker";
import { useFilterStore } from "@/store/use-filters-store";

/** Long enough to see the finished range highlight before the calendar closes */
const CLOSE_DELAY = 450;

type Props = {
  numberOfMonths?: number;
};

/**
 * Two clicks make a trip: the first picks up, the second returns. Clicking again after
 * that starts a new trip rather than stretching the old one, and the calendar closes
 * by itself once the return date is chosen.
 */
export function DayPicker({ numberOfMonths = 2 }: Props) {
  const range = useFilterStore((state) => state.range);
  const setDateField = useFilterStore((state) => state.setDateField);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const onDayClick = (day: Date) => {
    window.clearTimeout(closeTimer.current);
    const { from, to } = range;

    // No trip yet, a finished trip, or a day before the pickup: start again from this day
    if (!from || to || dayjs(day).isBefore(from, "day")) {
      setDateField({ from: day, to: undefined });
      return;
    }

    setDateField({ from, to: day });
    closeTimer.current = window.setTimeout(() => {
      const { openPopover, onClose, currentScreen, setCurrentScreen } = useFilterStore.getState();
      if (openPopover === "dateRange") onClose("dateRange");
      // On mobile the calendar is its own screen: go back to the trip details
      if (currentScreen === "summary") setCurrentScreen("filters");
    }, CLOSE_DELAY);
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
