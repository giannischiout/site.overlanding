import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Contact } from "@/types/content";
import { paths } from "@/lib/paths";
import { telHref } from "@/lib/text";
import { ContactForm } from "./contact-form";

type Props = { contact: Contact };

export function ContactView({ contact }: Props) {
  const ways = [
    {
      icon: Phone,
      title: "Call, any hour",
      value: contact.phone,
      href: telHref(contact.phone),
      note: "The fastest way on the road. A local answers.",
    },
    {
      icon: Mail,
      title: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      note: "We reply within two hours, 07:00 to 23:00.",
    },
    {
      icon: MapPin,
      title: "Our depot",
      value: contact.address,
      note: "Five minutes from arrivals on our free shuttle.",
    },
    {
      icon: Clock,
      title: "Desk hours",
      value: "Every day, 05:00 to 23:00",
      note: "Landing later? We track your flight and wait.",
    },
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-[-0.02em] md:text-5xl">
            Talk to a local
          </h1>
          <p className="text-muted-foreground max-w-[44ch] text-lg leading-relaxed">
            We&rsquo;re a small team in Keflavík. Ask us anything about the
            cars, the roads or the weather.
          </p>
        </header>
        <ul className="flex flex-col divide-y divide-black/10 border-y border-black/10">
          {ways.map(({ icon: Icon, title, value, href, note }) => (
            <li
              key={title}
              className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 py-4"
            >
              <Icon
                size={18}
                aria-hidden
                className="text-link row-span-3 mt-0.5"
              />
              <span className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
                {title}
              </span>
              {href ? (
                <a href={href} className="w-fit font-semibold hover:underline">
                  {value}
                </a>
              ) : (
                <span className="font-semibold">{value}</span>
              )}
              <span className="text-muted-foreground text-sm">{note}</span>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground text-[15px]">
          Already booked?{" "}
          <Link
            href={paths.manageBooking}
            className="text-link font-semibold hover:underline"
          >
            Manage your booking
          </Link>
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
