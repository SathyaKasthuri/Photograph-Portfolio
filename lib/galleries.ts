import galleriesData from "@/data/galleries.json";
import {
  ALL_CATEGORIES,
  CATEGORY_LABELS,
  type GalleriesData,
  type GalleryCategory,
  type GalleryImage,
} from "@/lib/types";

const galleries = galleriesData as GalleriesData;

export function getAllCategories() {
  return ALL_CATEGORIES.map((slug) => ({
    slug,
    label: CATEGORY_LABELS[slug],
    count: galleries[slug].length,
  }));
}

export function getImagesByCategory(category: GalleryCategory): GalleryImage[] {
  return galleries[category];
}

export function getAllImages(): (GalleryImage & { category: GalleryCategory })[] {
  return ALL_CATEGORIES.flatMap((category) =>
    galleries[category].map((image) => ({ ...image, category }))
  );
}

export function getFeaturedImages(): (GalleryImage & { category: GalleryCategory })[] {
  return getAllImages().filter((image) => image.featured);
}

export function getCategoryLabel(category: GalleryCategory): string {
  return CATEGORY_LABELS[category];
}

export function isValidCategory(category: string): category is GalleryCategory {
  return ALL_CATEGORIES.includes(category as GalleryCategory);
}
