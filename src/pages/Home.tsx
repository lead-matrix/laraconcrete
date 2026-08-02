import React, { Suspense, lazy } from 'react';
import { Hero } from '../components/sections/Hero';
import { TrustBar } from '../components/sections/TrustBar';
import { ServicesSection } from '../components/sections/ServicesSection';
import { SEOMetadata } from '../components/ui/SEOMetadata';

// Above-fold sections load eagerly for best LCP performance
// Below-fold sections are lazy-loaded to reduce initial bundle parse time

const CADConcreteEstimator = lazy(() => import('../components/sections/CADConcreteEstimator').then(m => ({ default: m.CADConcreteEstimator })));
const AIVisionEstimator = lazy(() => import('../components/sections/AIVisionEstimator').then(m => ({ default: m.AIVisionEstimator })));
const CustomerPortalSection = lazy(() => import('../components/sections/CustomerPortalSection').then(m => ({ default: m.CustomerPortalSection })));
const FleetShowcase = lazy(() => import('../components/sections/FleetShowcase').then(m => ({ default: m.FleetShowcase })));
const ProjectShowcase = lazy(() => import('../components/sections/ProjectShowcase').then(m => ({ default: m.ProjectShowcase })));
const MaterialLibrary = lazy(() => import('../components/sections/MaterialLibrary').then(m => ({ default: m.MaterialLibrary })));
const WarrantyCenter = lazy(() => import('../components/sections/WarrantyCenter').then(m => ({ default: m.WarrantyCenter })));
const FinancingSection = lazy(() => import('../components/sections/FinancingSection').then(m => ({ default: m.FinancingSection })));
const LocalSEOCityEngine = lazy(() => import('../components/sections/LocalSEOCityEngine').then(m => ({ default: m.LocalSEOCityEngine })));
const ProcessTimeline = lazy(() => import('../components/sections/ProcessTimeline').then(m => ({ default: m.ProcessTimeline })));
const WhyChooseUs = lazy(() => import('../components/sections/WhyChooseUs').then(m => ({ default: m.WhyChooseUs })));
const AboutUs = lazy(() => import('../components/sections/AboutUs').then(m => ({ default: m.AboutUs })));
const Testimonials = lazy(() => import('../components/sections/Testimonials').then(m => ({ default: m.Testimonials })));
const FAQSection = lazy(() => import('../components/sections/FAQSection').then(m => ({ default: m.FAQSection })));
const BlogSection = lazy(() => import('../components/sections/BlogSection').then(m => ({ default: m.BlogSection })));
const ContactSection = lazy(() => import('../components/sections/ContactSection').then(m => ({ default: m.ContactSection })));

/** Minimal skeleton shown while lazy sections load */
const SectionSkeleton: React.FC = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#F58220] border-t-transparent rounded-full animate-spin" />
  </div>
);

export const Home: React.FC = () => {
  return (
    <div className="bg-[#F6F6F6] text-[#2D2D2D]">
      <SEOMetadata
        title="Lara Concrete LLC | #1 Concrete Contractor | Driveways, Patios, Foundations"
        description="Lara Concrete LLC delivers 4,000+ PSI rebar-reinforced concrete driveways, stamped patios, garage slabs, foundations, and commercial flatwork. Free instant estimates & 10-year warranty."
      />

      {/* Above-fold — eager loaded */}
      <Hero />
      <TrustBar />
      <ServicesSection />

      {/* Below-fold — lazy loaded */}
      <Suspense fallback={<SectionSkeleton />}>
        <CADConcreteEstimator />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <AIVisionEstimator />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <CustomerPortalSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FleetShowcase />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ProjectShowcase />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <MaterialLibrary />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <WarrantyCenter />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FinancingSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <LocalSEOCityEngine />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ProcessTimeline />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <WhyChooseUs />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <AboutUs />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <BlogSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ContactSection />
      </Suspense>
    </div>
  );
};
