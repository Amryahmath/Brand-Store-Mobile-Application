import { NextResponse } from 'next/server';
import { getOrCreateCart, testUser, orders } from '@/lib/store';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { deliveryAddress, paymentMethod } = body;

    if (!deliveryAddress || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get cart
    const cart = getOrCreateCart(testUser.id);

    if (cart.items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const deliveryFee = 12.0;
    const total = subtotal + deliveryFee;

    // Create order
    const order: Order = {
      id: uuidv4(),
      userId: testUser.id,
      items: [...cart.items],
      deliveryAddress,
      paymentMethod,
      subtotal,
      deliveryFee,
      total,
      status: 'confirmed',
      createdAt: new Date(),
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    };

    // Save order
    orders.set(order.id, order);

    // Clear cart
    cart.items = [];
    cart.updatedAt = new Date();

    return NextResponse.json({
      success: true,
      order,
      message: 'Order created successfully',
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Get all orders for test user
  const userOrders = Array.from(orders.values()).filter(
    order => order.userId === testUser.id
  );
  
  return NextResponse.json(userOrders);
}
