"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { CartItem, Dish } from "@/lib/types";

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  add: (dish: Dish) => void;
  remove: (dishId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (dish: Dish) =>
    setItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });

  const remove = (dishId: string) =>
    setItems((prev) =>
      prev
        .map((item) =>
          item.dish.id === dishId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );

  const clear = () => setItems([]);

  const value = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce(
      (sum, item) => sum + item.quantity * item.dish.price,
      0,
    );
    return { items, count, total, add, remove, clear };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
