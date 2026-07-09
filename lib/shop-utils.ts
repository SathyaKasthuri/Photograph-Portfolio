import type { ProductCategory } from "@/lib/types";

const PRODUCT_CATEGORIES: ProductCategory[] = [
  "weddings",
  "portraits",
  "events",
  "landscapes",
  "fine-art",
];

export function isValidProductCategory(
  category: string
): category is ProductCategory {
  return PRODUCT_CATEGORIES.includes(category as ProductCategory);
}
