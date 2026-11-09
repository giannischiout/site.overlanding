"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { FormField, inputClass } from "@/components/form-field";
import {
  CONTACT_TOPICS,
  contactSchema,
  type ContactInput,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

/** Front-end only: stands in for the request to the support inbox */
const send = () => new Promise((resolve) => setTimeout(resolve, 700));

export function ContactForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { topic: "booking" },
  });
  const topic = watch("topic");

  if (sentTo) {
    return (
      <div
        role="status"
        className="rounded-panel animate-in fade-in slide-in-from-bottom-2 flex flex-col gap-4 bg-white p-6 ring-1 ring-black/[0.06] duration-500 motion-reduce:animate-none md:p-8"
      >
        <span className="bg-primary-light text-link flex size-12 items-center justify-center rounded-full">
          <Check size={24} strokeWidth={2.5} aria-hidden />
        </span>
        <h2 className="text-2xl font-bold">Thanks, we&rsquo;ve got it</h2>
        <p className="text-muted-foreground leading-relaxed">
          A reply is on its way to{" "}
          <strong className="text-foreground">{sentTo}</strong>, usually within
          two hours. If you&rsquo;re on the road and it&rsquo;s urgent, call us
          instead.
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setSentTo(null);
          }}
          className="text-link w-fit font-semibold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (values) => {
        await send();
        setSentTo(values.email);
      })}
      className="rounded-panel flex flex-col gap-5 bg-white p-6 ring-1 ring-black/[0.06] md:p-8"
    >
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-semibold">
          What&rsquo;s it about?
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {CONTACT_TOPICS.map((option) => (
            <label
              key={option.id}
              className={cn(
                "rounded-control flex cursor-pointer items-center gap-3 border px-4 py-3 text-[15px] transition-colors",
                "has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-2",
                topic === option.id
                  ? "border-link bg-primary-lighter font-semibold"
                  : "hover:bg-[var(--hover)]",
              )}
            >
              <input
                type="radio"
                value={option.id}
                {...register("topic")}
                className="accent-[var(--link)]"
              />
              {option.label}
            </label>
          ))}
        </div>
        {errors.topic && (
          <span className="text-destructive text-sm">
            {errors.topic.message}
          </span>
        )}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Name" error={errors.name?.message}>
          <input
            {...register("name")}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={inputClass(Boolean(errors.name))}
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
      </div>

      {topic === "change" && (
        <FormField
          label="Booking reference"
          hint="Optional, but it saves a step"
        >
          <input
            {...register("reference")}
            placeholder="AC-XXXXXX"
            className={`${inputClass(false)} font-mono uppercase`}
          />
        </FormField>
      )}

      <FormField label="Message" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={5}
          aria-invalid={Boolean(errors.message)}
          className={`${inputClass(Boolean(errors.message))} h-auto resize-y py-3`}
        />
      </FormField>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full px-6 py-3.5 disabled:opacity-70 sm:w-fit"
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
