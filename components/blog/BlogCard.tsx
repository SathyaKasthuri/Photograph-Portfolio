import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import type { BlogPostMeta } from "@/lib/types";

interface BlogCardProps {
  post: BlogPostMeta;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-accent/50"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-6">
        <time className="text-xs uppercase tracking-widest text-accent">
          {formatDate(post.date)}
        </time>
        <h2 className="mt-2 font-serif text-xl text-foreground group-hover:text-accent transition-colors">
          {post.title}
        </h2>
        <p className="mt-3 text-sm text-muted leading-relaxed">{post.excerpt}</p>
      </div>
    </Link>
  );
}
