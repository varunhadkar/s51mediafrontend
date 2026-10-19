import Link from 'next/link';
import HomeClient from '@/components/HomeClient';
import CopySection from '@/components/CopySection';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata("/");

export default function Home() {
  return (
    <HomeClient>
      <div className="bg-black pb-12">
        <div className="max-w-4xl mx-auto px-6 pt-4 md:pt-8">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">
            Full-pipeline VFX, from concept to final render
          </h1>
          <p className="mt-6 text-zinc-400 text-base md:text-lg leading-relaxed">
            Studio 51 VFX is a visual effects and animation studio with teams in
            Mumbai, Hyderabad, Beijing, Shanghai and London. We take productions
            from first concept to final render, so film, television, streaming,
            games and immersive projects have one accountable partner across the
            entire VFX pipeline.
          </p>
        </div>

        <CopySection heading="What we do">
          <p>
            Our artists cover concept design, previsualisation, matchmove, roto
            animation, rotoscopy, paint, lighting, animation, FX, environments,
            digital matte painting, creature animation, modelling, rigging,
            texturing and compositing. Productions can hire us for a single
            discipline or hand over complete sequences.{' '}
            <Link href="/services">See our services</Link>.
          </p>
        </CopySection>

        <CopySection heading="Why productions work with Studio 51 VFX">
          <ul>
            <li>Five studios across India, China and the UK, so work can progress across time zones.</li>
            <li>One pipeline from concept to delivery, which keeps look, schedule and budget consistent.</li>
            {/* [PLACEHOLDER] Add once confirmed: "Credited work on [NUMBER] projects, including [TWO OR THREE CREDITED TITLES]." */}
            <li>Clear communication with VFX supervisors and producers from bid through final delivery.</li>
            {/* [CONFIRM wording] with TPN, Amazon and Paramount before publishing. */}
            <li>
              Assessed by TPN and vetted by Amazon and Paramount, so your content
              is handled to studio security standards.{' '}
              <Link href="/security">Our security standards</Link>.
            </li>
          </ul>
        </CopySection>

        <CopySection heading="Start a project">
          <p>
            Planning a shoot? Send us your script, sequences or schedule and we
            will respond with an approach and bid outline.{' '}
            <Link href="/contact">Contact us</Link>.
          </p>
        </CopySection>
      </div>
    </HomeClient>
  );
}
