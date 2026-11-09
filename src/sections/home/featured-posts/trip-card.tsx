import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Route, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { paths } from "@/lib/paths";
import { pluralize } from "@/lib/text";
import type { ICategory } from "@/types";
import type { Post } from "@/types/content";

type Props = {
  post: Post;
  selected: boolean;
  category?: ICategory;
};

export function TripCard({ post, selected, category }: Props) {
  return (
    <Link
      href={paths.roadTrip(post.id)}
      className={cn(
        "group rounded-panel shadow-card hover:shadow-card-hover flex h-full flex-col overflow-hidden bg-white ring-1 transition-[box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1",
        selected ? "ring-link/30" : "ring-black/[0.04]",
      )}
    >
      <div className="bg-sky relative aspect-[3/2] overflow-hidden">
        <Image
          alt={post.featuredImage.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          src={post.featuredImage.url}
          className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        <span className="text-foreground rounded-control absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 px-3 py-1 text-xs font-semibold shadow-sm">
          <CalendarDays size={13} className="text-link" />
          {pluralize(post.days, "day")}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <h3 className="text-xl font-bold tracking-[-0.01em]">{post.title}</h3>
        <p className="text-muted-foreground leading-snug text-pretty">{post.short_description}</p>
        <ul className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <li className="flex items-center gap-1.5">
            <Route size={14} /> {post.distance.toLocaleString("en")} km
          </li>
          <li className="flex items-center gap-1.5">
            <Sun size={14} /> {post.season}
          </li>
        </ul>
        {category && (
          <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4">
            <span className="text-sm">
              <span className="text-muted-foreground">Best in </span>
              <strong>{category.name.toLowerCase()}</strong>
            </span>
            <span className="text-link flex shrink-0 items-center gap-1 text-sm font-semibold whitespace-nowrap">
              See the route
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
