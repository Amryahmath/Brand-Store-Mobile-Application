import Link from 'next/link';
import Image from 'next/image';
import { Grid2X2, Search, ShoppingCart, Settings } from 'lucide-react';

export default async function ExplorePage() {
  // Fetch products from API
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products`, {
    cache: 'no-store',
  });
  const products = await res.json();

  const categories = [
    { id: 'all', label: 'All', active: true },
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'kids', label: 'Kids' },
    { id: 'other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Grid2X2 className="w-6 h-6" />
        <Search className="w-6 h-6" />
      </div>

      {/* Title */}
      <div className="px-4 mb-6">
        <h1 className="text-3xl font-bold mb-1">Explore</h1>
        <p className="text-gray-500 text-sm">Best trendy collection!</p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 px-4 mb-6 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              category.active
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4 px-4">
        {products.map((product: any) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group"
          >
            <div className="bg-gray-100 rounded-3xl overflow-hidden mb-3 relative aspect-[3/4]">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors">
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{product.name}</p>
              <p className="font-semibold">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Link href="/explore" className="flex flex-col items-center gap-1 text-primary">
            <Grid2X2 className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link href="/search" className="flex flex-col items-center gap-1 text-gray-400">
            <Search className="w-6 h-6" />
            <span className="text-xs">Search</span>
          </Link>
          <Link href="/cart" className="flex flex-col items-center gap-1 text-gray-400">
            <ShoppingCart className="w-6 h-6" />
            <span className="text-xs">Cart</span>
          </Link>
          <Link href="/settings" className="flex flex-col items-center gap-1 text-gray-400">
            <Settings className="w-6 h-6" />
            <span className="text-xs">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
