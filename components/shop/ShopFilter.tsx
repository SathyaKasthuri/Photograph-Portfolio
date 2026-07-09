import Link from "next/link";
import { cn } from "@/lib/utils";
import { PRODUCT_CATEGORY_LABELS, type ProductCategory } from "@/lib/types";

interface ShopFilterProps {
  categories: ProductCategory[];
  activeCategory?: string;
}

export default function ShopFilter({ categories, activeCategory }: ShopFilterProps) {
  const filters: { slug: string; label: string }[] = [
    { slug: "all", label: "All" },
    ...categories.map((cat) => ({
      slug: cat,
      label: PRODUCT_CATEGORY_LABELS[cat],
    })),
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {filters.map((filter) => {
        const href = filter.slug === "all" ? "/shop" : `/shop?category=${filter.slug}`;
        const isActive =
          filter.slug === "all"
            ? !activeCategory
            : activeCategory === filter.slug;

        return (
          <Link
            key={filter.slug}
            href={href}
            className={cn(
              "rounded-sm px-5 py-2 text-sm uppercase tracking-widest transition-colors",
              isActive
                ? "bg-accent text-background"
                : "border border-border text-muted hover:border-accent hover:text-accent"
            )}
          >
            {filter.label}
          </Link>
        );
      })}
    </div>
  );
}
