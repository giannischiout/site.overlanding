import type { Brand, CategoryWithStats, Feature } from "@/types/content";

export type ICategory = CategoryWithStats;

export type IFilters = {
  categories: ICategory[];
  brands: Brand[];
  features: Feature[];
};
