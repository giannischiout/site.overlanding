import { usePathname, useRouter } from "next/navigation";
import { useFilterStore } from "@/store/use-filters-store";

/** Opens the booking flow from anywhere: the calendar on desktop, the dialog on mobile. */
export function useBookNow() {
  const router = useRouter();
  const pathname = usePathname();
  const onOpen = useFilterStore((state) => state.onOpen);
  const setCurrentScreen = useFilterStore((state) => state.setCurrentScreen);

  return () => {
    if (pathname !== "/") router.push("/");
    if (window.matchMedia("(min-width: 961px)").matches) {
      onOpen("dateRange");
    } else {
      setCurrentScreen("filters");
    }
  };
}
