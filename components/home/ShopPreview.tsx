import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import ProductCard from "@/components/shop/ProductCard";
import { getFeaturedProducts } from "@/lib/shop";

export default function ShopPreview() {
  const products = getFeaturedProducts().slice(0, 4);

  return (
    <section className="bg-card border-y border-border">
      <div className="w-full px-6 md:px-12 lg:px-16 py-24">
        <FadeIn>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-accent">Print Shop</p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">Fine Art Prints</h2>
              <p className="mt-3 text-muted max-w-xl">
                Museum-quality prints on archival matte paper. Bring your favorite images home.
              </p>
            </div>
            <Link
              href="/shop"
              className="text-sm uppercase tracking-widest text-accent hover:underline"
            >
              View Shop &rarr;
            </Link>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.1}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
