import { PortalDialog } from "@/components/booking-filters/filters-mobile/components/portal-dialog";
import {
  type FieldKey,
  type FiltersState,
  type PopoverKey,
  useFilterStore,
} from "@/store/use-filters-store";
import { MobileHeader } from "@/components/booking-filters/filters-mobile/components/mobile-header";
import { pickupIcons } from "@/components/booking-filters/pickup-icons";
import { timeOptions } from "@/lib/pickup-times";
import { ListOptions } from "@/components/booking-filters/list-options";
import { DayPicker } from "@/components/day-picker";
import { Button } from "@/components/ui/button";

const LABELS: Record<PopoverKey, string> = {
  pickup: "Choose pickup location",
  dropoff: "Choose dropoff location",
  pickupTime: "Choose pickup time",
  dropoffTime: "Choose dropoff time",
  dateRange: "Choose your dates",
};

export function SummaryScreen() {
  const {
    locations,
    setField,
    setCurrentScreen,
    currentScreen,
    pickup,
    dropoff,
    pickupTime,
    dropoffTime,
    openPopover,
    onClose,
  } = useFilterStore();

  const handleChange = <K extends FieldKey>(
    key: K,
    value: FiltersState[K],
  ) => {
    setField(key, value);
    setCurrentScreen("filters");
    onClose(key);
  };

  const locationOptions = locations.map((option) => ({
    ...option,
    value: option.id,
    label: option.label,
    icon: pickupIcons[option.icon],
  }));

  const renderOptions = () => {
    switch (openPopover) {
      case "pickup":
      case "dropoff": {
        const key = openPopover;
        return (
          <ListOptions
            activeValue={(key === "pickup" ? pickup : dropoff)?.id}
            options={locationOptions}
            onSelect={(opt) => {
              const location = locations.find(({ id }) => id === opt.value);
              if (location) handleChange(key, location);
            }}
          />
        );
      }
      case "pickupTime":
      case "dropoffTime": {
        const key = openPopover;
        return (
          <ListOptions
            options={timeOptions}
            activeValue={(key === "pickupTime" ? pickupTime : dropoffTime).value}
            onSelect={(opt) => handleChange(key, opt)}
          />
        );
      }
      case "dateRange":
        return (
          <div className="flex justify-center">
            <DayPicker numberOfMonths={1} />
          </div>
        );
      default:
        return null;
    }
  };

  const onBack = () => {
    if (openPopover) onClose(openPopover);
    setCurrentScreen("filters");
  };

  return (
    <PortalDialog isOpen={currentScreen === "summary"}>
      <MobileHeader
        label={openPopover ? LABELS[openPopover] : ""}
        onClick={onBack}
      />
      <div className="flex-1 overflow-y-auto p-2">{renderOptions()}</div>
      {openPopover === "dateRange" && (
        <div className="border-t p-4">
          <Button className="h-12 w-full text-base" onClick={onBack}>
            Done
          </Button>
        </div>
      )}
    </PortalDialog>
  );
}
