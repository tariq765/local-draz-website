
"use client"
import React, { useState } from 'react';
import { CheckoutFormData } from '../types';

const CheckoutForm: React.FC = () => {
  const [form, setForm] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting checkout form:', form);
    alert('Order placed successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="grid grid-cols-1 gap-4">
        <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} className="input" required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input" required />
        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} className="input" required />
        <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} className="input" required />
        <input type="text" name="postalCode" placeholder="Postal Code" value={form.postalCode} onChange={handleChange} className="input" required />
        <input type="text" name="country" placeholder="Country" value={form.country} onChange={handleChange} className="input" required />
        <input type="text" name="cardNumber" placeholder="Card Number" value={form.cardNumber} onChange={handleChange} className="input" required />
        <input type="text" name="expiry" placeholder="MM/YY" value={form.expiry} onChange={handleChange} className="input" required />
        <input type="text" name="cvv" placeholder="CVV" value={form.cvv} onChange={handleChange} className="input" required />
      </div>

      <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Place Order
      </button>
    </form>
  );
};

export default CheckoutForm;
