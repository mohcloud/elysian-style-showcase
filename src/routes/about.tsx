import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Maison — Our Story | Maison Élan" },
      { name: "description", content: "Founded on craftsmanship and restraint, Maison Élan partners with European ateliers to create timeless fashion." },
      { property: "og:title", content: "The Maison — Our Story | Maison Élan" },
      { property: "og:description", content: "Craftsmanship, restraint and European ateliers — the story of Maison Élan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <p className="eyebrow text-gold">The Maison</p>
        <h1 className="mt-4 text-6xl leading-tight md:text-7xl">Made slowly. Worn forever.</h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">
          Maison Élan was born from a simple belief: that true luxury is quiet. We work with a small circle of family-run ateliers across Italy and France, choosing the finest natural fibres and leathers to create pieces that transcend seasons.
        </p>
      </section>
      <img src={hero} alt="Maison Élan campaign" width={1600} height={1008} loading="lazy" className="h-[70vh] w-full object-cover" />
      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-28 md:grid-cols-3">
        {[["Material", "Only natural fibres — silk, wool, cashmere and full-grain leather."],
          ["Craft", "Each garment passes through the hands of up to twenty artisans."],
          ["Responsibility", "Small runs, traceable supply chains, and lifetime repairs."]].map(([t, d]) => (
          <div key={t}><h2 className="text-4xl">{t}</h2><p className="mt-4 text-muted-foreground">{d}</p></div>
        ))}
      </section>
    </div>
  );
}
