import brands from "./brands.json";
import categories from "./categories.json";
import features from "./features.json";
import home from "./home.json";
import navigation from "./navigation.json";
import postsJson from "./posts.json";
import vehicles from "./vehicles.json";
import type {
  Brand,
  Category,
  Drive,
  Feature,
  Fuel,
  Home,
  Navigation,
  Post,
  Transmission,
  Vehicle,
} from "@/types/content";
import type { IFilters } from "@/types";

/** Looks up an item by id, so a typo in the JSON fails loudly instead of rendering a gap. */
// JSON gives route points as number[][]; every waypoint is a [lon, lat] pair
const posts = postsJson as Post[];

function byId<T extends { id: string }>(items: T[], id: string): T {
  const item = items.find((candidate) => candidate.id === id);
  if (!item) throw new Error(`No item with id "${id}" in src/data`);
  return item;
}

const allVehicles: Vehicle[] = vehicles.map(({ photos, ...vehicle }) => {
  const images = photos.map(([file, alt]) => ({
    url: `/assets/fleet/${file}.jpg`,
    alt,
  }));
  return {
    ...vehicle,
    transmission: vehicle.transmission as Transmission,
    drive: vehicle.drive as Drive,
    fuel: vehicle.fuel as Fuel,
    image: images[0],
    images,
    brand: byId<Brand>(brands, vehicle.brand),
    category: byId<Category>(categories, vehicle.category),
    features: vehicle.features.map((id) => byId<Feature>(features, id)),
  };
});

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

export function getVehicles(): Vehicle[] {
  return allVehicles;
}

export function getVehicle(id: string): Vehicle | undefined {
  return allVehicles.find((vehicle) => vehicle.id === id);
}

export function getFilters(): IFilters {
  return {
    categories: navigation.categories.map((id) => {
      const category = byId<Category>(categories, id);
      const inCategory = allVehicles.filter((v) => v.category.id === id);
      return {
        ...category,
        count: inCategory.length,
        fromPrice: Math.min(...inCategory.map((v) => v.basePricePerDay)),
      };
    }),
    brands,
    features,
  };
}
