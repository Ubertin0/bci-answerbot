'use client';

import { useFadeBlur } from '../hooks/useFadeBlur';
import Navigation from './Navigation';
import HeroSection from '../sections/HeroSection';
import ProblemSection from '../sections/ProblemSection';
import DemoSection from '../sections/DemoSection';
import ArchitectureSection from '../sections/ArchitectureSection';
import PricingSection from '../sections/PricingSection';
import ContactSection from '../sections/ContactSection';
import Footer from '../sections/Footer';

export default function Home() {
  useFadeBlur('.fade-blur-element');

  return (
    <>
      <Navigation />
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
