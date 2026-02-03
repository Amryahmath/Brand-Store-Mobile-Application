'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types';
import { products } from '@/lib/data';

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedColorImage, setSelectedColorImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [productId, setProductId] = useState<string>('');

  useEffect(() => {
    async function loadParams() {
      const resolvedParams = await params;
      setProductId(resolvedParams.id);
    }
    loadParams();
  }, [params]);

  useEffect(() => {
    if (!productId) return;

    // Find product from static data instead of API fetch
    const foundProduct = products.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Set defaults
      if (foundProduct.sizes.length > 0) setSelectedSize(foundProduct.sizes[2] || foundProduct.sizes[0]); // Default to 'L'
      if (foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0].name);
        setSelectedColorImage(foundProduct.colors[0].image || foundProduct.images[0]);
      }
    }
    
    setLoading(false);
  }, [productId]);

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    setAddingToCart(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product?.id,
          size: selectedSize,
          color: selectedColor,
          quantity: 1,
        }),
      });

      if (!res.ok) throw new Error('Failed to add to cart');

      router.push('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleColorSelect = (color: any) => {
    setSelectedColor(color.name);
    if (color.image) {
      setSelectedColorImage(color.image);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-semibold">Details</h1>
        <button className="p-2 -mr-2">
          <Bookmark className="w-6 h-6" />
        </button>
      </div>

      {/* Product Image */}
      <div className="px-4 mb-6">
        <div className="bg-gray-100 rounded-3xl overflow-hidden relative h-[50vh]">
          <Image
            src={selectedColorImage || product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="px-4 pb-32">
        {/* Title and Colors */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
            <p className="text-gray-500 text-sm">{product.description}</p>
          </div>
          <div className="flex gap-2 ml-4">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorSelect(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor === color.name
                    ? 'border-gray-900 scale-110'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Size Selector */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Size</h3>
          <div className="flex gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 rounded-full font-medium transition-colors ${
                  selectedSize === size
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Price and Add to Cart - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="bg-primary text-white px-12 py-4 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addingToCart ? 'Adding...' : 'Add To Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
