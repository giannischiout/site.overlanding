import type { Metadata } from "next";
import { getVehicles } from "@/data";
import { ManageBookingView } from "@/sections/manage-booking";

export const metadata: Metadata = {
  title: "Manage your booking · Aurora Campers",
  description:
    "Find your booking with its reference and email to check or cancel it.",
};

export default function Page() {
  return <ManageBookingView vehicles={getVehicles()} />;
}
