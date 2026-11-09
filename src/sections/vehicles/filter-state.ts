import { formatPrice } from "@/lib/pricing";
import { capitalize } from "@/lib/text";
import type { Feature, Fuel, Transmission, Vehicle } from "@/types/content";

export type SortKey = "recommended" | "price-asc" | "price-desc" | "rating";

export type FilterState = {
  price: [number, number];
  transmission: Transmission | "any";
  fourByFour: boolean;
  fRoad: boolean;
  sleeps: number;
  seats: number;
  fuel: Fuel[];
  features: string[];
  sort: SortKey;
};

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Highest rated" },
];

export function priceBounds(vehicles: Vehicle[]): [number, number] {
  const prices = vehicles.map((v) => v.basePricePerDay);
  // Round out to tens so the slider lands on tidy numbers
  return [
    Math.floor(Math.min(...prices) / 10) * 10,
    Math.ceil(Math.max(...prices) / 10) * 10,
  ];
}

export function initialFilters(bounds: [number, number]): FilterState {
  return {
    price: bounds,
    transmission: "any",
    fourByFour: false,
    fRoad: false,
    sleeps: 0,
    seats: 0,
    fuel: [],
    features: [],
    sort: "recommended",
  };
}

export type FilterChip = { label: string; patch: Partial<FilterState> };

/** One removable chip per active filter; applying a chip's patch removes that filter */
export function activeChips(
  state: FilterState,
  bounds: [number, number],
  features: Feature[],
): FilterChip[] {
  const chips: FilterChip[] = [];
  if (state.price[0] !== bounds[0] || state.price[1] !== bounds[1])
    chips.push({
      label: `${formatPrice(state.price[0])}–${formatPrice(state.price[1])}`,
      patch: { price: bounds },
    });
  if (state.transmission !== "any")
    chips.push({
      label: state.transmission === "automatic" ? "Automatic" : "Manual",
      patch: { transmission: "any" },
    });
  if (state.fourByFour) chips.push({ label: "4x4 only", patch: { fourByFour: false } });
  if (state.fRoad) chips.push({ label: "F-road approved", patch: { fRoad: false } });
  if (state.sleeps) chips.push({ label: `Sleeps ${state.sleeps}+`, patch: { sleeps: 0 } });
  if (state.seats) chips.push({ label: `${state.seats}+ seats`, patch: { seats: 0 } });
  for (const fuel of state.fuel)
    chips.push({
      label: capitalize(fuel),
      patch: { fuel: state.fuel.filter((f) => f !== fuel) },
    });
  for (const id of state.features)
    chips.push({
      label: features.find((f) => f.id === id)?.name ?? id,
      patch: { features: state.features.filter((f) => f !== id) },
    });
  return chips;
}

export function applyFilters(
  vehicles: Vehicle[],
  category: string | null,
  state: FilterState,
) {
  const result = vehicles.filter((v) => {
    if (category && v.category.id !== category) return false;
    if (v.basePricePerDay < state.price[0] || v.basePricePerDay > state.price[1]) return false;
    if (state.transmission !== "any" && v.transmission !== state.transmission) return false;
    if (state.fourByFour && v.drive !== "4x4") return false;
    if (state.fRoad && !v.fRoadApproved) return false;
    if (v.sleeps < state.sleeps) return false;
    if (v.seats < state.seats) return false;
    if (state.fuel.length && !state.fuel.includes(v.fuel)) return false;
    const ids = v.features.map((f) => f.id);
    if (!state.features.every((id) => ids.includes(id))) return false;
    return true;
  });

  switch (state.sort) {
    case "price-asc":
      return result.sort((a, b) => a.basePricePerDay - b.basePricePerDay);
    case "price-desc":
      return result.sort((a, b) => b.basePricePerDay - a.basePricePerDay);
    case "rating":
      return result.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    default:
      // Recommended: well reviewed and popular first
      return result.sort(
        (a, b) => b.rating * Math.log(b.reviews + 1) - a.rating * Math.log(a.reviews + 1),
      );
  }
}
