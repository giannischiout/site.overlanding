"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, inputClass } from "@/components/form-field";
import {
  DEMO_LOOKUP,
  lookupSchema,
  type LookupInput,
} from "@/lib/manage-booking";

type Props = {
  onLookup: (input: { reference: string; email: string }) => void;
  /** Set when the last lookup found nothing */
  notFound: boolean;
};

export function LookupForm({ onLookup, notFound }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LookupInput>({ resolver: zodResolver(lookupSchema) });

  const fillDemo = () => {
    setValue("reference", DEMO_LOOKUP.reference, { shouldValidate: true });
    setValue("email", DEMO_LOOKUP.email, { shouldValidate: true });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => onLookup(lookupSchema.parse(values)))}
      className="rounded-panel flex flex-col gap-5 bg-white p-6 ring-1 ring-black/[0.06] md:p-8"
    >
      <FormField
        label="Booking reference"
        hint="It starts with AC-, in your confirmation email"
        error={errors.reference?.message}
      >
        <input
          {...register("reference")}
          autoComplete="off"
          spellCheck={false}
          placeholder="AC-XXXXXX"
          aria-invalid={Boolean(errors.reference)}
          className={`${inputClass(Boolean(errors.reference))} font-mono uppercase`}
        />
      </FormField>
      <FormField label="Email" error={errors.email?.message}>
        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          className={inputClass(Boolean(errors.email))}
        />
      </FormField>

      {notFound && (
        <p
          role="alert"
          className="bg-warn-soft text-warn rounded-control px-4 py-3 text-sm font-semibold"
        >
          We couldn&rsquo;t find a booking with that reference and email. Check
          both, or call us on +354 555 0199.
        </p>
      )}

      <button type="submit" className="btn-primary px-6 py-3.5">
        Find my booking
      </button>
      <p className="text-muted-foreground text-sm">
        Just looking around?{" "}
        <button
          type="button"
          onClick={fillDemo}
          className="text-link font-semibold hover:underline"
        >
          Fill in the demo booking
        </button>
      </p>
    </form>
  );
}
