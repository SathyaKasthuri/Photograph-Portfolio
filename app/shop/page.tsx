import type { Metadata } from "next";
import FadeIn from "@/components/ui/FadeIn";
import ProductCard from "@/components/shop/ProductCard";
import ShopFilter from "@/components/shop/ShopFilter";
import {
  getAllProducts,
  getProductCategories,
  getProductsByCategory,
} from "@/lib/shop";
import { isValidProductCategory } from "@/lib/shop-utils";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Fine art photography prints. Museum-quality archival prints in multiple sizes.",
};

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;
  const categories = getProductCategories();
  const products =
    category && isValidProductCategory(category)
      ? getProductsByCategory(category)
      : getAllProducts();

  return (
    <div className="pt-24">
      <div className="w-full px-6 md:px-12 lg:px-16 py-16">
        <FadeIn>
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Print Shop</p>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl">Fine Art Prints</h1>
            <p className="mt-4 text-muted max-w-2xl mx-auto">
              Museum-quality prints on archival matte paper. Each print is hand-inspected
              and shipped in protective packaging.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10">
          <ShopFilter categories={categories} activeCategory={category} />
        </div>

        {products.length === 0 ? (
          <p className="mt-12 text-center text-muted">No products in this category.</p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product, i) => (
              <FadeIn key={product.id} delay={i * 0.05}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
