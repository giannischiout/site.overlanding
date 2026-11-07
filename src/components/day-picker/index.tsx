import { DayPicker as ReactDayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import { useFilterStore } from "@/store/use-filters-store";

type Props = {
  numberOfMonths?: number;
};
export function DayPicker({ numberOfMonths = 2 }: Props) {
  const { range, setDateField } = useFilterStore();

  const onChange = (r: DateRange | undefined) => {
    if (!r) return;
    setDateField(r);
  };
  return (
    <ReactDayPicker
      animate
      mode="range"
      weekStartsOn={1}
      disabled={{ before: new Date() }}
      startMonth={new Date()}
      selected={{
        from: range.from || undefined,
        to: range.to || undefined,
      }}
      onSelect={onChange}
      numberOfMonths={numberOfMonths}
      pagedNavigation={false}
    />
  );
}
