import { Cart, Order, User } from '@/types';

// In-memory storage (will reset on server restart)
export const carts: Map<string, Cart> = new Map();
export const orders: Map<string, Order> = new Map();

// Test user (simulating authentication)
export const testUser: User = {
  id: 'user-1',
  name: 'Test User',
  email: 'test@fashionhub.com',
};

// Helper to get or create cart for user
export function getOrCreateCart(userId: string): Cart {
  let cart = carts.get(userId);
  
  if (!cart) {
    cart = {
      id: `cart-${Date.now()}`,
      userId,
      items: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    carts.set(userId, cart);
  }
  
  return cart;
}
