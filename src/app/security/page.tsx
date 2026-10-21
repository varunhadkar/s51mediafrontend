import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CopySection from '@/components/CopySection';
import Footer from '../landingpage/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata("/security");

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-40">
        <div className="pb-6 sm:pb-8 border-b border-zinc-800">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">
            Content security and vendor compliance
          </h1>
        </div>
      </div>

      <div className="pb-16">
        <CopySection>
          {/* [CONFIRM] exact TPN assessment level and year. */}
          {/* [CONFIRM] exact wording Amazon and Paramount allow; some studios require approval before you name them. */}
          <p>
            Studio 51 VFX protects pre-release content across all five studios
            in Mumbai, Hyderabad, Beijing, Shanghai and London. We are assessed
            by the Trusted Partner Network (TPN) and have been vetted and
            approved by Amazon and Paramount.
          </p>
        </CopySection>

        <CopySection heading="What this means for you">
          <ul>
            <li>Secure file transfer</li>
            <li>Access control</li>
            {/* [PLACEHOLDER] ADD real controls you actually run, e.g. secure workstations, no-internet pods,
                watermarking, audit logs, NDAs, background checks. */}
          </ul>
          {/* [PLACEHOLDER] Link to your public TPN listing, if you have one. */}
          {/* [PLACEHOLDER] Add a downloadable one-page security summary (PDF). */}
        </CopySection>

        <CopySection>
          <p>
            Planning a project with strict security needs?{' '}
            <Link href="/contact">Talk to us about your requirements</Link>.
          </p>
        </CopySection>
      </div>

      <Footer />
    </main>
  );
}
