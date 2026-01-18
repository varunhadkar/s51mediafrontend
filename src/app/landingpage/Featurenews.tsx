'use client';

import Image from 'next/image';

import ramayan from "../../../public/ramayan.webp"

export default function FeaturedNews() {
  return (
    <section className="bg-[#f6f5e8] text-[#3c3c3c] px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Tag */}
        <p className="text-sm font-medium mb-3">Featured news</p>

        {/* Headline */}
        <h1 className="text-6xl sm:text-7xl font-extrabold leading-none tracking-tight">
          Ramayana <br /> Unveiled
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-xl text-base leading-relaxed tracking-wide">
          NAMIT MALHOTRA’S ‘RAMAYANA’ <br />
          LAUNCHES WITH A GLOBAL TITLE REVEAL, <br />
          SETTING THE STAGE FOR A CINEMATIC <br />
          UNIVERSE ROOTED IN INDIAN MYTHOLOGY
        </p>

        {/* Button */}
        <button className="mt-6 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-5 rounded-full transition-all">
          Read more
        </button>

        {/* Divider */}
        <div className="my-16 border-t border-gray-300"></div>

        {/* More Latest News Section */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Image */}
          <div className="w-full lg:w-1/2">
            <Image
              src={ramayan}
              alt="Ramayana Poster"
              width={800}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right: News List */}
          <div className="w-full lg:w-1/2">
            <div className="flex justify-between items-start">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
                More latest news
              </h2>
              <a
                href="#"
                className="text-sm underline text-black hover:text-gray-800 mt-2"
              >
                All News →
              </a>
            </div>

            <div className="space-y-10">
              {[
                {
                  title: 'Emmy Awards 2025: 2 Nominations for DNEG!',
                  link: '#',
                },
                {
                  title: 'Celebrating 100 life drawing sessions in our London studio!',
                  link: '#',
                },
                {
                  title: 'The Cat Is Back',
                  link: '#',
                },
              ].map((news, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-sm font-medium mb-1">News</span>
                  <h3 className="text-lg font-semibold">{news.title}</h3>
                  <a
                    href={news.link}
                    className="text-sm underline text-gray-800 hover:text-black mt-1"
                  >
                    Read more
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
