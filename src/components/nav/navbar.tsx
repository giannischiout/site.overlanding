"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";
import { Logo } from "@/components/logo";
import { DesktopMenu } from "@/components/nav/desktop-menu";
import { MobileMenu } from "@/components/nav/mobile-menu";
import { useBookNow } from "@/components/nav/components/use-book-now";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/store/use-filters-store";
import type { Navigation } from "@/types/content";

type Props = {
  data: Navigation;
};

export function Navbar({ data }: Props) {
  const onBookNow = useBookNow();
  const [scrolled, setScrolled] = useState(false);

  // The bar sits flat on the page at the top and lifts off it once content scrolls under
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ease-out",
        scrolled
          ? "bg-background/85 shadow-[0_1px_0_var(--border),0_8px_24px_-16px_rgb(6_20_16/0.25)] backdrop-blur-md"
          : "bg-background",
      )}
    >
      {/* Same width as the hero; the inset lines the logo up with the hero's inner edge */}
      <div className="wide-container flex h-[var(--nav-height)] items-center gap-10 px-3 md:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-2xl"
        >
          <Logo />
          <span className="flex flex-col leading-none">
            <span className="text-[19px] font-bold tracking-[-0.02em]">
              {data.brand.split(" ")[0]}
            </span>
            <span className="text-link mt-1 text-[11px] font-bold tracking-[0.22em] uppercase">
              {data.brand.split(" ").slice(1).join(" ")}
            </span>
          </span>
        </Link>
        <DesktopMenu data={data} />
        <div className="ml-auto hidden items-center gap-6 lg:flex">
          <Link
            href="/book/vehicles"
            className="text-muted-foreground hover:text-foreground text-[15px] font-medium transition-colors duration-150"
          >
            Our fleet
          </Link>
          <BookNowButton onClick={onBookNow} />
        </div>
        <MobileMenu data={data} onBookNow={onBookNow} />
      </div>
    </header>
  );
}

/** Shows the trip once dates are picked, so the button doubles as a reminder of the search. */
function BookNowButton({ onClick }: { onClick: () => void }) {
  const range = useFilterStore((state) => state.range);
  const sameMonth =
    range.from && range.to && dayjs(range.from).month() === dayjs(range.to).month();
  const dates =
    range.from && range.to
      ? `${dayjs(range.from).format("MMM D")} – ${dayjs(range.to).format(sameMonth ? "D" : "MMM D")}`
      : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group bg-aurora text-basalt hover:bg-primary-dark flex h-11 items-center gap-2.5 rounded-full px-5 text-[15px] font-bold shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_8px_18px_-10px_rgb(34_184_120/0.95)] transition-[background-color,transform] duration-200 ease-out active:scale-[0.97]"
    >
      <CalendarDays
        size={17}
        strokeWidth={2.25}
        className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-rotate-6"
      />
      {dates ? (
        <span className="flex items-center gap-2.5">
          <span className="tabular">{dates}</span>
          <span aria-hidden className="bg-basalt/25 h-4 w-px" />
          Book
        </span>
      ) : (
        "Book now"
      )}
    </button>
  );
}
