// app/store/[slug]/_components/cart-sidebar.tsx
"use client";

import React from "react";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useCartStore } from "@/store/use-cart-store";
import { toast } from "sonner";
import Image from "next/image";

interface CartSidebarProps {
  showCart: boolean;
  setShowCart: (show: boolean) => void;
}

export default function CartSidebar({ showCart, setShowCart }: CartSidebarProps) {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  
  // Calculate totals directly from cart
  const cartTotal = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.cartQuantity,
    0
  );
  
  const cartCount = cart.reduce(
    (sum, item) => sum + item.cartQuantity,
    0
  );

  const handleRemoveFromCart = (productId: number, productName: string) => {
    removeFromCart(productId);
    toast.success(`${productName} removed from cart`);
  };

  if (!showCart) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setShowCart(false)}
      ></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">
            Shopping Cart ({cartCount})
          </h2>
          <button
            onClick={() => setShowCart(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Your cart is empty</p>
              <p className="text-gray-500 text-sm mt-2">
                Add products to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => {
                const imageUrl = item.images?.thumbnail || item.images?.main || '';
                const hasValidImage = imageUrl && imageUrl.trim() !== '';
                
                return (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4 border">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-white rounded flex-shrink-0 overflow-hidden border">
                        {hasValidImage ? (
                          <Image
                            width={100}
                            height={100}
                            src={imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <ShoppingCart className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate text-sm">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 font-semibold">
                          ₦{parseFloat(item.price).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 bg-white border rounded hover:bg-gray-50 transition"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-medium w-8 text-center text-sm">
                            {item.cartQuantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 bg-white border rounded hover:bg-gray-50 transition"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRemoveFromCart(item.id, item.name)}
                            className="ml-auto text-red-600 hover:text-red-700 p-1 transition"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                ₦{cartTotal.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => {
                setShowCart(false);
                router.push(`/store/${slug}/checkout`);
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}