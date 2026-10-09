import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct } from "./products";

export type CartItem = { slug: string; size: string; qty: number };
type Ctx = {
  items: CartItem[];
  add: (slug: string, size: string) => void;
  remove: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<Ctx | null>(null);
const KEY = "maison-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try { const s = localStorage.getItem(KEY); if (s) setItems(JSON.parse(s)); } catch {}
  }, []);
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);

  const add = (slug: string, size: string) => {
    setItems((prev) => {
      const f = prev.find((i) => i.slug === slug && i.size === size);
      return f ? prev.map((i) => (i === f ? { ...i, qty: i.qty + 1 } : i)) : [...prev, { slug, size, qty: 1 }];
    });
    setOpen(true);
  };
  const remove = (slug: string, size: string) => setItems((p) => p.filter((i) => !(i.slug === slug && i.size === size)));
  const setQty = (slug: string, size: string, qty: number) =>
    qty < 1 ? remove(slug, size) : setItems((p) => p.map((i) => (i.slug === slug && i.size === size ? { ...i, qty } : i)));

  const count = items.reduce((a, i) => a + i.qty, 0);
  const subtotal = items.reduce((a, i) => a + (getProduct(i.slug)?.price ?? 0) * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, count, subtotal, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
