// Usage in app/layout.tsx, inside <body>:  <JsonLd data={organizationSchema} />
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://www.s51media.com/#org",
      name: "Studio 51 VFX",
      alternateName: ["Studio 51", "S51 Media", "S51 Studios", "Studio51VFX"],
      url: "https://www.s51media.com",
      logo: "https://www.s51media.com/logo.png",
      description:
        "Visual effects, animation and creative technology studio for film, television, games and immersive experiences.",
      areaServed: "Worldwide",
      location: [
        { "@type": "Place", name: "Studio 51 VFX Mumbai", address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" } },
        { "@type": "Place", name: "Studio 51 VFX Hyderabad", address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" } },
        { "@type": "Place", name: "Studio 51 VFX Beijing", address: { "@type": "PostalAddress", addressLocality: "Beijing", addressCountry: "CN" } },
        { "@type": "Place", name: "Studio 51 VFX Shanghai", address: { "@type": "PostalAddress", addressLocality: "Shanghai", addressCountry: "CN" } },
        { "@type": "Place", name: "Studio 51 VFX London", address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" } },
      ],
      knowsAbout: ["Visual effects", "Concept design", "Previsualisation", "Matchmove", "Rotoscopy", "Paint", "Lighting", "FX", "Digital matte painting", "Creature animation", "Modelling", "Rigging", "Texturing", "Compositing"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "VFX pipeline services",
        itemListElement: ["Concept design","Previsualisation","Matchmove","Roto animation","Rotoscopy","Paint","Lighting","Animation","FX","Environments","Digital matte painting","Creature animation","Modelling","Rigging","Texturing","Compositing"]
          .map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n, provider: { "@id": "https://www.s51media.com/#org" } } })),
      },
      // FILL IN: email, telephone, foundingDate
      // FILL IN: email, telephone, foundingDate
      sameAs: [
        "https://www.linkedin.com/company/studio51vfx",
        "https://www.instagram.com/studio51vfx/",
        // add YouTube, Vimeo, IMDbPro, Crunchbase, Clutch, Behance once live
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.s51media.com/#website",
      url: "https://www.s51media.com",
      name: "Studio 51 VFX",
      publisher: { "@id": "https://www.s51media.com/#org" },
    },
  ],
};

// Per reel/project page:
export const videoSchema = (v: { name: string; description: string; thumbnail: string; vimeoUrl: string; uploadDate: string }) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: v.name,
  description: v.description,
  thumbnailUrl: v.thumbnail,
  uploadDate: v.uploadDate,
  embedUrl: v.vimeoUrl,
  publisher: { "@id": "https://www.s51media.com/#org" },
});
