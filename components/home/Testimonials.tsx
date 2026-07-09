import testimonialsData from "@/data/testimonials.json";
import FadeIn from "@/components/ui/FadeIn";
import type { Testimonial } from "@/lib/types";

const testimonials = testimonialsData as Testimonial[];

export default function Testimonials() {
  const displayed = testimonials.slice(0, 3);

  return (
    <section className="bg-card border-y border-border">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <FadeIn>
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Testimonials</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Kind Words</h2>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {displayed.map((testimonial, i) => (
            <FadeIn key={testimonial.id} delay={i * 0.15}>
              <blockquote className="flex h-full flex-col rounded-sm border border-border bg-background p-8">
                <p className="flex-1 text-foreground/90 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className="mt-6 border-t border-border pt-6">
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-accent">{testimonial.event}</p>
                </footer>
              </blockquote>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
