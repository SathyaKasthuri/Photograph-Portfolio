import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { getFeaturedImages } from "@/lib/galleries";

export default function FeaturedGallery() {
  const featured = getFeaturedImages().slice(0, 8);

  return (
    <section className="w-full px-6 md:px-12 lg:px-16 py-24">
      <FadeIn>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Portfolio</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Featured Work</h2>
          </div>
          <Link
            href="/gallery"
            className="text-sm uppercase tracking-widest text-accent hover:underline"
          >
            View All &rarr;
          </Link>
        </div>
      </FadeIn>

      <div className="mt-12">
        <GalleryGrid images={featured} />
      </div>
    </section>
  );
}
