'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Heart, Trash2 } from 'lucide-react';
import { Cart as CartType, CartItem } from '@/types';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    try {
      const res = await fetch('/api/cart');
      if (!res.ok) throw new Error('Failed to fetch cart');
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(itemId: string) {
    try {
      const res = await fetch(`/api/cart?itemId=${itemId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to remove item');
      await fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item');
    }
  }

  const subtotal = cart?.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ) || 0;
  const deliveryFee = 12.0;
  const total = subtotal + deliveryFee;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Link href="/" className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-semibold">Cart</h1>
        <div className="w-10" />
      </div>

      {/* Cart Items */}
      <div className="p-4 pb-32">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>

        {!cart || cart.items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link
              href="/"
              className="inline-block bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cart.items.map((item: CartItem) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-32 h-40 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.product.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">
                      {item.color}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">Size {item.size}</p>
                    <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{item.quantity}x</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary - Fixed at bottom */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
              <div className="max-w-md mx-auto">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Items ({cart.items.length})</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Standard Delivery</span>
                    <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Payment</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => router.push('/checkout')}
                  className="w-auto mx-auto block bg-primary hover:bg-primary-dark text-white px-12 py-4 rounded-full font-semibold transition-colors"
                >
                  Checkout Now
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
