import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/pricing";
import type { ICategory } from "@/types";

type Props = {
  categories: ICategory[];
  total: number;
  active: string | null;
  onSelect: (id: string | null) => void;
};

/** Vehicle types. They scroll sideways on small screens. */
export function CategoryTabs({ categories, total, active, onSelect }: Props) {
  return (
    <nav
      aria-label="Vehicle types"
      className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] [scrollbar-width:none]"
    >
      <ul className="flex w-max gap-2.5 pb-1">
        <CategoryTab
          active={!active}
          onClick={() => onSelect(null)}
          label="All vehicles"
          meta={`${total}`}
        />
        {categories.map((c) => (
          <CategoryTab
            key={c.id}
            active={active === c.id}
            onClick={() => onSelect(c.id)}
            label={c.name}
            meta={`from ${formatPrice(c.fromPrice)}`}
            image={c.image.url}
          />
        ))}
      </ul>
    </nav>
  );
}

type TabProps = {
  active: boolean;
  onClick: () => void;
  label: string;
  meta: string;
  image?: string;
};

function CategoryTab({ active, onClick, label, meta, image }: TabProps) {
  return (
    <li>
      <button
        type="button"
        aria-pressed={active}
        onClick={onClick}
        className={cn(
          "rounded-panel flex h-16 items-center gap-3 py-2 pr-5 pl-2 text-left ring-1 transition-[background-color,box-shadow,color] duration-200",
          !image && "pl-5",
          active
            ? "bg-basalt text-white shadow-[0_10px_24px_-14px_rgb(6_20_16/0.7)] ring-transparent"
            : "bg-white ring-black/[0.06] hover:ring-black/20",
        )}
      >
        {image && (
          <span className="rounded-control relative size-12 shrink-0 overflow-hidden">
            <Image src={image} alt="" fill sizes="48px" className="object-cover" />
          </span>
        )}
        <span className="flex flex-col">
          <span className="text-[15px] font-bold whitespace-nowrap">{label}</span>
          <span
            className={cn(
              "text-[13px] whitespace-nowrap",
              active ? "text-aurora" : "text-muted-foreground",
            )}
          >
            {meta}
          </span>
        </span>
      </button>
    </li>
  );
}
