'use client';

import Navbar from '@/components/Navbar';
import { Award, Users, Globe, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import Footer from '../landingpage/Footer';

const stats = [
  { number: '150+', label: 'Projects Delivered' },
  { number: '50+', label: 'Industry Awards' },
  { number: '15+', label: 'Years of Excellence' },
  { number: '200+', label: 'Creative Artists' },
];

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'Committed to delivering world‑class visual effects that exceed expectations.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Pushing the boundaries of technology and creativity in every project.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Working closely with filmmakers to bring their visions to life.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Studios across the world serving clients on every continent.',
  },
];

export default function AboutSection() {
  return (
    <section className="bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden pt-16">
        <img
          src="./studio51Banner.png"
          alt="Studio"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            <p className="text-lg md:text-2xl text-zinc-300 tracking-wide">
              Crafting extraordinary visual experiences since 2013
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 mb-4">
              Our Story
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Where vision meets technology.
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-5">
              {`Founded in 2013, S51 Studios has grown from a small collective of passionate artists 
              into a global visual effects and animation studio. Our journey is defined by a 
              relentless focus on craft, detail, and storytelling.`}
            </p>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              {`From feature films and prestige television to game cinematics and brand experiences, 
              we partner with visionary creators to design images that stay with audiences long after 
              the screen goes dark.`}
            </p>
          </div>
          <div className="relative h-[380px] lg:h-auto">
            <img
              src="./team2.png"
              alt="Team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
