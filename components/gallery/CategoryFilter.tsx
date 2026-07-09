"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { GalleryCategory } from "@/lib/types";

interface CategoryFilterProps {
  categories: { slug: GalleryCategory | "all"; label: string; count?: number }[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => {
        const href =
          category.slug === "all" ? "/gallery" : `/gallery/${category.slug}`;
        const isActive =
          category.slug === "all"
            ? pathname === "/gallery"
            : pathname === `/gallery/${category.slug}`;

        return (
          <Link
            key={category.slug}
            href={href}
            className={cn(
              "rounded-sm px-5 py-2 text-sm uppercase tracking-widest transition-colors",
              isActive
                ? "bg-accent text-background"
                : "border border-border text-muted hover:border-accent hover:text-accent"
            )}
          >
            {category.label}
            {category.count !== undefined && (
              <span className="ml-2 text-xs opacity-70">({category.count})</span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
