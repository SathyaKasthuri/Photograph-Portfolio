"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const SESSION_TYPES = ["Wedding", "Portrait", "Event", "Other"] as const;

export default function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      sessionType: formData.get("sessionType") as string,
      preferredDate: formData.get("preferredDate") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div>
      {status === "success" && (
        <div className="mb-6 flex items-center gap-3 rounded-sm border border-accent/30 bg-accent/10 p-4 text-foreground">
          <CheckCircle className="shrink-0 text-accent" size={20} />
          <p>Thank you! Your inquiry has been sent. I&apos;ll get back to you within 48 hours.</p>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 flex items-center gap-3 rounded-sm border border-red-500/30 bg-red-500/10 p-4 text-foreground">
          <AlertCircle className="shrink-0 text-red-400" size={20} />
          <p>{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm uppercase tracking-widest text-muted">
              Name <span className="text-accent">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-2 w-full rounded-sm border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm uppercase tracking-widest text-muted">
              Email <span className="text-accent">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-sm border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="sessionType" className="block text-sm uppercase tracking-widest text-muted">
              Session Type <span className="text-accent">*</span>
            </label>
            <select
              id="sessionType"
              name="sessionType"
              required
              className="mt-2 w-full rounded-sm border border-border bg-card px-4 py-3 text-foreground focus:border-accent focus:outline-none"
            >
              {SESSION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="preferredDate" className="block text-sm uppercase tracking-widest text-muted">
              Preferred Date
            </label>
            <input
              id="preferredDate"
              name="preferredDate"
              type="date"
              className="mt-2 w-full rounded-sm border border-border bg-card px-4 py-3 text-foreground focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm uppercase tracking-widest text-muted">
            Message <span className="text-accent">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="mt-2 w-full resize-none rounded-sm border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
            placeholder="Tell me about your vision, location, and any details..."
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-8 py-3 text-sm font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending...
            </>
          ) : (
            "Send Inquiry"
          )}
        </button>
      </form>
    </div>
  );
}
