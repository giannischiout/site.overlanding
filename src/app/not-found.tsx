import Link from "next/link";
import { paths } from "@/lib/paths";

export default function NotFound() {
  return (
    <div className="page-container flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24">
      <p className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
        404
      </p>
      <h1 className="max-w-2xl text-5xl leading-[1.02] font-bold tracking-[-0.03em] text-balance md:text-6xl">
        This road is closed
      </h1>
      <p className="text-muted-foreground max-w-[46ch] text-lg leading-relaxed">
        The page you were after doesn&rsquo;t exist, or it moved. These ones are
        open all year.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href={paths.home} className="btn-primary px-6 py-3.5">
          Back to home
        </Link>
        <Link href={paths.roadTrips} className="btn-secondary px-6 py-3.5">
          Road trips
        </Link>
        <Link href={paths.vehicles()} className="btn-secondary px-6 py-3.5">
          Vehicles
        </Link>
      </div>
    </div>
  );
}
