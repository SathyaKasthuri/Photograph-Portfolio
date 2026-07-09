"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle, CreditCard, Loader2 } from "lucide-react";
import { useCart } from "@/components/shop/CartProvider";
import { formatPrice } from "@/lib/utils";

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact?: string };
  notes: Record<string, string>;
  theme: { color: string };
  method?: {
    upi?: boolean;
    card?: boolean;
    netbanking?: boolean;
    wallet?: boolean;
  };
  handler: (response: RazorpayResponse) => void;
  modal: { ondismiss: () => void };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isTestMode =
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.startsWith("rzp_test_") ?? false;

  if (items.length === 0) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const orderDetails = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      zip: formData.get("zip") as string,
      notes: formData.get("notes") as string,
      items,
      subtotal,
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Checkout failed. Please try again.");
      }

      if (data.success) {
        setStatus("success");
        clearCart();
        form.reset();
        return;
      }

      if (!data.keyId || !data.orderId) {
        throw new Error("Payment could not be initialized.");
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay. Please check your connection.");
      }

      const options: RazorpayOptions = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Lens & Light",
        description: "Fine Art Print Order",
        order_id: data.orderId,
        prefill: {
          name: orderDetails.name,
          email: orderDetails.email,
          contact: orderDetails.phone.replace(/\D/g, "").slice(-10) || undefined,
        },
        notes: {
          address: `${orderDetails.address}, ${orderDetails.city}`,
        },
        theme: { color: "#c9a96e" },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                ...orderDetails,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
              throw new Error(verifyData.error || "Payment verification failed.");
            }

            clearCart();
            router.push(
              `/cart/success?amount=${verifyData.subtotal}&payment_id=${verifyData.paymentId}`
            );
          } catch (err) {
            setStatus("error");
            setErrorMessage(
              err instanceof Error ? err.message : "Payment verification failed."
            );
          }
        },
        modal: {
          ondismiss: () => {
            setStatus("idle");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="rounded-sm border border-border bg-card p-8">
      <h2 className="font-serif text-2xl text-foreground">Checkout</h2>
      <p className="mt-2 text-sm text-muted">
        Pay securely with UPI, cards, net banking, or wallets via Razorpay.
      </p>

      {isTestMode && (
        <div className="mt-4 rounded-sm border border-accent/30 bg-accent/10 p-4 text-sm text-foreground">
          <p className="font-medium text-accent">Test mode — how to pay:</p>
          <ul className="mt-2 space-y-2 text-muted">
            <li>
              <strong className="text-foreground">Netbanking (works without UPI):</strong> click{" "}
              <strong className="text-foreground">Show All Options</strong> → choose any bank →
              Razorpay test bank page will open
            </li>
            <li>
              <strong className="text-foreground">Indian test card:</strong>{" "}
              <code className="text-accent">5267 3181 8797 5449</code> — expiry{" "}
              <code className="text-accent">12/30</code>, CVV <code className="text-accent">123</code>
            </li>
            <li>
              <strong className="text-foreground">UPI:</strong> only appears after you submit KYC in
              Razorpay Dashboard. If visible, use{" "}
              <code className="text-accent">success@razorpay</code>
            </li>
            <li>
              Do <strong className="text-foreground">not</strong> use{" "}
              <code className="text-accent">4111 1111 1111 1111</code> (international card — will fail)
            </li>
          </ul>
        </div>
      )}

      {status === "success" && (
        <div className="mt-6 flex items-center gap-3 rounded-sm border border-accent/30 bg-accent/10 p-4 text-foreground">
          <CheckCircle className="shrink-0 text-accent" size={20} />
          <p>Order received! Check your email for confirmation details.</p>
        </div>
      )}

      {status === "error" && (
        <div className="mt-6 flex items-center gap-3 rounded-sm border border-red-500/30 bg-red-500/10 p-4 text-foreground">
          <AlertCircle className="shrink-0 text-red-400" size={20} />
          <p>{errorMessage}</p>
        </div>
      )}

      {status !== "success" && (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="checkout-name" className="block text-sm uppercase tracking-widest text-muted">
                Name <span className="text-accent">*</span>
              </label>
              <input
                id="checkout-name"
                name="name"
                type="text"
                required
                className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="checkout-email" className="block text-sm uppercase tracking-widest text-muted">
                Email <span className="text-accent">*</span>
              </label>
              <input
                id="checkout-email"
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="checkout-phone" className="block text-sm uppercase tracking-widest text-muted">
              Phone <span className="text-accent">*</span>
            </label>
            <input
              id="checkout-phone"
              name="phone"
              type="tel"
              required
              placeholder="9876543210"
              pattern="[0-9]{10}"
              title="Enter a 10-digit Indian mobile number"
              className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="checkout-address" className="block text-sm uppercase tracking-widest text-muted">
              Shipping Address <span className="text-accent">*</span>
            </label>
            <input
              id="checkout-address"
              name="address"
              type="text"
              required
              className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <label htmlFor="checkout-city" className="block text-sm uppercase tracking-widest text-muted">
                City <span className="text-accent">*</span>
              </label>
              <input
                id="checkout-city"
                name="city"
                type="text"
                required
                className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="checkout-state" className="block text-sm uppercase tracking-widest text-muted">
                State <span className="text-accent">*</span>
              </label>
              <input
                id="checkout-state"
                name="state"
                type="text"
                required
                className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="checkout-zip" className="block text-sm uppercase tracking-widest text-muted">
                PIN Code <span className="text-accent">*</span>
              </label>
              <input
                id="checkout-zip"
                name="zip"
                type="text"
                required
                className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="checkout-notes" className="block text-sm uppercase tracking-widest text-muted">
              Order Notes
            </label>
            <textarea
              id="checkout-notes"
              name="notes"
              rows={3}
              className="mt-2 w-full resize-none rounded-sm border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none"
              placeholder="Special requests, gift message, etc."
            />
          </div>

          <div className="flex items-center justify-between border-t border-border pt-6">
            <span className="text-sm uppercase tracking-widest text-muted">Order Total</span>
            <span className="font-serif text-2xl text-accent">{formatPrice(subtotal)}</span>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-8 py-3 text-sm font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Opening Razorpay...
              </>
            ) : (
              <>
                <CreditCard size={16} />
                Pay with Razorpay
              </>
            )}
          </button>

          <p className="text-center text-xs text-muted">
            Supports UPI, cards, net banking &amp; wallets. Powered by Razorpay.
          </p>
        </form>
      )}
    </div>
  );
}
