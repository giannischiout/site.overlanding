import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { paths } from "@/lib/paths";
import { pluralize } from "@/lib/text";
import type { CategoryWithStats, Post } from "@/types/content";

type Props = {
  post: Post;
  category?: CategoryWithStats;
};

export function TripHeader({ post, category }: Props) {
  const facts = [
    { label: "Length", value: pluralize(post.days, "day") },
    { label: "Distance", value: `${post.distance.toLocaleString("en")} km` },
    { label: "Season", value: post.season },
    { label: "Drive it in", value: category?.name ?? post.category },
  ];

  return (
    <header className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-12">
      <div className="flex flex-col gap-6">
        <Link
          href={paths.roadTrips}
          className="text-muted-foreground hover:text-foreground flex w-fit items-center gap-1.5 text-sm font-semibold transition-colors"
        >
          <ArrowLeft size={15} aria-hidden /> All road trips
        </Link>
        <h1 className="text-5xl leading-[1.02] font-bold tracking-[-0.03em] text-balance md:text-6xl">
          {post.title}
        </h1>
        <p className="text-muted-foreground max-w-[48ch] text-lg leading-relaxed text-pretty">
          {post.short_description}
        </p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-y border-black/10 py-5">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-0.5">
              <dt className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
                {fact.label}
              </dt>
              <dd className="font-semibold">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <Link
          href={paths.vehicles(post.category)}
          className="btn-primary w-fit px-6 py-3.5"
        >
          See {category ? category.name : "vehicles"} for this trip
        </Link>
      </div>

      <div className="rounded-panel bg-sky relative aspect-[4/3] overflow-hidden">
        <Image
          src={post.featuredImage.url}
          alt={post.featuredImage.alt}
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
      </div>
    </header>
  );
}
