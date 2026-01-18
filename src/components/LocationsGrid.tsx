'use client';

import Image, { StaticImageData } from 'next/image';
import losAngeles from '../../public/los-angeles.png';
import newYork from '../../public/new-york.png';
import toronto from '../../public/toronto.png';
import vancouver from '../../public/vancouver.png';

interface Location {
  name: string;
  image: StaticImageData; // Changed from string to StaticImageData
}

const locations: Location[] = [
  { name: 'MUMBAI', image: losAngeles },
  { name: 'SHANGHAI', image: newYork },
  { name: 'HYDERABAD', image: toronto },
  { name: 'LOS ANGELES', image: vancouver },
];

export default function LocationsGrid() {
  return (
    <section className="bg-black py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 max-w-7xl mx-auto">
        {locations.map((location) => (
          <div
            key={location.name}
            className="relative h-64 group overflow-hidden cursor-pointer"
          >
            {/* Location Image */}
            <Image
              src={location.image}
              alt={location.name}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-500 group-hover:scale-110"
              priority={false}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 z-10" />
            
            {/* Location Name */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <h3 className="text-white text-2xl md:text-3xl font-bold tracking-wider">
                {location.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
