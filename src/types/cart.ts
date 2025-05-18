import { Product } from './product';

export interface CartItem {
  id: string; // ID товара
  quantity: number;
  product: Product;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  totalAmount: number;
  customer: Customer;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentMethod: 'card' | 'cash' | 'telegram' | 'other';
  createdAt: Date;
}