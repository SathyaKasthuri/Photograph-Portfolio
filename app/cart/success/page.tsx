import type { Metadata } from "next";
import { Suspense } from "react";
import OrderSuccess from "@/components/shop/OrderSuccess";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your print order has been confirmed.",
};

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-24 text-center text-muted">Loading order details...</div>
      }
    >
      <OrderSuccess />
    </Suspense>
  );
}
