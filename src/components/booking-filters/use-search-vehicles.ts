import { usePathname, useRouter } from "next/navigation";
import { useFilterStore } from "@/store/use-filters-store";

/**
 * Runs the search from the booking bar. Without dates it opens the calendar first;
 * with dates it goes to the results, keeping the category the visitor is looking at.
 */
export function useSearchVehicles() {
  const router = useRouter();
  const pathname = usePathname();

  return () => {
    const { range, onOpen, setCurrentScreen } = useFilterStore.getState();

    if (!range.from || !range.to) {
      // Mobile shows the calendar on its own screen
      if (!window.matchMedia("(min-width: 961px)").matches) {
        setCurrentScreen("summary");
      }
      onOpen("dateRange");
      return;
    }

    useFilterStore.setState({ openPopover: null, currentScreen: "callToAction" });
    if (pathname === "/book/vehicles") {
      // Already on the results: they update live from the store
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const category = new URLSearchParams(window.location.search).get("category");
    router.push(category ? `/book/vehicles?category=${category}` : "/book/vehicles");
  };
}
