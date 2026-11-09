import { usePathname } from "next/navigation";
import { usePendingPush } from "@/hooks/use-pending-push";
import { useOpenDatePicker } from "@/hooks/use-open-date-picker";
import { paths } from "@/lib/paths";

/**
 * Opens the booking flow from anywhere. Pages with a booking bar (home, results, vehicle)
 * open its calendar in place; everywhere else goes to the results first.
 * isPending is true while the results page loads.
 */
export function useBookNow() {
  const { push, isPending } = usePendingPush();
  const pathname = usePathname();
  const openDatePicker = useOpenDatePicker();

  const bookNow = () => {
    const hasBar = pathname === "/" || pathname.startsWith(paths.vehicles());
    if (hasBar) openDatePicker();
    else push(paths.vehicles());
  };

  return { bookNow, isPending };
}
