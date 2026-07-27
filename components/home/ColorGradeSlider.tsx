"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { SlidersHorizontal, Sparkles } from "lucide-react";

export default function ColorGradeSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="bg-background py-24 border-y border-border/50">
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Post-Processing Craftsmanship</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground font-light">
              RAW vs. Cinematic Color Grade
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-muted max-w-md text-base md:text-lg leading-relaxed">
            Every photograph undergoes meticulous hand color grading and tonal calibration to transform raw sensor data into timeless, filmic art.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative h-[450px] md:h-[600px] w-full overflow-hidden rounded-lg cursor-ew-resize select-none shadow-2xl border border-border"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* After (Final Edit) */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85"
              alt="Final edited photography color grade"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3.5 py-2 rounded text-sm font-medium uppercase tracking-widest text-accent border border-accent/30 shadow-lg">
              Final Color Grade
            </div>
          </div>

          {/* Before (Unedited RAW) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="absolute inset-0" style={{ width: "100vw" }}>
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=40&sat=-40&con=-20"
                alt="Flat unedited camera RAW file"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-md px-3.5 py-2 rounded text-sm font-medium uppercase tracking-widest text-muted border border-border shadow-lg">
              Unedited Camera RAW
            </div>
          </div>

          {/* Slider Line Divider */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-accent/90 cursor-ew-resize shadow-[0_0_15px_rgba(201,169,110,0.8)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-accent text-background flex items-center justify-center shadow-xl border-2 border-background">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center text-sm text-muted gap-2 font-medium">
          <span>Drag or swipe left/right to compare raw vs edited tones</span>
        </div>
      </div>
    </section>
  );
}
