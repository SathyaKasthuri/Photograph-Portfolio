"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useCart } from "@/components/shop/CartProvider";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id);
  const [added, setAdded] = useState(false);

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];

  function handleAddToCart() {
    addItem({
      productId: product.id,
      productSlug: product.slug,
      productTitle: product.title,
      variantId: selectedVariant.id,
      variantLabel: selectedVariant.label,
      price: selectedVariant.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-widest text-muted">Select Size</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              type="button"
              onClick={() => setSelectedVariantId(variant.id)}
              className={`rounded-sm border px-4 py-2 text-sm transition-colors ${
                selectedVariantId === variant.id
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-muted hover:border-accent/50"
              }`}
            >
              {variant.label} — {formatPrice(variant.price)}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-8 py-3 text-sm font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90 sm:w-auto"
      >
        {added ? (
          <>
            <Check size={16} />
            Added to Cart
          </>
        ) : (
          `Add to Cart — ${formatPrice(selectedVariant.price)}`
        )}
      </button>
    </div>
  );
}
