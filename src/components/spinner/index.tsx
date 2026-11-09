import { cn } from "@/lib/utils";

type Props = { size?: number; className?: string };

/**
 * A small ring for buttons that are working. Inherits the text colour.
 * With reduced motion it stops turning and fades gently instead, so it still reads as busy.
 */
export function Spinner({ size = 18, className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden
      className={cn(
        "shrink-0 animate-spin motion-reduce:animate-pulse",
        className,
      )}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.25}
        strokeWidth={3}
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </svg>
  );
}
