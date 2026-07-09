import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import FadeIn from "@/components/ui/FadeIn";
import { getAllPostSlugs, getPostBySlug } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="pt-24">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <FadeIn>
          <header>
            <time className="text-sm uppercase tracking-widest text-accent">
              {formatDate(post.date)}
            </time>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-muted">{post.excerpt}</p>
          </header>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-sm">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="prose prose-invert prose-portfolio prose-lg mt-12 max-w-none">
            <MDXRemote source={post.content} />
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
