import dayjs from "dayjs";
import { EXTRAS, PROTECTIONS } from "@/data/extras";
import type { Vehicle } from "@/types/content";

/** Charged when the car is returned somewhere other than where it was picked up */
export const ONE_WAY_FEE = 150;

export const currency = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export const formatPrice = (value: number) => currency.format(value);

/** Rental days, counted the way rental desks do: any part of a day is a day. Minimum one. */
export function rentalDays(from?: Date | string | null, to?: Date | string | null) {
  if (!from || !to) return 0;
  return Math.max(1, dayjs(to).startOf("day").diff(dayjs(from).startOf("day"), "day"));
}

export type PriceLine = { label: string; amount: number };

export function quote({
  vehicle,
  days,
  protectionId,
  extras,
  oneWay,
}: {
  vehicle: Vehicle;
  days: number;
  protectionId: string;
  extras: Record<string, number>;
  oneWay: boolean;
}) {
  const lines: PriceLine[] = [];
  const billable = Math.max(days, 1);

  lines.push({
    label: `${vehicle.brand.name} ${vehicle.model} × ${billable} ${billable === 1 ? "day" : "days"}`,
    amount: vehicle.basePricePerDay * billable,
  });

  const protection = PROTECTIONS.find((p) => p.id === protectionId);
  if (protection && protection.pricePerDay > 0) {
    lines.push({
      label: `${protection.name} protection`,
      amount: protection.pricePerDay * billable,
    });
  }

  for (const extra of EXTRAS) {
    const quantity = extras[extra.id] ?? 0;
    if (!quantity) continue;
    const unit = extra.per === "day" ? extra.price * billable : extra.price;
    lines.push({
      label: quantity > 1 ? `${extra.name} × ${quantity}` : extra.name,
      amount: unit * quantity,
    });
  }

  if (oneWay) lines.push({ label: "One-way fee", amount: ONE_WAY_FEE });

  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  return { lines, total };
}
