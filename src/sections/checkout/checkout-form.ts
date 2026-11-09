import type { Driver } from "@/store/use-booking-store";

/** The checkout form's values: the driver plus the terms checkbox */
export type CheckoutForm = Driver & { terms: boolean };

/** Front-end only: a made-up booking reference in place of the reservation API's */
export const makeReference = () =>
  `AC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
