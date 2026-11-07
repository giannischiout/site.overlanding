import { VehiclesView } from "@/sections/vehicles";
import { getFilters } from "@/data";

export default function Page() {
  return <VehiclesView filters={getFilters()} />;
}
