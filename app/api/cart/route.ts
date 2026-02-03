import { NextResponse } from 'next/server';
import { getOrCreateCart, testUser } from '@/lib/store';
import { products } from '@/lib/data';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  // Get cart for test user (in production, get from session)
  const cart = getOrCreateCart(testUser.id);
  return NextResponse.json(cart);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, size, color, quantity = 1 } = body;

    if (!productId || !size || !color) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find product
    const product = products.find(p => p.id === productId);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Get or create cart
    const cart = getOrCreateCart(testUser.id);

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => 
        item.productId === productId && 
        item.size === size && 
        item.color === color
    );

    if (existingItemIndex >= 0) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        id: uuidv4(),
        productId,
        product,
        size,
        color,
        quantity,
        price: product.price,
      });
    }

    cart.updatedAt = new Date();

    return NextResponse.json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('itemId');

    if (!itemId) {
      return NextResponse.json(
        { error: 'Item ID is required' },
        { status: 400 }
      );
    }

    const cart = getOrCreateCart(testUser.id);
    cart.items = cart.items.filter(item => item.id !== itemId);
    cart.updatedAt = new Date();

    return NextResponse.json(cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json(
      { error: 'Failed to remove item from cart' },
      { status: 500 }
    );
  }
}
