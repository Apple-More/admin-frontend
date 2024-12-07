import { Product } from "./ProductType";

export interface Category {
  categoryId: number;
  categoryName: string;
  id: string;
  products: Product[];
}
