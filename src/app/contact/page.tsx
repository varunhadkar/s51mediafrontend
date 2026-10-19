import Navbar from '@/components/Navbar';
import ContactHero from '@/components/ContactHero';
import LocationsGrid from '@/components/LocationsGrid';
import ContactForm from '@/components/ContactForm';
import CopySection from '@/components/CopySection';
import Footer from '../landingpage/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata("/contact");

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ContactHero />
      <LocationsGrid />
      <div className="bg-black pb-8">
        <CopySection heading="What to send us">
          <p>To help us prepare an approach and bid, please include as much of the following as you can:</p>
          <ul>
            <li>Script or sequences</li>
            <li>Shot list</li>
            <li>Delivery spec</li>
            <li>Schedule</li>
            <li>Budget range</li>
          </ul>
          <p>
            Our studios are in Mumbai, Hyderabad, Beijing, Shanghai and London.
          </p>
          {/* [PLACEHOLDER] Business email: [EMAIL] */}
          {/* [PLACEHOLDER] Phone: [PHONE] */}
          {/* [PLACEHOLDER] "We reply within [X] working days." */}
        </CopySection>
      </div>
      <ContactForm />
      <Footer/>
    </main>
  );
}
