import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FadeIn from "@/components/ui/FadeIn";
import CategoryFilter from "@/components/gallery/CategoryFilter";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import {
  getAllCategories,
  getImagesByCategory,
  getCategoryLabel,
  isValidCategory,
} from "@/lib/galleries";
import type { GalleryCategory } from "@/lib/types";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  if (!isValidCategory(category)) return { title: "Not Found" };

  const label = getCategoryLabel(category as GalleryCategory);
  return {
    title: label,
    description: `Browse ${label.toLowerCase()} photography by Lens & Light.`,
  };
}

export default async function CategoryGalleryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!isValidCategory(category)) {
    notFound();
  }

  const categories = getAllCategories();
  const images = getImagesByCategory(category);
  const label = getCategoryLabel(category);

  const filterCategories = [
    { slug: "all" as const, label: "All" },
    ...categories,
  ];

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <FadeIn>
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Collection</p>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl">{label}</h1>
          </div>
        </FadeIn>

        <div className="mt-10">
          <CategoryFilter categories={filterCategories} />
        </div>

        <div className="mt-12">
          <GalleryGrid images={images} category={category} />
        </div>
      </div>
    </div>
  );
}
