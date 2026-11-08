import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VehicleDetailView } from "@/sections/vehicle-detail";
import { getVehicle, getVehicles } from "@/data";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getVehicles().map((vehicle) => ({ id: vehicle.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vehicle = getVehicle((await params).id);
  return {
    title: vehicle
      ? `${vehicle.brand.name} ${vehicle.model} · Aurora Campers`
      : "Vehicle not found · Aurora Campers",
    description: vehicle?.description,
  };
}

export default async function Page({ params }: Props) {
  const vehicle = getVehicle((await params).id);
  if (!vehicle) notFound();

  const similar = getVehicles()
    .filter((v) => v.category.id === vehicle.category.id && v.id !== vehicle.id)
    .slice(0, 3);

  return <VehicleDetailView vehicle={vehicle} similar={similar} />;
}
