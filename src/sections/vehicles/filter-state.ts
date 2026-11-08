import type { Fuel, Transmission, Vehicle } from "@/types/content";

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

/** How many filters differ from the defaults, for the mobile button badge */
export function countActive(state: FilterState, bounds: [number, number]) {
  return [
    state.price[0] !== bounds[0] || state.price[1] !== bounds[1],
    state.transmission !== "any",
    state.fourByFour,
    state.fRoad,
    state.sleeps > 0,
    state.seats > 0,
    state.fuel.length > 0,
    state.features.length > 0,
  ].filter(Boolean).length;
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
