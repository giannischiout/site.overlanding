import Link from "next/link";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { paths } from "@/lib/paths";
import type { Navigation } from "@/types/content";

type Props = {
  brand: Navigation["brand"];
  /** "dark" when it sits on basalt, e.g. the header while a menu is open */
  tone?: "light" | "dark";
  className?: string;
};

/** The logo mark and wordmark, linking home */
export function BrandLink({ brand, tone = "light", className }: Props) {
  return (
    <Link
      href={paths.home}
      className={cn(
        "rounded-control flex w-fit shrink-0 items-center gap-3",
        className,
      )}
    >
      <Logo />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[19px] font-bold tracking-[-0.02em] transition-colors duration-300",
            tone === "dark" && "text-white",
          )}
        >
          {brand.name}
        </span>
        <span
          className={cn(
            "mt-1 text-[11px] font-bold tracking-[0.22em] uppercase transition-colors duration-300",
            tone === "dark" ? "text-aurora" : "text-link",
          )}
        >
          {brand.descriptor}
        </span>
      </span>
    </Link>
  );
}
