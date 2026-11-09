/** Every internal URL in one place, so a route rename is a one-line change */
export const paths = {
  home: "/",
  /** The results page, optionally filtered to one vehicle category */
  vehicles: (category?: string | null) =>
    category ? `/book/vehicles?category=${category}` : "/book/vehicles",
  vehicle: (id: string) => `/book/vehicles/${id}`,
  checkout: "/book/checkout",
  confirmation: "/book/confirmation",
};
