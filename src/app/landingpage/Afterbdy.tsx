'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import santa from "../../../public/santa.webp";
import dusrasanta from "../../../public/dusrasanta.webp";
import tisrasanta from "../../../public/tisrasanta.webp";

export default function DnegLayoutClone() {
  return (
    <div className="bg-[#f6f5e8] text-[#3c3c3c] px-6 py-12 font-sans">
      {/* Section 1 */}
      <div className="max-w-5xl mx-auto">
        <p className="text-base leading-relaxed">
          <strong>We are DNEG</strong> – delivering award-winning visual effects, animation, and
          creative technologies for film, TV, and immersive content.
        </p>

        <p className="mt-4 text-base leading-relaxed">
          We have over 25 years of industry experience and relationships, and we are honoured to have
          won eight Academy Awards® for {"'Best VFX'"} since 2011.
        </p>

        <p className="mt-4 text-base leading-relaxed">
          We thrive on the creative energy that true collaboration generates. In all of our most
          successful partnerships – be it with Christopher Nolan, Denis Villeneuve, Bong Joon-ho, or
          a host of other visionary directors that we are proud to work with – deep collaboration from
          the very outset is key.
        </p>
      </div>

      {/* Section 2 - 3 stacked image layout */}
      <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-2 gap-8">
        {/* Left Column: Text */}
        <div className="col-span-1">
          <p className="text-lg md:text-xl font-medium leading-relaxed">
            We are proud to partner with the world&apos;s most visionary filmmakers, content creators,
            studios and brands to bring their incredible stories to life.
          </p>
        </div>

        {/* Right Column: 3 stacked image cards */}
        <div className="col-span-1 flex flex-col gap-8">
          {/* Card 1 */}
          <div className="relative w-fit">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Image
                src={santa}
                alt="That Christmas"
                width={400}
                height={350}
                className="rounded"
              />
            </motion.div>
            <p className="absolute bottom-2 right-2 text-xs md:text-sm text-black bg-opacity-60 px-2 py-1 rounded">
              Recently Released
            </p>
            <p className="mt-1 text-xs md:text-sm text-gray-600">Simon Otto</p>
            <p className="text-base md:text-xl font-bold text-black leading-none">THAT CHRISTMAS</p>
          </div>

          {/* Card 2 */}
          <div className="relative w-fit mt-4 lg:ml-[-420px] lg:mt-[-180px]">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Image
                src={dusrasanta}
                alt="The Last of Us - Season 2"
                width={400}
                height={200}
                className="rounded"
              />
            </motion.div>
            <p className="absolute bottom-2 right-2 text-xs md:text-sm text-black bg-opacity-60 px-2 py-1 rounded">
              Recently Released
            </p>
            <p className="mt-1 text-xs md:text-sm text-gray-600">Craig Mazin, Neil Druckmann</p>
            <p className="text-base md:text-lg font-bold text-red-600 leading-tight">
              THE LAST OF US - SEASON 2
            </p>
          </div>

          {/* Card 3 */}
          <div className="relative w-fit mt-4 lg:mt-[-150px] lg:ml-[1px]">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Image
                src={tisrasanta}
                alt="Luther Movie"
                width={500}
                height={350}
                className="rounded"
              />
            </motion.div>
            <p className="absolute bottom-2 right-2 text-xs md:text-sm text-black bg-opacity-60 px-2 py-1 rounded">
              Recently Released
            </p>
            <p className="mt-1 text-xs md:text-sm text-gray-600">Idris Elba, John Cena</p>
            <p className="text-base md:text-xl font-bold text-black leading-none">LUTHER: THE FALLEN SUN</p>
          </div>
        </div>
      </div>
    </div>
  );
}
