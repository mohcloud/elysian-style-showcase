import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";

export type Product = {
  slug: string;
  name: string;
  price: number;
  category: "Outerwear" | "Dresses" | "Accessories";
  image: string;
  description: string;
  details: string[];
  sizes: string[];
};

export const products: Product[] = [
  { slug: "camel-wool-blazer", name: "Camel Wool Blazer", price: 1290, category: "Outerwear", image: p1,
    description: "A single-breasted blazer cut from double-faced Italian camel wool, softly sculpted at the waist.",
    details: ["100% virgin wool", "Silk-cupro lining", "Made in Italy", "Dry clean only"], sizes: ["XS", "S", "M", "L", "XL"] },
  { slug: "noir-silk-slip-dress", name: "Noir Silk Slip Dress", price: 890, category: "Dresses", image: p2,
    description: "Bias-cut from heavyweight silk charmeuse with a fluid cowl neckline and delicate straps.",
    details: ["100% mulberry silk", "Adjustable straps", "Made in France", "Hand wash cold"], sizes: ["XS", "S", "M", "L"] },
  { slug: "cognac-top-handle-bag", name: "Cognac Top-Handle Bag", price: 2150, category: "Accessories", image: p3,
    description: "Structured grained calfskin with a polished gold turn-lock, handcrafted by artisans in Florence.",
    details: ["Grained calfskin", "Gold-tone hardware", "Suede interior", "Dust bag included"], sizes: ["One Size"] },
  { slug: "tailored-camel-jacket", name: "Tailored Camel Jacket", price: 1180, category: "Outerwear", image: p1,
    description: "A lighter-weight take on our signature blazer, ideal for transitional seasons.",
    details: ["Wool-cashmere blend", "Horn buttons", "Made in Italy"], sizes: ["XS", "S", "M", "L"] },
  { slug: "evening-column-gown", name: "Evening Column Gown", price: 1450, category: "Dresses", image: p2,
    description: "A floor-length column in liquid satin with a discreet side slit.",
    details: ["Silk satin", "Side slit", "Made in France"], sizes: ["XS", "S", "M", "L"] },
  { slug: "florence-mini-bag", name: "Florence Mini Bag", price: 1690, category: "Accessories", image: p3,
    description: "Our iconic top-handle silhouette, refined to an elegant compact size.",
    details: ["Calfskin leather", "Detachable strap", "Made in Italy"], sizes: ["One Size"] },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
