import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Checkout Cancelled",
  description: "Your checkout was cancelled.",
};

export default function CancelledPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <FadeIn>
          <h1 className="font-serif text-4xl text-foreground">Checkout Cancelled</h1>
          <p className="mt-4 text-muted leading-relaxed">
            No payment was made. Your cart items are still saved — you can return
            anytime to complete your order.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/cart"
              className="rounded-sm bg-accent px-8 py-3 text-sm font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90"
            >
              Return to Cart
            </Link>
            <Link
              href="/shop"
              className="text-sm uppercase tracking-widest text-muted hover:text-accent transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
