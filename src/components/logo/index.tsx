import { cn } from "@/lib/utils";

/**
 * Aurora Campers mark: a ridge line under an aurora ribbon, on basalt.
 * Decorative: the brand name is always shown as text next to it.
 */
export const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 48"
      className={cn("size-11 shrink-0", className)}
    >
      <defs>
        <linearGradient id="logo-aurora" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3ddc97" stopOpacity="0.35" />
          <stop offset="0.55" stopColor="#3ddc97" />
          <stop offset="1" stopColor="#7cf0c4" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="#0c1714" />
      {/* Aurora ribbon */}
      <path
        d="M8 21c6-7 12-9 18-6s9 3 14-3"
        fill="none"
        stroke="url(#logo-aurora)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M11 25c5-4 10-5 15-3s8 2 12-2"
        fill="none"
        stroke="#3ddc97"
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Ridge */}
      <path d="M7 37l9-9 5 4 7-8 13 13z" fill="#f6f7f5" />
    </svg>
  );
};
