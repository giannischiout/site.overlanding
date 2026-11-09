import brands from "./brands.json";
import categories from "./categories.json";
import features from "./features.json";
import footer from "./footer.json";
import home from "./home.json";
import navigation from "./navigation.json";
import postsJson from "./posts.json";
import vehicles from "./vehicles.json";
import type {
  Brand,
  Category,
  CategoryWithStats,
  Drive,
  Feature,
  FooterContent,
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

/** A category plus how many vehicles it has and its cheapest daily price */
function withStats(category: Category): CategoryWithStats {
  const inCategory = allVehicles.filter((v) => v.category.id === category.id);
  return {
    ...category,
    count: inCategory.length,
    fromPrice: Math.min(...inCategory.map((v) => v.basePricePerDay)),
  };
}

export function getNavigation(): Navigation {
  const { vehicles: vehiclesMenu, roadTrips } = navigation.menus;
  return {
    brand: navigation.brand,
    contact: navigation.contact,
    menus: {
      vehicles: {
        label: vehiclesMenu.label,
        categories: vehiclesMenu.categories.map((id) =>
          withStats(byId<Category>(categories, id)),
        ),
        featuredVehicles: vehiclesMenu.featuredVehicles.map((id) =>
          byId(allVehicles, id),
        ),
      },
      roadTrips: {
        label: roadTrips.label,
        posts: roadTrips.posts.map((id) => byId<Post>(posts, id)),
      },
    },
  };
}

export function getPosts(): Post[] {
  return posts;
}

export function getPost(id: string): Post | undefined {
  return posts.find((post) => post.id === id);
}

/** A category with its vehicle count and lowest price, or undefined for an unknown id */
export function getCategory(id: string): CategoryWithStats | undefined {
  const category = categories.find((candidate) => candidate.id === id);
  return category && withStats(category);
}

export function getVehicles(): Vehicle[] {
  return allVehicles;
}

export function getVehicle(id: string): Vehicle | undefined {
  return allVehicles.find((vehicle) => vehicle.id === id);
}

export function getFilters(): IFilters {
  return {
    // Every category that has vehicles, in the order of categories.json
    categories: categories
      .filter((category) => allVehicles.some((v) => v.category.id === category.id))
      .map(withStats),
    brands,
    features,
  };
}

export function getFooter(): FooterContent {
  // JSON widens the resource ids to string; the union in FooterContent picks their icons
  return footer as FooterContent;
}
