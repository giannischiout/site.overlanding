import { usePathname } from "next/navigation";
import { useFilterStore } from "@/store/use-filters-store";
import { usePendingPush } from "@/hooks/use-pending-push";
import { BOOKING_DESKTOP_QUERY } from "@/lib/breakpoints";
import { paths } from "@/lib/paths";

/**
 * Runs the search from the booking bar. Without dates it opens the calendar first;
 * with dates it goes to the results, keeping the category the visitor is looking at.
 * isPending is true while the results page loads.
 */
export function useSearchVehicles() {
  const pathname = usePathname();
  const { push, isPending } = usePendingPush();

  const search = () => {
    const { range, onOpen, setCurrentScreen } = useFilterStore.getState();

    if (!range.from || !range.to) {
      // Mobile shows the calendar on its own screen
      if (!window.matchMedia(BOOKING_DESKTOP_QUERY).matches) {
        setCurrentScreen("summary");
      }
      onOpen("dateRange");
      return;
    }

    useFilterStore.setState({
      openPopover: null,
      currentScreen: "callToAction",
    });
    if (pathname === paths.vehicles()) {
      // Already on the results: they update live from the store
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const category = new URLSearchParams(window.location.search).get(
      "category",
    );
    push(paths.vehicles(category));
  };

  return { search, isPending };
}
