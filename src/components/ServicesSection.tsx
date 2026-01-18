"use client";

interface Service {
  title: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    title: "ON‑SET VFX SUPERVISION",
    description:
      "Our VFX supervisors provide technical and creative guidance from prep through final delivery, ensuring the director's vision is realized on schedule and within budget.",
    image: "./services-section/OnsetVFXSupervision.png",
  },
  {
    title: "CONCEPT ART",
    description:
      "Our concept artists collaborate with directors and production design to define the visual language of each project, exploring worlds, key moments, and iconic imagery.",
    image: "./services-section/ConceptArt.png",
  },
  {
    title: "PREVIS / TECHVIS",
    description:
      "Previsualization helps filmmakers explore camera, staging, and action before the shoot, de‑risking complex sequences and aligning every department.",
    image: "./services-section/PREVIZ.png",
  },
  {
    title: "3D TRACKING",
    description:
      "Accurate camera tracking and on‑set data capture let us integrate CG elements seamlessly, matching lens, movement, and perspective down to the pixel.",
    image: "./services-section/3DTracking.png",
  },
  {
    title: "CG ENVIRONMENTS",
    description:
      "From subtle set extensions to fully digital worlds, our environment team blends matte painting and 3D to create photoreal landscapes and cities.",
    image: "./services-section/CgEnvironments.png",
  },
  {
    title: "3D CONVERSION",
    description:
      "We convert 2D plates into immersive stereo experiences, crafting depth that supports story and composition rather than distracting from it.",
    image: "./services-section/3DCONVERSION.png",
  },
  {
    title: "VIRTUAL PRODUCTION",
    description:
      "We support LED and in‑camera VFX workflows, building real‑time environments and tools that let filmmakers see final‑quality worlds on set.",
    image: "./services-section/VirtualProduction.png",
  },

  // New 3D MODELING service
  {
    title: "3D MODELING",
    description:
      "Our modeling team builds highly detailed assets for characters, props, and environments, ready for rigging, look‑dev, and final‑pixel rendering across any pipeline.",
    image: "./services-section/3DMODELING.png",
  },

  {
    title: "3D ANIMATION",
    description:
      "Character and creature performance, vehicles, and cameras – our animators bring believable motion and personality to every shot.",
    image: "./services-section/3DANIMATION.png",
  },
  {
    title: "CREATURES",
    description:
      "From anatomical design to muscle, skin, and fur, we create creatures that feel grounded in the world while still pushing the fantastic.",
    image: "./services-section/CREATURES.png",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-black text-white py-20 px-6 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-sm md:text-base tracking-[0.3em] uppercase text-zinc-400 mb-3">
            SERVICE
          </h2>
          <div className="h-px w-16 bg-white mx-auto mb-6" />
          <p className="text-sm text-zinc-500 max-w-xl mx-auto">
            End‑to‑end visual effects and animation services for film, episodic,
            and brands.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
          {services.map((service) => (
            <article key={service.title}>
              {/* Image */}
              <div className="h-56 md:h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  width={1000}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title bar */}
              <div className="mt-2 border border-zinc-600 px-4 py-3 text-sm font-semibold tracking-[0.2em] uppercase bg-black">
                {service.title}
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
