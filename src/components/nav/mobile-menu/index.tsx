import { useEffect, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBoolean } from "@/hooks/use-boolean";
import { Button } from "@/components/ui/button";
import { Hamburger } from "@/components/nav/components/burger";
import { OurCars } from "@/components/nav/desktop-menu/mega-menu/our-cars";
import { Roadtrips } from "@/components/nav/desktop-menu/mega-menu/roadtrips";
import type { Navigation } from "@/types/content";

type Props = {
  data: Navigation;
  onBookNow: () => void;
};

export function MobileMenu({ data, onBookNow }: Props) {
  const { value: open, onToggle, onFalse: onClose } = useBoolean();
  const [active, setActive] = useState<string | null>(null);

  // Stop the page scrolling behind the menu, and close it if the screen grows past mobile
  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1024px)");
    desktop.addEventListener("change", onClose);
    return () => {
      document.body.style.overflow = "";
      desktop.removeEventListener("change", onClose);
    };
  }, [open, onClose]);

  const toggleSection = (id: string) =>
    setActive((current) => (current === id ? null : id));

  return (
    <>
      <Hamburger onToggle={onToggle} open={open} />
      <div
        className={cn(
          "fixed inset-x-0 top-[var(--nav-height)] bottom-0 flex flex-col bg-white lg:hidden",
          "transition-[opacity,visibility] duration-200 ease-out",
          open
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="min-h-0 flex-1 overflow-y-auto">
          <div className="page-container py-2">
            <MobileSection
              label="Vehicles"
              open={active === "vehicles"}
              onToggle={() => toggleSection("vehicles")}
            >
              <OurCars vehicles={data.vehicles} onNavigate={onClose} />
            </MobileSection>
            <MobileSection
              label="Road trips"
              open={active === "roadtrips"}
              onToggle={() => toggleSection("roadtrips")}
            >
              <Roadtrips data={data.trip} onNavigate={onClose} />
            </MobileSection>
          </div>
        </nav>
        {/* Stays on screen however far the menu is scrolled */}
        <div className="border-t border-border p-4">
          <Button
            size="lg"
            className="h-12 w-full text-base"
            onClick={() => {
              onClose();
              onBookNow();
            }}
          >
            Book now
          </Button>
        </div>
      </div>
    </>
  );
}

function MobileSection({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex h-14 w-full items-center justify-between text-lg font-medium"
      >
        {label}
        <ChevronDown
          size={20}
          className={cn(
            "text-muted-foreground transition-transform duration-150 ease-out",
            open && "rotate-180",
          )}
        />
      </button>
      {open && <div className="pb-6">{children}</div>}
    </div>
  );
}
