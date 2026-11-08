import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Trip = {
  from: string;
  to: string;
  pickupId: string;
  dropoffId: string;
  pickupTime: string;
  dropoffTime: string;
};

export type Driver = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  flight: string;
  age: string;
  notes: string;
};

export type ConfirmedBooking = {
  reference: string;
  vehicleId: string;
  trip: Trip;
  driver: Driver;
  protectionId: string;
  extras: Record<string, number>;
  total: number;
};

type BookingState = {
  vehicleId: string | null;
  protectionId: string;
  extras: Record<string, number>;
  trip: Trip | null;
  confirmed: ConfirmedBooking | null;
};

type BookingActions = {
  setProtection: (id: string) => void;
  setExtra: (id: string, quantity: number) => void;
  /** Starts checkout for a vehicle with the trip as it stands now */
  startCheckout: (vehicleId: string, trip: Trip) => void;
  confirm: (booking: ConfirmedBooking) => void;
  reset: () => void;
};

const INITIAL: BookingState = {
  vehicleId: null,
  protectionId: "premium",
  extras: {},
  trip: null,
  confirmed: null,
};

/** The booking in progress. Kept in sessionStorage so a refresh on checkout doesn't lose it. */
export const useBookingStore = create<BookingState & BookingActions>()(
  persist(
    (set) => ({
      ...INITIAL,
      setProtection: (protectionId) => set({ protectionId }),
      setExtra: (id, quantity) =>
        set((state) => ({ extras: { ...state.extras, [id]: Math.max(0, quantity) } })),
      startCheckout: (vehicleId, trip) =>
        set((state) => ({
          vehicleId,
          trip,
          // A different vehicle starts with a clean slate of extras
          extras: state.vehicleId === vehicleId ? state.extras : {},
        })),
      // The cart stays put until the confirmation page has rendered, so checkout doesn't flash empty
      confirm: (confirmed) => set({ confirmed }),
      reset: () => set(INITIAL),
    }),
    {
      name: "aurora-booking",
      storage: createJSONStorage(() => sessionStorage),
      // Rehydrated by <BookingHydrator /> after mount, so server and client render the same first frame
      skipHydration: true,
    },
  ),
);
