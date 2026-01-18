'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from './landingpage/HeroSection';
import Footer from './landingpage/Footer';
import ClientsSection from './landingpage/ClientsSection';

export default function Home() {
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
        {/* other sections if needed */}
        <Footer />
      </div>
    </div>
  );
}
