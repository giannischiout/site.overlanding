import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Lock } from "lucide-react";
import type { CheckoutForm } from "@/sections/checkout/checkout-form";

type Props = {
  register: UseFormRegister<CheckoutForm>;
  errors: FieldErrors<CheckoutForm>;
};

export function PaymentSection({ register, errors }: Props) {
  return (
    <section className="rounded-panel flex flex-col gap-4 bg-white p-6 ring-1 ring-black/[0.05] md:p-8">
      <h2 className="text-xl font-bold">Payment</h2>
      <div className="bg-sky rounded-panel flex gap-3 p-4">
        <Lock size={20} className="text-link mt-0.5 shrink-0" />
        <p className="text-[15px] leading-relaxed">
          <strong>Reserve now, pay later.</strong> Nothing is charged today. We email a secure
          payment link with your confirmation; the balance is due 14 days before pickup.
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
          {errors.terms && (
            <span className="text-destructive mt-1 block text-sm">{errors.terms.message}</span>
          )}
        </span>
      </label>
    </section>
  );
}
