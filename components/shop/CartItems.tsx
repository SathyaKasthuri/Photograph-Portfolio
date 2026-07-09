"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/shop/CartProvider";
import { formatPrice } from "@/lib/utils";

export default function CartItems() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-sm border border-border bg-card p-12 text-center">
        <p className="text-muted">Your cart is empty.</p>
        <Link
          href="/shop"
          className="mt-6 inline-block text-sm uppercase tracking-widest text-accent hover:underline"
        >
          Browse Prints &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ul className="divide-y divide-border rounded-sm border border-border bg-card">
        {items.map((item) => (
          <li
            key={`${item.productId}-${item.variantId}`}
            className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-sm">
              <Image
                src={item.image}
                alt={item.productTitle}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>

            <div className="flex-1">
              <Link
                href={`/shop/${item.productSlug}`}
                className="font-serif text-lg text-foreground hover:text-accent transition-colors"
              >
                {item.productTitle}
              </Link>
              <p className="mt-1 text-sm text-muted">{item.variantLabel}</p>
              <p className="mt-2 text-sm text-foreground">
                {formatPrice(item.price)}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-sm border border-border">
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(item.productId, item.variantId, item.quantity - 1)
                  }
                  className="p-2 text-muted hover:text-foreground"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(item.productId, item.variantId, item.quantity + 1)
                  }
                  className="p-2 text-muted hover:text-foreground"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => removeItem(item.productId, item.variantId)}
                className="p-2 text-muted hover:text-red-400 transition-colors"
                aria-label="Remove item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between rounded-sm border border-border bg-card p-5">
        <span className="text-sm uppercase tracking-widest text-muted">Subtotal</span>
        <span className="font-serif text-xl text-foreground">{formatPrice(subtotal)}</span>
      </div>
    </div>
  );
}
