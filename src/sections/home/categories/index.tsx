import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/content";

// A bento rather than a row of equal tiles: the first type leads, the rest fill around it
const LAYOUT = [
  "sm:col-span-2 lg:col-span-1 lg:row-span-2",
  "",
  "",
  "sm:col-span-2 lg:col-span-2",
];

export function CategoriesSection({ categories }: { categories: Category[] }) {
  return (
    <section
      id="vehicles"
      className="flex scroll-mt-[var(--nav-height)] flex-col gap-8 pt-20 pb-16 md:gap-10 md:pt-28 md:pb-24"
    >
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="text-4xl font-black tracking-[-0.03em] text-balance md:text-[3.5rem] md:leading-[1.02]">
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

      <ul className="grid auto-rows-[minmax(280px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr] lg:grid-rows-[300px_300px] lg:gap-5">
        {categories.map((category, index) => (
          <li key={category.id} className={cn("min-w-0", LAYOUT[index % 4])}>
            <CategoryCard category={category} featured={index === 0} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function CategoryCard({
  category,
  featured,
}: {
  category: Category;
  featured: boolean;
}) {
  const background = category.card_image ?? category.landscape_image;
  // The vehicle itself rides along as a thumbnail when the backdrop is a landscape
  const showVehicle =
    !category.card_image && category.image.url !== background.url;

  return (
    <Link
      href={`/book/vehicles?category=${category.id}`}
      className="group bg-basalt relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-[22px] text-white shadow-[0_18px_40px_-24px_rgb(6_20_16/0.6)] focus-visible:outline-offset-4"
    >
      <Image
        alt={background.alt}
        fill
        sizes={
          featured
            ? "(min-width: 1024px) 40vw, 100vw"
            : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        }
        src={background.url}
        className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
      />
      <div className="from-basalt via-basalt/45 absolute inset-0 bg-gradient-to-t via-45% to-transparent to-75%" />
      {/* Aurora wash that rises on hover */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_0%_100%,rgb(61_220_151/0.35),transparent_60%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

      <span className="text-basalt group-hover:bg-aurora absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-white transition-[background-color,transform] duration-300 ease-[var(--ease-out-expo)] group-hover:scale-105">
        <ArrowUpRight
          size={20}
          strokeWidth={2}
          className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-px group-hover:-translate-y-px"
        />
      </span>

      <div className="relative flex items-end gap-4 p-5 md:p-6">
        {showVehicle && (
          <span className="relative hidden size-16 shrink-0 overflow-hidden rounded-xl bg-white ring-2 ring-white/25 sm:block">
            <Image
              alt=""
              fill
              sizes="64px"
              src={category.image.url}
              className="object-cover"
            />
          </span>
        )}
        <div className="flex min-w-0 flex-col gap-1.5">
          <h3
            className={cn(
              "font-black tracking-[-0.025em]",
              featured ? "text-3xl md:text-4xl" : "text-2xl",
            )}
          >
            {category.name}
          </h3>
          <p className="max-w-[38ch] leading-snug text-pretty text-white/75">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
