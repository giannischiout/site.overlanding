import type { Metadata } from "next";
import { VehiclesView } from "@/sections/vehicles";
import { getFilters, getVehicles } from "@/data";

export const metadata: Metadata = {
  title: "Choose your vehicle · Aurora Campers",
};

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { category } = await searchParams;
  const filters = getFilters();
  const valid = filters.categories.some((c) => c.id === category);

  return (
    <VehiclesView
      // Remount when arriving from a different category link
      key={valid ? category : "all"}
      vehicles={getVehicles()}
      filters={filters}
      initialCategory={valid ? category! : null}
    />
  );
}
