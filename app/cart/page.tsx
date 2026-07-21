import type { Metadata } from "next";
import FadeIn from "@/components/ui/FadeIn";
import CartItems from "@/components/shop/CartItems";
import CheckoutForm from "@/components/shop/CheckoutForm";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your cart and complete your fine art print order.",
};

export default function CartPage() {
  return (
    <div className="pt-24">
      <div className="w-full px-6 md:px-12 lg:px-16 py-16">
        <FadeIn>
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Print Shop</p>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl">Your Cart</h1>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <FadeIn delay={0.1}>
            <CartItems />
          </FadeIn>
          <FadeIn delay={0.2}>
            <CheckoutForm />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
