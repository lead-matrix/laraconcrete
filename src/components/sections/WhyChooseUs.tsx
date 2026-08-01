import React from 'react';
import { ShieldCheck, Award, Wrench, Sparkles, DollarSign, Clock } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const differentiators = [
    {
      title: 'Laser-Guided Precision Flatwork',
      desc: 'We utilize Somero 3D laser screed machines for sub-millimeter level flatness (Ff/Fl ratings) on garage floors & commercial slabs.',
      icon: <Wrench className="w-6 h-6 text-[#F58220]" />
    },
    {
      title: '4,000+ PSI High-Density Mixes',
      desc: 'Never cheap 3,000 PSI concrete. All our driveways and structural pours feature 4,000+ PSI compressive strength with fiber matrix.',
      icon: <ShieldCheck className="w-6 h-6 text-[#F58220]" />
    },
    {
      title: 'Transparent Upfront Pricing Guarantee',
      desc: 'Detailed line-item quotes with fixed material costs. What we estimate is what you pay—zero surprise add-ons.',
      icon: <DollarSign className="w-6 h-6 text-[#F58220]" />
    },
    {
      title: 'Clean Property Work Site Promise',
      desc: 'We protect lawn edges with ply tracks, wash down street curbs after every pour, and leave your property cleaner than we found it.',
      icon: <Sparkles className="w-6 h-6 text-[#F58220]" />
    },
    {
      title: 'Dedicated Senior Project Manager',
      desc: 'Direct cell phone access to your project lead. Daily photo updates sent straight to your customer portal.',
      icon: <Clock className="w-6 h-6 text-[#F58220]" />
    },
    {
      title: '10-Year Written Structural Warranty',
      desc: 'Full written coverage protecting against major cracking (>3/16"), subbase settlement, and surface spalling.',
      icon: <Award className="w-6 h-6 text-[#F58220]" />
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-[#1A1A1A] text-white relative border-b border-white/10 overflow-hidden">
      {/* Texture */}
      <div className="absolute inset-0 bg-concrete-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="bg-[#F58220]/20 text-[#F58220] border border-[#F58220]/40 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block">
            The Lara Concrete Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Why Homeowners & Builders Trust Lara
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            We don't cut corners. From steel rebar spacing to deep penetrating sealers, see how our engineering standards set us apart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#2D2D2D] p-6 rounded-2xl border border-white/10 shadow-xl space-y-3 hover:border-[#F58220]/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-black text-white">{item.title}</h3>
              <p className="text-xs text-gray-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
