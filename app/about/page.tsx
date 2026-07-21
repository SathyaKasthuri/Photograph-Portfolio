import type { Metadata } from "next";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import GearBag from "@/components/about/GearBag";
import CTABanner from "@/components/ui/CTABanner";

export const metadata: Metadata = {
  title: "About | Julian Vance Photography",
  description:
    "Learn about Julian Vance — fine art, portrait, and destination wedding photographer based in Paris & worldwide.",
};

const approach = [
  {
    title: "Cinematic Storytelling",
    description:
      "Every assignment is approached like a short film. I capture raw emotion, atmospheric light, and candid moments that resonate for generations.",
  },
  {
    title: "Mastery of Natural Light",
    description:
      "Light is my brush. From golden hour glow on Tuscan hills to directional window light in Parisian studios, light defines tone.",
  },
  {
    title: "Unobtrusive Presence",
    description:
      "The best images occur organically. I blend into the background, creating a relaxed space for authentic emotion to express itself.",
  },
];

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "350+", label: "Commissions Delivered" },
  { value: "18", label: "Countries Traveled" },
];

export default function AboutPage() {
  return (
    <>
      <div className="pt-28">
        <div className="w-full px-6 md:px-12 lg:px-16 py-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-2xl border border-border">
                <Image
                  src="https://images.unsplash.com/photo-1554048612-b6a482b22f6e?w=800&q=80"
                  alt="Julian Vance Photographer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">Artist & Founder</p>
                <h1 className="mt-2 font-serif text-4xl md:text-6xl font-light">Julian Vance</h1>
                <p className="mt-2 text-xs uppercase tracking-widest text-accent font-mono">Paris • Tokyo • New York</p>
                <div className="mt-6 space-y-4 text-foreground/80 leading-relaxed text-sm md:text-base">
                  <p>
                    I am an editorial, portrait, and destination wedding photographer driven by a obsession for filmic light, rich color depth, and emotional honesty.
                  </p>
                  <p>
                    What began with a vintage rangefinder passed down by my grandfather has evolved into a decade-long journey documenting high-fashion editorials, luxury celebrations, and fine art landscapes across 18 countries.
                  </p>
                  <p>
                    My philosophy is rooted in understated luxury and timeless aesthetic clarity. Whether photographing a quiet moment on the Amalfi Coast or a grand celebration in Lake Como, my commitment remains identical: creating images that transcend trends.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Philosophy Section */}
          <div className="mt-24">
            <FadeIn>
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">Philosophy</p>
                <h2 className="mt-2 font-serif text-3xl md:text-4xl font-light">My Artistic Approach</h2>
              </div>
            </FadeIn>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {approach.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <div className="rounded-xl border border-border/70 bg-card p-8 shadow-lg">
                    <h3 className="font-serif text-xl text-accent">{item.title}</h3>
                    <p className="mt-4 text-sm text-muted leading-relaxed">{item.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-24 py-12 border-y border-border/60">
            <FadeIn>
              <div className="grid grid-cols-3 gap-8 text-center">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-serif text-4xl md:text-5xl text-accent font-light">{stat.value}</p>
                    <p className="mt-2 text-xs uppercase tracking-widest text-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Gear Showcase Component */}
        <GearBag />
      </div>
      <CTABanner />
    </>
  );
}
