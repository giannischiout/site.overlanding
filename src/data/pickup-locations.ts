import json from "./pickup-locations.json";
import type { PickupLocation } from "@/types/content";

// Kept apart from data/index.ts so client components can import it without pulling in the whole fleet
export const pickupLocations = json as PickupLocation[];

export const findPickupLocation = (id: string) =>
  pickupLocations.find((location) => location.id === id);
