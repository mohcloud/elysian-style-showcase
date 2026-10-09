import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/SiteChrome";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop the Collection — Maison Élan" },
      { name: "description", content: "Shop luxury outerwear, silk dresses and handcrafted leather accessories from Maison Élan." },
      { property: "og:title", content: "Shop the Collection — Maison Élan" },
      { property: "og:description", content: "Luxury outerwear, silk dresses and handcrafted leather accessories." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});

const cats = ["All", "Outerwear", "Dresses", "Accessories"] as const;

function Shop() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [sort, setSort] = useState("featured");
  let list = cat === "All" ? products : products.filter((p) => p.category === cat);
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <p className="eyebrow text-gold">The Collection</p>
      <h1 className="mt-3 text-6xl">Shop</h1>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-y py-5">
        <div className="flex flex-wrap gap-8">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`eyebrow link-lux ${cat === c ? "text-gold" : ""}`}>{c}</button>
          ))}
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="eyebrow bg-transparent outline-none" aria-label="Sort">
          <option value="featured">Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>
      <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => <ProductCard key={p.slug} slug={p.slug} />)}
      </div>
    </div>
  );
}
