import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { getNavigation } from "@/data";

// Placeholder contact details: replace with the company's real ones before launch
const CONTACT = {
  phone: "+354 555 0199",
  email: "hello@auroracampers.is",
  address: "Blikavöllur 5, 262 Keflavík Airport",
};

export function Footer() {
  const { brand, vehicles, trip } = getNavigation();
  const [first, ...rest] = brand.split(" ");

  const columns = [
    {
      title: "Vehicles",
      links: [
        ...vehicles.categories.map((c) => ({ label: c.name, href: `/book/vehicles?category=${c.id}` })),
        { label: "All vehicles", href: "/book/vehicles" },
      ],
    },
    {
      title: "Road trips",
      links: trip.posts.map((p) => ({ label: p.title, href: `/book/vehicles?category=${p.category}` })),
    },
    {
      title: "Help",
      links: [
        { label: "FAQ", href: "/#faq" },
        { label: "Why rent with us", href: "/#why-us" },
        { label: "Road trip ideas", href: "/#road-trips" },
        { label: "Road conditions (umferdin.is)", href: "https://umferdin.is/en" },
        { label: "Weather (vedur.is)", href: "https://en.vedur.is" },
      ],
    },
  ];

  return (
    <footer className="mt-12 border-t bg-white">
      <div className="page-container grid gap-12 py-14 md:py-16 lg:grid-cols-[1.3fr_2fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex w-fit items-center gap-3">
            <Logo />
            <span className="flex flex-col leading-none">
              <span className="text-[19px] font-bold tracking-[-0.02em]">{first}</span>
              <span className="text-link mt-1 text-[11px] font-bold tracking-[0.22em] uppercase">
                {rest.join(" ")}
              </span>
            </span>
          </Link>
          <p className="text-muted-foreground max-w-[40ch] leading-relaxed">
            Campervans, 4x4s and motorhomes for driving Iceland your own way. Family run in
            Keflavík since 2014.
          </p>
          <ul className="flex flex-col gap-2.5 text-[15px]">
            <li>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-link flex items-center gap-2.5">
                <Phone size={16} className="text-muted-foreground" /> {CONTACT.phone}
                <span className="text-muted-foreground text-sm">· 24/7</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-link flex items-center gap-2.5">
                <Mail size={16} className="text-muted-foreground" /> {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin size={16} className="text-muted-foreground" /> {CONTACT.address}
            </li>
          </ul>
        </div>

        <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <h2 className="text-sm font-bold">{column.title}</h2>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                        className="text-muted-foreground hover:text-foreground text-[15px] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t">
        <div className="page-container text-muted-foreground flex flex-col gap-2 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brand} ehf. All prices in EUR, including VAT.</p>
          <p>
            Photos from{" "}
            <a href="https://unsplash.com" target="_blank" rel="noreferrer" className="hover:text-foreground underline underline-offset-2">
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
