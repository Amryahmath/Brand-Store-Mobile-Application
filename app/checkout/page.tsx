'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, MapPin } from 'lucide-react';
import { Cart as CartType } from '@/types';

const paymentMethods = [
  { id: 'visa', name: 'Visa', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg' },
  { id: 'amex', name: 'American Express', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg' },
  { id: 'mastercard', name: 'Mastercard', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
  { id: 'paypal', name: 'PayPal', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' },
  { id: 'apple-pay', name: 'Apple Pay', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('visa');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    address: '25/3 Housing Estate, Sylhet',
    city: 'Sylhet',
    zipCode: '',
    country: 'Bangladesh',
  });
  const [orderNote, setOrderNote] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    try {
      const res = await fetch('/api/cart');
      if (!res.ok) throw new Error('Failed to fetch cart');
      const data = await res.json();
      setCart(data);

      if (!data || data.items.length === 0) {
        router.push('/cart');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePayNow() {
    if (!cart || cart.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setProcessing(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deliveryAddress,
          paymentMethod: selectedPayment,
        }),
      });

      if (!res.ok) throw new Error('Failed to create order');

      const data = await res.json();
      
      // Show success message
      alert(`Order #${data.order.id.slice(0, 8)} created successfully! Delivery in 7 days.`);
      
      // Redirect to home
      router.push('/');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setProcessing(false);
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
        <Link href="/cart" className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-semibold">Checkout</h1>
        <div className="w-10" />
      </div>

      <div className="p-4 pb-40">
        {/* Delivery Address */}
        <div className="mb-6">
          <h2 className="text-sm text-gray-500 mb-3">Delivery Address</h2>
          {isEditingAddress ? (
            <div className="p-4 bg-gray-50 rounded-2xl space-y-3">
              <input
                type="text"
                value={deliveryAddress.address}
                onChange={(e) =>
                  setDeliveryAddress({ ...deliveryAddress, address: e.target.value })
                }
                placeholder="Street Address"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                value={deliveryAddress.city}
                onChange={(e) =>
                  setDeliveryAddress({ ...deliveryAddress, city: e.target.value })
                }
                placeholder="City"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditingAddress(false)}
                  className="flex-1 py-2 bg-primary text-white rounded-lg font-medium"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditingAddress(false)}
                  className="flex-1 py-2 bg-white border border-gray-200 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold mb-1">{deliveryAddress.address}</p>
                <p className="text-sm text-gray-500">{deliveryAddress.city}</p>
              </div>
              <button
                onClick={() => setIsEditingAddress(true)}
                className="text-sm text-primary font-medium"
              >
                Change
              </button>
            </div>
          )}
          <p className="text-sm text-gray-500 mt-3">
            Delivered in next <span className="font-semibold">7 days</span>
          </p>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h2 className="text-sm text-gray-500 mb-3">Payment Method</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl border-2 transition-all ${
                  selectedPayment === method.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="relative w-12 h-8">
                  <Image
                    src={method.logo}
                    alt={method.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Voucher */}
        <div className="mb-6">
          <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-2xl text-sm font-medium text-gray-700">
            Add Voucher
          </button>
        </div>

        {/* Note */}
        <div className="mb-6">
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
            <p className="text-sm">
              <span className="font-semibold">Note:</span> Use your order id at the payment. Your Id{' '}
              <span className="font-semibold">#154619</span> if you forget to put your order id we
              can't confirm the payment.
            </p>
          </div>
        </div>

      </div>

      {/* Summary and Pay Now - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Items ({cart?.items.length || 0})</span>
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

          {/* Pay Now Button */}
          <button
            onClick={handlePayNow}
            disabled={processing}
            className="w-auto mx-auto block bg-primary hover:bg-primary-dark text-white px-12 py-4 rounded-full font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
