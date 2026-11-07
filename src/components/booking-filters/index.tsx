import { FiltersDesktop } from "@/components/booking-filters/filters-desktop";
import { FiltersMobile } from "@/components/booking-filters/filters-mobile";

export function FilterPanel({ top = "110%" }: { top: string }) {
  return (
    <>
      <FiltersMobile />
      <FiltersDesktop top={top} />
    </>
  );
}
