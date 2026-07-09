import { NextResponse } from "next/server";
import type { CartItem } from "@/lib/types";
import { verifyRazorpaySignature } from "@/lib/razorpay-utils";
import { calculateOrderTotal, sendOrderEmails } from "@/lib/orders";

interface VerifyPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  notes?: string;
  items: CartItem[];
}

export async function POST(request: Request) {
  try {
    const body: VerifyPayload = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      name,
      email,
      address,
      city,
      state,
      zip,
      notes,
      items,
    } = body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !name ||
      !email ||
      !items?.length
    ) {
      return NextResponse.json(
        { error: "Invalid payment verification request." },
        { status: 400 }
      );
    }

    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Payment verification failed." },
        { status: 400 }
      );
    }

    const subtotal = calculateOrderTotal(items);
    const fullAddress = `${address}, ${city}, ${state} ${zip}`;

    await sendOrderEmails({
      name,
      email,
      address: fullAddress,
      items,
      subtotal,
      notes,
      paymentStatus: "Paid",
      paymentId: razorpay_payment_id,
    });

    return NextResponse.json({
      success: true,
      subtotal,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment." },
      { status: 500 }
    );
  }
}
