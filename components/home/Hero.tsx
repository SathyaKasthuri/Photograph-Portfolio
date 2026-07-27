"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Camera, MapPin } from "lucide-react";

const HERO_SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=85",
    title: "Royal Jodhpur Union",
    location: "Mehrangarh Fort, Jodhpur",
    camera: "Sony α7R V • FE 85mm f/1.4 GM",
  },
  {
    src: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&q=85",
    title: "Taj Mahal in Mist",
    location: "Agra, Uttar Pradesh",
    camera: "Fujifilm GFX 100 II • GF 23mm f/4",
  },
  {
    src: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1920&q=85",
    title: "Munnar Valley Mist",
    location: "Western Ghats, Kerala",
    camera: "Leica M11 • Summilux 35mm f/1.4",
  },
];

const ACCOLADES = [
  "Leica Master Shot Winner",
  "Vogue India Weddings Feature",
  "National Geographic Contributor",
  "Better Photography India Winner",
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.src}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.src}
            alt={slide.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Overlay */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-black/40 backdrop-blur-md px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-6"
        >
          <Camera size={15} />
          <span>Sathya Kasthuri — Fine Art & Heritage Photography</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-serif text-5xl leading-tight text-foreground sm:text-7xl md:text-8xl font-light tracking-tight"
        >
          Lens & Light
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-xl text-foreground/90 md:text-3xl font-light max-w-3xl mx-auto leading-relaxed"
        >
          Capturing human emotion, shadow, and timeless atmospheric beauty across the globe.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/gallery"
            className="w-full sm:w-auto rounded bg-accent px-9 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-background transition-all hover:opacity-90 shadow-lg shadow-accent/20"
          >
            Explore Portfolio
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto rounded border border-foreground/40 bg-black/30 backdrop-blur-md px-9 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition-all hover:border-accent hover:text-accent"
          >
            Commissions & Rates
          </Link>
        </motion.div>

        {/* Accolades Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted/90 font-medium"
        >
          {ACCOLADES.map((accolade, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <Award size={15} className="text-accent" />
              <span>{accolade}</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom Photo EXIF Badge */}
      <div className="absolute bottom-6 left-6 z-10 hidden sm:flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-lg text-sm font-mono text-muted">
        <span className="flex items-center gap-1 text-accent">
          <MapPin size={12} />
          {slide.location}
        </span>
        <span>•</span>
        <span>{slide.camera}</span>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all ${
              currentSlide === idx ? "w-8 bg-accent" : "w-2 bg-white/30"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
