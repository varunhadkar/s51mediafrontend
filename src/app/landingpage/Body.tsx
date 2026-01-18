import Image from 'next/image';

import Hero from "../../../public/dneg.webp";

export default function DNEGHero() {
  return (
    <div className="w-full ">
      {/* Heading Section */}
      <div className="text-center py-16 px-4 ">
        <h1 className="text-4xl md:text-5xl lg:text-2xl xl:text-4xl font-black text-gray-900 leading-tight tracking-tight max-w-6xl mx-auto">
          PARTNERING WITH THE WORLD&apos;S MOST VISIONARY <br /> FILMMAKERS TO BRING INCREDIBLE STORIES TO LIFE.
        </h1>
      </div>

      {/* Image/Background Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Next.js Image as background */}
        <Image
          src={Hero} // Replace with your actual image path
          alt="DNEG Background"
          fill
          className="object-cover"
          priority
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-opacity-50 z-10" />
      </div>
    </div>
  );
}
