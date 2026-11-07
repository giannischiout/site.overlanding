import brands from "./brands.json";
import categories from "./categories.json";
import features from "./features.json";
import home from "./home.json";
import navigation from "./navigation.json";
import posts from "./posts.json";
import vehicles from "./vehicles.json";
import type { Brand, Category, Home, Navigation, Post, Vehicle } from "@/types/content";
import type { IFilters } from "@/types";

/** Looks up an item by id, so a typo in the JSON fails loudly instead of rendering a gap. */
function byId<T extends { id: string }>(items: T[], id: string): T {
  const item = items.find((candidate) => candidate.id === id);
  if (!item) throw new Error(`No item with id "${id}" in src/data`);
  return item;
}

const allVehicles: Vehicle[] = vehicles.map((vehicle) => ({
  ...vehicle,
  brand: byId<Brand>(brands, vehicle.brand),
  category: byId<Category>(categories, vehicle.category),
}));

export function getHome(): Home {
  return {
    hero: home.hero,
    featuredCategories: home.featuredCategories.map((id) =>
      byId<Category>(categories, id),
    ),
    featuredPosts: home.featuredPosts.map((id) => byId<Post>(posts, id)),
  };
}

export function getNavigation(): Navigation {
  return {
    brand: navigation.brand,
    vehicles: {
      categories: navigation.categories.map((id) =>
        byId<Category>(categories, id),
      ),
      bestSellingVehicles: navigation.bestSellingVehicles.map((id) =>
        byId(allVehicles, id),
      ),
    },
    trip: {
      posts: navigation.tripPosts.map((id) => byId<Post>(posts, id)),
    },
  };
}

export function getFilters(): IFilters {
  return {
    categories: categories.map((category) => ({
      ...category,
      count: allVehicles.filter((v) => v.category.id === category.id).length,
    })),
    brands,
    features,
  };
}
