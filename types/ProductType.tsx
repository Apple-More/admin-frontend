import { ProductVariant } from "./ProductVariantType";

export interface Product {
  productId: string;
  productName: string;

  description: string;

  category: string[];

  images: string[];

  heroImage: string;

  variants: ProductVariant[];
}
