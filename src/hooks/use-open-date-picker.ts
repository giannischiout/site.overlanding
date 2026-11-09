import { BOOKING_DESKTOP_QUERY } from "@/lib/breakpoints";
import { useFilterStore } from "@/store/use-filters-store";

/**
 * Opens the booking calendar on a page that has a booking bar: on desktop it
 * scrolls up to the bar, on mobile it opens the full-screen sheet.
 */
export function useOpenDatePicker() {
  const onOpen = useFilterStore((state) => state.onOpen);
  const setCurrentScreen = useFilterStore((state) => state.setCurrentScreen);

  return () => {
    if (window.matchMedia(BOOKING_DESKTOP_QUERY).matches) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCurrentScreen("summary");
    }
    onOpen("dateRange");
  };
}
