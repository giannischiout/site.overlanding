import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PreviewItem } from "@/components/nav/desktop-menu/preview-panel";

type Props = {
  heading: string;
  items: PreviewItem[];
  onNavigate: () => void;
};

export function MobileLinkList({ heading, items, onNavigate }: Props) {
  return (
    <section>
      <h2 className="text-xs font-bold tracking-[0.22em] text-white/50 uppercase">{heading}</h2>
      <ul className="mt-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="flex items-center justify-between gap-4 border-b border-white/10 py-3.5 active:text-aurora"
            >
              <span className="flex flex-col gap-0.5">
                <span className="text-lg font-semibold">{item.title}</span>
                <span className="tabular text-sm text-white/55">{item.meta}</span>
              </span>
              <ArrowRight size={18} className="shrink-0 text-white/40" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
