import React, { useState } from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import { SEO_CITIES } from '../../data/concreteData';
import { useCMS } from '../../cms/useCMS';

export const LocalSEOCityEngine: React.FC = () => {
  const { openEstimateModal } = useCMS();
  const [selectedCitySlug, setSelectedCitySlug] = useState<string>('wichita-ks');

  const activeCity = SEO_CITIES.find((c) => c.slug === selectedCitySlug) || SEO_CITIES[0];

  return (
    <section id="seo-cities" className="py-20 bg-[#1A1A1A] text-white relative border-b border-white/10 overflow-hidden">
      {/* Texture */}
      <div className="absolute inset-0 bg-concrete-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F58220]/20 text-[#F58220] border border-[#F58220]/40 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5" />
            <span>Local SEO Service Radius Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Primary Concrete Contractor Service Areas
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Click on your city below to inspect local job completion metrics, average driveway costs, and fast dispatch times.
          </p>

          {/* City Selector Buttons */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {SEO_CITIES.map((city) => (
              <button
                key={city.slug}
                onClick={() => setSelectedCitySlug(city.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  selectedCitySlug === city.slug
                    ? 'bg-[#F58220] text-white shadow-lg shadow-[#F58220]/30 scale-105'
                    : 'bg-[#2D2D2D] text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{city.name}, {city.state}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected City Dashboard Showcase */}
        <div className="bg-[#2D2D2D] rounded-2xl border border-white/10 p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs bg-[#F58220] text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                PRIMARY DISPATCH ZONE
              </span>
              <span className="text-xs text-gray-400 font-medium">ZIP Codes: {activeCity.zipCodes.join(', ')}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-white">
              #1 Concrete Contractor in <span className="text-[#F58220]">{activeCity.name}, {activeCity.state}</span>
            </h3>

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Lara Concrete LLC mobilizes heavy equipment, 4,000+ PSI concrete mixers, and certified finishing crews directly to {activeCity.name} homeowners and commercial property managers.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-[#1A1A1A] p-3 rounded-xl border border-white/5">
                <span className="text-gray-400 text-[10px] uppercase font-bold">Local Projects</span>
                <p className="text-xl font-black text-white">{activeCity.projectsCompleted}+</p>
              </div>
              <div className="bg-[#1A1A1A] p-3 rounded-xl border border-white/5">
                <span className="text-gray-400 text-[10px] uppercase font-bold">Avg Driveway Cost</span>
                <p className="text-xl font-black text-[#F58220]">{activeCity.avgProjectCost}</p>
              </div>
              <div className="bg-[#1A1A1A] p-3 rounded-xl border border-white/5">
                <span className="text-gray-400 text-[10px] uppercase font-bold">Dispatch Time</span>
                <p className="text-xl font-black text-emerald-400">&lt; {activeCity.dispatchTimeHours} Hours</p>
              </div>
              <div className="bg-[#1A1A1A] p-3 rounded-xl border border-white/5">
                <span className="text-gray-400 text-[10px] uppercase font-bold">Local Reviews</span>
                <p className="text-xl font-black text-white">{activeCity.testimonialCount}</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openEstimateModal(`Local Estimate Request: ${activeCity.name}, ${activeCity.state}`)}
                className="btn-lara-primary px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center gap-2"
              >
                <span>Request {activeCity.name} Estimate</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden bg-[#121212] border border-white/20 h-72 shadow-xl group">
              <img
                src={activeCity.featuredProjectImage}
                alt={`Concrete Project in ${activeCity.name}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] text-[#F58220] font-black uppercase tracking-widest block">Featured {activeCity.name} Project</span>
                <span className="text-sm font-black text-white block">{activeCity.featuredProjectTitle}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
