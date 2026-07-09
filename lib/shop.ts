import productsData from "@/data/products.json";
import type { Product, ProductCategory } from "@/lib/types";

const products = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((product) => product.category === category);
}

export function getProductCategories(): ProductCategory[] {
  const categories = new Set(products.map((product) => product.category));
  return Array.from(categories);
}

export function getAllProductSlugs(): string[] {
  return products.map((product) => product.slug);
}
