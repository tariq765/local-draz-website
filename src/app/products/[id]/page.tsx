'use client';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M'); // 🔹 Default size = Medium
  const [selectedColor, setSelectedColor] = useState('Red'); // 🔴 Default color
  const { addToCart } = useCart();

  const sizes = ['S', 'M', 'L', 'XL', '2XL']; // ✅ Available sizes
  const colors = ['Red', 'Blue', 'Green', 'Black']; // ✅ Available colors

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [params.id]);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-5">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-80 object-contain mb-6"
        />
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <div className="text-xl text-green-600 font-semibold mb-4">
          ${product.price}
        </div>

        {/* 🔘 Size Selector */}
        <div className="mb-4">
          <span className="block mb-1 font-medium">Select Size:</span>
          <div className="flex space-x-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 rounded border ${
                  selectedSize === size
                    ? 'bg-yellow-500 text-white'
                    : 'bg-white text-black border-gray-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* 🔘 Color Selector */}
        <div className="mb-4">
          <span className="block mb-1 font-medium">Select Color:</span>
          <div className="flex space-x-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1 rounded border ${
                  selectedColor === color
                    ? 'bg-black text-white'
                    : 'bg-white text-black border-gray-300'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* 🔘 Quantity Controls */}
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={decreaseQty}
            className="px-3 py-1 bg-gray-200 rounded text-xl"
          >
            -
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={increaseQty}
            className="px-3 py-1 bg-gray-200 rounded text-xl"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
