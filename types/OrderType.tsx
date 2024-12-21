export interface Orders {
  order_id: string;
  created_date_time: string;
  updated_date_time: string;
  order_status: string;
  payment_id: string | null;
  customer_id: string;
  shipping_address_id: string;
  order_items: OrderItem[];
}

interface OrderItem {
  order_item_id: string;
  order_id: string;
  product_variant_id: string;
  quantity: number;
  price: number;
  id: string;
  stock: number;
  productId: string;
  product: Product;
  attributes: Attribute[];
}

interface Product {
  id: string;
  productName: string;
  description: string;
  specification: string;
  categoryId: string;
  adminId: string;
  category: Category;
  images: Image[];
}

interface Category {
  id: string;
  categoryName: string;
}

interface Image {
  id: string;
  imageUrl: string;
  isHero: boolean;
  productId: string;
}

interface Attribute {
  id: string;
  productVariantId: string;
  attributeValueId: string;
  attributeValue: AttributeValue;
}

interface AttributeValue {
  id: string;
  value: string;
  attributeId: string;
  attribute: AttributeName;
}

interface AttributeName {
  id: string;
  name: string;
}
