import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Classes for a text input, select or textarea in the checkout form */
export const inputClass = (invalid: boolean) =>
  cn(
    "rounded-control h-12 w-full border bg-white px-4 text-[15px] transition-[border-color,box-shadow] outline-none focus:border-[var(--link)] focus:shadow-[0_0_0_3px_var(--primary-light)]",
    invalid && "border-destructive",
  );

type Props = {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

/** A labelled control with a hint, replaced by the error message when there is one */
export function FormField({ label, hint, error, className, children }: Props) {
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
