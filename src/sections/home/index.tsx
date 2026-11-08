import { Hero } from "@/sections/home/hero";
import { CategoriesSection } from "@/sections/home/categories";
import { Highlights } from "@/sections/home/hightlights";
import { FeaturedPosts } from "@/sections/home/featured-posts";
import { FaqSection } from "@/sections/home/faq";
import { getFilters, getHome } from "@/data";

export function HomePageView() {
  const { hero, featuredPosts } = getHome();
  // Category cards carry their vehicle count and lowest price
  const { categories } = getFilters();
  return (
    <>
      <Hero data={hero} />
      <div className="page-container">
        <CategoriesSection categories={categories} />
        <Highlights />
        <FeaturedPosts posts={featuredPosts} categories={categories} />
        <FaqSection />
      </div>
    </>
  );
}
