"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { DesktopMenu } from "@/components/nav/desktop-menu";
import { MobileMenu } from "@/components/nav/mobile-menu";
import { useBookNow } from "@/components/nav/components/use-book-now";
import { Button } from "@/components/ui/button";
import type { Navigation } from "@/types/content";

type Props = {
  data: Navigation;
};

export function Navbar({ data }: Props) {
  const onBookNow = useBookNow();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <div className="page-container flex h-[var(--nav-height)] items-center gap-10">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-md text-[17px] font-bold tracking-[-0.01em]"
        >
          <Logo />
          {data.brand}
        </Link>
        <DesktopMenu data={data} />
        <Button
          size="lg"
          onClick={onBookNow}
          className="ml-auto hidden text-[15px] lg:inline-flex"
        >
          Book now
        </Button>
        <MobileMenu data={data} onBookNow={onBookNow} />
      </div>
    </header>
  );
}
