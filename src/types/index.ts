import type { Brand, Category, Feature } from "@/types/content";

export type ICategory = Category & { count: number; fromPrice: number };

export type IFilters = {
  categories: ICategory[];
  brands: Brand[];
  features: Feature[];
};
