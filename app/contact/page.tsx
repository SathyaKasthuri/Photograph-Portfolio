import type { Metadata } from "next";
import FadeIn from "@/components/ui/FadeIn";
import InquiryForm from "@/components/contact/InquiryForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a photography session with Lens & Light. Weddings, portraits, events, and more.",
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <div className="w-full px-6 md:px-12 lg:px-16 py-16">
        <div className="grid gap-16 lg:grid-cols-2">
          <FadeIn>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-accent">Get in Touch</p>
              <h1 className="mt-3 font-serif text-4xl md:text-5xl">Book a Session</h1>
              <p className="mt-6 text-muted leading-relaxed">
                I&apos;d love to hear about your vision. Fill out the form and I&apos;ll
                get back to you within 48 hours with availability and next steps.
              </p>

              <div className="mt-10 space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-widest text-accent">Email</p>
                  <a
                    href="mailto:hello@lensandlight.com"
                    className="mt-1 block text-foreground hover:text-accent transition-colors"
                  >
                    hello@lensandlight.com
                  </a>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-accent">Location</p>
                  <p className="mt-1 text-foreground">Portland, Oregon</p>
                  <p className="text-sm text-muted">Available for travel worldwide</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-accent">Response Time</p>
                  <p className="mt-1 text-foreground">Within 48 hours</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-sm border border-border bg-card p-8">
              <InquiryForm />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
