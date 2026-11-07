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

export type Vehicle = {
  id: string;
  model: string;
  description: string;
  image: Media;
  brand: Brand;
  category: Category;
  basePricePerDay: number;
  stock: number;
  sleeps: number;
  seats: number;
};

export type Post = {
  id: string;
  title: string;
  short_description: string;
  read: number;
  featuredImage: Media;
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
  };
  featuredCategories: Category[];
  featuredPosts: Post[];
};

export type Navigation = {
  brand: string;
  vehicles: {
    categories: Category[];
    bestSellingVehicles: Vehicle[];
  };
  trip: {
    posts: Post[];
  };
};
