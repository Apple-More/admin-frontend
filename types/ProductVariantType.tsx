export interface ProductVariant {
  variantId: string;
  price: string;

  stock: string;

  attributes: Record<string, string>;
}
