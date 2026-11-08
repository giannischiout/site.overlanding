import { usePathname, useRouter } from "next/navigation";
import { useFilterStore } from "@/store/use-filters-store";

/**
 * Opens the booking flow from anywhere. Pages with a booking bar (home, results, vehicle)
 * open its calendar in place; everywhere else goes to the results first.
 */
export function useBookNow() {
  const router = useRouter();
  const pathname = usePathname();
  const onOpen = useFilterStore((state) => state.onOpen);
  const setCurrentScreen = useFilterStore((state) => state.setCurrentScreen);

  return () => {
    const hasBar = pathname === "/" || pathname.startsWith("/book/vehicles");
    if (!hasBar) {
      router.push("/book/vehicles");
      return;
    }
    if (window.matchMedia("(min-width: 961px)").matches) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      onOpen("dateRange");
    } else {
      setCurrentScreen("summary");
      onOpen("dateRange");
    }
  };
}
