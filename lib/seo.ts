// Central SEO config. One place to edit titles/descriptions for every page.
import type { Metadata } from "next";

export const SITE = "https://www.s51media.com";

export const PAGES: Record<string, { title: string; description: string }> = {
  "/": {
    title: "S51 Media | Full-Pipeline VFX Studio, Concept to Final Render",
    description:
      "S51 Media is a VFX and animation studio with teams in Mumbai, Hyderabad, Beijing, Shanghai and London. Full pipeline from concept to final render.",
  },
  "/work": {
    title: "VFX Work & Credited Projects | S51 Media",
    description:
      "Explore credited film, television and streaming projects from S51 Media, with VFX breakdowns covering compositing, FX, creatures and environments.",
  },
  "/services": {
    title: "VFX Services: Concept to Final Render | S51 Media",
    description:
      "Concept, previz, matchmove, roto, paint, lighting, animation, FX, environments, DMP, creature work, modelling, rigging, texturing and compositing.",
  },
  "/reels": {
    title: "VFX Showreels & Breakdowns | S51 Media",
    description:
      "Watch S51 Media showreels and shot breakdowns across film, television, streaming and games, from matchmove and paint through final composite.",
  },
  "/about": {
    title: "About S51 Media | VFX Studio in Mumbai, Beijing & London",
    description:
      "S51 Media is a global VFX studio with teams in Mumbai, Hyderabad, Beijing, Shanghai and London, delivering the full VFX pipeline for screen productions.",
  },
  "/contact": {
    title: "Contact S51 Media | Request a VFX Quote or Bid",
    description:
      "Send your script, sequences or schedule to S51 Media for a VFX quote or bid. Studios in Mumbai, Hyderabad, Beijing, Shanghai and London.",
  },
};

export function buildMetadata(path: string): Metadata {
  const p = PAGES[path];
  const url = `${SITE}${path === "/" ? "" : path}`;
  return {
    title: { absolute: p.title }, // absolute avoids the layout "%s | S51 Media" template doubling the name
    description: p.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "S51 Media",
      title: p.title,
      description: p.description,
      images: [{ url: `${SITE}/logo.png` }], // replace with a 1200x630 share image when you have one
    },
    twitter: { card: "summary_large_image", title: p.title, description: p.description },
  };
}
