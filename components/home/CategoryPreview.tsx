import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import { getAllCategories } from "@/lib/galleries";

export default function CategoryPreview() {
  const categories = getAllCategories();

  const coverImages: Record<string, string> = {
    weddings:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
    portraits:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    events:
      "https://images.unsplash.com/photo-1505236858219-8359eb4e4f2d?w=800&q=80",
    landscapes:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
  };

  return (
    <section className="w-full px-6 md:px-12 lg:px-16 py-24">
      <FadeIn>
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Collections</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">Browse by Category</h2>
        </div>
      </FadeIn>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, i) => (
          <FadeIn key={category.slug} delay={i * 0.1}>
            <Link
              href={`/gallery/${category.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-sm"
            >
              <Image
                src={coverImages[category.slug]}
                alt={category.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <h3 className="font-serif text-2xl text-foreground">{category.label}</h3>
                <p className="mt-2 text-sm text-foreground/70">
                  {category.count} photos
                </p>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
