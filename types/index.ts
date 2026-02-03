export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'men' | 'women' | 'kids' | 'other';
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  stock: number;
}

export interface ProductColor {
  name: string;
  value: string;
  image?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  deliveryAddress: DeliveryAddress;
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  createdAt: Date;
  deliveryDate?: Date;
}

export interface DeliveryAddress {
  address: string;
  city: string;
  zipCode?: string;
  country?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
