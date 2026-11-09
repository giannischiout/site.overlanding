import type { Metadata } from "next";
import { getNavigation } from "@/data";
import { ContactView } from "@/sections/contact";

export const metadata: Metadata = {
  title: "Contact · Aurora Campers",
  description: "Call, email or message our team in Keflavík, day or night.",
};

export default function Page() {
  return (
    <div className="page-container pt-8 pb-24 md:pt-12">
      <ContactView contact={getNavigation().contact} />
    </div>
  );
}
