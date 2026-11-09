import type { RefObject } from "react";
import { DayPicker } from "@/components/day-picker";
import { Popover } from "@/components/popover";
import { Button } from "@/components/ui/button";
import { rangeSummary } from "@/lib/dates";
import { useFilterStore } from "@/store/use-filters-store";

type Props = {
  top: string;
  /** The whole booking bar, so the calendar spans its width */
  anchorRef: RefObject<HTMLDivElement | null>;
};

export function DatePopover({ top, anchorRef }: Props) {
  const range = useFilterStore((state) => state.range);
  const open = useFilterStore((state) => state.openPopover === "dateRange");
  const onClose = useFilterStore((state) => state.onClose);
  const setDateField = useFilterStore((state) => state.setDateField);

  return (
    <Popover
      top={top}
      flip={false}
      className="w-full min-w-0 p-0"
      onClose={() => onClose("dateRange")}
      open={open}
      anchorRef={anchorRef}
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
            {rangeSummary(range.from, range.to)}
          </p>
          <div className="flex items-center gap-2">
            {range.from && (
              <Button
                variant="ghost"
                onClick={() => setDateField({ from: undefined, to: undefined })}
              >
                Clear dates
              </Button>
            )}
            <Button onClick={() => onClose("dateRange")}>Done</Button>
          </div>
        </div>
      </div>
    </Popover>
  );
}
