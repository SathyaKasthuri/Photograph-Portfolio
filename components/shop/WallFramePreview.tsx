"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, Frame } from "lucide-react";

interface WallFramePreviewProps {
  imageSrc: string;
  title: string;
}

const FRAME_STYLES = [
  { id: "walnut", label: "Natural Walnut", borderClass: "border-[16px] border-[#382618] ring-1 ring-black/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)]" },
  { id: "black", label: "Matte Black", borderClass: "border-[16px] border-[#121212] ring-1 ring-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]" },
  { id: "white", label: "Gallery White", borderClass: "border-[16px] border-[#f0f0f0] ring-1 ring-black/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" },
  { id: "canvas", label: "Unframed Canvas", borderClass: "border-0 shadow-[0_25px_60px_rgba(0,0,0,0.7)] ring-1 ring-white/10" },
];

export default function WallFramePreview({ imageSrc, title }: WallFramePreviewProps) {
  const [selectedFrame, setSelectedFrame] = useState(FRAME_STYLES[0]);
  const [isRoomView, setIsRoomView] = useState(true);

  return (
    <div className="bg-card border border-border/70 rounded-xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider">
            <Frame size={16} />
            <span>Interactive Wall Previewer</span>
          </div>
          <h3 className="font-serif text-2xl text-foreground font-light mt-1">
            Frame & Wall Visualization
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRoomView(!isRoomView)}
            className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium uppercase tracking-wider bg-background border border-border text-foreground hover:border-accent transition-colors"
          >
            <Eye size={15} className="text-accent" />
            <span>{isRoomView ? "Solo View" : "Living Room View"}</span>
          </button>
        </div>
      </div>

      {/* Frame Style Selectors */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-sm text-muted uppercase tracking-wider font-mono mr-2 font-medium">Frame Style:</span>
        {FRAME_STYLES.map((frame) => (
          <button
            key={frame.id}
            type="button"
            onClick={() => setSelectedFrame(frame)}
            className={`px-4 py-2 rounded text-sm font-medium transition-all ${
              selectedFrame.id === frame.id
                ? "bg-accent text-background font-semibold shadow-md"
                : "bg-background text-muted border border-border hover:text-foreground"
            }`}
          >
            {frame.label}
          </button>
        ))}
      </div>

      {/* Wall Preview Area */}
      <div
        className={`relative w-full h-[350px] sm:h-[450px] rounded-lg overflow-hidden flex items-center justify-center transition-all ${
          isRoomView
            ? "bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80')] bg-cover bg-center"
            : "bg-[#161616]"
        }`}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-brightness-95" />

        {/* Framed Print */}
        <div
          className={`relative z-10 w-[65%] sm:w-[50%] max-w-[360px] aspect-[4/3] transition-all duration-300 ${selectedFrame.borderClass}`}
        >
          <Image
            src={imageSrc}
            alt={`${title} framed preview`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80vw, 400px"
          />
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-muted italic">
        Fine art museum-quality archival pigment prints on Hahnemühle Photo Rag 308gsm paper.
      </p>
    </div>
  );
}
