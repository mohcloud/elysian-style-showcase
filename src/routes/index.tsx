import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import p2 from "@/assets/p2.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/SiteChrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Élan — Luxury Fashion & Timeless Design" },
      { name: "description", content: "Discover Maison Élan: luxury outerwear, silk dresses and Italian leather goods crafted by European ateliers." },
      { property: "og:title", content: "Maison Élan — Luxury Fashion & Timeless Design" },
      { property: "og:description", content: "Luxury outerwear, silk dresses and Italian leather goods crafted by European ateliers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative h-[88vh] min-h-[560px] overflow-hidden">
        <img src={hero} alt="Model wearing an ivory silk coat" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover object-[60%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-primary/10 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20 text-primary-foreground">
          <p className="eyebrow animate-rise">Autumn / Winter 2026</p>
          <h1 className="mt-4 max-w-2xl text-6xl leading-[0.95] animate-rise md:text-8xl" style={{ animationDelay: ".15s" }}>The Art of Quiet Luxury</h1>
          <div className="mt-10 animate-rise" style={{ animationDelay: ".3s" }}>
            <Link to="/shop" className="btn-ghost-lux">Discover the Collection</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="eyebrow text-gold">Curated</p>
            <h2 className="mt-3 text-5xl">New Arrivals</h2>
          </div>
          <Link to="/shop" className="eyebrow link-lux">View all</Link>
        </div>
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((p) => <ProductCard key={p.slug} slug={p.slug} />)}
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-28 md:grid-cols-2">
          <img src={p2} alt="Noir silk slip dress" width={800} height={1008} loading="lazy" className="aspect-[4/5] w-full object-cover" />
          <div>
            <p className="eyebrow text-gold">The Evening Edit</p>
            <h2 className="mt-4 text-5xl leading-tight md:text-6xl">Silk that moves like water</h2>
            <p className="mt-6 max-w-md text-muted-foreground">Bias-cut in French ateliers from the finest mulberry silk — each piece drapes, catches the light, and becomes yours.</p>
            <Link to="/shop" className="btn-lux mt-10">Shop Dresses</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-28 text-center md:grid-cols-3">
        {[["Crafted in Europe", "Every piece is made by family ateliers in Italy and France."],
          ["Complimentary Delivery", "Express shipping and returns on every order, worldwide."],
          ["Lifetime Care", "Repairs and alterations offered for as long as you own it."]].map(([t, d]) => (
          <div key={t}>
            <h3 className="text-3xl">{t}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
    </>
  );
}
