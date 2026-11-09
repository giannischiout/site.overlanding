import dayjs from "dayjs";
import { z } from "zod";
import type { ConfirmedBooking } from "@/store/use-booking-store";

export const lookupSchema = z.object({
  reference: z
    .string()
    .trim()
    .min(1, "Enter your booking reference")
    .transform((value) => value.toUpperCase()),
  email: z.email("Enter the email you booked with").trim(),
});

export type LookupInput = z.input<typeof lookupSchema>;

/**
 * Front-end only: a booking anyone can open to try the page,
 * three weeks out so cancelling is still free.
 */
export const DEMO_LOOKUP = {
  reference: "AC-DEMO42",
  email: "demo@auroracampers.is",
} as const;

export function demoBooking(today = dayjs()): ConfirmedBooking {
  return {
    reference: DEMO_LOOKUP.reference,
    vehicleId: "vw-california-ocean",
    trip: {
      from: today.add(21, "day").format("YYYY-MM-DD"),
      to: today.add(28, "day").format("YYYY-MM-DD"),
      pickupId: "kef",
      dropoffId: "kef",
      pickupTime: "10:00",
      dropoffTime: "10:00",
    },
    driver: {
      firstName: "Hanna",
      lastName: "Berg",
      email: DEMO_LOOKUP.email,
      phone: "",
      country: "DE",
      flight: "FI521",
      age: "34",
      notes: "",
    },
    protectionId: "premium",
    extras: {},
    total: 1358,
  };
}

/** Finds a booking by reference and email, ignoring case and spaces */
export function findBooking(
  candidates: (ConfirmedBooking | null | undefined)[],
  reference: string,
  email: string,
) {
  const ref = reference.trim().toUpperCase();
  const mail = email.trim().toLowerCase();
  return candidates.find(
    (booking) =>
      booking &&
      booking.reference.toUpperCase() === ref &&
      booking.driver.email.toLowerCase() === mail,
  );
}

/** Whole days from today until pickup, never negative */
export const daysUntil = (date: string, today = dayjs()) =>
  Math.max(0, dayjs(date).startOf("day").diff(today.startOf("day"), "day"));
