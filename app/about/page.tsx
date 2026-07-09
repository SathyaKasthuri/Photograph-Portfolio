import type { Metadata } from "next";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import CTABanner from "@/components/ui/CTABanner";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Lens & Light photography — storytelling through natural light and candid moments.",
};

const approach = [
  {
    title: "Storytelling",
    description:
      "Every session is a narrative. I focus on the genuine interactions and emotions that make your story uniquely yours.",
  },
  {
    title: "Natural Light",
    description:
      "Light is my primary tool. Golden hour, soft window light, and ambient glow create images that feel warm and timeless.",
  },
  {
    title: "Candid Moments",
    description:
      "The best photos happen when you forget the camera is there. I create space for authentic, unposed moments to unfold.",
  },
];

const stats = [
  { value: "8+", label: "Years Experience" },
  { value: "200+", label: "Sessions Completed" },
  { value: "12", label: "Countries Traveled" },
];

const gear = [
  "Sony A7IV",
  "35mm f/1.4 GM",
  "85mm f/1.4 GM",
  "24-70mm f/2.8 GM",
  "Profoto B10 Plus",
];

export default function AboutPage() {
  return (
    <>
      <div className="pt-24">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <Image
                  src="https://images.unsplash.com/photo-1554048612-b6a482b22f6e?w=800&q=80"
                  alt="Photographer with camera"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-accent">About Me</p>
                <h1 className="mt-3 font-serif text-4xl md:text-5xl">Alex Morgan</h1>
                <div className="mt-6 space-y-4 text-foreground/80 leading-relaxed">
                  <p>
                    I&apos;m a photographer based in Portland, Oregon, with a passion for
                    capturing the quiet, in-between moments that often go unnoticed. What
                    started as a hobby with my grandfather&apos;s film camera has grown into
                    an eight-year journey across weddings, portraits, and events worldwide.
                  </p>
                  <p>
                    My work is rooted in authenticity. I believe the most powerful images
                    aren&apos;t posed — they&apos;re felt. Whether I&apos;m documenting a
                    wedding day or creating a portrait session, my goal is always the same:
                    to create images that feel as real as the moments they capture.
                  </p>
                  <p>
                    When I&apos;m not behind the camera, you&apos;ll find me hiking Pacific
                    Northwest trails, experimenting with film photography, or planning my
                    next destination shoot.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="mt-24">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-accent">Philosophy</p>
                <h2 className="mt-3 font-serif text-3xl md:text-4xl">My Approach</h2>
              </div>
            </FadeIn>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {approach.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <div className="rounded-sm border border-border bg-card p-8">
                    <h3 className="font-serif text-xl text-accent">{item.title}</h3>
                    <p className="mt-4 text-muted leading-relaxed">{item.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <div className="mt-24">
            <FadeIn>
              <div className="grid grid-cols-3 gap-8 text-center">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-serif text-4xl text-accent">{stat.value}</p>
                    <p className="mt-2 text-sm uppercase tracking-widest text-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="mt-24">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-accent">Tools</p>
                <h2 className="mt-3 font-serif text-3xl">What I Shoot With</h2>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <ul className="mt-8 flex flex-wrap justify-center gap-4">
                {gear.map((item) => (
                  <li
                    key={item}
                    className="rounded-sm border border-border px-5 py-2 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </div>
      <CTABanner />
    </>
  );
}
