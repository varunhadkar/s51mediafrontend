// Central SEO config. One place to edit titles/descriptions for every page.
import type { Metadata } from "next";

export const SITE = "https://www.s51media.com";

export const PAGES: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Studio 51 VFX | Full-Pipeline VFX, Concept to Final Render",
    description:
      "Studio 51 VFX is a full-pipeline VFX and animation studio with teams in Mumbai, Hyderabad, Beijing, Shanghai and London. Concept to final render.",
  },
  "/work": {
    title: "VFX Work & Credited Projects | Studio 51 VFX",
    description:
      "Explore credited film, television and streaming projects from Studio 51 VFX, with breakdowns covering compositing, FX, creatures and environments.",
  },
  "/services": {
    title: "VFX Services: Concept to Final Render | Studio 51 VFX",
    description:
      "Concept, previz, matchmove, roto, paint, lighting, animation, FX, environments, DMP, creature work, modelling, rigging, texturing and compositing.",
  },
  "/reels": {
    title: "VFX Showreels & Breakdowns | Studio 51 VFX",
    description:
      "Watch Studio 51 VFX showreels and shot breakdowns across film, television, streaming and games, from matchmove and paint to final composite.",
  },
  "/about": {
    title: "About Studio 51 VFX | VFX Studios in India, China & UK",
    description:
      "Studio 51 VFX is a global VFX studio with teams in Mumbai, Hyderabad, Beijing, Shanghai and London, delivering the full VFX pipeline for screen productions.",
  },
  "/security": {
    title: "Content Security & Compliance | Studio 51 VFX",
    description:
      "Studio 51 VFX is TPN-assessed and vetted by Amazon and Paramount. See how we protect pre-release content across our five studios.",
  },
  "/contact": {
    title: "Contact Studio 51 VFX | Request a VFX Quote or Bid",
    description:
      "Send your script, sequences or schedule to Studio 51 VFX for a quote or bid. Studios in Mumbai, Hyderabad, Beijing, Shanghai and London.",
  },
};

export function buildMetadata(path: string): Metadata {
  const p = PAGES[path];
  const url = `${SITE}${path === "/" ? "" : path}`;
  return {
    title: { absolute: p.title }, // absolute avoids the layout "%s | Studio 51 VFX" template doubling the name
    description: p.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "Studio 51 VFX",
      title: p.title,
      description: p.description,
      images: [{ url: `${SITE}/logo.png` }], // replace with a 1200x630 share image when you have one
    },
    twitter: { card: "summary_large_image", title: p.title, description: p.description },
  };
}
