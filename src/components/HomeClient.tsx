'use client';

import { useState, type ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/app/landingpage/HeroSection';
import Footer from '@/app/landingpage/Footer';
import ClientsSection from '@/app/landingpage/ClientsSection';

// Interactive shell of the homepage. `children` is the server-rendered body copy.
export default function HomeClient({ children }: { children?: ReactNode }) {
  // controls navbar + hero content visibility
  const [navVisible, setNavVisible] = useState(false);

  return (
    <div className="">
      {/* Navbar: hidden at first, shown after hero reveals */}
      <Navbar hidden={!navVisible} />

      <HeroSection onReveal={() => setNavVisible(true)} />

      {/* Target for scroll-down arrow & rest of page */}
      <div id="next-section">
        {/* <FeaturedWork /> */}
        {/* <ServicesSection /> */}
        <ClientsSection/>
        {children}
        <Footer />
      </div>
    </div>
  );
}
