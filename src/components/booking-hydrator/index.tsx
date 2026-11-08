"use client";

import { useEffect, useState } from "react";
import { useBookingStore } from "@/store/use-booking-store";

export function BookingHydrator() {
  useEffect(() => {
    void useBookingStore.persist.rehydrate();
  }, []);
  return null;
}

/** True once the saved booking has been read back from sessionStorage */
export function useBookingHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(useBookingStore.persist.hasHydrated());
    return useBookingStore.persist.onFinishHydration(() => setHydrated(true));
  }, []);
  return hydrated;
}
