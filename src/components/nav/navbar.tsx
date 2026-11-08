"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { DesktopMenu } from "@/components/nav/desktop-menu";
import { MobileMenu } from "@/components/nav/mobile-menu";
import { useBookNow } from "@/components/nav/components/use-book-now";
import { cn } from "@/lib/utils";
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
            <span className="text-[19px] font-black tracking-[-0.03em]">
              {data.brand.split(" ")[0]}
            </span>
            <span className="text-link mt-1 text-[11px] font-bold tracking-[0.22em] uppercase">
              {data.brand.split(" ").slice(1).join(" ")}
            </span>
          </span>
        </Link>
        <DesktopMenu data={data} />
        <div className="ml-auto hidden items-center gap-5 lg:flex">
          <Link
            href="/#vehicles"
            className="text-muted-foreground hover:text-foreground text-[15px] font-medium transition-colors duration-150"
          >
            Our fleet
          </Link>
          <button
            type="button"
            onClick={onBookNow}
            className="group bg-basalt hover:bg-basalt-2 flex h-12 items-center gap-3 rounded-full pr-1.5 pl-6 text-base font-semibold text-white transition-colors duration-200 ease-out"
          >
            Book now
            <span className="bg-aurora text-primary-foreground flex size-9 items-center justify-center rounded-full transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5">
              <ArrowRight size={16} strokeWidth={2.25} />
            </span>
          </button>
        </div>
        <MobileMenu data={data} onBookNow={onBookNow} />
      </div>
    </header>
  );
}
