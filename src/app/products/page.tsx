import Link from 'next/link';
import { Product } from '@/types';

export default async function Products() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();

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
