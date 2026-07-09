import { NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactPayload {
  name: string;
  email: string;
  sessionType: string;
  preferredDate?: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();
    const { name, email, sessionType, preferredDate, message } = body;

    if (!name?.trim() || !email?.trim() || !sessionType?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
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

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL || "hello@lensandlight.com";

    if (!apiKey) {
      console.log("Contact form submission (RESEND_API_KEY not configured):", {
        name,
        email,
        sessionType,
        preferredDate,
        message,
      });
      return NextResponse.json({
        success: true,
        message: "Inquiry received (email delivery not configured in development).",
      });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "Lens & Light <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `New ${sessionType} Inquiry from ${name}`,
      html: `
        <h2>New Photography Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Session Type:</strong> ${sessionType}</p>
        <p><strong>Preferred Date:</strong> ${preferredDate || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send your inquiry. Please try again later." },
      { status: 500 }
    );
  }
}
