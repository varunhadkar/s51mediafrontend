'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  onReveal?: () => void;
}

export default function HeroSection({ onReveal }: HeroSectionProps) {
  const [revealed, setRevealed] = useState(false);

  const reveal = () => {
    if (!revealed) {
      setRevealed(true);
      onReveal?.();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) reveal();
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [revealed]);

  const scrollToNext = () => {
    reveal();
    const nextSection = document.getElementById('next-section');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className={`relative w-full h-screen overflow-hidden group ${
        revealed ? 'cursor-default' : 'cursor-pointer'
      }`}
      onMouseEnter={reveal}
    >
      {/* Background Vimeo Video */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '100vh',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
        }}
      >
        <iframe
          src="https://player.vimeo.com/video/1138436344?h=5afa7debca&autoplay=1&loop=1&muted=1&background=1&controls=0&title=0&byline=0&portrait=0"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '56.25vw', // 16:9 aspect ratio
            minHeight: '100vh',
            minWidth: '177.77vh', // 16:9 aspect ratio
            transform: 'translate(-50%, -50%)',
          }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Minimal Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 100%)',
          zIndex: 1,
        }}
      />

      {/* Buttons - Bottom Center */}
      <div
        className={`absolute bottom-20 left-0 right-0 z-10 transition-opacity duration-700 ${
          revealed ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex justify-center gap-3 px-6">
          <Link
            href="/work"
            className="px-5 py-2 border border-white/80 text-white text-xs font-medium uppercase tracking-wider
                       bg-transparent hover:bg-white hover:text-black transition-all duration-300"
          >
            View Work
          </Link>

          <Link
            href="/contact"
            className="px-5 py-2 border border-white bg-white text-black text-xs font-medium uppercase tracking-wider
                       hover:bg-transparent hover:text-white transition-all duration-300"
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 hover:text-white animate-bounce z-20 transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-5 h-5" strokeWidth={1.5} />
      </button>
    </section>
  );
}
