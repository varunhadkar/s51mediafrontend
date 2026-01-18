import Navbar from '@/components/Navbar';
import ContactHero from '@/components/ContactHero';
import LocationsGrid from '@/components/LocationsGrid';
import ContactForm from '@/components/ContactForm';
import Footer from '../landingpage/Footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ContactHero />
      <LocationsGrid />
      <ContactForm />
      <Footer/>
    </main>
  );
}
