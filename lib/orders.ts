import type { CartItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export function formatOrderItemsHtml(items: CartItem[]): string {
  return items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px;border-bottom:1px solid #333;">${item.productTitle}</td>
          <td style="padding:8px;border-bottom:1px solid #333;">${item.variantLabel}</td>
          <td style="padding:8px;border-bottom:1px solid #333;text-align:center;">${item.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #333;text-align:right;">${formatPrice(item.price * item.quantity)}</td>
        </tr>`
    )
    .join("");
}

export function calculateOrderTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function amountToPaise(amountInRupees: number): number {
  return Math.round(amountInRupees * 100);
}

interface OrderEmailData {
  name: string;
  email: string;
  address?: string;
  items: CartItem[];
  subtotal: number;
  notes?: string;
  paymentStatus?: string;
  paymentId?: string;
}

export function buildOwnerOrderEmail(data: OrderEmailData): string {
  const { name, email, address, items, subtotal, notes, paymentStatus, paymentId } = data;

  return `
    <h2>New Print Shop Order</h2>
    ${paymentStatus ? `<p><strong>Payment:</strong> ${paymentStatus}</p>` : ""}
    ${paymentId ? `<p><strong>Payment ID:</strong> ${paymentId}</p>` : ""}
    <h3>Customer</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${address ? `<p><strong>Address:</strong> ${address}</p>` : ""}
    ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
    <h3>Order Items</h3>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;">
      <thead>
        <tr>
          <th style="padding:8px;text-align:left;border-bottom:2px solid #333;">Product</th>
          <th style="padding:8px;text-align:left;border-bottom:2px solid #333;">Size</th>
          <th style="padding:8px;text-align:center;border-bottom:2px solid #333;">Qty</th>
          <th style="padding:8px;text-align:right;border-bottom:2px solid #333;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${formatOrderItemsHtml(items)}
      </tbody>
    </table>
    <p style="margin-top:16px;font-size:18px;"><strong>Total: ${formatPrice(subtotal)}</strong></p>
  `;
}

export function buildCustomerOrderEmail(data: OrderEmailData): string {
  const { name, subtotal, paymentStatus } = data;
  const paid = paymentStatus === "Paid";

  return `
    <h2>Thank you for your order, ${name}!</h2>
    <p>
      ${
        paid
          ? "Your payment was successful and your prints are being prepared."
          : "We've received your print order."
      }
    </p>
    <p><strong>Order Total:</strong> ${formatPrice(subtotal)}</p>
    <p>You'll receive a shipping notification once your order is on its way.</p>
    <p>If you have any questions, reply to this email or contact us at hello@lensandlight.com.</p>
  `;
}

export async function sendOrderEmails(data: OrderEmailData): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL || "hello@lensandlight.com";

  if (!apiKey) {
    console.log("Order emails skipped (RESEND_API_KEY not configured):", data);
    return false;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "Lens & Light Shop <onboarding@resend.dev>",
    to: toEmail,
    replyTo: data.email,
    subject: `New Print Order from ${data.name} — ${formatPrice(data.subtotal)}`,
    html: buildOwnerOrderEmail(data),
  });

  await resend.emails.send({
    from: "Lens & Light Shop <onboarding@resend.dev>",
    to: data.email,
    subject: "Your Lens & Light Order Confirmation",
    html: buildCustomerOrderEmail(data),
  });

  return true;
}
