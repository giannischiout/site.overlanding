import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormField, inputClass } from "@/sections/checkout/form-field";
import type { CheckoutForm } from "@/sections/checkout/checkout-form";

const COUNTRIES = [
  "Iceland", "United Kingdom", "United States", "Germany", "France", "Spain", "Italy",
  "Netherlands", "Greece", "Canada", "Denmark", "Norway", "Sweden", "Poland",
  "Switzerland", "Australia", "Other",
];

type Props = {
  register: UseFormRegister<CheckoutForm>;
  errors: FieldErrors<CheckoutForm>;
};

export function DriverFields({ register, errors }: Props) {
  return (
    <section className="rounded-panel grid gap-5 bg-white p-6 ring-1 ring-black/[0.05] sm:grid-cols-2 md:p-8">
      <FormField label="First name" error={errors.firstName?.message}>
        <input
          {...register("firstName", { required: "Enter a first name" })}
          autoComplete="given-name"
          className={inputClass(!!errors.firstName)}
        />
      </FormField>
      <FormField label="Last name" error={errors.lastName?.message}>
        <input
          {...register("lastName", { required: "Enter a last name" })}
          autoComplete="family-name"
          className={inputClass(!!errors.lastName)}
        />
      </FormField>
      <FormField label="Email" error={errors.email?.message} hint="We send your confirmation here">
        <input
          type="email"
          {...register("email", {
            required: "Enter an email address",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email, like name@example.com",
            },
          })}
          autoComplete="email"
          className={inputClass(!!errors.email)}
        />
      </FormField>
      <FormField label="Phone" error={errors.phone?.message} hint="Include the country code">
        <input
          type="tel"
          {...register("phone", {
            required: "Enter a phone number",
            minLength: { value: 7, message: "That number looks too short" },
          })}
          autoComplete="tel"
          placeholder="+354 555 0123"
          className={inputClass(!!errors.phone)}
        />
      </FormField>
      <FormField label="Country of residence" error={errors.country?.message}>
        <select
          {...register("country", { required: "Choose a country" })}
          autoComplete="country-name"
          className={inputClass(!!errors.country)}
        >
          <option value="" disabled>
            Select…
          </option>
          {COUNTRIES.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </select>
      </FormField>
      <FormField label="Driver's age" error={errors.age?.message}>
        <select {...register("age", { required: true })} className={inputClass(false)}>
          <option value="20-22">20–22 (young driver fee at pickup)</option>
          <option value="23-24">23–24</option>
          <option value="25+">25 or older</option>
        </select>
      </FormField>
      <FormField label="Flight number" hint="Optional. We track it and wait if you land late.">
        <input {...register("flight")} placeholder="FI 615" className={inputClass(false)} />
      </FormField>
      <FormField label="Anything we should know?" hint="Optional" className="sm:col-span-2">
        <textarea
          {...register("notes")}
          rows={3}
          className={cn(inputClass(false), "h-auto py-3")}
        />
      </FormField>
    </section>
  );
}
