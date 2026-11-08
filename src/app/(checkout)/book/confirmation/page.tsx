import type { Metadata } from "next";
import { ConfirmationView } from "@/sections/checkout/confirmation";
import { getVehicles } from "@/data";

export const metadata: Metadata = { title: "Booking confirmed · Aurora Campers" };

export default function Page() {
  return <ConfirmationView vehicles={getVehicles()} />;
}
