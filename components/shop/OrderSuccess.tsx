"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Loader2 } from "lucide-react";
import { useCart } from "@/components/shop/CartProvider";
import { formatPrice } from "@/lib/utils";
import FadeIn from "@/components/ui/FadeIn";

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const paymentId = searchParams.get("payment_id");
  const { clearCart } = useCart();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    Promise.resolve().then(() => {
      if (cancelled) return;

      if (!amount || !paymentId) {
        setStatus("error");
        return;
      }

      clearCart();
      setStatus("success");
    });

    return () => {
      cancelled = true;
    };
  }, [amount, paymentId, clearCart]);

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <FadeIn>
          {status === "loading" && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 size={40} className="animate-spin text-accent" />
              <p className="text-muted">Confirming your payment...</p>
            </div>
          )}

          {status === "success" && (
            <>
              <CheckCircle size={56} className="mx-auto text-accent" />
              <h1 className="mt-6 font-serif text-4xl text-foreground">Payment Successful</h1>
              <p className="mt-4 text-muted leading-relaxed">
                Thank you for your order! A confirmation email is on its way with your
                order details.
              </p>
              {amount && (
                <p className="mt-4 font-serif text-2xl text-accent">
                  {formatPrice(Number(amount))}
                </p>
              )}
              {paymentId && (
                <p className="mt-2 text-xs text-muted">Payment ID: {paymentId}</p>
              )}
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/shop"
                  className="rounded-sm bg-accent px-8 py-3 text-sm font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90"
                >
                  Continue Shopping
                </Link>
                <Link
                  href="/gallery"
                  className="text-sm uppercase tracking-widest text-muted hover:text-accent transition-colors"
                >
                  View Gallery
                </Link>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <h1 className="font-serif text-4xl text-foreground">Something went wrong</h1>
              <p className="mt-4 text-muted">
                We couldn&apos;t confirm your payment. If you were charged, please contact us
                at hello@lensandlight.com with your payment details.
              </p>
              <Link
                href="/cart"
                className="mt-8 inline-block text-sm uppercase tracking-widest text-accent hover:underline"
              >
                Return to Cart
              </Link>
            </>
          )}
        </FadeIn>
      </div>
    </div>
  );
}
