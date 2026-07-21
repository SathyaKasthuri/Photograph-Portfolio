import InvestmentCalculator from "@/components/services/InvestmentCalculator";
import CTABanner from "@/components/ui/CTABanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Investment | Lens & Light",
  description: "Photography packages, wedding coverage, editorial portrait pricing, and interactive investment calculator.",
};

const FAQS = [
  {
    question: "Do you travel for destination weddings and commissions?",
    answer: "Yes, over 60% of our commissions are destination weddings and international editorial projects across Europe, Asia, and North America. Travel costs are calculated transparently with custom flat rates.",
  },
  {
    question: "When can we expect our finished high-resolution gallery?",
    answer: "You will receive a sneak peek gallery of 20-30 retouched images within 48 hours. Full high-resolution galleries are delivered via your private Client Portal within 4-6 weeks.",
  },
  {
    question: "What equipment and backup gear do you shoot with?",
    answer: "We shoot with dual full-frame Sony α7R V and Leica M11 bodies featuring instant dual card slot backups to ensure zero frame loss, alongside fast prime lenses and portable Profoto lighting.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header Banner */}
      <section className="bg-background pt-32 pb-16 border-b border-border/60">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-3">
            Commissions & Packages
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-foreground font-light">
            Services & Investment
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Transparent pricing, tailored coverage options, and archival quality deliverables for weddings, portraits, and commercial projects.
          </p>
        </div>
      </section>

      {/* Investment Calculator */}
      <InvestmentCalculator />

      {/* FAQs Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-foreground font-light">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-card border border-border/70 rounded-xl p-6">
                <h3 className="font-serif text-lg text-foreground font-medium mb-2">{faq.question}</h3>
                <p className="text-sm text-muted leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
