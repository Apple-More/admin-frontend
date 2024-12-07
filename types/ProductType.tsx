import { ProductImage } from "./ProductImageType";
import { ProductVariant } from "./ProductVariantType";

export interface Product {
  id: string;
  productName: string;
  description: string;
  specification: string | null;
  categoryId: string;
  adminId: string;
  images: ProductImage[];
  variants: ProductVariant[];
}
