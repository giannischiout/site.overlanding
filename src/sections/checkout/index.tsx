"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";
import { useBookingHydrated } from "@/components/booking-hydrator";
import { TripSummary } from "@/components/trip-summary";
import { cn } from "@/lib/utils";
import { formatPrice, quote, rentalDays } from "@/lib/pricing";
import { PROTECTIONS } from "@/data/extras";
import locations from "@/data/pickup-locations.json";
import { useBookingStore, type Driver } from "@/store/use-booking-store";
import { Steps } from "@/sections/checkout/steps";
import type { PickupLocation, Vehicle } from "@/types/content";

const COUNTRIES = [
  "Iceland", "United Kingdom", "United States", "Germany", "France", "Spain", "Italy",
  "Netherlands", "Greece", "Canada", "Denmark", "Norway", "Sweden", "Poland",
  "Switzerland", "Australia", "Other",
];

export function CheckoutView({ vehicles }: { vehicles: Vehicle[] }) {
  const router = useRouter();
  const hydrated = useBookingHydrated();
  const { vehicleId, trip, protectionId, extras, confirm } = useBookingStore();
  const vehicle = vehicles.find((v) => v.id === vehicleId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Driver & { terms: boolean }>({
    defaultValues: { country: "", age: "25+" },
  });

  if (!hydrated) return <div className="min-h-[60vh]" />;

  if (!vehicle || !trip) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-3xl font-bold">Nothing to check out yet</h1>
        <p className="text-muted-foreground">Pick a vehicle and your dates first, then come back here.</p>
        <Link href="/book/vehicles" className="bg-basalt rounded-full px-6 py-3 font-semibold text-white">
          Browse vehicles
        </Link>
      </div>
    );
  }

  const pickup = (locations as PickupLocation[]).find((l) => l.id === trip.pickupId);
  const dropoff = (locations as PickupLocation[]).find((l) => l.id === trip.dropoffId);
  const days = rentalDays(trip.from, trip.to);
  const { lines, total } = quote({
    vehicle,
    days,
    protectionId,
    extras,
    oneWay: trip.pickupId !== trip.dropoffId,
  });
  const protection = PROTECTIONS.find((p) => p.id === protectionId);

  const onSubmit = async ({ terms: _terms, ...driver }: Driver & { terms: boolean }) => {
    // Front-end only: stands in for the reservation API call
    await new Promise((resolve) => setTimeout(resolve, 700));
    const reference = `AC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    confirm({ reference, vehicleId: vehicle.id, trip, driver, protectionId, extras, total });
    router.push("/book/confirmation");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href={`/book/vehicles/${vehicle.id}`}
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-semibold"
        >
          <ArrowLeft size={16} /> Back to vehicle
        </Link>
        <Steps current={1} />
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:gap-14">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-10">
          <header>
            <h1 className="text-4xl font-bold tracking-[-0.02em] md:text-5xl">Who&apos;s driving?</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              The main driver needs a licence held for at least a year and a card in their name at pickup.
            </p>
          </header>

          <section className="grid gap-5 rounded-[22px] bg-white p-6 ring-1 ring-black/[0.05] sm:grid-cols-2 md:p-8">
            <Field label="First name" error={errors.firstName?.message}>
              <input {...register("firstName", { required: "Enter a first name" })} autoComplete="given-name" className={input(!!errors.firstName)} />
            </Field>
            <Field label="Last name" error={errors.lastName?.message}>
              <input {...register("lastName", { required: "Enter a last name" })} autoComplete="family-name" className={input(!!errors.lastName)} />
            </Field>
            <Field label="Email" error={errors.email?.message} hint="We send your confirmation here">
              <input
                type="email"
                {...register("email", {
                  required: "Enter an email address",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email, like name@example.com" },
                })}
                autoComplete="email"
                className={input(!!errors.email)}
              />
            </Field>
            <Field label="Phone" error={errors.phone?.message} hint="Include the country code">
              <input
                type="tel"
                {...register("phone", {
                  required: "Enter a phone number",
                  minLength: { value: 7, message: "That number looks too short" },
                })}
                autoComplete="tel"
                placeholder="+354 555 0123"
                className={input(!!errors.phone)}
              />
            </Field>
            <Field label="Country of residence" error={errors.country?.message}>
              <select {...register("country", { required: "Choose a country" })} autoComplete="country-name" className={input(!!errors.country)}>
                <option value="" disabled>Select…</option>
                {COUNTRIES.map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
            </Field>
            <Field label="Driver's age" error={errors.age?.message}>
              <select {...register("age", { required: true })} className={input(false)}>
                <option value="20-22">20–22 (young driver fee at pickup)</option>
                <option value="23-24">23–24</option>
                <option value="25+">25 or older</option>
              </select>
            </Field>
            <Field label="Flight number" hint="Optional. We track it and wait if you land late.">
              <input {...register("flight")} placeholder="FI 615" className={input(false)} />
            </Field>
            <Field label="Anything we should know?" hint="Optional" className="sm:col-span-2">
              <textarea {...register("notes")} rows={3} className={cn(input(false), "h-auto py-3")} />
            </Field>
          </section>

          <section className="flex flex-col gap-4 rounded-[22px] bg-white p-6 ring-1 ring-black/[0.05] md:p-8">
            <h2 className="text-xl font-bold">Payment</h2>
            <div className="bg-sky flex gap-3 rounded-2xl p-4">
              <Lock size={20} className="text-link mt-0.5 shrink-0" />
              <p className="text-[15px] leading-relaxed">
                <strong>Reserve now, pay later.</strong> Nothing is charged today. We email a secure payment
                link with your confirmation; the balance is due 14 days before pickup.
              </p>
            </div>
            <label className="flex items-start gap-3 text-[15px]">
              <input
                type="checkbox"
                {...register("terms", { required: "Please accept the rental terms to continue" })}
                className="mt-1 size-4 shrink-0"
              />
              <span>
                I accept the rental terms and confirm the driver meets the licence requirements.
                {errors.terms && <span className="text-destructive mt-1 block text-sm">{errors.terms.message}</span>}
              </span>
            </label>
          </section>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-basalt hover:bg-basalt-2 h-14 rounded-full text-base font-bold text-white transition-colors disabled:opacity-60 lg:hidden"
          >
            {isSubmitting ? "Reserving…" : `Reserve for ${formatPrice(total)}`}
          </button>

          {/* Desktop submit lives in the summary; this keeps Enter working */}
          <button type="submit" className="hidden" aria-hidden tabIndex={-1} />
        </form>

        <aside>
          <div className="sticky top-[calc(var(--nav-height)+24px)] flex flex-col gap-5 rounded-[22px] bg-white p-6 shadow-[0_1px_2px_rgb(6_20_16/0.06),0_24px_48px_-28px_rgb(6_20_16/0.45)] ring-1 ring-black/[0.04]">
            <div className="flex gap-4">
              <span className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl">
                <Image src={vehicle.image.url} alt="" fill sizes="112px" className="object-cover" />
              </span>
              <div className="min-w-0">
                <p className="text-link text-xs font-bold tracking-[0.1em] uppercase">{vehicle.category.name}</p>
                <p className="text-lg leading-tight font-bold">{vehicle.brand.name} {vehicle.model}</p>
                <p className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
                  <ShieldCheck size={14} className="text-link" /> {protection?.name} protection
                </p>
              </div>
            </div>
            <div className="border-t pt-4">
              <TripSummary
                from={trip.from}
                to={trip.to}
                pickup={pickup}
                dropoff={dropoff}
                pickupTime={trip.pickupTime}
                dropoffTime={trip.dropoffTime}
              />
            </div>
            <dl className="flex flex-col gap-2 border-t pt-4 text-[15px]">
              {lines.map((line) => (
                <div key={line.label} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{line.label}</dt>
                  <dd className="tabular font-medium">{formatPrice(line.amount)}</dd>
                </div>
              ))}
              <div className="mt-2 flex items-baseline justify-between border-t pt-3">
                <dt className="font-bold">Total</dt>
                <dd className="tabular text-2xl font-bold">{formatPrice(total)}</dd>
              </div>
              <p className="text-muted-foreground text-sm">Due today: {formatPrice(0)}</p>
            </dl>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className="bg-basalt hover:bg-basalt-2 hidden h-14 rounded-full text-base font-bold text-white transition-colors disabled:opacity-60 lg:block"
            >
              {isSubmitting ? "Reserving…" : "Reserve now"}
            </button>
            <p className="text-muted-foreground text-center text-sm">Free cancellation up to 7 days before pickup</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

const input = (invalid: boolean) =>
  cn(
    "h-12 w-full rounded-xl border bg-white px-4 text-[15px] transition-[border-color,box-shadow] outline-none focus:border-[var(--link)] focus:shadow-[0_0_0_3px_var(--primary-light)]",
    invalid && "border-destructive",
  );

function Field({
  label,
  hint,
  error,
  className,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-sm font-semibold">{label}</span>
      {children}
      {error ? (
        <span className="text-destructive text-sm">{error}</span>
      ) : (
        hint && <span className="text-muted-foreground text-sm">{hint}</span>
      )}
    </label>
  );
}
