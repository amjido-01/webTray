// app/store/[slug]/_components/header.tsx
"use client";

import { ShoppingCart } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCartStore } from "@/store/use-cart-store";
import CartSidebar from "./cart-sidebar";

export default function StoreHeader() {
  const [showCart, setShowCart] = useState(false);
  const [storeName, setStoreName] = useState("Store");
  const params = useParams();
  const slug = params.slug as string;
  console.log("Store slug in header:", slug);

  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((sum, item) => sum + item.cartQuantity, 0);

  useEffect(() => {
    // Option 1: Format the slug to a readable name
    if (slug) {
      const formattedName = slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setStoreName(formattedName);
    }

    // Option 2: Fetch store data from API (uncomment to use)
    /*
    const fetchStoreName = async () => {
      try {
        const response = await fetch(`/api/stores/${slug}`);
        const data = await response.json();
        setStoreName(data.name || "Store");
      } catch (error) {
        console.error("Error fetching store name:", error);
      }
    };
    
    if (slug) {
      fetchStoreName();
    }
    */
  }, [slug]);

  return (
    <>
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left section */}
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-semibold">{storeName}</h1>
              <nav className="hidden md:flex gap-6">
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Home
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Products
                </button>
              </nav>
            </div>
            {/* Right section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full transition"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition">
                Contact
              </button>
            </div>
          </div>
        </div>
      </header>
      <CartSidebar showCart={showCart} setShowCart={setShowCart} />
    </>
  );
}