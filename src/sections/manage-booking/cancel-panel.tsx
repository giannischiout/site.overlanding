"use client";

import { useState } from "react";
import { Payoff } from "@/components/payoff";
import { CANCELLATION } from "@/data/policies";
import { cancellationFee } from "@/lib/cover";
import { daysUntil } from "@/lib/manage-booking";
import { formatPrice } from "@/lib/pricing";
import { pluralize } from "@/lib/text";
import type { ConfirmedBooking } from "@/store/use-booking-store";
import type { Vehicle } from "@/types/content";

type Props = { booking: ConfirmedBooking; vehicle: Vehicle };

type Step = "idle" | "confirm" | "cancelled";

/** Cancel in two steps: see the fee and refund first, then confirm */
export function CancelPanel({ booking, vehicle }: Props) {
  const [step, setStep] = useState<Step>("idle");
  const daysBefore = daysUntil(booking.trip.from);
  const fee = cancellationFee(daysBefore, vehicle.basePricePerDay);
  const refund = booking.total - fee;

  if (step === "cancelled") {
    return (
      <section aria-live="polite" className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Your booking is cancelled</h2>
        {fee === 0 ? (
          <Payoff
            label="Cancellation fee"
            detail={`${formatPrice(refund)} back to your card within 5 days`}
          />
        ) : (
          <p className="text-muted-foreground">
            We kept {formatPrice(fee)}, the first day&rsquo;s rate.{" "}
            {formatPrice(refund)} goes back to your card within 5 days.
          </p>
        )}
      </section>
    );
  }

  return (
    <section className="bg-sky rounded-panel flex flex-col gap-4 p-6 md:p-8">
      <h2 className="text-xl font-bold">Need to cancel?</h2>
      <p className="text-muted-foreground text-[15px] leading-relaxed">
        Pickup is in {pluralize(daysBefore, "day")}.{" "}
        {fee === 0
          ? `Cancelling is free until ${CANCELLATION.freeUntilDays} days before pickup.`
          : `Within the last ${CANCELLATION.freeUntilDays} days, ${CANCELLATION.lateFee}.`}
      </p>

      {step === "confirm" ? (
        <div className="flex flex-col gap-4 border-t border-black/10 pt-4">
          <dl className="tabular grid grid-cols-2 gap-4">
            <div>
              <dt className="text-muted-foreground text-sm">Fee</dt>
              <dd
                className={
                  fee
                    ? "text-warn text-2xl font-bold"
                    : "text-link text-2xl font-bold"
                }
              >
                {formatPrice(fee)}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-sm">You get back</dt>
              <dd className="text-2xl font-bold">{formatPrice(refund)}</dd>
            </div>
          </dl>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setStep("cancelled")}
              className="btn-primary px-5 py-3"
            >
              Yes, cancel my booking
            </button>
            <button
              type="button"
              onClick={() => setStep("idle")}
              className="btn-secondary px-5 py-3"
            >
              Keep it
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setStep("confirm")}
          className="btn-secondary w-fit px-5 py-3"
        >
          See what cancelling costs
        </button>
      )}
    </section>
  );
}
