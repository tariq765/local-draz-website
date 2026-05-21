'use client';
import Link from 'next/link';
import { Product } from '@/types';
import { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Products fetch error:', err);
        setError(true);
        setLoading(false);
      });
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

  if (error || products.length === 0) {
    return (
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-bold text-center mb-8">Featured Products</h1>
        <p className="text-center text-red-600">Unable to load products at the moment.</p>
        <p className="text-center text-gray-500 mt-2">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-8">Featured Products</h1>
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
