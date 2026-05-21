'use client';
import { useCart } from '@/context/CartContext';


import Link from 'next/link'; // ✅ Import Link for routing
<Link href="/checkout">
  <span className="text-blue-500 underline cursor-pointer">Proceed to Checkout</span>
</Link>


export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-2">
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p>${item.price} × {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          {/* ✅ Proceed to Checkout button */}
          <div className="mt-6 text-right">
            <Link href="/checkout">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
