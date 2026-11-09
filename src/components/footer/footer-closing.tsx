import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { paths } from "@/lib/paths";
import type { FooterContent } from "@/types/content";

/** The last nudge to book, left-aligned and sharing a row with its action */
export function FooterClosing({ closing }: { closing: FooterContent["closing"] }) {
  return (
    <div className="grid gap-6 border-b border-white/10 pb-10 md:pb-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
      <div className="flex flex-col gap-3">
        <h2 className="max-w-[20ch] text-3xl leading-[1.05] font-bold tracking-[-0.02em] text-balance md:text-5xl">
          {closing.title}
        </h2>
        <p className="max-w-[52ch] text-lg leading-relaxed text-white/70">{closing.text}</p>
      </div>
      <Link
        href={paths.vehicles()}
        className="bg-aurora text-basalt hover:bg-primary-dark rounded-control flex h-12 w-fit items-center gap-2 px-6 text-base font-bold transition-colors duration-200"
      >
        Find your vehicle
        <ArrowRight size={18} strokeWidth={2.25} />
      </Link>
    </div>
  );
}
