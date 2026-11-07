import { Hero } from "@/sections/home/hero";
import { CategoriesSection } from "@/sections/home/categories";
import { Highlights } from "@/sections/home/hightlights";
import { FeaturedPosts } from "@/sections/home/featured-posts";
import { getHome } from "@/data";

export function HomePageView() {
  const { hero, featuredCategories, featuredPosts } = getHome();
  return (
    <>
      <Hero data={hero} />
      <div className="page-container">
        <CategoriesSection categories={featuredCategories} />
        <Highlights />
        <FeaturedPosts posts={featuredPosts} />
      </div>
    </>
  );
}
