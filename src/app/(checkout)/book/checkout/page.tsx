import type { Metadata } from "next";
import { CheckoutView } from "@/sections/checkout";
import { getVehicles } from "@/data";

export const metadata: Metadata = { title: "Your details · Aurora Campers" };

export default function Page() {
  return <CheckoutView vehicles={getVehicles()} />;
}
