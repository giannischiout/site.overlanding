import type { Category } from "@/types/content";

type ICategory = Category & { count: number };

export function CategoryFilter({ categories }: { categories: ICategory[] }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-lg font-bold text-gray-500">Categories</span>
      <ul className="flex flex-col gap-2">
        {categories?.map((category) => (
          <li
            key={category.id}
            className="flex cursor-pointer items-center gap-2"
          >
            <span>{category.name}</span>
            <span className="rounded-lg bg-white px-2 py-0.5 text-xs">
              {category.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
