// store/use-cart-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/hooks/use-customer-store";

export interface CartItem extends Product {
  cartQuantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => boolean;
  updateQuantity: (productId: number, delta: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, quantity = 1) => {
        const state = get();
        const existing = state.cart.find((item) => item.id === product.id);

        if (existing) {
          if (existing.cartQuantity + quantity <= product.quantity) {
            set({
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, cartQuantity: item.cartQuantity + quantity }
                  : item
              ),
            });
            return true;
          }
          return false;
        }

        // New item
        set({
          cart: [...state.cart, { ...product, cartQuantity: quantity }],
        });
        return true;
      },

      updateQuantity: (productId, delta) => {
        set((state) => ({
          cart: state.cart
            .map((item) => {
              if (item.id === productId) {
                const newQuantity = item.cartQuantity + delta;
                if (newQuantity <= 0) return null;
                if (newQuantity > item.quantity) return item;
                return { ...item, cartQuantity: newQuantity };
              }
              return item;
            })
            .filter(Boolean) as CartItem[],
        }));
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      getCartTotal: () => {
        return get().cart.reduce(
          (sum, item) => sum + parseFloat(item.price) * item.cartQuantity,
          0
        );
      },

      getCartCount: () => {
        return get().cart.reduce((sum, item) => sum + item.cartQuantity, 0);
      },
    }),
    {
      name: "shopping-cart-storage",
    }
  )
);
