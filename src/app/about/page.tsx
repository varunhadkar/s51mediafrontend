import Link from 'next/link';
import AboutClient from './AboutClient';
import CopySection from '@/components/CopySection';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata("/about");

export default function AboutPage() {
  return (
    <AboutClient>
      <CopySection heading="Who we are">
        <p>
          Studio 51 VFX is a global visual effects studio with studios in
          Mumbai, Hyderabad, Beijing, Shanghai and London. We deliver the full
          VFX pipeline for screen productions, from concept to final render.
        </p>
        {/* [PLACEHOLDER] "Founded [YEAR] by [FOUNDER NAME, TITLE]." (The page above already says "since 2013"; confirm.) */}
      </CopySection>

      {/* [PLACEHOLDER] "What we believe": 2-3 sentences on your approach to quality, schedule and communication. */}

      <CopySection heading="Our team and pipeline">
        {/* [PLACEHOLDER] Team size and tools ([SOFTWARE]) used across the pipeline. */}
        <p>
          Client footage is protected under our content security standards
          across every studio. <Link href="/security">Read about our security and compliance</Link>.
        </p>
      </CopySection>

      {/* [PLACEHOLDER] "Leadership": names, titles, short bios and LinkedIn links. */}
      {/* [PLACEHOLDER] "Credits and recognition": only documented items. */}
    </AboutClient>
  );
}
