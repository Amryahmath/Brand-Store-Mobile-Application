import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Tagerine Shirt',
    description: 'A premium quality shirt with elegant floral design perfect for casual and semi-formal occasions. Made with breathable fabric for all-day comfort.',
    price: 257.85,
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Cream', value: '#F5E6D3', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80' },
      { name: 'Navy', value: '#1B3A6B', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80' },
      { name: 'Olive', value: '#556B2F', image: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe29?w=800&q=80' },
    ],
    stock: 50,
  },
  {
    id: '2',
    name: 'Tagerine Shirt',
    description: 'Classic tagerine shirt with modern fit. Perfect for any occasion.',
    price: 240.32,
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Blue', value: '#4A90E2' },
    ],
    stock: 30,
  },
  {
    id: '3',
    name: 'Leather Court',
    description: 'Premium leather court jacket for a sophisticated look.',
    price: 325.36,
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pink', value: '#D4A5A5' },
      { name: 'Black', value: '#000000' },
    ],
    stock: 20,
  },
  {
    id: '4',
    name: 'Leather Tagerine Court',
    description: 'Elegant leather court with tagerine accents.',
    price: 257.85,
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Tan', value: '#D2B48C' },
    ],
    stock: 15,
  },
  {
    id: '5',
    name: 'Tagerine Shirt',
    description: 'Comfortable and stylish shirt for everyday wear.',
    price: 126.47,
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Orange', value: '#FF8C42' },
    ],
    stock: 40,
  },
];
