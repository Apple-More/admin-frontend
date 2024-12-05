import { ProductVariant } from "./ProductVariantType";

export interface Product {
  productName: string;

  description: string;

  category: string[];

  images: string[];

  heroImage: string;

  variants: ProductVariant[];
}
