import { PortalDialog } from "@/components/booking-filters/filters-mobile/components/portal-dialog";
import { MobileHeader } from "@/components/booking-filters/filters-mobile/components/mobile-header";
import { MobileFieldWrapper } from "@/components/booking-filters/filters-mobile/components/field-wrapper";
import { Button } from "@/components/ui/button";
import type { PopoverKey } from "@/store/use-filters-store";
import { useFilterStore } from "@/store/use-filters-store";
import dayjs from "dayjs";
import { Spinner } from "@/components/spinner";
import { useSearchVehicles } from "@/components/booking-filters/use-search-vehicles";

const formatDate = (date?: Date | null) =>
  date ? dayjs(date).format("MMM D") : "Add date";

export function FiltersScreen() {
  const {
    setCurrentScreen,
    currentScreen,
    pickup,
    dropoff,
    dropoffTime,
    pickupTime,
    range,
    onOpen,
  } = useFilterStore();
  const { search, isPending } = useSearchVehicles();

  const handleChange = (key: PopoverKey) => {
    setCurrentScreen("summary");
    onOpen(key);
  };

  return (
    <PortalDialog isOpen={currentScreen === "filters"}>
      <MobileHeader
        label="Your trip details"
        onClick={() => setCurrentScreen("callToAction")}
      />
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <MobileFieldWrapper
          onClick={() => handleChange("dateRange")}
          label="Dates"
          value={`${formatDate(range.from)} to ${formatDate(range.to)}`}
        />
        <MobileFieldWrapper
          onClick={() => handleChange("pickup")}
          label="Pickup location"
          value={pickup?.label ?? "Select location"}
        />
        <MobileFieldWrapper
          onClick={() => handleChange("pickupTime")}
          label="Pickup time"
          value={pickupTime.label}
        />
        <MobileFieldWrapper
          onClick={() => handleChange("dropoff")}
          label="Dropoff location"
          value={dropoff?.label ?? "Select location"}
        />
        <MobileFieldWrapper
          onClick={() => handleChange("dropoffTime")}
          label="Dropoff time"
          value={dropoffTime.label}
        />
      </div>

      <div className="border-t p-4">
        <Button
          onClick={search}
          disabled={isPending}
          aria-busy={isPending}
          className="h-12 w-full gap-2 text-base"
        >
          {isPending && <Spinner />}
          {isPending ? "Searching…" : "Search vehicles"}
        </Button>
      </div>
    </PortalDialog>
  );
}
