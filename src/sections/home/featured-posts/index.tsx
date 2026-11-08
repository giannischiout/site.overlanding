import type { Post } from "@/types/content";
import Image from "next/image";

export function FeaturedPosts({ posts }: { posts: Post[] }) {
  const [lead, ...others] = posts.slice(0, 3);

  return (
    <section
      id="road-trips"
      className="flex scroll-mt-[var(--nav-height)] flex-col gap-8 py-16 md:py-20"
    >
      <h2 className="text-4xl font-bold tracking-[-0.02em] md:text-5xl">
        Road trip ideas
      </h2>

      <div className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:gap-12">
        {lead && (
          <article className="flex flex-col gap-4">
            <div className="bg-sky relative aspect-[3/2] overflow-hidden rounded-lg">
              <Image
                alt={lead.featuredImage.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                src={lead.featuredImage.url}
                className="object-cover"
              />
            </div>
            <PostText post={lead} large />
          </article>
        )}

        <div className="flex flex-col gap-8">
          {others.map((post) => (
            <article key={post.id} className="flex flex-col gap-4">
              <div className="bg-sky relative aspect-[2/1] overflow-hidden rounded-lg">
                <Image
                  alt={post.featuredImage.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  src={post.featuredImage.url}
                  className="object-cover"
                />
              </div>
              <PostText post={post} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PostText({ post, large = false }: { post: Post; large?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className={large ? "text-2xl font-bold" : "text-xl font-bold"}>
        {post.title}
      </h3>
      <p className="text-muted-foreground leading-snug">
        {post.short_description}
      </p>
      <p className="text-muted-foreground text-sm">{post.read} minute read</p>
    </div>
  );
}
