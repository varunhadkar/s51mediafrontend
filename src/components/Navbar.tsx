'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  hidden?: boolean;
}

export default function Navbar({ hidden = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'WORK', href: '/work' },
    { name: 'SERVICES', href: '/services' },
    { name: 'REELS', href: '/reels' },
    { name: 'ABOUT', href: '/about' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled
          ? 'bg-black/90 backdrop-blur-sm shadow-lg border-b border-zinc-800'
          : 'bg-gradient-to-b from-black/70 to-transparent'}
        ${hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4 md:py-5">
        {/* Logo */}
        <Link
          href="/"
          className="z-50 hover:opacity-80 transition-opacity"
        >
          <img
            src="./logo.png"
            alt="S51 Studios"
            style={{
              height: '70px',
              width: 'auto',
              objectFit: 'contain',
            }}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-2 text-xs tracking-[0.2em] font-semibold uppercase transition-all duration-300 ${
                pathname === link.href
                  ? 'text-white border-b border-white'
                  : 'text-zinc-200 hover:text-white hover:border-b hover:border-white/70'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* CTA Button */}
          <Link
            href="/contact"
            className="ml-4 px-6 py-2 border border-white/80 text-xs tracking-[0.2em] font-semibold uppercase text-white
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white z-50 p-2 hover:text-zinc-300 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/98 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-6 overflow-y-auto">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={toggleMenu}
              className={`text-2xl font-semibold text-white tracking-[0.25em] uppercase hover:text-zinc-300 transition-all duration-300 transform ${
                isMenuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile CTA */}
          <Link
            href="/contact"
            onClick={toggleMenu}
            className={`mt-8 px-10 py-4 border border-white text-white text-sm font-semibold uppercase tracking-[0.25em]
                        hover:bg-white hover:text-black transition-all duration-300 transform ${
              isMenuOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '320ms' }}
          >
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  );
}
