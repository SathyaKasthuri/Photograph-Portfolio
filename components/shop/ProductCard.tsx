import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORY_LABELS, type Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-accent/50"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-widest text-accent">
          {PRODUCT_CATEGORY_LABELS[product.category]}
        </p>
        <h3 className="mt-2 font-serif text-lg text-foreground group-hover:text-accent transition-colors">
          {product.title}
        </h3>
        <p className="mt-2 text-sm text-muted line-clamp-2">{product.description}</p>
        <p className="mt-3 text-sm text-foreground">
          From {formatPrice(lowestPrice)}
        </p>
      </div>
    </Link>
  );
}
