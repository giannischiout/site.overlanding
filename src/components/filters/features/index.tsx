import type { Feature } from "@/types/content";

export function FeaturesFilter({ features }: { features: Feature[] }) {
  return (
    <div className="flex flex-col gap-3 overflow-hidden">
      <span className="text-lg font-bold text-gray-500">Features</span>
      <ul className="flex flex-wrap gap-2">
        {features?.map((feature) => (
          <li
            key={feature.id}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-200 p-1 text-sm text-nowrap"
          >
            <span>{feature.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
