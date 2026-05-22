'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/cursor'
import { Product } from '@/types'

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

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

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
          setProducts(data.slice(0, 8)); // Show only first 8 products on home
        } else {
          setProducts(mockProducts);
        }
        setLoading(false);
      })
      .catch(() => {
        clearTimeout(timeoutId);
        setProducts(mockProducts);
        setLoading(false);
      });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-5 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Store</h1>
          <p className="text-xl mb-8">Discover amazing products at great prices</p>
          <Link href="/products" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-block transition">
            View All Products
          </Link>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="container mx-auto p-5">
        <h2 className="text-3xl font-bold text-center mb-8 mt-10">Featured Products</h2>

        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : (
          <>
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

            <div className="text-center mt-10">
              <Link href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block">
                View All Products
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Home