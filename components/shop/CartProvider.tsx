"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/types";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = "lens-and-light-cart";

function getCartItemKey(productId: string, variantId: string) {
  return `${productId}:${variantId}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        Promise.resolve().then(() => {
          if (!cancelled) {
            setItems(parsed);
          }
        });
      }
    } catch {
      Promise.resolve().then(() => {
        if (!cancelled) {
          setItems([]);
        }
      });
    }

    Promise.resolve().then(() => {
      if (!cancelled) {
        setHydrated(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setItems((current) => {
        const existing = current.find(
          (i) =>
            getCartItemKey(i.productId, i.variantId) ===
            getCartItemKey(item.productId, item.variantId)
        );

        if (existing) {
          return current.map((i) =>
            getCartItemKey(i.productId, i.variantId) ===
            getCartItemKey(item.productId, item.variantId)
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }

        return [...current, { ...item, quantity }];
      });
    },
    []
  );

  const removeItem = useCallback((productId: string, variantId: string) => {
    setItems((current) =>
      current.filter(
        (item) =>
          getCartItemKey(item.productId, item.variantId) !==
          getCartItemKey(productId, variantId)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, variantId: string, quantity: number) => {
      if (quantity < 1) {
        removeItem(productId, variantId);
        return;
      }

      setItems((current) =>
        current.map((item) =>
          getCartItemKey(item.productId, item.variantId) ===
          getCartItemKey(productId, variantId)
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, itemCount, subtotal, addItem, removeItem, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
