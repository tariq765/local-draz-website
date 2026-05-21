"use client";

import { FaFacebook, FaYoutube, FaInstagram, FaWhatsapp, FaTwitter, FaSkype } from "react-icons/fa";
import { motion } from "framer-motion";

const socialLinks = [
  { href: "https://www.facebook.com/profile.php?id=100064853105892", icon: FaFacebook, color: "#1877F2" },
  { href: "https://www.youtube.com/@tariqasghar6893", icon: FaYoutube, color: "#FF0000" },
  { href: "https://www.instagram.com", icon: FaInstagram, color: "#E4405F" },
  { href: "https://wa.me/923402053859", icon: FaWhatsapp, color: "#25D366" },
  { href: "https://twitter.com", icon: FaTwitter, color: "#1DA1F2" },
  { href: "https://www.skype.com", icon: FaSkype, color: "#00AFF0" }
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold">YourCompany</h3>
          <p className="text-gray-400 mt-2">
            Delivering excellence in automotive solutions with trust and quality.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            {["Home", "About Us", "Services", "Contact"].map((link, index) => (
              <li key={index}>
                <a
                  href={`/${link.toLowerCase().replace(/ /g, "")}`}
                  className="text-gray-400 hover:text-white transition"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info & Social Icons */}
        <div>
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <p className="text-gray-400 mt-2">123 Street, City, Country</p>
          <p className="text-gray-400">Email: tariqasghar761@gmail.com</p>
          <p className="text-gray-400">Phone: 03112194928</p>

          {/* Social Media Icons */}
          <div className="flex justify-center md:justify-start mt-4 space-x-4">
            {socialLinks.map(({ href, icon: Icon, color }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-3xl"
                style={{ color }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} YourCompany. All rights reserved.</p>
      </div>
    </footer>
  );
}
