'use client';

export default function ClientsSection() {
  const clients = [
    {
      name: 'HBO',
      logo: './marquee/hbo.png',
    },
    {
      name: 'Amazon Studios',
      logo: './marquee/Amazon_Studios.webp',
    },
    {
      name: 'Warner Bros',
      logo: './marquee/warner_bros.webp',
    },
    {
      name: 'BBC',
      logo: './marquee/BBC_Logo.png',
    },
    {
      name: 'Roku',
      logo: './marquee/Roku.png',
    },
    {
      name: 'Marvel',
      logo: './marquee/marvel.png',
    },
    {
      name: 'Maithari Movies',
      logo: './marquee/maithari_movieslogo.png',
    },
    {
      name: 'Tencent',
      logo: './marquee/tencent_logo.avif',
    },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 45s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        }
      `}</style>

      <section className="bg-black py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-20">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3 md:mb-4">
              Trusted By
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              Our Clients
            </h2>
          </div>

          {/* Marquee Container */}
          <div className="relative w-full overflow-hidden">
            {/* Fade edges - Responsive */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            {/* Marquee track */}
            <div className="flex animate-scroll">
              {/* First set of logos */}
              {clients.map((client, index) => (
                <div
                  key={`first-${index}`}
                  className="flex items-center justify-center mx-8 md:mx-12 lg:mx-16 flex-shrink-0"
                >
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="w-32 h-16 md:w-48 lg:w-56 md:h-24 lg:h-28 object-contain filter grayscale brightness-[0.3] hover:grayscale-0 hover:brightness-100 transition-all duration-500"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {clients.map((client, index) => (
                <div
                  key={`second-${index}`}
                  className="flex items-center justify-center mx-8 md:mx-12 lg:mx-16 flex-shrink-0"
                >
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="w-32 h-16 md:w-48 lg:w-56 md:h-24 lg:h-28 object-contain filter grayscale brightness-[0.3] hover:grayscale-0 hover:brightness-100 transition-all duration-500"
                  />
                </div>
              ))}
              {/* Third set for mobile smooth scrolling */}
              {clients.map((client, index) => (
                <div
                  key={`third-${index}`}
                  className="flex items-center justify-center mx-8 md:mx-12 lg:mx-16 flex-shrink-0 md:hidden"
                >
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="w-32 h-16 object-contain filter grayscale brightness-[0.3] hover:grayscale-0 hover:brightness-100 transition-all duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
