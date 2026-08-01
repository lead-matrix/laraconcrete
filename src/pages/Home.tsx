import React from 'react';
import { Hero } from '../components/sections/Hero';
import { TrustBar } from '../components/sections/TrustBar';
import { ServicesSection } from '../components/sections/ServicesSection';
import { CADConcreteEstimator } from '../components/sections/CADConcreteEstimator';
import { AIVisionEstimator } from '../components/sections/AIVisionEstimator';
import { CustomerPortalSection } from '../components/sections/CustomerPortalSection';
import { FleetShowcase } from '../components/sections/FleetShowcase';
import { ProjectShowcase } from '../components/sections/ProjectShowcase';
import { MaterialLibrary } from '../components/sections/MaterialLibrary';
import { WarrantyCenter } from '../components/sections/WarrantyCenter';
import { FinancingSection } from '../components/sections/FinancingSection';
import { LocalSEOCityEngine } from '../components/sections/LocalSEOCityEngine';
import { ProcessTimeline } from '../components/sections/ProcessTimeline';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { AboutUs } from '../components/sections/AboutUs';
import { Testimonials } from '../components/sections/Testimonials';
import { FAQSection } from '../components/sections/FAQSection';
import { BlogSection } from '../components/sections/BlogSection';
import { ContactSection } from '../components/sections/ContactSection';
import { SEOMetadata } from '../components/ui/SEOMetadata';

export const Home: React.FC = () => {
  return (
    <div className="bg-[#F6F6F6] text-[#2D2D2D]">
      <SEOMetadata
        title="Lara Concrete LLC | #1 Concrete Contractor | Driveways, Patios, Foundations"
        description="Lara Concrete LLC delivers 4,000+ PSI rebar-reinforced concrete driveways, stamped patios, garage slabs, foundations, and commercial flatwork. Free instant estimates & 10-year warranty."
      />

      <Hero />
      <TrustBar />
      <ServicesSection />
      <CADConcreteEstimator />
      <AIVisionEstimator />
      <CustomerPortalSection />
      <FleetShowcase />
      <ProjectShowcase />
      <MaterialLibrary />
      <WarrantyCenter />
      <FinancingSection />
      <LocalSEOCityEngine />
      <ProcessTimeline />
      <WhyChooseUs />
      <AboutUs />
      <Testimonials />
      <FAQSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
};
