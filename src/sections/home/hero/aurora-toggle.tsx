import dayjs from "dayjs";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample reading until a live forecast is connected (e.g. the Icelandic Met Office aurora API)
const AURORA = { level: "Likely", kp: 4 };

type Props = {
  on: boolean;
  onToggle: () => void;
  tripStart: Date | null | undefined;
};

/** The aurora forecast, which doubles as the switch to the night-sky photo */
export function AuroraToggle({ on, onToggle, tripStart }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      className={cn(
        "bg-basalt/70 rounded-control relative mt-auto mb-5 flex items-center gap-2 self-start py-2 pr-4 pl-2 text-sm text-white/90 ring-1 ring-white/10 backdrop-blur-md transition-shadow duration-700 md:mb-6 md:ml-6",
        on
          ? "shadow-[0_0_48px_rgb(61_220_151/0.6)]"
          : "shadow-[0_0_32px_rgb(61_220_151/0.3)]",
      )}
    >
      <span className="bg-aurora/20 text-aurora flex size-7 items-center justify-center rounded-full">
        <Sparkles size={15} strokeWidth={2} />
      </span>
      <span>
        {tripStart
          ? `Aurora in ${dayjs(tripStart).format("MMMM")}: `
          : "Aurora tonight: "}
        <strong className="text-aurora font-semibold">
          {tripStart ? "Good odds" : AURORA.level}
        </strong>
        {!tripStart && <span className="text-white/60"> · Kp {AURORA.kp}</span>}
      </span>
      <span className="sr-only">
        {on ? "Show the daytime photo" : "Show the night sky with the aurora"}
      </span>
    </button>
  );
}
