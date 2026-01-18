'use client';

import Image from 'next/image';
import bgImage from "../../public/studio51Banner2.png";

export default function ContactHero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Image Wrapper with inline styles */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      >
        <Image
          src={bgImage}
          alt="Contact Hero"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      
      {/* Dark Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1
        }}
      />

      {/* Hero Text */}
      <div className="relative z-20 flex items-center justify-center h-full px-6">
        <div className="text-center text-white max-w-5xl">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold leading-tight mb-4">
            S51 Studios brings heart and depth to storytelling,
            <br />
            pushing the boundaries of technology and imagination.
          </h1>
          {/* Decorative Line */}
          <div className="w-56 md:w-96 h-[2px] bg-gradient-to-r from-white to-white mx-auto mt-8" />
        </div>
      </div>
    </section>
  );
}
