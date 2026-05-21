import React from 'react'
import Link from 'next/link'
import Header from '@/components/cursor'

const Home = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-5 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-lg mb-6">Discover amazing products at great prices</p>
        <Link href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block">
          Shop Now
        </Link>
      </div>
    </div>
  )
}

export default Home