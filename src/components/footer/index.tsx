import { BrandLink } from "@/components/brand-link";
import { getFooter, getNavigation } from "@/data";
import { paths } from "@/lib/paths";
import { FooterClosing } from "@/components/footer/footer-closing";
import { FooterColumn } from "@/components/footer/footer-column";
import { FooterContact } from "@/components/footer/footer-contact";
import { TravelResources } from "@/components/footer/travel-resources";

/**
 * A basalt panel the same width as the hero, so the page opens and closes on
 * the same surface. Contact details in navigation.json are placeholders.
 */
export function Footer() {
  const { brand, contact, menus } = getNavigation();
  const footer = getFooter();

  const vehicleLinks = [
    ...menus.vehicles.categories.map((c) => ({ label: c.name, href: paths.vehicles(c.id) })),
    { label: "All vehicles", href: paths.vehicles() },
  ];
  const tripLinks = menus.roadTrips.posts.map((p) => ({
    label: p.title,
    href: paths.vehicles(p.category),
  }));

  return (
    <footer className="wide-container mt-16 pb-3">
      <div className="bg-basalt rounded-panel flex flex-col gap-10 px-5 pt-10 pb-6 text-white md:gap-12 md:px-10 md:pt-14 lg:px-12">
        <FooterClosing closing={footer.closing} />

        <TravelResources resources={footer.resources} />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <BrandLink brand={brand} tone="dark" />
            <p className="max-w-[36ch] leading-relaxed text-white/60">{footer.about}</p>
          </div>
          <FooterColumn title={menus.vehicles.label} links={vehicleLinks} />
          <FooterColumn title={menus.roadTrips.label} links={tripLinks} />
          <FooterColumn title="Help" links={footer.help} />
          <FooterContact contact={contact} />
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name} {brand.descriptor} ehf. {footer.legal}
          </p>
          <p>
            Photos from{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
