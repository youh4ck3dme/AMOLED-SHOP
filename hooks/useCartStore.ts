
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartState, Product, CartItem } from '../types';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product: Product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId: number) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },
      increaseQuantity: (productId: number) => {
        set({
          items: get().items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      },
      decreaseQuantity: (productId: number) => {
        set({
          items: get().items
            .map((item) =>
              item.id === productId
                ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                : item
            )
            .filter((item) => item.quantity > 0),
        });
      },
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
