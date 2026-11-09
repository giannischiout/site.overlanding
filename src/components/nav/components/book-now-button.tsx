import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/store/use-filters-store";

/** Shows the trip once dates are picked, so the button doubles as a reminder of the search */
type Props = {
  onClick: () => void;
  className?: string;
};

export function BookNowButton({ onClick, className }: Props) {
  const range = useFilterStore((state) => state.range);
  const sameMonth =
    range.from && range.to && dayjs(range.from).month() === dayjs(range.to).month();
  const dates =
    range.from && range.to
      ? `${dayjs(range.from).format("MMM D")} – ${dayjs(range.to).format(sameMonth ? "D" : "MMM D")}`
      : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "bg-aurora text-basalt hover:bg-primary-dark rounded-control flex h-11 items-center justify-center gap-2.5 px-5 text-[15px] font-bold shadow-[inset_0_1px_0_rgb(255_255_255/0.45)] transition-[background-color,transform] duration-200 ease-out active:scale-[0.97]",
        className,
      )}
    >
      <CalendarDays size={17} strokeWidth={2.25} />
      {dates ? (
        <span className="flex items-center gap-2.5">
          <span className="tabular">{dates}</span>
          <span aria-hidden className="bg-basalt/25 h-4 w-px" />
          Book
        </span>
      ) : (
        "Book now"
      )}
    </button>
  );
}
