'use client';

import { useEffect, useState } from 'react';

export default function StudioStats() {
  const [time, setTime] = useState({ hour: '', minute: '' });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime({
        hour: now.getHours().toString().padStart(2, '0'),
        minute: now.getMinutes().toString().padStart(2, '0'),
      });
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#f6f5e8] px-6 py-16 text-[#1f1f1f] font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            19 studios. <br /> 1 global team.
          </h2>

          <div className="flex flex-col md:flex-row gap-8 text-[#3c3c3c] text-base">
            <p className="max-w-md mx-auto lg:mx-0 leading-relaxed">
              DNEG is proudly global, with studios in London, Vancouver, Mumbai, Los
              Ángeles, Chennai, Montréal, Mohali, Bangalore, Toronto, Sydney, Barcelona,
              Budapest, Sofia, Patna, Kolkata, Trivandrum, Hyderabad, Goa and Pune.
            </p>
            <p className="max-w-sm mx-auto lg:mx-0 leading-relaxed">
              115G Tsarigradsko Shosse Boulevard, Floor 3<br />
              Mladost District<br />
              Bulgaria
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-4">
            <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#333]">
              About Us
            </button>
            <button className="bg-[#1f1f1f] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#333]">
              Explore
            </button>
          </div>
        </div>

        {/* RIGHT SIDE CLOCK */}
        <div className="w-full lg:w-1/3 text-center lg:text-right">
          <p className="text-[#f65e5b] text-base sm:text-lg font-extrabold uppercase tracking-wider">
            {new Date().toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
            }).toUpperCase()}
          </p>

          <div className="flex justify-center lg:justify-end gap-2 sm:gap-4 mt-2">
            <span className="text-[64px] sm:text-[100px] md:text-[120px] leading-none font-extrabold text-[#f65e5b]">
              {time.hour}
            </span>
            <span className="text-[64px] sm:text-[100px] md:text-[120px] leading-none font-extrabold text-[#f65e5b]">
              :{time.minute}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
