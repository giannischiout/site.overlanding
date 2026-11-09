import { create } from "zustand";
import { timeOptions, type TimeOption } from "@/lib/pickup-times";
import type { DateRange } from "react-day-picker";
import type { PickupLocation } from "@/types/content";
import { pickupLocations as locations } from "@/data/pickup-locations";

/** The booking bar's menus; at most one is open at a time */
export type PopoverKey = "pickup" | "dropoff" | "pickupTime" | "dropoffTime" | "dateRange";

export type FiltersState = {
  locations: PickupLocation[];
  pickup: PickupLocation | null;
  dropoff: PickupLocation | null;
  pickupTime: TimeOption;
  dropoffTime: TimeOption;
  range: {
    from: DateRange["from"] | null;
    to: DateRange["to"] | null;
  };
  openPopover: PopoverKey | null;
  dayPickerMounted: boolean;
  // mobile only:
  currentScreen: "callToAction" | "filters" | "summary";
  // isMobileOpen: boolean;
};

/** The popovers that edit a single store field of the same name (dates go through setDateField) */
export type FieldKey = Exclude<PopoverKey, "dateRange">;

type FiltersActions = {
  setField: <K extends FieldKey>(key: K, value: FiltersState[K]) => void;
  onToggle: (popover: PopoverKey | null) => void;
  onOpen: (popover: PopoverKey) => void;
  onClose: (key: PopoverKey) => void;
  setDateField: (range: DateRange) => void;
  // mobile only:
  setCurrentScreen: (screen: FiltersState["currentScreen"]) => void;
};

type FiltersStore = FiltersState & FiltersActions;

const defaultTime =
  timeOptions.find((option) => option.value === "10:00") ?? timeOptions[0];

export const createFiltersStore = () =>
  create<FiltersStore>((set) => ({
    locations,
    // isMobileOpen: false,
    dayPickerMounted: false,
    pickup: locations[0],
    dropoff: locations[0],
    pickupTime: defaultTime,
    dropoffTime: defaultTime,
    range: { from: null, to: null },
    openPopover: null,
    setField: (key, value) =>
      set((state) => ({
        ...state,
        [key]: value,
      })),
    setDateField: (newRange) => {
      const normalized = {
        from: newRange.from ?? null,
        to: newRange.to,
      };

      set((state) => ({
        ...state,
        range: normalized,
      }));
    },
    onClose: (key) =>
      set((state) => ({
        ...state,
        openPopover: key
          ? state.openPopover === key
            ? null
            : state.openPopover
          : null,
      })),
    onOpen: (key) =>
      set((state) => ({
        ...state,
        openPopover: key,
      })),
    onToggle: (popover) =>
      set((state) => ({
        ...state,
        openPopover: state.openPopover === popover ? null : popover,
      })),

    // MOBILE:
    currentScreen: "callToAction",
    setCurrentScreen: (screen) => {
      set({
        currentScreen: screen,
      });
    },
  }));

export const useFilterStore = createFiltersStore();
