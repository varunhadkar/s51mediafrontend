'use client';

import Image from 'next/image';
import life1 from "../../../public/life1.webp";
import life2 from "../../../public/life2.webp";
import life3 from "../../../public/life3.webp";

export default function InspireNews() {
  return (
    <section className="bg-[#f6f5e8] text-[#3c3c3c] px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* TITLE SECTION */}
        <div className="mt-20 mb-8">
          <p className="text-sm sm:text-base text-[#7e3f3f]">A look inside</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1f1f1f]">Life at DNEG</h1>
        </div>

        {/* IMAGE GRID */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT IMAGE */}
          <div className="w-full lg:w-1/2 mt-[90px]">
            <Image
              src={life1}
              alt="Drawing Session"
              width={700}
              height={600}
              className="w-full h-auto object-cover"
            />
                 <div className="mt-3">
                <p className="text-xs uppercase font-semibold">News</p>
                <div className="flex justify-between">
                  <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                    Wrapping Up DNEG Animation’s 2024 Inspire Series
                  </h2>
                  <span className="text-sm text-gray-500 hidden sm:inline-block mt-1">
                    Life at DNEG
                  </span>
                </div>
              </div>
          </div>

          {/* RIGHT: STACKED IMAGES */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {/* Top Image + News */}
            <div>
              <Image
                src={life2}
                alt="Inspire Session"
                width={700}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="mt-3">
                <p className="text-xs uppercase font-semibold">News</p>
                <div className="flex justify-between">
                  <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                    Wrapping Up DNEG Animation’s 2024 Inspire Series
                  </h2>
                  <span className="text-sm text-gray-500 hidden sm:inline-block mt-1">
                    Life at DNEG
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Image */}
            <div>
              <Image
                src={life3}
                alt="Team Group"
                width={700}
                height={400}
                className="w-full h-auto object-cover"
              />
                   <div className="mt-3">
                <p className="text-xs uppercase font-semibold">News</p>
                <div className="flex justify-between">
                  <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                    Wrapping Up DNEG Animation’s 2024 Inspire Series
                  </h2>
                  <span className="text-sm text-gray-500 hidden sm:inline-block mt-1">
                    Life at DNEG
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
