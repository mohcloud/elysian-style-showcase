import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Client Care & Contact — Maison Élan" },
      { name: "description", content: "Contact Maison Élan client care for styling advice, orders, returns and private appointments." },
      { property: "og:title", content: "Client Care & Contact — Maison Élan" },
      { property: "og:description", content: "Styling advice, orders, returns and private appointments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const field = "w-full border-b bg-transparent py-3 outline-none focus:border-primary";
  return (
    <div className="mx-auto grid max-w-6xl gap-20 px-6 py-24 md:grid-cols-2">
      <div>
        <p className="eyebrow text-gold">Client Care</p>
        <h1 className="mt-3 text-6xl">Get in touch</h1>
        <p className="mt-6 text-muted-foreground">Our advisors are available Monday to Saturday, 9am – 7pm, for styling advice, orders and private appointments.</p>
        <div className="mt-10 space-y-2 text-sm">
          <p>care@maisonelan.com</p>
          <p>+1 (212) 555 0148</p>
          <p>12 Rue Saint-Honoré, Paris</p>
        </div>
      </div>
      {sent ? (
        <div className="flex items-center"><p className="font-display text-3xl">Thank you — we'll be in touch shortly.</p></div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-8">
          <input required placeholder="Name" maxLength={100} className={field} aria-label="Name" />
          <input required type="email" placeholder="Email" maxLength={255} className={field} aria-label="Email" />
          <textarea required placeholder="Message" rows={5} maxLength={1000} className={field} aria-label="Message" />
          <button className="btn-lux">Send Message</button>
        </form>
      )}
    </div>
  );
}
