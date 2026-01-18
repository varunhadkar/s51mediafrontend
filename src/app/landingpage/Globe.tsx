'use client';

import { useState } from 'react';
import Image from 'next/image';

const cities = [
  'LONDON', 'MONTREAL', 'BARCELONA', 'TRIVANDRUM',
  'VANCOUVER', 'MOHALI', 'BUDAPEST', 'HYDERABAD',
  'MUMBAI', 'BANGALORE', 'SOFIA', 'PATNA',
  'LOS ANGELES', 'TORONTO', 'PUNE', 'GOA',
  'CHENNAI', 'SYDNEY', 'KOLKATA'
];

export default function Globe() {
  const [selected, setSelected] = useState<string | null>(null);

  // Break into 5 columns
  const columns = Array.from({ length: 5 }, (_, i) =>
    cities.slice(i * 4, i * 4 + 4)
  );

  return (
    <div className="relative w-full h-[600px] bg-[#f8f6ec] overflow-hidden">
      {/* Background Globe Image */}
      <Image
        src="/eath.png"
        alt="Earth Background"
        fill
        className="object-cover opacity-30"
        priority
      />

      {/* City Columns */}
      <div className="relative z-10 w-full h-full flex flex-wrap justify-center items-center px-4 py-10 gap-6 md:gap-12">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-3 text-center md:text-left">
            {col.map((city, idx) => (
              <div
                key={idx}
                className={`text-sm md:text-base lg:text-lg font-semibold cursor-pointer transition-all duration-300
                  ${
                    selected === city
                      ? 'text-black underline'
                      : 'text-gray-400 hover:text-black'
                  }`}
                onClick={() => setSelected(city)}
              >
                {city}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
