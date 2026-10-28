import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { ProgramSection } from '@/components/landing/ProgramSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { LearningFlowSection } from '@/components/landing/LearningFlowSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { FinalCTASection } from '@/components/landing/FinalCTASection';

export default function HomePage() {
  return (
    <div id="top" className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-800">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <ProgramSection />
        <BenefitsSection />
        <LearningFlowSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
