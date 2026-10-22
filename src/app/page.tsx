import Link from 'next/link';
import HomeClient from '@/components/HomeClient';
import { SERVICES } from '@/components/Services16';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata("/");

const STUDIOS = ['Mumbai', 'Hyderabad', 'Beijing', 'Shanghai', 'London'];

// Small uppercase label used above headings across the site.
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3 md:mb-4">
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <HomeClient>
      <div className="bg-black text-white">
        {/* Intro */}
        <section className="px-6 pb-16 md:pb-24 border-t border-zinc-900">
          <div className="max-w-4xl mx-auto pt-16 md:pt-24 text-center">
            <Eyebrow>Studio 51 VFX</Eyebrow>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-balance">
              Full-pipeline VFX, from concept to final render
            </h1>
            <div className="h-px w-16 bg-white mx-auto my-8" />
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Studio 51 VFX is a visual effects and animation studio with teams in
              Mumbai, Hyderabad, Beijing, Shanghai and London. We take productions
              from first concept to final render, so film, television, streaming,
              games and immersive projects have one accountable partner across the
              entire VFX pipeline.
            </p>
          </div>

          {/* Studio locations */}
          <ul className="max-w-5xl mx-auto mt-12 md:mt-16 grid grid-cols-2 sm:grid-cols-5 border-t border-l border-zinc-800">
            {STUDIOS.map((city) => (
              <li
                key={city}
                className="border-r border-b border-zinc-800 py-5 text-center text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-zinc-300"
              >
                {city}
              </li>
            ))}
          </ul>
        </section>

        {/* What we do */}
        <section className="px-6 py-16 md:py-24 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            <div>
              <Eyebrow>Services</Eyebrow>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
                What we do
              </h2>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-8">
                Productions can hire us for a single discipline or hand over
                complete sequences.
              </p>
              <Link
                href="/services"
                className="inline-block px-5 py-2 border border-white/80 text-white text-xs font-medium uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
              >
                View services
              </Link>
            </div>

            <ul className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 self-start">
              {SERVICES.map(([name]) => (
                <li
                  key={name}
                  className="bg-black px-4 py-4 text-[11px] md:text-xs font-semibold uppercase tracking-[0.12em] text-zinc-300 break-words"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why productions work with us */}
        <section className="px-6 py-16 md:py-24 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <Eyebrow>Why Studio 51 VFX</Eyebrow>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Why productions work with Studio 51 VFX
              </h2>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <li className="border border-zinc-800 p-6">
                <p className="text-xs tracking-[0.3em] text-zinc-500 mb-4">01</p>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] mb-3">Five studios</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Five studios across India, China and the UK, so work can progress across time zones.
                </p>
              </li>
              <li className="border border-zinc-800 p-6">
                <p className="text-xs tracking-[0.3em] text-zinc-500 mb-4">02</p>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] mb-3">One pipeline</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  One pipeline from concept to delivery, which keeps look, schedule and budget consistent.
                </p>
              </li>
              {/* [PLACEHOLDER] Add once confirmed: "Credited work on [NUMBER] projects, including [TWO OR THREE CREDITED TITLES]." */}
              <li className="border border-zinc-800 p-6">
                <p className="text-xs tracking-[0.3em] text-zinc-500 mb-4">03</p>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] mb-3">Clear communication</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Clear communication with VFX supervisors and producers from bid through final delivery.
                </p>
              </li>
              {/* [CONFIRM wording] with TPN, Amazon and Paramount before publishing. */}
              <li className="border border-zinc-800 p-6">
                <p className="text-xs tracking-[0.3em] text-zinc-500 mb-4">04</p>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] mb-3">Studio-grade security</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  Assessed by TPN and vetted by Amazon and Paramount, so your content is handled to studio security standards.
                </p>
                <Link
                  href="/security"
                  className="text-xs uppercase tracking-[0.2em] text-zinc-300 hover:text-white border-b border-zinc-600 hover:border-white transition-colors"
                >
                  Security standards
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* Start a project */}
        <section className="px-6 py-16 md:py-24 border-t border-zinc-900">
          <div className="max-w-3xl mx-auto text-center">
            <Eyebrow>Start a project</Eyebrow>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
              Planning a shoot?
            </h2>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-10">
              Send us your script, sequences or schedule and we will respond with an
              approach and bid outline.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                href="/work"
                className="px-5 py-2 border border-white/80 text-white text-xs font-medium uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
              >
                View Work
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2 border border-white bg-white text-black text-xs font-medium uppercase tracking-wider hover:bg-transparent hover:text-white transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </HomeClient>
  );
}
