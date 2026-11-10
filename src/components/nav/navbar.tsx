"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BrandLink } from "@/components/brand-link";
import { BookNowButton } from "@/components/nav/components/book-now-button";
import { useBookNow } from "@/components/nav/components/use-book-now";
import { DesktopMenu } from "@/components/nav/desktop-menu";
import { MobileMenu } from "@/components/nav/mobile-menu";
import { paths } from "@/lib/paths";
import { cn } from "@/lib/utils";
import type { MenuId, Navigation } from "@/types/content";

type Props = {
  data: Navigation;
};

/** How far down the page (px) before the nav hides on booking pages */
const HIDE_AFTER = 120;

export function Navbar({ data }: Props) {
  const { bookNow: onBookNow, isPending: bookNowPending } = useBookNow();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Past the page header: on booking pages the nav steps aside for the booking bar
  const [pastTop, setPastTop] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // With a menu open the header turns basalt and joins the menu below it
  const tone = activeMenu || mobileOpen ? "dark" : "light";

  // The bar sits flat on the page at the top and lifts off it once content scrolls under
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      setPastTop(window.scrollY > HIDE_AFTER);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Results and vehicle pages: once scrolled, the booking bar takes the top of the screen.
  // Never while a menu is open.
  const hidden =
    pastTop &&
    pathname.startsWith(paths.vehicles()) &&
    !activeMenu &&
    !mobileOpen;

  // The booking bar and sticky panels read this flag (via --bar-top in styles.css)
  useEffect(() => {
    document.documentElement.dataset.navHidden = String(hidden);
    return () => {
      delete document.documentElement.dataset.navHidden;
    };
  }, [hidden]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,transform] duration-300 ease-out",
        hidden && "-translate-y-full",
        tone === "dark"
          ? "bg-basalt"
          : scrolled
            ? "bg-background/85 shadow-[0_1px_0_var(--border),0_8px_24px_-16px_rgb(6_20_16/0.25)] backdrop-blur-md"
            : "bg-background",
      )}
    >
      {/* Same width as the hero; the inset lines the logo up with the hero's inner edge */}
      <div className="wide-container flex h-[var(--nav-height)] items-center gap-10 px-3 md:px-6">
        <BrandLink brand={data.brand} tone={tone} />
        <DesktopMenu
          menus={data.menus}
          active={activeMenu}
          onActiveChange={setActiveMenu}
        />
        <div className="ml-auto hidden lg:block">
          <BookNowButton onClick={onBookNow} pending={bookNowPending} />
        </div>
        <MobileMenu
          data={data}
          open={mobileOpen}
          onOpenChange={setMobileOpen}
          onBookNow={onBookNow}
        />
      </div>
    </header>
  );
}
