import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Vehicle", "Your details", "Confirmed"];

export function Steps({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2 text-sm font-semibold sm:gap-3">
      {STEPS.map((step, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <li key={step} className="flex items-center gap-2 sm:gap-3">
            <span
              className={cn(
                "flex items-center gap-2",
                active
                  ? "text-foreground"
                  : done
                    ? "text-link"
                    : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-full text-xs",
                  done && "bg-primary-light text-link",
                  active && "bg-basalt text-white",
                  !done && !active && "bg-sky",
                )}
              >
                {done ? <Check size={14} strokeWidth={3} /> : index + 1}
              </span>
              <span className={cn(!active && "hidden sm:inline")}>{step}</span>
            </span>
            {index < STEPS.length - 1 && (
              <span className="bg-border h-px w-6 sm:w-10" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
