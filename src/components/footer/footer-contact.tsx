import { Mail, MapPin, Phone } from "lucide-react";
import { telHref } from "@/lib/text";
import type { Contact } from "@/types/content";

export function FooterContact({ contact }: { contact: Contact }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xs font-bold tracking-[0.22em] text-white/50 uppercase">Contact</h2>
      <ul className="flex flex-col gap-3 text-[15px]">
        <li>
          <a
            href={telHref(contact.phone)}
            className="flex items-start gap-2.5 text-white/75 hover:text-white"
          >
            <Phone size={16} className="text-aurora mt-0.5 shrink-0" />
            <span>
              <span className="tabular block text-white">{contact.phone}</span>
              <span className="text-sm text-white/55">24/7, roadside help included</span>
            </span>
          </a>
        </li>
        <li>
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2.5 text-white/75 hover:text-white"
          >
            <Mail size={16} className="text-aurora shrink-0" />
            {contact.email}
          </a>
        </li>
        <li className="flex items-start gap-2.5 text-white/75">
          <MapPin size={16} className="text-aurora mt-0.5 shrink-0" />
          {contact.address}
        </li>
      </ul>
    </div>
  );
}
