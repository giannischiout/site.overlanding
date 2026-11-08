import dayjs from "dayjs";
import { Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/store/use-filters-store";

export function CallToActionScreen() {
  const { currentScreen, setCurrentScreen, range, pickup } = useFilterStore();
  const hasDates = range.from && range.to;

  return (
    <button
      type="button"
      onClick={() => setCurrentScreen("filters")}
      className={cn(
        "min-h-16 w-full items-center gap-3 rounded-lg px-3 text-left",
        currentScreen === "callToAction" ? "flex" : "hidden",
      )}
    >
      <span className="bg-aurora text-primary-foreground flex size-11 shrink-0 items-center justify-center rounded-xl">
        <Calendar size={20} strokeWidth={2} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-base font-bold">
          {hasDates
            ? `${dayjs(range.from).format("MMM D")} – ${dayjs(range.to).format("MMM D")}`
            : "Book your vehicle"}
        </span>
        <span className="text-muted-foreground truncate text-sm">
          {hasDates
            ? (pickup?.label ?? "Choose a pickup location")
            : "Add your dates and pickup location"}
        </span>
      </span>
      <ChevronRight size={20} className="text-muted-foreground shrink-0" />
    </button>
  );
}
