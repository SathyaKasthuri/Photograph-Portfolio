"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight, MapPin, ShoppingBag, Sliders, X } from "lucide-react";
import type { GalleryImage } from "@/lib/types";

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  categoryLabel?: string;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
  categoryLabel,
}: LightboxProps) {
  const current = images[currentIndex];
  const [showExif, setShowExif] = useState(true);

  const goPrev = useCallback(() => {
    onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }, [currentIndex, images.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, goPrev, goNext]);

  if (!current) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-black/95 p-4 md:p-6"
        onClick={onClose}
      >
        {/* Top Header Control Bar */}
        <div className="w-full flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl text-foreground font-light">{current.title}</span>
            {categoryLabel && (
              <span className="text-sm uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded border border-accent/20 font-medium">
                {categoryLabel}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {current.exif && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowExif(!showExif);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium uppercase tracking-wider transition-colors border ${
                  showExif
                    ? "bg-accent text-background border-accent"
                    : "bg-card text-muted border-border hover:text-foreground"
                }`}
              >
                <Sliders size={16} />
                <span>EXIF Info</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-foreground/70 transition-colors hover:text-foreground hover:bg-white/10"
              aria-label="Close lightbox"
            >
              <X size={26} />
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full p-3 bg-black/50 text-foreground/80 backdrop-blur-md transition-colors hover:text-foreground hover:bg-black/80"
          aria-label="Previous image"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full p-3 bg-black/50 text-foreground/80 backdrop-blur-md transition-colors hover:text-foreground hover:bg-black/80"
          aria-label="Next image"
        >
          <ChevronRight size={36} />
        </button>

        {/* Center Main Image Container */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative flex-1 w-full max-w-6xl max-h-[75vh] flex items-center justify-center my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-full w-full">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-contain"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </div>
        </motion.div>

        {/* Bottom Metadata & EXIF Bar */}
        <div
          className="w-full max-w-4xl z-20 bg-card/90 backdrop-blur-md border border-border/80 rounded-lg p-5 text-center md:text-left transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {showExif && current.exif ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1.5 text-sm text-foreground/90 font-mono">
                  <span className="flex items-center gap-1.5 text-accent font-semibold">
                    <Camera size={15} />
                    {current.exif.camera}
                  </span>
                  <span>• {current.exif.lens}</span>
                  <span className="text-muted">|</span>
                  <span>{current.exif.aperture}</span>
                  <span>{current.exif.shutter}</span>
                  <span>ISO {current.exif.iso}</span>
                </div>

                {current.exif.location && (
                  <p className="flex items-center justify-center md:justify-start gap-1.5 text-sm text-muted">
                    <MapPin size={14} className="text-accent" />
                    <span>{current.exif.location}</span>
                  </p>
                )}

                {current.story && (
                  <p className="text-sm text-foreground/80 italic line-clamp-2 mt-1 leading-relaxed">
                    &ldquo;{current.story}&rdquo;
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="text-sm text-muted font-mono">
                  {currentIndex + 1} of {images.length}
                </span>
                <Link
                  href="/shop"
                  className="flex items-center gap-2 px-5 py-2.5 rounded bg-accent text-background text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-md"
                >
                  <ShoppingBag size={16} />
                  <span>Order Fine Art Print</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-muted">
              <span>{current.alt}</span>
              <span>
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
