import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct, formatPrice, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/SiteChrome";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Not found — Maison Élan" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    const title = `${p.name} — Maison Élan`;
    return {
      meta: [
        { title },
        { name: "description", content: p.description },
        { property: "og:title", content: title },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/product/${params.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.description,
          brand: { "@type": "Brand", name: "Maison Élan" },
          offers: { "@type": "Offer", price: p.price, priceCurrency: "USD", availability: "https://schema.org/InStock" },
        }),
      }],
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

function ProductNotFound() {
  return (
    <div className="py-40 text-center">
      <h1 className="text-5xl">Piece not found</h1>
      <Link to="/shop" className="btn-lux mt-8">Back to Shop</Link>
    </div>
  );
}

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const { add } = useCart();
  const [size, setSize] = useState(p.sizes.length === 1 ? p.sizes[0] : "");
  const [error, setError] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-16 md:grid-cols-2">
        <img src={p.image} alt={p.name} width={800} height={1008} className="aspect-[4/5] w-full bg-card object-cover" />
        <div className="md:sticky md:top-32 md:self-start">
          <p className="eyebrow text-gold">{p.category}</p>
          <h1 className="mt-3 text-5xl md:text-6xl">{p.name}</h1>
          <p className="mt-4 text-xl">{formatPrice(p.price)}</p>
          <p className="mt-8 leading-relaxed text-muted-foreground">{p.description}</p>
          <div className="mt-10">
            <p className="eyebrow">Size</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {p.sizes.map((s) => (
                <button key={s} onClick={() => { setSize(s); setError(false); }}
                  className={`min-w-14 border px-4 py-3 text-sm transition-colors ${size === s ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}>{s}</button>
              ))}
            </div>
            {error && <p className="mt-3 text-sm text-destructive">Please select a size.</p>}
          </div>
          <button onClick={() => (size ? add(p.slug, size) : setError(true))} className="btn-lux mt-10 w-full">Add to Bag</button>
          <ul className="mt-10 space-y-2 border-t pt-8 text-sm text-muted-foreground">
            {p.details.map((d) => <li key={d}>— {d}</li>)}
          </ul>
        </div>
      </div>
      <section className="mt-32">
        <h2 className="mb-12 text-4xl">You may also like</h2>
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {products.filter((x) => x.slug !== p.slug).slice(0, 3).map((x) => <ProductCard key={x.slug} slug={x.slug} />)}
        </div>
      </section>
    </div>
  );
}
