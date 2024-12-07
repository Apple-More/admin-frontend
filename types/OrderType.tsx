export interface Orders {
  customerId: string;
  customerName: string;
  totalAmount: number;
  createdAt: string;
  order_status: string;
  date: string;
  email: string;
    sale: number;
    status: string;
    orderItems: OrderItem[];
}

export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
}
