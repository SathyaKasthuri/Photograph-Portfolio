import Link from "next/link";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CTABanner({
  title = "Ready to capture your story?",
  subtitle = "Let's create something beautiful together.",
  buttonText = "Get in Touch",
  buttonHref = "/contact",
}: CTABannerProps) {
  return (
    <section className="bg-card border-y border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground">
          {title}
        </h2>
        <p className="mt-4 text-muted max-w-xl mx-auto">{subtitle}</p>
        <Link
          href={buttonHref}
          className="mt-8 inline-block rounded-sm bg-accent px-8 py-3 text-sm font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
