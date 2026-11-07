import Image from "next/image";
import type { Category } from "@/types/content";

export function CategoriesSection({ categories }: { categories: Category[] }) {
  return (
    <section
      id="vehicles"
      className="flex scroll-mt-[var(--nav-height)] flex-col gap-8 py-16 md:py-20"
    >
      <header className="flex max-w-2xl flex-col gap-3">
        <h2 className="text-4xl font-black tracking-[-0.02em] md:text-5xl">
          Choose your vehicle
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Iceland&apos;s roads run from smooth highways to gravel mountain
          tracks. Pick the vehicle that suits where you&apos;re going and how
          you want to sleep.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <li key={category.id} className="flex flex-col gap-3">
            <div className="bg-sky relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                alt={category.image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                src={category.image.url}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold">{category.name}</h3>
              <p className="text-muted-foreground leading-snug">
                {category.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
