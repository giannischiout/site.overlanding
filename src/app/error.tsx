"use client";

import Link from "next/link";
import { paths } from "@/lib/paths";

type Props = { error: Error & { digest?: string }; reset: () => void };

/** Shown when a page throws while rendering. The nav and footer stay in place. */
export default function Error({ reset }: Props) {
  return (
    <div className="page-container flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24">
      <p className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
        Something went wrong
      </p>
      <h1 className="max-w-2xl text-5xl leading-[1.02] font-bold tracking-[-0.03em] text-balance md:text-6xl">
        A gust took this page
      </h1>
      <p className="text-muted-foreground max-w-[46ch] text-lg leading-relaxed">
        Try again, and if it keeps happening, call us on +354 555 0199. Your
        booking is safe.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="btn-primary px-6 py-3.5"
        >
          Try again
        </button>
        <Link href={paths.home} className="btn-secondary px-6 py-3.5">
          Back to home
        </Link>
      </div>
    </div>
  );
}
