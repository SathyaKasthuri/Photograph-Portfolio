import type { Metadata } from "next";
import FadeIn from "@/components/ui/FadeIn";
import CategoryFilter from "@/components/gallery/CategoryFilter";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { getAllCategories, getAllImages } from "@/lib/galleries";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse wedding, portrait, event, and landscape photography collections.",
};

export default function GalleryPage() {
  const categories = getAllCategories();
  const allImages = getAllImages();

  const filterCategories = [
    { slug: "all" as const, label: "All", count: allImages.length },
    ...categories,
  ];

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <FadeIn>
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Portfolio</p>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl">Gallery</h1>
            <p className="mt-4 text-muted max-w-2xl mx-auto">
              A curated collection of my favorite work across weddings, portraits, events, and landscapes.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10">
          <CategoryFilter categories={filterCategories} />
        </div>

        <div className="mt-12">
          <GalleryGrid images={allImages} />
        </div>
      </div>
    </div>
  );
}
