'use client';

import Link from 'next/link';
import { Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const navLinks = [
    { name: 'Work', href: '/work' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-black text-white border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h2 className="font-bold uppercase">
              <img src="/logo.png" alt="Studio 51 Logo" className="w-45 h-auto" />
            </h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-sm">
              Visual effects, animation, and creative technologies for film,
              television, games, and immersive experiences.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4">
              Navigate
            </p>
            <nav className="flex flex-col gap-3 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-zinc-300 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4">
              Follow Us
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://www.linkedin.com/company/studio51vfx/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 flex items-center justify-center border border-zinc-800 text-zinc-400 hover:text-white hover:border-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              
              <Link
                href="https://www.instagram.com/s51vfx/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center border border-zinc-800 text-zinc-400 hover:text-white hover:border-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-zinc-800" />

        {/* Bottom Section */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-zinc-500">
            © 2026 S51 Studios. All rights reserved.
          </p>

          <p className="text-[11px] text-zinc-500">
            Built by{' '}
            <a
              href="https://www.corrasolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors underline"
            >
              Corra Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
