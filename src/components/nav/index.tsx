import { Navbar } from "@/components/nav/navbar";
import { getNavigation } from "@/data";

export function Nav() {
  return <Navbar data={getNavigation()} />;
}
