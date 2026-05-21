'use client';
import Link from 'next/link';
import { Product } from '@/types';
import { useEffect, useState } from 'react';

// Fallback mock products
const mockProducts: Product[] = [
  {
    id: 1,
    title: "Classic T-Shirt",
    price: 29.99,
    description: "Comfortable cotton t-shirt perfect for everyday wear",
    category: "clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
  },
  {
    id: 2,
    title: "Denim Jacket",
    price: 79.99,
    description: "Stylish denim jacket for all seasons",
    category: "clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
  },
  {
    id: 3,
    title: "Casual Sneakers",
    price: 59.99,
    description: "Comfortable sneakers for daily activities",
    category: "shoes",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
  },
  {
    id: 4,
    title: "Backpack",
    price: 49.99,
    description: "Spacious backpack for work or travel",
    category: "accessories",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
  }
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    fetch("https://fakestoreapi.com/products", {
      signal: controller.signal
    })
      .then((res) => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(mockProducts);
          setUsingFallback(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        console.error('Products fetch error:', err);
        // Use fallback data instead of showing error
        setProducts(mockProducts);
        setUsingFallback(true);
        setLoading(false);
      });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-bold text-center mb-8">Featured Products</h1>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-8">Featured Products</h1>
      {usingFallback && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
          <p className="font-bold">Demo Mode</p>
          <p>Showing sample products. Live data temporarily unavailable.</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="bg-white shadow-lg rounded-lg p-5 transition-transform transform hover:scale-105 cursor-pointer">
              <img src={product.image} alt={product.title} className="w-full h-40 object-contain mb-4" />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600 text-sm truncate">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-green-600 font-bold">${product.price}</span>
                <span className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">Buy Now</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
