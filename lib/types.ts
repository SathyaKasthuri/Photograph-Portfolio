export type GalleryCategory = "weddings" | "portraits" | "events" | "landscapes";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  featured?: boolean;
}

export type GalleriesData = Record<GalleryCategory, GalleryImage[]>;

export interface Testimonial {
  id: string;
  name: string;
  event: string;
  quote: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  weddings: "Weddings",
  portraits: "Portraits",
  events: "Events",
  landscapes: "Landscapes",
};

export const ALL_CATEGORIES: GalleryCategory[] = [
  "weddings",
  "portraits",
  "events",
  "landscapes",
];

export type ProductCategory = GalleryCategory | "fine-art";

export interface ProductVariant {
  id: string;
  label: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: ProductCategory;
  variants: ProductVariant[];
  featured?: boolean;
}

export interface CartItem {
  productId: string;
  productSlug: string;
  productTitle: string;
  variantId: string;
  variantLabel: string;
  price: number;
  image: string;
  quantity: number;
}

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  weddings: "Weddings",
  portraits: "Portraits",
  events: "Events",
  landscapes: "Landscapes",
  "fine-art": "Fine Art",
};
