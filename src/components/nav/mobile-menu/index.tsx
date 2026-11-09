import { useEffect } from "react";
import { NAV_DESKTOP_QUERY } from "@/lib/breakpoints";
import { cn } from "@/lib/utils";
import type { Navigation } from "@/types/content";
import { Hamburger } from "@/components/nav/components/burger";
import { BookNowButton } from "@/components/nav/components/book-now-button";
import { categoryItem, roadTripItem } from "@/components/nav/menu-items";
import { MobileLinkList } from "@/components/nav/mobile-menu/mobile-link-list";

type Props = {
  data: Navigation;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookNow: () => void;
};

/** A full-height basalt sheet under the header, continuing it like the desktop menus do */
export function MobileMenu({ data, open, onOpenChange, onBookNow }: Props) {
  const { vehicles, roadTrips } = data.menus;

  // Stop the page scrolling behind the menu, and close it if the screen grows past mobile
  useEffect(() => {
    if (!open) return undefined;
    const close = () => onOpenChange(false);
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia(NAV_DESKTOP_QUERY);
    desktop.addEventListener("change", close);
    return () => {
      document.body.style.overflow = "";
      desktop.removeEventListener("change", close);
    };
  }, [open, onOpenChange]);

  const close = () => onOpenChange(false);

  return (
    <>
      <Hamburger onToggle={() => onOpenChange(!open)} open={open} />
      <div
        id="mobile-menu"
        className={cn(
          "bg-basalt fixed inset-x-0 top-[var(--nav-height)] bottom-0 flex flex-col text-white lg:hidden",
          "transition-[opacity,visibility] duration-200 ease-out",
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-8 px-4 py-6">
            <MobileLinkList
              heading={vehicles.label}
              items={vehicles.categories.map(categoryItem)}
              onNavigate={close}
            />
            <MobileLinkList
              heading={roadTrips.label}
              items={roadTrips.posts.map(roadTripItem)}
              onNavigate={close}
            />
          </div>
        </nav>
        {/* Stays on screen however far the menu is scrolled */}
        <div className="border-t border-white/10 p-4">
          <BookNowButton
            className="h-12 w-full"
            onClick={() => {
              close();
              onBookNow();
            }}
          />
        </div>
      </div>
    </>
  );
}
