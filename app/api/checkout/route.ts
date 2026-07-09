import { NextResponse } from "next/server";
import type { CartItem } from "@/lib/types";
import { getRazorpay, getRazorpayKeyId, isRazorpayConfigured } from "@/lib/razorpay";
import { amountToPaise, calculateOrderTotal, sendOrderEmails } from "@/lib/orders";

interface CheckoutPayload {
  name: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
}

export async function POST(request: Request) {
  try {
    const body: CheckoutPayload = await request.json();
    const { name, email, phone, address, city, state, zip, notes, items } = body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !address?.trim() ||
      !city?.trim() ||
      !state?.trim() ||
      !zip?.trim()
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!items?.length) {
      return NextResponse.json(
        { error: "Your cart is empty." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const subtotal = calculateOrderTotal(items);

    if (isRazorpayConfigured()) {
      const razorpay = getRazorpay();
      const keyId = getRazorpayKeyId();

      if (!razorpay || !keyId) {
        return NextResponse.json(
          { error: "Payment system is not configured." },
          { status: 500 }
        );
      }

      const order = await razorpay.orders.create({
        amount: amountToPaise(subtotal),
        currency: "INR",
        receipt: `order_${Date.now()}`,
        notes: {
          customer_name: name.slice(0, 256),
          customer_email: email.slice(0, 256),
          customer_phone: phone?.slice(0, 256) || "",
          shipping_address: `${address}, ${city}, ${state} ${zip}`.slice(0, 256),
          order_notes: notes?.slice(0, 256) || "",
        },
      });

      return NextResponse.json({
        keyId,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        customer: { name, email, phone },
      });
    }

    await sendOrderEmails({
      name,
      email,
      address: `${address}, ${city}, ${state} ${zip}`,
      items,
      subtotal,
      notes,
      paymentStatus: "Pending manual payment",
    });

    return NextResponse.json({
      success: true,
      message: "Order received. Payment instructions will be sent via email.",
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to start checkout. Please try again later." },
      { status: 500 }
    );
  }
}
