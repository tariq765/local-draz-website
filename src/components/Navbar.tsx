"use client";
import { useState } from "react";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/context/CartContext"; // Cart context

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#334155] text-white shadow-xl">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center h-auto">
        <h1 className="text-3xl font-extrabold tracking-widest uppercase font-serif text-white hover:text-cyan-400 transition-all duration-300">
          tariq asghar
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center relative text-lg font-medium h-auto">
          <Link href="/" className="hover:text-cyan-300 transition-all duration-300">Home</Link>
          <Link href="/products" className="hover:text-cyan-300 transition-all duration-300">Products</Link>
          <Link href="/about" className="hover:text-cyan-300 transition-all duration-300">About</Link>
          <Link href="/contact" className="hover:text-cyan-300 transition-all duration-300">Contact</Link>
          <Link href="/feedback" className="hover:text-cyan-300 transition-all duration-300">Feedback</Link>
          <Link href="/services" className="hover:text-cyan-300 transition-all duration-300">Services</Link>

          {/* Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center space-x-1 hover:text-cyan-300 transition-all duration-300">
              <span>Policy</span>
              <FaCaretDown />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full mt-3 backdrop-blur-sm bg-white/10 text-white shadow-xl rounded-md w-48 z-50 border border-white/20">
                <Link href="/policy/healthpolicy" className="block px-4 py-3 hover:bg-white/20 transition-all duration-300">Health Policy</Link>
                <Link href="/policy/wealthpolicy" className="block px-4 py-3 hover:bg-white/20 transition-all duration-300">Wealth Policy</Link>
                <Link href="/policy/salarypolicy" className="block px-4 py-3 hover:bg-white/20 transition-all duration-300">Salary Policy</Link>
              </div>
            )}
          </div>

          {/* ✅ Cart Icon with Count */}
          <Link href="/cart" className="hover:text-cyan-300 transition-all duration-300 relative flex items-center">
            <FiShoppingCart size={22} className="mr-1" />
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <MdMenu size={30} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1e293b] px-6 pb-4 text-white space-y-2 text-base">
          <Link href="/" className="block py-2 hover:text-cyan-300 transition">Home</Link>
          <Link href="/products" className="block py-2 hover:text-cyan-300 transition">Products</Link>
          <Link href="/about" className="block py-2 hover:text-cyan-300 transition">About</Link>
          <Link href="/contact" className="block py-2 hover:text-cyan-300 transition">Contact</Link>
          <Link href="/feedback" className="block py-2 hover:text-cyan-300 transition">Feedback</Link>
          <Link href="/services" className="block py-2 hover:text-cyan-300 transition">Services</Link>

          {/* Dropdown in mobile */}
          <div className="pt-2">
            <span className="block text-white font-semibold">Policy</span>
            <Link href="/policy/healthpolicy" className="block pl-4 py-1 hover:text-cyan-300 transition">Health Policy</Link>
            <Link href="/policy/wealthpolicy" className="block pl-4 py-1 hover:text-cyan-300 transition">Wealth Policy</Link>
            <Link href="/policy/salarypolicy" className="block pl-4 py-1 hover:text-cyan-300 transition">Salary Policy</Link>
          </div>

          {/* ✅ Mobile Cart Icon with Count */}
          <Link href="/cart" className="flex items-center pt-4 hover:text-cyan-300 transition relative">
            <FiShoppingCart className="mr-2" />
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
