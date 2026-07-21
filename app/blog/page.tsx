import type { Metadata } from "next";
import FadeIn from "@/components/ui/FadeIn";
import BlogCard from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description: "Photography tips, behind-the-scenes stories, and shoot recaps from Lens & Light.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-24">
      <div className="w-full px-6 md:px-12 lg:px-16 py-16">
        <FadeIn>
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Journal</p>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl">Blog</h1>
            <p className="mt-4 text-muted max-w-2xl mx-auto">
              Stories from behind the lens, photography tips, and reflections on the craft.
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.1}>
              <BlogCard post={post} />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
