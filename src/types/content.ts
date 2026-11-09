export type Media = {
  url: string;
  alt: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  image: Media;
  landscape_image: Media;
  /** Optional art-directed image for the home page card, e.g. made in Higgsfield */
  card_image?: Media;
};

export type Brand = {
  id: string;
  name: string;
  description: string;
};

export type Feature = {
  id: string;
  name: string;
  description: string;
};

export type Transmission = "manual" | "automatic";
export type Drive = "2wd" | "4x4";
export type Fuel = "diesel" | "petrol" | "hybrid";

export type Vehicle = {
  id: string;
  model: string;
  description: string;
  /** First photo of the gallery, used wherever one image is enough */
  image: Media;
  images: Media[];
  brand: Brand;
  category: Category;
  year: number;
  basePricePerDay: number;
  stock: number;
  sleeps: number;
  seats: number;
  luggage: number;
  transmission: Transmission;
  drive: Drive;
  fuel: Fuel;
  /** Allowed on Iceland's mountain F-roads */
  fRoadApproved: boolean;
  rating: number;
  reviews: number;
  features: Feature[];
};

export type Protection = {
  id: string;
  name: string;
  pricePerDay: number;
  excess: number;
  covers: string[];
  recommended?: boolean;
};

export type Extra = {
  id: string;
  name: string;
  description: string;
  price: number;
  per: "day" | "trip";
  /** Shown only for vehicles you can sleep in */
  campingOnly?: boolean;
};

export type Post = {
  id: string;
  title: string;
  short_description: string;
  read: number;
  /** Suggested length of the trip */
  days: number;
  /** Round trip from Reykjavík, in km */
  distance: number;
  season: string;
  /** Vehicle type we suggest for this route */
  category: string;
  featuredImage: Media;
  /** Waypoints as [lon, lat], drawn on the road trip map */
  route: [number, number][];
};

export type PickupLocation = {
  id: string;
  label: string;
  icon: "airport" | "busstop" | "area";
};

export type Home = {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: Media;
    /** Optional short loop (e.g. made in Higgsfield) that plays when the photo is clicked */
    backgroundVideo?: { url: string };
  };
  featuredCategories: Category[];
  featuredPosts: Post[];
};

/** A category with how many vehicles it has and its cheapest daily price */
export type CategoryWithStats = Category & { count: number; fromPrice: number };

export type Contact = {
  phone: string;
  email: string;
  address: string;
};

export type Navigation = {
  /** Shown as the bold name over the spaced-out descriptor */
  brand: { name: string; descriptor: string };
  contact: Contact;
  menus: {
    vehicles: {
      label: string;
      categories: CategoryWithStats[];
      featuredVehicles: Vehicle[];
    };
    roadTrips: {
      label: string;
      posts: Post[];
    };
  };
};

export type MenuId = keyof Navigation["menus"];

export type FooterLink = { label: string; href: string };

export type TravelResource = {
  id: "roads" | "weather" | "aurora" | "safety";
  label: string;
  description: string;
  href: string;
};

export type FooterContent = {
  closing: { title: string; text: string };
  about: string;
  resources: { title: string; items: TravelResource[] };
  help: FooterLink[];
  legal: string;
};
