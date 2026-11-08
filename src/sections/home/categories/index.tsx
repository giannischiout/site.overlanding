import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/pricing";
import type { ICategory } from "@/types";

export function CategoriesSection({ categories }: { categories: ICategory[] }) {
  return (
    <section
      id="vehicles"
      className="flex scroll-mt-[var(--nav-height)] flex-col gap-8 pt-20 pb-16 md:gap-10 md:pt-28 md:pb-24"
    >
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="text-4xl font-bold tracking-[-0.02em] text-balance md:text-[3.5rem] md:leading-[1.02]">
            Choose your vehicle
          </h2>
          <p className="text-muted-foreground max-w-[58ch] text-lg leading-relaxed">
            Iceland&apos;s roads run from smooth highways to gravel mountain
            tracks. Pick the vehicle that suits where you&apos;re going and how
            you want to sleep.
          </p>
        </div>
        <Link
          href="/book/vehicles"
          className="group text-link flex shrink-0 items-center gap-1.5 text-[15px] font-semibold underline-offset-4 hover:underline"
        >
          See every vehicle
          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </header>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryCard category={category} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Same card language as the vehicle results: white, rounded, photo on top */
function CategoryCard({ category }: { category: ICategory }) {
  return (
    <Link
      href={`/book/vehicles?category=${category.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-panel bg-white shadow-card ring-1 ring-black/[0.04] transition-[box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-offset-4"
    >
      <div className="bg-sky relative aspect-[16/10] overflow-hidden">
        <Image
          alt={category.image.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          src={category.image.url}
          className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        <span className="text-foreground absolute top-3 left-3 rounded-control bg-white/95 px-3 py-1 text-xs font-semibold shadow-sm">
          {category.count} {category.count === 1 ? "vehicle" : "vehicles"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5 md:p-6">
        <h3 className="text-2xl font-bold tracking-[-0.02em]">{category.name}</h3>
        <p className="text-muted-foreground leading-snug text-pretty">
          {category.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <p className="text-[15px]">
            <span className="text-muted-foreground">From </span>
            <strong className="tabular text-lg">{formatPrice(category.fromPrice)}</strong>
            <span className="text-muted-foreground"> / day</span>
          </p>
          <span className="bg-sky text-foreground group-hover:bg-aurora flex size-10 items-center justify-center rounded-full transition-colors duration-300">
            <ArrowRight
              size={18}
              strokeWidth={2.25}
              className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
