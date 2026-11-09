import {
  ArrowUpRight,
  CloudSun,
  Route,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import type { FooterContent, TravelResource } from "@/types/content";

const ICONS: Record<TravelResource["id"], typeof Route> = {
  roads: Route,
  weather: CloudSun,
  aurora: Sparkles,
  safety: ShieldAlert,
};

const domainOf = (href: string) => new URL(href).hostname.replace(/^www\./, "");

/**
 * The official sites locals check before a drive. Useful on its own, and it says
 * more about knowing Iceland than another column of links would.
 */
export function TravelResources({
  resources,
}: {
  resources: FooterContent["resources"];
}) {
  return (
    <section aria-labelledby="travel-resources" className="flex flex-col gap-4">
      <h2
        id="travel-resources"
        className="text-xs font-bold tracking-[0.22em] text-white/50 uppercase"
      >
        {resources.title}
      </h2>
      <ul className="rounded-control grid gap-px overflow-hidden bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {resources.items.map((item) => {
          const Icon = ICONS[item.id];
          return (
            <li key={item.id} className="bg-basalt">
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full items-start gap-3 p-4 transition-colors duration-200 hover:bg-white/[0.04] md:p-5"
              >
                <Icon
                  size={20}
                  strokeWidth={2}
                  className="text-aurora mt-0.5 shrink-0"
                />
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="flex items-center gap-1 font-semibold">
                    {item.label}
                    <ArrowUpRight
                      size={15}
                      className="text-white/40 transition-colors duration-200 group-hover:text-white"
                    />
                  </span>
                  <span className="text-sm leading-snug text-white/60">
                    {item.description}
                  </span>
                  <span className="tabular mt-1 text-xs text-white/40">
                    {domainOf(item.href)}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
