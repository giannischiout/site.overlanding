import type { Metadata } from "next";
import { AboutView } from "@/sections/about";

export const metadata: Metadata = {
  title: "About this site · Aurora Campers",
  description:
    "A portfolio project: the front end of a camper rental company for driving Iceland.",
};

export default function Page() {
  return (
    <div className="page-container pt-10 pb-24 md:pt-16">
      <AboutView />
    </div>
  );
}
