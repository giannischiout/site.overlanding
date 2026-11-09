import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Media } from "@/types/content";

export type PreviewItem = {
  id: string;
  href: string;
  title: string;
  /** Short facts on the right of the row, e.g. "8 vehicles · from €89/day" */
  meta: string;
  /** Shown over the preview photo */
  description: string;
  image: Media;
};

type Props = {
  heading: string;
  items: PreviewItem[];
  /** A third column, e.g. the most-booked vehicles */
  aside?: ReactNode;
  facts: string[];
  footerLink: { label: string; href: string };
  onNavigate: () => void;
};

/**
 * A menu panel on basalt: a list of options on the left and a photo of
 * whichever one is hovered or focused, so people see what they're picking.
 */
export function PreviewPanel({
  heading,
  items,
  aside,
  facts,
  footerLink,
  onNavigate,
}: Props) {
  const [previewId, setPreviewId] = useState(items[0]?.id);
  const preview = items.find((item) => item.id === previewId) ?? items[0];

  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "grid gap-10 py-8",
          aside
            ? "grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,3fr)]"
            : "grid-cols-[minmax(0,5fr)_minmax(0,7fr)]",
        )}
      >
        <div>
          <p className="mb-2 text-xs font-bold tracking-[0.22em] text-white/50 uppercase">
            {heading}
          </p>
          <ul>
            {items.map((item) => {
              const active = item.id === preview?.id;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    onMouseEnter={() => setPreviewId(item.id)}
                    onFocus={() => setPreviewId(item.id)}
                    className="flex items-baseline justify-between gap-6 border-b border-white/10 py-3"
                  >
                    <span
                      className={cn(
                        "flex items-center gap-2 text-lg font-semibold transition-colors duration-200",
                        active ? "text-aurora" : "text-white",
                      )}
                    >
                      {item.title}
                      <ArrowRight
                        size={16}
                        strokeWidth={2.25}
                        className={cn(
                          "transition-[opacity,transform] duration-300 ease-[var(--ease-out-expo)]",
                          active
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-1 opacity-0",
                        )}
                      />
                    </span>
                    <span className="tabular shrink-0 text-sm text-white/55">
                      {item.meta}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Every photo is stacked so the switch is a crossfade, not a reload */}
        <div className="bg-basalt-2 rounded-panel relative aspect-[4/3] self-start overflow-hidden">
          {items.map((item) => (
            <Image
              key={item.id}
              src={item.image.url}
              alt=""
              fill
              sizes="(min-width: 1024px) 35vw, 0px"
              className={cn(
                "object-cover transition-opacity duration-300 ease-out",
                item.id === preview?.id ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
          <div className="from-basalt/85 absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t to-transparent" />
          <p
            aria-live="polite"
            className="absolute inset-x-0 bottom-0 p-5 text-[15px] leading-snug text-pretty text-white/90"
          >
            {preview?.description}
          </p>
        </div>

        {aside}
      </div>

      <div className="flex items-center justify-between gap-6 border-t border-white/10 py-4 text-sm">
        <p className="text-white/55">{facts.join(" · ")}</p>
        <Link
          href={footerLink.href}
          onClick={onNavigate}
          className="text-aurora flex items-center gap-1.5 font-semibold hover:underline"
        >
          {footerLink.label}
          <ArrowRight size={15} strokeWidth={2.25} />
        </Link>
      </div>
    </div>
  );
}
