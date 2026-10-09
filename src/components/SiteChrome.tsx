import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { getProduct, formatPrice } from "@/lib/products";

export function Header() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const nav = [
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "Maison" },
    { to: "/contact", label: "Contact" },
  ] as const;
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="bg-primary py-2 text-center text-primary-foreground eyebrow">Complimentary shipping & returns worldwide</div>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <button className="md:hidden eyebrow" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? "Close" : "Menu"}</button>
        <nav className="hidden gap-10 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="eyebrow link-lux" activeProps={{ className: "text-gold" }}>{n.label}</Link>
          ))}
        </nav>
        <Link to="/" className="font-display text-3xl tracking-[0.2em]">MAISON ÉLAN</Link>
        <button onClick={() => setOpen(true)} className="eyebrow link-lux" aria-label="Open bag">Bag ({count})</button>
      </div>
      {menu && (
        <nav className="flex flex-col gap-6 border-t px-6 py-8 md:hidden">
          {nav.map((n) => <Link key={n.to} to={n.to} onClick={() => setMenu(false)} className="font-display text-3xl">{n.label}</Link>)}
        </nav>
      )}
    </header>
  );
}

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, subtotal } = useCart();
  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-primary/40 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-3xl">Your Bag</h2>
          <button onClick={() => setOpen(false)} className="eyebrow">Close</button>
        </div>
        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {items.length === 0 && <p className="text-muted-foreground">Your bag is empty.</p>}
          {items.map((i) => {
            const p = getProduct(i.slug); if (!p) return null;
            return (
              <div key={i.slug + i.size} className="flex gap-4">
                <img src={p.image} alt={p.name} className="h-32 w-24 object-cover" loading="lazy" />
                <div className="flex flex-1 flex-col">
                  <p className="font-display text-xl">{p.name}</p>
                  <p className="text-sm text-muted-foreground">Size {i.size}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center border">
                      <button className="px-3 py-1" onClick={() => setQty(i.slug, i.size, i.qty - 1)} aria-label="Decrease">−</button>
                      <span className="px-2 text-sm">{i.qty}</span>
                      <button className="px-3 py-1" onClick={() => setQty(i.slug, i.size, i.qty + 1)} aria-label="Increase">+</button>
                    </div>
                    <span>{formatPrice(p.price * i.qty)}</span>
                  </div>
                  <button onClick={() => remove(i.slug, i.size)} className="mt-2 self-start text-xs text-muted-foreground underline">Remove</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="space-y-4 border-t p-6">
          <div className="flex justify-between"><span className="eyebrow">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <button disabled={!items.length} className="btn-lux w-full disabled:opacity-40">Checkout</button>
        </div>
      </aside>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-32 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-4xl tracking-[0.2em]">MAISON ÉLAN</p>
          <p className="mt-4 max-w-sm text-sm opacity-70">Timeless pieces, crafted by European ateliers, designed to be worn for a lifetime.</p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="eyebrow text-gold">Explore</p>
          <Link to="/shop" className="block opacity-80 hover:opacity-100">Shop</Link>
          <Link to="/about" className="block opacity-80 hover:opacity-100">The Maison</Link>
          <Link to="/contact" className="block opacity-80 hover:opacity-100">Contact</Link>
        </div>
        <div className="space-y-3 text-sm">
          <p className="eyebrow text-gold">Client Care</p>
          <p className="opacity-80">Shipping & Returns</p>
          <p className="opacity-80">Size Guide</p>
          <p className="opacity-80">care@maisonelan.com</p>
        </div>
      </div>
      <p className="border-t border-primary-foreground/10 py-6 text-center text-xs opacity-50">© {new Date().getFullYear()} Maison Élan. All rights reserved.</p>
    </footer>
  );
}

export function ProductCard({ slug }: { slug: string }) {
  const p = getProduct(slug)!;
  return (
    <Link to="/product/$slug" params={{ slug }} className="group block">
      <div className="overflow-hidden bg-card">
        <img src={p.image} alt={p.name} width={800} height={1008} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <p className="eyebrow text-muted-foreground">{p.category}</p>
          <h3 className="mt-1 text-2xl">{p.name}</h3>
        </div>
        <span className="text-sm">{formatPrice(p.price)}</span>
      </div>
    </Link>
  );
}
