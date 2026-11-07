import type { Brand, Category, Feature } from "@/types/content";

type ICategory = Category & { count: number };

export type IFilters = {
  categories: ICategory[];
  brands: Brand[];
  features: Feature[];
};
