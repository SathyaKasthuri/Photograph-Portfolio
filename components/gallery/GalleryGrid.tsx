"use client";

import { useState } from "react";
import GalleryCard from "@/components/gallery/GalleryCard";
import Lightbox from "@/components/gallery/Lightbox";
import type { GalleryImage } from "@/lib/types";
import { getCategoryLabel } from "@/lib/galleries";
import type { GalleryCategory } from "@/lib/types";

interface GalleryGridProps {
  images: GalleryImage[];
  category?: GalleryCategory;
}

export default function GalleryGrid({ images, category }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <p className="text-center text-muted py-20">No images in this category yet.</p>
    );
  }

  return (
    <>
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
        {images.map((image, index) => (
          <div key={image.id} className="mb-4 break-inside-avoid">
            <GalleryCard
              image={image}
              onClick={() => setLightboxIndex(index)}
            />
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
          categoryLabel={category ? getCategoryLabel(category) : undefined}
        />
      )}
    </>
  );
}
