import { formatPrice } from "@/lib/pricing";
import { paths } from "@/lib/paths";
import { pluralize } from "@/lib/text";
import type { CategoryWithStats, Post } from "@/types/content";
import type { PreviewItem } from "@/components/nav/desktop-menu/preview-panel";

/** Rows for the nav menus. Shared by the desktop panels and the mobile sheet. */
export const categoryItem = (category: CategoryWithStats): PreviewItem => ({
  id: category.id,
  href: paths.vehicles(category.id),
  title: category.name,
  meta: `${pluralize(category.count, "vehicle")} · from ${formatPrice(category.fromPrice)}/day`,
  description: category.description,
  image: category.landscape_image,
});

export const roadTripItem = (post: Post): PreviewItem => ({
  id: post.id,
  href: paths.roadTrip(post.id),
  title: post.title,
  meta: `${pluralize(post.days, "day")} · ${post.distance.toLocaleString("en")} km`,
  description: post.short_description,
  image: post.featuredImage,
});

/** What every rental includes, shown at the foot of the menus */
export const RENTAL_FACTS = [
  "Unlimited km",
  "Free airport shuttle",
  "24/7 roadside help",
];

/** Plain page links beside the menus (desktop) and under them (mobile) */
export const PAGE_LINKS = [
  { label: "Manage booking", href: paths.manageBooking },
  { label: "Contact", href: paths.contact },
  { label: "About", href: paths.about },
];
