import type { ReactNode } from "react";
import { LayoutWithBar } from "@/components/layouts/layout-with-bar";

export default function Layout({ children }: { children: ReactNode }) {
  return <LayoutWithBar>{children}</LayoutWithBar>;
}
