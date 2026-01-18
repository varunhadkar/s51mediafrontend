'use client';

import { Film, Sparkles, Layers, Video, Glasses, Zap } from 'lucide-react';

const services = [
  {
    icon: Film,
    title: 'Visual Effects',
    description: 'Photorealistic VFX and CGI for film, television, and commercials.',
  },
  {
    icon: Sparkles,
    title: 'Animation',
    description: '2D and 3D character animation with cutting-edge techniques.',
  },
  {
    icon: Glasses,
    title: 'Stereo Conversion',
    description: 'Transform 2D footage into immersive stereoscopic 3D with precise depth mapping and parallax adjustment [web:8][web:11].',
  },
  {
    icon: Video,
    title: 'Motion Graphics',
    description: 'Dynamic motion design for titles, commercials, and digital content.',
  },
  {
    icon: Layers,
    title: 'AI-Powered VFX',
    description: 'Automated rotoscoping, facial animation, crowd simulation, and intelligent object removal using machine learning [web:13][web:15].',
  },
  {
    icon: Zap,
    title: 'Real-Time VFX',
    description: 'Virtual production and real-time rendering for gaming and film.',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-3">
            What We Do
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our Capabilities
          </h2>
          <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
            From concept to final delivery, we offer comprehensive visual effects
            and animation services powered by cutting-edge technology.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-zinc-900">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative p-8 border-r border-b border-zinc-900 
                           bg-gradient-to-br from-black to-zinc-950
                           hover:bg-zinc-100 transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-14 h-14 bg-zinc-900 group-hover:bg-white flex items-center justify-center transition-colors duration-300 border border-zinc-700 group-hover:border-zinc-300">
                    <Icon className="w-7 h-7 text-zinc-200 group-hover:text-black transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-white mb-3 transition-colors">
                  {service.title}
                </h3>
                <p className="text-zinc-400 transition-colors">
                  {service.description}
                </p>

                {/* Hover Arrow */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-6 h-6 text-zinc-400 group-hover:text-black transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
