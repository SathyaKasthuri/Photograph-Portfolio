import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import FadeIn from "@/components/ui/FadeIn";
import AddToCartButton from "@/components/shop/AddToCartButton";
import { getAllProductSlugs, getProductBySlug } from "@/lib/shop";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Not Found" };

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const lowestPrice = Math.min(...product.variants.map((v) => v.price));

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <FadeIn>
            <div className="relative aspect-square overflow-hidden rounded-sm">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div>
              <p className="text-sm uppercase tracking-widest text-accent">
                {PRODUCT_CATEGORY_LABELS[product.category]}
              </p>
              <h1 className="mt-3 font-serif text-4xl md:text-5xl">{product.title}</h1>
              <p className="mt-2 text-muted">From {formatPrice(lowestPrice)}</p>
              <p className="mt-6 text-foreground/80 leading-relaxed">
                {product.description}
              </p>

              <div className="mt-8 border-t border-border pt-8">
                <AddToCartButton product={product} />
              </div>

              <div className="mt-8 space-y-3 text-sm text-muted">
                <p>Archival matte paper, fade-resistant inks</p>
                <p>Ships within 5–7 business days</p>
                <p>Free shipping on orders over $150</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
