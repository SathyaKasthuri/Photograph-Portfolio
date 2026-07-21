import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import FadeIn from "@/components/ui/FadeIn";
import AddToCartButton from "@/components/shop/AddToCartButton";
import WallFramePreview from "@/components/shop/WallFramePreview";
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
      <div className="w-full px-6 md:px-12 lg:px-16 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <FadeIn>
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-2xl border border-border">
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
              <p className="text-xs uppercase tracking-widest text-accent font-semibold">
                {PRODUCT_CATEGORY_LABELS[product.category]} Print
              </p>
              <h1 className="mt-3 font-serif text-4xl md:text-5xl font-light">{product.title}</h1>
              <p className="mt-2 text-muted font-mono">From {formatPrice(lowestPrice)}</p>
              <p className="mt-6 text-foreground/80 leading-relaxed text-sm md:text-base">
                {product.description}
              </p>

              <div className="mt-8 border-t border-border pt-8">
                <AddToCartButton product={product} />
              </div>

              <div className="mt-8 space-y-3 text-xs text-muted">
                <p>• Hahnemühle Photo Rag 308gsm Archival Fine Art Paper</p>
                <p>• Hand-signed certificate of authenticity included</p>
                <p>• Ships insured in heavy-duty crush-proof protective casing</p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Interactive Wall Frame Previewer */}
        <div className="mt-20">
          <FadeIn delay={0.2}>
            <WallFramePreview imageSrc={product.image} title={product.title} />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
