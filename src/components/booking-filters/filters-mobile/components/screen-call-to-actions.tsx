import { Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/store/use-filters-store";

export function CallToActionScreen() {
  const { currentScreen, setCurrentScreen } = useFilterStore();
  return (
    <button
      type="button"
      onClick={() => setCurrentScreen("filters")}
      className={cn(
        "min-h-16 w-full items-center gap-3 rounded-lg px-3 text-left",
        currentScreen === "callToAction" ? "flex" : "hidden",
      )}
    >
      <span className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-md">
        <Calendar size={20} className="text-link" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-base font-medium">Book your vehicle</span>
        <span className="text-muted-foreground text-sm">
          Add your dates and pickup location
        </span>
      </span>
      <ChevronRight size={20} className="text-muted-foreground shrink-0" />
    </button>
  );
}
