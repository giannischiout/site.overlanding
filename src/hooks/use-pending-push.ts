import { useTransition } from "react";
import { useRouter } from "next/navigation";

/**
 * router.push wrapped in a transition, so the button that started a navigation can show
 * it's working: isPending stays true until the next page has rendered.
 */
export function usePendingPush() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const push = (href: string) => startTransition(() => router.push(href));
  return { push, isPending };
}
