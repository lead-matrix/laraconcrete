import React from 'react';
import {
  Phone,
  Shield,
  Star,
  Award,
  CheckCircle2,
  ChevronRight,
  Wrench,
  Truck
} from 'lucide-react';
import { useCMS } from '../../cms/useCMS';

export const Hero: React.FC = () => {
  const { openEstimateModal, language, companyDetails } = useCMS();

  return (
    <section
      id="hero"
      className="relative bg-[#1A1A1A] text-white pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden border-b border-white/10"
    >
      {/* Background Graphic Grid with Concrete Texture */}
      <div className="absolute inset-0 bg-concrete-pattern opacity-40 pointer-events-none"></div>

      {/* Orange Ambient Light Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F58220]/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Main Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 bg-[#2D2D2D] border border-[#F58220]/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-gray-200 shadow-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F58220] animate-ping"></span>
              <span className="text-[#F58220] uppercase tracking-wider">
                ZenBid Pro SaaS Platform
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300 font-extrabold text-[#F58220]">
                AVAILABLE FOR OWNERSHIP
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Building Strong{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F58220] to-[#FF8E2B]">
                Foundations
              </span>{' '}
              That Last.
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-2xl">
              {language === 'ES'
                ? 'Soluciones premium de concreto residencial y comercial entregadas con precisión, integridad y artesanía inigualable.'
                : 'Premium residential and commercial concrete solutions delivered with precision, integrity, and unmatched craftsmanship.'}
            </p>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="flex items-center gap-2 bg-[#2D2D2D]/80 p-2.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#F58220] shrink-0" />
                <span className="text-xs font-bold text-gray-200">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 bg-[#2D2D2D]/80 p-2.5 rounded-lg border border-white/10">
                <Star className="w-4 h-4 text-[#F58220] fill-[#F58220] shrink-0" />
                <span className="text-xs font-bold text-gray-200">5-Star Google Rating</span>
              </div>
              <div className="flex items-center gap-2 bg-[#2D2D2D]/80 p-2.5 rounded-lg border border-white/10">
                <Award className="w-4 h-4 text-[#F58220] shrink-0" />
                <span className="text-xs font-bold text-gray-200">Free Estimates</span>
              </div>
              <div className="flex items-center gap-2 bg-[#2D2D2D]/80 p-2.5 rounded-lg border border-white/10">
                <Shield className="w-4 h-4 text-[#F58220] shrink-0" />
                <span className="text-xs font-bold text-gray-200">10-Yr Warranty</span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 sm:pt-4">
              <button
                onClick={() => openEstimateModal()}
                className="btn-lara-primary w-full sm:w-auto px-8 py-4 rounded-xl text-sm sm:text-base font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl group min-h-[52px]"
                aria-label="Request a free estimate"
              >
                <span>Get Free Estimate</span>
                <ChevronRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </button>

              <a
                href={`tel:${companyDetails.phone1.replace(/\D/g, '')}`}
                className="hidden sm:flex btn-lara-secondary px-8 py-4 rounded-xl text-sm font-extrabold uppercase tracking-wider items-center justify-center gap-2 min-h-[52px]"
                aria-label={`Call us at ${companyDetails.phone1}`}
              >
                <Phone className="w-4 h-4 text-[#F58220]" aria-hidden="true" />
                <span>Call: {companyDetails.phone1}</span>
              </a>
            </div>

            {/* Fast Response Guarantee */}
            <div className="flex items-center gap-3 pt-2 text-xs text-gray-400">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-[#F58220] flex items-center justify-center font-bold text-white text-[10px] border-2 border-[#1A1A1A]">
                  CL
                </div>
                <div className="w-7 h-7 rounded-full bg-[#2D2D2D] flex items-center justify-center font-bold text-[#F58220] text-[10px] border-2 border-[#1A1A1A]">
                  5.0★
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-[10px] border-2 border-[#1A1A1A]">
                  ACI
                </div>
              </div>
              <span>
                Over{' '}
                <strong className="text-white">
                  {companyDetails.projectsCompleted.toLocaleString()}+
                </strong>{' '}
                projects poured in 2026. 15-min estimator call back guarantee.
              </span>
            </div>
          </div>

          {/* Right Column - Custom Branded Truck & Fleet Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-[#2D2D2D] border border-white/20 p-2 shadow-2xl group">
              {/* Branded Vehicle Wrap Graphic Banner */}
              <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80"
                  alt="Lara Concrete LLC Branded Fleet Work Truck & Trailer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Truck Wrap Orange Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-black/40"></div>

                {/* Branded Vehicle Livery Card Overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div className="bg-[#2D2D2D]/90 backdrop-blur-md border border-[#F58220]/50 p-2.5 rounded-lg shadow-lg">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#F58220]" />
                      <span className="font-extrabold text-xs text-white uppercase tracking-wider">
                        LARA FLEET #01 • FORD F-550
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-300">
                      Custom Vinyl Wrap • Orange & Dark Charcoal
                    </p>
                  </div>

                  <span className="bg-[#F58220] text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded shadow">
                    VERIFIED CREW
                  </span>
                </div>

                {/* Floating Interactive CAD CTA Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#1A1A1A]/95 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-2xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#F58220]">
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Interactive CAD Estimator</span>
                    </div>
                    <p className="text-[11px] text-gray-300 font-medium">
                      Draw your slab & compute cubic yards instantly.
                    </p>
                  </div>
                  <a
                    href="#cad-estimator"
                    className="bg-[#F58220] hover:bg-[#FF8E2B] text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-colors shrink-0"
                  >
                    Try CAD
                  </a>
                </div>
              </div>

              {/* Fleet Specs Footer */}
              <div className="p-4 bg-[#1A1A1A] rounded-xl mt-2 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-[#2D2D2D] rounded-lg border border-white/5">
                  <p className="text-gray-400 text-[10px] uppercase font-bold">Compressive Mix</p>
                  <p className="text-[#F58220] font-extrabold text-sm">4,000+ PSI</p>
                </div>
                <div className="p-2 bg-[#2D2D2D] rounded-lg border border-white/5">
                  <p className="text-gray-400 text-[10px] uppercase font-bold">Rebar Grid</p>
                  <p className="text-white font-extrabold text-sm">1/2" @ 18" O.C.</p>
                </div>
                <div className="p-2 bg-[#2D2D2D] rounded-lg border border-white/5">
                  <p className="text-gray-400 text-[10px] uppercase font-bold">
                    Flatness Tolerance
                  </p>
                  <p className="text-[#F58220] font-extrabold text-sm">1/16" Laser</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
