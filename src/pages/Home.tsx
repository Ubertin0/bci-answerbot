import { useLenis } from '../hooks/useLenis';
import { useFadeBlur } from '../hooks/useFadeBlur';
import Navigation from '../components/Navigation';
import CustomCursor from '../components/CustomCursor';
import HeroSection from '../sections/HeroSection';
import ProblemSection from '../sections/ProblemSection';
import DemoSection from '../sections/DemoSection';
import ArchitectureSection from '../sections/ArchitectureSection';
import PricingSection from '../sections/PricingSection';
import ContactSection from '../sections/ContactSection';
import Footer from '../sections/Footer';

export default function Home() {
  const lenisRef = useLenis();
  useFadeBlur('.fade-blur-element');

  return (
    <>
      <CustomCursor />
      <Navigation lenisRef={lenisRef} />
      <main>
        <HeroSection />
        <ProblemSection />
        <DemoSection />
        <ArchitectureSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
