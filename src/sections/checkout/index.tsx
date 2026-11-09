"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { useBookingHydrated } from "@/components/booking-hydrator";
import { Spinner } from "@/components/spinner";
import { usePendingPush } from "@/hooks/use-pending-push";
import { formatPrice, quote, rentalDays } from "@/lib/pricing";
import { PROTECTIONS } from "@/data/extras";
import { findPickupLocation } from "@/data/pickup-locations";
import { useBookingStore } from "@/store/use-booking-store";
import type { Vehicle } from "@/types/content";
import { BookingSummary } from "@/sections/checkout/booking-summary";
import { DriverFields } from "@/sections/checkout/driver-fields";
import { PaymentSection } from "@/sections/checkout/payment-section";
import { Steps } from "@/sections/checkout/steps";
import {
  makeReference,
  type CheckoutForm,
} from "@/sections/checkout/checkout-form";
import { paths } from "@/lib/paths";

export function CheckoutView({ vehicles }: { vehicles: Vehicle[] }) {
  const { push, isPending } = usePendingPush();
  const hydrated = useBookingHydrated();
  const { vehicleId, trip, protectionId, extras, confirm } = useBookingStore();
  const vehicle = vehicles.find((v) => v.id === vehicleId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutForm>({
    defaultValues: { country: "", age: "25+" },
  });
  // Busy from the click until the confirmation page has rendered, not just while "saving"
  const reserving = isSubmitting || isPending;

  if (!hydrated) return <div className="min-h-[60vh]" />;

  if (!vehicle || !trip) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-3xl font-bold">Nothing to check out yet</h1>
        <p className="text-muted-foreground">
          Pick a vehicle and your dates first, then come back here.
        </p>
        <Link href={paths.vehicles()} className="btn-primary px-6 py-3">
          Browse vehicles
        </Link>
      </div>
    );
  }

  const days = rentalDays(trip.from, trip.to);
  const { lines, total } = quote({
    vehicle,
    days,
    protectionId,
    extras,
    oneWay: trip.pickupId !== trip.dropoffId,
  });

  const onSubmit = async ({ terms: _terms, ...driver }: CheckoutForm) => {
    // Front-end only: stands in for the reservation API call
    await new Promise((resolve) => setTimeout(resolve, 700));
    confirm({
      reference: makeReference(),
      vehicleId: vehicle.id,
      trip,
      driver,
      protectionId,
      extras,
      total,
    });
    push(paths.confirmation);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href={paths.vehicle(vehicle.id)}
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-semibold"
        >
          <ArrowLeft size={16} /> Back to vehicle
        </Link>
        <Steps current={1} />
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:gap-14">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-10"
        >
          <header>
            <h1 className="text-4xl font-bold tracking-[-0.02em] md:text-5xl">
              Who&apos;s driving?
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              The main driver needs a licence held for at least a year and a
              card in their name at pickup.
            </p>
          </header>

          <DriverFields register={register} errors={errors} />
          <PaymentSection register={register} errors={errors} />

          <button
            type="submit"
            disabled={reserving}
            aria-busy={reserving}
            className="btn-primary flex h-14 items-center justify-center gap-2 text-base disabled:cursor-wait lg:hidden"
          >
            {reserving && <Spinner />}
            {reserving ? "Reserving…" : `Reserve for ${formatPrice(total)}`}
          </button>

          {/* Desktop submit lives in the summary; this keeps Enter working */}
          <button type="submit" className="hidden" aria-hidden tabIndex={-1} />
        </form>

        <BookingSummary
          vehicle={vehicle}
          protectionName={PROTECTIONS.find((p) => p.id === protectionId)?.name}
          trip={trip}
          pickup={findPickupLocation(trip.pickupId)}
          dropoff={findPickupLocation(trip.dropoffId)}
          lines={lines}
          total={total}
          submitting={reserving}
          onSubmit={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
}
