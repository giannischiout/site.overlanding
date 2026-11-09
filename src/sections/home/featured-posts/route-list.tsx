import Link from "next/link";
import { cn } from "@/lib/utils";
import { paths } from "@/lib/paths";
import { pluralize } from "@/lib/text";
import type { Post } from "@/types/content";

type Props = {
  posts: Post[];
  selected?: string;
  onSelect: (id: string) => void;
};

/** The routes as a list beside the map (desktop only); hovering a row highlights its route */
export function RouteList({ posts, selected, onSelect }: Props) {
  return (
    <ul className="mt-2 hidden flex-col gap-0.5 lg:flex">
      {posts.map((post) => {
        const isSelected = selected === post.id;
        return (
          <li key={post.id}>
            <Link
              href={paths.roadTrip(post.id)}
              onMouseEnter={() => onSelect(post.id)}
              onFocus={() => onSelect(post.id)}
              aria-current={isSelected || undefined}
              className={cn(
                "rounded-control flex items-center gap-3 px-2.5 py-2 text-[15px] transition-colors duration-200",
                isSelected ? "bg-white/80" : "hover:bg-white/50",
              )}
            >
              <span
                className={cn(
                  "size-2 shrink-0 rounded-full transition-[background-color,box-shadow] duration-200",
                  isSelected
                    ? "bg-link shadow-[0_0_0_4px_rgb(13_122_82/0.15)]"
                    : "bg-[var(--map-sage)]",
                )}
              />
              <span className={cn("font-semibold", !isSelected && "text-foreground/80")}>
                {post.title}
              </span>
              <span className="text-muted-foreground ml-auto text-sm whitespace-nowrap">
                {pluralize(post.days, "day")}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
